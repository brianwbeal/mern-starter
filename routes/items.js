const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

// require Item model
const Item = require('../models/Item')

// GET all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find({})
        if (items) {
            res.status(200).json(items)
        } else {
            res.status(404).json({ messasge: "No items matched the request" })
        }
    } catch(err) {
        res.status(500).json({ message: "server error" })
    }
})

// GET one item
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.find({ _id: req.params.id })
        if (item) {
            res.status(200).json(item)
        } else {
            res.status(404).json({ message: "No item matched the request" })
        }
    } catch(err) {
        res.status(500).json({ message: "server error" })
    }
})

// POST new item
router.post('/', async (req, res) => {
    try {
        if (req.body.name) {
            const newItem = new Item({
                name: req.body.name
            })
            await newItem.save(() => {
                console.log('new item created')
            })
            res.status(201).json(newItem)
        } else {
            res.status(400).json({ message: "A 'name' value is required to create a new item" })
        }
    } catch(err) {
        res.status(500).json({ message: "server error" })
    }
})

// PUT (update) existing item
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.find({ _id: req.params.id })
        if (item) {
            await Item.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name })
            res.status(204).end()
        } else {
            res.status(404).json({ message: "No Item matches the request" })
        }
    } catch(err) {
        res.status(500).json({ message: "server error" })
    }
})

// DELETE existing item
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.find({ _id: req.params.id })
        if (item) {
            await Item.deleteOne({ _id: req.params.id })
            res.status(204).end()
        } else {
            res.status(404).json({ message: "No Item matches the request" })
        }
    } catch(err) {
        res.status(500).json({ message: "server error" })
    }
})

module.exports = router