import {
  uuid,
  pgTable,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";

export const cities = pgTable("cities", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: varchar("name", { length: 256 }).unique().notNull(),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp({ mode: "date" }).defaultNow().notNull(),
});

export const citiesRelation = relations(cities, ({ many }) => ({
  airports: many(airports),
}));

export const airports = pgTable("airports", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: varchar("name").notNull(),
  address: varchar("address"),
  city_id: uuid("city_id")
    .references(() => cities.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp({ mode: "date" }).defaultNow().notNull(),
});

export const airportsRelation = relations(airports, ({ one }) => ({
  city: one(cities, {
    fields: [airports.city_id],
    references: [cities.id],
  }),
}));

export const airplanes = pgTable("airplanes", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  model_number: varchar("model_number").notNull(),
  capacity: integer().default(200),
  createdAt: timestamp({ mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp({ mode: "date" }).defaultNow().notNull(),
});

export type City = InferSelectModel<typeof cities>;
export type NewCity = InferInsertModel<typeof cities>;

export type Airport = InferSelectModel<typeof airports>;
export type NewAirPort = InferInsertModel<typeof airports>;

export type Airplane = InferSelectModel<typeof airplanes>;
export type NewAirplane = InferInsertModel<typeof airplanes>;
