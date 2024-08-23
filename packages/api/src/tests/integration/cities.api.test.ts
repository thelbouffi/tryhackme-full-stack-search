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
      version: '7.0.3'  // Version compatible with my machine Debian 12
    }
  });
  client = new MongoClient(mongoServer.getUri());
  await client.connect();
  const db = client.db("test-db");
  
  (getDb as jest.Mock).mockReturnValue(db); 

  await db.collection("cities").insertOne({
    _id: new ObjectId("60af75b30b5f4c69d1e56df4"),
    name: "Test City",
  });
});

afterAll(async () => {
  await client.close();
  await mongoServer.stop();
});

describe("GET /cities/:id", () => {
  it("should return a city for a valid ID", async () => {
    const response = await request(app).get("/cities/60af75b30b5f4c69d1e56df4");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body.body.name).toBe("Test City");
  });

  it("should return 404 if the city is not found", async () => {
    const response = await request(app).get("/cities/60af75b30b5f4c69d1e56df3");

    expect(response.status).toBe(404);
    expect(response.body.status).toBe("Not Found");
    expect(response.body.message).toBe("City not found");
  });

  it("should return 400 for an invalid ID", async () => {
    const response = await request(app).get("/cities/invalid-id");

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Invalid ID format");
  });
});
