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

    async loginWithToken(email, password, token) {
        try {
            let cardRepository = new CardRepository();
            let card = await cardRepository.activateCard(token);

            if(card){
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
                        card.fk_id_user = user.id;
                        card.save();

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

    async updateUserPassword(token, newData) {
        try {
            const user = await User.findOne({
                where: {
                    reset_password_token: token,
                }
            });
            
            if (!user) {
                return {
                    "code": 404,
                    "message": "Token not valid"
                };
            }
            
            const hashedPassword = await bcrypt.hash(newData.password, 10);
            await user.update({
                password: hashedPassword,
                reset_password_token: ""
            });

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

    async forgotPassword(data) {
        //invio email con token
        try {
            const email = data.email;
        
            // Check if the email is provided
            if (!email) {
                return {
                    "code": 400,
                    "message": "Email not valid"
                };
            }
        
            // Find user by email
            const user = await User.findOne({
                where: {
                    email: email
                }
            });
            if (!user) {
                return {
                    "code": 404,
                    "message": "User not found"
                };
            }
        
            // Generate a password reset token
            const resetToken = this.generateToken();
        
            await user.update({
                reset_password_token: resetToken
            });
            user.save();

            console.log("Sending email");

            let domain = "https://myhexcard.com";
            console.log(domain + "/forgot-password/reset/" + resetToken);

            // this.sendingMail({
            //     from: "no-reply@myhexcard.com",
            //     to: `${user.email}`,
            //     subject: "Password da resettare",
            //     text: `  ${domain}/forgot-password/reset/${resetToken} `,
            // });
            return {
                "code": 200,
                "message": "IEmail sended"
            };
        } catch (error) {
            return {
                "code": 500,
                "message": "Internal Server Error"
            };
        }
    }

    generateToken() {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var token = '';
        for(var i = 0; i < 30; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }
        return token;
    }

    async sendingMail({ from, to, subject, text }) {
        try {
            let mailOptions = {
                from,
                to,
                subject,
                text,
            };
        
            const Transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: 587,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
        
            return await Transporter.sendMail(mailOptions);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserRepository;