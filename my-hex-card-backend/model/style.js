const DatatTypes = require("sequelize");
const sequelize = require("./../database/connection");

const Style = sequelize.define("Style",
    {
        name: {
            type: DatatTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
        },
        primary_color: {
            type: DatatTypes.STRING(6), // codice in esadecimale #rrggbb
            allowNull: false,
        },
        secondary_color: {
            type: DatatTypes.STRING(6), // codice in esadecimale #rrggbb
            allowNull: false,
        },
        tertiary_color: {
            type: DatatTypes.STRING(6), // codice in esadecimale #rrggbb
            allowNull: false,
        },
    },
    {
        tableName: "style",
        alter: true,
    }
);

sequelize.sync();

module.exports = Style;