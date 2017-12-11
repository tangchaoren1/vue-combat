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