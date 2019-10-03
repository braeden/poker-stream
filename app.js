const app = require('express')();
const http = require('http')
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const svr = http.createServer(app)
const io = require('socket.io')(svr);

http.globalAgent.maxSockets = 50;

app.use(express.static('public'))
app.use(bodyParser.json());

let currentTable = {}

svr.listen(process.env.PORT || 5000, function () {
    console.log(`listening on *:${process.env.PORT || 5000}`);
});


app.get('/', (req, res) => {
    res.sendFile('index.html')
});

app.post('/api', function (req, res) {
    if (req && req.body && req.body.auth && req.body.auth == process.env.AUTH_KEY) {
        let oldTable = JSON.stringify(currentTable)
        let position = Object.keys(req.body).filter(k => k != "auth")[0]
        if (req.body[position] == "button" && !currentTable[position].dealer) {
            currentTable = {
                [position]: {
                    "dealer": true,
                    "cards": []
                }
            }
        } else if (!currentTable[position]) {
            currentTable = {
                ...currentTable,
                [position]: {
                    "cards": [req.body[position]]
                }
            }
        } else if (currentTable[position].cards.length < 2) {
            if (!currentTable[position].cards.includes(req.body[position])) {
                currentTable[position].cards.push(req.body[position])
            }
        }
        if (JSON.stringify(currentTable) != oldTable) {
            io.emit('cardsUpdate', currentTable)
        }
    } else {
        console.log("Invalid request")
    }
    res.json({})
})

io.on('connection', function (socket) {
    console.log(`[${io.engine.clientsCount}] a user connected: ${socket.id}`);
    io.emit('cardsUpdate', currentTable)

    socket.on('disconnect', () => {
        console.log(`[${io.engine.clientsCount}] a user disconnected: ${socket.id}`);
    });
});