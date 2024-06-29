import React, { useState, useEffect } from 'react';
import { ClientesContainer, ClientesTitle, ClientesButton, ClientesTable } from './style';
import ModalDetalhes from '../../components/Modais/ModalDetalhes';
import ModalEdicao from '../../components/Modais/ModalEdicao';
import ModalNovo from '../../components/Modais/ModalNovo';
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
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
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
    setSelectedItem(null);
    setIsNovoModalOpen(true);
  };

  const closeModal = () => {
    setIsDetalhesModalOpen(false);
    setIsEdicaoModalOpen(false);
    setIsNovoModalOpen(false);
    setSelectedItem(null);
  };

  const handleSave = (item) => {
    // Lógica para salvar o item (novo ou editado)
    console.log(item);
    closeModal();
    fetchClientes(); // Refetch clientes após salvar um novo ou editado
  };

  return (
    <ClientesContainer>
      <ClientesTitle>Clientes</ClientesTitle>
      <ClientesButton onClick={openNovoModal}>Adicionar Cliente</ClientesButton>
      <ClientesTable>
        <thead>
          <tr>
            <th>ID</th>
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
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.endereco}</td>
              <td>{cliente.telefone}</td>
              <td>{cliente.email}</td>
              <td>
                <button onClick={() => openDetalhesModal(cliente)}>Detalhes</button>
                <button onClick={() => openEdicaoModal(cliente)}>Editar</button>
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
