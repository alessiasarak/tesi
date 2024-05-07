const DatatTypes = require("sequelize");
const sequelize = require("./../database/connection");

const Card = require("./card");

const Address = sequelize.define("Address",
    {
        id: {
            type: DatatTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        street_name: {
            type: DatatTypes.STRING,
        },

        street_number: {
            type: DatatTypes.STRING,
        },

        cap: {
            type: DatatTypes.STRING,
        },

        city: {
            type: DatatTypes.STRING,
        },

        nation: {
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
        tableName: "address",
    }
);

sequelize.sync();

module.exports = Address;