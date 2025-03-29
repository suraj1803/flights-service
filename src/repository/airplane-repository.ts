import { eq } from "drizzle-orm";
import { db } from "../db";
import { Airplane, airplanes, airports, NewAirplane } from "../db/schema";

export class AirplaneRepository {
  static async createAirplane(airplaneData: NewAirplane) {
    try {
      const [airplane] = await db
        .insert(airplanes)
        .values(airplaneData)
        .returning();
      return airplane;
    } catch (error) {
      throw { error };
    }
  }

  static async getAirplane(id: string) {
    try {
      const airplane = await db.query.airplanes.findFirst({
        where: eq(airplanes.id, id),
      });
      return airplane;
    } catch (error) {
      throw { error };
    }
  }
}
