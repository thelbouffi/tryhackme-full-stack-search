import { Client } from "@elastic/elasticsearch";

declare global {
  namespace Express {
    interface Request {
      elasticsearch: Client;
    }
  }
}
