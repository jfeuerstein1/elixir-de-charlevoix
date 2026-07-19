'use client';

import { useState } from 'react';

interface Contact {
  key: string;
  timestamp: string;
  name: string;
  email: string;
  message: string;
  site: string;
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

  return (
    <div style={{ fontFamily: 'monospace', padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Contact Submissions</h1>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <input
          type="password"
          placeholder="Admin secret"
          value={secret}
          onChange={e => setSecret(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && load()}
          style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', width: '260px' }}
        />
        <button onClick={load} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Load</button>
        {status === 'success' && (
          <button onClick={exportCsv} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Export CSV</button>
        )}
      </div>

      {status === 'error' && <p style={{ color: 'red' }}>Wrong secret or failed to load.</p>}
      {status === 'loading' && <p>Loading...</p>}

      {status === 'success' && (
        <>
          <p style={{ marginBottom: '1rem', color: '#555' }}>{contacts.length} contact{contacts.length !== 1 ? 's' : ''}</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  {['Timestamp', 'Name', 'Email', 'Message', 'Site'].map(h => (
                    <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '2px solid #ddd', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map((c, i) => (
                  <tr key={c.key} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #eee', whiteSpace: 'nowrap' }}>
                      {c.timestamp ? (isNaN(Date.parse(c.timestamp)) ? c.timestamp : new Date(c.timestamp).toLocaleString()) : '—'}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #eee', whiteSpace: 'nowrap' }}>{c.name}</td>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #eee' }}>
                      <a href={`mailto:${c.email}`}>{c.email}</a>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #eee', maxWidth: '400px' }}>{c.message}</td>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #eee' }}>{c.site}</td>
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
