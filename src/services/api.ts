import axios from 'axios';
import { User } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const createUser = async (user: User) => {
  try {
    console.log('Enviando solicitud a:', `${API_URL}/users`, 'con datos:', user);
    const response = await axios.post(`${API_URL}/users`, user);
    console.log('Respuesta del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    console.log('Obteniendo usuarios desde:', `${API_URL}/users`);
    const response = await axios.get(`${API_URL}/users`);
    console.log('Usuarios obtenidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getLoans = async () => {
  try {
    console.log('Obteniendo préstamos desde:', `${API_URL}/loans`);
    const response = await axios.get(`${API_URL}/loans`);
    console.log('Préstamos obtenidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching loans:', error);
    throw error;
  }
};

export const payLoan = async (loanId: number) => {
  try {
    console.log('Pagando préstamo en:', `${API_URL}/loans/${loanId}`);
    const response = await axios.patch(`${API_URL}/loans/${loanId}`, { hasPaid: true });
    console.log('Respuesta del pago:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error paying loan:', error);
    throw error;
  }
};

export const getBankCapital = async () => {
  try {
    console.log('Obteniendo capital desde:', `${API_URL}/bank`);
    const response = await axios.get(`${API_URL}/bank`);
    console.log('Capital obtenido:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching bank capital:', error);
    throw error;
  }
};

export const updateBankCapital = async (capital: number) => {
  try {
    console.log('Actualizando capital en:', `${API_URL}/bank`, 'con valor:', capital);
    const response = await axios.patch(`${API_URL}/bank`, { capital });
    console.log('Respuesta de actualización:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating bank capital:', error);
    throw error;
  }
};