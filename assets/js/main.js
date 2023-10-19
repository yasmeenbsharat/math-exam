document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();
  }
let result;
let answer='';
let score=0;
let users=[];
let timeoutId;
const tbody=document.getElementById("tbody");
const equation=document.getElementById("equation");
const answerValue=document.getElementById("answer");
const examContent=document.getElementById("examContent");

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function generateRandomEquation() {
    const num1 = getRandomNumber(0, 100);
    const num2 = getRandomNumber(0, 100);
    const operator = ['+', '-', '*', '/'][getRandomNumber(0, 3)];
   let equ;
    if(num1<num2 && operator=='/'){
        equ=`${num2} ${operator} ${num1}`;
    }else{
    equ=`${num1} ${operator} ${num2}`;}
    equation.innerHTML=`${equ} = ?`;
    result=Math.floor(eval(equ));
    console.log(result);
  }
  
 function initApp(){
    generateRandomEquation();
 }

 function checkAnswer(){
     if (answer==result){
        score+=5;
        console.log("true");
        const displayScore=document.getElementById("score");
        displayScore.innerHTML=score;
        displayAnswer('');
        generateRandomEquation();
     }else{
        displayUserNameScreen();
     }
    
 }


function displayAnswer(value){
    console.log(value);
    if(value==''){
        answer='';
    }else{
        answer+=value;
    }

 answerValue.value=answer;
}
function displayUserNameScreen(){
    examContent.innerHTML=`<input type="text" id="userName" class="user-name-screen z-depth-1 my-5 d-inline-block w-75 m-auto py-2 px-3" onkeyup="getUserName()"  placeholder="Enter your name" value=""  />`
}
function displayResults(){
    users.sort((a, b) => a.userScore - b.userScore);
    
}


function getUserName() {
  const userName = document.getElementById("userName");
  const name = userName.value;
  clearTimeout(timeoutId);
  timeoutId = setTimeout(function() {
    console.log(name);
    addUser(name);
  }, 500); 
}

function addUser(name){
    var user = {
        userName: name,
        userScore:score,
    }
    users.push(user);
    localStorage.setItem("users",JSON.stringify(users));
}
function refreshPage(){
   
   
    
    //location.reload(); 
}

initApp();
