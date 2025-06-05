import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Sessions from "./services/session-svc";
import sessions from "./routes/sessions";
import auth, { authenticateUser } from "./routes/auth";
import fs from "node:fs/promises";
import path from "path";

connect("games");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.use(express.json());

app.use("/api/sessions", authenticateUser, sessions);

app.use("/auth", auth);

app.use("/app", (req: Request, res: Response) => {
    const indexHtml = path.resolve(staticDir, "index.html");
    fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
        res.send(html)
    );
});

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});