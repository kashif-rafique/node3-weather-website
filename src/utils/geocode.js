const request = require("request");

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2FzaGlmLXJhZmlxdWUiLCJhIjoiY2xpeWkzcGdtMGZnbzNkbzU1amRoN2prMyJ9.cwr2dI5QqdNirvcNP3AJyQ&limit=1';
    
    request({url, json:true}, (error,{body}) => {
        if(error){
            callback("Unable to connect to the location services.", undefined);
        }else if(body.features.length === 0){
            callback("Unable to find the given location, please try another", undefined);
        }else{
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placeName: body.features[0].place_name,
            }
            callback(undefined,data);
        }
    })
}

module.exports = geocode;