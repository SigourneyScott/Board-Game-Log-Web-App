import{i as c,a as u,e as O,x as o,r as g,O as w,d as k,b,n as v,h as j,c as S,_ as B}from"./reset.css-DrUu50tp.js";const A=c`
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
`,x={styles:A},_=class _ extends u{render(){return o`
            <label
                @change=${e=>{var s;return O.relay(e,"dark-mode",{checked:(s=e.target)==null?void 0:s.checked})}}
            >
                <input type="checkbox" autocomplete="off" style="visibility: hidden"/>
                <svg>
                    <use href="/icons/menu.svg#icon-dark-mode" />
                </svg>
            </label>
        `}static initializeOnce(){function e(s,i){s==null||s.classList.toggle("darkmode",i)}document.body.addEventListener("dark-mode",s=>e(s.currentTarget,s.detail.checked))}};_.styles=[g.styles,c`
            svg {
                display: inline;
                height: 1.5em;
                width: 1.5em;
                vertical-align: top;
                fill: currentColor;
            }
        `];let p=_;var F=Object.defineProperty,z=(n,e,s,i)=>{for(var t=void 0,r=n.length-1,a;r>=0;r--)(a=n[r])&&(t=a(e,s,t)||t);return t&&F(e,s,t),t};const m=class m extends u{constructor(){super(...arguments),this.loggedIn=!1,this._authObserver=new w(this,"games:auth")}render(){return o`
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
        `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{const{user:s}=e;s&&s.authenticated?(this.loggedIn=!0,this.userid=s.username):(this.loggedIn=!1,this.userid=void 0)})}renderSignOutButton(){return o`
            <button
                @click=${e=>{O.relay(e,"auth:message",["auth/signout"])}}
            >
                Sign Out
            </button>
        `}renderSignInButton(){return o`
            <a @click=${()=>location.assign("/login.html")}>Sign In</a>
        `}};m.uses=k({"dark-mode-toggle":p}),m.styles=[g.styles,x.styles,c`
            .navbar {
                background: var(--color-background-card);
                display: flex;
                justify-content: space-between;
                padding: 15px;
                width: 100 %;
                box-sizing: border-box;
                flex-basis: auto;
            }
        `];let l=m;z([b()],l.prototype,"loggedIn");z([b()],l.prototype,"userid");var L=Object.defineProperty,$=(n,e,s,i)=>{for(var t=void 0,r=n.length-1,a;r>=0;r--)(a=n[r])&&(t=a(e,s,t)||t);return t&&L(e,s,t),t};const C=class C extends u{render(){return o`
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
        `}};C.styles=[g.styles,x.styles,c`
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
        `];let d=C;$([v({attribute:"session-id"})],d.prototype,"sessionId");$([v({attribute:"img-src"})],d.prototype,"imgSrc");$([v()],d.prototype,"game");$([v()],d.prototype,"date");var N=Object.defineProperty,H=(n,e,s,i)=>{for(var t=void 0,r=n.length-1,a;r>=0;r--)(a=n[r])&&(t=a(e,s,t)||t);return t&&N(e,s,t),t};const y=class y extends u{constructor(){super(...arguments),this.sessions=[],this._authObserver=new w(this,"games:auth")}get src(){return"/api/sessions"}render(){const{sessions:e}=this;function s(i){return o`
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
                ${e.map(s)}
            </div>
        `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this.src&&this.hydrate(this.src)})}get authorization(){return this._user&&this._user.authenticated?(console.log("authenticated"),{Authorization:`Bearer ${this._user.token}`}):(console.log("failed authentication"),{})}hydrate(e){fetch(e,{headers:this.authorization}).then(s=>{if(s.status!==200)throw`Status: ${s.status}`;return s.json()}).then(s=>{console.log(s);const i=s;this.sessions=i}).catch(s=>console.log(`Failed to render data ${e}:`,s))}};y.uses=k({"session-tile":d}),y.styles=[g.styles,x.styles,c`
            .grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                overflow-y: scroll;
            }
        `];let f=y;H([b()],f.prototype,"sessions");var q=Object.defineProperty,P=(n,e,s,i)=>{for(var t=void 0,r=n.length-1,a;r>=0;r--)(a=n[r])&&(t=a(e,s,t)||t);return t&&q(e,s,t),t};const I=class I extends u{constructor(){super(...arguments),this.sessionid="",this._authObserver=new w(this,"games:auth")}get src(){if(this.sessionid)return`/api/sessions/${this.sessionid}`}render(){const{session:e}=this;function s(t){return o`
                <div class="team card">
                    <h2>
                        ${t.winner?o`
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
        `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this.src&&this.hydrate(this.src)})}get authorization(){return this._user&&this._user.authenticated?(console.log("authenticated"),{Authorization:`Bearer ${this._user.token}`}):(console.log("failed authentication"),{})}hydrate(e){fetch(e,{headers:this.authorization}).then(s=>{if(s.status!==200)throw`Status: ${s.status}`;return s.json()}).then(s=>{console.log(s);const i=s;this.session=i}).catch(s=>console.log(`Failed to render data ${e}:`,s))}};I.styles=[g.styles,x.styles,c`
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
        `];let h=I;P([v({attribute:"session-id"})],h.prototype,"sessionid");P([b()],h.prototype,"session");const J=[{path:"/app/sessions/:id",view:n=>o`
            <session-content session-id=${n.id}></session-content>
        `},{path:"/app",view:()=>o`
            <session-grid></sesssion-grid>
        `},{path:"/",redirect:"/app"}];k({"page-header":l,"session-grid":f,"session-content":h,"mu-auth":S.Provider,"mu-history":j.Provider,"mu-switch":class extends B.Element{constructor(){super(J,"games:history","games:auth")}}});p.initializeOnce();
