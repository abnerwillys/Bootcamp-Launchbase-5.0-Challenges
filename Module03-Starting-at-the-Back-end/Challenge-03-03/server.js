const express  = require('express')
const nunjucks = require('nunjucks')

const server = express()
const dataCourses = require('./data-courses')
const linksHeader = [
    { name: "Comunidade", url: "https://discordapp.com/invite/gCRAFhc" },
    { name: "Email", url: "mailto:oi@rocketseat.com.br" },
    { name: "Telefone", url: "tel:+5547992078767" },
    { name: "Sobre", url: "/about" }
]

const linksFooter = [
    { name: "GitHub", url: "https://github.com/Rocketseat" },
    { name: "Instagram", url: "http://instagram.com/rocketseat_oficial" },
    { name: "Facebook", url: "http://fb.com/rocketseat" },
    { name: "Twitter", url: "http://twitter.com/rocketseat" },
    { name: "Youtube", url: "http://youtube.com/rocketseat" },
    { name: "Linkedin", url: "https://www.linkedin.com/school/rocketseat/" }
]

const notFoundData = {
    image: "https://neilpatel.com/wp-content/uploads/2019/05/ilustracao-sobre-o-error-404-not-found.jpeg",
    message: "Sorry, that page doesn't exist!"
}

//Nunjucks
server.use(express.static('public'))
server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

//Routes
server.get("/", function(req, res) {
    return res.render('courses', { items: dataCourses, linksHeader, linksFooter })
})

server.get("/course/:id", function(req, res) {
    const id = req.params.id;
    const course = dataCourses.find((course) => {
        return course.id == id        
    })

    if (!course) {
        return res.render('not-found', { notFoundData, linksHeader, linksFooter })
    }

    return res.render('course', { item: course, linksHeader, linksFooter });
})

server.get("/about", function(req, res) {
    const aboutData = {
            description: `<h2>As melhores tecnologias em programação, direto ao ponto e do jeito certo.</h2>
                          <p>No meio de tanta informação e da quantidade de ferramentas que surgem todos os dias, você precisa de alguém que te leve na direção certa.</p>`,
            image_description: "https://rocketseat.com.br/static/images/update/trofeu-home.svg",
            technology_title: "<h2>As tecnologias mais versáteis do mercado:</h2>",
            technology_items: [ 'JavaScript', 'HTML', 'CSS', 'React', 'React Native', 'Node.js' ]
        }

    return res.render('about', { aboutData, linksHeader, linksFooter })
})

server.use(function(req, res) {
    res.status(404).render("not-found", { notFoundData, linksHeader, linksFooter });
})

//Server
server.listen(5000, function() {
    console.log("Server is Running")
})