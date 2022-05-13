class BaseRepository{
    #model;

    constructor(model){
        this.#model = model;
    }

    async getByPk(id){
        return this.#model.findByPk(id, {
            include: this.#getModelAssociations()
        });
    }

    async getAll(){
        return this.#model.findAll({
            include: this.#getModelAssociations()
        });
    }

    async delete(id){
        return this.#model.destroy({
            where: {
                [this.model.primaryKeyAttribute]: id
            }
        });
    }

    async update(id, body){
        return this.#model.update(body, {
            where: {
                [this.#model.primaryKeyAttribute]: id
            }
        });
    }

    getModel(){
        return this.#model;
    }

    /**
     * Retorna las clases modelo de las relaciones
     * @returns {Array<Sequelize.Model>}
     */
    #getModelAssociations(){
        return Object.values(this.#model.associations).map(a => a.target);
    }
}

export default BaseRepository;