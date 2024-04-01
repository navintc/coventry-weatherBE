const {sequelize} = require('../database/Database')
const {DataTypes} = require('sequelize');

const WeatherModel = sequelize.define('Weather',{
    location:{
        type:DataTypes.STRING,
        validate:{
            max:20
        }
    },
    locid:{
        type:DataTypes.NUMBER,
    },
    lon:{
        type:DataTypes.FLOAT,
    },
    lat:{
        type:DataTypes.FLOAT,
    },
    humidity:{
        type:DataTypes.FLOAT,
    },
    temperature:{
        type:DataTypes.FLOAT,
    },
    airpressure:{
        type:DataTypes.FLOAT,
    },
    content:{
        type:DataTypes.STRING,
        validate:{
            max:20
        }
    },


})

module.exports = WeatherModel