import { Request, Response } from "express";
import { AirportService } from "../services/airport-service";
import { AirportRepository } from "../repository/airport-repository";

const airportService = new AirportService();

export const createAirport = async (req: Request, res: Response) => {
  const airport = await airportService.createAirport(req.body);
  try {
    res.status(201).json({
      success: true,
      data: airport,
      message: "Successfully created a airport",
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Not able to create a airport",
      err: { error },
    });
  }
};

export const deleteAirport = async (req: Request, res: Response) => {
  await airportService.deleteAirport(req.params.id);
  try {
    res.status(201).json({
      success: true,
      data: {},
      message: "Successfully deleted a airport",
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Not able to delete airport",
      err: { error },
    });
  }
};

export const updateAirport = async (req: Request, res: Response) => {
  try {
    const airport = await airportService.updateAirport(req.params.id, req.body);
    res.status(201).json({
      success: true,
      data: { airport },
      message: "Successfully updated a airport",
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Not able to udpate airport",
      err: { error },
    });
  }
};

export const getAirports = async (req: Request, res: Response) => {
  try {
    const airports = await airportService.getAirports(req.query);
    res.status(200).json({
      success: true,
      data: { airports },
      message: "Successfully fetched all airports",
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Not able to fetch airports",
      err: { error },
    });
  }
};

export const getAirport = async (req: Request, res: Response) => {
  try {
    const airport = await airportService.getAirport(req.params.id);
    res.status(201).json({
      success: true,
      data: { airport },
      message: "Successfully fetched airport",
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Not able to fetch airport",
      err: { error },
    });
  }
};

export const getCity = async (req: Request, res: Response) => {
  try {
    const city = await airportService.getCity(req.params.id);
    res.status(200).json({
      success: true,
      data: { city },
      message: "Successfully fetched city associated with ",
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Not able to fetch city",
      err: { error },
    });
  }
};
