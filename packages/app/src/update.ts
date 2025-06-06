import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Session } from "server/models";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
    console.log("update called")
    switch (message[0]) {
        case "sessions/select":
            console.log("case 1")
            loadSessions(message[1], user)
            .then((sessions) =>
                apply((model) =>
                ({ ...model, sessions })
                )
            );
            break;
        // put the rest of your cases here
        default:
            const unhandled: never = message[0];
            throw new Error(`Unhandled Auth message "${unhandled}"`);
    }
}

function loadSessions(
    payload: { userid: string },
    user: Auth.User
) {
    console.log(payload.userid);
    console.log("test1");
    return fetch(
        '/api/sessions',
        { headers: Auth.headers(user) }
    )
        .then((res: Response) => {
            console.log("fetched");
            if (res.status === 200) {
                console.log("fetch successful");
                return res.json();
            }
            console.log("fetch failed")
            return undefined;
        })
        .then((json: unknown) => {
            if (json) {
                console.log("got json");
                return json as Array<Session>;
            }
        });
}
