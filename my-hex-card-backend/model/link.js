const DatatTypes = require("sequelize");
const sequelize = require("./../database/connection");

const Card = require("./card");

const Link = sequelize.define("Link",
    {
        id: {
            type: DatatTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        link: {
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
        tableName: "link",
    }
);

sequelize.sync();

module.exports = Link;