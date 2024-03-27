const DatatTypes = require("sequelize");
const sequelize = require("./../database/connection");

const Card = require("./card");

const Email = sequelize.define("Email",
    {
        id: {
            type: DatatTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        email: {
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
        tableName: "email",
    }
);

sequelize.sync();

module.exports = Email;