class BasePath{
    static BASE_PATH = "/api"
    static BASE_PATH_USER = "/user";
}

class TableName{
    static USER_TABLE = "scib_usuario";
    static ROL_TABLE = "scib_rol";
    static SEDE_TABLE = "scib_sede";
}

export default class Constant{
    static BASE_PATH = BasePath;
    static TABLE_NAME = TableName;
};