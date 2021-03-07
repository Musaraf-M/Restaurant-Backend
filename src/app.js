// Imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require('fs');

// Route imports
const userRoute = require("./components/user/route");
const dishRoute = require("./components/dish/route");
const restaurantRoute = require("./components/restaurant/route");

// Express
const app = express();

// Cors 
app.use(cors());

// dotenv
dotenv.config({ path: 'src/.env' });

// Connect Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then((res) => console.log("Connected to DB"))
    .catch((err) => console.log(err));

//Middlewares
app.use(express.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://sleepy-gates-5da84a.netlify.app/', 'https://xenodochial-gates-a3deed.netlify.app/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// Logging
app.use("/", (req, res, next) => {
    const currentdate = new Date();
    fs.appendFileSync('log.txt', `${currentdate.toLocaleString()} ${req.connection.remoteAddress} ${req.method} ${req.url} \n`);
    next();
});


//Mock Request
app.get("/", (req, res) => {
    res.send("<h1>API is working</h1>");
})

// Routes
app.use('/user', userRoute);
app.use('/dish', dishRoute);
app.use('/restaurant', restaurantRoute);

// Port
const PORT = process.env.PORT || 3000;

// Listen
app.listen(PORT, () => {
    console.log(`Server up and running at ${PORT}`);
});