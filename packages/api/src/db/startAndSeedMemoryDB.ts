import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { cities } from "./seeds/cities.js";
import { countries } from "./seeds/countries";
import { hotels } from "./seeds/hotels";

const mongod = await MongoMemoryServer.create({
  instance: {
    port: 3002,
  },
  binary: {
    version: '7.0.3'  // Specify a version compatible with Debian 12
  }
});
console.log("MongoMemoryServer started on", mongod.getUri());

const uri = mongod.getUri();

process.env.DATABASE_URL = uri;

const client = new MongoClient(uri);
try {
  await client.connect();
  const db = client.db();
  await db.collection("cities").insertMany(cities);
  await db.collection("countries").insertMany(countries);
  await db.collection("hotels").insertMany(hotels);

  // create indexes for performent queries
   await db.collection("hotels").createIndex({ hotel_name: "text", city: "text", state: "text", country: "text" });
   await db.collection("countries").createIndex({ country: "text" });
   await db.collection("cities").createIndex({ name: "text" });
   console.log('Indexes created successfully');
   
} catch (error) {
  console.error("Error seeding database:", error);
} finally {
  await client.close();
}

process.on('SIGTERM', async () => {
  await mongod.stop();
  process.exit(0);
});
