// src/pages/Estoque.js
import React, { useState } from 'react';
import { EstoqueContainer, EstoqueTitle, EstoqueButton, EstoqueTable } from './style';
import ModalDetalhes from '../../components/Modais/ModalDetalhes';
import ModalEdicao from '../../components/Modais/ModalEdicao';
import ModalNovo from '../../components/Modais/ModalNovo';

const Estoque = () => {
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
    <EstoqueContainer>
      <EstoqueTitle>Estoque</EstoqueTitle>
      <EstoqueButton onClick={openNovoModal}>Adicionar Item ao Estoque</EstoqueButton>
      <EstoqueTable>
        <thead>
          <tr>
            <th>Produto ID</th>
            <th>Quantidade</th>
            <th>Data de Atualização</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* Exibir dados dinâmicos aqui */}
          <tr>
            <td>1</td>
            <td>10</td>
            <td>2024-06-26T20:55:09.178Z</td>
            <td>
              <button onClick={() => openDetalhesModal({ produtoID: '1', quantidade: 10, dataAtualizacao: '2024-06-26T20:55:09.178Z' })}>Detalhes</button>
              <button onClick={() => openEdicaoModal({ produtoID: '1', quantidade: 10, dataAtualizacao: '2024-06-26T20:55:09.178Z' })}>Editar</button>
            </td>
          </tr>
          {/* Outros itens do estoque */}
        </tbody>
      </EstoqueTable>

      {/* Modais */}
      <ModalDetalhes isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicao isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovo isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </EstoqueContainer>
  );
};

export default Estoque;
