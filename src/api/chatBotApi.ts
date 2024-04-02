import axios from "axios";

export interface Message {
   text: string;
   sender: "user" | "assistant";
 }
const baseUrl = "http://localhost:3000/api/chat";

const chatbotApi = async (messages: Message[]) => {
   try {
     // Muunna viestit backendin odottamaan muotoon
     const formattedMessages = messages.map(({ text, sender }) => ({
       content: text,
       role: sender, // 'sender' frontendissä vastaa 'role' backendissä
     }));
 
     console.log("Sending messages to chatbot API:", formattedMessages);
 
     const response = await axios.post(baseUrl, { messages: formattedMessages });
 
     return response.data;
   } catch (error) {
     console.error("Error sending messages to chatbot API:", error);
     throw new Error("Chatbot API-pyynnön käsittely failasi");
   }
 };

export default chatbotApi