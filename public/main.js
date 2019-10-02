const socket = io();
const canvas = document.getElementById('viewport');
const cardCoordinates = [
    [1000, 100],
    [1400, 150],
    [1780, 400],
    [1780, 800],
    [1200, 800],
    [800, 800],
    [400, 800],
    [150, 400],
    [400, 100]
]
const ctx = canvas.getContext('2d');
const imageSize = 80;

socket.on('cardsUpdate', function (table) {
    console.log(table)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let position in table) {
        let player = table[position];
        let cardImages = [new Image, new Image]
        let tempX = cardCoordinates[parseInt(position) - 1][0]
        let tempY = cardCoordinates[parseInt(position) - 1][1]
        let fileLoc = (n) => `img/${n}.svg`
        if (player.cards[0]) {
            player.cards[1] = player.cards[1] || null
            player.cards.forEach((card, i) => {
                cardImages[i].src = card ? fileLoc(card) : fileLoc('BACK')
                cardImages[i].onload = () => {
                    ctx.drawImage(cardImages[i], tempX + i * (imageSize * .7), tempY, imageSize * .7, imageSize);
                }
            })
        }
    }
})