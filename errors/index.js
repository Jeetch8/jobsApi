const CustomApiError = require('./custom-api')
const UnautheticatedError = require('./unautheticated')
const NotFoundError = require('./not-found')
const BadRequestError = require('./bad-request')


module.exports = {
    CustomApiError,
    UnautheticatedError,
    NotFoundError,
    BadRequestError
}