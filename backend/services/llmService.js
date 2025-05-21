import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyB76153KuJdVIQPDkDgkjjwkfLkL1g3HDs",
});

export default async function summarize(todos) {
  const prompt = `Summarize the following todos:\n${todos
    .map((t) => `- ${t.title} [${t.completed ? "Done" : "Pending"}]`)
    .join("\n")}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text;
}
