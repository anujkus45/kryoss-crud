import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "./db.js";
import itemsRouter from "./routes/items.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/items", itemsRouter);

app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 3000;

// Ensure DB table exists then start server
(async function init() {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) DEFAULT 0
      )`
    );

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to initialize server:", err);
    process.exit(1);
  }
})();

