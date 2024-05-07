const DatatTypes = require("sequelize");
const sequelize = require("./../database/connection");

const User = require("./user");
const Contact = require("./contact");

const Card = sequelize.define("Card",
    {
        id: {
            type: DatatTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        img: {
            type: DatatTypes.STRING(64000),
        },
        name: {
            type: DatatTypes.STRING(),
        },
        surname: {
            type: DatatTypes.STRING(),
        },
        company: {
            type: DatatTypes.STRING(),
        },
        function: {
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
        active: {
            type: DatatTypes.BOOLEAN,
        },
        
        background_color: {
            type: DatatTypes.STRING(7), // codice in esadecimale #rrggbb
            defaultValue: "#ffffff"
        },
        text_color: {
            type: DatatTypes.STRING(7), // codice in esadecimale #rrggbb
            defaultValue: "#000000"
        },
        button_color: {
            type: DatatTypes.STRING(7), // codice in esadecimale #rrggbb
            defaultValue: "#000000"
        },

        fk_id_user: {
            type: DatatTypes.INTEGER,
            references: {
                model: User, 
                key: "id"
            }
        },

        fk_id_contact: {
            type: DatatTypes.INTEGER,
            references: {
                model: Contact, 
                key: "id"
            }
        }
    },
    {
        tableName: "card",
    }
);

sequelize.sync();

module.exports = Card;