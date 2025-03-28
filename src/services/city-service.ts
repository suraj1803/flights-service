import { Airport, City, NewCity } from "../db/schema";
import { CityRepository } from "../repository";

export class CityService {
  async createCity(data: NewCity) {
    try {
      const city = await CityRepository.createCity(data.name);
      return city;
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw { error };
    }
  }

  async deleteCity(id: string) {
    try {
      await CityRepository.deleteCity(id);
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw { error };
    }
  }

  async updateCity(id: string, data: NewCity) {
    try {
      const city = await CityRepository.updateCity(id, data);
      return city;
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw { error };
    }
  }

  async getCity(id: string) {
    try {
      const city: City = await CityRepository.getCity(id);
      return city;
    } catch (error) {
      console.log("something went wrong in service layer");
      throw { error };
    }
  }

  async getAllCities(filter: Partial<{ name: string; limit: number }> = {}) {
    try {
      // TODO: we have to only pass name property from filter, like {name: filter. name}
      const cities = await CityRepository.getAllCities(filter);
      return cities;
    } catch (error) {
      console.log("something went wrong in service layer");
      throw { error };
    }
  }

  async getAirports(id: string) {
    try {
      const airports = await CityRepository.getAirports(id);
      return airports;
    } catch (error) {
      console.log("something went wrong in service layer");
      throw { error };
    }
  }
}
