/* @ds-bundle: {"format":3,"namespace":"TalentaTourDesignSystem_b2e8f8","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"IconButton","sourcePath":"components/actions/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/data-display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"Card","sourcePath":"components/data-display/Card.jsx"},{"name":"StatusPill","sourcePath":"components/data-display/StatusPill.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"4aac662a3bc9","components/actions/IconButton.jsx":"8da613bdc9bf","components/data-display/Avatar.jsx":"12005d564fcf","components/data-display/Badge.jsx":"2fb0b6b89d6f","components/data-display/Card.jsx":"9724ce5a864c","components/data-display/StatusPill.jsx":"fcc360b27d05","components/feedback/Toast.jsx":"1423d8a5e84e","components/feedback/Tooltip.jsx":"cb11ed6e1684","components/forms/Checkbox.jsx":"4c664ccebe95","components/forms/Input.jsx":"9260145d4a34","components/forms/Select.jsx":"4477db4360b9","components/forms/Switch.jsx":"1f601406bdc7","components/navigation/Tabs.jsx":"79e93d62b593"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TalentaTourDesignSystem_b2e8f8 = window.TalentaTourDesignSystem_b2e8f8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Inject component CSS once (hover/active states can't be inline). */
const CSS = `
.tt-btn{
  font-family:var(--font-sans);font-weight:var(--weight-bold);
  display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);
  border:1px solid transparent;border-radius:var(--radius-pill);
  cursor:pointer;white-space:nowrap;text-decoration:none;
  transition:transform var(--dur-base) var(--ease-smooth),
             background-color var(--dur-base) var(--ease-smooth),
             color var(--dur-base) var(--ease-smooth),
             border-color var(--dur-base) var(--ease-smooth),
             opacity var(--dur-base) var(--ease-smooth);
}
.tt-btn:active{transform:scale(var(--press-scale));}
.tt-btn:focus-visible{outline:none;box-shadow:var(--ring-brand);}
.tt-btn[disabled]{opacity:.5;pointer-events:none;}
.tt-btn svg{width:1.1em;height:1.1em;}

/* sizes */
.tt-btn--sm{font-size:var(--text-xs);padding:8px 14px;}
.tt-btn--md{font-size:var(--text-sm);padding:10px 18px;}
.tt-btn--lg{font-size:var(--text-md);padding:14px 24px;}

/* variants */
.tt-btn--primary{background:var(--action-primary);color:#fff;}
.tt-btn--primary:hover{background:var(--action-primary-hover);}
.tt-btn--ink{background:var(--action-ink);color:var(--text-inverse);}
.tt-btn--ink:hover{opacity:.9;}
.tt-btn--secondary{background:var(--surface-card);color:var(--text-primary);border-color:var(--border-subtle);box-shadow:var(--shadow-xs);}
.tt-btn--secondary:hover{background:var(--surface-sunken);border-color:var(--border-strong);}
.tt-btn--outline{background:transparent;color:var(--text-brand);border-color:var(--brand-red-wash-strong);}
.tt-btn--outline:hover{background:var(--brand-red-wash);}
.tt-btn--ghost{background:transparent;color:var(--text-secondary);}
.tt-btn--ghost:hover{background:var(--surface-sunken);color:var(--text-primary);}
.tt-btn--block{width:100%;}
`;
function useStyle() {
  React.useEffect(() => {
    if (typeof document === "undefined" || document.getElementById("tt-btn-css")) return;
    const el = document.createElement("style");
    el.id = "tt-btn-css";
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function Button({
  variant = "primary",
  size = "md",
  block = false,
  icon,
  iconRight,
  as = "button",
  className = "",
  children,
  ...props
}) {
  useStyle();
  const Tag = as;
  const cls = ["tt-btn", `tt-btn--${variant}`, `tt-btn--${size}`, block ? "tt-btn--block" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, props), icon ? /*#__PURE__*/React.createElement("span", {
    className: "tt-btn__icon",
    "aria-hidden": "true"
  }, icon) : null, children, iconRight ? /*#__PURE__*/React.createElement("span", {
    className: "tt-btn__icon",
    "aria-hidden": "true"
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.tt-iconbtn{
  font-family:var(--font-sans);display:inline-flex;align-items:center;justify-content:center;
  border:1px solid transparent;cursor:pointer;color:var(--text-tertiary);
  background:transparent;border-radius:var(--radius-md);
  transition:transform var(--dur-base) var(--ease-smooth),background-color var(--dur-base) var(--ease-smooth),color var(--dur-base) var(--ease-smooth),border-color var(--dur-base) var(--ease-smooth);
}
.tt-iconbtn:hover{background:var(--surface-sunken);color:var(--text-primary);}
.tt-iconbtn:active{transform:scale(.9);}
.tt-iconbtn:focus-visible{outline:none;box-shadow:var(--ring-brand);}
.tt-iconbtn[disabled]{opacity:.5;pointer-events:none;}
.tt-iconbtn svg{width:1.15em;height:1.15em;}
.tt-iconbtn--sm{width:32px;height:32px;font-size:14px;}
.tt-iconbtn--md{width:40px;height:40px;font-size:16px;}
.tt-iconbtn--lg{width:48px;height:48px;font-size:18px;}
.tt-iconbtn--pill{border-radius:var(--radius-pill);}
.tt-iconbtn--solid{background:var(--surface-card);border-color:var(--border-subtle);box-shadow:var(--shadow-xs);}
.tt-iconbtn--solid:hover{border-color:var(--border-strong);}
.tt-iconbtn--brand{color:var(--text-brand);}
.tt-iconbtn--brand:hover{background:var(--brand-red-wash);color:var(--action-primary);}
`;
function useStyle() {
  React.useEffect(() => {
    if (typeof document === "undefined" || document.getElementById("tt-iconbtn-css")) return;
    const el = document.createElement("style");
    el.id = "tt-iconbtn-css";
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function IconButton({
  size = "md",
  variant = "ghost",
  pill = false,
  className = "",
  children,
  ...props
}) {
  useStyle();
  const cls = ["tt-iconbtn", `tt-iconbtn--${size}`, variant === "solid" ? "tt-iconbtn--solid" : "", variant === "brand" ? "tt-iconbtn--brand" : "", pill ? "tt-iconbtn--pill" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls
  }, props), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.tt-avatar{
  font-family:var(--font-sans);position:relative;display:inline-flex;align-items:center;justify-content:center;
  border-radius:var(--radius-pill);overflow:visible;flex:none;
  background:var(--surface-inset);color:var(--text-secondary);
  border:1px solid var(--border-subtle);font-weight:var(--weight-bold);
}
.tt-avatar__img{width:100%;height:100%;border-radius:inherit;object-fit:cover;}
.tt-avatar--xs{width:24px;height:24px;font-size:10px;}
.tt-avatar--sm{width:32px;height:32px;font-size:12px;}
.tt-avatar--md{width:40px;height:40px;font-size:14px;}
.tt-avatar--lg{width:56px;height:56px;font-size:18px;}
.tt-avatar--brand{background:var(--brand-red-wash);color:var(--danger-fg);border-color:var(--brand-red-wash-strong);}
.tt-avatar__status{
  position:absolute;bottom:-1px;right:-1px;width:30%;height:30%;min-width:8px;min-height:8px;
  border-radius:var(--radius-pill);border:2px solid var(--surface-card);
}
.tt-avatar__status--online{background:var(--success);}
.tt-avatar__status--away{background:var(--warning);}
.tt-avatar__status--offline{background:var(--text-tertiary);}
`;
function useStyle() {
  React.useEffect(() => {
    if (typeof document === "undefined" || document.getElementById("tt-avatar-css")) return;
    const el = document.createElement("style");
    el.id = "tt-avatar-css";
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function initials(name = "") {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || "").join("").toUpperCase();
}
function Avatar({
  name = "",
  src,
  size = "md",
  brand = false,
  status,
  className = "",
  ...props
}) {
  useStyle();
  const cls = ["tt-avatar", `tt-avatar--${size}`, brand ? "tt-avatar--brand" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    title: name
  }, props), src ? /*#__PURE__*/React.createElement("img", {
    className: "tt-avatar__img",
    src: src,
    alt: name
  }) : initials(name) || "?", status ? /*#__PURE__*/React.createElement("span", {
    className: `tt-avatar__status tt-avatar__status--${status}`
  }) : null);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.tt-badge{
  font-family:var(--font-sans);display:inline-flex;align-items:center;gap:6px;
  border-radius:var(--radius-pill);border:1px solid transparent;white-space:nowrap;
}
.tt-badge svg{width:1em;height:1em;}
.tt-badge--sm{font-size:var(--text-2xs);padding:2px 8px;font-weight:var(--weight-bold);}
.tt-badge--md{font-size:var(--text-xs);padding:4px 10px;font-weight:var(--weight-bold);}
.tt-badge--upper{text-transform:uppercase;letter-spacing:var(--tracking-widest);}

.tt-badge--neutral{background:var(--surface-inset);color:var(--text-secondary);border-color:var(--border-subtle);}
.tt-badge--brand{background:var(--brand-red-wash);color:var(--danger-fg);}
.tt-badge--success{background:var(--success-wash);color:var(--success-fg);}
.tt-badge--warning{background:var(--warning-wash);color:var(--warning-fg);}
.tt-badge--danger{background:var(--danger-wash);color:var(--danger-fg);}
.tt-badge--info{background:var(--info-wash);color:var(--info-fg);}
.tt-badge--solid{background:var(--action-primary);color:#fff;}
.tt-badge--count{
  min-width:18px;height:18px;justify-content:center;padding:0 5px;font-size:var(--text-2xs);
  font-weight:var(--weight-black);background:var(--action-primary);color:#fff;
}
`;
function useStyle() {
  React.useEffect(() => {
    if (typeof document === "undefined" || document.getElementById("tt-badge-css")) return;
    const el = document.createElement("style");
    el.id = "tt-badge-css";
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function Badge({
  tone = "neutral",
  size = "md",
  uppercase = false,
  count = false,
  icon,
  className = "",
  children,
  ...props
}) {
  useStyle();
  const cls = ["tt-badge", count ? "tt-badge--count" : `tt-badge--${tone}`, count ? "" : `tt-badge--${size}`, uppercase ? "tt-badge--upper" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, props), icon ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, icon) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.tt-card{
  font-family:var(--font-sans);background:var(--surface-card);
  border:1px solid var(--border-subtle);border-radius:var(--radius-xl);
  box-shadow:var(--shadow-card);color:var(--text-primary);
  transition:transform var(--dur-base) var(--ease-smooth),border-color var(--dur-base) var(--ease-smooth),box-shadow var(--dur-base) var(--ease-smooth);
}
.tt-card--pad{padding:var(--pad-card);}
.tt-card--pad-lg{padding:var(--pad-card-lg);}
.tt-card--flat{box-shadow:none;}
.tt-card--interactive{cursor:pointer;}
.tt-card--interactive:hover{transform:scale(1.02);border-color:var(--border-strong);box-shadow:var(--shadow-md);}
.tt-card--interactive:active{transform:scale(.995);}
.tt-card__header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-3);margin-bottom:var(--space-4);}
.tt-card__title{font-size:var(--text-lg);font-weight:var(--weight-bold);line-height:var(--leading-snug);}
.tt-card__sub{font-size:var(--text-sm);color:var(--text-secondary);margin-top:2px;}
`;
function useStyle() {
  React.useEffect(() => {
    if (typeof document === "undefined" || document.getElementById("tt-card-css")) return;
    const el = document.createElement("style");
    el.id = "tt-card-css";
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function Card({
  pad = "md",
  flat = false,
  interactive = false,
  title,
  subtitle,
  action,
  className = "",
  children,
  ...props
}) {
  useStyle();
  const cls = ["tt-card", pad === "lg" ? "tt-card--pad-lg" : pad === "none" ? "" : "tt-card--pad", flat ? "tt-card--flat" : "", interactive ? "tt-card--interactive" : "", className].filter(Boolean).join(" ");
  const hasHeader = title || subtitle || action;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, props), hasHeader ? /*#__PURE__*/React.createElement("div", {
    className: "tt-card__header"
  }, /*#__PURE__*/React.createElement("div", null, title ? /*#__PURE__*/React.createElement("div", {
    className: "tt-card__title"
  }, title) : null, subtitle ? /*#__PURE__*/React.createElement("div", {
    className: "tt-card__sub"
  }, subtitle) : null), action ? /*#__PURE__*/React.createElement("div", null, action) : null) : null, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// components/data-display/StatusPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.tt-status{
  font-family:var(--font-sans);display:inline-flex;align-items:center;gap:7px;
  font-size:var(--text-xs);font-weight:var(--weight-bold);
  padding:5px 12px;border-radius:var(--radius-pill);border:1px solid transparent;
}
.tt-status__dot{width:7px;height:7px;border-radius:var(--radius-pill);flex:none;}
.tt-status--upper{text-transform:uppercase;letter-spacing:var(--tracking-wider);font-size:var(--text-2xs);}
.tt-status--operational{background:var(--success-wash);color:var(--success-fg);border-color:rgb(16 185 129 / .25);}
.tt-status--operational .tt-status__dot{background:var(--success);box-shadow:0 0 0 3px rgb(16 185 129 / .18);}
.tt-status--degraded{background:var(--warning-wash);color:var(--warning-fg);border-color:rgb(245 158 11 / .25);}
.tt-status--degraded .tt-status__dot{background:var(--warning);box-shadow:0 0 0 3px rgb(245 158 11 / .18);}
.tt-status--offline{background:var(--danger-wash);color:var(--danger-fg);border-color:rgb(239 68 68 / .25);}
.tt-status--offline .tt-status__dot{background:var(--danger);box-shadow:0 0 0 3px rgb(239 68 68 / .18);}
.tt-status--checking{background:var(--surface-inset);color:var(--text-secondary);border-color:var(--border-subtle);}
.tt-status--checking .tt-status__dot{background:var(--text-tertiary);animation:tt-pulse 1.1s var(--ease-smooth) infinite;}
@keyframes tt-pulse{0%,100%{opacity:1}50%{opacity:.3}}
`;
function useStyle() {
  React.useEffect(() => {
    if (typeof document === "undefined" || document.getElementById("tt-status-css")) return;
    const el = document.createElement("style");
    el.id = "tt-status-css";
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
const LABELS = {
  operational: "Operational",
  degraded: "Degraded",
  offline: "Offline",
  checking: "Checking"
};
function StatusPill({
  status = "operational",
  uppercase = true,
  children,
  className = "",
  ...props
}) {
  useStyle();
  const cls = ["tt-status", `tt-status--${status}`, uppercase ? "tt-status--upper" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "tt-status__dot",
    "aria-hidden": "true"
  }), children || LABELS[status]);
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.tt-toast{
  font-family:var(--font-sans);display:flex;align-items:center;gap:var(--space-3);
  min-width:280px;max-width:380px;padding:14px 16px;
  background:var(--surface-card);border:1px solid var(--border-subtle);
  border-radius:var(--radius-lg);box-shadow:var(--shadow-xl);
  backdrop-filter:blur(8px);
  animation:tt-toast-in var(--dur-base) var(--ease-out);
}
@keyframes tt-toast-in{from{opacity:0;transform:translateX(40px) scale(.95);}to{opacity:1;transform:none;}}
.tt-toast__icon{flex:none;display:flex;}
.tt-toast__icon svg{width:20px;height:20px;}
.tt-toast--success .tt-toast__icon{color:var(--success);}
.tt-toast--success{border-color:rgb(16 185 129 / .25);}
.tt-toast--error .tt-toast__icon{color:var(--danger);}
.tt-toast--error{border-color:rgb(239 68 68 / .25);}
.tt-toast--info .tt-toast__icon{color:var(--info);}
.tt-toast--loading .tt-toast__icon{color:var(--text-tertiary);}
.tt-toast--loading .tt-toast__icon svg{animation:tt-spin 1s linear infinite;}
@keyframes tt-spin{to{transform:rotate(360deg);}}
.tt-toast__msg{flex:1;font-size:var(--text-sm);font-weight:var(--weight-bold);line-height:var(--leading-snug);color:var(--text-primary);}
.tt-toast__close{flex:none;display:flex;padding:4px;border:none;background:transparent;color:var(--text-tertiary);cursor:pointer;border-radius:var(--radius-pill);transition:background-color var(--dur-fast),color var(--dur-fast);}
.tt-toast__close:hover{background:var(--surface-sunken);color:var(--text-primary);}
.tt-toast__close svg{width:16px;height:16px;}
`;
function useStyle() {
  React.useEffect(() => {
    if (typeof document === "undefined" || document.getElementById("tt-toast-css")) return;
    const el = document.createElement("style");
    el.id = "tt-toast-css";
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
const Icons = {
  success: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "9 12 11.5 14.5 16 9.5"
  })),
  error: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "13"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16.5",
    x2: "12",
    y2: "16.5"
  })),
  info: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "11",
    x2: "12",
    y2: "16"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "8"
  })),
  loading: /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12a9 9 0 1 1-6.2-8.6"
  }))
};
function Toast({
  type = "info",
  message,
  onClose,
  className = "",
  children,
  ...props
}) {
  useStyle();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["tt-toast", `tt-toast--${type}`, className].filter(Boolean).join(" "),
    role: "status"
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "tt-toast__icon",
    "aria-hidden": "true"
  }, Icons[type]), /*#__PURE__*/React.createElement("span", {
    className: "tt-toast__msg"
  }, message || children), onClose ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "tt-toast__close",
    "aria-label": "Dismiss",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }))) : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.tt-tooltip{position:relative;display:inline-flex;}
.tt-tooltip__bubble{
  position:absolute;z-index:80;font-family:var(--font-sans);font-size:var(--text-xs);font-weight:var(--weight-semibold);
  color:#fff;background:var(--zinc-900);padding:7px 11px;border-radius:var(--radius-sm);white-space:nowrap;
  box-shadow:var(--shadow-lg);opacity:0;pointer-events:none;
  transition:opacity var(--dur-base) var(--ease-smooth),transform var(--dur-base) var(--ease-smooth);
}
.tt-tooltip:hover .tt-tooltip__bubble,.tt-tooltip:focus-within .tt-tooltip__bubble{opacity:1;}
.tt-tooltip__bubble::after{content:"";position:absolute;width:7px;height:7px;background:var(--zinc-900);transform:rotate(45deg);}
.tt-tooltip__bubble[data-side="top"]{bottom:calc(100% + 9px);left:50%;transform:translateX(-50%) translateY(4px);}
.tt-tooltip:hover .tt-tooltip__bubble[data-side="top"]{transform:translateX(-50%);}
.tt-tooltip__bubble[data-side="top"]::after{bottom:-3px;left:50%;margin-left:-3px;}
.tt-tooltip__bubble[data-side="bottom"]{top:calc(100% + 9px);left:50%;transform:translateX(-50%) translateY(-4px);}
.tt-tooltip:hover .tt-tooltip__bubble[data-side="bottom"]{transform:translateX(-50%);}
.tt-tooltip__bubble[data-side="bottom"]::after{top:-3px;left:50%;margin-left:-3px;}
.tt-tooltip__bubble[data-side="right"]{left:calc(100% + 9px);top:50%;transform:translateY(-50%) translateX(-4px);}
.tt-tooltip:hover .tt-tooltip__bubble[data-side="right"]{transform:translateY(-50%);}
.tt-tooltip__bubble[data-side="right"]::after{left:-3px;top:50%;margin-top:-3px;}
`;
function useStyle() {
  React.useEffect(() => {
    if (typeof document === "undefined" || document.getElementById("tt-tooltip-css")) return;
    const el = document.createElement("style");
    el.id = "tt-tooltip-css";
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function Tooltip({
  label,
  side = "top",
  className = "",
  children,
  ...props
}) {
  useStyle();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["tt-tooltip", className].filter(Boolean).join(" ")
  }, props), children, /*#__PURE__*/React.createElement("span", {
    className: "tt-tooltip__bubble",
    "data-side": side,
    role: "tooltip"
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.tt-check{font-family:var(--font-sans);display:inline-flex;align-items:center;gap:var(--space-3);cursor:pointer;user-select:none;}
.tt-check[data-disabled="true"]{opacity:.5;cursor:not-allowed;}
.tt-check__box{
  flex:none;width:20px;height:20px;border-radius:var(--radius-xs);
  border:1.5px solid var(--border-strong);background:var(--surface-card);
  display:flex;align-items:center;justify-content:center;color:#fff;
  transition:background-color var(--dur-fast) var(--ease-smooth),border-color var(--dur-fast) var(--ease-smooth),transform var(--dur-fast) var(--ease-smooth);
}
.tt-check__box svg{width:14px;height:14px;opacity:0;transform:scale(.6);transition:opacity var(--dur-fast),transform var(--dur-fast);}
.tt-check[data-checked="true"] .tt-check__box{background:var(--action-primary);border-color:var(--action-primary);}
.tt-check[data-checked="true"] .tt-check__box svg{opacity:1;transform:scale(1);}
.tt-check:active .tt-check__box{transform:scale(.9);}
.tt-check:focus-visible .tt-check__box{box-shadow:var(--ring-brand);}
.tt-check--radio .tt-check__box{border-radius:var(--radius-pill);}
.tt-check--radio .tt-check__dot{width:9px;height:9px;border-radius:var(--radius-pill);background:#fff;opacity:0;transform:scale(.4);transition:opacity var(--dur-fast),transform var(--dur-fast);}
.tt-check--radio[data-checked="true"] .tt-check__dot{opacity:1;transform:scale(1);}
.tt-check__label{font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--text-primary);}
`;
function useStyle() {
  React.useEffect(() => {
    if (typeof document === "undefined" || document.getElementById("tt-check-css")) return;
    const el = document.createElement("style");
    el.id = "tt-check-css";
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function Checkbox({
  checked = false,
  onChange,
  label,
  radio = false,
  disabled = false,
  className = "",
  ...props
}) {
  useStyle();
  return /*#__PURE__*/React.createElement("label", _extends({
    className: ["tt-check", radio ? "tt-check--radio" : "", className].filter(Boolean).join(" "),
    "data-checked": checked,
    "data-disabled": disabled,
    tabIndex: disabled ? -1 : 0,
    role: radio ? "radio" : "checkbox",
    "aria-checked": checked,
    onClick: () => !disabled && onChange && onChange(!checked),
    onKeyDown: e => {
      if (disabled) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onChange && onChange(!checked);
      }
    }
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "tt-check__box"
  }, radio ? /*#__PURE__*/React.createElement("span", {
    className: "tt-check__dot"
  }) : /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), label ? /*#__PURE__*/React.createElement("span", {
    className: "tt-check__label"
  }, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.tt-field{font-family:var(--font-sans);display:flex;flex-direction:column;gap:var(--space-2);}
.tt-field__label{font-size:var(--text-sm);font-weight:var(--weight-semibold);color:var(--text-primary);}
.tt-field__hint{font-size:var(--text-xs);color:var(--text-secondary);}
.tt-field__error{font-size:var(--text-xs);color:var(--danger-fg);font-weight:var(--weight-semibold);}
.tt-input-wrap{position:relative;display:flex;align-items:center;}
.tt-input-wrap__icon{position:absolute;left:14px;display:flex;color:var(--text-tertiary);pointer-events:none;}
.tt-input-wrap__icon svg{width:18px;height:18px;}
.tt-input{
  width:100%;font-family:var(--font-sans);font-size:var(--text-sm);color:var(--text-primary);
  background:var(--surface-sunken);border:1px solid var(--border-subtle);
  border-radius:var(--radius-xl);padding:12px 16px;outline:none;
  transition:border-color var(--dur-base) var(--ease-smooth),box-shadow var(--dur-base) var(--ease-smooth),background-color var(--dur-base) var(--ease-smooth);
}
.tt-input::placeholder{color:var(--text-tertiary);}
.tt-input:hover{border-color:var(--brand-red-wash-strong);}
.tt-input:focus{border-color:var(--action-primary);box-shadow:var(--ring-brand);background:var(--surface-card);}
.tt-input--icon{padding-left:42px;}
.tt-input--invalid{border-color:var(--danger);}
.tt-input--invalid:focus{box-shadow:0 0 0 4px rgb(239 68 68 / .12);}
.tt-input[disabled]{opacity:.55;cursor:not-allowed;}
`;
function useStyle() {
  React.useEffect(() => {
    if (typeof document === "undefined" || document.getElementById("tt-input-css")) return;
    const el = document.createElement("style");
    el.id = "tt-input-css";
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function Input({
  label,
  hint,
  error,
  icon,
  id,
  className = "",
  ...props
}) {
  useStyle();
  const autoId = React.useId();
  const fieldId = id || autoId;
  const inputCls = ["tt-input", icon ? "tt-input--icon" : "", error ? "tt-input--invalid" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: "tt-field"
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "tt-field__label",
    htmlFor: fieldId
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    className: "tt-input-wrap"
  }, icon ? /*#__PURE__*/React.createElement("span", {
    className: "tt-input-wrap__icon",
    "aria-hidden": "true"
  }, icon) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    className: inputCls,
    "aria-invalid": !!error
  }, props))), error ? /*#__PURE__*/React.createElement("span", {
    className: "tt-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "tt-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
const CSS = `
.tt-select{font-family:var(--font-sans);position:relative;display:flex;flex-direction:column;gap:var(--space-2);}
.tt-select__label{font-size:var(--text-sm);font-weight:var(--weight-semibold);color:var(--text-primary);}
.tt-select__trigger{
  display:flex;align-items:center;justify-content:space-between;gap:var(--space-2);width:100%;
  font-family:var(--font-sans);font-size:var(--text-sm);text-align:left;color:var(--text-primary);
  background:var(--surface-sunken);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);
  padding:12px 16px;cursor:pointer;outline:none;
  transition:border-color var(--dur-base) var(--ease-smooth),box-shadow var(--dur-base) var(--ease-smooth);
}
.tt-select__trigger:hover{border-color:var(--brand-red-wash-strong);}
.tt-select__trigger[data-open="true"]{border-color:var(--action-primary);box-shadow:var(--ring-brand);}
.tt-select__placeholder{color:var(--text-tertiary);}
.tt-select__chev{color:var(--text-tertiary);transition:transform var(--dur-base) var(--ease-smooth);flex:none;}
.tt-select__chev[data-open="true"]{transform:rotate(180deg);}
.tt-select__menu{
  position:absolute;top:calc(100% + 8px);left:0;right:0;z-index:60;
  background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);
  box-shadow:var(--shadow-xl);padding:8px;max-height:260px;overflow:auto;
  animation:tt-select-in var(--dur-base) var(--ease-out);
}
@keyframes tt-select-in{from{opacity:0;transform:translateY(-6px) scale(.98);}to{opacity:1;transform:none;}}
.tt-select__opt{
  display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;
  font-family:var(--font-sans);font-size:var(--text-sm);color:var(--text-primary);
  background:transparent;border:none;text-align:left;cursor:pointer;
  padding:10px 12px;border-radius:var(--radius-md);
  transition:background-color var(--dur-fast) var(--ease-smooth);
}
.tt-select__opt:hover{background:var(--surface-sunken);}
.tt-select__opt[data-active="true"]{background:var(--brand-red-wash);color:var(--danger-fg);font-weight:var(--weight-semibold);}
.tt-select__opt svg{width:16px;height:16px;flex:none;}
`;
function useStyle() {
  React.useEffect(() => {
    if (typeof document === "undefined" || document.getElementById("tt-select-css")) return;
    const el = document.createElement("style");
    el.id = "tt-select-css";
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
const Chevron = () => /*#__PURE__*/React.createElement("svg", {
  className: "tt-select__chev",
  "data-open": "false",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("polyline", {
  points: "6 9 12 15 18 9"
}));
const CheckIcon = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.4",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("polyline", {
  points: "20 6 9 17 4 12"
}));
function Select({
  options = [],
  value,
  onChange,
  placeholder = "Select…",
  label,
  className = ""
}) {
  useStyle();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const selected = options.find(o => o.value === value);
  React.useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: ["tt-select", className].filter(Boolean).join(" "),
    ref: ref
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "tt-select__label"
  }, label) : null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "tt-select__trigger",
    "data-open": open,
    onClick: () => setOpen(o => !o)
  }, /*#__PURE__*/React.createElement("span", {
    className: selected ? "" : "tt-select__placeholder"
  }, selected ? selected.label : placeholder), /*#__PURE__*/React.createElement("span", {
    className: "tt-select__chev",
    "data-open": open,
    style: {
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    width: "16",
    height: "16"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  })))), open ? /*#__PURE__*/React.createElement("div", {
    className: "tt-select__menu"
  }, options.map(opt => /*#__PURE__*/React.createElement("button", {
    key: opt.value,
    type: "button",
    className: "tt-select__opt",
    "data-active": opt.value === value,
    onClick: () => {
      onChange && onChange(opt.value);
      setOpen(false);
    }
  }, /*#__PURE__*/React.createElement("span", null, opt.label), opt.value === value ? /*#__PURE__*/React.createElement(CheckIcon, null) : null))) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.tt-switch{font-family:var(--font-sans);display:inline-flex;align-items:center;gap:var(--space-3);cursor:pointer;user-select:none;}
.tt-switch[data-disabled="true"]{opacity:.5;cursor:not-allowed;}
.tt-switch__track{
  position:relative;flex:none;width:44px;height:26px;border-radius:var(--radius-pill);
  background:var(--zinc-300);transition:background-color var(--dur-base) var(--ease-smooth);
}
.tt-switch__track[data-on="true"]{background:var(--action-primary);}
.tt-switch__thumb{
  position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:var(--radius-pill);
  background:#fff;box-shadow:var(--shadow-sm);
  transition:transform var(--dur-base) var(--ease-smooth);
}
.tt-switch__track[data-on="true"] .tt-switch__thumb{transform:translateX(18px);}
.tt-switch__label{font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--text-primary);}
.tt-switch:focus-visible .tt-switch__track{box-shadow:var(--ring-brand);}
`;
function useStyle() {
  React.useEffect(() => {
    if (typeof document === "undefined" || document.getElementById("tt-switch-css")) return;
    const el = document.createElement("style");
    el.id = "tt-switch-css";
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function Switch({
  checked = false,
  onChange,
  label,
  disabled = false,
  className = "",
  ...props
}) {
  useStyle();
  return /*#__PURE__*/React.createElement("label", _extends({
    className: ["tt-switch", className].filter(Boolean).join(" "),
    "data-disabled": disabled,
    tabIndex: disabled ? -1 : 0,
    onKeyDown: e => {
      if (disabled) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onChange && onChange(!checked);
      }
    }
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "tt-switch__track",
    "data-on": checked,
    role: "switch",
    "aria-checked": checked,
    onClick: () => !disabled && onChange && onChange(!checked)
  }, /*#__PURE__*/React.createElement("span", {
    className: "tt-switch__thumb"
  })), label ? /*#__PURE__*/React.createElement("span", {
    className: "tt-switch__label"
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
const CSS = `
.tt-tabs{font-family:var(--font-sans);}
.tt-tabs__list{display:inline-flex;align-items:center;gap:2px;}
.tt-tabs__list--pill{background:var(--surface-inset);padding:4px;border-radius:var(--radius-pill);}
.tt-tabs__list--line{gap:var(--space-5);border-bottom:1px solid var(--border-subtle);}
.tt-tab{
  font-family:var(--font-sans);font-size:var(--text-sm);font-weight:var(--weight-semibold);
  color:var(--text-secondary);background:transparent;border:none;cursor:pointer;
  display:inline-flex;align-items:center;gap:8px;white-space:nowrap;
  transition:color var(--dur-base) var(--ease-smooth),background-color var(--dur-base) var(--ease-smooth);
}
.tt-tab svg{width:16px;height:16px;}
.tt-tab:focus-visible{outline:none;box-shadow:var(--ring-brand);border-radius:var(--radius-pill);}

.tt-tabs__list--pill .tt-tab{padding:8px 18px;border-radius:var(--radius-pill);}
.tt-tabs__list--pill .tt-tab:hover{color:var(--text-primary);}
.tt-tabs__list--pill .tt-tab[data-active="true"]{background:var(--surface-card);color:var(--action-primary);box-shadow:var(--shadow-sm);}

.tt-tabs__list--line .tt-tab{padding:0 0 12px;border-bottom:2px solid transparent;margin-bottom:-1px;}
.tt-tabs__list--line .tt-tab:hover{color:var(--text-primary);}
.tt-tabs__list--line .tt-tab[data-active="true"]{color:var(--action-primary);border-bottom-color:var(--action-primary);}
.tt-tab__count{
  font-size:var(--text-2xs);font-weight:var(--weight-bold);padding:1px 7px;border-radius:var(--radius-pill);
  background:var(--surface-inset);color:var(--text-secondary);
}
.tt-tab[data-active="true"] .tt-tab__count{background:var(--brand-red-wash);color:var(--danger-fg);}
`;
function useStyle() {
  React.useEffect(() => {
    if (typeof document === "undefined" || document.getElementById("tt-tabs-css")) return;
    const el = document.createElement("style");
    el.id = "tt-tabs-css";
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
function Tabs({
  tabs = [],
  value,
  onChange,
  variant = "pill",
  className = ""
}) {
  useStyle();
  return /*#__PURE__*/React.createElement("div", {
    className: ["tt-tabs", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("div", {
    className: `tt-tabs__list tt-tabs__list--${variant}`,
    role: "tablist"
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.value,
    role: "tab",
    "aria-selected": t.value === value,
    "data-active": t.value === value,
    className: "tt-tab",
    onClick: () => onChange && onChange(t.value)
  }, t.icon ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, t.icon) : null, t.label, t.count != null ? /*#__PURE__*/React.createElement("span", {
    className: "tt-tab__count"
  }, t.count) : null))));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
