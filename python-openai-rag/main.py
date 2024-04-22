from http.client import HTTPException
import os
import time
from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File
from openai import OpenAI
from openai import AssistantEventHandler
from dotenv import load_dotenv

from typing_extensions import override
from pydantic import BaseModel
from typing import List

load_dotenv()

API_KEY = os.environ.get('OPENAI_API_KEY')
os.environ["OPENAI_API_KEY"] = API_KEY

client = OpenAI()

# Define the FastAPI app
app = FastAPI()

print("API Key:", os.environ.get('OPENAI_API_KEY'))
print("Assistant ID:", os.environ.get('ASSISTANT_ID'))
print("Vector Store ID:", os.environ.get('VECTOR_STORE_ID'))

# Check if the assistant ID and vector store ID are in the environment variables
assistant_id = os.environ.get("ASSISTANT_ID")
vector_store_id = os.environ.get("VECTOR_STORE_ID")

# Tarkista, onko assistan tai vektorivarasto jo luotu
if assistant_id is None or vector_store_id is None:
    # Luo assistan, jos sitä ei ole
    if assistant_id is None:
        assistant = client.beta.assistants.create(
            name="Nikari chatbot assistant",
            instructions="You are a chatbot that helps with Nikari furniture care instructions.",
            model="gpt-4-turbo",
            tools=[{"type": "file_search"}],
        )
        assistant_id = assistant.id
        # Tallenna assistant ID ympäristömuuttujaan
        os.environ["ASSISTANT_ID"] = assistant_id
        print("Assistant created:", assistant_id)
        print("Please update your .env file with the following value:", f"ASSISTANT_ID={assistant_id}")
    # Luo vektorivarasto, jos sitä ei ole
    if vector_store_id is None:
        vector_store = client.beta.vector_stores.create(
            name="Care Instructions")
        vector_store_id = vector_store.id
        # Tallenna vektorivaraston ID ympäristömuuttujaan
        os.environ["VECTOR_STORE_ID"] = vector_store_id
        print("Vector store created:", vector_store_id)
        print("Please update your .env file with the following value:", f"VECTOR_STORE_ID={vector_store_id}")
    # Päivitä assistentin vektorivaraston viitteet
    # Step 2: Update the assistant to to use the new Vector Store
    assistant = client.beta.assistants.update(
        assistant_id=assistant_id,
        tool_resources={"file_search": {
            "vector_store_ids": [vector_store_id]}},
    )
    print("Assistant updated to use new vector store")
else:
    # Jos ID:t ovat olemassa, hae olemassa olevat assitant, vektorivarasto
    assistant = client.beta.assistants.retrieve(assistant_id=assistant_id)
    vector_store = client.beta.vector_stores.retrieve(
        vector_store_id=vector_store_id)

# Step 2: Upload files and add them to a Vector Store
# Retrieve existing vector store and check existing files
vector_store = client.beta.vector_stores.retrieve(vector_store_id)
existing_files = client.beta.vector_stores.files.list(
    vector_store_id=vector_store_id)

# Only upload files if the store is empty to avoid hoito-ohje duplicates
if not existing_files.data:
    file_paths = ["hoito-ohjeet.pdf", "lisaa-hoito.pdf"]
    file_streams = [open(file_path, "rb") for file_path in file_paths]
    file_batch = client.beta.vector_stores.file_batches.upload_and_poll(
        vector_store_id=vector_store_id, files=file_streams
    )
    print("Files uploaded:", file_batch.status)
    print(file_batch.file_counts)

# Define an event handler to process the assistant's messages
class EventHandler(AssistantEventHandler):
    def __init__(self):
        super().__init__()
        self.citations = []
        self.message_content = None

    @override
    def on_text_created(self, text) -> None:
        print(f"\nassistant > ", end="", flush=True)

    @override
    def on_tool_call_created(self, tool_call):
        print(f"\nassistant > {tool_call.type}\n", flush=True)

    @override
    def on_message_done(self, message) -> None:
        self.message_content = message.content[0].text
        annotations = self.message_content.annotations
        for index, annotation in enumerate(annotations):
            self.message_content.value = self.message_content.value.replace(
                annotation.text, f"[{index}]"
            )
            if file_citation := getattr(annotation, "file_citation", None):
                cited_file = client.files.retrieve(file_citation.file_id)
                self.citations.append(f"[{index}] {cited_file.filename}")

        print(self.message_content.value)
        print("\n".join(self.citations))

# Route to list all files in the vector store
@app.get("/list-files")
def list_files():
    files = client.beta.vector_stores.files.list(
        vector_store_id=vector_store.id)
    return {"files": files.data}

# Route to delete a file from the vector store
@app.delete("/delete-file/{vector_store_id}/{file_id}")
def delete_file(vector_store_id: str, file_id: str):
    try:
        # Poista tiedosto vektoritietokannasta
        response = client.beta.vector_stores.files.delete(
            vector_store_id=vector_store_id, file_id=file_id)
        return {"message": "File deleted successfully", "response": response}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

# Route to add files to the vector store
@app.post("/add-files")
async def add_files(files: List[UploadFile] = File(...)):
    try:
        # Tulosta tiedostonimet
        for file in files:
            print(f"Filename: {file.filename}")
        # Asetetaan tiedostot suoraan byte-muotoon
        file_streams = [await file.read() for file in files]

        # Lähetä tiedostovirrat OpenAI:n API:lle
        file_batch = client.beta.vector_stores.file_batches.upload_and_poll(
            vector_store_id=vector_store_id,
            files=[(file.filename, file_stream)
                   for file, file_stream in zip(files, file_streams)]
        )
        return {"status": file_batch.status, "file_counts": file_batch.file_counts}
    except Exception as e:
        return {"error": str(e)}

# Muista sulkea tiedostot latauksen jälkeen
    finally:
        for file in files:
            await file.close()

# Route to get the vector store details
@app.get("/vector-store")
def get_vector_store():
    store_details = client.beta.vector_stores.retrieve(
        vector_store_id=vector_store.id)
    return {"vector_store": store_details}

class Message(BaseModel):
    role: str
    content: str

# Define a route for the API
@app.post("/message")
async def create_message(message: Message):
    # Create a thread with the message
    start_time = time.time()
    try:
        thread = client.beta.threads.create(
            messages=[{"role": message.role, "content": message.content}]
        )

        event_handler = EventHandler()

        with client.beta.threads.runs.stream(
            thread_id=thread.id,
            assistant_id=assistant.id,  # Replace with your assistant's ID
            event_handler=event_handler,
        ) as stream:
            stream.until_done()

        end_time = time.time()

        # Calculate the elapsed time
        elapsed_time = end_time - start_time

        # Palauta viimeinen viesti ja sitaatit vastauksena
        return {"message": event_handler.message_content.value, "citations": event_handler.citations, "elapsed_time": elapsed_time}
    except Exception as e:
        return {"error": str(e)}

# Start FastAPI
if __name__ == "__main__":
    import uvicorn  # type: ignore
    uvicorn.run(app, host="127.0.0.1", port=8000)
