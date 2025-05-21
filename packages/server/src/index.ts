import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Sessions from "./services/session-svc";

connect("games");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.get("/session/:_id", (req: Request, res: Response) => {
    const { _id } = req.params;

    Sessions.get(_id).then((data) => {
        if (data) res
            .set("Content-Type", "application/json")
            .send(JSON.stringify(data));
        else res
            .status(404).send();
    });
});

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});