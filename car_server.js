const express = require('express')
const math = require('mathjs')
const SocketServer = require('ws').Server
const PORT = 4300
const server = express().listen(PORT, () => console.log(`Listening on ${PORT}`))
const ws = new SocketServer({ server })

const actions=['a','s','d']
var action=''

arr=[-100,-3,-2,-1,0,1,2,3,100]
console.log(sigmoid_vector(arr))

ws.on('connection', ws => {
    console.log('Client connected')
    ws.on('message', data => {
        var reward=(data.split('<')[1]+'').split('>')[0]
        stateNew=(data.split('(')[1]+'').split(')')[0]
        var phase=(data.split('{')[1]+'').split('}')[0]

        input= stateNew.split(',').slice(0,-1)
        w1=[[1,1,1], 
            [1,1,1],
            [1,1,1]]
        b1=[2,3,4]
        console.log(input,w1)
        x_w1=math.multiply(input, w1)
        x_w1_b1=math.add(x_w1,b1)

        console.log(x_w1_b1,sigmoid_vector(x_w1_b1))

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

function sigmoid(t){
    return 1/(1+Math.pow(Math.E, -t));
}

function sigmoid_vector(array){
    var sv=[]
    for(var i=0;i<array.length;i++){
        sv[i]= sigmoid(array[i])
    }
    return sv
}