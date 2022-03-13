const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3JpdGltYW4yNCIsImEiOiJjbDBtMDkxMXUweWdtM2Jwd244b3ExZHZmIn0.wr95vwkV6d_mw8ytvDXs9w&limit=1`;

    request({url, json : true}, (error, {body}={})=>{
        if(error) {
            callback("Unable to connect to location services!", undefined);
        }

        else if(body.features.length === 0) {
            callback("Unable to find location!", undefined);
        }

        else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                name : body.features[0].place_name,
            });
        }

    });
}

module.exports = geocode;