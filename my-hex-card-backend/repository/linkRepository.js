const Link = require('../model/link.js'); 

class LinkRepository {
    async add(newLink, idCard){
        try {
            const link = await Link.create({
                link: newLink,
                fk_id_card: idCard
            }); 
            return link;
        } catch (error) {
            throw new Error(`Unable to add link: ${error}`);
        }
    }

    async getAll(idCard){
        try {
            const links = await Link.findAll({
                where: { fk_id_card: idCard }
            });
            return links;
        } catch (error) {
            throw new Error(`Unable to fetch links: ${error}`);
        }
    }

    async delete(link, idCard){
        try {
            const deleted = await Link.destroy({
                where: { 
                    link: link, 
                    fk_id_card: idCard 
                }
            });
            return deleted;
        } catch (error) {
            throw new Error(`Unable to delete link: ${error}`);
        }
    }

    async deleteAll(idCard){
        try {
            const deleted = Link.destroy({
                where: { fk_id_card: idCard }
            });
            return deleted;
        } catch (error) {
            throw new Error(`Unable to delete links: ${error}`);
        }
    }
}

module.exports = LinkRepository;