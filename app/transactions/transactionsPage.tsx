"use client";
import { useEffect, useState } from 'react';
import { Transaction } from '@/services/types';
import {
  getTransactions,
  getUser,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from '@/services/transactionService';
import { User } from '@supabase/auth-helpers-react';
import TableComponent from '@/components/transactions/TransactionsTable';
import FormDialog from '@/components/transactions/AddTransactionModal';
import { v4 } from 'uuid';

const Transactions = () => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    handleGetUser()
  }, []);

  useEffect(() => {
    if (user) {
      fetchTransactions(user.id);
    }
  }, [user]);

  const fetchTransactions = (userId: string) => {
    getTransactions(userId)
      .then(data => {
        setTransactions(data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error.message);
      });
  };

  const handleAddTransaction = (currentTransaction: Transaction) => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }
    const newTransaction: Transaction = {
        id: v4(),
        user_id: user.id,
        title: currentTransaction.title,
        description: currentTransaction.description,
        date: currentTransaction.date,
        total_amount: currentTransaction.total_amount
    }

    addTransaction(newTransaction)
    fetchTransactions(user!.id)
  };

  const handleGetUser = async () => {
    (await getUser()).auth.getUser().then((response: any) => {
        setUser(response.data?.user ?? null);
      }).catch((error: { message: any; }) => {
        console.error('Error fetching user:', error.message);
      });
  };

  const handleUpdateTransaction = (id: string, updates: Partial<Transaction>) => {
    updateTransaction(id, updates)
      .then(() => {
        fetchTransactions(user!.id);
      })
      .catch(error => {
        console.error('Error updating transaction:', error.message);
      });
  };

  const handleDeleteTransaction = (id: string) => {
    deleteTransaction(id)
      .then(() => {
        fetchTransactions(user!.id);
      })
      .catch(error => {
        console.error('Error deleting transaction:', error.message);
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-[hsl(var(--background))] text-[hsl(var(--foreground))]'>
        <h1>Transactions</h1>
        <TableComponent data={transactions} onEdit={handleUpdateTransaction} onDelete={handleDeleteTransaction} />
        <FormDialog onSubmit={handleAddTransaction} />
    </div>
  );
  };

  export default Transactions;