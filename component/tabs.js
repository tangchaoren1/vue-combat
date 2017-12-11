Vue.component('tabs', {
    template: `<div class="tabs">
                    <div class="tabs-bar">
                        <div :class='tabCls(item)' v-for='(item,index) in navList' @click='handleChange(index)'>
                            {{item.label}}
                        </div>
                    </div>
                    <div class="tabs-content">
                        <slot></slot>
                    </div>
               </div>`,
    props: {
        value: {
            type: [String, Number]
        }
    },
    data: function () {
        return {
            currentValue: this.value,
            navList: []
        }
    },
    methods: {
        tabCls: function (item) {
            return [
                'tabs-tab',
                {
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        getTabs() {
            return this.$children.filter(function (item) {
                return item.$options.name === 'pane';
            })
        },
        updateNav() {
            this.navList = [];
            this.getTabs().forEach((pane, index) => {
                this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                })
                if (!pane.name) pane.name = index;
                if (index === 0) {
                    if (!this.currentValue) {
                        this.currentValue = pane.name || index;
                    }
                }

            })
            this.updateStatus();
        },
        updateStatus() {
            var tabs = this.getTabs();
            console.log(tabs)
            tabs.forEach(function (tab) {
                tab.isShow = tab.name === this.currentValue
            }.bind(this))
        },
        handleChange: function (index) {
            let nav = this.navList[index];
            let name = nav.name;
            this.currentValue = name;
            this.updateStatus();
        }
    }
})