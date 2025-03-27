import express from "express";
const apiRoutes = express.Router();

import { v1ApiRoutes } from "./v1";

apiRoutes.use("/v1", v1ApiRoutes);

export default apiRoutes;
