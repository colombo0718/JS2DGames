const math = require('mathjs')
const layers = require('./layers.js')

function MSE(){
    this.loss_function=function(predic,lables){
        diff=math.add(predic,math.multiply(-1,lables))
        // console.log(diff,math.multiply(diff,diff))
        return math.multiply(1,math.multiply(diff,diff))
    }

    this.loss_gradient=function(predic,lables){
        return math.add(predic,math.multiply(-1,lables))
    }
}

function sequentialNetwork(){
    this.layers=[]
    this.loss=new MSE()

    this.add=function(newLayer){
        this.layers.push(newLayer)
        var len=this.layers.length
        if(len>1){
            this.layers[len-2].connect(this.layers[len-1])
        }
    }

    this.describe=function(){
        var  len=this.layers.length
        for(var i=0;i<this.layers.length;i++){
            console.log("layer:",i)
            this.layers[i].describe()
        }
    }

    this.train=function(train_datas,epochs,learning_rate,test_datas=undefined){
        console.log('start training')
        // console.log(test_data)
        var len=train_datas.length
        for(var i=0;i<epochs;i++){
            for(var j=0;j<len;j++){
                // console.log(i,j)
                this.forward_bacward(train_datas[j])
            }
            this.update(learning_rate)
            // console.log(this.layers[2].weig,this.layers[2].weig_grad)
        }
    }

    this.forward_bacward=function(train_data){
        // console.log(this.loss.loss_gradient([1,2],[3,4]))
        var len=this.layers.length
        this.layers[0].input_data=train_data[0]
        for(var i=0;i<len;i++){
            this.layers[i].forward()
        }
        // console.log(this.layers[len-1].ouput_data,train_data[1])
        this.layers[len-1].input_grad=this.loss.loss_gradient(this.layers[len-1].ouput_data,train_data[1])
        for(var i=len-1;i>0;i--){
            this.layers[i].bacward()
        }
    }

    this.update=function(rate){
        // console.log('updating')
        var len=this.layers.length
        for(var i=0;i<len;i++){
            // console.log(i)
            this.layers[i].update_params(rate)
        } 
        console.log('aaa',this.layers[2].weig._data,this.layers[2].weig_grad._data)
        for(var i=0;i<len;i++){
            this.layers[i].clear_grad()
        }
    }
}



// p=[0,0,0]
// l=[3,3,3]
// a=new layers.denseLayer(1,3)
// b=new layers.activLayer(3)
// c=new layers.denseLayer(3,2)
// d=new layers.activLayer(2)
// sn=new sequentialNetwork()
// sn.add(a)
// sn.add(b)
// sn.add(c)
// sn.add(d)
// sn.layers[0].input_data=[1]
// sn.layers[0].forward()
// sn.layers[1].forward()
// sn.layers[2].forward()
// sn.layers[3].forward()

// console.log(a,sn.layers)
// sn.describe()
// lis=[1,2,3,4]

// sn.train([1,2,3,4],4,0.1,1)
// console.log(lis[lis.length-1])
// console.log(layers,a.lost_function(p,l),a.lost_gradient(p,l))
// train(1,2,3,4,5)

module.exports={
    sequentialNetwork:sequentialNetwork
}