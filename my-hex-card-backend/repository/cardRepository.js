const Card = require('../model/card.js'); 
const EmailRepository = require('./emailRepository.js');
const LinkRepository = require('./linkRepository.js');
const PhoneNumberRepository = require('./phoneNumberRepository.js');
const AddressRepository = require('./addressRepository.js');

class CardRepository {
  async getCardById(cardId) {
    try {
      const card = await Card.findByPk(cardId);
      return card;
    } catch (error) {
      throw new Error(`Unable to fetch card: ${error}`);
    }
  }
  
  async getAll() {
    try {
      const cards = await Card.findAll();
      return cards;
    } catch (error) {
      throw new Error(`Unable to fetch card: ${error}`);
    }
  }

  async getCardsByContact(contactId) {
    try {
      const cards = await Card.findAll({ where: { fk_id_contact: contactId } });
      return cards;
    } catch (error) {
      throw new Error(`Unable to fetch card: ${error}`);
    }
  }

  async getCardsByUser(userId) {
    try {
      const cards = await Card.findAll({ where: { fk_id_user: userId } });
      return cards;
    } catch (error) {
      throw new Error(`Unable to fetch card: ${error}`);
    }
  }

  async createCard(token, idContact) {
    try {
        let newCard = await Card.create({
            token: token,
            fk_id_contact: idContact
        });
        
        return {
            "code": 200,
            "data": newCard
        };
    } catch (error) {
        return {
            "code": 500,
            "data": "Internal server error"
        };
    }
  }

  async setCard(idCard, newData, idUser) {
    try {
      let emails = newData.email;
      let links = newData.link;
      let phoneNumbers = newData.phone_number;

      const updated = Card.update(
        {
          title: newData.title,
          subtitle: newData.subtitle,
          img: newData.img,
          instagram: newData.instagram,
          facebook: newData.facebook,
          linkedin: newData.linkedin,
          whatsapp: newData.whatsapp,
          youtube: newData.youtube
        }, 
        {
          where: { 
            id: idCard, 
            fk_id_user: idUser
          },
        }
      );

      let emailRepository = new EmailRepository();
      await emailRepository.deleteAll(idCard);
      for(let i = 0; i < emails.length; i++){
        await emailRepository.add(emails[i].email, idCard);
      }

      let linkRepository = new LinkRepository();
      await linkRepository.deleteAll(idCard);
      for(let i = 0; i < links.length; i++){
        await linkRepository.add(links[i].link, idCard);
      }

      let phoneNumberRepository = new PhoneNumberRepository();
      await phoneNumberRepository.deleteAll(idCard);
      for(let i = 0; i < phoneNumbers.length; i++){
        await phoneNumberRepository.add(phoneNumbers[i].number, idCard);
      }

      let addressRepository = new AddressRepository();
      await addressRepository.deleteAll(idCard);
      for(let i = 0; i < addresss.length; i++){
        await addressRepository.add(addresss[i].number, idCard);
      }
      
      return updated;
    } catch (error) {
      throw new Error(`Unable to update card: ${error}`);
    }
  }

  async setStyleCard(idCard, newData, idUser) {
    try {
      const updated = await Card.update(
        {
          background_color: newData.background_color,
          text_color: newData.text_color,
          button_color: newData.button_color
        }, 
        {
          where: { 
            id: idCard, 
            fk_id_user: idUser
          },
        }
      );

      return updated;
    } catch (error) {
      throw new Error(`Unable to update card style: ${error}`);
    }
  }

  async activateCards(token) {
    try {
      const updated = await Card.update({ active: 1 }, {
        where: { token: token },
      });
      return updated.length;
    } catch (error) {
      throw new Error(`Unable to update card active: ${error}`);
    }
  }
};

module.exports = CardRepository;
