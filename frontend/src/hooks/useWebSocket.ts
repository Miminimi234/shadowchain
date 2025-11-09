import { useState, useEffect } from 'react';

export interface NetworkEvent {
  type: string;
  slot?: number;
  hash?: string;
  leader?: string;
  transactions?: number;
  shielded_txs?: number;
  finalized?: boolean;
}

export function useWebSocket() {
  const [events, setEvents] = useState<NetworkEvent[]>([]);

  useEffect(() => {
    // For now, use polling instead of WebSocket
    // Real WebSocket implementation commented out for simplicity
    /*
    const ws = new WebSocket('ws://backend-host/events');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setEvents(prev => [data, ...prev].slice(0, 100));
    };

    return () => ws.close();
    */

    // Mock events for now
    const interval = setInterval(() => {
      // Simulate events
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return events;
}
