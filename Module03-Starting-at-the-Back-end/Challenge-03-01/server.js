const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

//Nunjucks
server.use(express.static('public'))
server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server
})

//Routes
server.get("/", function(req, res) {
    return res.render('courses')
})

server.get("/about", function(req, res) {
    return res.render('about')
})

server.use(function(req, res) {
    res.status(404).render("not-found");
})

//Server
server.listen(5000, function() {
    console.log("Server is Running")
})