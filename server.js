require('dotenv').config({ path: './config/config.env' })
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// instantiate express app
const app = express()

// express middleware
app.use(express.json())
app.use(cors())

// conect to mongo
mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB Connection Error'))
db.once('open', () => console.log(`successfully connected to MongoDB`))

// define routes
app.use('/', require('./routes/index'))
app.use('/api/items', require('./routes/items'))

// request error handler route
app.use((req, res, next) => {
    const err = new Error("Not Found")
    err.status = 404;
    next(err)
})

// request error handler function
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
})

// start server
const port = 5000
app.listen(port, () => console.log(`app listening on port: ${port}`))