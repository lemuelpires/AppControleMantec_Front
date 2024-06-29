import React, { useState, useEffect } from 'react';
import { ProdutosContainer, ProdutosTitle, ProdutosButton, ProdutosTable, BotaoEspacamento } from './style';
import ModalDetalhesProduto from '../../components/Modais/Produto/ModalDetalhes';
import ModalEdicaoProduto from '../../components/Modais/Produto/ModalEdicao';
import ModalNovoProduto from '../../components/Modais/Produto/ModalNovo';
import apiProduto from '../../services/apiCliente';
import Modal from 'react-modal';

// Defina o elemento de aplicação para react-modal
Modal.setAppElement('#root');

const Produtos = () => {
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await apiProduto.get('/Produto');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
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
        // Atualização de produto existente
        const response = await apiProduto.put(`/Produto/${formData.id}`, formData);
        console.log('Produto atualizado:', response.data);
      } else {
        // Criação de novo produto
        const response = await apiProduto.post('/Produto', formData);
        console.log('Novo produto criado:', response.data);
      }
      fetchProdutos(); // Atualiza lista de produtos após salvar
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  return (
    <ProdutosContainer>
      <ProdutosTitle>Produtos</ProdutosTitle>
      <BotaoEspacamento>
        <ProdutosButton onClick={openNovoModal}>Adicionar Produto</ProdutosButton>
      </BotaoEspacamento>
      <ProdutosTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Fornecedor</th>
            <th>Data de Entrada</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>{produto.quantidade}</td>
              <td>{produto.preco}</td>
              <td>{produto.fornecedor}</td>
              <td>{new Date(produto.dataEntrada).toLocaleDateString()}</td>
              <td>
                <button onClick={() => openDetalhesModal(produto)}>Detalhes</button>
                <button onClick={() => openEdicaoModal(produto)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProdutosTable>

      {/* Modais */}
      <ModalDetalhesProduto isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicaoProduto isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovoProduto isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </ProdutosContainer>
  );
};

export default Produtos;
