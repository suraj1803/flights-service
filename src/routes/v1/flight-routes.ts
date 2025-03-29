import { Router } from "express";
import { createFlight } from "../../controllers/flight-controller";

export const flightRouter = Router();
flightRouter.post("/", createFlight);
