import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import io from 'socket.io-client';
import BankCapital from './components/BankCapital';
import LoanRequest from './components/LoanRequest';
import { getUsers, getLoans, getBankCapital } from './services/api';
import { User, Loan, Bank } from './types';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io('http://localhost:3001', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const Home = lazy(() => import('./pages/Home'));
const Users = lazy(() => import('./pages/Users'));
const ApprovedLoans = lazy(() => import('./pages/ApprovedLoans'));
const RejectedLoans = lazy(() => import('./pages/RejectedLoans'));

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [bankCapital, setBankCapital] = useState<Bank>({ capital: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersData, loansData, bankData] = await Promise.all([
        getUsers(),
        getLoans(),
        getBankCapital(),
      ]);
      setUsers(usersData);
      setLoans(loansData);
      setBankCapital(bankData);
      console.log('Datos recargados - Capital:', bankData.capital, 'Usuarios:', usersData.length, 'Préstamos:', loansData.length);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    socket.on('connect', () => {
      console.log('Conectado al WebSocket');
    });

    socket.on('dataUpdated', (data) => {
      setUsers(data.users || []);
      setLoans(data.loans || []);
      setBankCapital(data.bank || { capital: 0 });
      console.log('Datos recibidos vía WebSocket:', data);
    });

    socket.on('disconnect', () => {
      console.log('Desconectado del WebSocket');
    });

    return () => {
      socket.off('connect');
      socket.off('dataUpdated');
      socket.off('disconnect');
    };
  }, []);

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Prueba</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link href="/">Inicio</Nav.Link>
              <Nav.Link href="/users">Usuarios</Nav.Link>
              <Nav.Link href="/approved">Préstamos Aprobados</Nav.Link>
              <Nav.Link href="/rejected">Préstamos Rechazados</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="my-4">
        <BankCapital capital={bankCapital.capital} />
        {message && <div className="alert alert-info">{message}</div>}
        {loading ? (
          <div>Cargando datos...</div>
        ) : (
          <Suspense fallback={<div>Cargando componentes...</div>}>
            <Routes>
              <Route
                path="/"
                element={
                  <Home>
                    <LoanRequest onSubmit={fetchData} />
                  </Home>
                }
              />
              <Route path="/users" element={<Users users={users} loans={loans} />} />
              <Route path="/approved" element={<ApprovedLoans loans={loans} users={users} />} />
              <Route path="/rejected" element={<RejectedLoans loans={loans} users={users} />} />
            </Routes>
          </Suspense>
        )}
      </Container>
    </Router>
  );
};

export default App;