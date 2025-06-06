import { Auth, History, Switch, Store, define } from "@calpoly/mustang";
import { html } from "lit";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { HeaderElement } from "./components/header.ts"
import { SessionGridView } from "./views/session-grid-view.ts"
import { SessionView } from "./views/session-view.ts"
import { DarkModeToggleElement } from "./components/darkmodeToggle.ts"

const routes = [
    {
        path: "/app/sessions/:id",
        view: (params: Switch.Params) => html`
            <session-content session-id=${params.id}></session-content>
        `
    },
    {
        path: "/app",
        view: () => html`
            <session-grid></sesssion-grid>
        `
    },
    {
        path: "/",
        redirect: "/app"
    }
];

define({
    "mu-history": History.Provider,
    "mu-switch": class AppSwitch extends Switch.Element {
        constructor() {
            super(routes, "games:history", "games:auth");
        }
    },
    "mu-store": class AppStore
        extends Store.Provider<Model, Msg>
    {
        constructor() {
            super(update, init, "games:auth");
        }
    },
    "page-header": HeaderElement,
    "session-grid": SessionGridView,
    "session-content": SessionView,
    "mu-auth": Auth.Provider,
});

DarkModeToggleElement.initializeOnce();