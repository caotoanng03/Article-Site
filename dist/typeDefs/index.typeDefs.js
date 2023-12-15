"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const article_typeDefs_1 = __importDefault(require("./article.typeDefs"));
const category_typeDefs_1 = __importDefault(require("./category.typeDefs"));
const user_typeDefs_1 = __importDefault(require("./user.typeDefs"));
exports.typeDefs = [
    category_typeDefs_1.default,
    article_typeDefs_1.default,
    user_typeDefs_1.default
];
