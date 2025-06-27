import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import BankCapital from './components/BankCapital';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = lazy(() => import('./pages/Home'));
const Users = lazy(() => import('./pages/Users'));
const ApprovedLoans = lazy(() => import('./pages/ApprovedLoans'));
const RejectedLoans = lazy(() => import('./pages/RejectedLoans'));

const App: React.FC = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Cotel</Navbar.Brand>
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
        <BankCapital />
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/approved" element={<ApprovedLoans />} />
            <Route path="/rejected" element={<RejectedLoans />} />
          </Routes>
        </Suspense>
      </Container>
    </Router>
  );
};

export default App;