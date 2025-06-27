import React from 'react';
import { Table } from 'react-bootstrap';
import { Loan, User } from '../types';

interface RejectedLoansProps {
  loans: Loan[];
  users: User[];
}

const RejectedLoans: React.FC<RejectedLoansProps> = ({ loans, users }) => {
  const getUserName = (userId: string) => {
    const user = users.find((u) => u.idCard === userId);
    return user ? user.name : 'Desconocido';
  };

  const rejectedLoans = loans.filter((loan) => loan.status === 'rejected');

  return (
    <div>
      <h1>Préstamos Rechazados</h1>
      {rejectedLoans.length === 0 ? (
        <p>No hay préstamos rechazados.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Monto Solicitado</th>
            </tr>
          </thead>
          <tbody>
            {rejectedLoans.map((loan) => (
              <tr key={loan.id}>
                <td>{getUserName(loan.userId)}</td>
                <td>${loan.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default RejectedLoans;