const input = document.getElementById('input');
const textField = document.getElementById('textField');
const name = "user";
const adress = "@localhost:3000> ";


// *************** MODEL ***************
const help = [
  '<pre>\'help\'          You know what this does</pre>',
  '<pre>\'who\'           Who am I?</pre>',
  '<pre>\'train\'         Show me the train</pre>',
  '<pre>\'projects\'      Show projects </pre>',
  '<pre>\'clear\'         Clear command prompt</pre>',
];

const train = [
  "<pre id='pre-train' class='train'>CHOO CHOOO!</pre>",
  "<pre id='pre-train' class='train'>  OO O o o o...      ______________________ _________________</pre>",
  "<pre id='pre-train' class='train'>  O     ____          |                    | |               |</pre>",
  "<pre id='pre-train' class='train'> ][_n_i_| (   ooo___  |                    | |               |</pre>",
  "<pre id='pre-train' class='train'> ][_n_i_| (   ooo___  |                    | |               |</pre>",
  "<pre id='pre-train' class='train'>(__________|_[______]_|____________________|_|_______________|</pre>",
  "<pre id='pre-train' class='train'>  0--0--0      0  0      0       0     0        0        0</pre>",
]

const projects = [
  '<pre>You can check out my projects at: <a href="https://github.com/MartinKratochvilProgramy" target="_blank" class="cmd-text">github.com/MartinKratochvilProgramy</a></pre>'
]

const who = [
  '<pre>I am a hobby programmer with a degree in mechanical engineering!</pre>'
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
  } else if (cmd === 'clear') {
    clearTextField();
  } else if (cmd === ''){
    displayItem('', cmd)
  } else {
    displayInvalidInput(cmd);
  }
  input.value = '';
}
// *************** VIEW ***************
function displayInvalidInput(value){
  value = "<p class=\"user-prompt\">" + name + adress + "<span class=\"cmd-text\">"  + "\'" + value +"\'" +' is not a valid command, type \'help\' to display list of commands ';
  textField.innerHTML += value;
}

//sleep function
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function displayItem(item, cmd){
  textField.innerHTML += "<p class=\"user-prompt\">" + name + adress + "<span class=\"cmd-text\">" + cmd + "</span></p>";
  
  for (let index = 0; index < item.length; ++index) {
    textField.innerHTML += item[index]
    await sleep(50);
  }
}

async function displayTrain(item, cmd) {
  textField.innerHTML += "<p class=\"user-prompt\">" + name + adress + "<span class=\"cmd-text\">" + cmd + "</span></p>";

  //add moving train into separate div
  const trainDiv = document.createElement('div');
  trainDiv.className = 'train-div';
  for (let index = 0; index < item.length; ++index) {
    trainDiv.innerHTML += item[index]
  }
  textField.appendChild(trainDiv);

  await sleep(2000);

  //replace moving train with stationary train
  trainDiv.remove()
  for (let index = 0; index < item.length; ++index) {
    textField.innerHTML += item[index]
  }
}

function clearTextField() {
  textField.innerHTML = '';
}

(function () {
  input.addEventListener('keypress', inputHandler, false);
})();


