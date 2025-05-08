import {
    define,
    Dropdown,
    Events
} from "@calpoly/mustang";
import { css, html, LitElement } from "lit";
import reset from "./styles/reset.css.ts";

export class DarkModeToggleElement extends LitElement {

    render() {
        return html`
            <label
                @change=${(event: Event) => Events.relay(
                    event, "dark-mode", {
                    checked: (event.target as HTMLInputElement)?.checked
                })
            }
            >
                <input type="checkbox" autocomplete="off" style="visibility: hidden"/>
                <svg>
                    <use href="/icons/menu.svg#icon-dark-mode" />
                </svg>
            </label>
        `;
    }

    static styles = [
        reset.styles,
        css`
            svg {
                display: inline;
                height: 1.5em;
                width: 1.5em;
                vertical-align: top;
                fill: currentColor;
            }
        `
    ];

    static initializeOnce() {
        function toggleDarkMode(page: HTMLElement | null, checked: any) {
            page?.classList.toggle("darkmode", checked);
        }

        document.body.addEventListener("dark-mode", (event: Event) =>
            toggleDarkMode(event.currentTarget as HTMLElement,
                (event as CustomEvent).detail.checked)
        );
    }
}