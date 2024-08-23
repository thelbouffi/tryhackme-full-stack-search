import request from "supertest";
import app from "src/app";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient, ObjectId } from "mongodb";
import { getDb } from "src/config/database";

jest.mock("src/config/database");

let mongoServer: MongoMemoryServer;
let client: MongoClient;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({
    binary: {
      version: "7.0.3", // Version compatible with my machine Debian 12
    },
  });
  client = new MongoClient(mongoServer.getUri());
  await client.connect();
  const db = client.db("test-db");

  (getDb as jest.Mock).mockReturnValue(db);

  await db.collection("hotels").insertOne({
    _id: new ObjectId("60af75b30b5f4c69d1e56a43"),
    chain_name: "Chain Test",
    hotel_name: "Hotel Test",
    addressline1: "Address Test",
    addressline2: "",
    zipcode: "111111",
    city: "City Test",
    state: "State Test",
    country: "Country Test",
    countryisocode: "TS",
    star_rating: 5,
  });
});

afterAll(async () => {
  await client.close();
  await mongoServer.stop();
});

describe("Hotel Routes", () => {
  it("GET /hotels - should return a list of hotels", async () => {
    const response = await request(app).get("/hotels?page=1&pageSize=10");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body.body.data).toEqual([
      {
        _id: "60af75b30b5f4c69d1e56a43", // Use string format for comparison
        chain_name: "Chain Test",
        hotel_name: "Hotel Test",
        addressline1: "Address Test",
        addressline2: "",
        zipcode: "111111",
        city: "City Test",
        state: "State Test",
        country: "Country Test",
        countryisocode: "TS",
        star_rating: 5,
      },
    ]);
  });

  it("GET /hotels/:id - should return a hotel by ID", async () => {
    const response = await request(app).get("/hotels/60af75b30b5f4c69d1e56a43");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body.body).toEqual({
      _id: "60af75b30b5f4c69d1e56a43",
      chain_name: "Chain Test",
      hotel_name: "Hotel Test",
      addressline1: "Address Test",
      addressline2: "",
      zipcode: "111111",
      city: "City Test",
      state: "State Test",
      country: "Country Test",
      countryisocode: "TS",
      star_rating: 5,
    });
  });

  it("GET /hotels/:id - should return 404 if hotel is not found", async () => {
    const response = await request(app).get(`/hotels/${new ObjectId().toString()}`);

    expect(response.status).toBe(404);
    expect(response.body.status).toBe("Not Found");
    expect(response.body.message).toBe("Hotel not found");
  });
});

describe("Search Accommodations", () => {
  it("GET /hotels/search?q=test - should return search results", async () => {
    const response = await request(app).get("/hotels/search?q=Test");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body.body).toEqual({
      hotels: [
        {
          _id: "60af75b30b5f4c69d1e56a43", // Use string format for comparison
          chain_name: "Chain Test",
          hotel_name: "Hotel Test",
          addressline1: "Address Test",
          addressline2: "",
          zipcode: "111111",
          city: "City Test",
          state: "State Test",
          country: "Country Test",
          countryisocode: "TS",
          star_rating: 5,
        },
      ],
      countries: [],
      cities: [],
    });
  });

  it("GET /hotels/search?q= - should return 400 for empty query", async () => {
    const response = await request(app).get("/hotels/search?q=");

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Search query q must be at least 1 characters long");
  });

  it("GET /hotels/search - should return 400 for missing query", async () => {
    const response = await request(app).get("/hotels/search");

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Search query q is required");
  });

  it("GET /hotels/search?q=invalid!query - should return 400 for invalid characters", async () => {
    const response = await request(app).get("/hotels/search?q=invalid!query");

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe(
      "Query parameter can only contain regular characters (letters, numbers, and spaces)."
    );
  });

  it("GET /hotels/search?q=validquery - should return 200 for valid query", async () => {
    const response = await request(app).get("/hotels/search?q=Hotel");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body.body.hotels).toHaveLength(1);
    expect(response.body.body.hotels[0].hotel_name).toBe("Hotel Test");
  });

  it("GET /hotels/search?q=averylongquerythatexceedsthefiftycharacterlimitallowed - should return 400 for long query", async () => {
    const response = await request(app).get("/hotels/search?q=averylongquerythatexceedsthefiftycharacterlimitallowed");

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Search query q cannot be more than 50 characters long");
  });
})
