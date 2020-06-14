const express = require('express')
const math = require('mathjs')
const SocketServer = require('ws').Server
const PORT = 4300
const server = express().listen(PORT, () => console.log(`Listening on ${PORT}`))
const ws = new SocketServer({ server })

const actions=['a','s','d']
var action=''

const c = [[1, 2,1]]
const d = [[1, 1], [1, 1], [1, 1]]
console.log(c,d,math.multiply(c, d) )

ws.on('connection', ws => {
    console.log('Client connected')
    ws.on('message', data => {
        var reward=(data.split('<')[1]+'').split('>')[0]
        stateNew=(data.split('(')[1]+'').split(')')[0]
        var phase=(data.split('{')[1]+'').split('}')[0]



        input= stateNew.split(',').slice(0,-1)
        w1= [[1, 1], [1, 1], [1, 1]]
        console.log(data,stateNew,input,w1)
        x_w1=math.multiply(input, w1)
        console.log(x_w1)

        a=Math.floor(Math.random()*actions.length)
        action=actions[a]
        // if(phase=='end'){action='x'}
        if(phase=='end'){return 0 }
        ws.send(action)
    })
    ws.on('close', () => {
        console.log('Close connected')
    })
})