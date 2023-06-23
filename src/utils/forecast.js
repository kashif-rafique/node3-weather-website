const request = require("request");
const requst = require("request");

const forecast = (latitude, longitude, callback) => {
    // const url = "http://api.weatherstack.com/current?access_key=7b2126dac011292447e5b4a77141bb4f&query=" + latitude +","+ longitude + "&units=f";
    const url = "http://api.weatherstack.com/current?access_key=7b2126dac011292447e5b4a77141bb4f&query=" + latitude +","+ longitude + "&units=m";
    
    request({url, json:true},  (error, {body}) => {
      if(error){
          callback("Unable to connect with the weather service.", undefined)
      }else if(body.error){
          callback("Unable to find the location", undefined);
      }else{
        const currentData = body.current;
        callback(undefined, currentData.weather_descriptions[0] + ". It is currently " + currentData.temperature + " degrees out. It feels like " + currentData.feelslike + " degree out." );
        
      }
    })
}

module.exports = forecast;