const express = require('express')
const SocketServer = require('ws').Server
const PORT = 4300
const server = express().listen(PORT, () => console.log(`Listening on ${PORT}`))
const ws = new SocketServer({ server })
const actions=['w','s']

console.log('start')
ws.on('connection', ws => {
    console.log('Client connected')

    ws.on('message', data => {
        console.log(data)
        if(data=="end"){
            console.log('aaaa')
            setTimeout(function(){ws.send('x')},500)
            // ws.send(' ')
            return 0
            // setTimeout(function(){ws.send(' ')},500)
        }
        setTimeout(function(){
            // ws.send('w')
            ws.send(actions[Math.floor(Math.random()*actions.length)])
        },100)
    })

    ws.on('close', () => {
        console.log('Close connected')
    })
})
