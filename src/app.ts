import "dotenv/config";
import "reflect-metadata";
import express from "express";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { AppDataSource } from "./config/dataSource";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { JSONSchema4 } from "json-schema";
import path from "path";

const app = express();

// Adjust the path to the correct location of doc.yml
const swaggerDocumentPath = path.resolve(__dirname, "../doc.yml");
const swaggerDocument: JSONSchema4 = YAML.load(swaggerDocumentPath) as JSONSchema4;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
routes(app);
AppDataSource.initialize()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(errorHandler);

export default app;
