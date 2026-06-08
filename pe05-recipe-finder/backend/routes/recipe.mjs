import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// -------------------------------------------------------
// GET /recipe
// Returns all recipes (summary view for the list page)
// -------------------------------------------------------
router.get("/", async (req, res) => {
  try {
    const collection = db.collection("recipes");
    const results = await collection
      .find({})
      .project({ name: 1, description: 1, cuisine: 1, prepTime: 1, cookTime: 1, servings: 1 })
      .toArray();
    res.status(200).json(results);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch recipes." });
  }
});

// -------------------------------------------------------
// GET /recipe/:id
// Returns a single recipe's full details
// -------------------------------------------------------
router.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("recipes");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) {
      return res.status(404).json({ error: "Recipe not found." });
    }
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch recipe." });
  }
});

// -------------------------------------------------------
// POST /recipe
// Creates a new recipe
// Expected body fields:
//   name         (string, required)
//   description  (string)
//   cuisine      (string)
//   prepTime     (number, minutes)
//   cookTime     (number, minutes)
//   servings     (number)
//   ingredients  (array of strings)
//   instructions (array of strings, one step per item)
// -------------------------------------------------------
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      cuisine,
      prepTime,
      cookTime,
      servings,
      ingredients,
      instructions,
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Recipe name is required." });
    }

    const newRecipe = {
      name,
      description: description || "",
      cuisine: cuisine || "",
      prepTime: Number(prepTime) || 0,
      cookTime: Number(cookTime) || 0,
      servings: Number(servings) || 1,
      ingredients: Array.isArray(ingredients) ? ingredients : [],
      instructions: Array.isArray(instructions) ? instructions : [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const collection = db.collection("recipes");
    const result = await collection.insertOne(newRecipe);

    res.status(201).json({ insertedId: result.insertedId, ...newRecipe });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create recipe." });
  }
});

// -------------------------------------------------------
// PATCH /recipe/:id
// Updates an existing recipe (partial update)
// -------------------------------------------------------
router.patch("/:id", async (req, res) => {
  try {
    const {
      name,
      description,
      cuisine,
      prepTime,
      cookTime,
      servings,
      ingredients,
      instructions,
    } = req.body;

    const updates = {};
    if (name !== undefined)         updates.name         = name;
    if (description !== undefined)  updates.description  = description;
    if (cuisine !== undefined)      updates.cuisine      = cuisine;
    if (prepTime !== undefined)     updates.prepTime     = Number(prepTime);
    if (cookTime !== undefined)     updates.cookTime     = Number(cookTime);
    if (servings !== undefined)     updates.servings     = Number(servings);
    if (ingredients !== undefined)  updates.ingredients  = Array.isArray(ingredients) ? ingredients : [];
    if (instructions !== undefined) updates.instructions = Array.isArray(instructions) ? instructions : [];
    updates.updatedAt = new Date();

    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("recipes");
    const result = await collection.updateOne(query, { $set: updates });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Recipe not found." });
    }

    res.status(200).json({ message: "Recipe updated successfully.", modifiedCount: result.modifiedCount });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update recipe." });
  }
});

// -------------------------------------------------------
// DELETE /recipe/:id
// Deletes a recipe by ID
// -------------------------------------------------------
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("recipes");
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Recipe not found." });
    }

    res.status(200).json({ message: "Recipe deleted successfully." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to delete recipe." });
  }
});

export default router;