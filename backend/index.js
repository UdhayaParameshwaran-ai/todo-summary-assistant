import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import todos from "./routes/todos.js";
import summarize from "./routes/summarize.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/todos", todos);
app.use("/summarize", summarize);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
