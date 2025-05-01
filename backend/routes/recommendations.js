const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');

// Returns a full itinerary for the given number of nights
router.get('/:nights', async (req, res) => {
  const nights = parseInt(req.params.nights);
  try {
    const itinerary = await Itinerary.findOne({ duration: nights });
    if (!itinerary) {
      return res.status(404).json({ message: 'No itinerary found for that duration' });
    }
    res.json(itinerary); // full itinerary with days
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
