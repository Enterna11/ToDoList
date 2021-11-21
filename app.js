Vue.createApp({
    data() {
        return {
            message: '',
            tasks: {
                todo: [],
                completed: []
            },
            inputValue: ''
        }
    },
    mounted() {
       if (localStorage.getItem('tasks')) {
           this.tasks = JSON.parse(localStorage.getItem('tasks'))
        }
    },
    watch: {
        tasks: {
            handler: function (val) {
                if (val.todo.length === 0 && val.completed.length === 0) {
                    localStorage.clear()
                } else {
                    localStorage.setItem('tasks', JSON.stringify(this.tasks))
                }
            }, deep: true
        }
    },
    methods: {
        addTask() {
            if (this.validationTask(this.inputValue)) {
                this.tasks.todo.push(this.inputValue)
                this.inputValue = ''
                this.message = ''
            }
        },
        removeTask(mark, idx) {
            return  this.tasks[mark].splice(idx, 1)
        },
        replaceTask(mark, idx) {
            let replaced = this.removeTask(mark, idx)
            if (mark === 'todo') {
                this.tasks.completed = this.tasks.completed.concat(replaced)
            } else {
                this.tasks.todo = this.tasks.todo.concat(replaced)
            }
        },
        validationTask(task) {
            switch (true) {
                case task.length === 0:
                    this.message = 'Нельзя добавить пустую задачу'
                    break

                case this.tasks.todo.includes(task):
                    this.message = 'Такая задача есть в списке'
                    break

                default:
                    return true
            }
        }
    }
}).mount('#app')