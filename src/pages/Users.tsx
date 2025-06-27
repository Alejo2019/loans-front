import React from 'react';
import { Table, Accordion } from 'react-bootstrap';
import { User, Loan } from '../types';

interface UsersProps {
  users: User[];
  loans: Loan[];
}

const Users: React.FC<UsersProps> = ({ users, loans }) => {
  const getUserLoans = (userId: string) => loans.filter((loan) => loan.userId === userId);

  return (
    <div>
      <h1>Usuarios Registrados</h1>
      {users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Cédula</th>
              <th>Historial de Créditos</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.idCard}</td>
                <td>
                  <Accordion>
                    <Accordion.Item eventKey={user.id!.toString()}>
                      <Accordion.Header>Ver Historial</Accordion.Header>
                      <Accordion.Body>
                        {getUserLoans(user.idCard).length === 0 ? (
                          <p>No hay historial de créditos.</p>
                        ) : (
                          <Table striped bordered hover size="sm">
                            <thead>
                              <tr>
                                <th>Monto</th>
                                <th>Estado</th>
                                <th>Pagado</th>
                                <th>Fecha de Pago</th>
                              </tr>
                            </thead>
                            <tbody>
                              {getUserLoans(user.idCard).map((loan) => (
                                <tr key={loan.id}>
                                  <td>${loan.amount.toLocaleString()}</td>
                                  <td>{loan.status === 'approved' ? 'Aprobado' : 'Rechazado'}</td>
                                  <td>{loan.hasPaid ? 'Sí' : 'No'}</td>
                                  <td>{loan.paymentDate || 'No especificada'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Users;