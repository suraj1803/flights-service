import { Router } from "express";
import {
  createAirport,
  deleteAirport,
  getAirport,
  getAirports,
  getCity,
  updateAirport,
} from "../../controllers/airport-controller";

export const airportRouter = Router();

airportRouter.get("/", getAirports);
airportRouter.get("/:id", getAirport);
airportRouter.post("/", createAirport);
airportRouter.delete("/:id", deleteAirport);
airportRouter.patch("/:id", updateAirport);
airportRouter.get("/:id/cities", getCity);
