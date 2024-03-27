const DatatTypes = require("sequelize");
const sequelize = require("./../database/connection");

const Role = sequelize.define("Role",
    {
        role: {
            type: DatatTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
        }
    },
    {
        tableName: "role",
        alter: true,
    }
);

sequelize.sync();

module.exports = Role;