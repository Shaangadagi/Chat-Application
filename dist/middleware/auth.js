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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const userModel_1 = __importDefault(require("../models/userModel"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get the token
        const token = req.cookies.jwt;
        console.log(token);
        //verify the token
        let verifyUser = (jsonwebtoken_1.default.verify(token, config_1.JWT_SCRETKEY));
        console.log(verifyUser);
        const users = yield userModel_1.default.findOne({ where: { id: verifyUser.userId } });
        console.log(users);
        req.token = token;
        req.user = users;
        next();
    }
    catch (error) {
        res.status(401).send(error);
    }
});
exports.auth = auth;
module.exports = {
    auth: exports.auth,
};
