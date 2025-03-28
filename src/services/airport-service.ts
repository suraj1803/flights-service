import { Airport, NewAirPort } from "../db/schema";
import { AirportRepository } from "../repository/airport-repository";

export class AirportService {
  async createAirport(data: NewAirPort) {
    try {
      const airport = await AirportRepository.createAirport(data);
      return airport;
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw { error };
    }
  }

  async deleteAirport(id: string) {
    try {
      await AirportRepository.deleteAirport(id);
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw { error };
    }
  }

  async updateAirport(id: string, data: NewAirPort) {
    try {
      const airport = await AirportRepository.updateAirport(id, data);
      return airport;
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw { error };
    }
  }

  async getAirports(filter: Partial<{ name: string; limit: number }> = {}) {
    try {
      const airports = await AirportRepository.getAirports(filter);
      return airports;
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw { error };
    }
  }

  async getAirport(id: string) {
    try {
      const airport = await AirportRepository.getAirport(id);
      return airport;
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw { error };
    }
  }

  async getCity(id: string) {
    try {
      const city = await AirportRepository.getCity(id);
      return city;
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw { error };
    }
  }
}
