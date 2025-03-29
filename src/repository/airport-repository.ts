import { eq, ilike } from "drizzle-orm";
import { db } from "../db";
import { airports, NewAirPort } from "../db/schema";

export class AirportRepository {
  static async createAirport(airportDetails: NewAirPort) {
    try {
      const [airport] = await db
        .insert(airports)
        .values(airportDetails)
        .returning();
      return airport;
    } catch (error) {
      throw { error };
    }
  }

  static async deleteAirport(id: string) {
    try {
      await db.delete(airports).where(eq(airports.id, id));
    } catch (error) {
      throw { error };
    }
  }

  static async updateAirport(id: string, airportDetails: NewAirPort) {
    try {
      const [newAirPort] = await db
        .update(airports)
        .set(airportDetails)
        .where(eq(airports.id, id))
        .returning();
      return newAirPort;
    } catch (error) {
      throw { error };
    }
  }

  static async getAirports(
    filter: Partial<{ name: string; limit: number }> = {},
  ) {
    try {
      const allAirports = await db.query.airports.findMany({
        where: filter.name
          ? ilike(airports.name, `${filter.name}%`)
          : undefined,
        limit: filter.limit ? Number(filter.limit) : NaN,
      });
      return allAirports;
    } catch (error) {
      throw { error };
    }
  }

  static async getAirport(id: string) {
    try {
      const airport = await db.query.airports.findFirst({
        where: eq(airports.id, id),
      });
      return airport;
    } catch (error) {
      throw { error };
    }
  }

  static async getCity(id: string) {
    try {
      const airport = await db.query.airports.findFirst({
        where: eq(airports.id, id),
        with: {
          city: true,
        },
      });
      return airport?.city!;
    } catch (error) {
      throw { error };
    }
  }
}
