const express = require('express');
const router = express.Router()
const WeatherModel = require('../models/WeatherModel');
const Redis = require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PW
});

async function emitAllData(io) {
    const keys = await redis.keys('*');
    const values = await Promise.all(keys.map(key => redis.get(key)));
    const allData = values.map(value => JSON.parse(value));
    io.emit('weather data', allData);
}

router.get('/weather', async(request,response)=>{
    const weatherData = await WeatherModel.findAll();

    response.status(200).json(weatherData);
});

router.post('/weather', async (request, response) => {
    const { location, locid, lat, lon, humidity, temperature, airpressure, content } = request.body;

    // Construct the data object for Redis and saving
    const weatherData = {
        location: location,
        locid: locid,
        lat: lat,
        lon: lon,
        content: content,
        humidity: humidity,
        temperature: temperature,
        airpressure: airpressure
    };

    try {
        // Save to Redis with locid as the key, the value should be stringified JSON
        await redis.set(locid, JSON.stringify(weatherData));

        // Build and save the new weather data to database
        const newWeatherData = WeatherModel.build(weatherData);
        await newWeatherData.save();

        // Emit the updated data after a successful save
        await emitAllData(request.io);

        response.status(201).json(newWeatherData);

    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Error saving weather data", error: error.message });
    }
});


router.get('/weatherid/:id', async (request,response)=>{
    const weatherData = await WeatherModel.findOne({
        where: {
            id:request.params.id
        }
    });

    response.status(200).json(weatherData)
});

router.patch('/weatherid/:id',async (request,response)=>{
    const weatherData = await WeatherModel.findOne({
        where: {
            id:request.params.id
        }
    });

    const {is_complete} = request.body;

    await weatherData.set(
        {
            is_complete:is_complete
        }
    )

    await weatherData.save();  

    response.status(200).json(weatherData);

});

router.put('/weatherid/:id', async(request,response)=>{
    const weatherData = await WeatherModel.findOne({
        where: {
            id:request.params.id
        }
    });

    const {is_complete,content,description} = request.body;

    await weatherData.set(
        {
            is_complete:is_complete,
            content:content,
            description:description
        }
    )

    await weatherData.save();  

    response.status(200).json(weatherData);
});

router.delete('/weatherid/:id', async(request,response)=>{
    const weatherData = await WeatherModel.findOne({
        where: {
            id:request.params.id
        }
    });

    await weatherData.destroy();

    response.status(204).json({});
});

module.exports = router;