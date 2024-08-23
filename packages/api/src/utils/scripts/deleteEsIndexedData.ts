import { MongoClient } from "mongodb";
import { Client } from "@elastic/elasticsearch";

// Elasticsearch configuration
const esClient = new Client({ node: process.env.ELASTICSEARCH_URL || "http://localhost:9200" });


async function deleteByQuery(indexName: string) {
  try {
    const response = await esClient.deleteByQuery({
      index: indexName,
      body: {
        query: {
          match_all: {}
        }
      }
    });
    console.log(`Deleted documents from index: ${indexName}`, response);
  } catch (error) {
    console.error(`Error deleting documents from index ${indexName}:`, error);
  }
}

deleteByQuery("hotels");
deleteByQuery("countries");
deleteByQuery("cities");