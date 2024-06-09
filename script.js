const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const button = document.querySelector(".btn");

let currentplayer;
let gamegrid ;

const winningpositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


        //lets create the function which will initialise the game

function initgame(){
    currentplayer = "X";
    gamegrid = ["", "","","","","","","",""];
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        /// one more thing is missing to add css properties again 
        box.classList = `box box${index+1}`;

    });
    button.classList.remove("active");
    gameInfo.innerText = `currentplayer - ${currentplayer}`;
}

   initgame();

// swap fucntion for alternates
function swapturn(){
    if(currentplayer === "X"){
        currentplayer = "O";
    }
    else{
        currentplayer = "X";
    }
    // UI mein uodate krna padega 
    gameInfo.innerText = `currentplayer - ${currentplayer}`;
}

function checkgameover(){
    let answer = "";
    
    winningpositions.forEach((position) => {
        //all three boxes shoould be non empty and  exactly the same
        if( (gamegrid[position[0]] !== ""|| gamegrid[position[1]] !== ""|| gamegrid[position[2]] !== "" )
    && (gamegrid[position[0]] === gamegrid[position[1]]) && (gamegrid[position[1]] === gamegrid[position[2]])){

        // check if X wins or O
        if(gamegrid[position[0]] === "X")
            answer = "X";
        else
            answer = "O";
        // now we know i sthe winner
            // disable poinetr event

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

        // add green color 

        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
});

    // it means we have a winner

    if(answer !==""){
        gameInfo.innerText = `winner player - ${answer}`;
        button.classList.add("active");
        return;
    }
    // when there is no winner
    let emptycount = 0;
    gamegrid.forEach((box) =>{
        if(box !== "")
        emptycount++;
    });

    // board is filled

    if(emptycount === 9){
        gameInfo.innerText = "Game is tied"
        button.classList.add("active");
    }
    
};


function handleclicked(index){
        if(gamegrid[index] === ""){
            boxes[index].innerText = currentplayer;
            gamegrid[index] = currentplayer;
            boxes[index].style.pointerEvents = "none";
            // swap karo turn ko
            swapturn();
            //check karo koi jeet toh nhi gya
            checkgameover();
        }
    }


boxes.forEach((box , index) => {
    box.addEventListener("click" , () => {
        handleclicked(index);
    })
});

button.addEventListener("click", initgame);