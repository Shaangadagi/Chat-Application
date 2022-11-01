"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
const sequelize = new sequelize_1.Sequelize(config_1.DATABASE_NAME, config_1.DATABASE_USER, config_1.DATABASE_PASSWORD, {
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
});
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully database..');
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}
exports.default = sequelize;
