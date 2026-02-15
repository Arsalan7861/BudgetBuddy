import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory data store
let transactions = [
  { id: 1, text: 'Salary', amount: 5000, category: 'Income', date: '2023-10-01' },
  { id: 2, text: 'Rent', amount: -1200, category: 'Housing', date: '2023-10-02' },
  { id: 3, text: 'Groceries', amount: -300, category: 'Food', date: '2023-10-03' }
];

// Routes
app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

app.post('/api/transactions', (req, res) => {
  const { text, amount, category, date } = req.body;
  const newTransaction = {
    id: transactions.length ? transactions[transactions.length - 1].id + 1 : 1,
    text,
    amount,
    category,
    date: date || new Date().toISOString().split('T')[0]
  };
  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

app.put('/api/transactions/:id', (req, res) => {
  const { id } = req.params;
  const { text, amount, category, date } = req.body;
  const index = transactions.findIndex(t => t.id === parseInt(id));

  if (index !== -1) {
    transactions[index] = { ...transactions[index], text, amount, category, date };
    res.json(transactions[index]);
  } else {
    res.status(404).json({ message: 'Transaction not found' });
  }
});

app.delete('/api/transactions/:id', (req, res) => {
  const { id } = req.params;
  transactions = transactions.filter(t => t.id !== parseInt(id));
  res.json({ message: 'Transaction deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
