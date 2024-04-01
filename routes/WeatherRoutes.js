const express = require('express');
const router = express.Router()
const WeatherModel = require('../models/WeatherModel');



router.get('/weather', async(request,response)=>{
    const weatherData = await WeatherModel.findAll();

    response.status(200).json(weatherData);
});

router.post('/weather', async (request,response)=>{
    const {location, locid, lat, lon, humidity, temperature,
        airpressure, content} = request.body;

    const newWeatherData = WeatherModel.build({
        'location':location,
        'locid':locid,
        'lat':lat,
        'lon':lon,
        'content':content,
        'humidity':humidity,
        'temperature':temperature,
        'airpressure':airpressure,
        'content':content 
    })

    try{
        await newWeatherData.save()

        response.status(201).json(newWeatherData);
    }
    catch(error){
        response.json(error)
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