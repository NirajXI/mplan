const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        subscriber_id: { type: DataTypes.INTEGER, allowNull: false },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        apikey: { type: DataTypes.STRING, allowNull: false },
        apitype: { type: DataTypes.STRING, allowNull: false },
        result: { type: DataTypes.JSON, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false },
        requestdate: { type: DataTypes.DATE, allowNull: false }
    };

    return sequelize.define('Apirequests', attributes);
}