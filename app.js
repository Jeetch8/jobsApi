require('dotenv').config()
require('express-async-errors')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')


const express = require('express')
const app = express()
const notFoundMiddleware = require('./middlerware/not-found')
const errorHandlerMiddleware = require('./middlerware/error-handler')
const { mongoose } = require('mongoose')
const autheticateUser = require('./middlerware/authentication')

app.set('trust proxy',1)
app.use(rateLimit({
    windowMs:15*60*1000,
    max:100
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.get('/',(req,res) => {
    res.send("jobs api")
})


app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1/jobs',autheticateUser,require('./routes/jobs'))

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`)
        app.listen(port,console.log(`Server is listning on ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()