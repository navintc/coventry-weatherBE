import { Sequelize } from "sequelize-typescript";
import { WeatherModel } from "../models/WeatherModel";

// in this file the basic setting up for the database connection is made.
// I added these values to a seperate .env file to improve security

const connection = new Sequelize({
    dialect:"mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging:false,
    models:[WeatherModel],
})

export default connection;