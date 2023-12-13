import { gql } from "apollo-server-express";

const typeDefsArticle = gql`

    type Article {
        id: ID,
        title: String,
        avatar: String,
        description: String,
        category: Category
    }

    type Query {
        getListArticle(
            sortKey: String,
            sortValue: String,
            currentPage: Int = 1,
            limitItems: Int = 2
        ): [Article]
        getArticle(id: ID!): Article
    }

    input ArticleInput {
        title: String!,
        avatar: String,
        description: String,
        categoryId: String
    }

    type Mutation {
        createArticle(article: ArticleInput): Article,
        deleteArticle(id: ID!): String,
        updateArticle(id: ID!, article: ArticleInput): Article
    }

`;

export default typeDefsArticle;