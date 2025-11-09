import { useState } from 'react';
import { useChainMetrics } from './hooks/useChainMetrics';
import { useWebSocket } from './hooks/useWebSocket';
import Consensus from './pages/Consensus';
import Dashboard from './pages/Dashboard';
import Privacy from './pages/Privacy';
import Transactions from './pages/Transactions';
import Validators from './pages/Validators';
import Wallet from './pages/Wallet';
import './shadow-theme.css';
import { apiUrl } from './utils/apiBase';

type Page = 'dashboard' | 'consensus' | 'privacy' | 'transactions' | 'wallet' | 'validators';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { metrics, loading } = useChainMetrics();
  const events = useWebSocket();

  const formatNumber = (num: number | undefined) => {
    if (!num) return '0';
    return num.toLocaleString();
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard metrics={metrics} events={events} />;
      case 'consensus':
        return <Consensus metrics={metrics} />;
      case 'privacy':
        return <Privacy metrics={metrics} />;
      case 'transactions':
        return <Transactions />;
      case 'wallet':
        return <Wallet />;
      case 'validators':
        return <Validators />;
      default:
        return <Dashboard metrics={metrics} events={events} />;
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <div className="logo-container">
            <svg width="40" height="40" viewBox="0 0 100 100">
              <ellipse cx="50" cy="50" rx="45" ry="30" fill="none" stroke="#00d4ff" strokeWidth="4" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="#00d4ff" strokeWidth="4" />
              <circle cx="50" cy="50" r="8" fill="#00d4ff" />
            </svg>
          </div>
          <div className="brand-info">
            <h1>SHADOWCHAIN</h1>
            <p>Privacy-Native High-Performance Blockchain</p>
          </div>
        </div>

        <div className="header-center">
          <div className="network-badge">
            <span className="status-dot"></span>
            TESTNET
          </div>
          {/* Mobile hamburger button (visible only on small screens) */}
          <button
            className="mobile-menu-button"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(open => !open)}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="header-right">
          <div className="header-stat">
            <span className="stat-label">SLOT</span>
            <span className="stat-value">{formatNumber(metrics?.slot)}</span>
          </div>
          <div className="header-stat">
            <span className="stat-label">TPS</span>
            <span className="stat-value">{formatNumber(Math.floor(metrics?.tps || 0))}</span>
          </div>
          <div className="header-stat">
            <span className="stat-label">EPOCH</span>
            <span className="stat-value">{metrics?.epoch || 0}</span>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
          <nav className="sidebar-nav">
            <button
              className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => { setCurrentPage('dashboard'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon">DASH</span>
              <span>Dashboard</span>
            </button>
            <button
              className={`nav-item ${currentPage === 'consensus' ? 'active' : ''}`}
              onClick={() => { setCurrentPage('consensus'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon">POH</span>
              <span>Consensus</span>
            </button>
            <button
              className={`nav-item ${currentPage === 'privacy' ? 'active' : ''}`}
              onClick={() => { setCurrentPage('privacy'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon">PRIV</span>
              <span>Privacy Pool</span>
            </button>
            <button
              className={`nav-item ${currentPage === 'transactions' ? 'active' : ''}`}
              onClick={() => { setCurrentPage('transactions'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon">TX</span>
              <span>Transactions</span>
            </button>
            <button
              className={`nav-item ${currentPage === 'wallet' ? 'active' : ''}`}
              onClick={() => { setCurrentPage('wallet'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon">WALL</span>
              <span>Wallet</span>
            </button>
            <button
              className={`nav-item ${currentPage === 'validators' ? 'active' : ''}`}
              onClick={() => { setCurrentPage('validators'); setMobileMenuOpen(false); }}
            >
              <span className="nav-icon">VAL</span>
              <span>Validators</span>
            </button>
          </nav>

          {/* Quick Stats */}
          <div className="sidebar-stats">
            <div className="quick-stat">
              <div className="quick-stat-label">Shielded Ratio</div>
              <div className="quick-stat-value">
                {metrics ? ((metrics.shielded_txs / Math.max(1, metrics.total_transactions)) * 100).toFixed(1) : '0'}%
              </div>
            </div>
            <div className="quick-stat">
              <div className="quick-stat-label">Pool Size</div>
              <div className="quick-stat-value">{formatNumber(metrics?.shielded_pool_size)}</div>
            </div>
            <div className="quick-stat">
              <div className="quick-stat-label">Validators</div>
              <div className="quick-stat-value">{metrics?.active_validators || 0}</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {loading ? (
            <div className="loading-screen">
              <div className="spinner-large"></div>
              <p>Loading ShadowChain...</p>
            </div>
          ) : (
            renderPage()
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-left">
          <span>SHADOWCHAIN v1.0.0</span>
          <span className="separator">|</span>
          <span>Solana PoH + Sapling Privacy</span>
        </div>
        <div className="footer-right">
          <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">Faucet</a>
          <span className="separator">|</span>
          <a href={apiUrl('/health')} target="_blank" rel="noopener noreferrer">Node</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
