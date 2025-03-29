import { NewFlight } from "../db/schema";
import { AirplaneRepository } from "../repository/airplane-repository";
import { FlightRepository } from "../repository/flight-repository";
import { compareDate } from "../utils";

export class FlightService {
  async createFlight(flightData: NewFlight) {
    try {
      if (!compareDate(flightData.departureTime, flightData.arrivalTime)) {
        throw { error: "Dparture time should be less than arrival time" };
      }
      const airplane = await AirplaneRepository.getAirplane(
        flightData.airplaneId,
      );
      const flight = await FlightRepository.createFilght({
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
}
