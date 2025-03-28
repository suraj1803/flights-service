import express from "express";

import {
  createCity,
  deleteCity,
  getCity,
  updateCity,
  getAllCities,
  getAirports,
} from "../../controllers";

export const cityRouter = express.Router();

cityRouter.post("/cities", createCity);
cityRouter.delete("/cities/:id", deleteCity);
cityRouter.get("/cities/:id", getCity);
cityRouter.get("/cities", getAllCities);
cityRouter.get("/cities/:id/airports", getAirports);
cityRouter.patch("/cities/:id", updateCity);
