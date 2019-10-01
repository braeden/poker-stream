const socket = io();

socket.on('cardsUpdate', function (input) {
    console.log(input)
})

