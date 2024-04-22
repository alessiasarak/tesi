const asyncHandler = require("express-async-handler");
const CardRepository = require('../repository/cardRepository');

exports.getCardById = asyncHandler(async (req, res) => {
    const cardId = req.params.id;
    const card = await CardRepository.getCardById(cardId);
    if (card) {
        res.status(200).json(card);
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});

exports.updateCard = asyncHandler(async (req, res) => {
    const cardId = req.params.id;
    const newData = req.body;
    const updated = await CardRepository.updateCard(cardId, newData);
    if (updated) {
        res.status(200).json({ message: 'Card updated successfully' });
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});