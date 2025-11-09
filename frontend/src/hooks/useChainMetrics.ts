import { useEffect, useState } from 'react';
import { apiUrl } from '../utils/apiBase';

export interface ChainMetrics {
  slot: number;
  epoch: number;
  tps: number;
  total_transactions: number;
  transparent_txs: number;
  shielded_txs: number;
  shield_ops: number;
  unshield_ops: number;
  private_transfers: number;
  shielded_pool_size: number;
  nullifier_count: number;
  total_stake: number;
  active_validators: number;
}

export function useChainMetrics() {
  const [fetchedMetrics, setFetchedMetrics] = useState<ChainMetrics | null>(null);
  const [displaySlot, setDisplaySlot] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(apiUrl('/shadow/info'));
        const data = await response.json();

        // Map API response to metrics
        const mappedMetrics: ChainMetrics = {
          slot: data.stats?.height || 0,
          epoch: data.stats?.epoch || 0,
          tps: data.stats?.current_tps || 0,
          total_transactions: data.stats?.total_transactions || 0,
          transparent_txs: data.privacy?.transparent_transactions || 0,
          shielded_txs: data.privacy?.shielded_transactions || 0,
          shield_ops: data.privacy?.shield_operations || 0,
          unshield_ops: data.privacy?.unshield_operations || 0,
          private_transfers: data.privacy?.private_transfers || 0,
          shielded_pool_size: data.privacy?.merkle_tree_size || 0,
          nullifier_count: data.privacy?.spent_notes || 0,
          total_stake: data.consensus?.total_stake || 0,
          active_validators: data.consensus?.active_validators || 0,
        };

        // store fetched metrics and initialize displaySlot to the fetched slot
        setFetchedMetrics(mappedMetrics);
        setDisplaySlot(mappedMetrics.slot || 0);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch metrics:', err);
      }
    };

    fetchMetrics();
    const fetchInterval = setInterval(fetchMetrics, 2000); // Update every 2s

    // Increment displayed slot every 2s so UI shows slot progression even between API updates
    const slotTicker = setInterval(() => {
      setDisplaySlot(s => s + 1);
    }, 2000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(slotTicker);
    };
  }, []);

  // Derive effective metrics where slot uses the displaySlot counter.
  const effectiveMetrics: ChainMetrics = fetchedMetrics
    ? { ...fetchedMetrics, slot: displaySlot }
    : {
      slot: displaySlot,
      epoch: 0,
      tps: 0,
      total_transactions: 0,
      transparent_txs: 0,
      shielded_txs: 0,
      shield_ops: 0,
      unshield_ops: 0,
      private_transfers: 0,
      shielded_pool_size: 0,
      nullifier_count: 0,
      total_stake: 0,
      active_validators: 0,
    };

  return { metrics: effectiveMetrics, loading };
}
