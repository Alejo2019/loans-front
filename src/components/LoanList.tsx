import React from 'react';
import { Table } from 'react-bootstrap';
import { Loan, User } from '../types';
import PaymentButton from './PaymentButton';
import { payLoan } from '../services/api';

interface LoanListProps {
  loans: Loan[];
  users: User[];
  status: 'approved' | 'rejected';
  onLoanPaid?: () => void;
}

const LoanList: React.FC<LoanListProps> = ({ loans, users, status, onLoanPaid }) => {
  const handlePay = async (loanId: number) => {
    try {
      await payLoan(loanId);
      alert('Préstamo pagado');
      if (onLoanPaid) onLoanPaid();
    } catch (error: any) {
      alert(error || 'Error al procesar el pago');
    }
  };

  const getUserName = (userId: string) => {
    const user = users.find((u) => u.idCard === userId);
    return user ? user.name : 'Desconocido';
  };

  const filteredLoans = loans.filter((loan) => loan.status === status && (status === 'approved' ? !loan.hasPaid : true));

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Monto</th>
          <th>Estado</th>
          {status === 'approved' && <th>Acción</th>}
        </tr>
      </thead>
      <tbody>
        {filteredLoans.map((loan) => (
          <tr key={loan.id}>
            <td>{getUserName(loan.userId)}</td>
            <td>${loan.amount.toLocaleString()}</td>
            <td>{loan.status === 'approved' ? 'Aprobado' : 'Rechazado'}</td>
            {status === 'approved' && !loan.hasPaid && (
              <td>
                <PaymentButton onPay={() => handlePay(loan.id!)} disabled={loan.hasPaid} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default LoanList;