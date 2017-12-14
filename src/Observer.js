/* <div id='observer'>
        <span n-html='name'>123</span>
        <span n-html='age'>123</span>
        <span n-html='hobby'>123</span>
</div> */
let data = {
    name: 'zhao',
    age: 45,
    height: 175,
    hobby: 'female'
}
function Observer() {
    this.data = data;
    this.walk(data);
}
let viewer = Observer.prototype;
viewer.walk = function (obj) {
    let val;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            val = obj[key];
            if (typeof val === 'object') {
                new Observer(val)
            }
            this.convert(key, val);
        }
    }
}
var target = document.getElementById('observer');
viewer.convert = function (key, val) {
    var dep = new Dep();
    
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            //把订阅者收集到一个数组中；  
           Dep.target && dep.addSub(Dep.target);
           return val; 
        },
        set: function (newVal) {
            if (newVal != val) {
                //如果值发生了改变出发订阅者的消息通知器。
                val = newVal;
                dep.notify()
            }          
        }
    })
}

function Dep() {
    this.subs = [];
}

Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub)
    },
    depend: function () {
        Dep.target.addDep(this);
    },
    notify: function () {
        this.subs.forEach(function (sub) {
            sub.update();
        })
    }
}

Dep.target = null;

function Watcher(node,key,upFunc) {
   this.value = this.get(key);
   this.exfun = upFunc;
   console.log(this.exfun)
}
Watcher.prototype = {
    get: function (key) {
        Dep.target = this;
        var value = app.data[key];
        Dep.target = null;
        return value;
    },
    //通过绑定的回调函数，更新所绑定元素的值。
    update: function () {
        this.exfun(); 
    }
}

//从根元素开始遍历，收集元素上的所有信息。
function Compile(el) {
  var nodes = el.childNodes;
  [].slice.call(nodes).forEach((node)=>{
      //如果是元素
      if(node.nodeType === 1){
        this.compile(node)
      }      
  })
}

Compile.prototype = {
    compile:function(node){
        //收集元素上绑定的所有属性
       var nodeAttrs = node.attributes;
       [].slice.call(nodeAttrs).forEach((attr)=>{
            this.bind(node,attr)
       })
    },
    bind: function(node,attr){
        //更新元素上的text,并且添加一个回调函数
        var eleValue = attr.value;
        new Watcher(node,eleValue,function(){
            node.textContent = data[eleValue];
        })      
    }

}

let app = new Observer(data);
new Compile(target);





