const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "my_hex_card", "myhexcard", "", 
    {
        host: "hexagonswiss-sscb.artera.farm",
        dialect: "mysql",
        port: "3306",
        define: {
            timestamps: false,
        }
    }
);

module.exports = sequelize;