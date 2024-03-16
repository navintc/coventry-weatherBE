import { Sequelize } from "sequelize-typescript";
import { WeatherModel } from "../models/WeatherModel";

const connection = new Sequelize({
    dialect:"mysql",
    host:"localhost",
    username:"root",
    password:"sql_ps",
    logging:false,
    models:[WeatherModel],
})

export default connection;