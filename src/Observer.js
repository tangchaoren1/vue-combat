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
           Dep.target && dep.addSub(Dep.target);
           return val; 
        },
        set: function (newVal) {
            if (newVal != val) {
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
    update: function () {
        this.exfun(); 
    }
}

function Compile(el) {
  var nodes = el.childNodes;
  [].slice.call(nodes).forEach((node)=>{
      if(node.nodeType === 1){
        this.compile(node)
      }      
  })
}

Compile.prototype = {
    compile:function(node){
       var nodeAttrs = node.attributes;
       [].slice.call(nodeAttrs).forEach((attr)=>{
            this.bind(node,attr)
       })
    },
    bind: function(node,attr){
        var eleValue = attr.value;
        new Watcher(node,eleValue,function(){
            node.textContent = data[eleValue];
        })      
    }

}

let app = new Observer(data);
new Compile(target);





