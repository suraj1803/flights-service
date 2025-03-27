import { drizzle } from "drizzle-orm/node-postgres";
import { DB_URL } from "../configs";
import * as schema from "./schema";

export const db = drizzle(DB_URL, { schema });
