const mongoose = require('mongoose')
const chalk = require('chalk')

const db_name = 'ytstore'
const url = `mongodb://127.0.0.1:27017/${db_name}`

const connectDB = () => {
    mongoose.connect(url)
    .then(() => {
        console.log(chalk.green.inverse('Server successfully connected to DB'))
    })
    .catch((err) => {
        console.log(chalk.red.inverse('Server failed to connect to DB'))
        console.log(err.message)
    })
}

module.exports = connectDB