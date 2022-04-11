import db from "../config/db.js";

import User from "../model/user.js";
import APIError from "../util/apiError.js";

export default class UserController{
    async getAllUsers(){
        return await User.findAll();
    }

    async getUser(id){
        const user = await User.findByPk(id);
        if(user === null ) throw new APIError(404, `No se encontró un usuario con el id ${id}`);
        return user;
    }

    async createUser(user){
        return await User.create(user);
    }
   
}