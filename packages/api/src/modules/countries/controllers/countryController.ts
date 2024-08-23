import { ObjectId } from "mongodb";
import { getDb } from "src/config/database";
import { HttpError } from "src/utils/errors";

export const getCountryById = async (id: string | undefined) => {
  if (!id || !ObjectId.isValid(id)) {
    throw new HttpError(400, "Invalid ID format");
  }

  const db = getDb();

  if (!db) {
    throw new HttpError(500, "Database connection is not established");
  }

  const country = await db
    .collection("countries")
    .findOne({ _id: new ObjectId(id) });

  return country;
};
