!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = e()) : "function" == typeof define && define.amd ? define(e) : ((t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e());
})(this, function () {
    "use strict";
    const t = {
            find: (t, e = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e, t)),
            findOne: (t, e = document.documentElement) => Element.prototype.querySelector.call(e, t),
            children: (t, e) => [].concat(...t.children).filter((t) => t.matches(e)),
            parents(t, e) {
                const i = [];
                let s = t.parentNode;
                for (; s && s.nodeType === Node.ELEMENT_NODE && 3 !== s.nodeType; ) s.matches(e) && i.push(s), (s = s.parentNode);
                return i;
            },
            prev(t, e) {
                let i = t.previousElementSibling;
                for (; i; ) {
                    if (i.matches(e)) return [i];
                    i = i.previousElementSibling;
                }
                return [];
            },
            next(t, e) {
                let i = t.nextElementSibling;
                for (; i; ) {
                    if (i.matches(e)) return [i];
                    i = i.nextElementSibling;
                }
                return [];
            },
        },
        e = (t) => {
            do {
                t += Math.floor(1e6 * Math.random());
            } while (document.getElementById(t));
            return t;
        },
        i = (t) => {
            let e = t.getAttribute("data-bs-target");
            if (!e || "#" === e) {
                let i = t.getAttribute("href");
                if (!i || (!i.includes("#") && !i.startsWith("."))) return null;
                i.includes("#") && !i.startsWith("#") && (i = `#${i.split("#")[1]}`), (e = i && "#" !== i ? i.trim() : null);
            }
            return e;
        },
        s = (t) => {
            const e = i(t);
            return e && document.querySelector(e) ? e : null;
        },
        n = (t) => {
            const e = i(t);
            return e ? document.querySelector(e) : null;
        },
        o = (t) => {
            t.dispatchEvent(new Event("transitionend"));
        },
        a = (t) => !(!t || "object" != typeof t) && (void 0 !== t.jquery && (t = t[0]), void 0 !== t.nodeType),
        r = (e) => (a(e) ? (e.jquery ? e[0] : e) : "string" == typeof e && e.length > 0 ? t.findOne(e) : null),
        l = (t, e, i) => {
            Object.keys(i).forEach((s) => {
                const n = i[s],
                    o = e[s],
                    r =
                        o && a(o)
                            ? "element"
                            : ((t) =>
                                  null == t
                                      ? `${t}`
                                      : {}.toString
                                            .call(t)
                                            .match(/\s([a-z]+)/i)[1]
                                            .toLowerCase())(o);
                if (!new RegExp(n).test(r)) throw new TypeError(`${t.toUpperCase()}: Option "${s}" provided type "${r}" but expected type "${n}".`);
            });
        },
        h = (t) => !(!a(t) || 0 === t.getClientRects().length) && "visible" === getComputedStyle(t).getPropertyValue("visibility"),
        c = (t) => !t || t.nodeType !== Node.ELEMENT_NODE || !!t.classList.contains("disabled") || (void 0 !== t.disabled ? t.disabled : t.hasAttribute("disabled") && "false" !== t.getAttribute("disabled")),
        u = (t) => {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof t.getRootNode) {
                const e = t.getRootNode();
                return e instanceof ShadowRoot ? e : null;
            }
            return t instanceof ShadowRoot ? t : t.parentNode ? u(t.parentNode) : null;
        },
        d = () => {},
        p = (t) => t.offsetHeight,
        f = () => {
            const { jQuery: t } = window;
            return t && !document.body.hasAttribute("data-bs-no-jquery") ? t : null;
        },
        g = [],
        m = () => "rtl" === document.documentElement.dir,
        v = (t) => {
            ((t) => {
                "loading" === document.readyState
                    ? (g.length ||
                          document.addEventListener("DOMContentLoaded", () => {
                              g.forEach((t) => t());
                          }),
                      g.push(t))
                    : t();
            })(() => {
                const e = f();
                if (e) {
                    const i = t.NAME,
                        s = e.fn[i];
                    (e.fn[i] = t.jQueryInterface), (e.fn[i].Constructor = t), (e.fn[i].noConflict = () => ((e.fn[i] = s), t.jQueryInterface));
                }
            });
        },
        _ = (t) => {
            "function" == typeof t && t();
        },
        b = (t, e, i = !0) => {
            if (!i) return void _(t);
            const s =
                ((t) => {
                    if (!t) return 0;
                    let { transitionDuration: e, transitionDelay: i } = window.getComputedStyle(t);
                    const s = Number.parseFloat(e),
                        n = Number.parseFloat(i);
                    return s || n ? ((e = e.split(",")[0]), (i = i.split(",")[0]), 1e3 * (Number.parseFloat(e) + Number.parseFloat(i))) : 0;
                })(e) + 5;
            let n = !1;
            const a = ({ target: i }) => {
                i === e && ((n = !0), e.removeEventListener("transitionend", a), _(t));
            };
            e.addEventListener("transitionend", a),
                setTimeout(() => {
                    n || o(e);
                }, s);
        },
        y = (t, e, i, s) => {
            let n = t.indexOf(e);
            if (-1 === n) return t[!i && s ? t.length - 1 : 0];
            const o = t.length;
            return (n += i ? 1 : -1), s && (n = (n + o) % o), t[Math.max(0, Math.min(n, o - 1))];
        },
        w = /[^.]*(?=\..*)\.|.*/,
        x = /\..*/,
        C = /::\d+$/,
        k = {};
    let D = 1;
    const E = { mouseenter: "mouseover", mouseleave: "mouseout" },
        I = /^(mouseenter|mouseleave)/i,
        A = new Set([
            "click",
            "dblclick",
            "mouseup",
            "mousedown",
            "contextmenu",
            "mousewheel",
            "DOMMouseScroll",
            "mouseover",
            "mouseout",
            "mousemove",
            "selectstart",
            "selectend",
            "keydown",
            "keypress",
            "keyup",
            "orientationchange",
            "touchstart",
            "touchmove",
            "touchend",
            "touchcancel",
            "pointerdown",
            "pointermove",
            "pointerup",
            "pointerleave",
            "pointercancel",
            "gesturestart",
            "gesturechange",
            "gestureend",
            "focus",
            "blur",
            "change",
            "reset",
            "select",
            "submit",
            "focusin",
            "focusout",
            "load",
            "unload",
            "beforeunload",
            "resize",
            "move",
            "DOMContentLoaded",
            "readystatechange",
            "error",
            "abort",
            "scroll",
        ]);
    function S(t, e) {
        return (e && `${e}::${D++}`) || t.uidEvent || D++;
    }
    function T(t) {
        const e = S(t);
        return (t.uidEvent = e), (k[e] = k[e] || {}), k[e];
    }
    function M(t, e, i = null) {
        const s = Object.keys(t);
        for (let n = 0, o = s.length; n < o; n++) {
            const o = t[s[n]];
            if (o.originalHandler === e && o.delegationSelector === i) return o;
        }
        return null;
    }
    function P(t, e, i) {
        const s = "string" == typeof e,
            n = s ? i : e;
        let o = z(t);
        return A.has(o) || (o = t), [s, n, o];
    }
    function F(t, e, i, s, n) {
        if ("string" != typeof e || !t) return;
        if ((i || ((i = s), (s = null)), I.test(e))) {
            const t = (t) =>
                function (e) {
                    if (!e.relatedTarget || (e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget))) return t.call(this, e);
                };
            s ? (s = t(s)) : (i = t(i));
        }
        const [o, a, r] = P(e, i, s),
            l = T(t),
            h = l[r] || (l[r] = {}),
            c = M(h, a, o ? i : null);
        if (c) return void (c.oneOff = c.oneOff && n);
        const u = S(a, e.replace(w, "")),
            d = o
                ? (function (t, e, i) {
                      return function s(n) {
                          const o = t.querySelectorAll(e);
                          for (let { target: a } = n; a && a !== this; a = a.parentNode) for (let r = o.length; r--; ) if (o[r] === a) return (n.delegateTarget = a), s.oneOff && L.off(t, n.type, e, i), i.apply(a, [n]);
                          return null;
                      };
                  })(t, i, s)
                : (function (t, e) {
                      return function i(s) {
                          return (s.delegateTarget = t), i.oneOff && L.off(t, s.type, e), e.apply(t, [s]);
                      };
                  })(t, i);
        (d.delegationSelector = o ? i : null), (d.originalHandler = a), (d.oneOff = n), (d.uidEvent = u), (h[u] = d), t.addEventListener(r, d, o);
    }
    function O(t, e, i, s, n) {
        const o = M(e[i], s, n);
        o && (t.removeEventListener(i, o, Boolean(n)), delete e[i][o.uidEvent]);
    }
    function z(t) {
        return (t = t.replace(x, "")), E[t] || t;
    }
    const L = {
            on(t, e, i, s) {
                F(t, e, i, s, !1);
            },
            one(t, e, i, s) {
                F(t, e, i, s, !0);
            },
            off(t, e, i, s) {
                if ("string" != typeof e || !t) return;
                const [n, o, a] = P(e, i, s),
                    r = a !== e,
                    l = T(t),
                    h = e.startsWith(".");
                if (void 0 !== o) {
                    if (!l || !l[a]) return;
                    return void O(t, l, a, o, n ? i : null);
                }
                h &&
                    Object.keys(l).forEach((i) => {
                        !(function (t, e, i, s) {
                            const n = e[i] || {};
                            Object.keys(n).forEach((o) => {
                                if (o.includes(s)) {
                                    const s = n[o];
                                    O(t, e, i, s.originalHandler, s.delegationSelector);
                                }
                            });
                        })(t, l, i, e.slice(1));
                    });
                const c = l[a] || {};
                Object.keys(c).forEach((i) => {
                    const s = i.replace(C, "");
                    if (!r || e.includes(s)) {
                        const e = c[i];
                        O(t, l, a, e.originalHandler, e.delegationSelector);
                    }
                });
            },
            trigger(t, e, i) {
                if ("string" != typeof e || !t) return null;
                const s = f(),
                    n = z(e),
                    o = e !== n,
                    a = A.has(n);
                let r,
                    l = !0,
                    h = !0,
                    c = !1,
                    u = null;
                return (
                    o && s && ((r = s.Event(e, i)), s(t).trigger(r), (l = !r.isPropagationStopped()), (h = !r.isImmediatePropagationStopped()), (c = r.isDefaultPrevented())),
                    a ? (u = document.createEvent("HTMLEvents")).initEvent(n, l, !0) : (u = new CustomEvent(e, { bubbles: l, cancelable: !0 })),
                    void 0 !== i &&
                        Object.keys(i).forEach((t) => {
                            Object.defineProperty(u, t, { get: () => i[t] });
                        }),
                    c && u.preventDefault(),
                    h && t.dispatchEvent(u),
                    u.defaultPrevented && void 0 !== r && r.preventDefault(),
                    u
                );
            },
        },
        N = new Map();
    var $ = {
        set(t, e, i) {
            N.has(t) || N.set(t, new Map());
            const s = N.get(t);
            s.has(e) || 0 === s.size ? s.set(e, i) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s.keys())[0]}.`);
        },
        get: (t, e) => (N.has(t) && N.get(t).get(e)) || null,
        remove(t, e) {
            if (!N.has(t)) return;
            const i = N.get(t);
            i.delete(e), 0 === i.size && N.delete(t);
        },
    };
    const H = "5.0.2";
    class W {
        constructor(t) {
            (t = r(t)) && ((this._element = t), $.set(this._element, this.constructor.DATA_KEY, this));
        }
        dispose() {
            $.remove(this._element, this.constructor.DATA_KEY),
                L.off(this._element, this.constructor.EVENT_KEY),
                Object.getOwnPropertyNames(this).forEach((t) => {
                    this[t] = null;
                });
        }
        _queueCallback(t, e, i = !0) {
            b(t, e, i);
        }
        static getInstance(t) {
            return $.get(t, this.DATA_KEY);
        }
        static getOrCreateInstance(t, e = {}) {
            return this.getInstance(t) || new this(t, "object" == typeof e ? e : null);
        }
        static get VERSION() {
            return H;
        }
        static get NAME() {
            throw new Error('You have to implement the static method "NAME", for each component!');
        }
        static get DATA_KEY() {
            return `bs.${this.NAME}`;
        }
        static get EVENT_KEY() {
            return `.${this.DATA_KEY}`;
        }
    }
    const R = "alert",
        j = "close.bs.alert",
        q = "closed.bs.alert",
        B = "alert",
        Y = "fade",
        V = "show";
    class K extends W {
        static get NAME() {
            return R;
        }
        close(t) {
            const e = t ? this._getRootElement(t) : this._element,
                i = this._triggerCloseEvent(e);
            null === i || i.defaultPrevented || this._removeElement(e);
        }
        _getRootElement(t) {
            return n(t) || t.closest(`.${B}`);
        }
        _triggerCloseEvent(t) {
            return L.trigger(t, j);
        }
        _removeElement(t) {
            t.classList.remove(V);
            const e = t.classList.contains(Y);
            this._queueCallback(() => this._destroyElement(t), t, e);
        }
        _destroyElement(t) {
            t.remove(), L.trigger(t, q);
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = K.getOrCreateInstance(this);
                "close" === t && e[t](this);
            });
        }
        static handleDismiss(t) {
            return function (e) {
                e && e.preventDefault(), t.close(this);
            };
        }
    }
    L.on(document, "click.bs.alert.data-api", '[data-bs-dismiss="alert"]', K.handleDismiss(new K())), v(K);
    const U = "button",
        Q = "active";
    class X extends W {
        static get NAME() {
            return U;
        }
        toggle() {
            this._element.setAttribute("aria-pressed", this._element.classList.toggle(Q));
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = X.getOrCreateInstance(this);
                "toggle" === t && e[t]();
            });
        }
    }
    function Z(t) {
        return "true" === t || ("false" !== t && (t === Number(t).toString() ? Number(t) : "" === t || "null" === t ? null : t));
    }
    function G(t) {
        return t.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
    }
    L.on(document, "click.bs.button.data-api", '[data-bs-toggle="button"]', (t) => {
        t.preventDefault();
        const e = t.target.closest('[data-bs-toggle="button"]');
        X.getOrCreateInstance(e).toggle();
    }),
        v(X);
    const J = {
            setDataAttribute(t, e, i) {
                t.setAttribute(`data-bs-${G(e)}`, i);
            },
            removeDataAttribute(t, e) {
                t.removeAttribute(`data-bs-${G(e)}`);
            },
            getDataAttributes(t) {
                if (!t) return {};
                const e = {};
                return (
                    Object.keys(t.dataset)
                        .filter((t) => t.startsWith("bs"))
                        .forEach((i) => {
                            let s = i.replace(/^bs/, "");
                            (s = s.charAt(0).toLowerCase() + s.slice(1, s.length)), (e[s] = Z(t.dataset[i]));
                        }),
                    e
                );
            },
            getDataAttribute: (t, e) => Z(t.getAttribute(`data-bs-${G(e)}`)),
            offset(t) {
                const e = t.getBoundingClientRect();
                return { top: e.top + document.body.scrollTop, left: e.left + document.body.scrollLeft };
            },
            position: (t) => ({ top: t.offsetTop, left: t.offsetLeft }),
        },
        tt = "carousel",
        et = 500,
        it = 40,
        st = { interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0, touch: !0 },
        nt = { interval: "(number|boolean)", keyboard: "boolean", slide: "(boolean|string)", pause: "(string|boolean)", wrap: "boolean", touch: "boolean" },
        ot = "next",
        at = "prev",
        rt = "left",
        lt = "right",
        ht = { ArrowLeft: lt, ArrowRight: rt },
        ct = "slide.bs.carousel",
        ut = "slid.bs.carousel",
        dt = "keydown.bs.carousel",
        pt = "mouseenter.bs.carousel",
        ft = "mouseleave.bs.carousel",
        gt = "touchstart.bs.carousel",
        mt = "touchmove.bs.carousel",
        vt = "touchend.bs.carousel",
        _t = "pointerdown.bs.carousel",
        bt = "pointerup.bs.carousel",
        yt = "dragstart.bs.carousel",
        wt = "carousel",
        xt = "active",
        Ct = "slide",
        kt = "carousel-item-end",
        Dt = "carousel-item-start",
        Et = "carousel-item-next",
        It = "carousel-item-prev",
        At = "pointer-event",
        St = ".active",
        Tt = ".active.carousel-item",
        Mt = ".carousel-item",
        Pt = ".carousel-item img",
        Ft = ".carousel-item-next, .carousel-item-prev",
        Ot = ".carousel-indicators",
        zt = "[data-bs-target]",
        Lt = "touch",
        Nt = "pen";
    class $t extends W {
        constructor(e, i) {
            super(e),
                (this._items = null),
                (this._interval = null),
                (this._activeElement = null),
                (this._isPaused = !1),
                (this._isSliding = !1),
                (this.touchTimeout = null),
                (this.touchStartX = 0),
                (this.touchDeltaX = 0),
                (this._config = this._getConfig(i)),
                (this._indicatorsElement = t.findOne(Ot, this._element)),
                (this._touchSupported = "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0),
                (this._pointerEvent = Boolean(window.PointerEvent)),
                this._addEventListeners();
        }
        static get Default() {
            return st;
        }
        static get NAME() {
            return tt;
        }
        next() {
            this._slide(ot);
        }
        nextWhenVisible() {
            !document.hidden && h(this._element) && this.next();
        }
        prev() {
            this._slide(at);
        }
        pause(e) {
            e || (this._isPaused = !0), t.findOne(Ft, this._element) && (o(this._element), this.cycle(!0)), clearInterval(this._interval), (this._interval = null);
        }
        cycle(t) {
            t || (this._isPaused = !1),
                this._interval && (clearInterval(this._interval), (this._interval = null)),
                this._config && this._config.interval && !this._isPaused && (this._updateInterval(), (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval)));
        }
        to(e) {
            this._activeElement = t.findOne(Tt, this._element);
            const i = this._getItemIndex(this._activeElement);
            if (e > this._items.length - 1 || e < 0) return;
            if (this._isSliding) return void L.one(this._element, ut, () => this.to(e));
            if (i === e) return this.pause(), void this.cycle();
            const s = e > i ? ot : at;
            this._slide(s, this._items[e]);
        }
        _getConfig(t) {
            return (t = { ...st, ...J.getDataAttributes(this._element), ...("object" == typeof t ? t : {}) }), l(tt, t, nt), t;
        }
        _handleSwipe() {
            const t = Math.abs(this.touchDeltaX);
            if (t <= it) return;
            const e = t / this.touchDeltaX;
            (this.touchDeltaX = 0), e && this._slide(e > 0 ? lt : rt);
        }
        _addEventListeners() {
            this._config.keyboard && L.on(this._element, dt, (t) => this._keydown(t)),
                "hover" === this._config.pause && (L.on(this._element, pt, (t) => this.pause(t)), L.on(this._element, ft, (t) => this.cycle(t))),
                this._config.touch && this._touchSupported && this._addTouchEventListeners();
        }
        _addTouchEventListeners() {
            const e = (t) => {
                    !this._pointerEvent || (t.pointerType !== Nt && t.pointerType !== Lt) ? this._pointerEvent || (this.touchStartX = t.touches[0].clientX) : (this.touchStartX = t.clientX);
                },
                i = (t) => {
                    this.touchDeltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this.touchStartX;
                },
                s = (t) => {
                    !this._pointerEvent || (t.pointerType !== Nt && t.pointerType !== Lt) || (this.touchDeltaX = t.clientX - this.touchStartX),
                        this._handleSwipe(),
                        "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), (this.touchTimeout = setTimeout((t) => this.cycle(t), et + this._config.interval)));
                };
            t.find(Pt, this._element).forEach((t) => {
                L.on(t, yt, (t) => t.preventDefault());
            }),
                this._pointerEvent
                    ? (L.on(this._element, _t, (t) => e(t)), L.on(this._element, bt, (t) => s(t)), this._element.classList.add(At))
                    : (L.on(this._element, gt, (t) => e(t)), L.on(this._element, mt, (t) => i(t)), L.on(this._element, vt, (t) => s(t)));
        }
        _keydown(t) {
            if (/input|textarea/i.test(t.target.tagName)) return;
            const e = ht[t.key];
            e && (t.preventDefault(), this._slide(e));
        }
        _getItemIndex(e) {
            return (this._items = e && e.parentNode ? t.find(Mt, e.parentNode) : []), this._items.indexOf(e);
        }
        _getItemByOrder(t, e) {
            const i = t === ot;
            return y(this._items, e, i, this._config.wrap);
        }
        _triggerSlideEvent(e, i) {
            const s = this._getItemIndex(e),
                n = this._getItemIndex(t.findOne(Tt, this._element));
            return L.trigger(this._element, ct, { relatedTarget: e, direction: i, from: n, to: s });
        }
        _setActiveIndicatorElement(e) {
            if (this._indicatorsElement) {
                const i = t.findOne(St, this._indicatorsElement);
                i.classList.remove(xt), i.removeAttribute("aria-current");
                const s = t.find(zt, this._indicatorsElement);
                for (let t = 0; t < s.length; t++)
                    if (Number.parseInt(s[t].getAttribute("data-bs-slide-to"), 10) === this._getItemIndex(e)) {
                        s[t].classList.add(xt), s[t].setAttribute("aria-current", "true");
                        break;
                    }
            }
        }
        _updateInterval() {
            const e = this._activeElement || t.findOne(Tt, this._element);
            if (!e) return;
            const i = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
            i ? ((this._config.defaultInterval = this._config.defaultInterval || this._config.interval), (this._config.interval = i)) : (this._config.interval = this._config.defaultInterval || this._config.interval);
        }
        _slide(e, i) {
            const s = this._directionToOrder(e),
                n = t.findOne(Tt, this._element),
                o = this._getItemIndex(n),
                a = i || this._getItemByOrder(s, n),
                r = this._getItemIndex(a),
                l = Boolean(this._interval),
                h = s === ot,
                c = h ? Dt : kt,
                u = h ? Et : It,
                d = this._orderToDirection(s);
            if (a && a.classList.contains(xt)) return void (this._isSliding = !1);
            if (this._isSliding) return;
            if (this._triggerSlideEvent(a, d).defaultPrevented) return;
            if (!n || !a) return;
            (this._isSliding = !0), l && this.pause(), this._setActiveIndicatorElement(a), (this._activeElement = a);
            const f = () => {
                L.trigger(this._element, ut, { relatedTarget: a, direction: d, from: o, to: r });
            };
            if (this._element.classList.contains(Ct)) {
                a.classList.add(u), p(a), n.classList.add(c), a.classList.add(c);
                const t = () => {
                    a.classList.remove(c, u), a.classList.add(xt), n.classList.remove(xt, u, c), (this._isSliding = !1), setTimeout(f, 0);
                };
                this._queueCallback(t, n, !0);
            } else n.classList.remove(xt), a.classList.add(xt), (this._isSliding = !1), f();
            l && this.cycle();
        }
        _directionToOrder(t) {
            return [lt, rt].includes(t) ? (m() ? (t === rt ? at : ot) : t === rt ? ot : at) : t;
        }
        _orderToDirection(t) {
            return [ot, at].includes(t) ? (m() ? (t === at ? rt : lt) : t === at ? lt : rt) : t;
        }
        static carouselInterface(t, e) {
            const i = $t.getOrCreateInstance(t, e);
            let { _config: s } = i;
            "object" == typeof e && (s = { ...s, ...e });
            const n = "string" == typeof e ? e : s.slide;
            if ("number" == typeof e) i.to(e);
            else if ("string" == typeof n) {
                if (void 0 === i[n]) throw new TypeError(`No method named "${n}"`);
                i[n]();
            } else s.interval && s.ride && (i.pause(), i.cycle());
        }
        static jQueryInterface(t) {
            return this.each(function () {
                $t.carouselInterface(this, t);
            });
        }
        static dataApiClickHandler(t) {
            const e = n(this);
            if (!e || !e.classList.contains(wt)) return;
            const i = { ...J.getDataAttributes(e), ...J.getDataAttributes(this) },
                s = this.getAttribute("data-bs-slide-to");
            s && (i.interval = !1), $t.carouselInterface(e, i), s && $t.getInstance(e).to(s), t.preventDefault();
        }
    }
    L.on(document, "click.bs.carousel.data-api", "[data-bs-slide], [data-bs-slide-to]", $t.dataApiClickHandler),
        L.on(window, "load.bs.carousel.data-api", () => {
            const e = t.find('[data-bs-ride="carousel"]');
            for (let t = 0, i = e.length; t < i; t++) $t.carouselInterface(e[t], $t.getInstance(e[t]));
        }),
        v($t);
    const Ht = "collapse",
        Wt = "bs.collapse",
        Rt = `.${Wt}`,
        jt = { toggle: !0, parent: "" },
        qt = { toggle: "boolean", parent: "(string|element)" },
        Bt = `show${Rt}`,
        Yt = `shown${Rt}`,
        Vt = `hide${Rt}`,
        Kt = `hidden${Rt}`,
        Ut = `click${Rt}.data-api`,
        Qt = "show",
        Xt = "collapse",
        Zt = "collapsing",
        Gt = "collapsed",
        Jt = "width",
        te = "height",
        ee = ".show, .collapsing",
        ie = '[data-bs-toggle="collapse"]';
    class se extends W {
        constructor(e, i) {
            super(e), (this._isTransitioning = !1), (this._config = this._getConfig(i)), (this._triggerArray = t.find(`${ie}[href="#${this._element.id}"],` + `${ie}[data-bs-target="#${this._element.id}"]`));
            const n = t.find(ie);
            for (let e = 0, i = n.length; e < i; e++) {
                const i = n[e],
                    o = s(i),
                    a = t.find(o).filter((t) => t === this._element);
                null !== o && a.length && ((this._selector = o), this._triggerArray.push(i));
            }
            (this._parent = this._config.parent ? this._getParent() : null), this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle();
        }
        static get Default() {
            return jt;
        }
        static get NAME() {
            return Ht;
        }
        toggle() {
            this._element.classList.contains(Qt) ? this.hide() : this.show();
        }
        show() {
            if (this._isTransitioning || this._element.classList.contains(Qt)) return;
            let e, i;
            this._parent && 0 === (e = t.find(ee, this._parent).filter((t) => ("string" == typeof this._config.parent ? t.getAttribute("data-bs-parent") === this._config.parent : t.classList.contains(Xt)))).length && (e = null);
            const s = t.findOne(this._selector);
            if (e) {
                const t = e.find((t) => s !== t);
                if ((i = t ? se.getInstance(t) : null) && i._isTransitioning) return;
            }
            if (L.trigger(this._element, Bt).defaultPrevented) return;
            e &&
                e.forEach((t) => {
                    s !== t && se.collapseInterface(t, "hide"), i || $.set(t, Wt, null);
                });
            const n = this._getDimension();
            this._element.classList.remove(Xt),
                this._element.classList.add(Zt),
                (this._element.style[n] = 0),
                this._triggerArray.length &&
                    this._triggerArray.forEach((t) => {
                        t.classList.remove(Gt), t.setAttribute("aria-expanded", !0);
                    }),
                this.setTransitioning(!0);
            const o = `scroll${n[0].toUpperCase() + n.slice(1)}`;
            this._queueCallback(
                () => {
                    this._element.classList.remove(Zt), this._element.classList.add(Xt, Qt), (this._element.style[n] = ""), this.setTransitioning(!1), L.trigger(this._element, Yt);
                },
                this._element,
                !0
            ),
                (this._element.style[n] = `${this._element[o]}px`);
        }
        hide() {
            if (this._isTransitioning || !this._element.classList.contains(Qt)) return;
            if (L.trigger(this._element, Vt).defaultPrevented) return;
            const t = this._getDimension();
            (this._element.style[t] = `${this._element.getBoundingClientRect()[t]}px`), p(this._element), this._element.classList.add(Zt), this._element.classList.remove(Xt, Qt);
            const e = this._triggerArray.length;
            if (e > 0)
                for (let t = 0; t < e; t++) {
                    const e = this._triggerArray[t],
                        i = n(e);
                    i && !i.classList.contains(Qt) && (e.classList.add(Gt), e.setAttribute("aria-expanded", !1));
                }
            this.setTransitioning(!0);
            (this._element.style[t] = ""),
                this._queueCallback(
                    () => {
                        this.setTransitioning(!1), this._element.classList.remove(Zt), this._element.classList.add(Xt), L.trigger(this._element, Kt);
                    },
                    this._element,
                    !0
                );
        }
        setTransitioning(t) {
            this._isTransitioning = t;
        }
        _getConfig(t) {
            return ((t = { ...jt, ...t }).toggle = Boolean(t.toggle)), l(Ht, t, qt), t;
        }
        _getDimension() {
            return this._element.classList.contains(Jt) ? Jt : te;
        }
        _getParent() {
            let { parent: e } = this._config;
            e = r(e);
            const i = `${ie}[data-bs-parent="${e}"]`;
            return (
                t.find(i, e).forEach((t) => {
                    const e = n(t);
                    this._addAriaAndCollapsedClass(e, [t]);
                }),
                e
            );
        }
        _addAriaAndCollapsedClass(t, e) {
            if (!t || !e.length) return;
            const i = t.classList.contains(Qt);
            e.forEach((t) => {
                i ? t.classList.remove(Gt) : t.classList.add(Gt), t.setAttribute("aria-expanded", i);
            });
        }
        static collapseInterface(t, e) {
            let i = se.getInstance(t);
            const s = { ...jt, ...J.getDataAttributes(t), ...("object" == typeof e && e ? e : {}) };
            if ((!i && s.toggle && "string" == typeof e && /show|hide/.test(e) && (s.toggle = !1), i || (i = new se(t, s)), "string" == typeof e)) {
                if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
                i[e]();
            }
        }
        static jQueryInterface(t) {
            return this.each(function () {
                se.collapseInterface(this, t);
            });
        }
    }
    L.on(document, Ut, ie, function (e) {
        ("A" === e.target.tagName || (e.delegateTarget && "A" === e.delegateTarget.tagName)) && e.preventDefault();
        const i = J.getDataAttributes(this),
            n = s(this);
        t.find(n).forEach((t) => {
            const e = se.getInstance(t);
            let s;
            e ? (null === e._parent && "string" == typeof i.parent && ((e._config.parent = i.parent), (e._parent = e._getParent())), (s = "toggle")) : (s = i), se.collapseInterface(t, s);
        });
    }),
        v(se);
    var ne = "top",
        oe = "bottom",
        ae = "right",
        re = "left",
        le = "auto",
        he = [ne, oe, ae, re],
        ce = "start",
        ue = "end",
        de = "clippingParents",
        pe = "viewport",
        fe = "popper",
        ge = "reference",
        me = he.reduce(function (t, e) {
            return t.concat([e + "-" + ce, e + "-" + ue]);
        }, []),
        ve = [].concat(he, [le]).reduce(function (t, e) {
            return t.concat([e, e + "-" + ce, e + "-" + ue]);
        }, []),
        _e = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];
    function be(t) {
        return t ? (t.nodeName || "").toLowerCase() : null;
    }
    function ye(t) {
        if (null == t) return window;
        if ("[object Window]" !== t.toString()) {
            var e = t.ownerDocument;
            return (e && e.defaultView) || window;
        }
        return t;
    }
    function we(t) {
        return t instanceof ye(t).Element || t instanceof Element;
    }
    function xe(t) {
        return t instanceof ye(t).HTMLElement || t instanceof HTMLElement;
    }
    function Ce(t) {
        return "undefined" != typeof ShadowRoot && (t instanceof ye(t).ShadowRoot || t instanceof ShadowRoot);
    }
    var ke = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function (t) {
            var e = t.state;
            Object.keys(e.elements).forEach(function (t) {
                var i = e.styles[t] || {},
                    s = e.attributes[t] || {},
                    n = e.elements[t];
                xe(n) &&
                    be(n) &&
                    (Object.assign(n.style, i),
                    Object.keys(s).forEach(function (t) {
                        var e = s[t];
                        !1 === e ? n.removeAttribute(t) : n.setAttribute(t, !0 === e ? "" : e);
                    }));
            });
        },
        effect: function (t) {
            var e = t.state,
                i = { popper: { position: e.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
            return (
                Object.assign(e.elements.popper.style, i.popper),
                (e.styles = i),
                e.elements.arrow && Object.assign(e.elements.arrow.style, i.arrow),
                function () {
                    Object.keys(e.elements).forEach(function (t) {
                        var s = e.elements[t],
                            n = e.attributes[t] || {},
                            o = Object.keys(e.styles.hasOwnProperty(t) ? e.styles[t] : i[t]).reduce(function (t, e) {
                                return (t[e] = ""), t;
                            }, {});
                        xe(s) &&
                            be(s) &&
                            (Object.assign(s.style, o),
                            Object.keys(n).forEach(function (t) {
                                s.removeAttribute(t);
                            }));
                    });
                }
            );
        },
        requires: ["computeStyles"],
    };
    function De(t) {
        return t.split("-")[0];
    }
    function Ee(t) {
        var e = t.getBoundingClientRect();
        return { width: e.width, height: e.height, top: e.top, right: e.right, bottom: e.bottom, left: e.left, x: e.left, y: e.top };
    }
    function Ie(t) {
        var e = Ee(t),
            i = t.offsetWidth,
            s = t.offsetHeight;
        return Math.abs(e.width - i) <= 1 && (i = e.width), Math.abs(e.height - s) <= 1 && (s = e.height), { x: t.offsetLeft, y: t.offsetTop, width: i, height: s };
    }
    function Ae(t, e) {
        var i = e.getRootNode && e.getRootNode();
        if (t.contains(e)) return !0;
        if (i && Ce(i)) {
            var s = e;
            do {
                if (s && t.isSameNode(s)) return !0;
                s = s.parentNode || s.host;
            } while (s);
        }
        return !1;
    }
    function Se(t) {
        return ye(t).getComputedStyle(t);
    }
    function Te(t) {
        return ["table", "td", "th"].indexOf(be(t)) >= 0;
    }
    function Me(t) {
        return ((we(t) ? t.ownerDocument : t.document) || window.document).documentElement;
    }
    function Pe(t) {
        return "html" === be(t) ? t : t.assignedSlot || t.parentNode || (Ce(t) ? t.host : null) || Me(t);
    }
    function Fe(t) {
        return xe(t) && "fixed" !== Se(t).position ? t.offsetParent : null;
    }
    function Oe(t) {
        for (var e = ye(t), i = Fe(t); i && Te(i) && "static" === Se(i).position; ) i = Fe(i);
        return i && ("html" === be(i) || ("body" === be(i) && "static" === Se(i).position))
            ? e
            : i ||
                  (function (t) {
                      var e = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
                      if (-1 !== navigator.userAgent.indexOf("Trident") && xe(t) && "fixed" === Se(t).position) return null;
                      for (var i = Pe(t); xe(i) && ["html", "body"].indexOf(be(i)) < 0; ) {
                          var s = Se(i);
                          if (
                              "none" !== s.transform ||
                              "none" !== s.perspective ||
                              "paint" === s.contain ||
                              -1 !== ["transform", "perspective"].indexOf(s.willChange) ||
                              (e && "filter" === s.willChange) ||
                              (e && s.filter && "none" !== s.filter)
                          )
                              return i;
                          i = i.parentNode;
                      }
                      return null;
                  })(t) ||
                  e;
    }
    function ze(t) {
        return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
    }
    var Le = Math.max,
        Ne = Math.min,
        $e = Math.round;
    function He(t, e, i) {
        return Le(t, Ne(e, i));
    }
    function We(t) {
        return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, t);
    }
    function Re(t, e) {
        return e.reduce(function (e, i) {
            return (e[i] = t), e;
        }, {});
    }
    var je = function (t, e) {
        return We("number" != typeof (t = "function" == typeof t ? t(Object.assign({}, e.rects, { placement: e.placement })) : t) ? t : Re(t, he));
    };
    var qe = {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function (t) {
                var e,
                    i = t.state,
                    s = t.name,
                    n = t.options,
                    o = i.elements.arrow,
                    a = i.modifiersData.popperOffsets,
                    r = De(i.placement),
                    l = ze(r),
                    h = [re, ae].indexOf(r) >= 0 ? "height" : "width";
                if (o && a) {
                    var c = je(n.padding, i),
                        u = Ie(o),
                        d = "y" === l ? ne : re,
                        p = "y" === l ? oe : ae,
                        f = i.rects.reference[h] + i.rects.reference[l] - a[l] - i.rects.popper[h],
                        g = a[l] - i.rects.reference[l],
                        m = Oe(o),
                        v = m ? ("y" === l ? m.clientHeight || 0 : m.clientWidth || 0) : 0,
                        _ = f / 2 - g / 2,
                        b = c[d],
                        y = v - u[h] - c[p],
                        w = v / 2 - u[h] / 2 + _,
                        x = He(b, w, y),
                        C = l;
                    i.modifiersData[s] = (((e = {})[C] = x), (e.centerOffset = x - w), e);
                }
            },
            effect: function (t) {
                var e = t.state,
                    i = t.options.element,
                    s = void 0 === i ? "[data-popper-arrow]" : i;
                null != s && ("string" != typeof s || (s = e.elements.popper.querySelector(s))) && Ae(e.elements.popper, s) && (e.elements.arrow = s);
            },
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"],
        },
        Be = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
    function Ye(t) {
        var e,
            i = t.popper,
            s = t.popperRect,
            n = t.placement,
            o = t.offsets,
            a = t.position,
            r = t.gpuAcceleration,
            l = t.adaptive,
            h = t.roundOffsets,
            c =
                !0 === h
                    ? (function (t) {
                          var e = t.x,
                              i = t.y,
                              s = window.devicePixelRatio || 1;
                          return { x: $e($e(e * s) / s) || 0, y: $e($e(i * s) / s) || 0 };
                      })(o)
                    : "function" == typeof h
                    ? h(o)
                    : o,
            u = c.x,
            d = void 0 === u ? 0 : u,
            p = c.y,
            f = void 0 === p ? 0 : p,
            g = o.hasOwnProperty("x"),
            m = o.hasOwnProperty("y"),
            v = re,
            _ = ne,
            b = window;
        if (l) {
            var y = Oe(i),
                w = "clientHeight",
                x = "clientWidth";
            y === ye(i) && "static" !== Se((y = Me(i))).position && ((w = "scrollHeight"), (x = "scrollWidth")),
                (y = y),
                n === ne && ((_ = oe), (f -= y[w] - s.height), (f *= r ? 1 : -1)),
                n === re && ((v = ae), (d -= y[x] - s.width), (d *= r ? 1 : -1));
        }
        var C,
            k = Object.assign({ position: a }, l && Be);
        return r
            ? Object.assign({}, k, (((C = {})[_] = m ? "0" : ""), (C[v] = g ? "0" : ""), (C.transform = (b.devicePixelRatio || 1) < 2 ? "translate(" + d + "px, " + f + "px)" : "translate3d(" + d + "px, " + f + "px, 0)"), C))
            : Object.assign({}, k, (((e = {})[_] = m ? f + "px" : ""), (e[v] = g ? d + "px" : ""), (e.transform = ""), e));
    }
    var Ve = {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function (t) {
                var e = t.state,
                    i = t.options,
                    s = i.gpuAcceleration,
                    n = void 0 === s || s,
                    o = i.adaptive,
                    a = void 0 === o || o,
                    r = i.roundOffsets,
                    l = void 0 === r || r,
                    h = { placement: De(e.placement), popper: e.elements.popper, popperRect: e.rects.popper, gpuAcceleration: n };
                null != e.modifiersData.popperOffsets &&
                    (e.styles.popper = Object.assign({}, e.styles.popper, Ye(Object.assign({}, h, { offsets: e.modifiersData.popperOffsets, position: e.options.strategy, adaptive: a, roundOffsets: l })))),
                    null != e.modifiersData.arrow && (e.styles.arrow = Object.assign({}, e.styles.arrow, Ye(Object.assign({}, h, { offsets: e.modifiersData.arrow, position: "absolute", adaptive: !1, roundOffsets: l })))),
                    (e.attributes.popper = Object.assign({}, e.attributes.popper, { "data-popper-placement": e.placement }));
            },
            data: {},
        },
        Ke = { passive: !0 };
    var Ue = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function () {},
            effect: function (t) {
                var e = t.state,
                    i = t.instance,
                    s = t.options,
                    n = s.scroll,
                    o = void 0 === n || n,
                    a = s.resize,
                    r = void 0 === a || a,
                    l = ye(e.elements.popper),
                    h = [].concat(e.scrollParents.reference, e.scrollParents.popper);
                return (
                    o &&
                        h.forEach(function (t) {
                            t.addEventListener("scroll", i.update, Ke);
                        }),
                    r && l.addEventListener("resize", i.update, Ke),
                    function () {
                        o &&
                            h.forEach(function (t) {
                                t.removeEventListener("scroll", i.update, Ke);
                            }),
                            r && l.removeEventListener("resize", i.update, Ke);
                    }
                );
            },
            data: {},
        },
        Qe = { left: "right", right: "left", bottom: "top", top: "bottom" };
    function Xe(t) {
        return t.replace(/left|right|bottom|top/g, function (t) {
            return Qe[t];
        });
    }
    var Ze = { start: "end", end: "start" };
    function Ge(t) {
        return t.replace(/start|end/g, function (t) {
            return Ze[t];
        });
    }
    function Je(t) {
        var e = ye(t);
        return { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
    }
    function ti(t) {
        return Ee(Me(t)).left + Je(t).scrollLeft;
    }
    function ei(t) {
        var e = Se(t),
            i = e.overflow,
            s = e.overflowX,
            n = e.overflowY;
        return /auto|scroll|overlay|hidden/.test(i + n + s);
    }
    function ii(t, e) {
        var i;
        void 0 === e && (e = []);
        var s = (function t(e) {
                return ["html", "body", "#document"].indexOf(be(e)) >= 0 ? e.ownerDocument.body : xe(e) && ei(e) ? e : t(Pe(e));
            })(t),
            n = s === (null == (i = t.ownerDocument) ? void 0 : i.body),
            o = ye(s),
            a = n ? [o].concat(o.visualViewport || [], ei(s) ? s : []) : s,
            r = e.concat(a);
        return n ? r : r.concat(ii(Pe(a)));
    }
    function si(t) {
        return Object.assign({}, t, { left: t.x, top: t.y, right: t.x + t.width, bottom: t.y + t.height });
    }
    function ni(t, e) {
        return e === pe
            ? si(
                  (function (t) {
                      var e = ye(t),
                          i = Me(t),
                          s = e.visualViewport,
                          n = i.clientWidth,
                          o = i.clientHeight,
                          a = 0,
                          r = 0;
                      return s && ((n = s.width), (o = s.height), /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || ((a = s.offsetLeft), (r = s.offsetTop))), { width: n, height: o, x: a + ti(t), y: r };
                  })(t)
              )
            : xe(e)
            ? (function (t) {
                  var e = Ee(t);
                  return (
                      (e.top = e.top + t.clientTop),
                      (e.left = e.left + t.clientLeft),
                      (e.bottom = e.top + t.clientHeight),
                      (e.right = e.left + t.clientWidth),
                      (e.width = t.clientWidth),
                      (e.height = t.clientHeight),
                      (e.x = e.left),
                      (e.y = e.top),
                      e
                  );
              })(e)
            : si(
                  (function (t) {
                      var e,
                          i = Me(t),
                          s = Je(t),
                          n = null == (e = t.ownerDocument) ? void 0 : e.body,
                          o = Le(i.scrollWidth, i.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0),
                          a = Le(i.scrollHeight, i.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0),
                          r = -s.scrollLeft + ti(t),
                          l = -s.scrollTop;
                      return "rtl" === Se(n || i).direction && (r += Le(i.clientWidth, n ? n.clientWidth : 0) - o), { width: o, height: a, x: r, y: l };
                  })(Me(t))
              );
    }
    function oi(t, e, i) {
        var s =
                "clippingParents" === e
                    ? (function (t) {
                          var e = ii(Pe(t)),
                              i = ["absolute", "fixed"].indexOf(Se(t).position) >= 0 && xe(t) ? Oe(t) : t;
                          return we(i)
                              ? e.filter(function (t) {
                                    return we(t) && Ae(t, i) && "body" !== be(t);
                                })
                              : [];
                      })(t)
                    : [].concat(e),
            n = [].concat(s, [i]),
            o = n[0],
            a = n.reduce(function (e, i) {
                var s = ni(t, i);
                return (e.top = Le(s.top, e.top)), (e.right = Ne(s.right, e.right)), (e.bottom = Ne(s.bottom, e.bottom)), (e.left = Le(s.left, e.left)), e;
            }, ni(t, o));
        return (a.width = a.right - a.left), (a.height = a.bottom - a.top), (a.x = a.left), (a.y = a.top), a;
    }
    function ai(t) {
        return t.split("-")[1];
    }
    function ri(t) {
        var e,
            i = t.reference,
            s = t.element,
            n = t.placement,
            o = n ? De(n) : null,
            a = n ? ai(n) : null,
            r = i.x + i.width / 2 - s.width / 2,
            l = i.y + i.height / 2 - s.height / 2;
        switch (o) {
            case ne:
                e = { x: r, y: i.y - s.height };
                break;
            case oe:
                e = { x: r, y: i.y + i.height };
                break;
            case ae:
                e = { x: i.x + i.width, y: l };
                break;
            case re:
                e = { x: i.x - s.width, y: l };
                break;
            default:
                e = { x: i.x, y: i.y };
        }
        var h = o ? ze(o) : null;
        if (null != h) {
            var c = "y" === h ? "height" : "width";
            switch (a) {
                case ce:
                    e[h] = e[h] - (i[c] / 2 - s[c] / 2);
                    break;
                case ue:
                    e[h] = e[h] + (i[c] / 2 - s[c] / 2);
            }
        }
        return e;
    }
    function li(t, e) {
        void 0 === e && (e = {});
        var i = e,
            s = i.placement,
            n = void 0 === s ? t.placement : s,
            o = i.boundary,
            a = void 0 === o ? de : o,
            r = i.rootBoundary,
            l = void 0 === r ? pe : r,
            h = i.elementContext,
            c = void 0 === h ? fe : h,
            u = i.altBoundary,
            d = void 0 !== u && u,
            p = i.padding,
            f = void 0 === p ? 0 : p,
            g = We("number" != typeof f ? f : Re(f, he)),
            m = c === fe ? ge : fe,
            v = t.elements.reference,
            _ = t.rects.popper,
            b = t.elements[d ? m : c],
            y = oi(we(b) ? b : b.contextElement || Me(t.elements.popper), a, l),
            w = Ee(v),
            x = ri({ reference: w, element: _, strategy: "absolute", placement: n }),
            C = si(Object.assign({}, _, x)),
            k = c === fe ? C : w,
            D = { top: y.top - k.top + g.top, bottom: k.bottom - y.bottom + g.bottom, left: y.left - k.left + g.left, right: k.right - y.right + g.right },
            E = t.modifiersData.offset;
        if (c === fe && E) {
            var I = E[n];
            Object.keys(D).forEach(function (t) {
                var e = [ae, oe].indexOf(t) >= 0 ? 1 : -1,
                    i = [ne, oe].indexOf(t) >= 0 ? "y" : "x";
                D[t] += I[i] * e;
            });
        }
        return D;
    }
    function hi(t, e) {
        void 0 === e && (e = {});
        var i = e,
            s = i.placement,
            n = i.boundary,
            o = i.rootBoundary,
            a = i.padding,
            r = i.flipVariations,
            l = i.allowedAutoPlacements,
            h = void 0 === l ? ve : l,
            c = ai(s),
            u = c
                ? r
                    ? me
                    : me.filter(function (t) {
                          return ai(t) === c;
                      })
                : he,
            d = u.filter(function (t) {
                return h.indexOf(t) >= 0;
            });
        0 === d.length && (d = u);
        var p = d.reduce(function (e, i) {
            return (e[i] = li(t, { placement: i, boundary: n, rootBoundary: o, padding: a })[De(i)]), e;
        }, {});
        return Object.keys(p).sort(function (t, e) {
            return p[t] - p[e];
        });
    }
    var ci = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function (t) {
            var e = t.state,
                i = t.options,
                s = t.name;
            if (!e.modifiersData[s]._skip) {
                for (
                    var n = i.mainAxis,
                        o = void 0 === n || n,
                        a = i.altAxis,
                        r = void 0 === a || a,
                        l = i.fallbackPlacements,
                        h = i.padding,
                        c = i.boundary,
                        u = i.rootBoundary,
                        d = i.altBoundary,
                        p = i.flipVariations,
                        f = void 0 === p || p,
                        g = i.allowedAutoPlacements,
                        m = e.options.placement,
                        v = De(m),
                        _ =
                            l ||
                            (v !== m && f
                                ? (function (t) {
                                      if (De(t) === le) return [];
                                      var e = Xe(t);
                                      return [Ge(t), e, Ge(e)];
                                  })(m)
                                : [Xe(m)]),
                        b = [m].concat(_).reduce(function (t, i) {
                            return t.concat(De(i) === le ? hi(e, { placement: i, boundary: c, rootBoundary: u, padding: h, flipVariations: f, allowedAutoPlacements: g }) : i);
                        }, []),
                        y = e.rects.reference,
                        w = e.rects.popper,
                        x = new Map(),
                        C = !0,
                        k = b[0],
                        D = 0;
                    D < b.length;
                    D++
                ) {
                    var E = b[D],
                        I = De(E),
                        A = ai(E) === ce,
                        S = [ne, oe].indexOf(I) >= 0,
                        T = S ? "width" : "height",
                        M = li(e, { placement: E, boundary: c, rootBoundary: u, altBoundary: d, padding: h }),
                        P = S ? (A ? ae : re) : A ? oe : ne;
                    y[T] > w[T] && (P = Xe(P));
                    var F = Xe(P),
                        O = [];
                    if (
                        (o && O.push(M[I] <= 0),
                        r && O.push(M[P] <= 0, M[F] <= 0),
                        O.every(function (t) {
                            return t;
                        }))
                    ) {
                        (k = E), (C = !1);
                        break;
                    }
                    x.set(E, O);
                }
                if (C)
                    for (
                        var z = function (t) {
                                var e = b.find(function (e) {
                                    var i = x.get(e);
                                    if (i)
                                        return i.slice(0, t).every(function (t) {
                                            return t;
                                        });
                                });
                                if (e) return (k = e), "break";
                            },
                            L = f ? 3 : 1;
                        L > 0 && "break" !== z(L);
                        L--
                    );
                e.placement !== k && ((e.modifiersData[s]._skip = !0), (e.placement = k), (e.reset = !0));
            }
        },
        requiresIfExists: ["offset"],
        data: { _skip: !1 },
    };
    function ui(t, e, i) {
        return void 0 === i && (i = { x: 0, y: 0 }), { top: t.top - e.height - i.y, right: t.right - e.width + i.x, bottom: t.bottom - e.height + i.y, left: t.left - e.width - i.x };
    }
    function di(t) {
        return [ne, ae, oe, re].some(function (e) {
            return t[e] >= 0;
        });
    }
    var pi = {
        name: "hide",
        enabled: !0,
        phase: "main",
        requiresIfExists: ["preventOverflow"],
        fn: function (t) {
            var e = t.state,
                i = t.name,
                s = e.rects.reference,
                n = e.rects.popper,
                o = e.modifiersData.preventOverflow,
                a = li(e, { elementContext: "reference" }),
                r = li(e, { altBoundary: !0 }),
                l = ui(a, s),
                h = ui(r, n, o),
                c = di(l),
                u = di(h);
            (e.modifiersData[i] = { referenceClippingOffsets: l, popperEscapeOffsets: h, isReferenceHidden: c, hasPopperEscaped: u }),
                (e.attributes.popper = Object.assign({}, e.attributes.popper, { "data-popper-reference-hidden": c, "data-popper-escaped": u }));
        },
    };
    var fi = {
        name: "offset",
        enabled: !0,
        phase: "main",
        requires: ["popperOffsets"],
        fn: function (t) {
            var e = t.state,
                i = t.options,
                s = t.name,
                n = i.offset,
                o = void 0 === n ? [0, 0] : n,
                a = ve.reduce(function (t, i) {
                    return (
                        (t[i] = (function (t, e, i) {
                            var s = De(t),
                                n = [re, ne].indexOf(s) >= 0 ? -1 : 1,
                                o = "function" == typeof i ? i(Object.assign({}, e, { placement: t })) : i,
                                a = o[0],
                                r = o[1];
                            return (a = a || 0), (r = (r || 0) * n), [re, ae].indexOf(s) >= 0 ? { x: r, y: a } : { x: a, y: r };
                        })(i, e.rects, o)),
                        t
                    );
                }, {}),
                r = a[e.placement],
                l = r.x,
                h = r.y;
            null != e.modifiersData.popperOffsets && ((e.modifiersData.popperOffsets.x += l), (e.modifiersData.popperOffsets.y += h)), (e.modifiersData[s] = a);
        },
    };
    var gi = {
        name: "popperOffsets",
        enabled: !0,
        phase: "read",
        fn: function (t) {
            var e = t.state,
                i = t.name;
            e.modifiersData[i] = ri({ reference: e.rects.reference, element: e.rects.popper, strategy: "absolute", placement: e.placement });
        },
        data: {},
    };
    var mi = {
        name: "preventOverflow",
        enabled: !0,
        phase: "main",
        fn: function (t) {
            var e = t.state,
                i = t.options,
                s = t.name,
                n = i.mainAxis,
                o = void 0 === n || n,
                a = i.altAxis,
                r = void 0 !== a && a,
                l = i.boundary,
                h = i.rootBoundary,
                c = i.altBoundary,
                u = i.padding,
                d = i.tether,
                p = void 0 === d || d,
                f = i.tetherOffset,
                g = void 0 === f ? 0 : f,
                m = li(e, { boundary: l, rootBoundary: h, padding: u, altBoundary: c }),
                v = De(e.placement),
                _ = ai(e.placement),
                b = !_,
                y = ze(v),
                w = "x" === y ? "y" : "x",
                x = e.modifiersData.popperOffsets,
                C = e.rects.reference,
                k = e.rects.popper,
                D = "function" == typeof g ? g(Object.assign({}, e.rects, { placement: e.placement })) : g,
                E = { x: 0, y: 0 };
            if (x) {
                if (o || r) {
                    var I = "y" === y ? ne : re,
                        A = "y" === y ? oe : ae,
                        S = "y" === y ? "height" : "width",
                        T = x[y],
                        M = x[y] + m[I],
                        P = x[y] - m[A],
                        F = p ? -k[S] / 2 : 0,
                        O = _ === ce ? C[S] : k[S],
                        z = _ === ce ? -k[S] : -C[S],
                        L = e.elements.arrow,
                        N = p && L ? Ie(L) : { width: 0, height: 0 },
                        $ = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : { top: 0, right: 0, bottom: 0, left: 0 },
                        H = $[I],
                        W = $[A],
                        R = He(0, C[S], N[S]),
                        j = b ? C[S] / 2 - F - R - H - D : O - R - H - D,
                        q = b ? -C[S] / 2 + F + R + W + D : z + R + W + D,
                        B = e.elements.arrow && Oe(e.elements.arrow),
                        Y = B ? ("y" === y ? B.clientTop || 0 : B.clientLeft || 0) : 0,
                        V = e.modifiersData.offset ? e.modifiersData.offset[e.placement][y] : 0,
                        K = x[y] + j - V - Y,
                        U = x[y] + q - V;
                    if (o) {
                        var Q = He(p ? Ne(M, K) : M, T, p ? Le(P, U) : P);
                        (x[y] = Q), (E[y] = Q - T);
                    }
                    if (r) {
                        var X = "x" === y ? ne : re,
                            Z = "x" === y ? oe : ae,
                            G = x[w],
                            J = G + m[X],
                            tt = G - m[Z],
                            et = He(p ? Ne(J, K) : J, G, p ? Le(tt, U) : tt);
                        (x[w] = et), (E[w] = et - G);
                    }
                }
                e.modifiersData[s] = E;
            }
        },
        requiresIfExists: ["offset"],
    };
    function vi(t, e, i) {
        void 0 === i && (i = !1);
        var s,
            n,
            o = Me(e),
            a = Ee(t),
            r = xe(e),
            l = { scrollLeft: 0, scrollTop: 0 },
            h = { x: 0, y: 0 };
        return (
            (r || (!r && !i)) &&
                (("body" !== be(e) || ei(o)) && (l = (s = e) !== ye(s) && xe(s) ? { scrollLeft: (n = s).scrollLeft, scrollTop: n.scrollTop } : Je(s)), xe(e) ? (((h = Ee(e)).x += e.clientLeft), (h.y += e.clientTop)) : o && (h.x = ti(o))),
            { x: a.left + l.scrollLeft - h.x, y: a.top + l.scrollTop - h.y, width: a.width, height: a.height }
        );
    }
    function _i(t) {
        var e = new Map(),
            i = new Set(),
            s = [];
        return (
            t.forEach(function (t) {
                e.set(t.name, t);
            }),
            t.forEach(function (t) {
                i.has(t.name) ||
                    (function t(n) {
                        i.add(n.name),
                            [].concat(n.requires || [], n.requiresIfExists || []).forEach(function (s) {
                                if (!i.has(s)) {
                                    var n = e.get(s);
                                    n && t(n);
                                }
                            }),
                            s.push(n);
                    })(t);
            }),
            s
        );
    }
    var bi = { placement: "bottom", modifiers: [], strategy: "absolute" };
    function yi() {
        for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
        return !e.some(function (t) {
            return !(t && "function" == typeof t.getBoundingClientRect);
        });
    }
    function wi(t) {
        void 0 === t && (t = {});
        var e = t,
            i = e.defaultModifiers,
            s = void 0 === i ? [] : i,
            n = e.defaultOptions,
            o = void 0 === n ? bi : n;
        return function (t, e, i) {
            void 0 === i && (i = o);
            var n,
                a,
                r = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, bi, o), modifiersData: {}, elements: { reference: t, popper: e }, attributes: {}, styles: {} },
                l = [],
                h = !1,
                c = {
                    state: r,
                    setOptions: function (i) {
                        u(), (r.options = Object.assign({}, o, r.options, i)), (r.scrollParents = { reference: we(t) ? ii(t) : t.contextElement ? ii(t.contextElement) : [], popper: ii(e) });
                        var n,
                            a,
                            h = (function (t) {
                                var e = _i(t);
                                return _e.reduce(function (t, i) {
                                    return t.concat(
                                        e.filter(function (t) {
                                            return t.phase === i;
                                        })
                                    );
                                }, []);
                            })(
                                ((n = [].concat(s, r.options.modifiers)),
                                (a = n.reduce(function (t, e) {
                                    var i = t[e.name];
                                    return (t[e.name] = i ? Object.assign({}, i, e, { options: Object.assign({}, i.options, e.options), data: Object.assign({}, i.data, e.data) }) : e), t;
                                }, {})),
                                Object.keys(a).map(function (t) {
                                    return a[t];
                                }))
                            );
                        return (
                            (r.orderedModifiers = h.filter(function (t) {
                                return t.enabled;
                            })),
                            r.orderedModifiers.forEach(function (t) {
                                var e = t.name,
                                    i = t.options,
                                    s = void 0 === i ? {} : i,
                                    n = t.effect;
                                if ("function" == typeof n) {
                                    var o = n({ state: r, name: e, instance: c, options: s });
                                    l.push(o || function () {});
                                }
                            }),
                            c.update()
                        );
                    },
                    forceUpdate: function () {
                        if (!h) {
                            var t = r.elements,
                                e = t.reference,
                                i = t.popper;
                            if (yi(e, i)) {
                                (r.rects = { reference: vi(e, Oe(i), "fixed" === r.options.strategy), popper: Ie(i) }),
                                    (r.reset = !1),
                                    (r.placement = r.options.placement),
                                    r.orderedModifiers.forEach(function (t) {
                                        return (r.modifiersData[t.name] = Object.assign({}, t.data));
                                    });
                                for (var s = 0; s < r.orderedModifiers.length; s++)
                                    if (!0 !== r.reset) {
                                        var n = r.orderedModifiers[s],
                                            o = n.fn,
                                            a = n.options,
                                            l = void 0 === a ? {} : a,
                                            u = n.name;
                                        "function" == typeof o && (r = o({ state: r, options: l, name: u, instance: c }) || r);
                                    } else (r.reset = !1), (s = -1);
                            }
                        }
                    },
                    update:
                        ((n = function () {
                            return new Promise(function (t) {
                                c.forceUpdate(), t(r);
                            });
                        }),
                        function () {
                            return (
                                a ||
                                    (a = new Promise(function (t) {
                                        Promise.resolve().then(function () {
                                            (a = void 0), t(n());
                                        });
                                    })),
                                a
                            );
                        }),
                    destroy: function () {
                        u(), (h = !0);
                    },
                };
            if (!yi(t, e)) return c;
            function u() {
                l.forEach(function (t) {
                    return t();
                }),
                    (l = []);
            }
            return (
                c.setOptions(i).then(function (t) {
                    !h && i.onFirstUpdate && i.onFirstUpdate(t);
                }),
                c
            );
        };
    }
    var xi = wi(),
        Ci = wi({ defaultModifiers: [Ue, gi, Ve, ke] }),
        ki = wi({ defaultModifiers: [Ue, gi, Ve, ke, fi, ci, mi, qe, pi] }),
        Di = Object.freeze({
            __proto__: null,
            popperGenerator: wi,
            detectOverflow: li,
            createPopperBase: xi,
            createPopper: ki,
            createPopperLite: Ci,
            top: ne,
            bottom: oe,
            right: ae,
            left: re,
            auto: le,
            basePlacements: he,
            start: ce,
            end: ue,
            clippingParents: de,
            viewport: pe,
            popper: fe,
            reference: ge,
            variationPlacements: me,
            placements: ve,
            beforeRead: "beforeRead",
            read: "read",
            afterRead: "afterRead",
            beforeMain: "beforeMain",
            main: "main",
            afterMain: "afterMain",
            beforeWrite: "beforeWrite",
            write: "write",
            afterWrite: "afterWrite",
            modifierPhases: _e,
            applyStyles: ke,
            arrow: qe,
            computeStyles: Ve,
            eventListeners: Ue,
            flip: ci,
            hide: pi,
            offset: fi,
            popperOffsets: gi,
            preventOverflow: mi,
        });
    const Ei = "dropdown",
        Ii = "Escape",
        Ai = "Space",
        Si = "Tab",
        Ti = "ArrowUp",
        Mi = "ArrowDown",
        Pi = 2,
        Fi = new RegExp(`${Ti}|${Mi}|${Ii}`),
        Oi = "hide.bs.dropdown",
        zi = "hidden.bs.dropdown",
        Li = "show.bs.dropdown",
        Ni = "shown.bs.dropdown",
        $i = "click.bs.dropdown",
        Hi = "show",
        Wi = "dropup",
        Ri = "dropend",
        ji = "dropstart",
        qi = "navbar",
        Bi = '[data-bs-toggle="dropdown"]',
        Yi = ".dropdown-menu",
        Vi = ".navbar-nav",
        Ki = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
        Ui = m() ? "top-end" : "top-start",
        Qi = m() ? "top-start" : "top-end",
        Xi = m() ? "bottom-end" : "bottom-start",
        Zi = m() ? "bottom-start" : "bottom-end",
        Gi = m() ? "left-start" : "right-start",
        Ji = m() ? "right-start" : "left-start",
        ts = { offset: [0, 2], boundary: "clippingParents", reference: "toggle", display: "dynamic", popperConfig: null, autoClose: !0 },
        es = { offset: "(array|string|function)", boundary: "(string|element)", reference: "(string|element|object)", display: "string", popperConfig: "(null|object|function)", autoClose: "(boolean|string)" };
    class is extends W {
        constructor(t, e) {
            super(t), (this._popper = null), (this._config = this._getConfig(e)), (this._menu = this._getMenuElement()), (this._inNavbar = this._detectNavbar()), this._addEventListeners();
        }
        static get Default() {
            return ts;
        }
        static get DefaultType() {
            return es;
        }
        static get NAME() {
            return Ei;
        }
        toggle() {
            if (c(this._element)) return;
            this._element.classList.contains(Hi) ? this.hide() : this.show();
        }
        show() {
            if (c(this._element) || this._menu.classList.contains(Hi)) return;
            const t = is.getParentFromElement(this._element),
                e = { relatedTarget: this._element };
            if (!L.trigger(this._element, Li, e).defaultPrevented) {
                if (this._inNavbar) J.setDataAttribute(this._menu, "popper", "none");
                else {
                    if (void 0 === Di) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
                    let e = this._element;
                    "parent" === this._config.reference ? (e = t) : a(this._config.reference) ? (e = r(this._config.reference)) : "object" == typeof this._config.reference && (e = this._config.reference);
                    const i = this._getPopperConfig(),
                        s = i.modifiers.find((t) => "applyStyles" === t.name && !1 === t.enabled);
                    (this._popper = ki(e, this._menu, i)), s && J.setDataAttribute(this._menu, "popper", "static");
                }
                "ontouchstart" in document.documentElement && !t.closest(Vi) && [].concat(...document.body.children).forEach((t) => L.on(t, "mouseover", d)),
                    this._element.focus(),
                    this._element.setAttribute("aria-expanded", !0),
                    this._menu.classList.toggle(Hi),
                    this._element.classList.toggle(Hi),
                    L.trigger(this._element, Ni, e);
            }
        }
        hide() {
            if (c(this._element) || !this._menu.classList.contains(Hi)) return;
            const t = { relatedTarget: this._element };
            this._completeHide(t);
        }
        dispose() {
            this._popper && this._popper.destroy(), super.dispose();
        }
        update() {
            (this._inNavbar = this._detectNavbar()), this._popper && this._popper.update();
        }
        _addEventListeners() {
            L.on(this._element, $i, (t) => {
                t.preventDefault(), this.toggle();
            });
        }
        _completeHide(t) {
            L.trigger(this._element, Oi, t).defaultPrevented ||
                ("ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach((t) => L.off(t, "mouseover", d)),
                this._popper && this._popper.destroy(),
                this._menu.classList.remove(Hi),
                this._element.classList.remove(Hi),
                this._element.setAttribute("aria-expanded", "false"),
                J.removeDataAttribute(this._menu, "popper"),
                L.trigger(this._element, zi, t));
        }
        _getConfig(t) {
            if (
                ((t = { ...this.constructor.Default, ...J.getDataAttributes(this._element), ...t }),
                l(Ei, t, this.constructor.DefaultType),
                "object" == typeof t.reference && !a(t.reference) && "function" != typeof t.reference.getBoundingClientRect)
            )
                throw new TypeError(`${Ei.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
            return t;
        }
        _getMenuElement() {
            return t.next(this._element, Yi)[0];
        }
        _getPlacement() {
            const t = this._element.parentNode;
            if (t.classList.contains(Ri)) return Gi;
            if (t.classList.contains(ji)) return Ji;
            const e = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
            return t.classList.contains(Wi) ? (e ? Qi : Ui) : e ? Zi : Xi;
        }
        _detectNavbar() {
            return null !== this._element.closest(`.${qi}`);
        }
        _getOffset() {
            const { offset: t } = this._config;
            return "string" == typeof t ? t.split(",").map((t) => Number.parseInt(t, 10)) : "function" == typeof t ? (e) => t(e, this._element) : t;
        }
        _getPopperConfig() {
            const t = {
                placement: this._getPlacement(),
                modifiers: [
                    { name: "preventOverflow", options: { boundary: this._config.boundary } },
                    { name: "offset", options: { offset: this._getOffset() } },
                ],
            };
            return "static" === this._config.display && (t.modifiers = [{ name: "applyStyles", enabled: !1 }]), { ...t, ...("function" == typeof this._config.popperConfig ? this._config.popperConfig(t) : this._config.popperConfig) };
        }
        _selectMenuItem({ key: e, target: i }) {
            const s = t.find(Ki, this._menu).filter(h);
            s.length && y(s, i, e === Mi, !s.includes(i)).focus();
        }
        static dropdownInterface(t, e) {
            const i = is.getOrCreateInstance(t, e);
            if ("string" == typeof e) {
                if (void 0 === i[e]) throw new TypeError(`No method named "${e}"`);
                i[e]();
            }
        }
        static jQueryInterface(t) {
            return this.each(function () {
                is.dropdownInterface(this, t);
            });
        }
        static clearMenus(e) {
            if (e && (e.button === Pi || ("keyup" === e.type && e.key !== Si))) return;
            const i = t.find(Bi);
            for (let t = 0, s = i.length; t < s; t++) {
                const s = is.getInstance(i[t]);
                if (!s || !1 === s._config.autoClose) continue;
                if (!s._element.classList.contains(Hi)) continue;
                const n = { relatedTarget: s._element };
                if (e) {
                    const t = e.composedPath(),
                        i = t.includes(s._menu);
                    if (t.includes(s._element) || ("inside" === s._config.autoClose && !i) || ("outside" === s._config.autoClose && i)) continue;
                    if (s._menu.contains(e.target) && (("keyup" === e.type && e.key === Si) || /input|select|option|textarea|form/i.test(e.target.tagName))) continue;
                    "click" === e.type && (n.clickEvent = e);
                }
                s._completeHide(n);
            }
        }
        static getParentFromElement(t) {
            return n(t) || t.parentNode;
        }
        static dataApiKeydownHandler(e) {
            if (/input|textarea/i.test(e.target.tagName) ? e.key === Ai || (e.key !== Ii && ((e.key !== Mi && e.key !== Ti) || e.target.closest(Yi))) : !Fi.test(e.key)) return;
            const i = this.classList.contains(Hi);
            if (!i && e.key === Ii) return;
            if ((e.preventDefault(), e.stopPropagation(), c(this))) return;
            const s = () => (this.matches(Bi) ? this : t.prev(this, Bi)[0]);
            return e.key === Ii ? (s().focus(), void is.clearMenus()) : e.key === Ti || e.key === Mi ? (i || s().click(), void is.getInstance(s())._selectMenuItem(e)) : void ((i && e.key !== Ai) || is.clearMenus());
        }
    }
    L.on(document, "keydown.bs.dropdown.data-api", Bi, is.dataApiKeydownHandler),
        L.on(document, "keydown.bs.dropdown.data-api", Yi, is.dataApiKeydownHandler),
        L.on(document, "click.bs.dropdown.data-api", is.clearMenus),
        L.on(document, "keyup.bs.dropdown.data-api", is.clearMenus),
        L.on(document, "click.bs.dropdown.data-api", Bi, function (t) {
            t.preventDefault(), is.dropdownInterface(this);
        }),
        v(is);
    const ss = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        ns = ".sticky-top";
    class os {
        constructor() {
            this._element = document.body;
        }
        getWidth() {
            const t = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - t);
        }
        hide() {
            const t = this.getWidth();
            this._disableOverFlow(), this._setElementAttributes(this._element, "paddingRight", (e) => e + t), this._setElementAttributes(ss, "paddingRight", (e) => e + t), this._setElementAttributes(ns, "marginRight", (e) => e - t);
        }
        _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow"), (this._element.style.overflow = "hidden");
        }
        _setElementAttributes(t, e, i) {
            const s = this.getWidth();
            this._applyManipulationCallback(t, (t) => {
                if (t !== this._element && window.innerWidth > t.clientWidth + s) return;
                this._saveInitialAttribute(t, e);
                const n = window.getComputedStyle(t)[e];
                t.style[e] = `${i(Number.parseFloat(n))}px`;
            });
        }
        reset() {
            this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, "paddingRight"), this._resetElementAttributes(ss, "paddingRight"), this._resetElementAttributes(ns, "marginRight");
        }
        _saveInitialAttribute(t, e) {
            const i = t.style[e];
            i && J.setDataAttribute(t, e, i);
        }
        _resetElementAttributes(t, e) {
            this._applyManipulationCallback(t, (t) => {
                const i = J.getDataAttribute(t, e);
                void 0 === i ? t.style.removeProperty(e) : (J.removeDataAttribute(t, e), (t.style[e] = i));
            });
        }
        _applyManipulationCallback(e, i) {
            a(e) ? i(e) : t.find(e, this._element).forEach(i);
        }
        isOverflowing() {
            return this.getWidth() > 0;
        }
    }
    const as = { isVisible: !0, isAnimated: !1, rootElement: "body", clickCallback: null },
        rs = { isVisible: "boolean", isAnimated: "boolean", rootElement: "(element|string)", clickCallback: "(function|null)" },
        ls = "backdrop",
        hs = "modal-backdrop",
        cs = "fade",
        us = "show",
        ds = `mousedown.bs.${ls}`;
    class ps {
        constructor(t) {
            (this._config = this._getConfig(t)), (this._isAppended = !1), (this._element = null);
        }
        show(t) {
            this._config.isVisible
                ? (this._append(),
                  this._config.isAnimated && p(this._getElement()),
                  this._getElement().classList.add(us),
                  this._emulateAnimation(() => {
                      _(t);
                  }))
                : _(t);
        }
        hide(t) {
            this._config.isVisible
                ? (this._getElement().classList.remove(us),
                  this._emulateAnimation(() => {
                      this.dispose(), _(t);
                  }))
                : _(t);
        }
        _getElement() {
            if (!this._element) {
                const t = document.createElement("div");
                (t.className = hs), this._config.isAnimated && t.classList.add(cs), (this._element = t);
            }
            return this._element;
        }
        _getConfig(t) {
            return ((t = { ...as, ...("object" == typeof t ? t : {}) }).rootElement = r(t.rootElement)), l(ls, t, rs), t;
        }
        _append() {
            this._isAppended ||
                (this._config.rootElement.appendChild(this._getElement()),
                L.on(this._getElement(), ds, () => {
                    _(this._config.clickCallback);
                }),
                (this._isAppended = !0));
        }
        dispose() {
            this._isAppended && (L.off(this._element, ds), this._element.remove(), (this._isAppended = !1));
        }
        _emulateAnimation(t) {
            b(t, this._getElement(), this._config.isAnimated);
        }
    }
    const fs = "modal",
        gs = ".bs.modal",
        ms = "Escape",
        vs = { backdrop: !0, keyboard: !0, focus: !0 },
        _s = { backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean" },
        bs = `hide${gs}`,
        ys = `hidePrevented${gs}`,
        ws = `hidden${gs}`,
        xs = `show${gs}`,
        Cs = `shown${gs}`,
        ks = `focusin${gs}`,
        Ds = `resize${gs}`,
        Es = `click.dismiss${gs}`,
        Is = `keydown.dismiss${gs}`,
        As = `mouseup.dismiss${gs}`,
        Ss = `mousedown.dismiss${gs}`,
        Ts = `click${gs}.data-api`,
        Ms = "modal-open",
        Ps = "fade",
        Fs = "show",
        Os = "modal-static",
        zs = ".modal-dialog",
        Ls = ".modal-body",
        Ns = '[data-bs-dismiss="modal"]';
    class $s extends W {
        constructor(e, i) {
            super(e),
                (this._config = this._getConfig(i)),
                (this._dialog = t.findOne(zs, this._element)),
                (this._backdrop = this._initializeBackDrop()),
                (this._isShown = !1),
                (this._ignoreBackdropClick = !1),
                (this._isTransitioning = !1),
                (this._scrollBar = new os());
        }
        static get Default() {
            return vs;
        }
        static get NAME() {
            return fs;
        }
        toggle(t) {
            return this._isShown ? this.hide() : this.show(t);
        }
        show(t) {
            if (this._isShown || this._isTransitioning) return;
            L.trigger(this._element, xs, { relatedTarget: t }).defaultPrevented ||
                ((this._isShown = !0),
                this._isAnimated() && (this._isTransitioning = !0),
                this._scrollBar.hide(),
                document.body.classList.add(Ms),
                this._adjustDialog(),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                L.on(this._element, Es, Ns, (t) => this.hide(t)),
                L.on(this._dialog, Ss, () => {
                    L.one(this._element, As, (t) => {
                        t.target === this._element && (this._ignoreBackdropClick = !0);
                    });
                }),
                this._showBackdrop(() => this._showElement(t)));
        }
        hide(t) {
            if ((t && ["A", "AREA"].includes(t.target.tagName) && t.preventDefault(), !this._isShown || this._isTransitioning)) return;
            if (L.trigger(this._element, bs).defaultPrevented) return;
            this._isShown = !1;
            const e = this._isAnimated();
            e && (this._isTransitioning = !0),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                L.off(document, ks),
                this._element.classList.remove(Fs),
                L.off(this._element, Es),
                L.off(this._dialog, Ss),
                this._queueCallback(() => this._hideModal(), this._element, e);
        }
        dispose() {
            [window, this._dialog].forEach((t) => L.off(t, gs)), this._backdrop.dispose(), super.dispose(), L.off(document, ks);
        }
        handleUpdate() {
            this._adjustDialog();
        }
        _initializeBackDrop() {
            return new ps({ isVisible: Boolean(this._config.backdrop), isAnimated: this._isAnimated() });
        }
        _getConfig(t) {
            return (t = { ...vs, ...J.getDataAttributes(this._element), ...("object" == typeof t ? t : {}) }), l(fs, t, _s), t;
        }
        _showElement(e) {
            const i = this._isAnimated(),
                s = t.findOne(Ls, this._dialog);
            (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE) || document.body.appendChild(this._element),
                (this._element.style.display = "block"),
                this._element.removeAttribute("aria-hidden"),
                this._element.setAttribute("aria-modal", !0),
                this._element.setAttribute("role", "dialog"),
                (this._element.scrollTop = 0),
                s && (s.scrollTop = 0),
                i && p(this._element),
                this._element.classList.add(Fs),
                this._config.focus && this._enforceFocus();
            this._queueCallback(
                () => {
                    this._config.focus && this._element.focus(), (this._isTransitioning = !1), L.trigger(this._element, Cs, { relatedTarget: e });
                },
                this._dialog,
                i
            );
        }
        _enforceFocus() {
            L.off(document, ks),
                L.on(document, ks, (t) => {
                    document === t.target || this._element === t.target || this._element.contains(t.target) || this._element.focus();
                });
        }
        _setEscapeEvent() {
            this._isShown
                ? L.on(this._element, Is, (t) => {
                      this._config.keyboard && t.key === ms ? (t.preventDefault(), this.hide()) : this._config.keyboard || t.key !== ms || this._triggerBackdropTransition();
                  })
                : L.off(this._element, Is);
        }
        _setResizeEvent() {
            this._isShown ? L.on(window, Ds, () => this._adjustDialog()) : L.off(window, Ds);
        }
        _hideModal() {
            (this._element.style.display = "none"),
                this._element.setAttribute("aria-hidden", !0),
                this._element.removeAttribute("aria-modal"),
                this._element.removeAttribute("role"),
                (this._isTransitioning = !1),
                this._backdrop.hide(() => {
                    document.body.classList.remove(Ms), this._resetAdjustments(), this._scrollBar.reset(), L.trigger(this._element, ws);
                });
        }
        _showBackdrop(t) {
            L.on(this._element, Es, (t) => {
                this._ignoreBackdropClick ? (this._ignoreBackdropClick = !1) : t.target === t.currentTarget && (!0 === this._config.backdrop ? this.hide() : "static" === this._config.backdrop && this._triggerBackdropTransition());
            }),
                this._backdrop.show(t);
        }
        _isAnimated() {
            return this._element.classList.contains(Ps);
        }
        _triggerBackdropTransition() {
            if (L.trigger(this._element, ys).defaultPrevented) return;
            const { classList: t, scrollHeight: e, style: i } = this._element,
                s = e > document.documentElement.clientHeight;
            (!s && "hidden" === i.overflowY) ||
                t.contains(Os) ||
                (s || (i.overflowY = "hidden"),
                t.add(Os),
                this._queueCallback(() => {
                    t.remove(Os),
                        s ||
                            this._queueCallback(() => {
                                i.overflowY = "";
                            }, this._dialog);
                }, this._dialog),
                this._element.focus());
        }
        _adjustDialog() {
            const t = this._element.scrollHeight > document.documentElement.clientHeight,
                e = this._scrollBar.getWidth(),
                i = e > 0;
            ((!i && t && !m()) || (i && !t && m())) && (this._element.style.paddingLeft = `${e}px`), ((i && !t && !m()) || (!i && t && m())) && (this._element.style.paddingRight = `${e}px`);
        }
        _resetAdjustments() {
            (this._element.style.paddingLeft = ""), (this._element.style.paddingRight = "");
        }
        static jQueryInterface(t, e) {
            return this.each(function () {
                const i = $s.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
                    i[t](e);
                }
            });
        }
    }
    L.on(document, Ts, '[data-bs-toggle="modal"]', function (t) {
        const e = n(this);
        ["A", "AREA"].includes(this.tagName) && t.preventDefault(),
            L.one(e, xs, (t) => {
                t.defaultPrevented ||
                    L.one(e, ws, () => {
                        h(this) && this.focus();
                    });
            }),
            $s.getOrCreateInstance(e).toggle(this);
    }),
        v($s);
    const Hs = "offcanvas",
        Ws = "Escape",
        Rs = { backdrop: !0, keyboard: !0, scroll: !1 },
        js = { backdrop: "boolean", keyboard: "boolean", scroll: "boolean" },
        qs = "show",
        Bs = "show.bs.offcanvas",
        Ys = "shown.bs.offcanvas",
        Vs = "hide.bs.offcanvas",
        Ks = "hidden.bs.offcanvas",
        Us = "focusin.bs.offcanvas",
        Qs = "click.dismiss.bs.offcanvas",
        Xs = "keydown.dismiss.bs.offcanvas",
        Zs = '[data-bs-dismiss="offcanvas"]';
    class Gs extends W {
        constructor(t, e) {
            super(t), (this._config = this._getConfig(e)), (this._isShown = !1), (this._backdrop = this._initializeBackDrop()), this._addEventListeners();
        }
        static get NAME() {
            return Hs;
        }
        static get Default() {
            return Rs;
        }
        toggle(t) {
            return this._isShown ? this.hide() : this.show(t);
        }
        show(t) {
            if (this._isShown) return;
            if (L.trigger(this._element, Bs, { relatedTarget: t }).defaultPrevented) return;
            (this._isShown = !0),
                (this._element.style.visibility = "visible"),
                this._backdrop.show(),
                this._config.scroll || (new os().hide(), this._enforceFocusOnElement(this._element)),
                this._element.removeAttribute("aria-hidden"),
                this._element.setAttribute("aria-modal", !0),
                this._element.setAttribute("role", "dialog"),
                this._element.classList.add(qs);
            this._queueCallback(
                () => {
                    L.trigger(this._element, Ys, { relatedTarget: t });
                },
                this._element,
                !0
            );
        }
        hide() {
            if (!this._isShown) return;
            if (L.trigger(this._element, Vs).defaultPrevented) return;
            L.off(document, Us), this._element.blur(), (this._isShown = !1), this._element.classList.remove(qs), this._backdrop.hide();
            this._queueCallback(
                () => {
                    this._element.setAttribute("aria-hidden", !0),
                        this._element.removeAttribute("aria-modal"),
                        this._element.removeAttribute("role"),
                        (this._element.style.visibility = "hidden"),
                        this._config.scroll || new os().reset(),
                        L.trigger(this._element, Ks);
                },
                this._element,
                !0
            );
        }
        dispose() {
            this._backdrop.dispose(), super.dispose(), L.off(document, Us);
        }
        _getConfig(t) {
            return (t = { ...Rs, ...J.getDataAttributes(this._element), ...("object" == typeof t ? t : {}) }), l(Hs, t, js), t;
        }
        _initializeBackDrop() {
            return new ps({ isVisible: this._config.backdrop, isAnimated: !0, rootElement: this._element.parentNode, clickCallback: () => this.hide() });
        }
        _enforceFocusOnElement(t) {
            L.off(document, Us),
                L.on(document, Us, (e) => {
                    document === e.target || t === e.target || t.contains(e.target) || t.focus();
                }),
                t.focus();
        }
        _addEventListeners() {
            L.on(this._element, Qs, Zs, () => this.hide()),
                L.on(this._element, Xs, (t) => {
                    this._config.keyboard && t.key === Ws && this.hide();
                });
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = Gs.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t](this);
                }
            });
        }
    }
    L.on(document, "click.bs.offcanvas.data-api", '[data-bs-toggle="offcanvas"]', function (e) {
        const i = n(this);
        if ((["A", "AREA"].includes(this.tagName) && e.preventDefault(), c(this))) return;
        L.one(i, Ks, () => {
            h(this) && this.focus();
        });
        const s = t.findOne(".offcanvas.show");
        s && s !== i && Gs.getInstance(s).hide(), Gs.getOrCreateInstance(i).toggle(this);
    }),
        L.on(window, "load.bs.offcanvas.data-api", () => t.find(".offcanvas.show").forEach((t) => Gs.getOrCreateInstance(t).show())),
        v(Gs);
    const Js = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
        tn = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&\/:?]*(?:[#\/?]|$))/i,
        en = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+\/a-z]+=*$/i,
        sn = (t, e) => {
            const i = t.nodeName.toLowerCase();
            if (e.includes(i)) return !Js.has(i) || Boolean(tn.test(t.nodeValue) || en.test(t.nodeValue));
            const s = e.filter((t) => t instanceof RegExp);
            for (let t = 0, e = s.length; t < e; t++) if (s[t].test(i)) return !0;
            return !1;
        },
        nn = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "srcset", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: [],
        };
    function on(t, e, i) {
        if (!t.length) return t;
        if (i && "function" == typeof i) return i(t);
        const s = new window.DOMParser().parseFromString(t, "text/html"),
            n = Object.keys(e),
            o = [].concat(...s.body.querySelectorAll("*"));
        for (let t = 0, i = o.length; t < i; t++) {
            const i = o[t],
                s = i.nodeName.toLowerCase();
            if (!n.includes(s)) {
                i.remove();
                continue;
            }
            const a = [].concat(...i.attributes),
                r = [].concat(e["*"] || [], e[s] || []);
            a.forEach((t) => {
                sn(t, r) || i.removeAttribute(t.nodeName);
            });
        }
        return s.body.innerHTML;
    }
    const an = "tooltip",
        rn = "bs-tooltip",
        ln = new RegExp(`(^|\\s)${rn}\\S+`, "g"),
        hn = new Set(["sanitize", "allowList", "sanitizeFn"]),
        cn = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(array|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacements: "array",
            boundary: "(string|element)",
            customClass: "(string|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            allowList: "object",
            popperConfig: "(null|object|function)",
        },
        un = { AUTO: "auto", TOP: "top", RIGHT: m() ? "left" : "right", BOTTOM: "bottom", LEFT: m() ? "right" : "left" },
        dn = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: [0, 0],
            container: !1,
            fallbackPlacements: ["top", "right", "bottom", "left"],
            boundary: "clippingParents",
            customClass: "",
            sanitize: !0,
            sanitizeFn: null,
            allowList: nn,
            popperConfig: null,
        },
        pn = {
            HIDE: "hide.bs.tooltip",
            HIDDEN: "hidden.bs.tooltip",
            SHOW: "show.bs.tooltip",
            SHOWN: "shown.bs.tooltip",
            INSERTED: "inserted.bs.tooltip",
            CLICK: "click.bs.tooltip",
            FOCUSIN: "focusin.bs.tooltip",
            FOCUSOUT: "focusout.bs.tooltip",
            MOUSEENTER: "mouseenter.bs.tooltip",
            MOUSELEAVE: "mouseleave.bs.tooltip",
        },
        fn = "fade",
        gn = "modal",
        mn = "show",
        vn = "show",
        _n = "out",
        bn = ".tooltip-inner",
        yn = "hover",
        wn = "focus",
        xn = "click",
        Cn = "manual";
    class kn extends W {
        constructor(t, e) {
            if (void 0 === Di) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
            super(t), (this._isEnabled = !0), (this._timeout = 0), (this._hoverState = ""), (this._activeTrigger = {}), (this._popper = null), (this._config = this._getConfig(e)), (this.tip = null), this._setListeners();
        }
        static get Default() {
            return dn;
        }
        static get NAME() {
            return an;
        }
        static get Event() {
            return pn;
        }
        static get DefaultType() {
            return cn;
        }
        enable() {
            this._isEnabled = !0;
        }
        disable() {
            this._isEnabled = !1;
        }
        toggleEnabled() {
            this._isEnabled = !this._isEnabled;
        }
        toggle(t) {
            if (this._isEnabled)
                if (t) {
                    const e = this._initializeOnDelegatedTarget(t);
                    (e._activeTrigger.click = !e._activeTrigger.click), e._isWithActiveTrigger() ? e._enter(null, e) : e._leave(null, e);
                } else {
                    if (this.getTipElement().classList.contains(mn)) return void this._leave(null, this);
                    this._enter(null, this);
                }
        }
        dispose() {
            clearTimeout(this._timeout), L.off(this._element.closest(`.${gn}`), "hide.bs.modal", this._hideModalHandler), this.tip && this.tip.remove(), this._popper && this._popper.destroy(), super.dispose();
        }
        show() {
            if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
            if (!this.isWithContent() || !this._isEnabled) return;
            const t = L.trigger(this._element, this.constructor.Event.SHOW),
                i = u(this._element),
                s = null === i ? this._element.ownerDocument.documentElement.contains(this._element) : i.contains(this._element);
            if (t.defaultPrevented || !s) return;
            const n = this.getTipElement(),
                o = e(this.constructor.NAME);
            n.setAttribute("id", o), this._element.setAttribute("aria-describedby", o), this.setContent(), this._config.animation && n.classList.add(fn);
            const a = "function" == typeof this._config.placement ? this._config.placement.call(this, n, this._element) : this._config.placement,
                r = this._getAttachment(a);
            this._addAttachmentClass(r);
            const { container: l } = this._config;
            $.set(n, this.constructor.DATA_KEY, this),
                this._element.ownerDocument.documentElement.contains(this.tip) || (l.appendChild(n), L.trigger(this._element, this.constructor.Event.INSERTED)),
                this._popper ? this._popper.update() : (this._popper = ki(this._element, n, this._getPopperConfig(r))),
                n.classList.add(mn);
            const h = "function" == typeof this._config.customClass ? this._config.customClass() : this._config.customClass;
            h && n.classList.add(...h.split(" ")),
                "ontouchstart" in document.documentElement &&
                    [].concat(...document.body.children).forEach((t) => {
                        L.on(t, "mouseover", d);
                    });
            const c = this.tip.classList.contains(fn);
            this._queueCallback(
                () => {
                    const t = this._hoverState;
                    (this._hoverState = null), L.trigger(this._element, this.constructor.Event.SHOWN), t === _n && this._leave(null, this);
                },
                this.tip,
                c
            );
        }
        hide() {
            if (!this._popper) return;
            const t = this.getTipElement();
            if (L.trigger(this._element, this.constructor.Event.HIDE).defaultPrevented) return;
            t.classList.remove(mn),
                "ontouchstart" in document.documentElement && [].concat(...document.body.children).forEach((t) => L.off(t, "mouseover", d)),
                (this._activeTrigger[xn] = !1),
                (this._activeTrigger[wn] = !1),
                (this._activeTrigger[yn] = !1);
            const e = this.tip.classList.contains(fn);
            this._queueCallback(
                () => {
                    this._isWithActiveTrigger() ||
                        (this._hoverState !== vn && t.remove(),
                        this._cleanTipClass(),
                        this._element.removeAttribute("aria-describedby"),
                        L.trigger(this._element, this.constructor.Event.HIDDEN),
                        this._popper && (this._popper.destroy(), (this._popper = null)));
                },
                this.tip,
                e
            ),
                (this._hoverState = "");
        }
        update() {
            null !== this._popper && this._popper.update();
        }
        isWithContent() {
            return Boolean(this.getTitle());
        }
        getTipElement() {
            if (this.tip) return this.tip;
            const t = document.createElement("div");
            return (t.innerHTML = this._config.template), (this.tip = t.children[0]), this.tip;
        }
        setContent() {
            const e = this.getTipElement();
            this.setElementContent(t.findOne(bn, e), this.getTitle()), e.classList.remove(fn, mn);
        }
        setElementContent(t, e) {
            if (null !== t)
                return a(e)
                    ? ((e = r(e)), void (this._config.html ? e.parentNode !== t && ((t.innerHTML = ""), t.appendChild(e)) : (t.textContent = e.textContent)))
                    : void (this._config.html ? (this._config.sanitize && (e = on(e, this._config.allowList, this._config.sanitizeFn)), (t.innerHTML = e)) : (t.textContent = e));
        }
        getTitle() {
            let t = this._element.getAttribute("data-bs-original-title");
            return t || (t = "function" == typeof this._config.title ? this._config.title.call(this._element) : this._config.title), t;
        }
        updateAttachment(t) {
            return "right" === t ? "end" : "left" === t ? "start" : t;
        }
        _initializeOnDelegatedTarget(t, e) {
            const i = this.constructor.DATA_KEY;
            return (e = e || $.get(t.delegateTarget, i)) || ((e = new this.constructor(t.delegateTarget, this._getDelegateConfig())), $.set(t.delegateTarget, i, e)), e;
        }
        _getOffset() {
            const { offset: t } = this._config;
            return "string" == typeof t ? t.split(",").map((t) => Number.parseInt(t, 10)) : "function" == typeof t ? (e) => t(e, this._element) : t;
        }
        _getPopperConfig(t) {
            const e = {
                placement: t,
                modifiers: [
                    { name: "flip", options: { fallbackPlacements: this._config.fallbackPlacements } },
                    { name: "offset", options: { offset: this._getOffset() } },
                    { name: "preventOverflow", options: { boundary: this._config.boundary } },
                    { name: "arrow", options: { element: `.${this.constructor.NAME}-arrow` } },
                    { name: "onChange", enabled: !0, phase: "afterWrite", fn: (t) => this._handlePopperPlacementChange(t) },
                ],
                onFirstUpdate: (t) => {
                    t.options.placement !== t.placement && this._handlePopperPlacementChange(t);
                },
            };
            return { ...e, ...("function" == typeof this._config.popperConfig ? this._config.popperConfig(e) : this._config.popperConfig) };
        }
        _addAttachmentClass(t) {
            this.getTipElement().classList.add(`${rn}-${this.updateAttachment(t)}`);
        }
        _getAttachment(t) {
            return un[t.toUpperCase()];
        }
        _setListeners() {
            this._config.trigger.split(" ").forEach((t) => {
                if ("click" === t) L.on(this._element, this.constructor.Event.CLICK, this._config.selector, (t) => this.toggle(t));
                else if (t !== Cn) {
                    const e = t === yn ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN,
                        i = t === yn ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
                    L.on(this._element, e, this._config.selector, (t) => this._enter(t)), L.on(this._element, i, this._config.selector, (t) => this._leave(t));
                }
            }),
                (this._hideModalHandler = () => {
                    this._element && this.hide();
                }),
                L.on(this._element.closest(`.${gn}`), "hide.bs.modal", this._hideModalHandler),
                this._config.selector ? (this._config = { ...this._config, trigger: "manual", selector: "" }) : this._fixTitle();
        }
        _fixTitle() {
            const t = this._element.getAttribute("title"),
                e = typeof this._element.getAttribute("data-bs-original-title");
            (t || "string" !== e) &&
                (this._element.setAttribute("data-bs-original-title", t || ""),
                !t || this._element.getAttribute("aria-label") || this._element.textContent || this._element.setAttribute("aria-label", t),
                this._element.setAttribute("title", ""));
        }
        _enter(t, e) {
            (e = this._initializeOnDelegatedTarget(t, e)),
                t && (e._activeTrigger["focusin" === t.type ? wn : yn] = !0),
                e.getTipElement().classList.contains(mn) || e._hoverState === vn
                    ? (e._hoverState = vn)
                    : (clearTimeout(e._timeout),
                      (e._hoverState = vn),
                      e._config.delay && e._config.delay.show
                          ? (e._timeout = setTimeout(() => {
                                e._hoverState === vn && e.show();
                            }, e._config.delay.show))
                          : e.show());
        }
        _leave(t, e) {
            (e = this._initializeOnDelegatedTarget(t, e)),
                t && (e._activeTrigger["focusout" === t.type ? wn : yn] = e._element.contains(t.relatedTarget)),
                e._isWithActiveTrigger() ||
                    (clearTimeout(e._timeout),
                    (e._hoverState = _n),
                    e._config.delay && e._config.delay.hide
                        ? (e._timeout = setTimeout(() => {
                              e._hoverState === _n && e.hide();
                          }, e._config.delay.hide))
                        : e.hide());
        }
        _isWithActiveTrigger() {
            for (const t in this._activeTrigger) if (this._activeTrigger[t]) return !0;
            return !1;
        }
        _getConfig(t) {
            const e = J.getDataAttributes(this._element);
            return (
                Object.keys(e).forEach((t) => {
                    hn.has(t) && delete e[t];
                }),
                ((t = { ...this.constructor.Default, ...e, ...("object" == typeof t && t ? t : {}) }).container = !1 === t.container ? document.body : r(t.container)),
                "number" == typeof t.delay && (t.delay = { show: t.delay, hide: t.delay }),
                "number" == typeof t.title && (t.title = t.title.toString()),
                "number" == typeof t.content && (t.content = t.content.toString()),
                l(an, t, this.constructor.DefaultType),
                t.sanitize && (t.template = on(t.template, t.allowList, t.sanitizeFn)),
                t
            );
        }
        _getDelegateConfig() {
            const t = {};
            if (this._config) for (const e in this._config) this.constructor.Default[e] !== this._config[e] && (t[e] = this._config[e]);
            return t;
        }
        _cleanTipClass() {
            const t = this.getTipElement(),
                e = t.getAttribute("class").match(ln);
            null !== e && e.length > 0 && e.map((t) => t.trim()).forEach((e) => t.classList.remove(e));
        }
        _handlePopperPlacementChange(t) {
            const { state: e } = t;
            e && ((this.tip = e.elements.popper), this._cleanTipClass(), this._addAttachmentClass(this._getAttachment(e.placement)));
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = kn.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    v(kn);
    const Dn = "popover",
        En = "bs-popover",
        In = new RegExp(`(^|\\s)${En}\\S+`, "g"),
        An = {
            ...kn.Default,
            placement: "right",
            offset: [0, 8],
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
        },
        Sn = { ...kn.DefaultType, content: "(string|element|function)" },
        Tn = {
            HIDE: "hide.bs.popover",
            HIDDEN: "hidden.bs.popover",
            SHOW: "show.bs.popover",
            SHOWN: "shown.bs.popover",
            INSERTED: "inserted.bs.popover",
            CLICK: "click.bs.popover",
            FOCUSIN: "focusin.bs.popover",
            FOCUSOUT: "focusout.bs.popover",
            MOUSEENTER: "mouseenter.bs.popover",
            MOUSELEAVE: "mouseleave.bs.popover",
        },
        Mn = "fade",
        Pn = "show",
        Fn = ".popover-header",
        On = ".popover-body";
    class zn extends kn {
        static get Default() {
            return An;
        }
        static get NAME() {
            return Dn;
        }
        static get Event() {
            return Tn;
        }
        static get DefaultType() {
            return Sn;
        }
        isWithContent() {
            return this.getTitle() || this._getContent();
        }
        getTipElement() {
            return this.tip ? this.tip : ((this.tip = super.getTipElement()), this.getTitle() || t.findOne(Fn, this.tip).remove(), this._getContent() || t.findOne(On, this.tip).remove(), this.tip);
        }
        setContent() {
            const e = this.getTipElement();
            this.setElementContent(t.findOne(Fn, e), this.getTitle());
            let i = this._getContent();
            "function" == typeof i && (i = i.call(this._element)), this.setElementContent(t.findOne(On, e), i), e.classList.remove(Mn, Pn);
        }
        _addAttachmentClass(t) {
            this.getTipElement().classList.add(`${En}-${this.updateAttachment(t)}`);
        }
        _getContent() {
            return this._element.getAttribute("data-bs-content") || this._config.content;
        }
        _cleanTipClass() {
            const t = this.getTipElement(),
                e = t.getAttribute("class").match(In);
            null !== e && e.length > 0 && e.map((t) => t.trim()).forEach((e) => t.classList.remove(e));
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = zn.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    v(zn);
    const Ln = "scrollspy",
        Nn = ".bs.scrollspy",
        $n = { offset: 10, method: "auto", target: "" },
        Hn = { offset: "number", method: "string", target: "(string|element)" },
        Wn = `activate${Nn}`,
        Rn = `scroll${Nn}`,
        jn = `load${Nn}.data-api`,
        qn = "dropdown-item",
        Bn = "active",
        Yn = ".nav, .list-group",
        Vn = ".nav-link",
        Kn = ".nav-item",
        Un = ".list-group-item",
        Qn = ".dropdown",
        Xn = ".dropdown-toggle",
        Zn = "offset",
        Gn = "position";
    class Jn extends W {
        constructor(t, e) {
            super(t),
                (this._scrollElement = "BODY" === this._element.tagName ? window : this._element),
                (this._config = this._getConfig(e)),
                (this._selector = `${this._config.target} ${Vn}, ${this._config.target} ${Un}, ${this._config.target} .${qn}`),
                (this._offsets = []),
                (this._targets = []),
                (this._activeTarget = null),
                (this._scrollHeight = 0),
                L.on(this._scrollElement, Rn, () => this._process()),
                this.refresh(),
                this._process();
        }
        static get Default() {
            return $n;
        }
        static get NAME() {
            return Ln;
        }
        refresh() {
            const e = this._scrollElement === this._scrollElement.window ? Zn : Gn,
                i = "auto" === this._config.method ? e : this._config.method,
                n = i === Gn ? this._getScrollTop() : 0;
            (this._offsets = []),
                (this._targets = []),
                (this._scrollHeight = this._getScrollHeight()),
                t
                    .find(this._selector)
                    .map((e) => {
                        const o = s(e),
                            a = o ? t.findOne(o) : null;
                        if (a) {
                            const t = a.getBoundingClientRect();
                            if (t.width || t.height) return [J[i](a).top + n, o];
                        }
                        return null;
                    })
                    .filter((t) => t)
                    .sort((t, e) => t[0] - e[0])
                    .forEach((t) => {
                        this._offsets.push(t[0]), this._targets.push(t[1]);
                    });
        }
        dispose() {
            L.off(this._scrollElement, Nn), super.dispose();
        }
        _getConfig(t) {
            if ("string" != typeof (t = { ...$n, ...J.getDataAttributes(this._element), ...("object" == typeof t && t ? t : {}) }).target && a(t.target)) {
                let { id: i } = t.target;
                i || ((i = e(Ln)), (t.target.id = i)), (t.target = `#${i}`);
            }
            return l(Ln, t, Hn), t;
        }
        _getScrollTop() {
            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
        }
        _getScrollHeight() {
            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        }
        _getOffsetHeight() {
            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
        }
        _process() {
            const t = this._getScrollTop() + this._config.offset,
                e = this._getScrollHeight(),
                i = this._config.offset + e - this._getOffsetHeight();
            if ((this._scrollHeight !== e && this.refresh(), t >= i)) {
                const t = this._targets[this._targets.length - 1];
                this._activeTarget !== t && this._activate(t);
            } else {
                if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return (this._activeTarget = null), void this._clear();
                for (let e = this._offsets.length; e--; ) {
                    this._activeTarget !== this._targets[e] && t >= this._offsets[e] && (void 0 === this._offsets[e + 1] || t < this._offsets[e + 1]) && this._activate(this._targets[e]);
                }
            }
        }
        _activate(e) {
            (this._activeTarget = e), this._clear();
            const i = this._selector.split(",").map((t) => `${t}[data-bs-target="${e}"],${t}[href="${e}"]`),
                s = t.findOne(i.join(","));
            s.classList.contains(qn)
                ? (t.findOne(Xn, s.closest(Qn)).classList.add(Bn), s.classList.add(Bn))
                : (s.classList.add(Bn),
                  t.parents(s, Yn).forEach((e) => {
                      t.prev(e, `${Vn}, ${Un}`).forEach((t) => t.classList.add(Bn)),
                          t.prev(e, Kn).forEach((e) => {
                              t.children(e, Vn).forEach((t) => t.classList.add(Bn));
                          });
                  })),
                L.trigger(this._scrollElement, Wn, { relatedTarget: e });
        }
        _clear() {
            t.find(this._selector)
                .filter((t) => t.classList.contains(Bn))
                .forEach((t) => t.classList.remove(Bn));
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = Jn.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    L.on(window, jn, () => {
        t.find('[data-bs-spy="scroll"]').forEach((t) => new Jn(t));
    }),
        v(Jn);
    const to = "tab",
        eo = "hide.bs.tab",
        io = "hidden.bs.tab",
        so = "show.bs.tab",
        no = "shown.bs.tab",
        oo = "dropdown-menu",
        ao = "active",
        ro = "fade",
        lo = "show",
        ho = ".dropdown",
        co = ".nav, .list-group",
        uo = ".active",
        po = ":scope > li > .active",
        fo = ".dropdown-toggle",
        go = ":scope > .dropdown-menu .active";
    class mo extends W {
        static get NAME() {
            return to;
        }
        show() {
            if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(ao)) return;
            let e;
            const i = n(this._element),
                s = this._element.closest(co);
            if (s) {
                const i = "UL" === s.nodeName || "OL" === s.nodeName ? po : uo;
                e = (e = t.find(i, s))[e.length - 1];
            }
            const o = e ? L.trigger(e, eo, { relatedTarget: this._element }) : null;
            if (L.trigger(this._element, so, { relatedTarget: e }).defaultPrevented || (null !== o && o.defaultPrevented)) return;
            this._activate(this._element, s);
            const a = () => {
                L.trigger(e, io, { relatedTarget: this._element }), L.trigger(this._element, no, { relatedTarget: e });
            };
            i ? this._activate(i, i.parentNode, a) : a();
        }
        _activate(e, i, s) {
            const n = (!i || ("UL" !== i.nodeName && "OL" !== i.nodeName) ? t.children(i, uo) : t.find(po, i))[0],
                o = s && n && n.classList.contains(ro),
                a = () => this._transitionComplete(e, n, s);
            n && o ? (n.classList.remove(lo), this._queueCallback(a, e, !0)) : a();
        }
        _transitionComplete(e, i, s) {
            if (i) {
                i.classList.remove(ao);
                const e = t.findOne(go, i.parentNode);
                e && e.classList.remove(ao), "tab" === i.getAttribute("role") && i.setAttribute("aria-selected", !1);
            }
            e.classList.add(ao), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), p(e), e.classList.contains(ro) && e.classList.add(lo);
            let n = e.parentNode;
            if ((n && "LI" === n.nodeName && (n = n.parentNode), n && n.classList.contains(oo))) {
                const i = e.closest(ho);
                i && t.find(fo, i).forEach((t) => t.classList.add(ao)), e.setAttribute("aria-expanded", !0);
            }
            s && s();
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = mo.getOrCreateInstance(this);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    L.on(document, "click.bs.tab.data-api", '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', function (t) {
        if ((["A", "AREA"].includes(this.tagName) && t.preventDefault(), c(this))) return;
        mo.getOrCreateInstance(this).show();
    }),
        v(mo);
    const vo = "toast",
        _o = "click.dismiss.bs.toast",
        bo = "mouseover.bs.toast",
        yo = "mouseout.bs.toast",
        wo = "focusin.bs.toast",
        xo = "focusout.bs.toast",
        Co = "hide.bs.toast",
        ko = "hidden.bs.toast",
        Do = "show.bs.toast",
        Eo = "shown.bs.toast",
        Io = "fade",
        Ao = "hide",
        So = "show",
        To = "showing",
        Mo = { animation: "boolean", autohide: "boolean", delay: "number" },
        Po = { animation: !0, autohide: !0, delay: 5e3 },
        Fo = '[data-bs-dismiss="toast"]';
    class Oo extends W {
        constructor(t, e) {
            super(t), (this._config = this._getConfig(e)), (this._timeout = null), (this._hasMouseInteraction = !1), (this._hasKeyboardInteraction = !1), this._setListeners();
        }
        static get DefaultType() {
            return Mo;
        }
        static get Default() {
            return Po;
        }
        static get NAME() {
            return vo;
        }
        show() {
            if (L.trigger(this._element, Do).defaultPrevented) return;
            this._clearTimeout(), this._config.animation && this._element.classList.add(Io);
            this._element.classList.remove(Ao),
                p(this._element),
                this._element.classList.add(To),
                this._queueCallback(
                    () => {
                        this._element.classList.remove(To), this._element.classList.add(So), L.trigger(this._element, Eo), this._maybeScheduleHide();
                    },
                    this._element,
                    this._config.animation
                );
        }
        hide() {
            if (!this._element.classList.contains(So)) return;
            if (L.trigger(this._element, Co).defaultPrevented) return;
            this._element.classList.remove(So),
                this._queueCallback(
                    () => {
                        this._element.classList.add(Ao), L.trigger(this._element, ko);
                    },
                    this._element,
                    this._config.animation
                );
        }
        dispose() {
            this._clearTimeout(), this._element.classList.contains(So) && this._element.classList.remove(So), super.dispose();
        }
        _getConfig(t) {
            return (t = { ...Po, ...J.getDataAttributes(this._element), ...("object" == typeof t && t ? t : {}) }), l(vo, t, this.constructor.DefaultType), t;
        }
        _maybeScheduleHide() {
            this._config.autohide &&
                (this._hasMouseInteraction ||
                    this._hasKeyboardInteraction ||
                    (this._timeout = setTimeout(() => {
                        this.hide();
                    }, this._config.delay)));
        }
        _onInteraction(t, e) {
            switch (t.type) {
                case "mouseover":
                case "mouseout":
                    this._hasMouseInteraction = e;
                    break;
                case "focusin":
                case "focusout":
                    this._hasKeyboardInteraction = e;
            }
            if (e) return void this._clearTimeout();
            const i = t.relatedTarget;
            this._element === i || this._element.contains(i) || this._maybeScheduleHide();
        }
        _setListeners() {
            L.on(this._element, _o, Fo, () => this.hide()),
                L.on(this._element, bo, (t) => this._onInteraction(t, !0)),
                L.on(this._element, yo, (t) => this._onInteraction(t, !1)),
                L.on(this._element, wo, (t) => this._onInteraction(t, !0)),
                L.on(this._element, xo, (t) => this._onInteraction(t, !1));
        }
        _clearTimeout() {
            clearTimeout(this._timeout), (this._timeout = null);
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = Oo.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t](this);
                }
            });
        }
    }
    return v(Oo), { Alert: K, Button: X, Carousel: $t, Collapse: se, Dropdown: is, Modal: $s, Offcanvas: Gs, Popover: zn, ScrollSpy: Jn, Tab: mo, Toast: Oo, Tooltip: kn };
}),
    (function (t, e) {
        function i(e, i) {
            var n = e.nodeName.toLowerCase();
            if ("area" === n) {
                var o,
                    a = e.parentNode,
                    r = a.name;
                return !(!e.href || !r || "map" !== a.nodeName.toLowerCase()) && !!(o = t("img[usemap=#" + r + "]")[0]) && s(o);
            }
            return (/input|select|textarea|button|object/.test(n) ? !e.disabled : ("a" == n && e.href) || i) && s(e);
        }
        function s(e) {
            return !t(e)
                .parents()
                .andSelf()
                .filter(function () {
                    return "hidden" === t.curCSS(this, "visibility") || t.expr.filters.hidden(this);
                }).length;
        }
        (t.ui = t.ui || {}),
            t.ui.version ||
                (t.extend(t.ui, {
                    version: "1.8.22",
                    keyCode: {
                        ALT: 18,
                        BACKSPACE: 8,
                        CAPS_LOCK: 20,
                        COMMA: 188,
                        COMMAND: 91,
                        COMMAND_LEFT: 91,
                        COMMAND_RIGHT: 93,
                        CONTROL: 17,
                        DELETE: 46,
                        DOWN: 40,
                        END: 35,
                        ENTER: 13,
                        ESCAPE: 27,
                        HOME: 36,
                        INSERT: 45,
                        LEFT: 37,
                        MENU: 93,
                        NUMPAD_ADD: 107,
                        NUMPAD_DECIMAL: 110,
                        NUMPAD_DIVIDE: 111,
                        NUMPAD_ENTER: 108,
                        NUMPAD_MULTIPLY: 106,
                        NUMPAD_SUBTRACT: 109,
                        PAGE_DOWN: 34,
                        PAGE_UP: 33,
                        PERIOD: 190,
                        RIGHT: 39,
                        SHIFT: 16,
                        SPACE: 32,
                        TAB: 9,
                        UP: 38,
                        WINDOWS: 91,
                    },
                }),
                t.fn.extend({
                    propAttr: t.fn.prop || t.fn.attr,
                    _focus: t.fn.focus,
                    focus: function (e, i) {
                        return "number" == typeof e
                            ? this.each(function () {
                                  var s = this;
                                  setTimeout(function () {
                                      t(s).focus(), i && i.call(s);
                                  }, e);
                              })
                            : this._focus.apply(this, arguments);
                    },
                    scrollParent: function () {
                        var e;
                        return (
                            (e =
                                (t.browser.msie && /(static|relative)/.test(this.css("position"))) || /absolute/.test(this.css("position"))
                                    ? this.parents()
                                          .filter(function () {
                                              return /(relative|absolute|fixed)/.test(t.curCSS(this, "position", 1)) && /(auto|scroll)/.test(t.curCSS(this, "overflow", 1) + t.curCSS(this, "overflow-y", 1) + t.curCSS(this, "overflow-x", 1));
                                          })
                                          .eq(0)
                                    : this.parents()
                                          .filter(function () {
                                              return /(auto|scroll)/.test(t.curCSS(this, "overflow", 1) + t.curCSS(this, "overflow-y", 1) + t.curCSS(this, "overflow-x", 1));
                                          })
                                          .eq(0)),
                            /fixed/.test(this.css("position")) || !e.length ? t(document) : e
                        );
                    },
                    zIndex: function (i) {
                        if (i !== e) return this.css("zIndex", i);
                        if (this.length)
                            for (var s, n, o = t(this[0]); o.length && o[0] !== document; ) {
                                if (("absolute" === (s = o.css("position")) || "relative" === s || "fixed" === s) && ((n = parseInt(o.css("zIndex"), 10)), !isNaN(n) && 0 !== n)) return n;
                                o = o.parent();
                            }
                        return 0;
                    },
                    disableSelection: function () {
                        return this.bind((t.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (t) {
                            t.preventDefault();
                        });
                    },
                    enableSelection: function () {
                        return this.unbind(".ui-disableSelection");
                    },
                }),
                t("<a>").outerWidth(1).jquery ||
                    t.each(["Width", "Height"], function (i, s) {
                        function n(e, i, s, n) {
                            return (
                                t.each(o, function () {
                                    (i -= parseFloat(t.curCSS(e, "padding" + this, !0)) || 0), s && (i -= parseFloat(t.curCSS(e, "border" + this + "Width", !0)) || 0), n && (i -= parseFloat(t.curCSS(e, "margin" + this, !0)) || 0);
                                }),
                                i
                            );
                        }
                        var o = "Width" === s ? ["Left", "Right"] : ["Top", "Bottom"],
                            a = s.toLowerCase(),
                            r = { innerWidth: t.fn.innerWidth, innerHeight: t.fn.innerHeight, outerWidth: t.fn.outerWidth, outerHeight: t.fn.outerHeight };
                        (t.fn["inner" + s] = function (i) {
                            return i === e
                                ? r["inner" + s].call(this)
                                : this.each(function () {
                                      t(this).css(a, n(this, i) + "px");
                                  });
                        }),
                            (t.fn["outer" + s] = function (e, i) {
                                return "number" != typeof e
                                    ? r["outer" + s].call(this, e)
                                    : this.each(function () {
                                          t(this).css(a, n(this, e, !0, i) + "px");
                                      });
                            });
                    }),
                t.extend(t.expr[":"], {
                    data: t.expr.createPseudo
                        ? t.expr.createPseudo(function (e) {
                              return function (i) {
                                  return !!t.data(i, e);
                              };
                          })
                        : function (e, i, s) {
                              return !!t.data(e, s[3]);
                          },
                    focusable: function (e) {
                        return i(e, !isNaN(t.attr(e, "tabindex")));
                    },
                    tabbable: function (e) {
                        var s = t.attr(e, "tabindex"),
                            n = isNaN(s);
                        return (n || s >= 0) && i(e, !n);
                    },
                }),
                t(function () {
                    var e = document.body,
                        i = e.appendChild((i = document.createElement("div")));
                    i.offsetHeight,
                        t.extend(i.style, { minHeight: "100px", height: "auto", padding: 0, borderWidth: 0 }),
                        (t.support.minHeight = 100 === i.offsetHeight),
                        (t.support.selectstart = "onselectstart" in i),
                        (e.removeChild(i).style.display = "none");
                }),
                t.curCSS || (t.curCSS = t.css),
                t.extend(t.ui, {
                    plugin: {
                        add: function (e, i, s) {
                            var n = t.ui[e].prototype;
                            for (var o in s) (n.plugins[o] = n.plugins[o] || []), n.plugins[o].push([i, s[o]]);
                        },
                        call: function (t, e, i) {
                            var s = t.plugins[e];
                            if (s && t.element[0].parentNode) for (var n = 0; n < s.length; n++) t.options[s[n][0]] && s[n][1].apply(t.element, i);
                        },
                    },
                    contains: function (t, e) {
                        return document.compareDocumentPosition ? 16 & t.compareDocumentPosition(e) : t !== e && t.contains(e);
                    },
                    hasScroll: function (e, i) {
                        if ("hidden" === t(e).css("overflow")) return !1;
                        var s = i && "left" === i ? "scrollLeft" : "scrollTop",
                            n = !1;
                        return e[s] > 0 || ((e[s] = 1), (n = e[s] > 0), (e[s] = 0), n);
                    },
                    isOverAxis: function (t, e, i) {
                        return t > e && t < e + i;
                    },
                    isOver: function (e, i, s, n, o, a) {
                        return t.ui.isOverAxis(e, s, o) && t.ui.isOverAxis(i, n, a);
                    },
                }));
    })(jQuery),
    (function (t, e) {
        if (t.cleanData) {
            var i = t.cleanData;
            t.cleanData = function (e) {
                for (var s, n = 0; null != (s = e[n]); n++)
                    try {
                        t(s).triggerHandler("remove");
                    } catch (t) {}
                i(e);
            };
        } else {
            var s = t.fn.remove;
            t.fn.remove = function (e, i) {
                return this.each(function () {
                    return (
                        i ||
                            ((!e || t.filter(e, [this]).length) &&
                                t("*", this)
                                    .add([this])
                                    .each(function () {
                                        try {
                                            t(this).triggerHandler("remove");
                                        } catch (t) {}
                                    })),
                        s.call(t(this), e, i)
                    );
                });
            };
        }
        (t.widget = function (e, i, s) {
            var n,
                o = e.split(".")[0];
            (n = o + "-" + (e = e.split(".")[1])),
                s || ((s = i), (i = t.Widget)),
                (t.expr[":"][n] = function (i) {
                    return !!t.data(i, e);
                }),
                (t[o] = t[o] || {}),
                (t[o][e] = function (t, e) {
                    arguments.length && this._createWidget(t, e);
                });
            var a = new i();
            (a.options = t.extend(!0, {}, a.options)), (t[o][e].prototype = t.extend(!0, a, { namespace: o, widgetName: e, widgetEventPrefix: t[o][e].prototype.widgetEventPrefix || e, widgetBaseClass: n }, s)), t.widget.bridge(e, t[o][e]);
        }),
            (t.widget.bridge = function (i, s) {
                t.fn[i] = function (n) {
                    var o = "string" == typeof n,
                        a = Array.prototype.slice.call(arguments, 1),
                        r = this;
                    return (
                        (n = !o && a.length ? t.extend.apply(null, [!0, n].concat(a)) : n),
                        o && "_" === n.charAt(0)
                            ? r
                            : (o
                                  ? this.each(function () {
                                        var s = t.data(this, i),
                                            o = s && t.isFunction(s[n]) ? s[n].apply(s, a) : s;
                                        if (o !== s && o !== e) return (r = o), !1;
                                    })
                                  : this.each(function () {
                                        var e = t.data(this, i);
                                        e ? e.option(n || {})._init() : t.data(this, i, new s(n, this));
                                    }),
                              r)
                    );
                };
            }),
            (t.Widget = function (t, e) {
                arguments.length && this._createWidget(t, e);
            }),
            (t.Widget.prototype = {
                widgetName: "widget",
                widgetEventPrefix: "",
                options: { disabled: !1 },
                _createWidget: function (e, i) {
                    t.data(i, this.widgetName, this), (this.element = t(i)), (this.options = t.extend(!0, {}, this.options, this._getCreateOptions(), e));
                    var s = this;
                    this.element.bind("remove." + this.widgetName, function () {
                        s.destroy();
                    }),
                        this._create(),
                        this._trigger("create"),
                        this._init();
                },
                _getCreateOptions: function () {
                    return t.metadata && t.metadata.get(this.element[0])[this.widgetName];
                },
                _create: function () {},
                _init: function () {},
                destroy: function () {
                    this.element.unbind("." + this.widgetName).removeData(this.widgetName),
                        this.widget()
                            .unbind("." + this.widgetName)
                            .removeAttr("aria-disabled")
                            .removeClass(this.widgetBaseClass + "-disabled ui-state-disabled");
                },
                widget: function () {
                    return this.element;
                },
                option: function (i, s) {
                    var n = i;
                    if (0 === arguments.length) return t.extend({}, this.options);
                    if ("string" == typeof i) {
                        if (s === e) return this.options[i];
                        (n = {})[i] = s;
                    }
                    return this._setOptions(n), this;
                },
                _setOptions: function (e) {
                    var i = this;
                    return (
                        t.each(e, function (t, e) {
                            i._setOption(t, e);
                        }),
                        this
                    );
                },
                _setOption: function (t, e) {
                    return (
                        (this.options[t] = e),
                        "disabled" === t &&
                            this.widget()
                                [e ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled")
                                .attr("aria-disabled", e),
                        this
                    );
                },
                enable: function () {
                    return this._setOption("disabled", !1);
                },
                disable: function () {
                    return this._setOption("disabled", !0);
                },
                _trigger: function (e, i, s) {
                    var n,
                        o,
                        a = this.options[e];
                    if (((s = s || {}), ((i = t.Event(i)).type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase()), (i.target = this.element[0]), (o = i.originalEvent))) for (n in o) n in i || (i[n] = o[n]);
                    return this.element.trigger(i, s), !((t.isFunction(a) && !1 === a.call(this.element[0], i, s)) || i.isDefaultPrevented());
                },
            });
    })(jQuery),
    (function (t, e) {
        var i = !1;
        t(document).mouseup(function (t) {
            i = !1;
        }),
            t.widget("ui.mouse", {
                options: { cancel: ":input,option", distance: 1, delay: 0 },
                _mouseInit: function () {
                    var e = this;
                    this.element
                        .bind("mousedown." + this.widgetName, function (t) {
                            return e._mouseDown(t);
                        })
                        .bind("click." + this.widgetName, function (i) {
                            if (!0 === t.data(i.target, e.widgetName + ".preventClickEvent")) return t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1;
                        }),
                        (this.started = !1);
                },
                _mouseDestroy: function () {
                    this.element.unbind("." + this.widgetName),
                        t(document)
                            .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
                            .unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
                },
                _mouseDown: function (e) {
                    if (!i) {
                        this._mouseStarted && this._mouseUp(e), (this._mouseDownEvent = e);
                        var s = this,
                            n = 1 == e.which,
                            o = !("string" != typeof this.options.cancel || !e.target.nodeName) && t(e.target).closest(this.options.cancel).length;
                        return (
                            !(n && !o && this._mouseCapture(e)) ||
                            ((this.mouseDelayMet = !this.options.delay),
                            this.mouseDelayMet ||
                                (this._mouseDelayTimer = setTimeout(function () {
                                    s.mouseDelayMet = !0;
                                }, this.options.delay)),
                            this._mouseDistanceMet(e) && this._mouseDelayMet(e) && ((this._mouseStarted = !1 !== this._mouseStart(e)), !this._mouseStarted)
                                ? (e.preventDefault(), !0)
                                : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"),
                                  (this._mouseMoveDelegate = function (t) {
                                      return s._mouseMove(t);
                                  }),
                                  (this._mouseUpDelegate = function (t) {
                                      return s._mouseUp(t);
                                  }),
                                  t(document)
                                      .bind("mousemove." + this.widgetName, this._mouseMoveDelegate)
                                      .bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                                  e.preventDefault(),
                                  (i = !0),
                                  !0))
                        );
                    }
                },
                _mouseMove: function (e) {
                    return !t.browser.msie || document.documentMode >= 9 || e.button
                        ? this._mouseStarted
                            ? (this._mouseDrag(e), e.preventDefault())
                            : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && ((this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, e)), this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)),
                              !this._mouseStarted)
                        : this._mouseUp(e);
                },
                _mouseUp: function (e) {
                    return (
                        t(document)
                            .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
                            .unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
                        this._mouseStarted && ((this._mouseStarted = !1), e.target == this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)),
                        !1
                    );
                },
                _mouseDistanceMet: function (t) {
                    return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance;
                },
                _mouseDelayMet: function (t) {
                    return this.mouseDelayMet;
                },
                _mouseStart: function (t) {},
                _mouseDrag: function (t) {},
                _mouseStop: function (t) {},
                _mouseCapture: function (t) {
                    return !0;
                },
            });
    })(jQuery),
    (function (t, e) {
        t.widget("ui.draggable", t.ui.mouse, {
            widgetEventPrefix: "drag",
            options: {
                addClasses: !0,
                appendTo: "parent",
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: "default",
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: "both",
                snapTolerance: 20,
                stack: !1,
                zIndex: !1,
            },
            _create: function () {
                "original" == this.options.helper && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"),
                    this.options.addClasses && this.element.addClass("ui-draggable"),
                    this.options.disabled && this.element.addClass("ui-draggable-disabled"),
                    this._mouseInit();
            },
            destroy: function () {
                if (this.element.data("draggable")) return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this;
            },
            _mouseCapture: function (e) {
                var i = this.options;
                return (
                    !(this.helper || i.disabled || t(e.target).is(".ui-resizable-handle")) &&
                    ((this.handle = this._getHandle(e)),
                    !!this.handle &&
                        (i.iframeFix &&
                            t(!0 === i.iframeFix ? "iframe" : i.iframeFix).each(function () {
                                t('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>')
                                    .css({ width: this.offsetWidth + "px", height: this.offsetHeight + "px", position: "absolute", opacity: "0.001", zIndex: 1e3 })
                                    .css(t(this).offset())
                                    .appendTo("body");
                            }),
                        !0))
                );
            },
            _mouseStart: function (e) {
                var i = this.options;
                return (
                    (this.helper = this._createHelper(e)),
                    this.helper.addClass("ui-draggable-dragging"),
                    this._cacheHelperProportions(),
                    t.ui.ddmanager && (t.ui.ddmanager.current = this),
                    this._cacheMargins(),
                    (this.cssPosition = this.helper.css("position")),
                    (this.scrollParent = this.helper.scrollParent()),
                    (this.offset = this.positionAbs = this.element.offset()),
                    (this.offset = { top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left }),
                    t.extend(this.offset, { click: { left: e.pageX - this.offset.left, top: e.pageY - this.offset.top }, parent: this._getParentOffset(), relative: this._getRelativeOffset() }),
                    (this.originalPosition = this.position = this._generatePosition(e)),
                    (this.originalPageX = e.pageX),
                    (this.originalPageY = e.pageY),
                    i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
                    i.containment && this._setContainment(),
                    !1 === this._trigger("start", e)
                        ? (this._clear(), !1)
                        : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
                );
            },
            _mouseDrag: function (e, i) {
                if (((this.position = this._generatePosition(e)), (this.positionAbs = this._convertPositionTo("absolute")), !i)) {
                    var s = this._uiHash();
                    if (!1 === this._trigger("drag", e, s)) return this._mouseUp({}), !1;
                    this.position = s.position;
                }
                return (
                    (this.options.axis && "y" == this.options.axis) || (this.helper[0].style.left = this.position.left + "px"),
                    (this.options.axis && "x" == this.options.axis) || (this.helper[0].style.top = this.position.top + "px"),
                    t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
                    !1
                );
            },
            _mouseStop: function (e) {
                var i = !1;
                t.ui.ddmanager && !this.options.dropBehaviour && (i = t.ui.ddmanager.drop(this, e)), this.dropped && ((i = this.dropped), (this.dropped = !1));
                for (var s = this.element[0], n = !1; s && (s = s.parentNode); ) s == document && (n = !0);
                if (!n && "original" === this.options.helper) return !1;
                if (("invalid" == this.options.revert && !i) || ("valid" == this.options.revert && i) || !0 === this.options.revert || (t.isFunction(this.options.revert) && this.options.revert.call(this.element, i))) {
                    var o = this;
                    t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                        !1 !== o._trigger("stop", e) && o._clear();
                    });
                } else !1 !== this._trigger("stop", e) && this._clear();
                return !1;
            },
            _mouseUp: function (e) {
                return (
                    !0 === this.options.iframeFix &&
                        t("div.ui-draggable-iframeFix").each(function () {
                            this.parentNode.removeChild(this);
                        }),
                    t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e),
                    t.ui.mouse.prototype._mouseUp.call(this, e)
                );
            },
            cancel: function () {
                return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this;
            },
            _getHandle: function (e) {
                var i = !this.options.handle || !t(this.options.handle, this.element).length;
                return (
                    t(this.options.handle, this.element)
                        .find("*")
                        .andSelf()
                        .each(function () {
                            this == e.target && (i = !0);
                        }),
                    i
                );
            },
            _createHelper: function (e) {
                var i = this.options,
                    s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e])) : "clone" == i.helper ? this.element.clone().removeAttr("id") : this.element;
                return s.parents("body").length || s.appendTo("parent" == i.appendTo ? this.element[0].parentNode : i.appendTo), s[0] != this.element[0] && !/(fixed|absolute)/.test(s.css("position")) && s.css("position", "absolute"), s;
            },
            _adjustOffsetFromHelper: function (e) {
                "string" == typeof e && (e = e.split(" ")),
                    t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }),
                    "left" in e && (this.offset.click.left = e.left + this.margins.left),
                    "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left),
                    "top" in e && (this.offset.click.top = e.top + this.margins.top),
                    "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top);
            },
            _getParentOffset: function () {
                this.offsetParent = this.helper.offsetParent();
                var e = this.offsetParent.offset();
                return (
                    "absolute" == this.cssPosition && this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0]) && ((e.left += this.scrollParent.scrollLeft()), (e.top += this.scrollParent.scrollTop())),
                    (this.offsetParent[0] == document.body || (this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && t.browser.msie)) && (e = { top: 0, left: 0 }),
                    { top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) }
                );
            },
            _getRelativeOffset: function () {
                if ("relative" == this.cssPosition) {
                    var t = this.element.position();
                    return { top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft() };
                }
                return { top: 0, left: 0 };
            },
            _cacheMargins: function () {
                this.margins = {
                    left: parseInt(this.element.css("marginLeft"), 10) || 0,
                    top: parseInt(this.element.css("marginTop"), 10) || 0,
                    right: parseInt(this.element.css("marginRight"), 10) || 0,
                    bottom: parseInt(this.element.css("marginBottom"), 10) || 0,
                };
            },
            _cacheHelperProportions: function () {
                this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };
            },
            _setContainment: function () {
                var e = this.options;
                if (
                    ("parent" == e.containment && (e.containment = this.helper[0].parentNode),
                    ("document" != e.containment && "window" != e.containment) ||
                        (this.containment = [
                            "document" == e.containment ? 0 : t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
                            "document" == e.containment ? 0 : t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,
                            ("document" == e.containment ? 0 : t(window).scrollLeft()) + t("document" == e.containment ? document : window).width() - this.helperProportions.width - this.margins.left,
                            ("document" == e.containment ? 0 : t(window).scrollTop()) +
                                (t("document" == e.containment ? document : window).height() || document.body.parentNode.scrollHeight) -
                                this.helperProportions.height -
                                this.margins.top,
                        ]),
                    /^(document|window|parent)$/.test(e.containment) || e.containment.constructor == Array)
                )
                    e.containment.constructor == Array && (this.containment = e.containment);
                else {
                    var i = t(e.containment),
                        s = i[0];
                    if (!s) return;
                    i.offset();
                    var n = "hidden" != t(s).css("overflow");
                    (this.containment = [
                        (parseInt(t(s).css("borderLeftWidth"), 10) || 0) + (parseInt(t(s).css("paddingLeft"), 10) || 0),
                        (parseInt(t(s).css("borderTopWidth"), 10) || 0) + (parseInt(t(s).css("paddingTop"), 10) || 0),
                        (n ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) -
                            (parseInt(t(s).css("borderLeftWidth"), 10) || 0) -
                            (parseInt(t(s).css("paddingRight"), 10) || 0) -
                            this.helperProportions.width -
                            this.margins.left -
                            this.margins.right,
                        (n ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) -
                            (parseInt(t(s).css("borderTopWidth"), 10) || 0) -
                            (parseInt(t(s).css("paddingBottom"), 10) || 0) -
                            this.helperProportions.height -
                            this.margins.top -
                            this.margins.bottom,
                    ]),
                        (this.relative_container = i);
                }
            },
            _convertPositionTo: function (e, i) {
                i || (i = this.position);
                var s = "absolute" == e ? 1 : -1,
                    n = (this.options, "absolute" != this.cssPosition || (this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.scrollParent : this.offsetParent),
                    o = /(html|body)/i.test(n[0].tagName);
                return {
                    top:
                        i.top +
                        this.offset.relative.top * s +
                        this.offset.parent.top * s -
                        (t.browser.safari && t.browser.version < 526 && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s),
                    left:
                        i.left +
                        this.offset.relative.left * s +
                        this.offset.parent.left * s -
                        (t.browser.safari && t.browser.version < 526 && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s),
                };
            },
            _generatePosition: function (e) {
                var i = this.options,
                    s = "absolute" != this.cssPosition || (this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.scrollParent : this.offsetParent,
                    n = /(html|body)/i.test(s[0].tagName),
                    o = e.pageX,
                    a = e.pageY;
                if (this.originalPosition) {
                    var r;
                    if (this.containment) {
                        if (this.relative_container) {
                            var l = this.relative_container.offset();
                            r = [this.containment[0] + l.left, this.containment[1] + l.top, this.containment[2] + l.left, this.containment[3] + l.top];
                        } else r = this.containment;
                        e.pageX - this.offset.click.left < r[0] && (o = r[0] + this.offset.click.left),
                            e.pageY - this.offset.click.top < r[1] && (a = r[1] + this.offset.click.top),
                            e.pageX - this.offset.click.left > r[2] && (o = r[2] + this.offset.click.left),
                            e.pageY - this.offset.click.top > r[3] && (a = r[3] + this.offset.click.top);
                    }
                    if (i.grid) {
                        var h = i.grid[1] ? this.originalPageY + Math.round((a - this.originalPageY) / i.grid[1]) * i.grid[1] : this.originalPageY;
                        a = r && (h - this.offset.click.top < r[1] || h - this.offset.click.top > r[3]) ? (h - this.offset.click.top < r[1] ? h + i.grid[1] : h - i.grid[1]) : h;
                        var c = i.grid[0] ? this.originalPageX + Math.round((o - this.originalPageX) / i.grid[0]) * i.grid[0] : this.originalPageX;
                        o = r && (c - this.offset.click.left < r[0] || c - this.offset.click.left > r[2]) ? (c - this.offset.click.left < r[0] ? c + i.grid[0] : c - i.grid[0]) : c;
                    }
                }
                return {
                    top:
                        a -
                        this.offset.click.top -
                        this.offset.relative.top -
                        this.offset.parent.top +
                        (t.browser.safari && t.browser.version < 526 && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : n ? 0 : s.scrollTop()),
                    left:
                        o -
                        this.offset.click.left -
                        this.offset.relative.left -
                        this.offset.parent.left +
                        (t.browser.safari && t.browser.version < 526 && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : n ? 0 : s.scrollLeft()),
                };
            },
            _clear: function () {
                this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), (this.helper = null), (this.cancelHelperRemoval = !1);
            },
            _trigger: function (e, i, s) {
                return (s = s || this._uiHash()), t.ui.plugin.call(this, e, [i, s]), "drag" == e && (this.positionAbs = this._convertPositionTo("absolute")), t.Widget.prototype._trigger.call(this, e, i, s);
            },
            plugins: {},
            _uiHash: function (t) {
                return { helper: this.helper, position: this.position, originalPosition: this.originalPosition, offset: this.positionAbs };
            },
        }),
            t.extend(t.ui.draggable, { version: "1.8.22" }),
            t.ui.plugin.add("draggable", "connectToSortable", {
                start: function (e, i) {
                    var s = t(this).data("draggable"),
                        n = s.options,
                        o = t.extend({}, i, { item: s.element });
                    (s.sortables = []),
                        t(n.connectToSortable).each(function () {
                            var i = t.data(this, "sortable");
                            i && !i.options.disabled && (s.sortables.push({ instance: i, shouldRevert: i.options.revert }), i.refreshPositions(), i._trigger("activate", e, o));
                        });
                },
                stop: function (e, i) {
                    var s = t(this).data("draggable"),
                        n = t.extend({}, i, { item: s.element });
                    t.each(s.sortables, function () {
                        this.instance.isOver
                            ? ((this.instance.isOver = 0),
                              (s.cancelHelperRemoval = !0),
                              (this.instance.cancelHelperRemoval = !1),
                              this.shouldRevert && (this.instance.options.revert = !0),
                              this.instance._mouseStop(e),
                              (this.instance.options.helper = this.instance.options._helper),
                              "original" == s.options.helper && this.instance.currentItem.css({ top: "auto", left: "auto" }))
                            : ((this.instance.cancelHelperRemoval = !1), this.instance._trigger("deactivate", e, n));
                    });
                },
                drag: function (e, i) {
                    var s = t(this).data("draggable"),
                        n = this;
                    t.each(s.sortables, function (o) {
                        (this.instance.positionAbs = s.positionAbs),
                            (this.instance.helperProportions = s.helperProportions),
                            (this.instance.offset.click = s.offset.click),
                            this.instance._intersectsWith(this.instance.containerCache)
                                ? (this.instance.isOver ||
                                      ((this.instance.isOver = 1),
                                      (this.instance.currentItem = t(n).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0)),
                                      (this.instance.options._helper = this.instance.options.helper),
                                      (this.instance.options.helper = function () {
                                          return i.helper[0];
                                      }),
                                      (e.target = this.instance.currentItem[0]),
                                      this.instance._mouseCapture(e, !0),
                                      this.instance._mouseStart(e, !0, !0),
                                      (this.instance.offset.click.top = s.offset.click.top),
                                      (this.instance.offset.click.left = s.offset.click.left),
                                      (this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left),
                                      (this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top),
                                      s._trigger("toSortable", e),
                                      (s.dropped = this.instance.element),
                                      (s.currentItem = s.element),
                                      (this.instance.fromOutside = s)),
                                  this.instance.currentItem && this.instance._mouseDrag(e))
                                : this.instance.isOver &&
                                  ((this.instance.isOver = 0),
                                  (this.instance.cancelHelperRemoval = !0),
                                  (this.instance.options.revert = !1),
                                  this.instance._trigger("out", e, this.instance._uiHash(this.instance)),
                                  this.instance._mouseStop(e, !0),
                                  (this.instance.options.helper = this.instance.options._helper),
                                  this.instance.currentItem.remove(),
                                  this.instance.placeholder && this.instance.placeholder.remove(),
                                  s._trigger("fromSortable", e),
                                  (s.dropped = !1));
                    });
                },
            }),
            t.ui.plugin.add("draggable", "cursor", {
                start: function (e, i) {
                    var s = t("body"),
                        n = t(this).data("draggable").options;
                    s.css("cursor") && (n._cursor = s.css("cursor")), s.css("cursor", n.cursor);
                },
                stop: function (e, i) {
                    var s = t(this).data("draggable").options;
                    s._cursor && t("body").css("cursor", s._cursor);
                },
            }),
            t.ui.plugin.add("draggable", "opacity", {
                start: function (e, i) {
                    var s = t(i.helper),
                        n = t(this).data("draggable").options;
                    s.css("opacity") && (n._opacity = s.css("opacity")), s.css("opacity", n.opacity);
                },
                stop: function (e, i) {
                    var s = t(this).data("draggable").options;
                    s._opacity && t(i.helper).css("opacity", s._opacity);
                },
            }),
            t.ui.plugin.add("draggable", "scroll", {
                start: function (e, i) {
                    var s = t(this).data("draggable");
                    s.scrollParent[0] != document && "HTML" != s.scrollParent[0].tagName && (s.overflowOffset = s.scrollParent.offset());
                },
                drag: function (e, i) {
                    var s = t(this).data("draggable"),
                        n = s.options,
                        o = !1;
                    s.scrollParent[0] != document && "HTML" != s.scrollParent[0].tagName
                        ? ((n.axis && "x" == n.axis) ||
                              (s.overflowOffset.top + s.scrollParent[0].offsetHeight - e.pageY < n.scrollSensitivity
                                  ? (s.scrollParent[0].scrollTop = o = s.scrollParent[0].scrollTop + n.scrollSpeed)
                                  : e.pageY - s.overflowOffset.top < n.scrollSensitivity && (s.scrollParent[0].scrollTop = o = s.scrollParent[0].scrollTop - n.scrollSpeed)),
                          (n.axis && "y" == n.axis) ||
                              (s.overflowOffset.left + s.scrollParent[0].offsetWidth - e.pageX < n.scrollSensitivity
                                  ? (s.scrollParent[0].scrollLeft = o = s.scrollParent[0].scrollLeft + n.scrollSpeed)
                                  : e.pageX - s.overflowOffset.left < n.scrollSensitivity && (s.scrollParent[0].scrollLeft = o = s.scrollParent[0].scrollLeft - n.scrollSpeed)))
                        : ((n.axis && "x" == n.axis) ||
                              (e.pageY - t(document).scrollTop() < n.scrollSensitivity
                                  ? (o = t(document).scrollTop(t(document).scrollTop() - n.scrollSpeed))
                                  : t(window).height() - (e.pageY - t(document).scrollTop()) < n.scrollSensitivity && (o = t(document).scrollTop(t(document).scrollTop() + n.scrollSpeed))),
                          (n.axis && "y" == n.axis) ||
                              (e.pageX - t(document).scrollLeft() < n.scrollSensitivity
                                  ? (o = t(document).scrollLeft(t(document).scrollLeft() - n.scrollSpeed))
                                  : t(window).width() - (e.pageX - t(document).scrollLeft()) < n.scrollSensitivity && (o = t(document).scrollLeft(t(document).scrollLeft() + n.scrollSpeed)))),
                        !1 !== o && t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(s, e);
                },
            }),
            t.ui.plugin.add("draggable", "snap", {
                start: function (e, i) {
                    var s = t(this).data("draggable"),
                        n = s.options;
                    (s.snapElements = []),
                        t(n.snap.constructor != String ? n.snap.items || ":data(draggable)" : n.snap).each(function () {
                            var e = t(this),
                                i = e.offset();
                            this != s.element[0] && s.snapElements.push({ item: this, width: e.outerWidth(), height: e.outerHeight(), top: i.top, left: i.left });
                        });
                },
                drag: function (e, i) {
                    for (
                        var s = t(this).data("draggable"), n = s.options, o = n.snapTolerance, a = i.offset.left, r = a + s.helperProportions.width, l = i.offset.top, h = l + s.helperProportions.height, c = s.snapElements.length - 1;
                        c >= 0;
                        c--
                    ) {
                        var u = s.snapElements[c].left,
                            d = u + s.snapElements[c].width,
                            p = s.snapElements[c].top,
                            f = p + s.snapElements[c].height;
                        if (
                            (u - o < a && a < d + o && p - o < l && l < f + o) ||
                            (u - o < a && a < d + o && p - o < h && h < f + o) ||
                            (u - o < r && r < d + o && p - o < l && l < f + o) ||
                            (u - o < r && r < d + o && p - o < h && h < f + o)
                        ) {
                            if ("inner" != n.snapMode) {
                                var g = Math.abs(p - h) <= o,
                                    m = Math.abs(f - l) <= o,
                                    v = Math.abs(u - r) <= o,
                                    _ = Math.abs(d - a) <= o;
                                g && (i.position.top = s._convertPositionTo("relative", { top: p - s.helperProportions.height, left: 0 }).top - s.margins.top),
                                    m && (i.position.top = s._convertPositionTo("relative", { top: f, left: 0 }).top - s.margins.top),
                                    v && (i.position.left = s._convertPositionTo("relative", { top: 0, left: u - s.helperProportions.width }).left - s.margins.left),
                                    _ && (i.position.left = s._convertPositionTo("relative", { top: 0, left: d }).left - s.margins.left);
                            }
                            var b = g || m || v || _;
                            if ("outer" != n.snapMode) {
                                (g = Math.abs(p - l) <= o), (m = Math.abs(f - h) <= o), (v = Math.abs(u - a) <= o), (_ = Math.abs(d - r) <= o);
                                g && (i.position.top = s._convertPositionTo("relative", { top: p, left: 0 }).top - s.margins.top),
                                    m && (i.position.top = s._convertPositionTo("relative", { top: f - s.helperProportions.height, left: 0 }).top - s.margins.top),
                                    v && (i.position.left = s._convertPositionTo("relative", { top: 0, left: u }).left - s.margins.left),
                                    _ && (i.position.left = s._convertPositionTo("relative", { top: 0, left: d - s.helperProportions.width }).left - s.margins.left);
                            }
                            !s.snapElements[c].snapping && (g || m || v || _ || b) && s.options.snap.snap && s.options.snap.snap.call(s.element, e, t.extend(s._uiHash(), { snapItem: s.snapElements[c].item })),
                                (s.snapElements[c].snapping = g || m || v || _ || b);
                        } else s.snapElements[c].snapping && s.options.snap.release && s.options.snap.release.call(s.element, e, t.extend(s._uiHash(), { snapItem: s.snapElements[c].item })), (s.snapElements[c].snapping = !1);
                    }
                },
            }),
            t.ui.plugin.add("draggable", "stack", {
                start: function (e, i) {
                    var s = t(this).data("draggable").options,
                        n = t.makeArray(t(s.stack)).sort(function (e, i) {
                            return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0);
                        });
                    if (n.length) {
                        var o = parseInt(n[0].style.zIndex) || 0;
                        t(n).each(function (t) {
                            this.style.zIndex = o + t;
                        }),
                            (this[0].style.zIndex = o + n.length);
                    }
                },
            }),
            t.ui.plugin.add("draggable", "zIndex", {
                start: function (e, i) {
                    var s = t(i.helper),
                        n = t(this).data("draggable").options;
                    s.css("zIndex") && (n._zIndex = s.css("zIndex")), s.css("zIndex", n.zIndex);
                },
                stop: function (e, i) {
                    var s = t(this).data("draggable").options;
                    s._zIndex && t(i.helper).css("zIndex", s._zIndex);
                },
            });
    })(jQuery),
    (function (t, e) {
        t.widget("ui.droppable", {
            widgetEventPrefix: "drop",
            options: { accept: "*", activeClass: !1, addClasses: !0, greedy: !1, hoverClass: !1, scope: "default", tolerance: "intersect" },
            _create: function () {
                var e = this.options,
                    i = e.accept;
                (this.isover = 0),
                    (this.isout = 1),
                    (this.accept = t.isFunction(i)
                        ? i
                        : function (t) {
                              return t.is(i);
                          }),
                    (this.proportions = { width: this.element[0].offsetWidth, height: this.element[0].offsetHeight }),
                    (t.ui.ddmanager.droppables[e.scope] = t.ui.ddmanager.droppables[e.scope] || []),
                    t.ui.ddmanager.droppables[e.scope].push(this),
                    e.addClasses && this.element.addClass("ui-droppable");
            },
            destroy: function () {
                for (var e = t.ui.ddmanager.droppables[this.options.scope], i = 0; i < e.length; i++) e[i] == this && e.splice(i, 1);
                return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"), this;
            },
            _setOption: function (e, i) {
                "accept" == e &&
                    (this.accept = t.isFunction(i)
                        ? i
                        : function (t) {
                              return t.is(i);
                          }),
                    t.Widget.prototype._setOption.apply(this, arguments);
            },
            _activate: function (e) {
                var i = t.ui.ddmanager.current;
                this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", e, this.ui(i));
            },
            _deactivate: function (e) {
                var i = t.ui.ddmanager.current;
                this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", e, this.ui(i));
            },
            _over: function (e) {
                var i = t.ui.ddmanager.current;
                i &&
                    (i.currentItem || i.element)[0] != this.element[0] &&
                    this.accept.call(this.element[0], i.currentItem || i.element) &&
                    (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", e, this.ui(i)));
            },
            _out: function (e) {
                var i = t.ui.ddmanager.current;
                i &&
                    (i.currentItem || i.element)[0] != this.element[0] &&
                    this.accept.call(this.element[0], i.currentItem || i.element) &&
                    (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", e, this.ui(i)));
            },
            _drop: function (e, i) {
                var s = i || t.ui.ddmanager.current;
                if (!s || (s.currentItem || s.element)[0] == this.element[0]) return !1;
                var n = !1;
                return (
                    this.element
                        .find(":data(droppable)")
                        .not(".ui-draggable-dragging")
                        .each(function () {
                            var e = t.data(this, "droppable");
                            if (
                                e.options.greedy &&
                                !e.options.disabled &&
                                e.options.scope == s.options.scope &&
                                e.accept.call(e.element[0], s.currentItem || s.element) &&
                                t.ui.intersect(s, t.extend(e, { offset: e.element.offset() }), e.options.tolerance)
                            )
                                return (n = !0), !1;
                        }),
                    !n &&
                        !!this.accept.call(this.element[0], s.currentItem || s.element) &&
                        (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", e, this.ui(s)), this.element)
                );
            },
            ui: function (t) {
                return { draggable: t.currentItem || t.element, helper: t.helper, position: t.position, offset: t.positionAbs };
            },
        }),
            t.extend(t.ui.droppable, { version: "1.8.22" }),
            (t.ui.intersect = function (e, i, s) {
                if (!i.offset) return !1;
                var n = (e.positionAbs || e.position.absolute).left,
                    o = n + e.helperProportions.width,
                    a = (e.positionAbs || e.position.absolute).top,
                    r = a + e.helperProportions.height,
                    l = i.offset.left,
                    h = l + i.proportions.width,
                    c = i.offset.top,
                    u = c + i.proportions.height;
                switch (s) {
                    case "fit":
                        return l <= n && o <= h && c <= a && r <= u;
                    case "intersect":
                        return l < n + e.helperProportions.width / 2 && o - e.helperProportions.width / 2 < h && c < a + e.helperProportions.height / 2 && r - e.helperProportions.height / 2 < u;
                    case "pointer":
                        var d = (e.positionAbs || e.position.absolute).left + (e.clickOffset || e.offset.click).left,
                            p = (e.positionAbs || e.position.absolute).top + (e.clickOffset || e.offset.click).top;
                        return t.ui.isOver(p, d, c, l, i.proportions.height, i.proportions.width);
                    case "touch":
                        return ((a >= c && a <= u) || (r >= c && r <= u) || (a < c && r > u)) && ((n >= l && n <= h) || (o >= l && o <= h) || (n < l && o > h));
                    default:
                        return !1;
                }
            }),
            (t.ui.ddmanager = {
                current: null,
                droppables: { default: [] },
                prepareOffsets: function (e, i) {
                    var s = t.ui.ddmanager.droppables[e.options.scope] || [],
                        n = i ? i.type : null,
                        o = (e.currentItem || e.element).find(":data(droppable)").andSelf();
                    t: for (var a = 0; a < s.length; a++)
                        if (!(s[a].options.disabled || (e && !s[a].accept.call(s[a].element[0], e.currentItem || e.element)))) {
                            for (var r = 0; r < o.length; r++)
                                if (o[r] == s[a].element[0]) {
                                    s[a].proportions.height = 0;
                                    continue t;
                                }
                            (s[a].visible = "none" != s[a].element.css("display")),
                                s[a].visible && ("mousedown" == n && s[a]._activate.call(s[a], i), (s[a].offset = s[a].element.offset()), (s[a].proportions = { width: s[a].element[0].offsetWidth, height: s[a].element[0].offsetHeight }));
                        }
                },
                drop: function (e, i) {
                    var s = !1;
                    return (
                        t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function () {
                            this.options &&
                                (!this.options.disabled && this.visible && t.ui.intersect(e, this, this.options.tolerance) && (s = this._drop.call(this, i) || s),
                                !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && ((this.isout = 1), (this.isover = 0), this._deactivate.call(this, i)));
                        }),
                        s
                    );
                },
                dragStart: function (e, i) {
                    e.element.parents(":not(body,html)").bind("scroll.droppable", function () {
                        e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
                    });
                },
                drag: function (e, i) {
                    e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i),
                        t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function () {
                            if (!this.options.disabled && !this.greedyChild && this.visible) {
                                var s = t.ui.intersect(e, this, this.options.tolerance),
                                    n = s || 1 != this.isover ? (s && 0 == this.isover ? "isover" : null) : "isout";
                                if (n) {
                                    var o;
                                    if (this.options.greedy) {
                                        var a = this.element.parents(":data(droppable):eq(0)");
                                        a.length && ((o = t.data(a[0], "droppable")).greedyChild = "isover" == n ? 1 : 0);
                                    }
                                    o && "isover" == n && ((o.isover = 0), (o.isout = 1), o._out.call(o, i)),
                                        (this[n] = 1),
                                        (this["isout" == n ? "isover" : "isout"] = 0),
                                        this["isover" == n ? "_over" : "_out"].call(this, i),
                                        o && "isout" == n && ((o.isout = 0), (o.isover = 1), o._over.call(o, i));
                                }
                            }
                        });
                },
                dragStop: function (e, i) {
                    e.element.parents(":not(body,html)").unbind("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i);
                },
            });
    })(jQuery),
    (function (t, e) {
        t.widget("ui.resizable", t.ui.mouse, {
            widgetEventPrefix: "resize",
            options: {
                alsoResize: !1,
                animate: !1,
                animateDuration: "slow",
                animateEasing: "swing",
                aspectRatio: !1,
                autoHide: !1,
                containment: !1,
                ghost: !1,
                grid: !1,
                handles: "e,s,se",
                helper: !1,
                maxHeight: null,
                maxWidth: null,
                minHeight: 10,
                minWidth: 10,
                zIndex: 1e3,
            },
            _create: function () {
                var e = this,
                    i = this.options;
                if (
                    (this.element.addClass("ui-resizable"),
                    t.extend(this, {
                        _aspectRatio: !!i.aspectRatio,
                        aspectRatio: i.aspectRatio,
                        originalElement: this.element,
                        _proportionallyResizeElements: [],
                        _helper: i.helper || i.ghost || i.animate ? i.helper || "ui-resizable-helper" : null,
                    }),
                    this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) &&
                        (this.element.wrap(
                            t('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                                position: this.element.css("position"),
                                width: this.element.outerWidth(),
                                height: this.element.outerHeight(),
                                top: this.element.css("top"),
                                left: this.element.css("left"),
                            })
                        ),
                        (this.element = this.element.parent().data("resizable", this.element.data("resizable"))),
                        (this.elementIsWrapper = !0),
                        this.element.css({
                            marginLeft: this.originalElement.css("marginLeft"),
                            marginTop: this.originalElement.css("marginTop"),
                            marginRight: this.originalElement.css("marginRight"),
                            marginBottom: this.originalElement.css("marginBottom"),
                        }),
                        this.originalElement.css({ marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0 }),
                        (this.originalResizeStyle = this.originalElement.css("resize")),
                        this.originalElement.css("resize", "none"),
                        this._proportionallyResizeElements.push(this.originalElement.css({ position: "static", zoom: 1, display: "block" })),
                        this.originalElement.css({ margin: this.originalElement.css("margin") }),
                        this._proportionallyResize()),
                    (this.handles =
                        i.handles ||
                        (t(".ui-resizable-handle", this.element).length
                            ? { n: ".ui-resizable-n", e: ".ui-resizable-e", s: ".ui-resizable-s", w: ".ui-resizable-w", se: ".ui-resizable-se", sw: ".ui-resizable-sw", ne: ".ui-resizable-ne", nw: ".ui-resizable-nw" }
                            : "e,s,se")),
                    this.handles.constructor == String)
                ) {
                    "all" == this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw");
                    var s = this.handles.split(",");
                    this.handles = {};
                    for (var n = 0; n < s.length; n++) {
                        var o = t.trim(s[n]),
                            a = t('<div class="ui-resizable-handle ' + ("ui-resizable-" + o) + '"></div>');
                        a.css({ zIndex: i.zIndex }), "se" == o && a.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), (this.handles[o] = ".ui-resizable-" + o), this.element.append(a);
                    }
                }
                (this._renderAxis = function (e) {
                    for (var i in ((e = e || this.element), this.handles)) {
                        if ((this.handles[i].constructor == String && (this.handles[i] = t(this.handles[i], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i))) {
                            var s,
                                n = t(this.handles[i], this.element);
                            s = /sw|ne|nw|se|n|s/.test(i) ? n.outerHeight() : n.outerWidth();
                            var o = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join("");
                            e.css(o, s), this._proportionallyResize();
                        }
                        t(this.handles[i]).length;
                    }
                }),
                    this._renderAxis(this.element),
                    (this._handles = t(".ui-resizable-handle", this.element).disableSelection()),
                    this._handles.mouseover(function () {
                        if (!e.resizing) {
                            if (this.className) var t = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                            e.axis = t && t[1] ? t[1] : "se";
                        }
                    }),
                    i.autoHide &&
                        (this._handles.hide(),
                        t(this.element)
                            .addClass("ui-resizable-autohide")
                            .hover(
                                function () {
                                    i.disabled || (t(this).removeClass("ui-resizable-autohide"), e._handles.show());
                                },
                                function () {
                                    i.disabled || e.resizing || (t(this).addClass("ui-resizable-autohide"), e._handles.hide());
                                }
                            )),
                    this._mouseInit();
            },
            destroy: function () {
                this._mouseDestroy();
                var e = function (e) {
                    t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove();
                };
                if (this.elementIsWrapper) {
                    e(this.element);
                    var i = this.element;
                    i.after(this.originalElement.css({ position: i.css("position"), width: i.outerWidth(), height: i.outerHeight(), top: i.css("top"), left: i.css("left") })).remove();
                }
                return this.originalElement.css("resize", this.originalResizeStyle), e(this.originalElement), this;
            },
            _mouseCapture: function (e) {
                var i = !1;
                for (var s in this.handles) t(this.handles[s])[0] == e.target && (i = !0);
                return !this.options.disabled && i;
            },
            _mouseStart: function (e) {
                var s = this.options,
                    n = this.element.position(),
                    o = this.element;
                (this.resizing = !0),
                    (this.documentScroll = { top: t(document).scrollTop(), left: t(document).scrollLeft() }),
                    (o.is(".ui-draggable") || /absolute/.test(o.css("position"))) && o.css({ position: "absolute", top: n.top, left: n.left }),
                    this._renderProxy();
                var a = i(this.helper.css("left")),
                    r = i(this.helper.css("top"));
                s.containment && ((a += t(s.containment).scrollLeft() || 0), (r += t(s.containment).scrollTop() || 0)),
                    (this.offset = this.helper.offset()),
                    (this.position = { left: a, top: r }),
                    (this.size = this._helper ? { width: o.outerWidth(), height: o.outerHeight() } : { width: o.width(), height: o.height() }),
                    (this.originalSize = this._helper ? { width: o.outerWidth(), height: o.outerHeight() } : { width: o.width(), height: o.height() }),
                    (this.originalPosition = { left: a, top: r }),
                    (this.sizeDiff = { width: o.outerWidth() - o.width(), height: o.outerHeight() - o.height() }),
                    (this.originalMousePosition = { left: e.pageX, top: e.pageY }),
                    (this.aspectRatio = "number" == typeof s.aspectRatio ? s.aspectRatio : this.originalSize.width / this.originalSize.height || 1);
                var l = t(".ui-resizable-" + this.axis).css("cursor");
                return t("body").css("cursor", "auto" == l ? this.axis + "-resize" : l), o.addClass("ui-resizable-resizing"), this._propagate("start", e), !0;
            },
            _mouseDrag: function (e) {
                var i = this.helper,
                    s = (this.options, this.originalMousePosition),
                    n = this.axis,
                    o = e.pageX - s.left || 0,
                    a = e.pageY - s.top || 0,
                    r = this._change[n];
                if (!r) return !1;
                var l = r.apply(this, [e, o, a]);
                t.browser.msie && t.browser.version, this.sizeDiff;
                return (
                    this._updateVirtualBoundaries(e.shiftKey),
                    (this._aspectRatio || e.shiftKey) && (l = this._updateRatio(l, e)),
                    (l = this._respectSize(l, e)),
                    this._propagate("resize", e),
                    i.css({ top: this.position.top + "px", left: this.position.left + "px", width: this.size.width + "px", height: this.size.height + "px" }),
                    !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(),
                    this._updateCache(l),
                    this._trigger("resize", e, this.ui()),
                    !1
                );
            },
            _mouseStop: function (e) {
                this.resizing = !1;
                var i = this.options,
                    s = this;
                if (this._helper) {
                    var n = this._proportionallyResizeElements,
                        o = n.length && /textarea/i.test(n[0].nodeName),
                        a = o && t.ui.hasScroll(n[0], "left") ? 0 : s.sizeDiff.height,
                        r = o ? 0 : s.sizeDiff.width,
                        l = { width: s.helper.width() - r, height: s.helper.height() - a },
                        h = parseInt(s.element.css("left"), 10) + (s.position.left - s.originalPosition.left) || null,
                        c = parseInt(s.element.css("top"), 10) + (s.position.top - s.originalPosition.top) || null;
                    i.animate || this.element.css(t.extend(l, { top: c, left: h })), s.helper.height(s.size.height), s.helper.width(s.size.width), this._helper && !i.animate && this._proportionallyResize();
                }
                return t("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1;
            },
            _updateVirtualBoundaries: function (t) {
                var e,
                    i,
                    n,
                    o,
                    a,
                    r = this.options;
                (a = { minWidth: s(r.minWidth) ? r.minWidth : 0, maxWidth: s(r.maxWidth) ? r.maxWidth : 1 / 0, minHeight: s(r.minHeight) ? r.minHeight : 0, maxHeight: s(r.maxHeight) ? r.maxHeight : 1 / 0 }),
                    (this._aspectRatio || t) &&
                        ((e = a.minHeight * this.aspectRatio),
                        (n = a.minWidth / this.aspectRatio),
                        (i = a.maxHeight * this.aspectRatio),
                        (o = a.maxWidth / this.aspectRatio),
                        e > a.minWidth && (a.minWidth = e),
                        n > a.minHeight && (a.minHeight = n),
                        i < a.maxWidth && (a.maxWidth = i),
                        o < a.maxHeight && (a.maxHeight = o)),
                    (this._vBoundaries = a);
            },
            _updateCache: function (t) {
                this.options;
                (this.offset = this.helper.offset()), s(t.left) && (this.position.left = t.left), s(t.top) && (this.position.top = t.top), s(t.height) && (this.size.height = t.height), s(t.width) && (this.size.width = t.width);
            },
            _updateRatio: function (t, e) {
                this.options;
                var i = this.position,
                    n = this.size,
                    o = this.axis;
                return (
                    s(t.height) ? (t.width = t.height * this.aspectRatio) : s(t.width) && (t.height = t.width / this.aspectRatio),
                    "sw" == o && ((t.left = i.left + (n.width - t.width)), (t.top = null)),
                    "nw" == o && ((t.top = i.top + (n.height - t.height)), (t.left = i.left + (n.width - t.width))),
                    t
                );
            },
            _respectSize: function (t, e) {
                this.helper;
                var i = this._vBoundaries,
                    n = (this._aspectRatio || e.shiftKey, this.axis),
                    o = s(t.width) && i.maxWidth && i.maxWidth < t.width,
                    a = s(t.height) && i.maxHeight && i.maxHeight < t.height,
                    r = s(t.width) && i.minWidth && i.minWidth > t.width,
                    l = s(t.height) && i.minHeight && i.minHeight > t.height;
                r && (t.width = i.minWidth), l && (t.height = i.minHeight), o && (t.width = i.maxWidth), a && (t.height = i.maxHeight);
                var h = this.originalPosition.left + this.originalSize.width,
                    c = this.position.top + this.size.height,
                    u = /sw|nw|w/.test(n),
                    d = /nw|ne|n/.test(n);
                r && u && (t.left = h - i.minWidth), o && u && (t.left = h - i.maxWidth), l && d && (t.top = c - i.minHeight), a && d && (t.top = c - i.maxHeight);
                var p = !t.width && !t.height;
                return p && !t.left && t.top ? (t.top = null) : p && !t.top && t.left && (t.left = null), t;
            },
            _proportionallyResize: function () {
                this.options;
                if (this._proportionallyResizeElements.length)
                    for (var e = this.helper || this.element, i = 0; i < this._proportionallyResizeElements.length; i++) {
                        var s = this._proportionallyResizeElements[i];
                        if (!this.borderDif) {
                            var n = [s.css("borderTopWidth"), s.css("borderRightWidth"), s.css("borderBottomWidth"), s.css("borderLeftWidth")],
                                o = [s.css("paddingTop"), s.css("paddingRight"), s.css("paddingBottom"), s.css("paddingLeft")];
                            this.borderDif = t.map(n, function (t, e) {
                                return (parseInt(t, 10) || 0) + (parseInt(o[e], 10) || 0);
                            });
                        }
                        (t.browser.msie && (t(e).is(":hidden") || t(e).parents(":hidden").length)) || s.css({ height: e.height() - this.borderDif[0] - this.borderDif[2] || 0, width: e.width() - this.borderDif[1] - this.borderDif[3] || 0 });
                    }
            },
            _renderProxy: function () {
                var e = this.element,
                    i = this.options;
                if (((this.elementOffset = e.offset()), this._helper)) {
                    this.helper = this.helper || t('<div style="overflow:hidden;"></div>');
                    var s = t.browser.msie && t.browser.version < 7,
                        n = s ? 1 : 0,
                        o = s ? 2 : -1;
                    this.helper
                        .addClass(this._helper)
                        .css({ width: this.element.outerWidth() + o, height: this.element.outerHeight() + o, position: "absolute", left: this.elementOffset.left - n + "px", top: this.elementOffset.top - n + "px", zIndex: ++i.zIndex }),
                        this.helper.appendTo("body").disableSelection();
                } else this.helper = this.element;
            },
            _change: {
                e: function (t, e, i) {
                    return { width: this.originalSize.width + e };
                },
                w: function (t, e, i) {
                    this.options;
                    var s = this.originalSize;
                    return { left: this.originalPosition.left + e, width: s.width - e };
                },
                n: function (t, e, i) {
                    this.options;
                    var s = this.originalSize;
                    return { top: this.originalPosition.top + i, height: s.height - i };
                },
                s: function (t, e, i) {
                    return { height: this.originalSize.height + i };
                },
                se: function (e, i, s) {
                    return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, s]));
                },
                sw: function (e, i, s) {
                    return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, s]));
                },
                ne: function (e, i, s) {
                    return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, s]));
                },
                nw: function (e, i, s) {
                    return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, s]));
                },
            },
            _propagate: function (e, i) {
                t.ui.plugin.call(this, e, [i, this.ui()]), "resize" != e && this._trigger(e, i, this.ui());
            },
            plugins: {},
            ui: function () {
                return { originalElement: this.originalElement, element: this.element, helper: this.helper, position: this.position, size: this.size, originalSize: this.originalSize, originalPosition: this.originalPosition };
            },
        }),
            t.extend(t.ui.resizable, { version: "1.8.22" }),
            t.ui.plugin.add("resizable", "alsoResize", {
                start: function (e, i) {
                    var s = t(this).data("resizable").options,
                        n = function (e) {
                            t(e).each(function () {
                                var e = t(this);
                                e.data("resizable-alsoresize", { width: parseInt(e.width(), 10), height: parseInt(e.height(), 10), left: parseInt(e.css("left"), 10), top: parseInt(e.css("top"), 10) });
                            });
                        };
                    "object" != typeof s.alsoResize || s.alsoResize.parentNode
                        ? n(s.alsoResize)
                        : s.alsoResize.length
                        ? ((s.alsoResize = s.alsoResize[0]), n(s.alsoResize))
                        : t.each(s.alsoResize, function (t) {
                              n(t);
                          });
                },
                resize: function (e, i) {
                    var s = t(this).data("resizable"),
                        n = s.options,
                        o = s.originalSize,
                        a = s.originalPosition,
                        r = { height: s.size.height - o.height || 0, width: s.size.width - o.width || 0, top: s.position.top - a.top || 0, left: s.position.left - a.left || 0 },
                        l = function (e, s) {
                            t(e).each(function () {
                                var e = t(this),
                                    n = t(this).data("resizable-alsoresize"),
                                    o = {},
                                    a = s && s.length ? s : e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                                t.each(a, function (t, e) {
                                    var i = (n[e] || 0) + (r[e] || 0);
                                    i && i >= 0 && (o[e] = i || null);
                                }),
                                    e.css(o);
                            });
                        };
                    "object" != typeof n.alsoResize || n.alsoResize.nodeType
                        ? l(n.alsoResize)
                        : t.each(n.alsoResize, function (t, e) {
                              l(t, e);
                          });
                },
                stop: function (e, i) {
                    t(this).removeData("resizable-alsoresize");
                },
            }),
            t.ui.plugin.add("resizable", "animate", {
                stop: function (e, i) {
                    var s = t(this).data("resizable"),
                        n = s.options,
                        o = s._proportionallyResizeElements,
                        a = o.length && /textarea/i.test(o[0].nodeName),
                        r = a && t.ui.hasScroll(o[0], "left") ? 0 : s.sizeDiff.height,
                        l = a ? 0 : s.sizeDiff.width,
                        h = { width: s.size.width - l, height: s.size.height - r },
                        c = parseInt(s.element.css("left"), 10) + (s.position.left - s.originalPosition.left) || null,
                        u = parseInt(s.element.css("top"), 10) + (s.position.top - s.originalPosition.top) || null;
                    s.element.animate(t.extend(h, u && c ? { top: u, left: c } : {}), {
                        duration: n.animateDuration,
                        easing: n.animateEasing,
                        step: function () {
                            var i = { width: parseInt(s.element.css("width"), 10), height: parseInt(s.element.css("height"), 10), top: parseInt(s.element.css("top"), 10), left: parseInt(s.element.css("left"), 10) };
                            o && o.length && t(o[0]).css({ width: i.width, height: i.height }), s._updateCache(i), s._propagate("resize", e);
                        },
                    });
                },
            }),
            t.ui.plugin.add("resizable", "containment", {
                start: function (e, s) {
                    var n = t(this).data("resizable"),
                        o = n.options,
                        a = n.element,
                        r = o.containment,
                        l = r instanceof t ? r.get(0) : /parent/.test(r) ? a.parent().get(0) : r;
                    if (l)
                        if (((n.containerElement = t(l)), /document/.test(r) || r == document))
                            (n.containerOffset = { left: 0, top: 0 }),
                                (n.containerPosition = { left: 0, top: 0 }),
                                (n.parentData = { element: t(document), left: 0, top: 0, width: t(document).width(), height: t(document).height() || document.body.parentNode.scrollHeight });
                        else {
                            var h = t(l),
                                c = [];
                            t(["Top", "Right", "Left", "Bottom"]).each(function (t, e) {
                                c[t] = i(h.css("padding" + e));
                            }),
                                (n.containerOffset = h.offset()),
                                (n.containerPosition = h.position()),
                                (n.containerSize = { height: h.innerHeight() - c[3], width: h.innerWidth() - c[1] });
                            var u = n.containerOffset,
                                d = n.containerSize.height,
                                p = n.containerSize.width,
                                f = t.ui.hasScroll(l, "left") ? l.scrollWidth : p,
                                g = t.ui.hasScroll(l) ? l.scrollHeight : d;
                            n.parentData = { element: l, left: u.left, top: u.top, width: f, height: g };
                        }
                },
                resize: function (e, i) {
                    var s = t(this).data("resizable"),
                        n = s.options,
                        o = (s.containerSize, s.containerOffset),
                        a = (s.size, s.position),
                        r = s._aspectRatio || e.shiftKey,
                        l = { top: 0, left: 0 },
                        h = s.containerElement;
                    h[0] != document && /static/.test(h.css("position")) && (l = o),
                        a.left < (s._helper ? o.left : 0) &&
                            ((s.size.width = s.size.width + (s._helper ? s.position.left - o.left : s.position.left - l.left)), r && (s.size.height = s.size.width / s.aspectRatio), (s.position.left = n.helper ? o.left : 0)),
                        a.top < (s._helper ? o.top : 0) &&
                            ((s.size.height = s.size.height + (s._helper ? s.position.top - o.top : s.position.top)), r && (s.size.width = s.size.height * s.aspectRatio), (s.position.top = s._helper ? o.top : 0)),
                        (s.offset.left = s.parentData.left + s.position.left),
                        (s.offset.top = s.parentData.top + s.position.top);
                    var c = Math.abs((s._helper, s.offset.left - l.left + s.sizeDiff.width)),
                        u = Math.abs((s._helper ? s.offset.top - l.top : s.offset.top - o.top) + s.sizeDiff.height),
                        d = s.containerElement.get(0) == s.element.parent().get(0),
                        p = /relative|absolute/.test(s.containerElement.css("position"));
                    d && p && (c -= s.parentData.left),
                        c + s.size.width >= s.parentData.width && ((s.size.width = s.parentData.width - c), r && (s.size.height = s.size.width / s.aspectRatio)),
                        u + s.size.height >= s.parentData.height && ((s.size.height = s.parentData.height - u), r && (s.size.width = s.size.height * s.aspectRatio));
                },
                stop: function (e, i) {
                    var s = t(this).data("resizable"),
                        n = s.options,
                        o = (s.position, s.containerOffset),
                        a = s.containerPosition,
                        r = s.containerElement,
                        l = t(s.helper),
                        h = l.offset(),
                        c = l.outerWidth() - s.sizeDiff.width,
                        u = l.outerHeight() - s.sizeDiff.height;
                    s._helper && !n.animate && /relative/.test(r.css("position")) && t(this).css({ left: h.left - a.left - o.left, width: c, height: u }),
                        s._helper && !n.animate && /static/.test(r.css("position")) && t(this).css({ left: h.left - a.left - o.left, width: c, height: u });
                },
            }),
            t.ui.plugin.add("resizable", "ghost", {
                start: function (e, i) {
                    var s = t(this).data("resizable"),
                        n = s.options,
                        o = s.size;
                    (s.ghost = s.originalElement.clone()),
                        s.ghost
                            .css({ opacity: 0.25, display: "block", position: "relative", height: o.height, width: o.width, margin: 0, left: 0, top: 0 })
                            .addClass("ui-resizable-ghost")
                            .addClass("string" == typeof n.ghost ? n.ghost : ""),
                        s.ghost.appendTo(s.helper);
                },
                resize: function (e, i) {
                    var s = t(this).data("resizable");
                    s.options;
                    s.ghost && s.ghost.css({ position: "relative", height: s.size.height, width: s.size.width });
                },
                stop: function (e, i) {
                    var s = t(this).data("resizable");
                    s.options;
                    s.ghost && s.helper && s.helper.get(0).removeChild(s.ghost.get(0));
                },
            }),
            t.ui.plugin.add("resizable", "grid", {
                resize: function (e, i) {
                    var s = t(this).data("resizable"),
                        n = s.options,
                        o = s.size,
                        a = s.originalSize,
                        r = s.originalPosition,
                        l = s.axis;
                    n._aspectRatio || e.shiftKey;
                    n.grid = "number" == typeof n.grid ? [n.grid, n.grid] : n.grid;
                    var h = Math.round((o.width - a.width) / (n.grid[0] || 1)) * (n.grid[0] || 1),
                        c = Math.round((o.height - a.height) / (n.grid[1] || 1)) * (n.grid[1] || 1);
                    /^(se|s|e)$/.test(l)
                        ? ((s.size.width = a.width + h), (s.size.height = a.height + c))
                        : /^(ne)$/.test(l)
                        ? ((s.size.width = a.width + h), (s.size.height = a.height + c), (s.position.top = r.top - c))
                        : /^(sw)$/.test(l)
                        ? ((s.size.width = a.width + h), (s.size.height = a.height + c), (s.position.left = r.left - h))
                        : ((s.size.width = a.width + h), (s.size.height = a.height + c), (s.position.top = r.top - c), (s.position.left = r.left - h));
                },
            });
        var i = function (t) {
                return parseInt(t, 10) || 0;
            },
            s = function (t) {
                return !isNaN(parseInt(t, 10));
            };
    })(jQuery),
    (function (t, e) {
        t.widget("ui.selectable", t.ui.mouse, {
            options: { appendTo: "body", autoRefresh: !0, distance: 0, filter: "*", tolerance: "touch" },
            _create: function () {
                var e,
                    i = this;
                this.element.addClass("ui-selectable"),
                    (this.dragged = !1),
                    (this.refresh = function () {
                        (e = t(i.options.filter, i.element[0])).addClass("ui-selectee"),
                            e.each(function () {
                                var e = t(this),
                                    i = e.offset();
                                t.data(this, "selectable-item", {
                                    element: this,
                                    $element: e,
                                    left: i.left,
                                    top: i.top,
                                    right: i.left + e.outerWidth(),
                                    bottom: i.top + e.outerHeight(),
                                    startselected: !1,
                                    selected: e.hasClass("ui-selected"),
                                    selecting: e.hasClass("ui-selecting"),
                                    unselecting: e.hasClass("ui-unselecting"),
                                });
                            });
                    }),
                    this.refresh(),
                    (this.selectees = e.addClass("ui-selectee")),
                    this._mouseInit(),
                    (this.helper = t("<div class='ui-selectable-helper'></div>"));
            },
            destroy: function () {
                return this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"), this._mouseDestroy(), this;
            },
            _mouseStart: function (e) {
                var i = this;
                if (((this.opos = [e.pageX, e.pageY]), !this.options.disabled)) {
                    var s = this.options;
                    (this.selectees = t(s.filter, this.element[0])),
                        this._trigger("start", e),
                        t(s.appendTo).append(this.helper),
                        this.helper.css({ left: e.clientX, top: e.clientY, width: 0, height: 0 }),
                        s.autoRefresh && this.refresh(),
                        this.selectees.filter(".ui-selected").each(function () {
                            var s = t.data(this, "selectable-item");
                            (s.startselected = !0),
                                !e.metaKey && !e.ctrlKey && (s.$element.removeClass("ui-selected"), (s.selected = !1), s.$element.addClass("ui-unselecting"), (s.unselecting = !0), i._trigger("unselecting", e, { unselecting: s.element }));
                        }),
                        t(e.target)
                            .parents()
                            .andSelf()
                            .each(function () {
                                var s = t.data(this, "selectable-item");
                                if (s) {
                                    var n = (!e.metaKey && !e.ctrlKey) || !s.$element.hasClass("ui-selected");
                                    return (
                                        s.$element.removeClass(n ? "ui-unselecting" : "ui-selected").addClass(n ? "ui-selecting" : "ui-unselecting"),
                                        (s.unselecting = !n),
                                        (s.selecting = n),
                                        (s.selected = n),
                                        n ? i._trigger("selecting", e, { selecting: s.element }) : i._trigger("unselecting", e, { unselecting: s.element }),
                                        !1
                                    );
                                }
                            });
                }
            },
            _mouseDrag: function (e) {
                var i = this;
                if (((this.dragged = !0), !this.options.disabled)) {
                    var s = this.options,
                        n = this.opos[0],
                        o = this.opos[1],
                        a = e.pageX,
                        r = e.pageY;
                    if (n > a) {
                        var l = a;
                        (a = n), (n = l);
                    }
                    if (o > r) {
                        l = r;
                        (r = o), (o = l);
                    }
                    return (
                        this.helper.css({ left: n, top: o, width: a - n, height: r - o }),
                        this.selectees.each(function () {
                            var l = t.data(this, "selectable-item");
                            if (l && l.element != i.element[0]) {
                                var h = !1;
                                "touch" == s.tolerance ? (h = !(l.left > a || l.right < n || l.top > r || l.bottom < o)) : "fit" == s.tolerance && (h = l.left > n && l.right < a && l.top > o && l.bottom < r),
                                    h
                                        ? (l.selected && (l.$element.removeClass("ui-selected"), (l.selected = !1)),
                                          l.unselecting && (l.$element.removeClass("ui-unselecting"), (l.unselecting = !1)),
                                          l.selecting || (l.$element.addClass("ui-selecting"), (l.selecting = !0), i._trigger("selecting", e, { selecting: l.element })))
                                        : (l.selecting &&
                                              ((e.metaKey || e.ctrlKey) && l.startselected
                                                  ? (l.$element.removeClass("ui-selecting"), (l.selecting = !1), l.$element.addClass("ui-selected"), (l.selected = !0))
                                                  : (l.$element.removeClass("ui-selecting"),
                                                    (l.selecting = !1),
                                                    l.startselected && (l.$element.addClass("ui-unselecting"), (l.unselecting = !0)),
                                                    i._trigger("unselecting", e, { unselecting: l.element }))),
                                          l.selected &&
                                              !e.metaKey &&
                                              !e.ctrlKey &&
                                              !l.startselected &&
                                              (l.$element.removeClass("ui-selected"), (l.selected = !1), l.$element.addClass("ui-unselecting"), (l.unselecting = !0), i._trigger("unselecting", e, { unselecting: l.element })));
                            }
                        }),
                        !1
                    );
                }
            },
            _mouseStop: function (e) {
                var i = this;
                this.dragged = !1;
                this.options;
                return (
                    t(".ui-unselecting", this.element[0]).each(function () {
                        var s = t.data(this, "selectable-item");
                        s.$element.removeClass("ui-unselecting"), (s.unselecting = !1), (s.startselected = !1), i._trigger("unselected", e, { unselected: s.element });
                    }),
                    t(".ui-selecting", this.element[0]).each(function () {
                        var s = t.data(this, "selectable-item");
                        s.$element.removeClass("ui-selecting").addClass("ui-selected"), (s.selecting = !1), (s.selected = !0), (s.startselected = !0), i._trigger("selected", e, { selected: s.element });
                    }),
                    this._trigger("stop", e),
                    this.helper.remove(),
                    !1
                );
            },
        }),
            t.extend(t.ui.selectable, { version: "1.8.22" });
    })(jQuery),
    (function (t, e) {
        t.widget("ui.sortable", t.ui.mouse, {
            widgetEventPrefix: "sort",
            ready: !1,
            options: {
                appendTo: "parent",
                axis: !1,
                connectWith: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                dropOnEmpty: !0,
                forcePlaceholderSize: !1,
                forceHelperSize: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                items: "> *",
                opacity: !1,
                placeholder: !1,
                revert: !1,
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                scope: "default",
                tolerance: "intersect",
                zIndex: 1e3,
            },
            _create: function () {
                var t = this.options;
                (this.containerCache = {}),
                    this.element.addClass("ui-sortable"),
                    this.refresh(),
                    (this.floating = !!this.items.length && ("x" === t.axis || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")))),
                    (this.offset = this.element.offset()),
                    this._mouseInit(),
                    (this.ready = !0);
            },
            destroy: function () {
                t.Widget.prototype.destroy.call(this), this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
                for (var e = this.items.length - 1; e >= 0; e--) this.items[e].item.removeData(this.widgetName + "-item");
                return this;
            },
            _setOption: function (e, i) {
                "disabled" === e ? ((this.options[e] = i), this.widget()[i ? "addClass" : "removeClass"]("ui-sortable-disabled")) : t.Widget.prototype._setOption.apply(this, arguments);
            },
            _mouseCapture: function (e, i) {
                var s = this;
                if (this.reverting) return !1;
                if (this.options.disabled || "static" == this.options.type) return !1;
                this._refreshItems(e);
                var n = null,
                    o = this;
                t(e.target)
                    .parents()
                    .each(function () {
                        if (t.data(this, s.widgetName + "-item") == o) return (n = t(this)), !1;
                    });
                if ((t.data(e.target, s.widgetName + "-item") == o && (n = t(e.target)), !n)) return !1;
                if (this.options.handle && !i) {
                    var a = !1;
                    if (
                        (t(this.options.handle, n)
                            .find("*")
                            .andSelf()
                            .each(function () {
                                this == e.target && (a = !0);
                            }),
                        !a)
                    )
                        return !1;
                }
                return (this.currentItem = n), this._removeCurrentsFromItems(), !0;
            },
            _mouseStart: function (e, i, s) {
                var n = this.options;
                if (
                    ((this.currentContainer = this),
                    this.refreshPositions(),
                    (this.helper = this._createHelper(e)),
                    this._cacheHelperProportions(),
                    this._cacheMargins(),
                    (this.scrollParent = this.helper.scrollParent()),
                    (this.offset = this.currentItem.offset()),
                    (this.offset = { top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left }),
                    t.extend(this.offset, { click: { left: e.pageX - this.offset.left, top: e.pageY - this.offset.top }, parent: this._getParentOffset(), relative: this._getRelativeOffset() }),
                    this.helper.css("position", "absolute"),
                    (this.cssPosition = this.helper.css("position")),
                    (this.originalPosition = this._generatePosition(e)),
                    (this.originalPageX = e.pageX),
                    (this.originalPageY = e.pageY),
                    n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt),
                    (this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] }),
                    this.helper[0] != this.currentItem[0] && this.currentItem.hide(),
                    this._createPlaceholder(),
                    n.containment && this._setContainment(),
                    n.cursor && (t("body").css("cursor") && (this._storedCursor = t("body").css("cursor")), t("body").css("cursor", n.cursor)),
                    n.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", n.opacity)),
                    n.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", n.zIndex)),
                    this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()),
                    this._trigger("start", e, this._uiHash()),
                    this._preserveHelperProportions || this._cacheHelperProportions(),
                    !s)
                )
                    for (var o = this.containers.length - 1; o >= 0; o--) this.containers[o]._trigger("activate", e, this._uiHash(this));
                return (
                    t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), (this.dragging = !0), this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), !0
                );
            },
            _mouseDrag: function (e) {
                if (((this.position = this._generatePosition(e)), (this.positionAbs = this._convertPositionTo("absolute")), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll)) {
                    var i = this.options,
                        s = !1;
                    this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName
                        ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < i.scrollSensitivity
                              ? (this.scrollParent[0].scrollTop = s = this.scrollParent[0].scrollTop + i.scrollSpeed)
                              : e.pageY - this.overflowOffset.top < i.scrollSensitivity && (this.scrollParent[0].scrollTop = s = this.scrollParent[0].scrollTop - i.scrollSpeed),
                          this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < i.scrollSensitivity
                              ? (this.scrollParent[0].scrollLeft = s = this.scrollParent[0].scrollLeft + i.scrollSpeed)
                              : e.pageX - this.overflowOffset.left < i.scrollSensitivity && (this.scrollParent[0].scrollLeft = s = this.scrollParent[0].scrollLeft - i.scrollSpeed))
                        : (e.pageY - t(document).scrollTop() < i.scrollSensitivity
                              ? (s = t(document).scrollTop(t(document).scrollTop() - i.scrollSpeed))
                              : t(window).height() - (e.pageY - t(document).scrollTop()) < i.scrollSensitivity && (s = t(document).scrollTop(t(document).scrollTop() + i.scrollSpeed)),
                          e.pageX - t(document).scrollLeft() < i.scrollSensitivity
                              ? (s = t(document).scrollLeft(t(document).scrollLeft() - i.scrollSpeed))
                              : t(window).width() - (e.pageX - t(document).scrollLeft()) < i.scrollSensitivity && (s = t(document).scrollLeft(t(document).scrollLeft() + i.scrollSpeed))),
                        !1 !== s && t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e);
                }
                (this.positionAbs = this._convertPositionTo("absolute")),
                    (this.options.axis && "y" == this.options.axis) || (this.helper[0].style.left = this.position.left + "px"),
                    (this.options.axis && "x" == this.options.axis) || (this.helper[0].style.top = this.position.top + "px");
                for (var n = this.items.length - 1; n >= 0; n--) {
                    var o = this.items[n],
                        a = o.item[0],
                        r = this._intersectsWithPointer(o);
                    if (r && !(a == this.currentItem[0] || this.placeholder[1 == r ? "next" : "prev"]()[0] == a || t.ui.contains(this.placeholder[0], a) || ("semi-dynamic" == this.options.type && t.ui.contains(this.element[0], a)))) {
                        if (((this.direction = 1 == r ? "down" : "up"), "pointer" != this.options.tolerance && !this._intersectsWithSides(o))) break;
                        this._rearrange(e, o), this._trigger("change", e, this._uiHash());
                        break;
                    }
                }
                return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), (this.lastPositionAbs = this.positionAbs), !1;
            },
            _mouseStop: function (e, i) {
                if (e) {
                    if ((t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert)) {
                        var s = this,
                            n = s.placeholder.offset();
                        (s.reverting = !0),
                            t(this.helper).animate(
                                {
                                    left: n.left - this.offset.parent.left - s.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                                    top: n.top - this.offset.parent.top - s.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop),
                                },
                                parseInt(this.options.revert, 10) || 500,
                                function () {
                                    s._clear(e);
                                }
                            );
                    } else this._clear(e, i);
                    return !1;
                }
            },
            cancel: function () {
                if (this.dragging) {
                    this._mouseUp({ target: null }), "original" == this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                    for (var e = this.containers.length - 1; e >= 0; e--)
                        this.containers[e]._trigger("deactivate", null, this._uiHash(this)),
                            this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), (this.containers[e].containerCache.over = 0));
                }
                return (
                    this.placeholder &&
                        (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
                        "original" != this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(),
                        t.extend(this, { helper: null, dragging: !1, reverting: !1, _noFinalSort: null }),
                        this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)),
                    this
                );
            },
            serialize: function (e) {
                var i = this._getItemsAsjQuery(e && e.connected),
                    s = [];
                return (
                    (e = e || {}),
                    t(i).each(function () {
                        var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[-=_](.+)/);
                        i && s.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]));
                    }),
                    !s.length && e.key && s.push(e.key + "="),
                    s.join("&")
                );
            },
            toArray: function (e) {
                var i = this._getItemsAsjQuery(e && e.connected),
                    s = [];
                return (
                    (e = e || {}),
                    i.each(function () {
                        s.push(t(e.item || this).attr(e.attribute || "id") || "");
                    }),
                    s
                );
            },
            _intersectsWith: function (t) {
                var e = this.positionAbs.left,
                    i = e + this.helperProportions.width,
                    s = this.positionAbs.top,
                    n = s + this.helperProportions.height,
                    o = t.left,
                    a = o + t.width,
                    r = t.top,
                    l = r + t.height,
                    h = this.offset.click.top,
                    c = this.offset.click.left,
                    u = s + h > r && s + h < l && e + c > o && e + c < a;
                return "pointer" == this.options.tolerance ||
                    this.options.forcePointerForContainers ||
                    ("pointer" != this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"])
                    ? u
                    : o < e + this.helperProportions.width / 2 && i - this.helperProportions.width / 2 < a && r < s + this.helperProportions.height / 2 && n - this.helperProportions.height / 2 < l;
            },
            _intersectsWithPointer: function (e) {
                var i = "x" === this.options.axis || t.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top, e.height),
                    s = "y" === this.options.axis || t.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left, e.width),
                    n = i && s,
                    o = this._getDragVerticalDirection(),
                    a = this._getDragHorizontalDirection();
                return !!n && (this.floating ? ((a && "right" == a) || "down" == o ? 2 : 1) : o && ("down" == o ? 2 : 1));
            },
            _intersectsWithSides: function (e) {
                var i = t.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top + e.height / 2, e.height),
                    s = t.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left + e.width / 2, e.width),
                    n = this._getDragVerticalDirection(),
                    o = this._getDragHorizontalDirection();
                return this.floating && o ? ("right" == o && s) || ("left" == o && !s) : n && (("down" == n && i) || ("up" == n && !i));
            },
            _getDragVerticalDirection: function () {
                var t = this.positionAbs.top - this.lastPositionAbs.top;
                return 0 != t && (t > 0 ? "down" : "up");
            },
            _getDragHorizontalDirection: function () {
                var t = this.positionAbs.left - this.lastPositionAbs.left;
                return 0 != t && (t > 0 ? "right" : "left");
            },
            refresh: function (t) {
                return this._refreshItems(t), this.refreshPositions(), this;
            },
            _connectWith: function () {
                var t = this.options;
                return t.connectWith.constructor == String ? [t.connectWith] : t.connectWith;
            },
            _getItemsAsjQuery: function (e) {
                var i = [],
                    s = [],
                    n = this._connectWith();
                if (n && e)
                    for (var o = n.length - 1; o >= 0; o--)
                        for (var a = t(n[o]), r = a.length - 1; r >= 0; r--) {
                            var l = t.data(a[r], this.widgetName);
                            l && l != this && !l.options.disabled && s.push([t.isFunction(l.options.items) ? l.options.items.call(l.element) : t(l.options.items, l.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), l]);
                        }
                s.push([
                    t.isFunction(this.options.items)
                        ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem })
                        : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),
                    this,
                ]);
                for (o = s.length - 1; o >= 0; o--)
                    s[o][0].each(function () {
                        i.push(this);
                    });
                return t(i);
            },
            _removeCurrentsFromItems: function () {
                for (var t = this.currentItem.find(":data(" + this.widgetName + "-item)"), e = 0; e < this.items.length; e++) for (var i = 0; i < t.length; i++) t[i] == this.items[e].item[0] && this.items.splice(e, 1);
            },
            _refreshItems: function (e) {
                (this.items = []), (this.containers = [this]);
                var i = this.items,
                    s = [[t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, { item: this.currentItem }) : t(this.options.items, this.element), this]],
                    n = this._connectWith();
                if (n && this.ready)
                    for (var o = n.length - 1; o >= 0; o--)
                        for (var a = t(n[o]), r = a.length - 1; r >= 0; r--) {
                            var l = t.data(a[r], this.widgetName);
                            l && l != this && !l.options.disabled && (s.push([t.isFunction(l.options.items) ? l.options.items.call(l.element[0], e, { item: this.currentItem }) : t(l.options.items, l.element), l]), this.containers.push(l));
                        }
                for (o = s.length - 1; o >= 0; o--)
                    for (var h = s[o][1], c = s[o][0], u = ((r = 0), c.length); r < u; r++) {
                        var d = t(c[r]);
                        d.data(this.widgetName + "-item", h), i.push({ item: d, instance: h, width: 0, height: 0, left: 0, top: 0 });
                    }
            },
            refreshPositions: function (e) {
                this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                for (var i = this.items.length - 1; i >= 0; i--) {
                    var s = this.items[i];
                    if (s.instance == this.currentContainer || !this.currentContainer || s.item[0] == this.currentItem[0]) {
                        var n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item;
                        e || ((s.width = n.outerWidth()), (s.height = n.outerHeight()));
                        var o = n.offset();
                        (s.left = o.left), (s.top = o.top);
                    }
                }
                if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                else
                    for (i = this.containers.length - 1; i >= 0; i--) {
                        o = this.containers[i].element.offset();
                        (this.containers[i].containerCache.left = o.left),
                            (this.containers[i].containerCache.top = o.top),
                            (this.containers[i].containerCache.width = this.containers[i].element.outerWidth()),
                            (this.containers[i].containerCache.height = this.containers[i].element.outerHeight());
                    }
                return this;
            },
            _createPlaceholder: function (e) {
                var i = e || this,
                    s = i.options;
                if (!s.placeholder || s.placeholder.constructor == String) {
                    var n = s.placeholder;
                    s.placeholder = {
                        element: function () {
                            var e = t(document.createElement(i.currentItem[0].nodeName))
                                .addClass(n || i.currentItem[0].className + " ui-sortable-placeholder")
                                .removeClass("ui-sortable-helper")[0];
                            return n || (e.style.visibility = "hidden"), e;
                        },
                        update: function (t, e) {
                            (n && !s.forcePlaceholderSize) ||
                                (e.height() || e.height(i.currentItem.innerHeight() - parseInt(i.currentItem.css("paddingTop") || 0, 10) - parseInt(i.currentItem.css("paddingBottom") || 0, 10)),
                                e.width() || e.width(i.currentItem.innerWidth() - parseInt(i.currentItem.css("paddingLeft") || 0, 10) - parseInt(i.currentItem.css("paddingRight") || 0, 10)));
                        },
                    };
                }
                (i.placeholder = t(s.placeholder.element.call(i.element, i.currentItem))), i.currentItem.after(i.placeholder), s.placeholder.update(i, i.placeholder);
            },
            _contactContainers: function (e) {
                for (var i = null, s = null, n = this.containers.length - 1; n >= 0; n--)
                    if (!t.ui.contains(this.currentItem[0], this.containers[n].element[0]))
                        if (this._intersectsWith(this.containers[n].containerCache)) {
                            if (i && t.ui.contains(this.containers[n].element[0], i.element[0])) continue;
                            (i = this.containers[n]), (s = n);
                        } else this.containers[n].containerCache.over && (this.containers[n]._trigger("out", e, this._uiHash(this)), (this.containers[n].containerCache.over = 0));
                if (i)
                    if (1 === this.containers.length) this.containers[s]._trigger("over", e, this._uiHash(this)), (this.containers[s].containerCache.over = 1);
                    else if (this.currentContainer != this.containers[s]) {
                        for (var o = 1e4, a = null, r = this.positionAbs[this.containers[s].floating ? "left" : "top"], l = this.items.length - 1; l >= 0; l--)
                            if (t.ui.contains(this.containers[s].element[0], this.items[l].item[0])) {
                                var h = this.containers[s].floating ? this.items[l].item.offset().left : this.items[l].item.offset().top;
                                Math.abs(h - r) < o && ((o = Math.abs(h - r)), (a = this.items[l]), (this.direction = h - r > 0 ? "down" : "up"));
                            }
                        if (!a && !this.options.dropOnEmpty) return;
                        (this.currentContainer = this.containers[s]),
                            a ? this._rearrange(e, a, null, !0) : this._rearrange(e, null, this.containers[s].element, !0),
                            this._trigger("change", e, this._uiHash()),
                            this.containers[s]._trigger("change", e, this._uiHash(this)),
                            this.options.placeholder.update(this.currentContainer, this.placeholder),
                            this.containers[s]._trigger("over", e, this._uiHash(this)),
                            (this.containers[s].containerCache.over = 1);
                    }
            },
            _createHelper: function (e) {
                var i = this.options,
                    s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" == i.helper ? this.currentItem.clone() : this.currentItem;
                return (
                    s.parents("body").length || t("parent" != i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]),
                    s[0] == this.currentItem[0] &&
                        (this._storedCSS = {
                            width: this.currentItem[0].style.width,
                            height: this.currentItem[0].style.height,
                            position: this.currentItem.css("position"),
                            top: this.currentItem.css("top"),
                            left: this.currentItem.css("left"),
                        }),
                    ("" == s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()),
                    ("" == s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()),
                    s
                );
            },
            _adjustOffsetFromHelper: function (e) {
                "string" == typeof e && (e = e.split(" ")),
                    t.isArray(e) && (e = { left: +e[0], top: +e[1] || 0 }),
                    "left" in e && (this.offset.click.left = e.left + this.margins.left),
                    "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left),
                    "top" in e && (this.offset.click.top = e.top + this.margins.top),
                    "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top);
            },
            _getParentOffset: function () {
                this.offsetParent = this.helper.offsetParent();
                var e = this.offsetParent.offset();
                return (
                    "absolute" == this.cssPosition && this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0]) && ((e.left += this.scrollParent.scrollLeft()), (e.top += this.scrollParent.scrollTop())),
                    (this.offsetParent[0] == document.body || (this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && t.browser.msie)) && (e = { top: 0, left: 0 }),
                    { top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0) }
                );
            },
            _getRelativeOffset: function () {
                if ("relative" == this.cssPosition) {
                    var t = this.currentItem.position();
                    return { top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft() };
                }
                return { top: 0, left: 0 };
            },
            _cacheMargins: function () {
                this.margins = { left: parseInt(this.currentItem.css("marginLeft"), 10) || 0, top: parseInt(this.currentItem.css("marginTop"), 10) || 0 };
            },
            _cacheHelperProportions: function () {
                this.helperProportions = { width: this.helper.outerWidth(), height: this.helper.outerHeight() };
            },
            _setContainment: function () {
                var e = this.options;
                if (
                    ("parent" == e.containment && (e.containment = this.helper[0].parentNode),
                    ("document" != e.containment && "window" != e.containment) ||
                        (this.containment = [
                            0 - this.offset.relative.left - this.offset.parent.left,
                            0 - this.offset.relative.top - this.offset.parent.top,
                            t("document" == e.containment ? document : window).width() - this.helperProportions.width - this.margins.left,
                            (t("document" == e.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top,
                        ]),
                    !/^(document|window|parent)$/.test(e.containment))
                ) {
                    var i = t(e.containment)[0],
                        s = t(e.containment).offset(),
                        n = "hidden" != t(i).css("overflow");
                    this.containment = [
                        s.left + (parseInt(t(i).css("borderLeftWidth"), 10) || 0) + (parseInt(t(i).css("paddingLeft"), 10) || 0) - this.margins.left,
                        s.top + (parseInt(t(i).css("borderTopWidth"), 10) || 0) + (parseInt(t(i).css("paddingTop"), 10) || 0) - this.margins.top,
                        s.left +
                            (n ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) -
                            (parseInt(t(i).css("borderLeftWidth"), 10) || 0) -
                            (parseInt(t(i).css("paddingRight"), 10) || 0) -
                            this.helperProportions.width -
                            this.margins.left,
                        s.top +
                            (n ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) -
                            (parseInt(t(i).css("borderTopWidth"), 10) || 0) -
                            (parseInt(t(i).css("paddingBottom"), 10) || 0) -
                            this.helperProportions.height -
                            this.margins.top,
                    ];
                }
            },
            _convertPositionTo: function (e, i) {
                i || (i = this.position);
                var s = "absolute" == e ? 1 : -1,
                    n = (this.options, "absolute" != this.cssPosition || (this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.scrollParent : this.offsetParent),
                    o = /(html|body)/i.test(n[0].tagName);
                return {
                    top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - (t.browser.safari && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s),
                    left:
                        i.left +
                        this.offset.relative.left * s +
                        this.offset.parent.left * s -
                        (t.browser.safari && "fixed" == this.cssPosition ? 0 : ("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s),
                };
            },
            _generatePosition: function (e) {
                var i = this.options,
                    s = "absolute" != this.cssPosition || (this.scrollParent[0] != document && t.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.scrollParent : this.offsetParent,
                    n = /(html|body)/i.test(s[0].tagName);
                "relative" == this.cssPosition && (this.scrollParent[0] == document || this.scrollParent[0] == this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
                var o = e.pageX,
                    a = e.pageY;
                if (
                    this.originalPosition &&
                    (this.containment &&
                        (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left),
                        e.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top),
                        e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left),
                        e.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)),
                    i.grid)
                ) {
                    var r = this.originalPageY + Math.round((a - this.originalPageY) / i.grid[1]) * i.grid[1];
                    a = this.containment && (r - this.offset.click.top < this.containment[1] || r - this.offset.click.top > this.containment[3]) ? (r - this.offset.click.top < this.containment[1] ? r + i.grid[1] : r - i.grid[1]) : r;
                    var l = this.originalPageX + Math.round((o - this.originalPageX) / i.grid[0]) * i.grid[0];
                    o = this.containment && (l - this.offset.click.left < this.containment[0] || l - this.offset.click.left > this.containment[2]) ? (l - this.offset.click.left < this.containment[0] ? l + i.grid[0] : l - i.grid[0]) : l;
                }
                return {
                    top:
                        a -
                        this.offset.click.top -
                        this.offset.relative.top -
                        this.offset.parent.top +
                        (t.browser.safari && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollTop() : n ? 0 : s.scrollTop()),
                    left:
                        o -
                        this.offset.click.left -
                        this.offset.relative.left -
                        this.offset.parent.left +
                        (t.browser.safari && "fixed" == this.cssPosition ? 0 : "fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() : n ? 0 : s.scrollLeft()),
                };
            },
            _rearrange: function (t, e, i, s) {
                i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" == this.direction ? e.item[0] : e.item[0].nextSibling), (this.counter = this.counter ? ++this.counter : 1);
                var n = this,
                    o = this.counter;
                window.setTimeout(function () {
                    o == n.counter && n.refreshPositions(!s);
                }, 0);
            },
            _clear: function (e, i) {
                this.reverting = !1;
                var s = [];
                if ((!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), (this._noFinalSort = null), this.helper[0] == this.currentItem[0])) {
                    for (var n in this._storedCSS) ("auto" != this._storedCSS[n] && "static" != this._storedCSS[n]) || (this._storedCSS[n] = "");
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
                } else this.currentItem.show();
                if (
                    (this.fromOutside &&
                        !i &&
                        s.push(function (t) {
                            this._trigger("receive", t, this._uiHash(this.fromOutside));
                        }),
                    (this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) &&
                        !i &&
                        s.push(function (t) {
                            this._trigger("update", t, this._uiHash());
                        }),
                    !t.ui.contains(this.element[0], this.currentItem[0]))
                ) {
                    i ||
                        s.push(function (t) {
                            this._trigger("remove", t, this._uiHash());
                        });
                    for (n = this.containers.length - 1; n >= 0; n--)
                        t.ui.contains(this.containers[n].element[0], this.currentItem[0]) &&
                            !i &&
                            (s.push(
                                function (t) {
                                    return function (e) {
                                        t._trigger("receive", e, this._uiHash(this));
                                    };
                                }.call(this, this.containers[n])
                            ),
                            s.push(
                                function (t) {
                                    return function (e) {
                                        t._trigger("update", e, this._uiHash(this));
                                    };
                                }.call(this, this.containers[n])
                            ));
                }
                for (n = this.containers.length - 1; n >= 0; n--)
                    i ||
                        s.push(
                            function (t) {
                                return function (e) {
                                    t._trigger("deactivate", e, this._uiHash(this));
                                };
                            }.call(this, this.containers[n])
                        ),
                        this.containers[n].containerCache.over &&
                            (s.push(
                                function (t) {
                                    return function (e) {
                                        t._trigger("out", e, this._uiHash(this));
                                    };
                                }.call(this, this.containers[n])
                            ),
                            (this.containers[n].containerCache.over = 0));
                if (
                    (this._storedCursor && t("body").css("cursor", this._storedCursor),
                    this._storedOpacity && this.helper.css("opacity", this._storedOpacity),
                    this._storedZIndex && this.helper.css("zIndex", "auto" == this._storedZIndex ? "" : this._storedZIndex),
                    (this.dragging = !1),
                    this.cancelHelperRemoval)
                ) {
                    if (!i) {
                        this._trigger("beforeStop", e, this._uiHash());
                        for (n = 0; n < s.length; n++) s[n].call(this, e);
                        this._trigger("stop", e, this._uiHash());
                    }
                    return (this.fromOutside = !1), !1;
                }
                if ((i || this._trigger("beforeStop", e, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), (this.helper = null), !i)) {
                    for (n = 0; n < s.length; n++) s[n].call(this, e);
                    this._trigger("stop", e, this._uiHash());
                }
                return (this.fromOutside = !1), !0;
            },
            _trigger: function () {
                !1 === t.Widget.prototype._trigger.apply(this, arguments) && this.cancel();
            },
            _uiHash: function (e) {
                var i = e || this;
                return { helper: i.helper, placeholder: i.placeholder || t([]), position: i.position, originalPosition: i.originalPosition, offset: i.positionAbs, item: i.currentItem, sender: e ? e.element : null };
            },
        }),
            t.extend(t.ui.sortable, { version: "1.8.22" });
    })(jQuery),
    jQuery.effects ||
        (function (t, e) {
            function i(e) {
                var i;
                return e && e.constructor == Array && 3 == e.length
                    ? e
                    : (i = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(e))
                    ? [parseInt(i[1], 10), parseInt(i[2], 10), parseInt(i[3], 10)]
                    : (i = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(e))
                    ? [2.55 * parseFloat(i[1]), 2.55 * parseFloat(i[2]), 2.55 * parseFloat(i[3])]
                    : (i = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(e))
                    ? [parseInt(i[1], 16), parseInt(i[2], 16), parseInt(i[3], 16)]
                    : (i = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(e))
                    ? [parseInt(i[1] + i[1], 16), parseInt(i[2] + i[2], 16), parseInt(i[3] + i[3], 16)]
                    : (i = /rgba\(0, 0, 0, 0\)/.exec(e))
                    ? l.transparent
                    : l[t.trim(e).toLowerCase()];
            }
            function s(e, s) {
                var n;
                do {
                    if (("" != (n = (t.curCSS || t.css)(e, s)) && "transparent" != n) || t.nodeName(e, "body")) break;
                    s = "backgroundColor";
                } while ((e = e.parentNode));
                return i(n);
            }
            function n() {
                var t,
                    e,
                    i = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
                    s = {};
                if (i && i.length && i[0] && i[i[0]])
                    for (var n = i.length; n--; )
                        "string" == typeof i[(t = i[n])] &&
                            ((e = t.replace(/\-(\w)/g, function (t, e) {
                                return e.toUpperCase();
                            })),
                            (s[e] = i[t]));
                else for (t in i) "string" == typeof i[t] && (s[t] = i[t]);
                return s;
            }
            function o(e) {
                var i, s;
                for (i in e) (null == (s = e[i]) || t.isFunction(s) || i in c || /scrollbar/.test(i) || (!/color/i.test(i) && isNaN(parseFloat(s)))) && delete e[i];
                return e;
            }
            function a(e, i, s, n) {
                return (
                    "object" == typeof e && ((n = i), (s = null), (e = (i = e).effect)),
                    t.isFunction(i) && ((n = i), (s = null), (i = {})),
                    ("number" == typeof i || t.fx.speeds[i]) && ((n = s), (s = i), (i = {})),
                    t.isFunction(s) && ((n = s), (s = null)),
                    (i = i || {}),
                    (s = s || i.duration),
                    [e, i, (s = t.fx.off ? 0 : "number" == typeof s ? s : s in t.fx.speeds ? t.fx.speeds[s] : t.fx.speeds._default), (n = n || i.complete)]
                );
            }
            function r(e) {
                return !(e && "number" != typeof e && !t.fx.speeds[e]) || ("string" == typeof e && !t.effects[e]);
            }
            (t.effects = {}),
                t.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function (e, n) {
                    t.fx.step[n] = function (t) {
                        t.colorInit || ((t.start = s(t.elem, n)), (t.end = i(t.end)), (t.colorInit = !0)),
                            (t.elem.style[n] =
                                "rgb(" +
                                Math.max(Math.min(parseInt(t.pos * (t.end[0] - t.start[0]) + t.start[0], 10), 255), 0) +
                                "," +
                                Math.max(Math.min(parseInt(t.pos * (t.end[1] - t.start[1]) + t.start[1], 10), 255), 0) +
                                "," +
                                Math.max(Math.min(parseInt(t.pos * (t.end[2] - t.start[2]) + t.start[2], 10), 255), 0) +
                                ")");
                    };
                });
            var l = {
                    aqua: [0, 255, 255],
                    azure: [240, 255, 255],
                    beige: [245, 245, 220],
                    black: [0, 0, 0],
                    blue: [0, 0, 255],
                    brown: [165, 42, 42],
                    cyan: [0, 255, 255],
                    darkblue: [0, 0, 139],
                    darkcyan: [0, 139, 139],
                    darkgrey: [169, 169, 169],
                    darkgreen: [0, 100, 0],
                    darkkhaki: [189, 183, 107],
                    darkmagenta: [139, 0, 139],
                    darkolivegreen: [85, 107, 47],
                    darkorange: [255, 140, 0],
                    darkorchid: [153, 50, 204],
                    darkred: [139, 0, 0],
                    darksalmon: [233, 150, 122],
                    darkviolet: [148, 0, 211],
                    fuchsia: [255, 0, 255],
                    gold: [255, 215, 0],
                    green: [0, 128, 0],
                    indigo: [75, 0, 130],
                    khaki: [240, 230, 140],
                    lightblue: [173, 216, 230],
                    lightcyan: [224, 255, 255],
                    lightgreen: [144, 238, 144],
                    lightgrey: [211, 211, 211],
                    lightpink: [255, 182, 193],
                    lightyellow: [255, 255, 224],
                    lime: [0, 255, 0],
                    magenta: [255, 0, 255],
                    maroon: [128, 0, 0],
                    navy: [0, 0, 128],
                    olive: [128, 128, 0],
                    orange: [255, 165, 0],
                    pink: [255, 192, 203],
                    purple: [128, 0, 128],
                    violet: [128, 0, 128],
                    red: [255, 0, 0],
                    silver: [192, 192, 192],
                    white: [255, 255, 255],
                    yellow: [255, 255, 0],
                    transparent: [255, 255, 255],
                },
                h = ["add", "remove", "toggle"],
                c = { border: 1, borderBottom: 1, borderColor: 1, borderLeft: 1, borderRight: 1, borderTop: 1, borderWidth: 1, margin: 1, padding: 1 };
            (t.effects.animateClass = function (e, i, s, a) {
                return (
                    t.isFunction(s) && ((a = s), (s = null)),
                    this.queue(function () {
                        var r,
                            l = t(this),
                            c = l.attr("style") || " ",
                            u = o(n.call(this)),
                            d = l.attr("class") || "";
                        t.each(h, function (t, i) {
                            e[i] && l[i + "Class"](e[i]);
                        }),
                            (r = o(n.call(this))),
                            l.attr("class", d),
                            l.animate(
                                (function (t, e) {
                                    var i,
                                        s = { _: 0 };
                                    for (i in e) t[i] != e[i] && (s[i] = e[i]);
                                    return s;
                                })(u, r),
                                {
                                    queue: !1,
                                    duration: i,
                                    easing: s,
                                    complete: function () {
                                        t.each(h, function (t, i) {
                                            e[i] && l[i + "Class"](e[i]);
                                        }),
                                            "object" == typeof l.attr("style") ? ((l.attr("style").cssText = ""), (l.attr("style").cssText = c)) : l.attr("style", c),
                                            a && a.apply(this, arguments),
                                            t.dequeue(this);
                                    },
                                }
                            );
                    })
                );
            }),
                t.fn.extend({
                    _addClass: t.fn.addClass,
                    addClass: function (e, i, s, n) {
                        return i ? t.effects.animateClass.apply(this, [{ add: e }, i, s, n]) : this._addClass(e);
                    },
                    _removeClass: t.fn.removeClass,
                    removeClass: function (e, i, s, n) {
                        return i ? t.effects.animateClass.apply(this, [{ remove: e }, i, s, n]) : this._removeClass(e);
                    },
                    _toggleClass: t.fn.toggleClass,
                    toggleClass: function (i, s, n, o, a) {
                        return "boolean" == typeof s || s === e ? (n ? t.effects.animateClass.apply(this, [s ? { add: i } : { remove: i }, n, o, a]) : this._toggleClass(i, s)) : t.effects.animateClass.apply(this, [{ toggle: i }, s, n, o]);
                    },
                    switchClass: function (e, i, s, n, o) {
                        return t.effects.animateClass.apply(this, [{ add: i, remove: e }, s, n, o]);
                    },
                }),
                t.extend(t.effects, {
                    version: "1.8.22",
                    save: function (t, e) {
                        for (var i = 0; i < e.length; i++) null !== e[i] && t.data("ec.storage." + e[i], t[0].style[e[i]]);
                    },
                    restore: function (t, e) {
                        for (var i = 0; i < e.length; i++) null !== e[i] && t.css(e[i], t.data("ec.storage." + e[i]));
                    },
                    setMode: function (t, e) {
                        return "toggle" == e && (e = t.is(":hidden") ? "show" : "hide"), e;
                    },
                    getBaseline: function (t, e) {
                        var i, s;
                        switch (t[0]) {
                            case "top":
                                i = 0;
                                break;
                            case "middle":
                                i = 0.5;
                                break;
                            case "bottom":
                                i = 1;
                                break;
                            default:
                                i = t[0] / e.height;
                        }
                        switch (t[1]) {
                            case "left":
                                s = 0;
                                break;
                            case "center":
                                s = 0.5;
                                break;
                            case "right":
                                s = 1;
                                break;
                            default:
                                s = t[1] / e.width;
                        }
                        return { x: s, y: i };
                    },
                    createWrapper: function (e) {
                        if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                        var i = { width: e.outerWidth(!0), height: e.outerHeight(!0), float: e.css("float") },
                            s = t("<div></div>").addClass("ui-effects-wrapper").css({ fontSize: "100%", background: "transparent", border: "none", margin: 0, padding: 0 }),
                            n = document.activeElement;
                        try {
                            n.id;
                        } catch (t) {
                            n = document.body;
                        }
                        return (
                            e.wrap(s),
                            (e[0] === n || t.contains(e[0], n)) && t(n).focus(),
                            (s = e.parent()),
                            "static" == e.css("position")
                                ? (s.css({ position: "relative" }), e.css({ position: "relative" }))
                                : (t.extend(i, { position: e.css("position"), zIndex: e.css("z-index") }),
                                  t.each(["top", "left", "bottom", "right"], function (t, s) {
                                      (i[s] = e.css(s)), isNaN(parseInt(i[s], 10)) && (i[s] = "auto");
                                  }),
                                  e.css({ position: "relative", top: 0, left: 0, right: "auto", bottom: "auto" })),
                            s.css(i).show()
                        );
                    },
                    removeWrapper: function (e) {
                        var i,
                            s = document.activeElement;
                        return e.parent().is(".ui-effects-wrapper") ? ((i = e.parent().replaceWith(e)), (e[0] === s || t.contains(e[0], s)) && t(s).focus(), i) : e;
                    },
                    setTransition: function (e, i, s, n) {
                        return (
                            (n = n || {}),
                            t.each(i, function (t, i) {
                                var o = e.cssUnit(i);
                                o[0] > 0 && (n[i] = o[0] * s + o[1]);
                            }),
                            n
                        );
                    },
                }),
                t.fn.extend({
                    effect: function (e, i, s, n) {
                        var o = a.apply(this, arguments),
                            r = { options: o[1], duration: o[2], callback: o[3] },
                            l = r.options.mode,
                            h = t.effects[e];
                        return t.fx.off || !h
                            ? l
                                ? this[l](r.duration, r.callback)
                                : this.each(function () {
                                      r.callback && r.callback.call(this);
                                  })
                            : h.call(this, r);
                    },
                    _show: t.fn.show,
                    show: function (t) {
                        if (r(t)) return this._show.apply(this, arguments);
                        var e = a.apply(this, arguments);
                        return (e[1].mode = "show"), this.effect.apply(this, e);
                    },
                    _hide: t.fn.hide,
                    hide: function (t) {
                        if (r(t)) return this._hide.apply(this, arguments);
                        var e = a.apply(this, arguments);
                        return (e[1].mode = "hide"), this.effect.apply(this, e);
                    },
                    __toggle: t.fn.toggle,
                    toggle: function (e) {
                        if (r(e) || "boolean" == typeof e || t.isFunction(e)) return this.__toggle.apply(this, arguments);
                        var i = a.apply(this, arguments);
                        return (i[1].mode = "toggle"), this.effect.apply(this, i);
                    },
                    cssUnit: function (e) {
                        var i = this.css(e),
                            s = [];
                        return (
                            t.each(["em", "px", "%", "pt"], function (t, e) {
                                i.indexOf(e) > 0 && (s = [parseFloat(i), e]);
                            }),
                            s
                        );
                    },
                }),
                (t.easing.jswing = t.easing.swing),
                t.extend(t.easing, {
                    def: "easeOutQuad",
                    swing: function (e, i, s, n, o) {
                        return t.easing[t.easing.def](e, i, s, n, o);
                    },
                    easeInQuad: function (t, e, i, s, n) {
                        return s * (e /= n) * e + i;
                    },
                    easeOutQuad: function (t, e, i, s, n) {
                        return -s * (e /= n) * (e - 2) + i;
                    },
                    easeInOutQuad: function (t, e, i, s, n) {
                        return (e /= n / 2) < 1 ? (s / 2) * e * e + i : (-s / 2) * (--e * (e - 2) - 1) + i;
                    },
                    easeInCubic: function (t, e, i, s, n) {
                        return s * (e /= n) * e * e + i;
                    },
                    easeOutCubic: function (t, e, i, s, n) {
                        return s * ((e = e / n - 1) * e * e + 1) + i;
                    },
                    easeInOutCubic: function (t, e, i, s, n) {
                        return (e /= n / 2) < 1 ? (s / 2) * e * e * e + i : (s / 2) * ((e -= 2) * e * e + 2) + i;
                    },
                    easeInQuart: function (t, e, i, s, n) {
                        return s * (e /= n) * e * e * e + i;
                    },
                    easeOutQuart: function (t, e, i, s, n) {
                        return -s * ((e = e / n - 1) * e * e * e - 1) + i;
                    },
                    easeInOutQuart: function (t, e, i, s, n) {
                        return (e /= n / 2) < 1 ? (s / 2) * e * e * e * e + i : (-s / 2) * ((e -= 2) * e * e * e - 2) + i;
                    },
                    easeInQuint: function (t, e, i, s, n) {
                        return s * (e /= n) * e * e * e * e + i;
                    },
                    easeOutQuint: function (t, e, i, s, n) {
                        return s * ((e = e / n - 1) * e * e * e * e + 1) + i;
                    },
                    easeInOutQuint: function (t, e, i, s, n) {
                        return (e /= n / 2) < 1 ? (s / 2) * e * e * e * e * e + i : (s / 2) * ((e -= 2) * e * e * e * e + 2) + i;
                    },
                    easeInSine: function (t, e, i, s, n) {
                        return -s * Math.cos((e / n) * (Math.PI / 2)) + s + i;
                    },
                    easeOutSine: function (t, e, i, s, n) {
                        return s * Math.sin((e / n) * (Math.PI / 2)) + i;
                    },
                    easeInOutSine: function (t, e, i, s, n) {
                        return (-s / 2) * (Math.cos((Math.PI * e) / n) - 1) + i;
                    },
                    easeInExpo: function (t, e, i, s, n) {
                        return 0 == e ? i : s * Math.pow(2, 10 * (e / n - 1)) + i;
                    },
                    easeOutExpo: function (t, e, i, s, n) {
                        return e == n ? i + s : s * (1 - Math.pow(2, (-10 * e) / n)) + i;
                    },
                    easeInOutExpo: function (t, e, i, s, n) {
                        return 0 == e ? i : e == n ? i + s : (e /= n / 2) < 1 ? (s / 2) * Math.pow(2, 10 * (e - 1)) + i : (s / 2) * (2 - Math.pow(2, -10 * --e)) + i;
                    },
                    easeInCirc: function (t, e, i, s, n) {
                        return -s * (Math.sqrt(1 - (e /= n) * e) - 1) + i;
                    },
                    easeOutCirc: function (t, e, i, s, n) {
                        return s * Math.sqrt(1 - (e = e / n - 1) * e) + i;
                    },
                    easeInOutCirc: function (t, e, i, s, n) {
                        return (e /= n / 2) < 1 ? (-s / 2) * (Math.sqrt(1 - e * e) - 1) + i : (s / 2) * (Math.sqrt(1 - (e -= 2) * e) + 1) + i;
                    },
                    easeInElastic: function (t, e, i, s, n) {
                        var o = 1.70158,
                            a = 0,
                            r = s;
                        if (0 == e) return i;
                        if (1 == (e /= n)) return i + s;
                        if ((a || (a = 0.3 * n), r < Math.abs(s))) {
                            r = s;
                            o = a / 4;
                        } else o = (a / (2 * Math.PI)) * Math.asin(s / r);
                        return -r * Math.pow(2, 10 * (e -= 1)) * Math.sin((2 * (e * n - o) * Math.PI) / a) + i;
                    },
                    easeOutElastic: function (t, e, i, s, n) {
                        var o = 1.70158,
                            a = 0,
                            r = s;
                        if (0 == e) return i;
                        if (1 == (e /= n)) return i + s;
                        if ((a || (a = 0.3 * n), r < Math.abs(s))) {
                            r = s;
                            o = a / 4;
                        } else o = (a / (2 * Math.PI)) * Math.asin(s / r);
                        return r * Math.pow(2, -10 * e) * Math.sin((2 * (e * n - o) * Math.PI) / a) + s + i;
                    },
                    easeInOutElastic: function (t, e, i, s, n) {
                        var o = 1.70158,
                            a = 0,
                            r = s;
                        if (0 == e) return i;
                        if (2 == (e /= n / 2)) return i + s;
                        if ((a || (a = 0.3 * n * 1.5), r < Math.abs(s))) {
                            r = s;
                            o = a / 4;
                        } else o = (a / (2 * Math.PI)) * Math.asin(s / r);
                        return e < 1 ? -0.5 * r * Math.pow(2, 10 * (e -= 1)) * Math.sin((2 * (e * n - o) * Math.PI) / a) + i : r * Math.pow(2, -10 * (e -= 1)) * Math.sin((2 * (e * n - o) * Math.PI) / a) * 0.5 + s + i;
                    },
                    easeInBack: function (t, i, s, n, o, a) {
                        return a == e && (a = 1.70158), n * (i /= o) * i * ((a + 1) * i - a) + s;
                    },
                    easeOutBack: function (t, i, s, n, o, a) {
                        return a == e && (a = 1.70158), n * ((i = i / o - 1) * i * ((a + 1) * i + a) + 1) + s;
                    },
                    easeInOutBack: function (t, i, s, n, o, a) {
                        return a == e && (a = 1.70158), (i /= o / 2) < 1 ? (n / 2) * i * i * ((1 + (a *= 1.525)) * i - a) + s : (n / 2) * ((i -= 2) * i * ((1 + (a *= 1.525)) * i + a) + 2) + s;
                    },
                    easeInBounce: function (e, i, s, n, o) {
                        return n - t.easing.easeOutBounce(e, o - i, 0, n, o) + s;
                    },
                    easeOutBounce: function (t, e, i, s, n) {
                        return (e /= n) < 1 / 2.75
                            ? 7.5625 * s * e * e + i
                            : e < 2 / 2.75
                            ? s * (7.5625 * (e -= 1.5 / 2.75) * e + 0.75) + i
                            : e < 2.5 / 2.75
                            ? s * (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375) + i
                            : s * (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375) + i;
                    },
                    easeInOutBounce: function (e, i, s, n, o) {
                        return i < o / 2 ? 0.5 * t.easing.easeInBounce(e, 2 * i, 0, n, o) + s : 0.5 * t.easing.easeOutBounce(e, 2 * i - o, 0, n, o) + 0.5 * n + s;
                    },
                });
        })(jQuery),
    (function (t, e) {
        t.effects.blind = function (e) {
            return this.queue(function () {
                var i = t(this),
                    s = ["position", "top", "bottom", "left", "right"],
                    n = t.effects.setMode(i, e.options.mode || "hide"),
                    o = e.options.direction || "vertical";
                t.effects.save(i, s), i.show();
                var a = t.effects.createWrapper(i).css({ overflow: "hidden" }),
                    r = "vertical" == o ? "height" : "width",
                    l = "vertical" == o ? a.height() : a.width();
                "show" == n && a.css(r, 0);
                var h = {};
                (h[r] = "show" == n ? l : 0),
                    a.animate(h, e.duration, e.options.easing, function () {
                        "hide" == n && i.hide(), t.effects.restore(i, s), t.effects.removeWrapper(i), e.callback && e.callback.apply(i[0], arguments), i.dequeue();
                    });
            });
        };
    })(jQuery),
    (function (t, e) {
        t.effects.bounce = function (e) {
            return this.queue(function () {
                var i = t(this),
                    s = ["position", "top", "bottom", "left", "right"],
                    n = t.effects.setMode(i, e.options.mode || "effect"),
                    o = e.options.direction || "up",
                    a = e.options.distance || 20,
                    r = e.options.times || 5,
                    l = e.duration || 250;
                /show|hide/.test(n) && s.push("opacity"), t.effects.save(i, s), i.show(), t.effects.createWrapper(i);
                var h = "up" == o || "down" == o ? "top" : "left",
                    c = "up" == o || "left" == o ? "pos" : "neg";
                a = e.options.distance || ("top" == h ? i.outerHeight(!0) / 3 : i.outerWidth(!0) / 3);
                ("show" == n && i.css("opacity", 0).css(h, "pos" == c ? -a : a), "hide" == n && (a /= 2 * r), "hide" != n && r--, "show" == n) &&
                    (((p = { opacity: 1 })[h] = ("pos" == c ? "+=" : "-=") + a), i.animate(p, l / 2, e.options.easing), (a /= 2), r--);
                for (var u = 0; u < r; u++) {
                    var d = {};
                    ((f = {})[h] = ("pos" == c ? "-=" : "+=") + a), (d[h] = ("pos" == c ? "+=" : "-=") + a), i.animate(f, l / 2, e.options.easing).animate(d, l / 2, e.options.easing), (a = "hide" == n ? 2 * a : a / 2);
                }
                if ("hide" == n) {
                    var p;
                    ((p = { opacity: 0 })[h] = ("pos" == c ? "-=" : "+=") + a),
                        i.animate(p, l / 2, e.options.easing, function () {
                            i.hide(), t.effects.restore(i, s), t.effects.removeWrapper(i), e.callback && e.callback.apply(this, arguments);
                        });
                } else {
                    var f;
                    d = {};
                    ((f = {})[h] = ("pos" == c ? "-=" : "+=") + a),
                        (d[h] = ("pos" == c ? "+=" : "-=") + a),
                        i.animate(f, l / 2, e.options.easing).animate(d, l / 2, e.options.easing, function () {
                            t.effects.restore(i, s), t.effects.removeWrapper(i), e.callback && e.callback.apply(this, arguments);
                        });
                }
                i.queue("fx", function () {
                    i.dequeue();
                }),
                    i.dequeue();
            });
        };
    })(jQuery),
    (function (t, e) {
        t.effects.clip = function (e) {
            return this.queue(function () {
                var i = t(this),
                    s = ["position", "top", "bottom", "left", "right", "height", "width"],
                    n = t.effects.setMode(i, e.options.mode || "hide"),
                    o = e.options.direction || "vertical";
                t.effects.save(i, s), i.show();
                var a = t.effects.createWrapper(i).css({ overflow: "hidden" }),
                    r = "IMG" == i[0].tagName ? a : i,
                    l = { size: "vertical" == o ? "height" : "width", position: "vertical" == o ? "top" : "left" },
                    h = "vertical" == o ? r.height() : r.width();
                "show" == n && (r.css(l.size, 0), r.css(l.position, h / 2));
                var c = {};
                (c[l.size] = "show" == n ? h : 0),
                    (c[l.position] = "show" == n ? 0 : h / 2),
                    r.animate(c, {
                        queue: !1,
                        duration: e.duration,
                        easing: e.options.easing,
                        complete: function () {
                            "hide" == n && i.hide(), t.effects.restore(i, s), t.effects.removeWrapper(i), e.callback && e.callback.apply(i[0], arguments), i.dequeue();
                        },
                    });
            });
        };
    })(jQuery),
    (function (t, e) {
        t.effects.drop = function (e) {
            return this.queue(function () {
                var i = t(this),
                    s = ["position", "top", "bottom", "left", "right", "opacity"],
                    n = t.effects.setMode(i, e.options.mode || "hide"),
                    o = e.options.direction || "left";
                t.effects.save(i, s), i.show(), t.effects.createWrapper(i);
                var a = "up" == o || "down" == o ? "top" : "left",
                    r = "up" == o || "left" == o ? "pos" : "neg",
                    l = e.options.distance || ("top" == a ? i.outerHeight(!0) / 2 : i.outerWidth(!0) / 2);
                "show" == n && i.css("opacity", 0).css(a, "pos" == r ? -l : l);
                var h = { opacity: "show" == n ? 1 : 0 };
                (h[a] = ("show" == n ? ("pos" == r ? "+=" : "-=") : "pos" == r ? "-=" : "+=") + l),
                    i.animate(h, {
                        queue: !1,
                        duration: e.duration,
                        easing: e.options.easing,
                        complete: function () {
                            "hide" == n && i.hide(), t.effects.restore(i, s), t.effects.removeWrapper(i), e.callback && e.callback.apply(this, arguments), i.dequeue();
                        },
                    });
            });
        };
    })(jQuery),
    (function (t, e) {
        t.effects.explode = function (e) {
            return this.queue(function () {
                var i = e.options.pieces ? Math.round(Math.sqrt(e.options.pieces)) : 3,
                    s = e.options.pieces ? Math.round(Math.sqrt(e.options.pieces)) : 3;
                e.options.mode = "toggle" == e.options.mode ? (t(this).is(":visible") ? "hide" : "show") : e.options.mode;
                var n = t(this).show().css("visibility", "hidden"),
                    o = n.offset();
                (o.top -= parseInt(n.css("marginTop"), 10) || 0), (o.left -= parseInt(n.css("marginLeft"), 10) || 0);
                for (var a = n.outerWidth(!0), r = n.outerHeight(!0), l = 0; l < i; l++)
                    for (var h = 0; h < s; h++)
                        n.clone()
                            .appendTo("body")
                            .wrap("<div></div>")
                            .css({ position: "absolute", visibility: "visible", left: (a / s) * -h, top: (r / i) * -l })
                            .parent()
                            .addClass("ui-effects-explode")
                            .css({
                                position: "absolute",
                                overflow: "hidden",
                                width: a / s,
                                height: r / i,
                                left: o.left + h * (a / s) + ("show" == e.options.mode ? (h - Math.floor(s / 2)) * (a / s) : 0),
                                top: o.top + l * (r / i) + ("show" == e.options.mode ? (l - Math.floor(i / 2)) * (r / i) : 0),
                                opacity: "show" == e.options.mode ? 0 : 1,
                            })
                            .animate(
                                {
                                    left: o.left + h * (a / s) + ("show" == e.options.mode ? 0 : (h - Math.floor(s / 2)) * (a / s)),
                                    top: o.top + l * (r / i) + ("show" == e.options.mode ? 0 : (l - Math.floor(i / 2)) * (r / i)),
                                    opacity: "show" == e.options.mode ? 1 : 0,
                                },
                                e.duration || 500
                            );
                setTimeout(function () {
                    "show" == e.options.mode ? n.css({ visibility: "visible" }) : n.css({ visibility: "visible" }).hide(), e.callback && e.callback.apply(n[0]), n.dequeue(), t("div.ui-effects-explode").remove();
                }, e.duration || 500);
            });
        };
    })(jQuery),
    (function (t, e) {
        t.effects.fade = function (e) {
            return this.queue(function () {
                var i = t(this),
                    s = t.effects.setMode(i, e.options.mode || "hide");
                i.animate(
                    { opacity: s },
                    {
                        queue: !1,
                        duration: e.duration,
                        easing: e.options.easing,
                        complete: function () {
                            e.callback && e.callback.apply(this, arguments), i.dequeue();
                        },
                    }
                );
            });
        };
    })(jQuery),
    (function (t, e) {
        t.effects.fold = function (e) {
            return this.queue(function () {
                var i = t(this),
                    s = ["position", "top", "bottom", "left", "right"],
                    n = t.effects.setMode(i, e.options.mode || "hide"),
                    o = e.options.size || 15,
                    a = !!e.options.horizFirst,
                    r = e.duration ? e.duration / 2 : t.fx.speeds._default / 2;
                t.effects.save(i, s), i.show();
                var l = t.effects.createWrapper(i).css({ overflow: "hidden" }),
                    h = ("show" == n) != a,
                    c = h ? ["width", "height"] : ["height", "width"],
                    u = h ? [l.width(), l.height()] : [l.height(), l.width()],
                    d = /([0-9]+)%/.exec(o);
                d && (o = (parseInt(d[1], 10) / 100) * u["hide" == n ? 0 : 1]), "show" == n && l.css(a ? { height: 0, width: o } : { height: o, width: 0 });
                var p = {},
                    f = {};
                (p[c[0]] = "show" == n ? u[0] : o),
                    (f[c[1]] = "show" == n ? u[1] : 0),
                    l.animate(p, r, e.options.easing).animate(f, r, e.options.easing, function () {
                        "hide" == n && i.hide(), t.effects.restore(i, s), t.effects.removeWrapper(i), e.callback && e.callback.apply(i[0], arguments), i.dequeue();
                    });
            });
        };
    })(jQuery),
    (function (t, e) {
        t.effects.highlight = function (e) {
            return this.queue(function () {
                var i = t(this),
                    s = ["backgroundImage", "backgroundColor", "opacity"],
                    n = t.effects.setMode(i, e.options.mode || "show"),
                    o = { backgroundColor: i.css("backgroundColor") };
                "hide" == n && (o.opacity = 0),
                    t.effects.save(i, s),
                    i
                        .show()
                        .css({ backgroundImage: "none", backgroundColor: e.options.color || "#ffff99" })
                        .animate(o, {
                            queue: !1,
                            duration: e.duration,
                            easing: e.options.easing,
                            complete: function () {
                                "hide" == n && i.hide(), t.effects.restore(i, s), "show" == n && !t.support.opacity && this.style.removeAttribute("filter"), e.callback && e.callback.apply(this, arguments), i.dequeue();
                            },
                        });
            });
        };
    })(jQuery),
    (function (t, e) {
        t.effects.pulsate = function (e) {
            return this.queue(function () {
                var i = t(this),
                    s = t.effects.setMode(i, e.options.mode || "show"),
                    n = 2 * (e.options.times || 5) - 1,
                    o = e.duration ? e.duration / 2 : t.fx.speeds._default / 2,
                    a = i.is(":visible"),
                    r = 0;
                a || (i.css("opacity", 0).show(), (r = 1)), (("hide" == s && a) || ("show" == s && !a)) && n--;
                for (var l = 0; l < n; l++) i.animate({ opacity: r }, o, e.options.easing), (r = (r + 1) % 2);
                i.animate({ opacity: r }, o, e.options.easing, function () {
                    0 == r && i.hide(), e.callback && e.callback.apply(this, arguments);
                }),
                    i
                        .queue("fx", function () {
                            i.dequeue();
                        })
                        .dequeue();
            });
        };
    })(jQuery),
    (function (t, e) {
        (t.effects.puff = function (e) {
            return this.queue(function () {
                var i = t(this),
                    s = t.effects.setMode(i, e.options.mode || "hide"),
                    n = parseInt(e.options.percent, 10) || 150,
                    o = n / 100,
                    a = { height: i.height(), width: i.width() };
                t.extend(e.options, { fade: !0, mode: s, percent: "hide" == s ? n : 100, from: "hide" == s ? a : { height: a.height * o, width: a.width * o } }), i.effect("scale", e.options, e.duration, e.callback), i.dequeue();
            });
        }),
            (t.effects.scale = function (e) {
                return this.queue(function () {
                    var i = t(this),
                        s = t.extend(!0, {}, e.options),
                        n = t.effects.setMode(i, e.options.mode || "effect"),
                        o = parseInt(e.options.percent, 10) || (0 == parseInt(e.options.percent, 10) ? 0 : "hide" == n ? 0 : 100),
                        a = e.options.direction || "both",
                        r = e.options.origin;
                    "effect" != n && ((s.origin = r || ["middle", "center"]), (s.restore = !0));
                    var l = { height: i.height(), width: i.width() };
                    i.from = e.options.from || ("show" == n ? { height: 0, width: 0 } : l);
                    var h = "horizontal" != a ? o / 100 : 1,
                        c = "vertical" != a ? o / 100 : 1;
                    (i.to = { height: l.height * h, width: l.width * c }),
                        e.options.fade && ("show" == n && ((i.from.opacity = 0), (i.to.opacity = 1)), "hide" == n && ((i.from.opacity = 1), (i.to.opacity = 0))),
                        (s.from = i.from),
                        (s.to = i.to),
                        (s.mode = n),
                        i.effect("size", s, e.duration, e.callback),
                        i.dequeue();
                });
            }),
            (t.effects.size = function (e) {
                return this.queue(function () {
                    var i = t(this),
                        s = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                        n = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                        o = ["width", "height", "overflow"],
                        a = ["fontSize"],
                        r = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                        l = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                        h = t.effects.setMode(i, e.options.mode || "effect"),
                        c = e.options.restore || !1,
                        u = e.options.scale || "both",
                        d = e.options.origin,
                        p = { height: i.height(), width: i.width() };
                    if (((i.from = e.options.from || p), (i.to = e.options.to || p), d)) {
                        var f = t.effects.getBaseline(d, p);
                        (i.from.top = (p.height - i.from.height) * f.y), (i.from.left = (p.width - i.from.width) * f.x), (i.to.top = (p.height - i.to.height) * f.y), (i.to.left = (p.width - i.to.width) * f.x);
                    }
                    var g = { from: { y: i.from.height / p.height, x: i.from.width / p.width }, to: { y: i.to.height / p.height, x: i.to.width / p.width } };
                    ("box" != u && "both" != u) ||
                        (g.from.y != g.to.y && ((s = s.concat(r)), (i.from = t.effects.setTransition(i, r, g.from.y, i.from)), (i.to = t.effects.setTransition(i, r, g.to.y, i.to))),
                        g.from.x != g.to.x && ((s = s.concat(l)), (i.from = t.effects.setTransition(i, l, g.from.x, i.from)), (i.to = t.effects.setTransition(i, l, g.to.x, i.to)))),
                        ("content" == u || "both" == u) && g.from.y != g.to.y && ((s = s.concat(a)), (i.from = t.effects.setTransition(i, a, g.from.y, i.from)), (i.to = t.effects.setTransition(i, a, g.to.y, i.to))),
                        t.effects.save(i, c ? s : n),
                        i.show(),
                        t.effects.createWrapper(i),
                        i.css("overflow", "hidden").css(i.from),
                        ("content" != u && "both" != u) ||
                            ((r = r.concat(["marginTop", "marginBottom"]).concat(a)),
                            (l = l.concat(["marginLeft", "marginRight"])),
                            (o = s.concat(r).concat(l)),
                            i.find("*[width]").each(function () {
                                var i = t(this);
                                c && t.effects.save(i, o);
                                var s = i.height(),
                                    n = i.width();
                                (i.from = { height: s * g.from.y, width: n * g.from.x }),
                                    (i.to = { height: s * g.to.y, width: n * g.to.x }),
                                    g.from.y != g.to.y && ((i.from = t.effects.setTransition(i, r, g.from.y, i.from)), (i.to = t.effects.setTransition(i, r, g.to.y, i.to))),
                                    g.from.x != g.to.x && ((i.from = t.effects.setTransition(i, l, g.from.x, i.from)), (i.to = t.effects.setTransition(i, l, g.to.x, i.to))),
                                    i.css(i.from),
                                    i.animate(i.to, e.duration, e.options.easing, function () {
                                        c && t.effects.restore(i, o);
                                    });
                            })),
                        i.animate(i.to, {
                            queue: !1,
                            duration: e.duration,
                            easing: e.options.easing,
                            complete: function () {
                                0 === i.to.opacity && i.css("opacity", i.from.opacity), "hide" == h && i.hide(), t.effects.restore(i, c ? s : n), t.effects.removeWrapper(i), e.callback && e.callback.apply(this, arguments), i.dequeue();
                            },
                        });
                });
            });
    })(jQuery),
    (function (t, e) {
        t.effects.shake = function (e) {
            return this.queue(function () {
                var i = t(this),
                    s = ["position", "top", "bottom", "left", "right"],
                    n = (t.effects.setMode(i, e.options.mode || "effect"), e.options.direction || "left"),
                    o = e.options.distance || 20,
                    a = e.options.times || 3,
                    r = e.duration || e.options.duration || 140;
                t.effects.save(i, s), i.show(), t.effects.createWrapper(i);
                var l = "up" == n || "down" == n ? "top" : "left",
                    h = "up" == n || "left" == n ? "pos" : "neg",
                    c = {},
                    u = {},
                    d = {};
                (c[l] = ("pos" == h ? "-=" : "+=") + o), (u[l] = ("pos" == h ? "+=" : "-=") + 2 * o), (d[l] = ("pos" == h ? "-=" : "+=") + 2 * o), i.animate(c, r, e.options.easing);
                for (var p = 1; p < a; p++) i.animate(u, r, e.options.easing).animate(d, r, e.options.easing);
                i.animate(u, r, e.options.easing).animate(c, r / 2, e.options.easing, function () {
                    t.effects.restore(i, s), t.effects.removeWrapper(i), e.callback && e.callback.apply(this, arguments);
                }),
                    i.queue("fx", function () {
                        i.dequeue();
                    }),
                    i.dequeue();
            });
        };
    })(jQuery),
    (function (t, e) {
        t.effects.slide = function (e) {
            return this.queue(function () {
                var i = t(this),
                    s = ["position", "top", "bottom", "left", "right"],
                    n = t.effects.setMode(i, e.options.mode || "show"),
                    o = e.options.direction || "left";
                t.effects.save(i, s), i.show(), t.effects.createWrapper(i).css({ overflow: "hidden" });
                var a = "up" == o || "down" == o ? "top" : "left",
                    r = "up" == o || "left" == o ? "pos" : "neg",
                    l = e.options.distance || ("top" == a ? i.outerHeight(!0) : i.outerWidth(!0));
                "show" == n && i.css(a, "pos" == r ? (isNaN(l) ? "-" + l : -l) : l);
                var h = {};
                (h[a] = ("show" == n ? ("pos" == r ? "+=" : "-=") : "pos" == r ? "-=" : "+=") + l),
                    i.animate(h, {
                        queue: !1,
                        duration: e.duration,
                        easing: e.options.easing,
                        complete: function () {
                            "hide" == n && i.hide(), t.effects.restore(i, s), t.effects.removeWrapper(i), e.callback && e.callback.apply(this, arguments), i.dequeue();
                        },
                    });
            });
        };
    })(jQuery),
    (function (t, e) {
        t.effects.transfer = function (e) {
            return this.queue(function () {
                var i = t(this),
                    s = t(e.options.to),
                    n = s.offset(),
                    o = { top: n.top, left: n.left, height: s.innerHeight(), width: s.innerWidth() },
                    a = i.offset(),
                    r = t('<div class="ui-effects-transfer"></div>')
                        .appendTo(document.body)
                        .addClass(e.options.className)
                        .css({ top: a.top, left: a.left, height: i.innerHeight(), width: i.innerWidth(), position: "absolute" })
                        .animate(o, e.duration, e.options.easing, function () {
                            r.remove(), e.callback && e.callback.apply(i[0], arguments), i.dequeue();
                        });
            });
        };
    })(jQuery),
    (function (t, e) {
        t.widget("ui.accordion", {
            options: {
                active: 0,
                animated: "slide",
                autoHeight: !0,
                clearStyle: !1,
                collapsible: !1,
                event: "click",
                fillSpace: !1,
                header: "> li > :first-child,> :not(li):even",
                icons: { header: "ui-icon-triangle-1-e", headerSelected: "ui-icon-triangle-1-s" },
                navigation: !1,
                navigationFilter: function () {
                    return this.href.toLowerCase() === location.href.toLowerCase();
                },
            },
            _create: function () {
                var e = this,
                    i = e.options;
                if (
                    ((e.running = 0),
                    e.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"),
                    (e.headers = e.element
                        .find(i.header)
                        .addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all")
                        .bind("mouseenter.accordion", function () {
                            i.disabled || t(this).addClass("ui-state-hover");
                        })
                        .bind("mouseleave.accordion", function () {
                            i.disabled || t(this).removeClass("ui-state-hover");
                        })
                        .bind("focus.accordion", function () {
                            i.disabled || t(this).addClass("ui-state-focus");
                        })
                        .bind("blur.accordion", function () {
                            i.disabled || t(this).removeClass("ui-state-focus");
                        })),
                    e.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"),
                    i.navigation)
                ) {
                    var s = e.element.find("a").filter(i.navigationFilter).eq(0);
                    if (s.length) {
                        var n = s.closest(".ui-accordion-header");
                        n.length ? (e.active = n) : (e.active = s.closest(".ui-accordion-content").prev());
                    }
                }
                (e.active = e
                    ._findActive(e.active || i.active)
                    .addClass("ui-state-default ui-state-active")
                    .toggleClass("ui-corner-all")
                    .toggleClass("ui-corner-top")),
                    e.active.next().addClass("ui-accordion-content-active"),
                    e._createIcons(),
                    e.resize(),
                    e.element.attr("role", "tablist"),
                    e.headers
                        .attr("role", "tab")
                        .bind("keydown.accordion", function (t) {
                            return e._keydown(t);
                        })
                        .next()
                        .attr("role", "tabpanel"),
                    e.headers
                        .not(e.active || "")
                        .attr({ "aria-expanded": "false", "aria-selected": "false", tabIndex: -1 })
                        .next()
                        .hide(),
                    e.active.length ? e.active.attr({ "aria-expanded": "true", "aria-selected": "true", tabIndex: 0 }) : e.headers.eq(0).attr("tabIndex", 0),
                    t.browser.safari || e.headers.find("a").attr("tabIndex", -1),
                    i.event &&
                        e.headers.bind(i.event.split(" ").join(".accordion ") + ".accordion", function (t) {
                            e._clickHandler.call(e, t, this), t.preventDefault();
                        });
            },
            _createIcons: function () {
                var e = this.options;
                e.icons &&
                    (t("<span></span>")
                        .addClass("ui-icon " + e.icons.header)
                        .prependTo(this.headers),
                    this.active.children(".ui-icon").toggleClass(e.icons.header).toggleClass(e.icons.headerSelected),
                    this.element.addClass("ui-accordion-icons"));
            },
            _destroyIcons: function () {
                this.headers.children(".ui-icon").remove(), this.element.removeClass("ui-accordion-icons");
            },
            destroy: function () {
                var e = this.options;
                this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),
                    this.headers
                        .unbind(".accordion")
                        .removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top")
                        .removeAttr("role")
                        .removeAttr("aria-expanded")
                        .removeAttr("aria-selected")
                        .removeAttr("tabIndex"),
                    this.headers.find("a").removeAttr("tabIndex"),
                    this._destroyIcons();
                var i = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
                return (e.autoHeight || e.fillHeight) && i.css("height", ""), t.Widget.prototype.destroy.call(this);
            },
            _setOption: function (e, i) {
                t.Widget.prototype._setOption.apply(this, arguments),
                    "active" == e && this.activate(i),
                    "icons" == e && (this._destroyIcons(), i && this._createIcons()),
                    "disabled" == e && this.headers.add(this.headers.next())[i ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled");
            },
            _keydown: function (e) {
                if (!(this.options.disabled || e.altKey || e.ctrlKey)) {
                    var i = t.ui.keyCode,
                        s = this.headers.length,
                        n = this.headers.index(e.target),
                        o = !1;
                    switch (e.keyCode) {
                        case i.RIGHT:
                        case i.DOWN:
                            o = this.headers[(n + 1) % s];
                            break;
                        case i.LEFT:
                        case i.UP:
                            o = this.headers[(n - 1 + s) % s];
                            break;
                        case i.SPACE:
                        case i.ENTER:
                            this._clickHandler({ target: e.target }, e.target), e.preventDefault();
                    }
                    return !o || (t(e.target).attr("tabIndex", -1), t(o).attr("tabIndex", 0), o.focus(), !1);
                }
            },
            resize: function () {
                var e,
                    i = this.options;
                if (i.fillSpace) {
                    if (t.browser.msie) {
                        var s = this.element.parent().css("overflow");
                        this.element.parent().css("overflow", "hidden");
                    }
                    (e = this.element.parent().height()),
                        t.browser.msie && this.element.parent().css("overflow", s),
                        this.headers.each(function () {
                            e -= t(this).outerHeight(!0);
                        }),
                        this.headers
                            .next()
                            .each(function () {
                                t(this).height(Math.max(0, e - t(this).innerHeight() + t(this).height()));
                            })
                            .css("overflow", "auto");
                } else
                    i.autoHeight &&
                        ((e = 0),
                        this.headers
                            .next()
                            .each(function () {
                                e = Math.max(e, t(this).height("").height());
                            })
                            .height(e));
                return this;
            },
            activate: function (t) {
                this.options.active = t;
                var e = this._findActive(t)[0];
                return this._clickHandler({ target: e }, e), this;
            },
            _findActive: function (e) {
                return e ? ("number" == typeof e ? this.headers.filter(":eq(" + e + ")") : this.headers.not(this.headers.not(e))) : !1 === e ? t([]) : this.headers.filter(":eq(0)");
            },
            _clickHandler: function (e, i) {
                var s = this.options;
                if (!s.disabled)
                    if (e.target) {
                        var n = t(e.currentTarget || i),
                            o = n[0] === this.active[0];
                        if (((s.active = (!s.collapsible || !o) && this.headers.index(n)), !(this.running || (!s.collapsible && o)))) {
                            var a = this.active,
                                r =
                                    ((c = n.next()),
                                    (l = this.active.next()),
                                    (h = { options: s, newHeader: o && s.collapsible ? t([]) : n, oldHeader: this.active, newContent: o && s.collapsible ? t([]) : c, oldContent: l }),
                                    this.headers.index(this.active[0]) > this.headers.index(n[0]));
                            (this.active = o ? t([]) : n),
                                this._toggle(c, l, h, o, r),
                                a.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(s.icons.headerSelected).addClass(s.icons.header),
                                o ||
                                    (n.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(s.icons.header).addClass(s.icons.headerSelected),
                                    n.next().addClass("ui-accordion-content-active"));
                        }
                    } else {
                        if (!s.collapsible) return;
                        this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(s.icons.headerSelected).addClass(s.icons.header),
                            this.active.next().addClass("ui-accordion-content-active");
                        var l = this.active.next(),
                            h = { options: s, newHeader: t([]), oldHeader: s.active, newContent: t([]), oldContent: l },
                            c = (this.active = t([]));
                        this._toggle(c, l, h);
                    }
            },
            _toggle: function (e, i, s, n, o) {
                var a = this,
                    r = a.options;
                (a.toShow = e), (a.toHide = i), (a.data = s);
                var l = function () {
                    if (a) return a._completed.apply(a, arguments);
                };
                if ((a._trigger("changestart", null, a.data), (a.running = 0 === i.size() ? e.size() : i.size()), r.animated)) {
                    var h = {};
                    (h = r.collapsible && n ? { toShow: t([]), toHide: i, complete: l, down: o, autoHeight: r.autoHeight || r.fillSpace } : { toShow: e, toHide: i, complete: l, down: o, autoHeight: r.autoHeight || r.fillSpace }),
                        r.proxied || (r.proxied = r.animated),
                        r.proxiedDuration || (r.proxiedDuration = r.duration),
                        (r.animated = t.isFunction(r.proxied) ? r.proxied(h) : r.proxied),
                        (r.duration = t.isFunction(r.proxiedDuration) ? r.proxiedDuration(h) : r.proxiedDuration);
                    var c = t.ui.accordion.animations,
                        u = r.duration,
                        d = r.animated;
                    d && !c[d] && !t.easing[d] && (d = "slide"),
                        c[d] ||
                            (c[d] = function (t) {
                                this.slide(t, { easing: d, duration: u || 700 });
                            }),
                        c[d](h);
                } else r.collapsible && n ? e.toggle() : (i.hide(), e.show()), l(!0);
                i.prev().attr({ "aria-expanded": "false", "aria-selected": "false", tabIndex: -1 }).blur(), e.prev().attr({ "aria-expanded": "true", "aria-selected": "true", tabIndex: 0 }).focus();
            },
            _completed: function (t) {
                (this.running = t ? 0 : --this.running),
                    this.running ||
                        (this.options.clearStyle && this.toShow.add(this.toHide).css({ height: "", overflow: "" }),
                        this.toHide.removeClass("ui-accordion-content-active"),
                        this.toHide.length && (this.toHide.parent()[0].className = this.toHide.parent()[0].className),
                        this._trigger("change", null, this.data));
            },
        }),
            t.extend(t.ui.accordion, {
                version: "1.8.22",
                animations: {
                    slide: function (e, i) {
                        if ((e = t.extend({ easing: "swing", duration: 300 }, e, i)).toHide.size())
                            if (e.toShow.size()) {
                                var s,
                                    n = e.toShow.css("overflow"),
                                    o = 0,
                                    a = {},
                                    r = {},
                                    l = e.toShow;
                                (s = l[0].style.width),
                                    l.width(l.parent().width() - parseFloat(l.css("paddingLeft")) - parseFloat(l.css("paddingRight")) - (parseFloat(l.css("borderLeftWidth")) || 0) - (parseFloat(l.css("borderRightWidth")) || 0)),
                                    t.each(["height", "paddingTop", "paddingBottom"], function (i, s) {
                                        r[s] = "hide";
                                        var n = ("" + t.css(e.toShow[0], s)).match(/^([\d+-.]+)(.*)$/);
                                        a[s] = { value: n[1], unit: n[2] || "px" };
                                    }),
                                    e.toShow.css({ height: 0, overflow: "hidden" }).show(),
                                    e.toHide
                                        .filter(":hidden")
                                        .each(e.complete)
                                        .end()
                                        .filter(":visible")
                                        .animate(r, {
                                            step: function (t, i) {
                                                "height" == i.prop && (o = i.end - i.start == 0 ? 0 : (i.now - i.start) / (i.end - i.start)), (e.toShow[0].style[i.prop] = o * a[i.prop].value + a[i.prop].unit);
                                            },
                                            duration: e.duration,
                                            easing: e.easing,
                                            complete: function () {
                                                e.autoHeight || e.toShow.css("height", ""), e.toShow.css({ width: s, overflow: n }), e.complete();
                                            },
                                        });
                            } else e.toHide.animate({ height: "hide", paddingTop: "hide", paddingBottom: "hide" }, e);
                        else e.toShow.animate({ height: "show", paddingTop: "show", paddingBottom: "show" }, e);
                    },
                    bounceslide: function (t) {
                        this.slide(t, { easing: t.down ? "easeOutBounce" : "swing", duration: t.down ? 1e3 : 200 });
                    },
                },
            });
    })(jQuery),
    (function (t, e) {
        var i = 0;
        t.widget("ui.autocomplete", {
            options: { appendTo: "body", autoFocus: !1, delay: 300, minLength: 1, position: { my: "left top", at: "left bottom", collision: "none" }, source: null },
            pending: 0,
            _create: function () {
                var e,
                    i = this,
                    s = this.element[0].ownerDocument;
                (this.isMultiLine = this.element.is("textarea")),
                    this.element
                        .addClass("ui-autocomplete-input")
                        .attr("autocomplete", "off")
                        .attr({ role: "textbox", "aria-autocomplete": "list", "aria-haspopup": "true" })
                        .bind("keydown.autocomplete", function (s) {
                            if (!i.options.disabled && !i.element.propAttr("readOnly")) {
                                e = !1;
                                var n = t.ui.keyCode;
                                switch (s.keyCode) {
                                    case n.PAGE_UP:
                                        i._move("previousPage", s);
                                        break;
                                    case n.PAGE_DOWN:
                                        i._move("nextPage", s);
                                        break;
                                    case n.UP:
                                        i._keyEvent("previous", s);
                                        break;
                                    case n.DOWN:
                                        i._keyEvent("next", s);
                                        break;
                                    case n.ENTER:
                                    case n.NUMPAD_ENTER:
                                        i.menu.active && ((e = !0), s.preventDefault());
                                    case n.TAB:
                                        if (!i.menu.active) return;
                                        i.menu.select(s);
                                        break;
                                    case n.ESCAPE:
                                        i.element.val(i.term), i.close(s);
                                        break;
                                    default:
                                        clearTimeout(i.searching),
                                            (i.searching = setTimeout(function () {
                                                i.term != i.element.val() && ((i.selectedItem = null), i.search(null, s));
                                            }, i.options.delay));
                                }
                            }
                        })
                        .bind("keypress.autocomplete", function (t) {
                            e && ((e = !1), t.preventDefault());
                        })
                        .bind("focus.autocomplete", function () {
                            i.options.disabled || ((i.selectedItem = null), (i.previous = i.element.val()));
                        })
                        .bind("blur.autocomplete", function (t) {
                            i.options.disabled ||
                                (clearTimeout(i.searching),
                                (i.closing = setTimeout(function () {
                                    i.close(t), i._change(t);
                                }, 150)));
                        }),
                    this._initSource(),
                    (this.menu = t("<ul></ul>")
                        .addClass("ui-autocomplete")
                        .appendTo(t(this.options.appendTo || "body", s)[0])
                        .mousedown(function (e) {
                            var s = i.menu.element[0];
                            t(e.target).closest(".ui-menu-item").length ||
                                setTimeout(function () {
                                    t(document).one("mousedown", function (e) {
                                        e.target !== i.element[0] && e.target !== s && !t.ui.contains(s, e.target) && i.close();
                                    });
                                }, 1),
                                setTimeout(function () {
                                    clearTimeout(i.closing);
                                }, 13);
                        })
                        .menu({
                            focus: function (t, e) {
                                var s = e.item.data("item.autocomplete");
                                !1 !== i._trigger("focus", t, { item: s }) && /^key/.test(t.originalEvent.type) && i.element.val(s.value);
                            },
                            selected: function (t, e) {
                                var n = e.item.data("item.autocomplete"),
                                    o = i.previous;
                                i.element[0] !== s.activeElement &&
                                    (i.element.focus(),
                                    (i.previous = o),
                                    setTimeout(function () {
                                        (i.previous = o), (i.selectedItem = n);
                                    }, 1)),
                                    !1 !== i._trigger("select", t, { item: n }) && i.element.val(n.value),
                                    (i.term = i.element.val()),
                                    i.close(t),
                                    (i.selectedItem = n);
                            },
                            blur: function (t, e) {
                                i.menu.element.is(":visible") && i.element.val() !== i.term && i.element.val(i.term);
                            },
                        })
                        .zIndex(this.element.zIndex() + 1)
                        .css({ top: 0, left: 0 })
                        .hide()
                        .data("menu")),
                    t.fn.bgiframe && this.menu.element.bgiframe(),
                    (i.beforeunloadHandler = function () {
                        i.element.removeAttr("autocomplete");
                    }),
                    t(window).bind("beforeunload", i.beforeunloadHandler);
            },
            destroy: function () {
                this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"),
                    this.menu.element.remove(),
                    t(window).unbind("beforeunload", this.beforeunloadHandler),
                    t.Widget.prototype.destroy.call(this);
            },
            _setOption: function (e, i) {
                t.Widget.prototype._setOption.apply(this, arguments),
                    "source" === e && this._initSource(),
                    "appendTo" === e && this.menu.element.appendTo(t(i || "body", this.element[0].ownerDocument)[0]),
                    "disabled" === e && i && this.xhr && this.xhr.abort();
            },
            _initSource: function () {
                var e,
                    i,
                    s = this;
                t.isArray(this.options.source)
                    ? ((e = this.options.source),
                      (this.source = function (i, s) {
                          s(t.ui.autocomplete.filter(e, i.term));
                      }))
                    : "string" == typeof this.options.source
                    ? ((i = this.options.source),
                      (this.source = function (e, n) {
                          s.xhr && s.xhr.abort(),
                              (s.xhr = t.ajax({
                                  url: i,
                                  data: e,
                                  dataType: "json",
                                  success: function (t, e) {
                                      n(t);
                                  },
                                  error: function () {
                                      n([]);
                                  },
                              }));
                      }))
                    : (this.source = this.options.source);
            },
            search: function (t, e) {
                return (
                    (t = null != t ? t : this.element.val()), (this.term = this.element.val()), t.length < this.options.minLength ? this.close(e) : (clearTimeout(this.closing), !1 !== this._trigger("search", e) ? this._search(t) : void 0)
                );
            },
            _search: function (t) {
                this.pending++, this.element.addClass("ui-autocomplete-loading"), this.source({ term: t }, this._response());
            },
            _response: function () {
                var t = this,
                    e = ++i;
                return function (s) {
                    e === i && t.__response(s), t.pending--, t.pending || t.element.removeClass("ui-autocomplete-loading");
                };
            },
            __response: function (t) {
                !this.options.disabled && t && t.length ? ((t = this._normalize(t)), this._suggest(t), this._trigger("open")) : this.close();
            },
            close: function (t) {
                clearTimeout(this.closing), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.deactivate(), this._trigger("close", t));
            },
            _change: function (t) {
                this.previous !== this.element.val() && this._trigger("change", t, { item: this.selectedItem });
            },
            _normalize: function (e) {
                return e.length && e[0].label && e[0].value
                    ? e
                    : t.map(e, function (e) {
                          return "string" == typeof e ? { label: e, value: e } : t.extend({ label: e.label || e.value, value: e.value || e.label }, e);
                      });
            },
            _suggest: function (e) {
                var i = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
                this._renderMenu(i, e),
                    this.menu.deactivate(),
                    this.menu.refresh(),
                    i.show(),
                    this._resizeMenu(),
                    i.position(t.extend({ of: this.element }, this.options.position)),
                    this.options.autoFocus && this.menu.next(new t.Event("mouseover"));
            },
            _resizeMenu: function () {
                var t = this.menu.element;
                t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()));
            },
            _renderMenu: function (e, i) {
                var s = this;
                t.each(i, function (t, i) {
                    s._renderItem(e, i);
                });
            },
            _renderItem: function (e, i) {
                return t("<li></li>").data("item.autocomplete", i).append(t("<a></a>").text(i.label)).appendTo(e);
            },
            _move: function (t, e) {
                if (this.menu.element.is(":visible")) return (this.menu.first() && /^previous/.test(t)) || (this.menu.last() && /^next/.test(t)) ? (this.element.val(this.term), void this.menu.deactivate()) : void this.menu[t](e);
                this.search(null, e);
            },
            widget: function () {
                return this.menu.element;
            },
            _keyEvent: function (t, e) {
                (this.isMultiLine && !this.menu.element.is(":visible")) || (this._move(t, e), e.preventDefault());
            },
        }),
            t.extend(t.ui.autocomplete, {
                escapeRegex: function (t) {
                    return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                },
                filter: function (e, i) {
                    var s = new RegExp(t.ui.autocomplete.escapeRegex(i), "i");
                    return t.grep(e, function (t) {
                        return s.test(t.label || t.value || t);
                    });
                },
            });
    })(jQuery),
    (function (t) {
        t.widget("ui.menu", {
            _create: function () {
                var e = this;
                this.element
                    .addClass("ui-menu ui-widget ui-widget-content ui-corner-all")
                    .attr({ role: "listbox", "aria-activedescendant": "ui-active-menuitem" })
                    .click(function (i) {
                        t(i.target).closest(".ui-menu-item a").length && (i.preventDefault(), e.select(i));
                    }),
                    this.refresh();
            },
            refresh: function () {
                var e = this;
                this.element
                    .children("li:not(.ui-menu-item):has(a)")
                    .addClass("ui-menu-item")
                    .attr("role", "menuitem")
                    .children("a")
                    .addClass("ui-corner-all")
                    .attr("tabindex", -1)
                    .mouseenter(function (i) {
                        e.activate(i, t(this).parent());
                    })
                    .mouseleave(function () {
                        e.deactivate();
                    });
            },
            activate: function (t, e) {
                if ((this.deactivate(), this.hasScroll())) {
                    var i = e.offset().top - this.element.offset().top,
                        s = this.element.scrollTop(),
                        n = this.element.height();
                    i < 0 ? this.element.scrollTop(s + i) : i >= n && this.element.scrollTop(s + i - n + e.height());
                }
                (this.active = e.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end()), this._trigger("focus", t, { item: e });
            },
            deactivate: function () {
                this.active && (this.active.children("a").removeClass("ui-state-hover").removeAttr("id"), this._trigger("blur"), (this.active = null));
            },
            next: function (t) {
                this.move("next", ".ui-menu-item:first", t);
            },
            previous: function (t) {
                this.move("prev", ".ui-menu-item:last", t);
            },
            first: function () {
                return this.active && !this.active.prevAll(".ui-menu-item").length;
            },
            last: function () {
                return this.active && !this.active.nextAll(".ui-menu-item").length;
            },
            move: function (t, e, i) {
                if (this.active) {
                    var s = this.active[t + "All"](".ui-menu-item").eq(0);
                    s.length ? this.activate(i, s) : this.activate(i, this.element.children(e));
                } else this.activate(i, this.element.children(e));
            },
            nextPage: function (e) {
                if (this.hasScroll()) {
                    if (!this.active || this.last()) return void this.activate(e, this.element.children(".ui-menu-item:first"));
                    var i = this.active.offset().top,
                        s = this.element.height(),
                        n = this.element.children(".ui-menu-item").filter(function () {
                            var e = t(this).offset().top - i - s + t(this).height();
                            return e < 10 && e > -10;
                        });
                    n.length || (n = this.element.children(".ui-menu-item:last")), this.activate(e, n);
                } else this.activate(e, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"));
            },
            previousPage: function (e) {
                if (this.hasScroll()) {
                    if (!this.active || this.first()) return void this.activate(e, this.element.children(".ui-menu-item:last"));
                    var i = this.active.offset().top,
                        s = this.element.height(),
                        n = this.element.children(".ui-menu-item").filter(function () {
                            var e = t(this).offset().top - i + s - t(this).height();
                            return e < 10 && e > -10;
                        });
                    n.length || (n = this.element.children(".ui-menu-item:first")), this.activate(e, n);
                } else this.activate(e, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"));
            },
            hasScroll: function () {
                return this.element.height() < this.element[t.fn.prop ? "prop" : "attr"]("scrollHeight");
            },
            select: function (t) {
                this._trigger("selected", t, { item: this.active });
            },
        });
    })(jQuery),
    (function (t, e) {
        var i,
            s,
            n,
            o,
            a = "ui-button ui-widget ui-state-default ui-corner-all",
            r = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
            l = function () {
                var e = t(this).find(":ui-button");
                setTimeout(function () {
                    e.button("refresh");
                }, 1);
            },
            h = function (e) {
                var i = e.name,
                    s = e.form,
                    n = t([]);
                return (
                    i &&
                        (n = s
                            ? t(s).find("[name='" + i + "']")
                            : t("[name='" + i + "']", e.ownerDocument).filter(function () {
                                  return !this.form;
                              })),
                    n
                );
            };
        t.widget("ui.button", {
            options: { disabled: null, text: !0, label: null, icons: { primary: null, secondary: null } },
            _create: function () {
                this.element.closest("form").unbind("reset.button").bind("reset.button", l),
                    "boolean" != typeof this.options.disabled ? (this.options.disabled = !!this.element.propAttr("disabled")) : this.element.propAttr("disabled", this.options.disabled),
                    this._determineButtonType(),
                    (this.hasTitle = !!this.buttonElement.attr("title"));
                var e = this,
                    r = this.options,
                    c = "checkbox" === this.type || "radio" === this.type,
                    u = "ui-state-hover" + (c ? "" : " ui-state-active"),
                    d = "ui-state-focus";
                null === r.label && (r.label = this.buttonElement.html()),
                    this.buttonElement
                        .addClass(a)
                        .attr("role", "button")
                        .bind("mouseenter.button", function () {
                            r.disabled || (t(this).addClass("ui-state-hover"), this === i && t(this).addClass("ui-state-active"));
                        })
                        .bind("mouseleave.button", function () {
                            r.disabled || t(this).removeClass(u);
                        })
                        .bind("click.button", function (t) {
                            r.disabled && (t.preventDefault(), t.stopImmediatePropagation());
                        }),
                    this.element
                        .bind("focus.button", function () {
                            e.buttonElement.addClass(d);
                        })
                        .bind("blur.button", function () {
                            e.buttonElement.removeClass(d);
                        }),
                    c &&
                        (this.element.bind("change.button", function () {
                            o || e.refresh();
                        }),
                        this.buttonElement
                            .bind("mousedown.button", function (t) {
                                r.disabled || ((o = !1), (s = t.pageX), (n = t.pageY));
                            })
                            .bind("mouseup.button", function (t) {
                                r.disabled || (s === t.pageX && n === t.pageY) || (o = !0);
                            })),
                    "checkbox" === this.type
                        ? this.buttonElement.bind("click.button", function () {
                              if (r.disabled || o) return !1;
                              t(this).toggleClass("ui-state-active"), e.buttonElement.attr("aria-pressed", e.element[0].checked);
                          })
                        : "radio" === this.type
                        ? this.buttonElement.bind("click.button", function () {
                              if (r.disabled || o) return !1;
                              t(this).addClass("ui-state-active"), e.buttonElement.attr("aria-pressed", "true");
                              var i = e.element[0];
                              h(i)
                                  .not(i)
                                  .map(function () {
                                      return t(this).button("widget")[0];
                                  })
                                  .removeClass("ui-state-active")
                                  .attr("aria-pressed", "false");
                          })
                        : (this.buttonElement
                              .bind("mousedown.button", function () {
                                  if (r.disabled) return !1;
                                  t(this).addClass("ui-state-active"),
                                      (i = this),
                                      t(document).one("mouseup", function () {
                                          i = null;
                                      });
                              })
                              .bind("mouseup.button", function () {
                                  if (r.disabled) return !1;
                                  t(this).removeClass("ui-state-active");
                              })
                              .bind("keydown.button", function (e) {
                                  if (r.disabled) return !1;
                                  (e.keyCode == t.ui.keyCode.SPACE || e.keyCode == t.ui.keyCode.ENTER) && t(this).addClass("ui-state-active");
                              })
                              .bind("keyup.button", function () {
                                  t(this).removeClass("ui-state-active");
                              }),
                          this.buttonElement.is("a") &&
                              this.buttonElement.keyup(function (e) {
                                  e.keyCode === t.ui.keyCode.SPACE && t(this).click();
                              })),
                    this._setOption("disabled", r.disabled),
                    this._resetButton();
            },
            _determineButtonType: function () {
                if (
                    (this.element.is(":checkbox") ? (this.type = "checkbox") : this.element.is(":radio") ? (this.type = "radio") : this.element.is("input") ? (this.type = "input") : (this.type = "button"),
                    "checkbox" === this.type || "radio" === this.type)
                ) {
                    var t = this.element.parents().filter(":last"),
                        e = "label[for='" + this.element.attr("id") + "']";
                    (this.buttonElement = t.find(e)),
                        this.buttonElement.length || ((t = t.length ? t.siblings() : this.element.siblings()), (this.buttonElement = t.filter(e)), this.buttonElement.length || (this.buttonElement = t.find(e))),
                        this.element.addClass("ui-helper-hidden-accessible");
                    var i = this.element.is(":checked");
                    i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.attr("aria-pressed", i);
                } else this.buttonElement = this.element;
            },
            widget: function () {
                return this.buttonElement;
            },
            destroy: function () {
                this.element.removeClass("ui-helper-hidden-accessible"),
                    this.buttonElement
                        .removeClass(a + " ui-state-hover ui-state-active  " + r)
                        .removeAttr("role")
                        .removeAttr("aria-pressed")
                        .html(this.buttonElement.find(".ui-button-text").html()),
                    this.hasTitle || this.buttonElement.removeAttr("title"),
                    t.Widget.prototype.destroy.call(this);
            },
            _setOption: function (e, i) {
                t.Widget.prototype._setOption.apply(this, arguments), "disabled" !== e ? this._resetButton() : i ? this.element.propAttr("disabled", !0) : this.element.propAttr("disabled", !1);
            },
            refresh: function () {
                var e = this.element.is(":disabled");
                e !== this.options.disabled && this._setOption("disabled", e),
                    "radio" === this.type
                        ? h(this.element[0]).each(function () {
                              t(this).is(":checked") ? t(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false");
                          })
                        : "checkbox" === this.type &&
                          (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"));
            },
            _resetButton: function () {
                if ("input" !== this.type) {
                    var e = this.buttonElement.removeClass(r),
                        i = t("<span></span>", this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(),
                        s = this.options.icons,
                        n = s.primary && s.secondary,
                        o = [];
                    s.primary || s.secondary
                        ? (this.options.text && o.push("ui-button-text-icon" + (n ? "s" : s.primary ? "-primary" : "-secondary")),
                          s.primary && e.prepend("<span class='ui-button-icon-primary ui-icon " + s.primary + "'></span>"),
                          s.secondary && e.append("<span class='ui-button-icon-secondary ui-icon " + s.secondary + "'></span>"),
                          this.options.text || (o.push(n ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || e.attr("title", i)))
                        : o.push("ui-button-text-only"),
                        e.addClass(o.join(" "));
                } else this.options.label && this.element.val(this.options.label);
            },
        }),
            t.widget("ui.buttonset", {
                options: { items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)" },
                _create: function () {
                    this.element.addClass("ui-buttonset");
                },
                _init: function () {
                    this.refresh();
                },
                _setOption: function (e, i) {
                    "disabled" === e && this.buttons.button("option", e, i), t.Widget.prototype._setOption.apply(this, arguments);
                },
                refresh: function () {
                    var e = "rtl" === this.element.css("direction");
                    this.buttons = this.element
                        .find(this.options.items)
                        .filter(":ui-button")
                        .button("refresh")
                        .end()
                        .not(":ui-button")
                        .button()
                        .end()
                        .map(function () {
                            return t(this).button("widget")[0];
                        })
                        .removeClass("ui-corner-all ui-corner-left ui-corner-right")
                        .filter(":first")
                        .addClass(e ? "ui-corner-right" : "ui-corner-left")
                        .end()
                        .filter(":last")
                        .addClass(e ? "ui-corner-left" : "ui-corner-right")
                        .end()
                        .end();
                },
                destroy: function () {
                    this.element.removeClass("ui-buttonset"),
                        this.buttons
                            .map(function () {
                                return t(this).button("widget")[0];
                            })
                            .removeClass("ui-corner-left ui-corner-right")
                            .end()
                            .button("destroy"),
                        t.Widget.prototype.destroy.call(this);
                },
            });
    })(jQuery),
    (function ($, undefined) {
        function Datepicker() {
            (this.debug = !1),
                (this._curInst = null),
                (this._keyEvent = !1),
                (this._disabledInputs = []),
                (this._datepickerShowing = !1),
                (this._inDialog = !1),
                (this._mainDivId = "ui-datepicker-div"),
                (this._inlineClass = "ui-datepicker-inline"),
                (this._appendClass = "ui-datepicker-append"),
                (this._triggerClass = "ui-datepicker-trigger"),
                (this._dialogClass = "ui-datepicker-dialog"),
                (this._disableClass = "ui-datepicker-disabled"),
                (this._unselectableClass = "ui-datepicker-unselectable"),
                (this._currentClass = "ui-datepicker-current-day"),
                (this._dayOverClass = "ui-datepicker-days-cell-over"),
                (this.regional = []),
                (this.regional[""] = {
                    closeText: "Done",
                    prevText: "Prev",
                    nextText: "Next",
                    currentText: "Today",
                    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    weekHeader: "Wk",
                    dateFormat: "mm/dd/yy",
                    firstDay: 0,
                    isRTL: !1,
                    showMonthAfterYear: !1,
                    yearSuffix: "",
                }),
                (this._defaults = {
                    showOn: "focus",
                    showAnim: "fadeIn",
                    showOptions: {},
                    defaultDate: null,
                    appendText: "",
                    buttonText: "...",
                    buttonImage: "",
                    buttonImageOnly: !1,
                    hideIfNoPrevNext: !1,
                    navigationAsDateFormat: !1,
                    gotoCurrent: !1,
                    changeMonth: !1,
                    changeYear: !1,
                    yearRange: "c-10:c+10",
                    showOtherMonths: !1,
                    selectOtherMonths: !1,
                    showWeek: !1,
                    calculateWeek: this.iso8601Week,
                    shortYearCutoff: "+10",
                    minDate: null,
                    maxDate: null,
                    duration: "fast",
                    beforeShowDay: null,
                    beforeShow: null,
                    onSelect: null,
                    onChangeMonthYear: null,
                    onClose: null,
                    numberOfMonths: 1,
                    showCurrentAtPos: 0,
                    stepMonths: 1,
                    stepBigMonths: 12,
                    altField: "",
                    altFormat: "",
                    constrainInput: !0,
                    showButtonPanel: !1,
                    autoSize: !1,
                    disabled: !1,
                }),
                $.extend(this._defaults, this.regional[""]),
                (this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')));
        }
        function bindHover(t) {
            var e = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return t
                .bind("mouseout", function (t) {
                    var i = $(t.target).closest(e);
                    i.length && i.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover");
                })
                .bind("mouseover", function (i) {
                    var s = $(i.target).closest(e);
                    !$.datepicker._isDisabledDatepicker(instActive.inline ? t.parent()[0] : instActive.input[0]) &&
                        s.length &&
                        (s.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),
                        s.addClass("ui-state-hover"),
                        s.hasClass("ui-datepicker-prev") && s.addClass("ui-datepicker-prev-hover"),
                        s.hasClass("ui-datepicker-next") && s.addClass("ui-datepicker-next-hover"));
                });
        }
        function extendRemove(t, e) {
            for (var i in ($.extend(t, e), e)) (null != e[i] && e[i] != undefined) || (t[i] = e[i]);
            return t;
        }
        function isArray(t) {
            return t && (($.browser.safari && "object" == typeof t && t.length) || (t.constructor && t.constructor.toString().match(/\Array\(\)/)));
        }
        $.extend($.ui, { datepicker: { version: "1.8.22" } });
        var PROP_NAME = "datepicker",
            dpuuid = new Date().getTime(),
            instActive;
        $.extend(Datepicker.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            log: function () {
                this.debug && console.log.apply("", arguments);
            },
            _widgetDatepicker: function () {
                return this.dpDiv;
            },
            setDefaults: function (t) {
                return extendRemove(this._defaults, t || {}), this;
            },
            _attachDatepicker: function (target, settings) {
                var inlineSettings = null;
                for (var attrName in this._defaults) {
                    var attrValue = target.getAttribute("date:" + attrName);
                    if (attrValue) {
                        inlineSettings = inlineSettings || {};
                        try {
                            inlineSettings[attrName] = eval(attrValue);
                        } catch (t) {
                            inlineSettings[attrName] = attrValue;
                        }
                    }
                }
                var nodeName = target.nodeName.toLowerCase(),
                    inline = "div" == nodeName || "span" == nodeName;
                target.id || ((this.uuid += 1), (target.id = "dp" + this.uuid));
                var inst = this._newInst($(target), inline);
                (inst.settings = $.extend({}, settings || {}, inlineSettings || {})), "input" == nodeName ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst);
            },
            _newInst: function (t, e) {
                return {
                    id: t[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1"),
                    input: t,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: e,
                    dpDiv: e ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv,
                };
            },
            _connectDatepicker: function (t, e) {
                var i = $(t);
                (e.append = $([])),
                    (e.trigger = $([])),
                    i.hasClass(this.markerClassName) ||
                        (this._attachments(i, e),
                        i
                            .addClass(this.markerClassName)
                            .keydown(this._doKeyDown)
                            .keypress(this._doKeyPress)
                            .keyup(this._doKeyUp)
                            .bind("setData.datepicker", function (t, i, s) {
                                e.settings[i] = s;
                            })
                            .bind("getData.datepicker", function (t, i) {
                                return this._get(e, i);
                            }),
                        this._autoSize(e),
                        $.data(t, PROP_NAME, e),
                        e.settings.disabled && this._disableDatepicker(t));
            },
            _attachments: function (t, e) {
                var i = this._get(e, "appendText"),
                    s = this._get(e, "isRTL");
                e.append && e.append.remove(), i && ((e.append = $('<span class="' + this._appendClass + '">' + i + "</span>")), t[s ? "before" : "after"](e.append)), t.unbind("focus", this._showDatepicker), e.trigger && e.trigger.remove();
                var n = this._get(e, "showOn");
                if ((("focus" == n || "both" == n) && t.focus(this._showDatepicker), "button" == n || "both" == n)) {
                    var o = this._get(e, "buttonText"),
                        a = this._get(e, "buttonImage");
                    (e.trigger = $(
                        this._get(e, "buttonImageOnly")
                            ? $("<img/>").addClass(this._triggerClass).attr({ src: a, alt: o, title: o })
                            : $('<button type="button"></button>')
                                  .addClass(this._triggerClass)
                                  .html("" == a ? o : $("<img/>").attr({ src: a, alt: o, title: o }))
                    )),
                        t[s ? "before" : "after"](e.trigger),
                        e.trigger.click(function () {
                            return (
                                $.datepicker._datepickerShowing && $.datepicker._lastInput == t[0]
                                    ? $.datepicker._hideDatepicker()
                                    : $.datepicker._datepickerShowing && $.datepicker._lastInput != t[0]
                                    ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(t[0]))
                                    : $.datepicker._showDatepicker(t[0]),
                                !1
                            );
                        });
                }
            },
            _autoSize: function (t) {
                if (this._get(t, "autoSize") && !t.inline) {
                    var e = new Date(2009, 11, 20),
                        i = this._get(t, "dateFormat");
                    if (i.match(/[DM]/)) {
                        var s = function (t) {
                            for (var e = 0, i = 0, s = 0; s < t.length; s++) t[s].length > e && ((e = t[s].length), (i = s));
                            return i;
                        };
                        e.setMonth(s(this._get(t, i.match(/MM/) ? "monthNames" : "monthNamesShort"))), e.setDate(s(this._get(t, i.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - e.getDay());
                    }
                    t.input.attr("size", this._formatDate(t, e).length);
                }
            },
            _inlineDatepicker: function (t, e) {
                var i = $(t);
                i.hasClass(this.markerClassName) ||
                    (i
                        .addClass(this.markerClassName)
                        .append(e.dpDiv)
                        .bind("setData.datepicker", function (t, i, s) {
                            e.settings[i] = s;
                        })
                        .bind("getData.datepicker", function (t, i) {
                            return this._get(e, i);
                        }),
                    $.data(t, PROP_NAME, e),
                    this._setDate(e, this._getDefaultDate(e), !0),
                    this._updateDatepicker(e),
                    this._updateAlternate(e),
                    e.settings.disabled && this._disableDatepicker(t),
                    e.dpDiv.css("display", "block"));
            },
            _dialogDatepicker: function (t, e, i, s, n) {
                var o = this._dialogInst;
                if (!o) {
                    this.uuid += 1;
                    var a = "dp" + this.uuid;
                    (this._dialogInput = $('<input type="text" id="' + a + '" style="position: absolute; top: -100px; width: 0px;"/>')),
                        this._dialogInput.keydown(this._doKeyDown),
                        $("body").append(this._dialogInput),
                        ((o = this._dialogInst = this._newInst(this._dialogInput, !1)).settings = {}),
                        $.data(this._dialogInput[0], PROP_NAME, o);
                }
                if ((extendRemove(o.settings, s || {}), (e = e && e.constructor == Date ? this._formatDate(o, e) : e), this._dialogInput.val(e), (this._pos = n ? (n.length ? n : [n.pageX, n.pageY]) : null), !this._pos)) {
                    var r = document.documentElement.clientWidth,
                        l = document.documentElement.clientHeight,
                        h = document.documentElement.scrollLeft || document.body.scrollLeft,
                        c = document.documentElement.scrollTop || document.body.scrollTop;
                    this._pos = [r / 2 - 100 + h, l / 2 - 150 + c];
                }
                return (
                    this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"),
                    (o.settings.onSelect = i),
                    (this._inDialog = !0),
                    this.dpDiv.addClass(this._dialogClass),
                    this._showDatepicker(this._dialogInput[0]),
                    $.blockUI && $.blockUI(this.dpDiv),
                    $.data(this._dialogInput[0], PROP_NAME, o),
                    this
                );
            },
            _destroyDatepicker: function (t) {
                var e = $(t),
                    i = $.data(t, PROP_NAME);
                if (e.hasClass(this.markerClassName)) {
                    var s = t.nodeName.toLowerCase();
                    $.removeData(t, PROP_NAME),
                        "input" == s
                            ? (i.append.remove(),
                              i.trigger.remove(),
                              e.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp))
                            : ("div" == s || "span" == s) && e.removeClass(this.markerClassName).empty();
                }
            },
            _enableDatepicker: function (t) {
                var e = $(t),
                    i = $.data(t, PROP_NAME);
                if (e.hasClass(this.markerClassName)) {
                    var s = t.nodeName.toLowerCase();
                    if ("input" == s)
                        (t.disabled = !1),
                            i.trigger
                                .filter("button")
                                .each(function () {
                                    this.disabled = !1;
                                })
                                .end()
                                .filter("img")
                                .css({ opacity: "1.0", cursor: "" });
                    else if ("div" == s || "span" == s) {
                        var n = e.children("." + this._inlineClass);
                        n.children().removeClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled");
                    }
                    this._disabledInputs = $.map(this._disabledInputs, function (e) {
                        return e == t ? null : e;
                    });
                }
            },
            _disableDatepicker: function (t) {
                var e = $(t),
                    i = $.data(t, PROP_NAME);
                if (e.hasClass(this.markerClassName)) {
                    var s = t.nodeName.toLowerCase();
                    if ("input" == s)
                        (t.disabled = !0),
                            i.trigger
                                .filter("button")
                                .each(function () {
                                    this.disabled = !0;
                                })
                                .end()
                                .filter("img")
                                .css({ opacity: "0.5", cursor: "default" });
                    else if ("div" == s || "span" == s) {
                        var n = e.children("." + this._inlineClass);
                        n.children().addClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled");
                    }
                    (this._disabledInputs = $.map(this._disabledInputs, function (e) {
                        return e == t ? null : e;
                    })),
                        (this._disabledInputs[this._disabledInputs.length] = t);
                }
            },
            _isDisabledDatepicker: function (t) {
                if (!t) return !1;
                for (var e = 0; e < this._disabledInputs.length; e++) if (this._disabledInputs[e] == t) return !0;
                return !1;
            },
            _getInst: function (t) {
                try {
                    return $.data(t, PROP_NAME);
                } catch (t) {
                    throw "Missing instance data for this datepicker";
                }
            },
            _optionDatepicker: function (t, e, i) {
                var s = this._getInst(t);
                if (2 == arguments.length && "string" == typeof e) return "defaults" == e ? $.extend({}, $.datepicker._defaults) : s ? ("all" == e ? $.extend({}, s.settings) : this._get(s, e)) : null;
                var n = e || {};
                if (("string" == typeof e && ((n = {})[e] = i), s)) {
                    this._curInst == s && this._hideDatepicker();
                    var o = this._getDateDatepicker(t, !0),
                        a = this._getMinMaxDate(s, "min"),
                        r = this._getMinMaxDate(s, "max");
                    extendRemove(s.settings, n),
                        null !== a && n.dateFormat !== undefined && n.minDate === undefined && (s.settings.minDate = this._formatDate(s, a)),
                        null !== r && n.dateFormat !== undefined && n.maxDate === undefined && (s.settings.maxDate = this._formatDate(s, r)),
                        this._attachments($(t), s),
                        this._autoSize(s),
                        this._setDate(s, o),
                        this._updateAlternate(s),
                        this._updateDatepicker(s);
                }
            },
            _changeDatepicker: function (t, e, i) {
                this._optionDatepicker(t, e, i);
            },
            _refreshDatepicker: function (t) {
                var e = this._getInst(t);
                e && this._updateDatepicker(e);
            },
            _setDateDatepicker: function (t, e) {
                var i = this._getInst(t);
                i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i));
            },
            _getDateDatepicker: function (t, e) {
                var i = this._getInst(t);
                return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null;
            },
            _doKeyDown: function (t) {
                var e = $.datepicker._getInst(t.target),
                    i = !0,
                    s = e.dpDiv.is(".ui-datepicker-rtl");
                if (((e._keyEvent = !0), $.datepicker._datepickerShowing))
                    switch (t.keyCode) {
                        case 9:
                            $.datepicker._hideDatepicker(), (i = !1);
                            break;
                        case 13:
                            var n = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", e.dpDiv);
                            n[0] && $.datepicker._selectDay(t.target, e.selectedMonth, e.selectedYear, n[0]);
                            var o = $.datepicker._get(e, "onSelect");
                            if (o) {
                                var a = $.datepicker._formatDate(e);
                                o.apply(e.input ? e.input[0] : null, [a, e]);
                            } else $.datepicker._hideDatepicker();
                            return !1;
                        case 27:
                            $.datepicker._hideDatepicker();
                            break;
                        case 33:
                            $.datepicker._adjustDate(t.target, t.ctrlKey ? -$.datepicker._get(e, "stepBigMonths") : -$.datepicker._get(e, "stepMonths"), "M");
                            break;
                        case 34:
                            $.datepicker._adjustDate(t.target, t.ctrlKey ? +$.datepicker._get(e, "stepBigMonths") : +$.datepicker._get(e, "stepMonths"), "M");
                            break;
                        case 35:
                            (t.ctrlKey || t.metaKey) && $.datepicker._clearDate(t.target), (i = t.ctrlKey || t.metaKey);
                            break;
                        case 36:
                            (t.ctrlKey || t.metaKey) && $.datepicker._gotoToday(t.target), (i = t.ctrlKey || t.metaKey);
                            break;
                        case 37:
                            (t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, s ? 1 : -1, "D"),
                                (i = t.ctrlKey || t.metaKey),
                                t.originalEvent.altKey && $.datepicker._adjustDate(t.target, t.ctrlKey ? -$.datepicker._get(e, "stepBigMonths") : -$.datepicker._get(e, "stepMonths"), "M");
                            break;
                        case 38:
                            (t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, -7, "D"), (i = t.ctrlKey || t.metaKey);
                            break;
                        case 39:
                            (t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, s ? -1 : 1, "D"),
                                (i = t.ctrlKey || t.metaKey),
                                t.originalEvent.altKey && $.datepicker._adjustDate(t.target, t.ctrlKey ? +$.datepicker._get(e, "stepBigMonths") : +$.datepicker._get(e, "stepMonths"), "M");
                            break;
                        case 40:
                            (t.ctrlKey || t.metaKey) && $.datepicker._adjustDate(t.target, 7, "D"), (i = t.ctrlKey || t.metaKey);
                            break;
                        default:
                            i = !1;
                    }
                else 36 == t.keyCode && t.ctrlKey ? $.datepicker._showDatepicker(this) : (i = !1);
                i && (t.preventDefault(), t.stopPropagation());
            },
            _doKeyPress: function (t) {
                var e = $.datepicker._getInst(t.target);
                if ($.datepicker._get(e, "constrainInput")) {
                    var i = $.datepicker._possibleChars($.datepicker._get(e, "dateFormat")),
                        s = String.fromCharCode(t.charCode == undefined ? t.keyCode : t.charCode);
                    return t.ctrlKey || t.metaKey || s < " " || !i || i.indexOf(s) > -1;
                }
            },
            _doKeyUp: function (t) {
                var e = $.datepicker._getInst(t.target);
                if (e.input.val() != e.lastVal)
                    try {
                        $.datepicker.parseDate($.datepicker._get(e, "dateFormat"), e.input ? e.input.val() : null, $.datepicker._getFormatConfig(e)) &&
                            ($.datepicker._setDateFromField(e), $.datepicker._updateAlternate(e), $.datepicker._updateDatepicker(e));
                    } catch (t) {
                        $.datepicker.log(t);
                    }
                return !0;
            },
            _showDatepicker: function (t) {
                if (("input" != (t = t.target || t).nodeName.toLowerCase() && (t = $("input", t.parentNode)[0]), !$.datepicker._isDisabledDatepicker(t) && $.datepicker._lastInput != t)) {
                    var e = $.datepicker._getInst(t);
                    $.datepicker._curInst && $.datepicker._curInst != e && ($.datepicker._curInst.dpDiv.stop(!0, !0), e && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
                    var i = $.datepicker._get(e, "beforeShow"),
                        s = i ? i.apply(t, [t, e]) : {};
                    if (!1 !== s) {
                        extendRemove(e.settings, s),
                            (e.lastVal = null),
                            ($.datepicker._lastInput = t),
                            $.datepicker._setDateFromField(e),
                            $.datepicker._inDialog && (t.value = ""),
                            $.datepicker._pos || (($.datepicker._pos = $.datepicker._findPos(t)), ($.datepicker._pos[1] += t.offsetHeight));
                        var n = !1;
                        $(t)
                            .parents()
                            .each(function () {
                                return !(n |= "fixed" == $(this).css("position"));
                            }),
                            n && $.browser.opera && (($.datepicker._pos[0] -= document.documentElement.scrollLeft), ($.datepicker._pos[1] -= document.documentElement.scrollTop));
                        var o = { left: $.datepicker._pos[0], top: $.datepicker._pos[1] };
                        if (
                            (($.datepicker._pos = null),
                            e.dpDiv.empty(),
                            e.dpDiv.css({ position: "absolute", display: "block", top: "-1000px" }),
                            $.datepicker._updateDatepicker(e),
                            (o = $.datepicker._checkOffset(e, o, n)),
                            e.dpDiv.css({ position: $.datepicker._inDialog && $.blockUI ? "static" : n ? "fixed" : "absolute", display: "none", left: o.left + "px", top: o.top + "px" }),
                            !e.inline)
                        ) {
                            var a = $.datepicker._get(e, "showAnim"),
                                r = $.datepicker._get(e, "duration"),
                                l = function () {
                                    var t = e.dpDiv.find("iframe.ui-datepicker-cover");
                                    if (t.length) {
                                        var i = $.datepicker._getBorders(e.dpDiv);
                                        t.css({ left: -i[0], top: -i[1], width: e.dpDiv.outerWidth(), height: e.dpDiv.outerHeight() });
                                    }
                                };
                            e.dpDiv.zIndex($(t).zIndex() + 1),
                                ($.datepicker._datepickerShowing = !0),
                                $.effects && $.effects[a] ? e.dpDiv.show(a, $.datepicker._get(e, "showOptions"), r, l) : e.dpDiv[a || "show"](a ? r : null, l),
                                (!a || !r) && l(),
                                e.input.is(":visible") && !e.input.is(":disabled") && e.input.focus(),
                                ($.datepicker._curInst = e);
                        }
                    }
                }
            },
            _updateDatepicker: function (t) {
                this.maxRows = 4;
                var e = $.datepicker._getBorders(t.dpDiv);
                (instActive = t), t.dpDiv.empty().append(this._generateHTML(t)), this._attachHandlers(t);
                var i = t.dpDiv.find("iframe.ui-datepicker-cover");
                !i.length || i.css({ left: -e[0], top: -e[1], width: t.dpDiv.outerWidth(), height: t.dpDiv.outerHeight() }), t.dpDiv.find("." + this._dayOverClass + " a").mouseover();
                var s = this._getNumberOfMonths(t),
                    n = s[1];
                if (
                    (t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),
                    n > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", 17 * n + "em"),
                    t.dpDiv[(1 != s[0] || 1 != s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"),
                    t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"),
                    t == $.datepicker._curInst && $.datepicker._datepickerShowing && t.input && t.input.is(":visible") && !t.input.is(":disabled") && t.input[0] != document.activeElement && t.input.focus(),
                    t.yearshtml)
                ) {
                    var o = t.yearshtml;
                    setTimeout(function () {
                        o === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml), (o = t.yearshtml = null);
                    }, 0);
                }
            },
            _getBorders: function (t) {
                var e = function (t) {
                    return { thin: 1, medium: 2, thick: 3 }[t] || t;
                };
                return [parseFloat(e(t.css("border-left-width"))), parseFloat(e(t.css("border-top-width")))];
            },
            _checkOffset: function (t, e, i) {
                var s = t.dpDiv.outerWidth(),
                    n = t.dpDiv.outerHeight(),
                    o = t.input ? t.input.outerWidth() : 0,
                    a = t.input ? t.input.outerHeight() : 0,
                    r = document.documentElement.clientWidth + (i ? 0 : $(document).scrollLeft()),
                    l = document.documentElement.clientHeight + (i ? 0 : $(document).scrollTop());
                return (
                    (e.left -= this._get(t, "isRTL") ? s - o : 0),
                    (e.left -= i && e.left == t.input.offset().left ? $(document).scrollLeft() : 0),
                    (e.top -= i && e.top == t.input.offset().top + a ? $(document).scrollTop() : 0),
                    (e.left -= Math.min(e.left, e.left + s > r && r > s ? Math.abs(e.left + s - r) : 0)),
                    (e.top -= Math.min(e.top, e.top + n > l && l > n ? Math.abs(n + a) : 0)),
                    e
                );
            },
            _findPos: function (t) {
                for (var e = this._getInst(t), i = this._get(e, "isRTL"); t && ("hidden" == t.type || 1 != t.nodeType || $.expr.filters.hidden(t)); ) t = t[i ? "previousSibling" : "nextSibling"];
                var s = $(t).offset();
                return [s.left, s.top];
            },
            _hideDatepicker: function (t) {
                var e = this._curInst;
                if (e && (!t || e == $.data(t, PROP_NAME)) && this._datepickerShowing) {
                    var i = this._get(e, "showAnim"),
                        s = this._get(e, "duration"),
                        n = function () {
                            $.datepicker._tidyDialog(e);
                        };
                    $.effects && $.effects[i] ? e.dpDiv.hide(i, $.datepicker._get(e, "showOptions"), s, n) : e.dpDiv["slideDown" == i ? "slideUp" : "fadeIn" == i ? "fadeOut" : "hide"](i ? s : null, n),
                        i || n(),
                        (this._datepickerShowing = !1);
                    var o = this._get(e, "onClose");
                    o && o.apply(e.input ? e.input[0] : null, [e.input ? e.input.val() : "", e]),
                        (this._lastInput = null),
                        this._inDialog && (this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" }), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))),
                        (this._inDialog = !1);
                }
            },
            _tidyDialog: function (t) {
                t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
            },
            _checkExternalClick: function (t) {
                if ($.datepicker._curInst) {
                    var e = $(t.target),
                        i = $.datepicker._getInst(e[0]);
                    ((e[0].id != $.datepicker._mainDivId &&
                        0 == e.parents("#" + $.datepicker._mainDivId).length &&
                        !e.hasClass($.datepicker.markerClassName) &&
                        !e.closest("." + $.datepicker._triggerClass).length &&
                        $.datepicker._datepickerShowing &&
                        (!$.datepicker._inDialog || !$.blockUI)) ||
                        (e.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != i)) &&
                        $.datepicker._hideDatepicker();
                }
            },
            _adjustDate: function (t, e, i) {
                var s = $(t),
                    n = this._getInst(s[0]);
                this._isDisabledDatepicker(s[0]) || (this._adjustInstDate(n, e + ("M" == i ? this._get(n, "showCurrentAtPos") : 0), i), this._updateDatepicker(n));
            },
            _gotoToday: function (t) {
                var e = $(t),
                    i = this._getInst(e[0]);
                if (this._get(i, "gotoCurrent") && i.currentDay) (i.selectedDay = i.currentDay), (i.drawMonth = i.selectedMonth = i.currentMonth), (i.drawYear = i.selectedYear = i.currentYear);
                else {
                    var s = new Date();
                    (i.selectedDay = s.getDate()), (i.drawMonth = i.selectedMonth = s.getMonth()), (i.drawYear = i.selectedYear = s.getFullYear());
                }
                this._notifyChange(i), this._adjustDate(e);
            },
            _selectMonthYear: function (t, e, i) {
                var s = $(t),
                    n = this._getInst(s[0]);
                (n["selected" + ("M" == i ? "Month" : "Year")] = n["draw" + ("M" == i ? "Month" : "Year")] = parseInt(e.options[e.selectedIndex].value, 10)), this._notifyChange(n), this._adjustDate(s);
            },
            _selectDay: function (t, e, i, s) {
                var n = $(t);
                if (!$(s).hasClass(this._unselectableClass) && !this._isDisabledDatepicker(n[0])) {
                    var o = this._getInst(n[0]);
                    (o.selectedDay = o.currentDay = $("a", s).html()), (o.selectedMonth = o.currentMonth = e), (o.selectedYear = o.currentYear = i), this._selectDate(t, this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear));
                }
            },
            _clearDate: function (t) {
                var e = $(t);
                this._getInst(e[0]);
                this._selectDate(e, "");
            },
            _selectDate: function (t, e) {
                var i = $(t),
                    s = this._getInst(i[0]);
                (e = null != e ? e : this._formatDate(s)), s.input && s.input.val(e), this._updateAlternate(s);
                var n = this._get(s, "onSelect");
                n ? n.apply(s.input ? s.input[0] : null, [e, s]) : s.input && s.input.trigger("change"),
                    s.inline ? this._updateDatepicker(s) : (this._hideDatepicker(), (this._lastInput = s.input[0]), "object" != typeof s.input[0] && s.input.focus(), (this._lastInput = null));
            },
            _updateAlternate: function (t) {
                var e = this._get(t, "altField");
                if (e) {
                    var i = this._get(t, "altFormat") || this._get(t, "dateFormat"),
                        s = this._getDate(t),
                        n = this.formatDate(i, s, this._getFormatConfig(t));
                    $(e).each(function () {
                        $(this).val(n);
                    });
                }
            },
            noWeekends: function (t) {
                var e = t.getDay();
                return [e > 0 && e < 6, ""];
            },
            iso8601Week: function (t) {
                var e = new Date(t.getTime());
                e.setDate(e.getDate() + 4 - (e.getDay() || 7));
                var i = e.getTime();
                return e.setMonth(0), e.setDate(1), Math.floor(Math.round((i - e) / 864e5) / 7) + 1;
            },
            parseDate: function (t, e, i) {
                if (null == t || null == e) throw "Invalid arguments";
                if ("" == (e = "object" == typeof e ? e.toString() : e + "")) return null;
                var s = (i ? i.shortYearCutoff : null) || this._defaults.shortYearCutoff;
                s = "string" != typeof s ? s : (new Date().getFullYear() % 100) + parseInt(s, 10);
                for (
                    var n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                        o = (i ? i.dayNames : null) || this._defaults.dayNames,
                        a = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                        r = (i ? i.monthNames : null) || this._defaults.monthNames,
                        l = -1,
                        h = -1,
                        c = -1,
                        u = -1,
                        d = !1,
                        p = function (e) {
                            var i = _ + 1 < t.length && t.charAt(_ + 1) == e;
                            return i && _++, i;
                        },
                        f = function (t) {
                            var i = p(t),
                                s = new RegExp("^\\d{1," + ("@" == t ? 14 : "!" == t ? 20 : "y" == t && i ? 4 : "o" == t ? 3 : 2) + "}"),
                                n = e.substring(v).match(s);
                            if (!n) throw "Missing number at position " + v;
                            return (v += n[0].length), parseInt(n[0], 10);
                        },
                        g = function (t, i, s) {
                            var n = $.map(p(t) ? s : i, function (t, e) {
                                    return [[e, t]];
                                }).sort(function (t, e) {
                                    return -(t[1].length - e[1].length);
                                }),
                                o = -1;
                            if (
                                ($.each(n, function (t, i) {
                                    var s = i[1];
                                    if (e.substr(v, s.length).toLowerCase() == s.toLowerCase()) return (o = i[0]), (v += s.length), !1;
                                }),
                                -1 != o)
                            )
                                return o + 1;
                            throw "Unknown name at position " + v;
                        },
                        m = function () {
                            if (e.charAt(v) != t.charAt(_)) throw "Unexpected literal at position " + v;
                            v++;
                        },
                        v = 0,
                        _ = 0;
                    _ < t.length;
                    _++
                )
                    if (d) "'" != t.charAt(_) || p("'") ? m() : (d = !1);
                    else
                        switch (t.charAt(_)) {
                            case "d":
                                c = f("d");
                                break;
                            case "D":
                                g("D", n, o);
                                break;
                            case "o":
                                u = f("o");
                                break;
                            case "m":
                                h = f("m");
                                break;
                            case "M":
                                h = g("M", a, r);
                                break;
                            case "y":
                                l = f("y");
                                break;
                            case "@":
                                (l = (b = new Date(f("@"))).getFullYear()), (h = b.getMonth() + 1), (c = b.getDate());
                                break;
                            case "!":
                                var b;
                                (l = (b = new Date((f("!") - this._ticksTo1970) / 1e4)).getFullYear()), (h = b.getMonth() + 1), (c = b.getDate());
                                break;
                            case "'":
                                p("'") ? m() : (d = !0);
                                break;
                            default:
                                m();
                        }
                if (v < e.length) throw "Extra/unparsed characters found in date: " + e.substring(v);
                if ((-1 == l ? (l = new Date().getFullYear()) : l < 100 && (l += new Date().getFullYear() - (new Date().getFullYear() % 100) + (l <= s ? 0 : -100)), u > -1))
                    for (h = 1, c = u; ; ) {
                        var y = this._getDaysInMonth(l, h - 1);
                        if (c <= y) break;
                        h++, (c -= y);
                    }
                if ((b = this._daylightSavingAdjust(new Date(l, h - 1, c))).getFullYear() != l || b.getMonth() + 1 != h || b.getDate() != c) throw "Invalid date";
                return b;
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
            formatDate: function (t, e, i) {
                if (!e) return "";
                var s = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                    n = (i ? i.dayNames : null) || this._defaults.dayNames,
                    o = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                    a = (i ? i.monthNames : null) || this._defaults.monthNames,
                    r = function (e) {
                        var i = d + 1 < t.length && t.charAt(d + 1) == e;
                        return i && d++, i;
                    },
                    l = function (t, e, i) {
                        var s = "" + e;
                        if (r(t)) for (; s.length < i; ) s = "0" + s;
                        return s;
                    },
                    h = function (t, e, i, s) {
                        return r(t) ? s[e] : i[e];
                    },
                    c = "",
                    u = !1;
                if (e)
                    for (var d = 0; d < t.length; d++)
                        if (u) "'" != t.charAt(d) || r("'") ? (c += t.charAt(d)) : (u = !1);
                        else
                            switch (t.charAt(d)) {
                                case "d":
                                    c += l("d", e.getDate(), 2);
                                    break;
                                case "D":
                                    c += h("D", e.getDay(), s, n);
                                    break;
                                case "o":
                                    c += l("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                                    break;
                                case "m":
                                    c += l("m", e.getMonth() + 1, 2);
                                    break;
                                case "M":
                                    c += h("M", e.getMonth(), o, a);
                                    break;
                                case "y":
                                    c += r("y") ? e.getFullYear() : (e.getYear() % 100 < 10 ? "0" : "") + (e.getYear() % 100);
                                    break;
                                case "@":
                                    c += e.getTime();
                                    break;
                                case "!":
                                    c += 1e4 * e.getTime() + this._ticksTo1970;
                                    break;
                                case "'":
                                    r("'") ? (c += "'") : (u = !0);
                                    break;
                                default:
                                    c += t.charAt(d);
                            }
                return c;
            },
            _possibleChars: function (t) {
                for (
                    var e = "",
                        i = !1,
                        s = function (e) {
                            var i = n + 1 < t.length && t.charAt(n + 1) == e;
                            return i && n++, i;
                        },
                        n = 0;
                    n < t.length;
                    n++
                )
                    if (i) "'" != t.charAt(n) || s("'") ? (e += t.charAt(n)) : (i = !1);
                    else
                        switch (t.charAt(n)) {
                            case "d":
                            case "m":
                            case "y":
                            case "@":
                                e += "0123456789";
                                break;
                            case "D":
                            case "M":
                                return null;
                            case "'":
                                s("'") ? (e += "'") : (i = !0);
                                break;
                            default:
                                e += t.charAt(n);
                        }
                return e;
            },
            _get: function (t, e) {
                return t.settings[e] !== undefined ? t.settings[e] : this._defaults[e];
            },
            _setDateFromField: function (t, e) {
                if (t.input.val() != t.lastVal) {
                    var i,
                        s,
                        n = this._get(t, "dateFormat"),
                        o = (t.lastVal = t.input ? t.input.val() : null);
                    i = s = this._getDefaultDate(t);
                    var a = this._getFormatConfig(t);
                    try {
                        i = this.parseDate(n, o, a) || s;
                    } catch (t) {
                        this.log(t), (o = e ? "" : o);
                    }
                    (t.selectedDay = i.getDate()),
                        (t.drawMonth = t.selectedMonth = i.getMonth()),
                        (t.drawYear = t.selectedYear = i.getFullYear()),
                        (t.currentDay = o ? i.getDate() : 0),
                        (t.currentMonth = o ? i.getMonth() : 0),
                        (t.currentYear = o ? i.getFullYear() : 0),
                        this._adjustInstDate(t);
                }
            },
            _getDefaultDate: function (t) {
                return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date()));
            },
            _determineDate: function (t, e, i) {
                var s =
                    null == e || "" === e
                        ? i
                        : "string" == typeof e
                        ? (function (e) {
                              try {
                                  return $.datepicker.parseDate($.datepicker._get(t, "dateFormat"), e, $.datepicker._getFormatConfig(t));
                              } catch (t) {}
                              for (
                                  var i = (e.toLowerCase().match(/^c/) ? $.datepicker._getDate(t) : null) || new Date(), s = i.getFullYear(), n = i.getMonth(), o = i.getDate(), a = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, r = a.exec(e);
                                  r;

                              ) {
                                  switch (r[2] || "d") {
                                      case "d":
                                      case "D":
                                          o += parseInt(r[1], 10);
                                          break;
                                      case "w":
                                      case "W":
                                          o += 7 * parseInt(r[1], 10);
                                          break;
                                      case "m":
                                      case "M":
                                          (n += parseInt(r[1], 10)), (o = Math.min(o, $.datepicker._getDaysInMonth(s, n)));
                                          break;
                                      case "y":
                                      case "Y":
                                          (s += parseInt(r[1], 10)), (o = Math.min(o, $.datepicker._getDaysInMonth(s, n)));
                                  }
                                  r = a.exec(e);
                              }
                              return new Date(s, n, o);
                          })(e)
                        : "number" == typeof e
                        ? isNaN(e)
                            ? i
                            : (function (t) {
                                  var e = new Date();
                                  return e.setDate(e.getDate() + t), e;
                              })(e)
                        : new Date(e.getTime());
                return (s = s && "Invalid Date" == s.toString() ? i : s) && (s.setHours(0), s.setMinutes(0), s.setSeconds(0), s.setMilliseconds(0)), this._daylightSavingAdjust(s);
            },
            _daylightSavingAdjust: function (t) {
                return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null;
            },
            _setDate: function (t, e, i) {
                var s = !e,
                    n = t.selectedMonth,
                    o = t.selectedYear,
                    a = this._restrictMinMax(t, this._determineDate(t, e, new Date()));
                (t.selectedDay = t.currentDay = a.getDate()),
                    (t.drawMonth = t.selectedMonth = t.currentMonth = a.getMonth()),
                    (t.drawYear = t.selectedYear = t.currentYear = a.getFullYear()),
                    (n != t.selectedMonth || o != t.selectedYear) && !i && this._notifyChange(t),
                    this._adjustInstDate(t),
                    t.input && t.input.val(s ? "" : this._formatDate(t));
            },
            _getDate: function (t) {
                return !t.currentYear || (t.input && "" == t.input.val()) ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
            },
            _attachHandlers: function (t) {
                var e = this._get(t, "stepMonths"),
                    i = "#" + t.id;
                t.dpDiv.find("[data-handler]").map(function () {
                    var t = {
                        prev: function () {
                            window["DP_jQuery_" + dpuuid].datepicker._adjustDate(i, -e, "M");
                        },
                        next: function () {
                            window["DP_jQuery_" + dpuuid].datepicker._adjustDate(i, +e, "M");
                        },
                        hide: function () {
                            window["DP_jQuery_" + dpuuid].datepicker._hideDatepicker();
                        },
                        today: function () {
                            window["DP_jQuery_" + dpuuid].datepicker._gotoToday(i);
                        },
                        selectDay: function () {
                            return window["DP_jQuery_" + dpuuid].datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1;
                        },
                        selectMonth: function () {
                            return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(i, this, "M"), !1;
                        },
                        selectYear: function () {
                            return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(i, this, "Y"), !1;
                        },
                    };
                    $(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")]);
                });
            },
            _generateHTML: function (t) {
                var e = new Date();
                e = this._daylightSavingAdjust(new Date(e.getFullYear(), e.getMonth(), e.getDate()));
                var i = this._get(t, "isRTL"),
                    s = this._get(t, "showButtonPanel"),
                    n = this._get(t, "hideIfNoPrevNext"),
                    o = this._get(t, "navigationAsDateFormat"),
                    a = this._getNumberOfMonths(t),
                    r = this._get(t, "showCurrentAtPos"),
                    l = this._get(t, "stepMonths"),
                    h = 1 != a[0] || 1 != a[1],
                    c = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
                    u = this._getMinMaxDate(t, "min"),
                    d = this._getMinMaxDate(t, "max"),
                    p = t.drawMonth - r,
                    f = t.drawYear;
                if ((p < 0 && ((p += 12), f--), d)) {
                    var g = this._daylightSavingAdjust(new Date(d.getFullYear(), d.getMonth() - a[0] * a[1] + 1, d.getDate()));
                    for (g = u && g < u ? u : g; this._daylightSavingAdjust(new Date(f, p, 1)) > g; ) --p < 0 && ((p = 11), f--);
                }
                (t.drawMonth = p), (t.drawYear = f);
                var m = this._get(t, "prevText");
                m = o ? this.formatDate(m, this._daylightSavingAdjust(new Date(f, p - l, 1)), this._getFormatConfig(t)) : m;
                var v = this._canAdjustMonth(t, -1, f, p)
                        ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + m + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "e" : "w") + '">' + m + "</span></a>"
                        : n
                        ? ""
                        : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + m + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "e" : "w") + '">' + m + "</span></a>",
                    _ = this._get(t, "nextText");
                _ = o ? this.formatDate(_, this._daylightSavingAdjust(new Date(f, p + l, 1)), this._getFormatConfig(t)) : _;
                var b = this._canAdjustMonth(t, 1, f, p)
                        ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + _ + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "w" : "e") + '">' + _ + "</span></a>"
                        : n
                        ? ""
                        : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + _ + '"><span class="ui-icon ui-icon-circle-triangle-' + (i ? "w" : "e") + '">' + _ + "</span></a>",
                    y = this._get(t, "currentText"),
                    w = this._get(t, "gotoCurrent") && t.currentDay ? c : e;
                y = o ? this.formatDate(y, w, this._getFormatConfig(t)) : y;
                var x = t.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(t, "closeText") + "</button>",
                    C = s
                        ? '<div class="ui-datepicker-buttonpane ui-widget-content">' +
                          (i ? x : "") +
                          (this._isInRange(t, w) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + y + "</button>" : "") +
                          (i ? "" : x) +
                          "</div>"
                        : "",
                    k = parseInt(this._get(t, "firstDay"), 10);
                k = isNaN(k) ? 0 : k;
                for (
                    var D = this._get(t, "showWeek"),
                        E = this._get(t, "dayNames"),
                        I = (this._get(t, "dayNamesShort"), this._get(t, "dayNamesMin")),
                        A = this._get(t, "monthNames"),
                        S = this._get(t, "monthNamesShort"),
                        T = this._get(t, "beforeShowDay"),
                        M = this._get(t, "showOtherMonths"),
                        P = this._get(t, "selectOtherMonths"),
                        F = (this._get(t, "calculateWeek") || this.iso8601Week, this._getDefaultDate(t)),
                        O = "",
                        z = 0;
                    z < a[0];
                    z++
                ) {
                    var L = "";
                    this.maxRows = 4;
                    for (var N = 0; N < a[1]; N++) {
                        var H = this._daylightSavingAdjust(new Date(f, p, t.selectedDay)),
                            W = " ui-corner-all",
                            R = "";
                        if (h) {
                            if (((R += '<div class="ui-datepicker-group'), a[1] > 1))
                                switch (N) {
                                    case 0:
                                        (R += " ui-datepicker-group-first"), (W = " ui-corner-" + (i ? "right" : "left"));
                                        break;
                                    case a[1] - 1:
                                        (R += " ui-datepicker-group-last"), (W = " ui-corner-" + (i ? "left" : "right"));
                                        break;
                                    default:
                                        (R += " ui-datepicker-group-middle"), (W = "");
                                }
                            R += '">';
                        }
                        R +=
                            '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' +
                            W +
                            '">' +
                            (/all|left/.test(W) && 0 == z ? (i ? b : v) : "") +
                            (/all|right/.test(W) && 0 == z ? (i ? v : b) : "") +
                            this._generateMonthYearHeader(t, p, f, u, d, z > 0 || N > 0, A, S) +
                            '</div><table class="ui-datepicker-calendar"><thead><tr>';
                        for (var j = D ? '<th class="ui-datepicker-week-col">' + this._get(t, "weekHeader") + "</th>" : "", q = 0; q < 7; q++) {
                            var B = (q + k) % 7;
                            j += "<th" + ((q + k + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + E[B] + '">' + I[B] + "</span></th>";
                        }
                        R += j + "</tr></thead><tbody>";
                        var Y = this._getDaysInMonth(f, p);
                        f == t.selectedYear && p == t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, Y));
                        var V = (this._getFirstDayOfMonth(f, p) - k + 7) % 7,
                            K = Math.ceil((V + Y) / 7),
                            U = h && this.maxRows > K ? this.maxRows : K;
                        this.maxRows = U;
                        for (var Q = this._daylightSavingAdjust(new Date(f, p, 1 - V)), X = 0; X < U; X++) {
                            R += "<tr>";
                            var Z = D ? '<td class="ui-datepicker-week-col">' + this._get(t, "calculateWeek")(Q) + "</td>" : "";
                            for (q = 0; q < 7; q++) {
                                var G = T ? T.apply(t.input ? t.input[0] : null, [Q]) : [!0, ""],
                                    J = Q.getMonth() != p,
                                    tt = (J && !P) || !G[0] || (u && Q < u) || (d && Q > d);
                                (Z +=
                                    '<td class="' +
                                    ((q + k + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") +
                                    (J ? " ui-datepicker-other-month" : "") +
                                    ((Q.getTime() == H.getTime() && p == t.selectedMonth && t._keyEvent) || (F.getTime() == Q.getTime() && F.getTime() == H.getTime()) ? " " + this._dayOverClass : "") +
                                    (tt ? " " + this._unselectableClass + " ui-state-disabled" : "") +
                                    (J && !M ? "" : " " + G[1] + (Q.getTime() == c.getTime() ? " " + this._currentClass : "") + (Q.getTime() == e.getTime() ? " ui-datepicker-today" : "")) +
                                    '"' +
                                    ((J && !M) || !G[2] ? "" : ' title="' + G[2] + '"') +
                                    (tt ? "" : ' data-handler="selectDay" data-event="click" data-month="' + Q.getMonth() + '" data-year="' + Q.getFullYear() + '"') +
                                    ">" +
                                    (J && !M
                                        ? "&#xa0;"
                                        : tt
                                        ? '<span class="ui-state-default">' + Q.getDate() + "</span>"
                                        : '<a class="ui-state-default' +
                                          (Q.getTime() == e.getTime() ? " ui-state-highlight" : "") +
                                          (Q.getTime() == c.getTime() ? " ui-state-active" : "") +
                                          (J ? " ui-priority-secondary" : "") +
                                          '" href="#">' +
                                          Q.getDate() +
                                          "</a>") +
                                    "</td>"),
                                    Q.setDate(Q.getDate() + 1),
                                    (Q = this._daylightSavingAdjust(Q));
                            }
                            R += Z + "</tr>";
                        }
                        ++p > 11 && ((p = 0), f++), (L += R += "</tbody></table>" + (h ? "</div>" + (a[0] > 0 && N == a[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : ""));
                    }
                    O += L;
                }
                return (O += C + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !t.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "")), (t._keyEvent = !1), O;
            },
            _generateMonthYearHeader: function (t, e, i, s, n, o, a, r) {
                var l = this._get(t, "changeMonth"),
                    h = this._get(t, "changeYear"),
                    c = this._get(t, "showMonthAfterYear"),
                    u = '<div class="ui-datepicker-title">',
                    d = "";
                if (o || !l) d += '<span class="ui-datepicker-month">' + a[e] + "</span>";
                else {
                    var p = s && s.getFullYear() == i,
                        f = n && n.getFullYear() == i;
                    d += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
                    for (var g = 0; g < 12; g++) (!p || g >= s.getMonth()) && (!f || g <= n.getMonth()) && (d += '<option value="' + g + '"' + (g == e ? ' selected="selected"' : "") + ">" + r[g] + "</option>");
                    d += "</select>";
                }
                if ((c || (u += d + (!o && l && h ? "" : "&#xa0;")), !t.yearshtml))
                    if (((t.yearshtml = ""), o || !h)) u += '<span class="ui-datepicker-year">' + i + "</span>";
                    else {
                        var m = this._get(t, "yearRange").split(":"),
                            v = new Date().getFullYear(),
                            _ = function (t) {
                                var e = t.match(/c[+-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+-].*/) ? v + parseInt(t, 10) : parseInt(t, 10);
                                return isNaN(e) ? v : e;
                            },
                            b = _(m[0]),
                            y = Math.max(b, _(m[1] || ""));
                        for (b = s ? Math.max(b, s.getFullYear()) : b, y = n ? Math.min(y, n.getFullYear()) : y, t.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">'; b <= y; b++)
                            t.yearshtml += '<option value="' + b + '"' + (b == i ? ' selected="selected"' : "") + ">" + b + "</option>";
                        (t.yearshtml += "</select>"), (u += t.yearshtml), (t.yearshtml = null);
                    }
                return (u += this._get(t, "yearSuffix")), c && (u += (!o && l && h ? "" : "&#xa0;") + d), (u += "</div>");
            },
            _adjustInstDate: function (t, e, i) {
                var s = t.drawYear + ("Y" == i ? e : 0),
                    n = t.drawMonth + ("M" == i ? e : 0),
                    o = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" == i ? e : 0),
                    a = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, o)));
                (t.selectedDay = a.getDate()), (t.drawMonth = t.selectedMonth = a.getMonth()), (t.drawYear = t.selectedYear = a.getFullYear()), ("M" == i || "Y" == i) && this._notifyChange(t);
            },
            _restrictMinMax: function (t, e) {
                var i = this._getMinMaxDate(t, "min"),
                    s = this._getMinMaxDate(t, "max"),
                    n = i && e < i ? i : e;
                return (n = s && n > s ? s : n);
            },
            _notifyChange: function (t) {
                var e = this._get(t, "onChangeMonthYear");
                e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t]);
            },
            _getNumberOfMonths: function (t) {
                var e = this._get(t, "numberOfMonths");
                return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e;
            },
            _getMinMaxDate: function (t, e) {
                return this._determineDate(t, this._get(t, e + "Date"), null);
            },
            _getDaysInMonth: function (t, e) {
                return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate();
            },
            _getFirstDayOfMonth: function (t, e) {
                return new Date(t, e, 1).getDay();
            },
            _canAdjustMonth: function (t, e, i, s) {
                var n = this._getNumberOfMonths(t),
                    o = this._daylightSavingAdjust(new Date(i, s + (e < 0 ? e : n[0] * n[1]), 1));
                return e < 0 && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())), this._isInRange(t, o);
            },
            _isInRange: function (t, e) {
                var i = this._getMinMaxDate(t, "min"),
                    s = this._getMinMaxDate(t, "max");
                return (!i || e.getTime() >= i.getTime()) && (!s || e.getTime() <= s.getTime());
            },
            _getFormatConfig: function (t) {
                var e = this._get(t, "shortYearCutoff");
                return {
                    shortYearCutoff: (e = "string" != typeof e ? e : (new Date().getFullYear() % 100) + parseInt(e, 10)),
                    dayNamesShort: this._get(t, "dayNamesShort"),
                    dayNames: this._get(t, "dayNames"),
                    monthNamesShort: this._get(t, "monthNamesShort"),
                    monthNames: this._get(t, "monthNames"),
                };
            },
            _formatDate: function (t, e, i, s) {
                e || ((t.currentDay = t.selectedDay), (t.currentMonth = t.selectedMonth), (t.currentYear = t.selectedYear));
                var n = e ? ("object" == typeof e ? e : this._daylightSavingAdjust(new Date(s, i, e))) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                return this.formatDate(this._get(t, "dateFormat"), n, this._getFormatConfig(t));
            },
        }),
            ($.fn.datepicker = function (t) {
                if (!this.length) return this;
                $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv), ($.datepicker.initialized = !0));
                var e = Array.prototype.slice.call(arguments, 1);
                return "string" != typeof t || ("isDisabled" != t && "getDate" != t && "widget" != t)
                    ? "option" == t && 2 == arguments.length && "string" == typeof arguments[1]
                        ? $.datepicker["_" + t + "Datepicker"].apply($.datepicker, [this[0]].concat(e))
                        : this.each(function () {
                              "string" == typeof t ? $.datepicker["_" + t + "Datepicker"].apply($.datepicker, [this].concat(e)) : $.datepicker._attachDatepicker(this, t);
                          })
                    : $.datepicker["_" + t + "Datepicker"].apply($.datepicker, [this[0]].concat(e));
            }),
            ($.datepicker = new Datepicker()),
            ($.datepicker.initialized = !1),
            ($.datepicker.uuid = new Date().getTime()),
            ($.datepicker.version = "1.8.22"),
            (window["DP_jQuery_" + dpuuid] = $);
    })(jQuery),
    (function (t, e) {
        var i = "ui-dialog ui-widget ui-widget-content ui-corner-all ",
            s = { buttons: !0, height: !0, maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0, width: !0 },
            n = { maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0 },
            o = t.attrFn || { val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0, click: !0 };
        t.widget("ui.dialog", {
            options: {
                autoOpen: !0,
                buttons: {},
                closeOnEscape: !0,
                closeText: "close",
                dialogClass: "",
                draggable: !0,
                hide: null,
                height: "auto",
                maxHeight: !1,
                maxWidth: !1,
                minHeight: 150,
                minWidth: 150,
                modal: !1,
                position: {
                    my: "center",
                    at: "center",
                    collision: "fit",
                    using: function (e) {
                        var i = t(this).css(e).offset().top;
                        i < 0 && t(this).css("top", e.top - i);
                    },
                },
                resizable: !0,
                show: null,
                stack: !0,
                title: "",
                width: 300,
                zIndex: 1e3,
            },
            _create: function () {
                (this.originalTitle = this.element.attr("title")), "string" != typeof this.originalTitle && (this.originalTitle = ""), (this.options.title = this.options.title || this.originalTitle);
                var e = this,
                    s = e.options,
                    n = s.title || "&#160;",
                    o = t.ui.dialog.getTitleId(e.element),
                    a = (e.uiDialog = t("<div></div>"))
                        .appendTo(document.body)
                        .hide()
                        .addClass(i + s.dialogClass)
                        .css({ zIndex: s.zIndex })
                        .attr("tabIndex", -1)
                        .css("outline", 0)
                        .keydown(function (i) {
                            s.closeOnEscape && !i.isDefaultPrevented() && i.keyCode && i.keyCode === t.ui.keyCode.ESCAPE && (e.close(i), i.preventDefault());
                        })
                        .attr({ role: "dialog", "aria-labelledby": o })
                        .mousedown(function (t) {
                            e.moveToTop(!1, t);
                        }),
                    r =
                        (e.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(a),
                        (e.uiDialogTitlebar = t("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(a)),
                    l = t('<a href="#"></a>')
                        .addClass("ui-dialog-titlebar-close ui-corner-all")
                        .attr("role", "button")
                        .hover(
                            function () {
                                l.addClass("ui-state-hover");
                            },
                            function () {
                                l.removeClass("ui-state-hover");
                            }
                        )
                        .focus(function () {
                            l.addClass("ui-state-focus");
                        })
                        .blur(function () {
                            l.removeClass("ui-state-focus");
                        })
                        .click(function (t) {
                            return e.close(t), !1;
                        })
                        .appendTo(r);
                (e.uiDialogTitlebarCloseText = t("<span></span>")).addClass("ui-icon ui-icon-closethick").text(s.closeText).appendTo(l), t("<span></span>").addClass("ui-dialog-title").attr("id", o).html(n).prependTo(r);
                t.isFunction(s.beforeclose) && !t.isFunction(s.beforeClose) && (s.beforeClose = s.beforeclose),
                    r.find("*").add(r).disableSelection(),
                    s.draggable && t.fn.draggable && e._makeDraggable(),
                    s.resizable && t.fn.resizable && e._makeResizable(),
                    e._createButtons(s.buttons),
                    (e._isOpen = !1),
                    t.fn.bgiframe && a.bgiframe();
            },
            _init: function () {
                this.options.autoOpen && this.open();
            },
            destroy: function () {
                var t = this;
                return (
                    t.overlay && t.overlay.destroy(),
                    t.uiDialog.hide(),
                    t.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),
                    t.uiDialog.remove(),
                    t.originalTitle && t.element.attr("title", t.originalTitle),
                    t
                );
            },
            widget: function () {
                return this.uiDialog;
            },
            close: function (e) {
                var i,
                    s,
                    n = this;
                if (!1 !== n._trigger("beforeClose", e))
                    return (
                        n.overlay && n.overlay.destroy(),
                        n.uiDialog.unbind("keypress.ui-dialog"),
                        (n._isOpen = !1),
                        n.options.hide
                            ? n.uiDialog.hide(n.options.hide, function () {
                                  n._trigger("close", e);
                              })
                            : (n.uiDialog.hide(), n._trigger("close", e)),
                        t.ui.dialog.overlay.resize(),
                        n.options.modal &&
                            ((i = 0),
                            t(".ui-dialog").each(function () {
                                this !== n.uiDialog[0] && ((s = t(this).css("z-index")), isNaN(s) || (i = Math.max(i, s)));
                            }),
                            (t.ui.dialog.maxZ = i)),
                        n
                    );
            },
            isOpen: function () {
                return this._isOpen;
            },
            moveToTop: function (e, i) {
                var s,
                    n = this,
                    o = n.options;
                return (o.modal && !e) || (!o.stack && !o.modal)
                    ? n._trigger("focus", i)
                    : (o.zIndex > t.ui.dialog.maxZ && (t.ui.dialog.maxZ = o.zIndex),
                      n.overlay && ((t.ui.dialog.maxZ += 1), n.overlay.$el.css("z-index", (t.ui.dialog.overlay.maxZ = t.ui.dialog.maxZ))),
                      (s = { scrollTop: n.element.scrollTop(), scrollLeft: n.element.scrollLeft() }),
                      (t.ui.dialog.maxZ += 1),
                      n.uiDialog.css("z-index", t.ui.dialog.maxZ),
                      n.element.attr(s),
                      n._trigger("focus", i),
                      n);
            },
            open: function () {
                if (!this._isOpen) {
                    var e = this,
                        i = e.options,
                        s = e.uiDialog;
                    return (
                        (e.overlay = i.modal ? new t.ui.dialog.overlay(e) : null),
                        e._size(),
                        e._position(i.position),
                        s.show(i.show),
                        e.moveToTop(!0),
                        i.modal &&
                            s.bind("keydown.ui-dialog", function (e) {
                                if (e.keyCode === t.ui.keyCode.TAB) {
                                    var i = t(":tabbable", this),
                                        s = i.filter(":first"),
                                        n = i.filter(":last");
                                    return e.target !== n[0] || e.shiftKey ? (e.target === s[0] && e.shiftKey ? (n.focus(1), !1) : void 0) : (s.focus(1), !1);
                                }
                            }),
                        t(e.element.find(":tabbable").get().concat(s.find(".ui-dialog-buttonpane :tabbable").get().concat(s.get())))
                            .eq(0)
                            .focus(),
                        (e._isOpen = !0),
                        e._trigger("open"),
                        e
                    );
                }
            },
            _createButtons: function (e) {
                var i = this,
                    s = !1,
                    n = t("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
                    a = t("<div></div>").addClass("ui-dialog-buttonset").appendTo(n);
                i.uiDialog.find(".ui-dialog-buttonpane").remove(),
                    "object" == typeof e &&
                        null !== e &&
                        t.each(e, function () {
                            return !(s = !0);
                        }),
                    s &&
                        (t.each(e, function (e, s) {
                            s = t.isFunction(s) ? { click: s, text: e } : s;
                            var n = t('<button type="button"></button>')
                                .click(function () {
                                    s.click.apply(i.element[0], arguments);
                                })
                                .appendTo(a);
                            t.each(s, function (t, e) {
                                "click" !== t && (t in o ? n[t](e) : n.attr(t, e));
                            }),
                                t.fn.button && n.button();
                        }),
                        n.appendTo(i.uiDialog));
            },
            _makeDraggable: function () {
                function e(t) {
                    return { position: t.position, offset: t.offset };
                }
                var i,
                    s = this,
                    n = s.options,
                    o = t(document);
                s.uiDialog.draggable({
                    cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                    handle: ".ui-dialog-titlebar",
                    containment: "document",
                    start: function (o, a) {
                        (i = "auto" === n.height ? "auto" : t(this).height()), t(this).height(t(this).height()).addClass("ui-dialog-dragging"), s._trigger("dragStart", o, e(a));
                    },
                    drag: function (t, i) {
                        s._trigger("drag", t, e(i));
                    },
                    stop: function (a, r) {
                        (n.position = [r.position.left - o.scrollLeft(), r.position.top - o.scrollTop()]), t(this).removeClass("ui-dialog-dragging").height(i), s._trigger("dragStop", a, e(r)), t.ui.dialog.overlay.resize();
                    },
                });
            },
            _makeResizable: function (e) {
                function i(t) {
                    return { originalPosition: t.originalPosition, originalSize: t.originalSize, position: t.position, size: t.size };
                }
                e = void 0 === e ? this.options.resizable : e;
                var s = this,
                    n = s.options,
                    o = s.uiDialog.css("position"),
                    a = "string" == typeof e ? e : "n,e,s,w,se,sw,ne,nw";
                s.uiDialog
                    .resizable({
                        cancel: ".ui-dialog-content",
                        containment: "document",
                        alsoResize: s.element,
                        maxWidth: n.maxWidth,
                        maxHeight: n.maxHeight,
                        minWidth: n.minWidth,
                        minHeight: s._minHeight(),
                        handles: a,
                        start: function (e, n) {
                            t(this).addClass("ui-dialog-resizing"), s._trigger("resizeStart", e, i(n));
                        },
                        resize: function (t, e) {
                            s._trigger("resize", t, i(e));
                        },
                        stop: function (e, o) {
                            t(this).removeClass("ui-dialog-resizing"), (n.height = t(this).height()), (n.width = t(this).width()), s._trigger("resizeStop", e, i(o)), t.ui.dialog.overlay.resize();
                        },
                    })
                    .css("position", o)
                    .find(".ui-resizable-se")
                    .addClass("ui-icon ui-icon-grip-diagonal-se");
            },
            _minHeight: function () {
                var t = this.options;
                return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height);
            },
            _position: function (e) {
                var i,
                    s = [],
                    n = [0, 0];
                e
                    ? (("string" == typeof e || ("object" == typeof e && "0" in e)) &&
                          (1 === (s = e.split ? e.split(" ") : [e[0], e[1]]).length && (s[1] = s[0]),
                          t.each(["left", "top"], function (t, e) {
                              +s[t] === s[t] && ((n[t] = s[t]), (s[t] = e));
                          }),
                          (e = { my: s.join(" "), at: s.join(" "), offset: n.join(" ") })),
                      (e = t.extend({}, t.ui.dialog.prototype.options.position, e)))
                    : (e = t.ui.dialog.prototype.options.position),
                    (i = this.uiDialog.is(":visible")) || this.uiDialog.show(),
                    this.uiDialog.css({ top: 0, left: 0 }).position(t.extend({ of: window }, e)),
                    i || this.uiDialog.hide();
            },
            _setOptions: function (e) {
                var i = this,
                    o = {},
                    a = !1;
                t.each(e, function (t, e) {
                    i._setOption(t, e), t in s && (a = !0), t in n && (o[t] = e);
                }),
                    a && this._size(),
                    this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", o);
            },
            _setOption: function (e, s) {
                var n = this,
                    o = n.uiDialog;
                switch (e) {
                    case "beforeclose":
                        e = "beforeClose";
                        break;
                    case "buttons":
                        n._createButtons(s);
                        break;
                    case "closeText":
                        n.uiDialogTitlebarCloseText.text("" + s);
                        break;
                    case "dialogClass":
                        o.removeClass(n.options.dialogClass).addClass(i + s);
                        break;
                    case "disabled":
                        s ? o.addClass("ui-dialog-disabled") : o.removeClass("ui-dialog-disabled");
                        break;
                    case "draggable":
                        var a = o.is(":data(draggable)");
                        a && !s && o.draggable("destroy"), !a && s && n._makeDraggable();
                        break;
                    case "position":
                        n._position(s);
                        break;
                    case "resizable":
                        var r = o.is(":data(resizable)");
                        r && !s && o.resizable("destroy"), r && "string" == typeof s && o.resizable("option", "handles", s), !r && !1 !== s && n._makeResizable(s);
                        break;
                    case "title":
                        t(".ui-dialog-title", n.uiDialogTitlebar).html("" + (s || "&#160;"));
                }
                t.Widget.prototype._setOption.apply(n, arguments);
            },
            _size: function () {
                var e,
                    i,
                    s = this.options,
                    n = this.uiDialog.is(":visible");
                if (
                    (this.element.show().css({ width: "auto", minHeight: 0, height: 0 }),
                    s.minWidth > s.width && (s.width = s.minWidth),
                    (e = this.uiDialog.css({ height: "auto", width: s.width }).height()),
                    (i = Math.max(0, s.minHeight - e)),
                    "auto" === s.height)
                )
                    if (t.support.minHeight) this.element.css({ minHeight: i, height: "auto" });
                    else {
                        this.uiDialog.show();
                        var o = this.element.css("height", "auto").height();
                        n || this.uiDialog.hide(), this.element.height(Math.max(o, i));
                    }
                else this.element.height(Math.max(s.height - e, 0));
                this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight());
            },
        }),
            t.extend(t.ui.dialog, {
                version: "1.8.22",
                uuid: 0,
                maxZ: 0,
                getTitleId: function (t) {
                    var e = t.attr("id");
                    return e || ((this.uuid += 1), (e = this.uuid)), "ui-dialog-title-" + e;
                },
                overlay: function (e) {
                    this.$el = t.ui.dialog.overlay.create(e);
                },
            }),
            t.extend(t.ui.dialog.overlay, {
                instances: [],
                oldInstances: [],
                maxZ: 0,
                events: t
                    .map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (t) {
                        return t + ".dialog-overlay";
                    })
                    .join(" "),
                create: function (e) {
                    0 === this.instances.length &&
                        (setTimeout(function () {
                            t.ui.dialog.overlay.instances.length &&
                                t(document).bind(t.ui.dialog.overlay.events, function (e) {
                                    if (t(e.target).zIndex() < t.ui.dialog.overlay.maxZ) return !1;
                                });
                        }, 1),
                        t(document).bind("keydown.dialog-overlay", function (i) {
                            e.options.closeOnEscape && !i.isDefaultPrevented() && i.keyCode && i.keyCode === t.ui.keyCode.ESCAPE && (e.close(i), i.preventDefault());
                        }),
                        t(window).bind("resize.dialog-overlay", t.ui.dialog.overlay.resize));
                    var i = (this.oldInstances.pop() || t("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({ width: this.width(), height: this.height() });
                    return t.fn.bgiframe && i.bgiframe(), this.instances.push(i), i;
                },
                destroy: function (e) {
                    var i = t.inArray(e, this.instances);
                    -1 != i && this.oldInstances.push(this.instances.splice(i, 1)[0]), 0 === this.instances.length && t([document, window]).unbind(".dialog-overlay"), e.remove();
                    var s = 0;
                    t.each(this.instances, function () {
                        s = Math.max(s, this.css("z-index"));
                    }),
                        (this.maxZ = s);
                },
                height: function () {
                    var e;
                    return t.browser.msie && t.browser.version < 7
                        ? (e = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)) < Math.max(document.documentElement.offsetHeight, document.body.offsetHeight)
                            ? t(window).height() + "px"
                            : e + "px"
                        : t(document).height() + "px";
                },
                width: function () {
                    var e;
                    return t.browser.msie
                        ? (e = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth)) < Math.max(document.documentElement.offsetWidth, document.body.offsetWidth)
                            ? t(window).width() + "px"
                            : e + "px"
                        : t(document).width() + "px";
                },
                resize: function () {
                    var e = t([]);
                    t.each(t.ui.dialog.overlay.instances, function () {
                        e = e.add(this);
                    }),
                        e.css({ width: 0, height: 0 }).css({ width: t.ui.dialog.overlay.width(), height: t.ui.dialog.overlay.height() });
                },
            }),
            t.extend(t.ui.dialog.overlay.prototype, {
                destroy: function () {
                    t.ui.dialog.overlay.destroy(this.$el);
                },
            });
    })(jQuery),
    (function (t, e) {
        t.ui = t.ui || {};
        var i = /left|center|right/,
            s = /top|center|bottom/,
            n = "center",
            o = {},
            a = t.fn.position,
            r = t.fn.offset;
        (t.fn.position = function (e) {
            if (!e || !e.of) return a.apply(this, arguments);
            e = t.extend({}, e);
            var r,
                l,
                h,
                c = t(e.of),
                u = c[0],
                d = (e.collision || "flip").split(" "),
                p = e.offset ? e.offset.split(" ") : [0, 0];
            return (
                9 === u.nodeType
                    ? ((r = c.width()), (l = c.height()), (h = { top: 0, left: 0 }))
                    : u.setTimeout
                    ? ((r = c.width()), (l = c.height()), (h = { top: c.scrollTop(), left: c.scrollLeft() }))
                    : u.preventDefault
                    ? ((e.at = "left top"), (r = l = 0), (h = { top: e.of.pageY, left: e.of.pageX }))
                    : ((r = c.outerWidth()), (l = c.outerHeight()), (h = c.offset())),
                t.each(["my", "at"], function () {
                    var t = (e[this] || "").split(" ");
                    1 === t.length && (t = i.test(t[0]) ? t.concat([n]) : s.test(t[0]) ? [n].concat(t) : [n, n]), (t[0] = i.test(t[0]) ? t[0] : n), (t[1] = s.test(t[1]) ? t[1] : n), (e[this] = t);
                }),
                1 === d.length && (d[1] = d[0]),
                (p[0] = parseInt(p[0], 10) || 0),
                1 === p.length && (p[1] = p[0]),
                (p[1] = parseInt(p[1], 10) || 0),
                "right" === e.at[0] ? (h.left += r) : e.at[0] === n && (h.left += r / 2),
                "bottom" === e.at[1] ? (h.top += l) : e.at[1] === n && (h.top += l / 2),
                (h.left += p[0]),
                (h.top += p[1]),
                this.each(function () {
                    var i,
                        s = t(this),
                        a = s.outerWidth(),
                        c = s.outerHeight(),
                        u = parseInt(t.curCSS(this, "marginLeft", !0)) || 0,
                        f = parseInt(t.curCSS(this, "marginTop", !0)) || 0,
                        g = a + u + (parseInt(t.curCSS(this, "marginRight", !0)) || 0),
                        m = c + f + (parseInt(t.curCSS(this, "marginBottom", !0)) || 0),
                        v = t.extend({}, h);
                    "right" === e.my[0] ? (v.left -= a) : e.my[0] === n && (v.left -= a / 2),
                        "bottom" === e.my[1] ? (v.top -= c) : e.my[1] === n && (v.top -= c / 2),
                        o.fractions || ((v.left = Math.round(v.left)), (v.top = Math.round(v.top))),
                        (i = { left: v.left - u, top: v.top - f }),
                        t.each(["left", "top"], function (s, n) {
                            t.ui.position[d[s]] && t.ui.position[d[s]][n](v, { targetWidth: r, targetHeight: l, elemWidth: a, elemHeight: c, collisionPosition: i, collisionWidth: g, collisionHeight: m, offset: p, my: e.my, at: e.at });
                        }),
                        t.fn.bgiframe && s.bgiframe(),
                        s.offset(t.extend(v, { using: e.using }));
                })
            );
        }),
            (t.ui.position = {
                fit: {
                    left: function (e, i) {
                        var s = t(window),
                            n = i.collisionPosition.left + i.collisionWidth - s.width() - s.scrollLeft();
                        e.left = n > 0 ? e.left - n : Math.max(e.left - i.collisionPosition.left, e.left);
                    },
                    top: function (e, i) {
                        var s = t(window),
                            n = i.collisionPosition.top + i.collisionHeight - s.height() - s.scrollTop();
                        e.top = n > 0 ? e.top - n : Math.max(e.top - i.collisionPosition.top, e.top);
                    },
                },
                flip: {
                    left: function (e, i) {
                        if (i.at[0] !== n) {
                            var s = t(window),
                                o = i.collisionPosition.left + i.collisionWidth - s.width() - s.scrollLeft(),
                                a = "left" === i.my[0] ? -i.elemWidth : "right" === i.my[0] ? i.elemWidth : 0,
                                r = "left" === i.at[0] ? i.targetWidth : -i.targetWidth,
                                l = -2 * i.offset[0];
                            e.left += i.collisionPosition.left < 0 ? a + r + l : o > 0 ? a + r + l : 0;
                        }
                    },
                    top: function (e, i) {
                        if (i.at[1] !== n) {
                            var s = t(window),
                                o = i.collisionPosition.top + i.collisionHeight - s.height() - s.scrollTop(),
                                a = "top" === i.my[1] ? -i.elemHeight : "bottom" === i.my[1] ? i.elemHeight : 0,
                                r = "top" === i.at[1] ? i.targetHeight : -i.targetHeight,
                                l = -2 * i.offset[1];
                            e.top += i.collisionPosition.top < 0 ? a + r + l : o > 0 ? a + r + l : 0;
                        }
                    },
                },
            }),
            t.offset.setOffset ||
                ((t.offset.setOffset = function (e, i) {
                    /static/.test(t.curCSS(e, "position")) && (e.style.position = "relative");
                    var s = t(e),
                        n = s.offset(),
                        o = parseInt(t.curCSS(e, "top", !0), 10) || 0,
                        a = parseInt(t.curCSS(e, "left", !0), 10) || 0,
                        r = { top: i.top - n.top + o, left: i.left - n.left + a };
                    "using" in i ? i.using.call(e, r) : s.css(r);
                }),
                (t.fn.offset = function (e) {
                    var i = this[0];
                    return i && i.ownerDocument
                        ? e
                            ? t.isFunction(e)
                                ? this.each(function (i) {
                                      t(this).offset(e.call(this, i, t(this).offset()));
                                  })
                                : this.each(function () {
                                      t.offset.setOffset(this, e);
                                  })
                            : r.call(this)
                        : null;
                })),
            (function () {
                var e,
                    i,
                    s,
                    n,
                    a,
                    r = document.getElementsByTagName("body")[0],
                    l = document.createElement("div");
                for (var h in ((e = document.createElement(r ? "div" : "body")),
                (s = { visibility: "hidden", width: 0, height: 0, border: 0, margin: 0, background: "none" }),
                r && t.extend(s, { position: "absolute", left: "-1000px", top: "-1000px" }),
                s))
                    e.style[h] = s[h];
                e.appendChild(l),
                    (i = r || document.documentElement).insertBefore(e, i.firstChild),
                    (l.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;"),
                    (n = t(l)
                        .offset(function (t, e) {
                            return e;
                        })
                        .offset()),
                    (e.innerHTML = ""),
                    i.removeChild(e),
                    (a = n.top + n.left + (r ? 2e3 : 0)),
                    (o.fractions = a > 21 && a < 22);
            })();
    })(jQuery),
    (function (t, e) {
        t.widget("ui.progressbar", {
            options: { value: 0, max: 100 },
            min: 0,
            _create: function () {
                this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({ role: "progressbar", "aria-valuemin": this.min, "aria-valuemax": this.options.max, "aria-valuenow": this._value() }),
                    (this.valueDiv = t("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element)),
                    (this.oldValue = this._value()),
                    this._refreshValue();
            },
            destroy: function () {
                this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),
                    this.valueDiv.remove(),
                    t.Widget.prototype.destroy.apply(this, arguments);
            },
            value: function (t) {
                return void 0 === t ? this._value() : (this._setOption("value", t), this);
            },
            _setOption: function (e, i) {
                "value" === e && ((this.options.value = i), this._refreshValue(), this._value() === this.options.max && this._trigger("complete")), t.Widget.prototype._setOption.apply(this, arguments);
            },
            _value: function () {
                var t = this.options.value;
                return "number" != typeof t && (t = 0), Math.min(this.options.max, Math.max(this.min, t));
            },
            _percentage: function () {
                return (100 * this._value()) / this.options.max;
            },
            _refreshValue: function () {
                var t = this.value(),
                    e = this._percentage();
                this.oldValue !== t && ((this.oldValue = t), this._trigger("change")),
                    this.valueDiv
                        .toggle(t > this.min)
                        .toggleClass("ui-corner-right", t === this.options.max)
                        .width(e.toFixed(0) + "%"),
                    this.element.attr("aria-valuenow", t);
            },
        }),
            t.extend(t.ui.progressbar, { version: "1.8.22" });
    })(jQuery),
    (function (t, e) {
        t.widget("ui.slider", t.ui.mouse, {
            widgetEventPrefix: "slide",
            options: { animate: !1, distance: 0, max: 100, min: 0, orientation: "horizontal", range: !1, step: 1, value: 0, values: null },
            _create: function () {
                var e = this,
                    i = this.options,
                    s = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                    n = (i.values && i.values.length) || 1,
                    o = [];
                (this._keySliding = !1),
                    (this._mouseSliding = !1),
                    (this._animateOff = !0),
                    (this._handleIndex = null),
                    this._detectOrientation(),
                    this._mouseInit(),
                    this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all" + (i.disabled ? " ui-slider-disabled ui-disabled" : "")),
                    (this.range = t([])),
                    i.range &&
                        (!0 === i.range && (i.values || (i.values = [this._valueMin(), this._valueMin()]), i.values.length && 2 !== i.values.length && (i.values = [i.values[0], i.values[0]])),
                        (this.range = t("<div></div>")
                            .appendTo(this.element)
                            .addClass("ui-slider-range ui-widget-header" + ("min" === i.range || "max" === i.range ? " ui-slider-range-" + i.range : ""))));
                for (var a = s.length; a < n; a += 1) o.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");
                (this.handles = s.add(t(o.join("")).appendTo(e.element))),
                    (this.handle = this.handles.eq(0)),
                    this.handles
                        .add(this.range)
                        .filter("a")
                        .click(function (t) {
                            t.preventDefault();
                        })
                        .hover(
                            function () {
                                i.disabled || t(this).addClass("ui-state-hover");
                            },
                            function () {
                                t(this).removeClass("ui-state-hover");
                            }
                        )
                        .focus(function () {
                            i.disabled ? t(this).blur() : (t(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), t(this).addClass("ui-state-focus"));
                        })
                        .blur(function () {
                            t(this).removeClass("ui-state-focus");
                        }),
                    this.handles.each(function (e) {
                        t(this).data("index.ui-slider-handle", e);
                    }),
                    this.handles
                        .keydown(function (i) {
                            var s,
                                n,
                                o,
                                a = t(this).data("index.ui-slider-handle");
                            if (!e.options.disabled) {
                                switch (i.keyCode) {
                                    case t.ui.keyCode.HOME:
                                    case t.ui.keyCode.END:
                                    case t.ui.keyCode.PAGE_UP:
                                    case t.ui.keyCode.PAGE_DOWN:
                                    case t.ui.keyCode.UP:
                                    case t.ui.keyCode.RIGHT:
                                    case t.ui.keyCode.DOWN:
                                    case t.ui.keyCode.LEFT:
                                        if ((i.preventDefault(), !e._keySliding && ((e._keySliding = !0), t(this).addClass("ui-state-active"), !1 === e._start(i, a)))) return;
                                }
                                switch (((o = e.options.step), (s = n = e.options.values && e.options.values.length ? e.values(a) : e.value()), i.keyCode)) {
                                    case t.ui.keyCode.HOME:
                                        n = e._valueMin();
                                        break;
                                    case t.ui.keyCode.END:
                                        n = e._valueMax();
                                        break;
                                    case t.ui.keyCode.PAGE_UP:
                                        n = e._trimAlignValue(s + (e._valueMax() - e._valueMin()) / 5);
                                        break;
                                    case t.ui.keyCode.PAGE_DOWN:
                                        n = e._trimAlignValue(s - (e._valueMax() - e._valueMin()) / 5);
                                        break;
                                    case t.ui.keyCode.UP:
                                    case t.ui.keyCode.RIGHT:
                                        if (s === e._valueMax()) return;
                                        n = e._trimAlignValue(s + o);
                                        break;
                                    case t.ui.keyCode.DOWN:
                                    case t.ui.keyCode.LEFT:
                                        if (s === e._valueMin()) return;
                                        n = e._trimAlignValue(s - o);
                                }
                                e._slide(i, a, n);
                            }
                        })
                        .keyup(function (i) {
                            var s = t(this).data("index.ui-slider-handle");
                            e._keySliding && ((e._keySliding = !1), e._stop(i, s), e._change(i, s), t(this).removeClass("ui-state-active"));
                        }),
                    this._refreshValue(),
                    (this._animateOff = !1);
            },
            destroy: function () {
                return (
                    this.handles.remove(),
                    this.range.remove(),
                    this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"),
                    this._mouseDestroy(),
                    this
                );
            },
            _mouseCapture: function (e) {
                var i,
                    s,
                    n,
                    o,
                    a,
                    r,
                    l,
                    h,
                    c = this.options;
                return (
                    !c.disabled &&
                    ((this.elementSize = { width: this.element.outerWidth(), height: this.element.outerHeight() }),
                    (this.elementOffset = this.element.offset()),
                    (i = { x: e.pageX, y: e.pageY }),
                    (s = this._normValueFromMouse(i)),
                    (n = this._valueMax() - this._valueMin() + 1),
                    (a = this),
                    this.handles.each(function (e) {
                        var i = Math.abs(s - a.values(e));
                        n > i && ((n = i), (o = t(this)), (r = e));
                    }),
                    !0 === c.range && this.values(1) === c.min && ((r += 1), (o = t(this.handles[r]))),
                    !1 !== this._start(e, r) &&
                        ((this._mouseSliding = !0),
                        (a._handleIndex = r),
                        o.addClass("ui-state-active").focus(),
                        (l = o.offset()),
                        (h = !t(e.target).parents().andSelf().is(".ui-slider-handle")),
                        (this._clickOffset = h
                            ? { left: 0, top: 0 }
                            : {
                                  left: e.pageX - l.left - o.width() / 2,
                                  top: e.pageY - l.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0),
                              }),
                        this.handles.hasClass("ui-state-hover") || this._slide(e, r, s),
                        (this._animateOff = !0),
                        !0))
                );
            },
            _mouseStart: function (t) {
                return !0;
            },
            _mouseDrag: function (t) {
                var e = { x: t.pageX, y: t.pageY },
                    i = this._normValueFromMouse(e);
                return this._slide(t, this._handleIndex, i), !1;
            },
            _mouseStop: function (t) {
                return (
                    this.handles.removeClass("ui-state-active"),
                    (this._mouseSliding = !1),
                    this._stop(t, this._handleIndex),
                    this._change(t, this._handleIndex),
                    (this._handleIndex = null),
                    (this._clickOffset = null),
                    (this._animateOff = !1),
                    !1
                );
            },
            _detectOrientation: function () {
                this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal";
            },
            _normValueFromMouse: function (t) {
                var e, i, s, n, o;
                return (
                    "horizontal" === this.orientation
                        ? ((e = this.elementSize.width), (i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)))
                        : ((e = this.elementSize.height), (i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0))),
                    (s = i / e) > 1 && (s = 1),
                    s < 0 && (s = 0),
                    "vertical" === this.orientation && (s = 1 - s),
                    (n = this._valueMax() - this._valueMin()),
                    (o = this._valueMin() + s * n),
                    this._trimAlignValue(o)
                );
            },
            _start: function (t, e) {
                var i = { handle: this.handles[e], value: this.value() };
                return this.options.values && this.options.values.length && ((i.value = this.values(e)), (i.values = this.values())), this._trigger("start", t, i);
            },
            _slide: function (t, e, i) {
                var s, n, o;
                this.options.values && this.options.values.length
                    ? ((s = this.values(e ? 0 : 1)),
                      2 === this.options.values.length && !0 === this.options.range && ((0 === e && i > s) || (1 === e && i < s)) && (i = s),
                      i !== this.values(e) && (((n = this.values())[e] = i), (o = this._trigger("slide", t, { handle: this.handles[e], value: i, values: n })), (s = this.values(e ? 0 : 1)), !1 !== o && this.values(e, i, !0)))
                    : i !== this.value() && !1 !== (o = this._trigger("slide", t, { handle: this.handles[e], value: i })) && this.value(i);
            },
            _stop: function (t, e) {
                var i = { handle: this.handles[e], value: this.value() };
                this.options.values && this.options.values.length && ((i.value = this.values(e)), (i.values = this.values())), this._trigger("stop", t, i);
            },
            _change: function (t, e) {
                if (!this._keySliding && !this._mouseSliding) {
                    var i = { handle: this.handles[e], value: this.value() };
                    this.options.values && this.options.values.length && ((i.value = this.values(e)), (i.values = this.values())), this._trigger("change", t, i);
                }
            },
            value: function (t) {
                return arguments.length ? ((this.options.value = this._trimAlignValue(t)), this._refreshValue(), void this._change(null, 0)) : this._value();
            },
            values: function (e, i) {
                var s, n, o;
                if (arguments.length > 1) return (this.options.values[e] = this._trimAlignValue(i)), this._refreshValue(), void this._change(null, e);
                if (!arguments.length) return this._values();
                if (!t.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(e) : this.value();
                for (s = this.options.values, n = arguments[0], o = 0; o < s.length; o += 1) (s[o] = this._trimAlignValue(n[o])), this._change(null, o);
                this._refreshValue();
            },
            _setOption: function (e, i) {
                var s,
                    n = 0;
                switch ((t.isArray(this.options.values) && (n = this.options.values.length), t.Widget.prototype._setOption.apply(this, arguments), e)) {
                    case "disabled":
                        i
                            ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.propAttr("disabled", !0), this.element.addClass("ui-disabled"))
                            : (this.handles.propAttr("disabled", !1), this.element.removeClass("ui-disabled"));
                        break;
                    case "orientation":
                        this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                        break;
                    case "value":
                        (this._animateOff = !0), this._refreshValue(), this._change(null, 0), (this._animateOff = !1);
                        break;
                    case "values":
                        for (this._animateOff = !0, this._refreshValue(), s = 0; s < n; s += 1) this._change(null, s);
                        this._animateOff = !1;
                }
            },
            _value: function () {
                var t = this.options.value;
                return (t = this._trimAlignValue(t));
            },
            _values: function (t) {
                var e, i, s;
                if (arguments.length) return (e = this.options.values[t]), (e = this._trimAlignValue(e));
                for (i = this.options.values.slice(), s = 0; s < i.length; s += 1) i[s] = this._trimAlignValue(i[s]);
                return i;
            },
            _trimAlignValue: function (t) {
                if (t <= this._valueMin()) return this._valueMin();
                if (t >= this._valueMax()) return this._valueMax();
                var e = this.options.step > 0 ? this.options.step : 1,
                    i = (t - this._valueMin()) % e,
                    s = t - i;
                return 2 * Math.abs(i) >= e && (s += i > 0 ? e : -e), parseFloat(s.toFixed(5));
            },
            _valueMin: function () {
                return this.options.min;
            },
            _valueMax: function () {
                return this.options.max;
            },
            _refreshValue: function () {
                var e,
                    i,
                    s,
                    n,
                    o,
                    a = this.options.range,
                    r = this.options,
                    l = this,
                    h = !this._animateOff && r.animate,
                    c = {};
                this.options.values && this.options.values.length
                    ? this.handles.each(function (s, n) {
                          (e = ((l.values(s) - l._valueMin()) / (l._valueMax() - l._valueMin())) * 100),
                              (c["horizontal" === l.orientation ? "left" : "bottom"] = e + "%"),
                              t(this).stop(1, 1)[h ? "animate" : "css"](c, r.animate),
                              !0 === l.options.range &&
                                  ("horizontal" === l.orientation
                                      ? (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({ left: e + "%" }, r.animate), 1 === s && l.range[h ? "animate" : "css"]({ width: e - i + "%" }, { queue: !1, duration: r.animate }))
                                      : (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({ bottom: e + "%" }, r.animate), 1 === s && l.range[h ? "animate" : "css"]({ height: e - i + "%" }, { queue: !1, duration: r.animate }))),
                              (i = e);
                      })
                    : ((s = this.value()),
                      (n = this._valueMin()),
                      (o = this._valueMax()),
                      (e = o !== n ? ((s - n) / (o - n)) * 100 : 0),
                      (c["horizontal" === l.orientation ? "left" : "bottom"] = e + "%"),
                      this.handle.stop(1, 1)[h ? "animate" : "css"](c, r.animate),
                      "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({ width: e + "%" }, r.animate),
                      "max" === a && "horizontal" === this.orientation && this.range[h ? "animate" : "css"]({ width: 100 - e + "%" }, { queue: !1, duration: r.animate }),
                      "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({ height: e + "%" }, r.animate),
                      "max" === a && "vertical" === this.orientation && this.range[h ? "animate" : "css"]({ height: 100 - e + "%" }, { queue: !1, duration: r.animate }));
            },
        }),
            t.extend(t.ui.slider, { version: "1.8.22" });
    })(jQuery),
    (function (t, e) {
        var i = 0,
            s = 0;
        t.widget("ui.tabs", {
            options: {
                add: null,
                ajaxOptions: null,
                cache: !1,
                cookie: null,
                collapsible: !1,
                disable: null,
                disabled: [],
                enable: null,
                event: "click",
                fx: null,
                idPrefix: "ui-tabs-",
                load: null,
                panelTemplate: "<div></div>",
                remove: null,
                select: null,
                show: null,
                spinner: "<em>Loading&#8230;</em>",
                tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>",
            },
            _create: function () {
                this._tabify(!0);
            },
            _setOption: function (t, e) {
                if ("selected" == t) {
                    if (this.options.collapsible && e == this.options.selected) return;
                    this.select(e);
                } else (this.options[t] = e), this._tabify();
            },
            _tabId: function (t) {
                return (t.title && t.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "")) || this.options.idPrefix + ++i;
            },
            _sanitizeSelector: function (t) {
                return t.replace(/:/g, "\\:");
            },
            _cookie: function () {
                var e = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + ++s);
                return t.cookie.apply(null, [e].concat(t.makeArray(arguments)));
            },
            _ui: function (t, e) {
                return { tab: t, panel: e, index: this.anchors.index(t) };
            },
            _cleanup: function () {
                this.lis
                    .filter(".ui-state-processing")
                    .removeClass("ui-state-processing")
                    .find("span:data(label.tabs)")
                    .each(function () {
                        var e = t(this);
                        e.html(e.data("label.tabs")).removeData("label.tabs");
                    });
            },
            _tabify: function (i) {
                function s(e, i) {
                    e.css("display", ""), !t.support.opacity && i.opacity && e[0].style.removeAttribute("filter");
                }
                var n,
                    o,
                    a = this,
                    r = this.options,
                    l = /^#.+/;
                (this.list = this.element.find("ol,ul").eq(0)),
                    (this.lis = t(" > li:has(a[href])", this.list)),
                    (this.anchors = this.lis.map(function () {
                        return t("a", this)[0];
                    })),
                    (this.panels = t([])),
                    this.anchors.each(function (e, i) {
                        var s,
                            n = t(i).attr("href"),
                            o = n.split("#")[0];
                        if ((o && (o === location.toString().split("#")[0] || ((s = t("base")[0]) && o === s.href)) && ((n = i.hash), (i.href = n)), l.test(n))) a.panels = a.panels.add(a.element.find(a._sanitizeSelector(n)));
                        else if (n && "#" !== n) {
                            t.data(i, "href.tabs", n), t.data(i, "load.tabs", n.replace(/#.*$/, ""));
                            var h = a._tabId(i);
                            i.href = "#" + h;
                            var c = a.element.find("#" + h);
                            c.length ||
                                (c = t(r.panelTemplate)
                                    .attr("id", h)
                                    .addClass("ui-tabs-panel ui-widget-content ui-corner-bottom")
                                    .insertAfter(a.panels[e - 1] || a.list)).data("destroy.tabs", !0),
                                (a.panels = a.panels.add(c));
                        } else r.disabled.push(e);
                    }),
                    i
                        ? (this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"),
                          this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),
                          this.lis.addClass("ui-state-default ui-corner-top"),
                          this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"),
                          r.selected === e
                              ? (location.hash &&
                                    this.anchors.each(function (t, e) {
                                        if (e.hash == location.hash) return (r.selected = t), !1;
                                    }),
                                "number" != typeof r.selected && r.cookie && (r.selected = parseInt(a._cookie(), 10)),
                                "number" != typeof r.selected && this.lis.filter(".ui-tabs-selected").length && (r.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))),
                                (r.selected = r.selected || (this.lis.length ? 0 : -1)))
                              : null === r.selected && (r.selected = -1),
                          (r.selected = (r.selected >= 0 && this.anchors[r.selected]) || r.selected < 0 ? r.selected : 0),
                          (r.disabled = t
                              .unique(
                                  r.disabled.concat(
                                      t.map(this.lis.filter(".ui-state-disabled"), function (t, e) {
                                          return a.lis.index(t);
                                      })
                                  )
                              )
                              .sort()),
                          -1 != t.inArray(r.selected, r.disabled) && r.disabled.splice(t.inArray(r.selected, r.disabled), 1),
                          this.panels.addClass("ui-tabs-hide"),
                          this.lis.removeClass("ui-tabs-selected ui-state-active"),
                          r.selected >= 0 &&
                              this.anchors.length &&
                              (a.element.find(a._sanitizeSelector(a.anchors[r.selected].hash)).removeClass("ui-tabs-hide"),
                              this.lis.eq(r.selected).addClass("ui-tabs-selected ui-state-active"),
                              a.element.queue("tabs", function () {
                                  a._trigger("show", null, a._ui(a.anchors[r.selected], a.element.find(a._sanitizeSelector(a.anchors[r.selected].hash))[0]));
                              }),
                              this.load(r.selected)),
                          t(window).bind("unload", function () {
                              a.lis.add(a.anchors).unbind(".tabs"), (a.lis = a.anchors = a.panels = null);
                          }))
                        : (r.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))),
                    this.element[r.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible"),
                    r.cookie && this._cookie(r.selected, r.cookie);
                for (var h, c = 0; (h = this.lis[c]); c++) t(h)[-1 == t.inArray(c, r.disabled) || t(h).hasClass("ui-tabs-selected") ? "removeClass" : "addClass"]("ui-state-disabled");
                if ((!1 === r.cache && this.anchors.removeData("cache.tabs"), this.lis.add(this.anchors).unbind(".tabs"), "mouseover" !== r.event)) {
                    var u = function (t, e) {
                            e.is(":not(.ui-state-disabled)") && e.addClass("ui-state-" + t);
                        },
                        d = function (t, e) {
                            e.removeClass("ui-state-" + t);
                        };
                    this.lis.bind("mouseover.tabs", function () {
                        u("hover", t(this));
                    }),
                        this.lis.bind("mouseout.tabs", function () {
                            d("hover", t(this));
                        }),
                        this.anchors.bind("focus.tabs", function () {
                            u("focus", t(this).closest("li"));
                        }),
                        this.anchors.bind("blur.tabs", function () {
                            d("focus", t(this).closest("li"));
                        });
                }
                r.fx && (t.isArray(r.fx) ? ((n = r.fx[0]), (o = r.fx[1])) : (n = o = r.fx));
                var p = o
                        ? function (e, i) {
                              t(e).closest("li").addClass("ui-tabs-selected ui-state-active"),
                                  i
                                      .hide()
                                      .removeClass("ui-tabs-hide")
                                      .animate(o, o.duration || "normal", function () {
                                          s(i, o), a._trigger("show", null, a._ui(e, i[0]));
                                      });
                          }
                        : function (e, i) {
                              t(e).closest("li").addClass("ui-tabs-selected ui-state-active"), i.removeClass("ui-tabs-hide"), a._trigger("show", null, a._ui(e, i[0]));
                          },
                    f = n
                        ? function (t, e) {
                              e.animate(n, n.duration || "normal", function () {
                                  a.lis.removeClass("ui-tabs-selected ui-state-active"), e.addClass("ui-tabs-hide"), s(e, n), a.element.dequeue("tabs");
                              });
                          }
                        : function (t, e, i) {
                              a.lis.removeClass("ui-tabs-selected ui-state-active"), e.addClass("ui-tabs-hide"), a.element.dequeue("tabs");
                          };
                this.anchors.bind(r.event + ".tabs", function () {
                    var e = this,
                        i = t(e).closest("li"),
                        s = a.panels.filter(":not(.ui-tabs-hide)"),
                        n = a.element.find(a._sanitizeSelector(e.hash));
                    if (
                        (i.hasClass("ui-tabs-selected") && !r.collapsible) ||
                        i.hasClass("ui-state-disabled") ||
                        i.hasClass("ui-state-processing") ||
                        a.panels.filter(":animated").length ||
                        !1 === a._trigger("select", null, a._ui(this, n[0]))
                    )
                        return this.blur(), !1;
                    if (((r.selected = a.anchors.index(this)), a.abort(), r.collapsible)) {
                        if (i.hasClass("ui-tabs-selected"))
                            return (
                                (r.selected = -1),
                                r.cookie && a._cookie(r.selected, r.cookie),
                                a.element
                                    .queue("tabs", function () {
                                        f(e, s);
                                    })
                                    .dequeue("tabs"),
                                this.blur(),
                                !1
                            );
                        if (!s.length)
                            return (
                                r.cookie && a._cookie(r.selected, r.cookie),
                                a.element.queue("tabs", function () {
                                    p(e, n);
                                }),
                                a.load(a.anchors.index(this)),
                                this.blur(),
                                !1
                            );
                    }
                    if ((r.cookie && a._cookie(r.selected, r.cookie), !n.length)) throw "jQuery UI Tabs: Mismatching fragment identifier.";
                    s.length &&
                        a.element.queue("tabs", function () {
                            f(e, s);
                        }),
                        a.element.queue("tabs", function () {
                            p(e, n);
                        }),
                        a.load(a.anchors.index(this)),
                        t.browser.msie && this.blur();
                }),
                    this.anchors.bind("click.tabs", function () {
                        return !1;
                    });
            },
            _getIndex: function (t) {
                return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))), t;
            },
            destroy: function () {
                var e = this.options;
                return (
                    this.abort(),
                    this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"),
                    this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),
                    this.anchors.each(function () {
                        var e = t.data(this, "href.tabs");
                        e && (this.href = e);
                        var i = t(this).unbind(".tabs");
                        t.each(["href", "load", "cache"], function (t, e) {
                            i.removeData(e + ".tabs");
                        });
                    }),
                    this.lis
                        .unbind(".tabs")
                        .add(this.panels)
                        .each(function () {
                            t.data(this, "destroy.tabs")
                                ? t(this).remove()
                                : t(this).removeClass(
                                      [
                                          "ui-state-default",
                                          "ui-corner-top",
                                          "ui-tabs-selected",
                                          "ui-state-active",
                                          "ui-state-hover",
                                          "ui-state-focus",
                                          "ui-state-disabled",
                                          "ui-tabs-panel",
                                          "ui-widget-content",
                                          "ui-corner-bottom",
                                          "ui-tabs-hide",
                                      ].join(" ")
                                  );
                        }),
                    e.cookie && this._cookie(null, e.cookie),
                    this
                );
            },
            add: function (i, s, n) {
                n === e && (n = this.anchors.length);
                var o = this,
                    a = this.options,
                    r = t(a.tabTemplate.replace(/#\{href\}/g, i).replace(/#\{label\}/g, s)),
                    l = i.indexOf("#") ? this._tabId(t("a", r)[0]) : i.replace("#", "");
                r.addClass("ui-state-default ui-corner-top").data("destroy.tabs", !0);
                var h = o.element.find("#" + l);
                return (
                    h.length || (h = t(a.panelTemplate).attr("id", l).data("destroy.tabs", !0)),
                    h.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"),
                    n >= this.lis.length ? (r.appendTo(this.list), h.appendTo(this.list[0].parentNode)) : (r.insertBefore(this.lis[n]), h.insertBefore(this.panels[n])),
                    (a.disabled = t.map(a.disabled, function (t, e) {
                        return t >= n ? ++t : t;
                    })),
                    this._tabify(),
                    1 == this.anchors.length &&
                        ((a.selected = 0),
                        r.addClass("ui-tabs-selected ui-state-active"),
                        h.removeClass("ui-tabs-hide"),
                        this.element.queue("tabs", function () {
                            o._trigger("show", null, o._ui(o.anchors[0], o.panels[0]));
                        }),
                        this.load(0)),
                    this._trigger("add", null, this._ui(this.anchors[n], this.panels[n])),
                    this
                );
            },
            remove: function (e) {
                e = this._getIndex(e);
                var i = this.options,
                    s = this.lis.eq(e).remove(),
                    n = this.panels.eq(e).remove();
                return (
                    s.hasClass("ui-tabs-selected") && this.anchors.length > 1 && this.select(e + (e + 1 < this.anchors.length ? 1 : -1)),
                    (i.disabled = t.map(
                        t.grep(i.disabled, function (t, i) {
                            return t != e;
                        }),
                        function (t, i) {
                            return t >= e ? --t : t;
                        }
                    )),
                    this._tabify(),
                    this._trigger("remove", null, this._ui(s.find("a")[0], n[0])),
                    this
                );
            },
            enable: function (e) {
                e = this._getIndex(e);
                var i = this.options;
                if (-1 != t.inArray(e, i.disabled))
                    return (
                        this.lis.eq(e).removeClass("ui-state-disabled"),
                        (i.disabled = t.grep(i.disabled, function (t, i) {
                            return t != e;
                        })),
                        this._trigger("enable", null, this._ui(this.anchors[e], this.panels[e])),
                        this
                    );
            },
            disable: function (t) {
                t = this._getIndex(t);
                var e = this.options;
                return t != e.selected && (this.lis.eq(t).addClass("ui-state-disabled"), e.disabled.push(t), e.disabled.sort(), this._trigger("disable", null, this._ui(this.anchors[t], this.panels[t]))), this;
            },
            select: function (t) {
                if (-1 == (t = this._getIndex(t))) {
                    if (!this.options.collapsible || -1 == this.options.selected) return this;
                    t = this.options.selected;
                }
                return this.anchors.eq(t).trigger(this.options.event + ".tabs"), this;
            },
            load: function (e) {
                e = this._getIndex(e);
                var i = this,
                    s = this.options,
                    n = this.anchors.eq(e)[0],
                    o = t.data(n, "load.tabs");
                if ((this.abort(), o && (0 === this.element.queue("tabs").length || !t.data(n, "cache.tabs")))) {
                    if ((this.lis.eq(e).addClass("ui-state-processing"), s.spinner)) {
                        var a = t("span", n);
                        a.data("label.tabs", a.html()).html(s.spinner);
                    }
                    return (
                        (this.xhr = t.ajax(
                            t.extend({}, s.ajaxOptions, {
                                url: o,
                                success: function (o, a) {
                                    i.element.find(i._sanitizeSelector(n.hash)).html(o), i._cleanup(), s.cache && t.data(n, "cache.tabs", !0), i._trigger("load", null, i._ui(i.anchors[e], i.panels[e]));
                                    try {
                                        s.ajaxOptions.success(o, a);
                                    } catch (t) {}
                                },
                                error: function (t, o, a) {
                                    i._cleanup(), i._trigger("load", null, i._ui(i.anchors[e], i.panels[e]));
                                    try {
                                        s.ajaxOptions.error(t, o, e, n);
                                    } catch (a) {}
                                },
                            })
                        )),
                        i.element.dequeue("tabs"),
                        this
                    );
                }
                this.element.dequeue("tabs");
            },
            abort: function () {
                return this.element.queue([]), this.panels.stop(!1, !0), this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2)), this.xhr && (this.xhr.abort(), delete this.xhr), this._cleanup(), this;
            },
            url: function (t, e) {
                return this.anchors.eq(t).removeData("cache.tabs").data("load.tabs", e), this;
            },
            length: function () {
                return this.anchors.length;
            },
        }),
            t.extend(t.ui.tabs, { version: "1.8.22" }),
            t.extend(t.ui.tabs.prototype, {
                rotation: null,
                rotate: function (t, e) {
                    var i = this,
                        s = this.options,
                        n =
                            i._rotate ||
                            (i._rotate = function (e) {
                                clearTimeout(i.rotation),
                                    (i.rotation = setTimeout(function () {
                                        var t = s.selected;
                                        i.select(++t < i.anchors.length ? t : 0);
                                    }, t)),
                                    e && e.stopPropagation();
                            }),
                        o =
                            i._unrotate ||
                            (i._unrotate = e
                                ? function (t) {
                                      n();
                                  }
                                : function (t) {
                                      t.clientX && i.rotate(null);
                                  });
                    return (
                        t
                            ? (this.element.bind("tabsshow", n), this.anchors.bind(s.event + ".tabs", o), n())
                            : (clearTimeout(i.rotation), this.element.unbind("tabsshow", n), this.anchors.unbind(s.event + ".tabs", o), delete this._rotate, delete this._unrotate),
                        this
                    );
                },
            });
    })(jQuery),
    (function (t, e) {
        var i = 0,
            s = {},
            n = {},
            o = Array.prototype.slice,
            a = function (e) {
                return t.isArray(e) ? e : [e];
            },
            r = "default",
            l = "number";
        t.each("branch form header step wrapper".split(" "), function () {
            s[this] = "." + (n[this] = "wizard-" + this);
        }),
            t.widget("kf.wizard", {
                version: "1.0.0",
                options: {
                    animations: { show: { options: { duration: 300 }, properties: { opacity: "show" } }, hide: { options: { duration: 30 }, properties: { opacity: "hide" } } },
                    backward: ".backward",
                    branches: ".branch",
                    disabled: !1,
                    enableSubmit: !1,
                    forward: ".forward",
                    header: ":header:first",
                    initialStep: 0,
                    stateAttribute: "data-state",
                    stepClasses: { current: "current", exclude: "exclude", stop: "stop", submit: "submit", unidirectional: "unidirectional" },
                    steps: ".step",
                    submit: ":submit",
                    transitions: {},
                    unidirectional: !1,
                    afterBackward: null,
                    afterDestroy: null,
                    afterForward: null,
                    afterSelect: null,
                    beforeBackward: null,
                    beforeDestroy: null,
                    beforeForward: null,
                    beforeSelect: null,
                    create: null,
                },
                _create: function () {
                    var e,
                        o,
                        l = this,
                        h = l.options,
                        c = l.element,
                        u = c.find(h.steps).eq(0).parent();
                    c[0].elements ? (e = c) : (e = c.find("form")).length || (e = c.closest("form")),
                        (o = c.find(h.header)).length || (o = e.find(h.header)),
                        (l.elements = {
                            form: e.addClass(n.form),
                            submit: e.find(h.submit),
                            forward: e.find(h.forward),
                            backward: e.find(h.backward),
                            header: o.addClass(n.header),
                            steps: c.find(h.steps).hide().addClass(n.step),
                            branches: c.find(h.branches).add(u).addClass(n.branch),
                            stepsWrapper: u.addClass(n.wrapper),
                            wizard: c.addClass("wizard"),
                        }),
                        u.attr("id") || u.attr("id", "wizard-" + ++i),
                        l.elements.forward.click(function (t) {
                            t.preventDefault(), l.forward(t);
                        }),
                        l.elements.backward.click(function (t) {
                            t.preventDefault(), l.backward(t);
                        }),
                        (l._currentState = { branchesActivated: [], stepsActivated: [] }),
                        (l._stepCount = l.elements.steps.length),
                        (l._lastStepIndex = l._stepCount - 1),
                        (l._branchLabels = []),
                        l.elements.steps.each(function (e) {
                            l._branchLabels[e] = t(this).parent().attr("id");
                        }),
                        (l._excludesFilter = function () {
                            return !t(this).hasClass(h.stepClasses.exclude);
                        }),
                        h.transitions[r] ||
                            (h.transitions[r] = function (t) {
                                return l.stepIndex(t.nextAll(s.step));
                            }),
                        l.select.apply(l, a(h.initialStep));
                },
                _fastForward: function (i, s, n) {
                    var o = 0,
                        a = this,
                        r = a._currentState.stepIndex,
                        l = [r];
                    t.isFunction(s) && ((n = s), (s = e)),
                        (function e() {
                            a._transition(r, function (h, c) {
                                if (-1 === (r = a.stepIndex(h, c))) throw new Error('[_fastForward]: Invalid step "' + h + '"');
                                if (t.inArray(r, l) >= 0) throw new Error('[_fastForward]: Recursion detected on step "' + h + '"');
                                l.push(r), r === a._lastStepIndex || (s ? ++o : r) === i ? n.call(a, r, l) : e();
                            });
                        })();
                },
                _find: function (e, i, s) {
                    var n,
                        o,
                        r,
                        h,
                        c,
                        u = [],
                        d = i instanceof jQuery ? i : t(i);
                    function p(t, e) {
                        if (e === h) return (n = e), !1;
                    }
                    if (null !== e && d.length)
                        for (o = 0, r = (e = a(e)).length; o < r; o++)
                            (n = null),
                                (c = typeof (h = e[o])) === l
                                    ? (n = d.get(h))
                                    : "string" === c
                                    ? (n = document.getElementById(h.replace("#", "")))
                                    : "object" === c && (h instanceof jQuery && h.length && (h = h[0]), h.nodeType && d.each(p)),
                                n && u.push(n);
                    return !1 === s ? u : t(u);
                },
                _move: function (i, s, n, o, a) {
                    var r = this,
                        l = r._currentState;
                    function h(i, s) {
                        a.call(r, i, t.isArray(o) ? o : !1 !== o ? s : e);
                    }
                    "boolean" == typeof s && ((a = o), (o = n), (n = s), (s = e)),
                        !0 === n ? (i > 0 ? r._fastForward(i, n, h) : a.call(r, l.stepsActivated[Math.max(0, i + (l.stepsActivated.length - 1))])) : -1 !== (i = r.stepIndex(i, s)) && (i > l.stepIndex ? r._fastForward(i, h) : h.call(r, i));
                },
                _state: function (e, i) {
                    if (!this.isValidStepIndex(e)) return null;
                    this.options;
                    var n = t.extend(!0, {}, this._currentState);
                    (i = a(i || e)),
                        (n.step = this.elements.steps.eq(e)),
                        (n.branch = n.step.parent()),
                        (n.branchStepCount = n.branch.children(s.step).length),
                        (n.isMovingForward = e > n.stepIndex),
                        (n.stepIndexInBranch = n.branch.children(s.step).index(n.step));
                    for (var o, r, l, h = 0, c = i.length; h < c; h++)
                        (e = i[h]),
                            (o = this._branchLabels[e]),
                            !n.stepIndex || n.stepIndex < e
                                ? t.inArray(e, n.stepsActivated) < 0 && (n.stepsActivated.push(e), t.inArray(o, n.branchesActivated) < 0 && n.branchesActivated.push(o))
                                : n.stepIndex > e &&
                                  ((r = t.inArray(o, n.branchesActivated) + 1),
                                  (l = t.inArray(e, n.stepsActivated) + 1),
                                  r > 0 && n.branchesActivated.splice(r, n.branchesActivated.length - 1),
                                  l > 0 && n.stepsActivated.splice(l, n.stepsActivated.length - 1)),
                            (n.stepIndex = e),
                            (n.branchLabel = o);
                    return (
                        (n.stepsComplete = Math.max(0, this._find(n.stepsActivated, this.elements.steps).filter(this._excludesFilter).length - 1)),
                        (n.stepsPossible = Math.max(0, this._find(n.branchesActivated, this.elements.branches).children(s.step).filter(this._excludesFilter).length - 1)),
                        t.extend(n, {
                            branchLabel: this._branchLabels[e],
                            isFirstStep: 0 === e,
                            isFirstStepInBranch: 0 === n.stepIndexInBranch,
                            isLastStep: e === this._lastStepIndex,
                            isLastStepInBranch: n.stepIndexInBranch === n.branchStepCount - 1,
                            percentComplete: (100 * n.stepsComplete) / n.stepsPossible,
                            stepsRemaining: n.stepsPossible - n.stepsComplete,
                        }),
                        n
                    );
                },
                _transition: function (i, s, n) {
                    var l = this;
                    t.isFunction(i) ? ((n = i), (i = l._currentState.stepIndex), (s = e)) : t.isFunction(s) && ((n = s), (s = e));
                    var h,
                        c = l.options,
                        u = l.step(i, s),
                        d = u.attr(c.stateAttribute),
                        p = d ? c.transitions[d] : c.transitions[r];
                    return (
                        (h = t.isFunction(p)
                            ? p.call(l, u, function () {
                                  return n.apply(l, o.call(arguments));
                              })
                            : d) !== e &&
                            !1 !== h &&
                            n.apply(l, a(h)),
                        h
                    );
                },
                _update: function (e, i) {
                    var s = this._currentState,
                        n = this.options;
                    if (s.step) {
                        if (
                            n.disabled ||
                            !i ||
                            i.stepIndex === s.stepIndex ||
                            !this._trigger("beforeSelect", e, i) ||
                            (i.isMovingForward && !this._trigger("beforeForward", e, i)) ||
                            (!i.isMovingForward && !this._trigger("beforeBackward", e, i))
                        )
                            return;
                        s.step.removeClass(n.stepClasses.current).animate(n.animations.hide.properties, t.extend({}, n.animations.hide.options));
                    }
                    (this._currentState = i),
                        i.step.addClass(n.stepClasses.current).animate(n.animations.show.properties, t.extend({}, n.animations.show.options)),
                        i.isFirstStep || n.unidirectional || i.step.hasClass(n.stepClasses.unidirectional) ? this.elements.backward.attr("disabled", !0) : this.elements.backward.removeAttr("disabled"),
                        (i.isLastStepInBranch && !i.step.attr(n.stateAttribute)) || i.step.hasClass(n.stepClasses.stop) ? this.elements.forward.attr("disabled", !0) : this.elements.forward.removeAttr("disabled"),
                        n.enableSubmit || i.step.hasClass(n.stepClasses.submit) ? this.elements.submit.removeAttr("disabled") : this.elements.submit.attr("disabled", !0),
                        s.step && (this._trigger("afterSelect", e, i), this._trigger(i.isMovingForward ? "afterForward" : "afterBackward", e, i));
                },
                backward: function (t, i) {
                    typeof t === l && ((i = t), (t = e)),
                        i === e && (i = 1),
                        this._currentState.isFirstStep ||
                            typeof i !== l ||
                            this._move(-i, !0, !1, function (e, i) {
                                this._update(t, this._state(e, i));
                            });
                },
                branch: function (t) {
                    return arguments.length ? this._find(t, this.elements.branches) : this._currentState.branch;
                },
                branches: function (t) {
                    return arguments.length ? this.branch(t).children(s.branch) : this.elements.branches;
                },
                branchesActivated: function () {
                    return this._find(this._currentState.branchesActivated, this.elements.branches);
                },
                destroy: function () {
                    var e = this.elements;
                    this._trigger("beforeDestroy", null, this.state()) &&
                        (this.element.removeClass("wizard"),
                        e.form.removeClass(n.form),
                        e.header.removeClass(n.header),
                        e.steps.show().removeClass(n.step),
                        e.stepsWrapper.removeClass(n.wrapper),
                        e.branches.removeClass(n.branch),
                        t.Widget.prototype.destroy.call(this),
                        this._trigger("afterDestroy"));
                },
                form: function () {
                    return this.elements.form;
                },
                forward: function (t, i, s) {
                    typeof t === l && ((s = i), (i = t), (t = e)),
                        i === e && (i = 1),
                        this._currentState.isLastStep ||
                            typeof i !== l ||
                            this._move(i, !0, s, function (e, i) {
                                this._update(t, this._state(e, i));
                            });
                },
                isValidStep: function (t, e) {
                    return this.isValidStepIndex(this.stepIndex(t, e));
                },
                isValidStepIndex: function (t) {
                    return typeof t === l && t >= 0 && t <= this._lastStepIndex;
                },
                stepCount: function () {
                    return this._stepCount;
                },
                select: function (i, s, n, o, a) {
                    i instanceof t.Event || ((a = o), (o = n), (n = s), (s = i), (i = e)),
                        s !== e &&
                            (t.isArray(s) ? ((a = o), (o = n), (n = s[1]), (s = s[0])) : "boolean" == typeof n ? ((a = o), (o = n), (n = e)) : t.isArray(n) && ((a = n), (n = e)),
                            this._move(s, n, o, a, function (t, e) {
                                this._update(i, this._state(t, e));
                            }));
                },
                state: function (i, s, n) {
                    return arguments.length ? (t.isArray(i) ? ((n = s), (s = i[1]), (i = i[0])) : t.isArray(s) && ((n = s), (s = e)), this._state(this.stepIndex(i, s), n)) : this._currentState;
                },
                step: function (i, s) {
                    return arguments.length
                        ? (t.isArray(i) && ((s = i[1]), (i = i[0])),
                          typeof i === l
                              ? (o = this._find(i, s !== e ? this.steps(s) : this.elements.steps))
                              : (o = this._find(i, this.elements.steps.add(this.elements.branches))) && o.hasClass(n.branch) && (o = this._find(s || 0, this.steps(o))),
                          o)
                        : this._currentState.step;
                    var o;
                },
                stepIndex: function (i, n, o) {
                    return arguments.length
                        ? (t.isArray(i) ? ((o = n), (n = i[1]), (i = i[0])) : "boolean" == typeof n && ((o = n), (n = e)), (a = this.step(i, n)) ? (o ? a.siblings(s.step).andSelf() : this.elements.steps).index(a) : -1)
                        : this._currentState.stepIndex;
                    var a;
                },
                steps: function (t) {
                    return arguments.length ? this.branch(t).children(s.step) : this.elements.steps;
                },
                stepsActivated: function () {
                    return this._find(this._currentState.stepsActivated, this.elements.steps);
                },
                submit: function () {
                    this.elements.form.submit();
                },
            });
    })(jQuery),
    (function (t) {
        t.extend(t.fn, {
            validate: function (e) {
                if (this.length) {
                    var i = t.data(this[0], "validator");
                    return (
                        i ||
                        (this.attr("novalidate", "novalidate"),
                        (i = new t.validator(e, this[0])),
                        t.data(this[0], "validator", i),
                        i.settings.onsubmit &&
                            (this.validateDelegate(":submit", "click", function (e) {
                                i.settings.submitHandler && (i.submitButton = e.target), t(e.target).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== t(e.target).attr("formnovalidate") && (i.cancelSubmit = !0);
                            }),
                            this.submit(function (e) {
                                function s() {
                                    var s;
                                    return (
                                        !i.settings.submitHandler ||
                                        (i.submitButton && (s = t("<input type='hidden'/>").attr("name", i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)),
                                        i.settings.submitHandler.call(i, i.currentForm, e),
                                        i.submitButton && s.remove(),
                                        !1)
                                    );
                                }
                                return i.settings.debug && e.preventDefault(), i.cancelSubmit ? ((i.cancelSubmit = !1), s()) : i.form() ? (i.pendingRequest ? ((i.formSubmitted = !0), !1) : s()) : (i.focusInvalid(), !1);
                            })),
                        i)
                    );
                }
                e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.");
            },
            valid: function () {
                if (t(this[0]).is("form")) return this.validate().form();
                var e = !0,
                    i = t(this[0].form).validate();
                return (
                    this.each(function () {
                        e = e && i.element(this);
                    }),
                    e
                );
            },
            removeAttrs: function (e) {
                var i = {},
                    s = this;
                return (
                    t.each(e.split(/\s/), function (t, e) {
                        (i[e] = s.attr(e)), s.removeAttr(e);
                    }),
                    i
                );
            },
            rules: function (e, i) {
                var s = this[0];
                if (e) {
                    var n = t.data(s.form, "validator").settings,
                        o = n.rules,
                        a = t.validator.staticRules(s);
                    switch (e) {
                        case "add":
                            t.extend(a, t.validator.normalizeRule(i)), delete a.messages, (o[s.name] = a), i.messages && (n.messages[s.name] = t.extend(n.messages[s.name], i.messages));
                            break;
                        case "remove":
                            if (!i) return delete o[s.name], a;
                            var r = {};
                            return (
                                t.each(i.split(/\s/), function (t, e) {
                                    (r[e] = a[e]), delete a[e];
                                }),
                                r
                            );
                    }
                }
                var l = t.validator.normalizeRules(t.extend({}, t.validator.classRules(s), t.validator.attributeRules(s), t.validator.dataRules(s), t.validator.staticRules(s)), s);
                if (l.required) {
                    var h = l.required;
                    delete l.required, (l = t.extend({ required: h }, l));
                }
                return l;
            },
        }),
            t.extend(t.expr[":"], {
                blank: function (e) {
                    return !t.trim("" + t(e).val());
                },
                filled: function (e) {
                    return !!t.trim("" + t(e).val());
                },
                unchecked: function (e) {
                    return !t(e).prop("checked");
                },
            }),
            (t.validator = function (e, i) {
                (this.settings = t.extend(!0, {}, t.validator.defaults, e)), (this.currentForm = i), this.init();
            }),
            (t.validator.format = function (e, i) {
                return 1 === arguments.length
                    ? function () {
                          var i = t.makeArray(arguments);
                          return i.unshift(e), t.validator.format.apply(this, i);
                      }
                    : (arguments.length > 2 && i.constructor !== Array && (i = t.makeArray(arguments).slice(1)),
                      i.constructor !== Array && (i = [i]),
                      t.each(i, function (t, i) {
                          e = e.replace(new RegExp("\\{" + t + "\\}", "g"), function () {
                              return i;
                          });
                      }),
                      e);
            }),
            t.extend(t.validator, {
                defaults: {
                    messages: {},
                    groups: {},
                    rules: {},
                    errorClass: "error",
                    validClass: "valid",
                    errorElement: "span",
                    focusInvalid: !0,
                    errorContainer: t([]),
                    errorLabelContainer: t([]),
                    onsubmit: !0,
                    ignore: ":hidden",
                    ignoreTitle: !1,
                    onfocusin: function (t, e) {
                        (this.lastActive = t),
                            this.settings.focusCleanup &&
                                !this.blockFocusCleanup &&
                                (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(t)).hide());
                    },
                    onfocusout: function (t, e) {
                        this.checkable(t) || (!(t.name in this.submitted) && this.optional(t)) || this.element(t);
                    },
                    onkeyup: function (t, e) {
                        (9 === e.which && "" === this.elementValue(t)) || ((t.name in this.submitted || t === this.lastElement) && this.element(t));
                    },
                    onclick: function (t, e) {
                        t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode);
                    },
                    highlight: function (e, i, s) {
                        "radio" === e.type ? this.findByName(e.name).addClass(i).removeClass(s) : t(e).addClass(i).removeClass(s);
                    },
                    unhighlight: function (e, i, s) {
                        "radio" === e.type ? this.findByName(e.name).removeClass(i).addClass(s) : t(e).removeClass(i).addClass(s);
                    },
                },
                setDefaults: function (e) {
                    t.extend(t.validator.defaults, e);
                },
                messages: {
                    required: "Required",
                    remote: "Please fix this field.",
                    email: "Wrong email.",
                    url: "Please enter a valid URL.",
                    date: "Please enter a valid date.",
                    dateISO: "Please enter a valid date (ISO).",
                    number: "Please enter a valid number.",
                    digits: "Please enter only digits.",
                    creditcard: "Please enter a valid credit card number.",
                    equalTo: "Please enter the same value again.",
                    maxlength: t.validator.format("Please enter no more than {0} characters."),
                    minlength: t.validator.format("Please enter at least {0} characters."),
                    rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
                    range: t.validator.format("Please enter a value between {0} and {1}."),
                    max: t.validator.format("Please enter a value less than or equal to {0}."),
                    min: t.validator.format("Please enter a value greater than or equal to {0}."),
                },
                autoCreateRanges: !1,
                prototype: {
                    init: function () {
                        (this.labelContainer = t(this.settings.errorLabelContainer)),
                            (this.errorContext = (this.labelContainer.length && this.labelContainer) || t(this.currentForm)),
                            (this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer)),
                            (this.submitted = {}),
                            (this.valueCache = {}),
                            (this.pendingRequest = 0),
                            (this.pending = {}),
                            (this.invalid = {}),
                            this.reset();
                        var e = (this.groups = {});
                        t.each(this.settings.groups, function (i, s) {
                            "string" == typeof s && (s = s.split(/\s/)),
                                t.each(s, function (t, s) {
                                    e[s] = i;
                                });
                        });
                        var i = this.settings.rules;
                        function s(e) {
                            var i = t.data(this[0].form, "validator"),
                                s = "on" + e.type.replace(/^validate/, "");
                            i && i.settings[s] && i.settings[s].call(i, this[0], e);
                        }
                        t.each(i, function (e, s) {
                            i[e] = t.validator.normalizeRule(s);
                        }),
                            t(this.currentForm)
                                .validateDelegate(
                                    ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ",
                                    "focusin focusout keyup",
                                    s
                                )
                                .validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", s),
                            this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
                    },
                    form: function () {
                        return (
                            this.checkForm(), t.extend(this.submitted, this.errorMap), (this.invalid = t.extend({}, this.errorMap)), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                        );
                    },
                    checkForm: function () {
                        this.prepareForm();
                        for (var t = 0, e = (this.currentElements = this.elements()); e[t]; t++) this.check(e[t]);
                        return this.valid();
                    },
                    element: function (e) {
                        (e = this.validationTargetFor(this.clean(e))), (this.lastElement = e), this.prepareElement(e), (this.currentElements = t(e));
                        var i = !1 !== this.check(e);
                        return i ? delete this.invalid[e.name] : (this.invalid[e.name] = !0), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), i;
                    },
                    showErrors: function (e) {
                        if (e) {
                            for (var i in (t.extend(this.errorMap, e), (this.errorList = []), e)) this.errorList.push({ message: e[i], element: this.findByName(i)[0] });
                            this.successList = t.grep(this.successList, function (t) {
                                return !(t.name in e);
                            });
                        }
                        this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors();
                    },
                    resetForm: function () {
                        t.fn.resetForm && t(this.currentForm).resetForm(),
                            (this.submitted = {}),
                            (this.lastElement = null),
                            this.prepareForm(),
                            this.hideErrors(),
                            this.elements().removeClass(this.settings.errorClass).removeData("previousValue");
                    },
                    numberOfInvalids: function () {
                        return this.objectLength(this.invalid);
                    },
                    objectLength: function (t) {
                        var e = 0;
                        for (var i in t) e++;
                        return e;
                    },
                    hideErrors: function () {
                        this.addWrapper(this.toHide).hide();
                    },
                    valid: function () {
                        return 0 === this.size();
                    },
                    size: function () {
                        return this.errorList.length;
                    },
                    focusInvalid: function () {
                        if (this.settings.focusInvalid)
                            try {
                                t(this.findLastActive() || (this.errorList.length && this.errorList[0].element) || [])
                                    .filter(":visible")
                                    .focus()
                                    .trigger("focusin");
                            } catch (t) {}
                    },
                    findLastActive: function () {
                        var e = this.lastActive;
                        return (
                            e &&
                            1 ===
                                t.grep(this.errorList, function (t) {
                                    return t.element.name === e.name;
                                }).length &&
                            e
                        );
                    },
                    elements: function () {
                        var e = this,
                            i = {};
                        return t(this.currentForm)
                            .find("input, select, textarea")
                            .not(":submit, :reset, :image, [disabled]")
                            .not(this.settings.ignore)
                            .filter(function () {
                                return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), !(this.name in i || !e.objectLength(t(this).rules())) && ((i[this.name] = !0), !0);
                            });
                    },
                    clean: function (e) {
                        return t(e)[0];
                    },
                    errors: function () {
                        var e = this.settings.errorClass.replace(" ", ".");
                        return t(this.settings.errorElement + "." + e, this.errorContext);
                    },
                    reset: function () {
                        (this.successList = []), (this.errorList = []), (this.errorMap = {}), (this.toShow = t([])), (this.toHide = t([])), (this.currentElements = t([]));
                    },
                    prepareForm: function () {
                        this.reset(), (this.toHide = this.errors().add(this.containers));
                    },
                    prepareElement: function (t) {
                        this.reset(), (this.toHide = this.errorsFor(t));
                    },
                    elementValue: function (e) {
                        var i = t(e).attr("type"),
                            s = t(e).val();
                        return "radio" === i || "checkbox" === i ? t("input[name='" + t(e).attr("name") + "']:checked").val() : "string" == typeof s ? s.replace(/\r/g, "") : s;
                    },
                    check: function (e) {
                        e = this.validationTargetFor(this.clean(e));
                        var i,
                            s = t(e).rules(),
                            n = !1,
                            o = this.elementValue(e);
                        for (var a in s) {
                            var r = { method: a, parameters: s[a] };
                            try {
                                if ("dependency-mismatch" === (i = t.validator.methods[a].call(this, o, e, r.parameters))) {
                                    n = !0;
                                    continue;
                                }
                                if (((n = !1), "pending" === i)) return void (this.toHide = this.toHide.not(this.errorsFor(e)));
                                if (!i) return this.formatAndAdd(e, r), !1;
                            } catch (t) {
                                throw (this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + r.method + "' method.", t), t);
                            }
                        }
                        if (!n) return this.objectLength(s) && this.successList.push(e), !0;
                    },
                    customDataMessage: function (e, i) {
                        return t(e).data("msg-" + i.toLowerCase()) || (e.attributes && t(e).attr("data-msg-" + i.toLowerCase()));
                    },
                    customMessage: function (t, e) {
                        var i = this.settings.messages[t];
                        return i && (i.constructor === String ? i : i[e]);
                    },
                    findDefined: function () {
                        for (var t = 0; t < arguments.length; t++) if (void 0 !== arguments[t]) return arguments[t];
                    },
                    defaultMessage: function (e, i) {
                        return this.findDefined(
                            this.customMessage(e.name, i),
                            this.customDataMessage(e, i),
                            (!this.settings.ignoreTitle && e.title) || void 0,
                            t.validator.messages[i],
                            "<strong>Warning: No message defined for " + e.name + "</strong>"
                        );
                    },
                    formatAndAdd: function (e, i) {
                        var s = this.defaultMessage(e, i.method),
                            n = /\$?\{(\d+)\}/g;
                        "function" == typeof s ? (s = s.call(this, i.parameters, e)) : n.test(s) && (s = t.validator.format(s.replace(n, "{$1}"), i.parameters)),
                            this.errorList.push({ message: s, element: e }),
                            (this.errorMap[e.name] = s),
                            (this.submitted[e.name] = s);
                    },
                    addWrapper: function (t) {
                        return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t;
                    },
                    defaultShowErrors: function () {
                        var t, e;
                        for (t = 0; this.errorList[t]; t++) {
                            var i = this.errorList[t];
                            this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message);
                        }
                        if ((this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)) for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
                        if (this.settings.unhighlight) for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                        (this.toHide = this.toHide.not(this.toShow)), this.hideErrors(), this.addWrapper(this.toShow).show();
                    },
                    validElements: function () {
                        return this.currentElements.not(this.invalidElements());
                    },
                    invalidElements: function () {
                        return t(this.errorList).map(function () {
                            return this.element;
                        });
                    },
                    showLabel: function (e, i) {
                        var s = this.errorsFor(e);
                        s.length
                            ? (s.removeClass(this.settings.validClass).addClass(this.settings.errorClass), s.html(i))
                            : ((s = t("<" + this.settings.errorElement + ">")
                                  .attr("for", this.idOrName(e))
                                  .addClass(this.settings.errorClass)
                                  .html(i || "")),
                              this.settings.wrapper &&
                                  (s = s
                                      .hide()
                                      .show()
                                      .wrap("<" + this.settings.wrapper + "/>")
                                      .parent()),
                              this.labelContainer.append(s).length || (this.settings.errorPlacement ? this.settings.errorPlacement(s, t(e)) : s.insertAfter(e))),
                            !i && this.settings.success && (s.text(""), "string" == typeof this.settings.success ? s.addClass(this.settings.success) : this.settings.success(s, e)),
                            (this.toShow = this.toShow.add(s));
                    },
                    errorsFor: function (e) {
                        var i = this.idOrName(e);
                        return this.errors().filter(function () {
                            return t(this).attr("for") === i;
                        });
                    },
                    idOrName: function (t) {
                        return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name);
                    },
                    validationTargetFor: function (t) {
                        return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]), t;
                    },
                    checkable: function (t) {
                        return /radio|checkbox/i.test(t.type);
                    },
                    findByName: function (e) {
                        return t(this.currentForm).find("[name='" + e + "']");
                    },
                    getLength: function (e, i) {
                        switch (i.nodeName.toLowerCase()) {
                            case "select":
                                return t("option:selected", i).length;
                            case "input":
                                if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length;
                        }
                        return e.length;
                    },
                    depend: function (t, e) {
                        return !this.dependTypes[typeof t] || this.dependTypes[typeof t](t, e);
                    },
                    dependTypes: {
                        boolean: function (t, e) {
                            return t;
                        },
                        string: function (e, i) {
                            return !!t(e, i.form).length;
                        },
                        function: function (t, e) {
                            return t(e);
                        },
                    },
                    optional: function (e) {
                        var i = this.elementValue(e);
                        return !t.validator.methods.required.call(this, i, e) && "dependency-mismatch";
                    },
                    startRequest: function (t) {
                        this.pending[t.name] || (this.pendingRequest++, (this.pending[t.name] = !0));
                    },
                    stopRequest: function (e, i) {
                        this.pendingRequest--,
                            this.pendingRequest < 0 && (this.pendingRequest = 0),
                            delete this.pending[e.name],
                            i && 0 === this.pendingRequest && this.formSubmitted && this.form()
                                ? (t(this.currentForm).submit(), (this.formSubmitted = !1))
                                : !i && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), (this.formSubmitted = !1));
                    },
                    previousValue: function (e) {
                        return t.data(e, "previousValue") || t.data(e, "previousValue", { old: null, valid: !0, message: this.defaultMessage(e, "remote") });
                    },
                },
                classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } },
                addClassRules: function (e, i) {
                    e.constructor === String ? (this.classRuleSettings[e] = i) : t.extend(this.classRuleSettings, e);
                },
                classRules: function (e) {
                    var i = {},
                        s = t(e).attr("class");
                    return (
                        s &&
                            t.each(s.split(" "), function () {
                                this in t.validator.classRuleSettings && t.extend(i, t.validator.classRuleSettings[this]);
                            }),
                        i
                    );
                },
                attributeRules: function (e) {
                    var i = {},
                        s = t(e),
                        n = s[0].getAttribute("type");
                    for (var o in t.validator.methods) {
                        var a;
                        "required" === o ? ("" === (a = s.get(0).getAttribute(o)) && (a = !0), (a = !!a)) : (a = s.attr(o)),
                            /min|max/.test(o) && (null === n || /number|range|text/.test(n)) && (a = Number(a)),
                            a ? (i[o] = a) : n === o && "range" !== n && (i[o] = !0);
                    }
                    return i.maxlength && /-1|2147483647|524288/.test(i.maxlength) && delete i.maxlength, i;
                },
                dataRules: function (e) {
                    var i,
                        s,
                        n = {},
                        o = t(e);
                    for (i in t.validator.methods) void 0 !== (s = o.data("rule-" + i.toLowerCase())) && (n[i] = s);
                    return n;
                },
                staticRules: function (e) {
                    var i = {},
                        s = t.data(e.form, "validator");
                    return s.settings.rules && (i = t.validator.normalizeRule(s.settings.rules[e.name]) || {}), i;
                },
                normalizeRules: function (e, i) {
                    return (
                        t.each(e, function (s, n) {
                            if (!1 !== n) {
                                if (n.param || n.depends) {
                                    var o = !0;
                                    switch (typeof n.depends) {
                                        case "string":
                                            o = !!t(n.depends, i.form).length;
                                            break;
                                        case "function":
                                            o = n.depends.call(i, i);
                                    }
                                    o ? (e[s] = void 0 === n.param || n.param) : delete e[s];
                                }
                            } else delete e[s];
                        }),
                        t.each(e, function (s, n) {
                            e[s] = t.isFunction(n) ? n(i) : n;
                        }),
                        t.each(["minlength", "maxlength"], function () {
                            e[this] && (e[this] = Number(e[this]));
                        }),
                        t.each(["rangelength", "range"], function () {
                            var i;
                            e[this] && (t.isArray(e[this]) ? (e[this] = [Number(e[this][0]), Number(e[this][1])]) : "string" == typeof e[this] && ((i = e[this].split(/[\s,]+/)), (e[this] = [Number(i[0]), Number(i[1])])));
                        }),
                        t.validator.autoCreateRanges &&
                            (e.min && e.max && ((e.range = [e.min, e.max]), delete e.min, delete e.max), e.minlength && e.maxlength && ((e.rangelength = [e.minlength, e.maxlength]), delete e.minlength, delete e.maxlength)),
                        e
                    );
                },
                normalizeRule: function (e) {
                    if ("string" == typeof e) {
                        var i = {};
                        t.each(e.split(/\s/), function () {
                            i[this] = !0;
                        }),
                            (e = i);
                    }
                    return e;
                },
                addMethod: function (e, i, s) {
                    (t.validator.methods[e] = i), (t.validator.messages[e] = void 0 !== s ? s : t.validator.messages[e]), i.length < 3 && t.validator.addClassRules(e, t.validator.normalizeRule(e));
                },
                methods: {
                    required: function (e, i, s) {
                        if (!this.depend(s, i)) return "dependency-mismatch";
                        if ("select" === i.nodeName.toLowerCase()) {
                            var n = t(i).val();
                            return n && n.length > 0;
                        }
                        return this.checkable(i) ? this.getLength(e, i) > 0 : t.trim(e).length > 0;
                    },
                    email: function (t, e) {
                        return (
                            this.optional(e) ||
                            /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(
                                t
                            )
                        );
                    },
                    url: function (t, e) {
                        return (
                            this.optional(e) ||
                            /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(
                                t
                            )
                        );
                    },
                    date: function (t, e) {
                        return this.optional(e) || !/Invalid|NaN/.test(new Date(t).toString());
                    },
                    dateISO: function (t, e) {
                        return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t);
                    },
                    number: function (t, e) {
                        return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t);
                    },
                    digits: function (t, e) {
                        return this.optional(e) || /^\d+$/.test(t);
                    },
                    creditcard: function (t, e) {
                        if (this.optional(e)) return "dependency-mismatch";
                        if (/[^0-9 \-]+/.test(t)) return !1;
                        for (var i = 0, s = 0, n = !1, o = (t = t.replace(/\D/g, "")).length - 1; o >= 0; o--) {
                            var a = t.charAt(o);
                            (s = parseInt(a, 10)), n && (s *= 2) > 9 && (s -= 9), (i += s), (n = !n);
                        }
                        return i % 10 == 0;
                    },
                    minlength: function (e, i, s) {
                        var n = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                        return this.optional(i) || n >= s;
                    },
                    maxlength: function (e, i, s) {
                        var n = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                        return this.optional(i) || n <= s;
                    },
                    rangelength: function (e, i, s) {
                        var n = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                        return this.optional(i) || (n >= s[0] && n <= s[1]);
                    },
                    min: function (t, e, i) {
                        return this.optional(e) || t >= i;
                    },
                    max: function (t, e, i) {
                        return this.optional(e) || t <= i;
                    },
                    range: function (t, e, i) {
                        return this.optional(e) || (t >= i[0] && t <= i[1]);
                    },
                    equalTo: function (e, i, s) {
                        var n = t(s);
                        return (
                            this.settings.onfocusout &&
                                n.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                                    t(i).valid();
                                }),
                            e === n.val()
                        );
                    },
                    remote: function (e, i, s) {
                        if (this.optional(i)) return "dependency-mismatch";
                        var n = this.previousValue(i);
                        if (
                            (this.settings.messages[i.name] || (this.settings.messages[i.name] = {}),
                            (n.originalMessage = this.settings.messages[i.name].remote),
                            (this.settings.messages[i.name].remote = n.message),
                            (s = ("string" == typeof s && { url: s }) || s),
                            n.old === e)
                        )
                            return n.valid;
                        n.old = e;
                        var o = this;
                        this.startRequest(i);
                        var a = {};
                        return (
                            (a[i.name] = e),
                            t.ajax(
                                t.extend(
                                    !0,
                                    {
                                        url: s,
                                        mode: "abort",
                                        port: "validate" + i.name,
                                        dataType: "json",
                                        data: a,
                                        success: function (s) {
                                            o.settings.messages[i.name].remote = n.originalMessage;
                                            var a = !0 === s || "true" === s;
                                            if (a) {
                                                var r = o.formSubmitted;
                                                o.prepareElement(i), (o.formSubmitted = r), o.successList.push(i), delete o.invalid[i.name], o.showErrors();
                                            } else {
                                                var l = {},
                                                    h = s || o.defaultMessage(i, "remote");
                                                (l[i.name] = n.message = t.isFunction(h) ? h(e) : h), (o.invalid[i.name] = !0), o.showErrors(l);
                                            }
                                            (n.valid = a), o.stopRequest(i, a);
                                        },
                                    },
                                    s
                                )
                            ),
                            "pending"
                        );
                    },
                },
            }),
            (t.format = t.validator.format);
    })(jQuery),
    (function (t) {
        var e = {};
        if (t.ajaxPrefilter)
            t.ajaxPrefilter(function (t, i, s) {
                var n = t.port;
                "abort" === t.mode && (e[n] && e[n].abort(), (e[n] = s));
            });
        else {
            var i = t.ajax;
            t.ajax = function (s) {
                var n = ("mode" in s ? s : t.ajaxSettings).mode,
                    o = ("port" in s ? s : t.ajaxSettings).port;
                return "abort" === n ? (e[o] && e[o].abort(), (e[o] = i.apply(this, arguments)), e[o]) : i.apply(this, arguments);
            };
        }
    })(jQuery),
    (function (t) {
        t.extend(t.fn, {
            validateDelegate: function (e, i, s) {
                return this.bind(i, function (i) {
                    var n = t(i.target);
                    if (n.is(e)) return s.apply(n, arguments);
                });
            },
        });
    })(jQuery),
    (function (t, e, i) {
        "use strict";
        var s = function (t, i) {
            (this.el_ = this.isString_(t) ? e.querySelectorAll(t) : [t]),
                (this.config_ = []),
                (this.options_ = i),
                (this.selectors_ = []),
                this.init_(),
                (this.destroy = function () {
                    this.loop_(
                        function (t) {
                            t.removeEventListener("reset", this.events.reset), this.removeClasses_(t);
                        },
                        function (t) {
                            this.reset_(t);
                        }
                    );
                }),
                (this.rebuild = function () {
                    this.loop_(null, function (t) {
                        this.floatLabel_(t, !0);
                    });
                });
        };
        (s.prototype = {
            defaults_: {
                customEvent: null,
                customLabel: null,
                customPlaceholder: null,
                exclude: ".no-label",
                inputRegex: /email|number|password|search|tel|text|url/,
                prefix: "fl-",
                prioritize: "label",
                requiredClass: "required",
                style: 0,
                transform: "input,select,textarea",
            },
            init_: function () {
                var t = this;
                t.initEvents_(),
                    t.loop_(
                        function (e, i) {
                            var s = t.config_[i].style;
                            e.addEventListener("reset", t.events.reset), e.classList.add(t.prefixed_("form")), s && e.classList.add(t.prefixed_("style-" + s));
                        },
                        function (e) {
                            t.floatLabel_(e);
                        }
                    );
            },
            initEvents_: function () {
                this.events = { blur: this.onBlur_.bind(this), change: this.onInput_.bind(this), focus: this.onFocus_.bind(this), input: this.onInput_.bind(this), reset: this.onReset_.bind(this) };
            },
            addRemove_: function (t) {
                return t ? "add" : "remove";
            },
            build_: function (t) {
                var e = this.getLabel_(t);
                e &&
                    (t.classList.add(this.prefixed_(t.tagName.toLowerCase())),
                    this.setLabel_(e, t),
                    this.setPlaceholder_(e, t),
                    this.wrapLabel_(e, t),
                    this.handleEvents_(t, "add"),
                    "function" == typeof this.config_[this.current_].customEvent && this.config_[this.current_].customEvent.call(this, t));
            },
            createEl_: function (t, i) {
                var s = "string" == typeof t ? e.createElement(t) : t;
                for (var n in (i = i || {})) i.hasOwnProperty(n) && s.setAttribute(n, i[n]);
                return s;
            },
            extend_: function () {
                var t = [].slice.call(arguments),
                    e = t[0],
                    i = t.slice(1);
                return (
                    Object.keys(i).forEach(function (t) {
                        for (var s in i[t]) i[t].hasOwnProperty(s) && (e[s] = i[t][s]);
                    }),
                    e
                );
            },
            floatLabel_: function (t, e) {
                if (this.isValidField_(t)) {
                    if (this.hasParent_(t)) {
                        if (!0 !== e) return;
                        this.reset_(t);
                    }
                    this.build_(t);
                }
            },
            getLabel_: function (t) {
                var e = 'label[for="' + t.getAttribute("id") + '"]',
                    i = this.el_[this.current_].querySelectorAll(e);
                return i.length > 1 && (i = t.parentNode.querySelectorAll(e)), 1 === i.length && i[0];
            },
            getLabelText_: function (t, e) {
                var i = t.textContent.replace("*", "").trim(),
                    s = e.getAttribute("placeholder");
                return (!i || (i && s && "placeholder" === this.config_[this.current_].prioritize)) && (i = s), i;
            },
            handleEvents_: function (t, e) {
                var i = this.events;
                ["blur", "input", "focus"].forEach(function (s) {
                    "input" !== s || ("file" !== t.type && "SELECT" !== t.nodeName) || (s = "change"), t[e + "EventListener"](s, i[s]);
                });
            },
            hasParent_: function (t) {
                return t.parentNode.classList.contains(this.prefixed_("wrap"));
            },
            isString_: function (t) {
                return "[object String]" === Object.prototype.toString.call(t);
            },
            isValidField_: function (t) {
                var e = "INPUT" === t.tagName && !this.config_[this.current_].inputRegex.test(t.getAttribute("type")),
                    i = "SELECT" === t.tagName && null !== t.getAttribute("multiple");
                return t.getAttribute("id") && !e && !i;
            },
            loop_: function (t, e) {
                for (var i = 0; i < this.el_.length; ++i) {
                    if (void 0 === this.selectors_[i]) {
                        var s = this.extend_({}, this.defaults_, this.options_, this.el_[i].getAttribute("data-options")),
                            n = ":not(" + s.exclude.split(/[\s,]+/).join("):not(") + ")";
                        (this.selectors_[i] = s.transform.replace(/,/g, n + ",") + n), (this.config_[i] = s);
                    }
                    var o = this.el_[i].querySelectorAll(this.selectors_[i]);
                    (this.current_ = i), "function" == typeof t && t.call(this, this.el_[i], i);
                    for (var a = 0; a < o.length; ++a) "function" == typeof e && e.call(this, o[a], i);
                }
            },
            onBlur_: function (t) {
                t.target.parentNode.classList.remove(this.prefixed_("has-focus"));
            },
            onInput_: function (t) {
                t.target.parentNode.classList[this.addRemove_(t.target.value.length)](this.prefixed_("is-active"));
            },
            onFocus_: function (t) {
                t.target.parentNode.classList.add(this.prefixed_("has-focus"));
            },
            onReset_: function () {
                setTimeout(this.resetFields_.bind(this));
            },
            prefixed_: function (t) {
                return this.config_[this.current_].prefix + t;
            },
            removeClasses_: function (t) {
                var e = this.config_[this.current_].prefix,
                    i = t.className.split(" ").filter(function (t) {
                        return 0 !== t.lastIndexOf(e, 0);
                    });
                t.className = i.join(" ").trim();
            },
            reset_: function (t) {
                var i = t.parentNode;
                if (this.hasParent_(t)) {
                    for (var s = e.createDocumentFragment(); i.firstElementChild; ) {
                        var n = i.firstElementChild;
                        this.removeClasses_(n), s.appendChild(n);
                    }
                    i.parentNode.replaceChild(s, i), this.resetPlaceholder_(t), this.handleEvents_(t, "remove");
                }
            },
            resetFields_: function () {
                for (var t = this.el_[this.current_].querySelectorAll(this.selectors_[this.current_]), e = 0; e < t.length; ++e)
                    t[e].parentNode.classList[this.addRemove_("SELECT" === t[e].tagName && "" !== t[e].value)](this.prefixed_("is-active"));
            },
            resetPlaceholder_: function (t) {
                var e = t.getAttribute("data-placeholder");
                null !== e && (t.removeAttribute("data-placeholder"), t.setAttribute("placeholder", e));
            },
            setLabel_: function (t, e) {
                t.classList.add(this.prefixed_("label")),
                    (t.textContent = this.getLabelText_(t, e)),
                    "function" == typeof this.config_[this.current_].customLabel && (t.textContent = this.config_[this.current_].customLabel.call(this, t, e));
            },
            setPlaceholder_: function (t, e) {
                var i = e.getAttribute("placeholder");
                ("label" !== this.config_[this.current_].prioritize && i) || (i && e.setAttribute("data-placeholder", i), (i = this.getLabelText_(t, e))),
                    "function" == typeof this.config_[this.current_].customPlaceholder && (i = this.config_[this.current_].customPlaceholder.call(this, i, e, t)),
                    "SELECT" === e.tagName ? this.setSelectPlaceholder_(e, i) : e.setAttribute("placeholder", i);
            },
            setSelectPlaceholder_: function (t, e) {
                var i = t.firstElementChild;
                i.hasAttribute("value") && i.value ? (t.insertBefore(new Option(e, ""), i), !1 === t.options[t.selectedIndex].defaultSelected && (t.selectedIndex = 0)) : i.setAttribute("value", ""),
                    "" === i.textContent && (i.textContent = e);
            },
            wrapLabel_: function (t, e) {
                var i = this.createEl_("div", { class: this.prefixed_("wrap") + " " + this.prefixed_("wrap-" + e.tagName.toLowerCase()) });
                void 0 !== e.value && e.value.length && i.classList.add(this.prefixed_("is-active")),
                    (null !== e.getAttribute("required") || e.classList.contains(this.config_[this.current_].requiredClass)) && i.classList.add(this.prefixed_("is-required")),
                    e.parentNode.insertBefore(i, e),
                    i.appendChild(t),
                    i.appendChild(e);
            },
        }),
            "function" == typeof define && define.amd
                ? define([], function () {
                      return s;
                  })
                : "object" == typeof module && module.exports
                ? (module.exports = s)
                : (t.FloatLabels = s);
    })(window, document);
