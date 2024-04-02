const express = require('express');
const apiRoutes = require('./routes/WeatherRoutes');
const {sequelize,connectToDb} = require('./database/Database');
const body_parser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use('/api',apiRoutes);

app.use((request,response)=>{
    response.status(404);
    response.json({message:"404: Not found"});
})


app.use((request,response)=>{
    response.status(500);
    response.json({message:"500: Something went wrong"});
})

app.get('/',(request,response)=>{
    response.status(200).json({message:"200: Success"})
})

app.listen(PORT , async ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    await connectToDb();
})