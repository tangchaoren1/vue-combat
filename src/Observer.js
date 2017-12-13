let data = {
    name: 'zhaoyang',
    age: 45,
    height: 175,
    hobby: 'female'
}
function Observer() {
    this.data = data;
    this.walk(data);
}
let p = Observer.prototype;
p.walk = function (obj) {
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
p.convert = function (key, val) {
    var dep = new Dep();
    
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function () {  
            console.log('访问了值')        
           Dep.target && dep.addSub(Dep.target);
           console.log(Dep.target)   
        },
        set: function (newVal) {
            console.log('数值发生了改变!')
            if (newVal != val) {
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

function Watcher(key) {
   this.value = this.get(key);
}
Watcher.prototype = {
    get: function (key) {
        Dep.target = this;
        this.value = key;
    },
    update: function () {
        
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
        new Watcher(data[eleValue])
        node.textContent = data[eleValue];
    }

}


new Compile(target);





let app = new Observer(data);