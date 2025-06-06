import { Session, Team } from "server/models";

export interface Model {
    sessions?: Array<Session>;
    session?: Session;
    team?: Team;
}

export const init: Model = {};