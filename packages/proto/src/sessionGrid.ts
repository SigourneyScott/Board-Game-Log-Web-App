import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { define } from "@calpoly/mustang";
import { Session } from "./models/sessionGrid.ts"
import { SessionElement } from "./session.ts";
import reset from "./styles/reset.css.ts";

export class SessionGridElement extends LitElement {
    static uses = define({
        "session-tile": SessionElement
    })

    @property()
    src?: string;

    @state()
    sessions: Array<Session> = [];

    override render() {
        const { sessions } = this;

        function renderSession(s: Session) {
            return html`
                <session-tile
                    session-link=${s.link}
                    img-src=${s.imgSrc}
                    game=${s.game}
                    date=${s.date}>
                </session-tile>`
        }

        return html`
            <div class="grid">
                ${sessions.map(renderSession)
                    .map((s) => html`${s}`)
                }
            </div>
        `;
    }

    static styles = [
        reset.styles,
        css`
            .grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                overflow-y: scroll;
            }
        `
    ]

    connectedCallback() {
        super.connectedCallback();
        if (this.src) this.hydrate(this.src);
    }

    hydrate(src: string) {
        fetch(src)
            .then(res => res.json())
            .then((json: object) => {
                if (json) {
                    const sessionGrid = json as {
                        sessions: Array<Session>
                    };
                    this.sessions = sessionGrid.sessions;
                }
            })
    }
}