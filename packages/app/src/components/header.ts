import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import {
    define,
    Auth,
    Observer,
    Events
} from "@calpoly/mustang";
import reset from "../styles/reset.css.ts";
import page from "../styles/page.css.ts";
import { DarkModeToggleElement } from "./darkmodeToggle.ts";

export class HeaderElement extends LitElement {
    static uses = define({
        "dark-mode-toggle": DarkModeToggleElement
    })

    @state()
    loggedIn = false;

    @state()
    userid?: string;

    override render() {
        return html`
            <div class="navbar">
                <h1>
                    <a href="/app">${ this.userid }</a>
                     
                    ${this.loggedIn ? this.renderSignOutButton() : this.renderSignInButton() }
                </h1>
                <h1>
                    <dark-mode-toggle></dark-mode-toggle>
                    <svg class="icon">
                        <use href="/icons/menu.svg#icon-list" />
                    </svg>
                    <svg class="icon">
                        <use href="/icons/menu.svg#icon-grid" />
                    </svg>
                </h1>
            </div>
        `;
    }

    static styles = [
        reset.styles,
        page.styles,
        css`
            .navbar {
                background: var(--color-background-card);
                display: flex;
                justify-content: space-between;
                padding: 15px;
                width: 100 %;
                box-sizing: border-box;
                flex-basis: auto;
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

    renderSignOutButton() {
        return html`
            <button
                @click=${(e: UIEvent) => {
                Events.relay(e, "auth:message", ["auth/signout"])
                }}
            >
                Sign Out
            </button>
        `;
    }

    renderSignInButton() {
        return html`
            <a @click=${() => location.assign("/login.html")}>Sign In</a>
        `;
    }
}