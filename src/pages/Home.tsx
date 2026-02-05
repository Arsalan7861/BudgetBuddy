import React, { useState, useEffect } from 'react';
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from '../services/api';
import type { Transaction, TransactionInput } from '../interfaces/Transaction';
import TransactionForm from '../components/TransactionForm';
import TransactionItem from '../components/TransactionItem';
import BudgetSummary from '../components/BudgetSummary';

const Home: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTransaction = async (transaction: TransactionInput) => {
        try {
            if (editingTransaction) {
                const updated = await updateTransaction(editingTransaction.id, transaction);
                setTransactions(prev => prev.map(t => t.id === updated.id ? updated : t));
                setEditingTransaction(null);
            } else {
                const newTransaction = await addTransaction(transaction);
                setTransactions([...transactions, newTransaction]);
            }
        } catch (error) {
            console.error('Error saving transaction:', error);
        }
    };

    const handleEdit = (transaction: Transaction) => {
        setEditingTransaction(transaction);
        // Scroll to top for better UX on mobile/small screens
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingTransaction(null);
    };

    const handleDelete = async (id: number) => {
        try {
            if (!confirm("Are you sure you want to delete this transaction?")) {
                return;
            }
            await deleteTransaction(id);
            setTransactions(transactions.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold text-indigo-900 tracking-tight">BudgetBuddy</h1>
                    <p className="text-gray-500 mt-2">Take control of your finances</p>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    <>
                        <BudgetSummary transactions={transactions} />

                        <TransactionForm
                            onSave={handleAddTransaction}
                            editingTransaction={editingTransaction}
                            onCancelEdit={handleCancelEdit}
                        />

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Recent Transactions</h3>
                            {transactions.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No transactions yet. Add one above!</p>
                            ) : (
                                <div className="space-y-2">
                                    {[...transactions].reverse().map(t => (
                                        <TransactionItem
                                            key={t.id}
                                            transaction={t}
                                            onDelete={handleDelete}
                                            onEdit={handleEdit}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
