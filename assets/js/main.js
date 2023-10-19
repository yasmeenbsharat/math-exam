document.querySelector('form').onsubmit = (e) => {
  e.preventDefault();
}
window.addEventListener('beforeunload', function (event) {
  localStorage.removeItem('users');
});
let userName = '';
let result;
let userNameInput = `<input type="text" id="userName" class="user-name-screen z-depth-1 my-5 d-inline-block w-75 m-auto py-2 px-3" onkeyup="getUserName()"  placeholder="Enter your name" value=""  />`;
let answer = '';
let score = 0;
let users;
let timeoutId;
const tbody = document.getElementById("tbody");
const examContent = document.getElementById("examContent");

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomEquation() {
  const equation = document.getElementById("equation");
  const num1 = getRandomNumber(0, 100);
  const num2 = getRandomNumber(0, 100);
  const operator = ['+', '-', '*', '/'][getRandomNumber(0, 3)];
  let equ;
  if (num1 < num2 && operator == '/') {
    equ = `${num2} ${operator} ${num1}`;
  } else {
    equ = `${num1} ${operator} ${num2}`;
  }
  equation.innerHTML = `${equ} = ?`;
  result = Math.floor(eval(equ));
  console.log(result);
}

function initApp() {

  if (JSON.parse(localStorage.getItem("users")) == null) {
    users = [];
  }
  else {
    users = JSON.parse(localStorage.getItem("users"));
  }
  displayExam();

}

function checkAnswer() {
  if (answer == result) {
    score += 10;
    const displayScore = document.getElementById("score");
    displayScore.innerHTML = score;
    displayAnswer('');
    generateRandomEquation();
  } else {
    displayUserNameScreen();
  }
}


function displayAnswer(value) {
  const answerValue = document.getElementById("answer");
  if (value == '') {
    answer = '';
  } else {
    answer += value;
  }
  answerValue.value = answer;
}

function displayExam() {
  examContent.innerHTML = ` <div class="calculator w-100 text-center m-auto" id="examContent">
    <p class="mt-4 fs-5 fw-bolder">Score : <span id="score">0</span></p>
    <p class="mt-2 fs-5 fw-bolder" id="equation"></p>
    <input type="text" id="answer" class="calculator-screen z-depth-1 mb-3 d-inline-block w-75 m-auto py-2 px-3" placeholder="Enter your answer" value=""  />
  
    <div class="calculator-keys d-flex flex-wrap justify-content-center ">
 
    <button type="button" value="1" class="btn me-2 px-4 py-2   mb-2 col-md-3" onclick="displayAnswer('1')" >1</button>
    <button type="button" value="2" class="btn  me-2  px-4 py-2  mb-2 col-md-3" onclick="displayAnswer('2')">2</button>
    <button type="button" value="3" class="btn  me-2 px-4 py-2 mb-2 col-md-3" onclick="displayAnswer('3')">3</button>

    <button type="button" value="4" class="btn me-2 px-4 py-2   mb-2 col-md-3" onclick="displayAnswer('4')">4</button>
    <button type="button" value="5" class="btn  me-2 px-4 py-2   mb-2 col-md-3" onclick="displayAnswer('5')">5</button>
    <button type="button" value="6" class="btn  me-2 px-4 py-2   mb-2  col-md-3" onclick="displayAnswer('6')">6</button>

    <button type="button" value="7" class="btn  me-2 px-4 py-2  mb-2   col-md-3" onclick="displayAnswer('7')">7</button>
    <button type="button" value="8" class="btn  me-2 px-4 py-2  mb-2   col-md-3" onclick="displayAnswer('8')">8</button>
    <button type="button" value="9" class="btn me-2 px-4 py-2   mb-2  col-md-3" onclick="displayAnswer('9')">9</button>
  
    <button type="button" class="all-clear function btn me-2 px-4 py-2   mb-2  col-md-3" value="all-clear" onclick="displayAnswer('')">Clear</button>
    <button type="button" value="8" class="btn  me-2 px-4 py-2    mb-2 col-md-3" onclick="displayAnswer('0')">0</button>
    <button type="button" value="9" class="btn  me-2 px-4 py-2   mb-2  col-md-3" onclick="displayAnswer('-')">-</button>
    <button type="button" class="btn mt-3   py-2 col-md-10 " value="" onclick="checkAnswer()">Enter</button>
    </div>
  </div>`
  generateRandomEquation();
}

function displayUserNameScreen() {
  examContent.innerHTML = userNameInput;
}
function displayResults() {
  users.sort((a, b) => b.userScore - a.userScore);
  var result = '';
  users.map((user, index) => {
    result += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${user.userName}</td>
        <td>${user.userScore}</td>
      </tr>
     ` });
  tbody.innerHTML = result;
}



function getUserName() {
  const name = document.getElementById("userName");
  userName = name.value;
  clearTimeout(timeoutId);
  timeoutId = setTimeout(function () {
  }, 500);
}

function addUser(name) {
  var user = {
    userName: name,
    userScore: score,
  }
  score = 0;
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}
function refreshPage() {
  if (userName == '') {
    Swal.fire({
      icon: 'error',
      title: 'Cant refresh ?',
      text: 'You have to solve the equation first!',
    });
  }
  else {
    addUser(userName);
    displayResults();
    userName = '';
    displayExam();
  }
}

initApp();
