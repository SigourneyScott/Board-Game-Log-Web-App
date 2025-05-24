import{i as p,e as C,x as a,r as m,a as u,n as g,O,d as b,b as k,c as z}from"./state-bsK0PZAq.js";const $=class $ extends p{render(){return a`
            <label
                @change=${s=>{var e;return C.relay(s,"dark-mode",{checked:(e=s.target)==null?void 0:e.checked})}}
            >
                <input type="checkbox" autocomplete="off" style="visibility: hidden"/>
                <svg>
                    <use href="/icons/menu.svg#icon-dark-mode" />
                </svg>
            </label>
        `}static initializeOnce(){function s(e,i){e==null||e.classList.toggle("darkmode",i)}document.body.addEventListener("dark-mode",e=>s(e.currentTarget,e.detail.checked))}};$.styles=[m.styles,u`
            svg {
                display: inline;
                height: 1.5em;
                width: 1.5em;
                vertical-align: top;
                fill: currentColor;
            }
        `];let c=$;const P=u`
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
`,x={styles:P};var j=Object.defineProperty,y=(o,s,e,i)=>{for(var t=void 0,r=o.length-1,n;r>=0;r--)(n=o[r])&&(t=n(s,e,t)||t);return t&&j(s,e,t),t};const w=class w extends p{render(){return a`
            <a href="${this.sessionLink}">
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
        `}};w.styles=[m.styles,x.styles,u`
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
        `];let d=w;y([g({attribute:"session-link"})],d.prototype,"sessionLink");y([g({attribute:"img-src"})],d.prototype,"imgSrc");y([g()],d.prototype,"game");y([g()],d.prototype,"date");var S=Object.defineProperty,_=(o,s,e,i)=>{for(var t=void 0,r=o.length-1,n;r>=0;r--)(n=o[r])&&(t=n(s,e,t)||t);return t&&S(s,e,t),t};const v=class v extends p{constructor(){super(...arguments),this.sessions=[],this._authObserver=new O(this,"games:auth")}render(){const{sessions:s}=this;function e(i){return a`
                <session-tile
                    session-link=${i.link}
                    img-src=${i.imgSrc}
                    game=${i.game}
                    date=${i.date}>
                    ${i.sym?a`
                        <svg class="icon trophy" slot="icon">
                            <use href="/icons/menu.svg#icon-crown"/>
                        </svg>
                    `:""}
                </session-tile>`}return a`
            <div class="grid">
                ${s.map(e)}
            </div>
        `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(s=>{this._user=s.user,this.src&&this.hydrate(this.src)})}get authorization(){return this._user&&this._user.authenticated?(console.log("authenticated"),{Authorization:`Bearer ${this._user.token}`}):(console.log("failed authentication"),{})}hydrate(s){fetch(s,{headers:this.authorization}).then(e=>{if(e.status!==200)throw`Status: ${e.status}`;return e.json()}).then(e=>{console.log(e);const i=e;this.sessions=i}).catch(e=>console.log(`Failed to render data ${s}:`,e))}};v.uses=b({"session-tile":d}),v.styles=[m.styles,x.styles,u`
            .grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                overflow-y: scroll;
            }
        `];let l=v;_([g()],l.prototype,"src");_([k()],l.prototype,"sessions");var B=Object.defineProperty,I=(o,s,e,i)=>{for(var t=void 0,r=o.length-1,n;r>=0;r--)(n=o[r])&&(t=n(s,e,t)||t);return t&&B(s,e,t),t};const f=class f extends p{constructor(){super(...arguments),this.loggedIn=!1,this._authObserver=new O(this,"games:auth")}render(){return a`
            <div class="navbar">
                <h1>
                    ${this.userid}
                     
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
        `}connectedCallback(){super.connectedCallback(),this._authObserver.observe(s=>{const{user:e}=s;e&&e.authenticated?(this.loggedIn=!0,this.userid=e.username):(this.loggedIn=!1,this.userid=void 0)})}renderSignOutButton(){return a`
            <button
                @click=${s=>{C.relay(s,"auth:message",["auth/signout"])}}
            >
                Sign Out
            </button>
        `}renderSignInButton(){return a`
            <a href="/login.html">
                Sign In
            </a>
        `}};f.uses=b({"dark-mode-toggle":c}),f.styles=[m.styles,x.styles,u`
            .navbar {
                background: var(--color-background-card);
                display: flex;
                justify-content: space-between;
                padding: 15px;
                width: 100 %;
                box-sizing: border-box;
                flex-basis: auto;
            }
        `];let h=f;I([k()],h.prototype,"loggedIn");I([k()],h.prototype,"userid");b({"dark-mode-toggle":c,"session-grid":l,"page-header":h,"mu-auth":z.Provider});c.initializeOnce();
