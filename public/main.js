const socket = io();
const canvas = document.getElementById('viewport');
const xycardpositions = [[1000,100],[1400,150],[1780,400],[1780,800],[1200,800],[800,800],[400,800],[150,400],[400,100]]
const ctx = canvas.getContext('2d');
const dir = "img/";
const fileextension = ".svg";
const imagesize = 80;

socket.on('cardsUpdate', function (input) {
    console.log(input)
    // let dir = "img/"
    // let testImg = new Image;
    // testImg.src = dir+"QD";
    // let canvas = document.getElementById("viewport");
    // let ctx = canvas.getContext("2d");
    // ctx.drawImage(testImg, 10,10,84,120);

    for(let player in playerInfo){
        let tempPlayer = playerInfo[player];
        let cardOne = new Image;
        let cardTwo = new Image;
        let tempX = xycardpositions[parseInt(player)-1][0]
        let tempY = xycardpositions[parseInt(player)-1][1]
        
        if(tempPlayer.cards && tempPlayer.cards.length > 0){
        cardOne.src = dir+tempPlayer.cards[0]+fileextension;
        console.log(dir+tempPlayer.cards[0]+fileextension);
        ctx.drawImage(cardOne,tempX,tempY,imageSize*.7,imageSize);
        }
        if(tempPlayer.cards && tempPlayer.cards.length > 1){
        cardTwo.src = dir+tempPlayer.cards[1]+fileextension;
        ctx.drawImage(cardTwo,tempX+imageSize*.7,tempY,imageSize*.7,imageSize);
        }
    }
})

