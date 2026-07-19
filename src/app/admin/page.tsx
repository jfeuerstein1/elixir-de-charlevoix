'use client';

import { useState, useEffect, useRef } from 'react';

interface Contact {
  key: string;
  timestamp: string;
  name: string;
  email: string;
  message: string;
  site: string;
}

function SignupChart({ contacts }: { contacts: Contact[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Group by date
    const counts: Record<string, number> = {};
    contacts.forEach(c => {
      if (!c.timestamp) return;
      const d = new Date(c.timestamp);
      if (isNaN(d.getTime())) return;
      const key = d.toLocaleDateString('en-CA'); // YYYY-MM-DD
      counts[key] = (counts[key] || 0) + 1;
    });

    const dates = Object.keys(counts).sort();
    if (dates.length === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const isDark = document.documentElement.dataset.theme === 'dark' ||
      (!document.documentElement.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const bg = isDark ? '#1a1a1a' : '#ffffff';
    const gridColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';
    const barColor = '#8B7355';
    const textColor = isDark ? '#888' : '#999';
    const labelColor = isDark ? '#bbb' : '#444';

    const pad = { top: 20, right: 20, bottom: 48, left: 36 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const maxVal = Math.max(...Object.values(counts));
    const yTicks = Math.min(maxVal, 5);

    // Grid lines
    for (let i = 0; i <= yTicks; i++) {
      const y = pad.top + chartH - (i / yTicks) * chartH;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = textColor;
      ctx.font = `11px monospace`;
      ctx.textAlign = 'right';
      ctx.fillText(String(Math.round((i / yTicks) * maxVal)), pad.left - 6, y + 4);
    }

    // Bars
    const barW = Math.min(40, (chartW / dates.length) * 0.6);
    const spacing = chartW / dates.length;

    dates.forEach((date, i) => {
      const val = counts[date];
      const barH = (val / maxVal) * chartH;
      const x = pad.left + i * spacing + spacing / 2 - barW / 2;
      const y = pad.top + chartH - barH;

      ctx.fillStyle = barColor;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, [3, 3, 0, 0]);
      ctx.fill();

      // Value label on bar
      ctx.fillStyle = labelColor;
      ctx.font = `bold 12px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(String(val), x + barW / 2, y - 6);

      // Date label
      ctx.fillStyle = textColor;
      ctx.font = `10px monospace`;
      ctx.save();
      ctx.translate(x + barW / 2, pad.top + chartH + 14);
      ctx.rotate(-Math.PI / 4);
      ctx.textAlign = 'right';
      ctx.fillText(date, 0, 0);
      ctx.restore();
    });
  }, [contacts]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '220px', display: 'block' }}
    />
  );
}

export default function AdminPage() {
  const [secret, setSecret] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');

  const load = async () => {
    setStatus('loading');
    const res = await fetch(`/api/admin/contacts?secret=${secret}`);
    if (!res.ok) { setStatus('error'); return; }
    setContacts(await res.json());
    setStatus('success');
  };

  const exportCsv = () => {
    window.open(`/api/admin/contacts?secret=${secret}&format=csv`);
  };

  const uniqueEmails = new Set(contacts.map(c => c.email?.toLowerCase()).filter(Boolean)).size;

  return (
    <div style={{
      fontFamily: 'monospace',
      padding: '2rem',
      maxWidth: '1100px',
      margin: '0 auto',
      color: 'var(--text, #222)',
    }}>
      <h1 style={{ marginBottom: '0.25rem', fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.05em' }}>
        CONTACT SUBMISSIONS
      </h1>
      <p style={{ marginBottom: '1.5rem', fontSize: '0.75rem', color: '#888', letterSpacing: '0.05em' }}>
        ADMIN DASHBOARD
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', alignItems: 'center' }}>
        <input
          type="password"
          placeholder="Admin secret"
          value={secret}
          onChange={e => setSecret(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && load()}
          style={{
            padding: '0.5rem 0.75rem',
            border: '1px solid #ccc',
            borderRadius: '3px',
            width: '240px',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
          }}
        />
        <button onClick={load} style={{
          padding: '0.5rem 1.25rem',
          cursor: 'pointer',
          background: '#8B7355',
          color: '#fff',
          border: 'none',
          borderRadius: '3px',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          letterSpacing: '0.05em',
        }}>LOAD</button>
        {status === 'success' && (
          <button onClick={exportCsv} style={{
            padding: '0.5rem 1.25rem',
            cursor: 'pointer',
            background: 'transparent',
            color: '#8B7355',
            border: '1px solid #8B7355',
            borderRadius: '3px',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
          }}>EXPORT CSV</button>
        )}
      </div>

      {status === 'error' && <p style={{ color: '#c0392b', fontSize: '0.875rem' }}>Wrong secret or failed to load.</p>}
      {status === 'loading' && <p style={{ color: '#888', fontSize: '0.875rem' }}>Loading...</p>}

      {status === 'success' && (
        <>
          {/* Stats row */}
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
            {[
              { label: 'TOTAL SUBMISSIONS', value: contacts.length },
              { label: 'UNIQUE EMAILS', value: uniqueEmails },
            ].map(({ label, value }) => (
              <div key={label} style={{
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                padding: '1rem 1.5rem',
                minWidth: '160px',
              }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: '#999', marginBottom: '0.4rem' }}>{label}</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#8B7355', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div style={{
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            padding: '1rem 1rem 0.5rem',
            marginBottom: '2rem',
          }}>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: '#999', marginBottom: '0.75rem' }}>
              SIGNUPS BY DATE
            </div>
            <SignupChart contacts={contacts} />
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.8rem' }}>
              <thead>
                <tr>
                  {['Timestamp', 'Name', 'Email', 'Message', 'Site'].map(h => (
                    <th key={h} style={{
                      padding: '0.6rem 1rem',
                      textAlign: 'left',
                      borderBottom: '2px solid #e0e0e0',
                      whiteSpace: 'nowrap',
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      color: '#999',
                      fontWeight: 600,
                    }}>{h.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map((c, i) => (
                  <tr key={c.key} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                    <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap', color: '#666', fontVariantNumeric: 'tabular-nums' }}>
                      {c.timestamp ? (isNaN(Date.parse(c.timestamp)) ? c.timestamp : new Date(c.timestamp).toLocaleString()) : '—'}
                    </td>
                    <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap', color: '#222', fontWeight: 500 }}>{c.name || '—'}</td>
                    <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }}>
                      {c.email ? <a href={`mailto:${c.email}`} style={{ color: '#8B7355', textDecoration: 'none' }}>{c.email}</a> : '—'}
                    </td>
                    <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #f0f0f0', maxWidth: '320px', color: '#555' }}>{c.message || '—'}</td>
                    <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #f0f0f0', color: '#999' }}>{c.site || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
