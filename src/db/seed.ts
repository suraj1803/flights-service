import { faker } from "@faker-js/faker";
import { db } from "./index";
import { cities, airports, NewAirPort, NewCity, City, Airport } from "./schema";
import { randomUUID } from "crypto";

async function seed() {
  await db.delete(cities);
  await db.delete(airports);
  try {
    let citiesData: NewCity[] = [];
    let airportsData: NewAirPort[] = [];

    for (let i = 0; i < 5; i++) {
      const cityId = randomUUID().toString();
      citiesData.push({
        id: cityId,
        name: faker.location.city(),
      });

      for (let j = 0; j < 5; j++) {
        airportsData.push({
          id: randomUUID().toString(),
          address: faker.location.streetAddress(),
          name: faker.airline.airport().name,
          city_id: cityId,
        });
      }
    }

    await db.insert(cities).values(citiesData).onConflictDoNothing();
    await db.insert(airports).values(airportsData).onConflictDoNothing();

    console.log("✅ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    process.exit(0);
  }
}

seed();
