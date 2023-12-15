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
const article_model_1 = __importDefault(require("../models/article.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
const resolversArticle = {
    Query: {
        getListArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { sortKey, sortValue, currentPage, limitItems, filterKey, filterValue, keyword } = args;
            const find = {
                deleted: false
            };
            if (filterKey && filterValue) {
                find[filterKey] = filterValue;
            }
            if (keyword) {
                const regexKeyword = new RegExp(keyword, "i");
                find["title"] = regexKeyword;
            }
            const sort = {};
            if (sortKey && sortKey) {
                sort[sortKey] = sortValue;
            }
            ;
            const skip = (currentPage - 1) * limitItems;
            const articles = yield article_model_1.default
                .find(find)
                .sort(sort)
                .skip(skip)
                .limit(limitItems);
            return articles;
        }),
        getArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const article = yield article_model_1.default.findOne({
                _id: id,
                deleted: false
            });
            return article;
        })
    },
    Article: {
        category: (article) => __awaiter(void 0, void 0, void 0, function* () {
            const categoryId = article.categoryId;
            const category = yield category_model_1.default.findOne({
                _id: categoryId
            });
            return category;
        })
    },
    Mutation: {
        createArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { article } = args;
            const record = new article_model_1.default(article);
            yield record.save();
            return record;
        }),
        deleteArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            yield article_model_1.default.updateOne({
                _id: id,
            }, {
                deleted: true,
                deletedAt: new Date()
            });
            return "Removed Successfully!";
        }),
        updateArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, article } = args;
            yield article_model_1.default.updateOne({
                _id: id,
                deleted: false
            }, article);
            const record = yield article_model_1.default.findOne({
                _id: id
            });
            return record;
        })
    }
};
exports.default = resolversArticle;
