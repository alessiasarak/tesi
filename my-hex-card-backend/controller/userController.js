const asyncHandler = require("express-async-handler");

const UserRepository = require("../repository/userRepository");

exports.createUser = asyncHandler(async (req, res) => {
    var data = req.body.entity;

    let userRepository = new UserRepository();
    let response = userRepository.createUser(data);
    res.send(response);
});

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body.entity;
    let userRepository = new UserRepository();
    
    try {
        const userId = await userRepository.login(email, password);
        if (isLoginValid > 0) {
            req.session.id = userId;
            res.status(200).json({ message: "User logged in successfully" });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
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