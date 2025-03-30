import { Router } from "express";
import { createFlight, getFlights } from "../../controllers/flight-controller";

export const flightRouter = Router();
flightRouter.post("/", createFlight);
flightRouter.get("/", getFlights);
