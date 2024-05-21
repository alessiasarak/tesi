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
        email: {
            type: DatatTypes.STRING(),
        },
        password: {
            type: DatatTypes.STRING(),
        },
        reset_password_token: {
            type: DatatTypes.STRING(30),
        },

        fk_role: {
            type: DatatTypes.STRING(20),
            defaultValue: "USER",
            allowNull: false,
            references: {
                model: Role, 
                key: "role"
            }
        }
    },
    {
        tableName: "user",
    }
);

sequelize.sync();

module.exports = User;