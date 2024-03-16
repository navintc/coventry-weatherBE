import {Router} from "express";

import {
    createWeather, deleteWeather, getAllWeather, getWeatherById
} from "../controller/WeatherController";

const router = Router();

router.post("/", createWeather);
router.get("/", getAllWeather); 
router.get("/:id", getWeatherById);
router.delete("/:id", deleteWeather);

export default router;