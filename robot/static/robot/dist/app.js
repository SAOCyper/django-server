var gateway = `ws://192.168.1.38/ws`;
var websocket;
window.addEventListener('load', onLoad);
function initWebSocket() {
    console.log('Trying to open a WebSocket connection...');
    websocket = new WebSocket(gateway);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage; // <-- add this line
}
function onOpen(event) {
    console.log('Connection opened');
}
function onClose(event) {
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
}
function onMessage(event) {
    var state;
    if (event.data == "1") {
        state = "ON";
    }
    else {
        state = "OFF";
    }
    document.getElementById('state').innerHTML = state;
}
function onLoad(event) {
    initWebSocket();
    initButton();
}
function initButton() {
    document.getElementById('button').addEventListener('click', toggle);
    document.getElementById('arrow right').addEventListener('click', toggle);
    document.getElementById('arrow left').addEventListener('click', toggle);
    document.getElementById('arrow forward').addEventListener('click', toggle);
    document.getElementById('arrow backward').addEventListener('click', toggle);
}
function toggle() {
    var mert = document.getElementById("textarea").value;
    //websocket.send('toggle');
    websocket.send('{\"target\":\"mcu\",\"cmd\": [' + mert + "]}'");
}

document.addEventListener('DOMContentLoaded', start, false);
function start(){
    document.getElementById("arrow right").addEventListener("click", function(){addText(this);} );
    document.getElementById("arrow left").addEventListener("click", function(){addText(this);} );
    document.getElementById("arrow forward").addEventListener("click", function(){addText(this);} );
    document.getElementById("arrow backward").addEventListener("click", function(){addText(this);} );
    function addText(elem) 
    {
        document.getElementById("textarea").innerHTML += elem.value;
    }
};