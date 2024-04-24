const PhoneNumber = require('../model/phoneNumber.js'); 

class PhoneNumberRepository{
    async add(newPhoneNumber, idCard){
        try {
            const phoneNumber = await PhoneNumber.create({
                phoneNumber: newPhoneNumber,
                fk_id_card: idCard
            }); 
            return phoneNumber;
        } catch (error) {
            throw new Error(`Unable to add phoneNumber: ${error}`);
        }
    }

    async getAll(idCard){
        try {
            const phoneNumbers = await PhoneNumber.findAll({
                where: { fk_id_card: idCard }
            });
            return phoneNumbers;
        } catch (error) {
            throw new Error(`Unable to fetch phoneNumbers: ${error}`);
        }
    }

    async delete(phoneNumber, idCard){
        try {
            const deleted = await PhoneNumber.destroy({
                where: { 
                    phoneNumber: phoneNumber, 
                    fk_id_card: idCard 
                }
            });
            return deleted;
        } catch (error) {
            throw new Error(`Unable to delete phoneNumber: ${error}`);
        }
    }

    async deleteAll(idCard){
        try {
            const deleted = PhoneNumber.destroy({
                where: { fk_id_card: idCard }
            });
            return deleted;
        } catch (error) {
            throw new Error(`Unable to delete phoneNumbers: ${error}`);
        }
    }
}

module.exports = PhoneNumberRepository;