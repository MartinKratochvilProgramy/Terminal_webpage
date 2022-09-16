const input = document.getElementById('input');
const textField = document.getElementById('textField');
let userName;
const adress = '@localhost:3000> ';


// *************** MODEL ***************
const help = [
  '\'help\'              You know what this does',
  '\'who\'               Who am I?',
  '\'projects\'          Show projects ',
  '\'train\'             Show me the train',
  '\'clear\'             Clear command prompt',
  '\'name user-name\'    Change user name',
];

const train = [
  'CHOO CHOOO!',
  '  OO O o o o...      ______________________ _________________',
  '  O     ____          |                    | |               |',
  ' ][_n_i_| (   ooo___  |                    | |               |',
  ' ][_n_i_| (   ooo___  |                    | |               |',
  '(_ _________|_[______]_|____________________|_|_______________|',
  '  0--0--0      0  0      0       0     0        0        0',
]

const projects = '<div style="margin: 20px 0 20px 0;">You can check out my projects at: <a href="https://github.com/MartinKratochvilProgramy" target="_blank" class="cmd-text">github.com/MartinKratochvilProgramy</a></div>';

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
  } else if (cmd === 'projects'){
    displayPrevCmd(cmd);
    textField.innerHTML += projects;
  } else if (cmd === 'train'){
    displayTrain(train, cmd);
  } else if (cmd.replace(/ .*/,'') === 'name') {
    if (cmd.split(' ').length != 2) {
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
  // after input by user leave last cmd displayed
  const prevCmdContainer = document.createElement('div');
  prevCmdContainer.classList = 'cmd-text-container';

  const prevCmd = document.createElement('p');
  prevCmd.className = 'user-prompt';
  const cmdSpan = document.createElement('p');
  cmdSpan.className = 'cmd-text';

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
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(25);
  }
}

async function displayTrain(item, cmd) {
  // same as displayItem but to ensure the train is moving
  displayPrevCmd(cmd);

  //add moving train into separate div
  const trainDiv = document.createElement('div');
  trainDiv.className  = 'train-div';
  for (let i = 0; i < item.length; ++i) {
    const preElement = document.createElement('pre');
    preElement.id = 'pre-train';
    preElement.className = 'train';
    preElement.textContent = item[i];
    trainDiv.appendChild(preElement);
  }
  textField.appendChild(trainDiv);

  await sleep(1000);

  //replace moving train with stationary train
  trainDiv.remove()
  for (let i = 0; i < item.length; ++i) {
    const preElement = document.createElement('pre');
    preElement.textContent = item[i];
    textField.appendChild(preElement);
  }
  window.scrollTo(0, document.body.scrollHeight);
}

function clearTextField() {
  textField.innerHTML = '';
}

function displayInvalidInput(cmd){
  // display error in command line if input not in available inputs
  console.log(cmd);
  const prevCmdContainer = document.createElement('div');
  prevCmdContainer.classList = 'cmd-text-container';

  const prevCmd = document.createElement('p');
  prevCmd.className = 'user-prompt';
  const cmdSpan = document.createElement('p');
  cmdSpan.className = 'cmd-text';

  prevCmd.textContent = userName + adress;
  cmdSpan.textContent = cmd +' is not a valid command, type \'help\' to display list of commands';
  prevCmdContainer.appendChild(prevCmd);
  prevCmdContainer.appendChild(cmdSpan);

  textField.appendChild(prevCmdContainer);
  window.scrollTo(0, document.body.scrollHeight);
}

function changeUserName(cmd) {
  // change name before @localhost and saves it in localstorage
  userName = cmd.split(' ')[1]
  clearTextField();
  document.getElementById('prompt-text').innerText = userName + '@localhost:3000>'
  localStorage.setItem('userName', userName);
  window.scrollTo(0, document.body.scrollHeight);
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


