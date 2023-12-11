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
`;