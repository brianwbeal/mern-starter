const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    try {
        res.status(200).json({ message: "successful GET request at /" })
    } catch(err) {
        res.status(500).json({ message: "server error" })
    }
})

module.exports = router