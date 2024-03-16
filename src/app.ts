import express from 'express'
import connection from './database/config';
import { json, urlencoded } from 'body-parser';
import WeatherRoutes from "./routes/WeatherRoutes";

const app = express();
app.use(json());
app.use(urlencoded({extended:true}))
app.use("./weather", WeatherRoutes);

app.use((
    err:Error,
    req:express.Request,
    res:express.Response,
    next:express.NextFunction
) => {
    res.status(500).json({message:err.message});
});
app.listen(3000);