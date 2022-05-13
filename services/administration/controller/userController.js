import User from "../model/user.js";
import APIError from "../util/apiError.js";

import UserRepository from "../repository/UserRepository.js";

import { UniqueConstraintError } from 'sequelize';

class UserController{
    userRepository = new UserRepository();

    async getAllUsers(){
        return this.userRepository.getAll();
    }

    async getUser(id){
        const user = await this.userRepository.getByPk(id);
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

    async updateUser(id, body){
        try{
            let affectedRows = (await User.update(body,{
                where: {
                    id_usuario: id
                }
            }))?.[0];
            if(affectedRows <= 0) throw new APIError(404, "No se puede actualizar un usuario que no existe.");
            return {affected_rows: affectedRows};
        }catch(error){
            throw error;
        }
    }

    async updateOrCreateUser(id, body){
        try{
            let affectedRows = (await User.update(body,{
                where: {
                    id_usuario: id
                }
            }))?.[0];
            if(affectedRows <= 0) {
                body.id_usuario = id;
                return this.createUser(body);
            }
            return {affected_rows: affectedRows};
        }catch(error){
            throw error;
        }
    }

    async deleteUser(id){
        try{
            let affectedRows = await User.destroy({
                where: {
                    id_usuario: id
                }
            });
            if(affectedRows <= 0) throw new APIError(404, "No se puede eliminar un usuario que no existe.");
            return {affected_rows: affectedRows};
        }catch(error){
            throw error;
        }
    }
}

export default UserController;