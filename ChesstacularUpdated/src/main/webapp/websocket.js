/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// script to initiate the session handshake with server when this file is loaded by browser
// https://netbeans.org/kb/docs/javaee/maven-websocketapi.html#Exercise_1
var wsUri = "ws://" + document.location.host + document.location.pathname + "chessgameendpoint";
var websocket = new WebSocket(wsUri);

websocket.onerror = function(evt) { onError(evt) };

function onError(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}



// For testing purposes
var output = document.getElementById("output");
websocket.onopen = function(evt) { onOpen(evt) };

function writeToScreen(message) {
    output.innerHTML += message + "<br>";
}

function onOpen() {
    writeToScreen("Connected to " + wsUri);
}
// End test functions


websocket.onmessage = function(evt) { onMessage(evt) };

function sendText(json) {
    websocket.send(json);
}
                
function onMessage(evt) {
    redrawChessboard(evt.data);
    updateChat(evt.data);
    notifyEndGame(evt.data);
}

