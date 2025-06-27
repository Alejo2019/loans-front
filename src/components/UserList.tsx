import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { User } from '../types';
import { getUsers } from '../services/api';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      setUsers(response);
    };
    fetchUsers();
  }, []);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Cédula</th>
          <th>Monto Solicitado</th>
          <th>Estado</th>
          <th>Pagado</th>
          <th>Fecha de Pago</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.idCard}</td>
            <td>${user.loanAmount.toLocaleString()}</td>
            <td>{user.loanStatus}</td>
            <td>{user.hasPaid ? 'Sí' : 'No'}</td>
            <td>{user.paymentDate || '-'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserList;