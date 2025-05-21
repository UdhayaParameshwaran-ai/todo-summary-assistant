import express from "express";
import supabase from "../db/supabaseClient.js";
import summarizeTodos from "../services/llmService.js";
import sendToSlack from "../services/slackService.js";

const router = express.Router();

//To  Summarize todos with LLM API and send to Slack
router.post("/", async (req, res) => {
  try {
    const { data: todos } = await supabase.from("todos").select("*");

    const summary = await summarizeTodos(todos);
    const slackResult = await sendToSlack(summary);

    if (slackResult.success) {
      res.status(200).json({ message: "Summary sent to Slack" });
    } else {
      res.status(500).json({ error: "Slack post failed" });
    }
  } catch (err) {
    res.status(500).json({ err: "Error While summarizing" });
  }
});

export default router;
