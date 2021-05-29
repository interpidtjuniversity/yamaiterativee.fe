
class SimpleTask {
    constructor(task) {
        this.task = task
    }

    execute() {
        this.task()
    }
}

export default SimpleTask