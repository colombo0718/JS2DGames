const math = require('mathjs')

function layer(){
    this.weig=[]
    this.bias=[]

    this.prev=1
    this.next=undefined

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
        this.input_data=this.prev.ouput_data
    }

    this.bacward=function(){}

    this.get_bacward_input==function(){
        this.input_grad=this.next.ouput_grad
    }
}

function denseLayer(){
    layer.call(this)
}

var a=new layer()
var b=new denseLayer()
console.log(a,b)
a.connect(b)