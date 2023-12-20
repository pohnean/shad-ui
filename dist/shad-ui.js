import { computed as M, unref as s, ref as B, shallowRef as Kt, watch as q, getCurrentScope as Fn, onScopeDispose as Mn, shallowReadonly as He, defineComponent as S, mergeProps as V, cloneVNode as Do, h as Ge, toRefs as xe, getCurrentInstance as Te, reactive as Rn, mergeDefaults as Dn, watchEffect as ne, openBlock as _, createElementBlock as j, normalizeStyle as ze, createVNode as I, withCtx as E, renderSlot as P, markRaw as vn, onUnmounted as qt, createBlock as $, readonly as Ut, effectScope as Vo, Fragment as le, nextTick as ee, onBeforeUnmount as Vn, toHandlerKey as Io, camelize as In, onMounted as re, normalizeProps as ge, guardReactiveProps as Ae, createCommentVNode as X, withKeys as Nn, withModifiers as qe, renderList as Vt, resolveDynamicComponent as Ln, Teleport as Gt, createElementVNode as pe, createTextVNode as se, useSlots as No, onBeforeMount as Lo, toDisplayString as ue, inject as ot, provide as rt, customRef as Xt, onBeforeUpdate as zo, onUpdated as jo, withDirectives as Yt, isRef as Jt, vModelSelect as Wo, toRef as Ho, normalizeClass as de, useAttrs as Ko, vModelDynamic as qo, vModelText as Uo } from "vue";
import { useField as Go, useIsFormTouched as Xo } from "vee-validate";
const Yo = ["top", "right", "bottom", "left"], Se = Math.min, Q = Math.max, bt = Math.round, mt = Math.floor, Be = (e) => ({
  x: e,
  y: e
}), Jo = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Zo = {
  start: "end",
  end: "start"
};
function It(e, t, n) {
  return Q(e, Se(t, n));
}
function ye(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function be(e) {
  return e.split("-")[0];
}
function Ye(e) {
  return e.split("-")[1];
}
function Zt(e) {
  return e === "x" ? "y" : "x";
}
function Qt(e) {
  return e === "y" ? "height" : "width";
}
function Je(e) {
  return ["top", "bottom"].includes(be(e)) ? "y" : "x";
}
function en(e) {
  return Zt(Je(e));
}
function Qo(e, t, n) {
  n === void 0 && (n = !1);
  const o = Ye(e), a = en(e), r = Qt(a);
  let l = a === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[r] > t.floating[r] && (l = wt(l)), [l, wt(l)];
}
function er(e) {
  const t = wt(e);
  return [Nt(e), t, Nt(t)];
}
function Nt(e) {
  return e.replace(/start|end/g, (t) => Zo[t]);
}
function tr(e, t, n) {
  const o = ["left", "right"], a = ["right", "left"], r = ["top", "bottom"], l = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? a : o : t ? o : a;
    case "left":
    case "right":
      return t ? r : l;
    default:
      return [];
  }
}
function nr(e, t, n, o) {
  const a = Ye(e);
  let r = tr(be(e), n === "start", o);
  return a && (r = r.map((l) => l + "-" + a), t && (r = r.concat(r.map(Nt)))), r;
}
function wt(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Jo[t]);
}
function or(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function zn(e) {
  return typeof e != "number" ? or(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function xt(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  };
}
function hn(e, t, n) {
  let {
    reference: o,
    floating: a
  } = e;
  const r = Je(t), l = en(t), i = Qt(l), u = be(t), c = r === "y", p = o.x + o.width / 2 - a.width / 2, d = o.y + o.height / 2 - a.height / 2, f = o[i] / 2 - a[i] / 2;
  let m;
  switch (u) {
    case "top":
      m = {
        x: p,
        y: o.y - a.height
      };
      break;
    case "bottom":
      m = {
        x: p,
        y: o.y + o.height
      };
      break;
    case "right":
      m = {
        x: o.x + o.width,
        y: d
      };
      break;
    case "left":
      m = {
        x: o.x - a.width,
        y: d
      };
      break;
    default:
      m = {
        x: o.x,
        y: o.y
      };
  }
  switch (Ye(t)) {
    case "start":
      m[l] -= f * (n && c ? -1 : 1);
      break;
    case "end":
      m[l] += f * (n && c ? -1 : 1);
      break;
  }
  return m;
}
const rr = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: a = "absolute",
    middleware: r = [],
    platform: l
  } = n, i = r.filter(Boolean), u = await (l.isRTL == null ? void 0 : l.isRTL(t));
  let c = await l.getElementRects({
    reference: e,
    floating: t,
    strategy: a
  }), {
    x: p,
    y: d
  } = hn(c, o, u), f = o, m = {}, v = 0;
  for (let h = 0; h < i.length; h++) {
    const {
      name: y,
      fn: g
    } = i[h], {
      x: b,
      y: w,
      data: x,
      reset: O
    } = await g({
      x: p,
      y: d,
      initialPlacement: o,
      placement: f,
      strategy: a,
      middlewareData: m,
      rects: c,
      platform: l,
      elements: {
        reference: e,
        floating: t
      }
    });
    if (p = b ?? p, d = w ?? d, m = {
      ...m,
      [y]: {
        ...m[y],
        ...x
      }
    }, O && v <= 50) {
      v++, typeof O == "object" && (O.placement && (f = O.placement), O.rects && (c = O.rects === !0 ? await l.getElementRects({
        reference: e,
        floating: t,
        strategy: a
      }) : O.rects), {
        x: p,
        y: d
      } = hn(c, f, u)), h = -1;
      continue;
    }
  }
  return {
    x: p,
    y: d,
    placement: f,
    strategy: a,
    middlewareData: m
  };
};
async function at(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: o,
    y: a,
    platform: r,
    rects: l,
    elements: i,
    strategy: u
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: p = "viewport",
    elementContext: d = "floating",
    altBoundary: f = !1,
    padding: m = 0
  } = ye(t, e), v = zn(m), y = i[f ? d === "floating" ? "reference" : "floating" : d], g = xt(await r.getClippingRect({
    element: (n = await (r.isElement == null ? void 0 : r.isElement(y))) == null || n ? y : y.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(i.floating)),
    boundary: c,
    rootBoundary: p,
    strategy: u
  })), b = d === "floating" ? {
    ...l.floating,
    x: o,
    y: a
  } : l.reference, w = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(i.floating)), x = await (r.isElement == null ? void 0 : r.isElement(w)) ? await (r.getScale == null ? void 0 : r.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, O = xt(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: b,
    offsetParent: w,
    strategy: u
  }) : b);
  return {
    top: (g.top - O.top + v.top) / x.y,
    bottom: (O.bottom - g.bottom + v.bottom) / x.y,
    left: (g.left - O.left + v.left) / x.x,
    right: (O.right - g.right + v.right) / x.x
  };
}
const ar = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: o,
      placement: a,
      rects: r,
      platform: l,
      elements: i,
      middlewareData: u
    } = t, {
      element: c,
      padding: p = 0
    } = ye(e, t) || {};
    if (c == null)
      return {};
    const d = zn(p), f = {
      x: n,
      y: o
    }, m = en(a), v = Qt(m), h = await l.getDimensions(c), y = m === "y", g = y ? "top" : "left", b = y ? "bottom" : "right", w = y ? "clientHeight" : "clientWidth", x = r.reference[v] + r.reference[m] - f[m] - r.floating[v], O = f[m] - r.reference[m], k = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(c));
    let T = k ? k[w] : 0;
    (!T || !await (l.isElement == null ? void 0 : l.isElement(k))) && (T = i.floating[w] || r.floating[v]);
    const R = x / 2 - O / 2, N = T / 2 - h[v] / 2 - 1, C = Se(d[g], N), F = Se(d[b], N), A = C, G = T - h[v] - F, L = T / 2 - h[v] / 2 + R, H = It(A, L, G), K = !u.arrow && Ye(a) != null && L != H && r.reference[v] / 2 - (L < A ? C : F) - h[v] / 2 < 0, Z = K ? L < A ? L - A : L - G : 0;
    return {
      [m]: f[m] + Z,
      data: {
        [m]: H,
        centerOffset: L - H - Z,
        ...K && {
          alignmentOffset: Z
        }
      },
      reset: K
    };
  }
}), lr = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: a,
        middlewareData: r,
        rects: l,
        initialPlacement: i,
        platform: u,
        elements: c
      } = t, {
        mainAxis: p = !0,
        crossAxis: d = !0,
        fallbackPlacements: f,
        fallbackStrategy: m = "bestFit",
        fallbackAxisSideDirection: v = "none",
        flipAlignment: h = !0,
        ...y
      } = ye(e, t);
      if ((n = r.arrow) != null && n.alignmentOffset)
        return {};
      const g = be(a), b = be(i) === i, w = await (u.isRTL == null ? void 0 : u.isRTL(c.floating)), x = f || (b || !h ? [wt(i)] : er(i));
      !f && v !== "none" && x.push(...nr(i, h, v, w));
      const O = [i, ...x], k = await at(t, y), T = [];
      let R = ((o = r.flip) == null ? void 0 : o.overflows) || [];
      if (p && T.push(k[g]), d) {
        const A = Qo(a, l, w);
        T.push(k[A[0]], k[A[1]]);
      }
      if (R = [...R, {
        placement: a,
        overflows: T
      }], !T.every((A) => A <= 0)) {
        var N, C;
        const A = (((N = r.flip) == null ? void 0 : N.index) || 0) + 1, G = O[A];
        if (G)
          return {
            data: {
              index: A,
              overflows: R
            },
            reset: {
              placement: G
            }
          };
        let L = (C = R.filter((H) => H.overflows[0] <= 0).sort((H, K) => H.overflows[1] - K.overflows[1])[0]) == null ? void 0 : C.placement;
        if (!L)
          switch (m) {
            case "bestFit": {
              var F;
              const H = (F = R.map((K) => [K.placement, K.overflows.filter((Z) => Z > 0).reduce((Z, _e) => Z + _e, 0)]).sort((K, Z) => K[1] - Z[1])[0]) == null ? void 0 : F[0];
              H && (L = H);
              break;
            }
            case "initialPlacement":
              L = i;
              break;
          }
        if (a !== L)
          return {
            reset: {
              placement: L
            }
          };
      }
      return {};
    }
  };
};
function gn(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function yn(e) {
  return Yo.some((t) => e[t] >= 0);
}
const ir = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: o = "referenceHidden",
        ...a
      } = ye(e, t);
      switch (o) {
        case "referenceHidden": {
          const r = await at(t, {
            ...a,
            elementContext: "reference"
          }), l = gn(r, n.reference);
          return {
            data: {
              referenceHiddenOffsets: l,
              referenceHidden: yn(l)
            }
          };
        }
        case "escaped": {
          const r = await at(t, {
            ...a,
            altBoundary: !0
          }), l = gn(r, n.floating);
          return {
            data: {
              escapedOffsets: l,
              escaped: yn(l)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function sr(e, t) {
  const {
    placement: n,
    platform: o,
    elements: a
  } = e, r = await (o.isRTL == null ? void 0 : o.isRTL(a.floating)), l = be(n), i = Ye(n), u = Je(n) === "y", c = ["left", "top"].includes(l) ? -1 : 1, p = r && u ? -1 : 1, d = ye(t, e);
  let {
    mainAxis: f,
    crossAxis: m,
    alignmentAxis: v
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...d
  };
  return i && typeof v == "number" && (m = i === "end" ? v * -1 : v), u ? {
    x: m * p,
    y: f * c
  } : {
    x: f * c,
    y: m * p
  };
}
const ur = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, o;
      const {
        x: a,
        y: r,
        placement: l,
        middlewareData: i
      } = t, u = await sr(t, e);
      return l === ((n = i.offset) == null ? void 0 : n.placement) && (o = i.arrow) != null && o.alignmentOffset ? {} : {
        x: a + u.x,
        y: r + u.y,
        data: {
          ...u,
          placement: l
        }
      };
    }
  };
}, dr = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: o,
        placement: a
      } = t, {
        mainAxis: r = !0,
        crossAxis: l = !1,
        limiter: i = {
          fn: (y) => {
            let {
              x: g,
              y: b
            } = y;
            return {
              x: g,
              y: b
            };
          }
        },
        ...u
      } = ye(e, t), c = {
        x: n,
        y: o
      }, p = await at(t, u), d = Je(be(a)), f = Zt(d);
      let m = c[f], v = c[d];
      if (r) {
        const y = f === "y" ? "top" : "left", g = f === "y" ? "bottom" : "right", b = m + p[y], w = m - p[g];
        m = It(b, m, w);
      }
      if (l) {
        const y = d === "y" ? "top" : "left", g = d === "y" ? "bottom" : "right", b = v + p[y], w = v - p[g];
        v = It(b, v, w);
      }
      const h = i.fn({
        ...t,
        [f]: m,
        [d]: v
      });
      return {
        ...h,
        data: {
          x: h.x - n,
          y: h.y - o
        }
      };
    }
  };
}, cr = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: o,
        placement: a,
        rects: r,
        middlewareData: l
      } = t, {
        offset: i = 0,
        mainAxis: u = !0,
        crossAxis: c = !0
      } = ye(e, t), p = {
        x: n,
        y: o
      }, d = Je(a), f = Zt(d);
      let m = p[f], v = p[d];
      const h = ye(i, t), y = typeof h == "number" ? {
        mainAxis: h,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...h
      };
      if (u) {
        const w = f === "y" ? "height" : "width", x = r.reference[f] - r.floating[w] + y.mainAxis, O = r.reference[f] + r.reference[w] - y.mainAxis;
        m < x ? m = x : m > O && (m = O);
      }
      if (c) {
        var g, b;
        const w = f === "y" ? "width" : "height", x = ["top", "left"].includes(be(a)), O = r.reference[d] - r.floating[w] + (x && ((g = l.offset) == null ? void 0 : g[d]) || 0) + (x ? 0 : y.crossAxis), k = r.reference[d] + r.reference[w] + (x ? 0 : ((b = l.offset) == null ? void 0 : b[d]) || 0) - (x ? y.crossAxis : 0);
        v < O ? v = O : v > k && (v = k);
      }
      return {
        [f]: m,
        [d]: v
      };
    }
  };
}, pr = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      const {
        placement: n,
        rects: o,
        platform: a,
        elements: r
      } = t, {
        apply: l = () => {
        },
        ...i
      } = ye(e, t), u = await at(t, i), c = be(n), p = Ye(n), d = Je(n) === "y", {
        width: f,
        height: m
      } = o.floating;
      let v, h;
      c === "top" || c === "bottom" ? (v = c, h = p === (await (a.isRTL == null ? void 0 : a.isRTL(r.floating)) ? "start" : "end") ? "left" : "right") : (h = c, v = p === "end" ? "top" : "bottom");
      const y = m - u[v], g = f - u[h], b = !t.middlewareData.shift;
      let w = y, x = g;
      if (d) {
        const k = f - u.left - u.right;
        x = p || b ? Se(g, k) : k;
      } else {
        const k = m - u.top - u.bottom;
        w = p || b ? Se(y, k) : k;
      }
      if (b && !p) {
        const k = Q(u.left, 0), T = Q(u.right, 0), R = Q(u.top, 0), N = Q(u.bottom, 0);
        d ? x = f - 2 * (k !== 0 || T !== 0 ? k + T : Q(u.left, u.right)) : w = m - 2 * (R !== 0 || N !== 0 ? R + N : Q(u.top, u.bottom));
      }
      await l({
        ...t,
        availableWidth: x,
        availableHeight: w
      });
      const O = await a.getDimensions(r.floating);
      return f !== O.width || m !== O.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Pe(e) {
  return jn(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function te(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ce(e) {
  var t;
  return (t = (jn(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function jn(e) {
  return e instanceof Node || e instanceof te(e).Node;
}
function we(e) {
  return e instanceof Element || e instanceof te(e).Element;
}
function ce(e) {
  return e instanceof HTMLElement || e instanceof te(e).HTMLElement;
}
function bn(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof te(e).ShadowRoot;
}
function st(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: a
  } = oe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !["inline", "contents"].includes(a);
}
function fr(e) {
  return ["table", "td", "th"].includes(Pe(e));
}
function tn(e) {
  const t = nn(), n = oe(e);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((o) => (n.willChange || "").includes(o)) || ["paint", "layout", "strict", "content"].some((o) => (n.contain || "").includes(o));
}
function mr(e) {
  let t = Xe(e);
  for (; ce(t) && !Ct(t); ) {
    if (tn(t))
      return t;
    t = Xe(t);
  }
  return null;
}
function nn() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Ct(e) {
  return ["html", "body", "#document"].includes(Pe(e));
}
function oe(e) {
  return te(e).getComputedStyle(e);
}
function _t(e) {
  return we(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function Xe(e) {
  if (Pe(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    bn(e) && e.host || // Fallback.
    Ce(e)
  );
  return bn(t) ? t.host : t;
}
function Wn(e) {
  const t = Xe(e);
  return Ct(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : ce(t) && st(t) ? t : Wn(t);
}
function lt(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const a = Wn(e), r = a === ((o = e.ownerDocument) == null ? void 0 : o.body), l = te(a);
  return r ? t.concat(l, l.visualViewport || [], st(a) ? a : [], l.frameElement && n ? lt(l.frameElement) : []) : t.concat(a, lt(a, [], n));
}
function Hn(e) {
  const t = oe(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const a = ce(e), r = a ? e.offsetWidth : n, l = a ? e.offsetHeight : o, i = bt(n) !== r || bt(o) !== l;
  return i && (n = r, o = l), {
    width: n,
    height: o,
    $: i
  };
}
function on(e) {
  return we(e) ? e : e.contextElement;
}
function Ue(e) {
  const t = on(e);
  if (!ce(t))
    return Be(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: a,
    $: r
  } = Hn(t);
  let l = (r ? bt(n.width) : n.width) / o, i = (r ? bt(n.height) : n.height) / a;
  return (!l || !Number.isFinite(l)) && (l = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: l,
    y: i
  };
}
const vr = /* @__PURE__ */ Be(0);
function Kn(e) {
  const t = te(e);
  return !nn() || !t.visualViewport ? vr : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function hr(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== te(e) ? !1 : t;
}
function Le(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const a = e.getBoundingClientRect(), r = on(e);
  let l = Be(1);
  t && (o ? we(o) && (l = Ue(o)) : l = Ue(e));
  const i = hr(r, n, o) ? Kn(r) : Be(0);
  let u = (a.left + i.x) / l.x, c = (a.top + i.y) / l.y, p = a.width / l.x, d = a.height / l.y;
  if (r) {
    const f = te(r), m = o && we(o) ? te(o) : o;
    let v = f.frameElement;
    for (; v && o && m !== f; ) {
      const h = Ue(v), y = v.getBoundingClientRect(), g = oe(v), b = y.left + (v.clientLeft + parseFloat(g.paddingLeft)) * h.x, w = y.top + (v.clientTop + parseFloat(g.paddingTop)) * h.y;
      u *= h.x, c *= h.y, p *= h.x, d *= h.y, u += b, c += w, v = te(v).frameElement;
    }
  }
  return xt({
    width: p,
    height: d,
    x: u,
    y: c
  });
}
function gr(e) {
  let {
    rect: t,
    offsetParent: n,
    strategy: o
  } = e;
  const a = ce(n), r = Ce(n);
  if (n === r)
    return t;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, i = Be(1);
  const u = Be(0);
  if ((a || !a && o !== "fixed") && ((Pe(n) !== "body" || st(r)) && (l = _t(n)), ce(n))) {
    const c = Le(n);
    i = Ue(n), u.x = c.x + n.clientLeft, u.y = c.y + n.clientTop;
  }
  return {
    width: t.width * i.x,
    height: t.height * i.y,
    x: t.x * i.x - l.scrollLeft * i.x + u.x,
    y: t.y * i.y - l.scrollTop * i.y + u.y
  };
}
function yr(e) {
  return Array.from(e.getClientRects());
}
function qn(e) {
  return Le(Ce(e)).left + _t(e).scrollLeft;
}
function br(e) {
  const t = Ce(e), n = _t(e), o = e.ownerDocument.body, a = Q(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), r = Q(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let l = -n.scrollLeft + qn(e);
  const i = -n.scrollTop;
  return oe(o).direction === "rtl" && (l += Q(t.clientWidth, o.clientWidth) - a), {
    width: a,
    height: r,
    x: l,
    y: i
  };
}
function wr(e, t) {
  const n = te(e), o = Ce(e), a = n.visualViewport;
  let r = o.clientWidth, l = o.clientHeight, i = 0, u = 0;
  if (a) {
    r = a.width, l = a.height;
    const c = nn();
    (!c || c && t === "fixed") && (i = a.offsetLeft, u = a.offsetTop);
  }
  return {
    width: r,
    height: l,
    x: i,
    y: u
  };
}
function xr(e, t) {
  const n = Le(e, !0, t === "fixed"), o = n.top + e.clientTop, a = n.left + e.clientLeft, r = ce(e) ? Ue(e) : Be(1), l = e.clientWidth * r.x, i = e.clientHeight * r.y, u = a * r.x, c = o * r.y;
  return {
    width: l,
    height: i,
    x: u,
    y: c
  };
}
function wn(e, t, n) {
  let o;
  if (t === "viewport")
    o = wr(e, n);
  else if (t === "document")
    o = br(Ce(e));
  else if (we(t))
    o = xr(t, n);
  else {
    const a = Kn(e);
    o = {
      ...t,
      x: t.x - a.x,
      y: t.y - a.y
    };
  }
  return xt(o);
}
function Un(e, t) {
  const n = Xe(e);
  return n === t || !we(n) || Ct(n) ? !1 : oe(n).position === "fixed" || Un(n, t);
}
function Cr(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = lt(e, [], !1).filter((i) => we(i) && Pe(i) !== "body"), a = null;
  const r = oe(e).position === "fixed";
  let l = r ? Xe(e) : e;
  for (; we(l) && !Ct(l); ) {
    const i = oe(l), u = tn(l);
    !u && i.position === "fixed" && (a = null), (r ? !u && !a : !u && i.position === "static" && !!a && ["absolute", "fixed"].includes(a.position) || st(l) && !u && Un(e, l)) ? o = o.filter((p) => p !== l) : a = i, l = Xe(l);
  }
  return t.set(e, o), o;
}
function _r(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: a
  } = e;
  const l = [...n === "clippingAncestors" ? Cr(t, this._c) : [].concat(n), o], i = l[0], u = l.reduce((c, p) => {
    const d = wn(t, p, a);
    return c.top = Q(d.top, c.top), c.right = Se(d.right, c.right), c.bottom = Se(d.bottom, c.bottom), c.left = Q(d.left, c.left), c;
  }, wn(t, i, a));
  return {
    width: u.right - u.left,
    height: u.bottom - u.top,
    x: u.left,
    y: u.top
  };
}
function Er(e) {
  return Hn(e);
}
function Or(e, t, n) {
  const o = ce(t), a = Ce(t), r = n === "fixed", l = Le(e, !0, r, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const u = Be(0);
  if (o || !o && !r)
    if ((Pe(t) !== "body" || st(a)) && (i = _t(t)), o) {
      const c = Le(t, !0, r, t);
      u.x = c.x + t.clientLeft, u.y = c.y + t.clientTop;
    } else
      a && (u.x = qn(a));
  return {
    x: l.left + i.scrollLeft - u.x,
    y: l.top + i.scrollTop - u.y,
    width: l.width,
    height: l.height
  };
}
function xn(e, t) {
  return !ce(e) || oe(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function Gn(e, t) {
  const n = te(e);
  if (!ce(e))
    return n;
  let o = xn(e, t);
  for (; o && fr(o) && oe(o).position === "static"; )
    o = xn(o, t);
  return o && (Pe(o) === "html" || Pe(o) === "body" && oe(o).position === "static" && !tn(o)) ? n : o || mr(e) || n;
}
const kr = async function(e) {
  let {
    reference: t,
    floating: n,
    strategy: o
  } = e;
  const a = this.getOffsetParent || Gn, r = this.getDimensions;
  return {
    reference: Or(t, await a(n), o),
    floating: {
      x: 0,
      y: 0,
      ...await r(n)
    }
  };
};
function Ar(e) {
  return oe(e).direction === "rtl";
}
const Sr = {
  convertOffsetParentRelativeRectToViewportRelativeRect: gr,
  getDocumentElement: Ce,
  getClippingRect: _r,
  getOffsetParent: Gn,
  getElementRects: kr,
  getClientRects: yr,
  getDimensions: Er,
  getScale: Ue,
  isElement: we,
  isRTL: Ar
};
function Br(e, t) {
  let n = null, o;
  const a = Ce(e);
  function r() {
    clearTimeout(o), n && n.disconnect(), n = null;
  }
  function l(i, u) {
    i === void 0 && (i = !1), u === void 0 && (u = 1), r();
    const {
      left: c,
      top: p,
      width: d,
      height: f
    } = e.getBoundingClientRect();
    if (i || t(), !d || !f)
      return;
    const m = mt(p), v = mt(a.clientWidth - (c + d)), h = mt(a.clientHeight - (p + f)), y = mt(c), b = {
      rootMargin: -m + "px " + -v + "px " + -h + "px " + -y + "px",
      threshold: Q(0, Se(1, u)) || 1
    };
    let w = !0;
    function x(O) {
      const k = O[0].intersectionRatio;
      if (k !== u) {
        if (!w)
          return l();
        k ? l(!1, k) : o = setTimeout(() => {
          l(!1, 1e-7);
        }, 100);
      }
      w = !1;
    }
    try {
      n = new IntersectionObserver(x, {
        ...b,
        // Handle <iframe>s
        root: a.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(x, b);
    }
    n.observe(e);
  }
  return l(!0), r;
}
function Pr(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: a = !0,
    ancestorResize: r = !0,
    elementResize: l = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: u = !1
  } = o, c = on(e), p = a || r ? [...c ? lt(c) : [], ...lt(t)] : [];
  p.forEach((g) => {
    a && g.addEventListener("scroll", n, {
      passive: !0
    }), r && g.addEventListener("resize", n);
  });
  const d = c && i ? Br(c, n) : null;
  let f = -1, m = null;
  l && (m = new ResizeObserver((g) => {
    let [b] = g;
    b && b.target === c && m && (m.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      m && m.observe(t);
    })), n();
  }), c && !u && m.observe(c), m.observe(t));
  let v, h = u ? Le(e) : null;
  u && y();
  function y() {
    const g = Le(e);
    h && (g.x !== h.x || g.y !== h.y || g.width !== h.width || g.height !== h.height) && n(), h = g, v = requestAnimationFrame(y);
  }
  return n(), () => {
    p.forEach((g) => {
      a && g.removeEventListener("scroll", n), r && g.removeEventListener("resize", n);
    }), d && d(), m && m.disconnect(), m = null, u && cancelAnimationFrame(v);
  };
}
const $r = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), a = {
    platform: Sr,
    ...n
  }, r = {
    ...a.platform,
    _c: o
  };
  return rr(e, t, {
    ...a,
    platform: r
  });
};
function Lt(e) {
  var t;
  return (t = e == null ? void 0 : e.$el) != null ? t : e;
}
function Tr(e) {
  return {
    name: "arrow",
    options: e,
    fn(t) {
      const n = Lt(s(e.element));
      return n == null ? {} : ar({
        element: n,
        padding: e.padding
      }).fn(t);
    }
  };
}
function Xn(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Cn(e, t) {
  const n = Xn(e);
  return Math.round(t * n) / n;
}
function Fr(e, t, n) {
  n === void 0 && (n = {});
  const o = n.whileElementsMounted, a = M(() => {
    var T;
    return (T = s(n.open)) != null ? T : !0;
  }), r = M(() => s(n.middleware)), l = M(() => {
    var T;
    return (T = s(n.placement)) != null ? T : "bottom";
  }), i = M(() => {
    var T;
    return (T = s(n.strategy)) != null ? T : "absolute";
  }), u = M(() => {
    var T;
    return (T = s(n.transform)) != null ? T : !0;
  }), c = M(() => Lt(e.value)), p = M(() => Lt(t.value)), d = B(0), f = B(0), m = B(i.value), v = B(l.value), h = Kt({}), y = B(!1), g = M(() => {
    const T = {
      position: m.value,
      left: "0",
      top: "0"
    };
    if (!p.value)
      return T;
    const R = Cn(p.value, d.value), N = Cn(p.value, f.value);
    return u.value ? {
      ...T,
      transform: "translate(" + R + "px, " + N + "px)",
      ...Xn(p.value) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: m.value,
      left: R + "px",
      top: N + "px"
    };
  });
  let b;
  function w() {
    c.value == null || p.value == null || $r(c.value, p.value, {
      middleware: r.value,
      placement: l.value,
      strategy: i.value
    }).then((T) => {
      d.value = T.x, f.value = T.y, m.value = T.strategy, v.value = T.placement, h.value = T.middlewareData, y.value = !0;
    });
  }
  function x() {
    typeof b == "function" && (b(), b = void 0);
  }
  function O() {
    if (x(), o === void 0) {
      w();
      return;
    }
    if (c.value != null && p.value != null) {
      b = o(c.value, p.value, w);
      return;
    }
  }
  function k() {
    a.value || (y.value = !1);
  }
  return q([r, l, i], w, {
    flush: "sync"
  }), q([c, p], O, {
    flush: "sync"
  }), q(a, k, {
    flush: "sync"
  }), Fn() && Mn(x), {
    x: He(d),
    y: He(f),
    strategy: He(m),
    placement: He(v),
    middlewareData: He(h),
    isPositioned: He(y),
    floatingStyles: g,
    update: w
  };
}
function Y(e, t) {
  const n = typeof e == "string" && !t ? `${e}Context` : t, o = Symbol(n);
  return [(a) => {
    const r = ot(o, a);
    if (r || r === null)
      return r;
    throw new Error(
      `Injection \`${o.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(
        ", "
      )}` : `\`${e}\``}`
    );
  }, (a) => (rt(o, a), a)];
}
function Yn(e, t, n) {
  const o = n.originalEvent.target, a = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && o.addEventListener(e, t, { once: !0 }), o.dispatchEvent(a);
}
function Mr(e, t) {
  var n;
  const o = Kt();
  return ne(() => {
    o.value = e();
  }, {
    ...t,
    flush: (n = t == null ? void 0 : t.flush) != null ? n : "sync"
  }), Ut(o);
}
function Rr(e, t) {
  let n, o, a;
  const r = B(!0), l = () => {
    r.value = !0, a();
  };
  q(e, l, { flush: "sync" });
  const i = typeof t == "function" ? t : t.get, u = typeof t == "function" ? void 0 : t.set, c = Xt((p, d) => (o = p, a = d, {
    get() {
      return r.value && (n = i(), r.value = !1), o(), n;
    },
    set(f) {
      u == null || u(f);
    }
  }));
  return Object.isExtensible(c) && (c.trigger = l), c;
}
function Jn(e) {
  return Fn() ? (Mn(e), !0) : !1;
}
function Et(e) {
  let t = !1, n;
  const o = Vo(!0);
  return (...a) => (t || (n = o.run(() => e(...a)), t = !0), n);
}
function Ie(e) {
  return typeof e == "function" ? e() : s(e);
}
const Ze = typeof window < "u" && typeof document < "u", Dr = (e) => typeof e < "u", Vr = Object.prototype.toString, Ir = (e) => Vr.call(e) === "[object Object]", _n = (e, t, n) => Math.min(n, Math.max(t, e)), Zn = () => {
};
function Nr(...e) {
  if (e.length !== 1)
    return Ho(...e);
  const t = e[0];
  return typeof t == "function" ? Ut(Xt(() => ({ get: t, set: Zn }))) : B(t);
}
function Lr(e, t = 1e4) {
  return Xt((n, o) => {
    let a = Ie(e), r;
    const l = () => setTimeout(() => {
      a = Ie(e), o();
    }, Ie(t));
    return Jn(() => {
      clearTimeout(r);
    }), {
      get() {
        return n(), a;
      },
      set(i) {
        a = i, o(), clearTimeout(r), r = l();
      }
    };
  });
}
function Fe(e) {
  var t;
  const n = Ie(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Qn = Ze ? window : void 0;
function zr(...e) {
  let t, n, o, a;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, o, a] = e, t = Qn) : [t, n, o, a] = e, !t)
    return Zn;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const r = [], l = () => {
    r.forEach((p) => p()), r.length = 0;
  }, i = (p, d, f, m) => (p.addEventListener(d, f, m), () => p.removeEventListener(d, f, m)), u = q(
    () => [Fe(t), Ie(a)],
    ([p, d]) => {
      if (l(), !p)
        return;
      const f = Ir(d) ? { ...d } : d;
      r.push(
        ...n.flatMap((m) => o.map((v) => i(p, m, v, f)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    u(), l();
  };
  return Jn(c), c;
}
function jr(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Wr(...e) {
  let t, n, o = {};
  e.length === 3 ? (t = e[0], n = e[1], o = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], o = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: a = Qn,
    eventName: r = "keydown",
    passive: l = !1,
    dedupe: i = !1
  } = o, u = jr(t);
  return zr(a, r, (c) => {
    c.repeat && Ie(i) || u(c) && n(c);
  }, l);
}
function Hr() {
  const e = B(!1);
  return Te() && re(() => {
    e.value = !0;
  }), e;
}
function Kr(e) {
  return JSON.parse(JSON.stringify(e));
}
function qr(e, t) {
  const n = Kt(t);
  return q(
    Nr(e),
    (o, a) => {
      n.value = a;
    },
    { flush: "sync" }
  ), Ut(n);
}
function $e(e, t, n, o = {}) {
  var a, r, l;
  const {
    clone: i = !1,
    passive: u = !1,
    eventName: c,
    deep: p = !1,
    defaultValue: d,
    shouldEmit: f
  } = o, m = Te(), v = n || (m == null ? void 0 : m.emit) || ((a = m == null ? void 0 : m.$emit) == null ? void 0 : a.bind(m)) || ((l = (r = m == null ? void 0 : m.proxy) == null ? void 0 : r.$emit) == null ? void 0 : l.bind(m == null ? void 0 : m.proxy));
  let h = c;
  t || (t = "modelValue"), h = h || `update:${t.toString()}`;
  const y = (w) => i ? typeof i == "function" ? i(w) : Kr(w) : w, g = () => Dr(e[t]) ? y(e[t]) : d, b = (w) => {
    f ? f(w) && v(h, w) : v(h, w);
  };
  if (u) {
    const w = g(), x = B(w);
    let O = !1;
    return q(
      () => e[t],
      (k) => {
        O || (O = !0, x.value = y(k), ee(() => O = !1));
      }
    ), q(
      x,
      (k) => {
        !O && (k !== e[t] || p) && b(k);
      },
      { deep: p }
    ), x;
  } else
    return M({
      get() {
        return g();
      },
      set(w) {
        b(w);
      }
    });
}
function Ot(e) {
  return e ? e.flatMap((t) => t.type === le ? Ot(t.children) : [t]) : [];
}
function Ur(e, t, n, o = {}) {
  if (!t)
    return null;
  const {
    arrowKeyOptions: a = "both",
    attributeName: r = "data-radix-vue-collection-item",
    itemsArray: l = [],
    loop: i = !0,
    dir: u = "ltr",
    preventScroll: c = !0,
    focus: p = !1
  } = o, [d, f, m, v, h, y] = [
    e.key === "ArrowRight",
    e.key === "ArrowLeft",
    e.key === "ArrowUp",
    e.key === "ArrowDown",
    e.key === "Home",
    e.key === "End"
  ], g = m || v, b = d || f;
  if (!h && !y && (!g && !b || a === "vertical" && b || a === "horizontal" && g))
    return null;
  const w = n ? Array.from(n.querySelectorAll(`[${r}]`)) : l;
  if (!w.length)
    return null;
  c && e.preventDefault();
  let x = null;
  return b || g ? x = eo(w, t, {
    goForward: g ? v : u === "ltr" ? d : f,
    loop: i
  }) : h ? x = w.at(0) || null : y && (x = w.at(-1) || null), p && (x == null || x.focus()), x;
}
function eo(e, t, { goForward: n, loop: o }, a = e.length) {
  if (--a === 0)
    return null;
  const r = e.indexOf(t), l = n ? r + 1 : r - 1;
  if (!o && (l < 0 || l >= e.length))
    return null;
  const i = (l + e.length) % e.length, u = e[i];
  return u ? u.hasAttribute("disabled") && u.getAttribute("disabled") !== "false" ? eo(
    e,
    u,
    { goForward: n, loop: o },
    a
  ) : u : null;
}
function Tt(e) {
  return e !== null && typeof e == "object";
}
function zt(e, t, n = ".", o) {
  if (!Tt(t))
    return zt(e, {}, n, o);
  const a = Object.assign({}, t);
  for (const r in e) {
    if (r === "__proto__" || r === "constructor")
      continue;
    const l = e[r];
    l != null && (o && o(a, r, l, n) || (Array.isArray(l) && Array.isArray(a[r]) ? a[r] = [...l, ...a[r]] : Tt(l) && Tt(a[r]) ? a[r] = zt(
      l,
      a[r],
      (n ? `${n}.` : "") + r.toString(),
      o
    ) : a[r] = l));
  }
  return a;
}
function Gr(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, o) => zt(n, o, "", e), {})
  );
}
const Xr = Gr(), [to, ns] = Y("ConfigProvider"), Yr = Et(() => B()), Jr = Et(() => B(0));
function rn(e) {
  const t = to({
    scrollBody: B(!0)
  }), n = Jr(), o = Yr(), a = B(e), r = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = o.value ?? "", o.value = void 0;
  };
  return e && n.value++, q(a, (l) => {
    var i;
    if (Ze && l) {
      o.value === void 0 && (o.value = document.body.style.overflow);
      const u = window.innerWidth - document.documentElement.clientWidth, c = { padding: u, margin: 0 }, p = (i = t.scrollBody) != null && i.value ? typeof t.scrollBody.value == "object" ? Xr({
        padding: t.scrollBody.value.padding === !0 ? u : t.scrollBody.value.padding,
        margin: t.scrollBody.value.margin === !0 ? u : t.scrollBody.value.margin
      }, c) : c : { padding: 0, margin: 0 };
      u > 0 && (document.body.style.paddingRight = `${p.padding}px`, document.body.style.marginRight = `${p.margin}px`, document.body.style.setProperty("--scrollbar-width", `${u}px`), document.body.style.overflow = "hidden"), ee(() => {
        document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
      });
    }
  }, { immediate: !0 }), Vn(() => {
    e && n.value--, n.value === 0 && r();
  }), a;
}
const Zr = "data-radix-vue-collection-item";
function ut(e, t = Zr) {
  const n = e ?? Symbol();
  return { createCollection: (o) => {
    const a = B([]);
    function r() {
      const l = Fe(o);
      return l ? a.value = Array.from(
        l.querySelectorAll(`[${t}]:not([data-disabled=true])`)
      ) : a.value = [];
    }
    return zo(() => {
      a.value = [];
    }), re(r), jo(r), q(() => o == null ? void 0 : o.value, r, { immediate: !0 }), rt(n, a), a;
  }, injectCollection: () => ot(n, B([])) };
}
function no(e) {
  const t = to({
    dir: B("ltr")
  });
  return M(() => {
    var n;
    return (e == null ? void 0 : e.value) || ((n = t.dir) == null ? void 0 : n.value) || "ltr";
  });
}
function dt(e) {
  const t = Te(), n = t == null ? void 0 : t.type.emits, o = {};
  return n != null && n.length || console.warn(
    `No emitted event found. Please check component: ${t == null ? void 0 : t.type.__name}`
  ), n == null || n.forEach((a) => {
    o[Io(In(a))] = (...r) => e(a, ...r);
  }), o;
}
let Ft = 0;
function oo() {
  ne((e) => {
    if (!Ze)
      return;
    const t = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement(
      "afterbegin",
      t[0] ?? En()
    ), document.body.insertAdjacentElement(
      "beforeend",
      t[1] ?? En()
    ), Ft++, e(() => {
      Ft === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((n) => n.remove()), Ft--;
    });
  });
}
function En() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.cssText = "outline: none; opacity: 0; position: fixed; pointer-events: none", e;
}
function an(e) {
  return M(() => {
    var t;
    return Ie(e) ? !!((t = Fe(e)) != null && t.closest("form")) : !0;
  });
}
function ro(e) {
  const t = Te(), n = Object.keys((t == null ? void 0 : t.type.props) ?? {}).reduce((o, a) => {
    const r = (t == null ? void 0 : t.type.props[a]).default;
    return r !== void 0 && (o[a] = r), o;
  }, {});
  return Rr(() => ({ ...e }), () => {
    const o = {}, a = (t == null ? void 0 : t.vnode.props) ?? {};
    return Object.keys(a).forEach((r) => {
      o[In(r)] = a[r];
    }), Object.keys({ ...n, ...o }).reduce((r, l) => (e[l] !== void 0 && (r[l] = e[l]), r), {});
  });
}
function ct(e, t) {
  const n = ro(e), o = t ? dt(t) : {};
  return M(() => ({
    ...n.value,
    ...o
  }));
}
function Qr() {
  const e = Te();
  function t(n) {
    typeof n == "object" && (e.exposed = n, e.exposeProxy = n);
  }
  return t;
}
var ea = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Ke = /* @__PURE__ */ new WeakMap(), vt = /* @__PURE__ */ new WeakMap(), ht = {}, Mt = 0, ao = function(e) {
  return e && (e.host || ao(e.parentNode));
}, ta = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = ao(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, na = function(e, t, n, o) {
  var a = ta(t, Array.isArray(e) ? e : [e]);
  ht[n] || (ht[n] = /* @__PURE__ */ new WeakMap());
  var r = ht[n], l = [], i = /* @__PURE__ */ new Set(), u = new Set(a), c = function(d) {
    !d || i.has(d) || (i.add(d), c(d.parentNode));
  };
  a.forEach(c);
  var p = function(d) {
    !d || u.has(d) || Array.prototype.forEach.call(d.children, function(f) {
      if (i.has(f))
        p(f);
      else {
        var m = f.getAttribute(o), v = m !== null && m !== "false", h = (Ke.get(f) || 0) + 1, y = (r.get(f) || 0) + 1;
        Ke.set(f, h), r.set(f, y), l.push(f), h === 1 && v && vt.set(f, !0), y === 1 && f.setAttribute(n, "true"), v || f.setAttribute(o, "true");
      }
    });
  };
  return p(t), i.clear(), Mt++, function() {
    l.forEach(function(d) {
      var f = Ke.get(d) - 1, m = r.get(d) - 1;
      Ke.set(d, f), r.set(d, m), f || (vt.has(d) || d.removeAttribute(o), vt.delete(d)), m || d.removeAttribute(n);
    }), Mt--, Mt || (Ke = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap(), vt = /* @__PURE__ */ new WeakMap(), ht = {});
  };
}, oa = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), a = t || ea(e);
  return a ? (o.push.apply(o, Array.from(a.querySelectorAll("[aria-live]"))), na(o, a, n, "aria-hidden")) : function() {
    return null;
  };
};
function lo(e) {
  let t;
  q(() => Fe(e), (n) => {
    n ? t = oa(n) : t && t();
  }), qt(() => {
    t && t();
  });
}
const ra = Et(() => ({ count: B(0) }));
function Ne(e) {
  const { count: t } = ra();
  return e || t.value++, e || `radix-${t.value}`;
}
function aa(e) {
  const t = B(), n = M(() => {
    var a;
    return ((a = t.value) == null ? void 0 : a.width) ?? 0;
  }), o = M(() => {
    var a;
    return ((a = t.value) == null ? void 0 : a.height) ?? 0;
  });
  return re(() => {
    const a = Fe(e);
    if (a) {
      t.value = { width: a.offsetWidth, height: a.offsetHeight };
      const r = new ResizeObserver((l) => {
        if (!Array.isArray(l) || !l.length)
          return;
        const i = l[0];
        let u, c;
        if ("borderBoxSize" in i) {
          const p = i.borderBoxSize, d = Array.isArray(p) ? p[0] : p;
          u = d.inlineSize, c = d.blockSize;
        } else
          u = a.offsetWidth, c = a.offsetHeight;
        t.value = { width: u, height: c };
      });
      return r.observe(a, { box: "border-box" }), () => r.unobserve(a);
    } else
      t.value = void 0;
  }), {
    width: n,
    height: o
  };
}
function la(e, t) {
  const n = B(e);
  function o(a) {
    return t[n.value][a] ?? n.value;
  }
  return {
    state: n,
    dispatch: (a) => {
      n.value = o(a);
    }
  };
}
function ln(e) {
  const t = Lr("", 1e3);
  return {
    search: t,
    handleTypeaheadSearch: (n) => {
      var o, a;
      t.value = t.value + n;
      const r = e.value, l = document.activeElement, i = ((a = (o = r.find((d) => d === l)) == null ? void 0 : o.textContent) == null ? void 0 : a.trim()) ?? "", u = r.map((d) => {
        var f;
        return ((f = d.textContent) == null ? void 0 : f.trim()) ?? "";
      }), c = sa(u, t.value, i), p = r.find(
        (d) => {
          var f;
          return ((f = d.textContent) == null ? void 0 : f.trim()) === c;
        }
      );
      p && p.focus();
    },
    resetTypeahead: () => {
      t.value = "";
    }
  };
}
function ia(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
function sa(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((i) => i === t[0]) ? t[0] : t, a = n ? e.indexOf(n) : -1;
  let r = ia(e, Math.max(a, 0));
  o.length === 1 && (r = r.filter((i) => i !== n));
  const l = r.find(
    (i) => i.toLowerCase().startsWith(o.toLowerCase())
  );
  return l !== n ? l : void 0;
}
const sn = S({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var o, a;
      if (!n.default)
        return null;
      const r = Ot(n.default()), [l, ...i] = r;
      if (Object.keys(t).length > 0) {
        (o = l.props) == null || delete o.ref;
        const u = V(t, l.props ?? {});
        t.class && (a = l.props) != null && a.class && delete l.props.class;
        const c = Do(l, u);
        for (const p in u)
          p.startsWith("on") && (c.props || (c.props = {}), c.props[p] = u[p]);
        return r.length === 1 ? c : [c, ...i];
      }
      return r;
    };
  }
}), z = S({
  name: "Primitive",
  inheritAttrs: !1,
  props: {
    asChild: {
      type: Boolean,
      default: !1
    },
    as: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(e, { attrs: t, slots: n }) {
    return (e.asChild ? "template" : e.as) !== "template" ? () => Ge(e.as, t, { default: n.default }) : () => Ge(sn, t, { default: n.default });
  }
});
function J() {
  const e = B(), t = M(() => {
    var n, o;
    return ["#text", "#comment"].includes((n = e.value) == null ? void 0 : n.$el.nodeName) ? (o = e.value) == null ? void 0 : o.$el.nextElementSibling : Fe(e);
  });
  return {
    primitiveElement: e,
    currentElement: t
  };
}
function ua(e, t) {
  const n = B({}), o = B("none"), a = e.value ? "mounted" : "unmounted", { state: r, dispatch: l } = la(a, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  q(
    e,
    async (d, f) => {
      var m;
      const v = f !== d;
      if (await ee(), v) {
        const h = o.value, y = gt(t.value);
        d ? l("MOUNT") : y === "none" || ((m = n.value) == null ? void 0 : m.display) === "none" ? l("UNMOUNT") : l(f && h !== y ? "ANIMATION_OUT" : "UNMOUNT");
      }
    },
    { immediate: !0 }
  );
  const i = (d) => {
    const f = gt(t.value), m = f.includes(
      d.animationName
    );
    d.target === t.value && m && l("ANIMATION_END"), d.target === t.value && f === "none" && l("ANIMATION_END");
  }, u = (d) => {
    d.target === t.value && (o.value = gt(t.value));
  }, c = q(
    t,
    (d, f) => {
      d ? (n.value = getComputedStyle(d), d.addEventListener("animationstart", u), d.addEventListener("animationcancel", i), d.addEventListener("animationend", i)) : (l("ANIMATION_END"), f == null || f.removeEventListener("animationstart", u), f == null || f.removeEventListener("animationcancel", i), f == null || f.removeEventListener("animationend", i));
    },
    { immediate: !0 }
  ), p = q(r, () => {
    const d = gt(t.value);
    o.value = r.value === "mounted" ? d : "none";
  });
  return qt(() => {
    c(), p();
  }), {
    isPresent: M(
      () => ["mounted", "unmountSuspended"].includes(r.value)
    )
  };
}
function gt(e) {
  return e && getComputedStyle(e).animationName || "none";
}
const kt = S({
  name: "Presence",
  props: {
    present: {
      type: Boolean,
      required: !0
    },
    forceMount: {
      type: Boolean
    }
  },
  slots: {},
  setup(e, { slots: t, expose: n }) {
    var o;
    const { present: a, forceMount: r } = xe(e), l = B(), { isPresent: i } = ua(a, l);
    n({ present: i });
    let u = t.default({ present: i });
    u = Ot(u || []);
    const c = Te();
    if (u && (u == null ? void 0 : u.length) > 1) {
      const p = (o = c == null ? void 0 : c.parent) != null && o.type.name ? `<${c.parent.type.name} />` : "component";
      throw new Error(
        [
          `Detected an invalid children for \`${p}\` for  \`Presence\` component.`,
          "",
          "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
          "You can apply a few solutions:",
          [
            "Provide a single child element so that `presence` directive attach correctly.",
            "Ensure the first child is an actual element instead of a raw text node or comment node."
          ].map((d) => `  - ${d}`).join(`
`)
        ].join(`
`)
      );
    }
    return () => r.value || a.value || i.value ? Ge(t.default({ present: i })[0], {
      ref: (p) => {
        const d = Fe(p);
        return typeof (d == null ? void 0 : d.hasAttribute) > "u" || (d != null && d.hasAttribute("data-radix-popper-content-wrapper") ? l.value = d.firstChild : l.value = d), d;
      }
    }) : null;
  }
}), [fe, da] = Y("DialogRoot"), ca = /* @__PURE__ */ S({
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    modal: { type: Boolean, default: !0 }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const n = e, o = $e(n, "open", t, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), a = B(), r = B(), { modal: l } = xe(n);
    return da({
      open: o,
      modal: l,
      openModal: () => {
        o.value = !0;
      },
      onOpenChange: (i) => {
        o.value = i;
      },
      onOpenToggle: () => {
        o.value = !o.value;
      },
      contentId: Ne(),
      titleId: Ne(),
      descriptionId: Ne(),
      triggerElement: a,
      contentElement: r
    }), (i, u) => P(i.$slots, "default");
  }
}), io = /* @__PURE__ */ S({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = Hr();
    return (n, o) => s(t) || n.forceMount ? (_(), $(Gt, {
      key: 0,
      to: n.to,
      disabled: n.disabled
    }, [
      P(n.$slots, "default")
    ], 8, ["to", "disabled"])) : X("", !0);
  }
}), pa = /* @__PURE__ */ S({
  __name: "DialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, o) => (_(), $(s(io), ge(Ae(t)), {
      default: E(() => [
        P(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), fa = "dismissableLayer.pointerDownOutside", ma = "dismissableLayer.focusOutside";
function so(e, t) {
  const n = t.closest(
    "[data-dismissable-layer]"
  ), o = e.querySelector(
    "[data-dismissable-layer]"
  ), a = Array.from(
    e.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  return !!(n && o === n || a.indexOf(o) < a.indexOf(n));
}
function va(e, t) {
  var n;
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), a = B(!1), r = B(() => {
  });
  return ne((l) => {
    if (!Ze)
      return;
    const i = async (c) => {
      if (t != null && t.value) {
        if (so(t.value, c.target)) {
          a.value = !1;
          return;
        }
        if (c.target && !a.value) {
          let p = function() {
            Yn(
              fa,
              e,
              d
            );
          };
          const d = { originalEvent: c };
          c.pointerType === "touch" ? (o.removeEventListener("click", r.value), r.value = p, o.addEventListener("click", r.value, {
            once: !0
          })) : p();
        } else
          o.removeEventListener("click", r.value);
        a.value = !1;
      }
    }, u = window.setTimeout(() => {
      o.addEventListener("pointerdown", i);
    }, 0);
    l(() => {
      window.clearTimeout(u), o.removeEventListener("pointerdown", i), o.removeEventListener("click", r.value);
    });
  }), {
    onPointerDownCapture: () => a.value = !0
  };
}
function ha(e, t) {
  var n;
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), a = B(!1);
  return ne((r) => {
    if (!Ze)
      return;
    const l = async (i) => {
      t != null && t.value && (await ee(), !so(t.value, i.target) && i.target && !a.value && Yn(
        ma,
        e,
        { originalEvent: i }
      ));
    };
    o.addEventListener("focusin", l), r(() => o.removeEventListener("focusin", l));
  }), {
    onFocusCapture: () => a.value = !0,
    onBlurCapture: () => a.value = !1
  };
}
const ve = Rn({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), un = /* @__PURE__ */ S({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(e, { emit: t }) {
    const n = e, o = t, { primitiveElement: a, currentElement: r } = J(), l = M(
      () => {
        var v;
        return ((v = r.value) == null ? void 0 : v.ownerDocument) ?? globalThis.document;
      }
    ), i = M(() => ve.layersRoot), u = M(() => r.value ? Array.from(i.value).indexOf(r.value) : -1), c = M(() => ve.layersWithOutsidePointerEventsDisabled.size > 0), p = M(() => {
      const v = Array.from(i.value), [h] = [...ve.layersWithOutsidePointerEventsDisabled].slice(-1), y = v.indexOf(h);
      return u.value >= y;
    }), d = va(async (v) => {
      const h = [...ve.branches].some(
        (y) => y.contains(v.target)
      );
      !p.value || h || (o("pointerDownOutside", v), o("interactOutside", v), await ee(), v.defaultPrevented || o("dismiss"));
    }, r), f = ha((v) => {
      [...ve.branches].some(
        (h) => h.contains(v.target)
      ) || (o("focusOutside", v), o("interactOutside", v), v.defaultPrevented || o("dismiss"));
    }, r);
    Wr("Escape", (v) => {
      u.value === i.value.size - 1 && (o("escapeKeyDown", v), v.defaultPrevented || o("dismiss"));
    });
    let m;
    return ne((v) => {
      r.value && (n.disableOutsidePointerEvents && (ve.layersWithOutsidePointerEventsDisabled.size === 0 && (m = l.value.body.style.pointerEvents, l.value.body.style.pointerEvents = "none"), ve.layersWithOutsidePointerEventsDisabled.add(r.value)), i.value.add(r.value), v(() => {
        n.disableOutsidePointerEvents && ve.layersWithOutsidePointerEventsDisabled.size === 1 && (l.value.body.style.pointerEvents = m);
      }));
    }), ne((v) => {
      v(() => {
        r.value && (i.value.delete(r.value), ve.layersWithOutsidePointerEventsDisabled.delete(r.value));
      });
    }), (v, h) => (_(), $(s(z), {
      ref_key: "primitiveElement",
      ref: a,
      "as-child": v.asChild,
      as: v.as,
      "data-dismissable-layer": "",
      style: ze({
        pointerEvents: c.value ? p.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: s(f).onFocusCapture,
      onBlurCapture: s(f).onBlurCapture,
      onPointerdownCapture: s(d).onPointerDownCapture
    }, {
      default: E(() => [
        P(v.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), Rt = "focusScope.autoFocusOnMount", Dt = "focusScope.autoFocusOnUnmount", On = { bubbles: !1, cancelable: !0 };
function ga(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (ke(o, { select: t }), document.activeElement !== n)
      return !0;
}
function ya(e) {
  const t = uo(e), n = kn(t, e), o = kn(t.reverse(), e);
  return [n, o];
}
function uo(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const a = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || a ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); )
    t.push(n.currentNode);
  return t;
}
function kn(e, t) {
  for (const n of e)
    if (!ba(n, { upTo: t }))
      return n;
}
function ba(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  for (; e; ) {
    if (t !== void 0 && e === t)
      return !1;
    if (getComputedStyle(e).display === "none")
      return !0;
    e = e.parentElement;
  }
  return !1;
}
function wa(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function ke(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && wa(e) && t && e.select();
  }
}
const xa = Et(() => B([]));
function Ca() {
  const e = xa();
  return {
    add(t) {
      const n = e.value[0];
      t !== n && (n == null || n.pause()), e.value = An(e.value, t), e.value.unshift(t);
    },
    remove(t) {
      var n;
      e.value = An(e.value, t), (n = e.value[0]) == null || n.resume();
    }
  };
}
function An(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function _a(e) {
  return e.filter((t) => t.tagName !== "A");
}
const dn = /* @__PURE__ */ S({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, { primitiveElement: a, currentElement: r } = J(), l = B(null), i = Ca(), u = Rn({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    ne((p) => {
      if (!Ze)
        return;
      const d = r.value;
      if (!n.trapped)
        return;
      function f(y) {
        if (u.paused || !d)
          return;
        const g = y.target;
        d.contains(g) ? l.value = g : ke(l.value, { select: !0 });
      }
      function m(y) {
        if (u.paused || !d)
          return;
        const g = y.relatedTarget;
        g !== null && (d.contains(g) || ke(l.value, { select: !0 }));
      }
      function v(y) {
        d.contains(l.value) || ke(d);
      }
      document.addEventListener("focusin", f), document.addEventListener("focusout", m);
      const h = new MutationObserver(v);
      d && h.observe(d, { childList: !0, subtree: !0 }), p(() => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", m), h.disconnect();
      });
    }), ne(async (p) => {
      const d = r.value;
      if (await ee(), !d)
        return;
      i.add(u);
      const f = document.activeElement;
      if (!d.contains(f)) {
        const m = new CustomEvent(Rt, On);
        d.addEventListener(
          Rt,
          (v) => o("mountAutoFocus", v)
        ), d.dispatchEvent(m), m.defaultPrevented || (ga(_a(uo(d)), {
          select: !0
        }), document.activeElement === f && ke(d));
      }
      p(() => {
        d.removeEventListener(
          Rt,
          (h) => o("mountAutoFocus", h)
        );
        const m = new CustomEvent(Dt, On), v = (h) => {
          o("unmountAutoFocus", h);
        };
        d.addEventListener(Dt, v), d.dispatchEvent(m), setTimeout(() => {
          m.defaultPrevented || ke(f ?? document.body, { select: !0 }), d.removeEventListener(Dt, v), i.remove(u);
        }, 0);
      });
    });
    function c(p) {
      if (!n.loop && !n.trapped || u.paused)
        return;
      const d = p.key === "Tab" && !p.altKey && !p.ctrlKey && !p.metaKey, f = document.activeElement;
      if (d && f) {
        const m = p.currentTarget, [v, h] = ya(m);
        v && h ? !p.shiftKey && f === h ? (p.preventDefault(), n.loop && ke(v, { select: !0 })) : p.shiftKey && f === v && (p.preventDefault(), n.loop && ke(h, { select: !0 })) : f === m && p.preventDefault();
      }
    }
    return (p, d) => (_(), $(s(z), {
      ref_key: "primitiveElement",
      ref: a,
      tabindex: "-1",
      "as-child": n.asChild,
      as: n.as,
      onKeydown: c
    }, {
      default: E(() => [
        P(p.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
}), Ea = ["ArrowDown", "PageUp", "Home"], co = ["ArrowUp", "PageDown", "End"], Oa = [...Ea, ...co];
function po(e) {
  return e ? "open" : "closed";
}
function jt(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t))
      return;
}
function ka(e, t) {
  const { x: n, y: o } = e;
  let a = !1;
  for (let r = 0, l = t.length - 1; r < t.length; l = r++) {
    const i = t[r].x, u = t[r].y, c = t[l].x, p = t[l].y;
    u > o != p > o && n < (c - i) * (o - u) / (p - u) + i && (a = !a);
  }
  return a;
}
function Aa(e, t) {
  if (!t)
    return !1;
  const n = { x: e.clientX, y: e.clientY };
  return ka(n, t);
}
function Sa(e) {
  return e.pointerType === "mouse";
}
function Ba() {
  const e = "DialogContent", t = "DialogTitle", n = fe(), o = `Warning: \`${e}\` requires a \`${t}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.radix-vue.com/components/dialog.html#title;`, a = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${e}.`;
  re(() => {
    var r;
    document.getElementById(n.titleId) || console.warn(o);
    const l = (r = n.contentElement.value) == null ? void 0 : r.getAttribute("aria-describedby");
    n.descriptionId && l && (document.getElementById(n.descriptionId) || console.warn(a));
  });
}
const fo = /* @__PURE__ */ S({
  __name: "DialogContentImpl",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, a = fe(), { primitiveElement: r, currentElement: l } = J();
    return re(() => {
      a.contentElement = l;
    }), process.env.NODE_ENV !== "production" && Ba(), (i, u) => (_(), $(s(dn), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      onMountAutoFocus: u[5] || (u[5] = (c) => o("openAutoFocus", c)),
      onUnmountAutoFocus: u[6] || (u[6] = (c) => o("closeAutoFocus", c))
    }, {
      default: E(() => [
        I(s(un), V({
          id: s(a).contentId,
          ref_key: "primitiveElement",
          ref: r,
          as: i.as,
          "as-child": i.asChild,
          "disable-outside-pointer-events": i.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": s(a).descriptionId,
          "aria-labelledby": s(a).titleId,
          "data-state": s(po)(s(a).open.value)
        }, i.$attrs, {
          onDismiss: u[0] || (u[0] = (c) => s(a).onOpenChange(!1)),
          onEscapeKeyDown: u[1] || (u[1] = (c) => o("escapeKeyDown", c)),
          onFocusOutside: u[2] || (u[2] = (c) => o("focusOutside", c)),
          onInteractOutside: u[3] || (u[3] = (c) => o("interactOutside", c)),
          onPointerDownOutside: u[4] || (u[4] = (c) => o("pointerDownOutside", c))
        }), {
          default: E(() => [
            P(i.$slots, "default")
          ]),
          _: 3
        }, 16, ["id", "as", "as-child", "disable-outside-pointer-events", "aria-describedby", "aria-labelledby", "data-state"])
      ]),
      _: 3
    }, 8, ["trapped"]));
  }
}), Pa = /* @__PURE__ */ S({
  __name: "DialogContentModal",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, a = fe(), r = dt(o), { primitiveElement: l, currentElement: i } = J();
    return lo(i), (u, c) => (_(), $(fo, V({
      ref_key: "primitiveElement",
      ref: l
    }, { ...n, ...s(r) }, {
      "trap-focus": s(a).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: c[0] || (c[0] = (p) => {
        var d;
        o("closeAutoFocus", p), p.defaultPrevented || (p.preventDefault(), (d = s(a).triggerElement.value) == null || d.focus());
      }),
      onPointerDownOutside: c[1] || (c[1] = (p) => {
        const d = p.detail.originalEvent, f = d.button === 0 && d.ctrlKey === !0;
        (d.button === 2 || f) && p.preventDefault();
      }),
      onFocusOutside: c[2] || (c[2] = (p) => {
        p.preventDefault();
      }),
      onOpenAutoFocus: c[3] || (c[3] = (p) => o("openAutoFocus", p))
    }), {
      default: E(() => [
        P(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), $a = /* @__PURE__ */ S({
  __name: "DialogContentNonModal",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, a = dt(o), r = fe(), l = B(!1), i = B(!1);
    return (u, c) => (_(), $(fo, V({ ...n, ...s(a) }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: c[0] || (c[0] = (p) => {
        var d;
        o("closeAutoFocus", p), p.defaultPrevented || (l.value || (d = s(r).triggerElement.value) == null || d.focus(), p.preventDefault()), l.value = !1, i.value = !1;
      }),
      onInteractOutside: c[1] || (c[1] = (p) => {
        var d;
        p.defaultPrevented || (l.value = !0, p.detail.originalEvent.type === "pointerdown" && (i.value = !0));
        const f = p.target;
        (d = s(r).triggerElement.value) != null && d.contains(f) && p.preventDefault(), p.detail.originalEvent.type === "focusin" && i.value && p.preventDefault();
      })
    }), {
      default: E(() => [
        P(u.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Ta = /* @__PURE__ */ S({
  __name: "DialogContent",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, a = fe(), r = dt(o);
    return (l, i) => (_(), $(s(kt), {
      present: l.forceMount || s(a).open.value
    }, {
      default: E(() => [
        s(a).modal.value ? (_(), $(Pa, V({ key: 0 }, { ...n, ...s(r), ...l.$attrs }, {
          onOpenAutoFocus: i[0] || (i[0] = (u) => o("openAutoFocus", u))
        }), {
          default: E(() => [
            P(l.$slots, "default")
          ]),
          _: 3
        }, 16)) : (_(), $($a, ge(V({ key: 1 }, { ...n, ...s(r), ...l.$attrs })), {
          default: E(() => [
            P(l.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), Fa = /* @__PURE__ */ S({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  setup(e) {
    const t = fe();
    return rn(!0), (n, o) => (_(), $(s(z), {
      as: n.as,
      "as-child": n.asChild,
      "data-state": s(t).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: E(() => [
        P(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "data-state"]));
  }
}), Ma = /* @__PURE__ */ S({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  setup(e) {
    const t = fe();
    return (n, o) => {
      var a;
      return (a = s(t)) != null && a.modal.value ? (_(), $(s(kt), {
        key: 0,
        present: n.forceMount || s(t).open.value
      }, {
        default: E(() => [
          I(Fa, V({
            as: n.as,
            "as-child": n.asChild
          }, n.$attrs), {
            default: E(() => [
              P(n.$slots, "default")
            ]),
            _: 3
          }, 16, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["present"])) : X("", !0);
    };
  }
}), Ra = /* @__PURE__ */ S({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "button" }
  },
  setup(e) {
    const t = e, n = fe();
    return (o, a) => (_(), $(s(z), V(t, {
      type: o.as === "button" ? "button" : void 0,
      onClick: a[0] || (a[0] = (r) => s(n).onOpenChange(!1))
    }), {
      default: E(() => [
        P(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["type"]));
  }
}), Da = /* @__PURE__ */ S({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "h2" }
  },
  setup(e) {
    const t = e, n = fe();
    return (o, a) => (_(), $(s(z), V(t, {
      id: s(n).titleId
    }), {
      default: E(() => [
        P(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
}), Va = /* @__PURE__ */ S({
  __name: "DialogDescription",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "p" }
  },
  setup(e) {
    const t = e, n = fe();
    return (o, a) => (_(), $(s(z), V(t, {
      id: s(n).descriptionId
    }), {
      default: E(() => [
        P(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
});
function cn(e) {
  return e === "indeterminate";
}
function mo(e) {
  return cn(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
const Ia = ["value", "checked", "name", "disabled", "required"], [Na, La] = Y("CheckboxRoot"), za = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "CheckboxRoot",
  props: {
    defaultChecked: { type: Boolean },
    checked: { type: [Boolean, String], default: void 0 },
    disabled: { type: Boolean },
    required: { type: Boolean },
    name: {},
    value: { default: "on" },
    id: {},
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "button" }
  },
  emits: ["update:checked"],
  setup(e, { emit: t }) {
    const n = e, o = t, { disabled: a } = xe(n), r = $e(n, "checked", o, {
      defaultValue: n.defaultChecked,
      passive: n.checked === void 0
    }), { primitiveElement: l, currentElement: i } = J(), u = an(i), c = M(() => {
      var p;
      return n.id && i.value ? (p = document.querySelector(`[for="${n.id}"]`)) == null ? void 0 : p.innerText : void 0;
    });
    return La({
      disabled: a,
      state: r
    }), (p, d) => (_(), j(le, null, [
      I(s(z), V(p.$attrs, {
        id: p.id,
        ref_key: "primitiveElement",
        ref: l,
        role: "checkbox",
        "as-child": n.asChild,
        as: p.as,
        type: p.as === "button" ? "button" : void 0,
        "aria-checked": s(cn)(s(r)) ? "mixed" : s(r),
        "aria-required": !1,
        "aria-label": p.$attrs["aria-label"] || c.value,
        "data-state": s(mo)(s(r)),
        "data-disabled": s(a) ? "" : void 0,
        disabled: s(a),
        onKeydown: Nn(qe(() => {
        }, ["prevent"]), ["enter"]),
        onClick: d[0] || (d[0] = (f) => r.value = !s(r))
      }), {
        default: E(() => [
          P(p.$slots, "default")
        ]),
        _: 3
      }, 16, ["id", "as-child", "as", "type", "aria-checked", "aria-label", "data-state", "data-disabled", "disabled", "onKeydown"]),
      s(u) ? (_(), j("input", {
        key: 0,
        type: "checkbox",
        tabindex: "-1",
        "aria-hidden": "",
        value: p.value,
        checked: !!s(r),
        name: n.name,
        disabled: n.disabled,
        required: n.required,
        style: ze({
          transform: "translateX(-100%)",
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        })
      }, null, 12, Ia)) : X("", !0)
    ], 64));
  }
}), ja = /* @__PURE__ */ S({
  __name: "CheckboxIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "span" }
  },
  setup(e) {
    const t = Na();
    return (n, o) => (_(), $(s(kt), {
      present: n.forceMount || s(cn)(s(t).state.value) || s(t).state.value === !0
    }, {
      default: E(() => [
        I(s(z), V({
          "data-state": s(mo)(s(t).state.value),
          "data-disabled": s(t).disabled.value ? "" : void 0,
          style: { pointerEvents: "none" },
          "as-child": n.asChild,
          as: n.as
        }, n.$attrs), {
          default: E(() => [
            P(n.$slots, "default")
          ]),
          _: 3
        }, 16, ["data-state", "data-disabled", "as-child", "as"])
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), [vo, Wa] = Y("PopperRoot"), Ha = /* @__PURE__ */ S({
  __name: "PopperRoot",
  setup(e) {
    const t = B();
    return Wa({
      anchor: t,
      onAnchorChange: (n) => t.value = n
    }), (n, o) => P(n.$slots, "default");
  }
}), Ka = /* @__PURE__ */ S({
  __name: "PopperAnchor",
  props: {
    element: {},
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  setup(e) {
    const t = e, { primitiveElement: n, currentElement: o } = J(), a = vo();
    return q(o, () => {
      a.onAnchorChange(t.element ?? o.value);
    }), (r, l) => (_(), $(s(z), {
      ref_key: "primitiveElement",
      ref: n,
      as: r.as,
      "as-child": r.asChild
    }, {
      default: E(() => [
        P(r.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
});
function qa(e) {
  return e !== null;
}
function Ua(e) {
  return {
    name: "transformOrigin",
    options: e,
    fn(t) {
      var n, o, a;
      const { placement: r, rects: l, middlewareData: i } = t, u = ((n = i.arrow) == null ? void 0 : n.centerOffset) !== 0, c = u ? 0 : e.arrowWidth, p = u ? 0 : e.arrowHeight, [d, f] = Wt(r), m = { start: "0%", center: "50%", end: "100%" }[f], v = (((o = i.arrow) == null ? void 0 : o.x) ?? 0) + c / 2, h = (((a = i.arrow) == null ? void 0 : a.y) ?? 0) + p / 2;
      let y = "", g = "";
      return d === "bottom" ? (y = u ? m : `${v}px`, g = `${-p}px`) : d === "top" ? (y = u ? m : `${v}px`, g = `${l.floating.height + p}px`) : d === "right" ? (y = `${-p}px`, g = u ? m : `${h}px`) : d === "left" && (y = `${l.floating.width + p}px`, g = u ? m : `${h}px`), { data: { x: y, y: g } };
    }
  };
}
function Wt(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
const ho = {
  side: "bottom",
  sideOffset: 0,
  align: "center",
  alignOffset: 0,
  arrowPadding: 0,
  avoidCollisions: !0,
  collisionBoundary: () => [],
  collisionPadding: 0,
  sticky: "partial",
  hideWhenDetached: !1,
  updatePositionStrategy: "optimized",
  prioritizePosition: !1
}, [os, Ga] = Y("PopperContent"), go = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "PopperContent",
  props: Dn({
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    onPlaced: { type: Function },
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  }, {
    ...ho
  }),
  setup(e, { expose: t }) {
    const n = e, o = vo(), a = Qr(), { primitiveElement: r, currentElement: l } = J(), i = B(), u = B(), { width: c, height: p } = aa(u), d = M(
      () => n.side + (n.align !== "center" ? `-${n.align}` : "")
    ), f = M(() => typeof n.collisionPadding == "number" ? n.collisionPadding : { top: 0, right: 0, bottom: 0, left: 0, ...n.collisionPadding }), m = M(() => Array.isArray(n.collisionBoundary) ? n.collisionBoundary : [n.collisionBoundary]), v = M(() => ({
      padding: f.value,
      boundary: m.value.filter(qa),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: m.value.length > 0
    })), h = Mr(() => [
      ur({
        mainAxis: n.sideOffset + p.value,
        alignmentAxis: n.alignOffset
      }),
      n.avoidCollisions && dr({
        mainAxis: !0,
        crossAxis: !!n.prioritizePosition,
        limiter: n.sticky === "partial" ? cr() : void 0,
        ...v.value
      }),
      !n.prioritizePosition && n.avoidCollisions && lr({
        ...v.value
      }),
      pr({
        ...v.value,
        apply: ({ elements: C, rects: F, availableWidth: A, availableHeight: G }) => {
          const { width: L, height: H } = F.reference, K = C.floating.style;
          Object.assign(C.floating.style, {
            maxWidth: `${A}px`,
            maxHeight: `${G}px`
          }), K.setProperty(
            "--radix-popper-available-width",
            `${A}px`
          ), K.setProperty(
            "--radix-popper-available-height",
            `${G}px`
          ), K.setProperty(
            "--radix-popper-anchor-width",
            `${L}px`
          ), K.setProperty(
            "--radix-popper-anchor-height",
            `${H}px`
          );
        }
      }),
      u.value && Tr({ element: u.value, padding: n.arrowPadding }),
      Ua({
        arrowWidth: c.value,
        arrowHeight: p.value
      }),
      n.hideWhenDetached && ir({ strategy: "referenceHidden", ...v.value })
    ]), { floatingStyles: y, placement: g, isPositioned: b, middlewareData: w } = Fr(
      o.anchor,
      i,
      {
        strategy: "fixed",
        placement: d,
        whileElementsMounted: (...C) => Pr(...C, {
          animationFrame: n.updatePositionStrategy === "always"
        }),
        middleware: h
      }
    ), x = M(
      () => Wt(g.value)[0]
    ), O = M(
      () => Wt(g.value)[1]
    );
    ne(() => {
      var C;
      b.value && ((C = n.onPlaced) == null || C.call(n));
    });
    const k = M(
      () => {
        var C;
        return ((C = w.value.arrow) == null ? void 0 : C.centerOffset) !== 0;
      }
    ), T = B("");
    ne(() => {
      l.value && (T.value = window.getComputedStyle(l.value).zIndex);
    });
    const R = M(() => {
      var C;
      return ((C = w.value.arrow) == null ? void 0 : C.x) ?? 0;
    }), N = M(() => {
      var C;
      return ((C = w.value.arrow) == null ? void 0 : C.y) ?? 0;
    });
    return Ga({
      placedSide: x,
      onArrowChange: (C) => u.value = C,
      arrowX: R,
      arrowY: N,
      shouldHideArrow: k
    }), t({
      $el: l
    }), (C, F) => {
      var A, G, L;
      return _(), j("div", {
        ref_key: "floatingRef",
        ref: i,
        "data-radix-popper-content-wrapper": "",
        style: ze({
          ...s(y),
          transform: s(b) ? s(y).transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: T.value,
          "--radix-popper-transform-origin": [
            (A = s(w).transformOrigin) == null ? void 0 : A.x,
            (G = s(w).transformOrigin) == null ? void 0 : G.y
          ].join(" ")
        })
      }, [
        I(s(z), V({
          ref: (H) => {
            s(a)(H), r.value = H;
          }
        }, C.$attrs, {
          "as-child": n.asChild,
          as: C.as,
          "data-side": x.value,
          "data-align": O.value,
          style: {
            // if the PopperContent hasn't been placed yet (not all measurements done)
            // we prevent animations so that users's animation don't kick in too early referring wrong sides
            animation: s(b) ? void 0 : "none",
            // hide the content if using the hide middleware and should be hidden
            opacity: (L = s(w).hide) != null && L.referenceHidden ? 0 : void 0
          }
        }), {
          default: E(() => [
            P(C.$slots, "default")
          ]),
          _: 3
        }, 16, ["as-child", "as", "data-side", "data-align", "style"])
      ], 4);
    };
  }
}), Xa = /* @__PURE__ */ S({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "span" }
  },
  setup(e) {
    return (t, n) => (_(), $(s(z), {
      as: t.as,
      "as-child": t.asChild,
      style: ze({
        // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
        position: "absolute",
        border: 0,
        width: "1px",
        display: "inline-block",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal"
      })
    }, {
      default: E(() => [
        P(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "style"]));
  }
}), [yo, rs] = Y("CollectionProvider");
S({
  name: "CollectionSlot",
  setup(e, { slots: t }) {
    const n = yo(), { primitiveElement: o, currentElement: a } = J();
    return q(a, () => {
      n.collectionRef.value = a.value;
    }), () => Ge(sn, { ref: o }, t);
  }
});
S({
  name: "CollectionItem",
  setup(e, { slots: t, attrs: n }) {
    const o = yo(), { primitiveElement: a, currentElement: r } = J(), l = Te();
    return ne((i) => {
      var u;
      if (r.value) {
        const c = vn(r.value);
        o.itemMap.value.set(c, { ref: r.value, ...vn(((u = l == null ? void 0 : l.parent) == null ? void 0 : u.props) ?? {}) }), i(() => o.itemMap.value.delete(c));
      }
    }), () => Ge(sn, { ...n, [o.attrName]: "", ref: a }, t);
  }
});
const [Ya, as] = Y(["MenuRoot", "MenuSub"], "MenuContext"), [Ja, ls] = Y("MenuRoot"), Za = "rovingFocusGroup.onEntryFocus", Qa = { bubbles: !1, cancelable: !0 };
function el(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t))
      return;
}
const [is, tl] = Y("RovingFocusGroup"), nl = /* @__PURE__ */ S({
  __name: "RovingFocusGroup",
  props: {
    orientation: { default: void 0 },
    dir: {},
    loop: { type: Boolean, default: !1 },
    currentTabStopId: {},
    defaultCurrentTabStopId: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["entryFocus", "update:currentTabStopId"],
  setup(e, { emit: t }) {
    const n = e, o = t, { loop: a, orientation: r, dir: l } = xe(n), i = no(l), u = $e(n, "currentTabStopId", o, {
      defaultValue: n.defaultCurrentTabStopId,
      passive: n.currentTabStopId === void 0
    }), c = B(!1), p = B(!1), d = B(0), { primitiveElement: f, currentElement: m } = J(), { createCollection: v } = ut("rovingFocus"), h = v(m);
    function y(g) {
      const b = !p.value;
      if (g.currentTarget && g.target === g.currentTarget && b && !c.value) {
        const w = new CustomEvent(Za, Qa);
        if (g.currentTarget.dispatchEvent(w), o("entryFocus", w), !w.defaultPrevented) {
          const x = h.value, O = x.find((R) => R.getAttribute("data-active") === "true"), k = x.find(
            (R) => R.id === u.value
          ), T = [O, k, ...x].filter(
            Boolean
          );
          el(T);
        }
      }
      p.value = !1;
    }
    return tl({
      loop: a,
      dir: i,
      orientation: r,
      currentTabStopId: u,
      onItemFocus: (g) => {
        u.value = g;
      },
      onItemShiftTab: () => {
        c.value = !0;
      },
      onFocusableItemAdd: () => {
        d.value++;
      },
      onFocusableItemRemove: () => {
        d.value--;
      }
    }), (g, b) => (_(), $(s(z), {
      ref_key: "primitiveElement",
      ref: f,
      tabindex: c.value || d.value === 0 ? -1 : 0,
      "data-orientation": s(r),
      as: g.as,
      "as-child": g.asChild,
      dir: s(i),
      style: { outline: "none" },
      onMousedown: b[0] || (b[0] = (w) => p.value = !0),
      onFocus: y,
      onBlur: b[1] || (b[1] = (w) => c.value = !1)
    }, {
      default: E(() => [
        P(g.$slots, "default")
      ]),
      _: 3
    }, 8, ["tabindex", "data-orientation", "as", "as-child", "dir"]));
  }
}), [ss, ol] = Y("MenuContent");
Dn({
  loop: { type: Boolean },
  disableOutsidePointerEvents: { type: Boolean },
  disableOutsideScroll: { type: Boolean },
  trapFocus: { type: Boolean },
  side: {},
  sideOffset: {},
  align: {},
  alignOffset: {},
  avoidCollisions: { type: Boolean },
  collisionBoundary: {},
  collisionPadding: {},
  arrowPadding: {},
  sticky: {},
  hideWhenDetached: { type: Boolean },
  updatePositionStrategy: {},
  prioritizePosition: { type: Boolean },
  asChild: { type: Boolean },
  as: { type: [String, Object, Function] }
}, {
  ...ho
});
const rl = /* @__PURE__ */ S({
  __name: "Label",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "label" }
  },
  setup(e) {
    const t = e;
    return (n, o) => (_(), $(s(z), V(t, {
      onMousedown: o[0] || (o[0] = (a) => {
        !a.defaultPrevented && a.detail > 1 && a.preventDefault();
      })
    }), {
      default: E(() => [
        P(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), it = 100, [al, ll] = Y("ProgressRoot"), pn = (e) => typeof e == "number";
function il(e, t) {
  return e === null || pn(e) && !Number.isNaN(e) && e <= t && e >= 0 ? e : (console.error(`Invalid prop \`value\` of value \`${e}\` supplied to \`ProgressRoot\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${it} if no \`max\` prop is set)
  - \`null\` if the progress is indeterminate.

Defaulting to \`null\`.`), null);
}
function sl(e) {
  return pn(e) && !Number.isNaN(e) && e > 0 ? e : (console.error(
    `Invalid prop \`max\` of value \`${e}\` supplied to \`ProgressRoot\`. Only numbers greater than 0 are valid max values. Defaulting to \`${it}\`.`
  ), it);
}
const ul = /* @__PURE__ */ S({
  __name: "ProgressRoot",
  props: {
    modelValue: {},
    max: { default: it },
    getValueLabel: { type: Function, default: (e, t) => `${Math.round(e / t * it)}%` },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue", "update:max"],
  setup(e, { emit: t }) {
    const n = e, o = t, a = $e(n, "modelValue", o, {
      passive: n.modelValue === void 0
    }), r = $e(n, "max", o, {
      passive: n.max === void 0
    });
    q(
      () => a.value,
      async (i) => {
        const u = il(i, n.max);
        u !== i && (await ee(), a.value = u);
      },
      { immediate: !0 }
    ), q(
      () => n.max,
      (i) => {
        const u = sl(n.max);
        u !== i && (r.value = u);
      },
      { immediate: !0 }
    );
    const l = M(() => a.value ? a.value === r.value ? "complete" : "loading" : "indeterminate");
    return ll({
      modelValue: a,
      max: r,
      progressState: l
    }), (i, u) => (_(), $(s(z), {
      "as-child": n.asChild,
      as: i.as,
      "aria-valuemax": s(r),
      "aria-valuemin": 0,
      "aria-valuenow": pn(s(a)) ? s(a) : void 0,
      "aria-valuetext": i.getValueLabel(s(a), s(r)),
      "aria-label": i.getValueLabel(s(a), s(r)),
      role: "progressbar",
      "data-state": l.value,
      "data-value": s(a) ?? void 0,
      "data-max": s(r)
    }, {
      default: E(() => [
        P(i.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-label", "data-state", "data-value", "data-max"]));
  }
}), dl = /* @__PURE__ */ S({
  __name: "ProgressIndicator",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  setup(e) {
    const t = e, n = al();
    return (o, a) => {
      var r;
      return _(), $(s(z), V(t, {
        "data-state": s(n).progressState.value,
        "data-value": ((r = s(n).modelValue) == null ? void 0 : r.value) ?? void 0,
        "data-max": s(n).max.value
      }), {
        default: E(() => [
          P(o.$slots, "default")
        ]),
        _: 3
      }, 16, ["data-state", "data-value", "data-max"]);
    };
  }
}), cl = ["default-value"], pl = /* @__PURE__ */ S({
  __name: "BubbleSelect",
  props: {
    autocomplete: {},
    autofocus: { type: Boolean },
    disabled: { type: Boolean },
    form: {},
    multiple: { type: Boolean },
    name: {},
    required: { type: Boolean },
    size: {},
    value: {}
  },
  setup(e) {
    const t = e, { value: n } = xe(t);
    qr(n);
    const o = B();
    return (a, r) => (_(), $(s(Xa), { "as-child": "" }, {
      default: E(() => [
        Yt(pe("select", V({
          ref_key: "selectElement",
          ref: o
        }, t, {
          "onUpdate:modelValue": r[0] || (r[0] = (l) => Jt(n) ? n.value = l : null),
          "default-value": s(n)
        }), [
          P(a.$slots, "default")
        ], 16, cl), [
          [Wo, s(n)]
        ])
      ]),
      _: 3
    }));
  }
}), fl = {
  key: 0,
  value: ""
}, [je, bo] = Y("SelectRoot"), [ml, vl] = Y("SelectRoot"), hl = /* @__PURE__ */ S({
  __name: "SelectRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean },
    defaultValue: { default: "" },
    modelValue: { default: void 0 },
    orientation: { default: "vertical" },
    dir: {},
    name: {},
    autocomplete: {},
    disabled: { type: Boolean },
    required: { type: Boolean }
  },
  emits: ["update:modelValue", "update:open"],
  setup(e, { emit: t }) {
    const n = e, o = t, a = $e(n, "modelValue", o, {
      defaultValue: n.defaultValue,
      passive: n.modelValue === void 0
    }), r = $e(n, "open", o, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), l = B(), i = B(), u = B({
      x: 0,
      y: 0
    }), c = B(!1), { required: p, disabled: d, dir: f } = xe(n), m = no(f);
    bo({
      triggerElement: l,
      onTriggerChange: (g) => {
        l.value = g;
      },
      valueElement: i,
      onValueElementChange: (g) => {
        i.value = g;
      },
      valueElementHasChildren: c,
      onValueElementHasChildrenChange: (g) => {
        c.value = g;
      },
      contentId: Ne(),
      modelValue: a,
      onValueChange: (g) => {
        a.value = g;
      },
      open: r,
      required: p,
      onOpenChange: (g) => {
        r.value = g;
      },
      dir: m,
      triggerPointerDownPosRef: u,
      disabled: d
    });
    const v = an(l), h = B(/* @__PURE__ */ new Set()), y = M(() => Array.from(h.value).map((g) => {
      var b;
      return (b = g.props) == null ? void 0 : b.value;
    }).join(";"));
    return vl({
      onNativeOptionAdd: (g) => {
        h.value.add(g);
      },
      onNativeOptionRemove: (g) => {
        h.value.delete(g);
      }
    }), (g, b) => (_(), $(s(Ha), null, {
      default: E(() => [
        P(g.$slots, "default"),
        s(v) ? (_(), $(pl, V({ key: y.value }, g.$attrs, {
          "aria-hidden": "",
          tabindex: "-1",
          required: s(p),
          name: g.name,
          autocomplete: g.autocomplete,
          disabled: s(d),
          value: s(a),
          onChange: b[0] || (b[0] = (w) => a.value = w.target.value)
        }), {
          default: E(() => [
            s(a) === void 0 ? (_(), j("option", fl)) : X("", !0),
            (_(!0), j(le, null, Vt(Array.from(h.value), (w) => (_(), $(Ln(w), V(w.props, {
              key: w.key ?? ""
            }), null, 16))), 128))
          ]),
          _: 1
        }, 16, ["required", "name", "autocomplete", "disabled", "value"])) : X("", !0)
      ]),
      _: 3
    }));
  }
}), gl = [" ", "Enter", "ArrowUp", "ArrowDown"], yl = [" ", "Enter"], he = 10;
function wo(e) {
  return e === "" || e === void 0;
}
const bl = /* @__PURE__ */ S({
  __name: "SelectTrigger",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "button" }
  },
  setup(e) {
    const t = e, n = je(), o = M(() => {
      var f;
      return ((f = n.disabled) == null ? void 0 : f.value) || t.disabled;
    }), { primitiveElement: a, currentElement: r } = J();
    re(() => {
      n.triggerElement = r;
    });
    const { injectCollection: l } = ut(), i = l(), { search: u, handleTypeaheadSearch: c, resetTypeahead: p } = ln(i);
    function d() {
      o.value || (n.onOpenChange(!0), p());
    }
    return (f, m) => (_(), $(s(Ka), { "as-child": "" }, {
      default: E(() => {
        var v, h, y, g;
        return [
          I(s(z), {
            ref_key: "primitiveElement",
            ref: a,
            role: "combobox",
            type: f.as === "button" ? "button" : void 0,
            "aria-controls": s(n).contentId,
            "aria-expanded": s(n).open.value || !1,
            "aria-required": (v = s(n).required) == null ? void 0 : v.value,
            "aria-autocomplete": "none",
            disabled: f.disabled,
            dir: (h = s(n)) == null ? void 0 : h.dir.value,
            "data-state": (y = s(n)) != null && y.open.value ? "open" : "closed",
            "data-disabled": o.value ? "" : void 0,
            "data-placeholder": s(wo)((g = s(n).modelValue) == null ? void 0 : g.value) ? "" : void 0,
            "as-child": f.asChild,
            as: f.as,
            onClick: m[0] || (m[0] = (b) => {
              var w;
              (w = b == null ? void 0 : b.currentTarget) == null || w.focus();
            }),
            onPointerdown: m[1] || (m[1] = (b) => {
              const w = b.target;
              w.hasPointerCapture(b.pointerId) && w.releasePointerCapture(b.pointerId), b.button === 0 && b.ctrlKey === !1 && (d(), s(n).triggerPointerDownPosRef.value = {
                x: Math.round(b.pageX),
                y: Math.round(b.pageY)
              }, b.preventDefault());
            }),
            onPointerup: m[2] || (m[2] = qe(() => {
            }, ["prevent"])),
            onKeydown: m[3] || (m[3] = (b) => {
              const w = s(u) !== "";
              !(b.ctrlKey || b.altKey || b.metaKey) && b.key.length === 1 && w && b.key === " " || (s(c)(b.key), s(gl).includes(b.key) && (d(), b.preventDefault()));
            })
          }, {
            default: E(() => [
              P(f.$slots, "default")
            ]),
            _: 3
          }, 8, ["type", "aria-controls", "aria-expanded", "aria-required", "disabled", "dir", "data-state", "data-disabled", "data-placeholder", "as-child", "as"])
        ];
      }),
      _: 3
    }));
  }
}), wl = /* @__PURE__ */ S({
  __name: "SelectPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, o) => (_(), $(s(io), ge(Ae(t)), {
      default: E(() => [
        P(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), [xl, Cl] = Y("SelectItemAlignedPosition"), _l = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "SelectItemAlignedPosition",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  emits: ["placed"],
  setup(e, { emit: t }) {
    const n = e, o = t, { injectCollection: a } = ut(), r = je(), l = At(), i = a(), u = B(!1), c = B(!0), p = B(), { primitiveElement: d, currentElement: f } = J(), { viewport: m, selectedItem: v, selectedItemText: h, focusSelectedItem: y } = l;
    function g() {
      if (r.triggerElement.value && r.valueElement.value && p.value && f.value && m != null && m.value && v != null && v.value && h != null && h.value) {
        const x = r.triggerElement.value.getBoundingClientRect(), O = f.value.getBoundingClientRect(), k = r.valueElement.value.getBoundingClientRect(), T = h.value.getBoundingClientRect();
        if (r.dir.value !== "rtl") {
          const Re = T.left - O.left, me = k.left - Re, et = x.left - me, De = x.width + et, Bt = Math.max(De, O.width), Pt = window.innerWidth - he, $t = _n(me, he, Pt - Bt);
          p.value.style.minWidth = `${De}px`, p.value.style.left = `${$t}px`;
        } else {
          const Re = O.right - T.right, me = window.innerWidth - k.right - Re, et = window.innerWidth - x.right - me, De = x.width + et, Bt = Math.max(De, O.width), Pt = window.innerWidth - he, $t = _n(
            me,
            he,
            Pt - Bt
          );
          p.value.style.minWidth = `${De}px`, p.value.style.right = `${$t}px`;
        }
        const R = i.value, N = window.innerHeight - he * 2, C = m.value.scrollHeight, F = window.getComputedStyle(f.value), A = Number.parseInt(
          F.borderTopWidth,
          10
        ), G = Number.parseInt(F.paddingTop, 10), L = Number.parseInt(
          F.borderBottomWidth,
          10
        ), H = Number.parseInt(
          F.paddingBottom,
          10
        ), K = A + G + C + H + L, Z = Math.min(
          v.value.offsetHeight * 5,
          K
        ), _e = window.getComputedStyle(m.value), Me = Number.parseInt(_e.paddingTop, 10), pt = Number.parseInt(
          _e.paddingBottom,
          10
        ), ie = x.top + x.height / 2 - he, We = N - ie, St = v.value.offsetHeight / 2, Mo = v.value.offsetTop + St, ft = A + G + Mo, Ro = K - ft;
        if (ft <= ie) {
          const Re = v.value === R[R.length - 1];
          p.value.style.bottom = "0px";
          const me = f.value.clientHeight - m.value.offsetTop - m.value.offsetHeight, et = Math.max(
            We,
            St + (Re ? pt : 0) + me + L
          ), De = ft + et;
          p.value.style.height = `${De}px`;
        } else {
          const Re = v.value === R[0];
          p.value.style.top = "0px";
          const me = Math.max(
            ie,
            A + m.value.offsetTop + (Re ? Me : 0) + St
          ) + Ro;
          p.value.style.height = `${me}px`, m.value.scrollTop = ft - ie + m.value.offsetTop;
        }
        p.value.style.margin = `${he}px 0`, p.value.style.minHeight = `${Z}px`, p.value.style.maxHeight = `${N}px`, o("placed"), requestAnimationFrame(() => u.value = !0);
      }
    }
    const b = B("");
    re(async () => {
      await ee(), g(), f.value && (b.value = window.getComputedStyle(f.value).zIndex);
    });
    function w(x) {
      x && c.value === !0 && (g(), y == null || y(), c.value = !1);
    }
    return Cl({
      contentWrapper: p,
      shouldExpandOnScrollRef: u,
      onScrollButtonChange: w
    }), (x, O) => (_(), j("div", {
      ref_key: "contentWrapperElement",
      ref: p,
      style: ze({
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        zIndex: b.value
      })
    }, [
      I(s(z), V({
        ref_key: "primitiveElement",
        ref: d,
        style: {
          // When we get the height of the content, it includes borders. If we were to set
          // the height without having `boxSizing: 'border-box'` it would be too big.
          boxSizing: "border-box",
          // We need to ensure the content doesn't get taller than the wrapper
          maxHeight: "100%"
        }
      }, { ...x.$attrs, ...n }), {
        default: E(() => [
          P(x.$slots, "default")
        ]),
        _: 3
      }, 16, ["style"])
    ], 4));
  }
}), El = /* @__PURE__ */ S({
  __name: "SelectPopperPosition",
  props: {
    side: {},
    sideOffset: {},
    align: { default: "start" },
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: { default: he },
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    onPlaced: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = ro(e);
    return (n, o) => (_(), $(s(go), V(s(t), { style: {
      // Ensure border-box for floating-ui calculations
      boxSizing: "border-box",
      "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
      "--radix-select-content-available-width": "var(--radix-popper-available-width)",
      "--radix-select-content-available-height": "var(--radix-popper-available-height)",
      "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
      "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
    } }), {
      default: E(() => [
        P(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["style"]));
  }
}), fn = {
  onViewportChange: () => {
  },
  itemTextRefCallback: () => {
  },
  itemRefCallback: () => {
  }
}, [At, Ol] = Y("SelectContent"), kl = /* @__PURE__ */ S({
  __name: "SelectContentImpl",
  props: {
    position: {},
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    onPlaced: { type: Function },
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  emits: ["closeAutoFocus", "escapeKeyDown", "pointerDownOutside"],
  setup(e, { emit: t }) {
    const n = e, o = t, a = je();
    oo(), rn(!0);
    const { createCollection: r } = ut(), l = B();
    lo(l);
    const i = r(l), { search: u, handleTypeaheadSearch: c } = ln(i), p = B(), d = B(), f = B(), m = B(!1), v = B(!1);
    function h() {
      d.value && l.value && jt([d.value, l.value]);
    }
    q(m, () => {
      h();
    });
    const { onOpenChange: y, triggerPointerDownPosRef: g } = a;
    ne((x) => {
      if (!l.value)
        return;
      let O = { x: 0, y: 0 };
      const k = (R) => {
        var N, C;
        O = {
          x: Math.abs(
            Math.round(R.pageX) - (((N = g.value) == null ? void 0 : N.x) ?? 0)
          ),
          y: Math.abs(
            Math.round(R.pageY) - (((C = g.value) == null ? void 0 : C.y) ?? 0)
          )
        };
      }, T = (R) => {
        var N;
        O.x <= 10 && O.y <= 10 ? R.preventDefault() : (N = l.value) != null && N.contains(R.target) || y(!1), document.removeEventListener("pointermove", k), g.value = null;
      };
      g.value !== null && (document.addEventListener("pointermove", k), document.addEventListener("pointerup", T, {
        capture: !0,
        once: !0
      })), x(() => {
        document.removeEventListener("pointermove", k), document.removeEventListener("pointerup", T, {
          capture: !0
        });
      });
    });
    function b(x) {
      const O = x.ctrlKey || x.altKey || x.metaKey;
      if (x.key === "Tab" && x.preventDefault(), !O && x.key.length === 1 && c(x.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(x.key)) {
        let k = i.value;
        if (["ArrowUp", "End"].includes(x.key) && (k = k.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(x.key)) {
          const T = x.target, R = k.indexOf(T);
          k = k.slice(R + 1);
        }
        setTimeout(() => jt(k)), x.preventDefault();
      }
    }
    const w = M(() => n.position === "popper" ? n : {});
    return Ol({
      content: l,
      viewport: p,
      onViewportChange: (x) => {
        p.value = x;
      },
      itemRefCallback: (x, O, k) => {
        var T, R;
        const N = !v.value && !k;
        (((T = a.modelValue) == null ? void 0 : T.value) !== void 0 && ((R = a.modelValue) == null ? void 0 : R.value) === O || N) && (d.value = x, N && (v.value = !0));
      },
      selectedItem: d,
      selectedItemText: f,
      onItemLeave: () => {
        var x;
        (x = l.value) == null || x.focus();
      },
      itemTextRefCallback: (x, O, k) => {
        var T, R;
        const N = !v.value && !k;
        (((T = a.modelValue) == null ? void 0 : T.value) !== void 0 && ((R = a.modelValue) == null ? void 0 : R.value) === O || N) && (f.value = x);
      },
      focusSelectedItem: h,
      position: n.position,
      isPositioned: m,
      searchRef: u
    }), (x, O) => (_(), $(s(dn), {
      "as-child": "",
      onMountAutoFocus: O[6] || (O[6] = qe(() => {
      }, ["prevent"])),
      onUnmountAutoFocus: O[7] || (O[7] = (k) => {
        var T;
        o("closeAutoFocus", k), !k.defaultPrevented && ((T = s(a).triggerElement.value) == null || T.focus({ preventScroll: !0 }), k.preventDefault());
      })
    }, {
      default: E(() => [
        I(s(un), {
          "as-child": "",
          "disable-outside-pointer-events": "",
          onFocusOutside: O[2] || (O[2] = qe(() => {
          }, ["prevent"])),
          onDismiss: O[3] || (O[3] = (k) => s(a).onOpenChange(!1)),
          onEscapeKeyDown: O[4] || (O[4] = (k) => o("escapeKeyDown", k)),
          onPointerDownOutside: O[5] || (O[5] = (k) => o("pointerDownOutside", k))
        }, {
          default: E(() => [
            (_(), $(Ln(
              x.position === "popper" ? El : _l
            ), V({ ...x.$attrs, ...w.value }, {
              id: s(a).contentId,
              ref: (k) => {
                l.value = s(Fe)(k);
              },
              role: "listbox",
              "data-state": s(a).open.value ? "open" : "closed",
              dir: s(a).dir.value,
              style: {
                // flex layout so we can place the scroll buttons properly
                display: "flex",
                flexDirection: "column",
                // reset the outline by default as the content MAY get focused
                outline: "none"
              },
              onContextmenu: O[0] || (O[0] = qe(() => {
              }, ["prevent"])),
              onPlaced: O[1] || (O[1] = (k) => m.value = !0),
              onKeydown: b
            }), {
              default: E(() => [
                P(x.$slots, "default")
              ]),
              _: 3
            }, 16, ["id", "data-state", "dir", "onKeydown"]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }));
  }
}), Al = /* @__PURE__ */ S({
  __name: "SelectProvider",
  props: {
    context: {}
  },
  setup(e) {
    return bo(e.context), (t, n) => P(t.$slots, "default");
  }
}), Sl = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "SelectContent",
  props: {
    forceMount: { type: Boolean },
    position: { default: "item-aligned" },
    side: {},
    sideOffset: {},
    align: { default: "start" },
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    onPlaced: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["closeAutoFocus", "escapeKeyDown", "pointerDownOutside"],
  setup(e, { emit: t }) {
    const n = ct(e, t), o = je(), a = B();
    re(() => {
      a.value = new DocumentFragment();
    });
    const r = B();
    return (l, i) => {
      var u;
      return _(), j(le, null, [
        I(s(kt), {
          ref_key: "presenceRef",
          ref: r,
          present: l.forceMount || s(o).open.value
        }, {
          default: E(() => [
            I(kl, ge(Ae({ ...s(n), ...l.$attrs })), {
              default: E(() => [
                P(l.$slots, "default")
              ]),
              _: 3
            }, 16)
          ]),
          _: 3
        }, 8, ["present"]),
        !((u = r.value) != null && u.present) && a.value ? (_(), $(Gt, {
          key: 0,
          to: a.value
        }, [
          I(Al, { context: s(o) }, {
            default: E(() => [
              pe("div", null, [
                P(l.$slots, "default")
              ])
            ]),
            _: 3
          }, 8, ["context"])
        ], 8, ["to"])) : X("", !0)
      ], 64);
    };
  }
}), [xo, Bl] = Y("SelectItem"), Pl = /* @__PURE__ */ S({
  __name: "SelectItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  setup(e) {
    const t = e, { disabled: n } = xe(t), o = je(), a = At(fn), { primitiveElement: r, currentElement: l } = J(), i = M(() => {
      var h;
      return ((h = o.modelValue) == null ? void 0 : h.value) === t.value;
    }), u = B(!1), c = B(t.textValue ?? ""), p = Ne();
    async function d(h) {
      await ee(), !(h != null && h.defaultPrevented) && (n.value || (o.onValueChange(t.value), o.onOpenChange(!1)));
    }
    async function f(h) {
      var y;
      await ee(), !h.defaultPrevented && (n.value ? (y = a.onItemLeave) == null || y.call(a) : h.currentTarget.focus({ preventScroll: !0 }));
    }
    async function m(h) {
      var y;
      await ee(), !h.defaultPrevented && h.currentTarget === document.activeElement && ((y = a.onItemLeave) == null || y.call(a));
    }
    async function v(h) {
      var y;
      await ee(), !(h.defaultPrevented || ((y = a.searchRef) == null ? void 0 : y.value) !== "" && h.key === " ") && (yl.includes(h.key) && d(), h.key === " " && h.preventDefault());
    }
    if (t.value === "")
      throw new Error(
        "A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return re(() => {
      l.value && a.itemRefCallback(
        l.value,
        t.value,
        t.disabled
      );
    }), Bl({
      value: t.value,
      disabled: n,
      textId: p,
      isSelected: i,
      onItemTextChange: (h) => {
        c.value = ((c.value || (h == null ? void 0 : h.textContent)) ?? "").trim();
      }
    }), (h, y) => (_(), $(s(z), {
      ref_key: "primitiveElement",
      ref: r,
      role: "option",
      "data-radix-vue-collection-item": "",
      "aria-labelledby": s(p),
      "data-highlighted": u.value ? "" : void 0,
      "aria-selected": i.value && u.value,
      "data-state": i.value ? "checked" : "unchecked",
      "aria-disabled": s(n) || void 0,
      "data-disabled": s(n) ? "" : void 0,
      tabindex: s(n) ? void 0 : -1,
      as: h.as,
      "as-child": h.asChild,
      onFocus: y[0] || (y[0] = (g) => u.value = !0),
      onBlur: y[1] || (y[1] = (g) => u.value = !1),
      onPointerup: d,
      onPointermove: f,
      onPointerleave: m,
      onKeydown: v
    }, {
      default: E(() => [
        P(h.$slots, "default")
      ]),
      _: 3
    }, 8, ["aria-labelledby", "data-highlighted", "aria-selected", "data-state", "aria-disabled", "data-disabled", "tabindex", "as", "as-child"]));
  }
}), $l = /* @__PURE__ */ S({
  __name: "SelectItemIndicator",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "span" }
  },
  setup(e) {
    const t = e, n = xo();
    return (o, a) => s(n).isSelected.value ? (_(), $(s(z), V({
      key: 0,
      "aria-hidden": ""
    }, t), {
      default: E(() => [
        P(o.$slots, "default")
      ]),
      _: 3
    }, 16)) : X("", !0);
  }
}), [Tl, Fl] = Y("SelectGroup"), Ml = /* @__PURE__ */ S({
  __name: "SelectGroup",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  setup(e) {
    const t = e, n = Ne();
    return Fl({ id: n }), (o, a) => (_(), $(s(z), V({ role: "group" }, t, { "aria-labelledby": s(n) }), {
      default: E(() => [
        P(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-labelledby"]));
  }
}), Rl = /* @__PURE__ */ S({
  __name: "SelectLabel",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "div" }
  },
  setup(e) {
    const t = e, n = Tl({ id: "" });
    return (o, a) => (_(), $(s(z), V(t, {
      id: s(n).id
    }), {
      default: E(() => [
        P(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
}), Dl = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "SelectItemText",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "span" }
  },
  setup(e) {
    const t = e, n = je(), o = At(fn), a = ml(), r = xo(), { primitiveElement: l, currentElement: i } = J(), u = M(() => {
      var c;
      return Ge("option", {
        key: r.value,
        value: r.value,
        disabled: r.disabled.value,
        innerHTML: (c = i.value) == null ? void 0 : c.textContent
      });
    });
    return re(() => {
      i.value && (r.onItemTextChange(i.value), o.itemTextRefCallback(
        i.value,
        r.value,
        r.disabled.value
      ), a.onNativeOptionAdd(u.value));
    }), Vn(() => {
      a.onNativeOptionRemove(u.value);
    }), (c, p) => (_(), j(le, null, [
      I(s(z), V({
        id: s(r).textId,
        ref_key: "primitiveElement",
        ref: l
      }, { ...t, ...c.$attrs }), {
        default: E(() => [
          P(c.$slots, "default")
        ]),
        _: 3
      }, 16, ["id"]),
      s(r).isSelected.value && s(n).valueElement.value && !s(n).valueElementHasChildren.value ? (_(), $(Gt, {
        key: 0,
        to: s(n).valueElement.value
      }, [
        P(c.$slots, "default")
      ], 8, ["to"])) : X("", !0)
    ], 64));
  }
}), Vl = /* @__PURE__ */ S({
  __name: "SelectViewport",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  setup(e) {
    const t = e, n = At(fn), o = n.position === "item-aligned" ? xl() : void 0, { primitiveElement: a, currentElement: r } = J();
    re(() => {
      n == null || n.onViewportChange(r.value);
    });
    const l = B(0);
    function i(u) {
      const c = u.currentTarget, { shouldExpandOnScrollRef: p, contentWrapper: d } = o ?? {};
      if (p != null && p.value && d != null && d.value) {
        const f = Math.abs(l.value - c.scrollTop);
        if (f > 0) {
          const m = window.innerHeight - he * 2, v = Number.parseFloat(
            d.value.style.minHeight
          ), h = Number.parseFloat(d.value.style.height), y = Math.max(v, h);
          if (y < m) {
            const g = y + f, b = Math.min(m, g), w = g - b;
            d.value.style.height = `${b}px`, d.value.style.bottom === "0px" && (c.scrollTop = w > 0 ? w : 0, d.value.style.justifyContent = "flex-end");
          }
        }
      }
      l.value = c.scrollTop;
    }
    return (u, c) => (_(), j(le, null, [
      I(s(z), { as: "style" }, {
        default: E(() => [
          se(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-radix-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-radix-select-viewport]::-webkit-scrollbar { display: none; } ")
        ]),
        _: 1
      }),
      I(s(z), V({
        ref_key: "primitiveElement",
        ref: a,
        "data-radix-select-viewport": "",
        role: "presentation"
      }, { ...u.$attrs, ...t }, {
        style: {
          // we use position: 'relative' here on the `viewport` so that when we call
          // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
          // (independent of the scrollUpButton).
          position: "relative",
          flex: 1,
          overflow: "auto"
        },
        onScroll: i
      }), {
        default: E(() => [
          P(u.$slots, "default")
        ]),
        _: 3
      }, 16, ["style"])
    ], 64));
  }
}), Il = /* @__PURE__ */ S({
  __name: "SelectValue",
  props: {
    placeholder: { default: "" },
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "span" }
  },
  setup(e) {
    const { primitiveElement: t, currentElement: n } = J(), o = je(), a = No();
    return Lo(() => {
      var r;
      const l = !!Ot((r = a == null ? void 0 : a.default) == null ? void 0 : r.call(a)).length;
      o.onValueElementHasChildrenChange(l);
    }), re(() => {
      o.valueElement = n;
    }), (r, l) => (_(), $(s(z), {
      ref_key: "primitiveElement",
      ref: t,
      as: r.as,
      "as-child": r.asChild,
      style: { pointerEvents: "none" }
    }, {
      default: E(() => {
        var i;
        return [
          s(wo)((i = s(o).modelValue) == null ? void 0 : i.value) ? (_(), j(le, { key: 0 }, [
            se(ue(r.placeholder), 1)
          ], 64)) : P(r.$slots, "default", { key: 1 })
        ];
      }),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), Nl = /* @__PURE__ */ S({
  __name: "SelectIcon",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "span" }
  },
  setup(e) {
    return (t, n) => (_(), $(s(z), {
      "aria-hidden": "",
      as: t.as,
      "as-child": t.asChild
    }, {
      default: E(() => [
        P(t.$slots, "default", {}, () => [
          se("▼")
        ])
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), Ll = ["name", "disabled", "required", "value", "checked", "data-state", "data-disabled"], [zl, jl] = Y("SwitchRoot"), Wl = /* @__PURE__ */ S({
  __name: "SwitchRoot",
  props: {
    defaultChecked: { type: Boolean },
    checked: { type: Boolean, default: void 0 },
    disabled: { type: Boolean },
    required: { type: Boolean },
    name: {},
    id: {},
    value: { default: "on" },
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "button" }
  },
  emits: ["update:checked"],
  setup(e, { emit: t }) {
    const n = e, o = t, { disabled: a } = xe(n), r = $e(n, "checked", o, {
      defaultValue: n.defaultChecked,
      passive: n.checked === void 0
    });
    function l() {
      a.value || (r.value = !r.value);
    }
    const { primitiveElement: i, currentElement: u } = J(), c = an(u), p = M(() => {
      var d;
      return n.id && u.value ? (d = document.querySelector(`[for="${n.id}"]`)) == null ? void 0 : d.innerText : void 0;
    });
    return jl({
      checked: r,
      toggleCheck: l,
      disabled: a
    }), (d, f) => (_(), j(le, null, [
      I(s(z), V(d.$attrs, {
        id: d.id,
        ref_key: "primitiveElement",
        ref: i,
        role: "switch",
        type: d.as === "button" ? "button" : void 0,
        value: d.value,
        "aria-label": d.$attrs["aria-label"] || p.value,
        "aria-checked": s(r),
        "aria-required": d.required,
        "data-state": s(r) ? "checked" : "unchecked",
        "data-disabled": s(a) ? "" : void 0,
        "as-child": d.asChild,
        as: d.as,
        disabled: s(a),
        onClick: l,
        onKeydown: Nn(qe(l, ["prevent"]), ["enter"])
      }), {
        default: E(() => [
          P(d.$slots, "default")
        ]),
        _: 3
      }, 16, ["id", "type", "value", "aria-label", "aria-checked", "aria-required", "data-state", "data-disabled", "as-child", "as", "disabled", "onKeydown"]),
      s(c) ? (_(), j("input", {
        key: 0,
        type: "checkbox",
        name: d.name,
        tabindex: "-1",
        "aria-hidden": "",
        disabled: s(a),
        required: d.required,
        value: d.value,
        checked: !!s(r),
        "data-state": s(r) ? "checked" : "unchecked",
        "data-disabled": s(a) ? "" : void 0,
        style: ze({
          transform: "translateX(-100%)",
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        })
      }, null, 12, Ll)) : X("", !0)
    ], 64));
  }
}), Hl = /* @__PURE__ */ S({
  __name: "SwitchThumb",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "span" }
  },
  setup(e) {
    const t = zl();
    return (n, o) => {
      var a;
      return _(), $(s(z), {
        "data-state": (a = s(t).checked) != null && a.value ? "checked" : "unchecked",
        "data-disabled": s(t).disabled.value ? "" : void 0,
        "as-child": n.asChild,
        as: n.as
      }, {
        default: E(() => [
          P(n.$slots, "default")
        ]),
        _: 3
      }, 8, ["data-state", "data-disabled", "as-child", "as"]);
    };
  }
});
function Co(e) {
  var t, n, o = "";
  if (typeof e == "string" || typeof e == "number")
    o += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (n = Co(e[t])) && (o && (o += " "), o += n);
    else
      for (t in e)
        e[t] && (o && (o += " "), o += t);
  return o;
}
function _o() {
  for (var e, t, n = 0, o = ""; n < arguments.length; )
    (e = arguments[n++]) && (t = Co(e)) && (o && (o += " "), o += t);
  return o;
}
const Sn = (e) => typeof e == "boolean" ? "".concat(e) : e === 0 ? "0" : e, Bn = _o, Kl = (e, t) => (n) => {
  var o;
  if ((t == null ? void 0 : t.variants) == null)
    return Bn(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: a, defaultVariants: r } = t, l = Object.keys(a).map((c) => {
    const p = n == null ? void 0 : n[c], d = r == null ? void 0 : r[c];
    if (p === null)
      return null;
    const f = Sn(p) || Sn(d);
    return a[c][f];
  }), i = n && Object.entries(n).reduce((c, p) => {
    let [d, f] = p;
    return f === void 0 || (c[d] = f), c;
  }, {}), u = t == null || (o = t.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((c, p) => {
    let { class: d, className: f, ...m } = p;
    return Object.entries(m).every((v) => {
      let [h, y] = v;
      return Array.isArray(y) ? y.includes({
        ...r,
        ...i
      }[h]) : {
        ...r,
        ...i
      }[h] === y;
    }) ? [
      ...c,
      d,
      f
    ] : c;
  }, []);
  return Bn(e, l, u, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, ql = Kl(
  "inline-flex items-center justify-center relative rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        md: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
), mn = "-";
function Ul(e) {
  const t = Xl(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  function a(l) {
    const i = l.split(mn);
    return i[0] === "" && i.length !== 1 && i.shift(), Eo(i, t) || Gl(l);
  }
  function r(l, i) {
    const u = n[l] || [];
    return i && o[l] ? [...u, ...o[l]] : u;
  }
  return {
    getClassGroupId: a,
    getConflictingClassGroupIds: r
  };
}
function Eo(e, t) {
  var l;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], o = t.nextPart.get(n), a = o ? Eo(e.slice(1), o) : void 0;
  if (a)
    return a;
  if (t.validators.length === 0)
    return;
  const r = e.join(mn);
  return (l = t.validators.find(({
    validator: i
  }) => i(r))) == null ? void 0 : l.classGroupId;
}
const Pn = /^\[(.+)\]$/;
function Gl(e) {
  if (Pn.test(e)) {
    const t = Pn.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}
function Xl(e) {
  const {
    theme: t,
    prefix: n
  } = e, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Jl(Object.entries(e.classGroups), n).forEach(([r, l]) => {
    Ht(l, o, r, t);
  }), o;
}
function Ht(e, t, n, o) {
  e.forEach((a) => {
    if (typeof a == "string") {
      const r = a === "" ? t : $n(t, a);
      r.classGroupId = n;
      return;
    }
    if (typeof a == "function") {
      if (Yl(a)) {
        Ht(a(o), t, n, o);
        return;
      }
      t.validators.push({
        validator: a,
        classGroupId: n
      });
      return;
    }
    Object.entries(a).forEach(([r, l]) => {
      Ht(l, $n(t, r), n, o);
    });
  });
}
function $n(e, t) {
  let n = e;
  return t.split(mn).forEach((o) => {
    n.nextPart.has(o) || n.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(o);
  }), n;
}
function Yl(e) {
  return e.isThemeGetter;
}
function Jl(e, t) {
  return t ? e.map(([n, o]) => {
    const a = o.map((r) => typeof r == "string" ? t + r : typeof r == "object" ? Object.fromEntries(Object.entries(r).map(([l, i]) => [t + l, i])) : r);
    return [n, a];
  }) : e;
}
function Zl(e) {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  function a(r, l) {
    n.set(r, l), t++, t > e && (t = 0, o = n, n = /* @__PURE__ */ new Map());
  }
  return {
    get(r) {
      let l = n.get(r);
      if (l !== void 0)
        return l;
      if ((l = o.get(r)) !== void 0)
        return a(r, l), l;
    },
    set(r, l) {
      n.has(r) ? n.set(r, l) : a(r, l);
    }
  };
}
const Oo = "!";
function Ql(e) {
  const t = e.separator, n = t.length === 1, o = t[0], a = t.length;
  return function(l) {
    const i = [];
    let u = 0, c = 0, p;
    for (let h = 0; h < l.length; h++) {
      let y = l[h];
      if (u === 0) {
        if (y === o && (n || l.slice(h, h + a) === t)) {
          i.push(l.slice(c, h)), c = h + a;
          continue;
        }
        if (y === "/") {
          p = h;
          continue;
        }
      }
      y === "[" ? u++ : y === "]" && u--;
    }
    const d = i.length === 0 ? l : l.substring(c), f = d.startsWith(Oo), m = f ? d.substring(1) : d, v = p && p > c ? p - c : void 0;
    return {
      modifiers: i,
      hasImportantModifier: f,
      baseClassName: m,
      maybePostfixModifierPosition: v
    };
  };
}
function ei(e) {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((o) => {
    o[0] === "[" ? (t.push(...n.sort(), o), n = []) : n.push(o);
  }), t.push(...n.sort()), t;
}
function ti(e) {
  return {
    cache: Zl(e.cacheSize),
    splitModifiers: Ql(e),
    ...Ul(e)
  };
}
const ni = /\s+/;
function oi(e, t) {
  const {
    splitModifiers: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: a
  } = t, r = /* @__PURE__ */ new Set();
  return e.trim().split(ni).map((l) => {
    const {
      modifiers: i,
      hasImportantModifier: u,
      baseClassName: c,
      maybePostfixModifierPosition: p
    } = n(l);
    let d = o(p ? c.substring(0, p) : c), f = !!p;
    if (!d) {
      if (!p)
        return {
          isTailwindClass: !1,
          originalClassName: l
        };
      if (d = o(c), !d)
        return {
          isTailwindClass: !1,
          originalClassName: l
        };
      f = !1;
    }
    const m = ei(i).join(":");
    return {
      isTailwindClass: !0,
      modifierId: u ? m + Oo : m,
      classGroupId: d,
      originalClassName: l,
      hasPostfixModifier: f
    };
  }).reverse().filter((l) => {
    if (!l.isTailwindClass)
      return !0;
    const {
      modifierId: i,
      classGroupId: u,
      hasPostfixModifier: c
    } = l, p = i + u;
    return r.has(p) ? !1 : (r.add(p), a(u, c).forEach((d) => r.add(i + d)), !0);
  }).reverse().map((l) => l.originalClassName).join(" ");
}
function ri() {
  let e = 0, t, n, o = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = ko(t)) && (o && (o += " "), o += n);
  return o;
}
function ko(e) {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = ko(e[o])) && (n && (n += " "), n += t);
  return n;
}
function ai(e, ...t) {
  let n, o, a, r = l;
  function l(u) {
    const c = t.reduce((p, d) => d(p), e());
    return n = ti(c), o = n.cache.get, a = n.cache.set, r = i, i(u);
  }
  function i(u) {
    const c = o(u);
    if (c)
      return c;
    const p = oi(u, n);
    return a(u, p), p;
  }
  return function() {
    return r(ri.apply(null, arguments));
  };
}
function W(e) {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}
const Ao = /^\[(?:([a-z-]+):)?(.+)\]$/i, li = /^\d+\/\d+$/, ii = /* @__PURE__ */ new Set(["px", "full", "screen"]), si = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ui = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, di = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ci = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
function ae(e) {
  return Ve(e) || ii.has(e) || li.test(e);
}
function Ee(e) {
  return Qe(e, "length", bi);
}
function Ve(e) {
  return !!e && !Number.isNaN(Number(e));
}
function yt(e) {
  return Qe(e, "number", Ve);
}
function tt(e) {
  return !!e && Number.isInteger(Number(e));
}
function pi(e) {
  return e.endsWith("%") && Ve(e.slice(0, -1));
}
function D(e) {
  return Ao.test(e);
}
function Oe(e) {
  return si.test(e);
}
const fi = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
function mi(e) {
  return Qe(e, fi, So);
}
function vi(e) {
  return Qe(e, "position", So);
}
const hi = /* @__PURE__ */ new Set(["image", "url"]);
function gi(e) {
  return Qe(e, hi, xi);
}
function yi(e) {
  return Qe(e, "", wi);
}
function nt() {
  return !0;
}
function Qe(e, t, n) {
  const o = Ao.exec(e);
  return o ? o[1] ? typeof t == "string" ? o[1] === t : t.has(o[1]) : n(o[2]) : !1;
}
function bi(e) {
  return ui.test(e);
}
function So() {
  return !1;
}
function wi(e) {
  return di.test(e);
}
function xi(e) {
  return ci.test(e);
}
function Ci() {
  const e = W("colors"), t = W("spacing"), n = W("blur"), o = W("brightness"), a = W("borderColor"), r = W("borderRadius"), l = W("borderSpacing"), i = W("borderWidth"), u = W("contrast"), c = W("grayscale"), p = W("hueRotate"), d = W("invert"), f = W("gap"), m = W("gradientColorStops"), v = W("gradientColorStopPositions"), h = W("inset"), y = W("margin"), g = W("opacity"), b = W("padding"), w = W("saturate"), x = W("scale"), O = W("sepia"), k = W("skew"), T = W("space"), R = W("translate"), N = () => ["auto", "contain", "none"], C = () => ["auto", "hidden", "clip", "visible", "scroll"], F = () => ["auto", D, t], A = () => [D, t], G = () => ["", ae, Ee], L = () => ["auto", Ve, D], H = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], K = () => ["solid", "dashed", "dotted", "double", "none"], Z = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"], _e = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], Me = () => ["", "0", D], pt = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], ie = () => [Ve, yt], We = () => [Ve, D];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [nt],
      spacing: [ae, Ee],
      blur: ["none", "", Oe, D],
      brightness: ie(),
      borderColor: [e],
      borderRadius: ["none", "", "full", Oe, D],
      borderSpacing: A(),
      borderWidth: G(),
      contrast: ie(),
      grayscale: Me(),
      hueRotate: We(),
      invert: Me(),
      gap: A(),
      gradientColorStops: [e],
      gradientColorStopPositions: [pi, Ee],
      inset: F(),
      margin: F(),
      opacity: ie(),
      padding: A(),
      saturate: ie(),
      scale: ie(),
      sepia: Me(),
      skew: We(),
      space: A(),
      translate: A()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", D]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [Oe]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": pt()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": pt()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...H(), D]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: C()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": C()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": C()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: N()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": N()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": N()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [h]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [h]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [h]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [h]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [h]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [h]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [h]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [h]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [h]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", tt, D]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: F()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", D]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: Me()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: Me()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", tt, D]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [nt]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", tt, D]
        }, D]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": L()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": L()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [nt]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [tt, D]
        }, D]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": L()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": L()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", D]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", D]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [f]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [f]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [f]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ..._e()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ..._e(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [..._e(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [b]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [b]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [b]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [b]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [b]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [b]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [b]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [b]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [b]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [y]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [y]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [y]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [y]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [y]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [y]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [y]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [y]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [y]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [T]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [T]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", D, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": ["min", "max", "fit", D, ae]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": ["0", "none", "full", "min", "max", "fit", "prose", {
          screen: [Oe]
        }, Oe, D]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [D, t, "auto", "min", "max", "fit"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["min", "max", "fit", ae, D]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [D, t, "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", Oe, Ee]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", yt]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [nt]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", D]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Ve, yt]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", ae, D]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", D]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", D]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [g]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [g]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...K(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", ae, Ee]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", ae, D]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: A()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", D]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", D]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [g]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...H(), vi]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", mi]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, gi]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [v]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [v]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [v]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [m]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [m]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [m]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [r]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [r]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [r]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [r]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [r]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [r]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [r]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [r]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [r]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [r]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [r]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [r]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [r]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [r]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [r]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [i]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [i]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [i]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [i]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [i]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [i]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [i]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [i]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [i]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [g]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...K(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [i]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [i]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [g]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: K()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [a]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [a]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [a]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [a]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [a]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [a]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [a]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [a]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...K()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ae, D]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [ae, Ee]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: G()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [g]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [ae, Ee]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", Oe, yi]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [nt]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [g]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": Z()
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Z()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [n]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [o]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [u]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", Oe, D]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [c]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [p]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [d]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [w]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [O]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [n]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [o]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [u]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [c]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [p]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [d]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [g]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [w]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [O]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [l]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [l]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [l]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", D]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: We()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", D]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: We()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", D]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [x]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [x]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [x]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [tt, D]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [R]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [R]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [k]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [k]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", D]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: ["appearance-none"],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", D]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": A()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": A()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": A()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": A()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": A()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": A()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": A()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": A()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": A()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": A()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": A()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": A()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": A()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": A()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": A()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": A()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": A()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": A()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", D]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ae, Ee, yt]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}
const _i = /* @__PURE__ */ ai(Ci);
function U(...e) {
  return _i(_o(e));
}
const Ei = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, a] of t)
    n[o] = a;
  return n;
}, Oi = {}, ki = {
  class: "animate-spin",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  height: "16",
  viewBox: "0 0 24 24"
}, Ai = /* @__PURE__ */ pe("circle", {
  class: "opacity-25",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), Si = /* @__PURE__ */ pe("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), Bi = [
  Ai,
  Si
];
function Pi(e, t) {
  return _(), j("svg", ki, Bi);
}
const $i = /* @__PURE__ */ Ei(Oi, [["render", Pi]]), Ti = {
  key: 0,
  class: "absolute inset-0 grid place-items-center"
}, Fi = /* @__PURE__ */ S({
  __name: "Button",
  props: {
    variant: { default: "primary" },
    size: { default: "md" },
    as: { default: "button" },
    label: {},
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    asChild: { type: Boolean }
  },
  setup(e) {
    return (t, n) => (_(), $(s(z), {
      as: t.as,
      "as-child": t.asChild,
      class: de([
        s(U)(s(ql)({ variant: t.variant, size: t.size }), t.$attrs.class ?? ""),
        t.loading && "disabled:text-transparent"
      ]),
      disabled: t.loading || t.disabled
    }, {
      default: E(() => [
        t.loading ? (_(), j("div", Ti, [
          I($i, { class: "h-5 text-white" })
        ])) : X("", !0),
        P(t.$slots, "default", {}, () => [
          se(ue(t.label), 1)
        ])
      ]),
      _: 3
    }, 8, ["as", "as-child", "class", "disabled"]));
  }
}), Bo = Symbol(), Po = Symbol(), $o = Symbol(), Mi = ["id", "name"], us = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "Input",
  props: {
    id: {},
    name: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    var d;
    const n = e, o = t, a = ot(Po, n.id), r = ot(Bo, null), l = ot($o), i = n.name ?? ((d = r == null ? void 0 : r.name) == null ? void 0 : d.value) ?? "", u = M({
      get: () => {
        var f;
        return n.modelValue ?? ((f = r == null ? void 0 : r.value) == null ? void 0 : f.value) ?? "";
      },
      set: (f) => {
        r != null && r.value ? r.value.value = f : o("update:modelValue", f);
      }
    }), { class: c, ...p } = Ko();
    return (f, m) => Yt((_(), j("input", V({
      "onUpdate:modelValue": m[0] || (m[0] = (v) => u.value = v),
      id: s(a),
      name: s(i),
      class: s(U)(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        s(l) && "ring-destructive ring-2 placeholder:text-destructive",
        s(c) ?? ""
      )
    }, p), null, 16, Mi)), [
      [qo, u.value]
    ]);
  }
});
function To(e, t) {
  return _(), j("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    pe("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z",
      fill: "currentColor"
    })
  ]);
}
function Ri(e, t) {
  return _(), j("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    pe("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
      fill: "currentColor"
    })
  ]);
}
function Di(e, t) {
  return _(), j("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    pe("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
      fill: "currentColor"
    })
  ]);
}
const ds = /* @__PURE__ */ S({
  __name: "Checkbox",
  props: {
    defaultChecked: { type: Boolean },
    checked: { type: [Boolean, String] },
    disabled: { type: Boolean },
    required: { type: Boolean },
    name: {},
    value: {},
    id: {},
    asChild: { type: Boolean },
    as: {},
    modelValue: { default: !1 },
    trueValue: { default: !0 },
    falseValue: { default: !1 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, o = t, a = ct(n, o), r = M({
      get() {
        return n.modelValue === n.trueValue;
      },
      set(l) {
        l ? o("update:modelValue", n.trueValue) : o("update:modelValue", n.falseValue);
      }
    });
    return (l, i) => (_(), $(s(za), V(s(a), {
      checked: r.value,
      "onUpdate:checked": i[0] || (i[0] = (u) => r.value = u),
      class: s(U)(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        l.$attrs.class ?? ""
      )
    }), {
      default: E(() => [
        I(s(ja), { class: "flex h-full w-full items-center justify-center text-current" }, {
          default: E(() => [
            I(s(To), { class: "h-4 w-4" })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16, ["checked", "class"]));
  }
}), Vi = /* @__PURE__ */ S({
  __name: "Label",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (_(), $(s(rl), V(t, {
      class: s(U)(
        "w-label text-sm font-medium tracking-tight text-foreground flex items-center gap-2",
        t.class
      )
    }), {
      default: E(() => [
        P(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Ii = /* @__PURE__ */ S({
  __name: "SelectValue",
  props: {
    placeholder: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (_(), $(s(Il), ge(Ae(t)), {
      default: E(() => [
        P(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Ni = /* @__PURE__ */ S({
  __name: "SelectTrigger",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: { default: "" },
    invalid: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e;
    return (n, o) => (_(), $(s(bl), V(t, {
      class: [
        s(U)(
          "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          t.class
        ),
        t.invalid ? "!ring-destructive ring-2 placeholder:!text-destructive" : ""
      ]
    }), {
      default: E(() => [
        P(n.$slots, "default"),
        I(s(Nl), { "as-child": "" }, {
          default: E(() => [
            I(s(Ri), { class: "w-4 h-4 opacity-50" })
          ]),
          _: 1
        })
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Li = /* @__PURE__ */ S({
  __name: "SelectContent",
  props: {
    forceMount: { type: Boolean },
    position: { default: "popper" },
    side: {},
    sideOffset: { default: 4 },
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    onPlaced: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["closeAutoFocus", "escapeKeyDown", "pointerDownOutside"],
  setup(e, { emit: t }) {
    const n = e, a = ct(n, t);
    return (r, l) => (_(), $(s(wl), null, {
      default: E(() => [
        I(s(Sl), V({ ...s(a), ...r.$attrs }, {
          class: s(U)(
            "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            r.position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            n.class
          )
        }), {
          default: E(() => [
            I(s(Vl), {
              class: de(
                s(U)(
                  "p-0",
                  r.position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
                )
              )
            }, {
              default: E(() => [
                P(r.$slots, "default")
              ]),
              _: 3
            }, 8, ["class"])
          ]),
          _: 3
        }, 16, ["class"])
      ]),
      _: 3
    }));
  }
}), zi = /* @__PURE__ */ S({
  __name: "SelectGroup",
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (_(), $(s(Ml), V({
      class: s(U)("p-1 w-full", t.class)
    }, t), {
      default: E(() => [
        P(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), ji = { class: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, Tn = /* @__PURE__ */ S({
  __name: "SelectItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (_(), $(s(Pl), V(t, {
      class: s(U)(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        t.class
      )
    }), {
      default: E(() => [
        pe("span", ji, [
          I(s($l), null, {
            default: E(() => [
              I(s(To), { class: "h-4 w-4" })
            ]),
            _: 1
          })
        ]),
        I(s(Dl), null, {
          default: E(() => [
            P(n.$slots, "default")
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Wi = /* @__PURE__ */ S({
  __name: "SelectLabel",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (_(), $(s(Rl), {
      class: de(s(U)("py-1.5 pl-8 pr-2 text-sm font-semibold", t.class))
    }, {
      default: E(() => [
        P(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), cs = /* @__PURE__ */ S({
  __name: "Select",
  props: {
    open: { type: Boolean },
    defaultOpen: { type: Boolean },
    defaultValue: {},
    modelValue: {},
    orientation: {},
    dir: {},
    name: {},
    autocomplete: {},
    disabled: { type: Boolean, default: !1 },
    required: { type: Boolean },
    options: {},
    placeholder: { default: "Select an option" },
    clearable: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue", "update:open"],
  setup(e, { emit: t }) {
    const n = e, o = t, { options: a, ...r } = n, l = ct(r, o);
    return (i, u) => (_(), $(s(hl), ge(Ae(s(l))), {
      default: E(() => [
        I(s(Ni), { disabled: i.disabled }, {
          default: E(() => [
            I(s(Ii), { placeholder: i.placeholder }, null, 8, ["placeholder"])
          ]),
          _: 1
        }, 8, ["disabled"]),
        I(s(Li), null, {
          default: E(() => [
            (_(!0), j(le, null, Vt(s(a), (c, p) => (_(), j(le, null, [
              "options" in c ? (_(), $(s(zi), {
                key: `group-${p}`
              }, {
                default: E(() => [
                  I(s(Wi), null, {
                    default: E(() => [
                      se(ue(c.label), 1)
                    ]),
                    _: 2
                  }, 1024),
                  (_(!0), j(le, null, Vt(c.options, (d) => (_(), $(s(Tn), {
                    key: d.value,
                    value: d.value
                  }, {
                    default: E(() => [
                      se(ue(d.label), 1)
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 2
              }, 1024)) : (_(), $(s(Tn), {
                value: c.value,
                key: c.value
              }, {
                default: E(() => [
                  se(ue(c.label), 1)
                ]),
                _: 2
              }, 1032, ["value"]))
            ], 64))), 256))
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16));
  }
});
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Hi = (e) => typeof e < "u";
function Ki(e) {
  return JSON.parse(JSON.stringify(e));
}
function Fo(e, t, n, o = {}) {
  var a, r, l;
  const {
    clone: i = !1,
    passive: u = !1,
    eventName: c,
    deep: p = !1,
    defaultValue: d,
    shouldEmit: f
  } = o, m = Te(), v = n || (m == null ? void 0 : m.emit) || ((a = m == null ? void 0 : m.$emit) == null ? void 0 : a.bind(m)) || ((l = (r = m == null ? void 0 : m.proxy) == null ? void 0 : r.$emit) == null ? void 0 : l.bind(m == null ? void 0 : m.proxy));
  let h = c;
  t || (t = "modelValue"), h = h || `update:${t.toString()}`;
  const y = (w) => i ? typeof i == "function" ? i(w) : Ki(w) : w, g = () => Hi(e[t]) ? y(e[t]) : d, b = (w) => {
    f ? f(w) && v(h, w) : v(h, w);
  };
  if (u) {
    const w = g(), x = B(w);
    let O = !1;
    return q(
      () => e[t],
      (k) => {
        O || (O = !0, x.value = y(k), ee(() => O = !1));
      }
    ), q(
      x,
      (k) => {
        !O && (k !== e[t] || p) && b(k);
      },
      { deep: p }
    ), x;
  } else
    return M({
      get() {
        return g();
      },
      set(w) {
        b(w);
      }
    });
}
const ps = /* @__PURE__ */ S({
  __name: "Textarea",
  props: {
    defaultValue: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = Fo(n, "modelValue", t, {
      passive: !0,
      defaultValue: n.defaultValue
    });
    return (r, l) => Yt((_(), j("textarea", {
      "onUpdate:modelValue": l[0] || (l[0] = (i) => Jt(a) ? a.value = i : null),
      class: de(
        s(U)(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          r.$attrs.class ?? ""
        )
      )
    }, null, 2)), [
      [Uo, s(a)]
    ]);
  }
}), fs = /* @__PURE__ */ S({
  __name: "Progress",
  props: {
    modelValue: { default: 0 },
    max: {},
    getValueLabel: {},
    asChild: { type: Boolean },
    as: {},
    class: { default: "" }
  },
  setup(e) {
    const t = e;
    return (n, o) => (_(), $(s(ul), V({
      class: s(U)(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        t.class
      )
    }, t), {
      default: E(() => [
        I(s(dl), {
          class: de(
            s(U)(
              "h-full w-full flex-1 bg-primary transition-all",
              t.class
            )
          ),
          style: ze(`transform: translateX(-${100 - (t.modelValue ?? 0)}%);`)
        }, null, 8, ["class", "style"])
      ]),
      _: 1
    }, 16, ["class"]));
  }
}), ms = /* @__PURE__ */ S({
  __name: "Switch",
  props: {
    defaultChecked: { type: Boolean },
    checked: { type: Boolean },
    disabled: { type: Boolean },
    required: { type: Boolean },
    name: {},
    id: {},
    value: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["update:checked"],
  setup(e, { emit: t }) {
    const n = e, a = ct(n, t);
    return (r, l) => (_(), $(s(Wl), V(s(a), {
      class: s(U)(
        "peer inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        n.class
      )
    }), {
      default: E(() => [
        I(s(Hl), {
          class: de(
            s(U)(
              "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
            )
          )
        }, null, 8, ["class"])
      ]),
      _: 1
    }, 16, ["class"]));
  }
}), qi = { class: "text-[0.8rem] font-medium text-destructive" }, Ui = {
  key: 0,
  class: "text-[0.8rem] text-muted-foreground"
}, vs = /* @__PURE__ */ S({
  __name: "FormField",
  props: {
    name: {},
    label: {},
    error: {},
    helpText: {}
  },
  setup(e) {
    const t = e, n = Go(t.name), o = Xo(), a = M(() => {
      var i;
      return t.error ? t.error : ((i = n == null ? void 0 : n.errorMessage) == null ? void 0 : i.value) ?? "";
    }), r = M(() => t.error ? !0 : o.value && !!a.value), l = Ne();
    return rt(Po, l), rt(Bo, n), rt($o, r), (i, u) => (_(), j("div", {
      class: de(s(U)("space-y-2", i.$attrs.class ?? ""))
    }, [
      P(i.$slots, "label", {}, () => [
        i.label ? (_(), $(s(Vi), {
          key: 0,
          for: s(l),
          class: de(s(U)(r.value && "text-destructive"))
        }, {
          default: E(() => [
            se(ue(i.label), 1)
          ]),
          _: 1
        }, 8, ["for", "class"])) : X("", !0)
      ]),
      P(i.$slots, "default"),
      r.value ? P(i.$slots, "error", { key: 0 }, () => [
        pe("p", qi, ue(a.value), 1)
      ]) : X("", !0),
      i.helpText ? P(i.$slots, "help", { key: 1 }, () => [
        i.helpText ? (_(), j("p", Ui, ue(i.helpText), 1)) : X("", !0)
      ]) : X("", !0)
    ], 2));
  }
}), Gi = /* @__PURE__ */ S({
  __name: "DialogHeader",
  props: {
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (_(), j("div", {
      class: de(s(U)("flex flex-col space-y-2 text-center sm:text-left", t.class))
    }, [
      P(n.$slots, "default")
    ], 2));
  }
}), Xi = /* @__PURE__ */ S({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (_(), $(s(Da), V(t, {
      class: s(U)(
        "text-lg text-foreground font-semibold leading-none tracking-tight",
        t.class
      )
    }), {
      default: E(() => [
        P(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Yi = /* @__PURE__ */ S({
  __name: "DialogDescription",
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (_(), $(s(Va), V(t, {
      class: s(U)("text-muted-foreground text-sm", t.class)
    }), {
      default: E(() => [
        P(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Ji = /* @__PURE__ */ pe("span", { class: "sr-only" }, "Close", -1), Zi = /* @__PURE__ */ S({
  __name: "DialogContent",
  props: {
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss", "openAutoFocus", "closeAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, a = dt(t);
    return (r, l) => (_(), $(s(pa), null, {
      default: E(() => [
        I(s(Ma), { class: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }),
        I(s(Ta), V({
          class: s(U)(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
            n.class
          )
        }, { ...n, ...s(a) }), {
          default: E(() => [
            P(r.$slots, "default"),
            I(s(Ra), { class: "absolute top-4 right-4 p-0.5 transition-colors rounded-md hover:bg-secondary" }, {
              default: E(() => [
                I(s(Di), { class: "w-4 h-4" }),
                Ji
              ]),
              _: 1
            })
          ]),
          _: 3
        }, 16, ["class"])
      ]),
      _: 3
    }));
  }
}), Qi = /* @__PURE__ */ S({
  __name: "DialogFooter",
  props: {
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (_(), j("div", {
      class: de(
        s(U)(
          "flex flex-col space-y-2 sm:space-y-0 mt-1.5 sm:flex-row sm:justify-end sm:space-x-2",
          t.class
        )
      )
    }, [
      P(n.$slots, "default")
    ], 2));
  }
}), hs = /* @__PURE__ */ S({
  __name: "Dialog",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    title: {},
    description: {},
    trigger: {}
  },
  setup(e) {
    const t = e, n = t.modelValue !== void 0 ? Fo(t, "modelValue") : B(!1), o = () => {
      n.value = !0;
    }, a = () => {
      n.value = !1;
    };
    return (r, l) => (_(), $(s(ca), {
      open: s(n),
      "onUpdate:open": l[0] || (l[0] = (i) => Jt(n) ? n.value = i : null)
    }, {
      default: E(() => [
        P(r.$slots, "trigger", ge(Ae({ open: o, close: a })), () => [
          r.trigger ? (_(), $(Fi, V({ key: 0 }, r.trigger, { onClick: o }), null, 16)) : X("", !0)
        ]),
        I(s(Zi), null, {
          default: E(() => [
            r.title || r.description ? (_(), $(s(Gi), { key: 0 }, {
              default: E(() => [
                r.title ? (_(), $(s(Xi), { key: 0 }, {
                  default: E(() => [
                    se(ue(r.title), 1)
                  ]),
                  _: 1
                })) : X("", !0),
                r.description ? (_(), $(s(Yi), { key: 1 }, {
                  default: E(() => [
                    se(ue(r.description), 1)
                  ]),
                  _: 1
                })) : X("", !0)
              ]),
              _: 1
            })) : X("", !0),
            P(r.$slots, "body", ge(Ae({ open: o, close: a }))),
            r.$slots.footer ? (_(), $(s(Qi), { key: 1 }, {
              default: E(() => [
                P(r.$slots, "footer", ge(Ae({ open: o, close: a })))
              ]),
              _: 3
            })) : X("", !0)
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["open"]));
  }
});
export {
  Fi as SdButton,
  ds as SdCheckbox,
  hs as SdDialog,
  vs as SdFormField,
  us as SdInput,
  Vi as SdLabel,
  fs as SdProgress,
  cs as SdSelect,
  $i as SdSpinner,
  ms as SdSwitch,
  ps as SdTextarea
};
