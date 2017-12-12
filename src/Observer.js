let data = {
    name: 'nigulasi',
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

p.convert = function (key, val) {
    var dep = new Dep();
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            return val;
        },
        set: function (newVal) {
            console.log('数值发生了改变!')
            val = newVal;
            dep.notify();
        }
    })
}

function Dep () {
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub)
    },
    notify: function() {
         this.subs.forEach(function(sub){
             sub.update();
         })
    }
}




let app = new Observer(data);