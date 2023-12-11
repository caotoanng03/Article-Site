import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const app: Express = express();

// .env
dotenv.config();

const port: string | number = process.env.PORT || 8100;

app.get("/", async (req: Request, res: Response): Promise<void> => {
    res.send("ok");
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})