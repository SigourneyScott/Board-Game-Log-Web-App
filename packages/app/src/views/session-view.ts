import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { define, Auth, Observer } from "@calpoly/mustang";
import { Session } from "../models/session.ts";
import { Team } from "../models/team.ts";
import reset from "../styles/reset.css.ts";
import page from "../styles/page.css.ts";

export class SessionView extends LitElement {

    @property({ attribute: "session-id" })
    sessionid = "";

    @state()
    session?: Session;

    get src(): string | undefined {
        if (this.sessionid) {
            return `/api/sessions/${this.sessionid}`;
        }
    }

    render() {
        const { session } = this;

        function renderTeamCard(t: Team) {
            return html`
                <div class="team card">
                    <h2>
                        ${t.winner ? html`
                            <svg class="icon trophy" style = "left: 0;">
                                <use href="/icons/menu.svg#icon-crown"/>
                            </svg>
                            <svg class="icon trophy" style = "right: 0;">
                                <use href="/icons/menu.svg#icon-crown"/>
                            </svg>
                        ` : ""}
                        ${t.name}
                    </h2>
                    ${t.playerNames.map(renderPlayer)}
                </div>
            `
        }

        function renderPlayer(name: string) {
            return html`<div class="player">${name}</div>`
        }


        return html`
            <div class="sessionContent">
                <div class="gameInfo card">
                    <div class="gameHeader">
                        <h1>${session ? session.game : ""}</h1>
                        <h1>${session ? session.date : ""}</h1>
                    </div>
                    <div class="gameImg"><img src=${session ? session.imgSrc : ""}/></div>
                </div>
                <div class="details">
                        <div class="teamInfo">
                            ${session ? session.teams.map(renderTeamCard) : ""}
                        </div>

                        <div class="notes card">
                            <h2>Notes</h2>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static styles = [
        reset.styles,
        page.styles,
        css`
            .sessionContent {
                display: flex;
                justify-content: space-between;
                flex-basis: 100%;
                overflow: hidden;
                width: 100vw;
            }

            .gameInfo {
                flex: 0 1 50em;

                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
            }

            .gameHeader {
                display: flex;
                justify-content: space-between;
                width: 100%;
            }

            .gameImg {
                min-height: 0;
                min-width: 0;
                margin-top: 15px;
            }

            .details {
                flex: 0 1 100%;
                overflow: hidden;

                display: flex;
                flex-direction: column;

            }

            .teamInfo {
                display: flex;
                flex: 0 0 auto;
                overflow: scroll visible;
            }

            .team {
                background: var(--color-background-card);
                text-align: center;
                position: relative;
            }

            .notes {
                flex-basis: 100%;
            }
        `
    ]

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
                const session = json as Session;
                this.session = session;
            })
            .catch((error) =>
                console.log(`Failed to render data ${url}:`, error)
            );
    }
}