import express from "express";
import bodyParser from "body-parser";

import { PORT } from "./configs";
import apiRoutes from "./routes";

const setUpAndStartServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
};

setUpAndStartServer();
