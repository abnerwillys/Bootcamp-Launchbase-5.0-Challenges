const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')
const modal = document.querySelector('.modal')
const footer = document.querySelector('footer')

for (let card of cards) {
    card.addEventListener('click', function (){
        const pageId = card.getAttribute('id')
        modalOverlay.querySelector('iframe').src = `https://rocketseat.com.br/${pageId}`
        modalOverlay.classList.add('active')
    })
}

document.querySelector('.close-modal').addEventListener('click', function () {
    modalOverlay.classList.remove('active')
    modalOverlay.querySelector('iframe').src = ""
    modal.classList.remove('maximize')
    footer.classList.remove('maximize-activated')
})

document.querySelector('.maximize-modal').addEventListener('click', function () {
    if (modal.classList.contains('maximize')) {
        modal.classList.remove('maximize')
        footer.classList.remove('maximize-activated')
    } else {
        modal.classList.add('maximize')
        footer.classList.add('maximize-activated')
    }
})