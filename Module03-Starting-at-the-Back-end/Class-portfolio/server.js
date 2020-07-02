const express = require('express') //Importa a dependencia Express para o projeto
const nunjucks = require('nunjucks') //Importa a dependencia Nunjucks para o projeto

const server = express() //O Servidor vai receber tudo que o express possui.
const videos = require("./data")

//Configurando a template engine (Nunjucks)
server.use(express.static("public")) //O express vai ficar observando a pasta public para servir os arquivos estáticos(css)
server.set("view engine", "njk") //Está setando que os html, será os arquivos da view engine

nunjucks.configure("views", { //Está avisando a template(nunjucks) qual vai ser o caminho/pasta dos arquivos de visualização
    express: server, //No momento é só uma opção para server com o express. O server é a váriavel criada mais acima.
    autoescape: false, //Para o nunjucks aceitar HTML inserido através do back end
    noCache: true //Para nao permitir o navegador fazer cache
})

//Criando Rotas
//Usando o método principal chamado GET, por padrão pega o "/"

//Rota do RAIZ
//Trazendo o front end para o servidor
server.get('/', function(req, res) { // Req = requisição/pedido, Res = resposta
    const aboutData = {
        avatar_url: "https://avatars0.githubusercontent.com/u/59853942?s=460&u=000274e39c7029e3c065fd9a6913c850907d4691&v=4",
        name: "Abner Willys",
        role: "Junir FullStack Developer",
        description: 'Junior FullStack Developer, focused on fulfilling the dream of bringing solutions to the world. Student at <a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>.',
        links: [
            { name: "Github", url: "https://github.com/abner-starkasty" },
            { name: "Twitter", url: "https://twitter.com/AbnerStarkasty" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/abnerwillys" },
        ]
    }

    return res.render("about", { aboutData }) // Está dizendo ao server que a view que deve ser renderizada no caminho "/" pagina principal. Nao precisa colocar .html no final pois já setou mais acima
})
//Rota do portfolio
server.get('/portfolio', function(req, res) {

    return res.render("portfolio", { items: videos }) //items é um objeto que vai receber todos os dados da variavel videos(no caso um array)
})

server.get('/video', function(req, res) { //Aqui é feito um filtro para saber se tem no array de vídeos o video que foi REQuisitado pelo cliente;
    const id = req.query.id

    const video = videos.find(function(video) {
        return video.id == id
    })

    if (!video) {
        return res.send('Video not found!')
    }
    
    return res.render('video', { item: video })
})

//Criando o servidor
server.listen(5000, function() { //listen fica ouvindo uma porta(no caso a porta 5000)
    console.log("server is running") //Assim que a porta for requisitada, ele retorna uma função(callback).
})