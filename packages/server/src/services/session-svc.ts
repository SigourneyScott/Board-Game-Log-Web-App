import { Schema, model } from "mongoose";
import { Session } from "../models/sessionGrid";

const SessionSchema = new Schema<Session>(
    {
        link: { type: String, required: true, trim: true },
        imgSrc: { type: String, required: true, trim: true },
        game: { type: String, required: true, trim: true },
        date: { type: String, required: true, trim: true },
        sym: { type: Boolean, required: true}
    },
    { collection: "sessions" }
);

const SessionModel = model<Session>(
    "Session",
    SessionSchema
);

function index(): Promise<Session[]> {
    return SessionModel.find();
}

function get(id: String): Promise<Session> {
    return SessionModel.findById(id)
        .then((doc: unknown) => {
            console.log(`Found SessionModel`);
            console.log(doc as Session);
            return doc as Session;
        })
        .catch((err) => {
            throw `${id} Not Found`;
        });
}

export default { index, get };