const playboard=document.querySelector(".play-board");
const score_board=document.querySelector(".score");
const high_score=document.querySelector(".high-score");
const controls=document.querySelectorAll(".controls i")
let foodX, foodY;
let gameover=false;
let snakeX=5,snakeY=10;
let snakeBody=[];
let velocityX=0,velocityY=0;
let setIntervalID;
let score=0;
let highScore=localStorage.getItem("high-score") || 0;
high_score.innerText=`High-Score: ${highScore}`;

const changeFoodPosistion=()=>{
    foodX=Math.floor(Math.random()*30)+1;
    foodY=Math.floor(Math.random()*30)+1;
}
const handlegameOver=()=>{
    clearInterval(setIntervalID);
    alert("Game over!");
    location.reload();
}
const changeDirection=(e)=>{
//  console.log(e);
    if(e.key==="ArrowUp" && velocityY!=1){
        velocityX=0;
        velocityY=-1;
    }
    else if(e.key==="ArrowDown" && velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }
    else if(e.key==="ArrowLeft"&& velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }
    else if(e.key==="ArrowRight"&& velocityX!=-1){
        velocityX=1;
        velocityY=0;
    }
}
controls.forEach(key=>{
    key.addEventListener('click',()=>{changeDirection({key:key.dataset.key})})
});
const initgame=()=>{
    if(gameover){
        return handlegameOver();
    }
    let htmlmarkup=`<div class="food" style="grid-area: ${foodY} / ${foodX} "></div>`;
    
    if(snakeX===foodX && snakeY===foodY){
        changeFoodPosistion();
        snakeBody.push([foodX,foodY]);
        score++;
        highScore=score>=highScore?score:highScore;
        localStorage.setItem("high-score",highScore);
        score_board.innerText=`Score: ${score}`;
        high_score.innerText=`high-Score: ${highScore}`;

    }
    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1];
    }
    snakeBody[0]=[snakeX,snakeY];
    snakeX+=velocityX;
    snakeY+=velocityY;
    
    if(snakeX<=0 || snakeX>30 || snakeY<=0 ||snakeY>30){
        gameover=true;
    }

    for(let i=0;i<snakeBody.length;i++){
        htmlmarkup+=`<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
        if(i!==0 && snakeBody[0][1]===snakeBody[i][1] && snakeBody[0][0]===snakeBody[i][0]){
            gameover=true;
        }
    }
    playboard.innerHTML=htmlmarkup;
}
changeFoodPosistion();
// initgame()/;

setIntervalID=setInterval(initgame,125)
document.addEventListener("keydown",changeDirection);