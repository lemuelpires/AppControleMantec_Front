// src/pages/Clientes.js
import React, { useState } from 'react';
import { ClientesContainer, ClientesTitle, ClientesButton, ClientesTable } from './style';
import ModalDetalhes from '../../components/Modais/ModalDetalhes';
import ModalEdicao from '../../components/Modais/ModalEdicao';
import ModalNovo from '../../components/Modais/ModalNovo';

const Clientes = () => {
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
          {/* Exibir dados dinâmicos aqui */}
          <tr>
            <td>1</td>
            <td>Cliente A</td>
            <td>Endereço A</td>
            <td>(11) 99999-9999</td>
            <td>clienteA@example.com</td>
            <td>
              <button onClick={() => openDetalhesModal({id: 1, nome: 'Cliente A', endereco: 'Endereço A', telefone: '(11) 99999-9999', email: 'clienteA@example.com'})}>Detalhes</button>
              <button onClick={() => openEdicaoModal({id: 1, nome: 'Cliente A', endereco: 'Endereço A', telefone: '(11) 99999-9999', email: 'clienteA@example.com'})}>Editar</button>
            </td>
          </tr>
          {/* Outros clientes */}
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
