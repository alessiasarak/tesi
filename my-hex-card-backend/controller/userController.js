const asyncHandler = require("express-async-handler");

const UserRepository = require("../repository/userRepository");

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