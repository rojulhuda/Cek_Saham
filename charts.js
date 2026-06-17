/* =========================================================================
   Saham charts — illustrative SVG data-viz for the deck.
   All data is fictional/illustrative — NOT live market data.
   Exposes window.Charts.{ candles, indicator, orderBook, pattern, sparkRow }
   ========================================================================= */
(function () {
  const NS = "http://www.w3.org/2000/svg";

  const C = {
    up: "#10b981",        // emerald — naik
    upWash: "rgba(16,185,129,.14)",
    down: "#dc2626",      // brand red — turun
    downWash: "rgba(220,38,38,.12)",
    ma20: "#3b82f6",      // info blue
    ma50: "#f59e0b",      // amber
    line: "#dc2626",
    grid: "#ececef",
    axis: "#a1a1aa",
    ink: "#18181b",
    zinc400: "#a1a1aa",
    zinc300: "#d4d4d8",
    vol: "#d4d4d8",
    volUp: "rgba(16,185,129,.45)",
    volDown: "rgba(220,38,38,.4)",
  };

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function svg(w, h, par) {
    const s = el("svg", {
      viewBox: `0 0 ${w} ${h}`,
      width: "100%",
      height: "100%",
      preserveAspectRatio: par || "xMidYMid meet",
      "font-family": "var(--font-sans)",
    });
    return s;
  }
  function text(parent, x, y, str, opts = {}) {
    const t = el("text", {
      x, y,
      "font-size": opts.size || 12,
      "font-weight": opts.weight || 600,
      fill: opts.fill || C.zinc400,
      "text-anchor": opts.anchor || "start",
      "font-family": opts.mono ? "var(--font-mono)" : "var(--font-sans)",
      "letter-spacing": opts.tracking || 0,
    }, parent);
    t.textContent = str;
    return t;
  }

  // seeded RNG so charts are stable across reloads
  function rng(seed) {
    let s = seed >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  // build a candle series: downtrend then a rebound of given strength
  function makeSeries(seed, n, opts = {}) {
    const r = rng(seed);
    const out = [];
    let price = opts.start ?? 100;
    const downLen = Math.floor(n * (opts.downFrac ?? 0.62));
    for (let i = 0; i < n; i++) {
      const inDown = i < downLen;
      const drift = inDown ? -(opts.downStep ?? 1.6) : (opts.upStep ?? 2.2);
      const vibe = opts.vol ?? 1.4; // candle body noise
      const o = price;
      let c = o + drift + (r() - 0.5) * vibe * 2;
      // erratic mode: occasional violent candle (thin stock)
      if (opts.erratic && r() > 0.78) c = o + (r() - 0.5) * vibe * 6;
      const hi = Math.max(o, c) + r() * vibe * (opts.wick ?? 1.1);
      const lo = Math.min(o, c) - r() * vibe * (opts.wick ?? 1.1);
      const vBase = inDown ? 0.35 : (opts.upVol ?? 0.9);
      let vol = vBase + r() * 0.4;
      if (opts.thinVol) vol = 0.2 + r() * 0.25; // weak conviction
      if (!inDown && opts.upVol && i > downLen + 1 && r() > 0.5) vol += 0.4;
      out.push({ o, c, h: hi, l: lo, v: Math.max(0.08, vol) });
      price = c;
    }
    return out;
  }

  const SERIES = {
    // OASA — erratic, thin volume, low-conviction spike
    OASA: () => makeSeries(7, 34, { start: 120, downStep: 1.0, upStep: 1.4, vol: 2.6, wick: 1.8, erratic: true, thinVol: true, downFrac: 0.7 }),
    // BUMI — clean downtrend, strong high-volume rebound reclaiming MA20
    BUMI: () => makeSeries(21, 34, { start: 150, downStep: 1.8, upStep: 3.0, vol: 1.5, wick: 1.0, upVol: 1.15, downFrac: 0.66 }),
    // DEWA — same shape as BUMI, a touch milder
    DEWA: () => makeSeries(42, 34, { start: 78, downStep: 1.1, upStep: 1.9, vol: 1.1, wick: 0.9, upVol: 0.95, downFrac: 0.66 }),
  };

  function sma(data, period, key = "c") {
    const out = [];
    for (let i = 0; i < data.length; i++) {
      if (i < period - 1) { out.push(null); continue; }
      let s = 0;
      for (let j = i - period + 1; j <= i; j++) s += data[j][key];
      out.push(s / period);
    }
    return out;
  }

  /* ---- Candlestick chart with MA overlay + volume sub-panel ---- */
  function candles(container, stock) {
    const data = (SERIES[stock] || SERIES.BUMI)();
    const W = 620, H = 320;
    const padL = 8, padR = 46, padT = 14;
    const volH = 56, gap = 10;
    const priceH = H - padT - volH - gap - 18;
    const s = svg(W, H);

    const lows = data.map(d => d.l), highs = data.map(d => d.h);
    let min = Math.min(...lows), max = Math.max(...highs);
    const padv = (max - min) * 0.08; min -= padv; max += padv;
    const plotW = W - padL - padR;
    const x = i => padL + (i + 0.5) * (plotW / data.length);
    const y = v => padT + (1 - (v - min) / (max - min)) * priceH;
    const cw = Math.max(3, (plotW / data.length) * 0.6);

    // gridlines + price axis
    for (let g = 0; g <= 4; g++) {
      const gy = padT + (priceH * g) / 4;
      el("line", { x1: padL, y1: gy, x2: padL + plotW, y2: gy, stroke: C.grid, "stroke-width": 1 }, s);
      const val = max - (max - min) * (g / 4);
      text(s, W - padR + 6, gy + 4, val.toFixed(0), { size: 11, fill: C.zinc400, mono: true, weight: 500 });
    }

    // moving averages
    const ma20 = sma(data, 20), ma50 = sma(data, 7); // short MA for reactivity
    function maPath(arr, color, dash) {
      let d = "", started = false;
      arr.forEach((v, i) => { if (v == null) return; d += (started ? "L" : "M") + x(i) + " " + y(v) + " "; started = true; });
      el("path", { d, fill: "none", stroke: color, "stroke-width": 2.2, "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-dasharray": dash || "", opacity: 0.95 }, s);
    }
    maPath(ma50, C.ma50, "");
    maPath(ma20, C.ma20, "");

    // candles
    data.forEach((d, i) => {
      const up = d.c >= d.o;
      const col = up ? C.up : C.down;
      el("line", { x1: x(i), y1: y(d.h), x2: x(i), y2: y(d.l), stroke: col, "stroke-width": 1.4 }, s);
      const yo = y(d.o), yc = y(d.c);
      el("rect", {
        x: x(i) - cw / 2, y: Math.min(yo, yc),
        width: cw, height: Math.max(1.5, Math.abs(yc - yo)),
        fill: up ? C.upWash : col, stroke: col, "stroke-width": 1.2, rx: 1,
      }, s);
    });

    // volume sub-panel
    const volTop = padT + priceH + gap;
    const maxV = Math.max(...data.map(d => d.v));
    el("line", { x1: padL, y1: volTop + volH, x2: padL + plotW, y2: volTop + volH, stroke: C.grid, "stroke-width": 1 }, s);
    data.forEach((d, i) => {
      const up = d.c >= d.o;
      const bh = (d.v / maxV) * volH;
      el("rect", { x: x(i) - cw / 2, y: volTop + volH - bh, width: cw, height: bh, fill: up ? C.volUp : C.volDown, rx: 1 }, s);
    });
    text(s, padL, volTop + 12, "VOLUME", { size: 9, fill: C.zinc400, weight: 700, tracking: "0.18em" });

    // legend
    const ly = H - 4;
    function chip(cx, color, label) {
      el("line", { x1: cx, y1: ly - 4, x2: cx + 16, y2: ly - 4, stroke: color, "stroke-width": 3, "stroke-linecap": "round" }, s);
      text(s, cx + 22, ly, label, { size: 11, fill: C.zinc400, weight: 600 });
    }
    chip(padL, C.ma20, "MA20");
    chip(padL + 86, C.ma50, "MA5");
    text(s, W - padR, ly, "ilustratif — bukan data live", { size: 10, fill: C.zinc300, anchor: "end", weight: 500 });

    container.innerHTML = "";
    container.appendChild(s);
  }

  /* ---- Indicator mini-diagrams (MA / MACD / RSI / Volume) ---- */
  function indicator(container, kind) {
    const W = 640, H = 200;
    const s = svg(W, H, "none");
    const padL = 6, padR = 6, padT = 10, padB = 10;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const r = rng(kind.length * 13 + 5);

    function frame() {
      el("rect", { x: 0.5, y: 0.5, width: W - 1, height: H - 1, rx: 14, fill: "none", stroke: C.grid, "stroke-width": 1 }, s);
    }
    const xs = n => i => padL + (i / (n - 1)) * plotW;

    if (kind === "ma") {
      frame();
      const n = 40, price = [], r2 = rng(3);
      let p = 60;
      for (let i = 0; i < n; i++) { p += (i < 22 ? -1.1 : 1.7) + (r2() - 0.5) * 3; price.push(p); }
      const X = xs(n);
      let lo = Math.min(...price), hi = Math.max(...price); const pad = (hi - lo) * 0.15; lo -= pad; hi += pad;
      const Y = v => padT + (1 - (v - lo) / (hi - lo)) * plotH;
      const ma5 = sma(price.map(c => ({ c })), 5), ma20 = sma(price.map(c => ({ c })), 14);
      const line = (arr, col, w, dash) => { let d = "", st = false; arr.forEach((v, i) => { if (v == null) return; d += (st ? "L" : "M") + X(i) + " " + Y(v) + " "; st = true; }); el("path", { d, fill: "none", stroke: col, "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dasharray": dash || "" }, s); };
      line(price.map(v => v), C.zinc300, 1.6);
      line(ma5, C.down, 2.4);
      line(ma20, C.ma20, 2.4);
      // crossover marker
      text(s, padL + 4, H - 14, "MA5", { size: 11, fill: C.down, weight: 700 });
      text(s, padL + 44, H - 14, "MA20", { size: 11, fill: C.ma20, weight: 700 });
      text(s, padL + 100, H - 14, "Harga", { size: 11, fill: C.zinc400, weight: 600 });
    }

    if (kind === "macd") {
      frame();
      const n = 38; const X = xs(n);
      const macd = [], sig = [];
      let m = -8;
      for (let i = 0; i < n; i++) { m += (i < 20 ? -0.3 : 1.1) + (r() - 0.5) * 0.8; macd.push(m); }
      // signal = ema-ish smoothing
      let prev = macd[0];
      macd.forEach(v => { prev = prev + 0.25 * (v - prev); sig.push(prev); });
      const all = macd.concat(sig); let lo = Math.min(...all), hi = Math.max(...all); const pad = (hi - lo) * 0.2; lo -= pad; hi += pad;
      const Y = v => padT + (1 - (v - lo) / (hi - lo)) * plotH;
      const zeroY = Y(0);
      el("line", { x1: padL, y1: zeroY, x2: W - padR, y2: zeroY, stroke: C.axis, "stroke-width": 1.2, "stroke-dasharray": "4 4" }, s);
      text(s, W - padR - 4, zeroY - 5, "0", { size: 10, fill: C.axis, anchor: "end", mono: true, weight: 600 });
      // histogram
      const bw = plotW / n * 0.6;
      macd.forEach((v, i) => { const h = sig[i]; const diff = v - h; const yv = Y(diff > 0 ? diff : 0); const y0 = Y(0); el("rect", { x: X(i) - bw / 2, y: Math.min(yv, y0), width: bw, height: Math.abs(yv - y0) || 1, fill: diff >= 0 ? C.upWash : C.downWash, stroke: diff >= 0 ? C.up : C.down, "stroke-width": 0.8, rx: 1 }, s); });
      const line = (arr, col) => { let d = ""; arr.forEach((v, i) => d += (i ? "L" : "M") + X(i) + " " + Y(v) + " "); el("path", { d, fill: "none", stroke: col, "stroke-width": 2.2, "stroke-linecap": "round", "stroke-linejoin": "round" }, s); };
      line(macd, C.down);
      line(sig, C.ma20);
      text(s, padL + 4, padT + 12, "MACD", { size: 11, fill: C.down, weight: 700 });
      text(s, padL + 52, padT + 12, "Signal", { size: 11, fill: C.ma20, weight: 700 });
    }

    if (kind === "rsi") {
      frame();
      const n = 40; const X = xs(n);
      const Y = v => padT + (1 - v / 100) * plotH;
      // bands
      const y70 = Y(70), y30 = Y(30), y50 = Y(50);
      el("rect", { x: padL, y: padT, width: plotW, height: y70 - padT, fill: "rgba(220,38,38,.05)" }, s);
      el("rect", { x: padL, y: y30, width: plotW, height: (padT + plotH) - y30, fill: "rgba(16,185,129,.05)" }, s);
      el("line", { x1: padL, y1: y70, x2: W - padR, y2: y70, stroke: C.down, "stroke-width": 1, "stroke-dasharray": "4 3", opacity: .6 }, s);
      el("line", { x1: padL, y1: y50, x2: W - padR, y2: y50, stroke: C.axis, "stroke-width": 1, "stroke-dasharray": "2 4", opacity: .7 }, s);
      el("line", { x1: padL, y1: y30, x2: W - padR, y2: y30, stroke: C.up, "stroke-width": 1, "stroke-dasharray": "4 3", opacity: .6 }, s);
      text(s, W - padR - 2, y70 - 4, "70", { size: 10, fill: C.down, anchor: "end", mono: true, weight: 700 });
      text(s, W - padR - 2, y30 - 4, "30", { size: 10, fill: C.up, anchor: "end", mono: true, weight: 700 });
      const rsi = []; let v = 22;
      for (let i = 0; i < n; i++) { v += (i < 18 ? -0.4 : 2.1) + (r() - 0.5) * 6; v = Math.max(8, Math.min(92, v)); rsi.push(v); }
      let d = ""; rsi.forEach((val, i) => d += (i ? "L" : "M") + X(i) + " " + Y(val) + " ");
      el("path", { d, fill: "none", stroke: "#7c3aed", "stroke-width": 2.4, "stroke-linecap": "round", "stroke-linejoin": "round" }, s);
      text(s, padL + 4, padT + 12, "RSI 14", { size: 11, fill: "#7c3aed", weight: 700 });
    }

    if (kind === "volume") {
      frame();
      const n = 24; const X = xs(n);
      const vols = []; for (let i = 0; i < n; i++) { let vv = 0.3 + r() * 0.3; if (i === n - 4) vv = 1.0; if (i === n - 3) vv = 0.92; if (i === n - 5) vv = 0.8; vols.push(vv); }
      const maxV = Math.max(...vols);
      const bw = plotW / n * 0.62;
      const baseY = padT + plotH;
      vols.forEach((vv, i) => {
        const big = vv > 0.7;
        const h = (vv / maxV) * (plotH - 6);
        el("rect", { x: X(i) - bw / 2, y: baseY - h, width: bw, height: h, fill: big ? C.up : C.zinc300, rx: 1, opacity: big ? 0.85 : 0.6 }, s);
      });
      el("line", { x1: padL, y1: baseY, x2: W - padR, y2: baseY, stroke: C.grid, "stroke-width": 1 }, s);
      text(s, padL + 4, padT + 12, "VOLUME", { size: 10, fill: C.zinc400, weight: 700, tracking: "0.16em" });
      text(s, X(n - 4), baseY - (1.0 / maxV) * (plotH - 6) - 6, "konfirmasi", { size: 10, fill: C.up, anchor: "middle", weight: 700 });
    }

    container.innerHTML = "";
    container.appendChild(s);
  }

  /* ---- Pattern illustration: reversal vs bear rally ---- */
  function pattern(container, kind) {
    const W = 600, H = 200;
    const s = svg(W, H, "none");
    const padL = 14, padR = 14, padT = 24, padB = 28;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    el("rect", { x: 0.5, y: 0.5, width: W - 1, height: H - 1, rx: 16, fill: "none", stroke: C.grid, "stroke-width": 1 }, s);

    // resistance line
    const resY = padT + plotH * 0.26;
    el("line", { x1: padL, y1: resY, x2: W - padR, y2: resY, stroke: C.zinc400, "stroke-width": 1.4, "stroke-dasharray": "6 5" }, s);
    text(s, W - padR, resY - 7, "RESISTANCE / MA50", { size: 10, fill: C.zinc400, anchor: "end", weight: 700, tracking: "0.12em" });

    const X = f => padL + f * plotW;
    const Y = f => padT + (1 - f) * plotH; // f in 0..1 from bottom

    let pts;
    let color, fillWash;
    if (kind === "reversal") {
      color = C.up; fillWash = C.upWash;
      // downtrend, base, higher highs + higher lows, breaks resistance and holds
      pts = [[0,.62],[.08,.42],[.16,.5],[.24,.3],[.32,.4],[.4,.34],[.46,.46],[.54,.42],[.62,.58],[.7,.52],[.78,.7],[.86,.66],[.94,.82],[1,.78]];
    } else {
      color = C.down; fillWash = C.downWash;
      // downtrend, one sharp vertical pop to resistance, rejected, lower low
      pts = [[0,.6],[.1,.44],[.2,.5],[.3,.32],[.42,.74],[.5,.72],[.56,.5],[.64,.34],[.72,.22],[.8,.12],[.9,.08],[1,.05]];
    }
    let d = "";
    pts.forEach((p, i) => { d += (i ? "L" : "M") + X(p[0]).toFixed(1) + " " + Y(p[1]).toFixed(1) + " "; });
    // area
    const area = d + `L ${X(1)} ${padT + plotH} L ${X(0)} ${padT + plotH} Z`;
    el("path", { d: area, fill: fillWash, stroke: "none" }, s);
    el("path", { d, fill: "none", stroke: color, "stroke-width": 2.6, "stroke-linejoin": "round", "stroke-linecap": "round" }, s);

    // marker
    if (kind === "reversal") {
      const bx = X(.78), by = Y(.7);
      el("circle", { cx: bx, cy: resY, r: 5, fill: color, stroke: "#fff", "stroke-width": 2 }, s);
      text(s, bx, resY + 20, "tembus & bertahan", { size: 11, fill: color, anchor: "middle", weight: 700 });
    } else {
      const bx = X(.42), by = Y(.74);
      el("circle", { cx: bx, cy: by, r: 5, fill: color, stroke: "#fff", "stroke-width": 2 }, s);
      text(s, bx + 6, by - 8, "ditolak", { size: 11, fill: color, weight: 700 });
      el("path", { d: `M ${X(.9)} ${Y(.08)} l -6 -10 m 6 10 l 6 -10`, stroke: color, "stroke-width": 2, fill: "none", "stroke-linecap": "round" }, s);
    }

    container.innerHTML = "";
    container.appendChild(s);
  }

  /* ---- Order book ladder ---- */
  function orderBook(container) {
    const rows = [
      { side: "ask", px: 191, qty: 0.28 },
      { side: "ask", px: 190, qty: 0.42 },
      { side: "ask", px: 189, qty: 0.66 },
      { side: "ask", px: 188, qty: 1.0 },
      { side: "bid", px: 187, qty: 0.95 },
      { side: "bid", px: 186, qty: 0.6 },
      { side: "bid", px: 185, qty: 0.34 },
      { side: "bid", px: 184, qty: 0.2 },
    ];
    const W = 360, rowH = 30, padT = 8, midGap = 14;
    const H = padT * 2 + rows.length * rowH + midGap;
    const s = svg(W, H);
    const maxQ = Math.max(...rows.map(r => r.qty));
    let y = padT;
    rows.forEach((r, i) => {
      if (i === 4) y += midGap; // spread gap
      const isAsk = r.side === "ask";
      const col = isAsk ? C.down : C.up;
      const wash = isAsk ? "rgba(220,38,38,.10)" : "rgba(16,185,129,.12)";
      const bw = (r.qty / maxQ) * (W * 0.62);
      // bar grows from center-ish toward edges: asks from right, bids from right too (depth)
      el("rect", { x: W - 8 - bw, y: y + 3, width: bw, height: rowH - 8, fill: wash, rx: 5 }, s);
      text(s, 12, y + rowH / 2 + 4, r.px.toLocaleString("id-ID"), { size: 13, fill: col, mono: true, weight: 700 });
      text(s, W - 12, y + rowH / 2 + 4, (r.qty * 12.4).toFixed(1) + "jt", { size: 12, fill: C.zinc400, anchor: "end", mono: true, weight: 600 });
      y += rowH;
    });
    // spread label
    const spreadY = padT + 4 * rowH + midGap / 2 + 2;
    text(s, 12, spreadY, "— spread —", { size: 10, fill: C.zinc400, weight: 700, tracking: "0.1em" });

    container.innerHTML = "";
    container.appendChild(s);
  }

  /* ---- Tiny sparkline row for cover motif ---- */
  function sparkRow(container) {
    const W = 1200, H = 160;
    const s = svg(W, H);
    const data = makeSeries(99, 60, { start: 100, downStep: 1.2, upStep: 1.8, vol: 1.6, wick: 1.1, downFrac: 0.62 });
    const lows = data.map(d => d.l), highs = data.map(d => d.h);
    let min = Math.min(...lows), max = Math.max(...highs); const pad = (max - min) * 0.1; min -= pad; max += pad;
    const x = i => (i + 0.5) * (W / data.length);
    const y = v => (1 - (v - min) / (max - min)) * H;
    const cw = (W / data.length) * 0.5;
    data.forEach((d, i) => {
      const up = d.c >= d.o;
      const col = up ? "rgba(16,185,129,.5)" : "rgba(220,38,38,.42)";
      el("line", { x1: x(i), y1: y(d.h), x2: x(i), y2: y(d.l), stroke: col, "stroke-width": 1.2 }, s);
      const yo = y(d.o), yc = y(d.c);
      el("rect", { x: x(i) - cw / 2, y: Math.min(yo, yc), width: cw, height: Math.max(1, Math.abs(yc - yo)), fill: col, rx: 1 }, s);
    });
    container.innerHTML = "";
    container.appendChild(s);
  }

  window.Charts = { candles, indicator, pattern, orderBook, sparkRow };
})();
