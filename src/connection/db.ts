require('dotenv').config();

import { Sequelize } from 'sequelize';

import {
	DATABASE_NAME,
	DATABASE_PASSWORD,
	DATABASE_USER,
} from '../config/config';

const sequelize = new Sequelize(
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    {
        host: '127.0.0.1',
        dialect: 'postgres',
        logging: false,
    },
);

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully database..');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;