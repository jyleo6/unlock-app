'use client';

import { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { app } from '@/lib/firebase';

export default function ControlPage() {
  const db = getDatabase(app);

  const [locked, setLocked] = useState(true);
  const [ballCount, setBallCount] = useState(0);
  const [lastUsed, setLastUsed] = useState('-');
  const [confirmResult, setConfirmResult] = useState('');

  useEffect(() => {
    const lockedRef = ref(db, 'status/locked');
    const countRef = ref(db, 'status/ball_count');
    const timeRef = ref(db, 'status/last_used');
    const resultRef = ref(db, 'status/confirm_result');

    onValue(lockedRef, (snapshot) => {
      setLocked(snapshot.val());
    });

    onValue(countRef, (snapshot) => {
      setBallCount(snapshot.val());
    });

    onValue(timeRef, (snapshot) => {
      setLastUsed(snapshot.val());
    });

    onValue(resultRef, (snapshot) => {
      const result = snapshot.val();
      if (result === 'failed') {
        alert('🚪 Door is not locked. Please close and securely lock the door before confirming.');
      } else if (result === 'success') {
        alert('✅ Door confirmed and motor activated.');
      }
      setConfirmResult(result);
    });
  }, [db]);

  const handleClick = async (action) => {
    await set(ref(db, `actions/${action}`), true);
    alert(`${action} action sent to Firebase`);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
      <h1>🎾 Smart Locker Control Panel</h1>

      <div style={{ margin: '2rem 0' }}>
        <button onClick={() => handleClick('unlock')} style={btnStyle}>🔓 Unlock</button>
        <button onClick={() => handleClick('return')} style={btnStyle}>↩️ Return</button>
        <button onClick={() => handleClick('confirm')} style={btnStyle}>✅ Confirm Lock</button>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2>Status</h2>
        <p><strong>Locked:</strong> {locked ? 'Yes 🔒' : 'No 🔓'}</p>
        <p><strong>Ball Count:</strong> {ballCount}</p>
        <p><strong>Last Used:</strong> {lastUsed}</p>
        {confirmResult && <p><strong>Confirm Result:</strong> {confirmResult}</p>}
      </div>
    </main>
  );
}

const btnStyle = {
  margin: '0.5rem',
  padding: '1rem 2rem',
  fontSize: '1.2rem',
  cursor: 'pointer',
  borderRadius: '10px',
  border: 'none',
  background: '#4CAF50',
  color: '#fff',
};
