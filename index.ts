import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import { ApolloServer, gql } from "apollo-server-express";

import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers/index.resolvers";
import { requireAuth } from "./middlewares/auth.middleware";

async function startServer() {
    dotenv.config();
    database.connect();

    const app: Express = express();
    const port: string | number = process.env.PORT || 8100;

    // GraphQL
    app.use("/graphql", requireAuth);

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            return { ...req };
        }
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

