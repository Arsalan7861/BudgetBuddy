import axios from 'axios';
import type { Transaction, TransactionInput } from '../interfaces/Transaction';

const API_URL = 'http://localhost:5000/api/transactions';

export const getTransactions = async (): Promise<Transaction[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addTransaction = async (transaction: TransactionInput): Promise<Transaction> => {
    const response = await axios.post(API_URL, transaction);
    return response.data;
};

export const updateTransaction = async (id: number, transaction: TransactionInput): Promise<Transaction> => {
    const response = await axios.put(`${API_URL}/${id}`, transaction);
    return response.data;
};

export const deleteTransaction = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
