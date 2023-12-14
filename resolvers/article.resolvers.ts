import Article from "../models/article.model";
import Category from "../models/category.model";

const resolversArticle = {
    Query: {
        getListArticle: async (_, args) => {
            const {
                sortKey,
                sortValue,
                currentPage,
                limitItems,
                filterKey,
                filterValue,
                keyword
            } = args;

            // find
            const find = {
                deleted: false
            };

            if (filterKey && filterValue) {
                find[filterKey] = filterValue;
            }
            // end find

            // search
            if (keyword) {
                const regexKeyword = new RegExp(keyword, "i");
                find["title"] = regexKeyword
            }
            // end serch

            // sort
            const sort = {};

            if (sortKey && sortKey) {
                sort[sortKey] = sortValue;
            };
            // end sort

            // pagination
            const skip = (currentPage - 1) * limitItems;
            // end pagination

            const articles = await Article
                .find(find)
                .sort(sort)
                .skip(skip)
                .limit(limitItems);

            return articles;
        },

        getArticle: async (_, args) => {
            // args is an object contains passed arguments
            const { id } = args;

            const article = await Article.findOne({
                _id: id,
                deleted: false
            });

            return article;
        }
    },

    Article: {
        category: async (article) => {
            const categoryId = article.categoryId;

            const category = await Category.findOne({
                _id: categoryId
            });

            return category;
        }
    },

    Mutation: {
        createArticle: async (_, args) => {
            const { article } = args;

            const record = new Article(article);
            await record.save();

            return record;
        },

        deleteArticle: async (_, args) => {
            const { id } = args;

            await Article.updateOne({
                _id: id,
            }, {
                deleted: true,
                deletedAt: new Date()
            });

            return "Removed Successfully!"
        },

        updateArticle: async (_, args) => {
            const { id, article } = args;

            await Article.updateOne({
                _id: id,
                deleted: false
            }, article);

            const record = await Article.findOne({
                _id: id
            });

            return record;
        }
    }
};

export default resolversArticle;