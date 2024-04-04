// import { useState } from "react";

// // Alustavat kysymykset
// const questions = [
//   { id: 1, text: "Mihin huonekaluun kaipaat apua?", type: "choice", choices: ["Sänky", "Pöytä", "Tuoli"] },
//   { id: 2, text: "Minkä värinen huonekalu on?", type: "text" },
// ];

// export default function Chat() {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState({});

//   const handleAnswer = (answer) => {
//     // Tallenna vastaus
//     setAnswers({ ...answers, [questions[currentQuestionIndex].id]: answer });

//     // Siirry seuraavaan kysymykseen
//     setCurrentQuestionIndex(currentQuestionIndex + 1);
//   };

//   // Kun kaikkiin kysymyksiin on vastattu, lähetä prompti
//   if (currentQuestionIndex >= questions.length) {
//     const prompt = generatePrompt(answers);
//     sendToChatGPT(prompt);
//   }

//   // Renderöi nykyinen kysymys
//   const currentQuestion = questions[currentQuestionIndex];
//   return (
//     <div>
//       {currentQuestion.type === "choice" ? (
//         <ChoiceQuestion question={currentQuestion} onAnswer={handleAnswer} />
//       ) : (
//         <TextQuestion question={currentQuestion} onAnswer={handleAnswer} />
//       )}
//     </div>
//   );
// }

// // Tämä funktio generoi promptin vastausten perusteella
// function generatePrompt(answers) {
//   return `Asiakas tarvitsee apua ${answers[1]} väriseen ${answers[2]} huonekaluun.`;
// }

// // Tämä funktio lähettää promptin ChatGPT:lle
// function sendToChatGPT(prompt) {
//   // Toteuta tämä funktio API:n mukaan
// }
