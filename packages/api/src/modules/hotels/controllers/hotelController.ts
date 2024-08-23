import { ObjectId } from "mongodb";
import { getDb } from "src/config/database";
import { HttpError } from "src/utils/errors";

export const getHotels = async (page = 1, pageSize = 10) => {
  if (!Number(page) || !Number(pageSize)) {
    throw new HttpError(400, "Invalid query");
  }

  const db = getDb();

  if (!db) {
    throw new HttpError(500, "Database connection is not established");
  }

  const total = await db.collection("hotels").countDocuments();

  const hotels = await db
    .collection("hotels")
    .find({})
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  return { hotels, total };
};

export const searchAccommodations = async (q: string) => {
  const db = getDb();

  if (!db) {
    throw new HttpError(500, "Database connection is not established");
  }

  if (!q) {
    throw new HttpError(400, "Query parameter is required");
  }

  const searchKeyWord = q.trim().toLowerCase();

  // get hotels
  const hotels = await db
    .collection("hotels")
    .find({
      $or: [
        { hotel_name: { $regex: searchKeyWord, $options: "i" } },
        { city: { $regex: searchKeyWord, $options: "i" } },
        { country: { $regex: searchKeyWord, $options: "i" } },
      ],
    })
    .toArray();

  // get countries
  const countries = await db
    .collection("countries")
    .find({ country: { $regex: searchKeyWord, $options: "i" } })
    .toArray();

  // get cities
  const cities = await db
    .collection("cities")
    .find({ name: { $regex: searchKeyWord, $options: "i" } })
    .toArray();

  return { hotels, countries, cities };
};

export const getHotelById = async (id: string | undefined) => {
  if (!id || !ObjectId.isValid(id)) {
    throw new HttpError(400, "Invalid ID format");
  }

  const db = getDb();

  if (!db) {
    throw new HttpError(500, "Database connection is not established");
  }

  const hotel = await db
    .collection("hotels")
    .findOne({ _id: new ObjectId(id) });

  return hotel;
};
