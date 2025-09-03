const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;
const User = require('./User');

const Bike = sequelize.define('Bike', {
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    kilometers_driven: DataTypes.INTEGER,
    location: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
});

Bike.belongsTo(User, { foreignKey: 'sellerId' });

module.exports = Bike;
