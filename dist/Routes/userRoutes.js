"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
exports.userRoutes = express_1.default.Router();
exports.userRoutes.route('/').post(userController_1.registerUser);
exports.userRoutes.route('/login').post(userController_1.login);
exports.userRoutes.route('/').get(auth_1.auth, userController_1.getAllUsers);
exports.default = exports.userRoutes;
