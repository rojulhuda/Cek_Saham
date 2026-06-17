/* =========================================================================
   Saham Deck — Interactive Widgets (React + DS components)
   Mounts three widgets into pre-existing slide containers:
     #widget-stocks   → StockTabs (tabbed stock deep-dive + chart)
     #widget-reversal → ReversalTool (reversal vs bear-rally checker)
     #widget-calc     → RiskCalculator (position-size calculator)
   ========================================================================= */

const { Button, Card, Badge, StatusPill, Tabs, Input } =
  window.TalentaTourDesignSystem_b2e8f8;
const { useState, useEffect, useRef, useCallback } = React;

/* ── helpers ─────────────────────────────────────────────────────────────── */
function Chip({ children, tone = "neutral" }) {
  return React.createElement(Badge, { tone, size: "md", uppercase: true }, children);
}

/* ══════════════════════════════════════════════════════════════════════════
   1. STOCK TABS
   Shows per-stock detail + illustrative candlestick chart via Charts.candles
═══════════════════════════════════════════════════════════════════════════ */
const STOCKS = {
  OASA: {
    nama: "Maharaksa Biru Energi",
    bidang: "Energi / Lingkungan",
    likuiditas: { label: "Tipis — gorengan", tone: "warning" },
    volatilitas: { label: "Ekstrem (~10.5%/hari)", tone: "danger" },
    beta: "2.24",
    epsNote: "EPS negatif (rugi)",
    risiko: "Sulit keluar posisi — bid bisa kosong",
    cocok: "SANGAT BERISIKO",
    mood: "danger",
    poin: [
      "Beta 2.24 — bergerak 2× lebih liar dari pasar",
      "Volume tipis; sempat ada jeda ~2 jam tengah hari",
      "Rebound dengan volume kecil — konviksi pembeli lemah",
      "Fundamental masih rugi (EPS negatif), pernah disuspensi",
      "Kombinasi tersulit untuk day trader",
    ],
  },
  BUMI: {
    nama: "Bumi Resources",
    bidang: "Penambang batu bara",
    likuiditas: { label: "Sangat tinggi", tone: "success" },
    volatilitas: { label: "Tinggi", tone: "warning" },
    beta: "~1.5",
    epsNote: "Perlu verifikasi live",
    risiko: "Gap & arus asing dominan",
    cocok: "Lebih tradable (swing)",
    mood: "warning",
    poin: [
      "Sangat likuid — miliaran saham per sesi",
      "Net buy asing saat rebound — konviksi lebih kuat",
      "Sudah reclaim MA20, tapi masih di bawah MA50/MA200",
      "Kandidat reversal tahap awal — belum terkonfirmasi",
      "Mirip DEWA (satu ekosistem) → hindari pegang keduanya",
    ],
  },
  DEWA: {
    nama: "Darma Henwa",
    bidang: "Kontraktor jasa tambang",
    likuiditas: { label: "Cukup ramai", tone: "success" },
    volatilitas: { label: "Sedang (~3.8%/hari)", tone: "neutral" },
    beta: "~1.2",
    epsNote: "Bergantung volume proyek",
    risiko: "Cuaca / produksi klien",
    cocok: "Mirip BUMI",
    mood: "neutral",
    poin: [
      "Kontraktor — pendapatan dari volume proyek klien",
      "Terpengaruh cuaca dan regulasi tambang",
      "Pola chart mirip BUMI (satu ekosistem batu bara)",
      "Memegang DEWA + BUMI = tumpuk risiko, BUKAN diversifikasi",
      "Lebih minim data vs BUMI — verifikasi sendiri lebih penting",
    ],
  },
};

function StockTabs() {
  const [active, setActive] = useState("BUMI");
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && window.Charts) {
      window.Charts.candles(chartRef.current, active);
    }
  }, [active]);

  const st = STOCKS[active];
  const tabList = ["OASA", "BUMI", "DEWA"].map(k => ({
    value: k,
    label: k,
  }));

  return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 20, height: "100%" } },
    React.createElement(Tabs, { tabs: tabList, value: active, onChange: setActive, variant: "pill" }),
    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 20, flex: 1 } },
      // Left: detail card
      React.createElement(Card, { pad: "lg", style: { display: "flex", flexDirection: "column", gap: 16 } },
        React.createElement("div", null,
          React.createElement("div", { className: "tt-eyebrow", style: { marginBottom: 4 } }, st.bidang),
          React.createElement("div", { style: { fontSize: "var(--text-xl)", fontWeight: "var(--weight-bold)", lineHeight: "var(--leading-snug)" } }, active),
          React.createElement("div", { style: { fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginTop: 2 } }, st.nama),
        ),
        React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } },
          React.createElement(Badge, { tone: st.likuiditas.tone, size: "md" }, "Likuiditas: " + st.likuiditas.label),
          React.createElement(Badge, { tone: st.volatilitas.tone, size: "md" }, "Volatilitas: " + st.volatilitas.label),
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
          React.createElement("div", { style: { background: "var(--surface-inset)", borderRadius: "var(--radius-lg)", padding: "10px 14px" } },
            React.createElement("div", { className: "tt-eyebrow", style: { marginBottom: 2 } }, "Beta"),
            React.createElement("div", { style: { fontSize: "var(--text-2xl)", fontWeight: "var(--weight-bold)", fontFamily: "var(--font-mono)", color: "var(--text-brand)" } }, st.beta),
          ),
          React.createElement("div", { style: { background: "var(--surface-inset)", borderRadius: "var(--radius-lg)", padding: "10px 14px" } },
            React.createElement("div", { className: "tt-eyebrow", style: { marginBottom: 2 } }, "Fundamental"),
            React.createElement("div", { style: { fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)", color: "var(--text-secondary)", marginTop: 4 } }, st.epsNote),
          ),
        ),
        React.createElement("div", null,
          React.createElement("div", { className: "tt-eyebrow", style: { marginBottom: 6 } }, "Poin kunci"),
          React.createElement("ul", { style: { margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 } },
            st.poin.map((p, i) =>
              React.createElement("li", { key: i, style: { fontSize: "var(--text-sm)", color: "var(--text-secondary)", display: "flex", gap: 8, alignItems: "flex-start", lineHeight: 1.45 } },
                React.createElement("span", { style: { color: "var(--brand-red)", fontWeight: 700, flexShrink: 0, marginTop: 1 } }, "→"),
                p
              )
            )
          ),
        ),
        React.createElement("div", { style: { marginTop: "auto" } },
          React.createElement(Badge, { tone: st.mood === "danger" ? "danger" : st.mood === "warning" ? "warning" : "success", size: "md", uppercase: true }, st.cocok),
        ),
      ),
      // Right: chart
      React.createElement(Card, { pad: "md", style: { display: "flex", flexDirection: "column", gap: 10 } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
          React.createElement("div", { className: "tt-eyebrow" }, "CHART ILUSTRATIF — " + active),
          React.createElement(Badge, { tone: "neutral", size: "sm", uppercase: true }, "bukan data live"),
        ),
        React.createElement("div", { ref: chartRef, style: { flex: 1, minHeight: 240 } }),
      ),
    ),
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   2. REVERSAL TOOL
   User checks which criteria are met → verdict: Reversal / Tidak Pasti / Bear Rally
═══════════════════════════════════════════════════════════════════════════ */
const CRITERIA = [
  {
    id: "level",
    label: "Tembus level kunci",
    desc: "MA50 / MA200 / resistance ditembus dan bertahan",
    weight: 3,
  },
  {
    id: "struktur",
    label: "Struktur harga HH+HL",
    desc: "Higher high & higher low berulang (minimal 2 ayunan)",
    weight: 2,
  },
  {
    id: "volume",
    label: "Volume besar saat naik",
    desc: "Volume naik saat rally, mengecil saat koreksi",
    weight: 2,
  },
  {
    id: "katalis",
    label: "Ada katalis fundamental",
    desc: "Harga komoditas berbalik, aksi korporasi, dll.",
    weight: 1,
  },
  {
    id: "waktu",
    label: "Membangun dasar dengan sabar",
    desc: "Pantulan bertahap, bukan vertikal → langsung jatuh",
    weight: 1,
  },
];
const MAX_SCORE = CRITERIA.reduce((s, c) => s + c.weight, 0);

function ReversalTool() {
  const [checked, setChecked] = useState({});
  const toggle = id => setChecked(p => ({ ...p, [id]: !p[id] }));
  const score = CRITERIA.reduce((s, c) => s + (checked[c.id] ? c.weight : 0), 0);
  const pct = (score / MAX_SCORE) * 100;
  let verdict, vTone, vLabel;
  if (pct >= 70) { verdict = "Kandidat Reversal Sejati"; vTone = "success"; vLabel = "→ Konfirmasi makin kuat"; }
  else if (pct >= 40) { verdict = "Tidak Pasti"; vTone = "warning"; vLabel = "→ Butuh lebih banyak konfirmasi"; }
  else { verdict = "Kemungkinan Bear Rally / Jebakan"; vTone = "danger"; vLabel = "→ Waspadai jebakan"; }

  return React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, height: "100%" } },
    // Left: criteria checklist
    React.createElement(Card, { pad: "lg", style: { display: "flex", flexDirection: "column", gap: 14 } },
      React.createElement("div", { className: "tt-eyebrow", style: { marginBottom: 2 } }, "Lima pembeda — centang yang terpenuhi"),
      CRITERIA.map(c =>
        React.createElement("label", {
          key: c.id,
          onClick: () => toggle(c.id),
          style: {
            display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer",
            padding: "10px 12px", borderRadius: "var(--radius-lg)",
            background: checked[c.id] ? "var(--brand-red-wash)" : "var(--surface-inset)",
            border: "1px solid " + (checked[c.id] ? "var(--brand-red-wash-strong)" : "transparent"),
            transition: "all var(--dur-base) var(--ease-smooth)",
          }
        },
          React.createElement("span", {
            style: {
              width: 20, height: 20, borderRadius: 6, border: "2px solid " + (checked[c.id] ? "var(--brand-red)" : "var(--border-strong)"),
              background: checked[c.id] ? "var(--brand-red)" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "all var(--dur-base) var(--ease-smooth)", marginTop: 1,
            }
          },
            checked[c.id] ? React.createElement("svg", { width: 12, height: 12, viewBox: "0 0 12 12", fill: "none" },
              React.createElement("polyline", { points: "2,6 5,9 10,3", stroke: "#fff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
            ) : null
          ),
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)", lineHeight: 1.3 } }, c.label),
            React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: 2, lineHeight: 1.4 } }, c.desc),
            React.createElement("div", {
              style: { display: "inline-flex", gap: 3, marginTop: 5 }
            },
              Array.from({ length: c.weight }).map((_, i) =>
                React.createElement("span", { key: i, style: { width: 7, height: 7, borderRadius: "50%", background: "var(--brand-red)", opacity: 0.5 } })
              )
            ),
          ),
        )
      ),
    ),
    // Right: verdict
    React.createElement(Card, { pad: "lg", style: { display: "flex", flexDirection: "column", gap: 20, justifyContent: "center" } },
      React.createElement("div", { className: "tt-eyebrow" }, "Skor konviksi reversal"),
      // score bar
      React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 8 } },
          React.createElement("span", { style: { fontSize: "var(--text-3xl)", fontWeight: "var(--weight-black)", fontFamily: "var(--font-mono)", color: pct >= 70 ? "var(--success)" : pct >= 40 ? "var(--warning)" : "var(--danger)" } }, score + "/" + MAX_SCORE),
          React.createElement("span", { style: { fontSize: "var(--text-xl)", fontWeight: "var(--weight-bold)", fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" } }, Math.round(pct) + "%"),
        ),
        React.createElement("div", {
          style: { height: 12, borderRadius: "var(--radius-pill)", background: "var(--surface-inset)", overflow: "hidden" }
        },
          React.createElement("div", {
            style: {
              height: "100%",
              width: pct + "%",
              borderRadius: "var(--radius-pill)",
              background: pct >= 70 ? "var(--success)" : pct >= 40 ? "var(--warning)" : "var(--danger)",
              transition: "width 0.5s var(--ease-smooth), background 0.3s",
            }
          }),
        ),
        // tick marks
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 10, color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" } },
          React.createElement("span", null, "0"),
          React.createElement("span", { style: { color: "var(--warning)", fontWeight: 700 } }, "40%"),
          React.createElement("span", { style: { color: "var(--success)", fontWeight: 700 } }, "70%"),
          React.createElement("span", null, "100%"),
        ),
      ),
      // verdict
      React.createElement("div", {
        style: {
          background: pct >= 70 ? "var(--success-wash)" : pct >= 40 ? "var(--warning-wash)" : "var(--danger-wash)",
          borderRadius: "var(--radius-xl)", padding: "20px 24px",
          border: "1px solid " + (pct >= 70 ? "rgba(16,185,129,.2)" : pct >= 40 ? "rgba(245,158,11,.2)" : "rgba(220,38,38,.2)"),
        }
      },
        React.createElement(Badge, { tone: vTone, size: "md", uppercase: true, style: { marginBottom: 8 } }, vTone === "success" ? "Reversal" : vTone === "warning" ? "Tidak Pasti" : "Hati-hati"),
        React.createElement("div", { style: { fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)", marginTop: 8, lineHeight: 1.3 } }, verdict),
        React.createElement("div", { style: { fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginTop: 6 } }, vLabel),
      ),
      React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-tertiary)", lineHeight: 1.55, padding: "12px 16px", background: "var(--surface-inset)", borderRadius: "var(--radius-lg)" } },
        React.createElement("strong", null, "Ingat:"),
        " Trader matang TIDAK menebak — mereka menunggu konfirmasi, rela melewatkan sebagian awal kenaikan demi kepastian lebih tinggi."
      ),
    ),
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   3. RISK CALCULATOR
   Hitung ukuran posisi berdasar risk amount, entry, stop
═══════════════════════════════════════════════════════════════════════════ */
function RiskCalc() {
  const [modal, setModal] = useState("10000000");
  const [risikoPct, setRisikoPct] = useState("2");
  const [entry, setEntry] = useState("188");
  const [stop, setStop] = useState("178");

  const modalNum = parseFloat(modal.replace(/\./g, "").replace(",", ".")) || 0;
  const riskPctNum = parseFloat(risikoPct) || 0;
  const entryNum = parseFloat(entry) || 0;
  const stopNum = parseFloat(stop) || 0;

  const riskAmount = modalNum * (riskPctNum / 100);
  const slPerShare = entryNum - stopNum;
  const lotSize = slPerShare > 0 ? Math.floor(riskAmount / (slPerShare * 100)) / 100 : 0;
  const shares = Math.round(lotSize * 100) * 100;
  const totalModal = shares * entryNum;
  const maxLoss = shares * slPerShare;
  const riskPctActual = modalNum > 0 ? (maxLoss / modalNum) * 100 : 0;
  const slPct = entryNum > 0 ? (slPerShare / entryNum) * 100 : 0;

  const fmt = n => Math.round(n).toLocaleString("id-ID");
  const inputStyle = {
    background: "var(--surface-inset)",
    border: "1px solid var(--border-subtle)",
    borderRadius: "var(--radius-lg)",
    padding: "10px 14px",
    fontFamily: "var(--font-mono)",
    fontSize: "var(--text-md)",
    fontWeight: 600,
    color: "var(--text-primary)",
    width: "100%",
    outline: "none",
    transition: "border-color var(--dur-base)",
  };
  const fieldStyle = { display: "flex", flexDirection: "column", gap: 5 };
  const labelStyle = { fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.1em" };
  const resultRowStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--border-subtle)" };

  return React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, height: "100%" } },
    // Left: inputs
    React.createElement(Card, { pad: "lg", title: "Parameter posisi", style: { display: "flex", flexDirection: "column", gap: 18 } },
      React.createElement("div", { style: fieldStyle },
        React.createElement("div", { style: labelStyle }, "Modal total (Rp)"),
        React.createElement("input", {
          style: inputStyle, value: modal, type: "text",
          onChange: e => setModal(e.target.value),
          onFocus: e => e.target.style.borderColor = "var(--brand-red)",
          onBlur: e => e.target.style.borderColor = "var(--border-subtle)",
          placeholder: "10.000.000"
        }),
      ),
      React.createElement("div", { style: fieldStyle },
        React.createElement("div", { style: labelStyle }, "Risiko maksimal (% modal)"),
        React.createElement("div", { style: { display: "flex", gap: 8 } },
          ["1", "2", "3", "5"].map(v =>
            React.createElement("button", {
              key: v,
              onClick: () => setRisikoPct(v),
              style: {
                flex: 1, padding: "8px 0", borderRadius: "var(--radius-pill)",
                border: "1px solid " + (risikoPct === v ? "var(--brand-red)" : "var(--border-subtle)"),
                background: risikoPct === v ? "var(--brand-red-wash)" : "var(--surface-inset)",
                color: risikoPct === v ? "var(--brand-red)" : "var(--text-secondary)",
                fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "var(--text-sm)", cursor: "pointer",
                transition: "all var(--dur-base)",
              }
            }, v + "%")
          )
        ),
      ),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } },
        React.createElement("div", { style: fieldStyle },
          React.createElement("div", { style: labelStyle }, "Harga entry (Rp)"),
          React.createElement("input", {
            style: inputStyle, value: entry, type: "number",
            onChange: e => setEntry(e.target.value),
            onFocus: e => e.target.style.borderColor = "var(--brand-red)",
            onBlur: e => e.target.style.borderColor = "var(--border-subtle)",
          }),
        ),
        React.createElement("div", { style: fieldStyle },
          React.createElement("div", { style: labelStyle }, "Harga stop-loss (Rp)"),
          React.createElement("input", {
            style: inputStyle, value: stop, type: "number",
            onChange: e => setStop(e.target.value),
            onFocus: e => e.target.style.borderColor = "var(--brand-red)",
            onBlur: e => e.target.style.borderColor = "var(--border-subtle)",
          }),
        ),
      ),
      React.createElement("div", { style: { padding: "10px 14px", background: "var(--surface-inset)", borderRadius: "var(--radius-lg)", display: "flex", justifyContent: "space-between" } },
        React.createElement("span", { style: { fontSize: "var(--text-sm)", color: "var(--text-secondary)" } }, "Jarak stop-loss"),
        React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--danger)" } }, slPerShare > 0 ? `Rp ${slPerShare} (${slPct.toFixed(1)}%)` : "—"),
      ),
    ),
    // Right: result
    React.createElement(Card, { pad: "lg", title: "Hasil perhitungan", style: { display: "flex", flexDirection: "column", gap: 0 } },
      [
        { label: "Risiko dalam rupiah", val: "Rp " + fmt(riskAmount), note: `${riskPctNum}% modal`, color: "var(--text-primary)" },
        { label: "Ukuran posisi (lot)", val: lotSize > 0 ? lotSize.toFixed(2) + " lot" : "0 lot", note: `${fmt(shares)} lembar`, color: "var(--brand-red)", large: true },
        { label: "Total modal terpakai", val: "Rp " + fmt(totalModal), note: `${(totalModal / modalNum * 100).toFixed(1)}% dari modal`, color: "var(--text-primary)" },
        { label: "Maksimum kerugian", val: maxLoss > 0 ? "Rp " + fmt(maxLoss) : "—", note: `${riskPctActual.toFixed(2)}% modal`, color: "var(--danger)" },
      ].map((r, i) =>
        React.createElement("div", { key: i, style: { ...resultRowStyle, paddingBottom: 14, marginBottom: 12 } },
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-tertiary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" } }, r.label),
            r.note && React.createElement("div", { style: { fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: 2 } }, r.note),
          ),
          React.createElement("div", { style: { fontFamily: "var(--font-mono)", fontWeight: r.large ? 900 : 700, fontSize: r.large ? "var(--text-2xl)" : "var(--text-lg)", color: r.color } }, r.val),
        )
      ),
      React.createElement("div", { style: { marginTop: "auto", padding: "12px 16px", background: "var(--surface-inset)", borderRadius: "var(--radius-lg)", fontSize: "var(--text-xs)", color: "var(--text-tertiary)", lineHeight: 1.55 } },
        React.createElement("strong", { style: { color: "var(--text-secondary)" } }, "Rumus: "),
        "Ukuran posisi = Risiko Rp ÷ (Entry − Stop) ÷ 100 lembar per lot. ",
        React.createElement("strong", { style: { color: "var(--danger)" } }, "Bukan saran investasi. "),
        "Selalu gunakan manajemen risiko ketat."
      ),
    ),
  );
}

/* ── mount ─────────────────────────────────────────────────────────────── */
window.addEventListener("DOMContentLoaded", () => {
  const stock = document.getElementById("widget-stocks");
  if (stock) ReactDOM.createRoot(stock).render(React.createElement(StockTabs));

  const rev = document.getElementById("widget-reversal");
  if (rev) ReactDOM.createRoot(rev).render(React.createElement(ReversalTool));

  const calc = document.getElementById("widget-calc");
  if (calc) ReactDOM.createRoot(calc).render(React.createElement(RiskCalc));
});
