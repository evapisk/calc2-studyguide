import { useState, useEffect } from 'react';
import { SECTIONS, KEY_FORMULAS, DECISION_TREE, CONCEPTS, ALL_PROBLEMS } from './data';

// ── helpers ──────────────────────────────────────────────────────────────────
const storage = {
  get: (k) => { try { return JSON.parse(localStorage.getItem(k) || '{}'); } catch { return {}; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

const ALL_PROBS_FLAT = Object.values(ALL_PROBLEMS).flat();

// ── sub-components ────────────────────────────────────────────────────────────

function Badge({ label, color }) {
  return (
    <span style={{
      background: color + '22', color, border: `1px solid ${color}55`,
      borderRadius: 6, padding: '2px 10px', fontSize: 11, fontWeight: 700,
      fontFamily: 'monospace', letterSpacing: 0.5,
    }}>{label}</span>
  );
}

// ── BROWSE MODE ───────────────────────────────────────────────────────────────
function ProbCard({ p, color, progress, onMark }) {
  const [open, setOpen] = useState(false);
  const status = progress[p.id];

  return (
    <div style={{
      background: 'rgba(15,23,42,0.7)', border: `1px solid ${color}33`,
      borderRadius: 10, padding: '16px 18px', marginBottom: 10,
      borderLeft: status === 'got' ? `4px solid #22c55e` : status === 'review' ? `4px solid #f59e0b` : `1px solid ${color}33`,
    }}>
      <div style={{ color: '#94a3b8', fontSize: 11, fontFamily: 'monospace', marginBottom: 6 }}>{p.id}</div>
      <div style={{ color: '#e2e8f0', fontSize: 13.5, lineHeight: 1.65, whiteSpace: 'pre-line', marginBottom: 10 }}>{p.q}</div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={() => setOpen(!open)} style={{
          background: open ? color + '22' : '#1e293b',
          border: `1px solid ${open ? color : '#334155'}`,
          borderRadius: 7, padding: '5px 14px', cursor: 'pointer',
          color: open ? color : '#64748b', fontSize: 12, fontWeight: 600,
        }}>
          {open ? '▲ Hide' : '▼ Solution'}
        </button>
        <button onClick={() => onMark(p.id, status === 'got' ? null : 'got')} style={{
          background: status === 'got' ? '#22c55e22' : '#1e293b',
          border: `1px solid ${status === 'got' ? '#22c55e' : '#334155'}`,
          borderRadius: 7, padding: '5px 12px', cursor: 'pointer',
          color: status === 'got' ? '#22c55e' : '#475569', fontSize: 12,
        }}>✓ Got it</button>
        <button onClick={() => onMark(p.id, status === 'review' ? null : 'review')} style={{
          background: status === 'review' ? '#f59e0b22' : '#1e293b',
          border: `1px solid ${status === 'review' ? '#f59e0b' : '#334155'}`,
          borderRadius: 7, padding: '5px 12px', cursor: 'pointer',
          color: status === 'review' ? '#f59e0b' : '#475569', fontSize: 12,
        }}>⚠ Review</button>
      </div>

      {open && (
        <div style={{ marginTop: 12 }}>
          <div style={{
            display: 'inline-block', background: color + '22', border: `1px solid ${color}`,
            borderRadius: 7, padding: '3px 12px', marginBottom: 10, color, fontWeight: 700, fontSize: 13,
          }}>✓ {p.ans}</div>
          {p.concept && (
            <div style={{ background: '#0f172a', borderRadius: 8, padding: '10px 14px', marginBottom: 8, borderLeft: `3px solid ${color}`, color: '#94a3b8', fontSize: 12 }}>
              <b style={{ color }}>Method: </b>{p.concept}
            </div>
          )}
          {p.sol && (
            <div style={{ background: '#0f172a', borderRadius: 8, padding: '10px 14px', marginBottom: 8, fontFamily: 'monospace', fontSize: 12.5, color: '#e2e8f0', lineHeight: 1.75, whiteSpace: 'pre-line' }}>
              {p.sol}
            </div>
          )}
          {p.rule && (
            <div style={{ background: color + '11', border: `1px solid ${color}33`, borderRadius: 8, padding: '7px 12px', color: '#e2e8f0', fontSize: 12 }}>
              <span style={{ color, fontWeight: 700 }}>⚡ </span>{p.rule}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BrowseMode({ progress, onMark }) {
  const [activeSection, setActiveSection] = useState('8.1');
  const [showFormulas, setShowFormulas] = useState(false);
  const [showTree, setShowTree] = useState(false);
  const [filter, setFilter] = useState('all');

  const sec = SECTIONS.find(s => s.id === activeSection);
  const probs = ALL_PROBLEMS[activeSection] || [];

  const filtered = probs.filter(p => {
    if (filter === 'got') return progress[p.id] === 'got';
    if (filter === 'review') return progress[p.id] === 'review';
    if (filter === 'unseen') return !progress[p.id];
    return true;
  });

  return (
    <div>
      {/* Toggles */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        <button onClick={() => setShowFormulas(!showFormulas)} style={{
          flex: 1, background: '#1e293b', border: `1px solid ${showFormulas ? '#8b5cf6' : '#334155'}`,
          borderRadius: 9, padding: '9px', cursor: 'pointer', color: showFormulas ? '#8b5cf6' : '#64748b', fontSize: 13, fontWeight: 600,
        }}>📐 Must-Know Formulas {showFormulas ? '▲' : '▼'}</button>
        <button onClick={() => setShowTree(!showTree)} style={{
          flex: 1, background: '#1e293b', border: `1px solid ${showTree ? '#10b981' : '#334155'}`,
          borderRadius: 9, padding: '9px', cursor: 'pointer', color: showTree ? '#10b981' : '#64748b', fontSize: 13, fontWeight: 600,
        }}>🌲 Which Test? {showTree ? '▲' : '▼'}</button>
      </div>

      {showFormulas && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 8, marginBottom: 14 }}>
          {KEY_FORMULAS.map(f => (
            <div key={f.name} style={{ background: '#0f172a', border: `1px solid ${f.color}33`, borderRadius: 9, padding: '10px 12px', borderLeft: `3px solid ${f.color}` }}>
              <div style={{ color: f.color, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{f.name}</div>
              <div style={{ color: '#e2e8f0', fontSize: 11.5, fontFamily: 'monospace', marginBottom: 4 }}>{f.f}</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>{f.detail}</div>
            </div>
          ))}
        </div>
      )}

      {showTree && (
        <div style={{ marginBottom: 14 }}>
          {DECISION_TREE.map((d, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, background: '#0f172a', border: `1px solid ${d.color}22`, borderRadius: 9, padding: '10px 14px', marginBottom: 7, borderLeft: `3px solid ${d.color}` }}>
              <div style={{ color: d.color, fontWeight: 700, fontSize: 12, minWidth: 150 }}>{d.step}</div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 3 }}>{d.desc}</div>
                <div style={{ color: '#475569', fontSize: 11, fontFamily: 'monospace' }}>{d.example}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
            background: activeSection === s.id ? s.color + '22' : '#1e293b',
            border: `1px solid ${activeSection === s.id ? s.color : '#334155'}`,
            borderRadius: 20, padding: '5px 13px', cursor: 'pointer',
            color: activeSection === s.id ? s.color : '#64748b', fontSize: 12, fontWeight: 600,
          }}>{s.label}</button>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {[['all','All'],['unseen','Unseen'],['review','⚠ Review'],['got','✓ Got it']].map(([v, l]) => (
          <button key={v} onClick={() => setFilter(v)} style={{
            background: filter === v ? '#334155' : '#1e293b',
            border: '1px solid #334155', borderRadius: 20, padding: '4px 12px',
            cursor: 'pointer', color: filter === v ? '#e2e8f0' : '#64748b', fontSize: 12,
          }}>{l}</button>
        ))}
        <span style={{ color: '#475569', fontSize: 12, alignSelf: 'center', marginLeft: 'auto' }}>
          {filtered.length} / {probs.length}
        </span>
      </div>

      {/* Section header */}
      <div style={{
        background: `linear-gradient(90deg,${sec.color}22,transparent)`,
        border: `1px solid ${sec.color}44`, borderRadius: 10,
        padding: '12px 16px', marginBottom: 14, borderLeft: `4px solid ${sec.color}`,
      }}>
        <div style={{ color: sec.color, fontWeight: 700, fontSize: 15 }}>{sec.label}</div>
      </div>

      {filtered.map(p => <ProbCard key={p.id} p={p} color={sec.color} progress={progress} onMark={onMark} />)}
      {filtered.length === 0 && <div style={{ color: '#475569', textAlign: 'center', padding: 30 }}>No problems match this filter.</div>}
    </div>
  );
}

// ── LEARN MODE ────────────────────────────────────────────────────────────────
function LearnMode({ progress, onMark }) {
  const [conceptIdx, setConceptIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [tab, setTab] = useState('concepts'); // concepts | flashcards

  // Flashcard queue: prioritize 'review', then unseen
  const queue = [
    ...ALL_PROBS_FLAT.filter(p => progress[p.id] === 'review'),
    ...ALL_PROBS_FLAT.filter(p => !progress[p.id]),
  ];
  const [cardIdx, setCardIdx] = useState(0);
  const card = queue[cardIdx % Math.max(queue.length, 1)];

  const concept = CONCEPTS[conceptIdx];

  return (
    <div>
      {/* Sub-tab */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[['concepts','📖 Concept Explainers'],['flashcards','🃏 Flashcards']].map(([v,l]) => (
          <button key={v} onClick={() => setTab(v)} style={{
            background: tab === v ? '#6366f122' : '#1e293b',
            border: `1px solid ${tab === v ? '#6366f1' : '#334155'}`,
            borderRadius: 9, padding: '8px 18px', cursor: 'pointer',
            color: tab === v ? '#6366f1' : '#64748b', fontSize: 13, fontWeight: 600,
          }}>{l}</button>
        ))}
      </div>

      {tab === 'concepts' && (
        <div>
          {/* Concept nav */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {CONCEPTS.map((c, i) => (
              <button key={c.id} onClick={() => setConceptIdx(i)} style={{
                background: conceptIdx === i ? c.color + '22' : '#1e293b',
                border: `1px solid ${conceptIdx === i ? c.color : '#334155'}`,
                borderRadius: 20, padding: '5px 13px', cursor: 'pointer',
                color: conceptIdx === i ? c.color : '#64748b', fontSize: 12, fontWeight: 600,
              }}>{c.title}</button>
            ))}
          </div>

          {/* Concept card */}
          <div style={{
            background: '#0f172a', border: `1px solid ${concept.color}44`,
            borderRadius: 12, padding: '24px 28px',
            borderLeft: `5px solid ${concept.color}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <div style={{ color: concept.color, fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{concept.title}</div>
                <Badge label={`Section ${concept.section}`} color={concept.color} />
              </div>
            </div>
            <div style={{
              color: '#e2e8f0', fontSize: 13.5, lineHeight: 1.85,
              whiteSpace: 'pre-wrap', fontFamily: 'monospace',
            }}>{concept.body}</div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <button onClick={() => setConceptIdx((conceptIdx - 1 + CONCEPTS.length) % CONCEPTS.length)} style={{
              background: '#1e293b', border: '1px solid #334155', borderRadius: 8,
              padding: '8px 18px', cursor: 'pointer', color: '#94a3b8', fontSize: 13,
            }}>← Prev</button>
            <button onClick={() => setConceptIdx((conceptIdx + 1) % CONCEPTS.length)} style={{
              background: concept.color + '22', border: `1px solid ${concept.color}`,
              borderRadius: 8, padding: '8px 18px', cursor: 'pointer',
              color: concept.color, fontSize: 13, fontWeight: 600,
            }}>Next →</button>
            <span style={{ color: '#475569', fontSize: 12, alignSelf: 'center', marginLeft: 'auto' }}>
              {conceptIdx + 1} / {CONCEPTS.length}
            </span>
          </div>
        </div>
      )}

      {tab === 'flashcards' && (
        <div>
          {queue.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, color: '#22c55e' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>You've marked everything as "Got it"!</div>
              <div style={{ color: '#64748b', marginTop: 8 }}>Mark problems as "Review" to practice them here.</div>
            </div>
          ) : (
            <div>
              <div style={{ color: '#64748b', fontSize: 12, marginBottom: 12 }}>
                {queue.filter(p => progress[p.id] === 'review').length} in review · {queue.filter(p => !progress[p.id]).length} unseen · Card {(cardIdx % queue.length) + 1}/{queue.length}
              </div>

              {/* Card */}
              <div
                onClick={() => setFlipped(!flipped)}
                style={{
                  background: flipped ? '#0f172a' : '#1e293b',
                  border: `2px solid ${flipped ? '#6366f1' : '#334155'}`,
                  borderRadius: 14, padding: '32px 28px', cursor: 'pointer',
                  minHeight: 200, transition: 'all 0.2s',
                  borderLeft: flipped ? '5px solid #6366f1' : '2px solid #334155',
                }}
              >
                <div style={{ color: '#64748b', fontSize: 11, fontFamily: 'monospace', marginBottom: 10 }}>
                  {flipped ? '✓ ANSWER' : '? QUESTION — click to reveal'}
                </div>
                {!flipped ? (
                  <div style={{ color: '#e2e8f0', fontSize: 14.5, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{card.q}</div>
                ) : (
                  <div>
                    <div style={{ color: '#22c55e', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>{card.ans}</div>
                    {card.concept && <div style={{ color: '#6366f1', fontSize: 12, marginBottom: 8 }}><b>Method:</b> {card.concept}</div>}
                    {card.sol && <div style={{ color: '#94a3b8', fontSize: 12.5, fontFamily: 'monospace', whiteSpace: 'pre-line', lineHeight: 1.65 }}>{card.sol}</div>}
                    {card.rule && <div style={{ color: '#eab308', fontSize: 12, marginTop: 10 }}>⚡ {card.rule}</div>}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                <button onClick={() => { onMark(card.id, 'review'); setFlipped(false); setCardIdx(c => c + 1); }} style={{
                  flex: 1, background: '#f59e0b22', border: '1px solid #f59e0b',
                  borderRadius: 9, padding: '10px', cursor: 'pointer', color: '#f59e0b', fontSize: 13, fontWeight: 600,
                }}>⚠ Still learning</button>
                <button onClick={() => { onMark(card.id, 'got'); setFlipped(false); setCardIdx(c => c + 1); }} style={{
                  flex: 1, background: '#22c55e22', border: '1px solid #22c55e',
                  borderRadius: 9, padding: '10px', cursor: 'pointer', color: '#22c55e', fontSize: 13, fontWeight: 600,
                }}>✓ Got it — next</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── QUIZ MODE ─────────────────────────────────────────────────────────────────
function QuizMode({ progress }) {
  const [started, setStarted] = useState(false);
  const [pool, setPool] = useState([]);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ got: 0, miss: 0 });
  const [done, setDone] = useState(false);
  const [poolType, setPoolType] = useState('all'); // all | review | unseen

  function startQuiz() {
    let src = ALL_PROBS_FLAT;
    if (poolType === 'review') src = src.filter(p => progress[p.id] === 'review');
    if (poolType === 'unseen') src = src.filter(p => !progress[p.id]);
    const shuffled = [...src].sort(() => Math.random() - 0.5).slice(0, 20);
    setPool(shuffled);
    setIdx(0);
    setRevealed(false);
    setScore({ got: 0, miss: 0 });
    setDone(false);
    setStarted(true);
  }

  function next(correct) {
    setScore(s => ({ ...s, got: s.got + (correct ? 1 : 0), miss: s.miss + (correct ? 0 : 1) }));
    if (idx + 1 >= pool.length) { setDone(true); return; }
    setIdx(i => i + 1);
    setRevealed(false);
  }

  if (done) {
    const pct = Math.round((score.got / pool.length) * 100);
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>{pct >= 80 ? '🎉' : pct >= 60 ? '💪' : '📚'}</div>
        <div style={{ fontSize: 28, fontWeight: 700, color: pct >= 80 ? '#22c55e' : pct >= 60 ? '#f59e0b' : '#ef4444' }}>
          {score.got}/{pool.length} — {pct}%
        </div>
        <div style={{ color: '#64748b', marginTop: 8, marginBottom: 28 }}>
          {pct >= 80 ? "You're ready for this exam." : pct >= 60 ? 'Good progress — review the misses.' : 'Keep drilling — use Flashcard mode on the hard ones.'}
        </div>
        <button onClick={() => setStarted(false)} style={{
          background: '#6366f122', border: '1px solid #6366f1', borderRadius: 10,
          padding: '12px 32px', cursor: 'pointer', color: '#6366f1', fontSize: 15, fontWeight: 700,
        }}>Try Again</button>
      </div>
    );
  }

  if (!started) {
    return (
      <div style={{ maxWidth: 500, margin: '0 auto', padding: '20px 0' }}>
        <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>
          Quiz yourself on up to 20 randomly selected problems. Rate yourself honestly — it's just for practice.
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: '#64748b', fontSize: 12, marginBottom: 8 }}>Problem pool:</div>
          {[['all','All problems'],['review','Only ⚠ Review'],['unseen','Only unseen']].map(([v,l]) => (
            <button key={v} onClick={() => setPoolType(v)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              background: poolType === v ? '#6366f122' : '#1e293b',
              border: `1px solid ${poolType === v ? '#6366f1' : '#334155'}`,
              borderRadius: 8, padding: '10px 14px', cursor: 'pointer',
              color: poolType === v ? '#6366f1' : '#94a3b8', fontSize: 13,
              marginBottom: 6,
            }}>{poolType === v ? '● ' : '○ '}{l}</button>
          ))}
        </div>
        <button onClick={startQuiz} style={{
          width: '100%', background: '#6366f1', border: 'none',
          borderRadius: 10, padding: '14px', cursor: 'pointer',
          color: '#fff', fontSize: 15, fontWeight: 700,
        }}>Start Quiz →</button>
      </div>
    );
  }

  const q = pool[idx];
  const sec = SECTIONS.find(s => ALL_PROBLEMS[s.id]?.some(p => p.id === q.id));
  const color = sec?.color || '#6366f1';

  return (
    <div>
      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ color: '#64748b', fontSize: 12 }}>Question {idx + 1} / {pool.length}</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <span style={{ color: '#22c55e', fontSize: 12 }}>✓ {score.got}</span>
          <span style={{ color: '#ef4444', fontSize: 12 }}>✗ {score.miss}</span>
        </div>
      </div>
      <div style={{ background: '#0f172a', borderRadius: 4, height: 4, marginBottom: 20 }}>
        <div style={{ background: '#6366f1', height: 4, borderRadius: 4, width: `${((idx + 1) / pool.length) * 100}%`, transition: 'width 0.3s' }} />
      </div>

      {/* Question */}
      <div style={{
        background: '#0f172a', border: `1px solid ${color}44`, borderRadius: 12,
        padding: '24px 24px', marginBottom: 16, borderLeft: `4px solid ${color}`,
      }}>
        <div style={{ color: '#64748b', fontSize: 11, fontFamily: 'monospace', marginBottom: 8 }}>{q.id}</div>
        <div style={{ color: '#e2e8f0', fontSize: 14.5, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{q.q}</div>
      </div>

      {!revealed ? (
        <button onClick={() => setRevealed(true)} style={{
          width: '100%', background: color + '22', border: `1px solid ${color}`,
          borderRadius: 10, padding: '13px', cursor: 'pointer',
          color, fontSize: 14, fontWeight: 700,
        }}>Reveal Answer</button>
      ) : (
        <div>
          <div style={{ background: '#0f172a', borderRadius: 12, padding: '20px 22px', marginBottom: 14 }}>
            <div style={{ color: '#22c55e', fontWeight: 700, fontSize: 15, marginBottom: 10 }}>✓ {q.ans}</div>
            {q.concept && <div style={{ color: color, fontSize: 12, marginBottom: 8 }}><b>Method:</b> {q.concept}</div>}
            {q.sol && <div style={{ color: '#94a3b8', fontSize: 12.5, fontFamily: 'monospace', whiteSpace: 'pre-line', lineHeight: 1.65 }}>{q.sol}</div>}
            {q.rule && <div style={{ color: '#eab308', fontSize: 12, marginTop: 10 }}>⚡ {q.rule}</div>}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => next(false)} style={{
              flex: 1, background: '#ef444422', border: '1px solid #ef4444',
              borderRadius: 9, padding: '11px', cursor: 'pointer', color: '#ef4444', fontSize: 13, fontWeight: 700,
            }}>✗ Missed it</button>
            <button onClick={() => next(true)} style={{
              flex: 1, background: '#22c55e22', border: '1px solid #22c55e',
              borderRadius: 9, padding: '11px', cursor: 'pointer', color: '#22c55e', fontSize: 13, fontWeight: 700,
            }}>✓ Got it</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── STATS PANEL ───────────────────────────────────────────────────────────────
function StatsBar({ progress }) {
  const total = ALL_PROBS_FLAT.length;
  const got = ALL_PROBS_FLAT.filter(p => progress[p.id] === 'got').length;
  const review = ALL_PROBS_FLAT.filter(p => progress[p.id] === 'review').length;
  const pct = Math.round((got / total) * 100);

  return (
    <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: '12px 16px', marginBottom: 16, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 160 }}>
        <div style={{ background: '#1e293b', borderRadius: 4, height: 6, marginBottom: 6 }}>
          <div style={{ background: '#22c55e', height: 6, borderRadius: 4, width: `${pct}%`, transition: 'width 0.5s' }} />
        </div>
        <div style={{ color: '#64748b', fontSize: 11 }}>{got}/{total} mastered ({pct}%)</div>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#22c55e', fontSize: 18, fontWeight: 700 }}>{got}</div>
          <div style={{ color: '#64748b', fontSize: 10 }}>Got it</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#f59e0b', fontSize: 18, fontWeight: 700 }}>{review}</div>
          <div style={{ color: '#64748b', fontSize: 10 }}>Review</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#475569', fontSize: 18, fontWeight: 700 }}>{total - got - review}</div>
          <div style={{ color: '#64748b', fontSize: 10 }}>Unseen</div>
        </div>
      </div>
    </div>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState('browse'); // browse | learn | quiz
  const [progress, setProgress] = useState(() => storage.get('calc2-progress'));

  function onMark(id, status) {
    setProgress(prev => {
      const next = { ...prev };
      if (status === null) delete next[id];
      else next[id] = status;
      storage.set('calc2-progress', next);
      return next;
    });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#020817' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)',
        borderBottom: '1px solid #1e293b', padding: '22px 20px 18px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: '#6366f1', fontFamily: 'monospace', marginBottom: 5, textTransform: 'uppercase' }}>
            MATH-UA 122 · Calculus II
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: '#f1f5f9' }}>Series &amp; Sequences — Complete Study Guide</h1>
            {/* Mode switcher */}
            <div style={{ display: 'flex', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden' }}>
              {[['browse','📚 Browse'],['learn','🧠 Learn'],['quiz','🎯 Quiz']].map(([v,l]) => (
                <button key={v} onClick={() => setMode(v)} style={{
                  background: mode === v ? '#6366f1' : 'transparent',
                  border: 'none', padding: '8px 16px', cursor: 'pointer',
                  color: mode === v ? '#fff' : '#64748b', fontSize: 13, fontWeight: 600,
                }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 16px 60px' }}>
        <StatsBar progress={progress} />
        {mode === 'browse' && <BrowseMode progress={progress} onMark={onMark} />}
        {mode === 'learn' && <LearnMode progress={progress} onMark={onMark} />}
        {mode === 'quiz' && <QuizMode progress={progress} />}
      </div>
    </div>
  );
}
