import React, { useState, useEffect } from 'react';
import { ProdutoContainer, ProdutoTitle, ProdutoTable, ProdutoButton, BotaoEspacamento, IconWrapper } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPlus, faInfoCircle, faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import ModalDetalhesProduto from '../../components/Modais/Produto/ModalDetalhes';
import ModalEdicaoProduto from '../../components/Modais/Produto/ModalEdicao';
import ModalNovoProduto from '../../components/Modais/Produto/ModalNovo';
import ModalCadastrarImagem from '../../components/Modais/CadastrarImagem';
import apiCliente from '../../services/apiCliente';
import Modal from 'react-modal';

// Defina o elemento de aplicação para react-modal
Modal.setAppElement('#root');

const Produto = () => {
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [isCadastrarImagemModalOpen, setIsCadastrarImagemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await apiCliente.get('/Produto');
      setProdutos(response.data.filter(produto => produto.ativo)); // Exibir apenas produtos ativos
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm('Deseja excluir esse produto?');
    if (confirmar) {
      try {
        const response = await apiCliente.delete(`/Produto/Desativar/${id}`);
        console.log('Produto Excluído:', response.data);
        fetchProdutos(); // Atualiza lista de produtos após desativar
        alert('Produto excluído com sucesso!');
      } catch (error) {
        if (error.response) {
          console.error('Erro ao desativar produto:', error.response.data);
        } else {
          console.error('Erro desconhecido ao desativar produto:', error.message);
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

  const openCadastrarImagemModal = (item) => {
    setSelectedItem(item);
    setIsCadastrarImagemModalOpen(true); // Abre o modal de imagem
  };

  const closeModal = () => {
    setIsDetalhesModalOpen(false);
    setIsEdicaoModalOpen(false);
    setIsNovoModalOpen(false);
    setIsCadastrarImagemModalOpen(false); // Fecha o modal de imagem
    setSelectedItem(null);
  };

  const handleSave = async (formData) => {
    try {
      if (formData.id) {
        // Atualização de produto existente
        const response = await apiCliente.put(`/Produto/${formData.id}`, formData);
        console.log('Produto atualizado:', response.data);
      } else {
        // Criação de novo produto
        const response = await apiCliente.post('/Produto', formData);
        console.log('Novo produto criado:', response.data);
      }
      fetchProdutos(); // Atualiza lista de produtos após salvar
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  return (
    <ProdutoContainer>
      <ProdutoTitle>Produtos</ProdutoTitle>
      <BotaoEspacamento>
        <ProdutoButton onClick={openNovoModal}>
          <FontAwesomeIcon icon={faPlus} style={{ color: 'white' }} />
        </ProdutoButton>
      </BotaoEspacamento>
      <ProdutoTable>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Qtde</th>
            <th>Preço</th>
            <th>Fornecedor</th>
            <th>Data de Entrada</th>
            <th style={{ textAlign: 'center' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id}>
              <td><img src={produto.imagemURL} alt={produto.nome} width="50" /></td>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>{produto.quantidade}</td>
              <td>{"R$ " + produto.preco.toFixed(2)}</td>
              <td>{produto.fornecedor}</td>
              <td>{new Date(produto.dataEntrada).toLocaleDateString()}</td>
              <td>
                <IconWrapper>
                  <FontAwesomeIcon icon={faEye} style={{ cursor: 'pointer' }} onClick={() => openDetalhesModal(produto)} />
                  <FontAwesomeIcon icon={faEdit} style={{ cursor: 'pointer' }} onClick={() => openEdicaoModal(produto)} />
                  <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }} onClick={() => handleExcluir(produto.id)} />
                  <FontAwesomeIcon icon={faImage} style={{ cursor: 'pointer' }} onClick={() => openCadastrarImagemModal(produto)} />
                </IconWrapper>
              </td>
            </tr>
          ))}
        </tbody>
      </ProdutoTable>
      <ModalDetalhesProduto isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicaoProduto isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovoProduto isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
      <ModalCadastrarImagem isOpen={isCadastrarImagemModalOpen} onClose={closeModal} item={selectedItem} />
    </ProdutoContainer>
  );
};

export default Produto;
