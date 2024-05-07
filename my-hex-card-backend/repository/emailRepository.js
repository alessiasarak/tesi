const Email = require('../model/email.js'); 

class EmailRepository{
    async add(newEmailData, idCard){
        try {
            const email = await Email.create({
                ...newEmailData,
                fk_id_card: idCard
            }); 
            return email;
        } catch (error) {
            throw new Error(`Unable to add email: ${error}`);
        }
    }

    async getAll(idCard){
        try {
            const emails = await Email.findAll({
                where: { fk_id_card: idCard }
            });
            return emails;
        } catch (error) {
            throw new Error(`Unable to fetch emails: ${error}`);
        }
    }

    async delete(id){
        try {
            const deleted = await Email.destroy({
                where: { 
                    id: id
                }
            });
            return deleted;
        } catch (error) {
            throw new Error(`Unable to delete email: ${error}`);
        }
    }

    async deleteAll(idCard){
        try {
            const deleted = Email.destroy({
                where: { fk_id_card: idCard }
            });
            return deleted;
        } catch (error) {
            throw new Error(`Unable to delete emails: ${error}`);
        }
    }
}

module.exports = EmailRepository;