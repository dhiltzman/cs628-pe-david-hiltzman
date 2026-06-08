import "./loadEnvironment.mjs";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.ATLAS_URI);

const recipes = [
  {
    name: "Spaghetti Carbonara",
    description: "A classic Roman pasta dish with eggs, cheese, and pancetta.",
    category: "Dinner",
    prepTime: "10 mins",
    cookTime: "20 mins",
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      "400g spaghetti",
      "200g pancetta or guanciale",
      "4 large eggs",
      "100g Pecorino Romano, grated",
      "100g Parmesan, grated",
      "2 cloves garlic",
      "Salt and black pepper to taste",
    ],
    instructions: `1. Bring a large pot of salted water to a boil and cook spaghetti until al dente.
2. Fry pancetta with garlic in a large pan over medium heat until crispy. Remove garlic.
3. Whisk eggs with grated cheeses and a generous amount of black pepper in a bowl.
4. Reserve 1 cup of pasta water before draining.
5. Add hot pasta to the pancetta pan off the heat. Pour egg mixture over and toss quickly.
6. Add pasta water a splash at a time until sauce is silky. Serve immediately.`,
    notes: "Never add cream. The heat from the pasta cooks the eggs — work quickly off the heat to avoid scrambling.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Chicken Tikka Masala",
    description: "Tender marinated chicken in a rich, spiced tomato cream sauce.",
    category: "Dinner",
    prepTime: "20 mins",
    cookTime: "40 mins",
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      "700g boneless chicken thighs, cubed",
      "1 cup plain yogurt",
      "2 tsp garam masala",
      "1 tsp cumin",
      "1 tsp turmeric",
      "1 tsp paprika",
      "1 can (400g) crushed tomatoes",
      "1 cup heavy cream",
      "1 large onion, diced",
      "4 cloves garlic, minced",
      "1 tbsp fresh ginger, grated",
      "2 tbsp butter",
      "Salt to taste",
      "Fresh cilantro to garnish",
    ],
    instructions: `1. Marinate chicken in yogurt, half the spices, and salt for at least 1 hour (overnight is best).
2. Grill or broil chicken until slightly charred, about 10 minutes. Set aside.
3. Melt butter in a large pan. Sauté onion until golden, about 8 minutes.
4. Add garlic and ginger, cook 2 minutes. Add remaining spices and cook 1 minute more.
5. Stir in crushed tomatoes and simmer 15 minutes.
6. Add cream and chicken. Simmer 10 minutes until sauce thickens.
7. Garnish with cilantro and serve with basmati rice or naan.`,
    notes: "Marinating overnight dramatically improves flavor. Chicken thighs stay juicier than breasts.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Blueberry Buttermilk Pancakes",
    description: "Fluffy weekend pancakes loaded with fresh blueberries.",
    category: "Breakfast",
    prepTime: "10 mins",
    cookTime: "20 mins",
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      "2 cups all-purpose flour",
      "2 tbsp sugar",
      "2 tsp baking powder",
      "1/2 tsp baking soda",
      "1/2 tsp salt",
      "2 cups buttermilk",
      "2 large eggs",
      "3 tbsp melted butter",
      "1 tsp vanilla extract",
      "1 cup fresh blueberries",
      "Butter and maple syrup to serve",
    ],
    instructions: `1. Whisk flour, sugar, baking powder, baking soda, and salt in a large bowl.
2. In a separate bowl whisk buttermilk, eggs, melted butter, and vanilla.
3. Pour wet ingredients into dry and stir until just combined — lumps are fine. Do not overmix.
4. Fold in blueberries gently.
5. Heat a non-stick pan or griddle over medium heat and lightly butter it.
6. Pour 1/3 cup batter per pancake. Cook until bubbles form and edges look set, about 2-3 minutes.
7. Flip and cook another 1-2 minutes until golden. Serve with butter and maple syrup.`,
    notes: "Let the batter rest 5 minutes before cooking for fluffier results. Frozen blueberries work too — don't thaw them first.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

try {
  await client.connect();
  console.log("Connected to MongoDB Atlas.");

  const db = client.db("recipe_finder");
  const collection = db.collection("recipes");

  const result = await collection.insertMany(recipes);
  console.log(`Successfully inserted ${result.insertedCount} recipes.`);
  console.log("IDs:", result.insertedIds);
} catch (e) {
  console.error("Seed failed:", e.message);
} finally {
  await client.close();
}