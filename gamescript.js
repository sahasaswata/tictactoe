let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let newBtn=document.querySelector("#new");
let msg=document.querySelector("#msg");
let msgContainer=document.querySelector(".msg-container");
let turnX=true;
let count=0;
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
});
reset.addEventListener("click",()=>{
    boxEnable();
    count=0;
    turnX=true;
});
const showWinner=(winner)=>{
    msg.innerText=`Congratulations,Winner is ${winner} !!!`;
    msgContainer.classList.remove("hide");
    boxDisable();
    reset.classList.add("hide");
    count=0;
    turnX=true;
}

const checkWinner=()=>{
    for(let list of winninglist){
        let first=boxes[list[0]].innerText;
        let second=boxes[list[1]].innerText;
        let third=boxes[list[2]].innerText;
        if(first!="" && second!="" && third!="")
            if(first==second && second==third){
                showWinner(first);
                return true;
            }
    }

}