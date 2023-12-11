import { gql } from "apollo-server-express";

export const typeDefs = gql`

    type Article {
        id: ID,
        title: String,
        avatar: String
        description: String,
    }

    type Query {
        getAllArticle: [Article]
        getArticle(id: ID!): Article
    }

    input ArticleInput {
        title: String!,
        avatar: String,
        description: String
    }

    type Mutation {
        createArticle(article: ArticleInput): Article,
        deleteArticle(id: ID!): String
    }
`;