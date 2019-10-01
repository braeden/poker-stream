const app = require('express')();
var http = require('http')
http.globalAgent.maxSockets = 50;
const svr = http.createServer(app)
const io = require('socket.io')(svr);
const express = require('express');
app.use(express.static('public'))


svr.listen(process.env.PORT, function () {
    console.log(`listening on *:${process.env.PORT}`);
});


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/api', function (req, res) {
    // Verify here
    io.emit('cardsUpdate', req.body)
})

io.on('connection', function (socket) {
    console.log(`[${io.engine.clientsCount}] a user connected: ${socket.id}`);
    
    socket.on('disconnect', () => {
        console.log(`[${io.engine.clientsCount}] a user disconnected: ${socket.id}`);
    });
});