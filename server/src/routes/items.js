import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// Get all items
router.get("/", async (req, res) => {
  console.log("GET /api/items called");
  try {
    const [rows] = await pool.query("SELECT * FROM items ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Create item
router.post("/", async (req, res) => {
  console.log("POST /api/items body:", req.body);
  try {
    const { name, description, price } = req.body;
    const [result] = await pool.query(
      "INSERT INTO items (name, description, price) VALUES (?, ?, ?)",
      [name, description, price]
    );
    const [rows] = await pool.query("SELECT * FROM items WHERE id = ?", [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create item" });
  }
});

// Update item
router.put("/:id", async (req, res) => {
  console.log(`PUT /api/items/${req.params.id} body:`, req.body);
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    await pool.query(
      "UPDATE items SET name = ?, description = ?, price = ? WHERE id = ?",
      [name, description, price, id]
    );
    const [rows] = await pool.query("SELECT * FROM items WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update item" });
  }
});

// Delete item
router.delete("/:id", async (req, res) => {
  console.log(`DELETE /api/items/${req.params.id}`);
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM items WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

export default router;
