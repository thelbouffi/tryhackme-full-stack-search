import { Request, Response, NextFunction } from "express";
import { connectToElasticsearch, getEsClient } from "../config/elasticsearch";

export const elasticsearchMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!getEsClient()) {
    connectToElasticsearch(process.env.ELASTICSEARCH_URL || "http://localhost:9200");
  }
  req.elasticsearch = getEsClient()!;
  next();
};