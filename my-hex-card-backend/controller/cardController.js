const asyncHandler = require("express-async-handler");

const CardRepository = require('../repository/cardRepository');
const EmailRepository = require('../repository/emailRepository');
const PhoneNumberRepository = require('../repository/phoneNumberRepository');
const LinkRepository = require('../repository/linkRepository');


///////////
//GETTERS//
///////////

exports.getCardByUser = asyncHandler(async (req, res) => {
    let cardRepository = new CardRepository();
    let card = await cardRepository.getCardByUser(req.params.id);

    res.status(200).json(card);
});

exports.getCardById = asyncHandler(async (req, res) => {
    let cardRepository = new CardRepository();
    let emailRepository = new EmailRepository();
    let phoneNumberRepository = new PhoneNumberRepository();
    let linkRepository = new LinkRepository();

    const cardId = req.params.id;
    const card = await cardRepository.getCardById(cardId);
    let emails = await emailRepository.getAll(cardId);
    let phoneNumbers = await phoneNumberRepository.getAll(cardId);
    let links = await linkRepository.getAll(cardId);

    if (card) {
        res.status(200).json({
            id: card.id,
            img: card.img,
            title: card.title,
            subtitle: card.subtitle,
            instagram: card.instagram,
            facebook: card.facebook,
            linkedin: card.linkedin,
            whatsapp: card.whatsapp,
            youtube: card.youtube,
            active: card.active,
            fk_id_user: card.fk_id_user,

            email: emails,
            phone_number: phoneNumbers,
            link: links,

            background_color: card.background_color,
            text_color: card.text_color,
            button_color: card.button_color
        });
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});


exports.getAllCards = asyncHandler(async (req, res) => {
    let cardRepository = new CardRepository();
    let emailRepository = new EmailRepository();
    let phoneNumberRepository = new PhoneNumberRepository();
    let linkRepository = new LinkRepository();

    const cards = await cardRepository.getAll();

    if (cards) {
        let result = [];

        for(let i = 0; i < cards.length; i++){
            let emails = await emailRepository.getAll(cards[i].id);
            let phoneNumbers = await phoneNumberRepository.getAll(cards[i].id);
            let links = await linkRepository.getAll(cards[i].id);

            result.push({
                id: cards[i].id,
                img: cards[i].img,
                title: cards[i].title,
                subtitle: cards[i].subtitle,
                instagram: cards[i].instagram,
                facebook: cards[i].facebook,
                linkedin: cards[i].linkedin,
                whatsapp: cards[i].whatsapp,
                youtube: cards[i].youtube,
                active: cards[i].active,
                fk_id_user: cards[i].fk_id_user,
    
                email: emails,
                phone_number: phoneNumbers,
                link: links,
    
                background_color: cards[i].background_color,
                text_color: cards[i].text_color,
                button_color: cards[i].button_color
            });
        }
        
        res.status(200).json(result);
    } else {
        res.status(404).json({ message: 'Cards not found' });
    }
});

exports.getEmailsByCardId = asyncHandler(async (req, res) => {
    let emailRepository = new EmailRepository();

    const cardId = req.params.id;
    const emails = await emailRepository.getAll(cardId);
    if (emails) {
        res.status(200).json(emails);
    } else {
        res.status(404).json({ message: 'Emails not found' });
    }
});

exports.getPhoneNumbersByCardId = asyncHandler(async (req, res) => {
    let phoneNumberRepository = new PhoneNumberRepository();

    const cardId = req.params.id;
    const phoneNumbers = await phoneNumberRepository.getAll(cardId);
    if (phoneNumbers) {
        res.status(200).json(phoneNumbers);
    } else {
        res.status(404).json({ message: 'Phone numbers not found' });
    }
});

exports.getLinksByCardId = asyncHandler(async (req, res) => {
    let linkRepository = new LinkRepository();

    const cardId = req.params.id;
    const links = await linkRepository.getAll(cardId);
    if (links) {
        res.status(200).json(links);
    } else {
        res.status(404).json({ message: 'Links not found' });
    }
});


///////////
//UPDATE//
//////////
exports.putCard = asyncHandler(async (req, res) => {
    let cardRepository = new CardRepository();

    const cardId = req.params.id;
    const newData = req.body.entity;

    const updated = await cardRepository.setCard(cardId, newData, req.params.idUser);
    if (updated) {
        res.status(200).json({ message: 'Card updated successfully' });
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});
exports.putStyleCard = asyncHandler(async (req, res) => {
    let cardRepository = new CardRepository();

    const cardId = req.params.id;
    const newData = req.body.entity;

    const updated = await cardRepository.setStyleCard(cardId, newData, req.params.idUser);
    if (updated) {
        res.status(200).json({ message: 'Card updated successfully' });
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});

///////////
//POST//
//////////
exports.postEmail = asyncHandler(async (req, res) => {
    let emailRepository = new EmailRepository();

    const cardId = req.params.id;
    const newEmail = req.body.email;
    const email = await emailRepository.add(newEmail, cardId);
    if (email) {
        res.status(200).json({ message: 'Email added successfully' });
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});

exports.postPhoneNumber = asyncHandler(async (req, res) => {
    let phoneNumberRepository = new PhoneNumberRepository();

    const cardId = req.params.id;
    const newPhoneNumber = req.body.phoneNumber;
    const phoneNumber = await phoneNumberRepository.add(newPhoneNumber, cardId);
    if (phoneNumber) {
        res.status(200).json({ message: 'Phone number added successfully' });
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});

exports.postLink = asyncHandler(async (req, res) => {  
    let linkRepository = new LinkRepository();

    const cardId = req.params.id;
    const newLink = req.body.link;
    const link = await linkRepository.add(newLink, cardId);
    if (link) {
        res.status(200).json({ message: 'Link added successfully' });
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});

///////////
//DELETE//
//////////
exports.deleteEmail = asyncHandler(async (req, res) => {    
    let emailRepository = new EmailRepository();

    const cardId = req.params.id;
    const email = req.body.email;
    const deleted = await emailRepository.delete(email, cardId);
    if (deleted) {
        res.status(200).json({ message: 'Email deleted successfully' });
    } else {
        res.status(404).json({ message: 'Email not found' });
    }
});

exports.deletePhoneNumber = asyncHandler(async (req, res) => {
    let phoneNumberRepository = new PhoneNumberRepository();

    const cardId = req.params.id;
    const phoneNumber = req.body.phoneNumber;
    const deleted = await phoneNumberRepository.delete(phoneNumber, cardId);
    if (deleted) {
        res.status(200).json({ message: 'Phone number deleted successfully' });
    } else {
        res.status(404).json({ message: 'Phone number not found' });
    }
});

exports.deleteLink = asyncHandler(async (req, res) => {
    let linkRepository = new LinkRepository();

    const cardId = req.params.id;
    const link = req.body.link;
    const deleted = await linkRepository.delete(link, cardId);
    if (deleted) {
        res.status(200).json({ message: 'Link deleted successfully' });
    } else {
        res.status(404).json({ message: 'Link not found' });
    }
});