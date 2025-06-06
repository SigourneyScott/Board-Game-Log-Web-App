import{a as I,i as d,b as y,e as O,x as n,r as u,O as P,d as w,c as b,n as g,V as S,h as B,s as A,_ as L}from"./reset.css-DCB2plq5.js";const N={};function D(o,e,s){switch(console.log("update called"),o[0]){case"sessions/select":console.log("case 1"),F(o[1],s).then(t=>e(r=>({...r,sessions:t})));break;default:const i=o[0];throw new Error(`Unhandled Auth message "${i}"`)}}function F(o,e){return console.log(o.userid),console.log("test1"),fetch("/api/sessions",{headers:I.headers(e)}).then(s=>{if(console.log("fetched"),s.status===200)return console.log("fetch successful"),s.json();console.log("fetch failed")}).then(s=>{if(s)return console.log("got json"),s})}const H=d`
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
        position: absolute;
    }
`,x={styles:H},k=class k extends y{render(){return n`
            <label
                @change=${e=>{var s;return O.relay(e,"dark-mode",{checked:(s=e.target)==null?void 0:s.checked})}}
            >
                <input type="checkbox" autocomplete="off" style="visibility: hidden"/>
                <svg>
                    <use href="/icons/menu.svg#icon-dark-mode" />
                </svg>
            </label>
        `}static initializeOnce(){function e(s,i){s==null||s.classList.toggle("darkmode",i)}document.body.addEventListener("dark-mode",s=>e(s.currentTarget,s.detail.checked))}};k.styles=[u.styles,d`
            svg {
                display: inline;
                height: 1.5em;
                width: 1.5em;
                vertical-align: top;
                fill: currentColor;
            }
        `];let v=k;var U=Object.defineProperty,j=(o,e,s,i)=>{for(var t=void 0,r=o.length-1,a;r>=0;r--)(a=o[r])&&(t=a(e,s,t)||t);return t&&U(e,s,t),t};const f=class f extends y{constructor(){super(...arguments),this.loggedIn=!1,this._authObserver=new P(this,"games:auth")}render(){return n`
            <div class="navbar">
                <h1>
                    <a href="/app">${this.userid}</a>
                     
                    ${this.loggedIn?this.renderSignOutButton():this.renderSignInButton()}
                </h1>
                <h1>
                    <dark-mode-toggle></dark-mode-toggle>
                    <svg class="icon">
                        <use href="/icons/menu.svg#icon-list" />
                    </svg>
                    <svg class="icon">
                        <use href="/icons/menu.svg#icon-grid" />
                    </svg>
                </h1>
            </div>
        `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{const{user:s}=e;s&&s.authenticated?(this.loggedIn=!0,this.userid=s.username):(this.loggedIn=!1,this.userid=void 0)})}renderSignOutButton(){return n`
            <button
                @click=${e=>{O.relay(e,"auth:message",["auth/signout"])}}
            >
                Sign Out
            </button>
        `}renderSignInButton(){return n`
            <a @click=${()=>location.assign("/login.html")}>Sign In</a>
        `}};f.uses=w({"dark-mode-toggle":v}),f.styles=[u.styles,x.styles,d`
            .navbar {
                background: var(--color-background-card);
                display: flex;
                justify-content: space-between;
                padding: 15px;
                width: 100 %;
                box-sizing: border-box;
                flex-basis: auto;
            }
        `];let l=f;j([b()],l.prototype,"loggedIn");j([b()],l.prototype,"userid");var q=Object.defineProperty,$=(o,e,s,i)=>{for(var t=void 0,r=o.length-1,a;r>=0;r--)(a=o[r])&&(t=a(e,s,t)||t);return t&&q(e,s,t),t};const C=class C extends y{render(){return n`
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
        `}};C.styles=[u.styles,x.styles,d`
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
        `];let c=C;$([g({attribute:"session-id"})],c.prototype,"sessionId");$([g({attribute:"img-src"})],c.prototype,"imgSrc");$([g()],c.prototype,"game");$([g()],c.prototype,"date");var J=Object.defineProperty,K=Object.getOwnPropertyDescriptor,M=(o,e,s,i)=>{for(var t=K(e,s),r=o.length-1,a;r>=0;r--)(a=o[r])&&(t=a(e,s,t)||t);return t&&J(e,s,t),t};const m=class m extends S{get sessions(){return this.model.sessions}constructor(){super("games:model")}render(){const{sessions:e}=this;function s(i){return n`
                <session-tile
                    session-id=${i._id}
                    img-src=${i.imgSrc}
                    game=${i.game}
                    date=${i.date}>
                    ${i.sym?n`
                        <svg class="icon trophy" slot="icon">
                            <use href="/icons/menu.svg#icon-crown"/>
                        </svg>
                    `:""}
                </session-tile>`}return n`
            <div class="grid">
                ${e?e.map(s):"no sessions"}
            </div>
        `}attributeChangedCallback(e,s,i){super.attributeChangedCallback(e,s,i),s!==i&&i&&(console.log("dispatching message"),this.dispatchMessage(["sessions/select",{userid:i}]))}};m.uses=w({"session-tile":c}),m.styles=[u.styles,x.styles,d`
            .grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                overflow-y: scroll;
            }
        `];let p=m;M([b()],p.prototype,"sessions");var Q=Object.defineProperty,z=(o,e,s,i)=>{for(var t=void 0,r=o.length-1,a;r>=0;r--)(a=o[r])&&(t=a(e,s,t)||t);return t&&Q(e,s,t),t};const _=class _ extends y{constructor(){super(...arguments),this.sessionid="",this._authObserver=new P(this,"games:auth")}get src(){if(this.sessionid)return`/api/sessions/${this.sessionid}`}render(){const{session:e}=this;function s(t){return n`
                <div class="team card">
                    <h2>
                        ${t.winner?n`
                            <svg class="icon trophy" style = "left: 0;">
                                <use href="/icons/menu.svg#icon-crown"/>
                            </svg>
                            <svg class="icon trophy" style = "right: 0;">
                                <use href="/icons/menu.svg#icon-crown"/>
                            </svg>
                        `:""}
                        ${t.name}
                    </h2>
                    ${t.playerNames.map(i)}
                </div>
            `}function i(t){return n`<div class="player">${t}</div>`}return n`
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
        `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this.src&&this.hydrate(this.src)})}get authorization(){return this._user&&this._user.authenticated?(console.log("authenticated"),{Authorization:`Bearer ${this._user.token}`}):(console.log("failed authentication"),{})}hydrate(e){fetch(e,{headers:this.authorization}).then(s=>{if(s.status!==200)throw`Status: ${s.status}`;return s.json()}).then(s=>{console.log(s);const i=s;this.session=i}).catch(s=>console.log(`Failed to render data ${e}:`,s))}};_.styles=[u.styles,x.styles,d`
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
        `];let h=_;z([g({attribute:"session-id"})],h.prototype,"sessionid");z([b()],h.prototype,"session");const R=[{path:"/app/sessions/:id",view:o=>n`
            <session-content session-id=${o.id}></session-content>
        `},{path:"/app",view:()=>n`
            <session-grid></sesssion-grid>
        `},{path:"/",redirect:"/app"}];w({"mu-history":B.Provider,"mu-switch":class extends L.Element{constructor(){super(R,"games:history","games:auth")}},"mu-store":class extends A.Provider{constructor(){super(D,N,"games:auth")}},"page-header":l,"session-grid":p,"session-content":h,"mu-auth":I.Provider});v.initializeOnce();
