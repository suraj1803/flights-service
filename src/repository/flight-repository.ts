import { db } from "../db";
import { flights, NewFlight } from "../db/schema";

export class FlightRepository {
  static async createFilght(flightData: NewFlight) {
    try {
      const [flight] = await db.insert(flights).values(flightData).returning();
      return flight;
    } catch (error) {
      throw { error };
    }
  }
}
