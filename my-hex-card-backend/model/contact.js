const DatatTypes = require("sequelize");
const sequelize = require("./../database/connection");

const Contact = sequelize.define("Contact",
    {
        id: {
            type: DatatTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
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
        email: {
            type: DatatTypes.STRING(),
        },
    },
    {
        tableName: "contact",
    }
);

sequelize.sync();

module.exports = Contact;