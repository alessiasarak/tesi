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
    }
);

sequelize.sync();

try{
    Role.create({ role: "USER "});
    Role.create({ role: "SUPER_USER "});
    Role.create({ role: "ADMIN "});
}catch(error){}


module.exports = Role;