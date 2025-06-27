import axios from 'axios';
import { User } from '../types';

const API_URL = process.env.REACT_APP_API_URL;

export const createUser = async (user: User) => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getLoans = async () => {
  const response = await axios.get(`${API_URL}/loans`);
  return response.data;
};

export const payLoan = async (loanId: number) => {
  const response = await axios.patch(`${API_URL}/loans/${loanId}`, { hasPaid: true });
  return response.data;
};

export const getBankCapital = async () => {
  const response = await axios.get(`${API_URL}/bank`);
  return response.data;
};

export const updateBankCapital = async (capital: number) => {
  const response = await axios.patch(`${API_URL}/bank`, { capital });
  return response.data;
};