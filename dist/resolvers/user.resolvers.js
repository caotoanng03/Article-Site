"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../models/user.model"));
const resolversUser = {
    Query: {
        getUser: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({
                    token: context["user"].token,
                    deleted: false
                }).select("-password");
                return {
                    code: 200,
                    message: "Succeed!",
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    token: user.token
                };
            }
            catch (error) {
                return {
                    code: 400,
                    message: "Invalid Token!"
                };
            }
            ;
        }),
    },
    Mutation: {
        registerUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { fullName, email, password } = args.user;
            const existingUser = yield user_model_1.default.findOne({
                email: email,
                deleted: false
            });
            if (existingUser) {
                return {
                    code: 400,
                    message: "Email is already in use!"
                };
            }
            ;
            ;
            const userObject = {
                fullName,
                email,
                password: (0, md5_1.default)(password)
            };
            const newUser = new user_model_1.default(userObject);
            const data = yield newUser.save();
            return {
                code: 200,
                message: "New user was created successfully!",
                id: data.id,
                fullName: data.fullName,
                email: data.email,
                token: data.token
            };
        }),
        loginUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password } = args.user;
            if (!email) {
                return {
                    code: 400,
                    message: "Email can not be empty!"
                };
            }
            ;
            const user = yield user_model_1.default.findOne({
                email: email,
                deleted: false
            });
            if (!user) {
                return {
                    code: 400,
                    message: "Email does not exists!"
                };
            }
            ;
            if (user.password != (0, md5_1.default)(password)) {
                return {
                    code: 400,
                    message: "Password is incorrect!"
                };
            }
            ;
            return {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                token: user.token,
                code: 200,
                message: "User logined successfully!"
            };
        }),
    }
};
exports.default = resolversUser;
