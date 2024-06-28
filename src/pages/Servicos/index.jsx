// src/pages/Servico.js
import React, { useState } from 'react';
import { ServicoContainer, ServicoTitle, ServicoButton, ServicoTable } from './style';
import ModalDetalhes from '../../components/Modais/ModalDetalhes';
import ModalEdicao from '../../components/Modais/ModalEdicao';
import ModalNovo from '../../components/Modais/ModalNovo';

const Servico = () => {
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
    <ServicoContainer>
      <ServicoTitle>Serviços</ServicoTitle>
      <ServicoButton onClick={openNovoModal}>Adicionar Serviço</ServicoButton>
      <ServicoTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* Exibir dados dinâmicos aqui */}
          <tr>
            <td>1</td>
            <td>Serviço A</td>
            <td>Descrição do Serviço A</td>
            <td>50.00</td>
            <td>
              <button onClick={() => openDetalhesModal({ id: 1, nome: 'Serviço A', descricao: 'Descrição do Serviço A', preco: 50.00 })}>Detalhes</button>
              <button onClick={() => openEdicaoModal({ id: 1, nome: 'Serviço A', descricao: 'Descrição do Serviço A', preco: 50.00 })}>Editar</button>
            </td>
          </tr>
          {/* Outros serviços */}
        </tbody>
      </ServicoTable>

      {/* Modais */}
      <ModalDetalhes isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicao isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovo isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </ServicoContainer>
  );
};

export default Servico;
