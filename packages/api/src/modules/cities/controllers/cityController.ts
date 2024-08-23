import { ObjectId } from "mongodb";
import { getDb } from "src/config/database";
import {HttpError} from "src/utils/errors";

export const getCityById = async (id: string | undefined) => {
  if (!id || !ObjectId.isValid(id)) {
    throw new HttpError(400, "Invalid ID format");
  }

  const db = getDb();

  if (!db) {
    throw new HttpError(500, "Database connection is not established");
  }

  const city = await db.collection("cities").findOne({ _id: new ObjectId(id) });

  return city;
};
