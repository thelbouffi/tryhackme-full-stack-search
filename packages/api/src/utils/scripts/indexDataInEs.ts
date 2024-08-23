import { MongoClient } from "mongodb";
import { Client } from "@elastic/elasticsearch";

// MongoDB configuration
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:3002";
const mongoClient = new MongoClient(mongoUri);

// Elasticsearch configuration
const esClient = new Client({ node: process.env.ELASTICSEARCH_URL || "http://localhost:9200" });

async function indexCollection(collectionName: string, indexName: string) {
  const db = mongoClient.db();
  const collection = db.collection(collectionName);
  const documents = await collection.find().toArray();

  for (const doc of documents) {
    const { _id, ...body } = doc;  // Extract _id and store the rest of the document in "body"

    await esClient.index({
      index: indexName,
      id: _id.toString(),  // Use _id as the document ID in Elasticsearch
      body: body,          // Index the rest of the document
    });
  }

  console.log(`Indexed ${documents.length} documents from ${collectionName} into ${indexName}`);
}

async function indexData() {
  try {
    await mongoClient.connect();
    console.log("Connected to MongoDB");

    // Index hotels
    await indexCollection("hotels", "hotels");

    // Index countries
    await indexCollection("countries", "countries");

    // Index cities
    await indexCollection("cities", "cities");

    console.log("Indexing completed");
  } catch (error) {
    console.error("Error indexing data:", error);
  } finally {
    await mongoClient.close();
    console.log("MongoDB connection closed");
  }
}



indexData();
