import express, { Request, Response } from "express";
import { Session } from "../models/session";

import Sessions from "../services/session-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
    Sessions.index()
        .then((list: Session[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:_id", (req: Request, res: Response) => {
    const { _id } = req.params;

    Sessions.get(_id)
        .then((session: Session) => res.json(session))
        .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
    const newSession = req.body;

    Sessions.create(newSession)
        .then((session: Session) =>
            res.status(201).json(session)
        )
        .catch((err) => res.status(500).send(err));
});

router.put("/:_id", (req: Request, res: Response) => {
    const { _id } = req.params;
    const newSession = req.body;

    Sessions.update(_id, newSession)
        .then((session: Session) => res.json(session))
        .catch((err) => res.status(404).end());
});

router.delete("/:_id", (req: Request, res: Response) => {
    const { _id } = req.params;

    Sessions.remove(_id)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;