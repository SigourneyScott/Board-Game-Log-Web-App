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
            loadSessions(message[1], user)
            .then((sessions) =>
                apply((model) =>
                ({ ...model, sessions })
                )
            );
            break;
        case "session/select":
            loadSession(message[1], user)
                .then((session) =>
                    apply((model) =>
                        ({ ...model, session })
                    )
                );
            break;
        default:
            const unhandled: never = message[0];
            throw new Error(`Unhandled Auth message "${unhandled}"`);
    }
}

function loadSessions(
    payload: { userid: string },
    user: Auth.User
) {
    console.log(payload.userid)
    return fetch(
        `/api/sessions`,
        { headers: Auth.headers(user) }
    )
        .then((res: Response) => {
            if (res.status === 200) {
                return res.json();
            }
            return undefined;
        })
        .then((json: unknown) => {
            if (json) {
                return json as Array<Session>;
            }
        });
}

function loadSession(
    payload: { sessionid: string },
    user: Auth.User
) {
    return fetch(
        `/api/sessions/${payload.sessionid}`,
        { headers: Auth.headers(user) }
    )
        .then((res: Response) => {
            if (res.status === 200) {
                return res.json();
            }
            return undefined;
        })
        .then((json: unknown) => {
            if (json) {
                return json as Session;
            }
        });
}

