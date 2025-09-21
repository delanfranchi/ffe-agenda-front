/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis, at = K.ShadowRoot && (K.ShadyCSS === void 0 || K.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, lt = Symbol(), gt = /* @__PURE__ */ new WeakMap();
let Pt = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== lt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (at && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = gt.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && gt.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const St = (e) => new Pt(typeof e == "string" ? e : e + "", void 0, lt), U = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce(((s, r, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[n + 1]), e[0]);
  return new Pt(i, e, lt);
}, Nt = (e, t) => {
  if (at) e.adoptedStyleSheets = t.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of t) {
    const s = document.createElement("style"), r = K.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = i.cssText, e.appendChild(s);
  }
}, bt = at ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return St(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: It, defineProperty: Bt, getOwnPropertyDescriptor: Ft, getOwnPropertyNames: Wt, getOwnPropertySymbols: qt, getPrototypeOf: Vt } = Object, X = globalThis, wt = X.trustedTypes, Yt = wt ? wt.emptyScript : "", Zt = X.reactiveElementPolyfillSupport, F = (e, t) => e, G = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Yt : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, dt = (e, t) => !It(e, t), yt = { attribute: !0, type: String, converter: G, reflect: !1, useDefault: !1, hasChanged: dt };
Symbol.metadata ??= Symbol("metadata"), X.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let z = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = yt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(t, s, i);
      r !== void 0 && Bt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: r, set: n } = Ft(this.prototype, t) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: r, set(o) {
      const d = r?.call(this);
      n?.call(this, o), this.requestUpdate(t, d, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? yt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(F("elementProperties"))) return;
    const t = Vt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(F("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(F("properties"))) {
      const i = this.properties, s = [...Wt(i), ...qt(i)];
      for (const r of s) this.createProperty(r, i[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [s, r] of i) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const r = this._$Eu(i, s);
      r !== void 0 && this._$Eh.set(r, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s) i.unshift(bt(r));
    } else t !== void 0 && i.push(bt(t));
    return i;
  }
  static _$Eu(t, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(((t) => this.enableUpdating = t)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((t) => t(this)));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Nt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(((t) => t.hostConnected?.()));
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((t) => t.hostDisconnected?.()));
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$ET(t, i) {
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : G).toAttribute(i, s.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : G;
      this._$Em = r;
      const d = o.fromAttribute(i, n.type);
      this[r] = d ?? this._$Ej?.get(r) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, i, s) {
    if (t !== void 0) {
      const r = this.constructor, n = this[t];
      if (s ??= r.getPropertyOptions(t), !((s.hasChanged ?? dt)(n, i) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: r, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? i ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: o } = n, d = this[r];
        o !== !0 || this._$AL.has(r) || d === void 0 || this.C(r, void 0, n, d);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach(((s) => s.hostUpdate?.())), this.update(i)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach(((i) => i.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach(((i) => this._$ET(i, this[i]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
z.elementStyles = [], z.shadowRootOptions = { mode: "open" }, z[F("elementProperties")] = /* @__PURE__ */ new Map(), z[F("finalized")] = /* @__PURE__ */ new Map(), Zt?.({ ReactiveElement: z }), (X.reactiveElementVersions ??= []).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct = globalThis, Q = ct.trustedTypes, vt = Q ? Q.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ot = "$lit$", k = `lit$${Math.random().toFixed(9).slice(2)}$`, Tt = "?" + k, Jt = `<${Tt}>`, D = document, q = () => D.createComment(""), V = (e) => e === null || typeof e != "object" && typeof e != "function", ht = Array.isArray, Kt = (e) => ht(e) || typeof e?.[Symbol.iterator] == "function", rt = `[ 	
\f\r]`, N = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $t = /-->/g, xt = />/g, S = RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _t = /'/g, At = /"/g, Dt = /^(?:script|style|textarea|title)$/i, Mt = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), f = Mt(1), I = Mt(2), C = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), kt = /* @__PURE__ */ new WeakMap(), T = D.createTreeWalker(D, 129);
function Ut(e, t) {
  if (!ht(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return vt !== void 0 ? vt.createHTML(t) : t;
}
const Gt = (e, t) => {
  const i = e.length - 1, s = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = N;
  for (let d = 0; d < i; d++) {
    const a = e[d];
    let p, m, l = -1, u = 0;
    for (; u < a.length && (o.lastIndex = u, m = o.exec(a), m !== null); ) u = o.lastIndex, o === N ? m[1] === "!--" ? o = $t : m[1] !== void 0 ? o = xt : m[2] !== void 0 ? (Dt.test(m[2]) && (r = RegExp("</" + m[2], "g")), o = S) : m[3] !== void 0 && (o = S) : o === S ? m[0] === ">" ? (o = r ?? N, l = -1) : m[1] === void 0 ? l = -2 : (l = o.lastIndex - m[2].length, p = m[1], o = m[3] === void 0 ? S : m[3] === '"' ? At : _t) : o === At || o === _t ? o = S : o === $t || o === xt ? o = N : (o = S, r = void 0);
    const h = o === S && e[d + 1].startsWith("/>") ? " " : "";
    n += o === N ? a + Jt : l >= 0 ? (s.push(p), a.slice(0, l) + Ot + a.slice(l) + k + h) : a + k + (l === -2 ? d : h);
  }
  return [Ut(e, n + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Y {
  constructor({ strings: t, _$litType$: i }, s) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const d = t.length - 1, a = this.parts, [p, m] = Gt(t, i);
    if (this.el = Y.createElement(p, s), T.currentNode = this.el.content, i === 2 || i === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = T.nextNode()) !== null && a.length < d; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(Ot)) {
          const u = m[o++], h = r.getAttribute(l).split(k), g = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: n, name: g[2], strings: h, ctor: g[1] === "." ? Xt : g[1] === "?" ? te : g[1] === "@" ? ee : tt }), r.removeAttribute(l);
        } else l.startsWith(k) && (a.push({ type: 6, index: n }), r.removeAttribute(l));
        if (Dt.test(r.tagName)) {
          const l = r.textContent.split(k), u = l.length - 1;
          if (u > 0) {
            r.textContent = Q ? Q.emptyScript : "";
            for (let h = 0; h < u; h++) r.append(l[h], q()), T.nextNode(), a.push({ type: 2, index: ++n });
            r.append(l[u], q());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Tt) a.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = r.data.indexOf(k, l + 1)) !== -1; ) a.push({ type: 7, index: n }), l += k.length - 1;
      }
      n++;
    }
  }
  static createElement(t, i) {
    const s = D.createElement("template");
    return s.innerHTML = t, s;
  }
}
function R(e, t, i = e, s) {
  if (t === C) return t;
  let r = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const n = V(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(e), r._$AT(e, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = r : i._$Cl = r), r !== void 0 && (t = R(e, r._$AS(e, t.values), r, s)), t;
}
let Qt = class {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: s } = this._$AD, r = (t?.creationScope ?? D).importNode(i, !0);
    T.currentNode = r;
    let n = T.nextNode(), o = 0, d = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let p;
        a.type === 2 ? p = new H(n, n.nextSibling, this, t) : a.type === 1 ? p = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (p = new ie(n, this, t)), this._$AV.push(p), a = s[++d];
      }
      o !== a?.index && (n = T.nextNode(), o++);
    }
    return T.currentNode = D, r;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
};
class H {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, r) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = R(this, t, i), V(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== C && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Kt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && V(this._$AH) ? this._$AA.nextSibling.data = t : this.T(D.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Y.createElement(Ut(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const n = new Qt(r, this), o = n.u(this.options);
      n.p(i), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = kt.get(t.strings);
    return i === void 0 && kt.set(t.strings, i = new Y(t)), i;
  }
  k(t) {
    ht(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, r = 0;
    for (const n of t) r === i.length ? i.push(s = new H(this.O(q()), this.O(q()), this, this.options)) : s = i[r], s._$AI(n), r++;
    r < i.length && (this._$AR(s && s._$AB.nextSibling, r), i.length = r);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class tt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, r, n) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = i, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = c;
  }
  _$AI(t, i = this, s, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = R(this, t, i, 0), o = !V(t) || t !== this._$AH && t !== C, o && (this._$AH = t);
    else {
      const d = t;
      let a, p;
      for (t = n[0], a = 0; a < n.length - 1; a++) p = R(this, d[s + a], i, a), p === C && (p = this._$AH[a]), o ||= !V(p) || p !== this._$AH[a], p === c ? t = c : t !== c && (t += (p ?? "") + n[a + 1]), this._$AH[a] = p;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Xt extends tt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class te extends tt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class ee extends tt {
  constructor(t, i, s, r, n) {
    super(t, i, s, r, n), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = R(this, t, i, 0) ?? c) === C) return;
    const s = this._$AH, r = t === c && s !== c || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== c && (s === c || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ie {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    R(this, t);
  }
}
const re = { I: H }, se = ct.litHtmlPolyfillSupport;
se?.(Y, H), (ct.litHtmlVersions ??= []).push("3.3.1");
const ne = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = i?.renderBefore ?? null;
    s._$litPart$ = r = new H(t.insertBefore(q(), n), n, void 0, i ?? {});
  }
  return r._$AI(e), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = globalThis;
let v = class extends z {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ne(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return C;
  }
};
v._$litElement$ = !0, v.finalized = !0, pt.litElementHydrateSupport?.({ LitElement: v });
const oe = pt.litElementPolyfillSupport;
oe?.({ LitElement: v });
(pt.litElementVersions ??= []).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer((() => {
    customElements.define(e, t);
  })) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ae = { attribute: !0, type: String, converter: G, reflect: !1, hasChanged: dt }, le = (e = ae, t, i) => {
  const { kind: s, metadata: r } = i;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(i.name, e), s === "accessor") {
    const { name: o } = i;
    return { set(d) {
      const a = t.get.call(this);
      t.set.call(this, d), this.requestUpdate(o, a, e);
    }, init(d) {
      return d !== void 0 && this.C(o, void 0, e, d), d;
    } };
  }
  if (s === "setter") {
    const { name: o } = i;
    return function(d) {
      const a = this[o];
      t.call(this, d), this.requestUpdate(o, a, e);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function b(e) {
  return (t, i) => typeof i == "object" ? le(e, t, i) : ((s, r, n) => {
    const o = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function w(e) {
  return b({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ut(e, t) {
  return (i, s, r) => {
    const n = (o) => o.renderRoot?.querySelector(e) ?? null;
    return de(i, s, { get() {
      return n(this);
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zt = { CHILD: 2 }, Rt = (e) => (...t) => ({ _$litDirective$: e, values: t });
class jt {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, i, s) {
    this._$Ct = t, this._$AM = i, this._$Ci = s;
  }
  _$AS(t, i) {
    return this.update(t, i);
  }
  update(t, i) {
    return this.render(...i);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: ce } = re, Ct = () => document.createComment(""), B = (e, t, i) => {
  const s = e._$AA.parentNode, r = t === void 0 ? e._$AB : t._$AA;
  if (i === void 0) {
    const n = s.insertBefore(Ct(), r), o = s.insertBefore(Ct(), r);
    i = new ce(n, o, e, e.options);
  } else {
    const n = i._$AB.nextSibling, o = i._$AM, d = o !== e;
    if (d) {
      let a;
      i._$AQ?.(e), i._$AM = e, i._$AP !== void 0 && (a = e._$AU) !== o._$AU && i._$AP(a);
    }
    if (n !== r || d) {
      let a = i._$AA;
      for (; a !== n; ) {
        const p = a.nextSibling;
        s.insertBefore(a, r), a = p;
      }
    }
  }
  return i;
}, O = (e, t, i = e) => (e._$AI(t, i), e), he = {}, pe = (e, t = he) => e._$AH = t, ue = (e) => e._$AH, st = (e) => {
  e._$AR(), e._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et = (e, t, i) => {
  const s = /* @__PURE__ */ new Map();
  for (let r = t; r <= i; r++) s.set(e[r], r);
  return s;
}, Ht = Rt(class extends jt {
  constructor(e) {
    if (super(e), e.type !== zt.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, i) {
    let s;
    i === void 0 ? i = t : t !== void 0 && (s = t);
    const r = [], n = [];
    let o = 0;
    for (const d of e) r[o] = s ? s(d, o) : o, n[o] = i(d, o), o++;
    return { values: n, keys: r };
  }
  render(e, t, i) {
    return this.dt(e, t, i).values;
  }
  update(e, [t, i, s]) {
    const r = ue(e), { values: n, keys: o } = this.dt(t, i, s);
    if (!Array.isArray(r)) return this.ut = o, n;
    const d = this.ut ??= [], a = [];
    let p, m, l = 0, u = r.length - 1, h = 0, g = n.length - 1;
    for (; l <= u && h <= g; ) if (r[l] === null) l++;
    else if (r[u] === null) u--;
    else if (d[l] === o[h]) a[h] = O(r[l], n[h]), l++, h++;
    else if (d[u] === o[g]) a[g] = O(r[u], n[g]), u--, g--;
    else if (d[l] === o[g]) a[g] = O(r[l], n[g]), B(e, a[g + 1], r[l]), l++, g--;
    else if (d[u] === o[h]) a[h] = O(r[u], n[h]), B(e, r[l], r[u]), u--, h++;
    else if (p === void 0 && (p = Et(o, h, g), m = Et(d, l, u)), p.has(d[l])) if (p.has(d[u])) {
      const _ = m.get(o[h]), it = _ !== void 0 ? r[_] : null;
      if (it === null) {
        const mt = B(e, r[l]);
        O(mt, n[h]), a[h] = mt;
      } else a[h] = O(it, n[h]), B(e, r[l], it), r[_] = null;
      h++;
    } else st(r[u]), u--;
    else st(r[l]), l++;
    for (; h <= g; ) {
      const _ = B(e, a[g + 1]);
      O(_, n[h]), a[h++] = _;
    }
    for (; l <= u; ) {
      const _ = r[l++];
      _ !== null && st(_);
    }
    return this.ut = o, pe(e, a), C;
  }
}), fe = '*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:currentColor}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}:host{line-height:1.2;font-family:var(--ffe-font-family-base),sans-serif}.container{width:100%}@media (min-width: 640px){.container{max-width:640px}}@media (min-width: 768px){.container{max-width:768px}}@media (min-width: 1024px){.container{max-width:1024px}}@media (min-width: 1280px){.container{max-width:1280px}}@media (min-width: 1536px){.container{max-width:1536px}}.btn{display:inline-flex;min-height:2em;align-items:center;gap:.5rem;border-radius:.375rem;border-width:2px;border-color:currentColor;background-color:transparent;padding:.25rem .5rem;font-size:.875rem;line-height:1.25rem;font-weight:600;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.1s}.btn:focus-visible{outline:2px solid transparent;outline-offset:2px;box-shadow:0 0 0 3px #0003}.btn[data-active]{border-color:var(--ffe-neutral-content);background-color:var(--ffe-neutral-content);color:var(--ffe-neutral-bg)}.btn-primary{border-color:var(--ffe-primary);background-color:var(--ffe-primary);color:var(--ffe-primary-content)}.visible{visibility:visible}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.right-3{right:.75rem}.top-3{top:.75rem}.z-10{z-index:10}.my-2{margin-top:.5rem;margin-bottom:.5rem}.mb-1{margin-bottom:.25rem}.mb-3{margin-bottom:.75rem}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.ml-auto{margin-left:auto}.mt-1{margin-top:.25rem}.block{display:block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.grid{display:grid}.hidden{display:none}.min-h-\\[2em\\]{min-height:2em}.w-14{width:3.5rem}.w-\\[6\\.5ch\\]{width:6.5ch}.w-full{width:100%}.max-w-\\[8\\.5rem\\]{max-width:8.5rem}.flex-1{flex:1 1 0%}.shrink-0{flex-shrink:0}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-between{justify-content:space-between}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-x-5{-moz-column-gap:1.25rem;column-gap:1.25rem}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.text-pretty{text-wrap:pretty}.rounded-md{border-radius:.375rem}.border{border-width:1px}.border-2{border-width:2px}.border-b{border-bottom-width:1px}.border-b-2{border-bottom-width:2px}.border-dashed{border-style:dashed}.border-none{border-style:none}.border-current{border-color:currentColor}.bg-neutral-content{background-color:var(--ffe-neutral-content)}.bg-primary{background-color:var(--ffe-primary)}.bg-transparent{background-color:transparent}.p-1{padding:.25rem}.p-2{padding:.5rem}.p-5{padding:1.25rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-\\[2px\\]{padding-left:2px;padding-right:2px}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-4{padding-top:1rem;padding-bottom:1rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.pr-6{padding-right:1.5rem}.pt-1{padding-top:.25rem}.text-center{text-align:center}.text-right{text-align:right}.font-headings{font-family:var(--ffe-headings-font-family)}.text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl\\/none{font-size:1.875rem;line-height:1}.text-lg\\/none{font-size:1.125rem;line-height:1}.text-lg\\/tight{font-size:1.125rem;line-height:1.25}.text-sm{font-size:.875rem;line-height:1.25rem}.text-sm\\/none{font-size:.875rem;line-height:1}.text-sm\\/tight{font-size:.875rem;line-height:1.25}.text-xl\\/tight{font-size:1.25rem;line-height:1.25}.text-xs{font-size:.75rem;line-height:1rem}.font-bold{font-weight:700}.font-medium{font-weight:500}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.text-neutral-bg{color:var(--ffe-neutral-bg)}.text-neutral-content{color:var(--ffe-neutral-content)}.text-primary{color:var(--ffe-primary)}.text-primary-content{color:var(--ffe-primary-content)}.opacity-50{opacity:.5}.blur{--tw-blur: blur(8px);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-filter{-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-100{transition-duration:.1s}.hover\\:bg-\\[rgba\\(0\\,0\\,0\\,0\\.05\\)\\]:hover{background-color:#0000000d}.hover\\:bg-primary:hover{background-color:var(--ffe-primary)}.hover\\:text-primary-content:hover{color:var(--ffe-primary-content)}.group:hover .group-hover\\:underline{text-decoration-line:underline}@media (min-width: 1024px){.lg\\:block{display:block}.lg\\:p-6{padding:1.5rem}.lg\\:text-2xl\\/tight{font-size:1.5rem;line-height:1.25}.lg\\:text-base{font-size:1rem;line-height:1.5rem}.lg\\:text-base\\/tight{font-size:1rem;line-height:1.25}}', Z = U`
  ${St(fe)}
`, ft = "https://ffe-agenda-back.vercel.app", me = (e) => new Date(e).toLocaleDateString("fr-FR", {
  day: "2-digit"
}), ge = (e) => new Date(e).toLocaleDateString("fr-FR", {
  month: "short"
}), be = (e) => new Date(e).toLocaleDateString("fr-FR", {
  year: "numeric"
}), Lt = (e) => {
  const t = me(e.date), i = ge(e.date), s = be(e.date);
  return f`
    <div class="flex flex-col items-center uppercase w-14 ">
      <div class="text-3xl/none font-bold">${t}</div>
      <div class="text-lg/none">${i}</div>
      <div class="text-sm/none mt-1">${s}</div>
    </div>
  `;
}, we = (e, t) => e.filter(
  (i) => i.club?.toLowerCase().includes(t.toLowerCase())
), ye = (e, t) => e.filter(
  (i) => i.club?.toLowerCase().includes(t.toLowerCase())
)?.length, ve = {
  user: I`
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
    `,
  info: I`<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>`,
  close: I`<path d="M18 6 6 18"/><path d="m6 6 12 12"/>`,
  arrowRight: I`<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>`,
  star: I`<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>`
}, W = (e, t = "1.25em") => f`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${t}"
      height="${t}"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-${e}"
    >
      ${ve[e]}
    </svg>
  `;
var $e = Object.defineProperty, xe = Object.getOwnPropertyDescriptor, E = (e, t, i, s) => {
  for (var r = s > 1 ? void 0 : s ? xe(t, i) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (s ? o(t, i, r) : o(r)) || r);
  return s && r && $e(t, i, r), r;
};
let $ = class extends v {
  constructor() {
    super(...arguments), this.club = "", this.players = [], this.details = null, this.loading = !1, this.loaded = !1, this.showOnlyClub = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.tournament && !this.loaded && !this.loading && this.loadTournamentDetails();
  }
  updated(e) {
    super.updated(e), e.has("tournament") && this.tournament && !this.loaded && !this.loading && this.loadTournamentDetails();
  }
  async loadTournamentDetails() {
    if (!(this.loaded || this.loading)) {
      this.loading = !0;
      try {
        const e = this.getBaseApiUrl(), t = this.tournament.id, [i, s] = await Promise.all([
          this.fetchTournamentData(
            `${e}/api/tournaments/${t}/players`
          ),
          this.fetchTournamentData(`${e}/api/tournaments/${t}`)
        ]);
        this.players = this.extractPlayersFromResponse(i), this.details = this.extractDetailsFromResponse(s), this.loaded = !0;
      } catch (e) {
        this.handleLoadError(e);
      } finally {
        this.loading = !1;
      }
    }
  }
  getBaseApiUrl() {
    const e = ft;
    return e.endsWith("/") ? e.slice(0, -1) : e;
  }
  async fetchTournamentData(e) {
    const t = await fetch(e, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      signal: AbortSignal.timeout(1e4)
    });
    if (!t.ok) {
      const i = await t.text();
      throw new Error(`HTTP ${t.status}: ${i}`);
    }
    return t.json();
  }
  extractPlayersFromResponse(e) {
    return e.success && Array.isArray(e.data) ? e.data : Array.isArray(e) ? e : (console.warn("Unexpected players response format:", e), []);
  }
  extractDetailsFromResponse(e) {
    return e.success && e.data?.tournament ? e.data.tournament : e.success && e.data ? e.data : (console.warn("Unexpected details response format:", e), null);
  }
  handleLoadError(e) {
    console.error("Error loading tournament details:", e), this.players = [], this.details = null, this.loaded = !0;
  }
  render() {
    if (!this.tournament) return c;
    const e = this.details || this.tournament, t = ye(this.players, this.club);
    return f`
      ${this.renderTournamentHeader(e)}
      ${this.renderParticipantControls(t)}
      ${this.renderPlayerList()}
    `;
  }
  renderTournamentHeader(e) {
    return f`
      <div class="flex items-start gap-2">
        <div class="shrink-0">${Lt(e)}</div>
        <div class="flex items-start justify-between pt-1">
          <div class="flex-1">
            <div class="text-sm/tight">
              ${e.location} • ${e.department}
            </div>
            <div
              class="text-xl/tight lg:text-2xl/tight  font-bold font-headings mb-6 pr-6 text-pretty"
            >
              ${e.name}
            </div>
            ${this.renderTournamentDetails()}
            <div class="mb-8">
              <a
                href="${e.url}"
                class="flex items-center gap-2 font-semibold group"
                target="_blank"
                rel="noopener"
              >
                ${W("arrowRight")}
                <span class="group-hover:underline">Voir sur le site FFE</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  renderTournamentDetails() {
    const e = this.details;
    return e ? f`
      <div class="flex gap-x-5 flex-wrap my-2">
        ${this.info("Rondes", e.rounds)}
        ${this.info("Cadence", e.timeControl)}
        ${this.info("Appariement", e.pairingSystem)}
      </div>
      <div class="mb-3">${e.address}</div>
    ` : c;
  }
  info(e, t) {
    return t ? f` <div class="flex gap-2">
      <div class="font-semibold">${e}</div>
      <div>${t}</div>
    </div>` : c;
  }
  renderParticipantControls(e) {
    return this.players.length === 0 ? c : f`
      <div class="flex justify-between items-center mb-1">
        <div class="flex gap-2">
          <button
            data-active=${!this.showOnlyClub || c}
            class="btn"
            @click=${() => this.showOnlyClub = !1}
          >
            ${W("user")} Tous les participants (${this.players.length})
          </button>
          ${this.club && e > 0 ? f`
                <button
                  data-active=${this.showOnlyClub || c}
                  class="btn"
                  @click=${() => this.showOnlyClub = !0}
                >
                  ${W("star")} Club (${e})
                </button>
              ` : c}
        </div>
      </div>
    `;
  }
  renderPlayerList() {
    return f`
      <ffe-player-list
        .players=${this.players}
        .club=${this.club}
        .showOnlyClub=${this.showOnlyClub}
      ></ffe-player-list>
    `;
  }
};
$.styles = [
  Z,
  U`
      :host {
        display: block;
      }
    `
];
E([
  b({ type: Object })
], $.prototype, "tournament", 2);
E([
  b({ type: String })
], $.prototype, "club", 2);
E([
  w()
], $.prototype, "players", 2);
E([
  w()
], $.prototype, "details", 2);
E([
  w()
], $.prototype, "loading", 2);
E([
  w()
], $.prototype, "loaded", 2);
E([
  w()
], $.prototype, "showOnlyClub", 2);
$ = E([
  L("ffe-agenda-info")
], $);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class nt extends jt {
  constructor(t) {
    if (super(t), this.it = c, t.type !== zt.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === c || t == null) return this._t = void 0, this.it = t;
    if (t === C) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const i = [t];
    return i.raw = i, this._t = { _$litType$: this.constructor.resultType, strings: i, values: [] };
  }
}
nt.directiveName = "unsafeHTML", nt.resultType = 1;
const _e = Rt(nt);
var Ae = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, et = (e, t, i, s) => {
  for (var r = s > 1 ? void 0 : s ? ke(t, i) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (s ? o(t, i, r) : o(r)) || r);
  return s && r && Ae(t, i, r), r;
};
let j = class extends v {
  constructor() {
    super(...arguments), this.open = !1, this.title = "", this.currentAnimation = null, this.currentOpacityAnimation = null, this.isAnimating = !1, this.closeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.body.removeAttribute("inert");
  }
  show() {
    this.dialogElement && !this.isAnimating && (document.body.setAttribute("inert", ""), this.dialogElement.showModal(), this.open = !0, this.animateIn());
  }
  hide() {
    this.dialogElement && !this.isAnimating && (this.open = !1, this.animateOut());
  }
  animateIn() {
    if (this.dialogElement && !this.isAnimating) {
      if (this.isAnimating = !0, window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches) {
        this.dialogElement.style.opacity = "1", this.dialogElement.style.transform = "translate(-50%, -50%) translateY(0)", this.isAnimating = !1;
        return;
      }
      this.currentAnimation && this.currentAnimation.cancel(), this.currentOpacityAnimation && this.currentOpacityAnimation.cancel(), this.currentOpacityAnimation = this.dialogElement.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        {
          duration: 200,
          easing: "linear",
          fill: "forwards"
        }
      ), this.currentAnimation = this.dialogElement.animate(
        [
          { transform: "translate(-50%, -50%) translateY(20px)" },
          { transform: "translate(-50%, -50%) translateY(0)" }
        ],
        {
          duration: 200,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          // ease
          fill: "forwards"
        }
      ), this.currentAnimation.addEventListener("finish", () => {
        this.isAnimating = !1;
      });
    }
  }
  animateOut() {
    if (this.dialogElement && !this.isAnimating) {
      if (this.isAnimating = !0, window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches) {
        this.dialogElement.close(), document.body.removeAttribute("inert"), this.isAnimating = !1;
        return;
      }
      this.currentAnimation && this.currentAnimation.cancel(), this.currentOpacityAnimation && this.currentOpacityAnimation.cancel(), this.currentOpacityAnimation = this.dialogElement.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        {
          duration: 200,
          easing: "linear",
          fill: "forwards"
        }
      ), this.currentAnimation = this.dialogElement.animate(
        [
          { transform: "translate(-50%, -50%) translateY(0)" },
          { transform: "translate(-50%, -50%) translateY(20px)" }
        ],
        {
          duration: 200,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          // ease
          fill: "forwards"
        }
      ), this.currentAnimation.addEventListener("finish", () => {
        this.dialogElement.close(), document.body.removeAttribute("inert"), this.isAnimating = !1;
      });
    }
  }
  handleClose() {
    this.hide();
  }
  handleBackdropClick(e) {
    e.target === this.dialogElement && this.hide();
  }
  render() {
    return f`
      <dialog
        id="dialog"
        @click=${this.handleBackdropClick}
        @close=${this.handleClose}
        class="p-5 lg:p-6"
      >
        ${this.title ? f`<div
              class="text-2xl font-bold font-headings mb-3 text-pretty pr-6"
            >
              ${this.title}
            </div>` : c}
        <button
          class=" absolute top-3 right-3 z-10 bg-transparent border-none text-2xl text-neutral-content cursor-pointer p-1 rounded-md transition-all hover:bg-primary hover:text-primary-content"
          @click=${this.handleClose}
          aria-label="Fermer"
        >
          ${_e(this.closeSvg)}
        </button>
        <slot></slot>
      </dialog>
    `;
  }
};
j.styles = [
  Z,
  U`
      :host {
        display: block;
      }

      /* Prevent body scroll when dialog is open */
      body:has(dialog[open]) {
        overflow: hidden;
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
        position: fixed;
        top: 50%;
        left: 50%;
        margin: 0;
        transform: translate(-50%, -50%) translateY(-20px);

        /* Initial hidden state */
        opacity: 0;
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

      dialog[open]::backdrop {
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(4px);
        backdrop-filter: blur(0px);
      }
      dialog::backdrop {
        transition-delay: 0.2s;
        transition-duration: 0.3s;
      }

      @media (prefers-reduced-motion: reduce) {
        dialog {
          opacity: 1;
          transform: none;
        }

        dialog::backdrop {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(4px);
        }
      }
    `
];
et([
  b({ type: Boolean, reflect: !0 })
], j.prototype, "open", 2);
et([
  b({ type: String })
], j.prototype, "title", 2);
et([
  ut("#dialog")
], j.prototype, "dialogElement", 2);
j = et([
  L("ffe-dialog")
], j);
var Ce = Object.defineProperty, Ee = Object.getOwnPropertyDescriptor, J = (e, t, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Ee(t, i) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (s ? o(t, i, r) : o(r)) || r);
  return s && r && Ce(t, i, r), r;
};
let M = class extends v {
  constructor() {
    super(...arguments), this.club = "", this.showOnlyClub = !1, this.players = [], this.renderPlayers = [];
  }
  get clubPlayers() {
    return this.club ? this.players.filter(
      (e) => e.club.toLowerCase().includes(this.club.toLowerCase())
    ) : this.players;
  }
  willUpdate(e) {
    const i = (this.showOnlyClub ? this.clubPlayers : this.players).sort((s, r) => r.elo - s.elo);
    this.renderPlayers = i;
  }
  render() {
    return this.renderPlayers.length === 0 ? f`
        <div class="text-center py-6 text-lg/tight opacity-50 text-pretty">
          La liste des participants n'est pas encore publiée
        </div>
      ` : f`
      <div>
        ${Ht(
      this.renderPlayers,
      (e) => e.id,
      (e, t) => {
        const i = e.club.toLowerCase().includes(this.club.toLowerCase()), s = t === this.renderPlayers.length - 1;
        return f`
              <div
                class="flex items-center  rounded-md px-[2px] lg:p-x-2 py-2  w-full gap-3 hover:bg-[rgba(0,0,0,0.05)] transition-all duration-100"
              >
                <div>
                  <div class="font-medium text-sm lg:text-base/tight">
                    ${e.name}
                  </div>
                </div>

                <div class="ml-auto flex items-center gap-2 ">
                  ${this.showOnlyClub ? c : f`<div
                        class="text-xs truncate max-w-[8.5rem] text-right  ${i ? "text-primary font-semibold  " : ""}"
                      >
                        ${e.club}
                      </div>`}
                  <div class="w-[6.5ch] text-right text-sm lg:text-base">
                    ${e.elo}
                  </div>
                </div>
              </div>
              ${s ? c : f`<div
                    class="border-b border-current border-dashed"
                  ></div>`}
            `;
      }
    )}
      </div>
    `;
  }
};
M.styles = [
  Z,
  U`
      :host {
        display: block;
      }
    `
];
J([
  b({ type: String })
], M.prototype, "club", 2);
J([
  b({ type: Boolean })
], M.prototype, "showOnlyClub", 2);
J([
  b({ type: Array })
], M.prototype, "players", 2);
J([
  w()
], M.prototype, "renderPlayers", 2);
M = J([
  L("ffe-player-list")
], M);
var Pe = Object.defineProperty, Se = Object.getOwnPropertyDescriptor, A = (e, t, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Se(t, i) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (s ? o(t, i, r) : o(r)) || r);
  return s && r && Pe(t, i, r), r;
};
let y = class extends v {
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
      (e) => {
        e.forEach((t) => {
          t.isIntersecting && !this.loaded && !this.loading && this.loadTournamentDetails();
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
        const e = ft, t = e.endsWith("/") ? e.slice(0, -1) : e, i = await fetch(
          `${t}/api/tournaments/${this.tournament.id}/players`
        );
        if (!i.ok)
          throw new Error(`HTTP error! status: ${i.status}`);
        const s = await i.json();
        s.success && s.data && (this.players = s.data, this.extractParticipants(), this.loaded = !0);
      } catch (e) {
        console.error("Error loading tournament details:", e);
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
    this.clubParticipants = we(this.players, this.club);
  }
  showInfoDialog() {
    const e = this.infoDialog;
    e && e.show && e.show();
  }
  showParticipantsDialog() {
    const e = this.participantsDialog;
    e && e.show && e.show();
  }
  render() {
    const e = this.clubParticipants.length, t = e > 1 ? `${e} participant·e·s du club` : `${e} participant·e du club`;
    return f`
      <div class="py-4 flex gap-3">
        <div class="shrink-0">${Lt(this.tournament)}</div>
        <div>
          <div class="flex items-start justify-between pt-1">
            <div class="flex-1">
              <div class="text-sm/tight ">
                ${this.tournament.location} • ${this.tournament.department}
              </div>
              <div
                class="text-lg/tight mb-1 font-bold font-headings text-pretty"
              >
                ${this.tournament.name}
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button @click=${this.showInfoDialog} class="btn">
              ${W("info")} <span class="hidden lg:block">Infos</span>
            </button>

            ${this.clubParticipants.length > 0 ? f`<button
                  id="participantsButton"
                  @click=${this.showParticipantsDialog}
                  class="btn btn-primary"
                >
                  ${W("user")}
                  <span>${e} du club</span>
                </button> ` : c}
          </div>
        </div>

        <ffe-dialog id="infoDialog">
          <ffe-agenda-info
            .tournament=${this.tournament}
            .club=${this.club}
          ></ffe-agenda-info>
        </ffe-dialog>

        <ffe-dialog id="participantsDialog" title="${t}">
          ${this.clubParticipants.length > 0 ? f`<ffe-player-list
                .club=${this.club}
                .players=${this.clubParticipants}
                .showOnlyClub=${!0}
              ></ffe-player-list>` : c}
        </ffe-dialog>
      </div>
    `;
  }
};
y.styles = [
  Z,
  U`
      :host {
        display: block;
      }
    `
];
A([
  b({ type: Object })
], y.prototype, "tournament", 2);
A([
  b({ type: String })
], y.prototype, "club", 2);
A([
  w()
], y.prototype, "players", 2);
A([
  w()
], y.prototype, "clubParticipants", 2);
A([
  w()
], y.prototype, "loading", 2);
A([
  w()
], y.prototype, "loaded", 2);
A([
  ut("#infoDialog")
], y.prototype, "infoDialog", 2);
A([
  ut("#participantsDialog")
], y.prototype, "participantsDialog", 2);
y = A([
  L("ffe-agenda-item")
], y);
var Oe = Object.getOwnPropertyDescriptor, Te = (e, t, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Oe(t, i) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = o(r) || r);
  return r;
};
let ot = class extends v {
  render() {
    return f`
      <div id="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  }
};
ot.styles = U`
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
ot = Te([
  L("ffe-agenda-loader")
], ot);
var De = Object.defineProperty, Me = Object.getOwnPropertyDescriptor, P = (e, t, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Me(t, i) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (r = (s ? o(t, i, r) : o(r)) || r);
  return s && r && De(t, i, r), r;
};
let x = class extends v {
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
        const e = new URLSearchParams({
          limit: this.limit.toString(),
          showOnlyClub: this.showOnlyClub.toString(),
          next: "true"
        });
        this.departements.forEach((n) => {
          e.append("department[]", n.toString());
        }), this.club && e.set("club", this.club);
        const t = ft, i = t.endsWith("/") ? t.slice(0, -1) : t, s = await fetch(
          `${i}/api/tournaments?${e}`
        );
        if (!s.ok)
          throw new Error(`HTTP error! status: ${s.status}`);
        const r = await s.json();
        if (r.success && r.data)
          this.tournaments = r.data.tournaments;
        else
          throw new Error(r.error || "Unknown error");
      } catch (e) {
        this.error = e instanceof Error ? e.message : "Unknown error";
      } finally {
        this.loading = !1;
      }
    }
  }
  render() {
    return this.loading ? f` <ffe-agenda-loader></ffe-agenda-loader> ` : this.error ? f`
        <div>
          <div class="p-2">Erreur: ${this.error}</div>
        </div>
      ` : this.tournaments.length === 0 ? f`
        <div>
          <div class="text-center p-2">Aucun tournoi trouvé</div>
        </div>
      ` : f`
      <div>
        ${Ht(
      this.tournaments,
      (e) => e.id,
      (e) => f`
            <ffe-agenda-item
              .tournament=${e}
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
x.styles = [
  Z,
  U`
      :host {
        display: block;
      }
    `
];
P([
  b({ type: Array })
], x.prototype, "departements", 2);
P([
  b({ type: String })
], x.prototype, "club", 2);
P([
  b({ type: Number })
], x.prototype, "limit", 2);
P([
  b({ type: Boolean })
], x.prototype, "showOnlyClub", 2);
P([
  w()
], x.prototype, "tournaments", 2);
P([
  w()
], x.prototype, "loading", 2);
P([
  w()
], x.prototype, "error", 2);
x = P([
  L("ffe-agenda-widget")
], x);
