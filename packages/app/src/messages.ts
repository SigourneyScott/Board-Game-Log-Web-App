import { Session } from "server/models";

export type Msg =
  //| ["profile/save", { userid: string; profile: Traveler }]
    | ["sessions/select", { userid: string }]
    | ["session/select", { sessionid: string }]
    | ["session/save", {
        userid: string;
        session: Session;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
    }]
  //| ["tour/select", { tourid: string }];