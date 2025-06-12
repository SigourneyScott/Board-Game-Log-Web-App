import { html, css} from "lit";
import { define, Form, View, History, Observer, Auth, InputArray } from "@calpoly/mustang";
import { state} from "lit/decorators.js";
import { Session } from "server/models"
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css.ts";
import page from "../styles/page.css.ts";
import { PlayerInputArrayElement } from "../components/player-array-input.ts"
import { TeamInputArrayElement } from "../components/team-array-input.ts"

export class SessionEditElement extends View<Model, Msg> {
    static uses = define({
        "mu-form": Form.Element,
        "input-array": InputArray.Element,
        "player-input-array": PlayerInputArrayElement,
        "team-input-array": TeamInputArrayElement,
    });

    @state()
    userid?: string;

    @state()
    get profile(): Session | undefined {
        return this.model.session;
    }

    constructor() {
        super("games:model");
    }

    render() {
        const init = {
            ...this.profile,
            players: []
        };

        return html`
            <mu-form
                .init=${init}
                @mu-form:submit=${this.handleSubmit}>
                <label>
                    <span>Game Name</span>
                    <input name="game" />
                </label>
                <label>
                    <span>Date</span>
                    <input name="date" />
                </label>
                <label>
                    <span>Image URL</span>
                    <input name="imgSrc" />
                </label>
                <label>
                    <span>Winner?</span>
                    <input name="sym" type="checkbox" autocomplete="off"/>
                </label>
                <fieldset>
                    <h3>Players</h3>
                    <label>
                        <span></span>
                    <player-input-array name="players"> </player-input-array>
                </fieldset>
            </mu-form>
        `;
    }

    static styles = [
        reset.styles,
        page.styles,
        css`
        
        mu-form {
            display: grid;
            grid-area: fm;
            grid-template-columns: subgrid;
            margin: 50px;
            margin-right: 100px;
            margin-left: 100px;
        }
        input {
            grid-column: input / span 2;
        }
        fieldset {
            > h3 {
                grid-column: label / end;
            }
            > label {
                display: grid;
                grid-column: label / end;
                grid-template-columns: subgrid;
                gap: var(--size-spacing-medium);
            }
        }
        `
    ]

    handleSubmit(event: Form.SubmitEvent<Session>) {
        if (this.userid !== undefined) {
            let json = event.detail as Form.Values;

            //const ex = (n: string) => {
            //    const value = json[n];

            //    delete json[n];
            //    return value;
            //};

            //console.log(json.teams);
            json.teams = (json.players as Array<string>).map(
                (playerName) => ({
                    name: "",
                    playerNames: [playerName],
                    winner: false
                })
            );

            json.link = "";

            json.sym = json.sym ? json.sym : false;

            delete json.players;

            console.log(json as unknown as Session);

            this.dispatchMessage([
                "session/save",
                {
                    userid: this.userid,
                    session: json as unknown as Session,
                    onSuccess: () =>
                        History.dispatch(this, "history/navigate", {
                            href: `/app`
                        }),
                    onFailure: (error: Error) =>
                        console.log("ERROR:", error)
                }
            ]);
        }
        
    }

    _authObserver = new Observer<Auth.Model>(this, "games:auth");

    connectedCallback() {
        super.connectedCallback();
        this._authObserver.observe((auth: Auth.Model) => {
            const { user } = auth;

            if (user && user.authenticated) {
                this.userid = user.username;
            } else {
                this.userid = undefined;
            }
        });
    }
}