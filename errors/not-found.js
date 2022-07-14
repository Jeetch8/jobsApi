const {StatusCodes} = require('http-status-codes')
const CustomApiError = require('./custom-api')

class NotFoundError extends CustomApiError{
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = NotFoundError