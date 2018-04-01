var app = new Vue({
    el: '#App', 
    data: {
        navs: [
            {url: '#S1', name:'匯率計算器', active: false},
            {url: '#S2', name:'TodoList', active: false}
        ],
        activeNav: 0,
        NT: 1,
        todos: [
            {no: 1, content: '寫一篇文章', completed: false},
            {no: 2, content: '打電話給某某某', completed: false},
            {no: 3, content: '練習Vue.js程式', completed: true},
        ],
        list: [],
        newTodo: '',
        filter: 'all',
        tabs: [
            {name:'全部', value: 'all', count: 0, active: true}, 
            {name:'未完成', value: 'incomplete', count: 0, active: false}, 
            {name:'已完成', value: 'completed', count: 0, active: false}
        ],
        activeTab: 0,
        isChecked: 0
    },
    created: function () {
        this.getCount();
        this.list = this.todos;
    },
    computed: {
        japan: function() {
            return this.NT * 0.2713;
        },
        hongkong: function() {
            return this.NT * 3.753;
        },
        america: function() {
            return this.NT * 29.297;
        },
        china: function() {
            return this.NT * 4.712;
        },
        australia: function() {
            return this.NT * 22.7;
        }, 
        todoList: function() {
            switch(this.filter) {
                case 'completed':
                    return this.getTodoList(true);
                case 'incomplete':
                    return this.getTodoList(false);
                default:
                    return this.todos;
            }
        }
    },
    methods: {
        addTodo: function(todo) {
            var no = this.todos.length + 1;
            this.todos.push({no: no, content: todo, completed: false});
        },
        removeTodo: function(todo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
            this.getCount();
        },
        completedTodo: function(todo) {
            this.getCount();
        },
        checkedAll: function() {
            for(var index in this.list) {
                this.list[index].completed = this.isChecked;
            }
            this.getCount();
        }, 
        getTodoList: function(isCompleted) {
            this.list = [];
            for(var index in this.todos) {
                if(this.todos[index].completed === isCompleted) {
                    this.list.push(this.todos[index]);
                }
            }
            return this.list;
        }, 
        getCount() {
            this.tabs[0].count = this.allCount();
            this.tabs[1].count = this.incompleteCount();
            this.tabs[2].count = this.completedCount(); 
        },
        allCount: function() {
            return this.todos.length;
        },
        incompleteCount: function() {
            var _this = this;
            return this.todos.filter(function(todo){
                return !_this.todos[_this.todos.indexOf(todo)].completed;
            }).length;
        },
        completedCount: function() {
            var _this = this;
            return this.todos.filter(function(todo){
                return _this.todos[_this.todos.indexOf(todo)].completed;
            }).length;
        }, 
        setFilter: function(filter) {
            this.filter = filter;
        },
        setTab: function(tab) {
            var index = this.tabs.indexOf(tab);
            this.tabs[this.activeTab].active = false;
            this.tabs[index].active = true;
            this.activeTab = index;
            this.setFilter(tab.value);
        },
    }
});