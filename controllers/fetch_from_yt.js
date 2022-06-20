const { google } = require('googleapis')
const dotenv = require('dotenv')
const Video = require('../models/video')
const cron = require('node-cron')
dotenv.config()

const YT_API_KEYS = [
    process.env.YT_API_KEY_0,
    process.env.YT_API_KEY_1,
    process.env.YT_API_KEY_2
]

const KEY_MAX = YT_API_KEYS.length
let key = 0;

dotenv.config()

const YouTube = google.youtube({
    version: 'v3',
    auth: YT_API_KEYS[key]
})

const fetcher =  async (search_query) => {

    try {

        const response = await YouTube.search.list({
            part: 'snippet',
            q: search_query,
            type: 'video'
        })
        
        if (!response) { 
            if (++key < KEY_MAX) {
                throw new Error("Shifting to second API key. Try again! It should work.")
            } else {
                throw new Error("All API keys have been exhausted")
            }
        }

        const videos = await response.data.items.map(item => 
            Video({
                title: item.snippet.title,
                channel: item.snippet.channelTitle,
                description: item.snippet.description,
                published_at: item.snippet.publishedAt,
                thumbnail: item.snippet.thumbnails.default.url
            })
        )

        await Video.insertMany(videos)

    } catch (err) {

        throw new Error(err.message)
    }
}

const fetch_from_yt = async (req, res) => {

    try {

        const search_query = req.query.q
        let D = 10

        if (req.query.delay) D = Math.min(10, parseInt(req.query.delay))

        cron.schedule(`*/${D} * * * * *`, () => {

            fetcher(search_query)
        });

        res.status(200).send({
            success: true,
            message: `Executing your query every ${D} seconds`
        })

    } catch(err) {

        res.status(500).send({
            success: false,
            error: err.message
        })

    }
}

module.exports = fetch_from_yt