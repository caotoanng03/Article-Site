import Article from "./models/article.model";

export const resolvers = {
    Query: {
        getAllArticle: async () => {
            const articles = await Article.find({
                deleted: false
            });

            return articles;
        }
    }
};