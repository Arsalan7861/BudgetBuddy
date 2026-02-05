import React, { useState, useEffect } from 'react';
import type { TransactionInput, Transaction } from '../interfaces/Transaction';

interface TransactionFormProps {
    onSave: (transaction: TransactionInput) => void;
    editingTransaction?: Transaction | null;
    onCancelEdit: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSave, editingTransaction, onCancelEdit }) => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState<string>('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        if (editingTransaction) {
            setText(editingTransaction.text);
            setAmount(Math.abs(editingTransaction.amount).toString()); // Always show positive in input
            setCategory(editingTransaction.category);
            setDate(editingTransaction.date);
        } else {
            resetForm();
        }
    }, [editingTransaction]);

    const resetForm = () => {
        setText('');
        setAmount('');
        setCategory('');
        setDate(new Date().toISOString().split('T')[0]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        if (!text || !amount || !category) return;

        const isExpense = type === 'expense';
        const finalAmount = isExpense ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount));

        onSave({
            text,
            amount: finalAmount,
            category,
            date
        });

        if (!editingTransaction) resetForm();
    };

    const [type, setType] = useState<'income' | 'expense'>('expense');

    // Update type when editing
    useEffect(() => {
        if (editingTransaction) {
            setType(editingTransaction.amount >= 0 ? 'income' : 'expense');
        }
    }, [editingTransaction]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
                {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <div className="flex rounded-md shadow-sm" role="group">
                            <button
                                type="button"
                                onClick={() => setType('income')}
                                className={`cursor-pointer px-4 py-2 text-sm font-medium w-full rounded-l-lg border ${type === 'income'
                                    ? 'bg-green-100 text-green-700 border-green-200'
                                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                Income
                            </button>
                            <button
                                type="button"
                                onClick={() => setType('expense')}
                                className={`cursor-pointer px-4 py-2 text-sm font-medium w-full rounded-r-lg border ${type === 'expense'
                                    ? 'bg-red-100 text-red-700 border-red-200'
                                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                Expense
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="e.g. Salary, Rent"
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g. Food, Housing, Work"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                        required
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="flex-1 cursor-pointer bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-200 font-medium"
                    >
                        {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
                    </button>
                    {editingTransaction && (
                        <button
                            type="button"
                            onClick={() => { resetForm(); onCancelEdit(); }}
                            className="cursor-pointer bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition duration-200 font-medium"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default TransactionForm;
