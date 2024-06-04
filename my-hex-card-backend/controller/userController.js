const asyncHandler = require("express-async-handler");

const UserRepository = require("../repository/userRepository");

exports.updateUserData = asyncHandler(async (req, res) => {
    const userId = req.params.idUser; 
    const newData = req.body.entity;
    
    let userRepository = new UserRepository();

    try {
        const result = await userRepository.updateUser(userId, newData, req.body.extra);
        if (result.code === 200) {
            res.status(200).json({ message: "User information updated successfully" });
        } else if (result.code === 404) {
            res.status(404).json({ message: "User not found" });
        } else if (result.code === 500) {
            res.status(404).json({ message: "Internal server error" });
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


exports.forgotPassword = asyncHandler(async (req, res) =>{
    var data = req.body.entity;
    let userRepository = new UserRepository();
    let response = await userRepository.forgotPassword(data);
    console.log(response)

    res.status(response.code).json(response.data);
});

exports.setPassword = asyncHandler(async (req, res) =>{
    var data = req.body.entity;
    var token = req.params.token;
    let userRepository = new UserRepository();
    let response = await userRepository.updateUserPassword(token, data);

    res.status(response.code).json(response.data);
});