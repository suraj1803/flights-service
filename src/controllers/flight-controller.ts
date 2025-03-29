import { Request, Response } from "express";
import { FlightService } from "../services/flight-service";
const flightService = new FlightService();
export const createFlight = async (req: Request, res: Response) => {
  try {
    const flight = await flightService.createFlight(req.body);
    res.status(201).json({
      success: true,
      data: flight,
      message: "Successfully initiated a flight",
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Not able to initiate a flight",
      err: { error },
    });
  }
};
