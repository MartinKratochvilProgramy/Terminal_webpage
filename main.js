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
"<pre>CHOO CHOOO!</pre>",
"<pre>  OO O o o o...      ______________________ _________________</pre>",
"<pre>  O     ____          |                    | |               |</pre>",
"<pre> ][_n_i_| (   ooo___  |                    | |               |</pre>",
"<pre> ][_n_i_| (   ooo___  |                    | |               |</pre>",
"<pre>(__________|_[______]_|____________________|_|_______________|</pre>",
"<pre>  0--0--0      0  0      0       0     0        0        0</pre>"
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
    displayItem(train, cmd);
  } else if (cmd === 'projects'){
    displayItem(projects, cmd)
  } else if (cmd === 'clear') {
    clearElement();
  } else if (cmd === ''){
    displayItem('', cmd)
  } else {
    displayInvalidInput(cmd);
  }
  input.value = '';
}
// *************** VIEW ***************
function displayInput(value) {
  // var para = document.createElement("p");
  // para.appendChild(document.createTextNode(value));
  // textField.appendChild(para);

  textField.innerHTML += value;
}

function displayInvalidInput(value){
  value = "<p class=\"user-prompt\">" + adress + "<span class=\"cmd-text\">"  + "\'" + value +"\'" +' is not a valid command, type \'help\' to display list of commands ';
  displayInput(value);
}

function displayItem(item, cmd){
  // clearElement();
  // // var pre = document.createElement("pre")
  // // var adressText = document.createTextNode(adress)
  // // pre.className = "user-prompt";
  // // var cmdText = document.createTextNode(cmd); 
  // // cmdText.className = "cmd-text";
  // // cmdText.style.color = "white"
  // // pre.appendChild(adressText);
  // // pre.appendChild(cmdText);
  // // textField.appendChild(pre);

  textField.innerHTML += "<p class=\"user-prompt\">" + adress + "<span class=\"cmd-text\">" + cmd + "</span></p>";
  item.forEach(element => {
    displayInput(element);
  });
}

function clearElement() {
  textField.innerHTML = '';
}

(function () {
  input.addEventListener('keypress', inputHandler, false);
})();


