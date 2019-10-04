const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline')
const fetch = require('node-fetch');
const fs = require('fs');
const lookup = JSON.parse(fs.readFileSync('card-lookup.json'));
const url = 'http://localhost:5000/api'
require('dotenv').config({
    path: '../.env'
})
let port, parser

// Use 'serialport-terminal -l' node package to find correct port
try {
    port = new SerialPort('/dev/ttyACM0', {
        baudRate: 9600,
    });
    parser = port.pipe(new Readline({
        delimiter: '\r\n'
    }))
} catch (e) {
    console.log(e);
    process.exit(1)
}


parser.on('data', async (text) => {
    if (text.length == 10) {
        let [position, cardUID] = text.split('|')
        position = parseInt(position) + 1
        if (lookup[cardUID]) {
            console.log("Sent JSON:", {[position]: lookup[cardUID]})
            cardData = {
                auth: process.env.AUTH_KEY,
                [position]: lookup[cardUID]
            }
            await postData(url, cardData)
        } else {
            console.log("Card does not exist");
        }
    }
    console.log('Serial Received:', text)
})


async function postData(url = '', data = {}) {
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => response.json());
}