const {sequelize} = require('../database/Database')
const {DataTypes} = require('sequelize');

const WeatherModel = sequelize.define('Weather',{
    location:{
        type:DataTypes.STRING,
        validate:{
            max:20
        }
    },
    locID:{
        type:DataTypes.NUMBER,
    },
    humidity:{
        type:DataTypes.FLOAT,
    },
    temperature:{
        type:DataTypes.FLOAT,
    },
    airPressure:{
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