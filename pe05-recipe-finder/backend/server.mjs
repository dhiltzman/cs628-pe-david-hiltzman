import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import recipes from "./routes/recipe.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

// Allow requests from the React dev server (localhost:3000)
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Recipe Finder API is running." });
});

app.use("/recipe", recipes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "An unexpected error occurred." });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});