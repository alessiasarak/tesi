const User = require("../model/user");
const CardRepository = require("./cardRepository");

const bcrypt = require('bcrypt');

class UserRepository {
    async createUser(userData) {
        try {
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
 
            let newUser = await User.create({
                ...userData,
                fk_role: userData.fk_role
            });

            let cardRepository = new CardRepository();
            let newCard = cardRepository.createCard(userData.name + " " + userData.surname, userData.email, newUser.id);
            
            return {
                "code": 200,
                "data": newUser
            };
        } catch (error) {
            return {
                "code": 500,
                "data": "Internal server error"
            };
        }
    }

    async registerUser(userData) {
        try {
            const user = await User.findOne({ 
                where: { 
                    email: userData.email,
                    password: ""
                } 
            });
            if (user) {
                const hashedPassword = await bcrypt.hash(userData.password, 10); 

                await user.update({
                    password: hashedPassword, 
                });
                
                return {
                    "code": 200,
                    "data": user
                };
            } else {
                return {
                    "code": 403,
                    "data": "User already setted"
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
                    name: newData.name,
                    surname: newData.surname,
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