let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dbConfig = require('./database/db');

// Conectando con mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
        console.log('Base de datos conectada')
    },
    error => {
        console.log('No se pudo conectar a la base de datos: ' + error)
    }
)

// Setting up port with express js
const taskRoute = require('./routes/task.route');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/examen_backend')));
app.use('/', express.static(path.join(__dirname, 'dist/examen_backend')));
app.use('/api', taskRoute);

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Conectado al puerto ' + port)
});

// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    console.error(err.message); // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});