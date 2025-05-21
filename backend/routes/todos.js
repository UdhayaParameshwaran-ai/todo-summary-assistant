import express from "express";
import supabase from "../db/supabaseClient.js";

const router = express.Router();

//To fetch all the todos
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("todos").select("*");
    res.json(data);
  } catch (err) {
    res.status(500).json({ err: "Error while fetching Todo's" });
  }
});

//To add new todo
router.post("/", async (req, res) => {
  try {
    const { title, completed } = req.body;
    const { data, error } = await supabase
      .from("todos")
      .insert([{ title, completed: false }]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ err: "Error while creating Todo" });
  }
});

//To delete the todo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from("todos").delete().eq("id", id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ err: "Error while deleting Todo" });
  }
});

export default router;
