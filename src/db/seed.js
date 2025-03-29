"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var index_1 = require("./index");
var schema_1 = require("./schema");
var crypto_1 = require("crypto");
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var citiesData, airportsData, airplanesData, i, cityId, j, i, airplaneId, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.db.delete(schema_1.cities)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, index_1.db.delete(schema_1.airports)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 6, 7, 8]);
                    citiesData = [];
                    airportsData = [];
                    airplanesData = [];
                    for (i = 0; i < 5; i++) {
                        cityId = (0, crypto_1.randomUUID)().toString();
                        citiesData.push({
                            id: cityId,
                            name: faker_1.faker.location.city(),
                        });
                        for (j = 0; j < 5; j++) {
                            airportsData.push({
                                id: (0, crypto_1.randomUUID)().toString(),
                                address: faker_1.faker.location.streetAddress(),
                                name: faker_1.faker.airline.airport().name,
                                city_id: cityId,
                            });
                        }
                    }
                    for (i = 0; i < 10; i++) {
                        airplaneId = (0, crypto_1.randomUUID)().toString();
                        airplanesData.push({
                            id: airplaneId,
                            model_number: faker_1.faker.airline.airplane().name,
                        });
                    }
                    return [4 /*yield*/, index_1.db.insert(schema_1.cities).values(citiesData).onConflictDoNothing()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, index_1.db.insert(schema_1.airports).values(airportsData).onConflictDoNothing()];
                case 5:
                    _a.sent();
                    //await db.insert(airplanes).values(airplanesData).onConflictDoNothing();
                    console.log("✅ Seeding completed successfully!");
                    return [3 /*break*/, 8];
                case 6:
                    error_1 = _a.sent();
                    console.error("❌ Seeding failed:", error_1);
                    return [3 /*break*/, 8];
                case 7:
                    process.exit(0);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
seed().then(function () {
    console.log("done");
});
