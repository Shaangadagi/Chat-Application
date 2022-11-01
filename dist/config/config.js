"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGISTER_TOKEN_EXPIRE = exports.JWT_REGISTERKEY = exports.TOKEN_EXPIRE = exports.JWT_SCRETKEY = exports.DATABASE_PASSWORD = exports.DATABASE_USER = exports.DATABASE_NAME = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
exports.DATABASE_NAME = process.env.DATABASE_NAME;
exports.DATABASE_USER = process.env.DATABASE_USER;
exports.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
exports.JWT_SCRETKEY = process.env.JWT_SCRETKEY;
exports.TOKEN_EXPIRE = process.env.TOKEN_EXPIRE;
exports.JWT_REGISTERKEY = process.env.JWT_REGISTERKEY;
exports.REGISTER_TOKEN_EXPIRE = process.env.REGISTER_TOKEN_EXPIRE;
