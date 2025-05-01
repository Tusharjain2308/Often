const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');

router.post('/', async (req, res) => {
    try {
        const itinerary = new Itinerary(req.body);
        await itinerary.save();
        res.status(201).json(itinerary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const itineraries = await Itinerary.find();
        res.json(itineraries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
        res.json(itinerary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;