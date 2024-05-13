const asyncHandler = require("express-async-handler");

const ContactRepository = require("../repository/contactRepository");

exports.createContact = asyncHandler(async (req, res) => {
    var data = req.body.entity;
    
    let contactRepository = new ContactRepository();
    let response = await contactRepository.createContact(data);
    
    res.status(response.code).json(response.data);
});


exports.getAllContacts = asyncHandler(async (req, res) => {
    let contactRepository = new ContactRepository();

    try {
        const contacts = await contactRepository.getAllContacts();
        
        if (contacts) {
            let result = [];

            for(let i = 0; i < contacts.length; i++){
                result.push({
                    id: contacts[i].dataValues.id,
                    name: contacts[i].dataValues.name,
                    surname: contacts[i].dataValues.surname,
                    email: contacts[i].dataValues.email,
                    password: ""
                });
            }
            
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Users not found' });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

exports.deleteContact = asyncHandler(async (req, res) => {
    let id = req.params.id;
    console.log(id);
    let contactRepository = new ContactRepository();
    let response = await contactRepository.deleteContact(id);
    res.status(response.code).json(response.data);
});