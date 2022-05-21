import { DataTypes, Model } from "sequelize";

import sequelize from "../../config/db.js";
import Constant from "../util/constant.js";
import Sede from "./sede.js";

class Mesa extends Model {};

Mesa.init({
    id_mesa: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_sede: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Sede,
            key: "id_sede"
        }
    },
    nombre: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    libre: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    activa: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize,
    timestamps: false,
    tableName: Constant.TABLE_NAME.MESA_TABLE,
    modelName: "mesa"
});

Mesa.belongsTo(Sede, {
    foreignKey: "id_sede"
});

export default Mesa;