const fetch = require('node-fetch');
const fs = require('fs');

(async() => {
    let cardData = JSON.parse(fs.readFileSync('sample/fromTable.json'));
    console.log(cardData)
    await postData("http://localhost:5000/api", cardData)
})();

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