const readCountryName = require('./countries');
require('dotenv').config();
var Request = require("request");
//Express to run server and routes
const express = require('express');
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
    let destination = req.body.destination;
    let dateStart = req.body.dateStart;
    let dateFinish = req.body.dateFinish;
    let countryCode = req.body.country;
    let diferencia = req.body.diferencia;
    let lat = "";
    let long = "";
    let geoUrl = `http://api.geonames.org/postalCodeSearchJSON?placename=${destination}&maxRows=1&operator=AND&country=${countryCode}&username=${process.env.GEONAMES_USERNAME}`;
    Request.get(geoUrl, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        //Get latitude and longitude
        let geoNamesData = JSON.parse(body);      
        lat = geoNamesData.postalCodes[0].lat;
        long = geoNamesData.postalCodes[0].lng;        
        
        let weatherUrl = `https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${long}&key=${process.env.WEATHERBIT_KEY}`;
        Request.get(weatherUrl, (error2, response2, body2) => {
            if(error2) {
                return console.dir(error2);
            }
            //Get weather information
            let weatherData = JSON.parse(body2);
            weatherTemp = weatherData.data[0].temp;
            weatherDescription = weatherData.data[0].weather.description;
                if(error2){
                    return console.dir(error3);
                }
            let destinationReplace = destination.replace(', ','+');
            let pixabayUrl = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${destinationReplace}+${countryCode}&image_type=photo&orientation=horizontal&page=1&per_page=3`;
            Request.get(pixabayUrl, (error3, response3, body3) => {
                if(error3){
                    return console.dir(error3);
                }
                //Get pixar information
                let pixarData = JSON.parse(body3);
                let pixar = "";
                if(pixarData.hits != null && pixarData.hits.length > 0 && pixarData.hits[0].webformatURL != null && pixarData.hits[0].webformatURL.length > 0){
                    pixar = pixarData.hits[0].webformatURL;
                    let info = {
                        "weatherTemp":weatherTemp,
                        "weatherDescription":weatherDescription,
                        "imageWeb":pixar,
                        "destination": destination,
                        "country": countryCode,
                        "dateStart": dateStart,
                        "dateFinish": dateFinish,
                        "diferencia": diferencia
                    }
                    res.send(info); //Info enviada al cliente
                }else{
                    let country = readCountryName(countryCode);
                    
                    pixarCountryUrl = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${country}&image_type=photo&orientation=horizontal&page=1&per_page=3`;
                    
                    Request.get(pixarCountryUrl, (error4,response4, body4) => {
                        if(error4){
                            return console.dir(error4);
                        }
                        //Get pixar information
                        let pixarData2 = JSON.parse(body4);
                        pixar = pixarData2.hits[0].webformatURL;

                        let info = {
                            "weatherTemp":weatherTemp,
                            "weatherDescription":weatherDescription,
                            "imageWeb":pixar,
                            "destination": destination,
                            "country": countryCode,
                            "dateStart": dateStart,
                            "dateFinish": dateFinish,
                            "diferencia": diferencia
                        }
                        res.send(info); //Info enviada al cliente
                    })
                }
            });
        });
    });
})

const port = 3000;
const server = app.listen(port, listening);

function listening(){
    console.log(`running on localhost: ${port}`);
}