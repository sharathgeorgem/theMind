
const socket = openSocket('http://localhost:3000')

function onConnection () {
    socket.on('Connected', console.log('Received a Connected event from server'))
    console.log(socket)
}

export { onConnection }