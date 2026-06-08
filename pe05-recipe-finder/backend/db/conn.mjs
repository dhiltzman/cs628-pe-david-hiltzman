import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

if (!connectionString) {
  console.error("ATLAS_URI is not set. Check your config.env file.");
  process.exit(1);
}

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("Successfully connected to MongoDB Atlas.");
} catch (e) {
  console.error("Failed to connect to MongoDB:", e);
  process.exit(1);
}

let db = conn.db("hos08");

export default db;