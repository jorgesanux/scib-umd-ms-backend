import { UniqueConstraintError } from 'sequelize';
import BaseRepository from '../repository/BaseRepository.js';

import APIError from "../util/apiError.js";

class BaseController {
    #repository;

    /**
     * @param {BaseRepository} repository 
     */
    constructor(repository){
        this.#repository = repository;
    }

    async getAll(){
        return this.#repository.getAll();
    }

    async get(id){
        const entity = await this.#repository.getByPk(id);
        if(entity === null ) throw new APIError(404, `No se encontró el id ${id}`);
        return entity;
    }

    async create(rawEntity){
        try{
            return await this.#repository.create(rawEntity);
        }catch(error){
            if(error instanceof UniqueConstraintError){
                throw new APIError(400, "La entidad ya existe.", error.original.code);
            }
            throw error;
        }
    }

    async update(id, body){
        let affectedRows = (await this.#repository.update(id, body))?.[0];
        if(affectedRows <= 0) throw new APIError(404, "No se puede actualizar una entidad que no existe.");
        return {affected_rows: affectedRows};
    }

    async updateOrCreate(id, body){
        let affectedRows = (await this.#repository.update(id, body))?.[0];
        if(affectedRows <= 0) {
            body[this.#repository.getPrimaryKey()] = id;
            return this.create(body);
        }
        return {affected_rows: affectedRows};
    }

    async delete(id){
        let affectedRows = await this.#repository.delete(id);
        if(affectedRows <= 0) throw new APIError(404, "No se puede eliminar una entidad que no existe.");
        return {affected_rows: affectedRows};
    }
}

export default BaseController;