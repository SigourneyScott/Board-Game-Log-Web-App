import{a as j,i as c,b as L,e as l,x as o,r as g,O as S,d as C,c as u,n as f,V as R,s as E,h as d,f as F,g as X,j as Y,k as H,l as Z,_ as G}from"./reset.css-pwtFpt33.js";const V={};function ee(a,e,s){switch(console.log("update called"),a[0]){case"sessions/select":se(a[1],s).then(t=>e(r=>({...r,sessions:t})));break;case"session/select":te(a[1],s).then(t=>e(r=>({...r,session:t})));break;case"session/save":console.log("recieved session save message"),ie(a[1],s).then(t=>e(r=>({...r,session:t}))).then(()=>{const{onSuccess:t}=a[1];t&&t()}).catch(t=>{const{onFailure:r}=a[1];r&&r(t)});break;default:const i=a[0];throw new Error(`Unhandled Auth message "${i}"`)}}function se(a,e){return console.log(a.userid),fetch("/api/sessions",{headers:j.headers(e)}).then(s=>{if(s.status===200)return console.log("status 200"),s.json();console.log("something went wrong")}).then(s=>{if(s)return s})}function te(a,e){return fetch(`/api/sessions/${a.sessionid}`,{headers:j.headers(e)}).then(s=>{if(s.status===200)return s.json()}).then(s=>{if(s)return s})}function ie(a,e){return console.log("saving session"),fetch("/api/sessions",{method:"PUT",headers:{"Content-Type":"application/json",...j.headers(e)},body:JSON.stringify(a.session)}).then(s=>{if(s.status===200)return s.json();throw new Error(`Failed to save profile for ${a.userid}`)}).then(s=>{if(s)return s})}const ae=c`
    h2 {
        margin: 0px;
        margin-bottom: 10px;
        color: var(--color-accent2);
        font-family: var(--font-header);
        font-size: 25px;
    }

    h1 {
        color: var(--color-accent1);
        font-family: var(--font-header);
    }

    a {
        color: inherit;
        text-decoration-line: none;
    }

    img {
        max-height: 100%;
        max-width: 100%;
    }

    .card {
        background: var(--color-background-card);
        border-radius: 10px;
        padding: 15px;
        margin: 10px;
    }

    svg.icon {
        display: inline;
        height: 1.5em;
        width: 1.5em;
        vertical-align: top;
        fill: currentColor;
    }

    .trophy.icon {
        color: #ffc048;
    }
`,v={styles:ae},z=class z extends L{render(){return o`
            <label
                @change=${e=>{var s;return l.relay(e,"dark-mode",{checked:(s=e.target)==null?void 0:s.checked})}}
            >
                <input type="checkbox" autocomplete="off" style="visibility: hidden"/>
                <svg>
                    <use href="/icons/menu.svg#icon-dark-mode" />
                </svg>
            </label>
        `}static initializeOnce(){function e(s,i){s==null||s.classList.toggle("darkmode",i)}document.body.addEventListener("dark-mode",s=>e(s.currentTarget,s.detail.checked))}};z.styles=[g.styles,c`
            svg {
                display: inline;
                height: 1.5em;
                width: 1.5em;
                vertical-align: top;
                fill: currentColor;
            }
        `];let _=z;var re=Object.defineProperty,U=(a,e,s,i)=>{for(var t=void 0,r=a.length-1,n;r>=0;r--)(n=a[r])&&(t=n(e,s,t)||t);return t&&re(e,s,t),t};const P=class P extends L{constructor(){super(...arguments),this.loggedIn=!1,this._authObserver=new S(this,"games:auth")}render(){return o`
            <div class="navbar">
                <h1>
                    <a href="/app">${this.userid}</a>
                     
                    ${this.loggedIn?this.renderSignOutButton():this.renderSignInButton()}
                </h1>
                <h1>
                    <dark-mode-toggle></dark-mode-toggle>
                </h1>
            </div>
        `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{const{user:s}=e;s&&s.authenticated?(this.loggedIn=!0,this.userid=s.username):(this.loggedIn=!1,this.userid=void 0)})}renderSignOutButton(){return o`
            <button
                @click=${e=>{l.relay(e,"auth:message",["auth/signout"])}}
            >
                Sign Out
            </button>
        `}renderSignInButton(){return o`
            <a @click=${()=>location.assign("/login.html")}>Sign In</a>
        `}};P.uses=C({"dark-mode-toggle":_}),P.styles=[g.styles,v.styles,c`
            .navbar {
                background: var(--color-background-card);
                display: flex;
                justify-content: space-between;
                padding: 15px;
                width: 100 %;
                box-sizing: border-box;
                flex-basis: auto;
            }
        `];let b=P;U([u()],b.prototype,"loggedIn");U([u()],b.prototype,"userid");var ne=Object.defineProperty,A=(a,e,s,i)=>{for(var t=void 0,r=a.length-1,n;r>=0;r--)(n=a[r])&&(t=n(e,s,t)||t);return t&&ne(e,s,t),t};const D=class D extends L{render(){return o`
            <a href="/app/sessions/${this.sessionId}">
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
        `}};D.styles=[g.styles,v.styles,c`
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
        `];let h=D;A([f({attribute:"session-id"})],h.prototype,"sessionId");A([f({attribute:"img-src"})],h.prototype,"imgSrc");A([f()],h.prototype,"game");A([f()],h.prototype,"date");var oe=Object.defineProperty,le=Object.getOwnPropertyDescriptor,W=(a,e,s,i)=>{for(var t=i>1?void 0:i?le(e,s):e,r=a.length-1,n;r>=0;r--)(n=a[r])&&(t=(i?n(e,s,t):n(t))||t);return i&&t&&oe(e,s,t),t};const k=class k extends R{get sessions(){return this.model.sessions}constructor(){super("games:model")}render(){const{sessions:e}=this;function s(i){return o`
                <session-tile
                    session-id=${i._id}
                    img-src=${i.imgSrc}
                    game=${i.game}
                    date=${i.date}>
                    ${i.sym?o`
                        <svg class="icon trophy" slot="icon">
                            <use href="/icons/menu.svg#icon-crown"/>
                        </svg>
                    `:""}
                </session-tile>`}return o`
            <div class="grid">
                ${e?e.map(s):"no sessions"}
            </div>
        `}attributeChangedCallback(e,s,i){super.attributeChangedCallback(e,s,i),e==="user-id"&&s!==i&&i&&(console.log("dispatching message"),this.dispatchMessage(["sessions/select",{userid:i}]))}};k.uses=C({"session-tile":h}),k.styles=[g.styles,v.styles,c`
            .grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                overflow-y: scroll;
            }
        `];let y=k;W([f({attribute:"user-id"})],y.prototype,"userid",2);W([u()],y.prototype,"sessions",1);var de=Object.defineProperty,ce=Object.getOwnPropertyDescriptor,B=(a,e,s,i)=>{for(var t=i>1?void 0:i?ce(e,s):e,r=a.length-1,n;r>=0;r--)(n=a[r])&&(t=(i?n(e,s,t):n(t))||t);return i&&t&&de(e,s,t),t};const T=class T extends R{get session(){return this.model.session}constructor(){super("games:model")}render(){const{session:e}=this;function s(t){return o`
                <div class="team card">
                    <div class="teamName">
                        ${t.winner?o`
                            <h2>
                                <svg class="icon trophy">
                                    <use href="/icons/menu.svg#icon-crown"/>
                                </svg>
                            </h2>
                        `:""}
                        <h2>
                            ${t.name}
                        </h2>
                        ${t.winner?o`
                            <h2>
                                <svg class="icon trophy">
                                    <use href="/icons/menu.svg#icon-crown"/>
                                </svg>
                            </h2>
                        `:""}
                    </div>
                    ${t.playerNames.map(i)}
                </div>
            `}function i(t){return o`<div class="player">${t}</div>`}return o`
            <div class="sessionContent">
                <div class="gameInfo card">
                    <div class="gameHeader">
                        <h1>${e?e.game:""}</h1>
                        <h1>${e?e.date:""}</h1>
                    </div>
                    <div class="gameImg"><img src=${e?e.imgSrc:""}/></div>
                </div>
                <div class="details">
                        <div class="teamInfo">
                            ${e?e.teams.map(s):""}
                        </div>

                        <div class="notes card">
                            <h2>Notes</h2>
                        </div>
                    </div>
                </div>
            </div>
        `}attributeChangedCallback(e,s,i){super.attributeChangedCallback(e,s,i),e==="session-id"&&s!==i&&i&&this.dispatchMessage(["session/select",{sessionid:i}])}};T.styles=[g.styles,v.styles,c`
            .sessionContent {
                display: flex;
                justify-content: space-between;
                flex-basis: 100%;
                overflow: hidden;
                width: 100vw;
            }

            .gameInfo {
                flex: 0 1 50em;

                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
            }

            .gameHeader {
                display: flex;
                justify-content: space-between;
                width: 100%;
            }

            .gameImg {
                min-height: 0;
                min-width: 0;
                margin-top: 15px;
            }

            .details {
                flex: 0 1 100%;
                overflow: hidden;

                display: flex;
                flex-direction: column;

            }

            .teamInfo {
                display: flex;
                flex: 0 0 auto;
                overflow: scroll visible;
            }

            .team {
                background: var(--color-background-card);
                text-align: center;
                position: relative;
            }

            .notes {
                flex-basis: 100%;
            }

            .teamName {
                display: flex;
                justify-content: space-between;
            }
        `];let x=T;B([f({attribute:"session-id"})],x.prototype,"sessionid",2);B([u()],x.prototype,"session",1);var ue=Object.defineProperty,J=(a,e,s,i)=>{for(var t=void 0,r=a.length-1,n;r>=0;r--)(n=a[r])&&(t=n(e,s,t)||t);return t&&ue(e,s,t),t};const M=class M extends L{constructor(){super(...arguments),this.loggedIn=!1,this._authObserver=new S(this,"games:auth")}render(){return o`
            <a href="/app/sessions/edit">
                <div class="button">
                    <h1>+</h1>
                </div>
            </a>
        `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{const{user:s}=e;s&&s.authenticated?(this.loggedIn=!0,this.userid=s.username):(this.loggedIn=!1,this.userid=void 0)})}};M.styles=[g.styles,v.styles,c`
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
        `];let w=M;J([u()],w.prototype,"loggedIn");J([u()],w.prototype,"userid");const m=class m extends HTMLElement{constructor(){super(),this._array=[],E(this).template(m.template).styles(m.styles),this.addEventListener("input-array:add",e=>{e.stopPropagation(),this.append(q("",this._array.length))}),this.addEventListener("input-array:remove",e=>{e.stopPropagation(),this.removeClosestItem(e.target)}),this.addEventListener("change",e=>{e.stopPropagation();const s=e.target;if(s&&s!==this){const i=new Event("change",{bubbles:!0}),t=s.value,r=s.closest("label");if(r){const n=Array.from(this.children).indexOf(r);this._array[n]=t,this.dispatchEvent(i)}}}),this.addEventListener("click",e=>{l.originalTarget(e,"button.add")?l.relay(e,"input-array:add"):l.originalTarget(e,"button.remove")&&l.relay(e,"input-array:remove")})}get name(){return this.getAttribute("name")}get value(){return this._array}set value(e){this._array=Array.isArray(e)?e:[e],pe(this._array,this)}removeClosestItem(e){const s=e.closest("label");if(console.log("Removing closest item:",s,e),s){const i=Array.from(this.children).indexOf(s);this._array.splice(i,1),s.remove()}}};m.template=d`
        <template>
            <ul>
            <slot></slot>
            </ul>
            <button class="add">
            <slot name="label-add">Add Player</slot>
            <style></style>
            </button>
        </template>
    `,m.styles=F`
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
    `;let O=m;function pe(a,e){e.replaceChildren(),a.forEach((s,i)=>e.append(q(s)))}function q(a,e){const s=a===void 0?d`<input />`:d`<input value="${a}" />`;return d`
        <label>
            ${s}
            <button class="remove" type="button">Remove</button>
        </label>
    `}const p=class p extends HTMLElement{constructor(){super(),this._array=[],E(this).template(p.template).styles(p.styles),this.addEventListener("input-array:add",e=>{e.stopPropagation(),this.append(K("",this._array.length))}),this.addEventListener("input-array:remove",e=>{e.stopPropagation(),this.removeClosestItem(e.target)}),this.addEventListener("change",e=>{e.stopPropagation();const s=e.target;if(s&&s!==this){const i=new Event("change",{bubbles:!0}),t=s.value,r=s.closest("label");if(r){const n=Array.from(this.children).indexOf(r);this._array[n]=t,this.dispatchEvent(i)}}}),this.addEventListener("click",e=>{l.originalTarget(e,"button.add")?l.relay(e,"input-array:add"):l.originalTarget(e,"button.remove")&&l.relay(e,"input-array:remove")})}get name(){return this.getAttribute("name")}get value(){return this._array}set value(e){this._array=Array.isArray(e)?e:[e],he(this._array,this)}removeClosestItem(e){const s=e.closest("label");if(console.log("Removing closest item:",s,e),s){const i=Array.from(this.children).indexOf(s);this._array.splice(i,1),s.remove()}}};p.uses=C({"player-input-array":O}),p.template=d`
    <template>
      <ul>
        <slot></slot>
      </ul>
      <button class="add">
        <slot name="label-add">Add Team</slot>
        <style></style>
      </button>
    </template>
  `,p.styles=F`
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
  `;let N=p;function he(a,e){e.replaceChildren(),a.forEach((s,i)=>e.append(K(s)))}function K(a,e){const s=a===void 0?d`
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
            `:d`
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
            `;return d`
        <label>
            ${s}
            <button class="remove" type="button">Remove</button>
        </label>
    `}var ge=Object.defineProperty,me=Object.getOwnPropertyDescriptor,Q=(a,e,s,i)=>{for(var t=i>1?void 0:i?me(e,s):e,r=a.length-1,n;r>=0;r--)(n=a[r])&&(t=(i?n(e,s,t):n(t))||t);return i&&t&&ge(e,s,t),t};const I=class I extends R{constructor(){super("games:model"),this._authObserver=new S(this,"games:auth")}get profile(){return this.model.session}render(){const e={...this.profile,players:[]};return o`
            <mu-form
                .init=${e}
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
        `}handleSubmit(e){if(this.userid!==void 0){let s=e.detail;s.teams=s.players.map(i=>({name:"",playerNames:[i],winner:!1})),s.link="",s.sym=s.sym?s.sym:!1,delete s.players,console.log(s),this.dispatchMessage(["session/save",{userid:this.userid,session:s,onSuccess:()=>H.dispatch(this,"history/navigate",{href:"/app"}),onFailure:i=>console.log("ERROR:",i)}])}}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{const{user:s}=e;s&&s.authenticated?this.userid=s.username:this.userid=void 0})}};I.uses=C({"mu-form":Y.Element,"input-array":X.Element,"player-input-array":O,"team-input-array":N}),I.styles=[g.styles,v.styles,c`
        
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
        `];let $=I;Q([u()],$.prototype,"userid",2);Q([u()],$.prototype,"profile",1);const fe=[{path:"/app/sessions/edit",view:()=>o`
            <session-edit></session-edit>
        `},{path:"/app/sessions/:id",view:a=>o`
            <session-content session-id=${a.id}></session-content>
        `},{path:"/app",view:()=>o`
            <session-grid user-id=1></sesssion-grid>
        `},{path:"/",redirect:"/app"}];C({"mu-auth":j.Provider,"mu-history":H.Provider,"mu-switch":class extends G.Element{constructor(){super(fe,"games:history","games:auth")}},"mu-store":class extends Z.Provider{constructor(){super(ee,V,"games:auth")}},"page-header":b,"session-grid":y,"session-content":x,"create-session-button":w,"session-edit":$});_.initializeOnce();
