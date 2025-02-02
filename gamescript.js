let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let newBtn=document.querySelector("#new");
let msg=document.querySelector("#msg");
let msgContainer=document.querySelector(".msg-container");
let turnX=true;
let count=0;
let gameContainer = document.querySelector(".game");
let winninglist=
[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
boxes.forEach(box=>{
    box.addEventListener("click",()=>{
        if(turnX){
            box.style.color="rgb(233, 52, 145)";
        box.innerText="X";
        turnX=false;
        }
        else{
            box.style.color="yellow"
            box.innerText="O";
            turnX=true;
        }
        box.disabled=true;
        count++;
        if(checkWinner()) return;
        if(count===9) draw();
    });    
});
const draw=()=>{
    msg.innerText=`It is a Draw!`;
    reset.classList.add("hide");
    msgContainer.classList.remove("hide");

}
const boxDisable=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const boxEnable=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
newBtn.addEventListener("click",()=>{
    reset.classList.remove("hide");
    msgContainer.classList.add("hide");
    boxEnable();
    removeWinningLine();
});
reset.addEventListener("click",()=>{
    boxEnable();
    count=0;
    turnX=true;
    removeWinningLine();
});

const showWinner = (winner, winCombo) => {
    msg.innerText = `Congratulations, Winner is ${winner} !!!`;
    msgContainer.classList.remove("hide");
    boxDisable();
    reset.classList.add("hide");
    count = 0;
    turnX = true;
    drawWinningLine(winCombo, winner);
};

const checkWinner = () => {
    for (let list of winninglist) {
        let [a, b, c] = list;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            showWinner(boxes[a].innerText, list);
            return true;
        }
    }
    return false;
};

const drawWinningLine = (winCombo, winner) => {
    let line = document.createElement("div");
    line.classList.add("winning-line");
    line.style.backgroundColor = winner === "X" ? "rgb(233, 52, 145)" : "yellow";
    let firstBox = boxes[winCombo[0]];
    let lastBox = boxes[winCombo[2]];
    let firstRect = firstBox.getBoundingClientRect();
    let lastRect = lastBox.getBoundingClientRect();
    let gameRect = gameContainer.getBoundingClientRect();
    let x1 = firstRect.left + firstRect.width / 2 - gameRect.left;
    let y1 = firstRect.top + firstRect.height / 2 - gameRect.top;
    let x2 = lastRect.left + lastRect.width / 2 - gameRect.left;
    let y2 = lastRect.top + lastRect.height / 2 - gameRect.top;
    let length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    let angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    line.style.width = `${length}px`;
    line.style.height = "5px";
    line.style.position = "absolute";
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transform = `translate(0, -50%) rotate(${angle}deg)`;
    line.style.transformOrigin = "left";

    gameContainer.appendChild(line);
};

const removeWinningLine = () => {
    let line = document.querySelector(".winning-line");
    if (line) line.remove();
};
