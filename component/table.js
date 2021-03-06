Vue.component('v-table', {
    props: {
        theadData: {
            //默认的数组
            type: Array,
            default: function () {
                return [];
            }
        },
        messageData: {
            type: Array,
            default: function () {
                return [];
            }
        }
    }, 
    data: function () {
        return {
            currentTheadData: [],
            currentDiscription: [],
            isAsc: true
        }
    },
    render: function (h) {
        var ths = [];
        this.currentTheadData.forEach((col, index) => {
            if (col.isSort) {
                ths.push(h('th'), [
                    h('span', col.title),
                    h('a', {
                        class: {
                            on: col._sortType === 'asc'
                        },
                        on: {
                            click: function () {
                                this.handleSortBy(index);
                            }
                        }
                    })
                ], 'up'),
                    h('a', {
                        class: {
                            on: col._sortType === 'desc'
                        },
                        on: {
                            click: function () {
                                this.handleSortBy(index);
                            }
                        }
                    }, 'down')
            } else {
                ths.push(h('th', col.title))
            }
        })

        let trs = [];
        this.currentDiscription.forEach((row, index) => {
            let tds = [];
            this.currentTheadData.forEach((cell) => {
                tds.push(h('td', row[cell.key]));
            });
            trs.push(h('tr', tds))
        })
        return h('table', [
            h('thead', [h('tr', ths)]),
            h('tbody', trs)
        ])

    },
    methods: {
        makeCloumns: function () {
            this.currentTheadData = this.theadData.map((col, index) => {
                col._sortType = 'normal';
                col._index = index;
                return col;
            })
        },
        makeDiscription: function () {
            this.currentDiscription = this.messageData.map((row, index) => {
                row._index = index;
                return row;
            })
        },
        handleSortBy: function (index) {
            let key = this.currentTheadData[index].key;
            this.currentTheadData.forEach((col) => {
                col._sortType = 'normal';
            })
            if (this.isAsc) {
                this.currentDiscription[index]._sortType = 'asc';
                this.currentDiscription.sort(function (a, b) {
                    return a[key] > b[key] ? 1 : -1;
                })
                this.isAsc = false;
            } else {
                this.currentDiscription[index]._sortType = 'desc';
                this.currentDiscription.sort(function (a, b) {
                    return a[key] < b[key] ? 1 : -1;
                })
                this.isAsc = true;
            }
        },
        watch:{
            messageData: function(){
                this.makeDiscription();
                var sortedColumn = this.currentDiscription.filter((col) =>{
                    return col._sortType !== 'normal';
                })
                if(sortedColumn.length >0){
                    this.handleSortBy(sortedColumn[0].index);
                }
            }
        },
        mounted() {
            this.makeCloumns();
            this.makeDiscription();
        }
    }
})