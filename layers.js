const math = require('mathjs')

function sigmoid(z){
    var bottom = math.add(1, math.exp(math.multiply(-1, z)));
    return math.dotDivide(1, bottom);
};

function sigmoidPrime(z){
    var a = sigmoid(z)
    var b = math.add(1,math.multiply(-1,sigmoid(z)))
    return math.dotMultiply(a,b)
};

// ============================

function layer(){

    this.prev=undefined
    this.next=undefined

    this.input_leng=1
    this.ouput_leng=1

    this.input_data=undefined
    this.ouput_data=undefined

    this.input_grad=undefined
    this.ouput_grad=undefined

    this.connect=function(layer){
        this.prev=layer
        layer.next=this
    }

    this.forward=function(){}

    this.get_forward_input=function(){
        if(this.prev){
            this.input_data=this.prev.ouput_data
        }
    }

    this.bacward=function(){}

    this.get_bacward_input=function(){
        // console.log('bw')
        if(this.next){
            this.input_grad=this.next.ouput_grad
        }
    }

    this.clear_grad=function(){}

    this.update_params=function(){}

    this.describe=function(){
        console.log('dimensions:',this.input_dim,this.ouput_dim)
    }
}

function activLayer(input_leng){
    layer.call(this)
    this.input_dim=input_leng
    this.ouput_dim=input_leng

    this.forward=function(){
        this.get_forward_input()
        this.ouput_data=sigmoid(this.input_data)
    }

    this.bacward=function(){
        // console.log(this.input_grad)
        this.get_bacward_input()
        // console.log(this.input_grad)
        this.ouput_grad=sigmoidPrime(this.input_data)
        // console.log(this.ouput_grad)
    }
}

function denseLayer(input_leng,ouput_leng){
    layer.call(this)
    this.weig=[]
    this.bias=[]

    this.weig_grad=[]
    this.bias_grad=[]

    this.input_dim=input_leng
    this.ouput_dim=ouput_leng

    this.weig=math.zeros(this.input_dim,this.ouput_dim)
    this.bias=math.zeros(this.ouput_dim)

    this.forward=function(){
        this.get_bacward_input()
        this.ouput_data=math.multiply(this.input_data,this.weig)
        // console.log(this.ouput_data,this.bias)
        this.ouput_data=math.add(this.ouput_data,this.bias)
    }

    this.bacward=function(){
        this.get_bacward_input()
        // console.log(this.weig,this.input_grad)
        // console.log(this.input_data,this.input_grad)
        this.ouput_grad=math.multiply(this.weig,this.input_grad)
        // console.log(math.transpose([this.input_data]),[this.input_grad])
        this.bias_grad=this.input_grad
        this.weig_grad=math.multiply(math.transpose([this.input_data]),[this.input_grad])
    }
}

var a=new denseLayer(2,3)
var b=new activLayer(3)
b.connect(a)
a.input_data=[1,2]
a.forward()
console.log(a.ouput_data)
b.forward()
console.log(b.ouput_data)
b.input_grad=[1,1,1]
// b.ouput_grad=[2,2,2]
a.weig=[[2,3,4],[4,3,2]]
b.bacward()
console.log(b.ouput_grad)
a.bacward()
// a.describe()
console.log(a.ouput_grad)

c=[[1],[2],[3]]
d=[[4],[5],[6]]
// console.log(c,math.transpose(d),math.multiply(c,math.transpose(d)))
