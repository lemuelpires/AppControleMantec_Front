import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Clientes from './pages/Clientes';
import Funcionarios from './pages/Funcionarios';
import Estoque from './pages/Estoques';
import OrdemDeServico from './pages/OrdensDeServico';
import Vendas from './pages/Vendas';
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
import ModalLogin from './components/Modais/Login';
import Unauthorized from './components/Modais/Unauthorized';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './routes/protectedRoute';
import ModalCadastroUsuario from './components/Modais/CadastroUsuario';
import ResetPasswordModal from './components/Modais/RedefinicaoSenha';
import StatusOS from './pages/Status';

Modal.setAppElement('#root');

// Componente wrapper para ter acesso ao useNavigate
const UnauthorizedWrapper = () => {
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  const handleGoBack = () => {
    window.history.back();
  };
  
  return (
    <Unauthorized 
      onGoHome={handleGoHome}
      onGoBack={handleGoBack}
    />
  );
};

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCadastroUsuarioOpen, setIsCadastroUsuarioOpen] = useState(false);

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const toggleCadastroUsuarioModal = () => {
    setIsCadastroUsuarioOpen(!isCadastroUsuarioOpen);
  };

  return (
    <AuthProvider>
      <Router>
        <Header 
          onLoginClick={toggleLoginModal}
          onCadastroUsuarioClick={toggleCadastroUsuarioModal}
        />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<UnauthorizedWrapper />} />
          <Route path="/clientes" element={<ProtectedRoute element={<Clientes />} />} />
          <Route path="/funcionarios" element={<ProtectedRoute element={<Funcionarios />} />} />
          <Route path="/estoque" element={<ProtectedRoute element={<Estoque />} />} />
          <Route path="/ordem-de-servico" element={<ProtectedRoute element={<OrdemDeServico />} />} />
          <Route path="/vendas" element={<ProtectedRoute element={<Vendas />} />} />
          <Route path="/produtos" element={<ProtectedRoute element={<Produtos />} />} />
          <Route path="/servicos" element={<ProtectedRoute element={<Servicos />} />} />
          <Route path="/cadastro-usuario" element={<ProtectedRoute element={<ModalCadastroUsuario />} />} />
          <Route path="/celular" element={<Celular />} />
          <Route path="/computador" element={<Computador />} />
          <Route path="/tablet" element={<Tablet />} />
          <Route path="/notebook" element={<Notebook />} />
          <Route path="/esqueci-senha" element={<ResetPasswordModal />} />
          <Route path="/status-os" element={<StatusOS />} />
          <Route path="/ordem-os/:id" element={<StatusOS />} />
        </Routes>
        <Footer />
        <ModalLogin isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        <ModalCadastroUsuario isOpen={isCadastroUsuarioOpen} onClose={() => setIsCadastroUsuarioOpen(false)} />
      </Router>
    </AuthProvider>
  );
}

export default App;
