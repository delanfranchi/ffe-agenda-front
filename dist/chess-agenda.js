import { unsafeCSS as E, css as w, html as a, LitElement as y, nothing as s, svg as P } from "lit";
import { property as d, state as c, customElement as x, query as O } from "lit/decorators.js";
import { repeat as j } from "lit/directives/repeat.js";
import { unsafeHTML as T } from "lit/directives/unsafe-html.js";
const F = '*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:currentColor}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}:host{line-height:1.2;font-family:var(--ffe-font-family-base),sans-serif}.container{width:100%}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.btn{display:flex;min-height:2em;align-items:center;gap:.5rem;border-radius:.375rem;border-width:2px;border-color:currentColor;background-color:transparent;padding:.25rem .5rem;font-size:.875rem;line-height:1.25rem;font-weight:600;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.1s}.btn[data-active]{border-color:var(--ffe-neutral-content);background-color:var(--ffe-neutral-content);color:var(--ffe-neutral-bg)}.btn-primary{border-color:var(--ffe-primary);background-color:var(--ffe-primary);color:var(--ffe-primary-content)}.visible{visibility:visible}.static{position:static}.absolute{position:absolute}.relative{position:relative}.right-3{right:.75rem}.top-3{top:.75rem}.z-10{z-index:10}.mb-1{margin-bottom:.25rem}.mb-3{margin-bottom:.75rem}.mb-6{margin-bottom:1.5rem}.ml-auto{margin-left:auto}.mt-1{margin-top:.25rem}.block{display:block}.inline{display:inline}.flex{display:flex}.grid{display:grid}.hidden{display:none}.min-h-\\[2em\\]{min-height:2em}.w-14{width:3.5rem}.w-\\[8ch\\]{width:8ch}.w-full{width:100%}.min-w-\\[120px\\]{min-width:120px}.flex-1{flex:1 1 0%}.shrink-0{flex-shrink:0}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-between{justify-content:space-between}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.text-pretty{text-wrap:pretty}.rounded-md{border-radius:.375rem}.border{border-width:1px}.border-2{border-width:2px}.border-b{border-bottom-width:1px}.border-b-2{border-bottom-width:2px}.border-dashed{border-style:dashed}.border-none{border-style:none}.border-current{border-color:currentColor}.bg-neutral-content{background-color:var(--ffe-neutral-content)}.bg-primary{background-color:var(--ffe-primary)}.bg-transparent{background-color:transparent}.p-1{padding:.25rem}.p-2{padding:.5rem}.p-5{padding:1.25rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-4{padding-top:1rem;padding-bottom:1rem}.pr-6{padding-right:1.5rem}.pt-1{padding-top:.25rem}.text-center{text-align:center}.text-right{text-align:right}.font-headings{font-family:var(--ffe-headings-font-family)}.text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl\\/none{font-size:1.875rem;line-height:1}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-lg\\/none{font-size:1.125rem;line-height:1}.text-lg\\/tight{font-size:1.125rem;line-height:1.25}.text-sm{font-size:.875rem;line-height:1.25rem}.text-sm\\/none{font-size:.875rem;line-height:1}.text-sm\\/tight{font-size:.875rem;line-height:1.25}.text-xs{font-size:.75rem;line-height:1rem}.font-bold{font-weight:700}.font-medium{font-weight:500}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.text-neutral-bg{color:var(--ffe-neutral-bg)}.text-neutral-content{color:var(--ffe-neutral-content)}.text-primary{color:var(--ffe-primary)}.text-primary-content{color:var(--ffe-primary-content)}.opacity-50{opacity:.5}.blur{--tw-blur: blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-filter{-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-100{transition-duration:.1s}.hover\\:bg-\\[rgba\\(0\\,0\\,0\\,0\\.05\\)\\]:hover{background-color:#0000000d}.hover\\:bg-primary:hover{background-color:var(--ffe-primary)}.hover\\:text-primary-content:hover{color:var(--ffe-primary-content)}@media (min-width: 640px){.sm\\:min-w-0{min-width:0px}.sm\\:font-semibold{font-weight:600}}@media (min-width: 1024px){.lg\\:block{display:block}.lg\\:hidden{display:none}.lg\\:p-6{padding:1.5rem}}', k = w`
  ${E(F)}
`, z = "https://ffe-agenda-back.vercel.app", L = (t) => new Date(t).toLocaleDateString("fr-FR", {
  day: "2-digit"
}), A = (t) => new Date(t).toLocaleDateString("fr-FR", {
  month: "short"
}), I = (t) => new Date(t).toLocaleDateString("fr-FR", {
  year: "numeric"
}), S = (t) => {
  const r = L(t.date), i = A(t.date), n = I(t.date);
  return a`
    <div class="flex flex-col items-center uppercase w-14 ">
      <div class="text-3xl/none font-bold">${r}</div>
      <div class="text-lg/none">${i}</div>
      <div class="text-sm/none mt-1">${n}</div>
    </div>
  `;
}, U = (t, r) => t.filter(
  (i) => i.club?.toLowerCase().includes(r.toLowerCase())
), M = (t, r) => t.filter(
  (i) => i.club?.toLowerCase().includes(r.toLowerCase())
)?.length;
var R = Object.defineProperty, B = Object.getOwnPropertyDescriptor, g = (t, r, i, n) => {
  for (var e = n > 1 ? void 0 : n ? B(r, i) : r, o = t.length - 1, l; o >= 0; o--)
    (l = t[o]) && (e = (n ? l(r, i, e) : l(e)) || e);
  return n && e && R(r, i, e), e;
};
let u = class extends y {
  constructor() {
    super(...arguments), this.club = "", this.players = [], this.loading = !1, this.loaded = !1, this.showOnlyClub = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.tournament && !this.loaded && !this.loading && this.loadTournamentDetails();
  }
  updated(t) {
    super.updated(t), t.has("tournament") && this.tournament && !this.loaded && !this.loading && this.loadTournamentDetails();
  }
  async loadTournamentDetails() {
    if (!(this.loaded || this.loading)) {
      this.loading = !0;
      try {
        const t = z, i = `${t.endsWith("/") ? t.slice(0, -1) : t}/api/tournaments/${this.tournament.id}/players`, n = await fetch(i, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          signal: AbortSignal.timeout(1e4)
          // 10 second timeout
        });
        if (!n.ok) {
          const o = await n.text();
          throw console.error("Response error text:", o), new Error(
            `HTTP error! status: ${n.status}, message: ${o}`
          );
        }
        const e = await n.json();
        e.success && e.data ? (this.players = e.data, this.loaded = !0) : (console.warn("Response format unexpected:", e), Array.isArray(e) && (this.players = e, this.loaded = !0));
      } catch (t) {
        console.error("Error loading tournament details:", t), this.players = [], this.loaded = !0;
      } finally {
        this.loading = !1;
      }
    }
  }
  formatDate(t) {
    return new Date(t).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long"
    });
  }
  render() {
    if (!this.tournament) return s;
    const t = M(this.players, this.club);
    return a`
      <div class="flex items-center gap-2">
        <div class="shrink-0">${S(this.tournament)}</div>
        <div class="flex items-start justify-between pt-1">
          <div class="flex-1">
            <div class="text-sm/tight ">
              ${this.tournament.location} • ${this.tournament.department}
            </div>
            <div class="text-lg/tight mb-1 font-bold font-headings">
              ${this.tournament.name}
            </div>
          </div>
        </div>
      </div>
      <div class="mb-6">
      
          ${this.tournament.endDate ? a`
                  <span
                    class="font-medium text-neutral-content min-w-[120px] sm:min-w-0 sm:font-semibold"
                    >Date de fin :</span
                  >
                  <span class="text-neutral-content"
                    >${this.formatDate(this.tournament.endDate)}</span
                  >
                ` : s}
          ${this.tournament.maxPlayers ? a`
                  <span
                    class="font-medium text-neutral-content min-w-[120px] sm:min-w-0 sm:font-semibold"
                    >Places max :</span
                  >
                  <span class="text-neutral-content"
                    >${this.tournament.maxPlayers}</span
                  >
                ` : s}
          ${this.tournament.currentPlayers ? a`
                  <span
                    class="font-medium text-neutral-content min-w-[120px] sm:min-w-0 sm:font-semibold"
                    >Participants actuels :</span
                  >
                  <span class="text-neutral-content"
                    >${this.tournament.currentPlayers}</span
                  >
                ` : s}
          ${this.tournament.registrationDeadline ? a`
                  <span
                    class="font-medium text-neutral-content min-w-[120px] sm:min-w-0 sm:font-semibold"
                    >Date limite d'inscription :</span
                  >
                  <span class="text-neutral-content"
                    >${this.formatDate(
      this.tournament.registrationDeadline
    )}</span
                  >
                ` : s}
          ${this.tournament.address ? a`
                  <span
                    class="font-medium text-neutral-content min-w-[120px] sm:min-w-0 sm:font-semibold"
                    >Adresse :</span
                  >
                  <span class="text-neutral-content"
                    >${this.tournament.address}</span
                  >
                ` : s}
          ${this.tournament.rounds ? a`
                  <span
                    class="font-medium text-neutral-content min-w-[120px] sm:min-w-0 sm:font-semibold"
                    >Nombre de rondes :</span
                  >
                  <span class="text-neutral-content"
                    >${this.tournament.rounds}</span
                  >
                ` : s}
          ${this.tournament.timeControl ? a`
                  <span
                    class="font-medium text-neutral-content min-w-[120px] sm:min-w-0 sm:font-semibold"
                    >Cadence :</span
                  >
                  <span class="text-neutral-content"
                    >${this.tournament.timeControl}</span
                  >
                ` : s}
          ${this.tournament.pairingSystem ? a`
                  <span
                    class="font-medium text-neutral-content min-w-[120px] sm:min-w-0 sm:font-semibold"
                    >Système d'appariement :</span
                  >
                  <span class="text-neutral-content"
                    >${this.tournament.pairingSystem}</span
                  >
                ` : s}
          ${this.tournament.seniorFee ? a`
                  <span
                    class="font-medium text-neutral-content min-w-[120px] sm:min-w-0 sm:font-semibold"
                    >Frais senior :</span
                  >
                  <span class="text-neutral-content"
                    >${this.tournament.seniorFee}</span
                  >
                ` : s}
          ${this.tournament.juniorFee ? a`
                  <span
                    class="font-medium text-neutral-content min-w-[120px] sm:min-w-0 sm:font-semibold"
                    >Frais junior :</span
                  >
                  <span class="text-neutral-content"
                    >${this.tournament.juniorFee}</span
                  >
                ` : s}
          ${this.tournament.organizer ? a`
                  <span
                    class="font-medium text-neutral-content min-w-[120px] sm:min-w-0 sm:font-semibold"
                    >Organisateur :</span
                  >
                  <span class="text-neutral-content"
                    >${this.tournament.organizer}</span
                  >
                ` : s}
          ${this.tournament.referee ? a`
                  <span
                    class="font-medium text-neutral-content min-w-[120px] sm:min-w-0 sm:font-semibold"
                    >Arbitre :</span
                  >
                  <span class="text-neutral-content"
                    >${this.tournament.referee}</span
                  >
                ` : s}
          ${this.tournament.contact ? a`
                  <span
                    class="font-medium text-neutral-content min-w-[120px] sm:min-w-0 sm:font-semibold"
                    >Contact :</span
                  >
                  <span class="text-neutral-content"
                    >${this.tournament.contact}</span
                  >
                ` : s}
          ${this.tournament.firstPrize ? a`
                  <span
                    class="font-medium text-neutral-content min-w-[120px] sm:min-w-0 sm:font-semibold"
                    >Prix :</span
                  >
                  <span class="text-neutral-content"
                    >${this.tournament.firstPrize}</span
                  >
                ` : s}
          ${this.tournament.eloRapid ? a`
                  <span
                    class="font-medium text-neutral-content min-w-[120px] sm:min-w-0 sm:font-semibold"
                    >Elo Rapide :</span
                  >
                  <span class="text-neutral-content"
                    >${this.tournament.eloRapid}</span
                  >
                ` : s}
          ${this.tournament.eloFide ? a`
                  <span
                    class="font-medium text-neutral-content min-w-[120px] sm:min-w-0 sm:font-semibold"
                    >Elo FIDE :</span
                  >
                  <span class="text-neutral-content"
                    >${this.tournament.eloFide}</span
                  >
                ` : s}
        </div>
      </div>

      <div class="mb-6">
        <div
          class="flex justify-between items-center mb-3 "
        >
          <div class="flex gap-2">
            <button
              data-active=${!this.showOnlyClub || s}
              class="btn"
              @click=${() => this.showOnlyClub = !1}
            >
              Tous les participants (${this.players.length})
            </button>
            ${this.club && t ? a`
                    <button
                      data-active=${this.showOnlyClub || s}
                      class="btn"
                      @click=${() => this.showOnlyClub = !0}
                    >
                      Club seulement (${t})
                    </button>
                  ` : s}
          </div>
        </div>
        <ffe-player-list
          .players=${this.players}
          .club=${this.club}
          .showOnlyClub=${this.showOnlyClub}
        ></ffe-player-list>
      </div>
    `;
  }
};
u.styles = [
  k,
  w`
      :host {
        display: block;
      }
    `
];
g([
  d({ type: Object })
], u.prototype, "tournament", 2);
g([
  d({ type: String })
], u.prototype, "club", 2);
g([
  c()
], u.prototype, "players", 2);
g([
  c()
], u.prototype, "loading", 2);
g([
  c()
], u.prototype, "loaded", 2);
g([
  c()
], u.prototype, "showOnlyClub", 2);
u = g([
  x("ffe-agenda-info")
], u);
var W = Object.defineProperty, H = Object.getOwnPropertyDescriptor, C = (t, r, i, n) => {
  for (var e = n > 1 ? void 0 : n ? H(r, i) : r, o = t.length - 1, l; o >= 0; o--)
    (l = t[o]) && (e = (n ? l(r, i, e) : l(e)) || e);
  return n && e && W(r, i, e), e;
};
let v = class extends y {
  constructor() {
    super(...arguments), this.open = !1, this.title = "", this.closeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.body.removeAttribute("inert");
  }
  show() {
    this.dialogElement && (document.body.setAttribute("inert", ""), this.dialogElement.showModal(), this.open = !0);
  }
  hide() {
    this.dialogElement && (document.body.removeAttribute("inert"), this.dialogElement.close(), this.open = !1);
  }
  handleClose() {
    this.hide();
  }
  handleBackdropClick(t) {
    t.target === this.dialogElement && this.hide();
  }
  render() {
    return a`
      <dialog
        id="dialog"
        @click=${this.handleBackdropClick}
        @close=${this.handleClose}
        class="relative p-5 lg:p-6"
      >
        ${this.title ? a`<div
              class="text-2xl font-bold font-headings mb-3 text-pretty pr-6"
            >
              ${this.title}
            </div>` : s}
        <button
          class=" absolute top-3 right-3 z-10 bg-transparent border-none text-2xl text-neutral-content cursor-pointer p-1 rounded-md transition-all hover:bg-primary hover:text-primary-content"
          @click=${this.handleClose}
          aria-label="Fermer"
        >
          ${T(this.closeSvg)}
        </button>
        <slot></slot>
      </dialog>
    `;
  }
};
v.styles = [
  k,
  w`
      :host {
        display: block;
      }

      dialog {
        background: var(--ffe-neutral-bg, #fff);
        border: none;
        border-radius: 0.75rem;
        padding: 0;
        max-width: 95vw;
        max-height: 95vh;
        width: 44rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      }
      dialog::-webkit-scrollbar {
        border-radius: 5px;
        width: 3px;
        background: transparent;
      }
      dialog::-webkit-scrollbar-thumb {
        background: var(--ffe-neutral-content, #000);
        border-radius: 5px;
      }

      dialog::backdrop {
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(4px);
      }

      @media (max-width: 640px) {
        dialog {
          max-width: 95vw;
          margin: 1rem;
        }
      }
    `
];
C([
  d({ type: Boolean, reflect: !0 })
], v.prototype, "open", 2);
C([
  d({ type: String })
], v.prototype, "title", 2);
C([
  O("#dialog")
], v.prototype, "dialogElement", 2);
v = C([
  x("ffe-dialog")
], v);
const N = {
  user: P`
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
    `,
  info: P`
           <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
    `,
  close: P`
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    `
}, _ = (t, r = "1.25em") => a`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${r}"
      height="${r}"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-${t}"
    >
      ${N[t]}
    </svg>
  `;
var q = Object.defineProperty, Y = Object.getOwnPropertyDescriptor, $ = (t, r, i, n) => {
  for (var e = n > 1 ? void 0 : n ? Y(r, i) : r, o = t.length - 1, l; o >= 0; o--)
    (l = t[o]) && (e = (n ? l(r, i, e) : l(e)) || e);
  return n && e && q(r, i, e), e;
};
let b = class extends y {
  constructor() {
    super(...arguments), this.club = "", this.showOnlyClub = !1, this.players = [], this.renderPlayers = [];
  }
  get clubPlayers() {
    return this.club ? this.players.filter(
      (t) => t.club.toLowerCase().includes(this.club.toLowerCase())
    ) : this.players;
  }
  willUpdate(t) {
    this.renderPlayers = this.showOnlyClub ? this.clubPlayers : this.players;
  }
  render() {
    return this.renderPlayers.length === 0 ? a`
        <div class="text-center py-4 text-lg opacity-50">
          Aucun participant pour l'instant
        </div>
      ` : a`
      <div>
        ${j(
      this.renderPlayers,
      (t) => t.id,
      (t, r) => {
        const i = t.club.toLowerCase().includes(this.club.toLowerCase()), n = r === this.renderPlayers.length - 1;
        return a`
              <div
                class="flex items-center  rounded-md p-2  w-full gap-3 hover:bg-[rgba(0,0,0,0.05)] transition-all duration-100"
              >
                <div>
                  <div class="font-medium">${t.name}</div>
                </div>

                <div class="ml-auto flex items-center gap-2 ">
                  ${this.showOnlyClub ? s : a`<div
                        class="text-xs ${i ? "text-primary font-semibold " : ""}"
                      >
                        ${t.club}
                      </div>`}
                  <div class="w-[8ch] text-right">${t.elo}</div>
                </div>
              </div>
              ${n ? s : a`<div
                    class="border-b border-current border-dashed"
                  ></div>`}
            `;
      }
    )}
      </div>
    `;
  }
};
b.styles = [
  k,
  w`
      :host {
        display: block;
      }
    `
];
$([
  d({ type: String })
], b.prototype, "club", 2);
$([
  d({ type: Boolean })
], b.prototype, "showOnlyClub", 2);
$([
  d({ type: Array })
], b.prototype, "players", 2);
$([
  c()
], b.prototype, "renderPlayers", 2);
b = $([
  x("ffe-player-list")
], b);
var G = Object.defineProperty, X = Object.getOwnPropertyDescriptor, m = (t, r, i, n) => {
  for (var e = n > 1 ? void 0 : n ? X(r, i) : r, o = t.length - 1, l; o >= 0; o--)
    (l = t[o]) && (e = (n ? l(r, i, e) : l(e)) || e);
  return n && e && G(r, i, e), e;
};
let p = class extends y {
  constructor() {
    super(...arguments), this.club = "", this.players = [], this.clubParticipants = [], this.loading = !1, this.loaded = !1, this.svgInfo = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="m9,12 3,3 3,-3"></path>
    </svg>
  `;
  }
  connectedCallback() {
    super.connectedCallback(), this.setupIntersectionObserver();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.observer && this.observer.disconnect();
  }
  setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (t) => {
        t.forEach((r) => {
          r.isIntersecting && !this.loaded && !this.loading && this.loadTournamentDetails();
        });
      },
      {
        rootMargin: "200px"
        // Commencer à charger 50px avant que l'élément soit visible
      }
    ), this.observer.observe(this);
  }
  async loadTournamentDetails() {
    if (!(this.loaded || this.loading)) {
      this.loading = !0;
      try {
        const t = z, r = t.endsWith("/") ? t.slice(0, -1) : t, i = await fetch(
          `${r}/api/tournaments/${this.tournament.id}/players`
        );
        if (!i.ok)
          throw new Error(`HTTP error! status: ${i.status}`);
        const n = await i.json();
        n.success && n.data && (this.players = n.data, this.extractParticipants(), this.loaded = !0);
      } catch (t) {
        console.error("Error loading tournament details:", t);
      } finally {
        this.loading = !1;
      }
    }
  }
  extractParticipants() {
    if (!this.club) {
      this.clubParticipants = [];
      return;
    }
    this.clubParticipants = U(this.players, this.club);
  }
  showInfoDialog() {
    const t = this.infoDialog;
    t && t.show && t.show();
  }
  showParticipantsDialog() {
    const t = this.participantsDialog;
    t && t.show && t.show();
  }
  render() {
    const t = this.clubParticipants.length, r = t > 1 ? `${t} participant·e·s du club` : `${t} participant·e du club`;
    return a`
      <div class="py-4 flex gap-3">
        <div class="shrink-0">${S(this.tournament)}</div>
        <div>
          <div class="flex items-start justify-between pt-1">
            <div class="flex-1">
              <div class="text-sm/tight ">
                ${this.tournament.location} • ${this.tournament.department}
              </div>
              <div class="text-lg/tight mb-1 font-bold font-headings">
                ${this.tournament.name}
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button @click=${this.showInfoDialog} class="btn">
              ${_("info")} <span class="hidden lg:block">Infos</span>
            </button>

            ${this.clubParticipants.length > 0 ? a`<button
                  id="participantsButton"
                  @click=${this.showParticipantsDialog}
                  class="btn btn-primary"
                >
                  ${_("user")}
                  <span class="hidden lg:block">${r}</span>
                  <span class="block lg:hidden"
                    >${t} du club</span
                  >
                </button> ` : s}
          </div>
        </div>

        <ffe-dialog id="infoDialog">
          <ffe-agenda-info
            .tournament=${this.tournament}
            .club=${this.club}
          ></ffe-agenda-info>
        </ffe-dialog>

        <ffe-dialog id="participantsDialog" title="${r}">
          ${this.clubParticipants.length > 0 ? a`<ffe-player-list
                .club=${this.club}
                .players=${this.clubParticipants}
                .showOnlyClub=${!0}
              ></ffe-player-list>` : s}
        </ffe-dialog>
      </div>
    `;
  }
};
p.styles = [
  k,
  w`
      :host {
        display: block;
      }
    `
];
m([
  d({ type: Object })
], p.prototype, "tournament", 2);
m([
  d({ type: String })
], p.prototype, "club", 2);
m([
  c()
], p.prototype, "players", 2);
m([
  c()
], p.prototype, "clubParticipants", 2);
m([
  c()
], p.prototype, "loading", 2);
m([
  c()
], p.prototype, "loaded", 2);
m([
  O("#infoDialog")
], p.prototype, "infoDialog", 2);
m([
  O("#participantsDialog")
], p.prototype, "participantsDialog", 2);
p = m([
  x("ffe-agenda-item")
], p);
var J = Object.getOwnPropertyDescriptor, K = (t, r, i, n) => {
  for (var e = n > 1 ? void 0 : n ? J(r, i) : r, o = t.length - 1, l; o >= 0; o--)
    (l = t[o]) && (e = l(e) || e);
  return e;
};
let D = class extends y {
  render() {
    return a`
      <div id="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  }
};
D.styles = w`
    #loader,
    .lds-ellipsis div {
      box-sizing: border-box;
    }
    #loader {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    #loader div {
      position: absolute;
      top: 33.33333px;
      width: 13.33333px;
      height: 13.33333px;
      border-radius: 50%;
      background: currentColor;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    #loader div:nth-child(1) {
      left: 8px;
      animation: lds-ellipsis1 0.6s infinite;
    }
    #loader div:nth-child(2) {
      left: 8px;
      animation: lds-ellipsis2 0.6s infinite;
    }
    #loader div:nth-child(3) {
      left: 32px;
      animation: lds-ellipsis2 0.6s infinite;
    }
    #loader div:nth-child(4) {
      left: 56px;
      animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes lds-ellipsis3 {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0);
      }
    }
    @keyframes lds-ellipsis2 {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(24px, 0);
      }
    }
  `;
D = K([
  x("ffe-agenda-loader")
], D);
var Q = Object.defineProperty, V = Object.getOwnPropertyDescriptor, f = (t, r, i, n) => {
  for (var e = n > 1 ? void 0 : n ? V(r, i) : r, o = t.length - 1, l; o >= 0; o--)
    (l = t[o]) && (e = (n ? l(r, i, e) : l(e)) || e);
  return n && e && Q(r, i, e), e;
};
let h = class extends y {
  constructor() {
    super(...arguments), this.departements = [], this.club = "", this.limit = 20, this.showOnlyClub = !1, this.tournaments = [], this.loading = !1, this.error = null;
  }
  connectedCallback() {
    super.connectedCallback(), this.loadTournaments();
  }
  async loadTournaments() {
    if (!(!this.departements || this.departements.length === 0)) {
      this.loading = !0, this.error = null;
      try {
        const t = new URLSearchParams({
          limit: this.limit.toString(),
          showOnlyClub: this.showOnlyClub.toString(),
          next: "true"
        });
        this.departements.forEach((o) => {
          t.append("department[]", o.toString());
        }), this.club && t.set("club", this.club);
        const r = z, i = r.endsWith("/") ? r.slice(0, -1) : r, n = await fetch(
          `${i}/api/tournaments?${t}`
        );
        if (!n.ok)
          throw new Error(`HTTP error! status: ${n.status}`);
        const e = await n.json();
        if (e.success && e.data)
          this.tournaments = e.data.tournaments;
        else
          throw new Error(e.error || "Unknown error");
      } catch (t) {
        this.error = t instanceof Error ? t.message : "Unknown error";
      } finally {
        this.loading = !1;
      }
    }
  }
  render() {
    return this.loading ? a` <ffe-agenda-loader></ffe-agenda-loader> ` : this.error ? a`
        <div>
          <div class="p-2">Erreur: ${this.error}</div>
        </div>
      ` : this.tournaments.length === 0 ? a`
        <div>
          <div class="text-center p-2">Aucun tournoi trouvé</div>
        </div>
      ` : a`
      <div>
        ${j(
      this.tournaments,
      (t) => t.id,
      (t) => a`
            <ffe-agenda-item
              .tournament=${t}
              .club=${this.club}
              class="block border-b-2 border-current"
            >
            </ffe-agenda-item>
          `
    )}
      </div>
    `;
  }
};
h.styles = [
  k,
  w`
      :host {
        display: block;
      }
    `
];
f([
  d({ type: Array })
], h.prototype, "departements", 2);
f([
  d({ type: String })
], h.prototype, "club", 2);
f([
  d({ type: Number })
], h.prototype, "limit", 2);
f([
  d({ type: Boolean })
], h.prototype, "showOnlyClub", 2);
f([
  c()
], h.prototype, "tournaments", 2);
f([
  c()
], h.prototype, "loading", 2);
f([
  c()
], h.prototype, "error", 2);
h = f([
  x("ffe-agenda-widget")
], h);
