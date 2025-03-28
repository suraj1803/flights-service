import { CityService } from "../services";
import { Request, Response } from "express";

const cityService = new CityService();

export const createCity = async (req: Request, res: Response) => {
  try {
    const city = await cityService.createCity(req.body);
    res.status(201).json({
      success: true,
      data: city,
      message: "Successfully created a city",
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Not able to create a city",
      err: { error },
    });
  }
};

export const deleteCity = async (req: Request, res: Response) => {
  try {
    await cityService.deleteCity(req.params.id);
    res.status(201).json({
      success: true,
      data: {},
      message: "Successfully deleted a city",
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Not able to create the city",
      err: { error },
    });
  }
};

export const updateCity = async (req: Request, res: Response) => {
  try {
    const city = await cityService.updateCity(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: city,
      message: "Successfully updated city",
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Not able to update city",
      err: { error },
    });
  }
};

export const getCity = async (req: Request, res: Response) => {
  try {
    const city = await cityService.getCity(req.params.id);
    res.status(200).json({
      success: true,
      data: city,
      message: "Successfully fetched city",
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "Not able to fetch city",
      err: { error },
    });
  }
};

export const getAllCities = async (req: Request, res: Response) => {
  try {
    const cities = await cityService.getAllCities(req.query);
    res.status(200).json({
      success: true,
      data: cities,
      message: "Successfully fetched cities",
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: "Not able to fetch city",
      err: { error },
    });
  }
};

export const getAirports = async (req: Request, res: Response) => {
  try {
    const airports = await cityService.getAirports(req.params.id);
    res.status(200).json({
      success: true,
      data: airports,
      message: "Successfully fetched airports",
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Not able to fetch cities",
      err: { error },
    });
  }
};
