const Card = require('../model/card.js'); 

class CardRepository {
  async getCardById(cardId) {
    try {
      const card = await Card.findByPk(cardId);
      return card;
    } catch (error) {
      throw new Error(`Unable to fetch card: ${error}`);
    }
  }

  setCard(idCard, newData, idUser) {
    try {
      const updated = Card.update(newData, {
        where: { id: idCard, fk_id_user: idUser},
      });
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
