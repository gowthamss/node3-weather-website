// Express
const path = require('path');
const hbs = require('hbs');

// weather app files
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

const express = require('express');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Serving up HTML and JSON
// app.get('', (req, res) => {
//     res.send('<h1>Home Page</h1>');
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'gowtham'
//     }, {
//         name: 'ss'
//     }]);
// })


// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>');
// })

// Serving pages with dynamic content.
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'ss'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Gowtham'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ask here for help',
        name: 'Gowtham'
    })
})

// Serving pages statically
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address to fetch weather'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }

            forecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }

                res.send({
                    forecast: forecastData,
                    location,
                    location: req.query.address
                })
            })
        })
        // res.send([{
        //     forecast: 'cloudy',
        //     location: req.query.address
        // }]);
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'ss',
        errorMessage: 'Help page not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'ss',
        errorMessage: 'Page not found.'
    })
});



app.listen(3000, () => {
    console.log('The service is running on localhost at port 3000');
})