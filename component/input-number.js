/**
 * <div id="root" v-cloak>
    <input-number v-model='value' :max='100' :min='0' :step='10'></input-number>
</div>
 * const vm = new Vue({
        el:'#root',
        data:{
            value:5       
        }
   })} 
 */

function isValueNumber(value) {
    return (/(^-?[0-9]+\.{1}\d+$) | (^-?[1-9][0-9]*$) | (^-?0{1}$)/).test(value + '');
}

Vue.component('input-number', {
    //组件的HTML元素
    template: `<div class='input-number'>
              <input type='text' :value='currentValue' @change='handleChange' 
              @keyup.up='handleUp' @keyup.down='handleDown'>
              <button @click='handleDown' :disabled='currentValue < min'>-</button>
              <button @click='handleUp' :disabled='currentValue > max'>+</button>
              </div>
             `,
    //接收父模板传递的参数或者数据             
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        step: {
            type:Number,
            default:5
        },
        value: {
            type: Number,
            default: 0
        }
    },
    //必须是一个函数，引用父组件的value。因为组件是单向数据流，无法直接修改父模板的prop value
    data: function () {
        return {
            currentValue: this.value
        }      
    },
    // 如果从父组件修改了value，currentValue也要一起变化。
    watch: {
        currentValue: function (val) {
            this.$emit('input', val);
            this.$emit('on-change', val)
        },
        value: function (val) { //val：默认从父组件传过来的value.
            this.updateValue(val)
        }
    },
    methods: { 
        handleDown: function () {
            if (this.currentValue <= this.min) return;
            if(this.step) return this.currentValue -=this.step;
            this.currentValue -=1;
        },
        handleUp: function () {
            if(this.currentValue > this.max) return;
            if(this.step) return this.currentValue += this.step;
            this.currentValue +=1;
        },
        updateValue: function(val) {
            if(val > this.max) val = this.max;
            if(val < this.min) val = this.min;

            this.currentValue = val;
        },
        handleChange: function (event) {
            var val = event.target.value.trim();
            var max = this.max;
            var min = this.min;

            if(isValueNumber(val)){
                val = Number(val);
                this.currentValue  = val;
                if(val > max){
                    this.currentValue = this.max;
                }else if(val < min){
                    this.currentValue = this.max;
                }
            }else {
                event.target.value = this.currentValue;
            }
        },
        mounted: function() {
            this.updateValue(this.value);
        }
    }


})