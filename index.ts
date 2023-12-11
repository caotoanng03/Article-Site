import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import Article from "./models/article.model";


const app: Express = express();

// .env
dotenv.config();

// database
database.connect();

const port: string | number = process.env.PORT || 8100;

app.get("/", async (req: Request, res: Response): Promise<void> => {
    const articles = await Article.find({
        deleted: false
    });

    res.json({
        articles
    });
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})