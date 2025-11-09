import React, { useState } from 'react';
import { apiUrl } from '../utils/apiBase';

export default function Wallet() {
  const [transparentAddress, setTransparentAddress] = useState('');
  const [shieldedAddress, setShieldedAddress] = useState<any>(null);
  const [balance, setBalance] = useState({transparent: 0, shielded: 0});

  const generateTransparentAddress = () => {
    const randomHex = Array.from({length: 32}, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    setTransparentAddress(`sol1${randomHex.slice(0, 32)}`);
  };

  const generateShieldedAddress = async () => {
    try {
      const response = await fetch(apiUrl('/address/generate'));
      const address = await response.json();
      setShieldedAddress(address);
    } catch (err) {
      console.error('Failed to generate address:', err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Wallet</h1>
        <p>Manage transparent and shielded addresses</p>
      </div>

      {/* Address Generation */}
      <div className="wallet-grid">
        <div className="address-section">
          <h2>Transparent Address</h2>
          <div className="address-card">
            {!transparentAddress ? (
              <div className="address-generate">
                <p>Generate a transparent address (like normal Solana)</p>
                <button className="generate-btn" onClick={generateTransparentAddress}>
                  Generate Transparent Address
                </button>
              </div>
            ) : (
              <div className="address-display">
                <div className="address-label">Address</div>
                <div className="address-value" onClick={() => copyToClipboard(transparentAddress)}>
                  {transparentAddress}
                </div>
                <div className="address-hint">Click to copy</div>
                <div className="balance-display">
                  <div className="balance-label">Balance</div>
                  <div className="balance-value">{balance.transparent} SHOL</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="address-section">
          <h2>Shielded Address</h2>
          <div className="address-card shielded">
            {!shieldedAddress ? (
              <div className="address-generate">
                <p>Generate a shielded address with spending and viewing keys</p>
                <button className="generate-btn shielded" onClick={generateShieldedAddress}>
                  Generate Shielded Address
                </button>
              </div>
            ) : (
              <div className="address-display">
                <div className="address-label">Address</div>
                <div className="address-value" onClick={() => copyToClipboard(shieldedAddress.address)}>
                  {shieldedAddress.address}
                </div>
                <div className="address-hint">Click to copy</div>
                
                <div className="keys-section">
                  <div className="key-row">
                    <span className="key-label">Spending Key</span>
                    <code className="key-value">{shieldedAddress.spending_key ? `0x${Buffer.from(shieldedAddress.spending_key).toString('hex').slice(0, 32)}...` : 'N/A'}</code>
                  </div>
                  <div className="key-row">
                    <span className="key-label">Viewing Key</span>
                    <code className="key-value">{shieldedAddress.viewing_key ? `0x${Buffer.from(shieldedAddress.viewing_key).toString('hex').slice(0, 32)}...` : 'N/A'}</code>
                  </div>
                </div>

                <div className="balance-display">
                  <div className="balance-label">Shielded Balance</div>
                  <div className="balance-value private">{balance.shielded} SHOL</div>
                  <div className="balance-note">Requires viewing key to see</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-btn" disabled={!transparentAddress || !shieldedAddress}>
            Shield Funds (t→z)
          </button>
          <button className="action-btn" disabled={!shieldedAddress}>
            Unshield Funds (z→t)
          </button>
          <button className="action-btn" disabled={!shieldedAddress}>
            Send Private (z→z)
          </button>
          <button className="action-btn" disabled={!transparentAddress}>
            Send Public (t→t)
          </button>
        </div>
      </div>

      {/* Wallet Info */}
      <div className="wallet-info-section">
        <h2>Wallet Information</h2>
        <div className="info-cards">
          <div className="info-card-small">
            <div className="info-card-label">Transparent Balance</div>
            <div className="info-card-value">{balance.transparent} SHOL</div>
            <div className="info-card-note">Visible on-chain</div>
          </div>
          <div className="info-card-small">
            <div className="info-card-label">Shielded Balance</div>
            <div className="info-card-value">{balance.shielded} SHOL</div>
            <div className="info-card-note">Private, requires viewing key</div>
          </div>
          <div className="info-card-small">
            <div className="info-card-label">Total Balance</div>
            <div className="info-card-value">{balance.transparent + balance.shielded} SHOL</div>
            <div className="info-card-note">Combined holdings</div>
          </div>
        </div>
      </div>
    </div>
  );
}
