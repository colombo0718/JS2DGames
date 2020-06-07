const express = require('express')
const SocketServer = require('ws').Server
const PORT = 4300
const server = express().listen(PORT, () => console.log(`Listening on ${PORT}`))
const ws = new SocketServer({ server })

const gamma=0.9,lr=0.1,epsilon=0.9
const actions=['w','s']

var qTable=[],state='0,0',stateNew='0,0',a=0,action='',reward=0
var predict,target

qTable[state]=[0,0]
console.log(qTable[state],qTable[stateNew])
console.log('start')
ws.on('connection', ws => {
    console.log('Client connected')

    ws.on('message', data => {
        var reward=(data.split('<')[1]+'').split('>')[0]
        stateNew=(data.split('(')[1]+'').split(')')[0]
        var phase=(data.split('{')[1]+'').split('}')[0]
 
        setTimeout(function(){
            // 檢查是否有歷史
            if(qTable[stateNew]==undefined){
                qTable[stateNew]=[0,0]
            }
            // 紀錄學習
            predict=qTable[state][a]
            if(phase=="end"){
                target=1*reward+0
            }else{
                target=1*reward+gamma*Math.max.apply(null,qTable[stateNew])
            }
            qTable[state][a]+=lr*(target-predict)
            // 出現NaN除錯
            // console.log(qTable[stateNew].indexOf(Math.max.apply(null,qTable[stateNew])))
            if(isNaN(qTable[state][a])){
                console.log(target,phase,reward,gamma*Math.max.apply(null,qTable[stateNew]))
                console.log("NaN===================")
                return 0 
            }    
            console.log(qTable)
            // 回復新指令
            if(Math.random()>epsilon){
                a=Math.floor(Math.random()*actions.length)
            }else{
                // console.log(maxIndexs(qTable[stateNew]))
                // Math.max(qTable[stateNew])
                var midx=maxIndexs(qTable[stateNew])
                a=midx[Math.floor(Math.random()*midx.length)]
            }
            action=actions[a]
            if(phase=="end"){
                action='x'
            }

            ws.send(action)
            state=stateNew
        },50)
    })

    ws.on('close', () => {
        console.log('Close connected')
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
})
