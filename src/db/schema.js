"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.airplanes = exports.airportsRelation = exports.airports = exports.citiesRelation = exports.cities = void 0;
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
    city_id: (0, pg_core_1.uuid)("city_id")
        .references(function () { return exports.cities.id; }, { onDelete: "cascade" })
        .notNull(),
    createdAt: (0, pg_core_1.timestamp)({ mode: "date" }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)({ mode: "date" }).defaultNow().notNull(),
});
exports.airportsRelation = (0, drizzle_orm_1.relations)(exports.airports, function (_a) {
    var one = _a.one;
    return ({
        city: one(exports.cities, {
            fields: [exports.airports.city_id],
            references: [exports.cities.id],
        }),
    });
});
exports.airplanes = (0, pg_core_1.pgTable)("airplanes", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey().notNull(),
    model_number: (0, pg_core_1.varchar)("model_number").notNull(),
    capacity: (0, pg_core_1.integer)().default(200),
    createdAt: (0, pg_core_1.timestamp)({ mode: "date" }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)({ mode: "date" }).defaultNow().notNull(),
});
