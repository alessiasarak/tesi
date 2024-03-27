const DatatTypes = require("sequelize");
const sequelize = require("./../database/connection");

const Role = require("./role");

const User = sequelize.define("User",
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
        email: {
            type: DatatTypes.STRING(),
        },
        password: {
            type: DatatTypes.STRING(),
        },

        fk_role: {
            type: DatatTypes.STRING(20),
            // defaultValue: "SINGLE_USER",
            // allowNull: false,
            references: {
                model: Role, 
                key: "role"
            }
        }
    },
    {
        tableName: "user",
        alter: true,
    }
);

sequelize.sync();

module.exports = User;