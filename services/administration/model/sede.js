import { DataTypes, Model } from "sequelize";

import sequelize from "../config/db.js";
import Constant from "../util/constant.js";

class Sede extends Model {}

Sede.init({
    id_sede: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descripcion: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    activa: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    creado_en: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
} , {
    sequelize,
    timestamps: false,
    tableName: Constant.TABLE_NAME.SEDE_TABLE,
    modelName: "sede"
});

export default Sede;