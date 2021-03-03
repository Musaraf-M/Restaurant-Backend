// Imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Route imports
const userRoute = require("./components/user/route");

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



//Mock Request
app.get("/", (req,res) => {
    res.send("<h1>API is working</h1>");
})

// Routes
app.use('/user', userRoute);

// Port
const PORT = process.env.PORT || 3000;

// Listen
app.listen(PORT, () => {
    console.log(`Server up and running at ${PORT}`);
});