const socket = io();
const canvas = document.getElementById('viewport'),
context = canvas.getContext('2d');

socket.on('cardsUpdate', function (input) {
    console.log(input)
    
})

