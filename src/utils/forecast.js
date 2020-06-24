const request = require('request');

function forecast(longitude, latitude, callback) {
    const url = `http://api.weatherstack.com/current?access_key=c68d94040ae3974ba6b69a653002708a&query=${longitude},${latitude}`;

    // Object destructuring
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to load weather data. Please check the network connection.', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            console.log(body)
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' and it feels like ' + body.current.feelslike)
        }
    })
}



module.exports = forecast;