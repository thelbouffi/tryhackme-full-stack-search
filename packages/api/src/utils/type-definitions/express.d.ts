import { MongoClient, Db } from "mongodb";

declare global {
  namespace Express {
    interface Request {
      mongoClient: MongoClient;
      db: Db;
    }
  }
}
