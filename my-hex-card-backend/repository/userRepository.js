const User = require("../model/user");

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
            
            const hashedPassword = await bcrypt.hash(userData.password, 10); 
            let newUser = await User.create({
                ...userData,
                password: hashedPassword, 
                fk_role: userData.fk_role.role
            });
            
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

            await user.update(newData);
            return {
                "code": 200,
                "message": "User information updated successfully"
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserRepository;