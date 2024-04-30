const Card = require('../model/card.js'); 
const EmailRepository = require('./emailRepository.js');
const LinkRepository = require('./linkRepository.js');
const PhoneNumberRepository = require('./phoneNumberRepository.js');

class CardRepository {
  async getCardById(cardId) {
    try {
      const card = await Card.findByPk(cardId);
      return card;
    } catch (error) {
      throw new Error(`Unable to fetch card: ${error}`);
    }
  }

  async createCard(title, subtitle, idUser) {
    try {
        let newCard = await Card.create({
            title: title,
            subtitle: subtitle,
            fk_id_user: idUser
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

  setCard(idCard, newData, idUser) {
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
      emailRepository.deleteAll(idCard);
      for(let i = 0; i < emails.length; i++){
        emailRepository.add(emails[i].email, idCard);
      }

      let linkRepository = new LinkRepository();
      linkRepository.deleteAll(idCard);
      for(let i = 0; i < links.length; i++){
        linkRepository.add(links[i].link, idCard);
      }

      let phoneNumberRepository = new PhoneNumberRepository();
      phoneNumberRepository.deleteAll(idCard);
      for(let i = 0; i < phoneNumbers.length; i++){
        phoneNumberRepository.add(phoneNumbers[i].phone_number, idCard);
      }
      
      return updated;
    } catch (error) {
      throw new Error(`Unable to update card: ${error}`);
    }
  }

  setStyleCard(idCard, styleName) {
    try {
      const updated = Card.update({ fk_name_style: styleName }, {
        where: { id: idCard },
      });
      return updated;
    } catch (error) {
      throw new Error(`Unable to update card style: ${error}`);
    }
  }

  activateCards(idUser) {
    try {
      const updated = Card.update({ active: 1 }, {
        where: { fk_id_user: idUser },
      });
      return updated;
    } catch (error) {
      throw new Error(`Unable to update card active: ${error}`);
    }
  }

  getStyleCard(idCard) {
    try {
      const style = Card.findByPk(idCard, {
        attributes: ['fk_name_style'],
      });
      return style;
    } catch (error) {
      throw new Error(`Unable to fetch card style: ${error}`);
    }
  }
};

module.exports = CardRepository;
