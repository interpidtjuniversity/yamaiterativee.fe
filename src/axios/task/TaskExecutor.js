import React from 'react'


class TaskExecutor{

    constructor(executable, duration) {
        this.executable = executable
        this.duration = duration
        this.interval = setInterval(() => this.executable.execute(), this.duration)
    }

    kill() {
        clearInterval(this.interval)
    }
}

export default TaskExecutor