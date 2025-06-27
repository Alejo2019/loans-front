import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getBankCapital } from '../services/api';

const BankCapital: React.FC = () => {
  const [capital, setCapital] = useState<number>(0);

  useEffect(() => {
    const fetchCapital = async () => {
      const response = await getBankCapital();
      setCapital(response.capital);
    };
    fetchCapital();
  }, []);

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