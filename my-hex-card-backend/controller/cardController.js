const asyncHandler = require("express-async-handler");

const CardRepository = require('../repository/cardRepository');
const EmailRepository = require('../repository/emailRepository');
const PhoneNumberRepository = require('../repository/phoneNumberRepository');
const LinkRepository = require('../repository/linkRepository');
const AddressRepository = require('../repository/addressRepository');


///////////
//GETTERS//
///////////

exports.getCardsByContact = asyncHandler(async (req, res) => {
    let cardRepository = new CardRepository();
    let cards = await cardRepository.getCardsByContact(req.params.id);

    res.status(200).json(cards);
});

exports.getCardsByUser = asyncHandler(async (req, res) => {
    let cardRepository = new CardRepository();
    let cards = await cardRepository.getCardsByUser(req.params.id);

    res.status(200).json(cards);
});

exports.getCardByToken = asyncHandler(async (req, res) => {
    let cardRepository = new CardRepository();
    let emailRepository = new EmailRepository();
    let phoneNumberRepository = new PhoneNumberRepository();
    let linkRepository = new LinkRepository();
    let addressRepository = new AddressRepository();

    let cardId = req.params.id;//token
    const card = await cardRepository.getCardByToken(cardId);
    
    if(!card) res.status(404).json({ message: 'Card not found' });

    if (card) {
        cardId = card.id;
        let emails = await emailRepository.getAll(cardId);
        let phoneNumbers = await phoneNumberRepository.getAll(cardId);
        let links = await linkRepository.getAll(cardId);
        let address = await addressRepository.getAll(cardId);

        res.status(200).json({
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
    } else {
        res.status(404);
    }
});


exports.getACardByUser = asyncHandler(async (req, res) => {
    let cardRepository = new CardRepository();
    let emailRepository = new EmailRepository();
    let phoneNumberRepository = new PhoneNumberRepository();
    let linkRepository = new LinkRepository();
    let addressRepository = new AddressRepository();

    let userId = req.params.idUser;//token
    const card = await cardRepository.getACardByUser(userId);
    let cardId = card.id;
    let emails = await emailRepository.getAll(cardId);
    let phoneNumbers = await phoneNumberRepository.getAll(cardId);
    let links = await linkRepository.getAll(cardId);
    let address = await addressRepository.getAll(cardId);

    if (card) {
        res.status(200).json({
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
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});

///////////
//UPDATE//
//////////
exports.putCard = asyncHandler(async (req, res) => {
    let cardRepository = new CardRepository();

    const newData = req.body.entity;
    let token = req.params.token;

    const updated = await cardRepository.setCard(newData, req.params.idUser, token);
    if (updated) {
        res.status(200).json({ message: 'Card updated successfully' });
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});

exports.putStyleCard = asyncHandler(async (req, res) => {
    let cardRepository = new CardRepository();

    const newData = req.body.entity;
    let token = req.params.token;

    const updated = await cardRepository.setStyleCard(newData, req.params.idUser, token);
    if (updated) {
        res.status(200).json({ message: 'Card updated successfully' });
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});

exports.putStyleAllCard = asyncHandler(async (req, res) => {
    let cardRepository = new CardRepository();

    const newData = req.body.entity;
    console.log("A")

    const updated = await cardRepository.setStyleAllCard(newData, req.params.idUser);
    if (updated) {
        res.status(200).json({ message: 'Card updated successfully' });
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});

//create empty card
exports.postCard = asyncHandler(async (req, res) => {
    let cardRepository = new CardRepository();

    const card = await cardRepository.createCard(req.params.idContact);
    if (card) {
        res.status(200).json({ message: 'Card create successfully' });
    } else {
        res.status(500).json({ message: 'Card not created' });
    }
});
