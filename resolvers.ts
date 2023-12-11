import Article from "./models/article.model";

export const resolvers = {
    Query: {
        getAllArticle: async () => {
            const articles = await Article.find({
                deleted: false
            });

            return articles;
        },

        getArticle: async (_, args) => {
            // args is an object contains passed arguments
            const { id } = args;

            const abc = await Article.findOne({
                _id: id,
                deleted: false
            });

            return abc;
        }
    }
};