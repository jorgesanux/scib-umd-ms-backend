import {Sequelize} from "sequelize";

const sequelize =new Sequelize(
    process.env.PGDATABASE, 
    process.env.PGUSER, 
    process.env.PGPASSWORD, 
    {
        host: process.env.PGHOST,
        post: process.env.PGPORT,
        dialect: "postgres",
        logging: console.log
    }
);

export default sequelize;