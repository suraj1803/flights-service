"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var node_postgres_1 = require("drizzle-orm/node-postgres");
var configs_1 = require("../configs");
var schema = require("./schema");
exports.db = (0, node_postgres_1.drizzle)(configs_1.DB_URL, { schema: schema });
