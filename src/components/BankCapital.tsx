import React from 'react';
import { Card } from 'react-bootstrap';

interface BankCapitalProps {
  capital: number;
}

const BankCapital: React.FC<BankCapitalProps> = ({ capital }) => {
  return (
    <Card className="text-center mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>Capital del Banco</Card.Title>
        <Card.Text className="display-6">${capital.toLocaleString()}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BankCapital;