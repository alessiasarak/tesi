const DatatTypes = require("sequelize");
const sequelize = require("./../database/connection");

const Card = require("./card");

const PhoneNumber = sequelize.define("PhoneNumber",
    {
        id: {
            type: DatatTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        label: {
            type: DatatTypes.STRING,
        },

        number: {
            type: DatatTypes.STRING,
        },

        fk_id_card: {
            type: DatatTypes.INTEGER,
            references: {
                model: Card, 
                key: "id"
            }
        },
    },
    {
        tableName: "phone_number",
    }
);

sequelize.sync();

module.exports = PhoneNumber;