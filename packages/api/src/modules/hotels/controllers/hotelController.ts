import { ObjectId } from "mongodb";
import { getDb } from "src/config/database";
import { getEsClient } from "src/config/elasticsearch";
import { HttpError } from "src/utils/errors";
import { Hotel, City, Country } from "@accommodations/shared-types";

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
        { state: { $regex: searchKeyWord, $options: "i" } },
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

export const searchAccommodationsByEs = async (q: string) => {
  const esClient = getEsClient();

  if (!esClient) {
    throw new HttpError(500, "Elasticsearch connection is not established");
  }

  if (!q) {
    throw new HttpError(400, "Query parameter is required");
  }

  const searchKeyWord = q.trim().toLowerCase();

  const wildCardPartialSearch = {
    index: ["hotels", "countries", "cities"], // Indices to search across
    body: {
      query: {
        bool: {
          should: [
            {
              bool: {
                should: [
                  { wildcard: { "hotel_name": `*${searchKeyWord}*` } },
                  { wildcard: { "city": `*${searchKeyWord}*` } },
                  { wildcard: { "country": `*${searchKeyWord}*` } },
                  { wildcard: { "state": `*${searchKeyWord}*` } },
                ]
              }
            },
            {
              wildcard: { "country": `*${searchKeyWord}*` }
            },
            {
              wildcard: { "name": `*${searchKeyWord}*` }
            }
          ]
        },
      },
      size: 50,
    },
  }

  const queryStringPartialSearch = {
    index: ["hotels", "countries", "cities"], // Indices to search across
    body: {
      query: {
        bool: {
          should: [
            {
              query_string: {
                query: `*${searchKeyWord.split(" ").join("* ")}*`, // Apply wildcards around and between the terms
                fields: ["hotel_name", "city", "country", "state", "name"], // Fields to search across
                default_operator: "AND", // Ensures all terms must match
                analyze_wildcard: true // Allows wildcard search
              }
            }
          ]
        }
      },
      size: 50, // Adjust the size as needed
    }
  }

  try {
    const result = await esClient.search(queryStringPartialSearch);

    // Extract results by index
    const hotels = result.hits.hits
      .filter((hit) => hit._index === "hotels")
      .map((hit) => Object.assign({ _id: hit._id }, hit._source));
    //.map((hit) => ({ _id: hit._id, (...hit._source as Hotel) }));

    const countries = result.hits.hits
      .filter((hit) => hit._index === "countries")
      .map((hit) => Object.assign({ _id: hit._id }, hit._source));
    //.map((hit) => ({ _id: hit._id, (...hit._source as Country) }));

    const cities = result.hits.hits
      .filter((hit) => hit._index === "cities")
      .map((hit) => Object.assign({ _id: hit._id }, hit._source));
    //.map((hit) => ({ _id: hit._id, ...hit._source }));

    return { hotels, countries, cities };
  } catch (error) {
    throw new HttpError(500, "Error occurred while searching accommodations");
  }
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
