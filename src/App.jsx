import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Clientes from './pages/Clientes';
import Funcionarios from './pages/Funcionarios';
import Estoque from './pages/Estoques';
import OrdemDeServico from './pages/OrdensDeServico';
import Produtos from './pages/Produtos';
import Servicos from './pages/Servicos';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Modal from 'react-modal';
import Celular from './components/PaginasComuns/Celular';
import Computador from './components/PaginasComuns/Computador';
import Tablet from './components/PaginasComuns/Tablet';
import Notebook from './components/PaginasComuns/Notebook';
import Login from './components/Modais/Login';
import Unauthorized from './components/Modais/Unauthorized';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './routes/protectedRoute';
import ModalCadastroUsuario from './components/Modais/CadastroUsuario';

Modal.setAppElement('#root');

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/clientes" element={<ProtectedRoute element={<Clientes />} />} />
          <Route path="/funcionarios" element={<ProtectedRoute element={<Funcionarios />} />} />
          <Route path="/estoque" element={<ProtectedRoute element={<Estoque />} />} />
          <Route path="/ordem-de-servico" element={<ProtectedRoute element={<OrdemDeServico />} />} />
          <Route path="/produtos" element={<ProtectedRoute element={<Produtos />} />} />
          <Route path="/servicos" element={<ProtectedRoute element={<Servicos />} />} />
          <Route path="/cadastro-usuario" element={<ProtectedRoute element={<ModalCadastroUsuario />} />} />
          <Route path="/celular" element={<Celular />} />
          <Route path="/computador" element={<Computador />} />
          <Route path="/tablet" element={<Tablet />} />
          <Route path="/notebook" element={<Notebook />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
