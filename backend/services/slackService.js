import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default async function sendToSlack(message) {
  try {
    await axios.post(process.env.SLACK_WEBHOOK_URL, {
      text: `📋 *Todo Summary*\n${message}`,
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}
