# CS628 Full-Stack Development - Web
# Term: Spring 2026
# Author: David Hiltzman
# Assignment: PE05

## Overview

The input-process-output (IPO) model is a widely used approach in systems analysis and software engineering for describing the structure of an information processing program or another process. Many introductory programming and systems analysis texts introduce this as the most basic structure for describing a process.

## Discussion

A computer program or any other sort of process using the input-process-output model receives inputs from a user or other source, does some computations on the inputs, and returns the results of the computations. The system divides the work into three categories:

- A requirement from the environment (input)
- A computation based on the requirement (process)
- A provision for the environment (output)

### Example: Recipe Finder Full-Stack Web Application

This project is a full-stack Recipe Finder application built with a React frontend and a Node.js/Express backend connected to a MongoDB Atlas database. Users can browse a searchable list of recipes, view full recipe details, add new recipes, edit existing ones, and delete recipes they no longer need. The UI follows a two-panel layout with a sidebar recipe list and a main detail panel.

Following the IPO model, the program must:

1. **Input:** The user provides recipe data (name, description, category, difficulty, prep time, cook time, servings, ingredients, instructions, notes) through a form in the React frontend, or interacts with the app by selecting, searching, editing, or deleting recipes. The backend receives HTTP requests (GET, POST, PATCH, DELETE) carrying this data.

2. **Process:** The Express server routes each request to the appropriate handler in `recipe.mjs`. For reads, it queries the MongoDB `recipes` collection and projects the relevant fields. For writes, it validates required fields, constructs a document with timestamps, and performs the corresponding MongoDB operation (`insertOne`, `updateOne`, `deleteOne`). The React frontend processes the API responses, updates local state, filters recipes by the user's search term, and renders the appropriate component.

3. **Output:** The frontend renders the recipe list in the sidebar, displays full recipe details (ingredients, instructions, notes, metadata) in the main panel, and confirms destructive actions via a browser dialog. The backend responds with structured JSON -- either the requested data, a success message, or a descriptive error with an appropriate HTTP status code.

## Pseudocode

```
Function Main (Recipe Finder Application)
    -- Full-stack CRUD app for managing recipes
    -- Backend: Node.js + Express + MongoDB Atlas
    -- Frontend: React with React Router

    -- SERVER STARTUP
    Load environment variables from config.env
    Connect MongoClient to ATLAS_URI -> database "hos08"
    Register Express middleware: CORS, JSON body parser
    Mount recipe router at /recipe
    Listen on PORT (default 5050)

    -- RECIPE ROUTER (recipe.mjs)

    Function GET /recipe
        Query recipes collection, project summary fields
        Output JSON array of recipe summaries

    Function GET /recipe/:id
        Declare ObjectId id = req.params.id
        Query recipes collection for matching _id
        If not found -> Output 404 error
        Else -> Output full recipe JSON

    Function POST /recipe
        Declare String name = req.body.name  (required)
        Declare String description, category, prepTime, cookTime
        Declare Number servings
        Declare Array ingredients, instructions
        Validate name is present
        Assign newRecipe = { name, description, category, prepTime,
                             cookTime, servings, ingredients,
                             instructions, createdAt, updatedAt }
        Insert newRecipe into recipes collection
        Output 201 JSON with insertedId and recipe data

    Function PATCH /recipe/:id
        Declare Object updates = fields present in req.body
        Assign updates.updatedAt = current timestamp
        Update matching recipe document with $set updates
        If not found -> Output 404 error
        Else -> Output success message

    Function DELETE /recipe/:id
        Delete recipe document matching _id
        If not found -> Output 404 error
        Else -> Output success message

    -- REACT FRONTEND

    Function RecipeList
        Declare Array recipes = []
        Declare String search = ""
        Fetch GET /recipe on mount -> Assign recipes
        Assign filtered = recipes where name or category matches search
        Output sidebar list of NavLinks + Outlet for detail panel

    Function RecipeDetail
        Declare String id = URL param
        Fetch GET /recipe/:id on mount -> Assign recipe
        On delete: confirm dialog -> DELETE /recipe/:id -> navigate home
        Output recipe name, meta, ingredients list, instructions, notes

    Function AddRecipe
        Collect form data via RecipeForm
        On submit: POST /recipe with form data
        On success: navigate to new recipe detail page
        Output success redirect or error message

    Function EditRecipe
        Fetch GET /recipe/:id on mount -> Assign initialData
        Collect edits via RecipeForm pre-filled with initialData
        On submit: PATCH /recipe/:id with updated data
        On success: navigate to recipe detail page
        Output success redirect or error message
End
```

## Output

```
-- Server console on startup:
Successfully connected to MongoDB Atlas.
Server is running on port: 5050

-- GET /recipe (list all)
[
  { "_id": "...", "name": "Spaghetti Carbonara", "description": "...", "prepTime": "10 mins", "cookTime": "20 mins", "servings": 4 },
  { "_id": "...", "name": "Chicken Tikka Masala", "description": "...", "prepTime": "20 mins", "cookTime": "40 mins", "servings": 4 },
  { "_id": "...", "name": "Blueberry Buttermilk Pancakes", "description": "...", "prepTime": "10 mins", "cookTime": "20 mins", "servings": 4 }
]

-- GET /recipe/:id (single recipe detail)
{
  "_id": "...",
  "name": "Spaghetti Carbonara",
  "description": "A classic Roman pasta dish with eggs, cheese, and pancetta.",
  "category": "Dinner",
  "prepTime": "10 mins",
  "cookTime": "20 mins",
  "servings": 4,
  "difficulty": "Medium",
  "ingredients": ["400g spaghetti", "200g pancetta or guanciale", "..."],
  "instructions": "1. Bring a large pot of salted water...",
  "notes": "Never add cream...",
  "createdAt": "2026-06-08T00:00:00.000Z",
  "updatedAt": "2026-06-08T00:00:00.000Z"
}

-- POST /recipe (create)
{ "insertedId": "...", "name": "New Recipe", ... }

-- PATCH /recipe/:id (update)
{ "message": "Recipe updated successfully.", "modifiedCount": 1 }

-- DELETE /recipe/:id
{ "message": "Recipe deleted successfully." }

-- React UI:
Sidebar: displays count of recipes + search bar + list of recipe names
Main panel: displays full recipe detail with Edit and Delete buttons
Add page: form with all recipe fields, ingredient tag builder
Edit page: same form pre-filled with existing recipe data
```

## References

1. MongoDB Documentation. *Node.js Driver - CRUD Operations*. https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/
2. Express.js Documentation. *Routing*. https://expressjs.com/en/guide/routing.html
3. React Documentation. *React Router - Outlet and Nested Routes*. https://reactrouter.com/en/main/components/outlet
4. Anthropic. *Claude AI Assistant*. https://www.anthropic.com -- used for development assistance