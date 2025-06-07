import{a as $,i as c,b as w,e as k,x as o,r as p,O as B,d as C,c as y,n as l,V as P,h as N,s as A,_ as D}from"./reset.css-DCB2plq5.js";const L={};function H(r,e,s){switch(console.log("update called"),r[0]){case"sessions/select":M(r[1],s).then(t=>e(n=>({...n,sessions:t})));break;case"session/select":U(r[1],s).then(t=>e(n=>({...n,session:t})));break;default:const i=r[0];throw new Error(`Unhandled Auth message "${i}"`)}}function M(r,e){return console.log(r.userid),fetch("/api/sessions",{headers:$.headers(e)}).then(s=>{if(s.status===200)return s.json()}).then(s=>{if(s)return s})}function U(r,e){return fetch(`/api/sessions/${r.sessionid}`,{headers:$.headers(e)}).then(s=>{if(s.status===200)return s.json()}).then(s=>{if(s)return s})}const q=c`
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
`,b={styles:q},I=class I extends w{render(){return o`
            <label
                @change=${e=>{var s;return k.relay(e,"dark-mode",{checked:(s=e.target)==null?void 0:s.checked})}}
            >
                <input type="checkbox" autocomplete="off" style="visibility: hidden"/>
                <svg>
                    <use href="/icons/menu.svg#icon-dark-mode" />
                </svg>
            </label>
        `}static initializeOnce(){function e(s,i){s==null||s.classList.toggle("darkmode",i)}document.body.addEventListener("dark-mode",s=>e(s.currentTarget,s.detail.checked))}};I.styles=[p.styles,c`
            svg {
                display: inline;
                height: 1.5em;
                width: 1.5em;
                vertical-align: top;
                fill: currentColor;
            }
        `];let v=I;var F=Object.defineProperty,j=(r,e,s,i)=>{for(var t=void 0,n=r.length-1,a;n>=0;n--)(a=r[n])&&(t=a(e,s,t)||t);return t&&F(e,s,t),t};const f=class f extends w{constructor(){super(...arguments),this.loggedIn=!1,this._authObserver=new B(this,"games:auth")}render(){return o`
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
                @click=${e=>{k.relay(e,"auth:message",["auth/signout"])}}
            >
                Sign Out
            </button>
        `}renderSignInButton(){return o`
            <a @click=${()=>location.assign("/login.html")}>Sign In</a>
        `}};f.uses=C({"dark-mode-toggle":v}),f.styles=[p.styles,b.styles,c`
            .navbar {
                background: var(--color-background-card);
                display: flex;
                justify-content: space-between;
                padding: 15px;
                width: 100 %;
                box-sizing: border-box;
                flex-basis: auto;
            }
        `];let h=f;j([y()],h.prototype,"loggedIn");j([y()],h.prototype,"userid");var J=Object.defineProperty,x=(r,e,s,i)=>{for(var t=void 0,n=r.length-1,a;n>=0;n--)(a=r[n])&&(t=a(e,s,t)||t);return t&&J(e,s,t),t};const O=class O extends w{render(){return o`
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
        `}};O.styles=[p.styles,b.styles,c`
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
        `];let d=O;x([l({attribute:"session-id"})],d.prototype,"sessionId");x([l({attribute:"img-src"})],d.prototype,"imgSrc");x([l()],d.prototype,"game");x([l()],d.prototype,"date");var K=Object.defineProperty,Q=Object.getOwnPropertyDescriptor,S=(r,e,s,i)=>{for(var t=i>1?void 0:i?Q(e,s):e,n=r.length-1,a;n>=0;n--)(a=r[n])&&(t=(i?a(e,s,t):a(t))||t);return i&&t&&K(e,s,t),t};const m=class m extends P{get sessions(){return this.model.sessions}constructor(){super("games:model")}render(){const{sessions:e}=this;function s(i){return o`
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
        `}attributeChangedCallback(e,s,i){super.attributeChangedCallback(e,s,i),e==="user-id"&&s!==i&&i&&(console.log("dispatching message"),this.dispatchMessage(["sessions/select",{userid:i}]))}};m.uses=C({"session-tile":d}),m.styles=[p.styles,b.styles,c`
            .grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                overflow-y: scroll;
            }
        `];let u=m;S([l({attribute:"user-id"})],u.prototype,"userid",2);S([y()],u.prototype,"sessions",1);var R=Object.defineProperty,W=Object.getOwnPropertyDescriptor,z=(r,e,s,i)=>{for(var t=i>1?void 0:i?W(e,s):e,n=r.length-1,a;n>=0;n--)(a=r[n])&&(t=(i?a(e,s,t):a(t))||t);return i&&t&&R(e,s,t),t};const _=class _ extends P{get session(){return this.model.session}constructor(){super("games:model")}render(){const{session:e}=this;function s(t){return o`
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
        `}attributeChangedCallback(e,s,i){super.attributeChangedCallback(e,s,i),e==="session-id"&&s!==i&&i&&this.dispatchMessage(["session/select",{sessionid:i}])}};_.styles=[p.styles,b.styles,c`
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
        `];let g=_;z([l({attribute:"session-id"})],g.prototype,"sessionid",2);z([y()],g.prototype,"session",1);const X=[{path:"/app/sessions/:id",view:r=>o`
            <session-content session-id=${r.id}></session-content>
        `},{path:"/app",view:()=>o`
            <session-grid user-id=1></sesssion-grid>
        `},{path:"/",redirect:"/app"}];C({"mu-history":N.Provider,"mu-switch":class extends D.Element{constructor(){super(X,"games:history","games:auth")}},"mu-store":class extends A.Provider{constructor(){super(H,L,"games:auth")}},"page-header":h,"session-grid":u,"session-content":g,"mu-auth":$.Provider});v.initializeOnce();
