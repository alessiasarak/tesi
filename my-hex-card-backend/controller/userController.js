const asyncHandler = require("express-async-handler");

const UserRepository = require("../repository/userRepository");

exports.createUser = asyncHandler(async (req, res) => {
    var data = req.body.entity;

    let userRepository = new UserRepository();
    let response = await userRepository.createUser(data);

    res.status(response.code).json(response.data);
});

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body.entity;
    let userRepository = new UserRepository();
    
    try {
        const response = await userRepository.login(email, password);

        if (response.code == 200) req.session.id = response.data.dataValues.id;
        
        res.status(response.code).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});


exports.logout = asyncHandler(async (req, res) => {
    req.session.id = null;
    res.status(200);
});

exports.updateData = asyncHandler(async (req, res) => {
    const userId = req.session.id; 
    const newData = req.body;
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