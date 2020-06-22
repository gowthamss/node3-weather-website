const request = require('request');

function geocode(address, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ293dGhhbXNzIiwiYSI6ImNrYjYxd2s5ZDB5OWYycm55MjMyNWZkYW8ifQ.KPY4PRGQBhqGxEKgZkGZ8A';

    // Object destructuring
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service.', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location.', undefined);
        } else if (body.features) {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place__name
            })
        }
    })
}

module.exports = geocode;