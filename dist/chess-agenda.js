import { unsafeCSS as Is, css as B, noChange as Tt, html as V, LitElement as Pe, nothing as Te } from "lit";
import { property as k, state as q, customElement as xe, queryAssignedElements as ct } from "lit/decorators.js";
import { repeat as Ms } from "lit/directives/repeat.js";
import { styleMap as Vs } from "lit/directives/style-map.js";
import { AsyncDirective as Rt } from "lit/async-directive.js";
import { directive as Ut } from "lit/directive.js";
import { unsafeHTML as zs } from "lit/directives/unsafe-html.js";
import { ifDefined as re } from "lit/directives/if-defined.js";
const Ns = '/*! tailwindcss v4.1.13 | MIT License | https://tailwindcss.com */@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-border-style:solid;--tw-outline-style:solid}}}.visible{visibility:visible}.static{position:static}.inline{display:inline}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-l{border-left-style:var(--tw-border-style);border-left-width:1px}.border-current{border-color:currentColor}.text-center{text-align:center}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.last\\:border-b-0:last-child{border-bottom-style:var(--tw-border-style);border-bottom-width:0}@layer base{:host{line-height:1.2;font-family:var(--sc-font-family-base),sans-serif}}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}', It = B`
  ${Is(Ns)}
`;
var R;
let ae = (R = class {
  static listen() {
    if (!R.listening)
      return;
    const e = document.location?.href.replace(
      document.location.origin,
      ""
    );
    R.prevURL && R.prevURL != e && (R.prevURL = e, R.listeners.forEach((t) => {
      t.location = e;
    })), window.requestAnimationFrame(R.listen);
  }
  /**
   * Arrête l'écoute des changements de location pour le listener fournit
   */
  static offChange(e) {
    const t = R.listeners.indexOf(e);
    t != -1 && (R.listeners.splice(t, 1), R.listeners.length == 0 && (R.listening = !1));
  }
  /**
   * Ecoute les changements de location et l'assigne à la propriété location de chaque listener
   */
  static onChange(e) {
    R.listening || (R.listening = !0, R.listen()), R.listeners.push(e), e.location = this.prevURL;
  }
  /**
   *
   * @param component HTMLElement
   * Recupère la proprité to ou href de l'élément et lance la navigation
   * Si l'attribut pushState est présent la naviguation se fait via un pushState
   * Si l'attribut replaceState est présent la naviguation se fait via un replaceState
   * Voir link et button pour les exemples d'implémentation
   **/
  static changeFromComponent(e) {
    const t = e.goBack, s = document.referrer;
    if (t != null) {
      const b = document.location.origin, f = (t || b).toString(), p = s.indexOf("http") == 0 ? new URL(s).origin != b : !1, d = s == "", w = history.length < 3, g = d && w, A = f != document.location.href;
      if (p && A || g) {
        const o = history.state || {};
        o.concorde = o.concorde || {}, o.concorde.hasDoneHistoryBack = !0, history.pushState(o, document.title), history.back(), document.location.replace(f);
      } else
        history.back();
      return;
    }
    let r = e.getAttribute("to") || "";
    if (r || (r = e.href?.toString() || ""), !r) return;
    if (r.indexOf("#") == 0) {
      document.location.hash = r.substring(1);
      return;
    }
    const n = new URL(r, document.location.href), l = n.pathname.split("/"), c = [];
    let v = "";
    for (const b of l)
      b != v && c.push(b), v = b;
    r = "/" + c.join("/") + n.search + (n.hash ? +n.hash : ""), e.hasAttribute("pushState") ? history.pushState(null, "", r) : e.hasAttribute("replaceState") ? history.replaceState(null, "", r) : document.location.href = r;
  }
  /**
   *
   * @param component ActivableLink
   * Ajoute l'attribut "active" à l'élément si l'url correspond à la location en donction du mode d'activation
   */
  static updateComponentActiveState(e) {
    if (e.autoActive == "disabled")
      return;
    const t = e.href?.toString() || "";
    if (e.href && t.indexOf("http") != 0) {
      const s = new URL(t, document.location.href), r = new URL(e.location || "", document.location.origin);
      let n = !1;
      e.autoActive == "strict" ? n = s.pathname == r.pathname && s.hash == r.hash && s.search == r.search : e.autoActive == "strict-path-only" ? n = s.pathname == r.pathname && s.hash == r.hash : n = r.href.indexOf(s.href) == 0, n ? e.setAttribute("active", "true") : e.removeAttribute("active");
    }
  }
}, R.listeners = [], R.listening = !1, R.prevURL = document.location?.href.replace(
  document.location.origin,
  ""
), R), N = class X {
  /**
   * retourne la langue de la page courante telle que défini via l'attribut lang de la balise html
   */
  static getLanguage() {
    const e = document.documentElement.lang;
    return localStorage.getItem("SonicSelectedLanguage") || e;
  }
  static getCookies() {
    return document.cookie.split(";").reduce((e, t) => {
      const s = t.indexOf("=");
      return e[t.substring(0, s).trim()] = t.substring(
        s + 1
      ), e;
    }, {});
  }
  static everyAncestors(e, t) {
    for (; e; ) {
      if (!t(e)) return;
      e = e.parentNode || e.host;
    }
  }
  static getScrollableAncestor(e) {
    for (; e; ) {
      const t = e;
      if (t.nodeType === 1) {
        const s = window.getComputedStyle(t);
        if (s?.overflowY === "auto" || s?.overflowY === "scroll" || s?.overflowY === "hidden" || s?.overflowX === "auto" || s?.overflowX === "scroll" || s?.overflowX === "hidden")
          return e;
      }
      e = e.parentNode || e.host;
    }
    return null;
  }
  /**
   * Va de parent en parent en partant de node pour trouver un attribut
   * @param attributeName nom de l'attribut
   * @returns valeur de l'attribut ou null si l'attribut n'est pas trouvé
   */
  static getAncestorAttributeValue(e, t) {
    if (!e) return null;
    for (; !("hasAttribute" in e && e.hasAttribute(t)) && (e.parentNode || e.host); )
      e = e.parentNode || e.host;
    return "hasAttribute" in e ? e.getAttribute(t) : null;
  }
  /**
   * Petite fonction utilitaire pour retourner la configuration a passer à l'utilitaire API
   * Utilisée pour la configuration du wording / de la traduction ainsi que par le mixin fetcher par exemple
   */
  static getApiConfiguration(e) {
    const t = X.getAncestorAttributeValue(e, "token"), s = X.getAncestorAttributeValue(e, "addHTTPResponse") != null, r = X.getAncestorAttributeValue(e, "serviceURL");
    let n = null, l = null;
    const c = X.getAncestorAttributeValue(e, "tokenProvider"), v = X.getAncestorAttributeValue(e, "eventsApiToken");
    t || (n = X.getAncestorAttributeValue(e, "userName"), l = X.getAncestorAttributeValue(e, "password"));
    const b = X.getAncestorAttributeValue(
      e,
      "credentials"
    ) || void 0, f = e.getAttribute("cache"), a = e.hasAttribute("blockUntilDone");
    return {
      serviceURL: r,
      token: t,
      userName: n,
      password: l,
      authToken: v,
      tokenProvider: c,
      addHTTPResponse: s,
      credentials: b,
      cache: f,
      blockUntilDone: a
    };
  }
  /**
   * Va de parent en parent en partant de node pour trouver un attribut
   * @param attributeName nom de l'attribut
   * @returns valeur de l'attribut ou null si l'attribut n'est pas trouvé
   */
  static getClosestElement(e, t) {
    for (; !(e.nodeName && e.nodeName.toLowerCase() === t) && (e.parentNode || e.host); )
      e = e.parentNode || e.host;
    return e.nodeName ? e : null;
  }
  /**
   * Va de parent en parent en partant de node pour trouver un attribut
   * @param attributeName nom de l'attribut
   * @returns valeur de l'attribut ou null si l'attribut n'est pas trouvé
   */
  static getClosestForm(e) {
    return X.getClosestElement(e, "form");
  }
  /**
   * Lance le chargement d'un js et retourne une promise qui resoud à true lorsque le chargement à réussi et à false, sinon.
   * */
  static async loadJS(e) {
    return new Promise(async (s) => {
      const r = document.createElement("script");
      r.src = e, r.onload = () => s(!0), r.onerror = () => s(!0), document.head.appendChild(r);
    });
  }
  /**
   * Lance le chargement d'un css et retourne une promise qui resoud à true lorsque le chargement à réussi et à false, sinon.
   * */
  static async loadCSS(e) {
    return new Promise(async (s) => {
      const r = document.createElement("link");
      r.type = "text/css", r.rel = "stylesheet", r.href = e, r.onload = () => s(!0), r.onerror = () => s(!0), document.head.appendChild(r);
    });
  }
};
const Bs = (i) => {
  const e = document.documentElement, t = new MutationObserver((r) => {
    for (let n of r)
      n.type === "attributes" && n.attributeName === "lang" && i();
  }), s = {
    attributes: !0,
    // Watch for attribute changes
    attributeFilter: ["lang"]
    // Only watch for changes to the lang attribute
  };
  t.observe(e, s);
};
let qs = class {
  static async queueTaskPromise() {
    return new Promise((e) => {
      window.queueMicrotask(() => e(null));
    });
  }
  static async delayPromise(e) {
    return new Promise((t) => {
      setTimeout(t, e);
    });
  }
}, Mt = "sonic";
typeof __SONIC_PREFIX__ < "u" && (Mt = __SONIC_PREFIX__);
let ht = Mt.replace(
  /-([a-z])/g,
  (i) => i[1].toUpperCase()
);
const ut = ht.charAt(0).toUpperCase() + ht.slice(1);
function Re(i) {
  return Object.prototype.hasOwnProperty.call(i, "__value");
}
function ke(i) {
  return typeof i == "object" && i != null;
}
let de = "sonic";
typeof __BUILD_DATE__ > "u" && (window.__BUILD_DATE__ = "No build date");
typeof __SONIC_PREFIX__ > "u" && (de = "sonic" + Math.floor(Math.random() * 1e6));
const Be = de == "sonic" ? "publisher-proxies-data" : de + "-publisher-proxies-data";
var j;
let Vt = (j = class {
  constructor(e, t, s) {
    for (this._proxies_ = /* @__PURE__ */ new Map(), this._is_savable_ = !1, this._expiration_delay_ = 1e3 * 60 * 60 * 12, this._invalidate_on_page_show_ = !1, this._invalidateListeners_ = /* @__PURE__ */ new Set(), this._formInvalidateListeners_ = /* @__PURE__ */ new Set(), this._assignListeners_ = /* @__PURE__ */ new Set(), this._mutationListeners_ = /* @__PURE__ */ new Set(), this._fillListeners_ = /* @__PURE__ */ new Set(), this._templateFillListeners_ = /* @__PURE__ */ new Set(), this._lockInternalMutationPublishing_ = !1, this._instanceCounter_ = 0, this._assignmentId_ = 0, this._value_ = e, this.parent = t || null, this._parentKey_ = s, this.root = this, this._instanceCounter_ = 0; this.root.parent; )
      this.root = this.root.parent;
  }
  /**
   * Supprime le proxy et ses sous proxy
   * Supprime les écouteurs associés
   */
  delete() {
    for (const e in this._proxies_.keys())
      e != "_parent_" && this._proxies_.get(e)?.delete();
    this._invalidateListeners_.clear(), this._formInvalidateListeners_.clear(), this._assignListeners_.clear(), this._mutationListeners_.clear(), this._fillListeners_.clear(), this._templateFillListeners_.clear(), this._proxies_.clear(), j.instances.delete(this._instanceCounter_);
  }
  /**
   * Utile pour savoir si quelque chose est en écoute d'une modification sur le proxy via une des methodes associées
   */
  hasListener() {
    return this._templateFillListeners_.size > 0 || this._assignListeners_.size > 0 || this._invalidateListeners_.size > 0 || this._formInvalidateListeners_.size > 0 || this._mutationListeners_.size > 0 || this._fillListeners_.size > 0;
  }
  _publishInternalMutation_(e = !1) {
    if (this._mutationListeners_.forEach(
      (t) => t()
    ), this._is_savable_ && !U.changed) {
      U.changed = !0, U.saveId++;
      const t = U.saveId;
      setTimeout(
        () => U.getInstance().saveToLocalStorage(t),
        1e3
      );
    }
    e || this.parent && this.parent._publishInternalMutation_();
  }
  async _publishAssignement_(e = !1) {
    if (this._assignmentId_++, this._assignmentId_ !== this._assignmentId_) return;
    const s = this.get();
    this._assignListeners_.forEach((r) => {
      r(s);
    }), this._publishInternalMutation_(e);
  }
  _publishInvalidation_() {
    this._invalidateListeners_.forEach((e) => e());
  }
  _publishFormInvalidation_() {
    this._formInvalidateListeners_.forEach(
      (e) => e()
    );
  }
  _publishDynamicFilling_(e, t) {
    this._fillListeners_.forEach((s) => {
      s[e] !== t && (s[e] = t);
    }), this._publishTemplateFilling_(e, t);
  }
  _publishTemplateFilling_(e, t) {
    this._templateFillListeners_.forEach((s) => {
      const r = Object.getOwnPropertyDescriptor(s, e);
      r && !r.set && !r.writable || (s.propertyMap && s.propertyMap[e] && (e = s.propertyMap[e]), typeof s[e] < "u" && s[e] !== t && (s[e] = t));
    });
  }
  /**
   * Appel la fonction "handler" (passée en paramettre) lorsque la valeur gérée par le proxy change par assignation
   * hanlder reçois alors la nouvelle valeur interne du proxy en paramètre
   */
  onAssign(e, t = !0) {
    typeof e == "function" && (this._assignListeners_.has(e) || (this._assignListeners_.add(e), t && e(this.get())));
  }
  /**
   * Stop les appels de la fonction "handler" (passée en paramettre) lorsque la valeur gérée par le proxy change par assignation
   */
  offAssign(e) {
    this._assignListeners_.delete(e);
  }
  /**
   * Appel la fonction "handler" (passée en paramettre) lorsque la donnée est flaggée comme invalide
   */
  onInvalidate(e) {
    typeof e == "function" && this._invalidateListeners_.add(e);
  }
  /**
   * Stop les appels de la fonction "handler" (passée en paramettre) lorsque la donnée est flaggée comme invalide
   */
  offInvalidate(e) {
    typeof e == "function" && this._invalidateListeners_.delete(e);
  }
  /**
   * Flag les données comme étant invalides
   */
  invalidate() {
    this._publishInvalidation_();
  }
  /**
   * Appel la fonction "handler" (passée en paramettre) lorsque la donnée est flaggée comme invalide
   */
  onFormInvalidate(e) {
    typeof e == "function" && this._formInvalidateListeners_.add(e);
  }
  /**
   * Stop les appels de la fonction "handler" (passée en paramettre) lorsque la donnée est flaggée comme invalide
   */
  offFormInvalidate(e) {
    typeof e == "function" && this._formInvalidateListeners_.delete(e);
  }
  invalidateForm() {
    this._publishFormInvalidation_();
  }
  /**
   * Appel la fonction "handler" (passée en paramettre) lorsque quelque chose change la valeur gérée par le proxy quelque soit la profondeur de la donnée
   *
   */
  onInternalMutation(e) {
    typeof e == "function" && (this._mutationListeners_.add(e), e());
  }
  /**
   * Stop les Appels de la fonction "handler" (passée en paramettre) lorsque quelque chose change la valeur gérée par le proxy quelque soit la profondeur de la donnée
   */
  offInternalMutation(e) {
    typeof e == "function" && this._mutationListeners_.delete(e);
  }
  /**
   * Maintient le remplissage de l'objet / tableau "handler" passé en paramètre avec les valeurs du proxy
   * Remplit uniquement les valeurs déjà présentes dans l'objet / tableau passé en paramètre
   */
  startTemplateFilling(e) {
    if (this._templateFillListeners_.add(e), typeof this._value_ == "object")
      for (const t in this._value_) {
        let s = t;
        const r = this._value_[t];
        e.propertyMap && e.propertyMap[t] && (s = e.propertyMap[t]), typeof e[t] < "u" && e[t] !== r && (e[s] = r);
      }
  }
  /**
   * Arrête  de maintenir le remplissage de l'objet / tableau "handler" passé en paramètre avec les valeurs du proxy
   */
  stopTemplateFilling(e) {
    this._templateFillListeners_.delete(e);
  }
  /**
   * Maintient le remplissage de l'objet / tableau "handler" passé en paramètre avec les valeurs du proxy
   * Remplit toute valeur qu'elle soit présente ou pas initialement dans l'objet
   */
  startDynamicFilling(e) {
    this._fillListeners_.add(e);
    for (const t in this._value_) {
      const s = this._value_[t];
      e[t] !== s && (e[t] = s);
    }
  }
  /*
   * Arrête  de maintenir le remplissage de l'objet / tableau "handler" passé en paramètre avec les valeurs du proxy
   */
  stopDynamicFilling(e) {
    this._fillListeners_.delete(e);
  }
  /**
   * Assigne une nouvelle valeur au proxy ce qui déclenche la transmission de la donnée en fonction des "écouteurs" associés
   */
  set(e, t = !1) {
    if (this._value_ === e || this._value_ && e && Re(this._value_) && Re(e) && this._value_.__value === e.__value)
      return !0;
    this._value_ = ke(e) ? e : { __value: e }, this._cachedGet_ = void 0;
    const s = Re(this._value_);
    if (this._parentKey_ && this.parent) {
      const r = Re(this._value_) ? this._value_.__value : this._value_;
      if (this.parent?.get() == null && this.parent?.get() == null)
        if (isNaN(Number(this._parentKey_)))
          this.parent.set({ [this._parentKey_]: r });
        else {
          const n = [];
          n[Number(this._parentKey_)] = r, this.parent.set(n);
        }
      else
        this.parent._value_[this._parentKey_] = r;
    }
    if (s)
      return this._proxies_.forEach((r, n) => {
        n != "_parent_" && (r.set(null), this._publishDynamicFilling_(n, null));
      }), this._publishAssignement_(t), this.parent && this._parentKey_ && this.parent._publishDynamicFilling_(
        this._parentKey_,
        this._value_.__value
      ), !0;
    for (const r in this._value_)
      this._value_[r] === void 0 && delete this._value_[r];
    if (this._proxies_.forEach((r, n) => {
      const l = this._value_[n];
      n != "_parent_" && l === void 0 && l !== null && isNaN(Number(n)) && (r.set(null), this._publishDynamicFilling_(n, null));
    }), this._publishAssignement_(), this.parent && this._parentKey_ && this.parent._publishDynamicFilling_(
      this._parentKey_,
      this._value_
    ), ke(this._value_))
      for (const r in this._value_) {
        const n = e[r], c = ke(n) ? n : { __value: n };
        if (!this._proxies_.has(r)) {
          this._publishDynamicFilling_(r, n);
          continue;
        }
        this._proxies_.get(r)?.set(c, !0), this._publishDynamicFilling_(r, n);
      }
    return !0;
  }
  get() {
    if (this._cachedGet_ !== void 0) return this._cachedGet_;
    if (U.modifiedCollectore.length > 0 && U.modifiedCollectore[0].add(this), Object.prototype.hasOwnProperty.call(this._value_, "__value")) {
      const e = this._value_.__value;
      return this._cachedGet_ = e ?? null;
    }
    return this._cachedGet_ = this._value_ != null ? this._value_ : null;
  }
  /**
   * retourner le webcomponent auquel le proxy est associé
   */
  get $tag() {
    return this._instanceCounter_ || (j.instancesCounter++, this._instanceCounter_ = j.instancesCounter), j.instances.set(this._instanceCounter_, this), "<" + de + '-publisher-proxy publisher="' + this._instanceCounter_ + '"></' + de + "-publisher-proxy>";
  }
}, j.instances = /* @__PURE__ */ new Map(), j.instancesCounter = 0, j);
var S;
let U = (S = class {
  constructor() {
    if (this.enabledLocaStorageProxies = [], this.publishers = /* @__PURE__ */ new Map(), this.localStorageData = {}, this.isLocalStrorageReady = null, this.initialisedData = [], S.instance != null) throw "Singleton / use getInstance";
    S.instance = this, this.isLocalStrorageReady = this.cleanStorageData();
  }
  invalidateAll() {
    this.publishers.forEach((e) => {
      e._invalidate_on_page_show_ && e.invalidate();
    });
  }
  async cleanStorageData() {
    return new Promise((e) => {
      (async () => {
        try {
          let s = localStorage.getItem(Be), r = null;
          if (s && (r = await this.decompress(s, "gzip")), r)
            try {
              this.localStorageData = JSON.parse(r);
            } catch {
              this.localStorageData = {};
            }
          else
            s = await this.compress("{}", "gzip"), localStorage.setItem(Be, s), this.localStorageData = {};
          const n = 1e3 * 60 * 60 * 12;
          for (const l in this.localStorageData) {
            const c = this.localStorageData[l], v = (/* @__PURE__ */ new Date()).getTime() - (c.expirationDelayMs || n);
            c.lastModifiationMS < v && delete this.localStorageData[l];
          }
          e(!0);
        } catch {
          window.requestAnimationFrame(() => {
            e(!1);
          }), console.warn("no publisher cache in this browser");
        }
      })();
    });
  }
  /**
   * PublisherManager est un singleton
   */
  static getInstance(e) {
    if (e) {
      const t = S.instances.get(e);
      return t || (console.warn(
        "No PublisherManager instance registered with id:",
        e,
        "creating new one"
      ), new S());
    }
    return S.instance == null ? new S() : S.instance;
  }
  static registerInstance(e, t) {
    S.instances.has(e) && console.warn(
      "PublisherManager instance already registered with id: ",
      e
    ), S.instances.set(e, t);
  }
  /**
   * shortcut static pour obtenir un publisher vias sont id/adresse sans taper getInstance.
   * Si le publisher n'existe pas, il est créé.
   */
  static get(e, t) {
    return S.getInstance().get(e, t);
  }
  static collectModifiedPublisher() {
    S.modifiedCollectore.unshift(/* @__PURE__ */ new Set());
  }
  static getModifiedPublishers() {
    return S.modifiedCollectore.shift();
  }
  /**
   * shortcut static pour supprimer un publisher de la liste et appel également delete sur le publisher ce qui le supprime, de même que ses sous publishers
   */
  static delete(e) {
    return e ? S.getInstance().delete(e) : !1;
  }
  /**
   * Obtenir un publisher vias sont id/adresse
   * Si le publisher n'existe pas, il est créé.
   */
  async setLocalData(e, t) {
    await this.isLocalStrorageReady, e.set(
      this.localStorageData[t + "¤lang_" + N.getLanguage()]?.data || e.get()
    );
  }
  get(e, t) {
    const s = t?.localStorageMode === "enabled", r = t?.invalidateOnPageShow === !0;
    if (!this.publishers.has(e)) {
      const l = {}, c = new Ae(l);
      this.set(e, c);
    }
    const n = this.publishers.get(e);
    return s && this.initialisedData.indexOf(e) === -1 && (t?.expirationDelayMs && (n._expiration_delay_ = t.expirationDelayMs), n._is_savable_ = !0, this.initialisedData.push(e), this.setLocalData(n, e)), r && (n._invalidate_on_page_show_ = r), this.publishers.get(e);
  }
  /**
   * Remplace un publisher pour l'id fourni par un autre.
   * L'autre publisher n'est pas supprimé.
   */
  set(e, t) {
    this.publishers.set(e, t);
  }
  /**
   * @warning
   * !!!!! ATTENTION !!!!!
   * Il est fort à aprier que vous ne voulez pas utiliser cette methode
   * Il s'agit d'une supression complete
   * * du publisher de la liste
   * * des bindings
   * * de même que ses sous publishers
   *
   * UTILISEZ PLUTÔT la méthode publisher.set({}) pour réinitialiser un publisher sans perdre les ecouteurs
   */
  delete(e) {
    return this.publishers.has(e) ? (this.publishers.delete(e), !0) : !1;
  }
  async saveToLocalStorage(e = 0) {
    if (!(e !== S.saveId && e % 10 != 0))
      try {
        if (!S.changed || S.saving) return;
        S.saving = !0, S.changed = !1;
        const t = Array.from(this.publishers.keys());
        let s = !1;
        for (const r of t) {
          const n = this.publishers.get(r);
          if (!n?._is_savable_) continue;
          const l = n?.get();
          l && (this.localStorageData[r + "¤lang_" + N.getLanguage()] = {
            lastModifiationMS: (/* @__PURE__ */ new Date()).getTime(),
            expirationDelayMs: n._expiration_delay_,
            data: l
          }, s = !0);
        }
        if (s) {
          const r = await this.compress(
            JSON.stringify(this.localStorageData),
            "gzip"
          );
          localStorage.setItem(Be, r);
        }
        if (S.saving = !1, S.changed) {
          S.saveId++;
          const r = S.saveId;
          setTimeout(() => this.saveToLocalStorage(r), 1e3);
        }
      } catch {
        S.saving = !1;
      }
  }
  async compress(e, t) {
    const s = new TextEncoder().encode(e), r = window, n = new r.CompressionStream(t), l = n.writable.getWriter();
    l.write(s), l.close();
    const c = await new Response(n.readable).arrayBuffer(), v = new Uint8Array(c);
    let b = "";
    for (let f = 0; f < v.length; f++)
      b += String.fromCharCode(v[f]);
    return btoa(b);
  }
  async decompress(e, t) {
    const s = atob(e), n = Uint8Array.from(
      s,
      (f) => f.charCodeAt(0)
    ).buffer, l = window, c = new l.DecompressionStream(t), v = c.writable.getWriter();
    v.write(n), v.close();
    const b = await new Response(c.readable).arrayBuffer();
    return new TextDecoder().decode(b);
  }
}, S.buildDate = __BUILD_DATE__, S.changed = !1, S.saving = !1, S.saveId = 0, S.instance = null, S.instances = /* @__PURE__ */ new Map(), S.modifiedCollectore = [], S);
if (typeof window < "u") {
  const i = window;
  i[ut + "PublisherManager"] = i[ut + "PublisherManager"] || U;
}
const js = /* @__PURE__ */ new Set([
  "invalidate",
  "onInvalidate",
  "offInvalidate",
  "invalidateForm",
  "onFormInvalidate",
  "offFormInvalidate",
  "onAssign",
  "offAssign",
  "startDynamicFilling",
  "stopDynamicFilling",
  "startTemplateFilling",
  "stopTemplateFilling",
  "onInternalMutation",
  "offInternalMutation",
  "set",
  "get",
  "$tag",
  "_cachedGet_",
  "_templateFillListeners_",
  "_fillListeners_",
  "_assignListeners_",
  "_invalidateListeners_",
  "_formInvalidateListeners_",
  "_publishInternalMutation_",
  "hasListener",
  "delete",
  "_mutationListeners_",
  "_publishDynamicFilling_",
  "_publishInvalidation_",
  "_publishFormInvalidation_",
  "_publishTemplateFilling_",
  "_publishAssignement_",
  "_proxies_",
  "parent",
  "_parentKey_",
  "_value_",
  "_is_savable_",
  "_expiration_delay_",
  "_lockInternalMutationPublishing_",
  "_instanceCounter_",
  "_assignmentId_",
  "_invalidate_on_page_show_"
]);
class Ae extends Vt {
  constructor(e, t = null, s) {
    super(e, t, s);
    const r = new Proxy(this, {
      /**
       * Lorsque l'on écrit monConteneur =  publisher.maClef ou monConteneur = publisher["maClef"] monConteneur contient :
       * Les methodes de PublisherProxy (onAssign... : voir liste dans kle tableaus si dessous), si la clef est une méthode de PublisherProxy,,
       * Sinon un autre proxy qui a comme valeur interne la valeur corespondante à la clef dans l'objet.
       */
      get: function(n, l) {
        if (js.has(l)) return n[l];
        if (l == Symbol.toPrimitive)
          return () => r.get();
        if (!n._proxies_.has(l)) {
          const c = n._value_[l], v = new Ae(
            ke(c) ? c : { __value: c },
            n,
            l
          );
          v._proxies_.set("_parent_", r), n._proxies_.set(l, v);
        }
        return n._proxies_.get(l);
      },
      /**
       * Lorsque l'on écrit publisher.maClef = value ou publisher["maClef"] = value, on assigne la valeur à la clef dans l'objet interne.
       * Les gestionnairs associés sopnt déclenchés en conséquence de manière profonde et remontante si nécessaire.
       */
      set: function(n, l, c) {
        if (l == "_value_")
          return n._value_ = c, !0;
        if (l == "_cachedGet_")
          return n._cachedGet_ = c, !0;
        if (l == "_assignmentId_")
          return n._assignmentId_ = c, !0;
        if (l == "_is_savable_")
          return n._is_savable_ = c, !0;
        if (l == "_expiration_delay_")
          return n._expiration_delay_ = c, !0;
        if (l == "_invalidate_on_page_show_")
          return n._invalidate_on_page_show_ = c, !0;
        if (l == "_instanceCounter_")
          return n._instanceCounter_ = c, !0;
        if (!n._proxies_.has(l)) {
          const b = new Ae({}, n, l);
          b._proxies_.set("_parent_", r), n._proxies_.set(l, b);
        }
        return n._value_[l] !== c && (n._value_[l] = c, n._publishDynamicFilling_(l, c), n._proxies_.get(l)?.set(ke(c) ? c : { __value: c })), !0;
      },
      /**
       * Autres propriétés classiques d'un objet implémentées par le proxy
       */
      deleteProperty: function(n, l) {
        return n._publishDynamicFilling_(l, null), n._proxies_.get(l)?.set(null), delete n._value_[l];
      },
      // enumerate: function (publisherInstance, sKey): CoreJSType {
      //   return publisherInstance._value_.keys();
      // },
      has: function(n, l) {
        return l in n._value_ && l != "_lockInternalMutationPublishing_";
      },
      defineProperty: function(n, l, c) {
        return c && "value" in c && (n._value_[l] = c.value), !0;
      },
      getOwnPropertyDescriptor: function(n, l) {
        return {
          enumerable: !0,
          configurable: !0
        };
      },
      ownKeys: function(n) {
        return n._value_.__value ? Object.keys(n._value_.__value) : Object.keys(n._value_);
      }
    });
    return r;
  }
  getProperty(e, t) {
    return e[t];
  }
}
class Hs extends HTMLElement {
  constructor() {
    super(), this.publisherId = "", this.onAssign = (e) => {
      this.innerHTML = e.toString();
    };
  }
  connectedCallback() {
    this.publisherId = this.getAttribute("publisher") || "", this.publisher = Vt.instances.get(parseInt(this.publisherId)), this.publisher?.onAssign(this.onAssign);
  }
  disconnectedCallback() {
    this.publisher?.offAssign(this.onAssign);
  }
}
try {
  customElements.define(
    de + "-publisher-proxy",
    Hs
  );
} catch {
}
window.addEventListener("pageshow", (i) => {
  i.persisted && U.getInstance().invalidateAll();
});
let le = class Z {
  /**
   * Effectue une comparaison d'égalité non profonde entre deux objets.
   */
  /*eslint-disable @typescript-eslint/no-explicit-any*/
  static shallowEqual(e, t, s = !0) {
    const r = Object.keys(e), n = Object.keys(t);
    if (r.length !== n.length && s)
      return !1;
    for (const l of r) {
      const c = e[l], v = t[l];
      if (s ? c !== v : c != v)
        return !1;
    }
    return !0;
  }
  /*eslint-enable @typescript-eslint/no-explicit-any*/
  /**
   * Effectue une comparaison d'égalité profonde entre deux objets.
   */
  /*eslint-disable @typescript-eslint/no-explicit-any*/
  static deepEqual(e, t, s = !0) {
    const r = Object.keys(e), n = Object.keys(t);
    if (r.length !== n.length && s)
      return !1;
    for (const l of r) {
      const c = e[l], v = t[l], b = Z.isObject(c) && Z.isObject(v), f = s ? c !== v : c != v;
      if (b && !Z.deepEqual(c, v) || !b && f)
        return !1;
    }
    return !0;
  }
  /*eslint-enable @typescript-eslint/no-explicit-any*/
  /**
   * @returns true si l'objet est un objet ou un tableau (qui est un objet). mais false si null (car sinon typeof null "object")
   */
  static isObject(e) {
    return e != null && typeof e == "object";
  }
  /**
   * @returns true si l'argument est null ou undefined
   */
  static isUndefindOrNull(e) {
    return e == null;
  }
  static isEmpty(e) {
    return Z.isUndefindOrNull(e) ? !0 : Object.keys(e).length === 0;
  }
  /**
   * traverse l'objet pour obtenir la valeur a l'adresse donnée via le tableau de clés pathArray.
   * Si extendValues = true, les propriétés des objets parents sont copiées au fur et a mesure de la descente dans la hierarchie, avant l'assignation des propriétés de l'objet lui même.
   */
  /*eslint-disable @typescript-eslint/no-explicit-any*/
  static traverse(e, t, s = !1) {
    for (const r of t) {
      const n = e[r];
      if (n === void 0)
        return;
      s && Z.isObject(n) ? e = Object.assign(Array.isArray(n) ? [] : {}, e, n) : e = e[r];
    }
    return e;
  }
  static traverseDotNotation(e, t, s = !1) {
    return Z.traverse(e, t.split("."), s);
  }
  /*eslint-enable @typescript-eslint/no-explicit-any*/
  static getURLSearchArray(e, t = "") {
    let s = [];
    for (let r in e) {
      const n = e[r];
      t && (r = t + "[" + r + "]"), Z.isObject(n) ? s = [
        ...s,
        ...this.getURLSearchArray(n, r)
      ] : s.push(`${r}=${n}`);
    }
    return s;
  }
  static getURLSearchString(e) {
    return Z.getURLSearchArray(e, "").join("&");
  }
};
const ne = le.traverseDotNotation;
var Gs = Object.create, Je = Object.defineProperty, Ws = Object.getOwnPropertyDescriptor, zt = (i, e) => (e = Symbol[i]) ? e : Symbol.for("Symbol." + i), Se = (i) => {
  throw TypeError(i);
}, Ys = (i, e, t) => e in i ? Je(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, dt = (i, e) => Je(i, "name", { value: e, configurable: !0 }), Xs = (i) => [, , , Gs(i?.[zt("metadata")] ?? null)], Nt = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], pe = (i) => i !== void 0 && typeof i != "function" ? Se("Function expected") : i, Js = (i, e, t, s, r) => ({ kind: Nt[i], name: e, metadata: s, addInitializer: (n) => t._ ? Se("Already initialized") : r.push(pe(n || null)) }), Bt = (i, e) => Ys(e, zt("metadata"), i[3]), M = (i, e, t, s) => {
  for (var r = 0, n = i[e >> 1], l = n && n.length; r < l; r++) e & 1 ? n[r].call(t) : s = n[r].call(t, s);
  return s;
}, W = (i, e, t, s, r, n) => {
  var l, c, v, b, f, a = e & 7, p = !!(e & 8), d = !!(e & 16), w = a > 3 ? i.length + 1 : a ? p ? 1 : 2 : 0, g = Nt[a + 5], A = a > 3 && (i[w - 1] = []), m = i[w] || (i[w] = []), o = a && (!d && !p && (r = r.prototype), a < 5 && (a > 3 || !d) && Ws(a < 4 ? r : { get [t]() {
    return ft(this, n);
  }, set [t](h) {
    return pt(this, n, h);
  } }, t));
  a ? d && a < 4 && dt(n, (a > 2 ? "set " : a > 1 ? "get " : "") + t) : dt(r, t);
  for (var u = s.length - 1; u >= 0; u--)
    b = Js(a, t, v = {}, i[3], m), a && (b.static = p, b.private = d, f = b.access = { has: d ? (h) => Ks(r, h) : (h) => t in h }, a ^ 3 && (f.get = d ? (h) => (a ^ 1 ? ft : Zs)(h, r, a ^ 4 ? n : o.get) : (h) => h[t]), a > 2 && (f.set = d ? (h, _) => pt(h, r, _, a ^ 4 ? n : o.set) : (h, _) => h[t] = _)), c = (0, s[u])(a ? a < 4 ? d ? n : o[g] : a > 4 ? void 0 : { get: o.get, set: o.set } : r, b), v._ = 1, a ^ 4 || c === void 0 ? pe(c) && (a > 4 ? A.unshift(c) : a ? d ? n = c : o[g] = c : r = c) : typeof c != "object" || c === null ? Se("Object expected") : (pe(l = c.get) && (o.get = l), pe(l = c.set) && (o.set = l), pe(l = c.init) && A.unshift(l));
  return a || Bt(i, r), o && Je(r, t, o), d ? a ^ 4 ? n : o : r;
}, Ke = (i, e, t) => e.has(i) || Se("Cannot " + t), Ks = (i, e) => Object(e) !== e ? Se('Cannot use the "in" operator on this value') : i.has(e), ft = (i, e, t) => (Ke(i, e, "read from private field"), t ? t.call(i) : e.get(i)), pt = (i, e, t, s) => (Ke(i, e, "write to private field"), s ? s.call(i, t) : e.set(i, t), t), Zs = (i, e, t) => (Ke(i, e, "access private method"), t);
const Ue = /* @__PURE__ */ new Map(), Qs = (i) => {
  var e, t, s, r, n, l, c, v, b, f, a, p;
  class d extends (a = i, f = [k({ type: Boolean, reflect: !0 })], b = [k({ type: Boolean })], v = [k({ type: Boolean })], c = [k({ type: Boolean })], l = [k({ type: Boolean })], n = [k({ type: Boolean, reflect: !0 })], r = [k({ type: String, attribute: "data-aria-label" })], s = [k({ type: String, attribute: "data-aria-labelledby" })], t = [k()], e = [k()], a) {
    constructor(...g) {
      super(), M(p, 5, this), this.touched = M(p, 8, this, !1), M(p, 11, this), this.error = M(p, 12, this, !1), M(p, 15, this), this.autofocus = M(p, 16, this, !1), M(p, 19, this), this.required = M(p, 20, this, !1), M(p, 23, this), this.forceAutoFill = M(p, 24, this, !1), M(p, 27, this), this.disabled = M(p, 28, this, !1), M(p, 31, this), this.ariaLabel = M(p, 32, this), M(p, 35, this), this.ariaLabelledby = M(p, 36, this), M(p, 39, this), this.onValueAssign = void 0, this.onFormValueAssign = void 0, this.onFormDataInValidate = void 0, this.formDataProvider = "", this._name = "", this._value = "", this.onValueAssign = (A) => {
        this.setValueFromPublisher(A);
      }, this.onFormValueAssign = async (A) => {
        this.setFormValueFromPublisher(A);
      }, this.onFormDataInValidate = () => {
        const A = this.getFormPublisher();
        A && A.isFormValid.get() && this.validateFormElement();
      };
    }
    get name() {
      return this._name;
    }
    set name(g) {
      this.hasAttribute("name") && !this.forceAutoFill && (g = this.getAttribute("name")), this._name = g, this.requestUpdate();
    }
    validateFormElement() {
    }
    unsetOnDisconnect() {
      return this.hasAttribute("unsetOnDisconnect");
    }
    updateDataValue() {
      this.getAttribute("name") && this.getFormPublisher() && (this.setFormPublisherValue(this.getValueForFormPublisher()), this.setFormValueFromPublisher(this.getFormPublisherValue()));
    }
    getFormPublisher() {
      return this.formDataProvider || (this.formDataProvider = this.getAncestorAttributeValue("formDataProvider")), this.formDataProvider ? U.get(this.formDataProvider) : null;
    }
    setFormPublisherValue(g) {
      const A = this.getFormPublisher();
      A && ne(A, this.name).set(g);
    }
    getFormPublisherValue() {
      const g = this.getFormPublisher();
      return g ? ne(g, this.name).get() : null;
    }
    /**
     * Mise en forme de la valeur fournie au formPublisher associé au composant
     * Destinée à être surchargée si besoin (cf Form-checkable)
     */
    getValueForFormPublisher() {
      return this.value;
    }
    /**
     * Mise à jour de la valeur interne du composant en fonction de la valeur venant du publisher associé au composant
     * Destinée à être surchargée si besoin (cf Form-checkable)
     */
    setValueFromPublisher(g) {
      this.value = g;
    }
    /**
     * Mise à jour de la valeur interne du composant en fonction de la valeur venant du formPublisher associé au composant
     * Destinée à être surchargée si besoin (cf Form-checkable)
     */
    setFormValueFromPublisher(g) {
      this.value = g;
    }
    get value() {
      return this._value;
    }
    set value(g) {
      g == null && (g = ""), le.isObject(g) && Object.prototype.hasOwnProperty.call(g, "__value") && g._value == null && (g = ""), this._value != g && (this._value = g, this.updateDataValue(), this.requestUpdate());
    }
    initPublisher() {
      let g = this.getFormPublisher();
      const A = this.hasAncestorAttribute("initFromPublisher") && this._name && this.getFormPublisherValue() ? this.getFormPublisherValue() : this.getAttribute("value");
      this._name && this.publisher && ne(this.publisher, this._name).offAssign(
        this.onValueAssign
      ), this._name && g && ne(g, this._name).offAssign(
        this.onFormValueAssign
      ), super.initPublisher(), this.name || (this._name = this.getAttribute("name")), this.value || (this._value = this.getAttribute("value")), this.publisher && this._name && ne(this.publisher, this._name).onAssign(
        this.onValueAssign
      ), g = this.getFormPublisher(), this._name && g && (ne(g, this._name).onAssign(
        this.onFormValueAssign
      ), g.onFormInvalidate(this.onFormDataInValidate)), this.updateDataValue(), A && (this.value = A);
    }
    handleBlur() {
      this.touched = !0;
    }
    handleChange(g) {
      this.value = g.target.value;
      const A = new Event("change");
      this.dispatchEvent(A);
    }
    /**
     * Ajoute un comportement de navigation au clavier pour les éléments de formulaire
     * data-keyboard-nav peut contenir plusieurs valeurs qui identifient les boucles de navigation auquelles est attaché cet élément.
     * Les valeurs sont séparées par des espaces.
     * En appuyant sur la touche "Down", le composant va se déplacer dans la boucle de navigation correspondante en suivant le flux.
     * En appuyant sur la touche "Up", le déplacement inverse est effectué.
     */
    addKeyboardNavigation() {
      const g = this.getAncestorAttributeValue("data-keyboard-nav");
      if (!g) return;
      const A = g.split(" "), m = A[0];
      if (!m) return;
      for (const u of A) {
        Ue.has(u) || Ue.set(u, []);
        const h = Ue.get(u);
        h?.indexOf(this) == -1 && h.push(this);
      }
      const o = Ue.get(m);
      this.addEventListener("keydown", (u) => {
        const h = u;
        if (!["ArrowDown", "ArrowUp"].includes(h.key)) return;
        const _ = "input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled])", P = o?.filter((T) => {
          const K = T.shadowRoot?.querySelector(_);
          if (!K) return !1;
          const Ee = window.getComputedStyle(K);
          return Ee.display !== "none" && Ee.display !== "" && Ee.pointerEvents != "none" && Ee.visibility !== "hidden" && K.getBoundingClientRect().width > 0;
        });
        let L = null;
        if (h.key == "ArrowDown" && P) {
          const T = P.indexOf(this);
          T == P.length - 1 ? L = P[0] : L = P[T + 1];
        } else if (h.key == "ArrowUp" && P) {
          const T = P.indexOf(this);
          T == 0 ? L = P[P.length - 1] : L = P[T - 1];
        }
        const E = L?.shadowRoot?.querySelector(
          _
        );
        E && E.focus && (E.focus(), u.preventDefault(), u.stopPropagation());
      });
    }
    focus() {
      this.shadowRoot?.querySelector(
        "[data-form-element], button"
      )?.focus();
    }
    connectedCallback() {
      this.formDataProvider = this.getAncestorAttributeValue(
        "formDataProvider"
      ), super.connectedCallback(), this.addKeyboardNavigation();
    }
    unset() {
      this.value = null;
    }
    disconnectedCallback() {
      this.unsetOnDisconnect() && this.unset(), super.disconnectedCallback(), this._name && this.publisher && ne(this.publisher, this._name).offAssign(
        this.onValueAssign
      );
      const g = this.getFormPublisher();
      this._name && g && (ne(g, this._name).offAssign(
        this.onFormValueAssign
      ), g.offFormInvalidate(this.onFormDataInValidate));
    }
  }
  return p = Xs(a), W(p, 2, "name", t, d), W(p, 2, "value", e, d), W(p, 5, "touched", f, d), W(p, 5, "error", b, d), W(p, 5, "autofocus", v, d), W(p, 5, "required", c, d), W(p, 5, "forceAutoFill", l, d), W(p, 5, "disabled", n, d), W(p, 5, "ariaLabel", r, d), W(p, 5, "ariaLabelledby", s, d), Bt(p, d), d;
};
let ei = class he {
  /**
   * Vérifie si les deux tableaux ont le même contenu
   */
  static areEqual(e, t) {
    return e.length === t.length ? e.every((s, r) => s === t[r]) : !1;
  }
  /**
   * Fournie une fonction to1D qui transforme un tableau 2D en un tableau 1D par concaténation
   */
  /*eslint-disable @typescript-eslint/no-explicit-any*/
  static from2d(e) {
    return {
      to1D: () => {
        let t = [];
        return e.forEach((s) => t = t.concat(s)), this.from(t);
      }
    };
  }
  /*eslint-enable @typescript-eslint/no-explicit-any*/
  /**
   * Fournie des méthodes pour manipuler un tableau
   * A l'écriture cela permet d'avoir des phrases du type:
   * let data = Arrays.from(mon tableau)
   * puis data.everyItem().has().same().value().forkey("key");
   * Peu mieux faire. ou voir a remplacer un jour par loadHash par exemple.
   **/
  /*eslint-disable @typescript-eslint/no-explicit-any*/
  static from(e) {
    return {
      /**Obtenir le tableau final*/
      get: () => e || [],
      everyItem: () => ({
        has: () => ({
          same: () => ({
            value: () => ({
              forKey: (t) => {
                if (e.length < 1) return !0;
                const s = (e[0] || {})[t];
                return e.every(
                  (r) => (r || {})[t] == s
                );
              }
            })
          })
        }),
        value: () => ({
          forKey: (t) => he.from(e.map((s) => s[t]))
        }),
        copy: () => ({
          fromKey: (t) => ({
            toKey: (s) => {
              e.forEach((r) => {
                r[s] = Array.isArray(r[t]) ? [...r[t]] : typeof r[t] == "object" && r[t] != null ? { ...r[t] } : r[t];
              });
            }
          })
        })
      }),
      map: (t) => he.from(e.map(t)),
      filter: (t) => he.from(e.filter(t)),
      find: (t) => e.find(t),
      some: (t) => e.some(t),
      every: (t) => e.every(t),
      group: () => ({
        byKey: (t) => {
          const s = [], r = /* @__PURE__ */ new Map();
          for (const n of e) {
            const l = n[t];
            if (!r.has(l)) {
              const c = s.length;
              r.set(l, c);
              const v = { items: [] };
              v[t] = l, s.push(v);
            }
            s[r.get(l)].items.push(n);
          }
          return he.from(s);
        }
      }),
      without: () => ({
        duplicates: () => ({
          forKey: (t) => {
            const s = [...new Set(e.map((r) => r[t]))];
            return he.from(
              s.map(
                (r) => e.find((n) => n[t] == r)
              )
            );
          }
        }),
        itemsIn: (t) => ({
          havingSameValue: () => ({
            forKey: (s) => {
              const r = (n, l) => (c) => n[l] != c[l];
              return he.from(
                e.filter(
                  (n) => t.every(
                    r(n, s)
                  )
                )
              );
            }
          })
        })
      })
    };
  }
  /*eslint-enable @typescript-eslint/no-explicit-any*/
}, je = class {
  /**
   * Passe le premier caractère de la chaine en majuscule
   */
  static ucFirst(e) {
    return typeof e != "string" ? e : e.charAt(0).toUpperCase() + e.substring(1);
  }
  static minutesDuration(e, t = "", s = "long") {
    t || (t = N.getLanguage());
    const r = (b, f) => [Math.floor(b / f), b % f];
    function n(b, f, a) {
      return new Intl.NumberFormat(b, { style: "unit", unit: f, unitDisplay: a }).format;
    }
    const [l, c] = r(e, 60), v = [];
    return l && v.push(n(t, "hour", s)(l)), c && v.push(n(t, "minute", s)(c)), new Intl.ListFormat(t, {
      style: "long",
      type: "conjunction"
    }).format(v);
  }
  /**
   * Retourne le résultat de l'évaluation de la chaine fournie
   */
  static js(e) {
    try {
      return Function("return " + e)();
    } catch {
      return "";
    }
  }
};
var C;
let ze = (C = class {
  static disable() {
    this.enabled && (this.enabled = !1, Array.from(C.observedElements.keys()).forEach(
      (e) => C.unObserve(e)
    ));
  }
  static observe(e) {
    if (!e || !C.enabled || C.observedElements.has(e)) return;
    const t = new MutationObserver(C.onMutation), s = {};
    s.childList = !0, s.subtree = !0, s.attributes = !0, s.attributeFilter = ["data-bind"], t.observe(e, s), e.querySelectorAll("[data-bind]").forEach((r) => C.addPublisherListeners(r)), C.observedElements.set(e, t);
  }
  /**
   * Arrêter à observer un élément html.
   */
  static unObserve(e) {
    if (!e) return;
    const t = this.observedElements.get(e);
    t && (t.disconnect(), e.querySelectorAll("[data-bind]").forEach((s) => C.removePublisherListeners(s)));
  }
  static onAdded(e) {
    e.hasAttribute && e.hasAttribute("data-bind") && C.addPublisherListeners(e), e.querySelectorAll ? e.querySelectorAll("[data-bind]").forEach((t) => C.addPublisherListeners(t)) : e.childNodes.forEach((t) => C.onAdded(t));
  }
  static onRemoved(e) {
    e.hasAttribute && e.hasAttribute("data-bind") && C.removePublisherListeners(e), e.querySelectorAll ? e.querySelectorAll("[data-bind]").forEach((t) => C.removePublisherListeners(t)) : e.childNodes.forEach((t) => C.onRemoved(t));
  }
  /**
   * Callback appelé par le MutationObserver
   */
  static onMutation(e) {
    for (const t of e)
      switch (t.type) {
        case "attributes":
          C.addPublisherListeners(t.target);
          break;
        case "childList":
          t.addedNodes.forEach((s) => {
            C.onAdded(s);
          }), t.removedNodes.forEach((s) => {
            C.onRemoved(s);
          });
          break;
      }
  }
  /**
   * La liaison avec le publisher supprimée ici.
   */
  static removePublisherListeners(e) {
    const t = C.publisherListeners.get(e);
    t && (C.publisherListeners.delete(e), t.forEach((s) => {
      s.publisher?.offAssign(s.onAssign);
    }));
  }
  /**
   *
   * Cette fonction prend l'expression fournie et trouves toutes les occurences du type $.clef1.clef2.clef3 ou $a.b par exemple.
   * Les occurences sont ensuite mises dans un table de la forme [["clef1", "clef2", "clef3"],["a", "b"],...]
   * Note : si une clef contien un point, on peut l'échapper en écrivant par exemple "$a.b.c\.d\.e" pour cibler value dans {a:{b:{"c.d.e":value}}}
   * Propriétés du retour (du type BindedVariablesDescriptor) :
   *  * expression :  l'expression initiale sans les échappements
   *  * variables : le tableau d'"adresses" de variables décrit ci-dessus
   */
  static getVariablesDescriptor(e) {
    let t = e.match(/(\$(?:\w+\\?\.?)+)/g);
    return t ? t = t.map((s) => s.replace("$", "")) : t = [e], t = t.filter((s) => s.length > 0), {
      expression: e.replace("\\", ""),
      //TODO Supression des échappements uniquement suivis de "."
      variables: t.map((s) => s.split(/\b\.\b/).map((r) => r.replace("\\", "")))
    };
  }
  /**
   * Extrait des "DataBindItems" a partir d'un élément html.
   * Pour chaque attribut dont le nom commence par ::, un dataBindItem est créé.
   * * Proriété "propertyToUpdate" du DataBindItem :
   *   Le nom de l'attribut modifié en transformant La notation en hyphen ("-") en KamelCase.
   *   un cas spécial est créé pour *-html qui retourne *HTML par exemple inner-html devient innerHTML
   *   Cela représente la propriété à mettre à jour sur l'élément lors de la modification d'une des variables liées dans le publicheur.
   * * Propriété "bindedVariablesDescriptor" du DataBindItem : voir la fonction getVariablesDescriptor
   */
  static getDataBindItems(e) {
    return "attributes" in e ? Array.from(e.attributes).filter((t) => t.name.indexOf("::") == 0).map((t) => ({
      propertyToUpdate: t.name.substring(2).replace(/-((html)|\w)/g, (r) => r.substring(1).toUpperCase()),
      bindedVariablesDescriptor: C.getVariablesDescriptor(t.value)
    })) : [];
  }
  /**
   * Cette fonction récuperer le (sous) publisher a l'adresse donnée.
   * Si l'une des clef de l'adresse est _self_, on garde le publisher courant et on passe à la suite.
   * Ceci est un cas spécial, c'est pour ça qu'on utilisa pes Objects.traverse.
   * Il y a toujours un publisher quelque soit l'adresse ce qui permet de cibler des valeurs qui n'existent pas encore
   */
  static getSubPublisher(e, t) {
    if (!t) return e;
    for (const s of t)
      if (s != "_self_") {
        if (!e) return null;
        e = e[s];
      }
    return e;
  }
  /**
   * La liaison avec le publisher est faite ici.
   * TODO Sans doute factoriser
   */
  static addPublisherListeners(e) {
    C.removePublisherListeners(e);
    const t = N.getAncestorAttributeValue(
      e.parentNode || e.host || e,
      "dataProvider"
    );
    if (!t) return;
    const s = U.getInstance().get(t), r = C.getDataBindItems(e), n = [];
    r.forEach((l) => {
      const c = l.bindedVariablesDescriptor, v = l.propertyToUpdate;
      for (const b of c.variables) {
        const f = b;
        let a = s;
        a = C.getSubPublisher(s, f);
        const p = e, d = {
          publisher: a,
          onAssign: () => {
            const w = c.variables.map((m) => C.getSubPublisher(s, m)?.get());
            let g = c.expression, A = !1;
            if (w.length == 1 && c.variables[0].join(".") == g.substring(1)) {
              let m = w[0];
              m === null && (m = ""), p[v] = m;
              return;
            }
            for (let m = 0; m < w.length; m++) {
              let o = w[m];
              const u = c.variables[m];
              o === null && (A = !0, o = void 0), g = g.replace("$" + u.join("."), o);
            }
            if (g.indexOf("|") != -1) {
              const m = g.indexOf("|");
              if (m == 0)
                g = je.js(g.substring(1));
              else {
                const o = g.substring(0, m), u = g.substring(m + 1), h = je[o];
                g = A ? "" : h ? h(u) : g;
              }
            } else
              g = A ? "" : g;
            p[v] = g;
          }
        };
        a?.onAssign(d.onAssign), n.push(d);
      }
    }), C.publisherListeners.set(e, n);
  }
}, C.observedElements = /* @__PURE__ */ new Map(), C.enabled = !0, C.publisherListeners = /* @__PURE__ */ new Map(), C);
ze.observe(document.documentElement);
window.SonicDataBindObserver || (window.SonicDataBindObserver = ze);
const $ = class $ {
  constructor(e) {
    this.addHTTPResponse = !1, this.cache = "default", this.isServiceSimulated = !1, this.blockUntilDone = !1, this.serviceURL = e.serviceURL, this.blockUntilDone = e.blockUntilDone || !1, this.serviceURL == "publisher://" && (this.isServiceSimulated = !0), this.serviceURL || (this.serviceURL = document.location.origin), this.userName = e.userName, this.password = e.password, e.token && (this.token = e.token), this.tokenProvider = e.tokenProvider, this.authToken = e.authToken, this.addHTTPResponse = e.addHTTPResponse || !1, this.credentials = e.credentials, this.cache = e.cache || "default";
  }
  set token(e) {
    if (this._token = e, !e) {
      $.tokens.delete(this.serviceURL);
      return;
    }
    $.invalidTokens.includes(e) || $.tokens.set(this.serviceURL, e);
  }
  get token() {
    return $.invalidTokens.includes(this._token) ? $.tokens.get(this.serviceURL) : this._token;
  }
  handleInvalidToken(e) {
    e && ($.invalidTokens.includes(e) || ($.invalidTokens.push(e), this.token = null));
  }
  async handleResult(e, t) {
    $.firstCallDoneFlags.set(this.serviceURL, "done"), this.lastResult = e;
    const s = e.headers.get("content-type")?.toLowerCase(), r = e.status;
    let n = {};
    if (!s || s.indexOf("text/") == 0)
      n = { text: await e.text() };
    else
      try {
        n = await e.json();
      } catch {
        n = {};
      }
    this.addHTTPResponse && le.isObject(n) && (n._sonic_http_response_ = e), r === 498 && !$.failledTokenUpdates.has(this.serviceURL) && (this.handleInvalidToken(this.token), t.apiMethod === "get" ? n = await this[t.apiMethod](
      t.path,
      t.additionalHeaders
    ) : n = await this[t.apiMethod](
      t.path,
      t.data,
      t.method,
      t.additionalHeaders
    ));
    const l = U.get("sonic-api");
    return l.lastResponse = {
      http: e,
      processed: n
    }, n;
  }
  /**
   * Basic auth
   */
  async auth() {
    if (this.token) return;
    if ($.tokens.has(this.serviceURL)) {
      this.token = $.tokens.get(this.serviceURL);
      return;
    }
    if (!this.tokenProvider) return;
    let e = {};
    this.userName && this.password ? e = {
      Authorization: "Basic " + window.btoa(
        unescape(encodeURIComponent(this.userName + ":" + this.password))
      )
    } : this.authToken && (e = {
      Authorization: "Bearer " + this.authToken
    });
    const t = new URL(this.serviceURL), s = t.protocol + "//" + t.host, r = await fetch(
      this.computeURL(this.tokenProvider, {
        serviceHost: s
      }),
      {
        headers: e,
        credentials: this.credentials
      }
    );
    try {
      const n = await r.json();
      n.token ? this.token = n.token : $.failledTokenUpdates.set(this.serviceURL, !0);
    } catch {
      $.failledTokenUpdates.set(this.serviceURL, !0);
    }
  }
  /**
   * avec localget, on ne passe pas par le système de token
   * on recupère path sans les searchparams nommée pathWithoutSearchParams
   * on cherche dans PublisherManager.get(pathWithoutSearchParams).get() les données qui matchent les searchparams présents dans path
   * on retourne les données selon le même format que le retour de get
   *
   * @todo netttoyer
   */
  async localGet(e, t) {
    const s = U.get(e), r = new URLSearchParams(t.split("?")[1] || ""), n = s.get();
    let l = [];
    Array.isArray(n) ? l = n : l = [n];
    const c = [];
    let v = Number.POSITIVE_INFINITY, b = 0, f = 0;
    if (r.has("limit") && (v = parseInt(r.get("limit") || "0"), f++), r.has("offset") && (b = parseInt(r.get("offset") || "0"), f++), f > 0 && (r.delete("limit"), r.delete("offset")), r.size === 0)
      return l.slice(b, b + v);
    for (const [a, p] of r.entries()) {
      const d = p.split(",").map((w) => w.trim());
      for (const w of d)
        for (const g of l)
          if (typeof g != "object")
            isNaN(+g) ? g.toString().toLowerCase().includes(p.toLowerCase()) && c.push(g) : g === p && c.push(g);
          else {
            const A = g;
            if (!A[a]) continue;
            isNaN(+A[a]) ? A[a]?.toString().toLowerCase().includes(w.toLowerCase()) && c.push(g) : A[a] === w && c.push(g);
          }
    }
    return c.slice(b, b + v);
  }
  /**
   * firstCallDone is a function that returns a promise that is resolved when the first call to the API is done for each serviceURL whatever api instance is used
   */
  firstCallDone() {
    return new Promise((e) => {
      if (!$.firstCallDoneFlags.has(this.serviceURL))
        $.firstCallDoneFlags.set(this.serviceURL, "loading"), e(!0);
      else {
        const t = () => {
          [void 0, "loading"].includes(
            $.firstCallDoneFlags.get(this.serviceURL)
          ) ? window.requestAnimationFrame(t) : e(!0);
        };
        t();
      }
    });
  }
  async get(e, t) {
    await this.firstCallDone(), this.blockUntilDone && $.firstCallDoneFlags.set(this.serviceURL, "loading");
    const s = /dataProvider\((.*?)\)(.*?)$/;
    if (s.test(e)) {
      const b = e.match(s);
      if (!b) throw new Error("dataProvider path is not valid");
      return await this.localGet(b[1], b[2]);
    }
    const r = {
      apiMethod: "get",
      path: e,
      additionalHeaders: t
    }, n = await this.createHeaders(t), l = this.computeURL(e), c = JSON.stringify({
      url: l,
      headers: n
    });
    if (!$.loadingGetPromises.has(c)) {
      const b = new Promise(async (f) => {
        try {
          const a = await fetch(l, {
            headers: n,
            credentials: this.credentials,
            cache: this.cache
          }), p = await this.handleResult(a, r);
          f(p);
        } catch {
          f(null);
        }
      });
      $.loadingGetPromises.set(c, b);
    }
    const v = await $.loadingGetPromises.get(c);
    return $.loadingGetPromises.delete(c), v;
  }
  /**
   * Création du header, avec authentification si besoin
   * ajout du language via le header accept-language qui contient le langue du navigateur
   */
  async createHeaders(e) {
    await this.auth();
    const t = {};
    return this.token && (t.Authorization = "Bearer " + this.token), t["Accept-Language"] = N.getLanguage(), e && Object.assign(t, e), t;
  }
  /**
   * Concatène le serviceURL et le endpoint donné en paramètre
   */
  computeURL(e, t = {}) {
    let s = "";
    e.startsWith("http") ? s = e : s = this.serviceURL + "/" + e, s.startsWith("http") || (s = window.location.origin + s);
    const r = new URL(s);
    for (const n in t)
      r.searchParams.set(n, t[n]);
    return r.toString().replace(/([^(https?:)])\/{2,}/g, "$1/");
  }
  /*
   * Envoie des données au endPoint passé en paramètre. par défaut en POST
   */
  async send(e, t, s = "POST", r) {
    const n = {
      apiMethod: "send",
      path: e,
      additionalHeaders: r,
      method: s,
      data: t
    }, l = await this.createHeaders(r);
    l.Accept = "application/json", l["Content-Type"] = "application/json";
    const c = await fetch(this.computeURL(e), {
      headers: l,
      credentials: this.credentials,
      method: s,
      body: JSON.stringify(t)
    });
    return await this.handleResult(c, n);
  }
  /**
   * Agit comme une soumission de formulaire, mais attends un json en réponse
   */
  async submitFormData(e, t, s = "POST", r) {
    const n = {
      apiMethod: "submitFormData",
      path: e,
      additionalHeaders: r,
      method: s,
      data: t
    }, l = await this.createHeaders(r);
    l.Accept = "application/json";
    const c = new FormData(), v = t;
    for (const f in v) c.set(f, v[f]);
    const b = await fetch(this.computeURL(e), {
      headers: l,
      credentials: this.credentials,
      method: s,
      body: c
    });
    return await this.handleResult(b, n);
  }
  /**
   * Appel send en utilisant le méthode PUT
   */
  async put(e, t, s) {
    return this.send(e, t, "PUT", s);
  }
  /**
   * Appel send en utilisant le méthode POST
   */
  async post(e, t, s) {
    return this.send(e, t, "POST", s);
  }
  /**
   * Appel send en utilisant le méthode PATCH
   */
  async patch(e, t, s) {
    return this.send(e, t, "PATCH", s);
  }
  /**
   * Appel send en utilisant le méthode delete
   */
  async delete(e, t, s) {
    return this.send(e, t, "delete", s);
  }
};
$.loadingGetPromises = /* @__PURE__ */ new Map(), $.tokens = /* @__PURE__ */ new Map(), $.invalidTokens = [], $.failledTokenUpdates = /* @__PURE__ */ new Map(), $.firstCallDoneFlags = /* @__PURE__ */ new Map();
let Ve = $;
N.getApiConfiguration(
  document.body || document.documentElement
);
function ti(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var be = { exports: {} }, si = be.exports, bt;
function ii() {
  return bt || (bt = 1, (function(i, e) {
    var t = [].slice;
    (function(s, r) {
      return e !== null ? i.exports = r() : s.UrlPattern = r();
    })(si, function() {
      var s, r, n, l, c, v, b, f, a, p, d, w, g, A, m;
      return a = function(o) {
        return o.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      }, b = function(o, u) {
        var h, _, P;
        for (P = [], h = -1, _ = o.length; ++h < _; )
          P = P.concat(u(o[h]));
        return P;
      }, A = function(o, u) {
        var h, _, P;
        for (P = "", h = -1, _ = o.length; ++h < _; )
          P += u(o[h]);
        return P;
      }, g = function(o) {
        return new RegExp(o.toString() + "|").exec("").length - 1;
      }, d = function(o, u) {
        var h, _, P, L, E;
        for (L = {}, h = -1, P = o.length; ++h < P; )
          _ = o[h], E = u[h], E != null && (L[_] != null ? (Array.isArray(L[_]) || (L[_] = [L[_]]), L[_].push(E)) : L[_] = E);
        return L;
      }, s = {}, s.Result = function(o, u) {
        this.value = o, this.rest = u;
      }, s.Tagged = function(o, u) {
        this.tag = o, this.value = u;
      }, s.tag = function(o, u) {
        return function(h) {
          var _, P;
          if (_ = u(h), _ != null)
            return P = new s.Tagged(o, _.value), new s.Result(P, _.rest);
        };
      }, s.regex = function(o) {
        return function(u) {
          var h, _;
          if (h = o.exec(u), h != null)
            return _ = h[0], new s.Result(_, u.slice(_.length));
        };
      }, s.sequence = function() {
        var o;
        return o = 1 <= arguments.length ? t.call(arguments, 0) : [], function(u) {
          var h, _, P, L, E, T;
          for (h = -1, _ = o.length, T = [], L = u; ++h < _; ) {
            if (P = o[h], E = P(L), E == null)
              return;
            T.push(E.value), L = E.rest;
          }
          return new s.Result(T, L);
        };
      }, s.pick = function() {
        var o, u;
        return o = arguments[0], u = 2 <= arguments.length ? t.call(arguments, 1) : [], function(h) {
          var _, P;
          if (P = s.sequence.apply(s, u)(h), P != null)
            return _ = P.value, P.value = _[o], P;
        };
      }, s.string = function(o) {
        var u;
        return u = o.length, function(h) {
          if (h.slice(0, u) === o)
            return new s.Result(o, h.slice(u));
        };
      }, s.lazy = function(o) {
        var u;
        return u = null, function(h) {
          return u == null && (u = o()), u(h);
        };
      }, s.baseMany = function(o, u, h, _, P) {
        var L, E, T, K;
        for (T = P, K = h ? "" : []; !(u != null && (L = u(T), L != null) || (E = o(T), E == null)); )
          h ? K += E.value : K.push(E.value), T = E.rest;
        if (!(_ && K.length === 0))
          return new s.Result(K, T);
      }, s.many1 = function(o) {
        return function(u) {
          return s.baseMany(o, null, !1, !0, u);
        };
      }, s.concatMany1Till = function(o, u) {
        return function(h) {
          return s.baseMany(o, u, !0, !0, h);
        };
      }, s.firstChoice = function() {
        var o;
        return o = 1 <= arguments.length ? t.call(arguments, 0) : [], function(u) {
          var h, _, P, L;
          for (h = -1, _ = o.length; ++h < _; )
            if (P = o[h], L = P(u), L != null)
              return L;
        };
      }, w = function(o) {
        var u;
        return u = {}, u.wildcard = s.tag("wildcard", s.string(o.wildcardChar)), u.optional = s.tag("optional", s.pick(1, s.string(o.optionalSegmentStartChar), s.lazy(function() {
          return u.pattern;
        }), s.string(o.optionalSegmentEndChar))), u.name = s.regex(new RegExp("^[" + o.segmentNameCharset + "]+")), u.named = s.tag("named", s.pick(1, s.string(o.segmentNameStartChar), s.lazy(function() {
          return u.name;
        }))), u.escapedChar = s.pick(1, s.string(o.escapeChar), s.regex(/^./)), u.static = s.tag("static", s.concatMany1Till(s.firstChoice(s.lazy(function() {
          return u.escapedChar;
        }), s.regex(/^./)), s.firstChoice(s.string(o.segmentNameStartChar), s.string(o.optionalSegmentStartChar), s.string(o.optionalSegmentEndChar), u.wildcard))), u.token = s.lazy(function() {
          return s.firstChoice(u.wildcard, u.optional, u.named, u.static);
        }), u.pattern = s.many1(s.lazy(function() {
          return u.token;
        })), u;
      }, f = {
        escapeChar: "\\",
        segmentNameStartChar: ":",
        segmentValueCharset: "a-zA-Z0-9-_~ %",
        segmentNameCharset: "a-zA-Z0-9",
        optionalSegmentStartChar: "(",
        optionalSegmentEndChar: ")",
        wildcardChar: "*"
      }, v = function(o, u) {
        if (Array.isArray(o))
          return A(o, function(h) {
            return v(h, u);
          });
        switch (o.tag) {
          case "wildcard":
            return "(.*?)";
          case "named":
            return "([" + u + "]+)";
          case "static":
            return a(o.value);
          case "optional":
            return "(?:" + v(o.value, u) + ")?";
        }
      }, c = function(o, u) {
        return u == null && (u = f.segmentValueCharset), "^" + v(o, u) + "$";
      }, l = function(o) {
        if (Array.isArray(o))
          return b(o, l);
        switch (o.tag) {
          case "wildcard":
            return ["_"];
          case "named":
            return [o.value];
          case "static":
            return [];
          case "optional":
            return l(o.value);
        }
      }, p = function(o, u, h, _) {
        var P, L, E, T;
        if (_ == null && (_ = !1), T = o[u], T == null) {
          if (_)
            throw new Error("no values provided for key `" + u + "`");
          return;
        }
        if (P = h[u] || 0, L = Array.isArray(T) ? T.length - 1 : 0, P > L) {
          if (_)
            throw new Error("too few values provided for key `" + u + "`");
          return;
        }
        return E = Array.isArray(T) ? T[P] : T, _ && (h[u] = P + 1), E;
      }, n = function(o, u, h) {
        var _, P;
        if (Array.isArray(o)) {
          for (_ = -1, P = o.length; ++_ < P; )
            if (n(o[_], u, h))
              return !0;
          return !1;
        }
        switch (o.tag) {
          case "wildcard":
            return p(u, "_", h, !1) != null;
          case "named":
            return p(u, o.value, h, !1) != null;
          case "static":
            return !1;
          case "optional":
            return n(o.value, u, h);
        }
      }, m = function(o, u, h) {
        if (Array.isArray(o))
          return A(o, function(_) {
            return m(_, u, h);
          });
        switch (o.tag) {
          case "wildcard":
            return p(u, "_", h, !0);
          case "named":
            return p(u, o.value, h, !0);
          case "static":
            return o.value;
          case "optional":
            return n(o.value, u, h) ? m(o.value, u, h) : "";
        }
      }, r = function(o, u) {
        var h, _, P, L, E;
        if (o instanceof r) {
          this.isRegex = o.isRegex, this.regex = o.regex, this.ast = o.ast, this.names = o.names;
          return;
        }
        if (this.isRegex = o instanceof RegExp, !(typeof o == "string" || this.isRegex))
          throw new TypeError("argument must be a regex or a string");
        if (this.isRegex) {
          if (this.regex = o, u != null) {
            if (!Array.isArray(u))
              throw new Error("if first argument is a regex the second argument may be an array of group names but you provided something else");
            if (h = g(this.regex), u.length !== h)
              throw new Error("regex contains " + h + " groups but array of group names contains " + u.length);
            this.names = u;
          }
          return;
        }
        if (o === "")
          throw new Error("argument must not be the empty string");
        if (E = o.replace(/\s+/g, ""), E !== o)
          throw new Error("argument must not contain whitespace");
        if (_ = {
          escapeChar: u?.escapeChar || f.escapeChar,
          segmentNameStartChar: u?.segmentNameStartChar || f.segmentNameStartChar,
          segmentNameCharset: u?.segmentNameCharset || f.segmentNameCharset,
          segmentValueCharset: u?.segmentValueCharset || f.segmentValueCharset,
          optionalSegmentStartChar: u?.optionalSegmentStartChar || f.optionalSegmentStartChar,
          optionalSegmentEndChar: u?.optionalSegmentEndChar || f.optionalSegmentEndChar,
          wildcardChar: u?.wildcardChar || f.wildcardChar
        }, L = w(_), P = L.pattern(o), P == null)
          throw new Error("couldn't parse pattern");
        if (P.rest !== "")
          throw new Error("could only partially parse pattern");
        this.ast = P.value, this.regex = new RegExp(c(this.ast, _.segmentValueCharset)), this.names = l(this.ast);
      }, r.prototype.match = function(o) {
        var u, h;
        return h = this.regex.exec(o), h == null ? null : (u = h.slice(1), this.names ? d(this.names, u) : u);
      }, r.prototype.stringify = function(o) {
        if (o == null && (o = {}), this.isRegex)
          throw new Error("can't stringify patterns generated from a regex");
        if (o !== Object(o))
          throw new Error("argument must be an object or undefined");
        return m(this.ast, o, {});
      }, r.escapeForRegex = a, r.concatMap = b, r.stringConcatMap = A, r.regexGroupCount = g, r.keysAndValuesToObject = d, r.P = s, r.newParser = w, r.defaultOptions = f, r.astNodeToRegexString = c, r.astNodeToNames = l, r.getParam = p, r.astNodeContainsSegmentsForProvidedParams = n, r.stringify = m, r;
    });
  })(be, be.exports)), be.exports;
}
var ri = ii();
const ni = /* @__PURE__ */ ti(ri), ai = qs, oi = ei, li = ze, ci = je, hi = N, ui = ae, di = le, fi = Ae, Ne = U, pi = Ve, bi = ni;
window["concorde-utils"] = window["concorde-utils"] || {};
window["concorde-utils"] = {
  Utils: ai,
  Arrays: oi,
  DataBindObserver: li,
  Format: ci,
  HTML: hi,
  LocationHandler: ui,
  Objects: di,
  PublisherProxy: fi,
  PublisherManager: Ne,
  api: pi,
  URLPattern: bi
};
var gi = Object.create, Ze = Object.defineProperty, vi = Object.getOwnPropertyDescriptor, qt = (i, e) => (e = Symbol[i]) ? e : Symbol.for("Symbol." + i), Ce = (i) => {
  throw TypeError(i);
}, mi = (i, e, t) => e in i ? Ze(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, gt = (i, e) => Ze(i, "name", { value: e, configurable: !0 }), _i = (i) => [, , , gi(i?.[qt("metadata")] ?? null)], jt = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], ge = (i) => i !== void 0 && typeof i != "function" ? Ce("Function expected") : i, yi = (i, e, t, s, r) => ({ kind: jt[i], name: e, metadata: s, addInitializer: (n) => t._ ? Ce("Already initialized") : r.push(ge(n || null)) }), Ht = (i, e) => mi(e, qt("metadata"), i[3]), ce = (i, e, t, s) => {
  for (var r = 0, n = i[e >> 1], l = n && n.length; r < l; r++) e & 1 ? n[r].call(t) : s = n[r].call(t, s);
  return s;
}, fe = (i, e, t, s, r, n) => {
  var l, c, v, b, f, a = e & 7, p = !!(e & 8), d = !!(e & 16), w = a > 3 ? i.length + 1 : a ? p ? 1 : 2 : 0, g = jt[a + 5], A = a > 3 && (i[w - 1] = []), m = i[w] || (i[w] = []), o = a && (!d && !p && (r = r.prototype), a < 5 && (a > 3 || !d) && vi(a < 4 ? r : { get [t]() {
    return vt(this, n);
  }, set [t](h) {
    return mt(this, n, h);
  } }, t));
  a ? d && a < 4 && gt(n, (a > 2 ? "set " : a > 1 ? "get " : "") + t) : gt(r, t);
  for (var u = s.length - 1; u >= 0; u--)
    b = yi(a, t, v = {}, i[3], m), a && (b.static = p, b.private = d, f = b.access = { has: d ? (h) => wi(r, h) : (h) => t in h }, a ^ 3 && (f.get = d ? (h) => (a ^ 1 ? vt : ki)(h, r, a ^ 4 ? n : o.get) : (h) => h[t]), a > 2 && (f.set = d ? (h, _) => mt(h, r, _, a ^ 4 ? n : o.set) : (h, _) => h[t] = _)), c = (0, s[u])(a ? a < 4 ? d ? n : o[g] : a > 4 ? void 0 : { get: o.get, set: o.set } : r, b), v._ = 1, a ^ 4 || c === void 0 ? ge(c) && (a > 4 ? A.unshift(c) : a ? d ? n = c : o[g] = c : r = c) : typeof c != "object" || c === null ? Ce("Object expected") : (ge(l = c.get) && (o.get = l), ge(l = c.set) && (o.set = l), ge(l = c.init) && A.unshift(l));
  return a || Ht(i, r), o && Ze(r, t, o), d ? a ^ 4 ? n : o : r;
}, Qe = (i, e, t) => e.has(i) || Ce("Cannot " + t), wi = (i, e) => Object(e) !== e ? Ce('Cannot use the "in" operator on this value') : i.has(e), vt = (i, e, t) => (Qe(i, e, "read from private field"), t ? t.call(i) : e.get(i)), mt = (i, e, t, s) => (Qe(i, e, "write to private field"), s ? s.call(i, t) : e.set(i, t), t), ki = (i, e, t) => (Qe(i, e, "access private method"), t);
const Ai = (i) => {
  var e, t, s, r, n, l, c;
  class v extends (l = i, n = [k()], r = [k()], s = [k({ type: Boolean })], t = [k({ type: Boolean })], e = [k()], l) {
    constructor() {
      super(...arguments), ce(c, 5, this), this._value = "", this.forceAutoFill = ce(c, 8, this, !1), ce(c, 11, this), this.unique = ce(c, 12, this, null), ce(c, 15, this), this.radio = ce(c, 16, this, null), ce(c, 19, this), this._checked = null, this.updateAllChecked = () => {
        const f = this.getAttribute("name"), a = this.getCheckAllPublisher(), p = this.getFormPublisher();
        if (a?.hasCheckAll.get() && !this.checksAll() && a && p && f) {
          if (this.getFormPublisherValue()?.length)
            (this.checked === null || a.checkMode.get() == "noneChecked" || a.checkMode.get() == null) && (a.checkMode = "someUnchecked");
          else {
            a.checkMode = "noneChecked";
            return;
          }
          const d = this.getFormPublisherValue(), w = a.values.get();
          if (w && w.length) {
            let g = w.length;
            for (const A of w)
              d.indexOf(A) == -1 && (g -= 1);
            g == w.length && (a.checkMode = "allChecked"), g == 0 && (a.checkMode = "noneChecked");
          }
          w.indexOf(this.value) == -1 && this.unsetOnDisconnect() && (this.checked = null);
        }
      }, this.onChecksAllRequest = (f) => {
        this.removeAttribute("allChecked"), this.removeAttribute("indeterminate"), f == "allChecked" && (this.checked = !0, this.setAttribute("allChecked", "")), f == "noneChecked" && (this.checked = null), f == "someUnchecked" && (this.checksAll() && (this.checked = "indeterminate"), this.setAttribute("indeterminate", ""));
      };
    }
    get value() {
      return this._value;
    }
    set value(f) {
      if (this.value == f || (this.hasAttribute("value") && !this.forceAutoFill && (f = this.getAttribute("value")), this._value == f) || f == null || (this._value = f, !this.value)) return;
      if (this.getFormPublisher() && this.name) {
        let p = this.getFormPublisherValue();
        (this.radio || this.unique) && (this.checked = p == f ? !0 : null), Array.isArray(p) || (p = []), p.indexOf(f) != -1 && (this.checked = !0);
      }
      this.checked == !0 && this.updateDataValue(), this.requestUpdate();
    }
    get checked() {
      return this._checked;
    }
    set checked(f) {
      if (this.setCheckedValue(f), this.checksAll()) {
        const a = this.getCheckAllPublisher();
        a && (this.checked === !0 ? a.checkMode = "allChecked" : this.checked === null && (a.checkMode = "noneChecked", this.getFormPublisher() && this.setFormPublisherValue([])));
      }
      this.requestUpdate();
    }
    validateFormElement() {
      const f = this.shadowRoot?.querySelector(
        "input"
      );
      if (!f || f.checkValidity()) return;
      const a = this.getFormPublisher();
      if (a) {
        const p = this.getFormPublisherValue();
        if ((this.unique || this.radio) && p !== null && p !== void 0 && p.toString().length > 0)
          return;
        a.isFormValid = !1, f.reportValidity();
      }
    }
    checksAll() {
      return this.hasAttribute("checksAll");
    }
    setCheckedValue(f) {
      this._checked != f && (this._checked = f, this.updateDataValue(), this.requestUpdate(), setTimeout(() => this.updateAllChecked(), 1));
    }
    handleChange() {
      const f = this.checked === !0 ? this.radio ? !0 : null : !0;
      this.checked = f;
      const a = new Event("change");
      this.dispatchEvent(a);
    }
    /**
     * Voir la mixin FormElement
     * Le comportement est ici modifié fonction de son mode (checkbox, radio, unique)
     */
    getValueForFormPublisher() {
      let f = this.getFormPublisherValue();
      if (this.radio)
        return this.checked === !0 && this.value != null ? this.value : f;
      if (this.unique)
        return this.checked === !0 && this.value != null ? this.value : null;
      Array.isArray(f) || (f = []);
      const a = f.slice(0), p = a.indexOf(this.value);
      return this.checked === !0 && p === -1 && !this.checksAll() && a.push(this.value), this.checked === null && p !== -1 && a.splice(p, 1), a;
    }
    /**
     * Voir la mixin FormElement
     * Le comportement est modifié de la manière suivante :
     * L'état du composant (checked) est mis à jour en fonction de la valeur fournie par le publisher associé au composant / en fonction de sont mode (radio, unique)
     */
    setFormValueFromPublisher(f) {
      if (this.unique || this.radio) {
        this.checked = this.value == f ? !0 : null;
        return;
      }
      Array.isArray(f) || (f = []), !this.checksAll() && (this.checked = f.indexOf(this.value) !== -1 ? !0 : null);
    }
    getCheckAllPublisher() {
      this.formDataProvider || (this.formDataProvider = this.getAncestorAttributeValue("formDataProvider"));
      const f = this.formDataProvider, a = this.getAttribute("name");
      return !f || !a ? null : Ne.get(
        f + "/" + a + "/_available_values_"
      );
    }
    unset() {
      this.checked = null;
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      const f = this.getCheckAllPublisher();
      if (f && (f.checkMode.offAssign(this.onChecksAllRequest), !this.checksAll())) {
        const a = f.values.get().slice(0), p = a.indexOf(this.value);
        p != -1 && (a.splice(p, 1), f.values = a);
      }
      setTimeout(() => this.updateAllChecked(), 1);
    }
    connectedCallback() {
      if (super.connectedCallback(), this.getFormPublisher() && this.name) {
        const p = this.getFormPublisherValue();
        p && Array.isArray(p) && p.indexOf(this.value) !== -1 && (this.checked = !0);
      }
      const a = this.getCheckAllPublisher();
      a && (a.checkMode.onAssign(this.onChecksAllRequest), this.checksAll() && (a.hasCheckAll = !0), a.values.get() || (a.values = []), this.checksAll() || (a.values = [
        ...a.values.get(),
        this.value
      ])), this.hasAttribute("checked") && (!this.publisher || this.publisher.get().checked !== !1) && setTimeout(() => this.checked = !0, 1);
    }
  }
  return c = _i(l), fe(c, 2, "value", n, v), fe(c, 2, "checked", e, v), fe(c, 5, "forceAutoFill", r, v), fe(c, 5, "unique", s, v), fe(c, 5, "radio", t, v), Ht(c, v), v;
};
function Gt(i) {
  if (typeof i == "function") {
    const e = i;
    return U.collectModifiedPublisher(), e(), U.getModifiedPublishers() || /* @__PURE__ */ new Set();
  }
  if (typeof i == "string") {
    const e = i.split("."), t = e.shift() || "";
    let s = U.get(t);
    s = le.traverse(s, e);
    const r = /* @__PURE__ */ new Set();
    return r.add(s), r;
  }
  return /* @__PURE__ */ new Set([i]);
}
class Pi extends Rt {
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  constructor(e) {
    super(e), this.observables = /* @__PURE__ */ new Set(), this.onAssign = (t) => {
      this.setValue(t);
    }, this.node = e.options?.host;
  }
  unsubscribe() {
    this.observables.forEach(
      (e) => e.offAssign(this.onAssign)
    );
  }
  /* eslint-enable @typescript-eslint/no-explicit-any*/
  render(e) {
    return this.observable !== e && (this.observable = e, this.isConnected && this.subscribe(e)), Tt;
  }
  // Subscribes to the observable, calling the directive's asynchronous
  // setValue API each time the value changes
  subscribe(e) {
    this.unsubscribe(), typeof e == "function" ? this.onAssign = () => {
      this.setValue(e());
    } : this.onAssign = (t) => {
      this.setValue(t);
    }, this.observables = Gt(e), this.observables.forEach((t) => {
      t.onAssign(this.onAssign);
    });
  }
  // When the directive is disconnected from the DOM, unsubscribe to ensure
  // the directive instance can be garbage collected
  disconnected() {
    this.unsubscribe();
  }
  // If the subtree the directive is in was disconnected and subsequently
  // re-connected, re-subscribe to make the directive operable again
  reconnected() {
    this.observable && this.subscribe(this.observable);
  }
}
Ut(Pi);
const xi = (i, e) => {
  const t = Gt(i).values().next().value;
  if (e !== void 0 && t) {
    const s = t.get();
    le.isEmpty(s) && t.set(e);
  }
  return t;
}, Si = xi, He = /* @__PURE__ */ new Map(), _t = (i) => {
  if (!i) return null;
  const e = N.getApiConfiguration(i), t = N.getAncestorAttributeValue(
    i,
    "wordingProvider"
  ), s = N.getAncestorAttributeValue(
    i,
    "wordingVersionProvider"
  ), r = {
    apiConfiguration: e,
    wordingProvider: t,
    wordingVersionProvider: s
  };
  let n = null;
  for (const [l, c] of He)
    if (le.deepEqual(l, r)) {
      n = c;
      break;
    }
  return n || (n = {
    api: new Ve(e),
    keysToTranslate: /* @__PURE__ */ new Set(),
    translatedKeys: /* @__PURE__ */ new Set(),
    wordingProvider: t,
    callIndex: 0,
    wordingVersionProvider: s,
    apiCallKey: r
  }, He.set(r, n)), n;
}, yt = "", D = class D extends Rt {
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  constructor(e) {
    super(e), this.useUnsafeHTML = !1, this.onAssign = (t) => {
      const s = this.useUnsafeHTML ? zs(t) : t;
      this.setValue(s);
    }, this.node = e.options.host;
  }
  unsubscribe() {
    D.publisher["wording_" + this.key].offAssign(this.onAssign);
  }
  /* eslint-enable @typescript-eslint/no-explicit-any*/
  render(e, t = !1) {
    return this.useUnsafeHTML = t, this.key !== e && (this.key = e, this.isConnected && this.subscribe(e)), Tt;
  }
  static async callApi(e, t, s = !0, r) {
    if (await U.getInstance().isLocalStrorageReady, D.firstCall) {
      D.firstCall = !1, Bs(D.reloadWordings);
      const f = Object.keys(D.publisher.get());
      for (const a of f)
        D.publisher.get()[a] === yt && delete D.publisher[a];
    }
    if (e) {
      const f = N.getAncestorAttributeValue(
        e,
        "wordingVersionProvider"
      );
      f && Si(f).onAssign(
        D.handleVersionProvider(e)
      );
    }
    let n = D.publisher.get()["wording_" + t] != null;
    const l = r || _t(e);
    if (!l) return;
    if (n && t !== "") {
      l.translatedKeys.add(t);
      return;
    }
    l.callIndex++;
    const c = l.callIndex, v = l.wordingProvider ?? "";
    if (!v && s) {
      window.setTimeout(async () => {
        D.callApi(null, t, !1, l);
      }, 1e3);
      return;
    }
    const b = l.api;
    window.queueMicrotask(async () => {
      if (n = D.publisher["wording_" + t].get() != null, !n && t !== "" && (l.keysToTranslate.add(t), D.publisher["wording_" + t] = yt), c !== l.callIndex) return;
      const f = Array.from(l.keysToTranslate);
      if (!f.length) return;
      const a = v.split("?"), p = a.shift(), d = (a.length > 0 ? a.join("?") + "&" : "") + "labels[]=" + f.join("&labels[]="), w = p + "?" + d;
      l.translatedKeys = /* @__PURE__ */ new Set([
        ...l.translatedKeys,
        ...l.keysToTranslate
      ]), l.keysToTranslate.clear();
      const g = await b.get(w);
      for (const A in g)
        D.publisher["wording_" + A] = g[A];
    });
  }
  static reloadWordings() {
    for (const e of He.values())
      e.keysToTranslate = new Set(e.translatedKeys), e.keysToTranslate.size > 0 && D.callApi(null, "", !1, e);
  }
  //check if the wording version has changed
  static handleVersionProvider(e) {
    const t = _t(e), s = (n) => {
    };
    if (!t) return s;
    if (D.versionProviderHandlers.has(t))
      return D.versionProviderHandlers.get(t) || s;
    const r = function(n) {
      if (!t.wordingVersionProvider) return;
      const c = D.publisher.get().__wording_versions__ ?? [];
      if (n == null) return;
      const v = c.find(
        (b) => b.serviceURL === t.api.serviceURL
      ) || {
        serviceURL: t.api.serviceURL,
        version: 0
      };
      c.includes(v) || c.push(v), n !== v.version && (v.version = n, D.publisher.set({ __wording_versions__: c }), D.reloadWordings());
    };
    return D.versionProviderHandlers.set(
      t,
      r
    ), r;
  }
  // Subscribes to the key, calling the directive's asynchronous
  // setValue API each time the value changes
  subscribe(e) {
    this.unsubscribe(), D.publisher["wording_" + e].onAssign(this.onAssign), D.callApi(this.node, e);
  }
  // When the directive is disconnected from the DOM, unsubscribe to ensure
  // the directive instance can be garbage collected
  disconnected() {
    this.unsubscribe();
  }
  // If the subtree the directive is in was disconnected and subsequently
  // re-connected, re-subscribe to make the directive operable again
  reconnected() {
    this.key && this.subscribe(this.key);
  }
};
D.publisher = U.get("sonic-wording", {
  localStorageMode: "enabled"
}), D.firstCall = !0, D.versionProviderHandlers = /* @__PURE__ */ new Map();
let ue = D;
Ut(ue);
var Ci = Object.create, et = Object.defineProperty, Li = Object.getOwnPropertyDescriptor, Wt = (i, e) => (e = Symbol[i]) ? e : Symbol.for("Symbol." + i), Le = (i) => {
  throw TypeError(i);
}, Fi = (i, e, t) => e in i ? et(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, wt = (i, e) => et(i, "name", { value: e, configurable: !0 }), $i = (i) => [, , , Ci(i?.[Wt("metadata")] ?? null)], Yt = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], ve = (i) => i !== void 0 && typeof i != "function" ? Le("Function expected") : i, Di = (i, e, t, s, r) => ({ kind: Yt[i], name: e, metadata: s, addInitializer: (n) => t._ ? Le("Already initialized") : r.push(ve(n || null)) }), Xt = (i, e) => Fi(e, Wt("metadata"), i[3]), I = (i, e, t, s) => {
  for (var r = 0, n = i[e >> 1], l = n && n.length; r < l; r++) e & 1 ? n[r].call(t) : s = n[r].call(t, s);
  return s;
}, Y = (i, e, t, s, r, n) => {
  var l, c, v, b, f, a = e & 7, p = !!(e & 8), d = !!(e & 16), w = a > 3 ? i.length + 1 : a ? p ? 1 : 2 : 0, g = Yt[a + 5], A = a > 3 && (i[w - 1] = []), m = i[w] || (i[w] = []), o = a && (!d && !p && (r = r.prototype), a < 5 && (a > 3 || !d) && Li(a < 4 ? r : { get [t]() {
    return kt(this, n);
  }, set [t](h) {
    return At(this, n, h);
  } }, t));
  a ? d && a < 4 && wt(n, (a > 2 ? "set " : a > 1 ? "get " : "") + t) : wt(r, t);
  for (var u = s.length - 1; u >= 0; u--)
    b = Di(a, t, v = {}, i[3], m), a && (b.static = p, b.private = d, f = b.access = { has: d ? (h) => Oi(r, h) : (h) => t in h }, a ^ 3 && (f.get = d ? (h) => (a ^ 1 ? kt : Ei)(h, r, a ^ 4 ? n : o.get) : (h) => h[t]), a > 2 && (f.set = d ? (h, _) => At(h, r, _, a ^ 4 ? n : o.set) : (h, _) => h[t] = _)), c = (0, s[u])(a ? a < 4 ? d ? n : o[g] : a > 4 ? void 0 : { get: o.get, set: o.set } : r, b), v._ = 1, a ^ 4 || c === void 0 ? ve(c) && (a > 4 ? A.unshift(c) : a ? d ? n = c : o[g] = c : r = c) : typeof c != "object" || c === null ? Le("Object expected") : (ve(l = c.get) && (o.get = l), ve(l = c.set) && (o.set = l), ve(l = c.init) && A.unshift(l));
  return a || Xt(i, r), o && et(r, t, o), d ? a ^ 4 ? n : o : r;
}, tt = (i, e, t) => e.has(i) || Le("Cannot " + t), Oi = (i, e) => Object(e) !== e ? Le('Cannot use the "in" operator on this value') : i.has(e), kt = (i, e, t) => (tt(i, e, "read from private field"), t ? t.call(i) : e.get(i)), At = (i, e, t, s) => (tt(i, e, "write to private field"), s ? s.call(i, t) : e.set(i, t), t), Ei = (i, e, t) => (tt(i, e, "access private method"), t);
let Ie = !1, qe = /* @__PURE__ */ new Set();
const Ti = (i, e) => {
  var t, s, r, n, l, c, v, b, f, a, p, d;
  const w = class Ge extends (p = i, a = [k({ type: Number })], f = [k({ type: Boolean })], b = [k({ type: Boolean })], v = [k({ type: Boolean })], c = [k({ type: Object })], l = [k({ type: String, attribute: "data-title" })], n = [k({ reflect: !0 })], r = [k()], s = [k()], t = [q()], p) {
    constructor(...m) {
      super(), I(d, 5, this), this.publisher = void 0, this.collectDependenciesVersion = I(d, 8, this, 0), I(d, 11, this), this.displayContents = I(d, 12, this, !1), I(d, 15, this), this.noAutoFill = I(d, 16, this, !1), I(d, 19, this), this.forceAutoFill = I(d, 20, this, !1), I(d, 23, this), this.renderOnPropsInternalChange = !1, this.noShadowDom = null, this.propertyMap = I(d, 24, this, null), I(d, 27, this), this.title = I(d, 28, this, ""), I(d, 31, this), this.dataProvider = I(d, 32, this, null), I(d, 35, this), this.bindPublisher = I(d, 36, this, null), I(d, 39, this), this._props = null, this.shouldRenderLazy = I(d, 40, this, !0), I(d, 43, this), this.defferedDebug = null, this.debug = null, this.onAssign = (o) => {
        this.props = o;
      };
    }
    /**
     * va de parent en parent pour trouver un attribut
     * @param attributeName nom de l'attribut
     * @returns true si l'attribut est trouvé
     */
    hasAncestorAttribute(m) {
      return this.getAncestorAttributeValue(m) != null;
    }
    /**
     * Va de parent en parent pour trouver un attribut
     * @param attributeName nom de l'attribut
     * @returns valeur de l'attribut ou null si l'attribut n'est pas trouvé
     */
    getAncestorAttributeValue(m) {
      return N.getAncestorAttributeValue(this, m);
    }
    get props() {
      return this._props !== null || !this.publisher ? this._props : this.publisher.get();
    }
    set props(m) {
      typeof m == "string" && ["{", "["].includes(m.trim().charAt(0)) && (m = JSON.parse(m)), m != this._props && (this._props = m, this.publisher && this.publisher.get() != m && this.publisher.set(m), this.requestUpdate());
    }
    updated(m) {
      super.updated(m);
      const u = [...(this.shadowRoot || this).children].filter(
        (_) => _.tagName != "STYLE"
      ), h = this.displayContents ? "contents" : u.length == 0 ? "none" : null;
      h ? this.style.display = h : this.style.removeProperty("display");
    }
    connectedCallback() {
      if (Ge.instanceCounter++, this.hasAttribute("lazyRendering")) {
        const m = {
          root: null,
          // rootMargin: Math.max(window.innerWidth, window.innerHeight) + "px",
          threshold: 0.9
        };
        let o = !0;
        const u = new IntersectionObserver((h) => {
          for (const _ of h)
            if (o && _.isIntersecting) {
              o = !1, u.disconnect(), this.initWording(), this.shouldRenderLazy = !1, this.startPublisher();
              break;
            }
        }, m);
        u.observe(this);
      } else
        this.initWording(), this.shouldRenderLazy = !1;
      this.initPublisher(), this.addDebugger(), super.connectedCallback();
    }
    disconnectedCallback() {
      this.removeDebugger(), super.disconnectedCallback(), this.publisher && (this.publisher.stopTemplateFilling(this), this.publisher.offInternalMutation(this.requestUpdate)), ue.publisher.stopTemplateFilling(this), this.onAssign && this.publisher?.offAssign(this.onAssign);
    }
    addDebugger() {
      if (this.hasAttribute("debug") && !this.defferedDebug) {
        if (!this.debug) {
          this.debug = document.createElement("div");
          const m = this.debug.style;
          m.position = "fixed", m.top = "0", m.right = "0", m.margin = "auto", m.borderRadius = ".7rem", m.backgroundColor = "#0f1729", m.color = "#c5d4f9", m.padding = "16px 16px", m.margin = "16px 16px", m.boxShadow = "0 10px 30px -18px rgba(0,0,0,.3)", m.overflowY = "auto", m.zIndex = "99999999", m.maxHeight = "calc(100vh - 32px)", m.fontFamily = "Consolas, monospace", m.maxWidth = "min(50vw,25rem)", m.fontSize = "12px", m.minWidth = "300px", m.overflowWrap = "break-word", m.resize = "vertical";
        }
        this.addEventListener("click", (m) => {
          m.ctrlKey && (m.preventDefault(), Ie = !Ie);
        }), this.dataProvider && (window[this.dataProvider] = this.publisher), this.addEventListener("mouseover", () => {
          Ie || this.removeDebugger(), document.body.appendChild(this.debug), qe.add(this.debug);
        }), this.addEventListener("mouseout", () => {
          Ie || this.removeDebugger();
        }), this.publisher?.onInternalMutation(() => {
          this.debug.innerHTML = `🤖 DataProvider : "<b style="font-weight:bold;color:#fff;">${this.dataProvider}</b>"<br>
          <div style="font-size:10px;border-top:1px dashed;margin-top:5px;padding-left:23px;opacity:.6;padding-top:5px;">
            Variable disponible dans la console<br>
            ctrl + Clique : épingler / désépingler
           </div>
          <pre style="margin-top:10px;background:transparent;padding:0;font-size:inherit;color:inherit;">${JSON.stringify(
            this.publisher?.get(),
            null,
            "  "
          )}</pre>`;
        });
      }
    }
    removeDebugger() {
      qe.forEach((m) => {
        document.body.contains(m) && document.body.removeChild(m);
      }), qe = /* @__PURE__ */ new Set();
    }
    /**
     * Petite fonction utilitaire pour retourner la configuration a passer à l'utilitaire API
     * Utilisée pour la configuration du wording / de la traduction ainsi que par le mixin fetcher par exemple
     * A voir si on le bouge dans un utilitaire
     */
    getApiConfiguration() {
      return N.getApiConfiguration(this);
    }
    /**
     * Initialise le remplisage automatique des traductions / du wording
     * Un publisher spécifique est créé pour le composant à l'adresse "sonic-wording"
     * Le composant recherche la valeur de l'attribute "wordingProvider" que contient le point d'accès à l'api de traduction / libellés
     * Il utilise ce service et le publisher créé pour remplir automatiquement toutes les propriétés préfixées avec "wording_".
     */
    async initWording() {
      const m = Object.getOwnPropertyNames(this.constructor.prototype);
      for (const o of m)
        o.indexOf("wording_") == 0 && ue.callApi(this, o.substring(8));
      ue.publisher.startTemplateFilling(this);
    }
    /**
     *
     * Fonction native de lit surchargée pour la gestion du mode noShadowDom
     * Le comportement de data binding est également créé ici va l'utilitaire DataBindObserver
     */
    createRenderRoot() {
      if (this.noShadowDom === "" || this.getAttribute("noShadowDom") === "")
        return this;
      const m = super.createRenderRoot();
      return ze.observe(m), m;
    }
    initPublisher() {
      if (!document) return;
      this.publisher && (this.publisher.stopTemplateFilling(this), this.publisher.offInternalMutation(this.requestUpdate), this.onAssign && this.publisher.offAssign(this.onAssign));
      const m = U.getInstance();
      this.dataProvider || (this.dataProvider = this.getAncestorAttributeValue("dataProvider"));
      let o = this.dataProvider;
      if (!o && this._props && (this.dataProvider = o = "__subscriber__" + Ge.instanceCounter), o) {
        this.bindPublisher && m.set(o, this.bindPublisher());
        let u = m.get(o, {
          localStorageMode: this.getAttribute("localStorage") || "disabled",
          invalidateOnPageShow: this.hasAttribute("invalidateOnPageShow")
        });
        if (this.dataProvider = o, this.hasAttribute("subDataProvider")) {
          const h = this.getAttribute(
            "subDataProvider"
          );
          this.dataProvider = o + "/" + h, u = le.traverse(u, h.split(".")), m.set(this.dataProvider, u), this.publisher = u;
        }
        this.publisher = u;
      }
      this.hasAttribute("lazyRendering") || this.startPublisher();
    }
    startPublisher() {
      this.publisher && (this._props && this.publisher.set(this._props), this.noAutoFill || this.publisher.startTemplateFilling(this), this.renderOnPropsInternalChange && this.publisher.onInternalMutation(this.requestUpdate), this.publisher.onAssign(this.onAssign));
    }
  };
  return d = $i(p), Y(d, 2, "props", s, w), Y(d, 5, "collectDependenciesVersion", a, w), Y(d, 5, "displayContents", f, w), Y(d, 5, "noAutoFill", b, w), Y(d, 5, "forceAutoFill", v, w), Y(d, 5, "propertyMap", c, w), Y(d, 5, "title", l, w), Y(d, 5, "dataProvider", n, w), Y(d, 5, "bindPublisher", r, w), Y(d, 5, "shouldRenderLazy", t, w), Xt(d, w), w.instanceCounter = 0, w;
}, Ri = B`
  /*SIZES*/
  :host {
    --sc-_fs: 1rem;
    --sc-_lh: 1.15;
    font-size: var(--sc-_fs);
    line-height: var(--sc-_lh);
  }

  :host([size="2xs"]) {
    --sc-_fs: 0.625rem;
  }
  :host([size="xs"]) {
    --sc-_fs: 0.75rem;
  }
  :host([size="sm"]) {
    --sc-_fs: 0.875rem;
  }
  :host([size="md"]) {
    --sc-_fs: 1rem;
  }
  :host([size="lg"]) {
    --sc-_fs: 1.125rem;
  }
  :host([size="xl"]) {
    --sc-_fs: 1.25rem;
  }
  :host([size="2xl"]) {
    --sc-_fs: 1.5rem;
  }
  :host([size="inherit"]) {
    --sc-_fs: 1em;
  }
`;
var Ui = Object.create, st = Object.defineProperty, Ii = Object.getOwnPropertyDescriptor, Jt = (i, e) => (e = Symbol[i]) ? e : Symbol.for("Symbol." + i), Fe = (i) => {
  throw TypeError(i);
}, Mi = (i, e, t) => e in i ? st(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Pt = (i, e) => st(i, "name", { value: e, configurable: !0 }), Vi = (i) => [, , , Ui(i?.[Jt("metadata")] ?? null)], Kt = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], me = (i) => i !== void 0 && typeof i != "function" ? Fe("Function expected") : i, zi = (i, e, t, s, r) => ({ kind: Kt[i], name: e, metadata: s, addInitializer: (n) => t._ ? Fe("Already initialized") : r.push(me(n || null)) }), Ni = (i, e) => Mi(e, Jt("metadata"), i[3]), x = (i, e, t, s) => {
  for (var r = 0, n = i[e >> 1], l = n && n.length; r < l; r++) e & 1 ? n[r].call(t) : s = n[r].call(t, s);
  return s;
}, O = (i, e, t, s, r, n) => {
  var l, c, v, b, f, a = e & 7, p = !!(e & 8), d = !!(e & 16), w = a > 3 ? i.length + 1 : a ? p ? 1 : 2 : 0, g = Kt[a + 5], A = a > 3 && (i[w - 1] = []), m = i[w] || (i[w] = []), o = a && (!d && !p && (r = r.prototype), a < 5 && (a > 3 || !d) && Ii(a < 4 ? r : { get [t]() {
    return xt(this, n);
  }, set [t](h) {
    return St(this, n, h);
  } }, t));
  a ? d && a < 4 && Pt(n, (a > 2 ? "set " : a > 1 ? "get " : "") + t) : Pt(r, t);
  for (var u = s.length - 1; u >= 0; u--)
    b = zi(a, t, v = {}, i[3], m), a && (b.static = p, b.private = d, f = b.access = { has: d ? (h) => Bi(r, h) : (h) => t in h }, a ^ 3 && (f.get = d ? (h) => (a ^ 1 ? xt : qi)(h, r, a ^ 4 ? n : o.get) : (h) => h[t]), a > 2 && (f.set = d ? (h, _) => St(h, r, _, a ^ 4 ? n : o.set) : (h, _) => h[t] = _)), c = (0, s[u])(a ? a < 4 ? d ? n : o[g] : a > 4 ? void 0 : { get: o.get, set: o.set } : r, b), v._ = 1, a ^ 4 || c === void 0 ? me(c) && (a > 4 ? A.unshift(c) : a ? d ? n = c : o[g] = c : r = c) : typeof c != "object" || c === null ? Fe("Object expected") : (me(l = c.get) && (o.get = l), me(l = c.set) && (o.set = l), me(l = c.init) && A.unshift(l));
  return a || Ni(i, r), o && st(r, t, o), d ? a ^ 4 ? n : o : r;
}, it = (i, e, t) => e.has(i) || Fe("Cannot " + t), Bi = (i, e) => Object(e) !== e ? Fe('Cannot use the "in" operator on this value') : i.has(e), xt = (i, e, t) => (it(i, e, "read from private field"), t ? t.call(i) : e.get(i)), St = (i, e, t, s) => (it(i, e, "write to private field"), s ? s.call(i, t) : e.set(i, t), t), qi = (i, e, t) => (it(i, e, "access private method"), t), Zt, Qt, es, ts, ss, is, rs, ns, as, os, ls, cs, hs, us, ds, fs, ps, bs, gs, vs, ms, _s, ys, ws, ks, As, We, Ps, y;
const ji = "sonic-button";
Ps = [xe(ji)];
class F extends (We = Ai(Qs(Ti(Pe))), As = [k({ type: String, reflect: !0 })], ks = [k({ type: String, reflect: !0 })], ws = [k({ type: String, reflect: !0 })], ys = [k({ type: String, reflect: !0 })], _s = [k({ type: String })], ms = [k({ type: String, reflect: !0 })], vs = [k({ type: String })], gs = [k({ type: String, reflect: !0 })], bs = [k({ type: String })], ps = [k({ type: Boolean, reflect: !0 })], fs = [k({ type: String })], ds = [k({ type: String })], us = [k({ type: Boolean, reflect: !0 })], hs = [q()], cs = [q()], ls = [ct({ flatten: !0, slot: "prefix" })], os = [ct({ flatten: !0, slot: "suffix" })], as = [k({ type: String })], ns = [k({ type: String })], rs = [k({ type: String })], is = [k({ type: Boolean })], ss = [k({ type: Boolean, reflect: !0 })], ts = [k({ type: Boolean, reflect: !0 })], es = [k({ type: String, attribute: "data-aria-controls" })], Qt = [k({ type: Boolean, attribute: "data-aria-expanded" })], Zt = [q()], We) {
  constructor() {
    super(...arguments), x(y, 5, this), this.type = x(y, 8, this, "default"), x(y, 11, this), this.variant = x(y, 12, this, "default"), x(y, 15, this), this.size = x(y, 16, this), x(y, 19, this), this.shape = x(y, 20, this, "default"), x(y, 23, this), this.direction = x(y, 24, this, "row"), x(y, 27, this), this.alignItems = x(y, 28, this, "center"), x(y, 31, this), this.justify = x(y, 32, this, "center"), x(y, 35, this), this.align = x(y, 36, this), x(y, 39, this), this.minWidth = x(y, 40, this, "0"), x(y, 43, this), this.icon = x(y, 44, this, !1), x(y, 47, this), this.download = x(y, 48, this, null), x(y, 51, this), this.autoActive = x(y, 52, this, "partial"), x(y, 55, this), this.loading = x(y, 56, this, !1), x(y, 59, this), this.hasPrefix = x(y, 60, this, !1), x(y, 63, this), this.hasSuffix = x(y, 64, this, !1), x(y, 67, this), this.prefixes = x(y, 68, this), x(y, 71, this), this.suffixes = x(y, 72, this), x(y, 75, this), this.target = x(y, 76, this), x(y, 79, this), this._href = "", this.goBack = x(y, 80, this, null), x(y, 83, this), this.pushState = x(y, 84, this, !1), x(y, 87, this), this.active = x(y, 88, this, !1), x(y, 91, this), this.autoRepeat = x(y, 92, this, !1), x(y, 95, this), this.ariaControls = x(y, 96, this), x(y, 99, this), this.sonicAriaExpanded = x(y, 100, this), x(y, 103, this), this.pointerDownTime = 0, this.lastRepeatTime = 0, this.isRepeating = !1, this.handleRepeatend = () => {
      window.removeEventListener("pointerup", this.handleRepeatend), window.removeEventListener("blur", this.handleRepeatend), this.autoRepeat && (this.isRepeating = !1);
    }, this.location = x(y, 104, this, ""), x(y, 107, this);
  }
  set href(e) {
    this._href = e;
    const t = this._href.toString();
    t && t.indexOf("http") != 0 ? ae.onChange(this) : ae.offChange(this), this.requestUpdate();
  }
  get href() {
    return this._href;
  }
  handleNavigation(e) {
    e.preventDefault(), ae.changeFromComponent(this);
  }
  handleChange(e) {
    if (!(e?.type == "click" && this.autoRepeat) && (super.handleChange(), (this.pushState || this.goBack !== null) && (e?.preventDefault(), e?.stopPropagation(), ae.changeFromComponent(this)), this.hasAttribute("reset"))) {
      const t = this.getAttribute("reset"), s = t ? Ne.get(t) : this.getFormPublisher();
      s && s.set({});
    }
  }
  handleRepeatStart(e) {
    this.autoRepeat && (this.handleChange(e), this.pointerDownTime = Date.now(), this.isRepeating = !0, this.repeat()), window.addEventListener("pointerup", this.handleRepeatend), window.addEventListener("blur", this.handleRepeatend);
  }
  repeat() {
    if (this.isRepeating) {
      if (this.hasAttribute("disabled")) {
        this.isRepeating = !1;
        return;
      }
      window.requestAnimationFrame(this.repeat.bind(this)), !(Date.now() - this.pointerDownTime < 500) && (Date.now() - this.lastRepeatTime < 100 || (this.handleChange(), this.lastRepeatTime = Date.now()));
    }
  }
  connectedCallback() {
    super.connectedCallback();
  }
  setCheckedValue(e) {
    if (this.name) {
      if (e ? this.setAttribute("active", "true") : this.removeAttribute("active"), e == this._checked) return;
      super.setCheckedValue(e);
    }
  }
  disconnectedCallback() {
    ae.offChange(this), super.disconnectedCallback();
  }
  willUpdate(e) {
    (e.has("href") || e.has("autoActive")) && ae.updateComponentActiveState(this), e.has("location") && ae.updateComponentActiveState(this);
  }
  render() {
    const e = {
      flexDirection: this.direction,
      alignItems: this.alignItems,
      justifyContent: this.justify,
      align: this.align,
      minWidth: this.minWidth
    }, t = V`
      <button
        part="button"
        class=${this.hasPrefix || this.hasSuffix ? "has-prefix-or-suffix" : ""}
        style=${Vs(e)}
        aria-controls=${re(this.ariaControls)}
        aria-expanded=${re(this.sonicAriaExpanded)}
        aria-label=${re(this.ariaLabel)}
        aria-labelledby=${re(this.ariaLabelledby)}
        ?disabled=${this.disabled}
        @click=${this.handleChange}
        @pointerdown=${this.handleRepeatStart}
      >
        <slot
          @slotchange=${this.onSlotChange}
          part="prefix"
          name="prefix"
        ></slot>
        <slot part="main" class="main-slot"></slot>
        <slot
          @slotchange=${this.onSlotChange}
          part="suffix"
          name="suffix"
        ></slot>
        ${this.loading == !0 ? V`<sonic-icon name="loader" class="loader"></sonic-icon>` : ""}
      </button>
    `;
    return this.href ? V`<a
          href="${this.href}"
          download=${re(this.download)}
          target=${re(this.target)}
          aria-label=${re(this.ariaLabel)}
          aria-labelledby=${re(this.ariaLabelledby)}
          @click=${this.pushState || this.goBack !== null ? this.handleNavigation : null}
          >${t}</a
        >` : V`${t}`;
  }
  onSlotChange() {
    this.hasPrefix = !!this.prefixes?.length, this.hasSuffix = !!this.suffixes?.length;
  }
}
y = Vi(We);
O(y, 3, "href", ns, F);
O(y, 5, "type", As, F);
O(y, 5, "variant", ks, F);
O(y, 5, "size", ws, F);
O(y, 5, "shape", ys, F);
O(y, 5, "direction", _s, F);
O(y, 5, "alignItems", ms, F);
O(y, 5, "justify", vs, F);
O(y, 5, "align", gs, F);
O(y, 5, "minWidth", bs, F);
O(y, 5, "icon", ps, F);
O(y, 5, "download", fs, F);
O(y, 5, "autoActive", ds, F);
O(y, 5, "loading", us, F);
O(y, 5, "hasPrefix", hs, F);
O(y, 5, "hasSuffix", cs, F);
O(y, 5, "prefixes", ls, F);
O(y, 5, "suffixes", os, F);
O(y, 5, "target", as, F);
O(y, 5, "goBack", rs, F);
O(y, 5, "pushState", is, F);
O(y, 5, "active", ss, F);
O(y, 5, "autoRepeat", ts, F);
O(y, 5, "ariaControls", es, F);
O(y, 5, "sonicAriaExpanded", Qt, F);
O(y, 5, "location", Zt, F);
F = O(y, 0, "Button", Ps, F);
F.styles = [
  Ri,
  B`
      * {
        box-sizing: border-box;
      }
      :host {
        --sc-btn-gap: 0.35em;
        --sc-btn-py: 0.25em;
        --sc-btn-px: 1.1em;
        --sc-btn-fs: var(--sc-_fs, 1rem);
        --sc-btn-ff: var(
          --sc-btn-font-family,
          var(--sc-font-family-base, sans-serif)
        );
        --sc-btn-fw: var(--sc-btn-font-weight, 500);

        --sc-btn-height: var(--sc-form-height, 2.5em);
        --btn-color: var(--sc-btn-color, var(--sc-base-content, #000));
        --btn-bg: var(--sc-btn-bg, var(--sc-base-100, rgba(0, 0, 0, 0.07)));

        --sc-btn-border-style: solid;
        --sc-btn-border-width: var(--sc-form-border-width);
        --sc-btn-border-color: transparent;

        --btn-outline-bg-hover: var(
          --sc-btn-outline-bg-hover,
          var(--sc-base-100, rgba(0, 0, 0, 0.07))
        );
        --sc-btn-ghost-bg-hover: var(--sc-base-100, rgba(0, 0, 0, 0.07));

        --sc-btn-active-color: var(--sc-base, #fff);
        --sc-btn-hover-filter: brightness(0.98);
        --sc-btn-active-filter: brightness(0.97);
        --sc-btn-active-bg: var(--sc-base-content, #000);

        /* min permet une sécurité si btn-rounded 999px par exemple */
        --sc-item-rounded-tr: min(
          calc(var(--sc-form-height, 2.5em) / 2),
          var(--sc-btn-rounded)
        );
        --sc-item-rounded-tl: min(
          calc(var(--sc-form-height, 2.5em) / 2),
          var(--sc-btn-rounded)
        );
        --sc-item-rounded-bl: min(
          calc(var(--sc-form-height, 2.5em) / 2),
          var(--sc-btn-rounded)
        );
        --sc-item-rounded-br: min(
          calc(var(--sc-form-height, 2.5em) / 2),
          var(--sc-btn-rounded)
        );

        display: inline-flex;
        vertical-align: middle;
        box-sizing: border-box;
        -webkit-print-color-adjust: exact;
      }

      :host a {
        display: contents;
        color: unset;
      }

      :host button {
        display: flex;
        flex: 1;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;

        font-family: var(--sc-btn-ff);
        font-weight: var(--sc-btn-fw);
        font-size: var(--sc-btn-fs);

        cursor: pointer;
        text-align: center;
        line-height: 1.1;
        border-radius: var(--sc-item-rounded-tl) var(--sc-item-rounded-tr)
          var(--sc-item-rounded-br) var(--sc-item-rounded-bl);

        background: var(--btn-bg);
        color: var(--btn-color);

        padding-top: var(--sc-btn-py);
        padding-bottom: var(--sc-btn-py);
        padding-left: var(--sc-btn-px);
        padding-right: var(--sc-btn-px);

        border: var(--sc-btn-border-width) var(--sc-btn-border-style)
          var(--sc-btn-border-color);
        min-height: var(--sc-btn-height);
      }

      :host button.has-prefix-or-suffix {
        gap: var(--sc-btn-gap);
      }

      :host button:focus-visible,
      :host button:hover {
        filter: var(--sc-btn-hover-filter);
      }

      :host button:active {
        filter: var(--sc-btn-active-filter);
      }

      /*TYPES*/
      :host([type="default"]) button {
        --btn-color: var(--sc-base-content, #000);
        --btn-bg: var(--sc-base-100, rgba(0, 0, 0, 0.07));
      }

      :host([type="primary"]) button {
        --btn-color: var(--sc-primary-content, var(--sc-base, #fff));
        --btn-bg: var(--sc-primary, var(--sc-base-content, #000));
      }
      :host([type="warning"]) button {
        --btn-color: var(--sc-warning-content, var(--sc-base, #fff));
        --btn-bg: var(--sc-warning, var(--sc-base-content, #000));
      }
      :host([type="danger"]) button {
        --btn-color: var(--sc-danger-content, var(--sc-base, #fff));
        --btn-bg: var(--sc-danger, var(--sc-base-content, #000));
      }
      :host([type="info"]) button {
        --btn-color: var(--sc-info-content, var(--sc-base, #fff));
        --btn-bg: var(--sc-info, var(--sc-base-content, #000));
      }
      :host([type="success"]) button {
        --btn-color: var(--sc-success-content, var(--sc-base, #fff));
        --btn-bg: var(--sc-success, var(--sc-base-content, #000));
      }
      :host([type="neutral"]) button {
        --btn-color: var(--sc-base, #fff);
        --btn-bg: var(--sc-base-content, #000);
      }
      :host([type="custom"]) button {
        --btn-color: var(--sc-btn-custom-color);
        --btn-bg: var(--sc-btn-custom-bg);
      }

      /*UNSTYLED*/
      :host([variant="unstyled"]) {
        display: inline-flex;
      }

      :host([variant="unstyled"]) button {
        all: unset;
        cursor: pointer;
        width: 100%;
        flex: 1;
        box-sizing: border-box;
        --sc-btn-height: auto;
      }

      /*GESTION DU FOCUS*/
      :host(:not([disabled])) button:focus-visible {
        box-shadow: 0 0 0 0.18rem var(--sc-base-300, rgba(0, 0, 0, 0.18));
        border-color: var(--sc-base-300, rgba(0, 0, 0, 0.18)) !important;
        outline: none;
      }

      /*GHOST*/
      :host([variant="ghost"][type]) button {
        color: var(--btn-bg);
        background: transparent;
      }

      :host([variant="ghost"][type="default"]) button {
        color: var(--btn-color);
        background: transparent;
      }

      /*:host([variant="ghost"]) button:focus-visible,*/
      :host([variant="ghost"]) button:hover {
        background: var(--sc-btn-ghost-bg-hover);
        filter: none;
      }

      :host([active][variant="ghost"]) button {
        background: var(--sc-btn-ghost-bg-hover);
        filter: none;
      }

      :host([active][variant="ghost"]) button:hover {
        filter: var(--sc-btn-hover-filter);
      }

      /*OUTLINE*/
      :host([variant="outline"][type]) button {
        border-color: var(--btn-bg);
        color: var(--btn-bg);
        background: transparent;
      }

      :host([variant="outline"][type="default"]) button {
        border-color: var(--sc-base-content, #000);
        color: var(--sc-base-content, #000);
        background: transparent;
      }

      /*:host([variant="outline"]) button:focus-visible,*/
      :host([variant="outline"]) button:hover {
        background: var(--btn-outline-bg-hover);
      }

      /*OUTLINE*/
      :host([variant="link"]:not([size])) {
        vertical-align: baseline;
        margin-left: 0.25em;
        margin-right: 0.25em;
      }

      :host([variant="link"]:not([size])) {
        font-size: inherit;
      }

      :host([variant="link"]) button {
        text-decoration: underline;
        padding: 0;
        background: none;
        border: none;
        font-size: inherit;
        min-height: 0;
        color: inherit;
      }

      :host([variant="link"][type]) button {
        color: var(--btn-bg);
      }
      :host([variant="link"][type="default"]) button {
        color: inherit;
      }

      :host([variant="link"]) button:focus-visible,
      :host([variant="link"]) button:hover {
        text-decoration: none;
      }

      /* Alignement */
      :host([align="left"]) button {
        text-align: left !important;
      }

      :host([align="right"]) button {
        text-align: right;
      }

      /*SHAPE*/
      :host([shape="circle"]) button {
        border-radius: 50%;
      }
      :host([shape="circle"]) .main-slot {
        line-height: 1;
      }

      :host([shape="circle"]) button,
      :host([shape="square"]) button {
        width: var(--sc-btn-height);
        height: var(--sc-btn-height);
        /*overflow: hidden;*/ /* fix bug #42622 */
        padding: 0;
        align-items: center;
        justify-content: 0;
        text-align: center !important;
      }

      :host([shape="block"]),
      :host([shape="block"]) button {
        width: 100%;
      }

      :host([disabled]) {
        opacity: 0.3;
        pointer-events: none;
        user-select: none;
      }

      /*ACTIVE*/

      :host([active]:not([variant="ghost"]):not([variant="unstyled"])) button {
        background: var(--sc-btn-active-bg);
        color: var(--sc-btn-active-color);
        border-color: var(--sc-btn-active-bg);
      }

      .main-slot {
        flex-grow: 1;
        min-width: 0;
        display: block;
      }

      :host([minWidth]:not([shape="block"])) .main-slot {
        flex-grow: 0;
      }

      slot[name="suffix"],
      slot[name="prefix"] {
        flex-shrink: 0;
        min-width: 0;
      }

      /*ALIGNEMENT DES ICONES
        permet de tous les avoir alignés dans un menu
      */
      ::slotted(sonic-icon) {
        min-width: 1em;
        text-align: center;
      }

      /*BOUTON Avec icone seulement*/
      :host([icon]) ::slotted(:only-child),
      :host([icon]) ::slotted(sonic-icon) {
        font-size: 1.2em;
        vertical-align: middle;
      }

      /*Tooltip ne joue pas sur le layout*/
      sonic-tooltip {
        display: contents;
      }

      /*OUTLINE*/
      :host(:not([active])) ::slotted([swap="on"]) {
        display: none !important;
      }

      :host([active]) ::slotted([swap="off"]) {
        display: none !important;
      }

      /*Loading*/
      :host([loading]) {
        pointer-events: none;
        position: relative;
      }

      :host([loading]) slot {
        opacity: 0 !important;
        pointer-events: none;
      }
      /*Loading*/
      :host([loading]) .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
        height: var(--sc-btn-ff);
        width: var(--sc-btn-ff);
        animation: rotation 2s infinite linear;
      }

      @keyframes rotation {
        from {
          transform-origin: 50% 50%;
          transform: translate(-50%, -50%) rotate(0deg);
        }
        to {
          transform-origin: 50% 50%;
          transform: translate(-50%, -50%) rotate(359deg);
        }
      }
    `
];
x(y, 1, F);
const Hi = B`
  :host([align="left"]) .sonic-loader--inline {
    margin-left: 0;
  }

  :host([align="right"]) .sonic-loader--inline {
    margin-left: auto;
    margin-right: 0;
  }
  .sonic-loader--inline {
    display: block;
    position: relative;
    width: 80px;
    height: 24px;
    margin: auto;
    z-index: 20;
  }
  .sonic-loader--inline div {
    position: absolute;
    top: 5px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: var(--sc-_loader-bg);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .sonic-loader--inline div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .sonic-loader--inline div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .sonic-loader--inline div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .sonic-loader--inline div:nth-child(4) {
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
`, Gi = B`
  @keyframes sonic-loader--fixed {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    5% {
      opacity: 1;
    }
    70% {
      opacity: 90%;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }

  .sonic-loader--fixed {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: transateY(-50%) translateX(-50%);
    z-index: 999;
  }

  .sonic-loader--fixed > div:nth-child(2) {
    animation-delay: -0.5s;
  }
  .sonic-loader--fixed > div:nth-child(3) {
    animation-delay: -0.2s;
  }

  .sonic-loader--fixed > div:nth-child(4) {
    display: none !important;
  }
  .sonic-loader--fixed > div {
    background-color: var(--sc-_loader-bg);
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
    margin: 2px;
    animation-fill-mode: both;
    position: absolute;
    top: 0px;
    opacity: 0;
    margin: 0;
    top: -2.5rem;
    left: -2.5rem;
    width: 5rem;
    height: 5rem;
    animation: sonic-loader--fixed 1s 0s linear infinite;
  }
`, Wi = B`
  :host {
    /* POLICES */
    /*
    --sc-font-family-base: "Inter var", "Inter", -apple-system, system-ui,
      BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
      sans-serif; 
    --sc-font-weight-base: 400; 
    --sc-font-style-base: normal; 

    --sc-headings-font-family: var(--sc-font-family-base, sans-serif); 
    --sc-headings-font-style: var(--sc-font-style-base, normal); 
    --sc-headings-line-height: 1.1; 
    --sc-headings-font-weight: 700; 
    */

    /* ROUNDED*/
    --sc-rounded-sm: calc(var(--sc-rounded, 0px) * 0.5);
    --sc-rounded: 0.375rem;
    --sc-rounded-md: calc(var(--sc-rounded, 0px) * 1.8);
    --sc-rounded-lg: calc(var(--sc-rounded, 0px) * 3);
    --sc-rounded-xl: calc(var(--sc-rounded, 0px) * 7);

    /* BOUTONS */
    /*
    --sc-btn-font-family: var(--sc-font-family-base, sans-serif); *
    --sc-btn-font-weight: 500;
    */

    /* Placeholder */
    /*--sc-placeholder-bg: rgba(17, 24, 39, 0.05);  */

    /* 4 for rounded full*/
    --sc-btn-rounded-intensity: 1.4;
    --sc-rounded-size-intensity: calc((1em - 1rem) * 0.4);
    --sc-btn-rounded: calc(
      (var(--sc-rounded, 0px) + var(--sc-rounded-size-intensity)) *
        var(--sc-btn-rounded-intensity)
    );

    /* OMBRES */
    --sc-shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1),
      0 1px 2px -1px rgb(0 0 0 / 0.1);
    --sc-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
    --sc-shadow-lg: 0 10px 15px 0px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
    --sc-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
    --sc-shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

    /* Forms */
    --sc-border-width: max(1px, 0.12rem);
    --sc-border-color: var(--sc-base-100, var(--sc-base-content, #000));
    /*--sc-form-height: 2.5em; */ /*ok*/
    --sc-form-border-width: var(--sc-border-width);
    --sc-input-bg: var(--sc-base-100, rgba(0, 0, 0, 0.07));
    --sc-input-border-color: var(--sc-input-bg);
    --sc-input-rounded-intensity: 1.4;
    --sc-input-rounded: calc(
      (var(--sc-rounded, 0px) + var(--sc-rounded-size-intensity)) *
        var(--sc-input-rounded-intensity)
    );
    /*formulaires*/
    --sc-input-color: var(--sc-base-content, #000);

    /* CONTRAST */
    /* -- ex : Text on images */
    --sc-contrast-content: #fff;
    --sc-contrast: #000000;
  }
`, Yi = B`
  :host([theme="light"]) {
    /*Boutons*/
    --sc-primary: var(--sc-base-800);
    --sc-info: #2563eb;
    --sc-danger: #f43f5e;
    --sc-warning: #f97316;
    --sc-success: #14b8a6;

    --sc-primary-content: var(--sc-base, #fff);
    --sc-info-content: var(--sc-base, #fff);
    --sc-danger-content: var(--sc-base, #fff);
    --sc-warning-content: var(--sc-base, #fff);
    --sc-success-content: var(--sc-base, #fff);

    /*Bases*/
    --sc-base: #fff;
    --sc-base-50: #f8fafc;
    --sc-base-100: #f1f5f9;
    --sc-base-200: #e2e8f0;
    --sc-base-300: #cbd5e1;
    --sc-base-400: #94a3b8;
    --sc-base-500: #64748b;
    --sc-base-600: #475569;
    --sc-base-700: #334155;
    --sc-base-800: #1e293b;
    --sc-base-900: #0f172a;
    --sc-base-content: var(--sc-base-700);
  }
`, Ct = B`
  --sc-primary: var(--sc-dark-primary, var(--sc-base-700));
  --sc-info: var(--sc-dark-info, #3abff8);
  --sc-danger: var(--sc-dark-danger, #f87272);
  --sc-warning: var(--sc-dark-warning, #fbbd23);
  --sc-success: var(--sc-dark-success, #36d399);

  --sc-primary-content: var(--sc-dark-primary-content, #002b3d);
  --sc-info-content: var(--sc-dark-info-content, #002b3d);
  --sc-danger-content: var(--sc-dark-danger-content, #382800);
  --sc-warning-content: var(--sc-dark-warning-content, #382800);
  --sc-success-content: var(--sc-dark-success-content, #003320);

  --sc-base: var(--sc-dark-base, #1d2634);
  --sc-base-50: var(--sc-dark-base-50, #1f2937);
  --sc-base-100: var(--sc-dark-base-100, #252c36);
  --sc-base-200: var(--sc-dark-base-200, #2c3543);
  --sc-base-300: var(--sc-dark-base-300, #38414e);
  --sc-base-400: var(--sc-dark-base-400, #515964);
  --sc-base-500: var(--sc-dark-base-500, #828891);
  --sc-base-600: var(--sc-dark-base-600, #b4b8be);
  --sc-base-700: var(--sc-dark-base-700, #cdd0d5);
  --sc-base-800: var(--sc-dark-base-800, #d9dce0);
  --sc-base-900: var(--sc-dark-base-900, #e5e7eb);
  --sc-base-content: var(--sc-dark-base-content, #e5e7eb);
`, Xi = B`
  :host([theme="dark"]) {
    ${Ct}
  }

  @media (prefers-color-scheme: dark) {
    :host([theme="auto"]) {
      ${Ct}
    }
  }
`;
var Ji = Object.create, rt = Object.defineProperty, Ki = Object.getOwnPropertyDescriptor, xs = (i, e) => (e = Symbol[i]) ? e : Symbol.for("Symbol." + i), $e = (i) => {
  throw TypeError(i);
}, Zi = (i, e, t) => e in i ? rt(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Lt = (i, e) => rt(i, "name", { value: e, configurable: !0 }), Qi = (i) => [, , , Ji(i?.[xs("metadata")] ?? null)], Ss = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], _e = (i) => i !== void 0 && typeof i != "function" ? $e("Function expected") : i, er = (i, e, t, s, r) => ({ kind: Ss[i], name: e, metadata: s, addInitializer: (n) => t._ ? $e("Already initialized") : r.push(_e(n || null)) }), tr = (i, e) => Zi(e, xs("metadata"), i[3]), Q = (i, e, t, s) => {
  for (var r = 0, n = i[e >> 1], l = n && n.length; r < l; r++) e & 1 ? n[r].call(t) : s = n[r].call(t, s);
  return s;
}, De = (i, e, t, s, r, n) => {
  var l, c, v, b, f, a = e & 7, p = !!(e & 8), d = !!(e & 16), w = a > 3 ? i.length + 1 : a ? p ? 1 : 2 : 0, g = Ss[a + 5], A = a > 3 && (i[w - 1] = []), m = i[w] || (i[w] = []), o = a && (!d && !p && (r = r.prototype), a < 5 && (a > 3 || !d) && Ki(a < 4 ? r : { get [t]() {
    return Ft(this, n);
  }, set [t](h) {
    return $t(this, n, h);
  } }, t));
  a ? d && a < 4 && Lt(n, (a > 2 ? "set " : a > 1 ? "get " : "") + t) : Lt(r, t);
  for (var u = s.length - 1; u >= 0; u--)
    b = er(a, t, v = {}, i[3], m), a && (b.static = p, b.private = d, f = b.access = { has: d ? (h) => sr(r, h) : (h) => t in h }, a ^ 3 && (f.get = d ? (h) => (a ^ 1 ? Ft : ir)(h, r, a ^ 4 ? n : o.get) : (h) => h[t]), a > 2 && (f.set = d ? (h, _) => $t(h, r, _, a ^ 4 ? n : o.set) : (h, _) => h[t] = _)), c = (0, s[u])(a ? a < 4 ? d ? n : o[g] : a > 4 ? void 0 : { get: o.get, set: o.set } : r, b), v._ = 1, a ^ 4 || c === void 0 ? _e(c) && (a > 4 ? A.unshift(c) : a ? d ? n = c : o[g] = c : r = c) : typeof c != "object" || c === null ? $e("Object expected") : (_e(l = c.get) && (o.get = l), _e(l = c.set) && (o.set = l), _e(l = c.init) && A.unshift(l));
  return a || tr(i, r), o && rt(r, t, o), d ? a ^ 4 ? n : o : r;
}, nt = (i, e, t) => e.has(i) || $e("Cannot " + t), sr = (i, e) => Object(e) !== e ? $e('Cannot use the "in" operator on this value') : i.has(e), Ft = (i, e, t) => (nt(i, e, "read from private field"), t ? t.call(i) : e.get(i)), $t = (i, e, t, s) => (nt(i, e, "write to private field"), s ? s.call(i, t) : e.set(i, t), t), ir = (i, e, t) => (nt(i, e, "access private method"), t), Cs, Ls, Fs, $s, Ye, Ds, z;
const rr = "sonic-theme";
Ds = [xe(rr)];
let J = class Me extends (Ye = Pe, $s = [k({ type: String, reflect: !0 })], Fs = [k({ type: Boolean, reflect: !0 })], Ls = [k({ type: Boolean, reflect: !0 })], Cs = [k({ type: Boolean, reflect: !0 })], Ye) {
  constructor() {
    super(), this.theme = Q(z, 8, this), Q(z, 11, this), this.background = Q(z, 12, this, !1), Q(z, 15, this), this.color = Q(z, 16, this, !1), Q(z, 19, this), this.font = Q(z, 20, this, !1), Q(z, 23, this), Me.instance = this;
  }
  /**
   * retourne le conteneur de tout ce qui pop : popups / modale / tooltip? / dropdown / ...
   */
  static getPopContainer() {
    return Me.instance || document.body;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("message", (e) => this.receiveMessage(e), !1), window.dispatchEvent(new CustomEvent("SonicThemeReady")), this.postCSSVars();
  }
  postCSSVars() {
    const e = document.styleSheets, t = e.length, s = [];
    for (let n = 0; n < t; n++) {
      const l = e[n];
      l.href && (l.href.includes("googleapis") || l.href.includes("typekit.net")) && s.push(l.href);
    }
    const r = {
      variables: this.getCssVariables(),
      fonts: s
    };
    Ne.get("sonic-theme")?.set(r), document.querySelectorAll("iframe").forEach(
      (n) => n.contentWindow?.postMessage(
        {
          type: "SonicTheme",
          ...r
        },
        "*"
      )
    );
  }
  receiveMessage(e) {
    const t = e.data;
    !t.type || t.type != "GetSonicTheme" || this.postCSSVars();
  }
  getCssVariables() {
    const e = [], t = [
      ...Me.styles.map((n) => n.styleSheet),
      ...Array.from(document.styleSheets)
    ];
    for (const n of t)
      try {
        if (!n) continue;
        const l = n.cssRules;
        for (const c of l) {
          if (!("style" in c)) continue;
          const v = c.style;
          for (const b of v)
            e.includes(b) || b.indexOf("--sc") !== 0 || e.push(b);
        }
      } catch {
        console.warn("Erreur lors de la récupération des variables CSS");
      }
    const s = window.getComputedStyle(this), r = {};
    return e.forEach((n) => r[n] = s.getPropertyValue(n)), r;
  }
  render() {
    return V`<slot></slot>`;
  }
};
z = Qi(Ye);
De(z, 5, "theme", $s, J);
De(z, 5, "background", Fs, J);
De(z, 5, "color", Ls, J);
De(z, 5, "font", Cs, J);
J = De(z, 0, "Theme", Ds, J);
J.styles = [
  Yi,
  Xi,
  Wi,
  B`
      :host([color]) {
        color: var(--sc-base-content, #000);
      }

      :host([font]) {
        font-family: var(--sc-font-family-base, sans-serif);
        font-weight: var(--sc-font-weight-base, 400);
        font-style: var(--sc-font-style-base, normal);
      }
      ::slotted(.sonic-pop-content) {
        max-width: 80vw;
        background-color: var(--sc-base, #fff);
        position: fixed;
        z-index: 99999;
        display: block;
        transform: translateY(1rem) scale(0.95);
        pointer-events: none;
        transition-duration: 0.15s;
        transition-timing-function: ease;

        transition-property: scale, opacity;
        border-radius: min(calc(var(--sc-btn-rounded) * 2), 0.4em);
      }

      ::slotted(.sonic-pop-content).is-open:not(.is-empty) {
        transform: translateY(0) scale(1);
        opacity: 1;
        pointer-events: auto;
        transition-property: scale, opacity;
        transition-timing-function: cubic-bezier(0.25, 0.25, 0.42, 1.225);
      }
    `
];
J.instance = void 0;
Q(z, 1, J);
let nr = J;
var ar = Object.create, at = Object.defineProperty, or = Object.getOwnPropertyDescriptor, Os = (i, e) => (e = Symbol[i]) ? e : Symbol.for("Symbol." + i), Oe = (i) => {
  throw TypeError(i);
}, lr = (i, e, t) => e in i ? at(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Dt = (i, e) => at(i, "name", { value: e, configurable: !0 }), cr = (i) => [, , , ar(i?.[Os("metadata")] ?? null)], Es = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], ye = (i) => i !== void 0 && typeof i != "function" ? Oe("Function expected") : i, hr = (i, e, t, s, r) => ({ kind: Es[i], name: e, metadata: s, addInitializer: (n) => t._ ? Oe("Already initialized") : r.push(ye(n || null)) }), ur = (i, e) => lr(e, Os("metadata"), i[3]), we = (i, e, t, s) => {
  for (var r = 0, n = i[e >> 1], l = n && n.length; r < l; r++) e & 1 ? n[r].call(t) : s = n[r].call(t, s);
  return s;
}, ot = (i, e, t, s, r, n) => {
  var l, c, v, b, f, a = e & 7, p = !!(e & 8), d = !!(e & 16), w = a > 3 ? i.length + 1 : a ? p ? 1 : 2 : 0, g = Es[a + 5], A = a > 3 && (i[w - 1] = []), m = i[w] || (i[w] = []), o = a && (!d && !p && (r = r.prototype), a < 5 && (a > 3 || !d) && or(a < 4 ? r : { get [t]() {
    return Ot(this, n);
  }, set [t](h) {
    return Et(this, n, h);
  } }, t));
  a ? d && a < 4 && Dt(n, (a > 2 ? "set " : a > 1 ? "get " : "") + t) : Dt(r, t);
  for (var u = s.length - 1; u >= 0; u--)
    b = hr(a, t, v = {}, i[3], m), a && (b.static = p, b.private = d, f = b.access = { has: d ? (h) => dr(r, h) : (h) => t in h }, a ^ 3 && (f.get = d ? (h) => (a ^ 1 ? Ot : fr)(h, r, a ^ 4 ? n : o.get) : (h) => h[t]), a > 2 && (f.set = d ? (h, _) => Et(h, r, _, a ^ 4 ? n : o.set) : (h, _) => h[t] = _)), c = (0, s[u])(a ? a < 4 ? d ? n : o[g] : a > 4 ? void 0 : { get: o.get, set: o.set } : r, b), v._ = 1, a ^ 4 || c === void 0 ? ye(c) && (a > 4 ? A.unshift(c) : a ? d ? n = c : o[g] = c : r = c) : typeof c != "object" || c === null ? Oe("Object expected") : (ye(l = c.get) && (o.get = l), ye(l = c.set) && (o.set = l), ye(l = c.init) && A.unshift(l));
  return a || ur(i, r), o && at(r, t, o), d ? a ^ 4 ? n : o : r;
}, lt = (i, e, t) => e.has(i) || Oe("Cannot " + t), dr = (i, e) => Object(e) !== e ? Oe('Cannot use the "in" operator on this value') : i.has(e), Ot = (i, e, t) => (lt(i, e, "read from private field"), t ? t.call(i) : e.get(i)), Et = (i, e, t, s) => (lt(i, e, "write to private field"), s ? s.call(i, t) : e.set(i, t), t), fr = (i, e, t) => (lt(i, e, "access private method"), t), Ts, Rs, Xe, Us, te;
const pr = "sonic-loader";
Us = [xe(pr)];
let oe = class ee extends (Xe = Pe, Rs = [k({ type: String })], Ts = [k({ type: Boolean })], Xe) {
  constructor() {
    super(...arguments), this.mode = we(te, 8, this, "fixed"), we(te, 11, this), this.noDelay = we(te, 12, this, !1), we(te, 15, this);
  }
  static show(e) {
    ee.loader || (ee.loader = document.createElement("sonic-loader"));
    const t = ee.loader;
    e || (e = {}), e.mode && t.setAttribute("mode", e.mode), e.noDelay && t.setAttribute("noDelay", ""), e.container || (e.container = nr.getPopContainer(), e.mode = "fixed"), e.container.appendChild(t), ee.callCounter++;
  }
  static hide() {
    ee.callCounter--, !(ee.callCounter > 0) && ee.loader && ee.loader.remove();
  }
  render() {
    return V`<div
      class="sonic-loader sonic-loader--${this.mode} ${this.noDelay ? "sonic-loader--nodelay" : ""} "
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>`;
  }
};
te = cr(Xe);
ot(te, 5, "mode", Rs, oe);
ot(te, 5, "noDelay", Ts, oe);
oe = ot(te, 0, "Loader", Us, oe);
oe.styles = [
  Hi,
  Gi,
  B`
      :host {
        --sc-_loader-bg: var(--sc-primary, currentColor);
        pointer-events: none;
      }

      :host([currentColor]) {
        --sc-_loader-bg: currentColor;
      }

      .sonic-loader {
        opacity: 0;
        animation: showLoader 0.5s 0.5s forwards;
      }
      .sonic-loader--inline,
      .sonic-loader--nodelay {
        animation-delay: 0s;
      }

      @keyframes showLoader {
        0% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }
    `
];
oe.loader = void 0;
oe.callCounter = 0;
we(te, 1, oe);
var br = Object.defineProperty, gr = Object.getOwnPropertyDescriptor, se = (i, e, t, s) => {
  for (var r = s > 1 ? void 0 : s ? gr(e, t) : e, n = i.length - 1, l; n >= 0; n--)
    (l = i[n]) && (r = (s ? l(e, t, r) : l(r)) || r);
  return s && r && br(e, t, r), r;
};
let H = class extends Pe {
  constructor() {
    super(...arguments), this.apiBaseUrl = "", this.club = "", this.players = [], this.clubParticipants = [], this.loading = !1, this.loaded = !1, this.showParticipants = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.setupIntersectionObserver();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.observer && this.observer.disconnect();
  }
  setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (i) => {
        i.forEach((e) => {
          e.isIntersecting && !this.loaded && !this.loading && this.loadTournamentDetails();
        });
      },
      {
        rootMargin: "50px"
        // Commencer à charger 50px avant que l'élément soit visible
      }
    ), this.observer.observe(this);
  }
  async loadTournamentDetails() {
    if (!(this.loaded || this.loading)) {
      this.loading = !0;
      try {
        const i = this.apiBaseUrl || "http://localhost:3012", e = await fetch(
          `${i}/api/tournaments/${this.tournament.id}/players`
        );
        if (!e.ok)
          throw new Error(`HTTP error! status: ${e.status}`);
        const t = await e.json();
        t.success && t.data && (this.players = t.data, this.extractParticipants(), this.loaded = !0);
      } catch (i) {
        console.error("Error loading tournament details:", i);
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
    this.clubParticipants = this.players.filter(
      (i) => i.club.toLowerCase().includes(this.club.toLowerCase())
    );
  }
  toggleParticipants() {
    this.showParticipants = !this.showParticipants;
  }
  formatDate(i) {
    return new Date(i).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  render() {
    return V`
      <div class="border-b border-current last:border-b-0">
        <div class="text-sm mb-1">
          ${this.formatDate(this.tournament.date)} ― ${this.tournament.location}
          (${this.tournament.department})
        </div>
        <div class="text-xl font-bold mb-1">${this.tournament.name}</div>

        ${this.loading ? V`<sonic-loader mode="inline"></sonic-loader>` : Te}
        ${this.clubParticipants.length > 0 ? V`
              <sonic-button
                variant="outline"
                size="xs"
                class=" mt-1 "
                @click=${this.toggleParticipants}
              >
                ${this.clubParticipants.length}
                joueur${this.clubParticipants.length > 1 ? "s" : Te} du
                club ${this.club}
              </sonic-button>
              ${this.showParticipants ? V`
                    <div class="mt-2 pl-4 border-l border-current">
                      ${this.clubParticipants.map(
      (i) => V`
                          <div class="text-xs my-1">
                            ${i.firstName} ${i.name} (${i.elo})
                          </div>
                        `
    )}
                    </div>
                  ` : Te}
            ` : Te}
      </div>
    `;
  }
};
H.styles = [
  It,
  B`
      :host {
        display: block;
      }
    `
];
se([
  k({ type: Object })
], H.prototype, "tournament", 2);
se([
  k({ type: String })
], H.prototype, "apiBaseUrl", 2);
se([
  k({ type: String })
], H.prototype, "club", 2);
se([
  q()
], H.prototype, "players", 2);
se([
  q()
], H.prototype, "clubParticipants", 2);
se([
  q()
], H.prototype, "loading", 2);
se([
  q()
], H.prototype, "loaded", 2);
se([
  q()
], H.prototype, "showParticipants", 2);
H = se([
  xe("chess-agenda-item")
], H);
var vr = Object.defineProperty, mr = Object.getOwnPropertyDescriptor, ie = (i, e, t, s) => {
  for (var r = s > 1 ? void 0 : s ? mr(e, t) : e, n = i.length - 1, l; n >= 0; n--)
    (l = i[n]) && (r = (s ? l(e, t, r) : l(r)) || r);
  return s && r && vr(e, t, r), r;
};
let G = class extends Pe {
  constructor() {
    super(...arguments), this.departements = [], this.club = "", this.limit = 20, this.showOnlyClub = !1, this.apiBaseUrl = "", this.tournaments = [], this.loading = !1, this.error = null;
  }
  connectedCallback() {
    super.connectedCallback(), this.loadTournaments();
  }
  async loadTournaments() {
    if (!(!this.departements || this.departements.length === 0)) {
      this.loading = !0, this.error = null;
      try {
        const i = new URLSearchParams({
          limit: this.limit.toString(),
          showOnlyClub: this.showOnlyClub.toString(),
          next: "true"
        });
        this.departements.forEach((r) => {
          i.append("department[]", r.toString());
        }), this.club && i.set("club", this.club);
        const e = this.apiBaseUrl || "http://localhost:3012", t = await fetch(`${e}/api/agenda?${i}`);
        if (!t.ok)
          throw new Error(`HTTP error! status: ${t.status}`);
        const s = await t.json();
        if (s.success && s.data)
          this.tournaments = s.data, console.log("Tournaments loaded:", this.tournaments);
        else
          throw new Error(s.error || "Unknown error");
      } catch (i) {
        this.error = i instanceof Error ? i.message : "Unknown error", console.error("Error loading tournaments:", i);
      } finally {
        this.loading = !1;
      }
    }
  }
  render() {
    return this.loading ? V`
        <div>
          <div class="text-center p-2">Chargement des tournois...</div>
        </div>
      ` : this.error ? V`
        <div>
          <div class="p-2">Erreur: ${this.error}</div>
        </div>
      ` : this.tournaments.length === 0 ? V`
        <div>
          <div class="text-center p-2">Aucun tournoi trouvé</div>
        </div>
      ` : V`
      <div>
        ${Ms(
      this.tournaments,
      (i) => i.id,
      (i) => V`
            <chess-agenda-item
              .tournament=${i}
              .apiBaseUrl=${this.apiBaseUrl}
              .club=${this.club}
            >
            </chess-agenda-item>
          `
    )}
      </div>
    `;
  }
};
G.styles = [
  It,
  B`
      :host {
        display: block;
      }

      chess-agenda-item {
        display: block;
        margin: 0 0 1.25em 0;
        padding-bottom: 1.25em;
        border-bottom: 1px solid currentColor;
      }
    `
];
ie([
  k({ type: Array })
], G.prototype, "departements", 2);
ie([
  k({ type: String })
], G.prototype, "club", 2);
ie([
  k({ type: Number })
], G.prototype, "limit", 2);
ie([
  k({ type: Boolean })
], G.prototype, "showOnlyClub", 2);
ie([
  k({ type: String })
], G.prototype, "apiBaseUrl", 2);
ie([
  q()
], G.prototype, "tournaments", 2);
ie([
  q()
], G.prototype, "loading", 2);
ie([
  q()
], G.prototype, "error", 2);
G = ie([
  xe("chess-agenda")
], G);
export {
  G as ChessAgenda
};
