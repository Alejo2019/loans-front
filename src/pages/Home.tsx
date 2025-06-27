import React from 'react';

interface HomeProps {
  children: React.ReactNode;
}

const Home: React.FC<HomeProps> = ({ children }) => {
  return (
    <div>
      <h1>Bienvenido a Cotel</h1>
      <p>Solicita un préstamo o revisa el estado de tus solicitudes.</p>
      {children}
    </div>
  );
};

export default Home;