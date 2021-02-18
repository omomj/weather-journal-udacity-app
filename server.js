// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');


// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded ({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port =2000;

//runnuing server
const runningServer = app.listen(port, ()=> {
    console.log(`Server Running On localhost:${port}`);
});

// app routes get &post
//get route
app.get ('/all', receiveData);
// Callback function to get 'all'
function receiveData (req,res) {
    res.send(projectData);
}

// post route
app.post ('/weather', addData);

function addData (req, res) {
    console.log(req.body);
    const recentEntry = {
        date : req.body.date,
        temp : req.body.temp,
        content : req.body.content
    }
projectData = recentEntry;
console.log(projectData);
}

       