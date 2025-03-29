import { faker } from "@faker-js/faker";
import { db } from "./index";
import {
  cities,
  airports,
  NewAirPort,
  NewCity,
  airplanes,
  NewAirplane,
} from "./schema";
import { randomUUID } from "crypto";

async function seed() {
  await db.delete(cities);
  await db.delete(airports);
  await db.delete(airplanes);

  try {
    let citiesData: NewCity[] = [];
    let airportsData: NewAirPort[] = [];
    let airplanesData: NewAirplane[] = [];

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
          cityId: cityId,
        });
      }
    }

    for (let i = 0; i < 10; i++) {
      const airplaneId = randomUUID().toString();
      airplanesData.push({
        id: airplaneId!,
        modelNumber: faker.airline.airplane().name,
      });
    }

    await db.insert(cities).values(citiesData).onConflictDoNothing();
    await db.insert(airports).values(airportsData).onConflictDoNothing();
    await db.insert(airplanes).values(airplanesData).onConflictDoNothing();

    console.log("✅ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    process.exit(0);
  }
}

seed().then(() => {
  console.log("done");
});
