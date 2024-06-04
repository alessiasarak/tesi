const Contact = require("../model/contact");
const CardRepository = require("./cardRepository");

const bcrypt = require('bcrypt');

class ContactRepository {
    async createContact(contactData) {
        try {
            const existingContact = await Contact.findOne({ 
                where: { 
                    email: contactData.email 
                } 
            });
            if (existingContact) {
                return {
                    "code": 403,
                    "data": "Contact with this email already exists"
                };
            }
 
            let newContact = await Contact.create({
                ...contactData
            });

            let cardRepository = new CardRepository();
            let newCard = await cardRepository.createCard(newContact.id);

            if(newCard.code == 200) {
                return {
                    "code": 200,
                    "data": newContact
                };
            }else {
                return {
                    "code": 500,
                    "data": "Internal server error"
                };
            }
        } catch (error) {
            return {
                "code": 500,
                "data": "Internal server error"
            };
        }
    }

    async getContact(contactId) {
        try {
          const contact = await Contact.findByPk(contactId);
          return contact;
        } catch (error) {
          throw new Error(`Unable to fetch card: ${error}`);
        }
    }

    async getAllContacts() {
        try {
          const contacts = await Contact.findAll();
          return contacts;
        } catch (error) {
          throw new Error(`Unable to fetch card: ${error}`);
        }
    }

    async deleteContact(contactId) {
        try {
          const contact = await Contact.findByPk(contactId);
          if (contact) {
            let cardRepository = new CardRepository();
            await cardRepository.deleteAllCardsByContact(contactId);

            await contact.destroy();
            
            return {
                "code": 200,
                "data": "Contact deleted"
            };
          } else {
            return {
                "code": 404,
                "data": "Contact not found"
            };
          }
        } catch (error) {
          return {
              "code": 500,
              "data": "Internal server error"
          };
        }
    }
}

module.exports = ContactRepository;