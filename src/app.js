//extensiones
const express = require('express')
const hbs = require('hbs')
const path = require('path')

//importan elements
const port = process.env.PORT || 3000

//paths
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//app config
const app = express()
app.use(express.static(publicPath))
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//app callbacks
app.get('/',(req,res)=>{
    res.render('index',{
        title: "Tic Tac Toe"
    })
})
app.get('/game',(req,res)=>{
    res.render('game',{
        title: "Tic Tac Toe"
    })
})


//app server
app.listen(port,()=>{
    console.log('server on at port %s',port)
})
