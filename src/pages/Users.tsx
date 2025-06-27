import React from 'react';
import UserList from '../components/UserList';

const Users: React.FC = () => {
  return (
    <div>
      <h1 className="mb-4">Lista de Usuarios</h1>
      <UserList />
    </div>
  );
};

export default Users;