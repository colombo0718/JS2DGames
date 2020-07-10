const math = require('mathjs')
const layers = require('./layers.js')
const network = require('./network.js')

// console.log(layers,network)

// create train data
var train_datas=[]
for(var i=0;i<100;i++){
    x=2*math.pi*(i/100)
    y=[math.sin(x),math.cos(x)]
    // console.log(x,y)
    train_datas[i]=[[x],[math.sin(x),math.cos(x)]]
}
// console.log(train_datas)



a=new layers.denseLayer(1,3)
b=new layers.activLayer(3)
c=new layers.denseLayer(3,2)
sn=new network.sequentialNetwork()
sn.add(a)
sn.add(b)
sn.add(c)

// a.input_data=train_datas[0][0]
// sn.forward_bacward(train_datas[0])
// console.log(a.weig._data,a.weig_grad,c.weig._data,c.weig_grad)
// sn.update(.1)
// console.log(a.weig._data,a.weig_grad._data,c.weig._data,c.weig_grad._data)
sn.train(train_datas,1000,.001)
console.log(a.weig._data,a.weig_grad._data,c.weig._data,c.weig_grad._data)