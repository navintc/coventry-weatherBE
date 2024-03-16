import { RequestHandler } from "express";
import { WeatherModel } from "../models/WeatherModel";


//in this code, each CRUD operations are declared expect for update
//I did not add 'update' beacuse in this app it should not be allowed. 
export const createWeather: RequestHandler = async (req, res, next) => {
    var weather = await WeatherModel.create({...req.body });
    return res
        .status(200)
        .json({message: "Weather entry ceated successfully", data: weather});
};

export const deleteWeather:RequestHandler = async(req, res, next) => {
    const { id } = req.params;
    const deletedWeather: WeatherModel|null = await WeatherModel.findByPk(id);
    await WeatherModel.destroy({where:{id}});
    return res.status(200).json({message:"Weather entry deleted successfully", data: deleteWeather});    
}

export const getAllWeather: RequestHandler = async(req, res, next) => {
    const allWeather: WeatherModel[] = await WeatherModel.findAll();
    return res.status(200).json({message: "Weather fetched successfully", data:allWeather})
}

export const getWeatherById:RequestHandler = async(req, res, next) => {
    const {id} = req.params;
    const weather:WeatherModel | null = await WeatherModel.findByPk(id)
    return res.status(200).json({message: "Got the weather successfully", data:weather})
} 