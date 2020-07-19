const express  = require('express')
const routes   = express.Router()
const teachers = require('./teachers.js') 

routes.get('/', (req, res) => {
    return res.redirect("/teachers")
})

routes.get('/teachers', (req, res) => {
    return res.render("teachers/index")
})

routes.get('/teachers/create', (req, res) => {
    return res.render("teachers/create")
})

routes.post('/teachers', teachers.post)

routes.get('/students', (req, res) => {
    return res.send("This page calls students")
})

module.exports = routes