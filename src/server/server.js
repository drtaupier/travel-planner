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

// app.post('/mytrips', (req,res)=>{

// })

const port = 3000;
const server = app.listen(port, listening);

function listening(){
    console.log(`running on localhost: ${port} `);
}