//Express to run server and routes
const express = require('express');
require('dotenv').config();
//Start up an instance of app
const app = express();
/*Dependencies*/
const bodyParser = require('body-parser')

/* Middleware */
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//Cors
const cors = require('cors');
app.use(cors());

//Inicialize the main project folder
app.use(express.static('dist'));

//Get route
app.get('/', (req,res)=>{
    res.sendFile('dist/index.html')
})

app.post('/myTrips', (req,res)=>{
    const destination = req.body.destination;
    const dateStart = req.body.dateStart;
    const dateFinish = req.body.dateFinish;
    geonamesApi();
    weatherbitApi();
    
    const geonamesApi = ()=>{
        const url = `http://api.geonames.org/postalCodeSearchJSON?placename=${destination}&maxRows=10&username=${process.env.GEONAMES_USERNAME}`
        fetch(url)
        .then(response => response.json())
        .then(data => {
            latitud = data['postalCodes']['lat'];
            longitud = data['postalCodes']['lng'];
        })
        .catch(err => console.log('Something went wrong', err))
    }
    
    const weatherbitApi = ()=>{
        const urlWeatherbit = `https://api.weatherbit.io/v2.0/current?lat=${latitud}&lon=${longitud}&key=${process.env.WEATHERBIT_KEY}`;
        fetch(urlWeatherbit)
        .then(data => {
            weather = data['weather']['description'];
        })
    }
    res.send(destination);
})

const port = 3000;
const server = app.listen(port, listening);

function listening(){
    console.log(`running on localhost: ${port} `);
}