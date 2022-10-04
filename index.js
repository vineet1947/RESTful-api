require('dotenv').config()
const express = require("express");
const { route } = require('express/lib/router');
const { default: mongoose } = require("mongoose");
const compression = require("compression")

const mongoData = process.env.DATABASE_URL;
const port = 3000;



const database = mongoose.connection;
mongoose.connect(mongoData);

database.on('error', (error) => {
    console.log(error);

})

database.once('connected', () => {
    console.log('Sab badiya hai Bhai , Database is connected');

})


const app = express();
const routes = require('./routes/routes');

// const swaggerAutogen = require('swagger-autogen')();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Vineet API",
            description: "API Information",
            contact: {
                name: "Stupid Developer"
            },
            servers: ["http://localhost:3000"]
        }
    },
    // ['.routes/*.js']
    apis: ["index.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 * /api/getAll:
 *  get:
 *    description: Use to request all patients
 *    responses:
 *      '200':
 *        description: A successful response 
 */

/**
 * @swagger
 * /api/getid/{id}:
 *  get:
 *    description: Use to request patients id  
 *    tags : [Users] 
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id 
 * 
 *    responses:
 *      '200':
 *        description: A successful response for get id 
 * 
 */





app.use(express.json());
app.use(compression());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send("hello world!!");

});


app.listen(port, () => {
    console.log(`Server started at ${port}`);
})

// hell