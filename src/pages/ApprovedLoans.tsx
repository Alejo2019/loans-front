import React from 'react';
import LoanList from '../components/LoanList';

const ApprovedLoans: React.FC = () => {
  return (
    <div>
      <h1 className="mb-4">Préstamos Aprobados</h1>
      <LoanList status="approved" />
    </div>
  );
};

export default ApprovedLoans;