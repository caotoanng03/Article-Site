"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefsCategory = (0, apollo_server_express_1.gql) `

    type Category {
        id: ID,
        title: String,
        avatar: String,
        description: String
    }

    type Query {
        getListCategory: [Category]
        getCategory(id: ID!): Category
    }

    input CategoryInput {
        title: String!,
        avatar: String,
        description: String
    }

    type Mutation {
        createCategory(category: CategoryInput): Category,
        deleteCategory(id: ID!): String,
        updateCategory(id: ID!, category: CategoryInput): Category 
    }

`;
exports.default = typeDefsCategory;
