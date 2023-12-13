import Article from "../models/article.model";
import Category from "../models/category.model";

const resolversArticle = {
    Query: {
        getListArticle: async (_, args) => {
            const { sortKey, sortValue } = args;

            // sort
            let sort = {};

            if (sortKey && sortKey) {
                sort[sortKey] = sortValue;
            };
            // end sort

            const articles = await Article.find({
                deleted: false
            }).sort(sort);

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