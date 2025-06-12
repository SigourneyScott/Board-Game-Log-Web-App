import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import {
    Auth,
    Observer,
    //Events
} from "@calpoly/mustang";
import reset from "../styles/reset.css.ts";
import page from "../styles/page.css.ts";

export class CreateSessionButtonElement extends LitElement {

    @state()
    loggedIn = false;

    @state()
    userid?: string;

    override render() {
        return html`
            <a href="/app/sessions/edit">
                <div class="button">
                    <h1>+</h1>
                </div>
            </a>
        `;
    }

    static styles = [
        reset.styles,
        page.styles,
        css`
            .button {
                position: fixed;
                bottom: 10px;
                right: 10px;
                width: 50px;
                hieght: 50px;
                border-radius: 100%;
                background: var(--color-background-card);
                text-align: center;
            }
        `
    ]

    _authObserver = new Observer<Auth.Model>(this, "games:auth");

    connectedCallback() {
        super.connectedCallback();
        this._authObserver.observe((auth: Auth.Model) => {
            const { user } = auth;

            if (user && user.authenticated) {
                this.loggedIn = true;
                this.userid = user.username;
            } else {
                this.loggedIn = false;
                this.userid = undefined;
            }
        });
    }
}