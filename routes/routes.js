const express = require('express')
const router = express.Router()

const fetch_from_yt = require('../controllers/fetch_from_yt')
const fetch_from_db = require('../controllers/fetch_from_db')

router.get('/', (req, res) => {
    res.send('<h1> Welcome to Fampay Backend Task API </h1>')
})

router.get('/fetchyt', fetch_from_yt);

router.get('/fetchdb', fetch_from_db);

module.exports = router