import React, { useState, useEffect } from 'react';
import { ClientesContainer, ClientesTitle, ClientesButton, ClientesTable, BotaoEspacamento, IconWrapper } from './style';
import ModalDetalhes from '../../components/Modais/Cliente/ModalDetalhes';
import ModalEdicao from '../../components/Modais/Cliente/ModalEdicao';
import ModalNovo from '../../components/Modais/Cliente/ModalNovo';
import apiCliente from '../../services/apiCliente';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEdit, faTrash, faPlusCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons/faPlusSquare';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';

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
    setSelectedItem(null); // Limpa o item selecionado para adicionar novo
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
        <ClientesButton onClick={openNovoModal}>
          <FontAwesomeIcon icon={faPlus} style={{ color: 'white' }} />
        </ClientesButton>
      </BotaoEspacamento>
      <ClientesTable>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Data de Cadastro</th>
            <th style={{ textAlign: 'center' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>{new Date(cliente.dataCadastro).toLocaleDateString()}</td>
              <td>
                <IconWrapper>
                  <FontAwesomeIcon icon={faEye} style={{ cursor: 'pointer' }} onClick={() => openDetalhesModal(cliente)} />
                  <FontAwesomeIcon icon={faEdit} style={{cursor: 'pointer' }} onClick={() => openEdicaoModal(cliente)} />
                  <FontAwesomeIcon icon={faTrash} style={{cursor: 'pointer' }} onClick={() => handleExcluir(cliente.id)} />
                </IconWrapper>
              </td>
            </tr>
          ))}
        </tbody>
      </ClientesTable>
      <ModalDetalhes isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicao isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovo isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </ClientesContainer>
  );
};

export default Clientes;
