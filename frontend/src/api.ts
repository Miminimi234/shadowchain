import axios from 'axios';
import { ChainInfo, ExplorerTx, SubmitTxResponse, MerkleRootResponse } from './types';

const API_BASE = 'http://localhost:8899';

export const shadowAPI = {
  async submitTransaction(tx: any): Promise<SubmitTxResponse> {
    const response = await axios.post(`${API_BASE}/shadow/tx`, { tx });
    return response.data;
  },

  async getBalance(commitments: string[]): Promise<{ balance: number; balance_shol: number }> {
    const response = await axios.post(`${API_BASE}/shadow/balance`, { commitments });
    return response.data;
  },

  async getChainInfo(): Promise<ChainInfo> {
    const response = await axios.get(`${API_BASE}/shadow/info`);
    return response.data;
  },

  async getMerkleRoot(): Promise<MerkleRootResponse> {
    const response = await axios.get(`${API_BASE}/shadow/merkle-root`);
    return response.data;
  },

  async getRecentTransactions(): Promise<ExplorerTx[]> {
    const response = await axios.get(`${API_BASE}/shadow/explorer`);
    return response.data;
  },

  async getTransaction(signature: string): Promise<any> {
    const response = await axios.get(`${API_BASE}/shadow/tx/${signature}`);
    return response.data;
  },

  async healthCheck(): Promise<{ status: string; version: string; features: string[] }> {
    const response = await axios.get(`${API_BASE}/health`);
    return response.data;
  },
};
