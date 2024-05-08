const User = require("../model/user");
const CardRepository = require("./cardRepository");

const bcrypt = require('bcrypt');

class UserRepository {
    async registerUser(userData, token) {
        try {
            let cardRepository = new CardRepository();
            let card = await cardRepository.activateCard(token);

            if(card){
                const existingUser = await User.findOne({ 
                    where: { 
                        email: userData.email 
                    } 
                });
                if (existingUser) {
                    return {
                        "code": 403,
                        "data": "User with this email already exists"
                    };
                }
                
                const hashedPassword = await bcrypt.hash(userData.password, 10); 
    
                let newUser = await User.create({
                    ...userData,
                    fk_role: "USER",
                    password: hashedPassword
                });

                card.fk_id_user = newUser.id;
                card.save();

                return {
                    "code": 200,
                    "data": newUser
                }; 
            } else {
                return {
                    "code": 400,
                    "data": "Error"
                };
            }
        } catch (error) {
            return {
                "code": 500,
                "data": "Internal server error"
            };
        }
    }

    async login(email, password) {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return {
                    "code": 404,
                    "data": "Email or password incorrect"
                };
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(isPasswordValid) {
                return {
                    "code": 200,
                    "data": user
                };
            }

            return {
                "code": 404,
                "data": "Email or password incorrect"
            };
        } catch (error) {
            return {
                "code": 500,
                "data": "Internal server error"
            };
        }
    }

    async updateUser(userId, newData) {
        try {
            const user = await User.findByPk(userId);
            
            if (!user) {
                return {
                    "code": 404,
                    "message": "User not found"
                };
            }
            
            if(newData.password != ""){
                const hashedPassword = await bcrypt.hash(newData.password, 10);
                await user.update({
                    password: hashedPassword
                });
            } else {
                await user.update({
                    email: newData.email,
                });
            }

            return {
                "code": 200,
                "message": "User information updated successfully"
            };
        } catch (error) {
            throw error;
        }
    }

    async getUser(userId) {
        try {
          const user = await User.findByPk(userId);
          return user;
        } catch (error) {
          throw new Error(`Unable to fetch card: ${error}`);
        }
    }

    async getAllUsers() {
        try {
          const users = await User.findAll();
          return users;
        } catch (error) {
          throw new Error(`Unable to fetch card: ${error}`);
        }
    }
}

module.exports = UserRepository;