import express from "express";
import { airportRouter } from "./airport-routes";
import { cityRouter } from "./city-routes";

export const v1ApiRoutes = express.Router();

v1ApiRoutes.use("/cities", cityRouter);
v1ApiRoutes.use("/airports", airportRouter);
