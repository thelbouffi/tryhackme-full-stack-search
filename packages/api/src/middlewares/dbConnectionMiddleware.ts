import { Request, Response, NextFunction } from "express";
import { connectToDatabase, getDb } from "../config/database";

export const dbConnectionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let db = getDb();

    if (!db) {
      db = await connectToDatabase(process.env.DATABASE_URL as string);
    }
    
    next();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    next(error);
  }
};
