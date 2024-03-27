const DatatTypes = require("sequelize");
const sequelize = require("./../database/connection");

const User = require("./user");
const Style = require("./style");

const Card = sequelize.define("Card",
    {
        id: {
            type: DatatTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DatatTypes.STRING(),
        },
        subtitle: {
            type: DatatTypes.STRING(),
        },
        youtube: {
            type: DatatTypes.STRING(),
        },
        whatsapp: {
            type: DatatTypes.STRING(),
        },
        linkedin: {
            type: DatatTypes.STRING(),
        },
        facebook: {
            type: DatatTypes.STRING(),
        },
        instagram: {
            type: DatatTypes.STRING(),
        },

        fk_id_user: {
            type: DatatTypes.INTEGER,
            references: {
                model: User, 
                key: "id"
            }
        },

        fk_name_style: {
            type: DatatTypes.STRING(20),
            // defaultValue: "default",
            // allowNull: false,
            references: {
                model: Style, 
                key: "name"
            }
        }
    },
    {
        tableName: "card",
    }
);

sequelize.sync();

module.exports = Card;