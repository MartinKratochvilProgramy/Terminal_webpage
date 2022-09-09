const input = document.getElementById('input');
const textField = document.getElementById('textField');
let userName;
const adress = "@localhost:3000> ";


// *************** MODEL ***************
const help = [
  '\'help\'              You know what this does',
  '\'who\'               Who am I?',
  '\'train\'             Show me the train',
  '\'projects\'          Show projects ',
  '\'clear\'             Clear command prompt',
  '\'name user-name\'    Change user name',
];

const train = [
  "<pre id='pre-train' class='train'>CHOO CHOOO!",
  "<pre id='pre-train' class='train'>  OO O o o o...      ______________________ _________________",
  "<pre id='pre-train' class='train'>  O     ____          |                    | |               |",
  "<pre id='pre-train' class='train'> ][_n_i_| (   ooo___  |                    | |               |",
  "<pre id='pre-train' class='train'> ][_n_i_| (   ooo___  |                    | |               |",
  "<pre id='pre-train' class='train'>(_ _________|_[______]_|____________________|_|_______________|",
  "<pre id='pre-train' class='train'>  0--0--0      0  0      0       0     0        0        0",
]

const projects = [
  'You can check out my projects at: <a href="https://github.com/MartinKratochvilProgramy" target="_blank" class="cmd-text">github.com/MartinKratochvilProgramy</a>'
]

const who = [
  'I am a hobby programmer with a degree in mechanical engineering!'
]

// *************** CONTROLLER ***************
var inputHandler = function (event) {
  if (event.key === 'Enter') {
    command(input.value);
  }
}

function command(cmd) {
  cmd = cmd.replace(/(\r\n|\n|\r)/gm, "");

  if (cmd === 'help') {
    displayItem(help, cmd);
  } else if (cmd === 'who'){
    displayItem(who, cmd)
  } else if (cmd === 'train'){
    displayTrain(train, cmd);
  } else if (cmd === 'projects'){
    displayItem(projects, cmd)
  } else if (cmd.replace(/ .*/,'') === 'name') {
    if (cmd.split(" ").length != 2) {
      displayInvalidInput(cmd);
      return;
    }
    changeUserName(cmd);
  } else if (cmd === 'clear') {
    clearTextField();
  } else if (cmd === ''){
    displayItem('', cmd)
  } else {
    displayInvalidInput(cmd);
  }
  input.value = '';
}

//sleep function
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

// *************** VIEW ***************
function displayPrevCmd(cmd) {
  const prevCmdContainer = document.createElement('div');
  prevCmdContainer.classList = "cmd-text-container";

  const prevCmd = document.createElement('p');
  prevCmd.className = "user-prompt";
  const cmdSpan = document.createElement('p');
  cmdSpan.className = "cmd-text";

  prevCmd.textContent = userName + adress;
  cmdSpan.textContent = cmd
  prevCmdContainer.appendChild(prevCmd);
  prevCmdContainer.appendChild(cmdSpan);

  textField.appendChild(prevCmdContainer);
}

async function displayItem(item, cmd){
  // iterates through item array and displays individual vals
  displayPrevCmd(cmd);
  
  for (let i = 0; i < item.length; ++i) {
    const preElement = document.createElement('pre');
    preElement.textContent = item[i];
    textField.appendChild(preElement);
    await sleep(25);
  }
}

async function displayTrain(item, cmd) {
  // same as displayItem but to ensure train stops moving
  displayPrevCmd(cmd);

  //add moving train into separate div
  const trainDiv = document.createElement('div');
  trainDiv.className  = 'train-div';
  for (let i = 0; i < item.length; ++i) {
    trainDiv.innerHTML += item[i]
  }
  textField.appendChild(trainDiv);

  await sleep(1000);

  //replace moving train with stationary train
  trainDiv.remove()
  for (let index = 0; index < item.length; ++index) {
    textField.innerHTML += item[index]
  }
}

function clearTextField() {
  textField.innerHTML = '';
}

function displayInvalidInput(cmd){
  console.log(cmd);
  const prevCmdContainer = document.createElement('div');
  prevCmdContainer.classList = "cmd-text-container";

  const prevCmd = document.createElement('p');
  prevCmd.className = "user-prompt";
  const cmdSpan = document.createElement('p');
  cmdSpan.className = "cmd-text";

  prevCmd.textContent = userName + adress;
  cmdSpan.textContent = cmd +' is not a valid command, type \'help\' to display list of commands';
  prevCmdContainer.appendChild(prevCmd);
  prevCmdContainer.appendChild(cmdSpan);

  textField.appendChild(prevCmdContainer);

  //value = "<p class=\"user-prompt\">" + userName + adress + "<span class=\"cmd-text\">" + value +' is not a valid command, type \'help\' to display list of commands ';
  //textField.innerHTML += value;
}

function changeUserName(cmd) {
  userName = cmd.split(" ")[1]
  clearTextField();
  document.getElementById('prompt-text').innerText = userName + '@localhost:3000>'
  localStorage.setItem('userName', userName);
}

(function () {
  input.addEventListener('keypress', inputHandler, false);
  
  // check localStorage for name
  if (localStorage.getItem('userName')) {
    userName = localStorage.getItem('userName');
  } else {
    userName = 'user';
  }
  
  // init prompt text
  document.getElementById('prompt-text').innerText = userName + '@localhost:3000>'
})();


