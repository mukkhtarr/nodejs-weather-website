const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2e6e9e16ec56c20ef4f6e8baafe55cd4&query=${latitude},${longitude}&units=f`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const weather = body.current
            // console.log(`The weather in ${place} is ${weather.weather_descriptions[0]}. The current temperature is ${weather.temperature}. It feels like ${weather.feelslike}.`);

            callback(undefined, `The weather is ${weather.weather_descriptions[0]}. The current temperature is ${weather.temperature}. It feels like ${weather.feelslike}.`)
        }
    })
}

module.exports = forecast