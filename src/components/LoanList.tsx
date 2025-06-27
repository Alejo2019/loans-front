import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Loan } from "../types";
import { getLoans, payLoan } from "../services/api";

interface LoanListProps {
  status: "approved" | "rejected";
}

const LoanList: React.FC<LoanListProps> = ({ status }) => {
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await getLoans();
      setLoans(response.filter((loan: Loan) => loan.status === status));
    };
    fetchLoans();
  }, [status]);

  const handlePay = async (loanId: number) => {
    try {
      await payLoan(loanId);
      setLoans(
        loans.map((loan) =>
          loan.id === loanId ? { ...loan, hasPaid: true } : loan
        )
      );
      alert("Préstamo pagado");
    } catch (error) {
      alert("Error al procesar el pago");
    }
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Monto</th>
          <th>Estado</th>
          {status === "approved" && <th>Acción</th>}
        </tr>
      </thead>
      <tbody>
        {loans.map((loan) => (
          <tr key={loan.id}>
            <td>{loan.userId}</td>
            <td>${loan.amount.toLocaleString()}</td>
            <td>{loan.status}</td>
            {status === "approved" && !loan.hasPaid && (
              <td>
                <Button variant="success" onClick={() => handlePay(loan.id!)}>
                  Pagar
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default LoanList;
