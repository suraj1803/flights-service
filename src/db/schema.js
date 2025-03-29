"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flights = exports.airplanes = exports.airportsRelation = exports.airports = exports.citiesRelation = exports.cities = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_orm_1 = require("drizzle-orm");
exports.cities = (0, pg_core_1.pgTable)("cities", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    name: (0, pg_core_1.varchar)("name", { length: 256 }).unique().notNull(),
    createdAt: (0, pg_core_1.timestamp)({ mode: "date" }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)({ mode: "date" }).defaultNow().notNull(),
});
exports.citiesRelation = (0, drizzle_orm_1.relations)(exports.cities, function (_a) {
    var many = _a.many;
    return ({
        airports: many(exports.airports),
    });
});
exports.airports = (0, pg_core_1.pgTable)("airports", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    name: (0, pg_core_1.varchar)("name").notNull(),
    address: (0, pg_core_1.varchar)("address"),
    cityId: (0, pg_core_1.uuid)("city_id")
        .references(function () { return exports.cities.id; }, { onDelete: "cascade" })
        .notNull(),
    createdAt: (0, pg_core_1.timestamp)({ mode: "date" }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)({ mode: "date" }).defaultNow().notNull(),
});
exports.airportsRelation = (0, drizzle_orm_1.relations)(exports.airports, function (_a) {
    var one = _a.one;
    return ({
        city: one(exports.cities, {
            fields: [exports.airports.cityId],
            references: [exports.cities.id],
        }),
    });
});
exports.airplanes = (0, pg_core_1.pgTable)("airplanes", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    modelNumber: (0, pg_core_1.varchar)("model_number").notNull(),
    capacity: (0, pg_core_1.integer)().default(200).notNull(),
    createdAt: (0, pg_core_1.timestamp)({ mode: "date" }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)({ mode: "date" }).defaultNow().notNull(),
});
exports.flights = (0, pg_core_1.pgTable)("flights", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    flight_number: (0, pg_core_1.varchar)("flight_number").unique().notNull(),
    price: (0, pg_core_1.integer)().notNull(),
    airplaneId: (0, pg_core_1.uuid)("ariplan_id").notNull(),
    departureAirportId: (0, pg_core_1.uuid)("departure_airport_id").notNull(),
    arrivalAirportId: (0, pg_core_1.uuid)("arrival_airport_id").notNull(),
    departureTime: (0, pg_core_1.timestamp)("departure_time", { withTimezone: true }).notNull(),
    arrivalTime: (0, pg_core_1.timestamp)("arrival_time", { withTimezone: true }).notNull(),
    boardingGate: (0, pg_core_1.varchar)("boarding_gate"),
    totalSeats: (0, pg_core_1.integer)(),
    createdAt: (0, pg_core_1.timestamp)({ mode: "date" }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)({ mode: "date" }).defaultNow().notNull(),
});
