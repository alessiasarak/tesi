const asyncHandler = require("express-async-handler");

const UserRepository = require("../repository/userRepository");

exports.registerUser = asyncHandler(async (req, res) => {
    var data = req.body.entity;
    var token = req.params.token;

    let userRepository = new UserRepository();
    let response = await userRepository.registerUser(data, token);

    res.status(response.code).json(response.data);
});

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body.entity;
    let userRepository = new UserRepository();
    
    try {
        const response = await userRepository.login(email, password);

        if (response.code == 200) {
            req.session.idUser = response.data.dataValues.id;
            req.session.role = response.data.dataValues.fk_role;
            console.log(req.session)
            
            req.session.save((err) => {
                if (err) {
                  console.error('Errore nel salvataggio della sessione:', err);
                } else {
                  console.log('Sessione salvata correttamente');
                  console.log(req.session.id)
                }
              });
        }
        
        res.status(response.code).json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

exports.loginWithToken = asyncHandler(async (req, res) => {
    const { email, password } = req.body.entity;
    let token = req.params.token;
    let userRepository = new UserRepository();
    
    try {
        const response = await userRepository.loginWithToken(email, password, token);

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
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.sendStatus(200); // Send a 200 response if logout is successful
    });
});