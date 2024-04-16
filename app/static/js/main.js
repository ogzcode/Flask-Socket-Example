const socket = io()

socket.on('connect', () => {
    console.log('Connected to the server')
})

socket.on('message', (message) => {
    const container = document.getElementById('messages')
    const containerAttr = container.getAttribute('data-sender-id')
    const noMessageBox = document.querySelector('#no-message')
    console.log(typeof containerAttr, typeof message.sender_id)

    if (noMessageBox) {
        noMessageBox.remove()
    }

    const messageElement = document.createElement('div')
    messageElement.classList.add('box', 'mt-4', 'mb-4')
    if (message.sender_id === parseInt(containerAttr)) {
        messageElement.innerHTML = `
            <p class="has-background-primary-light" style="text-align: right;">${message.message}</p>
        `
    } else {
        messageElement.innerHTML = `
            <p style="text-align: left;">${message.message}</p>
        `
    }
    container.appendChild(messageElement)
})

function roomAction(newValue, oldValue, currentUserEmail) {
    if (newValue === oldValue) {
        return
    }

    socket.emit('join', {
        receiver_id: newValue.id,
    })
}

function deleteAllMessage() {
    const container = document.getElementById('messages')
    container.innerHTML = '<div class="box">No messages</div>'

    fetch('/deleteAllMessage', {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error('Error:', error)
        })
}

function sendMessage(selectedUser) {
    const messageInput = document.querySelector('textarea')
    const message = messageInput.value.trim()

    if (!message) {
        return
    }

    socket.emit('message', {
        message: message,
        receiver_id: selectedUser.id,
    })

    messageInput.value = ''
}