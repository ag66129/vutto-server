const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getAllBikes,
    getBikeById,
    createBike,
    updateBike,
    deleteBike
} = require('../controllers/bikeController');

router.get('/', getAllBikes);
router.get('/:id', getBikeById);
router.post('/', auth, createBike);
router.put('/:id', auth, updateBike);
router.delete('/:id', auth, deleteBike);

module.exports = router;
