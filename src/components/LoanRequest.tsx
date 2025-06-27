import React, { useState } from 'react';
import { User } from '../types';
import { Form, Button } from 'react-bootstrap';
import { createUser } from '../services/api';

interface LoanRequestProps {
  onSubmit: () => void;
}

const LoanRequest: React.FC<LoanRequestProps> = ({ onSubmit }) => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    idCard: '',
    loanAmount: 10000,
    loanStatus: 'rejected',
    hasPaid: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(user);
      onSubmit();
      alert('Solicitud enviada');
    } catch (error) {
      alert('Error al enviar la solicitud');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Correo</Form.Label>
        <Form.Control
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Cédula</Form.Label>
        <Form.Control
          type="text"
          value={user.idCard}
          onChange={(e) => setUser({ ...user, idCard: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Monto del préstamo (10,000 - 100,000)</Form.Label>
        <Form.Range
          min={10000}
          max={100000}
          step={1000}
          value={user.loanAmount}
          onChange={(e) => setUser({ ...user, loanAmount: Number(e.target.value) })}
        />
        <Form.Text>${user.loanAmount.toLocaleString()}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Fecha de pago (opcional)</Form.Label>
        <Form.Control
          type="date"
          value={user.paymentDate || ''}
          onChange={(e) => setUser({ ...user, paymentDate: e.target.value })}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Solicitar Préstamo
      </Button>
    </Form>
  );
};

export default LoanRequest;