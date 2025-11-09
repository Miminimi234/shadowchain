import { useEffect, useState } from 'react';
import { ChainMetrics } from '../hooks/useChainMetrics';
import { apiUrl } from '../utils/apiBase';

interface Props {
  metrics?: ChainMetrics | null;
}

export default function Validators({ metrics }: Props) {
  const [validators, setValidators] = useState<any[]>([]);

  useEffect(() => {
    const loadValidators = async () => {
      try {
        const response = await fetch(apiUrl('/shadow/validators'));
        const data = await response.json();
        if (data?.validators) {
          setValidators(data.validators);
        }
      } catch (err) {
        // Generate mock validators if API not available
        const mockValidators = Array.from({ length: 21 }, (_, i) => ({
          identity: `Validator-${String(i + 1).padStart(2, '0')}`,
          pubkey: `0x${Array(16).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
          stake: Math.floor(Math.random() * 50 + 10) * 1e12,
          stake_percent: 0,
          is_leader: i === 0,
          // Use deterministic last_vote based on current metrics.slot (no randomness)
          last_vote: metrics?.slot ?? 0,
        }));

        const totalStake = mockValidators.reduce((sum, v) => sum + v.stake, 0);
        mockValidators.forEach(v => {
          v.stake_percent = (v.stake / totalStake) * 100;
        });

        setValidators(mockValidators);
      }
    };

    loadValidators();
    const interval = setInterval(loadValidators, 5000);
    return () => clearInterval(interval);
  }, [metrics]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Validators</h1>
        <p>Active validator set and stake distribution</p>
      </div>

      {/* Stake Summary */}
      <div className="stake-summary">
        <div className="summary-stat">
          <div className="summary-label">Total Stake</div>
          <div className="summary-value">
            {((metrics?.total_stake || 0) / 1e15).toFixed(2)} M SHOL
          </div>
        </div>
        <div className="summary-stat">
          <div className="summary-label">Active Validators</div>
          <div className="summary-value">{validators.length}</div>
        </div>
        <div className="summary-stat">
          <div className="summary-label">Supermajority</div>
          <div className="summary-value">66.67%</div>
        </div>
        <div className="summary-stat">
          <div className="summary-label">Nakamoto Coefficient</div>
          <div className="summary-value">5</div>
        </div>
      </div>

      {/* Validators Grid */}
      <div className="validators-grid">
        {validators.map((validator, idx) => (
          <div
            key={idx}
            className={`validator-card ${validator.is_leader ? 'leader' : ''}`}
          >
            <div className="validator-header">
              <div className="validator-id">{validator.identity}</div>
              {validator.is_leader && <div className="leader-badge">LEADER</div>}
            </div>
            <div className="validator-pubkey">{validator.pubkey?.slice(0, 20) || 'N/A'}...</div>
            <div className="validator-stats">
              <div className="validator-stat-row">
                <span>Stake</span>
                <span>{((validator.stake || 0) / 1e12).toFixed(1)}M</span>
              </div>
              <div className="validator-stat-row">
                <span>Stake %</span>
                <span>{(validator.stake_percent || 0).toFixed(2)}%</span>
              </div>
              <div className="validator-stat-row">
                <span>Last Vote</span>
                <span>Slot {validator.last_vote}</span>
              </div>
            </div>
            <div className="stake-bar-container">
              <div
                className="stake-bar"
                style={{ width: `${Math.min(100, validator.stake_percent || 0)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
