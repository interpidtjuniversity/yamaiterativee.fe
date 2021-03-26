import axios from "axios";

class APIFetcher {
    constructor(url, parser, callback) {
        this.url = url
        this.parser = parser
        this.callback = callback
    }

    execute() {
        const _this = this
        axios.get(_this.url)
            .then(function (response) {
                _this.callback(_this.parser(response))
            })
            .catch(function (error) {
            })
    }
}

export default APIFetcher