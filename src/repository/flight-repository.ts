import { and, eq, gte, lte, SQLWrapper } from "drizzle-orm";
import { db } from "../db";
import { flights, NewFlight } from "../db/schema";
import { validate } from "uuid";

export type FlightFilter = Partial<{
  arrivalAirportId: string;
  departureAirportId: string;
  minPrice: number;
  maxPrice: number;
}>;

export class FlightRepository {
  #filters: SQLWrapper[] = [];

  #createFilters(filter: FlightFilter) {
    if (filter.departureAirportId && validate(filter.departureAirportId))
      this.#filters.push(
        eq(flights.departureAirportId, filter.departureAirportId),
      );

    if (filter.arrivalAirportId)
      this.#filters.push(eq(flights.arrivalAirportId, filter.arrivalAirportId));

    if (filter.minPrice)
      this.#filters.push(gte(flights.price, filter.minPrice));

    if (filter.maxPrice)
      this.#filters.push(lte(flights.price, filter.maxPrice));
  }

  async createFilght(flightData: NewFlight) {
    try {
      const [flight] = await db.insert(flights).values(flightData).returning();
      return flight;
    } catch (error) {
      throw { error };
    }
  }

  async getFlight(id: string) {
    try {
      const flight = await db.query.flights.findFirst({
        where: eq(flights.id, id),
      });

      return flight;
    } catch (error) {
      throw { error };
    }
  }

  async getFlights(filter: FlightFilter = {}) {
    try {
      this.#filters = [];
      this.#createFilters(filter);
      console.log(filter);
      const flightsResult = await db.query.flights.findMany({
        where: this.#filters.length !== 0 ? and(...this.#filters) : undefined,
      });
      return flightsResult;
    } catch (error) {
      throw { error };
    }
  }
}
