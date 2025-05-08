import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class SessionElement extends LitElement {
    override render() {
        return html`
            <a href="session2.html">
                <div class="sessionCard card">
                    <div class="sessionCardImg">
                        <img src="https://cf.geekdo-images.com/kRvUgYiaOq07kC67ZK5UoQ__imagepage/img/ifaw5M-Z2eEFir0ImkbNzxMbaOk=/fit-in/900x600/filters:no_upscale():strip_icc()/pic4900321.jpg" />
                    </div>

                    <div class="sessionCardHeader">
                        <div>
                            Marvel Champions
                            <svg class="icon" style="color: #ffc048">
                                <use href="/icons/menu.svg#icon-crown" />
                            </svg>
                        </div>
                        <div>3/14/2025</div>
                    </div>
                </div>
            </a>
        `;
    }

    static styles = css``;
}