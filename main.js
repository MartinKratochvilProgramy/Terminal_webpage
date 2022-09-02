const input = document.getElementById('input');
const textField = document.getElementById('textField');
const adress = "user@localhost:3000> ";


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

// *************** CONTROLER ***************
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
  value = "<p class=\"user-prompt\">" + adress + "<span class=\"cmd-text\">"  + "\'" + value +"\'" +' is not a valid command, type \'help\' to display list of commands ';
  textField.innerHTML += value;
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
async function displayItem(item, cmd){
  // clearTextField();
  // // var pre = document.createElement("pre")
  // // var adressText = document.createTextNode(adress)
  // // pre.class = "user-prompt";
  // // var cmdText = document.createTextNode(cmd); 
  // // cmdText.class = "cmd-text";
  // // cmdText.style.color = "white"
  // // pre.appendChild(adressText);
  // // pre.appendChild(cmdText);
  // // textField.appendChild(pre);

  textField.innerHTML += "<p class=\"user-prompt\">" + adress + "<span class=\"cmd-text\">" + cmd + "</span></p>";
  
  for (let index = 0; index < item.length; ++index) {
    textField.innerHTML += item[index]
    await sleep(50);
  }
}

async function displayTrain(item, cmd) {
  textField.innerHTML += "<p class=\"user-prompt\">" + adress + "<span class=\"cmd-text\">" + cmd + "</span></p>";
  const stylesheet = document.styleSheets[0]
  stylesheet.insertRule(".train { animation: 3s ease-out 0s 1 slideInFromRight;}", 0);

  for (let index = 0; index < item.length; ++index) {
    textField.innerHTML += item[index]
    console.log(item[index]);
  }
  await sleep(3000);
  console.log("no anim")
  stylesheet.insertRule(".train { animation: none !important;}", 0);
  
}

function clearTextField() {
  textField.innerHTML = '';
}

(function () {
  input.addEventListener('keypress', inputHandler, false);
})();


