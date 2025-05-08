import { html } from "lit";

export class DarkModeToggleElement extends HTMLElement {
    static template = html`
        <template>
            <label onchange="">
                <slot>
                    <input type="checkbox" autocomplete="off" style="visibility: hidden;"/>
                    <svg class="icon">
                        <use href="/icons/menu.svg#icon-dark-mode" />
                    </svg>
                </slot>
            </label>
        </template>
    `;

    constructor() {
        super();
        shadow(this).template(DarkModeToggleElement.template);

        this.addEventListener("change", (event) => {
            event.stopPropagation();
            const enabled = event.target.checked;
            const custom = new CustomEvent(
                "dark-mode:toggle",
                {
                    bubbles: true,
                    detail: { enabled }
                }
            );
            this.dispatchEvent(custom);
        });
    }
}

customElements.define("dark-mode-toggle", DarkModeToggleElement);