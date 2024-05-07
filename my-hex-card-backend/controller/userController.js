const asyncHandler = require("express-async-handler");

const UserRepository = require("../repository/userRepository");
const ContactRepository = require("../repository/contactRepository");

exports.createContact = asyncHandler(async (req, res) => {
    var data = req.body.entity;

    let contactRepository = new ContactRepository();
    let response = await contactRepository.createContact(data, req.params.token);
    res.status(response.code).json(response.data);
});

exports.registerUser = asyncHandler(async (req, res) => {
    var data = req.body.entity;

    let userRepository = new UserRepository();
    let response = await userRepository.registerUser(data, req.params.token);

    res.status(response.code).json(response.data);
});

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body.entity;
    let userRepository = new UserRepository();
    
    try {
        const response = await userRepository.login(email, password);

        if (response.code == 200) {
            req.session.idUser = response.data.dataValues.id;
            req.session.save();
        }
        
        res.status(response.code).json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


exports.logout = asyncHandler(async (req, res) => {
    req.session.idUser = null;
    res.status(200);
});

exports.updateUserData = asyncHandler(async (req, res) => {
    const userId = req.params.idUser; 
    const newData = req.body.entity;
    
    let userRepository = new UserRepository();

    try {
        const result = await userRepository.updateUser(userId, newData);
        if (result.code === 200) {
            res.status(200).json({ message: "User information updated successfully" });
        } else if (result.code === 404) {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

exports.getUser = asyncHandler(async (req, res) => {
    let userRepository = new UserRepository();
    const userId = req.params.idUser;

    try {
        const user = await userRepository.getUser(userId);
        
        if (user) {
            res.status(200).json({
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                password: "",
                fk_role: user.fk_role,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
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
