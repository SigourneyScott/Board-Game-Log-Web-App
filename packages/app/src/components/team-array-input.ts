import { Events, shadow, define, html, css } from "@calpoly/mustang";
//import { Team } from "server/models"
import { PlayerInputArrayElement } from "./player-array-input.ts"

export class TeamInputArrayElement extends HTMLElement {
    static uses = define({
        "player-input-array": PlayerInputArrayElement
    })

  static template = html`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add Team</slot>
        <style></style>
      </button>
    </template>
  `;

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: input / end;
    }
    ul {
      display: contents;
    }
    button.add {
      grid-column: input / input-end;
    }
    ::slotted(label) {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: subgrid;
    }
  `;

  _array: Array<string> = [];

  get name() {
    return this.getAttribute("name");
  }

  get value() {
    return this._array;
  }

  set value(array) {
    this._array = Array.isArray(array) ? array : [array];
    populateArray(this._array, this);
  }

  constructor() {
    super();
    shadow(this)
      .template(TeamInputArrayElement.template)
      .styles(TeamInputArrayElement.styles);

    //Adds input element
    this.addEventListener("input-array:add", (event) => {
      event.stopPropagation();
      this.append(renderItem("", this._array.length));
    });

    //Removes input element
    this.addEventListener("input-array:remove", (event) => {
      event.stopPropagation();
      this.removeClosestItem(event.target as HTMLElement);
    });

    //Listens for inputs changing in input elements
    this.addEventListener("change", (event) => {
      event.stopPropagation();
      // console.log("Change event:", event);
      const target = event.target as HTMLElement;

      if (target && target !== this) {
        const newEvent = new Event("change", { bubbles: true });
        const value = (target as HTMLInputElement).value;
        const item = target.closest("label");
        if (item) {
          const index = Array.from(this.children).indexOf(item);
          this._array[index] = value;
          this.dispatchEvent(newEvent);
        }
      }
    });

    //Listens for button presses and relays the appropriate event
    this.addEventListener("click", (event) => {
      const addbutton = Events.originalTarget(event, "button.add");
      if (addbutton) Events.relay(event, "input-array:add");
      else {
        const removebutton = Events.originalTarget(
          event,
          "button.remove"
        );
        if (removebutton) Events.relay(event, "input-array:remove");
      }
    });
  }

  removeClosestItem(element: HTMLElement) {
    const item = element.closest("label");
    console.log("Removing closest item:", item, element);
    if (item) {
      const index = Array.from(this.children).indexOf(item);
      this._array.splice(index, 1);
      item.remove();
    }
  }
}

function populateArray(
  array: Array<string>,
  container: HTMLElement
) {
  container.replaceChildren();
  array.forEach((s, i) => container.append(renderItem(s, i)));
}

function renderItem(value: string | undefined, _: number) {
    const field =
        value === undefined
            ? html`
                <fieldset>
                    <label>
                        <span>Team Name</span>
                        <input name="name"/>
                    </label>
                    <label>
                        <span>Winner?</span>
                        <input name="winner" type="checkbox" autocomplete="off"/>
                    </label>
                    <player-input-array name="playerNames"></player-input-array>
                </fieldset>
            `
            : html`
                <fieldset>
                    <label>
                        <span>Team Name</span>
                        <input name="name"/>
                    </label>
                    <label>
                        <span>Winner?</span>
                        <input name="winner" type="checkbox" autocomplete="off"/>
                    </label>
                    <label>
                        <span><h3>Players</h3></span>
                        <player-input-array name="players"> </player-input-array>
                    </label>
                </fieldset>
            `;

    return html`
        <label>
            ${field}
            <button class="remove" type="button">Remove</button>
        </label>
    `;
}

export { TeamInputArrayElement as Element };
