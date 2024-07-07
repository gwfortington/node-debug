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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
let debug;
let debugLevel;
exports.default = {
    initialise: () => __awaiter(void 0, void 0, void 0, function* () {
        dotenv_1.default.config({ path: `${process.cwd()}/.debug.env` });
        debug = (process.env.DEBUG || 'false') == 'true';
        const debugLevelValue = Number(process.env.DEBUG_LEVEL || 'default');
        debugLevel = isNaN(debugLevelValue)
            ? Number.MAX_SAFE_INTEGER
            : debugLevelValue;
    }),
    write: (message, level = 1) => {
        if (debug && level <= debugLevel) {
            console.log(`[debug-${level}] ${message}`);
        }
    },
};
