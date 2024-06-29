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

Modal.setAppElement('#root');

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/ordem-de-servico" element={<OrdemDeServico />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/servicos" element={<Servicos />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
