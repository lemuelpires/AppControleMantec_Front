// src/pages/Produto.js
import React, { useState } from 'react';
import { ProdutoContainer, ProdutoTitle, ProdutoButton, ProdutoTable } from './style';
import ModalDetalhes from '../../components/Modais/ModalDetalhes';
import ModalEdicao from '../../components/Modais/ModalEdicao';
import ModalNovo from '../../components/Modais/ModalNovo';

const Produto = () => {
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
    <ProdutoContainer>
      <ProdutoTitle>Produtos</ProdutoTitle>
      <ProdutoButton onClick={openNovoModal}>Adicionar Produto</ProdutoButton>
      <ProdutoTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Fornecedor</th>
            <th>Data de Entrada</th>
            <th>Imagem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* Exibir dados dinâmicos aqui */}
          <tr>
            <td>1</td>
            <td>Produto A</td>
            <td>Descrição do Produto A</td>
            <td>10</td>
            <td>100.00</td>
            <td>Fornecedor A</td>
            <td>2024-06-26</td>
            <td><img src="url/to/image" alt="Produto A" width="50" /></td>
            <td>
              <button onClick={() => openDetalhesModal({ id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', quantidade: 10, preco: 100.00, fornecedor: 'Fornecedor A', dataEntrada: '2024-06-26', imagemURL: 'url/to/image' })}>Detalhes</button>
              <button onClick={() => openEdicaoModal({ id: 1, nome: 'Produto A', descricao: 'Descrição do Produto A', quantidade: 10, preco: 100.00, fornecedor: 'Fornecedor A', dataEntrada: '2024-06-26', imagemURL: 'url/to/image' })}>Editar</button>
            </td>
          </tr>
          {/* Outros produtos */}
        </tbody>
      </ProdutoTable>

      {/* Modais */}
      <ModalDetalhes isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicao isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovo isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </ProdutoContainer>
  );
};

export default Produto;
