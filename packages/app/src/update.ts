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
        case "session/save":
            console.log("recieved session save message");
            saveSession(message[1], user)
                .then((session) =>
                    apply((model) => ({ ...model, session }))
                )
                .then(() => {
                    const { onSuccess } = message[1];
                    if (onSuccess) onSuccess();
                })
                .catch((error: Error) => {
                    const { onFailure } = message[1];
                    if (onFailure) onFailure(error);
                });
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
                console.log("status 200");
                return res.json();
            }
            console.log("something went wrong");
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

function saveSession(
    msg: {
        userid: string;
        session: Session;
    },
    user: Auth.User
) {
    console.log("saving session")
    return fetch(`/api/sessions`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...Auth.headers(user)
        },
        body: JSON.stringify(msg.session)
    })
        .then((response: Response) => {
            if (response.status === 200) return response.json();
            else
                throw new Error(
                    `Failed to save profile for ${msg.userid}`
                );
        })
        .then((json: unknown) => {
            if (json) return json as Session;
            return undefined;
        });
}