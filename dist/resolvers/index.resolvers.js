"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const article_resolvers_1 = __importDefault(require("./article.resolvers"));
const category_resolvers_1 = __importDefault(require("./category.resolvers"));
const user_resolvers_1 = __importDefault(require("./user.resolvers"));
exports.resolvers = [
    article_resolvers_1.default,
    category_resolvers_1.default,
    user_resolvers_1.default
];
