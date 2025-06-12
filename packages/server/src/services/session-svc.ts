import { Schema, model } from "mongoose";
import { Session } from "../models/session";

const SessionSchema = new Schema<Session>(
    {
        link: { type: String, required: true, trim: true },
        imgSrc: { type: String, required: true, trim: true },
        game: { type: String, required: true, trim: true },
        date: { type: String, required: true, trim: true },
        sym: { type: Boolean, required: true },
        teams: [
            {
                name: String,
                playerNames: [String],
                winner: Boolean
            }]
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

function create(json: Session): Promise<Session> {
    const t = new SessionModel(json);
    return t.save();
}

function update(
    _id: String,
    session: Session
): Promise<Session> {
    return SessionModel.findOneAndUpdate({ _id }, session, {
        new: true
    }).then((updated) => {
        if (!updated) throw `${_id} not updated`;
        else return updated as Session;
    });
}

function remove(_id: String): Promise<void> {
    return SessionModel.findOneAndDelete({ _id }).then(
        (deleted) => {
            if (!deleted) throw `${_id} not deleted`;
        }
    );
}

export default { index, get, create, update, remove };