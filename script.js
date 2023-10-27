let speed = 5;

// a.style.backgroundColor="green";
var a=document.querySelector('#a');
a.addEventListener('click',function(){
  speed=5;
  a.style.backgroundColor="green";
   b.style.backgroundColor="white";
    c.style.backgroundColor="white";
     d.style.backgroundColor="white";

})
var b=document.querySelector('#b');
b.addEventListener('click',function(){
  speed=7;
   b.style.backgroundColor="green";
   a.style.backgroundColor="white";
    c.style.backgroundColor="white";
     d.style.backgroundColor="white";

})
var c=document.querySelector('#c');
c.addEventListener('click',function(){
  speed=10;
 c.style.backgroundColor="green";
   b.style.backgroundColor="white";
    a.style.backgroundColor="white";
     d.style.backgroundColor="white";
})
var d=document.querySelector('#d');
d.addEventListener('click',function(){
   
  speed=15;
  d.style.backgroundColor="green";
   b.style.backgroundColor="white";
    c.style.backgroundColor="white";
     a.style.backgroundColor="white";
})

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.wav');
const moveSound = new Audio('move1.wav');
const musicSound = new Audio('PO.mp3');
// let hiscoreval=0;
let score=0;
let lastPaintTime = 0;
let snakeArr=[
   {x:13,y:15}
]

food={
    x:10,
    y:8
}

// Define the gameEngine function

// Define the main game loop
function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        //To control the speed and fps
        return;
    }

    lastPaintTime = ctime;
    gameEngine();
    // console.log(ctime);
}
function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}
    


function gameEngine() {
       //Part 1: Updating the snake variable
       if(isCollide(snakeArr)){
            // moveSound.pause();
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over,Press any key to restart");
       snakeArr=[{x:13,y:15}];
    //    musicSound.volume=0.0;
       musicSound.play();
    
       score=0;
       window.location.reload();

       }
       //If you have eaten the food ,increament the food 
       if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
      
        // foodSound.volume = 0.5; // Set the volume to 50% (adjust the value as needed)
        foodSound.play();
        score+=1;
if (score > hiscoreval) {
    hiscoreval = score;
    localStorage.setItem('Hiscore', JSON.stringify(hiscoreval)); // Update the high score in localStorage
    hiscoreBox.innerHTML = "Hiscore: " + hiscoreval; // Update the displayed high score on the webpage
}



        scoreBox1.innerHTML="Score: "+score;

        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=1;
        let b=17;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
       }
       //Moving the snake
       for(let i=snakeArr.length-2;i>=0;i--){
          snakeArr[i+1]={...snakeArr[i]};
       }
       snakeArr[0].x+=inputDir.x;
       snakeArr[0].y+=inputDir.y;
       //Part 2: display the food/Render the food
       board.innerHTML="";
       snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;

        if(index===0){
            snakeElement.classList.add('head1');
        }else{
        
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);

       })
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);

}


// Start the game loop
// let hiscore=localStorage.getItem('hiscore');
// if(hiscore===null){
//     hiscoreval=0;
//     localStorage.setItem('hiscore',JSON.stringify(hiscoreval))
// }
// else{
//     hiscoreval=JSON.parse(hiscore);
//     hiscoreBox.innerHTML="Hiscore: "+hiscore;

// // }

let hiscore = localStorage.getItem("Hiscore"); // Use "Hiscore" instead of "hiscore"

if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("Hiscore", JSON.stringify(hiscoreval)); // Use "Hiscore" here too
} else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Highest score: " + hiscoreval; // Removed the "0" and changed "hiscore" to "hiscoreval"
}


window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}//Starting the game..!!!!
    musicSound.volume=0.5;
    musicSound.play();
    moveSound.volume=0.8;
    
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUP")
         
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
          
            inputDir.x=0;
            inputDir.y=1;
            break;   

        case "ArrowLeft":
            console.log("ArrowLeft")  
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
              inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;    
    }
})
