export const SECTIONS = [
  { id: "8.1", label: "8.1 Sequences", color: "#6366f1" },
  { id: "8.2", label: "8.2 Series Intro", color: "#f97316" },
  { id: "8.3", label: "8.3 More Tests", color: "#3b82f6" },
  { id: "8.4", label: "8.4 All Tests + Abs/Cond", color: "#ec4899" },
  { id: "8.5", label: "8.5 Power Series", color: "#10b981" },
  { id: "8.6", label: "8.6 Functions→Power Series", color: "#eab308" },
  { id: "8.7", label: "8.7 Taylor & Maclaurin", color: "#8b5cf6" },
  { id: "exam", label: "🎯 Exam Problems", color: "#ef4444" },
];

export const KEY_FORMULAS = [
  { name: "1/(1−x)", f: "Σ xⁿ = 1 + x + x² + ...", detail: "Geometric series. Valid for |x| < 1.", color: "#3b82f6" },
  { name: "eˣ", f: "Σ xⁿ/n! = 1 + x + x²/2! + ...", detail: "Valid for all x ∈ (−∞,∞).", color: "#8b5cf6" },
  { name: "sin x", f: "Σ (−1)ⁿx^(2n+1)/(2n+1)!", detail: "= x − x³/6 + x⁵/120 − ... All x.", color: "#6366f1" },
  { name: "cos x", f: "Σ (−1)ⁿx^(2n)/(2n)!", detail: "= 1 − x²/2 + x⁴/24 − ... All x.", color: "#6366f1" },
  { name: "ln(1+x)", f: "Σ (−1)^(n−1)xⁿ/n", detail: "= x − x²/2 + x³/3 − ... Valid for −1 < x ≤ 1.", color: "#10b981" },
  { name: "arctan x", f: "Σ (−1)ⁿx^(2n+1)/(2n+1)", detail: "= x − x³/3 + x⁵/5 − ... Valid for |x| ≤ 1.", color: "#ec4899" },
  { name: "p-series", f: "Σ 1/nᵖ", detail: "Converges if p > 1. Diverges if p ≤ 1.", color: "#64748b" },
  { name: "Geometric Σ", f: "Σ arⁿ = a/(1−r)", detail: "Converges iff |r| < 1. Sum = a/(1−r).", color: "#f97316" },
];

export const DECISION_TREE = [
  { step: "1. Divergence Test", desc: "If aₙ ↛ 0, series DIVERGES instantly. Always check first.", color: "#ef4444", example: "Σ cos(1/n): cos(1/n)→1≠0. Diverges." },
  { step: "2. Recognize Form", desc: "Geometric (Σarⁿ)? p-series (Σ1/nᵖ)? Telescoping? Apply directly.", color: "#f97316", example: "Σ(2/3)ⁿ = geometric r=2/3. Σ 1/n² = p-series p=2." },
  { step: "3. Comparison Tests", desc: "Looks like p-series or geometric? Limit Comparison (LCT) or Direct Comparison (DCT).", color: "#3b82f6", example: "Σ(n²+1)/(n³+√n) ~ 1/n. LCT with 1/n → diverges." },
  { step: "4. Ratio Test", desc: "Contains factorials, products, or exponentials. Best when terms simplify by cancellation.", color: "#8b5cf6", example: "Σ n²/7ⁿ: ratio → 1/7 < 1. Converges." },
  { step: "5. Root Test", desc: "Term is raised to the nth power: (bₙ)ⁿ. Take nth root and evaluate.", color: "#6366f1", example: "Σ(n/(3n+4))ⁿ: root → 1/3 < 1. Converges." },
  { step: "6. Integral Test", desc: "f(x) is positive, decreasing, continuous, and easy to integrate.", color: "#10b981", example: "Σ 1/(n ln n): ∫ dx/(x ln x) = ln(ln x) → ∞. Diverges." },
  { step: "7. Alternating (AST)", desc: "Σ(−1)ⁿbₙ converges if bₙ decreasing → 0. Then check if absolutely convergent.", color: "#ec4899", example: "Σ(−1)ⁿ/n: AST→converges, but Σ1/n diverges → conditional." },
];

export const CONCEPTS = [
  {
    id: "seq-basics",
    title: "Sequences 101",
    color: "#6366f1",
    section: "8.1",
    body: `A sequence {aₙ} converges if lim_{n→∞} aₙ = L (a finite number).

KEY LIMITS TO MEMORIZE:
• lim rⁿ = 0 if |r| < 1 (geometric decay)
• lim rⁿ = 1 if r = 1
• lim rⁿ = ∞ if r > 1 (diverges)
• lim rⁿ = DNE if r ≤ −1 (diverges)
• lim n^(1/n) = 1
• lim (1 + r/n)ⁿ = eʳ  ← very important
• lim n!/nⁿ = 0
• lim (ln n)/n = 0

SQUEEZE THEOREM: If aₙ ≤ cₙ ≤ bₙ and aₙ, bₙ → L, then cₙ → L.
Use for: |cos(n)/√n| ≤ 1/√n → 0.`,
  },
  {
    id: "geometric",
    title: "Geometric Series",
    color: "#f97316",
    section: "8.2",
    body: `Σₙ₌₀∞ arⁿ = a/(1−r) if |r| < 1, DIVERGES if |r| ≥ 1.

IDENTIFYING r:
• Σ (2/3)ⁿ → r = 2/3, a = 1
• Σ 5·(0.4)ⁿ → r = 0.4, a = 5
• Σ (−4/3)ⁿ → r = −4/3, |r|>1 → diverges
• Σ 2^(n+1)/3^(n+2) → rewrite: (2·2ⁿ)/(9·3ⁿ) = (2/9)·(2/3)ⁿ → r = 2/3, a = 2/9

STARTING INDEX MATTERS:
Σₙ₌₂∞ arⁿ = ar²/(1−r)  (first term when n=2 is ar²)

REPEATING DECIMALS:
0.ababab... = ab/99 (2-digit repeat)
0.aababab... differs — use the algebra trick.`,
  },
  {
    id: "comparison",
    title: "LCT vs DCT",
    color: "#3b82f6",
    section: "8.3",
    body: `LIMIT COMPARISON TEST (LCT):
lim aₙ/bₙ = c where 0 < c < ∞
→ both series converge or both diverge.

When to use: aₙ looks like a simpler bₙ asymptotically.
Key step: keep only DOMINANT POWERS in num/denom.

LCT EXAMPLES:
• (n²+1)/(n⁵+n) ~ 1/n³ → converges (p=3)
• 1/(n+√n) ~ 1/n → diverges (harmonic)
• sin(1/n) ~ 1/n → diverges (use lim sin(t)/t=1)

DIRECT COMPARISON TEST (DCT):
0 ≤ aₙ ≤ bₙ: if Σbₙ converges → Σaₙ converges.
aₙ ≥ bₙ ≥ 0: if Σbₙ diverges → Σaₙ diverges.

DCT EXAMPLES:
• sin²n/n² ≤ 1/n² → converges (p=2)
• 1/ln n > 1/n → diverges (compare to harmonic)`,
  },
  {
    id: "alternating",
    title: "Alternating Series",
    color: "#ec4899",
    section: "8.4",
    body: `ALTERNATING SERIES TEST (AST):
Σ(−1)ⁿbₙ converges if:
  1. bₙ > 0 for all n
  2. bₙ is eventually decreasing
  3. lim bₙ = 0
(All three conditions needed!)

ERROR BOUND:
|S − Sₙ| ≤ bₙ₊₁ (the first omitted term)
Set bₙ₊₁ < tolerance, solve for n.

CLASSIFICATION:
• ABSOLUTELY convergent: Σ|aₙ| converges
• CONDITIONALLY convergent: Σaₙ converges but Σ|aₙ| diverges
• DIVERGENT: neither

PROCESS:
1. Check AST → series converges?
2. Check Σ|aₙ| (remove (−1)ⁿ, test what's left)
3. If Σ|aₙ| converges → ABSOLUTE
   If Σ|aₙ| diverges → CONDITIONAL`,
  },
  {
    id: "power-series",
    title: "Power Series & R",
    color: "#10b981",
    section: "8.5",
    body: `A power series: Σ cₙ(x−a)ⁿ centered at a.

FINDING RADIUS R (use Ratio Test):
Compute L = lim |aₙ₊₁/aₙ|. Converges when L < 1.
Solve for |x−a| < R.

THEN CHECK ENDPOINTS:
Substitute x = a+R and x = a−R separately.
Each endpoint may converge or diverge — test with AST, p-series, etc.
Interval can be: (a−R,a+R), [a−R,a+R), (a−R,a+R], or [a−R,a+R].

COMMON RESULTS:
• Factorial denominator (2n)! → R = ∞
• nⁿ in denominator → R = 0 (only converges at center)
• Ratio gives |x−a|/R < 1 → R is the constant

SUBSTITUTION RULE:
If Σcₙxⁿ has radius R, then Σcₙ(x^k)ⁿ has radius R^(1/k).`,
  },
  {
    id: "maclaurin",
    title: "Maclaurin Series Toolkit",
    color: "#8b5cf6",
    section: "8.7",
    body: `THE 4 OPERATIONS ON POWER SERIES:

1. SUBSTITUTE: Replace x with expression.
   e^(−x²): substitute x→−x² in eˣ series.
   ln(1+x⁴): substitute x→x⁴ in ln(1+x) series.

2. MULTIPLY BY xⁿ: shifts all exponents.
   x·eˣ = Σ xⁿ⁺¹/n!

3. DIFFERENTIATE term-by-term (same R).
   d/dx[1/(1−x)] = 1/(1−x)² = Σ nxⁿ⁻¹

4. INTEGRATE term-by-term (same R).
   ∫ 1/(1+x²) dx = arctan x = Σ (−1)ⁿx^(2n+1)/(2n+1)

TAYLOR AT a≠0:
f(x) = Σ f⁽ⁿ⁾(a)(x−a)ⁿ/n!
For eˣ at a=2: all f⁽ⁿ⁾(2) = e², so = e²·Σ(x−2)ⁿ/n!

LIMITS VIA SERIES:
Expand numerator and denominator, cancel x^k, take limit.
lim (1−cos x)/(1+x−eˣ): 
  num = x²/2−..., denom = −x²/2−... → −1`,
  },
];

export const ALL_PROBLEMS = {
  "8.1": [
    { id: "8.1.1", q: "Find explicit formula for {1, −1/3, 1/9, −1/27, 1/81, ...} (n starts at 1).", concept: "Alternating geometric sequences", sol: "Each term multiplied by −1/3. First term = 1.\n\naₙ = (−1/3)ⁿ⁻¹ = (−1)ⁿ⁻¹ · (1/3)ⁿ⁻¹", rule: "Alternating geometric: spot the sign pattern first, then the magnitude pattern.", ans: "aₙ = (−1/3)ⁿ⁻¹" },
    { id: "8.1.2a", q: "Find limit of {n/(4n⁴+1)}. Monotone? Bounded?", concept: "Rational sequence limits", sol: "lim n/(4n⁴+1) = lim 1/(4n³) = 0\n\nDecreasing: f'(x) < 0 for large x.\nBounded: 0 < aₙ ≤ 1/5.", rule: "Divide by highest power. n/n⁴ = 1/n³ → 0.", ans: "Limit = 0; decreasing; bounded" },
    { id: "8.1.2b", q: "Find limit of {cos(n)/√n}. Monotone? Bounded?", concept: "Squeeze Theorem", sol: "−1/√n ≤ cos(n)/√n ≤ 1/√n.\nBoth bounds → 0 → Squeeze: limit = 0.\n\nNot monotone (cos oscillates). Bounded.", rule: "Squeeze: −bₙ ≤ aₙ ≤ bₙ and bₙ→0 ⟹ aₙ→0.", ans: "Limit = 0; not monotone; bounded" },
    { id: "8.1.3", q: "Is aₙ = n!/nⁿ convergent?", concept: "Squeeze / ratio for factorials", sol: "n!/nⁿ = (1/n)(2/n)···(n/n) ≤ 1/n → 0.\nAlso aₙ > 0. By Squeeze → 0.\n\nAlternately: ratio aₙ₊₁/aₙ = (n/(n+1))ⁿ → 1/e < 1.", rule: "n!/nⁿ → 0. Classic result — remember it.", ans: "Yes, converges to 0" },
    { id: "8.1.4", q: "For what values of r is {rⁿ} convergent? What does it converge to?", concept: "Geometric sequence convergence", sol: "r > 1: diverges (→∞)\nr = 1: converges to 1\n−1 < r < 1: converges to 0\nr = −1: diverges (alternates)\nr < −1: diverges (blows up)", rule: "Converges iff −1 < r ≤ 1. Memorize this table!", ans: "Converges for −1 < r ≤ 1" },
    { id: "8.1.5", q: "Find aₙ:\n(a) {1,4,9,16,...}\n(b) {1/2,1/5,1/8,1/11,...}\n(c) {1/2,1/4,1/8,1/16,...}\n(d) {−3/2,5/4,−7/8,9/16,...}\n(e) {0,2,0,2,...}\n(f) {1,4/7,6/12,8/17,10/22,...}\n(g) {5/3,8/9,11/27,14/81,...}", concept: "Pattern recognition", sol: "(a) n²\n(b) 1/(3n−1)  [denominators: 2,5,8,11 = 3n−1]\n(c) (1/2)ⁿ\n(d) (−1)ⁿ(2n+1)/2ⁿ  [num: 3,5,7,9; den: 2,4,8,16]\n(e) 1−(−1)ⁿ\n(f) 2n/(5n−3)  [num: 2n; den: 5n−3]\n(g) (3n+2)/3ⁿ  [num: 3n+2; den: 3ⁿ]", rule: "Check: signs → (−1)ⁿ or (−1)^(n−1). Numerators/denominators: arithmetic or geometric?", ans: "See each part above" },
    { id: "8.1.8a", q: "Find limit: n·e^(7/n)", concept: "Exponential behavior", sol: "e^(7/n) → e⁰ = 1 as n→∞.\nBut n → ∞, so n·e^(7/n) → n·1 = ∞.\n\nDIVERGES.", rule: "Check if both factors go to finite limits. n→∞ dominates.", ans: "Diverges (limit = ∞)" },
    { id: "8.1.8b", q: "Find limit: (1 + 6/n)ⁿ", concept: "Classic exponential limit", sol: "Let L = lim n·ln(1+6/n).\nSet t = 6/n → 0: lim (6/t)·ln(1+t) = 6.\n(L'Hôpital: lim ln(1+t)/t = 1)\nSo limit = e⁶.", rule: "(1+r/n)ⁿ → eʳ. Must-know!", ans: "e⁶" },
  ],
  "8.2": [
    { id: "8.2.trap", q: "I. aₙ=1/n  II. {1,−4/3,16/9,...}  III. cₙ=(−1)ⁿcos(π/n)\nWhich SEQUENCES converge? Which SERIES converge?", concept: "The big trap: sequence ≠ series", sol: "SEQUENCES:\nI: 1/n→0 ✓\nII: |r|=4/3>1 ✗\nIII: oscillates between ±cos(π/n)→±1 ✗\n\nSERIES:\nI: Σ1/n harmonic ✗\nII: geometric |r|>1 ✗\nIII: terms→±1≠0, div. test ✗\n\nTRAP: Sequence I converges, Series I diverges!", rule: "aₙ→0 is NECESSARY but NOT SUFFICIENT for Σaₙ to converge.", ans: "Sequences: I only. Series: none." },
    { id: "8.2.geo1", q: "Find sum: Σ(3/7)ⁿ from n=2", concept: "Geometric series sum", sol: "First term = (3/7)² = 9/49. Ratio r = 3/7.\nSum = first term/(1−r) = (9/49)/(4/7) = 9/28.", rule: "When starting at n=k, first term is ar^k.", ans: "9/28" },
    { id: "8.2.geo2", q: "Find sum: Σ₀∞ 5·2^(n+1)/3^(n+2)", concept: "Rewriting to standard geometric form", sol: "= 5·2·2ⁿ/(9·3ⁿ) = (10/9)·(2/3)ⁿ\nΣ = (10/9)·1/(1−2/3) = (10/9)·3 = 10/3", rule: "Factor constants to isolate (r)ⁿ form.", ans: "10/3" },
    { id: "8.2.tele", q: "Find sum: Σ 2/(n²−1) from n=3", concept: "Telescoping via partial fractions", sol: "2/(n²−1) = 1/(n−1) − 1/(n+1)\nSₙ telescopes to 1/2+1/3 − 1/n − 1/(n+1)\n→ 1/2+1/3 = 5/6", rule: "Partial fractions + telescoping: write terms and watch what cancels.", ans: "5/6" },
    { id: "8.2.div", q: "Does Σ tan(n) converge?", concept: "Divergence Test", sol: "tan(n) oscillates and does NOT→0.\nDivergence Test: DIVERGES.", rule: "Always try Divergence Test first!", ans: "Diverges" },
    { id: "8.2.ball", q: "Ball dropped from 6ft, bounces to 1/2 previous height. Total distance?", concept: "Geometric series application", sol: "Total = 6 + 2(3+3/2+3/4+...)\n= 6 + 2·3/(1−1/2)\n= 6 + 12 = 18 ft", rule: "Factor out 2 (up+down), apply geometric sum.", ans: "18 feet" },
    { id: "8.2.dec1", q: "Express 1.035353535... as fraction.", concept: "Repeating decimal → fraction", sol: "Let x = 1.0353535...\n1000x = 1035.3535...\n10x   =   10.3535...\n990x = 1025\nx = 1025/990 = 205/198", rule: "Multiply by 10^(total digits) and 10^(non-repeating). Subtract.", ans: "205/198" },
    { id: "8.2.tele2a", q: "Does Σ ln(n/(n+1)) converge?", concept: "Telescoping divergence", sol: "ln(n/(n+1)) = ln n − ln(n+1)\nSₙ = ln 1 − ln(n+1) = −ln(n+1) → −∞\nDIVERGES.", rule: "Even telescoping can diverge if the surviving terms go to ±∞.", ans: "Diverges" },
    { id: "8.2.tele2b", q: "Find sum: Σ 2/(n²+4n+3) from n=1", concept: "Telescoping via partial fractions", sol: "n²+4n+3 = (n+1)(n+3)\n2/[(n+1)(n+3)] = 1/(n+1) − 1/(n+3)\nSₙ = 1/2+1/3 − 1/(n+2) − 1/(n+3) → 5/6", rule: "Factor denominator, partial fractions, telescope.", ans: "5/6" },
  ],
  "8.3": [
    { id: "8.3.1a", q: "Σ (n²+n+1)/(n⁵+n+1) from n=2", concept: "LCT with p-series", sol: "~ n²/n⁵ = 1/n³. LCT with 1/n³:\nlim ratio = 1 (finite, nonzero).\nΣ1/n³ converges (p=3). CONVERGES.", rule: "LCT: identify dominant powers, form ratio, check limit.", ans: "Converges (LCT, p=3)" },
    { id: "8.3.1b", q: "Σ (2ⁿ−n)/3ⁿ from n=2", concept: "Split series", sol: "= Σ(2/3)ⁿ − Σn/3ⁿ\nBoth converge (geometric r=2/3; ratio test 1/3).\nCONVERGES.", rule: "Split only if BOTH pieces converge independently.", ans: "Converges" },
    { id: "8.3.1c", q: "Σ sin(1/n) from n=1", concept: "LCT using trig limit", sol: "lim sin(1/n)/(1/n) = lim sin(t)/t = 1.\nLCT with 1/n. Σ1/n diverges. DIVERGES.", rule: "sin(1/n) ~ 1/n for large n. Classic!", ans: "Diverges (LCT with 1/n)" },
    { id: "8.3.1d", q: "Σ cos(1/n) from n=1", concept: "Divergence Test", sol: "cos(1/n) → cos(0) = 1 ≠ 0.\nDivergence Test: DIVERGES.", rule: "cos(1/n)→1 ≠ 0. Don't confuse with sin(1/n)→0.", ans: "Diverges (Div. Test)" },
    { id: "8.3.2a", q: "Σ (n²−1)/(3n⁴+1) from n=1", concept: "LCT", sol: "~ n²/3n⁴ = 1/(3n²). LCT with 1/n²:\nlim ratio = 1/3. Σ1/n² converges. CONVERGES.", rule: "Constant factor in limit is fine — only need 0 < L < ∞.", ans: "Converges (LCT, p=2)" },
    { id: "8.3.2b", q: "Σ 3/√(2n−2) from n=2", concept: "LCT, divergent p-series", sol: "~ 3/√(2n) ~ C/n^(1/2). LCT with 1/√n:\nlim ratio = 3/√2. Σ1/√n diverges (p=1/2). DIVERGES.", rule: "p=1/2 < 1 → diverges. √n = n^(1/2).", ans: "Diverges (p=1/2)" },
    { id: "8.3.2c", q: "Σ 1/(n ln n) from n=2", concept: "Integral Test", sol: "∫ dx/(x ln x) = ln(ln x) → ∞. DIVERGES.", rule: "1/(n ln n) diverges. 1/(n(ln n)²) converges. Exponent matters!", ans: "Diverges (Integral Test)" },
    { id: "8.3.2d", q: "Σ sin²(n)/n² from n=2", concept: "Direct Comparison Test", sol: "0 ≤ sin²n ≤ 1 → sin²n/n² ≤ 1/n².\nΣ1/n² converges (p=2). DCT: CONVERGES.", rule: "Bounded oscillating term? DCT with the pure power series.", ans: "Converges (DCT)" },
    { id: "8.3.3", q: "For what p does Σ 1/(n(ln n)ᵖ) converge? (n≥2)", concept: "Integral Test with parameter", sol: "∫ dx/(x(ln x)ᵖ) = ∫ du/uᵖ (u=ln x)\np≠1: u^(1−p)/(1−p). Converges at ∞ iff p>1.\np=1: ln u → ∞. Diverges.\nConverges for p > 1.", rule: "Log p-series: same threshold p>1 as regular p-series.", ans: "Converges for p > 1" },
  ],
  "8.4": [
    { id: "8.4.1a", q: "Σ 5/√(n²+2) from n=2", concept: "LCT, divergent", sol: "5/√(n²+2) ~ 5/n. LCT with 1/n: limit=5.\nΣ1/n diverges. DIVERGES.", rule: "√(n²+c) ~ n. Don't let the square root trick you.", ans: "Diverges" },
    { id: "8.4.1b", q: "Σ (n−2)/(n·9ⁿ) from n=3", concept: "Ratio Test", sol: "Ratio: n(n−1)/[9(n+1)(n−2)] → 1/9 < 1.\nCONVERGES.", rule: "Exponential in denominator → try Ratio Test.", ans: "Converges (Ratio, L=1/9)" },
    { id: "8.4.1c", q: "Σ n²/7ⁿ from n=1", concept: "Ratio Test", sol: "(n+1)²/7^(n+1) · 7ⁿ/n² = (n+1)²/(7n²) → 1/7 < 1.\nCONVERGES.", rule: "Polynomial × exponential: ratio test gives |base| as L.", ans: "Converges (Ratio, L=1/7)" },
    { id: "8.4.1d", q: "5/6 − 5/8 + 5/10 − 5/12 + ... Converge?", concept: "AST + conditional", sol: "Σ(−1)^(n+1)·5/(2n+4). bₙ=5/(2n+4)→0, decreasing. AST: converges.\nAbsolute: Σ5/(2n+4)~Σ1/n diverges.\nCONDITIONALLY CONVERGENT.", rule: "AST passes → converges. Check absolute separately.", ans: "Conditionally convergent" },
    { id: "8.4.2a", q: "Σ (−1)ⁿ·[1·3·5···(2n−1)]/2ⁿ", concept: "Divergence Test on alternating", sol: "Ratio of |terms|: (2n+1)/2 → ∞.\nTerms grow → don't → 0. DIVERGES.", rule: "AST fails if terms don't→0. Check Divergence Test first!", ans: "Diverges" },
    { id: "8.4.2b", q: "Σ (−1)ⁿ/ln n from n=2", concept: "AST + conditional", sol: "AST: 1/ln n → 0, decreasing. Converges.\nAbsolute: 1/ln n > 1/n → DCT with 1/n → diverges.\nCONDITIONALLY CONVERGENT.", rule: "1/ln n > 1/n because ln n < n.", ans: "Conditionally convergent" },
    { id: "8.4.3b", q: "How many terms for |error| < 10⁻⁶ in Σ(−1)ⁿ/n²?", concept: "AST error bound", sol: "Error ≤ b_{n+1} = 1/(n+1)²\n1/(n+1)² < 10⁻⁶\n(n+1)² > 10⁶\nn+1 > 1000 → n ≥ 1000", rule: "Error ≤ first omitted term. Solve: b_{n+1} < tolerance.", ans: "n ≥ 1000 terms" },
    { id: "8.4.4a", q: "Σ (−1)^(n+1)/√(n+3)", concept: "Conditional convergence", sol: "AST: 1/√(n+3)→0, decreasing. Converges.\nAbsolute: ~1/√n, p=1/2<1. Diverges.\nCONDITIONALLY CONVERGENT.", ans: "Conditionally convergent" },
    { id: "8.4.4c", q: "Σ (−1)^(n+1)/(n+5ⁿ)", concept: "Absolute convergence via DCT", sol: "1/(n+5ⁿ) < 1/5ⁿ.\nΣ(1/5)ⁿ geometric converges.\nABSOLUTELY CONVERGENT.", rule: "Exponential in denominator → compare to geometric.", ans: "Absolutely convergent" },
    { id: "8.4.4d", q: "Σ (4+3ⁿ)/2ⁿ", concept: "Split, detect divergent part", sol: "= Σ4/2ⁿ + Σ(3/2)ⁿ.\nSecond: r=3/2>1. DIVERGES.", ans: "Diverges" },
    { id: "8.4.4e", q: "Σ (1+1/n)^(n²)", concept: "Divergence Test", sol: "(1+1/n)^(n²) = [(1+1/n)ⁿ]ⁿ → eⁿ → ∞.\nDivergence Test: DIVERGES.", rule: "(1+1/n)^n → e, so raised to n power → eⁿ → ∞.", ans: "Diverges" },
    { id: "8.4.4g", q: "Σ (1+sin n)/10ⁿ", concept: "DCT with geometric", sol: "0 ≤ 1+sin n ≤ 2, so ≤ 2/10ⁿ.\nΣ2/10ⁿ converges. DCT: CONVERGES.", ans: "Absolutely convergent" },
    { id: "8.4.4h", q: "Σ (−1)ⁿ(2n−1)/(5n+1)", concept: "Divergence Test", sol: "(2n−1)/(5n+1) → 2/5 ≠ 0. DIVERGES.", ans: "Diverges" },
    { id: "8.4.6", q: "Prove Σ(−1)ⁿ/n! converges — two ways.", concept: "Two tests on one series", sol: "Method 1 (Ratio): |a_{n+1}/aₙ| = 1/(n+1)→0<1. Absolutely convergent.\nMethod 2 (AST): bₙ=1/n!>0, decreasing→0. Converges by AST.", rule: "Ratio test is usually cleaner for factorials.", ans: "Converges (both methods)" },
  ],
  "8.5": [
    { id: "8.5.1a", q: "R and interval: Σ 6ⁿ(x+5)ⁿ/√n", concept: "Ratio Test → endpoints", sol: "Ratio: 6|x+5|·√(n/(n+1)) → 6|x+5|.\nNeed < 1: |x+5| < 1/6. R = 1/6, center = −5.\n\nEndpoints:\nx=−31/6: Σ(−1)ⁿ/√n → AST converges ✓\nx=−29/6: Σ1/√n → p=1/2 diverges ✗\nInterval: [−31/6, −29/6)", rule: "Always check BOTH endpoints after finding R.", ans: "R = 1/6, I = [−31/6, −29/6)" },
    { id: "8.5.1b", q: "R and interval: Σ (−1)ⁿx^(6n)/(2n)!", concept: "Factorial → R=∞", sol: "Ratio: |x|⁶/[(2n+2)(2n+1)] → 0 for all x.\nR = ∞. Converges for all x.", rule: "Factorial denominator always → R=∞.", ans: "R = ∞, I = (−∞, ∞)" },
    { id: "8.5.1c", q: "R and interval: Σ xⁿ/7^(n+1) from n=0", concept: "Geometric power series", sol: "= (1/7)Σ(x/7)ⁿ. Geometric r = x/7.\n|x/7| < 1 → |x| < 7. R = 7.\nEndpoints ±7: Σ(±1)ⁿ diverges.\nInterval: (−7, 7).", ans: "R = 7, I = (−7, 7)" },
    { id: "8.5.1d", q: "R and interval: Σ x^(2n+1)/(3ⁿ·n²) from n=1", concept: "x² in ratio", sol: "Ratio: x²·n²/[3(n+1)²] → x²/3.\nNeed x²/3 < 1 → |x| < √3. R = √3.\nEndpoints ±√3: Σ(±√3)^(2n+1)/(3ⁿn²) = ±√3·Σ1/n² converges.\nInterval: [−√3, √3].", ans: "R = √3, I = [−√3, √3]" },
    { id: "8.5.2", q: "If ΣCₙxⁿ has radius R, what is R for ΣCₙx^(7n)?", concept: "Substitution effect on R", sol: "Let u=x⁷. ΣCₙuⁿ has R.\n|u|<R → |x⁷|<R → |x|<R^(1/7).\nNew R = R^(1/7).", rule: "Substituting x→xᵏ: R_new = R^(1/k).", ans: "R^(1/7)" },
  ],
  "8.6": [
    { id: "8.6.1a", q: "Power series for 1/(1−x³), centered at 0", concept: "Direct substitution into geometric", sol: "1/(1−t) = Σtⁿ. Set t=x³:\n1/(1−x³) = Σ x^(3n), |x|<1.", rule: "1/(1−[expr]) = Σ[expr]ⁿ. Identify what plays role of t.", ans: "Σ x^(3n), |x|<1" },
    { id: "8.6.1b", q: "Power series for 1/(2−5x), centered at 0", concept: "Factor to match 1/(1−t)", sol: "= (1/2)·1/(1−5x/2)\nSet t=5x/2:\n= (1/2)Σ(5x/2)ⁿ = Σ 5ⁿxⁿ/2^(n+1)\nConverges |x|<2/5.", rule: "Factor the constant first! 1/(2−5x) = (1/2)·1/(1−5x/2).", ans: "Σ 5ⁿxⁿ/2^(n+1), |x|<2/5" },
    { id: "8.6.1c", q: "Power series for 1/(1−x)³, centered at 0", concept: "Differentiate twice", sol: "1/(1−x) = Σxⁿ\nd/dx: 1/(1−x)² = Σnxⁿ⁻¹\nd/dx: 2/(1−x)³ = Σn(n−1)xⁿ⁻²\nDivide by 2: 1/(1−x)³ = (1/2)Σₙ≥₂ n(n−1)xⁿ⁻²\n= (1/2)Σₙ≥₀(n+2)(n+1)xⁿ", rule: "Differentiate term by term. Re-index to start from n=0.", ans: "(1/2)Σₙ₌₀ (n+2)(n+1)xⁿ" },
    { id: "8.6.1d", q: "Power series for arctan x, centered at 0", concept: "Integrate 1/(1+x²)", sol: "1/(1+x²) = Σ(−x²)ⁿ = Σ(−1)ⁿx^(2n)\narctan x = ∫₀ˣ ... = Σ(−1)ⁿx^(2n+1)/(2n+1)\nConverges on [−1,1].", rule: "arctan x = Σ(−1)ⁿx^(2n+1)/(2n+1). MEMORIZE!", ans: "Σ(−1)ⁿx^(2n+1)/(2n+1), I=[−1,1]" },
    { id: "8.6.int", q: "∫ 1/(1+x⁷) dx as power series", concept: "Integrate geometric", sol: "1/(1+x⁷) = Σ(−1)ⁿx^(7n)\n∫ = Σ(−1)ⁿx^(7n+1)/(7n+1) + C", rule: "∫cxⁿdx = cxⁿ⁺¹/(n+1). Don't forget +C!", ans: "Σ(−1)ⁿx^(7n+1)/(7n+1) + C" },
    { id: "8.6.deriv", q: "f(x) = Σxⁿ/n!. Find f'(x) as Σcₙxⁿ.", concept: "Differentiate power series", sol: "f'(x) = Σ nxⁿ⁻¹/n! = Σ xⁿ⁻¹/(n−1)!\nRe-index (m=n−1): = Σₘ₌₀ xᵐ/m!\nSo f'(x) = f(x) = Σxⁿ/n!  (this is eˣ!)", rule: "eˣ is its own derivative, verified via power series!", ans: "f'(x) = Σxⁿ/n! (same as f)" },
  ],
  "8.7": [
    { id: "8.7.1a", q: "Power series for 2eˣ + e^(4x), centered at 0", concept: "Maclaurin for eˣ", sol: "eˣ = Σxⁿ/n!, e^(4x) = Σ4ⁿxⁿ/n!\n2eˣ+e^(4x) = Σ(2+4ⁿ)xⁿ/n!", rule: "e^(ax) = Σ(ax)ⁿ/n! = Σaⁿxⁿ/n!. Replace x with ax.", ans: "Σ(2+4ⁿ)xⁿ/n!, all x" },
    { id: "8.7.1b", q: "∫(eˣ−1)/x dx as a power series", concept: "Remove singularity, integrate", sol: "eˣ=1+x+x²/2!+... → eˣ−1=x+x²/2!+...\n(eˣ−1)/x = 1+x/2!+x²/3!+ = Σxⁿ/(n+1)!\n∫ = Σxⁿ⁺¹/[(n+1)(n+1)!]+C", rule: "Divide by x only after expanding — cancel the x term explicitly.", ans: "Σxⁿ⁺¹/[(n+1)(n+1)!]+C" },
    { id: "8.7.2", q: "Power series for eˣ centered at 2", concept: "Taylor series at a≠0", sol: "f⁽ⁿ⁾(x)=eˣ → f⁽ⁿ⁾(2)=e².\neˣ = e²·Σ(x−2)ⁿ/n!, R=∞.", rule: "Taylor at a: f(x)=Σf⁽ⁿ⁾(a)(x−a)ⁿ/n!. For eˣ, all derivatives = eˣ.", ans: "e²·Σ(x−2)ⁿ/n!, R=∞" },
    { id: "8.7.3", q: "Power series for ln x centered at 8", concept: "Taylor for ln x", sol: "f(x)=ln x, f⁽ⁿ⁾(8)=(−1)^(n−1)(n−1)!/8ⁿ\nln x = ln 8 + Σₙ₌₁(−1)^(n−1)(x−8)ⁿ/(n·8ⁿ), R=8.", rule: "ln x at a: = ln a + Σ(−1)^(n−1)(x−a)ⁿ/(n·aⁿ).", ans: "ln 8 + Σₙ₌₁(−1)^(n−1)(x−8)ⁿ/(n·8ⁿ), R=8" },
    { id: "8.7.4", q: "arctan x ≈ x−x³/3+x⁵/5, accurate within 0.00005?", concept: "AST error bound", sol: "Error ≤ next term = |x|⁷/7.\n|x|⁷/7 < 5×10⁻⁵\n|x|⁷ < 3.5×10⁻⁴\n|x| < (3.5×10⁻⁴)^(1/7) ≈ 0.306", rule: "AST error: set first omitted term < tolerance, solve for x.", ans: "|x| ≲ 0.3" },
    { id: "8.7.5", q: "Maclaurin series for ∫e^(−x²)dx", concept: "Compose then integrate", sol: "e^(−x²) = Σ(−1)ⁿx^(2n)/n!\n∫ = Σ(−1)ⁿx^(2n+1)/[n!(2n+1)] + C", rule: "e^(−x²) has no closed-form antiderivative — power series is the answer.", ans: "Σ(−1)ⁿx^(2n+1)/[n!(2n+1)]+C" },
    { id: "8.7.6", q: "Maclaurin for ln(1+x⁴)", concept: "Compose with ln(1+x)", sol: "ln(1+t)=Σ(−1)^(n−1)tⁿ/n. Set t=x⁴:\nln(1+x⁴) = Σ(−1)^(n−1)x^(4n)/n, |x|≤1.", rule: "ln(1+x)=Σ(−1)^(n−1)xⁿ/n. Memorize!", ans: "Σ(−1)^(n−1)x^(4n)/n, |x|≤1" },
    { id: "8.7.9", q: "Evaluate lim_{x→0} (1−cos x)/(1+x−eˣ) via series", concept: "Limits via series expansion", sol: "1−cos x = x²/2−x⁴/24+...\neˣ = 1+x+x²/2+... → 1+x−eˣ = −x²/2−...\n(x²/2)/(−x²/2) = −1.", rule: "Expand to lowest nonzero power, divide, cancel x^k, take limit.", ans: "−1" },
  ],
  "exam": [
    { id: "ex.sp16.1", q: "[Spring 2016 MC#1] Limit of {0.5ⁿ}?", concept: "Geometric sequence", sol: "0.5 = 1/2, |1/2| < 1 → (1/2)ⁿ → 0.", ans: "(A) 0" },
    { id: "ex.sp16.4", q: "[Spring 2016 MC#4] Which converge?\nI. Σ10/3ⁿ⁻¹  II. Σ5ⁿ⁻³/3ⁿ⁻¹  III. Σ4¹⁰⁻²ⁿ", concept: "Identify r in geometric series", sol: "I: r=1/3 ✓  II: r=5/3>1 ✗  III: r=1/16 ✓\nAnswer: I and III.", ans: "(B) I and III" },
    { id: "ex.sp16.8", q: "[Spring 2016 MC#8] aₙ = ln(√(n³+2n−1)) − ln(√n³)", concept: "Log squeeze", sol: "= (1/2)ln((n³+2n−1)/n³) = (1/2)ln(1+2/n²−1/n³) → 0.", ans: "(A) 0" },
    { id: "ex.sp16.9", q: "[Spring 2016 MC#9] Σ(3x)ⁿ⁻¹/2 converges for?", concept: "Geometric series, find interval", sol: "r=3x. |3x|<1 → |x|<1/3.", ans: "(D) (−1/3,1/3)" },
    { id: "ex.sp16.10", q: "[Spring 2016 MC#10] Which alternating series is absolutely convergent?\n(A) Σ(−1)^(n−1)/n  (B) Σ(−1)ⁿ  (C) Σ(−n/(3n+4))ⁿ  (D) Σ(−(3n+4)/n)ⁿ", concept: "Root Test for nth-power terms", sol: "C: |aₙ|^(1/n) = n/(3n+4)→1/3<1. ABSOLUTELY CONVERGENT.", ans: "(C)" },
    { id: "ex.sp16.fr4a", q: "[Spring 2016 FR4a] Σ(n−cos n)/n⁴", concept: "LCT with bounded oscillating term", sol: "~ 1/n³. LCT: limit=1. Σ1/n³ converges. CONVERGES.", ans: "Converges" },
    { id: "ex.sp16.fr4b", q: "[Spring 2016 FR4b] Σ 1/(n+√n)", concept: "LCT, harmonic", sol: "~ 1/n. LCT: limit=1. Σ1/n diverges. DIVERGES.", ans: "Diverges" },
    { id: "ex.sp16.fr5", q: "[Spring 2016 FR5] Classify Σ(−1)ⁿ/n^(2/3)", concept: "Absolute vs conditional", sol: "Absolute: Σ1/n^(2/3), p=2/3<1 → diverges.\nAST: bₙ=1/n^(2/3)→0, decreasing → converges.\nCONDITIONAL.", ans: "Conditionally convergent" },
    { id: "ex.su16.11", q: "[Summer 2016 MC#11] Which SERIES converge?\nI. Σ1/n  II. Σ3n²/2ⁿ  III. 1−4/3+16/9−...", concept: "Series vs sequence", sol: "I: harmonic ✗  II: ratio→1/2<1 ✓  III: r=−4/3>1 ✗\nII only.", ans: "(b) II only" },
    { id: "ex.su16.12", q: "[Summer 2016 MC#12] Σ(−1)ⁿcos(π/n) = ?", concept: "Divergence Test", sol: "cos(π/n)→1≠0. DIVERGES.", ans: "(e) Divergent" },
    { id: "ex.su16.14", q: "[Summer 2016 MC#14] Σ(−1)ⁿ/n!, smallest n for sum correct within 2 decimal places?", concept: "AST error bound", sol: "Need 1/(n+1)! < 0.005. 6!=720>200. n+1=6 → n=5.", ans: "(c) 5" },
    { id: "ex.fa14.2", q: "[Fall 2014 MC#2] Σ6x^(2n)/4ⁿ converges for?", concept: "Geometric, solve for x", sol: "6x^(2n)/4ⁿ = 6(x²/4)ⁿ. r=x²/4. |x²/4|<1 → |x|<2.", ans: "(B) (−2,2)" },
    { id: "ex.fa14.fr2a", q: "[Fall 2014 FR2a] Σ(−1)ⁿ·n/ln n from n=2", concept: "Divergence Test", sol: "n/ln n → ∞. DIVERGES.", ans: "Diverges" },
    { id: "ex.fa14.fr2b", q: "[Fall 2014 FR2b] Σ(2n−2)/√(n³+n²)", concept: "LCT, p=1/2", sol: "~2n/n^(3/2)=2/n^(1/2). LCT with 1/√n: limit=2.\nΣ1/√n diverges. DIVERGES.", ans: "Diverges" },
  ],
};
