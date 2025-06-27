import React from 'react';
import LoanList from '../components/LoanList';

const RejectedLoans: React.FC = () => {
  return (
    <div>
      <h1 className="mb-4">Préstamos Rechazados</h1>
      <LoanList status="rejected" />
    </div>
  );
};

export default RejectedLoans;