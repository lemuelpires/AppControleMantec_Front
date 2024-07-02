import React, { useState, useEffect } from 'react';
import { ClientesContainer, ClientesTitle, ClientesButton, ClientesTable, BotaoEspacamento } from './style';
import ModalDetalhes from '../../components/Modais/Cliente/ModalDetalhes';
import ModalEdicao from '../../components/Modais/Cliente/ModalEdicao';
import ModalNovo from '../../components/Modais/Cliente/ModalNovo';
import apiCliente from '../../services/apiCliente';
import Modal from 'react-modal';

// Defina o elemento de aplicação para react-modal
Modal.setAppElement('#root');

const Clientes = () => {
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await apiCliente.get('/Cliente');
      setClientes(response.data.filter(cliente => cliente.ativo)); // Exibir apenas clientes ativos
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm('Deseja excluir esse cliente?');
    if (confirmar) {
      try {
        const response = await apiCliente.delete(`/Cliente/Desativar/${id}`);
        console.log('Cliente Excluído:', response.data);
        fetchClientes(); // Atualiza lista de clientes após desativar
        alert('Cliente excluído com sucesso!');
      } catch (error) {
        if (error.response) {
          console.error('Erro ao desativar cliente:', error.response.data);
        } else {
          console.error('Erro desconhecido ao desativar cliente:', error.message);
        }
      }
    }
  };

  const openDetalhesModal = (item) => {
    setSelectedItem(item);
    setIsDetalhesModalOpen(true);
  };

  const openEdicaoModal = (item) => {
    setSelectedItem(item);
    setIsEdicaoModalOpen(true);
  };

  const openNovoModal = () => {
    setIsNovoModalOpen(true);
  };

  const closeModal = () => {
    setIsDetalhesModalOpen(false);
    setIsEdicaoModalOpen(false);
    setIsNovoModalOpen(false);
    setSelectedItem(null);
  };

  const handleSave = async (formData) => {
    try {
      if (formData.id) {
        // Atualização de cliente existente
        const response = await apiCliente.put(`/Cliente/${formData.id}`, formData);
        console.log('Cliente atualizado:', response.data);
      } else {
        // Criação de novo cliente
        const response = await apiCliente.post('/Cliente', formData);
        console.log('Novo cliente criado:', response.data);
      }
      fetchClientes();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  return (
    <ClientesContainer>
      <ClientesTitle>Clientes</ClientesTitle>
      <BotaoEspacamento>
        <ClientesButton onClick={openNovoModal}>Adicionar Cliente</ClientesButton>
      </BotaoEspacamento>
      <ClientesTable>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.endereco}</td>
              <td>{cliente.telefone}</td>
              <td>{cliente.email}</td>
              <td>
                <button onClick={() => openDetalhesModal(cliente)}>Detalhes</button>
                <button onClick={() => openEdicaoModal(cliente)}>Editar</button>
                <button onClick={() => handleExcluir(cliente.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </ClientesTable>

      {/* Modais */}
      <ModalDetalhes isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicao isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovo isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </ClientesContainer>
  );
};

export default Clientes;
