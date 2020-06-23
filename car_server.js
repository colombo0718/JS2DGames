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

        input= stateNew.split(',').slice(0,-1)
        w1=[[1,1,1,1],
            [0,0,0,0],
            [0,0,0,0]]
        b1=[-50,-150,-250,-320]
        // console.log(input,w1)
        x_w1=math.multiply(input, w1)
        x_w1_b1=math.add(x_w1,b1)
        // z1=sigmoid_vector(x_w1_b1)
        z1=tanH_vector(x_w1_b1)
        w2=[[ 1, 0, 0],
            [-1, 1, 0],
            [ 0,-1, 1],
            [ 0, 0,-1]]
        b2=[0,0,0]
        z1_w2=math.multiply(z1, w2)
        z1_w2_b2=math.add(z1_w2,b2)
        z2=tanH_vector(z1_w2_b2)
        w3=[[0,0,1],
            [0,1,0],
            [1,0,0]]
        // console.log(x_w1_b1,sigmoid_vector(x_w1_b1))
        z3=math.multiply(z2, w3)
        // console.log(z1,z2,z3,maxIndexs(z3))
        console.log(z1,z2,z3)
        midx=maxIndexs(z3)
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
    // console.log(arr,max,arr.length)
    for(var i=0;i<arr.length;i++){
        // console.log(i)
        if(arr[i]==max){
            midx.push(i)
            // console.log('add')
        }
    }
    // console.log(midx)
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