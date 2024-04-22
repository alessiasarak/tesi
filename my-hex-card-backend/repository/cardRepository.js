const Card = require('../model/card.js'); 

class CardRepository {
  async updateCard(cardId, newData) {
    try {
      const [updated] = await Card.update(newData, {
        where: { id: cardId }
      });
      return updated;
    } catch (error) {
      throw new Error(`Unable to update card: ${error}`);
    }
  }
  async getCardById(cardId) {
    try {
      const card = await Card.findByPk(cardId);
      return card;
    } catch (error) {
      throw new Error(`Unable to fetch card: ${error}`);
    }
  }
};

module.exports = CardRepository;
