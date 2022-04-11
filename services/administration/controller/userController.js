import db from "../config/db.js";

import User from "../model/user.js";
import APIError from "../util/apiError.js";

import { UniqueConstraintError } from 'sequelize';

export default class UserController{
    async getAllUsers(){
        return await User.findAll();
    }

    async getUser(id){
        const user = await User.findByPk(id);
        if(user === null ) throw new APIError(404, `No se encontró un usuario con el id ${id}`);
        return user;
    }

    async createUser(rawUser){
        try{
            return await User.create(rawUser);
        }catch(error){
            if(error instanceof UniqueConstraintError){
                throw new APIError(400, "El usuario ya existe.", error.original.code);
            }
            throw error;
        }
    }
   
}