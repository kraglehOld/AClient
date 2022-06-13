const socket = io('https://node.rizn.top:25503');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

var username = prompt("Choose your username:");

if (username === '') {
    window.location.reload();
}

if (username.length <= 2) {
    window.location.reload();
}

appendMessage('You joined the chat.', true);

socket.emit('new-user', username);

socket.on('chat-message', data => {

    if (data.message === '') return;
    appendMessage(`${createTimestamp()} | ${data.name}: ${data.message}`, false);

});

socket.on('user-connected', name => {

    appendMessage(`${name} has joined the chat!`, true);
    
});

socket.on('user-disconnected', name => {

    appendMessage(`${name} has disconnected!`, true)

});

messageForm.addEventListener('submit', e => {

    e.preventDefault()
    const message = messageInput.value;
    appendMessage(`${createTimestamp()} | You: ${message}`, false);
    socket.emit('send-chat-message', message);
    messageInput.value = '';

})

function appendMessage(message, centered) {

    if (centered === true) {
        const messageElement = document.createElement('div');
        messageElement.style.textAlign = "center";
        messageElement.innerText = message
        messageContainer.append(messageElement)
        scrollToBottom()
    } 

    if (centered === false || centered === null) {
        const messageElement = document.createElement('div');
        messageElement.innerText = message
        messageContainer.append(messageElement)
        scrollToBottom()
    } 

}

function createTimestamp() {

    var date = new Date(); 

    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    if (h === 0) {
        return timestamp = "00:" + m + ":" + s;
    }

    if (m === 0) {
        return timestamp = h + ":00:" + s;
    }

    if (s === 0) {
        return timestamp = h + ":" + m + ":00";
    }

    if (h < 10) {
        h = '0' + h;
    }

    if (m < 10) {
        m = '0' + m;
    }

    if (s < 10) {
        s = '0' + s;
    }

    return timestamp = h + ":" + m + ":" + s;

}

function scrollToBottom() {
    const latest = document.getElementById('latest');
    latest.scrollIntoView();
}
