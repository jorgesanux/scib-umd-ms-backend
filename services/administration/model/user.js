import { DataTypes, Model } from "sequelize";

import sequelize from "../config/db.js";
import Constant from "../util/constant.js";
import Rol from "./rol.js";
import Sede from "./sede.js";

class User extends Model {};

User.init({
    id_usuario: {
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
    id_rol: {
        type: DataTypes.STRING(3),
        allowNull: false,
        references: {
            model: Rol,
            key: "id_rol"
        }
    },
    documento: {
        type: DataTypes.STRING(12),
        allowNull: false,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    creado_en: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},{
    sequelize,
    timestamps: false,
    tableName: Constant.TABLE_NAME.USER_TABLE
});

export default User;