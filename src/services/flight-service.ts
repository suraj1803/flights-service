import { NewFlight } from "../db/schema";
import { AirplaneRepository } from "../repository/airplane-repository";
import {
  FlightFilter,
  FlightRepository,
} from "../repository/flight-repository";
import { compareDate } from "../utils";

export class FlightService {
  flightRepository: FlightRepository;

  constructor() {
    this.flightRepository = new FlightRepository();
  }

  async createFlight(flightData: NewFlight) {
    try {
      if (!compareDate(flightData.departureTime, flightData.arrivalTime)) {
        throw { error: "Arrival time cannot be lesser than departure time" };
      }
      const airplane = await AirplaneRepository.getAirplane(
        flightData.airplaneId,
      );
      const flight = await this.flightRepository.createFilght({
        ...flightData,
        arrivalTime: new Date(flightData.arrivalTime),
        departureTime: new Date(flightData.departureTime),
        price: Number(flightData.price),
        totalSeats: Number(airplane?.capacity!),
      });
      return flight;
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw { error };
    }
  }

  async getFlights(filter: FlightFilter) {
    try {
      const flights = await this.flightRepository.getFlights(filter);
      return flights;
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw { error };
    }
  }
}
