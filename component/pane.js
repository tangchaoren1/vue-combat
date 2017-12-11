/* <tabs v-model='activeKey'>
            <pane label='标签一' name='1'>
                这里是标签一的内容
            </pane>
            <pane label='标签二' name='2'>
                这里是标签二的内容
            </pane>
            <pane label='标签三' name='3'>
                这里是标签三的内容
            </pane>
        </tabs> */
Vue.component('pane', {
    name:'pane',
    template: `<div class='pane' v-show='isShow'>
                <slot></slot>
             </div>`,
    props: {
        name: {
            type: String
        },
        label: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isShow: true
        }
    },
    methods: {
      updateNav () {
          this.$parent.updateNav();
      },
      watch: {
          label () {
              this.updateNav();
          }
      }
    },
    mounted () {
        this.updateNav();
    }
})