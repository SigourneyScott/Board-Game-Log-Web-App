import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { define, Auth, Observer } from "@calpoly/mustang";
import { Session } from "./models/session.ts"
import { SessionTileElement } from "./sessionTile.ts";
import reset from "./styles/reset.css.ts";
import page from "./styles/page.css.ts";

export class SessionGridElement extends LitElement {
    static uses = define({
        "session-tile": SessionTileElement
    })

    @property()
    src?: string;

    @state()
    sessions: Array<Session> = [];

    render() {
        const { sessions } = this;

        function renderSession(s: Session) {
            return html`
                <session-tile
                    session-link=${s.link}
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
                ${sessions.map(renderSession)
                }
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

    //connectedCallback() {
    //    super.connectedCallback();
    //    if (this.src) this.hydrate(this.src);
    //}

    //hydrate(src: string) {
    //    fetch(src)
    //        .then(res => res.json())
    //        .then((json: object) => {
    //            if (json) {
    //                const sessionGrid = json as {
    //                    sessions: Array<Session>
    //                };
    //                this.sessions = sessionGrid.sessions;
    //            }
    //        })
    //}

    _authObserver = new Observer<Auth.Model>(this, "games:auth");
    _user?: Auth.User;

    connectedCallback() {
        super.connectedCallback();
        this._authObserver.observe((auth: Auth.Model) => {
            this._user = auth.user;
            if (this.src) this.hydrate(this.src);
        });
    }

    get authorization(): { Authorization?: string } {
        if (this._user && this._user.authenticated) {
            console.log("authenticated");
            return {
                Authorization:
                    `Bearer ${(this._user as Auth.AuthenticatedUser).token}`
            };
        }
        else {
            console.log("failed authentication");
            return {};
        }
    }

    hydrate(url: string) {
        fetch(
            url,
            { headers: this.authorization }
        )
            .then((res: Response) => {
                if (res.status !== 200) throw `Status: ${res.status}`;
                return res.json();
            })
            .then((json: unknown) => {
                console.log(json);
                const sessionGrid = json as 
                    Array<Session>
                ;
                this.sessions = sessionGrid;
            })
            .catch((error) =>
                console.log(`Failed to render data ${url}:`, error)
            );
    }
}