"use client";

const message = { role: "user", message: "Hello bot" };

function FetchMessage(message: object) {
  fetch("http://127.0.0.1:8000/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "role": "user",
      "content": "Im just testing api"
    })
  })
    .then((response) => response.json())
    .then((data) => {
      // `data` sisältää palvelimen vastauksen.
      // Voit käsitellä sitä tässä.
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// function FetchMessage(message: object) {
//   fetch("http://127.0.0.1:8000/message", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//       body: JSON.stringify({
//         "role": "user",
//         "content": "Give me care instructions"
//       })
//     })
//     .then(response => {
//       const reader = response.body?.getReader();
//       return new ReadableStream({
//         start(controller) {
//           function push() {
//             if (!reader) return; // Add null check for 'reader'
//             reader.read().then(({done, value}) => {
//               if (done) {
//                 controller.close();
//                 return;
//               }
//               controller.enqueue(value);
//               push();
//             });
//           }
//           push();
//         }
//       });
//     })
//     .then(stream => {
//       const decoder = new TextDecoder("utf-8");
//       const reader = stream.getReader();
//       reader.read().then(function processText({done, value}): Promise<void> {
//         if (done) return Promise.resolve();
//         console.log(decoder.decode(value, {stream: true}));
//         return reader.read().then(processText);
//       });
//     })
//     .catch(error => console.error('Error:', error));
// }

// function FetchMessage(message: object) {
//   fetch("http://127.0.0.1:8000/message", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       "role": "user",
//       "content": "Give me care instructions"
//     })
//   })
//   .then(response => {
//     const reader = response.body?.getReader();
//     function read() {
//       reader?.read().then(({ done, value }) => {
//         if (done) {
//           console.log("Stream completed");
//           return;
//         }
//         const text = new TextDecoder("utf-8").decode(value, { stream: true });
//         console.log(text);  // Tulosta jokainen dataosa konsoliin
//         read();  // Jatka lukemista
//       }).catch(error => {
//         console.error('Reading stream failed:', error);
//       });
//     }
//     read();
//   })
//   .catch(error => {
//     console.error('Fetch error:', error);
//   });
// }

export default function Home() {
  return (
    <div className="flex align-middle justify-center">
      <button onClick={() => FetchMessage(message)}>Fetch</button>
    </div>
  );
}
