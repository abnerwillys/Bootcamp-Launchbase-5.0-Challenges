const cards = document.querySelectorAll('.card') //armazenar todos os cards existentes

for (let card of cards) {
    card.addEventListener('click', function(){ //repetição para "ouvir" o click e saber qual card está sendo clicado
        const videoId = card.getAttribute('id') //variavel armazena o id do video clicado
        window.location.href = `/video?id=${videoId}` //Está dizendo > Vá para a janela(window) com a seguinte localização
    })
}