import { createClient } from "@/utils/supabase/client";
import { Transaction } from "./types";

const supabase = createClient();

export const addTransaction = async (transaction: Transaction) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert([transaction]);
  if (error) throw error;
  return data;
};

export const updateTransaction = async (id: String, updates: any) => {
  const { data, error } = await supabase
    .from('transactions')
    .update(updates)
    .eq('id', id);
  if (error) throw error;
  return data;
};

export const deleteTransaction = async (id: String) => {
  const { data, error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return data;
};

export const getTransactions = async (userId: String) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data;
};

// There's a bug in the supabase auth helper react tools, therefore
// I return supabase and use that, instead of calling createClient() repeatedly.
export const getUser = async () => {
  return supabase;
}