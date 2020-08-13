const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Kevin James Stevens'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kevin James Stevens'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Kevin James Stevens',
        foreword: 'In this page, you will find topics for Help'
    })
})

app.get('/weather',(req, res) => {
    const geocode = require('./utils/geocode')
    const forecast = require('./utils/forecast')

    if(!req.query.address) {
        return res.send({
            error: 'No address query string/ query string is empty'
        })
    } else {
        geocode(req.query.address, (error, {longitude, latitude, location} = {} ) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
        
            forecast(longitude,latitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }
                res.send({
                    location,
                    forecast: forecastData
                })
            })
        })
    }
})

app.get('/products',(req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'No query for search detected'
        })
    } 

    res.send({
        search: req.query.search
    })
})

// 404 Pages
app.get('/help/*',(req, res) => {
    res.render('404',{
        title: '404 Page',
        errorMessage: 'Sorry. Help article not found.',
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        title: '404 Page',
        errorMessage: 'Sorry. The link you\'re trying to visit does not exist.',
    })
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})