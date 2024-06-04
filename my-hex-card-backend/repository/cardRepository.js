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
  
  async getCardByToken(cardToken) {
    try {
      const card = await Card.findOne({
        where: {
          token: cardToken
        }
      });
      
      return card;
    } catch (error) {
      throw new Error(`Unable to fetch card: ${error}`);
    }
  }
  
  async getACardByUser(userId) {
    try {
      const card = await Card.findOne({
        where: {
          fk_id_user: userId
        }
      });
      
      return card;
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
      let cardsToReturn = [];
      let emailRepository = new EmailRepository();
      let phoneNumberRepository = new PhoneNumberRepository();
      let linkRepository = new LinkRepository();
      let addressRepository = new AddressRepository();

      for(let card of cards){
        let cardId = card.dataValues.id;
        
        let emails = await emailRepository.getAll(cardId);
        let phoneNumbers = await phoneNumberRepository.getAll(cardId);
        let links = await linkRepository.getAll(cardId);
        let address = await addressRepository.getAll(cardId);

        cardsToReturn.push({
          id: card.id,
          img: card.img,
          name: card.name,
          surname: card.surname,
          company: card.company,
          function: card.function,
          instagram: card.instagram,
          facebook: card.facebook,
          linkedin: card.linkedin,
          whatsapp: card.whatsapp,
          youtube: card.youtube,
          active: card.active,
          fk_id_user: card.fk_id_user,
  
          background_color: card.background_color,
          text_color: card.text_color,
          button_color: card.button_color,
          token: card.token,
  
          email: emails,
          phone_number: phoneNumbers,
          link: links,
          address: address
        });
      }

      return cardsToReturn;
    } catch (error) {
      throw new Error(`Unable to fetch card: ${error}`);
    }
  }

  async createCard(idContact, data) {
    try {
        let newCard = await Card.create({
            name: data && data.name && data.name != '' ? data.name : "Nome",
            surname: data && data.surname && data.surname != '' ? data.surname : "Cognome",
            token: this.generateToken(),
            fk_id_contact: idContact
        });
        
        return {
            "code": 200,
            "data": newCard
        };
    } catch (error) {
      console.log(error)
        return {
            "code": 500,
            "data": "Internal server error"
        };
    }
  }
  
  generateToken() {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for(var i = 0; i < 40; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
  }

  async setCard(newData, idUser, token) {
    try {
      let emails = newData.email;
      let links = newData.link;
      let phoneNumbers = newData.phone_number;
      let address = newData.address;

      let card = await this.getCardByToken(token);

      card.name = newData.name;
      card.surname = newData.surname;
      card.company = newData.company;
      card.function = newData.function;
      card.img = newData.img;
      card.instagram = newData.instagram;
      card.facebook = newData.facebook;
      card.linkedin = newData.linkedin;
      card.whatsapp = newData.whatsapp;
      card.youtube = newData.youtube;
      card.save();
      
      let idCard = card.id;

      let emailRepository = new EmailRepository();
      await emailRepository.deleteAll(idCard);
      for(let i = 0; i < emails.length; i++){
        console.log(emails[i])
        await emailRepository.add(emails[i], idCard);
      }

      let linkRepository = new LinkRepository();
      await linkRepository.deleteAll(idCard);
      for(let i = 0; i < links.length; i++){
        await linkRepository.add(links[i], idCard);
      }

      let phoneNumberRepository = new PhoneNumberRepository();
      await phoneNumberRepository.deleteAll(idCard);
      for(let i = 0; i < phoneNumbers.length; i++){
        await phoneNumberRepository.add(phoneNumbers[i], idCard);
      }

      let addressRepository = new AddressRepository();
      await addressRepository.deleteAll(idCard);
      console.log(address)
      for(let i = 0; i < address.length; i++){
        await addressRepository.add(address[i], idCard, i);
      }
      
      return card;
    } catch (error) {
      throw new Error(`Unable to update card: ${error}`);
    }
  }

  async setStyleCard(newData, idUser, token) {
    try {
      const updated = await Card.update(
        {
          background_color: newData.background_color,
          text_color: newData.text_color,
          button_color: newData.button_color
        }, 
        {
          where: { 
            token: token, 
            fk_id_user: idUser
          },
        }
      );

      return updated;
    } catch (error) {
      throw new Error(`Unable to update card style: ${error}`);
    }
  }

  
  async updateNameSurname(newData, token) {
    try {
      let card = await this.getCardByToken(token);

      card.name = newData.name;
      card.surname = newData.surname;

      card.save();
      
      return card;
    } catch (error) {
      throw new Error(`Unable to update card: ${error}`);
    }
  }
  
  async associate(idUser, token) {
    try {
      console.log(token)
      let card = await this.getCardByToken(token);

      card.fk_id_user = idUser;
      card.active = 1;

      card.save();
      
      return card;
    } catch (error) {
      throw new Error(`Unable to update card: ${error}`);
    }
  }

  async setStyleAllCard(newData, idUser) {
    try {
      const updated = await Card.update(
        {
          img: newData.img,
          background_color: newData.background_color,
          text_color: newData.text_color,
          button_color: newData.button_color
        }, 
        {
          where: {
            fk_id_user: idUser
          },
        }
      );

      return updated;
    } catch (error) {
      throw new Error(`Unable to update card style: ${error}`);
    }
  }

  async activateCard(token) {
    try {
      const updated = await Card.findOne({ where: { token: token } });
      updated.active = 1;
      updated.save();
      
      return updated;
    } catch (error) {
      throw new Error(`Unable to update card active: ${error}`);
    }
  }

  async deleteAllCardsByContact(contactId) {
    try {
      let d = await Card.destroy({ where: { fk_id_contact: contactId } });
      return d;
    } catch (error) {
      throw new Error(`Unable to delete cards: ${error}`);
    }
  }

  async deleteCard(token) {
    try {
      let d = await Card.destroy({ where: { token: token } });
      return d;
    } catch (error) {
      throw new Error(`Unable to delete cards: ${error}`);
    }
  }
};

module.exports = CardRepository;
