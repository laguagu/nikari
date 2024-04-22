import os
from fastapi import FastAPI
from openai import OpenAI
from dotenv import load_dotenv
from typing_extensions import override
from openai import AssistantEventHandler

load_dotenv()

API_KEY = os.environ.get('OPENAI_API_KEY')
os.environ["OPENAI_API_KEY"] = API_KEY

client = OpenAI()

# Define the FastAPI app
app = FastAPI()


# Step 1: Create a new Assistant with File Search Enabled
assistant = client.beta.assistants.create(
  name="Nikari chatbot assistant",
  instructions="You are a chatbot that helps careinstructions for Nikari furniture. Use you knowledge base to answer questions about audited Care Instructions.",
  model="gpt-4-turbo",
  tools=[{"type": "file_search"}],
)

print("assistant created", assistant.id)
# Step 2: Upload files and add them to a Vector Store
vector_store = client.beta.vector_stores.create(name="Care Instructions")

# Replace these with the paths to your actual files
file_paths = ["hoito-ohjeet.pdf", "lisaa-hoito.pdf"]
file_streams = [open(path, "rb") for path in file_paths]

file_batch = client.beta.vector_stores.file_batches.upload_and_poll(
  vector_store_id=vector_store.id, files=file_streams
)

print(file_batch.status)
print(file_batch.file_counts)

# Step 3: Update the assistant to to use the new Vector Store
assistant = client.beta.assistants.update(
  assistant_id=assistant.id,
  tool_resources={"file_search": {"vector_store_ids": [vector_store.id]}},
)
print("assistant updated", assistant.id)

# Step 4: Create a thread
message_file = client.files.create(
  file=open("lisaa-hoito.pdf", "rb"), purpose="assistants"
)

thread = client.beta.threads.create(
  messages=[
    {
      "role": "user",
      "content": "Tell me how to clean the Nikari Akademia furniture.",
    #   "attachments": [
    #     { "file_id": message_file.id, "tools": [{"type": "file_search"}] }
    #   ],
    }
  ]
)

print("Thread created",thread.tool_resources.file_search)

# Step 5: Create a run and check the output
class EventHandler(AssistantEventHandler):
    @override
    def on_text_created(self, text) -> None:
        print(f"\nassistant > ", end="", flush=True)

    @override
    def on_tool_call_created(self, tool_call):
        print(f"\nassistant > {tool_call.type}\n", flush=True)

    @override
    def on_message_done(self, message) -> None:
        message_content = message.content[0].text
        annotations = message_content.annotations
        citations = []
        for index, annotation in enumerate(annotations):
            message_content.value = message_content.value.replace(
                annotation.text, f"[{index}]"
            )
            if file_citation := getattr(annotation, "file_citation", None):
                cited_file = client.files.retrieve(file_citation.file_id)
                citations.append(f"[{index}] {cited_file.filename}")

        print(message_content.value)
        print("\n".join(citations))

with client.beta.threads.runs.stream(
    thread_id=thread.id,
    assistant_id=assistant.id,
    instructions="Please address the user as John Doe. The user has a premium account.",
    event_handler=EventHandler(),
) as stream:
    stream.until_done()
    
