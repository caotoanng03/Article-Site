import { gql } from "apollo-server-express";

const typeDefsUser = gql`
    type User {
        id: ID,
        fullName: String,
        email: String,
        password: String,
        token: String,
        code: Int,
        message: String
    }

    input registerUserInput {
        fullName: String!,
        email: String!,
        password: String!
    }

    input loginUserInput {
        email: String! = "",
        password: String! = ""
    }

    type Mutation {
        registerUser(user: registerUserInput): User
        loginUser(user: loginUserInput): User
    }
`;

export default typeDefsUser;