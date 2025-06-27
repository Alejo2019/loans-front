import React from 'react';
import { Button } from 'react-bootstrap';

interface PaymentButtonProps {
  onPay: () => void;
  disabled: boolean;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ onPay, disabled }) => {
  return (
    <Button variant="success" onClick={onPay} disabled={disabled}>
      Pagar
    </Button>
  );
};

export default PaymentButton;