import { Client } from "@elastic/elasticsearch";

let esClient: Client | null = null;

export const connectToElasticsearch = (url: string) => {
  esClient = new Client({ node: url });
  console.log("Connected to Elasticsearch", !!esClient);
  return esClient;
};

export const getEsClient = () => {
  return esClient;
};

export const closeElasticsearchConnection = async () => {
  if (esClient) {
    await esClient.close();
    console.log("Elasticsearch connection closed");
  }
};
