import md5 from "md5";
import User from "../models/user.model";

const resolversUser = {

    Mutation: {
        registerUser: async (_, args) => {
            const { fullName, email, password } = args.user;

            const existingUser = await User.findOne({
                email: email,
                deleted: false
            });

            if (existingUser) {
                return {
                    code: 400,
                    message: "Email is already in use!"
                };
            };

            interface userInter {
                fullName: string,
                email: string,
                password: string
            };

            const userObject: userInter = {
                fullName,
                email,
                password: md5(password)
            }

            const newUser = new User(userObject);
            const data = await newUser.save();

            return {
                code: 200,
                message: "New user was created successfully!",
                id: data.id,
                fullName: data.fullName,
                email: data.email,
                token: data.token
            };
        },

        loginUser: async (_, args) => {
            const { email, password } = args.user;

            if (!email) {
                return {
                    code: 400,
                    message: "Email can not be empty!"
                };
            };

            const user = await User.findOne({
                email: email,
                deleted: false
            });

            if (!user) {
                return {
                    code: 400,
                    message: "Email does not exists!"
                };
            };

            if (user.password != md5(password)) {
                return {
                    code: 400,
                    message: "Password is incorrect!"
                };
            };

            return {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                token: user.token,
                code: 200,
                message: "User logined successfully!"
            }
        },
    }
}

export default resolversUser;