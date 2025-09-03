const Bike = require('../models/Bike');
const { Op } = require('sequelize');

exports.getAllBikes = async (req, res) => {
    const { search } = req.query;
    const where = search ? {
        [Op.or]: [
            { brand: { [Op.iLike]: `%${search}%` } },
            { model: { [Op.iLike]: `%${search}%` } },
        ]
    } : {};

    const bikes = await Bike.findAll({ where });
    res.json(bikes);
};

exports.getBikeById = async (req, res) => {
    const bike = await Bike.findByPk(req.params.id);
    if (!bike) return res.status(404).json({ message: 'Bike not found' });
    res.json(bike);
};

exports.createBike = async (req, res) => {
    const newBike = await Bike.create({ ...req.body, sellerId: req.user.id });
    res.status(201).json(newBike);
};

exports.updateBike = async (req, res) => {
    const bike = await Bike.findByPk(req.params.id);
    if (!bike || bike.sellerId !== req.user.id)
        return res.status(403).json({ message: 'Unauthorized' });

    await bike.update(req.body);
    res.json(bike);
};

exports.deleteBike = async (req, res) => {
    const bike = await Bike.findByPk(req.params.id);
    if (!bike || bike.sellerId !== req.user.id)
        return res.status(403).json({ message: 'Unauthorized' });

    await bike.destroy();
    res.json({ message: 'Bike deleted' });
};
