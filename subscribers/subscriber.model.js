const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        apikey: { type: DataTypes.STRING, allowNull: false },
        is_active: { type: DataTypes.BOOLEAN, allowNull: false },
    };

    const options = {

    };

    return sequelize.define('Subscriber', attributes, options);
}