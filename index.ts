import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import { ApolloServer, gql } from "apollo-server-express";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

async function startServer() {
    dotenv.config();
    database.connect();

    const app: Express = express();
    const port: string | number = process.env.PORT || 8100;

    // GraphQL
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app: app,
        path: "/graphql"  // only one endpoint access
    });

    app.listen(port, () => {
        console.log(`app listening on port ${port}`)
    });
};

startServer();

