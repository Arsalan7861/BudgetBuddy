import React from 'react';
import type { Transaction } from '../interfaces/Transaction';

interface TransactionItemProps {
    transaction: Transaction;
    onDelete: (id: number) => void;
    onEdit: (transaction: Transaction) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onDelete, onEdit }) => {
    const isIncome = transaction.amount > 0;

    return (
        <div className={`flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-2 border-l-4 ${isIncome ? 'border-green-500' : 'border-red-500'}`}>
            <div>
                <p className="font-semibold text-gray-800">{transaction.text}</p>
                <span className="text-xs text-gray-500 mr-2">
                    {new Date(transaction.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">{transaction.category}</span>
            </div>
            <div className="flex items-center gap-4">
                <span className={`font-bold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                    {isIncome ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(transaction)}
                        className="cursor-pointer text-sm text-blue-500 hover:text-blue-700 font-medium"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(transaction.id)}
                        className="cursor-pointer text-sm text-red-500 hover:text-red-700 font-medium"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionItem;
