class AttributeRepository {
    constructor(model){
        this.model = model;
    }

    async add(data, idCard){
        try {
            const phoneNumber = await this.model.create({
                ...data,
                fk_id_card: idCard
            }); 
            return phoneNumber;
        } catch (error) {
            throw new Error(`Unable to add: ${this.model} ${error}`);
        }
    }

    async getAll(idCard){
        try {
            const models = await this.model.findAll({
                where: { fk_id_card: idCard }
            });
            return models;
        } catch (error) {
            throw new Error(`Unable to fetch  ${this.model}: ${error}`);
        }
    }

    async delete(id){
        try {
            const deleted = await this.model.destroy({
                where: { 
                    id: id
                }
            });
            return deleted;
        } catch (error) {
            throw new Error(`Unable to delete phoneNumber: ${error}`);
        }
    }

    async deleteAll(idCard){
        try {
            const deleted = this.model.destroy({
                where: { fk_id_card: idCard }
            });
            return deleted;
        } catch (error) {
            throw new Error(`Unable to delete  ${this.model}: ${error}`);
        }
    }
}

module.exports = AttributeRepository;