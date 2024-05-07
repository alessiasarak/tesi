const asyncHandler = require("express-async-handler");

const CardRepository = require('../repository/cardRepository');
const EmailRepository = require('../repository/emailRepository');
const PhoneNumberRepository = require('../repository/phoneNumberRepository');
const LinkRepository = require('../repository/linkRepository');
const AddressRepository = require('../repository/addressRepository');


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
    let addressRepository = new AddressRepository();

    const cardId = req.params.id;
    const card = await cardRepository.getCardById(cardId);
    let emails = await emailRepository.getAll(cardId);
    let phoneNumbers = await phoneNumberRepository.getAll(cardId);
    let links = await linkRepository.getAll(cardId);
    let address = await addressRepository.getAll(cardId);

    if (card) {
        console.log(emails)
        console.log(phoneNumbers)
        console.log(links)
        console.log(address)
        
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

            background_color: card.background_color,
            text_color: card.text_color,
            button_color: card.button_color,

            email: emails,
            phone_number: phoneNumbers,
            link: links,
            address: address
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
