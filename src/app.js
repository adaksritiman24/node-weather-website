const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
//app.com
//app.com/home
//app.com/about

//define paths for express config
const pathToPublicDirectory = path.join(__dirname, "../public"); //public folder
const viewsPath = path.join(__dirname,"../templates/views"); //views folder
const partialsPath = path.join(__dirname,"../templates/partials"); //partials folder



//setup handle bars and views engine
app.set("view engine",'hbs');
app.set( "views", viewsPath);
hbs.registerPartials(partialsPath);

//setting static location
app.use( express.static(pathToPublicDirectory));

app.get('',(req, res)=>{
    res.render('index',{
        title : "Weather app",
        name : "Sritiman Adak",
    }); //no need for extension.
})
app.get('/about',(req, res)=>{
    res.render('about',{
        title : "About Me",
        name : "Sritiman Adak",
    }); //no need for extension.
})

app.get('/help' , (req, res)=>{
    res.render('help',{
        text : "this is some helpful text",
        title : "Help",
        name : "Sritiman Adak"
    });
});
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error : "You have to provide address"
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, name}={})=> {
        if(error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecast)=>{
            if(error) return res.send({
                error
            });

            return res.send({
                location : name,
                address : req.query.address,
                forecast
            });
        })

    });
})


app.get("/products", (req, res)=>{

    if (!req.query.search){
        return res.send({
            error : "You must provide a search term."
        });
    }

    console.log( req.query.search);
    res.send({
        products: []
    });
})

app.get("/help/*", (req, res)=>{

    res.render("404",{
        title : "Help",
        name : "Sritiman Adak",
        error : "Health Article not found."
    })
})


app.get('*',(req, res)=>{
    res.render("404",{
        title : "404",
        name : "Sritiman Adak",
        error : "Page not found!"
    })
});

app.listen(port,  ()=>{
    console.log("Server started at port "+port);
});


// nodemon app.js -e js, hbs