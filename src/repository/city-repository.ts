import { eq, ilike } from "drizzle-orm";
import { db } from "../db";
import { cities, City, NewCity } from "../db/schema";

export class CityRepository {
  static async createCity(name: string) {
    try {
      const [city] = await db.insert(cities).values({ name }).returning();
      return city;
    } catch (error) {
      throw { error };
    }
  }

  static async deleteCity(id: string) {
    try {
      await db.delete(cities).where(eq(cities.id, id));
    } catch (error) {
      throw { error };
    }
  }

  static async getCity(id: string) {
    try {
      const [city] = await db.select().from(cities).where(eq(cities.id, id));
      return city;
    } catch (error) {
      throw { error };
    }
  }

  static async updateCity(id: string, city: NewCity) {
    try {
      const [newCity] = await db
        .update(cities)
        .set({ ...city, updatedAt: new Date() })
        .where(eq(cities.id, id))
        .returning();
      return newCity;
    } catch (error) {
      throw { error };
    }
  }

  static async getAllCities(
    filter: Partial<{ name: string; limit: number }> = {},
  ) {
    try {
      const allCities: City[] = await db
        .select()
        .from(cities)
        .where(filter.name ? ilike(cities.name, `${filter.name}%`) : undefined)
        .limit(filter.limit ? Number(filter.limit) : NaN);
      return allCities;
    } catch (error) {
      throw { error };
    }
  }

  static async getAirports(id: string) {
    try {
      const citiesRes = await db.query.cities.findFirst({
        where: eq(cities.id, id),
        with: {
          airports: true,
        },
      });
      return citiesRes?.airports || [];
    } catch (error) {
      throw { error };
    }
  }
}
