const express = require('express')
const math = require('mathjs')
const SocketServer = require('ws').Server
const PORT = 4300
const server = express().listen(PORT, () => console.log(`Listening on ${PORT}`))
const ws = new SocketServer({ server })

const actions=['a','s','d'],epsilon=.9
var action=''

arr=[-100,-3,-2,-1,0,1,2,3,100]
// console.log(sigmoid_vector(arr))

ws.on('connection', ws => {
    console.log('Client connected')
    ws.on('message', data => {
        var reward=(data.split('<')[1]+'').split('>')[0]
        stateNew=(data.split('(')[1]+'').split(')')[0]
        var phase=(data.split('{')[1]+'').split('}')[0]

        x0= stateNew.split(',').slice(0,-1)

        w1=[[1,1,0],
            [0,0,1],
            [0,0,0]]
        b1=[-130,-270,-200]
        x0_w1=math.multiply(x0, w1)
        x0_w1_b1=math.add(x0_w1,b1)
        x1=tanH_vector(x0_w1_b1)

        w2=[[-1, 1, 1, 1],
            [-1,-1,-1, 1],
            [ 0,-1, 1, 0]]
            // [ 0,-.1, .1, 0]]
            
        b2=[-0,-0,-0,-0]
        // b2=[-1,-1,-1,-1]    

        x1_w2=math.multiply(x1, w2)
        x1_w2_b2=math.add(x1_w2,b2)
        console.log(x1_w2_b2)
        x2=tanH_vector(x1_w2_b2)
        // x2=sigmoid_vector(x1_w2_b2)
        // console.log(x0,x1,x1_w2_b2,x2)

        w3=[[0,0,1],
            [0,0,1],
            [1,0,0],
            [1,0,0]]
        b3=[1,1,1]
        // b3=[0,0,0]
        // console.log(x_w1_b1,sigmoid_vector(x_w1_b1))
        console.log(x2,w3)
        x2_w3=math.multiply(x2, w3)
        x2_w3_b3=math.add(x2_w3,b3)
        x3=tanH_vector(x2_w3_b3)
        // console.log(x0,x1,x2,x3)
        console.log(print(x0),print(x1),print(x2),print(x3))
        midx=maxIndexs(x3)

        // if(Math.random()>epsilon){
            // a=Math.floor(Math.random()*actions.length)
        // }else{
            a=midx[Math.floor(Math.random()*midx.length)]
        // }
        action=actions[a]
        console.log(action)
        // if(phase=='end'){action='x'}
        if(phase=='end'){return 0 }
        ws.send(action)
    })
    ws.on('close', () => {
        console.log('Close connected')
    })
})

var maxIndexs=function(arr){
    var midx=[]
    var max=Math.max.apply(null,arr)
    for(var i=0;i<arr.length;i++){
        if(arr[i]==max){
            midx.push(i)
        }
    }
    return midx
}

// acticate functions ----------------------------

function tanH(t){
    return 2/(1+Math.pow(Math.E, -2*t))-1;
}

function tanH_vector(array){
    var tv=[]
    for(var i=0;i<array.length;i++){
        tv[i]= tanH(array[i])
    }
    return tv
}

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

// ---------------------
function print(value) {
    const precision = 3
    return math.format(value, precision)
}