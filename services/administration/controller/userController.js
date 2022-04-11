import db from "../config/db.js";

import User from "../model/user.js";

export default class UserController{
    async getAllUsers(){
        return await User.findAll();
    }

    async getUser(id){
        return await User.findByPk(id);
    }

    async createUser(user){
        return await User.create(user);
    }
   
}