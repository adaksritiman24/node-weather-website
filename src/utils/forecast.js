const request = require("request");

const forecast = (latitude, longitude, callback)=> {
    const url = `http://api.weatherstack.com/current?access_key=a60dbbd1031d8a267292e853c39ac601&query=${latitude},${longitude}&units=m`;
   
    request({url, json : true}, (error, {body}={})=>{
        
        if (error){
            callback("Unable to connect to weather service.", undefined);
        }

        else if(body.error) {
            callback("Unable to find location!", undefined);
        }


        else{
            const currentData = body.current;
            callback(undefined, `${currentData.weather_descriptions[0]}. It is currently ${currentData.temperature} degree celcius out. It feels like ${currentData.feelslike} degree celcius out.`);
        }
    });
}


module.exports = forecast;

