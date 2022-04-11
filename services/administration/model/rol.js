import { DataTypes, Model } from "sequelize";

import sequelize from "../config/db.js";
import Constant from "../util/constant.js";

class Rol extends Model {}

Rol.init({
    id_rol: {
        type: DataTypes.STRING(3),
        primaryKey: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    creado_en: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
},{
    sequelize,
    timestamps: false,
    tableName: Constant.TABLE_NAME.ROL_TABLE,
    modelName: "rol"
});

export default Rol;