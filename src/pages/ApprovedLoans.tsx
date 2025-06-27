import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { payLoan } from '../services/api';
import { Loan, User } from '../types';

interface ApprovedLoansProps {
  loans: Loan[];
  users: User[];
}

const ApprovedLoans: React.FC<ApprovedLoansProps> = ({ loans, users }) => {
  const handlePay = async (loanId: number) => {
    try {
      await payLoan(loanId);
      alert('Préstamo pagado');
      // Recarga manual (depende de App.tsx para recargar datos)
    } catch (error) {
      console.error('Error al pagar:', error);
      alert('Error al procesar el pago');
    }
  };

  const getUserName = (userId: string) => {
    const user = users.find((u) => u.idCard === userId);
    return user ? user.name : 'Desconocido';
  };

  const approvedLoans = loans.filter((loan) => loan.status === 'approved' && !loan.hasPaid);

  return (
    <div>
      <h1>Préstamos Aprobados Pendientes</h1>
      {approvedLoans.length === 0 ? (
        <p>No hay préstamos aprobados pendientes.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Monto</th>
              <th>Fecha de Pago</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {approvedLoans.map((loan) => (
              <tr key={loan.id}>
                <td>{getUserName(loan.userId)}</td>
                <td>${loan.amount.toLocaleString()}</td>
                <td>{loan.paymentDate || 'No especificada'}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handlePay(loan.id!)}
                    disabled={loan.hasPaid}
                  >
                    Pagar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ApprovedLoans;