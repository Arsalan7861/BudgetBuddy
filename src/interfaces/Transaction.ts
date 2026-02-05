export interface Transaction {
    id: number;
    text: string;
    amount: number;
    category: string;
    date: string;
}

export type TransactionInput = Omit<Transaction, 'id'>; // take all properties of Transaction except id and make a new type
