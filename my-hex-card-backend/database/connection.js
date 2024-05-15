const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "my_hex_card", "root", "", 
    {
        host: "localhost",
        dialect: "mysql",
        port: "3306",
        define: {
            timestamps: false,
        }
    }
);

module.exports = sequelize;