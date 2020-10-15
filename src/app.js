const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')
const path = require('path')
const hbs = require('hbs')
const express = require('express')
const app = express()
const port = process.env.PORT || '3000'

//set up directories
const publicDir = path.join(__dirname,'../public')
const viewsDir = path.join(__dirname,'../templates/views')
const partialsDir = path.join(__dirname,'../templates/partials')
//set up static files directory
app.use(express.static(publicDir))

//setup handlebars
app.set('view engine','hbs')
app.set('views',viewsDir)
hbs.registerPartials(partialsDir)
//root route
app.get('',(req,res)=>{
  res.render('index',{title:'Weather',name:'Mukhtar'})
})
app.get('/help',(req,res)=>{
  res.render('help',{title:"Help page",message:"This is a message passed into the template!",name:"Mukhtar"})
})
app.get('/weather', (req,res)=>{
  const address = req.query.address
  if (!address) {
    return res.send({error:'Please provide an address'})
} else {
    geocode(address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
              return res.send({error});
            }
            
                    
            res.send({forecast:forecastData, location, address})
        })
    })
}
  
})
app.get('/about',(req,res)=>{
  res.render('about',{title:"About page",message:"This is a message passed into the template!",name:"Mukhtar"})
})
app.get('*', (req,res)=>{
  res.render('404',{page:"Page"});
})

app.listen(port,()=>{
  console.log('server running on port '+port)
})