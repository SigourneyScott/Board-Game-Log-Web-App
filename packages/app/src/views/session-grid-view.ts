import { html, css } from "lit";
import { state, property } from "lit/decorators.js";
import { define, View } from "@calpoly/mustang";
//import { Session } from "../models/session.ts"
import { Session } from "server/models"
import { SessionTileElement } from "../components/sessionTile.ts";
import reset from "../styles/reset.css.ts";
import page from "../styles/page.css.ts";
import { Msg } from "../messages";
import { Model } from "../model";

export class SessionGridView extends View<Model, Msg> {
    static uses = define({
        "session-tile": SessionTileElement
    })

    @property({ attribute: "user-id" })
    userid?: string;

    @state()
    get sessions(): Array<Session> | undefined {
        return this.model.sessions
    }

    //get src() {
    //    return `/api/sessions`;
    //}

    constructor() {
        super("games:model");
    }

    render() {
        const { sessions } = this;

        function renderSession(s: Session) {
            return html`
                <session-tile
                    session-id=${s._id}
                    img-src=${s.imgSrc}
                    game=${s.game}
                    date=${s.date}>
                    ${s.sym ? html`
                        <svg class="icon trophy" slot="icon">
                            <use href="/icons/menu.svg#icon-crown"/>
                        </svg>
                    ` : ""}
                </session-tile>`
        }
        

        return html`
            <div class="grid">
                ${sessions ? sessions.map(renderSession) : "no sessions"}
            </div>
        `;
    }

    static styles = [
        reset.styles,
        page.styles,
        css`
            .grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                overflow-y: scroll;
            }
        `
    ]

    //_authObserver = new Observer<Auth.Model>(this, "games:auth");
    //_user?: Auth.User;

    //connectedCallback() {
    //    super.connectedCallback();
    //    this._authObserver.observe((auth: Auth.Model) => {
    //        this._user = auth.user;
    //        if (this.src) this.hydrate(this.src);
    //    });
    //}

    //get authorization(): { Authorization?: string } {
    //    if (this._user && this._user.authenticated) {
    //        console.log("authenticated");
    //        return {
    //            Authorization:
    //                `Bearer ${(this._user as Auth.AuthenticatedUser).token}`
    //        };
    //    }
    //    else {
    //        console.log("failed authentication");
    //        return {};
    //    }
    //}

    //hydrate(url: string) {
    //    fetch(
    //        url,
    //        { headers: this.authorization }
    //    )
    //        .then((res: Response) => {
    //            if (res.status !== 200) throw `Status: ${res.status}`;
    //            return res.json();
    //        })
    //        .then((json: unknown) => {
    //            console.log(json);
    //            const sessionGrid = json as 
    //                Array<Session>
    //            ;
    //            this.sessions = sessionGrid;
    //        })
    //        .catch((error) =>
    //            console.log(`Failed to render data ${url}:`, error)
    //        );
    //}

    attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string
    ) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (
            name === "user-id" &&
            oldValue !== newValue &&
            newValue
        ) {
            console.log("dispatching message");
            this.dispatchMessage([
                "sessions/select",
                { userid: newValue }
            ]);
        }
    }
}