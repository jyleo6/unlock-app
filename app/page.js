'use client';

import React from 'react';
import { db, ref, set } from '../lib/firebase';

export default function Home() {
  const handleUnlock = async () => {
    try {
      await set(ref(db, 'unlock'), true);
      alert('✅ unlock = true written to Firebase!');
    } catch (error) {
      console.error('❌ Failed to write to Firebase:', error);
    }
  };

  return (
    <main style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>🔓 Firebase Unlock Demo</h1>
      <button
        onClick={handleUnlock}
        style={{
          fontSize: '20px',
          padding: '12px 24px',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Unlock
      </button>
    </main>
  );
}
