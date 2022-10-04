require('dotenv').config()
const express = require("express");
const { route } = require('express/lib/router');
const { default: mongoose } = require("mongoose");
var compression = require("compression")

const mongoData = process.env.DATABASE_URL;
const port = 3000;
mongoose.connect(mongoData);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);

})

database.once('connected', () => {
    console.log('Sab badiya hai Bhai , Database is connected');

})


const app = express();
app.use(express.json());
app.use(compression());


const routes = require('./routes/routes');

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server started at ${port}`);
})