import { css, html, LitElement } from "lit";
import define from "@calpoly/mustang"
import { SessionGridElement } from "../components/sessionGrid"

export class HomeViewElement extends LitElement {
    static uses = define({
        "session-grid": SessionGridElement
    })

    get src(): 

    render() {
        return html`
        <session-grid src="/api/sessions"></session-grid>
        `;
    }

    // more to come
}