import React from 'react';
import type { Transaction } from '../interfaces/Transaction';

interface BudgetSummaryProps {
    transactions: Transaction[];
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ transactions }) => {
    const income = transactions
        .filter(t => t.amount > 0)
        .reduce((acc, t) => acc + t.amount, 0);

    const expense = transactions
        .filter(t => t.amount < 0)
        .reduce((acc, t) => acc + Math.abs(t.amount), 0);

    const balance = income - expense;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-gray-500 text-sm font-medium uppercase">Income</h3>
                <p className="text-2xl font-bold text-green-600">${income.toFixed(2)}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                <h3 className="text-gray-500 text-sm font-medium uppercase">Expense</h3>
                <p className="text-2xl font-bold text-red-600">${expense.toFixed(2)}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-gray-500 text-sm font-medium uppercase">Balance</h3>
                <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    ${balance.toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default BudgetSummary;
