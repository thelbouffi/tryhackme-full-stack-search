import express from "express";
import cors from "cors";
import hotelRoutes from "./modules/hotels/routes/hotelRoutes";
import cityRoutes from "./modules/cities/routes/cityRoutes";
import countryRoutes from "./modules/countries/routes/countryRoutes";
import { errorHandler } from "./middlewares/errorMiddleware";
import { dbConnectionMiddleware } from "./middlewares/dbConnectionMiddleware";
import { elasticsearchMiddleware } from "./middlewares/elasticSearchMiddleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use(dbConnectionMiddleware);

app.use(elasticsearchMiddleware);

app.use("/hotels", hotelRoutes);
app.use("/cities", cityRoutes);
app.use("/countries", countryRoutes);


app.use(errorHandler);

export default app;
