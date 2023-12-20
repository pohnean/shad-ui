import { computed as F, unref as u, ref as k, shallowRef as mn, watch as K, getCurrentScope as mo, onScopeDispose as ho, shallowReadonly as ot, defineComponent as P, mergeProps as R, cloneVNode as Ar, h as dt, toRefs as Me, getCurrentInstance as ue, reactive as hn, mergeDefaults as go, watchEffect as me, openBlock as C, createElementBlock as X, normalizeStyle as tt, createVNode as j, withCtx as O, renderSlot as V, markRaw as zn, onUnmounted as Dt, createBlock as T, readonly as gn, effectScope as kr, Fragment as xe, nextTick as se, onBeforeUnmount as yn, toHandlerKey as Pr, camelize as yo, onMounted as pe, normalizeProps as Be, guardReactiveProps as We, createCommentVNode as ee, withKeys as bo, withModifiers as lt, renderList as tn, resolveDynamicComponent as wo, Teleport as bn, createElementVNode as Ae, createTextVNode as Ce, useSlots as Vr, onBeforeMount as Br, toDisplayString as Oe, inject as st, provide as ut, customRef as wn, onBeforeUpdate as Tr, onUpdated as $r, withDirectives as xn, isRef as Et, vModelSelect as Fr, toRef as Mr, normalizeClass as Se, useAttrs as Ir, vModelDynamic as Nr, vModelText as Rr, toValue as ae, warn as Dr } from "vue";
const jr = ["top", "right", "bottom", "left"], Ue = Math.min, ce = Math.max, It = Math.round, Bt = Math.floor, He = (e) => ({
  x: e,
  y: e
}), Lr = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, zr = {
  start: "end",
  end: "start"
};
function nn(e, t, n) {
  return ce(e, Ue(t, n));
}
function Te(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function $e(e) {
  return e.split("-")[0];
}
function mt(e) {
  return e.split("-")[1];
}
function _n(e) {
  return e === "x" ? "y" : "x";
}
function Cn(e) {
  return e === "y" ? "height" : "width";
}
function ht(e) {
  return ["top", "bottom"].includes($e(e)) ? "y" : "x";
}
function On(e) {
  return _n(ht(e));
}
function Wr(e, t, n) {
  n === void 0 && (n = !1);
  const o = mt(e), r = On(e), a = Cn(r);
  let i = r === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (i = Nt(i)), [i, Nt(i)];
}
function Ur(e) {
  const t = Nt(e);
  return [on(e), t, on(t)];
}
function on(e) {
  return e.replace(/start|end/g, (t) => zr[t]);
}
function Hr(e, t, n) {
  const o = ["left", "right"], r = ["right", "left"], a = ["top", "bottom"], i = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? r : o : t ? o : r;
    case "left":
    case "right":
      return t ? a : i;
    default:
      return [];
  }
}
function Kr(e, t, n, o) {
  const r = mt(e);
  let a = Hr($e(e), n === "start", o);
  return r && (a = a.map((i) => i + "-" + r), t && (a = a.concat(a.map(on)))), a;
}
function Nt(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Lr[t]);
}
function Gr(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function xo(e) {
  return typeof e != "number" ? Gr(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Rt(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  };
}
function Wn(e, t, n) {
  let {
    reference: o,
    floating: r
  } = e;
  const a = ht(t), i = On(t), l = Cn(i), s = $e(t), d = a === "y", f = o.x + o.width / 2 - r.width / 2, c = o.y + o.height / 2 - r.height / 2, v = o[l] / 2 - r[l] / 2;
  let p;
  switch (s) {
    case "top":
      p = {
        x: f,
        y: o.y - r.height
      };
      break;
    case "bottom":
      p = {
        x: f,
        y: o.y + o.height
      };
      break;
    case "right":
      p = {
        x: o.x + o.width,
        y: c
      };
      break;
    case "left":
      p = {
        x: o.x - r.width,
        y: c
      };
      break;
    default:
      p = {
        x: o.x,
        y: o.y
      };
  }
  switch (mt(t)) {
    case "start":
      p[i] -= v * (n && d ? -1 : 1);
      break;
    case "end":
      p[i] += v * (n && d ? -1 : 1);
      break;
  }
  return p;
}
const qr = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: r = "absolute",
    middleware: a = [],
    platform: i
  } = n, l = a.filter(Boolean), s = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let d = await i.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: f,
    y: c
  } = Wn(d, o, s), v = o, p = {}, m = 0;
  for (let h = 0; h < l.length; h++) {
    const {
      name: g,
      fn: y
    } = l[h], {
      x: b,
      y: w,
      data: x,
      reset: E
    } = await y({
      x: f,
      y: c,
      initialPlacement: o,
      placement: v,
      strategy: r,
      middlewareData: p,
      rects: d,
      platform: i,
      elements: {
        reference: e,
        floating: t
      }
    });
    if (f = b ?? f, c = w ?? c, p = {
      ...p,
      [g]: {
        ...p[g],
        ...x
      }
    }, E && m <= 50) {
      m++, typeof E == "object" && (E.placement && (v = E.placement), E.rects && (d = E.rects === !0 ? await i.getElementRects({
        reference: e,
        floating: t,
        strategy: r
      }) : E.rects), {
        x: f,
        y: c
      } = Wn(d, v, s)), h = -1;
      continue;
    }
  }
  return {
    x: f,
    y: c,
    placement: v,
    strategy: r,
    middlewareData: p
  };
};
async function Ct(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: o,
    y: r,
    platform: a,
    rects: i,
    elements: l,
    strategy: s
  } = e, {
    boundary: d = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: c = "floating",
    altBoundary: v = !1,
    padding: p = 0
  } = Te(t, e), m = xo(p), g = l[v ? c === "floating" ? "reference" : "floating" : c], y = Rt(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(g))) == null || n ? g : g.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(l.floating)),
    boundary: d,
    rootBoundary: f,
    strategy: s
  })), b = c === "floating" ? {
    ...i.floating,
    x: o,
    y: r
  } : i.reference, w = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(l.floating)), x = await (a.isElement == null ? void 0 : a.isElement(w)) ? await (a.getScale == null ? void 0 : a.getScale(w)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = Rt(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: b,
    offsetParent: w,
    strategy: s
  }) : b);
  return {
    top: (y.top - E.top + m.top) / x.y,
    bottom: (E.bottom - y.bottom + m.bottom) / x.y,
    left: (y.left - E.left + m.left) / x.x,
    right: (E.right - y.right + m.right) / x.x
  };
}
const Xr = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: o,
      placement: r,
      rects: a,
      platform: i,
      elements: l,
      middlewareData: s
    } = t, {
      element: d,
      padding: f = 0
    } = Te(e, t) || {};
    if (d == null)
      return {};
    const c = xo(f), v = {
      x: n,
      y: o
    }, p = On(r), m = Cn(p), h = await i.getDimensions(d), g = p === "y", y = g ? "top" : "left", b = g ? "bottom" : "right", w = g ? "clientHeight" : "clientWidth", x = a.reference[m] + a.reference[p] - v[p] - a.floating[m], E = v[p] - a.reference[p], S = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(d));
    let B = S ? S[w] : 0;
    (!B || !await (i.isElement == null ? void 0 : i.isElement(S))) && (B = l.floating[w] || a.floating[m]);
    const I = x / 2 - E / 2, L = B / 2 - h[m] / 2 - 1, _ = Ue(c[y], L), M = Ue(c[b], L), A = _, H = B - h[m] - M, D = B / 2 - h[m] / 2 + I, G = nn(A, D, H), q = !s.arrow && mt(r) != null && D != G && a.reference[m] / 2 - (D < A ? _ : M) - h[m] / 2 < 0, re = q ? D < A ? D - A : D - H : 0;
    return {
      [p]: v[p] + re,
      data: {
        [p]: G,
        centerOffset: D - G - re,
        ...q && {
          alignmentOffset: re
        }
      },
      reset: q
    };
  }
}), Yr = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: r,
        middlewareData: a,
        rects: i,
        initialPlacement: l,
        platform: s,
        elements: d
      } = t, {
        mainAxis: f = !0,
        crossAxis: c = !0,
        fallbackPlacements: v,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: m = "none",
        flipAlignment: h = !0,
        ...g
      } = Te(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const y = $e(r), b = $e(l) === l, w = await (s.isRTL == null ? void 0 : s.isRTL(d.floating)), x = v || (b || !h ? [Nt(l)] : Ur(l));
      !v && m !== "none" && x.push(...Kr(l, h, m, w));
      const E = [l, ...x], S = await Ct(t, g), B = [];
      let I = ((o = a.flip) == null ? void 0 : o.overflows) || [];
      if (f && B.push(S[y]), c) {
        const A = Wr(r, i, w);
        B.push(S[A[0]], S[A[1]]);
      }
      if (I = [...I, {
        placement: r,
        overflows: B
      }], !B.every((A) => A <= 0)) {
        var L, _;
        const A = (((L = a.flip) == null ? void 0 : L.index) || 0) + 1, H = E[A];
        if (H)
          return {
            data: {
              index: A,
              overflows: I
            },
            reset: {
              placement: H
            }
          };
        let D = (_ = I.filter((G) => G.overflows[0] <= 0).sort((G, q) => G.overflows[1] - q.overflows[1])[0]) == null ? void 0 : _.placement;
        if (!D)
          switch (p) {
            case "bestFit": {
              var M;
              const G = (M = I.map((q) => [q.placement, q.overflows.filter((re) => re > 0).reduce((re, ge) => re + ge, 0)]).sort((q, re) => q[1] - re[1])[0]) == null ? void 0 : M[0];
              G && (D = G);
              break;
            }
            case "initialPlacement":
              D = l;
              break;
          }
        if (r !== D)
          return {
            reset: {
              placement: D
            }
          };
      }
      return {};
    }
  };
};
function Un(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Hn(e) {
  return jr.some((t) => e[t] >= 0);
}
const Jr = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: o = "referenceHidden",
        ...r
      } = Te(e, t);
      switch (o) {
        case "referenceHidden": {
          const a = await Ct(t, {
            ...r,
            elementContext: "reference"
          }), i = Un(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: Hn(i)
            }
          };
        }
        case "escaped": {
          const a = await Ct(t, {
            ...r,
            altBoundary: !0
          }), i = Un(a, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: Hn(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function Zr(e, t) {
  const {
    placement: n,
    platform: o,
    elements: r
  } = e, a = await (o.isRTL == null ? void 0 : o.isRTL(r.floating)), i = $e(n), l = mt(n), s = ht(n) === "y", d = ["left", "top"].includes(i) ? -1 : 1, f = a && s ? -1 : 1, c = Te(t, e);
  let {
    mainAxis: v,
    crossAxis: p,
    alignmentAxis: m
  } = typeof c == "number" ? {
    mainAxis: c,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...c
  };
  return l && typeof m == "number" && (p = l === "end" ? m * -1 : m), s ? {
    x: p * f,
    y: v * d
  } : {
    x: v * d,
    y: p * f
  };
}
const Qr = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, o;
      const {
        x: r,
        y: a,
        placement: i,
        middlewareData: l
      } = t, s = await Zr(t, e);
      return i === ((n = l.offset) == null ? void 0 : n.placement) && (o = l.arrow) != null && o.alignmentOffset ? {} : {
        x: r + s.x,
        y: a + s.y,
        data: {
          ...s,
          placement: i
        }
      };
    }
  };
}, ea = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: o,
        placement: r
      } = t, {
        mainAxis: a = !0,
        crossAxis: i = !1,
        limiter: l = {
          fn: (g) => {
            let {
              x: y,
              y: b
            } = g;
            return {
              x: y,
              y: b
            };
          }
        },
        ...s
      } = Te(e, t), d = {
        x: n,
        y: o
      }, f = await Ct(t, s), c = ht($e(r)), v = _n(c);
      let p = d[v], m = d[c];
      if (a) {
        const g = v === "y" ? "top" : "left", y = v === "y" ? "bottom" : "right", b = p + f[g], w = p - f[y];
        p = nn(b, p, w);
      }
      if (i) {
        const g = c === "y" ? "top" : "left", y = c === "y" ? "bottom" : "right", b = m + f[g], w = m - f[y];
        m = nn(b, m, w);
      }
      const h = l.fn({
        ...t,
        [v]: p,
        [c]: m
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
}, ta = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: o,
        placement: r,
        rects: a,
        middlewareData: i
      } = t, {
        offset: l = 0,
        mainAxis: s = !0,
        crossAxis: d = !0
      } = Te(e, t), f = {
        x: n,
        y: o
      }, c = ht(r), v = _n(c);
      let p = f[v], m = f[c];
      const h = Te(l, t), g = typeof h == "number" ? {
        mainAxis: h,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...h
      };
      if (s) {
        const w = v === "y" ? "height" : "width", x = a.reference[v] - a.floating[w] + g.mainAxis, E = a.reference[v] + a.reference[w] - g.mainAxis;
        p < x ? p = x : p > E && (p = E);
      }
      if (d) {
        var y, b;
        const w = v === "y" ? "width" : "height", x = ["top", "left"].includes($e(r)), E = a.reference[c] - a.floating[w] + (x && ((y = i.offset) == null ? void 0 : y[c]) || 0) + (x ? 0 : g.crossAxis), S = a.reference[c] + a.reference[w] + (x ? 0 : ((b = i.offset) == null ? void 0 : b[c]) || 0) - (x ? g.crossAxis : 0);
        m < E ? m = E : m > S && (m = S);
      }
      return {
        [v]: p,
        [c]: m
      };
    }
  };
}, na = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      const {
        placement: n,
        rects: o,
        platform: r,
        elements: a
      } = t, {
        apply: i = () => {
        },
        ...l
      } = Te(e, t), s = await Ct(t, l), d = $e(n), f = mt(n), c = ht(n) === "y", {
        width: v,
        height: p
      } = o.floating;
      let m, h;
      d === "top" || d === "bottom" ? (m = d, h = f === (await (r.isRTL == null ? void 0 : r.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = d, m = f === "end" ? "top" : "bottom");
      const g = p - s[m], y = v - s[h], b = !t.middlewareData.shift;
      let w = g, x = y;
      if (c) {
        const S = v - s.left - s.right;
        x = f || b ? Ue(y, S) : S;
      } else {
        const S = p - s.top - s.bottom;
        w = f || b ? Ue(g, S) : S;
      }
      if (b && !f) {
        const S = ce(s.left, 0), B = ce(s.right, 0), I = ce(s.top, 0), L = ce(s.bottom, 0);
        c ? x = v - 2 * (S !== 0 || B !== 0 ? S + B : ce(s.left, s.right)) : w = p - 2 * (I !== 0 || L !== 0 ? I + L : ce(s.top, s.bottom));
      }
      await i({
        ...t,
        availableWidth: x,
        availableHeight: w
      });
      const E = await r.getDimensions(a.floating);
      return v !== E.width || p !== E.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Ke(e) {
  return _o(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function de(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ie(e) {
  var t;
  return (t = (_o(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function _o(e) {
  return e instanceof Node || e instanceof de(e).Node;
}
function Fe(e) {
  return e instanceof Element || e instanceof de(e).Element;
}
function Ee(e) {
  return e instanceof HTMLElement || e instanceof de(e).HTMLElement;
}
function Kn(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof de(e).ShadowRoot;
}
function At(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: r
  } = he(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !["inline", "contents"].includes(r);
}
function oa(e) {
  return ["table", "td", "th"].includes(Ke(e));
}
function Sn(e) {
  const t = En(), n = he(e);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((o) => (n.willChange || "").includes(o)) || ["paint", "layout", "strict", "content"].some((o) => (n.contain || "").includes(o));
}
function ra(e) {
  let t = ft(e);
  for (; Ee(t) && !jt(t); ) {
    if (Sn(t))
      return t;
    t = ft(t);
  }
  return null;
}
function En() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function jt(e) {
  return ["html", "body", "#document"].includes(Ke(e));
}
function he(e) {
  return de(e).getComputedStyle(e);
}
function Lt(e) {
  return Fe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function ft(e) {
  if (Ke(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Kn(e) && e.host || // Fallback.
    Ie(e)
  );
  return Kn(t) ? t.host : t;
}
function Co(e) {
  const t = ft(e);
  return jt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Ee(t) && At(t) ? t : Co(t);
}
function Ot(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = Co(e), a = r === ((o = e.ownerDocument) == null ? void 0 : o.body), i = de(r);
  return a ? t.concat(i, i.visualViewport || [], At(r) ? r : [], i.frameElement && n ? Ot(i.frameElement) : []) : t.concat(r, Ot(r, [], n));
}
function Oo(e) {
  const t = he(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const r = Ee(e), a = r ? e.offsetWidth : n, i = r ? e.offsetHeight : o, l = It(n) !== a || It(o) !== i;
  return l && (n = a, o = i), {
    width: n,
    height: o,
    $: l
  };
}
function An(e) {
  return Fe(e) ? e : e.contextElement;
}
function ct(e) {
  const t = An(e);
  if (!Ee(t))
    return He(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: r,
    $: a
  } = Oo(t);
  let i = (a ? It(n.width) : n.width) / o, l = (a ? It(n.height) : n.height) / r;
  return (!i || !Number.isFinite(i)) && (i = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: i,
    y: l
  };
}
const aa = /* @__PURE__ */ He(0);
function So(e) {
  const t = de(e);
  return !En() || !t.visualViewport ? aa : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function ia(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== de(e) ? !1 : t;
}
function Qe(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), a = An(e);
  let i = He(1);
  t && (o ? Fe(o) && (i = ct(o)) : i = ct(e));
  const l = ia(a, n, o) ? So(a) : He(0);
  let s = (r.left + l.x) / i.x, d = (r.top + l.y) / i.y, f = r.width / i.x, c = r.height / i.y;
  if (a) {
    const v = de(a), p = o && Fe(o) ? de(o) : o;
    let m = v.frameElement;
    for (; m && o && p !== v; ) {
      const h = ct(m), g = m.getBoundingClientRect(), y = he(m), b = g.left + (m.clientLeft + parseFloat(y.paddingLeft)) * h.x, w = g.top + (m.clientTop + parseFloat(y.paddingTop)) * h.y;
      s *= h.x, d *= h.y, f *= h.x, c *= h.y, s += b, d += w, m = de(m).frameElement;
    }
  }
  return Rt({
    width: f,
    height: c,
    x: s,
    y: d
  });
}
function la(e) {
  let {
    rect: t,
    offsetParent: n,
    strategy: o
  } = e;
  const r = Ee(n), a = Ie(n);
  if (n === a)
    return t;
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = He(1);
  const s = He(0);
  if ((r || !r && o !== "fixed") && ((Ke(n) !== "body" || At(a)) && (i = Lt(n)), Ee(n))) {
    const d = Qe(n);
    l = ct(n), s.x = d.x + n.clientLeft, s.y = d.y + n.clientTop;
  }
  return {
    width: t.width * l.x,
    height: t.height * l.y,
    x: t.x * l.x - i.scrollLeft * l.x + s.x,
    y: t.y * l.y - i.scrollTop * l.y + s.y
  };
}
function sa(e) {
  return Array.from(e.getClientRects());
}
function Eo(e) {
  return Qe(Ie(e)).left + Lt(e).scrollLeft;
}
function ua(e) {
  const t = Ie(e), n = Lt(e), o = e.ownerDocument.body, r = ce(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), a = ce(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let i = -n.scrollLeft + Eo(e);
  const l = -n.scrollTop;
  return he(o).direction === "rtl" && (i += ce(t.clientWidth, o.clientWidth) - r), {
    width: r,
    height: a,
    x: i,
    y: l
  };
}
function ca(e, t) {
  const n = de(e), o = Ie(e), r = n.visualViewport;
  let a = o.clientWidth, i = o.clientHeight, l = 0, s = 0;
  if (r) {
    a = r.width, i = r.height;
    const d = En();
    (!d || d && t === "fixed") && (l = r.offsetLeft, s = r.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: l,
    y: s
  };
}
function da(e, t) {
  const n = Qe(e, !0, t === "fixed"), o = n.top + e.clientTop, r = n.left + e.clientLeft, a = Ee(e) ? ct(e) : He(1), i = e.clientWidth * a.x, l = e.clientHeight * a.y, s = r * a.x, d = o * a.y;
  return {
    width: i,
    height: l,
    x: s,
    y: d
  };
}
function Gn(e, t, n) {
  let o;
  if (t === "viewport")
    o = ca(e, n);
  else if (t === "document")
    o = ua(Ie(e));
  else if (Fe(t))
    o = da(t, n);
  else {
    const r = So(e);
    o = {
      ...t,
      x: t.x - r.x,
      y: t.y - r.y
    };
  }
  return Rt(o);
}
function Ao(e, t) {
  const n = ft(e);
  return n === t || !Fe(n) || jt(n) ? !1 : he(n).position === "fixed" || Ao(n, t);
}
function fa(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = Ot(e, [], !1).filter((l) => Fe(l) && Ke(l) !== "body"), r = null;
  const a = he(e).position === "fixed";
  let i = a ? ft(e) : e;
  for (; Fe(i) && !jt(i); ) {
    const l = he(i), s = Sn(i);
    !s && l.position === "fixed" && (r = null), (a ? !s && !r : !s && l.position === "static" && !!r && ["absolute", "fixed"].includes(r.position) || At(i) && !s && Ao(e, i)) ? o = o.filter((f) => f !== i) : r = l, i = ft(i);
  }
  return t.set(e, o), o;
}
function pa(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: r
  } = e;
  const i = [...n === "clippingAncestors" ? fa(t, this._c) : [].concat(n), o], l = i[0], s = i.reduce((d, f) => {
    const c = Gn(t, f, r);
    return d.top = ce(c.top, d.top), d.right = Ue(c.right, d.right), d.bottom = Ue(c.bottom, d.bottom), d.left = ce(c.left, d.left), d;
  }, Gn(t, l, r));
  return {
    width: s.right - s.left,
    height: s.bottom - s.top,
    x: s.left,
    y: s.top
  };
}
function va(e) {
  return Oo(e);
}
function ma(e, t, n) {
  const o = Ee(t), r = Ie(t), a = n === "fixed", i = Qe(e, !0, a, t);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const s = He(0);
  if (o || !o && !a)
    if ((Ke(t) !== "body" || At(r)) && (l = Lt(t)), o) {
      const d = Qe(t, !0, a, t);
      s.x = d.x + t.clientLeft, s.y = d.y + t.clientTop;
    } else
      r && (s.x = Eo(r));
  return {
    x: i.left + l.scrollLeft - s.x,
    y: i.top + l.scrollTop - s.y,
    width: i.width,
    height: i.height
  };
}
function qn(e, t) {
  return !Ee(e) || he(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function ko(e, t) {
  const n = de(e);
  if (!Ee(e))
    return n;
  let o = qn(e, t);
  for (; o && oa(o) && he(o).position === "static"; )
    o = qn(o, t);
  return o && (Ke(o) === "html" || Ke(o) === "body" && he(o).position === "static" && !Sn(o)) ? n : o || ra(e) || n;
}
const ha = async function(e) {
  let {
    reference: t,
    floating: n,
    strategy: o
  } = e;
  const r = this.getOffsetParent || ko, a = this.getDimensions;
  return {
    reference: ma(t, await r(n), o),
    floating: {
      x: 0,
      y: 0,
      ...await a(n)
    }
  };
};
function ga(e) {
  return he(e).direction === "rtl";
}
const ya = {
  convertOffsetParentRelativeRectToViewportRelativeRect: la,
  getDocumentElement: Ie,
  getClippingRect: pa,
  getOffsetParent: ko,
  getElementRects: ha,
  getClientRects: sa,
  getDimensions: va,
  getScale: ct,
  isElement: Fe,
  isRTL: ga
};
function ba(e, t) {
  let n = null, o;
  const r = Ie(e);
  function a() {
    clearTimeout(o), n && n.disconnect(), n = null;
  }
  function i(l, s) {
    l === void 0 && (l = !1), s === void 0 && (s = 1), a();
    const {
      left: d,
      top: f,
      width: c,
      height: v
    } = e.getBoundingClientRect();
    if (l || t(), !c || !v)
      return;
    const p = Bt(f), m = Bt(r.clientWidth - (d + c)), h = Bt(r.clientHeight - (f + v)), g = Bt(d), b = {
      rootMargin: -p + "px " + -m + "px " + -h + "px " + -g + "px",
      threshold: ce(0, Ue(1, s)) || 1
    };
    let w = !0;
    function x(E) {
      const S = E[0].intersectionRatio;
      if (S !== s) {
        if (!w)
          return i();
        S ? i(!1, S) : o = setTimeout(() => {
          i(!1, 1e-7);
        }, 100);
      }
      w = !1;
    }
    try {
      n = new IntersectionObserver(x, {
        ...b,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(x, b);
    }
    n.observe(e);
  }
  return i(!0), a;
}
function wa(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: a = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: s = !1
  } = o, d = An(e), f = r || a ? [...d ? Ot(d) : [], ...Ot(t)] : [];
  f.forEach((y) => {
    r && y.addEventListener("scroll", n, {
      passive: !0
    }), a && y.addEventListener("resize", n);
  });
  const c = d && l ? ba(d, n) : null;
  let v = -1, p = null;
  i && (p = new ResizeObserver((y) => {
    let [b] = y;
    b && b.target === d && p && (p.unobserve(t), cancelAnimationFrame(v), v = requestAnimationFrame(() => {
      p && p.observe(t);
    })), n();
  }), d && !s && p.observe(d), p.observe(t));
  let m, h = s ? Qe(e) : null;
  s && g();
  function g() {
    const y = Qe(e);
    h && (y.x !== h.x || y.y !== h.y || y.width !== h.width || y.height !== h.height) && n(), h = y, m = requestAnimationFrame(g);
  }
  return n(), () => {
    f.forEach((y) => {
      r && y.removeEventListener("scroll", n), a && y.removeEventListener("resize", n);
    }), c && c(), p && p.disconnect(), p = null, s && cancelAnimationFrame(m);
  };
}
const xa = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), r = {
    platform: ya,
    ...n
  }, a = {
    ...r.platform,
    _c: o
  };
  return qr(e, t, {
    ...r,
    platform: a
  });
};
function rn(e) {
  var t;
  return (t = e == null ? void 0 : e.$el) != null ? t : e;
}
function _a(e) {
  return {
    name: "arrow",
    options: e,
    fn(t) {
      const n = rn(u(e.element));
      return n == null ? {} : Xr({
        element: n,
        padding: e.padding
      }).fn(t);
    }
  };
}
function Po(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Xn(e, t) {
  const n = Po(e);
  return Math.round(t * n) / n;
}
function Ca(e, t, n) {
  n === void 0 && (n = {});
  const o = n.whileElementsMounted, r = F(() => {
    var B;
    return (B = u(n.open)) != null ? B : !0;
  }), a = F(() => u(n.middleware)), i = F(() => {
    var B;
    return (B = u(n.placement)) != null ? B : "bottom";
  }), l = F(() => {
    var B;
    return (B = u(n.strategy)) != null ? B : "absolute";
  }), s = F(() => {
    var B;
    return (B = u(n.transform)) != null ? B : !0;
  }), d = F(() => rn(e.value)), f = F(() => rn(t.value)), c = k(0), v = k(0), p = k(l.value), m = k(i.value), h = mn({}), g = k(!1), y = F(() => {
    const B = {
      position: p.value,
      left: "0",
      top: "0"
    };
    if (!f.value)
      return B;
    const I = Xn(f.value, c.value), L = Xn(f.value, v.value);
    return s.value ? {
      ...B,
      transform: "translate(" + I + "px, " + L + "px)",
      ...Po(f.value) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: p.value,
      left: I + "px",
      top: L + "px"
    };
  });
  let b;
  function w() {
    d.value == null || f.value == null || xa(d.value, f.value, {
      middleware: a.value,
      placement: i.value,
      strategy: l.value
    }).then((B) => {
      c.value = B.x, v.value = B.y, p.value = B.strategy, m.value = B.placement, h.value = B.middlewareData, g.value = !0;
    });
  }
  function x() {
    typeof b == "function" && (b(), b = void 0);
  }
  function E() {
    if (x(), o === void 0) {
      w();
      return;
    }
    if (d.value != null && f.value != null) {
      b = o(d.value, f.value, w);
      return;
    }
  }
  function S() {
    r.value || (g.value = !1);
  }
  return K([a, i, l], w, {
    flush: "sync"
  }), K([d, f], E, {
    flush: "sync"
  }), K(r, S, {
    flush: "sync"
  }), mo() && ho(x), {
    x: ot(c),
    y: ot(v),
    strategy: ot(p),
    placement: ot(m),
    middlewareData: ot(h),
    isPositioned: ot(g),
    floatingStyles: y,
    update: w
  };
}
function te(e, t) {
  const n = typeof e == "string" && !t ? `${e}Context` : t, o = Symbol(n);
  return [(r) => {
    const a = st(o, r);
    if (a || a === null)
      return a;
    throw new Error(
      `Injection \`${o.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(
        ", "
      )}` : `\`${e}\``}`
    );
  }, (r) => (ut(o, r), r)];
}
function Vo(e, t, n) {
  const o = n.originalEvent.target, r = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && o.addEventListener(e, t, { once: !0 }), o.dispatchEvent(r);
}
function Oa(e, t) {
  var n;
  const o = mn();
  return me(() => {
    o.value = e();
  }, {
    ...t,
    flush: (n = t == null ? void 0 : t.flush) != null ? n : "sync"
  }), gn(o);
}
function Sa(e, t) {
  let n, o, r;
  const a = k(!0), i = () => {
    a.value = !0, r();
  };
  K(e, i, { flush: "sync" });
  const l = typeof t == "function" ? t : t.get, s = typeof t == "function" ? void 0 : t.set, d = wn((f, c) => (o = f, r = c, {
    get() {
      return a.value && (n = l(), a.value = !1), o(), n;
    },
    set(v) {
      s == null || s(v);
    }
  }));
  return Object.isExtensible(d) && (d.trigger = i), d;
}
function Bo(e) {
  return mo() ? (ho(e), !0) : !1;
}
function zt(e) {
  let t = !1, n;
  const o = kr(!0);
  return (...r) => (t || (n = o.run(() => e(...r)), t = !0), n);
}
function Je(e) {
  return typeof e == "function" ? e() : u(e);
}
const gt = typeof window < "u" && typeof document < "u", Ea = (e) => typeof e < "u", Aa = Object.prototype.toString, ka = (e) => Aa.call(e) === "[object Object]", Yn = (e, t, n) => Math.min(n, Math.max(t, e)), To = () => {
};
function Pa(...e) {
  if (e.length !== 1)
    return Mr(...e);
  const t = e[0];
  return typeof t == "function" ? gn(wn(() => ({ get: t, set: To }))) : k(t);
}
function Va(e, t = 1e4) {
  return wn((n, o) => {
    let r = Je(e), a;
    const i = () => setTimeout(() => {
      r = Je(e), o();
    }, Je(t));
    return Bo(() => {
      clearTimeout(a);
    }), {
      get() {
        return n(), r;
      },
      set(l) {
        r = l, o(), clearTimeout(a), a = i();
      }
    };
  });
}
function qe(e) {
  var t;
  const n = Je(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const $o = gt ? window : void 0;
function Ba(...e) {
  let t, n, o, r;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, o, r] = e, t = $o) : [t, n, o, r] = e, !t)
    return To;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const a = [], i = () => {
    a.forEach((f) => f()), a.length = 0;
  }, l = (f, c, v, p) => (f.addEventListener(c, v, p), () => f.removeEventListener(c, v, p)), s = K(
    () => [qe(t), Je(r)],
    ([f, c]) => {
      if (i(), !f)
        return;
      const v = ka(c) ? { ...c } : c;
      a.push(
        ...n.flatMap((p) => o.map((m) => l(f, p, m, v)))
      );
    },
    { immediate: !0, flush: "post" }
  ), d = () => {
    s(), i();
  };
  return Bo(d), d;
}
function Ta(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function $a(...e) {
  let t, n, o = {};
  e.length === 3 ? (t = e[0], n = e[1], o = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], o = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: r = $o,
    eventName: a = "keydown",
    passive: i = !1,
    dedupe: l = !1
  } = o, s = Ta(t);
  return Ba(r, a, (d) => {
    d.repeat && Je(l) || s(d) && n(d);
  }, i);
}
function Fa() {
  const e = k(!1);
  return ue() && pe(() => {
    e.value = !0;
  }), e;
}
function Ma(e) {
  return JSON.parse(JSON.stringify(e));
}
function Ia(e, t) {
  const n = mn(t);
  return K(
    Pa(e),
    (o, r) => {
      n.value = r;
    },
    { flush: "sync" }
  ), gn(n);
}
function Ge(e, t, n, o = {}) {
  var r, a, i;
  const {
    clone: l = !1,
    passive: s = !1,
    eventName: d,
    deep: f = !1,
    defaultValue: c,
    shouldEmit: v
  } = o, p = ue(), m = n || (p == null ? void 0 : p.emit) || ((r = p == null ? void 0 : p.$emit) == null ? void 0 : r.bind(p)) || ((i = (a = p == null ? void 0 : p.proxy) == null ? void 0 : a.$emit) == null ? void 0 : i.bind(p == null ? void 0 : p.proxy));
  let h = d;
  t || (t = "modelValue"), h = h || `update:${t.toString()}`;
  const g = (w) => l ? typeof l == "function" ? l(w) : Ma(w) : w, y = () => Ea(e[t]) ? g(e[t]) : c, b = (w) => {
    v ? v(w) && m(h, w) : m(h, w);
  };
  if (s) {
    const w = y(), x = k(w);
    let E = !1;
    return K(
      () => e[t],
      (S) => {
        E || (E = !0, x.value = g(S), se(() => E = !1));
      }
    ), K(
      x,
      (S) => {
        !E && (S !== e[t] || f) && b(S);
      },
      { deep: f }
    ), x;
  } else
    return F({
      get() {
        return y();
      },
      set(w) {
        b(w);
      }
    });
}
function Wt(e) {
  return e ? e.flatMap((t) => t.type === xe ? Wt(t.children) : [t]) : [];
}
function Na(e, t, n, o = {}) {
  if (!t)
    return null;
  const {
    arrowKeyOptions: r = "both",
    attributeName: a = "data-radix-vue-collection-item",
    itemsArray: i = [],
    loop: l = !0,
    dir: s = "ltr",
    preventScroll: d = !0,
    focus: f = !1
  } = o, [c, v, p, m, h, g] = [
    e.key === "ArrowRight",
    e.key === "ArrowLeft",
    e.key === "ArrowUp",
    e.key === "ArrowDown",
    e.key === "Home",
    e.key === "End"
  ], y = p || m, b = c || v;
  if (!h && !g && (!y && !b || r === "vertical" && b || r === "horizontal" && y))
    return null;
  const w = n ? Array.from(n.querySelectorAll(`[${a}]`)) : i;
  if (!w.length)
    return null;
  d && e.preventDefault();
  let x = null;
  return b || y ? x = Fo(w, t, {
    goForward: y ? m : s === "ltr" ? c : v,
    loop: l
  }) : h ? x = w.at(0) || null : g && (x = w.at(-1) || null), f && (x == null || x.focus()), x;
}
function Fo(e, t, { goForward: n, loop: o }, r = e.length) {
  if (--r === 0)
    return null;
  const a = e.indexOf(t), i = n ? a + 1 : a - 1;
  if (!o && (i < 0 || i >= e.length))
    return null;
  const l = (i + e.length) % e.length, s = e[l];
  return s ? s.hasAttribute("disabled") && s.getAttribute("disabled") !== "false" ? Fo(
    e,
    s,
    { goForward: n, loop: o },
    r
  ) : s : null;
}
function Xt(e) {
  return e !== null && typeof e == "object";
}
function an(e, t, n = ".", o) {
  if (!Xt(t))
    return an(e, {}, n, o);
  const r = Object.assign({}, t);
  for (const a in e) {
    if (a === "__proto__" || a === "constructor")
      continue;
    const i = e[a];
    i != null && (o && o(r, a, i, n) || (Array.isArray(i) && Array.isArray(r[a]) ? r[a] = [...i, ...r[a]] : Xt(i) && Xt(r[a]) ? r[a] = an(
      i,
      r[a],
      (n ? `${n}.` : "") + a.toString(),
      o
    ) : r[a] = i));
  }
  return r;
}
function Ra(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, o) => an(n, o, "", e), {})
  );
}
const Da = Ra(), [Mo, Gu] = te("ConfigProvider"), ja = zt(() => k()), La = zt(() => k(0));
function kn(e) {
  const t = Mo({
    scrollBody: k(!0)
  }), n = La(), o = ja(), r = k(e), a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = o.value ?? "", o.value = void 0;
  };
  return e && n.value++, K(r, (i) => {
    var l;
    if (gt && i) {
      o.value === void 0 && (o.value = document.body.style.overflow);
      const s = window.innerWidth - document.documentElement.clientWidth, d = { padding: s, margin: 0 }, f = (l = t.scrollBody) != null && l.value ? typeof t.scrollBody.value == "object" ? Da({
        padding: t.scrollBody.value.padding === !0 ? s : t.scrollBody.value.padding,
        margin: t.scrollBody.value.margin === !0 ? s : t.scrollBody.value.margin
      }, d) : d : { padding: 0, margin: 0 };
      s > 0 && (document.body.style.paddingRight = `${f.padding}px`, document.body.style.marginRight = `${f.margin}px`, document.body.style.setProperty("--scrollbar-width", `${s}px`), document.body.style.overflow = "hidden"), se(() => {
        document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
      });
    }
  }, { immediate: !0 }), yn(() => {
    e && n.value--, n.value === 0 && a();
  }), r;
}
const za = "data-radix-vue-collection-item";
function kt(e, t = za) {
  const n = e ?? Symbol();
  return { createCollection: (o) => {
    const r = k([]);
    function a() {
      const i = qe(o);
      return i ? r.value = Array.from(
        i.querySelectorAll(`[${t}]:not([data-disabled=true])`)
      ) : r.value = [];
    }
    return Tr(() => {
      r.value = [];
    }), pe(a), $r(a), K(() => o == null ? void 0 : o.value, a, { immediate: !0 }), ut(n, r), r;
  }, injectCollection: () => st(n, k([])) };
}
function Io(e) {
  const t = Mo({
    dir: k("ltr")
  });
  return F(() => {
    var n;
    return (e == null ? void 0 : e.value) || ((n = t.dir) == null ? void 0 : n.value) || "ltr";
  });
}
function Pt(e) {
  const t = ue(), n = t == null ? void 0 : t.type.emits, o = {};
  return n != null && n.length || console.warn(
    `No emitted event found. Please check component: ${t == null ? void 0 : t.type.__name}`
  ), n == null || n.forEach((r) => {
    o[Pr(yo(r))] = (...a) => e(r, ...a);
  }), o;
}
let Yt = 0;
function No() {
  me((e) => {
    if (!gt)
      return;
    const t = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement(
      "afterbegin",
      t[0] ?? Jn()
    ), document.body.insertAdjacentElement(
      "beforeend",
      t[1] ?? Jn()
    ), Yt++, e(() => {
      Yt === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((n) => n.remove()), Yt--;
    });
  });
}
function Jn() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.cssText = "outline: none; opacity: 0; position: fixed; pointer-events: none", e;
}
function Pn(e) {
  return F(() => {
    var t;
    return Je(e) ? !!((t = qe(e)) != null && t.closest("form")) : !0;
  });
}
function Ro(e) {
  const t = ue(), n = Object.keys((t == null ? void 0 : t.type.props) ?? {}).reduce((o, r) => {
    const a = (t == null ? void 0 : t.type.props[r]).default;
    return a !== void 0 && (o[r] = a), o;
  }, {});
  return Sa(() => ({ ...e }), () => {
    const o = {}, r = (t == null ? void 0 : t.vnode.props) ?? {};
    return Object.keys(r).forEach((a) => {
      o[yo(a)] = r[a];
    }), Object.keys({ ...n, ...o }).reduce((a, i) => (e[i] !== void 0 && (a[i] = e[i]), a), {});
  });
}
function Vt(e, t) {
  const n = Ro(e), o = t ? Pt(t) : {};
  return F(() => ({
    ...n.value,
    ...o
  }));
}
function Wa() {
  const e = ue();
  function t(n) {
    typeof n == "object" && (e.exposed = n, e.exposeProxy = n);
  }
  return t;
}
var Ua = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, rt = /* @__PURE__ */ new WeakMap(), Tt = /* @__PURE__ */ new WeakMap(), $t = {}, Jt = 0, Do = function(e) {
  return e && (e.host || Do(e.parentNode));
}, Ha = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var o = Do(n);
    return o && e.contains(o) ? o : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Ka = function(e, t, n, o) {
  var r = Ha(t, Array.isArray(e) ? e : [e]);
  $t[n] || ($t[n] = /* @__PURE__ */ new WeakMap());
  var a = $t[n], i = [], l = /* @__PURE__ */ new Set(), s = new Set(r), d = function(c) {
    !c || l.has(c) || (l.add(c), d(c.parentNode));
  };
  r.forEach(d);
  var f = function(c) {
    !c || s.has(c) || Array.prototype.forEach.call(c.children, function(v) {
      if (l.has(v))
        f(v);
      else {
        var p = v.getAttribute(o), m = p !== null && p !== "false", h = (rt.get(v) || 0) + 1, g = (a.get(v) || 0) + 1;
        rt.set(v, h), a.set(v, g), i.push(v), h === 1 && m && Tt.set(v, !0), g === 1 && v.setAttribute(n, "true"), m || v.setAttribute(o, "true");
      }
    });
  };
  return f(t), l.clear(), Jt++, function() {
    i.forEach(function(c) {
      var v = rt.get(c) - 1, p = a.get(c) - 1;
      rt.set(c, v), a.set(c, p), v || (Tt.has(c) || c.removeAttribute(o), Tt.delete(c)), p || c.removeAttribute(n);
    }), Jt--, Jt || (rt = /* @__PURE__ */ new WeakMap(), rt = /* @__PURE__ */ new WeakMap(), Tt = /* @__PURE__ */ new WeakMap(), $t = {});
  };
}, Ga = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var o = Array.from(Array.isArray(e) ? e : [e]), r = t || Ua(e);
  return r ? (o.push.apply(o, Array.from(r.querySelectorAll("[aria-live]"))), Ka(o, r, n, "aria-hidden")) : function() {
    return null;
  };
};
function jo(e) {
  let t;
  K(() => qe(e), (n) => {
    n ? t = Ga(n) : t && t();
  }), Dt(() => {
    t && t();
  });
}
const qa = zt(() => ({ count: k(0) }));
function Ze(e) {
  const { count: t } = qa();
  return e || t.value++, e || `radix-${t.value}`;
}
function Xa(e) {
  const t = k(), n = F(() => {
    var r;
    return ((r = t.value) == null ? void 0 : r.width) ?? 0;
  }), o = F(() => {
    var r;
    return ((r = t.value) == null ? void 0 : r.height) ?? 0;
  });
  return pe(() => {
    const r = qe(e);
    if (r) {
      t.value = { width: r.offsetWidth, height: r.offsetHeight };
      const a = new ResizeObserver((i) => {
        if (!Array.isArray(i) || !i.length)
          return;
        const l = i[0];
        let s, d;
        if ("borderBoxSize" in l) {
          const f = l.borderBoxSize, c = Array.isArray(f) ? f[0] : f;
          s = c.inlineSize, d = c.blockSize;
        } else
          s = r.offsetWidth, d = r.offsetHeight;
        t.value = { width: s, height: d };
      });
      return a.observe(r, { box: "border-box" }), () => a.unobserve(r);
    } else
      t.value = void 0;
  }), {
    width: n,
    height: o
  };
}
function Ya(e, t) {
  const n = k(e);
  function o(r) {
    return t[n.value][r] ?? n.value;
  }
  return {
    state: n,
    dispatch: (r) => {
      n.value = o(r);
    }
  };
}
function Vn(e) {
  const t = Va("", 1e3);
  return {
    search: t,
    handleTypeaheadSearch: (n) => {
      var o, r;
      t.value = t.value + n;
      const a = e.value, i = document.activeElement, l = ((r = (o = a.find((c) => c === i)) == null ? void 0 : o.textContent) == null ? void 0 : r.trim()) ?? "", s = a.map((c) => {
        var v;
        return ((v = c.textContent) == null ? void 0 : v.trim()) ?? "";
      }), d = Za(s, t.value, l), f = a.find(
        (c) => {
          var v;
          return ((v = c.textContent) == null ? void 0 : v.trim()) === d;
        }
      );
      f && f.focus();
    },
    resetTypeahead: () => {
      t.value = "";
    }
  };
}
function Ja(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
function Za(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((l) => l === t[0]) ? t[0] : t, r = n ? e.indexOf(n) : -1;
  let a = Ja(e, Math.max(r, 0));
  o.length === 1 && (a = a.filter((l) => l !== n));
  const i = a.find(
    (l) => l.toLowerCase().startsWith(o.toLowerCase())
  );
  return i !== n ? i : void 0;
}
const Bn = P({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var o, r;
      if (!n.default)
        return null;
      const a = Wt(n.default()), [i, ...l] = a;
      if (Object.keys(t).length > 0) {
        (o = i.props) == null || delete o.ref;
        const s = R(t, i.props ?? {});
        t.class && (r = i.props) != null && r.class && delete i.props.class;
        const d = Ar(i, s);
        for (const f in s)
          f.startsWith("on") && (d.props || (d.props = {}), d.props[f] = s[f]);
        return a.length === 1 ? d : [d, ...l];
      }
      return a;
    };
  }
}), U = P({
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
    return (e.asChild ? "template" : e.as) !== "template" ? () => dt(e.as, t, { default: n.default }) : () => dt(Bn, t, { default: n.default });
  }
});
function ne() {
  const e = k(), t = F(() => {
    var n, o;
    return ["#text", "#comment"].includes((n = e.value) == null ? void 0 : n.$el.nodeName) ? (o = e.value) == null ? void 0 : o.$el.nextElementSibling : qe(e);
  });
  return {
    primitiveElement: e,
    currentElement: t
  };
}
function Qa(e, t) {
  const n = k({}), o = k("none"), r = e.value ? "mounted" : "unmounted", { state: a, dispatch: i } = Ya(r, {
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
  K(
    e,
    async (c, v) => {
      var p;
      const m = v !== c;
      if (await se(), m) {
        const h = o.value, g = Ft(t.value);
        c ? i("MOUNT") : g === "none" || ((p = n.value) == null ? void 0 : p.display) === "none" ? i("UNMOUNT") : i(v && h !== g ? "ANIMATION_OUT" : "UNMOUNT");
      }
    },
    { immediate: !0 }
  );
  const l = (c) => {
    const v = Ft(t.value), p = v.includes(
      c.animationName
    );
    c.target === t.value && p && i("ANIMATION_END"), c.target === t.value && v === "none" && i("ANIMATION_END");
  }, s = (c) => {
    c.target === t.value && (o.value = Ft(t.value));
  }, d = K(
    t,
    (c, v) => {
      c ? (n.value = getComputedStyle(c), c.addEventListener("animationstart", s), c.addEventListener("animationcancel", l), c.addEventListener("animationend", l)) : (i("ANIMATION_END"), v == null || v.removeEventListener("animationstart", s), v == null || v.removeEventListener("animationcancel", l), v == null || v.removeEventListener("animationend", l));
    },
    { immediate: !0 }
  ), f = K(a, () => {
    const c = Ft(t.value);
    o.value = a.value === "mounted" ? c : "none";
  });
  return Dt(() => {
    d(), f();
  }), {
    isPresent: F(
      () => ["mounted", "unmountSuspended"].includes(a.value)
    )
  };
}
function Ft(e) {
  return e && getComputedStyle(e).animationName || "none";
}
const Ut = P({
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
    const { present: r, forceMount: a } = Me(e), i = k(), { isPresent: l } = Qa(r, i);
    n({ present: l });
    let s = t.default({ present: l });
    s = Wt(s || []);
    const d = ue();
    if (s && (s == null ? void 0 : s.length) > 1) {
      const f = (o = d == null ? void 0 : d.parent) != null && o.type.name ? `<${d.parent.type.name} />` : "component";
      throw new Error(
        [
          `Detected an invalid children for \`${f}\` for  \`Presence\` component.`,
          "",
          "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
          "You can apply a few solutions:",
          [
            "Provide a single child element so that `presence` directive attach correctly.",
            "Ensure the first child is an actual element instead of a raw text node or comment node."
          ].map((c) => `  - ${c}`).join(`
`)
        ].join(`
`)
      );
    }
    return () => a.value || r.value || l.value ? dt(t.default({ present: l })[0], {
      ref: (f) => {
        const c = qe(f);
        return typeof (c == null ? void 0 : c.hasAttribute) > "u" || (c != null && c.hasAttribute("data-radix-popper-content-wrapper") ? i.value = c.firstChild : i.value = c), c;
      }
    }) : null;
  }
}), [ke, ei] = te("DialogRoot"), ti = /* @__PURE__ */ P({
  __name: "DialogRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    modal: { type: Boolean, default: !0 }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const n = e, o = Ge(n, "open", t, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), r = k(), a = k(), { modal: i } = Me(n);
    return ei({
      open: o,
      modal: i,
      openModal: () => {
        o.value = !0;
      },
      onOpenChange: (l) => {
        o.value = l;
      },
      onOpenToggle: () => {
        o.value = !o.value;
      },
      contentId: Ze(),
      titleId: Ze(),
      descriptionId: Ze(),
      triggerElement: r,
      contentElement: a
    }), (l, s) => V(l.$slots, "default");
  }
}), Lo = /* @__PURE__ */ P({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = Fa();
    return (n, o) => u(t) || n.forceMount ? (C(), T(bn, {
      key: 0,
      to: n.to,
      disabled: n.disabled
    }, [
      V(n.$slots, "default")
    ], 8, ["to", "disabled"])) : ee("", !0);
  }
}), ni = /* @__PURE__ */ P({
  __name: "DialogPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, o) => (C(), T(u(Lo), Be(We(t)), {
      default: O(() => [
        V(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), oi = "dismissableLayer.pointerDownOutside", ri = "dismissableLayer.focusOutside";
function zo(e, t) {
  const n = t.closest(
    "[data-dismissable-layer]"
  ), o = e.querySelector(
    "[data-dismissable-layer]"
  ), r = Array.from(
    e.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  return !!(n && o === n || r.indexOf(o) < r.indexOf(n));
}
function ai(e, t) {
  var n;
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), r = k(!1), a = k(() => {
  });
  return me((i) => {
    if (!gt)
      return;
    const l = async (d) => {
      if (t != null && t.value) {
        if (zo(t.value, d.target)) {
          r.value = !1;
          return;
        }
        if (d.target && !r.value) {
          let f = function() {
            Vo(
              oi,
              e,
              c
            );
          };
          const c = { originalEvent: d };
          d.pointerType === "touch" ? (o.removeEventListener("click", a.value), a.value = f, o.addEventListener("click", a.value, {
            once: !0
          })) : f();
        } else
          o.removeEventListener("click", a.value);
        r.value = !1;
      }
    }, s = window.setTimeout(() => {
      o.addEventListener("pointerdown", l);
    }, 0);
    i(() => {
      window.clearTimeout(s), o.removeEventListener("pointerdown", l), o.removeEventListener("click", a.value);
    });
  }), {
    onPointerDownCapture: () => r.value = !0
  };
}
function ii(e, t) {
  var n;
  const o = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), r = k(!1);
  return me((a) => {
    if (!gt)
      return;
    const i = async (l) => {
      t != null && t.value && (await se(), !zo(t.value, l.target) && l.target && !r.value && Vo(
        ri,
        e,
        { originalEvent: l }
      ));
    };
    o.addEventListener("focusin", i), a(() => o.removeEventListener("focusin", i));
  }), {
    onFocusCapture: () => r.value = !0,
    onBlurCapture: () => r.value = !1
  };
}
const Pe = hn({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Tn = /* @__PURE__ */ P({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(e, { emit: t }) {
    const n = e, o = t, { primitiveElement: r, currentElement: a } = ne(), i = F(
      () => {
        var m;
        return ((m = a.value) == null ? void 0 : m.ownerDocument) ?? globalThis.document;
      }
    ), l = F(() => Pe.layersRoot), s = F(() => a.value ? Array.from(l.value).indexOf(a.value) : -1), d = F(() => Pe.layersWithOutsidePointerEventsDisabled.size > 0), f = F(() => {
      const m = Array.from(l.value), [h] = [...Pe.layersWithOutsidePointerEventsDisabled].slice(-1), g = m.indexOf(h);
      return s.value >= g;
    }), c = ai(async (m) => {
      const h = [...Pe.branches].some(
        (g) => g.contains(m.target)
      );
      !f.value || h || (o("pointerDownOutside", m), o("interactOutside", m), await se(), m.defaultPrevented || o("dismiss"));
    }, a), v = ii((m) => {
      [...Pe.branches].some(
        (h) => h.contains(m.target)
      ) || (o("focusOutside", m), o("interactOutside", m), m.defaultPrevented || o("dismiss"));
    }, a);
    $a("Escape", (m) => {
      s.value === l.value.size - 1 && (o("escapeKeyDown", m), m.defaultPrevented || o("dismiss"));
    });
    let p;
    return me((m) => {
      a.value && (n.disableOutsidePointerEvents && (Pe.layersWithOutsidePointerEventsDisabled.size === 0 && (p = i.value.body.style.pointerEvents, i.value.body.style.pointerEvents = "none"), Pe.layersWithOutsidePointerEventsDisabled.add(a.value)), l.value.add(a.value), m(() => {
        n.disableOutsidePointerEvents && Pe.layersWithOutsidePointerEventsDisabled.size === 1 && (i.value.body.style.pointerEvents = p);
      }));
    }), me((m) => {
      m(() => {
        a.value && (l.value.delete(a.value), Pe.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (m, h) => (C(), T(u(U), {
      ref_key: "primitiveElement",
      ref: r,
      "as-child": m.asChild,
      as: m.as,
      "data-dismissable-layer": "",
      style: tt({
        pointerEvents: d.value ? f.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: u(v).onFocusCapture,
      onBlurCapture: u(v).onBlurCapture,
      onPointerdownCapture: u(c).onPointerDownCapture
    }, {
      default: O(() => [
        V(m.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), Zt = "focusScope.autoFocusOnMount", Qt = "focusScope.autoFocusOnUnmount", Zn = { bubbles: !1, cancelable: !0 };
function li(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const o of e)
    if (Le(o, { select: t }), document.activeElement !== n)
      return !0;
}
function si(e) {
  const t = Wo(e), n = Qn(t, e), o = Qn(t.reverse(), e);
  return [n, o];
}
function Wo(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (o) => {
      const r = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || r ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); )
    t.push(n.currentNode);
  return t;
}
function Qn(e, t) {
  for (const n of e)
    if (!ui(n, { upTo: t }))
      return n;
}
function ui(e, { upTo: t }) {
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
function ci(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Le(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && ci(e) && t && e.select();
  }
}
const di = zt(() => k([]));
function fi() {
  const e = di();
  return {
    add(t) {
      const n = e.value[0];
      t !== n && (n == null || n.pause()), e.value = eo(e.value, t), e.value.unshift(t);
    },
    remove(t) {
      var n;
      e.value = eo(e.value, t), (n = e.value[0]) == null || n.resume();
    }
  };
}
function eo(e, t) {
  const n = [...e], o = n.indexOf(t);
  return o !== -1 && n.splice(o, 1), n;
}
function pi(e) {
  return e.filter((t) => t.tagName !== "A");
}
const $n = /* @__PURE__ */ P({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, o = t, { primitiveElement: r, currentElement: a } = ne(), i = k(null), l = fi(), s = hn({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    me((f) => {
      if (!gt)
        return;
      const c = a.value;
      if (!n.trapped)
        return;
      function v(g) {
        if (s.paused || !c)
          return;
        const y = g.target;
        c.contains(y) ? i.value = y : Le(i.value, { select: !0 });
      }
      function p(g) {
        if (s.paused || !c)
          return;
        const y = g.relatedTarget;
        y !== null && (c.contains(y) || Le(i.value, { select: !0 }));
      }
      function m(g) {
        c.contains(i.value) || Le(c);
      }
      document.addEventListener("focusin", v), document.addEventListener("focusout", p);
      const h = new MutationObserver(m);
      c && h.observe(c, { childList: !0, subtree: !0 }), f(() => {
        document.removeEventListener("focusin", v), document.removeEventListener("focusout", p), h.disconnect();
      });
    }), me(async (f) => {
      const c = a.value;
      if (await se(), !c)
        return;
      l.add(s);
      const v = document.activeElement;
      if (!c.contains(v)) {
        const p = new CustomEvent(Zt, Zn);
        c.addEventListener(
          Zt,
          (m) => o("mountAutoFocus", m)
        ), c.dispatchEvent(p), p.defaultPrevented || (li(pi(Wo(c)), {
          select: !0
        }), document.activeElement === v && Le(c));
      }
      f(() => {
        c.removeEventListener(
          Zt,
          (h) => o("mountAutoFocus", h)
        );
        const p = new CustomEvent(Qt, Zn), m = (h) => {
          o("unmountAutoFocus", h);
        };
        c.addEventListener(Qt, m), c.dispatchEvent(p), setTimeout(() => {
          p.defaultPrevented || Le(v ?? document.body, { select: !0 }), c.removeEventListener(Qt, m), l.remove(s);
        }, 0);
      });
    });
    function d(f) {
      if (!n.loop && !n.trapped || s.paused)
        return;
      const c = f.key === "Tab" && !f.altKey && !f.ctrlKey && !f.metaKey, v = document.activeElement;
      if (c && v) {
        const p = f.currentTarget, [m, h] = si(p);
        m && h ? !f.shiftKey && v === h ? (f.preventDefault(), n.loop && Le(m, { select: !0 })) : f.shiftKey && v === m && (f.preventDefault(), n.loop && Le(h, { select: !0 })) : v === p && f.preventDefault();
      }
    }
    return (f, c) => (C(), T(u(U), {
      ref_key: "primitiveElement",
      ref: r,
      tabindex: "-1",
      "as-child": n.asChild,
      as: n.as,
      onKeydown: d
    }, {
      default: O(() => [
        V(f.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
}), vi = ["ArrowDown", "PageUp", "Home"], Uo = ["ArrowUp", "PageDown", "End"], mi = [...vi, ...Uo];
function Ho(e) {
  return e ? "open" : "closed";
}
function ln(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t))
      return;
}
function hi(e, t) {
  const { x: n, y: o } = e;
  let r = !1;
  for (let a = 0, i = t.length - 1; a < t.length; i = a++) {
    const l = t[a].x, s = t[a].y, d = t[i].x, f = t[i].y;
    s > o != f > o && n < (d - l) * (o - s) / (f - s) + l && (r = !r);
  }
  return r;
}
function gi(e, t) {
  if (!t)
    return !1;
  const n = { x: e.clientX, y: e.clientY };
  return hi(n, t);
}
function yi(e) {
  return e.pointerType === "mouse";
}
function bi() {
  const e = "DialogContent", t = "DialogTitle", n = ke(), o = `Warning: \`${e}\` requires a \`${t}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://www.radix-vue.com/components/dialog.html#title;`, r = `Warning: Missing \`Description\` or \`aria-describedby="undefined"\` for ${e}.`;
  pe(() => {
    var a;
    document.getElementById(n.titleId) || console.warn(o);
    const i = (a = n.contentElement.value) == null ? void 0 : a.getAttribute("aria-describedby");
    n.descriptionId && i && (document.getElementById(n.descriptionId) || console.warn(r));
  });
}
const Ko = /* @__PURE__ */ P({
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
    const n = e, o = t, r = ke(), { primitiveElement: a, currentElement: i } = ne();
    return pe(() => {
      r.contentElement = i;
    }), process.env.NODE_ENV !== "production" && bi(), (l, s) => (C(), T(u($n), {
      "as-child": "",
      loop: "",
      trapped: n.trapFocus,
      onMountAutoFocus: s[5] || (s[5] = (d) => o("openAutoFocus", d)),
      onUnmountAutoFocus: s[6] || (s[6] = (d) => o("closeAutoFocus", d))
    }, {
      default: O(() => [
        j(u(Tn), R({
          id: u(r).contentId,
          ref_key: "primitiveElement",
          ref: a,
          as: l.as,
          "as-child": l.asChild,
          "disable-outside-pointer-events": l.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": u(r).descriptionId,
          "aria-labelledby": u(r).titleId,
          "data-state": u(Ho)(u(r).open.value)
        }, l.$attrs, {
          onDismiss: s[0] || (s[0] = (d) => u(r).onOpenChange(!1)),
          onEscapeKeyDown: s[1] || (s[1] = (d) => o("escapeKeyDown", d)),
          onFocusOutside: s[2] || (s[2] = (d) => o("focusOutside", d)),
          onInteractOutside: s[3] || (s[3] = (d) => o("interactOutside", d)),
          onPointerDownOutside: s[4] || (s[4] = (d) => o("pointerDownOutside", d))
        }), {
          default: O(() => [
            V(l.$slots, "default")
          ]),
          _: 3
        }, 16, ["id", "as", "as-child", "disable-outside-pointer-events", "aria-describedby", "aria-labelledby", "data-state"])
      ]),
      _: 3
    }, 8, ["trapped"]));
  }
}), wi = /* @__PURE__ */ P({
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
    const n = e, o = t, r = ke(), a = Pt(o), { primitiveElement: i, currentElement: l } = ne();
    return jo(l), (s, d) => (C(), T(Ko, R({
      ref_key: "primitiveElement",
      ref: i
    }, { ...n, ...u(a) }, {
      "trap-focus": u(r).open.value,
      "disable-outside-pointer-events": !0,
      onCloseAutoFocus: d[0] || (d[0] = (f) => {
        var c;
        o("closeAutoFocus", f), f.defaultPrevented || (f.preventDefault(), (c = u(r).triggerElement.value) == null || c.focus());
      }),
      onPointerDownOutside: d[1] || (d[1] = (f) => {
        const c = f.detail.originalEvent, v = c.button === 0 && c.ctrlKey === !0;
        (c.button === 2 || v) && f.preventDefault();
      }),
      onFocusOutside: d[2] || (d[2] = (f) => {
        f.preventDefault();
      }),
      onOpenAutoFocus: d[3] || (d[3] = (f) => o("openAutoFocus", f))
    }), {
      default: O(() => [
        V(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["trap-focus"]));
  }
}), xi = /* @__PURE__ */ P({
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
    const n = e, o = t, r = Pt(o), a = ke(), i = k(!1), l = k(!1);
    return (s, d) => (C(), T(Ko, R({ ...n, ...u(r) }, {
      "trap-focus": !1,
      "disable-outside-pointer-events": !1,
      onCloseAutoFocus: d[0] || (d[0] = (f) => {
        var c;
        o("closeAutoFocus", f), f.defaultPrevented || (i.value || (c = u(a).triggerElement.value) == null || c.focus(), f.preventDefault()), i.value = !1, l.value = !1;
      }),
      onInteractOutside: d[1] || (d[1] = (f) => {
        var c;
        f.defaultPrevented || (i.value = !0, f.detail.originalEvent.type === "pointerdown" && (l.value = !0));
        const v = f.target;
        (c = u(a).triggerElement.value) != null && c.contains(v) && f.preventDefault(), f.detail.originalEvent.type === "focusin" && l.value && f.preventDefault();
      })
    }), {
      default: O(() => [
        V(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), _i = /* @__PURE__ */ P({
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
    const n = e, o = t, r = ke(), a = Pt(o);
    return (i, l) => (C(), T(u(Ut), {
      present: i.forceMount || u(r).open.value
    }, {
      default: O(() => [
        u(r).modal.value ? (C(), T(wi, R({ key: 0 }, { ...n, ...u(a), ...i.$attrs }, {
          onOpenAutoFocus: l[0] || (l[0] = (s) => o("openAutoFocus", s))
        }), {
          default: O(() => [
            V(i.$slots, "default")
          ]),
          _: 3
        }, 16)) : (C(), T(xi, Be(R({ key: 1 }, { ...n, ...u(a), ...i.$attrs })), {
          default: O(() => [
            V(i.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), Ci = /* @__PURE__ */ P({
  __name: "DialogOverlayImpl",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  setup(e) {
    const t = ke();
    return kn(!0), (n, o) => (C(), T(u(U), {
      as: n.as,
      "as-child": n.asChild,
      "data-state": u(t).open.value ? "open" : "closed",
      style: { "pointer-events": "auto" }
    }, {
      default: O(() => [
        V(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "data-state"]));
  }
}), Oi = /* @__PURE__ */ P({
  __name: "DialogOverlay",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  setup(e) {
    const t = ke();
    return (n, o) => {
      var r;
      return (r = u(t)) != null && r.modal.value ? (C(), T(u(Ut), {
        key: 0,
        present: n.forceMount || u(t).open.value
      }, {
        default: O(() => [
          j(Ci, R({
            as: n.as,
            "as-child": n.asChild
          }, n.$attrs), {
            default: O(() => [
              V(n.$slots, "default")
            ]),
            _: 3
          }, 16, ["as", "as-child"])
        ]),
        _: 3
      }, 8, ["present"])) : ee("", !0);
    };
  }
}), Si = /* @__PURE__ */ P({
  __name: "DialogClose",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "button" }
  },
  setup(e) {
    const t = e, n = ke();
    return (o, r) => (C(), T(u(U), R(t, {
      type: o.as === "button" ? "button" : void 0,
      onClick: r[0] || (r[0] = (a) => u(n).onOpenChange(!1))
    }), {
      default: O(() => [
        V(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["type"]));
  }
}), Ei = /* @__PURE__ */ P({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "h2" }
  },
  setup(e) {
    const t = e, n = ke();
    return (o, r) => (C(), T(u(U), R(t, {
      id: u(n).titleId
    }), {
      default: O(() => [
        V(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
}), Ai = /* @__PURE__ */ P({
  __name: "DialogDescription",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "p" }
  },
  setup(e) {
    const t = e, n = ke();
    return (o, r) => (C(), T(u(U), R(t, {
      id: u(n).descriptionId
    }), {
      default: O(() => [
        V(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
});
function Fn(e) {
  return e === "indeterminate";
}
function Go(e) {
  return Fn(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
const ki = ["value", "checked", "name", "disabled", "required"], [Pi, Vi] = te("CheckboxRoot"), Bi = /* @__PURE__ */ P({
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
    const n = e, o = t, { disabled: r } = Me(n), a = Ge(n, "checked", o, {
      defaultValue: n.defaultChecked,
      passive: n.checked === void 0
    }), { primitiveElement: i, currentElement: l } = ne(), s = Pn(l), d = F(() => {
      var f;
      return n.id && l.value ? (f = document.querySelector(`[for="${n.id}"]`)) == null ? void 0 : f.innerText : void 0;
    });
    return Vi({
      disabled: r,
      state: a
    }), (f, c) => (C(), X(xe, null, [
      j(u(U), R(f.$attrs, {
        id: f.id,
        ref_key: "primitiveElement",
        ref: i,
        role: "checkbox",
        "as-child": n.asChild,
        as: f.as,
        type: f.as === "button" ? "button" : void 0,
        "aria-checked": u(Fn)(u(a)) ? "mixed" : u(a),
        "aria-required": !1,
        "aria-label": f.$attrs["aria-label"] || d.value,
        "data-state": u(Go)(u(a)),
        "data-disabled": u(r) ? "" : void 0,
        disabled: u(r),
        onKeydown: bo(lt(() => {
        }, ["prevent"]), ["enter"]),
        onClick: c[0] || (c[0] = (v) => a.value = !u(a))
      }), {
        default: O(() => [
          V(f.$slots, "default")
        ]),
        _: 3
      }, 16, ["id", "as-child", "as", "type", "aria-checked", "aria-label", "data-state", "data-disabled", "disabled", "onKeydown"]),
      u(s) ? (C(), X("input", {
        key: 0,
        type: "checkbox",
        tabindex: "-1",
        "aria-hidden": "",
        value: f.value,
        checked: !!u(a),
        name: n.name,
        disabled: n.disabled,
        required: n.required,
        style: tt({
          transform: "translateX(-100%)",
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        })
      }, null, 12, ki)) : ee("", !0)
    ], 64));
  }
}), Ti = /* @__PURE__ */ P({
  __name: "CheckboxIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "span" }
  },
  setup(e) {
    const t = Pi();
    return (n, o) => (C(), T(u(Ut), {
      present: n.forceMount || u(Fn)(u(t).state.value) || u(t).state.value === !0
    }, {
      default: O(() => [
        j(u(U), R({
          "data-state": u(Go)(u(t).state.value),
          "data-disabled": u(t).disabled.value ? "" : void 0,
          style: { pointerEvents: "none" },
          "as-child": n.asChild,
          as: n.as
        }, n.$attrs), {
          default: O(() => [
            V(n.$slots, "default")
          ]),
          _: 3
        }, 16, ["data-state", "data-disabled", "as-child", "as"])
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), [qo, $i] = te("PopperRoot"), Fi = /* @__PURE__ */ P({
  __name: "PopperRoot",
  setup(e) {
    const t = k();
    return $i({
      anchor: t,
      onAnchorChange: (n) => t.value = n
    }), (n, o) => V(n.$slots, "default");
  }
}), Mi = /* @__PURE__ */ P({
  __name: "PopperAnchor",
  props: {
    element: {},
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  setup(e) {
    const t = e, { primitiveElement: n, currentElement: o } = ne(), r = qo();
    return K(o, () => {
      r.onAnchorChange(t.element ?? o.value);
    }), (a, i) => (C(), T(u(U), {
      ref_key: "primitiveElement",
      ref: n,
      as: a.as,
      "as-child": a.asChild
    }, {
      default: O(() => [
        V(a.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
});
function Ii(e) {
  return e !== null;
}
function Ni(e) {
  return {
    name: "transformOrigin",
    options: e,
    fn(t) {
      var n, o, r;
      const { placement: a, rects: i, middlewareData: l } = t, s = ((n = l.arrow) == null ? void 0 : n.centerOffset) !== 0, d = s ? 0 : e.arrowWidth, f = s ? 0 : e.arrowHeight, [c, v] = sn(a), p = { start: "0%", center: "50%", end: "100%" }[v], m = (((o = l.arrow) == null ? void 0 : o.x) ?? 0) + d / 2, h = (((r = l.arrow) == null ? void 0 : r.y) ?? 0) + f / 2;
      let g = "", y = "";
      return c === "bottom" ? (g = s ? p : `${m}px`, y = `${-f}px`) : c === "top" ? (g = s ? p : `${m}px`, y = `${i.floating.height + f}px`) : c === "right" ? (g = `${-f}px`, y = s ? p : `${h}px`) : c === "left" && (g = `${i.floating.width + f}px`, y = s ? p : `${h}px`), { data: { x: g, y } };
    }
  };
}
function sn(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
const Xo = {
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
}, [qu, Ri] = te("PopperContent"), Yo = /* @__PURE__ */ P({
  inheritAttrs: !1,
  __name: "PopperContent",
  props: go({
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
    ...Xo
  }),
  setup(e, { expose: t }) {
    const n = e, o = qo(), r = Wa(), { primitiveElement: a, currentElement: i } = ne(), l = k(), s = k(), { width: d, height: f } = Xa(s), c = F(
      () => n.side + (n.align !== "center" ? `-${n.align}` : "")
    ), v = F(() => typeof n.collisionPadding == "number" ? n.collisionPadding : { top: 0, right: 0, bottom: 0, left: 0, ...n.collisionPadding }), p = F(() => Array.isArray(n.collisionBoundary) ? n.collisionBoundary : [n.collisionBoundary]), m = F(() => ({
      padding: v.value,
      boundary: p.value.filter(Ii),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: p.value.length > 0
    })), h = Oa(() => [
      Qr({
        mainAxis: n.sideOffset + f.value,
        alignmentAxis: n.alignOffset
      }),
      n.avoidCollisions && ea({
        mainAxis: !0,
        crossAxis: !!n.prioritizePosition,
        limiter: n.sticky === "partial" ? ta() : void 0,
        ...m.value
      }),
      !n.prioritizePosition && n.avoidCollisions && Yr({
        ...m.value
      }),
      na({
        ...m.value,
        apply: ({ elements: _, rects: M, availableWidth: A, availableHeight: H }) => {
          const { width: D, height: G } = M.reference, q = _.floating.style;
          Object.assign(_.floating.style, {
            maxWidth: `${A}px`,
            maxHeight: `${H}px`
          }), q.setProperty(
            "--radix-popper-available-width",
            `${A}px`
          ), q.setProperty(
            "--radix-popper-available-height",
            `${H}px`
          ), q.setProperty(
            "--radix-popper-anchor-width",
            `${D}px`
          ), q.setProperty(
            "--radix-popper-anchor-height",
            `${G}px`
          );
        }
      }),
      s.value && _a({ element: s.value, padding: n.arrowPadding }),
      Ni({
        arrowWidth: d.value,
        arrowHeight: f.value
      }),
      n.hideWhenDetached && Jr({ strategy: "referenceHidden", ...m.value })
    ]), { floatingStyles: g, placement: y, isPositioned: b, middlewareData: w } = Ca(
      o.anchor,
      l,
      {
        strategy: "fixed",
        placement: c,
        whileElementsMounted: (..._) => wa(..._, {
          animationFrame: n.updatePositionStrategy === "always"
        }),
        middleware: h
      }
    ), x = F(
      () => sn(y.value)[0]
    ), E = F(
      () => sn(y.value)[1]
    );
    me(() => {
      var _;
      b.value && ((_ = n.onPlaced) == null || _.call(n));
    });
    const S = F(
      () => {
        var _;
        return ((_ = w.value.arrow) == null ? void 0 : _.centerOffset) !== 0;
      }
    ), B = k("");
    me(() => {
      i.value && (B.value = window.getComputedStyle(i.value).zIndex);
    });
    const I = F(() => {
      var _;
      return ((_ = w.value.arrow) == null ? void 0 : _.x) ?? 0;
    }), L = F(() => {
      var _;
      return ((_ = w.value.arrow) == null ? void 0 : _.y) ?? 0;
    });
    return Ri({
      placedSide: x,
      onArrowChange: (_) => s.value = _,
      arrowX: I,
      arrowY: L,
      shouldHideArrow: S
    }), t({
      $el: i
    }), (_, M) => {
      var A, H, D;
      return C(), X("div", {
        ref_key: "floatingRef",
        ref: l,
        "data-radix-popper-content-wrapper": "",
        style: tt({
          ...u(g),
          transform: u(b) ? u(g).transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: B.value,
          "--radix-popper-transform-origin": [
            (A = u(w).transformOrigin) == null ? void 0 : A.x,
            (H = u(w).transformOrigin) == null ? void 0 : H.y
          ].join(" ")
        })
      }, [
        j(u(U), R({
          ref: (G) => {
            u(r)(G), a.value = G;
          }
        }, _.$attrs, {
          "as-child": n.asChild,
          as: _.as,
          "data-side": x.value,
          "data-align": E.value,
          style: {
            // if the PopperContent hasn't been placed yet (not all measurements done)
            // we prevent animations so that users's animation don't kick in too early referring wrong sides
            animation: u(b) ? void 0 : "none",
            // hide the content if using the hide middleware and should be hidden
            opacity: (D = u(w).hide) != null && D.referenceHidden ? 0 : void 0
          }
        }), {
          default: O(() => [
            V(_.$slots, "default")
          ]),
          _: 3
        }, 16, ["as-child", "as", "data-side", "data-align", "style"])
      ], 4);
    };
  }
}), Di = /* @__PURE__ */ P({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "span" }
  },
  setup(e) {
    return (t, n) => (C(), T(u(U), {
      as: t.as,
      "as-child": t.asChild,
      style: tt({
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
      default: O(() => [
        V(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "style"]));
  }
}), [Jo, Xu] = te("CollectionProvider");
P({
  name: "CollectionSlot",
  setup(e, { slots: t }) {
    const n = Jo(), { primitiveElement: o, currentElement: r } = ne();
    return K(r, () => {
      n.collectionRef.value = r.value;
    }), () => dt(Bn, { ref: o }, t);
  }
});
P({
  name: "CollectionItem",
  setup(e, { slots: t, attrs: n }) {
    const o = Jo(), { primitiveElement: r, currentElement: a } = ne(), i = ue();
    return me((l) => {
      var s;
      if (a.value) {
        const d = zn(a.value);
        o.itemMap.value.set(d, { ref: a.value, ...zn(((s = i == null ? void 0 : i.parent) == null ? void 0 : s.props) ?? {}) }), l(() => o.itemMap.value.delete(d));
      }
    }), () => dt(Bn, { ...n, [o.attrName]: "", ref: r }, t);
  }
});
const [ji, Yu] = te(["MenuRoot", "MenuSub"], "MenuContext"), [Li, Ju] = te("MenuRoot"), zi = "rovingFocusGroup.onEntryFocus", Wi = { bubbles: !1, cancelable: !0 };
function Ui(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t))
      return;
}
const [Zu, Hi] = te("RovingFocusGroup"), Ki = /* @__PURE__ */ P({
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
    const n = e, o = t, { loop: r, orientation: a, dir: i } = Me(n), l = Io(i), s = Ge(n, "currentTabStopId", o, {
      defaultValue: n.defaultCurrentTabStopId,
      passive: n.currentTabStopId === void 0
    }), d = k(!1), f = k(!1), c = k(0), { primitiveElement: v, currentElement: p } = ne(), { createCollection: m } = kt("rovingFocus"), h = m(p);
    function g(y) {
      const b = !f.value;
      if (y.currentTarget && y.target === y.currentTarget && b && !d.value) {
        const w = new CustomEvent(zi, Wi);
        if (y.currentTarget.dispatchEvent(w), o("entryFocus", w), !w.defaultPrevented) {
          const x = h.value, E = x.find((I) => I.getAttribute("data-active") === "true"), S = x.find(
            (I) => I.id === s.value
          ), B = [E, S, ...x].filter(
            Boolean
          );
          Ui(B);
        }
      }
      f.value = !1;
    }
    return Hi({
      loop: r,
      dir: l,
      orientation: a,
      currentTabStopId: s,
      onItemFocus: (y) => {
        s.value = y;
      },
      onItemShiftTab: () => {
        d.value = !0;
      },
      onFocusableItemAdd: () => {
        c.value++;
      },
      onFocusableItemRemove: () => {
        c.value--;
      }
    }), (y, b) => (C(), T(u(U), {
      ref_key: "primitiveElement",
      ref: v,
      tabindex: d.value || c.value === 0 ? -1 : 0,
      "data-orientation": u(a),
      as: y.as,
      "as-child": y.asChild,
      dir: u(l),
      style: { outline: "none" },
      onMousedown: b[0] || (b[0] = (w) => f.value = !0),
      onFocus: g,
      onBlur: b[1] || (b[1] = (w) => d.value = !1)
    }, {
      default: O(() => [
        V(y.$slots, "default")
      ]),
      _: 3
    }, 8, ["tabindex", "data-orientation", "as", "as-child", "dir"]));
  }
}), [Qu, Gi] = te("MenuContent");
go({
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
  ...Xo
});
const qi = /* @__PURE__ */ P({
  __name: "Label",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "label" }
  },
  setup(e) {
    const t = e;
    return (n, o) => (C(), T(u(U), R(t, {
      onMousedown: o[0] || (o[0] = (r) => {
        !r.defaultPrevented && r.detail > 1 && r.preventDefault();
      })
    }), {
      default: O(() => [
        V(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), St = 100, [Xi, Yi] = te("ProgressRoot"), Mn = (e) => typeof e == "number";
function Ji(e, t) {
  return e === null || Mn(e) && !Number.isNaN(e) && e <= t && e >= 0 ? e : (console.error(`Invalid prop \`value\` of value \`${e}\` supplied to \`ProgressRoot\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${St} if no \`max\` prop is set)
  - \`null\` if the progress is indeterminate.

Defaulting to \`null\`.`), null);
}
function Zi(e) {
  return Mn(e) && !Number.isNaN(e) && e > 0 ? e : (console.error(
    `Invalid prop \`max\` of value \`${e}\` supplied to \`ProgressRoot\`. Only numbers greater than 0 are valid max values. Defaulting to \`${St}\`.`
  ), St);
}
const Qi = /* @__PURE__ */ P({
  __name: "ProgressRoot",
  props: {
    modelValue: {},
    max: { default: St },
    getValueLabel: { type: Function, default: (e, t) => `${Math.round(e / t * St)}%` },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue", "update:max"],
  setup(e, { emit: t }) {
    const n = e, o = t, r = Ge(n, "modelValue", o, {
      passive: n.modelValue === void 0
    }), a = Ge(n, "max", o, {
      passive: n.max === void 0
    });
    K(
      () => r.value,
      async (l) => {
        const s = Ji(l, n.max);
        s !== l && (await se(), r.value = s);
      },
      { immediate: !0 }
    ), K(
      () => n.max,
      (l) => {
        const s = Zi(n.max);
        s !== l && (a.value = s);
      },
      { immediate: !0 }
    );
    const i = F(() => r.value ? r.value === a.value ? "complete" : "loading" : "indeterminate");
    return Yi({
      modelValue: r,
      max: a,
      progressState: i
    }), (l, s) => (C(), T(u(U), {
      "as-child": n.asChild,
      as: l.as,
      "aria-valuemax": u(a),
      "aria-valuemin": 0,
      "aria-valuenow": Mn(u(r)) ? u(r) : void 0,
      "aria-valuetext": l.getValueLabel(u(r), u(a)),
      "aria-label": l.getValueLabel(u(r), u(a)),
      role: "progressbar",
      "data-state": i.value,
      "data-value": u(r) ?? void 0,
      "data-max": u(a)
    }, {
      default: O(() => [
        V(l.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-label", "data-state", "data-value", "data-max"]));
  }
}), el = /* @__PURE__ */ P({
  __name: "ProgressIndicator",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  setup(e) {
    const t = e, n = Xi();
    return (o, r) => {
      var a;
      return C(), T(u(U), R(t, {
        "data-state": u(n).progressState.value,
        "data-value": ((a = u(n).modelValue) == null ? void 0 : a.value) ?? void 0,
        "data-max": u(n).max.value
      }), {
        default: O(() => [
          V(o.$slots, "default")
        ]),
        _: 3
      }, 16, ["data-state", "data-value", "data-max"]);
    };
  }
}), tl = ["default-value"], nl = /* @__PURE__ */ P({
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
    const t = e, { value: n } = Me(t);
    Ia(n);
    const o = k();
    return (r, a) => (C(), T(u(Di), { "as-child": "" }, {
      default: O(() => [
        xn(Ae("select", R({
          ref_key: "selectElement",
          ref: o
        }, t, {
          "onUpdate:modelValue": a[0] || (a[0] = (i) => Et(n) ? n.value = i : null),
          "default-value": u(n)
        }), [
          V(r.$slots, "default")
        ], 16, tl), [
          [Fr, u(n)]
        ])
      ]),
      _: 3
    }));
  }
}), ol = {
  key: 0,
  value: ""
}, [nt, Zo] = te("SelectRoot"), [rl, al] = te("SelectRoot"), il = /* @__PURE__ */ P({
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
    const n = e, o = t, r = Ge(n, "modelValue", o, {
      defaultValue: n.defaultValue,
      passive: n.modelValue === void 0
    }), a = Ge(n, "open", o, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), i = k(), l = k(), s = k({
      x: 0,
      y: 0
    }), d = k(!1), { required: f, disabled: c, dir: v } = Me(n), p = Io(v);
    Zo({
      triggerElement: i,
      onTriggerChange: (y) => {
        i.value = y;
      },
      valueElement: l,
      onValueElementChange: (y) => {
        l.value = y;
      },
      valueElementHasChildren: d,
      onValueElementHasChildrenChange: (y) => {
        d.value = y;
      },
      contentId: Ze(),
      modelValue: r,
      onValueChange: (y) => {
        r.value = y;
      },
      open: a,
      required: f,
      onOpenChange: (y) => {
        a.value = y;
      },
      dir: p,
      triggerPointerDownPosRef: s,
      disabled: c
    });
    const m = Pn(i), h = k(/* @__PURE__ */ new Set()), g = F(() => Array.from(h.value).map((y) => {
      var b;
      return (b = y.props) == null ? void 0 : b.value;
    }).join(";"));
    return al({
      onNativeOptionAdd: (y) => {
        h.value.add(y);
      },
      onNativeOptionRemove: (y) => {
        h.value.delete(y);
      }
    }), (y, b) => (C(), T(u(Fi), null, {
      default: O(() => [
        V(y.$slots, "default"),
        u(m) ? (C(), T(nl, R({ key: g.value }, y.$attrs, {
          "aria-hidden": "",
          tabindex: "-1",
          required: u(f),
          name: y.name,
          autocomplete: y.autocomplete,
          disabled: u(c),
          value: u(r),
          onChange: b[0] || (b[0] = (w) => r.value = w.target.value)
        }), {
          default: O(() => [
            u(r) === void 0 ? (C(), X("option", ol)) : ee("", !0),
            (C(!0), X(xe, null, tn(Array.from(h.value), (w) => (C(), T(wo(w), R(w.props, {
              key: w.key ?? ""
            }), null, 16))), 128))
          ]),
          _: 1
        }, 16, ["required", "name", "autocomplete", "disabled", "value"])) : ee("", !0)
      ]),
      _: 3
    }));
  }
}), ll = [" ", "Enter", "ArrowUp", "ArrowDown"], sl = [" ", "Enter"], Ve = 10;
function Qo(e) {
  return e === "" || e === void 0;
}
const ul = /* @__PURE__ */ P({
  __name: "SelectTrigger",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "button" }
  },
  setup(e) {
    const t = e, n = nt(), o = F(() => {
      var v;
      return ((v = n.disabled) == null ? void 0 : v.value) || t.disabled;
    }), { primitiveElement: r, currentElement: a } = ne();
    pe(() => {
      n.triggerElement = a;
    });
    const { injectCollection: i } = kt(), l = i(), { search: s, handleTypeaheadSearch: d, resetTypeahead: f } = Vn(l);
    function c() {
      o.value || (n.onOpenChange(!0), f());
    }
    return (v, p) => (C(), T(u(Mi), { "as-child": "" }, {
      default: O(() => {
        var m, h, g, y;
        return [
          j(u(U), {
            ref_key: "primitiveElement",
            ref: r,
            role: "combobox",
            type: v.as === "button" ? "button" : void 0,
            "aria-controls": u(n).contentId,
            "aria-expanded": u(n).open.value || !1,
            "aria-required": (m = u(n).required) == null ? void 0 : m.value,
            "aria-autocomplete": "none",
            disabled: v.disabled,
            dir: (h = u(n)) == null ? void 0 : h.dir.value,
            "data-state": (g = u(n)) != null && g.open.value ? "open" : "closed",
            "data-disabled": o.value ? "" : void 0,
            "data-placeholder": u(Qo)((y = u(n).modelValue) == null ? void 0 : y.value) ? "" : void 0,
            "as-child": v.asChild,
            as: v.as,
            onClick: p[0] || (p[0] = (b) => {
              var w;
              (w = b == null ? void 0 : b.currentTarget) == null || w.focus();
            }),
            onPointerdown: p[1] || (p[1] = (b) => {
              const w = b.target;
              w.hasPointerCapture(b.pointerId) && w.releasePointerCapture(b.pointerId), b.button === 0 && b.ctrlKey === !1 && (c(), u(n).triggerPointerDownPosRef.value = {
                x: Math.round(b.pageX),
                y: Math.round(b.pageY)
              }, b.preventDefault());
            }),
            onPointerup: p[2] || (p[2] = lt(() => {
            }, ["prevent"])),
            onKeydown: p[3] || (p[3] = (b) => {
              const w = u(s) !== "";
              !(b.ctrlKey || b.altKey || b.metaKey) && b.key.length === 1 && w && b.key === " " || (u(d)(b.key), u(ll).includes(b.key) && (c(), b.preventDefault()));
            })
          }, {
            default: O(() => [
              V(v.$slots, "default")
            ]),
            _: 3
          }, 8, ["type", "aria-controls", "aria-expanded", "aria-required", "disabled", "dir", "data-state", "data-disabled", "data-placeholder", "as-child", "as"])
        ];
      }),
      _: 3
    }));
  }
}), cl = /* @__PURE__ */ P({
  __name: "SelectPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, o) => (C(), T(u(Lo), Be(We(t)), {
      default: O(() => [
        V(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), [dl, fl] = te("SelectItemAlignedPosition"), pl = /* @__PURE__ */ P({
  inheritAttrs: !1,
  __name: "SelectItemAlignedPosition",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  emits: ["placed"],
  setup(e, { emit: t }) {
    const n = e, o = t, { injectCollection: r } = kt(), a = nt(), i = Ht(), l = r(), s = k(!1), d = k(!0), f = k(), { primitiveElement: c, currentElement: v } = ne(), { viewport: p, selectedItem: m, selectedItemText: h, focusSelectedItem: g } = i;
    function y() {
      if (a.triggerElement.value && a.valueElement.value && f.value && v.value && p != null && p.value && m != null && m.value && h != null && h.value) {
        const x = a.triggerElement.value.getBoundingClientRect(), E = v.value.getBoundingClientRect(), S = a.valueElement.value.getBoundingClientRect(), B = h.value.getBoundingClientRect();
        if (a.dir.value !== "rtl") {
          const Y = B.left - E.left, z = S.left - Y, ye = x.left - z, ie = x.width + ye, be = Math.max(ie, E.width), Gt = window.innerWidth - Ve, qt = Yn(z, Ve, Gt - be);
          f.value.style.minWidth = `${ie}px`, f.value.style.left = `${qt}px`;
        } else {
          const Y = E.right - B.right, z = window.innerWidth - S.right - Y, ye = window.innerWidth - x.right - z, ie = x.width + ye, be = Math.max(ie, E.width), Gt = window.innerWidth - Ve, qt = Yn(
            z,
            Ve,
            Gt - be
          );
          f.value.style.minWidth = `${ie}px`, f.value.style.right = `${qt}px`;
        }
        const I = l.value, L = window.innerHeight - Ve * 2, _ = p.value.scrollHeight, M = window.getComputedStyle(v.value), A = Number.parseInt(
          M.borderTopWidth,
          10
        ), H = Number.parseInt(M.paddingTop, 10), D = Number.parseInt(
          M.borderBottomWidth,
          10
        ), G = Number.parseInt(
          M.paddingBottom,
          10
        ), q = A + H + _ + G + D, re = Math.min(
          m.value.offsetHeight * 5,
          q
        ), ge = window.getComputedStyle(p.value), _e = Number.parseInt(ge.paddingTop, 10), Ne = Number.parseInt(
          ge.paddingBottom,
          10
        ), ve = x.top + x.height / 2 - Ve, Re = L - ve, oe = m.value.offsetHeight / 2, Kt = m.value.offsetTop + oe, $ = A + H + Kt, W = q - $;
        if ($ <= ve) {
          const Y = m.value === I[I.length - 1];
          f.value.style.bottom = "0px";
          const z = v.value.clientHeight - p.value.offsetTop - p.value.offsetHeight, ye = Math.max(
            Re,
            oe + (Y ? Ne : 0) + z + D
          ), ie = $ + ye;
          f.value.style.height = `${ie}px`;
        } else {
          const Y = m.value === I[0];
          f.value.style.top = "0px";
          const z = Math.max(
            ve,
            A + p.value.offsetTop + (Y ? _e : 0) + oe
          ) + W;
          f.value.style.height = `${z}px`, p.value.scrollTop = $ - ve + p.value.offsetTop;
        }
        f.value.style.margin = `${Ve}px 0`, f.value.style.minHeight = `${re}px`, f.value.style.maxHeight = `${L}px`, o("placed"), requestAnimationFrame(() => s.value = !0);
      }
    }
    const b = k("");
    pe(async () => {
      await se(), y(), v.value && (b.value = window.getComputedStyle(v.value).zIndex);
    });
    function w(x) {
      x && d.value === !0 && (y(), g == null || g(), d.value = !1);
    }
    return fl({
      contentWrapper: f,
      shouldExpandOnScrollRef: s,
      onScrollButtonChange: w
    }), (x, E) => (C(), X("div", {
      ref_key: "contentWrapperElement",
      ref: f,
      style: tt({
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        zIndex: b.value
      })
    }, [
      j(u(U), R({
        ref_key: "primitiveElement",
        ref: c,
        style: {
          // When we get the height of the content, it includes borders. If we were to set
          // the height without having `boxSizing: 'border-box'` it would be too big.
          boxSizing: "border-box",
          // We need to ensure the content doesn't get taller than the wrapper
          maxHeight: "100%"
        }
      }, { ...x.$attrs, ...n }), {
        default: O(() => [
          V(x.$slots, "default")
        ]),
        _: 3
      }, 16, ["style"])
    ], 4));
  }
}), vl = /* @__PURE__ */ P({
  __name: "SelectPopperPosition",
  props: {
    side: {},
    sideOffset: {},
    align: { default: "start" },
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: { default: Ve },
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
    const t = Ro(e);
    return (n, o) => (C(), T(u(Yo), R(u(t), { style: {
      // Ensure border-box for floating-ui calculations
      boxSizing: "border-box",
      "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
      "--radix-select-content-available-width": "var(--radix-popper-available-width)",
      "--radix-select-content-available-height": "var(--radix-popper-available-height)",
      "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
      "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
    } }), {
      default: O(() => [
        V(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["style"]));
  }
}), In = {
  onViewportChange: () => {
  },
  itemTextRefCallback: () => {
  },
  itemRefCallback: () => {
  }
}, [Ht, ml] = te("SelectContent"), hl = /* @__PURE__ */ P({
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
    const n = e, o = t, r = nt();
    No(), kn(!0);
    const { createCollection: a } = kt(), i = k();
    jo(i);
    const l = a(i), { search: s, handleTypeaheadSearch: d } = Vn(l), f = k(), c = k(), v = k(), p = k(!1), m = k(!1);
    function h() {
      c.value && i.value && ln([c.value, i.value]);
    }
    K(p, () => {
      h();
    });
    const { onOpenChange: g, triggerPointerDownPosRef: y } = r;
    me((x) => {
      if (!i.value)
        return;
      let E = { x: 0, y: 0 };
      const S = (I) => {
        var L, _;
        E = {
          x: Math.abs(
            Math.round(I.pageX) - (((L = y.value) == null ? void 0 : L.x) ?? 0)
          ),
          y: Math.abs(
            Math.round(I.pageY) - (((_ = y.value) == null ? void 0 : _.y) ?? 0)
          )
        };
      }, B = (I) => {
        var L;
        E.x <= 10 && E.y <= 10 ? I.preventDefault() : (L = i.value) != null && L.contains(I.target) || g(!1), document.removeEventListener("pointermove", S), y.value = null;
      };
      y.value !== null && (document.addEventListener("pointermove", S), document.addEventListener("pointerup", B, {
        capture: !0,
        once: !0
      })), x(() => {
        document.removeEventListener("pointermove", S), document.removeEventListener("pointerup", B, {
          capture: !0
        });
      });
    });
    function b(x) {
      const E = x.ctrlKey || x.altKey || x.metaKey;
      if (x.key === "Tab" && x.preventDefault(), !E && x.key.length === 1 && d(x.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(x.key)) {
        let S = l.value;
        if (["ArrowUp", "End"].includes(x.key) && (S = S.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(x.key)) {
          const B = x.target, I = S.indexOf(B);
          S = S.slice(I + 1);
        }
        setTimeout(() => ln(S)), x.preventDefault();
      }
    }
    const w = F(() => n.position === "popper" ? n : {});
    return ml({
      content: i,
      viewport: f,
      onViewportChange: (x) => {
        f.value = x;
      },
      itemRefCallback: (x, E, S) => {
        var B, I;
        const L = !m.value && !S;
        (((B = r.modelValue) == null ? void 0 : B.value) !== void 0 && ((I = r.modelValue) == null ? void 0 : I.value) === E || L) && (c.value = x, L && (m.value = !0));
      },
      selectedItem: c,
      selectedItemText: v,
      onItemLeave: () => {
        var x;
        (x = i.value) == null || x.focus();
      },
      itemTextRefCallback: (x, E, S) => {
        var B, I;
        const L = !m.value && !S;
        (((B = r.modelValue) == null ? void 0 : B.value) !== void 0 && ((I = r.modelValue) == null ? void 0 : I.value) === E || L) && (v.value = x);
      },
      focusSelectedItem: h,
      position: n.position,
      isPositioned: p,
      searchRef: s
    }), (x, E) => (C(), T(u($n), {
      "as-child": "",
      onMountAutoFocus: E[6] || (E[6] = lt(() => {
      }, ["prevent"])),
      onUnmountAutoFocus: E[7] || (E[7] = (S) => {
        var B;
        o("closeAutoFocus", S), !S.defaultPrevented && ((B = u(r).triggerElement.value) == null || B.focus({ preventScroll: !0 }), S.preventDefault());
      })
    }, {
      default: O(() => [
        j(u(Tn), {
          "as-child": "",
          "disable-outside-pointer-events": "",
          onFocusOutside: E[2] || (E[2] = lt(() => {
          }, ["prevent"])),
          onDismiss: E[3] || (E[3] = (S) => u(r).onOpenChange(!1)),
          onEscapeKeyDown: E[4] || (E[4] = (S) => o("escapeKeyDown", S)),
          onPointerDownOutside: E[5] || (E[5] = (S) => o("pointerDownOutside", S))
        }, {
          default: O(() => [
            (C(), T(wo(
              x.position === "popper" ? vl : pl
            ), R({ ...x.$attrs, ...w.value }, {
              id: u(r).contentId,
              ref: (S) => {
                i.value = u(qe)(S);
              },
              role: "listbox",
              "data-state": u(r).open.value ? "open" : "closed",
              dir: u(r).dir.value,
              style: {
                // flex layout so we can place the scroll buttons properly
                display: "flex",
                flexDirection: "column",
                // reset the outline by default as the content MAY get focused
                outline: "none"
              },
              onContextmenu: E[0] || (E[0] = lt(() => {
              }, ["prevent"])),
              onPlaced: E[1] || (E[1] = (S) => p.value = !0),
              onKeydown: b
            }), {
              default: O(() => [
                V(x.$slots, "default")
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
}), gl = /* @__PURE__ */ P({
  __name: "SelectProvider",
  props: {
    context: {}
  },
  setup(e) {
    return Zo(e.context), (t, n) => V(t.$slots, "default");
  }
}), yl = /* @__PURE__ */ P({
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
    const n = Vt(e, t), o = nt(), r = k();
    pe(() => {
      r.value = new DocumentFragment();
    });
    const a = k();
    return (i, l) => {
      var s;
      return C(), X(xe, null, [
        j(u(Ut), {
          ref_key: "presenceRef",
          ref: a,
          present: i.forceMount || u(o).open.value
        }, {
          default: O(() => [
            j(hl, Be(We({ ...u(n), ...i.$attrs })), {
              default: O(() => [
                V(i.$slots, "default")
              ]),
              _: 3
            }, 16)
          ]),
          _: 3
        }, 8, ["present"]),
        !((s = a.value) != null && s.present) && r.value ? (C(), T(bn, {
          key: 0,
          to: r.value
        }, [
          j(gl, { context: u(o) }, {
            default: O(() => [
              Ae("div", null, [
                V(i.$slots, "default")
              ])
            ]),
            _: 3
          }, 8, ["context"])
        ], 8, ["to"])) : ee("", !0)
      ], 64);
    };
  }
}), [er, bl] = te("SelectItem"), wl = /* @__PURE__ */ P({
  __name: "SelectItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  setup(e) {
    const t = e, { disabled: n } = Me(t), o = nt(), r = Ht(In), { primitiveElement: a, currentElement: i } = ne(), l = F(() => {
      var h;
      return ((h = o.modelValue) == null ? void 0 : h.value) === t.value;
    }), s = k(!1), d = k(t.textValue ?? ""), f = Ze();
    async function c(h) {
      await se(), !(h != null && h.defaultPrevented) && (n.value || (o.onValueChange(t.value), o.onOpenChange(!1)));
    }
    async function v(h) {
      var g;
      await se(), !h.defaultPrevented && (n.value ? (g = r.onItemLeave) == null || g.call(r) : h.currentTarget.focus({ preventScroll: !0 }));
    }
    async function p(h) {
      var g;
      await se(), !h.defaultPrevented && h.currentTarget === document.activeElement && ((g = r.onItemLeave) == null || g.call(r));
    }
    async function m(h) {
      var g;
      await se(), !(h.defaultPrevented || ((g = r.searchRef) == null ? void 0 : g.value) !== "" && h.key === " ") && (sl.includes(h.key) && c(), h.key === " " && h.preventDefault());
    }
    if (t.value === "")
      throw new Error(
        "A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return pe(() => {
      i.value && r.itemRefCallback(
        i.value,
        t.value,
        t.disabled
      );
    }), bl({
      value: t.value,
      disabled: n,
      textId: f,
      isSelected: l,
      onItemTextChange: (h) => {
        d.value = ((d.value || (h == null ? void 0 : h.textContent)) ?? "").trim();
      }
    }), (h, g) => (C(), T(u(U), {
      ref_key: "primitiveElement",
      ref: a,
      role: "option",
      "data-radix-vue-collection-item": "",
      "aria-labelledby": u(f),
      "data-highlighted": s.value ? "" : void 0,
      "aria-selected": l.value && s.value,
      "data-state": l.value ? "checked" : "unchecked",
      "aria-disabled": u(n) || void 0,
      "data-disabled": u(n) ? "" : void 0,
      tabindex: u(n) ? void 0 : -1,
      as: h.as,
      "as-child": h.asChild,
      onFocus: g[0] || (g[0] = (y) => s.value = !0),
      onBlur: g[1] || (g[1] = (y) => s.value = !1),
      onPointerup: c,
      onPointermove: v,
      onPointerleave: p,
      onKeydown: m
    }, {
      default: O(() => [
        V(h.$slots, "default")
      ]),
      _: 3
    }, 8, ["aria-labelledby", "data-highlighted", "aria-selected", "data-state", "aria-disabled", "data-disabled", "tabindex", "as", "as-child"]));
  }
}), xl = /* @__PURE__ */ P({
  __name: "SelectItemIndicator",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "span" }
  },
  setup(e) {
    const t = e, n = er();
    return (o, r) => u(n).isSelected.value ? (C(), T(u(U), R({
      key: 0,
      "aria-hidden": ""
    }, t), {
      default: O(() => [
        V(o.$slots, "default")
      ]),
      _: 3
    }, 16)) : ee("", !0);
  }
}), [_l, Cl] = te("SelectGroup"), Ol = /* @__PURE__ */ P({
  __name: "SelectGroup",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  setup(e) {
    const t = e, n = Ze();
    return Cl({ id: n }), (o, r) => (C(), T(u(U), R({ role: "group" }, t, { "aria-labelledby": u(n) }), {
      default: O(() => [
        V(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-labelledby"]));
  }
}), Sl = /* @__PURE__ */ P({
  __name: "SelectLabel",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "div" }
  },
  setup(e) {
    const t = e, n = _l({ id: "" });
    return (o, r) => (C(), T(u(U), R(t, {
      id: u(n).id
    }), {
      default: O(() => [
        V(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["id"]));
  }
}), El = /* @__PURE__ */ P({
  inheritAttrs: !1,
  __name: "SelectItemText",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "span" }
  },
  setup(e) {
    const t = e, n = nt(), o = Ht(In), r = rl(), a = er(), { primitiveElement: i, currentElement: l } = ne(), s = F(() => {
      var d;
      return dt("option", {
        key: a.value,
        value: a.value,
        disabled: a.disabled.value,
        innerHTML: (d = l.value) == null ? void 0 : d.textContent
      });
    });
    return pe(() => {
      l.value && (a.onItemTextChange(l.value), o.itemTextRefCallback(
        l.value,
        a.value,
        a.disabled.value
      ), r.onNativeOptionAdd(s.value));
    }), yn(() => {
      r.onNativeOptionRemove(s.value);
    }), (d, f) => (C(), X(xe, null, [
      j(u(U), R({
        id: u(a).textId,
        ref_key: "primitiveElement",
        ref: i
      }, { ...t, ...d.$attrs }), {
        default: O(() => [
          V(d.$slots, "default")
        ]),
        _: 3
      }, 16, ["id"]),
      u(a).isSelected.value && u(n).valueElement.value && !u(n).valueElementHasChildren.value ? (C(), T(bn, {
        key: 0,
        to: u(n).valueElement.value
      }, [
        V(d.$slots, "default")
      ], 8, ["to"])) : ee("", !0)
    ], 64));
  }
}), Al = /* @__PURE__ */ P({
  __name: "SelectViewport",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function] }
  },
  setup(e) {
    const t = e, n = Ht(In), o = n.position === "item-aligned" ? dl() : void 0, { primitiveElement: r, currentElement: a } = ne();
    pe(() => {
      n == null || n.onViewportChange(a.value);
    });
    const i = k(0);
    function l(s) {
      const d = s.currentTarget, { shouldExpandOnScrollRef: f, contentWrapper: c } = o ?? {};
      if (f != null && f.value && c != null && c.value) {
        const v = Math.abs(i.value - d.scrollTop);
        if (v > 0) {
          const p = window.innerHeight - Ve * 2, m = Number.parseFloat(
            c.value.style.minHeight
          ), h = Number.parseFloat(c.value.style.height), g = Math.max(m, h);
          if (g < p) {
            const y = g + v, b = Math.min(p, y), w = y - b;
            c.value.style.height = `${b}px`, c.value.style.bottom === "0px" && (d.scrollTop = w > 0 ? w : 0, c.value.style.justifyContent = "flex-end");
          }
        }
      }
      i.value = d.scrollTop;
    }
    return (s, d) => (C(), X(xe, null, [
      j(u(U), { as: "style" }, {
        default: O(() => [
          Ce(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-radix-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-radix-select-viewport]::-webkit-scrollbar { display: none; } ")
        ]),
        _: 1
      }),
      j(u(U), R({
        ref_key: "primitiveElement",
        ref: r,
        "data-radix-select-viewport": "",
        role: "presentation"
      }, { ...s.$attrs, ...t }, {
        style: {
          // we use position: 'relative' here on the `viewport` so that when we call
          // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
          // (independent of the scrollUpButton).
          position: "relative",
          flex: 1,
          overflow: "auto"
        },
        onScroll: l
      }), {
        default: O(() => [
          V(s.$slots, "default")
        ]),
        _: 3
      }, 16, ["style"])
    ], 64));
  }
}), kl = /* @__PURE__ */ P({
  __name: "SelectValue",
  props: {
    placeholder: { default: "" },
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "span" }
  },
  setup(e) {
    const { primitiveElement: t, currentElement: n } = ne(), o = nt(), r = Vr();
    return Br(() => {
      var a;
      const i = !!Wt((a = r == null ? void 0 : r.default) == null ? void 0 : a.call(r)).length;
      o.onValueElementHasChildrenChange(i);
    }), pe(() => {
      o.valueElement = n;
    }), (a, i) => (C(), T(u(U), {
      ref_key: "primitiveElement",
      ref: t,
      as: a.as,
      "as-child": a.asChild,
      style: { pointerEvents: "none" }
    }, {
      default: O(() => {
        var l;
        return [
          u(Qo)((l = u(o).modelValue) == null ? void 0 : l.value) ? (C(), X(xe, { key: 0 }, [
            Ce(Oe(a.placeholder), 1)
          ], 64)) : V(a.$slots, "default", { key: 1 })
        ];
      }),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), Pl = /* @__PURE__ */ P({
  __name: "SelectIcon",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "span" }
  },
  setup(e) {
    return (t, n) => (C(), T(u(U), {
      "aria-hidden": "",
      as: t.as,
      "as-child": t.asChild
    }, {
      default: O(() => [
        V(t.$slots, "default", {}, () => [
          Ce("▼")
        ])
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), Vl = ["name", "disabled", "required", "value", "checked", "data-state", "data-disabled"], [Bl, Tl] = te("SwitchRoot"), $l = /* @__PURE__ */ P({
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
    const n = e, o = t, { disabled: r } = Me(n), a = Ge(n, "checked", o, {
      defaultValue: n.defaultChecked,
      passive: n.checked === void 0
    });
    function i() {
      r.value || (a.value = !a.value);
    }
    const { primitiveElement: l, currentElement: s } = ne(), d = Pn(s), f = F(() => {
      var c;
      return n.id && s.value ? (c = document.querySelector(`[for="${n.id}"]`)) == null ? void 0 : c.innerText : void 0;
    });
    return Tl({
      checked: a,
      toggleCheck: i,
      disabled: r
    }), (c, v) => (C(), X(xe, null, [
      j(u(U), R(c.$attrs, {
        id: c.id,
        ref_key: "primitiveElement",
        ref: l,
        role: "switch",
        type: c.as === "button" ? "button" : void 0,
        value: c.value,
        "aria-label": c.$attrs["aria-label"] || f.value,
        "aria-checked": u(a),
        "aria-required": c.required,
        "data-state": u(a) ? "checked" : "unchecked",
        "data-disabled": u(r) ? "" : void 0,
        "as-child": c.asChild,
        as: c.as,
        disabled: u(r),
        onClick: i,
        onKeydown: bo(lt(i, ["prevent"]), ["enter"])
      }), {
        default: O(() => [
          V(c.$slots, "default")
        ]),
        _: 3
      }, 16, ["id", "type", "value", "aria-label", "aria-checked", "aria-required", "data-state", "data-disabled", "as-child", "as", "disabled", "onKeydown"]),
      u(d) ? (C(), X("input", {
        key: 0,
        type: "checkbox",
        name: c.name,
        tabindex: "-1",
        "aria-hidden": "",
        disabled: u(r),
        required: c.required,
        value: c.value,
        checked: !!u(a),
        "data-state": u(a) ? "checked" : "unchecked",
        "data-disabled": u(r) ? "" : void 0,
        style: tt({
          transform: "translateX(-100%)",
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        })
      }, null, 12, Vl)) : ee("", !0)
    ], 64));
  }
}), Fl = /* @__PURE__ */ P({
  __name: "SwitchThumb",
  props: {
    asChild: { type: Boolean },
    as: { type: [String, Object, Function], default: "span" }
  },
  setup(e) {
    const t = Bl();
    return (n, o) => {
      var r;
      return C(), T(u(U), {
        "data-state": (r = u(t).checked) != null && r.value ? "checked" : "unchecked",
        "data-disabled": u(t).disabled.value ? "" : void 0,
        "as-child": n.asChild,
        as: n.as
      }, {
        default: O(() => [
          V(n.$slots, "default")
        ]),
        _: 3
      }, 8, ["data-state", "data-disabled", "as-child", "as"]);
    };
  }
});
function tr(e) {
  var t, n, o = "";
  if (typeof e == "string" || typeof e == "number")
    o += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (n = tr(e[t])) && (o && (o += " "), o += n);
    else
      for (t in e)
        e[t] && (o && (o += " "), o += t);
  return o;
}
function nr() {
  for (var e, t, n = 0, o = ""; n < arguments.length; )
    (e = arguments[n++]) && (t = tr(e)) && (o && (o += " "), o += t);
  return o;
}
const to = (e) => typeof e == "boolean" ? "".concat(e) : e === 0 ? "0" : e, no = nr, Ml = (e, t) => (n) => {
  var o;
  if ((t == null ? void 0 : t.variants) == null)
    return no(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: r, defaultVariants: a } = t, i = Object.keys(r).map((d) => {
    const f = n == null ? void 0 : n[d], c = a == null ? void 0 : a[d];
    if (f === null)
      return null;
    const v = to(f) || to(c);
    return r[d][v];
  }), l = n && Object.entries(n).reduce((d, f) => {
    let [c, v] = f;
    return v === void 0 || (d[c] = v), d;
  }, {}), s = t == null || (o = t.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((d, f) => {
    let { class: c, className: v, ...p } = f;
    return Object.entries(p).every((m) => {
      let [h, g] = m;
      return Array.isArray(g) ? g.includes({
        ...a,
        ...l
      }[h]) : {
        ...a,
        ...l
      }[h] === g;
    }) ? [
      ...d,
      c,
      v
    ] : d;
  }, []);
  return no(e, i, s, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, Il = Ml(
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
), Nn = "-";
function Nl(e) {
  const t = Dl(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  function r(i) {
    const l = i.split(Nn);
    return l[0] === "" && l.length !== 1 && l.shift(), or(l, t) || Rl(i);
  }
  function a(i, l) {
    const s = n[i] || [];
    return l && o[i] ? [...s, ...o[i]] : s;
  }
  return {
    getClassGroupId: r,
    getConflictingClassGroupIds: a
  };
}
function or(e, t) {
  var i;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], o = t.nextPart.get(n), r = o ? or(e.slice(1), o) : void 0;
  if (r)
    return r;
  if (t.validators.length === 0)
    return;
  const a = e.join(Nn);
  return (i = t.validators.find(({
    validator: l
  }) => l(a))) == null ? void 0 : i.classGroupId;
}
const oo = /^\[(.+)\]$/;
function Rl(e) {
  if (oo.test(e)) {
    const t = oo.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}
function Dl(e) {
  const {
    theme: t,
    prefix: n
  } = e, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Ll(Object.entries(e.classGroups), n).forEach(([a, i]) => {
    un(i, o, a, t);
  }), o;
}
function un(e, t, n, o) {
  e.forEach((r) => {
    if (typeof r == "string") {
      const a = r === "" ? t : ro(t, r);
      a.classGroupId = n;
      return;
    }
    if (typeof r == "function") {
      if (jl(r)) {
        un(r(o), t, n, o);
        return;
      }
      t.validators.push({
        validator: r,
        classGroupId: n
      });
      return;
    }
    Object.entries(r).forEach(([a, i]) => {
      un(i, ro(t, a), n, o);
    });
  });
}
function ro(e, t) {
  let n = e;
  return t.split(Nn).forEach((o) => {
    n.nextPart.has(o) || n.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(o);
  }), n;
}
function jl(e) {
  return e.isThemeGetter;
}
function Ll(e, t) {
  return t ? e.map(([n, o]) => {
    const r = o.map((a) => typeof a == "string" ? t + a : typeof a == "object" ? Object.fromEntries(Object.entries(a).map(([i, l]) => [t + i, l])) : a);
    return [n, r];
  }) : e;
}
function zl(e) {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  function r(a, i) {
    n.set(a, i), t++, t > e && (t = 0, o = n, n = /* @__PURE__ */ new Map());
  }
  return {
    get(a) {
      let i = n.get(a);
      if (i !== void 0)
        return i;
      if ((i = o.get(a)) !== void 0)
        return r(a, i), i;
    },
    set(a, i) {
      n.has(a) ? n.set(a, i) : r(a, i);
    }
  };
}
const rr = "!";
function Wl(e) {
  const t = e.separator, n = t.length === 1, o = t[0], r = t.length;
  return function(i) {
    const l = [];
    let s = 0, d = 0, f;
    for (let h = 0; h < i.length; h++) {
      let g = i[h];
      if (s === 0) {
        if (g === o && (n || i.slice(h, h + r) === t)) {
          l.push(i.slice(d, h)), d = h + r;
          continue;
        }
        if (g === "/") {
          f = h;
          continue;
        }
      }
      g === "[" ? s++ : g === "]" && s--;
    }
    const c = l.length === 0 ? i : i.substring(d), v = c.startsWith(rr), p = v ? c.substring(1) : c, m = f && f > d ? f - d : void 0;
    return {
      modifiers: l,
      hasImportantModifier: v,
      baseClassName: p,
      maybePostfixModifierPosition: m
    };
  };
}
function Ul(e) {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((o) => {
    o[0] === "[" ? (t.push(...n.sort(), o), n = []) : n.push(o);
  }), t.push(...n.sort()), t;
}
function Hl(e) {
  return {
    cache: zl(e.cacheSize),
    splitModifiers: Wl(e),
    ...Nl(e)
  };
}
const Kl = /\s+/;
function Gl(e, t) {
  const {
    splitModifiers: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: r
  } = t, a = /* @__PURE__ */ new Set();
  return e.trim().split(Kl).map((i) => {
    const {
      modifiers: l,
      hasImportantModifier: s,
      baseClassName: d,
      maybePostfixModifierPosition: f
    } = n(i);
    let c = o(f ? d.substring(0, f) : d), v = !!f;
    if (!c) {
      if (!f)
        return {
          isTailwindClass: !1,
          originalClassName: i
        };
      if (c = o(d), !c)
        return {
          isTailwindClass: !1,
          originalClassName: i
        };
      v = !1;
    }
    const p = Ul(l).join(":");
    return {
      isTailwindClass: !0,
      modifierId: s ? p + rr : p,
      classGroupId: c,
      originalClassName: i,
      hasPostfixModifier: v
    };
  }).reverse().filter((i) => {
    if (!i.isTailwindClass)
      return !0;
    const {
      modifierId: l,
      classGroupId: s,
      hasPostfixModifier: d
    } = i, f = l + s;
    return a.has(f) ? !1 : (a.add(f), r(s, d).forEach((c) => a.add(l + c)), !0);
  }).reverse().map((i) => i.originalClassName).join(" ");
}
function ql() {
  let e = 0, t, n, o = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = ar(t)) && (o && (o += " "), o += n);
  return o;
}
function ar(e) {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = ar(e[o])) && (n && (n += " "), n += t);
  return n;
}
function Xl(e, ...t) {
  let n, o, r, a = i;
  function i(s) {
    const d = t.reduce((f, c) => c(f), e());
    return n = Hl(d), o = n.cache.get, r = n.cache.set, a = l, l(s);
  }
  function l(s) {
    const d = o(s);
    if (d)
      return d;
    const f = Gl(s, n);
    return r(s, f), f;
  }
  return function() {
    return a(ql.apply(null, arguments));
  };
}
function J(e) {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}
const ir = /^\[(?:([a-z-]+):)?(.+)\]$/i, Yl = /^\d+\/\d+$/, Jl = /* @__PURE__ */ new Set(["px", "full", "screen"]), Zl = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Ql = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, es = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ts = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
function we(e) {
  return Xe(e) || Jl.has(e) || Yl.test(e);
}
function De(e) {
  return yt(e, "length", us);
}
function Xe(e) {
  return !!e && !Number.isNaN(Number(e));
}
function Mt(e) {
  return yt(e, "number", Xe);
}
function bt(e) {
  return !!e && Number.isInteger(Number(e));
}
function ns(e) {
  return e.endsWith("%") && Xe(e.slice(0, -1));
}
function N(e) {
  return ir.test(e);
}
function je(e) {
  return Zl.test(e);
}
const os = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
function rs(e) {
  return yt(e, os, lr);
}
function as(e) {
  return yt(e, "position", lr);
}
const is = /* @__PURE__ */ new Set(["image", "url"]);
function ls(e) {
  return yt(e, is, ds);
}
function ss(e) {
  return yt(e, "", cs);
}
function wt() {
  return !0;
}
function yt(e, t, n) {
  const o = ir.exec(e);
  return o ? o[1] ? typeof t == "string" ? o[1] === t : t.has(o[1]) : n(o[2]) : !1;
}
function us(e) {
  return Ql.test(e);
}
function lr() {
  return !1;
}
function cs(e) {
  return es.test(e);
}
function ds(e) {
  return ts.test(e);
}
function fs() {
  const e = J("colors"), t = J("spacing"), n = J("blur"), o = J("brightness"), r = J("borderColor"), a = J("borderRadius"), i = J("borderSpacing"), l = J("borderWidth"), s = J("contrast"), d = J("grayscale"), f = J("hueRotate"), c = J("invert"), v = J("gap"), p = J("gradientColorStops"), m = J("gradientColorStopPositions"), h = J("inset"), g = J("margin"), y = J("opacity"), b = J("padding"), w = J("saturate"), x = J("scale"), E = J("sepia"), S = J("skew"), B = J("space"), I = J("translate"), L = () => ["auto", "contain", "none"], _ = () => ["auto", "hidden", "clip", "visible", "scroll"], M = () => ["auto", N, t], A = () => [N, t], H = () => ["", we, De], D = () => ["auto", Xe, N], G = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], q = () => ["solid", "dashed", "dotted", "double", "none"], re = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"], ge = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], _e = () => ["", "0", N], Ne = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], ve = () => [Xe, Mt], Re = () => [Xe, N];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [wt],
      spacing: [we, De],
      blur: ["none", "", je, N],
      brightness: ve(),
      borderColor: [e],
      borderRadius: ["none", "", "full", je, N],
      borderSpacing: A(),
      borderWidth: H(),
      contrast: ve(),
      grayscale: _e(),
      hueRotate: Re(),
      invert: _e(),
      gap: A(),
      gradientColorStops: [e],
      gradientColorStopPositions: [ns, De],
      inset: M(),
      margin: M(),
      opacity: ve(),
      padding: A(),
      saturate: ve(),
      scale: ve(),
      sepia: _e(),
      skew: Re(),
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
        aspect: ["auto", "square", "video", N]
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
        columns: [je]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": Ne()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": Ne()
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
        object: [...G(), N]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: _()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": _()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": _()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: L()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": L()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": L()
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
        z: ["auto", bt, N]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: M()
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
        flex: ["1", "auto", "initial", "none", N]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: _e()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: _e()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", bt, N]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [wt]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", bt, N]
        }, N]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": D()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": D()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [wt]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [bt, N]
        }, N]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": D()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": D()
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
        "auto-cols": ["auto", "min", "max", "fr", N]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", N]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [v]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [v]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [v]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...ge()]
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
        content: ["normal", ...ge(), "baseline"]
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
        "place-content": [...ge(), "baseline"]
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
        m: [g]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [g]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [g]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [g]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [g]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [g]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [g]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [g]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [g]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [B]
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
        "space-y": [B]
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
        w: ["auto", "min", "max", "fit", N, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": ["min", "max", "fit", N, we]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": ["0", "none", "full", "min", "max", "fit", "prose", {
          screen: [je]
        }, je, N]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [N, t, "auto", "min", "max", "fit"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["min", "max", "fit", we, N]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [N, t, "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", je, De]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Mt]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [wt]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", N]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Xe, Mt]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", we, N]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", N]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", N]
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
        "placeholder-opacity": [y]
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
        "text-opacity": [y]
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
        decoration: [...q(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", we, De]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", we, N]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", N]
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
        content: ["none", N]
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
        "bg-opacity": [y]
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
        bg: [...G(), as]
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
        bg: ["auto", "cover", "contain", rs]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, ls]
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
        from: [m]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [m]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [m]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [p]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [p]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [p]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [a]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [a]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [a]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [a]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [a]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [a]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [a]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [a]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [a]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [a]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [a]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [a]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [a]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [a]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [a]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [l]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [l]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [l]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [l]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [l]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [l]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [l]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [l]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [l]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [y]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...q(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [l]
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
        "divide-y": [l]
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
        "divide-opacity": [y]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: q()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [r]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [r]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [r]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [r]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [r]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [r]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [r]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [r]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...q()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [we, N]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [we, De]
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
        ring: H()
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
        "ring-opacity": [y]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [we, De]
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
        shadow: ["", "inner", "none", je, ss]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [wt]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [y]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": re()
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": re()
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
        contrast: [s]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", je, N]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [d]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [f]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [c]
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
        sepia: [E]
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
        "backdrop-contrast": [s]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [d]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [f]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [c]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [y]
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
        "backdrop-sepia": [E]
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
        "border-spacing": [i]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [i]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [i]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", N]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: Re()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", N]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: Re()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", N]
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
        rotate: [bt, N]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [I]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [I]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [S]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [S]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", N]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", N]
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
        "will-change": ["auto", "scroll", "contents", "transform", N]
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
        stroke: [we, De, Mt]
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
const ps = /* @__PURE__ */ Xl(fs);
function Z(...e) {
  return ps(nr(e));
}
const vs = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, ms = {}, hs = {
  class: "animate-spin",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  height: "16",
  viewBox: "0 0 24 24"
}, gs = /* @__PURE__ */ Ae("circle", {
  class: "opacity-25",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1), ys = /* @__PURE__ */ Ae("path", {
  class: "opacity-75",
  fill: "currentColor",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
}, null, -1), bs = [
  gs,
  ys
];
function ws(e, t) {
  return C(), X("svg", hs, bs);
}
const xs = /* @__PURE__ */ vs(ms, [["render", ws]]), _s = {
  key: 0,
  class: "absolute inset-0 grid place-items-center"
}, Cs = /* @__PURE__ */ P({
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
    return (t, n) => (C(), T(u(U), {
      as: t.as,
      "as-child": t.asChild,
      class: Se([
        u(Z)(u(Il)({ variant: t.variant, size: t.size }), t.$attrs.class ?? ""),
        t.loading && "disabled:text-transparent"
      ]),
      disabled: t.loading || t.disabled
    }, {
      default: O(() => [
        t.loading ? (C(), X("div", _s, [
          j(xs, { class: "h-5 text-white" })
        ])) : ee("", !0),
        V(t.$slots, "default", {}, () => [
          Ce(Oe(t.label), 1)
        ])
      ]),
      _: 3
    }, 8, ["as", "as-child", "class", "disabled"]));
  }
}), sr = Symbol(), ur = Symbol(), cr = Symbol(), Os = ["id", "name"], ec = /* @__PURE__ */ P({
  inheritAttrs: !1,
  __name: "Input",
  props: {
    id: {},
    name: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    var c;
    const n = e, o = t, r = st(ur, n.id), a = st(sr, null), i = st(cr), l = n.name ?? ((c = a == null ? void 0 : a.name) == null ? void 0 : c.value) ?? "", s = F({
      get: () => {
        var v;
        return n.modelValue ?? ((v = a == null ? void 0 : a.value) == null ? void 0 : v.value) ?? "";
      },
      set: (v) => {
        a != null && a.value ? a.value.value = v : o("update:modelValue", v);
      }
    }), { class: d, ...f } = Ir();
    return (v, p) => xn((C(), X("input", R({
      "onUpdate:modelValue": p[0] || (p[0] = (m) => s.value = m),
      id: u(r),
      name: u(l),
      class: u(Z)(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        u(i) && "ring-destructive ring-2 placeholder:text-destructive",
        u(d) ?? ""
      )
    }, f), null, 16, Os)), [
      [Nr, s.value]
    ]);
  }
});
function dr(e, t) {
  return C(), X("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    Ae("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z",
      fill: "currentColor"
    })
  ]);
}
function Ss(e, t) {
  return C(), X("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    Ae("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
      fill: "currentColor"
    })
  ]);
}
function Es(e, t) {
  return C(), X("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    Ae("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
      fill: "currentColor"
    })
  ]);
}
const tc = /* @__PURE__ */ P({
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
    const n = e, o = t, r = Vt(n, o), a = F({
      get() {
        return n.modelValue === n.trueValue;
      },
      set(i) {
        i ? o("update:modelValue", n.trueValue) : o("update:modelValue", n.falseValue);
      }
    });
    return (i, l) => (C(), T(u(Bi), R(u(r), {
      checked: a.value,
      "onUpdate:checked": l[0] || (l[0] = (s) => a.value = s),
      class: u(Z)(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        i.$attrs.class ?? ""
      )
    }), {
      default: O(() => [
        j(u(Ti), { class: "flex h-full w-full items-center justify-center text-current" }, {
          default: O(() => [
            j(u(dr), { class: "h-4 w-4" })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16, ["checked", "class"]));
  }
}), As = /* @__PURE__ */ P({
  __name: "Label",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (C(), T(u(qi), R(t, {
      class: u(Z)(
        "w-label text-sm font-medium tracking-tight text-foreground flex items-center gap-2",
        t.class
      )
    }), {
      default: O(() => [
        V(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), ks = /* @__PURE__ */ P({
  __name: "SelectValue",
  props: {
    placeholder: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (C(), T(u(kl), Be(We(t)), {
      default: O(() => [
        V(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Ps = /* @__PURE__ */ P({
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
    return (n, o) => (C(), T(u(ul), R(t, {
      class: [
        u(Z)(
          "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          t.class
        ),
        t.invalid ? "!ring-destructive ring-2 placeholder:!text-destructive" : ""
      ]
    }), {
      default: O(() => [
        V(n.$slots, "default"),
        j(u(Pl), { "as-child": "" }, {
          default: O(() => [
            j(u(Ss), { class: "w-4 h-4 opacity-50" })
          ]),
          _: 1
        })
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Vs = /* @__PURE__ */ P({
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
    const n = e, r = Vt(n, t);
    return (a, i) => (C(), T(u(cl), null, {
      default: O(() => [
        j(u(yl), R({ ...u(r), ...a.$attrs }, {
          class: u(Z)(
            "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            a.position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            n.class
          )
        }), {
          default: O(() => [
            j(u(Al), {
              class: Se(
                u(Z)(
                  "p-0",
                  a.position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
                )
              )
            }, {
              default: O(() => [
                V(a.$slots, "default")
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
}), Bs = /* @__PURE__ */ P({
  __name: "SelectGroup",
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (C(), T(u(Ol), R({
      class: u(Z)("p-1 w-full", t.class)
    }, t), {
      default: O(() => [
        V(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Ts = { class: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, ao = /* @__PURE__ */ P({
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
    return (n, o) => (C(), T(u(wl), R(t, {
      class: u(Z)(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        t.class
      )
    }), {
      default: O(() => [
        Ae("span", Ts, [
          j(u(xl), null, {
            default: O(() => [
              j(u(dr), { class: "h-4 w-4" })
            ]),
            _: 1
          })
        ]),
        j(u(El), null, {
          default: O(() => [
            V(n.$slots, "default")
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), $s = /* @__PURE__ */ P({
  __name: "SelectLabel",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (C(), T(u(Sl), {
      class: Se(u(Z)("py-1.5 pl-8 pr-2 text-sm font-semibold", t.class))
    }, {
      default: O(() => [
        V(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), nc = /* @__PURE__ */ P({
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
    const r = Vt(e, t);
    return (a, i) => (C(), T(u(il), Be(We(u(r))), {
      default: O(() => [
        j(u(Ps), { disabled: a.disabled }, {
          default: O(() => [
            j(u(ks), { placeholder: a.placeholder }, null, 8, ["placeholder"])
          ]),
          _: 1
        }, 8, ["disabled"]),
        j(u(Vs), null, {
          default: O(() => [
            (C(!0), X(xe, null, tn(a.options, (l, s) => (C(), X(xe, null, [
              "options" in l ? (C(), T(u(Bs), {
                key: `group-${s}`
              }, {
                default: O(() => [
                  j(u($s), null, {
                    default: O(() => [
                      Ce(Oe(l.label), 1)
                    ]),
                    _: 2
                  }, 1024),
                  (C(!0), X(xe, null, tn(l.options, (d) => (C(), T(u(ao), {
                    key: d.value,
                    value: d.value
                  }, {
                    default: O(() => [
                      Ce(Oe(d.label), 1)
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 2
              }, 1024)) : (C(), T(u(ao), {
                value: l.value,
                key: l.value
              }, {
                default: O(() => [
                  Ce(Oe(l.label), 1)
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
const Fs = (e) => typeof e < "u";
function Ms(e) {
  return JSON.parse(JSON.stringify(e));
}
function fr(e, t, n, o = {}) {
  var r, a, i;
  const {
    clone: l = !1,
    passive: s = !1,
    eventName: d,
    deep: f = !1,
    defaultValue: c,
    shouldEmit: v
  } = o, p = ue(), m = n || (p == null ? void 0 : p.emit) || ((r = p == null ? void 0 : p.$emit) == null ? void 0 : r.bind(p)) || ((i = (a = p == null ? void 0 : p.proxy) == null ? void 0 : a.$emit) == null ? void 0 : i.bind(p == null ? void 0 : p.proxy));
  let h = d;
  t || (t = "modelValue"), h = h || `update:${t.toString()}`;
  const g = (w) => l ? typeof l == "function" ? l(w) : Ms(w) : w, y = () => Fs(e[t]) ? g(e[t]) : c, b = (w) => {
    v ? v(w) && m(h, w) : m(h, w);
  };
  if (s) {
    const w = y(), x = k(w);
    let E = !1;
    return K(
      () => e[t],
      (S) => {
        E || (E = !0, x.value = g(S), se(() => E = !1));
      }
    ), K(
      x,
      (S) => {
        !E && (S !== e[t] || f) && b(S);
      },
      { deep: f }
    ), x;
  } else
    return F({
      get() {
        return y();
      },
      set(w) {
        b(w);
      }
    });
}
const oc = /* @__PURE__ */ P({
  __name: "Textarea",
  props: {
    defaultValue: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, r = fr(n, "modelValue", t, {
      passive: !0,
      defaultValue: n.defaultValue
    });
    return (a, i) => xn((C(), X("textarea", {
      "onUpdate:modelValue": i[0] || (i[0] = (l) => Et(r) ? r.value = l : null),
      class: Se(
        u(Z)(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          a.$attrs.class ?? ""
        )
      )
    }, null, 2)), [
      [Rr, u(r)]
    ]);
  }
}), rc = /* @__PURE__ */ P({
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
    return (n, o) => (C(), T(u(Qi), R({
      class: u(Z)(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        t.class
      )
    }, t), {
      default: O(() => [
        j(u(el), {
          class: Se(
            u(Z)(
              "h-full w-full flex-1 bg-primary transition-all",
              t.class
            )
          ),
          style: tt(`transform: translateX(-${100 - (t.modelValue ?? 0)}%);`)
        }, null, 8, ["class", "style"])
      ]),
      _: 1
    }, 16, ["class"]));
  }
}), ac = /* @__PURE__ */ P({
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
    const n = e, r = Vt(n, t);
    return (a, i) => (C(), T(u($l), R(u(r), {
      class: u(Z)(
        "peer inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        n.class
      )
    }), {
      default: O(() => [
        j(u(Fl), {
          class: Se(
            u(Z)(
              "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
            )
          )
        }, null, 8, ["class"])
      ]),
      _: 1
    }, 16, ["class"]));
  }
});
function Is() {
  return pr().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function pr() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const Ns = typeof Proxy == "function", Rs = "devtools-plugin:setup", Ds = "plugin:settings:set";
let at, cn;
function js() {
  var e;
  return at !== void 0 || (typeof window < "u" && window.performance ? (at = !0, cn = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (at = !0, cn = global.perf_hooks.performance) : at = !1), at;
}
function Ls() {
  return js() ? cn.now() : Date.now();
}
class zs {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const o = {};
    if (t.settings)
      for (const i in t.settings) {
        const l = t.settings[i];
        o[i] = l.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${t.id}`;
    let a = Object.assign({}, o);
    try {
      const i = localStorage.getItem(r), l = JSON.parse(i);
      Object.assign(a, l);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return a;
      },
      setSettings(i) {
        try {
          localStorage.setItem(r, JSON.stringify(i));
        } catch {
        }
        a = i;
      },
      now() {
        return Ls();
      }
    }, n && n.on(Ds, (i, l) => {
      i === this.plugin.id && this.fallbacks.setSettings(l);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, l) => this.target ? this.target.on[l] : (...s) => {
        this.onQueue.push({
          method: l,
          args: s
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, l) => this.target ? this.target[l] : l === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(l) ? (...s) => (this.targetQueue.push({
        method: l,
        args: s,
        resolve: () => {
        }
      }), this.fallbacks[l](...s)) : (...s) => new Promise((d) => {
        this.targetQueue.push({
          method: l,
          args: s,
          resolve: d
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function Ws(e, t) {
  const n = e, o = pr(), r = Is(), a = Ns && n.enableEarlyProxy;
  if (r && (o.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    r.emit(Rs, e, t);
  else {
    const i = a ? new zs(n, r) : null;
    (o.__VUE_DEVTOOLS_PLUGINS__ = o.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: i
    }), i && t(i.proxiedTarget);
  }
}
/**
  * vee-validate v4.12.3
  * (c) 2023 Abdelrahman Awad
  * @license MIT
  */
function et(e) {
  return typeof e == "function";
}
function Us(e) {
  return e == null;
}
const pt = (e) => e !== null && !!e && typeof e == "object" && !Array.isArray(e);
function vr(e) {
  return Number(e) >= 0;
}
function Hs(e) {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}
function Ks(e) {
  const t = e.split(".");
  if (!t.length)
    return "";
  let n = String(t[0]);
  for (let o = 1; o < t.length; o++) {
    if (vr(t[o])) {
      n += `[${t[o]}]`;
      continue;
    }
    n += `.${t[o]}`;
  }
  return n;
}
const Gs = {};
function qs(e) {
  return Gs[e];
}
function io(e, t, n) {
  typeof n.value == "object" && (n.value = Ye(n.value)), !n.enumerable || n.get || n.set || !n.configurable || !n.writable || t === "__proto__" ? Object.defineProperty(e, t, n) : e[t] = n.value;
}
function Ye(e) {
  if (typeof e != "object")
    return e;
  var t = 0, n, o, r, a = Object.prototype.toString.call(e);
  if (a === "[object Object]" ? r = Object.create(e.__proto__ || null) : a === "[object Array]" ? r = Array(e.length) : a === "[object Set]" ? (r = /* @__PURE__ */ new Set(), e.forEach(function(i) {
    r.add(Ye(i));
  })) : a === "[object Map]" ? (r = /* @__PURE__ */ new Map(), e.forEach(function(i, l) {
    r.set(Ye(l), Ye(i));
  })) : a === "[object Date]" ? r = /* @__PURE__ */ new Date(+e) : a === "[object RegExp]" ? r = new RegExp(e.source, e.flags) : a === "[object DataView]" ? r = new e.constructor(Ye(e.buffer)) : a === "[object ArrayBuffer]" ? r = e.slice(0) : a.slice(-6) === "Array]" && (r = new e.constructor(e)), r) {
    for (o = Object.getOwnPropertySymbols(e); t < o.length; t++)
      io(r, o[t], Object.getOwnPropertyDescriptor(e, o[t]));
    for (t = 0, o = Object.getOwnPropertyNames(e); t < o.length; t++)
      Object.hasOwnProperty.call(r, n = o[t]) && r[n] === e[n] || io(r, n, Object.getOwnPropertyDescriptor(e, n));
  }
  return r || e;
}
const Rn = Symbol("vee-validate-form"), Xs = Symbol("vee-validate-field-instance"), lo = Symbol("Default empty value"), Ys = typeof window < "u";
function dn(e) {
  return et(e) && !!e.__locatorRef;
}
function xt(e) {
  return !!e && et(e.parse) && e.__type === "VVTypedSchema";
}
function fn(e) {
  return !!e && et(e.validate);
}
function mr(e) {
  return e === "checkbox" || e === "radio";
}
function Js(e) {
  return pt(e) || Array.isArray(e);
}
function Dn(e) {
  return /^\[.+\]$/i.test(e);
}
function Zs(e) {
  return hr(e) && e.multiple;
}
function hr(e) {
  return e.tagName === "SELECT";
}
function Qs(e) {
  return e ? !!(typeof Event < "u" && et(Event) && e instanceof Event || e && e.srcElement) : !1;
}
function fe(e, t) {
  if (e === t)
    return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor)
      return !1;
    var n, o, r;
    if (Array.isArray(e)) {
      if (n = e.length, n != t.length)
        return !1;
      for (o = n; o-- !== 0; )
        if (!fe(e[o], t[o]))
          return !1;
      return !0;
    }
    if (e instanceof Map && t instanceof Map) {
      if (e.size !== t.size)
        return !1;
      for (o of e.entries())
        if (!t.has(o[0]))
          return !1;
      for (o of e.entries())
        if (!fe(o[1], t.get(o[0])))
          return !1;
      return !0;
    }
    if (so(e) && so(t))
      return !(e.size !== t.size || e.name !== t.name || e.lastModified !== t.lastModified || e.type !== t.type);
    if (e instanceof Set && t instanceof Set) {
      if (e.size !== t.size)
        return !1;
      for (o of e.entries())
        if (!t.has(o[0]))
          return !1;
      return !0;
    }
    if (ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
      if (n = e.length, n != t.length)
        return !1;
      for (o = n; o-- !== 0; )
        if (e[o] !== t[o])
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === t.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === t.toString();
    for (r = Object.keys(e), n = r.length, o = n; o-- !== 0; ) {
      var a = r[o];
      if (!fe(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function so(e) {
  return Ys ? e instanceof File : !1;
}
function gr(e) {
  return Dn(e) ? e.replace(/\[|\]/gi, "") : e;
}
function vt(e, t, n) {
  return e ? Dn(t) ? e[gr(t)] : (t || "").split(/\.|\[(\d+)\]/).filter(Boolean).reduce((r, a) => Js(r) && a in r ? r[a] : n, e) : n;
}
function eu(e, t, n) {
  if (Dn(t)) {
    e[gr(t)] = n;
    return;
  }
  const o = t.split(/\.|\[(\d+)\]/).filter(Boolean);
  let r = e;
  for (let a = 0; a < o.length; a++) {
    if (a === o.length - 1) {
      r[o[a]] = n;
      return;
    }
    (!(o[a] in r) || Us(r[o[a]])) && (r[o[a]] = vr(o[a + 1]) ? [] : {}), r = r[o[a]];
  }
}
function yr(e) {
  return Object.keys(e);
}
function jn(e, t = void 0) {
  const n = ue();
  return (n == null ? void 0 : n.provides[e]) || st(e, t);
}
function tu(e) {
  Dr(`[vee-validate]: ${e}`);
}
function uo(e, t, n) {
  if (Array.isArray(e)) {
    const o = [...e], r = o.findIndex((a) => fe(a, t));
    return r >= 0 ? o.splice(r, 1) : o.push(t), o;
  }
  return fe(e, t) ? n : t;
}
function nu(e, t) {
  let n, o;
  return function(...r) {
    const a = this;
    return n || (n = !0, setTimeout(() => n = !1, t), o = e.apply(a, r)), o;
  };
}
function ou(e, t) {
  return pt(t) && t.number ? Hs(e) : e;
}
function co(e, t) {
  let n;
  return async function(...r) {
    const a = e(...r);
    n = a;
    const i = await a;
    return a !== n ? i : (n = void 0, t(i, r));
  };
}
function ru(e) {
  return Array.isArray(e) ? e : e ? [e] : [];
}
function en(e) {
  if (br(e))
    return e._value;
}
function br(e) {
  return "_value" in e;
}
function au(e) {
  return e.type === "number" || e.type === "range" ? Number.isNaN(e.valueAsNumber) ? e.value : e.valueAsNumber : e.value;
}
function wr(e) {
  if (!Qs(e))
    return e;
  const t = e.target;
  if (mr(t.type) && br(t))
    return en(t);
  if (t.type === "file" && t.files) {
    const n = Array.from(t.files);
    return t.multiple ? n : n[0];
  }
  if (Zs(t))
    return Array.from(t.options).filter((n) => n.selected && !n.disabled).map(en);
  if (hr(t)) {
    const n = Array.from(t.options).find((o) => o.selected);
    return n ? en(n) : t.value;
  }
  return au(t);
}
function xr(e) {
  const t = {};
  return Object.defineProperty(t, "_$$isNormalized", {
    value: !0,
    writable: !1,
    enumerable: !1,
    configurable: !1
  }), e ? pt(e) && e._$$isNormalized ? e : pt(e) ? Object.keys(e).reduce((n, o) => {
    const r = iu(e[o]);
    return e[o] !== !1 && (n[o] = fo(r)), n;
  }, t) : typeof e != "string" ? t : e.split("|").reduce((n, o) => {
    const r = lu(o);
    return r.name && (n[r.name] = fo(r.params)), n;
  }, t) : t;
}
function iu(e) {
  return e === !0 ? [] : Array.isArray(e) || pt(e) ? e : [e];
}
function fo(e) {
  const t = (n) => typeof n == "string" && n[0] === "@" ? su(n.slice(1)) : n;
  return Array.isArray(e) ? e.map(t) : e instanceof RegExp ? [e] : Object.keys(e).reduce((n, o) => (n[o] = t(e[o]), n), {});
}
const lu = (e) => {
  let t = [];
  const n = e.split(":")[0];
  return e.includes(":") && (t = e.split(":").slice(1).join(":").split(",")), { name: n, params: t };
};
function su(e) {
  const t = (n) => vt(n, e) || n[e];
  return t.__locatorRef = e, t;
}
function uu(e) {
  return Array.isArray(e) ? e.filter(dn) : yr(e).filter((t) => dn(e[t])).map((t) => e[t]);
}
const cu = {
  generateMessage: ({ field: e }) => `${e} is not valid.`,
  bails: !0,
  validateOnBlur: !0,
  validateOnChange: !0,
  validateOnInput: !1,
  validateOnModelUpdate: !0
};
let du = Object.assign({}, cu);
const fu = () => du;
async function pu(e, t, n = {}) {
  const o = n == null ? void 0 : n.bails, r = {
    name: (n == null ? void 0 : n.name) || "{field}",
    rules: t,
    label: n == null ? void 0 : n.label,
    bails: o ?? !0,
    formData: (n == null ? void 0 : n.values) || {}
  }, i = (await vu(r, e)).errors;
  return {
    errors: i,
    valid: !i.length
  };
}
async function vu(e, t) {
  if (xt(e.rules) || fn(e.rules))
    return gu(t, e.rules);
  if (et(e.rules) || Array.isArray(e.rules)) {
    const i = {
      field: e.label || e.name,
      name: e.name,
      label: e.label,
      form: e.formData,
      value: t
    }, l = Array.isArray(e.rules) ? e.rules : [e.rules], s = l.length, d = [];
    for (let f = 0; f < s; f++) {
      const c = l[f], v = await c(t, i);
      if (!(typeof v != "string" && !Array.isArray(v) && v)) {
        if (Array.isArray(v))
          d.push(...v);
        else {
          const m = typeof v == "string" ? v : _r(i);
          d.push(m);
        }
        if (e.bails)
          return {
            errors: d
          };
      }
    }
    return {
      errors: d
    };
  }
  const n = Object.assign(Object.assign({}, e), { rules: xr(e.rules) }), o = [], r = Object.keys(n.rules), a = r.length;
  for (let i = 0; i < a; i++) {
    const l = r[i], s = await yu(n, t, {
      name: l,
      params: n.rules[l]
    });
    if (s.error && (o.push(s.error), e.bails))
      return {
        errors: o
      };
  }
  return {
    errors: o
  };
}
function mu(e) {
  return !!e && e.name === "ValidationError";
}
function hu(e) {
  return {
    __type: "VVTypedSchema",
    async parse(n) {
      var o;
      try {
        return {
          output: await e.validate(n, { abortEarly: !1 }),
          errors: []
        };
      } catch (r) {
        if (!mu(r))
          throw r;
        if (!(!((o = r.inner) === null || o === void 0) && o.length) && r.errors.length)
          return { errors: [{ path: r.path, errors: r.errors }] };
        const a = r.inner.reduce((i, l) => {
          const s = l.path || "";
          return i[s] || (i[s] = { errors: [], path: s }), i[s].errors.push(...l.errors), i;
        }, {});
        return { errors: Object.values(a) };
      }
    }
  };
}
async function gu(e, t) {
  const o = await (xt(t) ? t : hu(t)).parse(e), r = [];
  for (const a of o.errors)
    a.errors.length && r.push(...a.errors);
  return {
    errors: r
  };
}
async function yu(e, t, n) {
  const o = qs(n.name);
  if (!o)
    throw new Error(`No such validator '${n.name}' exists.`);
  const r = bu(n.params, e.formData), a = {
    field: e.label || e.name,
    name: e.name,
    label: e.label,
    value: t,
    form: e.formData,
    rule: Object.assign(Object.assign({}, n), { params: r })
  }, i = await o(t, r, a);
  return typeof i == "string" ? {
    error: i
  } : {
    error: i ? void 0 : _r(a)
  };
}
function _r(e) {
  const t = fu().generateMessage;
  return t ? t(e) : "Field is invalid";
}
function bu(e, t) {
  const n = (o) => dn(o) ? o(t) : o;
  return Array.isArray(e) ? e.map(n) : Object.keys(e).reduce((o, r) => (o[r] = n(e[r]), o), {});
}
let po = 0;
function wu(e, t) {
  const { value: n, initialValue: o, setInitialValue: r } = xu(e, t.modelValue, t.form);
  if (!t.form) {
    let v = function(p) {
      var m;
      "value" in p && (n.value = p.value), "errors" in p && d(p.errors), "touched" in p && (c.touched = (m = p.touched) !== null && m !== void 0 ? m : c.touched), "initialValue" in p && r(p.initialValue);
    };
    const { errors: s, setErrors: d } = Ou(), f = po >= Number.MAX_SAFE_INTEGER ? 0 : ++po, c = Cu(n, o, s, t.schema);
    return {
      id: f,
      path: e,
      value: n,
      initialValue: o,
      meta: c,
      flags: { pendingUnmount: { [f]: !1 }, pendingReset: !1 },
      errors: s,
      setState: v
    };
  }
  const a = t.form.createPathState(e, {
    bails: t.bails,
    label: t.label,
    type: t.type,
    validate: t.validate,
    schema: t.schema
  }), i = F(() => a.errors);
  function l(s) {
    var d, f, c;
    "value" in s && (n.value = s.value), "errors" in s && ((d = t.form) === null || d === void 0 || d.setFieldError(u(e), s.errors)), "touched" in s && ((f = t.form) === null || f === void 0 || f.setFieldTouched(u(e), (c = s.touched) !== null && c !== void 0 ? c : !1)), "initialValue" in s && r(s.initialValue);
  }
  return {
    id: Array.isArray(a.id) ? a.id[a.id.length - 1] : a.id,
    path: e,
    value: n,
    errors: i,
    meta: a,
    initialValue: o,
    flags: a.__flags,
    setState: l
  };
}
function xu(e, t, n) {
  const o = k(u(t));
  function r() {
    return n ? vt(n.initialValues.value, u(e), u(o)) : u(o);
  }
  function a(d) {
    if (!n) {
      o.value = d;
      return;
    }
    n.setFieldInitialValue(u(e), d, !0);
  }
  const i = F(r);
  if (!n)
    return {
      value: k(r()),
      initialValue: i,
      setInitialValue: a
    };
  const l = _u(t, n, i, e);
  return n.stageInitialValue(u(e), l, !0), {
    value: F({
      get() {
        return vt(n.values, u(e));
      },
      set(d) {
        n.setFieldValue(u(e), d, !1);
      }
    }),
    initialValue: i,
    setInitialValue: a
  };
}
function _u(e, t, n, o) {
  return Et(e) ? u(e) : e !== void 0 ? e : vt(t.values, u(o), u(n));
}
function Cu(e, t, n, o) {
  var r, a;
  const i = (a = (r = o == null ? void 0 : o.describe) === null || r === void 0 ? void 0 : r.call(o).required) !== null && a !== void 0 ? a : !1, l = hn({
    touched: !1,
    pending: !1,
    valid: !0,
    required: i,
    validated: !!u(n).length,
    initialValue: F(() => u(t)),
    dirty: F(() => !fe(u(e), u(t)))
  });
  return K(n, (s) => {
    l.valid = !s.length;
  }, {
    immediate: !0,
    flush: "sync"
  }), l;
}
function Ou() {
  const e = k([]);
  return {
    errors: e,
    setErrors: (t) => {
      e.value = ru(t);
    }
  };
}
function Su(e) {
  process.env.NODE_ENV !== "production" && Ws({
    id: "vee-validate-devtools-plugin",
    label: "VeeValidate Plugin",
    packageName: "vee-validate",
    homepage: "https://vee-validate.logaretm.com/v4",
    app: e,
    logo: "https://vee-validate.logaretm.com/v4/logo.png"
  }, Au);
}
const Cr = {}, _t = {};
let ze;
const pn = nu(() => {
  setTimeout(async () => {
    await se(), ze == null || ze.sendInspectorState(it), ze == null || ze.sendInspectorTree(it);
  }, 100);
}, 100);
function Eu(e) {
  const t = ue();
  if (!ze) {
    const n = t == null ? void 0 : t.appContext.app;
    if (!n)
      return;
    Su(n);
  }
  _t[e.id] = Object.assign({}, e), _t[e.id]._vm = t, Dt(() => {
    delete _t[e.id], pn();
  }), pn();
}
const it = "vee-validate-inspector", le = {
  error: 12405579,
  success: 448379,
  unknown: 5522283,
  white: 16777215,
  black: 0,
  blue: 218007,
  purple: 12157168,
  orange: 16099682,
  gray: 12304330
};
let Q = null;
function Au(e) {
  ze = e, e.addInspector({
    id: it,
    icon: "rule",
    label: "vee-validate",
    noSelectionText: "Select a vee-validate node to inspect",
    actions: [
      {
        icon: "done_outline",
        tooltip: "Validate selected item",
        action: async () => {
          if (!Q) {
            console.error("There is not a valid selected vee-validate node or component");
            return;
          }
          if (Q.type === "field") {
            await Q.field.validate();
            return;
          }
          if (Q.type === "form") {
            await Q.form.validate();
            return;
          }
          Q.type === "pathState" && await Q.form.validateField(Q.state.path);
        }
      },
      {
        icon: "delete_sweep",
        tooltip: "Clear validation state of the selected item",
        action: () => {
          if (!Q) {
            console.error("There is not a valid selected vee-validate node or component");
            return;
          }
          if (Q.type === "field") {
            Q.field.resetField();
            return;
          }
          Q.type === "form" && Q.form.resetForm(), Q.type === "pathState" && Q.form.resetField(Q.state.path);
        }
      }
    ]
  }), e.on.getInspectorTree((t) => {
    if (t.inspectorId !== it)
      return;
    const n = Object.values(Cr), o = Object.values(_t);
    t.rootNodes = [
      ...n.map(ku),
      ...o.map((r) => Vu(r))
    ];
  }), e.on.getInspectorState((t, n) => {
    if (t.inspectorId !== it || n.currentTab !== `custom-inspector:${it}`)
      return;
    const { form: o, field: r, state: a, type: i } = Bu(t.nodeId);
    if (o && i === "form") {
      t.state = Tu(o), Q = { type: "form", form: o };
      return;
    }
    if (a && i === "pathState" && o) {
      t.state = vo(a), Q = { type: "pathState", state: a, form: o };
      return;
    }
    if (r && i === "field") {
      t.state = vo({
        errors: r.errors.value,
        dirty: r.meta.dirty,
        valid: r.meta.valid,
        touched: r.meta.touched,
        value: r.value.value,
        initialValue: r.meta.initialValue
      }), Q = { field: r, type: "field" };
      return;
    }
    Q = null;
  });
}
function ku(e) {
  const { textColor: t, bgColor: n } = Sr(e.meta.value.valid), o = {};
  Object.values(e.getAllPathStates()).forEach((i) => {
    eu(o, u(i.path), Pu(i, e));
  });
  function r(i, l = []) {
    const s = [...l].pop();
    return "id" in i ? Object.assign(Object.assign({}, i), { label: s || i.label }) : pt(i) ? {
      id: `${l.join(".")}`,
      label: s || "",
      children: Object.keys(i).map((d) => r(i[d], [...l, d]))
    } : Array.isArray(i) ? {
      id: `${l.join(".")}`,
      label: `${s}[]`,
      children: i.map((d, f) => r(d, [...l, String(f)]))
    } : { id: "", label: "", children: [] };
  }
  const { children: a } = r(o);
  return {
    id: Ln(e),
    label: "Form",
    children: a,
    tags: [
      {
        label: "Form",
        textColor: t,
        backgroundColor: n
      },
      {
        label: `${e.getAllPathStates().length} fields`,
        textColor: le.white,
        backgroundColor: le.unknown
      }
    ]
  };
}
function Pu(e, t) {
  return {
    id: Ln(t, e),
    label: u(e.path),
    tags: Or(e.multiple, e.fieldsCount, e.type, e.valid, t)
  };
}
function Vu(e, t) {
  return {
    id: Ln(t, e),
    label: u(e.name),
    tags: Or(!1, 1, e.type, e.meta.valid, t)
  };
}
function Or(e, t, n, o, r) {
  const { textColor: a, bgColor: i } = Sr(o);
  return [
    e ? void 0 : {
      label: "Field",
      textColor: a,
      backgroundColor: i
    },
    r ? void 0 : {
      label: "Standalone",
      textColor: le.black,
      backgroundColor: le.gray
    },
    n === "checkbox" ? {
      label: "Checkbox",
      textColor: le.white,
      backgroundColor: le.blue
    } : void 0,
    n === "radio" ? {
      label: "Radio",
      textColor: le.white,
      backgroundColor: le.purple
    } : void 0,
    e ? {
      label: "Multiple",
      textColor: le.black,
      backgroundColor: le.orange
    } : void 0
  ].filter(Boolean);
}
function Ln(e, t) {
  const n = t ? "path" in t ? "pathState" : "field" : "form", o = t ? "path" in t ? t == null ? void 0 : t.path : u(t == null ? void 0 : t.name) : "", r = { f: e == null ? void 0 : e.formId, ff: o, type: n };
  return btoa(encodeURIComponent(JSON.stringify(r)));
}
function Bu(e) {
  try {
    const t = JSON.parse(decodeURIComponent(atob(e))), n = Cr[t.f];
    if (!n && t.ff) {
      const r = _t[t.ff];
      return r ? {
        type: t.type,
        field: r
      } : {};
    }
    if (!n)
      return {};
    const o = n.getPathState(t.ff);
    return {
      type: t.type,
      form: n,
      state: o
    };
  } catch {
  }
  return {};
}
function vo(e) {
  return {
    "Field state": [
      { key: "errors", value: e.errors },
      {
        key: "initialValue",
        value: e.initialValue
      },
      {
        key: "currentValue",
        value: e.value
      },
      {
        key: "touched",
        value: e.touched
      },
      {
        key: "dirty",
        value: e.dirty
      },
      {
        key: "valid",
        value: e.valid
      }
    ]
  };
}
function Tu(e) {
  const { errorBag: t, meta: n, values: o, isSubmitting: r, isValidating: a, submitCount: i } = e;
  return {
    "Form state": [
      {
        key: "submitCount",
        value: i.value
      },
      {
        key: "isSubmitting",
        value: r.value
      },
      {
        key: "isValidating",
        value: a.value
      },
      {
        key: "touched",
        value: n.value.touched
      },
      {
        key: "dirty",
        value: n.value.dirty
      },
      {
        key: "valid",
        value: n.value.valid
      },
      {
        key: "initialValues",
        value: n.value.initialValues
      },
      {
        key: "currentValues",
        value: o
      },
      {
        key: "errors",
        value: yr(t.value).reduce((l, s) => {
          var d;
          const f = (d = t.value[s]) === null || d === void 0 ? void 0 : d[0];
          return f && (l[s] = f), l;
        }, {})
      }
    ]
  };
}
function Sr(e) {
  return {
    bgColor: e ? le.success : le.error,
    textColor: e ? le.black : le.white
  };
}
function $u(e, t, n) {
  return mr(n == null ? void 0 : n.type) ? Mu(e, t, n) : Er(e, t, n);
}
function Er(e, t, n) {
  const { initialValue: o, validateOnMount: r, bails: a, type: i, checkedValue: l, label: s, validateOnValueUpdate: d, uncheckedValue: f, controlled: c, keepValueOnUnmount: v, syncVModel: p, form: m } = Fu(n), h = c ? jn(Rn) : void 0, g = m || h, y = F(() => Ks(ae(e))), b = F(() => {
    if (ae(g == null ? void 0 : g.schema))
      return;
    const W = u(t);
    return fn(W) || xt(W) || et(W) || Array.isArray(W) ? W : xr(W);
  }), { id: w, value: x, initialValue: E, meta: S, setState: B, errors: I, flags: L } = wu(y, {
    modelValue: o,
    form: g,
    bails: a,
    label: s,
    type: i,
    validate: b.value ? G : void 0,
    schema: xt(t) ? t : void 0
  }), _ = F(() => I.value[0]);
  p && Iu({
    value: x,
    prop: p,
    handleChange: q,
    shouldValidate: () => d && !L.pendingReset
  });
  const M = ($, W = !1) => {
    S.touched = !0, W && H();
  };
  async function A($) {
    var W, Y;
    if (g != null && g.validateSchema) {
      const { results: z } = await g.validateSchema($);
      return (W = z[ae(y)]) !== null && W !== void 0 ? W : { valid: !0, errors: [] };
    }
    return b.value ? pu(x.value, b.value, {
      name: ae(y),
      label: ae(s),
      values: (Y = g == null ? void 0 : g.values) !== null && Y !== void 0 ? Y : {},
      bails: a
    }) : { valid: !0, errors: [] };
  }
  const H = co(async () => (S.pending = !0, S.validated = !0, A("validated-only")), ($) => (L.pendingUnmount[oe.id] || (B({ errors: $.errors }), S.pending = !1, S.valid = $.valid), $)), D = co(async () => A("silent"), ($) => (S.valid = $.valid, $));
  function G($) {
    return ($ == null ? void 0 : $.mode) === "silent" ? D() : H();
  }
  function q($, W = !0) {
    const Y = wr($);
    Ne(Y, W);
  }
  pe(() => {
    if (r)
      return H();
    (!g || !g.validateSchema) && D();
  });
  function re($) {
    S.touched = $;
  }
  function ge($) {
    var W;
    const Y = $ && "value" in $ ? $.value : E.value;
    B({
      value: Ye(Y),
      initialValue: Ye(Y),
      touched: (W = $ == null ? void 0 : $.touched) !== null && W !== void 0 ? W : !1,
      errors: ($ == null ? void 0 : $.errors) || []
    }), S.pending = !1, S.validated = !1, D();
  }
  const _e = ue();
  function Ne($, W = !0) {
    x.value = _e && p ? ou($, _e.props.modelModifiers) : $, (W ? H : D)();
  }
  function ve($) {
    B({ errors: Array.isArray($) ? $ : [$] });
  }
  const Re = F({
    get() {
      return x.value;
    },
    set($) {
      Ne($, d);
    }
  }), oe = {
    id: w,
    name: y,
    label: s,
    value: Re,
    meta: S,
    errors: I,
    errorMessage: _,
    type: i,
    checkedValue: l,
    uncheckedValue: f,
    bails: a,
    keepValueOnUnmount: v,
    resetField: ge,
    handleReset: () => ge(),
    validate: G,
    handleChange: q,
    handleBlur: M,
    setState: B,
    setTouched: re,
    setErrors: ve,
    setValue: Ne
  };
  if (ut(Xs, oe), Et(t) && typeof u(t) != "function" && K(t, ($, W) => {
    fe($, W) || (S.validated ? H() : D());
  }, {
    deep: !0
  }), process.env.NODE_ENV !== "production" && (oe._vm = ue(), K(() => Object.assign(Object.assign({ errors: I.value }, S), { value: x.value }), pn, {
    deep: !0
  }), g || Eu(oe)), !g)
    return oe;
  const Kt = F(() => {
    const $ = b.value;
    return !$ || et($) || fn($) || xt($) || Array.isArray($) ? {} : Object.keys($).reduce((W, Y) => {
      const z = uu($[Y]).map((ye) => ye.__locatorRef).reduce((ye, ie) => {
        const be = vt(g.values, ie) || g.values[ie];
        return be !== void 0 && (ye[ie] = be), ye;
      }, {});
      return Object.assign(W, z), W;
    }, {});
  });
  return K(Kt, ($, W) => {
    if (!Object.keys($).length)
      return;
    !fe($, W) && (S.validated ? H() : D());
  }), yn(() => {
    var $;
    const W = ($ = ae(oe.keepValueOnUnmount)) !== null && $ !== void 0 ? $ : ae(g.keepValuesOnUnmount), Y = ae(y);
    if (W || !g || L.pendingUnmount[oe.id]) {
      g == null || g.removePathState(Y, w);
      return;
    }
    L.pendingUnmount[oe.id] = !0;
    const z = g.getPathState(Y);
    if (Array.isArray(z == null ? void 0 : z.id) && (z != null && z.multiple) ? z != null && z.id.includes(oe.id) : (z == null ? void 0 : z.id) === oe.id) {
      if (z != null && z.multiple && Array.isArray(z.value)) {
        const ie = z.value.findIndex((be) => fe(be, ae(oe.checkedValue)));
        if (ie > -1) {
          const be = [...z.value];
          be.splice(ie, 1), g.setFieldValue(Y, be);
        }
        Array.isArray(z.id) && z.id.splice(z.id.indexOf(oe.id), 1);
      } else
        g.unsetPathValue(ae(y));
      g.removePathState(Y, w);
    }
  }), oe;
}
function Fu(e) {
  const t = () => ({
    initialValue: void 0,
    validateOnMount: !1,
    bails: !0,
    label: void 0,
    validateOnValueUpdate: !0,
    keepValueOnUnmount: void 0,
    syncVModel: !1,
    controlled: !0
  }), n = !!(e != null && e.syncVModel), o = typeof (e == null ? void 0 : e.syncVModel) == "string" ? e.syncVModel : (e == null ? void 0 : e.modelPropName) || "modelValue", r = n && !("initialValue" in (e || {})) ? vn(ue(), o) : e == null ? void 0 : e.initialValue;
  if (!e)
    return Object.assign(Object.assign({}, t()), { initialValue: r });
  const a = "valueProp" in e ? e.valueProp : e.checkedValue, i = "standalone" in e ? !e.standalone : e.controlled, l = (e == null ? void 0 : e.modelPropName) || (e == null ? void 0 : e.syncVModel) || !1;
  return Object.assign(Object.assign(Object.assign({}, t()), e || {}), {
    initialValue: r,
    controlled: i ?? !0,
    checkedValue: a,
    syncVModel: l
  });
}
function Mu(e, t, n) {
  const o = n != null && n.standalone ? void 0 : jn(Rn), r = n == null ? void 0 : n.checkedValue, a = n == null ? void 0 : n.uncheckedValue;
  function i(l) {
    const s = l.handleChange, d = F(() => {
      const c = ae(l.value), v = ae(r);
      return Array.isArray(c) ? c.findIndex((p) => fe(p, v)) >= 0 : fe(v, c);
    });
    function f(c, v = !0) {
      var p, m;
      if (d.value === ((p = c == null ? void 0 : c.target) === null || p === void 0 ? void 0 : p.checked)) {
        v && l.validate();
        return;
      }
      const h = ae(e), g = o == null ? void 0 : o.getPathState(h), y = wr(c);
      let b = (m = ae(r)) !== null && m !== void 0 ? m : y;
      o && (g != null && g.multiple) && g.type === "checkbox" ? b = uo(vt(o.values, h) || [], b, void 0) : (n == null ? void 0 : n.type) === "checkbox" && (b = uo(ae(l.value), b, ae(a))), s(b, v);
    }
    return Object.assign(Object.assign({}, l), {
      checked: d,
      checkedValue: r,
      uncheckedValue: a,
      handleChange: f
    });
  }
  return i(Er(e, t, n));
}
function Iu({ prop: e, value: t, handleChange: n, shouldValidate: o }) {
  const r = ue();
  if (!r || !e) {
    process.env.NODE_ENV !== "production" && console.warn("Failed to setup model events because `useField` was not called in setup.");
    return;
  }
  const a = typeof e == "string" ? e : "modelValue", i = `update:${a}`;
  a in r.props && (K(t, (l) => {
    fe(l, vn(r, a)) || r.emit(i, l);
  }), K(() => vn(r, a), (l) => {
    if (l === lo && t.value === void 0)
      return;
    const s = l === lo ? void 0 : l;
    fe(s, t.value) || n(s, o());
  }));
}
function vn(e, t) {
  if (e)
    return e.props[t];
}
function Nu() {
  const e = jn(Rn);
  return e || process.env.NODE_ENV !== "production" && tu("No vee-validate <Form /> or `useForm` was detected in the component tree"), F(() => {
    var t;
    return (t = e == null ? void 0 : e.meta.value.touched) !== null && t !== void 0 ? t : !1;
  });
}
const Ru = { class: "text-[0.8rem] font-medium text-destructive" }, Du = {
  key: 0,
  class: "text-[0.8rem] text-muted-foreground"
}, ic = /* @__PURE__ */ P({
  __name: "FormField",
  props: {
    name: {},
    label: {},
    error: {},
    helpText: {}
  },
  setup(e) {
    const t = e, n = $u(t.name), o = Nu(), r = F(() => {
      var l;
      return t.error ? t.error : ((l = n == null ? void 0 : n.errorMessage) == null ? void 0 : l.value) ?? "";
    }), a = F(() => t.error ? !0 : o.value && !!r.value), i = Ze();
    return ut(ur, i), ut(sr, n), ut(cr, a), (l, s) => (C(), X("div", {
      class: Se(u(Z)("space-y-2", l.$attrs.class ?? ""))
    }, [
      V(l.$slots, "label", {}, () => [
        l.label ? (C(), T(u(As), {
          key: 0,
          for: u(i),
          class: Se(u(Z)(a.value && "text-destructive"))
        }, {
          default: O(() => [
            Ce(Oe(l.label), 1)
          ]),
          _: 1
        }, 8, ["for", "class"])) : ee("", !0)
      ]),
      V(l.$slots, "default"),
      a.value ? V(l.$slots, "error", { key: 0 }, () => [
        Ae("p", Ru, Oe(r.value), 1)
      ]) : ee("", !0),
      l.helpText ? V(l.$slots, "help", { key: 1 }, () => [
        l.helpText ? (C(), X("p", Du, Oe(l.helpText), 1)) : ee("", !0)
      ]) : ee("", !0)
    ], 2));
  }
}), ju = /* @__PURE__ */ P({
  __name: "DialogHeader",
  props: {
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (C(), X("div", {
      class: Se(u(Z)("flex flex-col space-y-2 text-center sm:text-left", t.class))
    }, [
      V(n.$slots, "default")
    ], 2));
  }
}), Lu = /* @__PURE__ */ P({
  __name: "DialogTitle",
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (C(), T(u(Ei), R(t, {
      class: u(Z)(
        "text-lg text-foreground font-semibold leading-none tracking-tight",
        t.class
      )
    }), {
      default: O(() => [
        V(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), zu = /* @__PURE__ */ P({
  __name: "DialogDescription",
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (C(), T(u(Ai), R(t, {
      class: u(Z)("text-muted-foreground text-sm", t.class)
    }), {
      default: O(() => [
        V(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Wu = /* @__PURE__ */ Ae("span", { class: "sr-only" }, "Close", -1), Uu = /* @__PURE__ */ P({
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
    const n = e, r = Pt(t);
    return (a, i) => (C(), T(u(ni), null, {
      default: O(() => [
        j(u(Oi), { class: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }),
        j(u(_i), R({
          class: u(Z)(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
            n.class
          )
        }, { ...n, ...u(r) }), {
          default: O(() => [
            V(a.$slots, "default"),
            j(u(Si), { class: "absolute top-4 right-4 p-0.5 transition-colors rounded-md hover:bg-secondary" }, {
              default: O(() => [
                j(u(Es), { class: "w-4 h-4" }),
                Wu
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
}), Hu = /* @__PURE__ */ P({
  __name: "DialogFooter",
  props: {
    class: {}
  },
  setup(e) {
    const t = e;
    return (n, o) => (C(), X("div", {
      class: Se(
        u(Z)(
          "flex flex-col space-y-2 sm:space-y-0 mt-1.5 sm:flex-row sm:justify-end sm:space-x-2",
          t.class
        )
      )
    }, [
      V(n.$slots, "default")
    ], 2));
  }
}), lc = /* @__PURE__ */ P({
  __name: "Dialog",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    title: {},
    description: {},
    trigger: {}
  },
  setup(e) {
    const t = e, n = t.modelValue !== void 0 ? fr(t, "modelValue") : k(!1), o = () => {
      n.value = !0;
    }, r = () => {
      n.value = !1;
    };
    return (a, i) => (C(), T(u(ti), {
      open: u(n),
      "onUpdate:open": i[0] || (i[0] = (l) => Et(n) ? n.value = l : null)
    }, {
      default: O(() => [
        V(a.$slots, "trigger", Be(We({ open: o, close: r })), () => [
          a.trigger ? (C(), T(Cs, R({ key: 0 }, a.trigger, { onClick: o }), null, 16)) : ee("", !0)
        ]),
        j(u(Uu), null, {
          default: O(() => [
            a.title || a.description ? (C(), T(u(ju), { key: 0 }, {
              default: O(() => [
                a.title ? (C(), T(u(Lu), { key: 0 }, {
                  default: O(() => [
                    Ce(Oe(a.title), 1)
                  ]),
                  _: 1
                })) : ee("", !0),
                a.description ? (C(), T(u(zu), { key: 1 }, {
                  default: O(() => [
                    Ce(Oe(a.description), 1)
                  ]),
                  _: 1
                })) : ee("", !0)
              ]),
              _: 1
            })) : ee("", !0),
            V(a.$slots, "body", Be(We({ open: o, close: r }))),
            a.$slots.footer ? (C(), T(u(Hu), { key: 1 }, {
              default: O(() => [
                V(a.$slots, "footer", Be(We({ open: o, close: r })))
              ]),
              _: 3
            })) : ee("", !0)
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["open"]));
  }
});
export {
  Cs as SdButton,
  tc as SdCheckbox,
  lc as SdDialog,
  ic as SdFormField,
  ec as SdInput,
  As as SdLabel,
  rc as SdProgress,
  nc as SdSelect,
  xs as SdSpinner,
  ac as SdSwitch,
  oc as SdTextarea
};
