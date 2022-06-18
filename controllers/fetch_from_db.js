const Video = require('../models/video')

const fetch_from_db = async (req, res) => {

    const query = req.query.q
    const limit = req.query.limit || 5
    const skip = (((req.query.page) || 1 ) - 1) * limit
    const desc = -1

    try {

        const videos = await Video.find({
            $title: { $search: query },
            $description: { $search: query }
        })
        .skip(skip)
        .limit(limit)
        .sort({ published_at: desc })

        res.status(200).send({
            success: true,
            videos
        })

    } catch (err) {

        res.status(500).send({
            success: false,
            error: err.message
        })

    }
}

module.exports = fetch_from_db