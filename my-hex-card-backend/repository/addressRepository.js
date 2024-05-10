const Address = require('../model/address.js'); 

class AddressRepository{
    async add(newAddressData, idCard, i){
        try {
            let toSave = [];
            for(let a in newAddressData){
                toSave.push(newAddressData[a]);
            }
        
            const address = await Address.create({
                street_name: toSave[0],
                street_number: toSave[1],
                cap: toSave[2],
                city: toSave[3],
                nation: toSave[4],
                fk_id_card: idCard
            }); 
            return address;
        } catch (error) {
            throw new Error(`Unable to add address: ${error}`);
        }
    }

    async getAll(idCard){
        try {
            const addresss = await Address.findAll({
                where: { fk_id_card: idCard }
            });
            return addresss;
        } catch (error) {
            throw new Error(`Unable to fetch addresss: ${error}`);
        }
    }

    async delete(idAddress){
        try {
            const deleted = await Address.destroy({
                where: { 
                    id: idAddress
                }
            });
            return deleted;
        } catch (error) {
            throw new Error(`Unable to delete address: ${error}`);
        }
    }

    async deleteAll(idCard){
        try {
            const deleted = Address.destroy({
                where: { fk_id_card: idCard }
            });
            return deleted;
        } catch (error) {
            throw new Error(`Unable to delete addresss: ${error}`);
        }
    }
}

module.exports = AddressRepository;