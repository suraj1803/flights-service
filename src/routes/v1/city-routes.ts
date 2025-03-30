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

cityRouter.post("/", createCity);
cityRouter.get("/", getAllCities);
cityRouter.delete("/:id", deleteCity);
cityRouter.get("/:id", getCity);
cityRouter.get("/:id/airports", getAirports);
cityRouter.patch("/:id", updateCity);
