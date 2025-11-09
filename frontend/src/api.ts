import axios from 'axios';
import { ChainInfo, ExplorerTx, SubmitTxResponse, MerkleRootResponse } from './types';
import { apiUrl } from './utils/apiBase';

export const shadowAPI = {
  async submitTransaction(tx: any): Promise<SubmitTxResponse> {
    const response = await axios.post(apiUrl('/shadow/tx'), { tx });
    return response.data;
  },

  async getBalance(commitments: string[]): Promise<{ balance: number; balance_shol: number }> {
    const response = await axios.post(apiUrl('/shadow/balance'), { commitments });
    return response.data;
  },

  async getChainInfo(): Promise<ChainInfo> {
    const response = await axios.get(apiUrl('/shadow/info'));
    return response.data;
  },

  async getMerkleRoot(): Promise<MerkleRootResponse> {
    const response = await axios.get(apiUrl('/shadow/merkle-root'));
    return response.data;
  },

  async getRecentTransactions(): Promise<ExplorerTx[]> {
    const response = await axios.get(apiUrl('/shadow/explorer'));
    return response.data;
  },

  async getTransaction(signature: string): Promise<any> {
    const response = await axios.get(apiUrl(`/shadow/tx/${signature}`));
    return response.data;
  },

  async healthCheck(): Promise<{ status: string; version: string; features: string[] }> {
    const response = await axios.get(apiUrl('/health'));
    return response.data;
  },
};
