const express = require('express')
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //My Code - To block some permissions exception
const app = express()
//Define paths for express config
const publicDirPath = path.join(__dirname,'../public');
const viewsDirPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

//Setup handelbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index',{
        title:"Weather App",
        name:"Andrew Mead"
    });
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:"Help",
        name:"Andrew Mead",
        helpText:"This is some help text."
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:"About Me",
        name:"Andrew Mead"
    })
})

app.get('/weather', (req, res) => {
    // console.log(req.query);
    if(!req.query.address){
        return res.send({
            error:"You must provide an adddress"
        });
    }

    geocode(req.query.address, (error,{latitude,longitude,placeName} = {}) => {
        if(error){
            return res.send({
                // error:error
                error
            });
        }
    
        forecast(latitude, longitude, (error, response) => {
            if(error){
                return res.send({
                    error
                });
            }
    
            res.send({
                forecast: response,
                location: placeName,
                address: req.query.address
            })
         });
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Andrew Mead',
        errorMessage: 'Help Article Not Found !'
    });
})
app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Andrew Mead',
        errorMessage: 'Page Not Found !'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})