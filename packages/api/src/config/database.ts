import { MongoClient, Db } from "mongodb";

let mongoClient: MongoClient | null = null;
let db: Db | null = null;

export const connectToDatabase = async (url: string) => {
  mongoClient = new MongoClient(url);
  await mongoClient.connect();
  db = mongoClient.db();
  console.log("Connected to database", !!mongoClient);
  return db;
};

export const getDb = () => {
  return db;
};

export const closeDatabaseConnection = async () => {
  if (mongoClient) {
    await mongoClient.close()
    console.log("Database connection closed");
  }
};