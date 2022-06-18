const express = require('express')
const chalk = require('chalk')
const connectDB = require('./connectDB')

const app = express()
app.use(express.json())
connectDB()

const routerlinks = require('./routes/routes');
app.use('/', routerlinks)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(chalk.yellow.inverse('Server is up and running on http://127.0.0.1:' + PORT))
})

