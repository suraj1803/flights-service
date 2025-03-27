import express from "express";
import {
  createCity,
  deleteCity,
  getCity,
  updateCity,
  getAllCities,
} from "../../controllers";

export const v1ApiRoutes = express.Router();

v1ApiRoutes.post("/cities", createCity);
v1ApiRoutes.delete("/cities/:id", deleteCity);
v1ApiRoutes.get("/cities/:id", getCity);
v1ApiRoutes.get("/cities", getAllCities);
v1ApiRoutes.patch("/cities/:id", updateCity);
