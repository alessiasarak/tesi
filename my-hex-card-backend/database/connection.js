const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "my_hex_card", "root", "", 
    {
        host: "127.0.0.1",
        dialect: "mysql",
        port: "3306",
        define: {
            timestamps: false,
        }
    }
);

module.exports = sequelize;