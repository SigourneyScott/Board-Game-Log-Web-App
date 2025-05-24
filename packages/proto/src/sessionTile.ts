import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";
import page from "./styles/page.css.ts";

export class SessionTileElement extends LitElement {
    @property({ attribute: "session-link" })
    sessionLink?: string;

    @property({ attribute: "img-src" })
    imgSrc?: string;

    @property()
    game?: string;

    @property()
    date?: string;


    override render() {
        return html`
            <a href="${this.sessionLink}">
                <div class="sessionCard card">
                    <div class="sessionCardImg">
                        <img src="${this.imgSrc}" />
                    </div>

                    <div class="sessionCardHeader">
                        <div>
                            ${this.game}
                            <slot name="icon"></slot>
                        </div>
                        <div>${this.date}</div>
                    </div>
                </div>
            </a>
        `;
    }

    static styles = [
        reset.styles,
        page.styles,
        css`
            .sessionCard {
                height: 300px;
                font-size: 1.5em;
                position: relative;
                overflow: hidden;
                box-shadow: 0px 0px 5px var(--color-shadow);
            }

            .sessionCardImg {
                position: absolute;
                opacity: 0.2;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }

            .sessionCardImg img {
                object-fit: cover;
                width: 100%;
                height: 100%;
            }

            .sessionCardHeader {
                display: flex;
                justify-content: space-between;
                position: relative;
                font-family: var(--font-header);
            }
        `
    ];
}