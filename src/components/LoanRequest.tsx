import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { createUser, getUsers } from '../services/api';
import { User } from '../types';

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

  const validateName = (name: string): boolean => {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+ [a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;
    return nameRegex.test(name);
  };

  const validateIdCard = (idCard: string): boolean => {
    const idCardRegex = /^\d+$/;
    return idCardRegex.test(idCard);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateName(user.name)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingrese un nombre completo (nombre y apellido, solo letras y espacios).',
      });
      return;
    }

    if (!validateIdCard(user.idCard)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La cédula debe contener solo números.',
      });
      return;
    }

    try {
      const users = await getUsers();
      const existingUser = users.find((u: User) => u.idCard === user.idCard);

      if (existingUser) {
        if (existingUser.loanStatus === 'rejected') {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No puedes solicitar un nuevo crédito porque fuiste rechazado previamente.',
          });
          return;
        }
        if (!existingUser.hasPaid) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No puedes solicitar un nuevo crédito porque tienes un préstamo pendiente.',
          });
          return;
        }
      }

      const response = await createUser(user);
      Swal.fire({
        icon: 'success',
        title: 'Solicitud enviada',
        text: `Estado: ${response.loanStatus === 'approved' ? 'Aprobado' : 'Rechazado'}`,
      });
      onSubmit();
      setUser({ ...user, name: '', email: '', idCard: '', loanAmount: 10000, paymentDate: '' });
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error || 'Error al enviar la solicitud',
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
      <Form.Group className="mb-3">
        <Form.Label>Nombre completo</Form.Label>
        <Form.Control
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
          placeholder="Ej: Juan Pérez"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Correo</Form.Label>
        <Form.Control
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
          placeholder="Ej: usuario@dominio.com"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Cédula</Form.Label>
        <Form.Control
          type="text"
          value={user.idCard}
          onChange={(e) => setUser({ ...user, idCard: e.target.value })}
          required
          placeholder="Ej: 123456789"
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