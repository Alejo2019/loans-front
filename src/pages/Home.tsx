import React from 'react';
import LoanRequest from '../components/LoanRequest';

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="mb-4">Solicitar Préstamo</h1>
      <LoanRequest onSubmit={() => window.location.reload()} />
    </div>
  );
};

export default Home;