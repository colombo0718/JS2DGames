const math = require('mathjs')
const layers = require('./layers.js')

function MSE(){
    this.lost_function=function(predic,lables){
        diff=math.add(predic,math.multiply(-1,lables))
        console.log(diff,math.multiply(diff,diff))
        return math.multiply(1,math.multiply(diff,diff))
    }

    this.lost_gradient=function(predic,lables){
        return math.add(predic,math.multiply(-1,lables))
    }
}

p=[0,0,0]
l=[3,3,3]
a=new MSE()


console.log(layers,a.lost_function(p,l),a.lost_gradient(p,l))