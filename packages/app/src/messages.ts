//import { Session } from "server/models";

export type Msg =
  //| ["profile/save", { userid: string; profile: Traveler }]
    | ["sessions/select", { userid: string }]
    | ["session/select", {sessionid: string}]
  //| ["tour/select", { tourid: string }];