// Este é o componente Produto com paginação, filtro e seleção de itens por página
// Mantém as modais e as funcionalidades já existentes

import React, { useState, useEffect } from 'react';
import { ProdutoContainer, ProdutoTitle, ProdutoTable, ProdutoButton, BotaoEspacamento, IconWrapper } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPlusCircle, faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import ModalDetalhesProduto from '../../components/Modais/Produto/ModalDetalhes';
import ModalEdicaoProduto from '../../components/Modais/Produto/ModalEdicao';
import ModalNovoProduto from '../../components/Modais/Produto/ModalNovo';
import ModalCadastrarImagem from '../../components/Modais/CadastrarImagem';
import apiCliente from '../../services/apiCliente';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Produto = () => {
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [isCadastrarImagemModalOpen, setIsCadastrarImagemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await apiCliente.get('/Produto', {
        params: { page: 1, pageSize: 6000 }
      });
      setProdutos(response.data.filter(produto => produto.ativo));
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm('Deseja excluir esse produto?');
    if (confirmar) {
      try {
        await apiCliente.delete(`/Produto/Desativar/${id}`);
        fetchProdutos();
        alert('Produto excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao desativar produto:', error);
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
    setSelectedItem(null);
    setIsNovoModalOpen(true);
  };

  const openCadastrarImagemModal = (item) => {
    setSelectedItem(item);
    setIsCadastrarImagemModalOpen(true);
  };

  const closeModal = () => {
    setIsDetalhesModalOpen(false);
    setIsEdicaoModalOpen(false);
    setIsNovoModalOpen(false);
    setIsCadastrarImagemModalOpen(false);
    setSelectedItem(null);
  };

  const handleSave = async (formData) => {
    try {
      if (formData.id) {
        await apiCliente.put(`/Produto/${formData.id}`, formData);
      } else {
        await apiCliente.post('/Produto', formData);
      }
      fetchProdutos();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProdutos.length / itemsPerPage);
  const paginatedProdutos = filteredProdutos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <ProdutoContainer>
      <ProdutoTitle>Produtos</ProdutoTitle>
        <BotaoEspacamento>
          <FontAwesomeIcon onClick={openNovoModal} icon={faPlusCircle} style={{ color: 'rgba(102, 243, 8, 1)', width: '2em', height: '2em' }} />
        </BotaoEspacamento>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
        <input
          type="text"
          placeholder="Buscar produto..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <div>
          <select style={{padding: '8px' }} value={itemsPerPage} onChange={e => setItemsPerPage(Number(e.target.value))}>
            <option value={25}>25 por página</option>
            <option value={50}>50 por página</option>
            <option value={100}>100 por página</option>
          </select>
        </div>
      </div>
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
          {paginatedProdutos.map(produto => (
            <tr key={produto.id}>
              <td><img src={produto.imagemURL} alt={produto.nome} width="50" /></td>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>{produto.quantidade}</td>
              <td>{`R$ ${produto.preco.toFixed(2)}`}</td>
              <td>{produto.fornecedor}</td>
              <td>{new Date(produto.dataEntrada).toLocaleDateString()}</td>
              <td>
                <IconWrapper>
                  <FontAwesomeIcon icon={faEye} onClick={() => openDetalhesModal(produto)} />
                  <FontAwesomeIcon icon={faEdit} onClick={() => openEdicaoModal(produto)} />
                  <FontAwesomeIcon icon={faTrash} onClick={() => handleExcluir(produto.id)} />
                  <FontAwesomeIcon icon={faImage} onClick={() => openCadastrarImagemModal(produto)} />
                </IconWrapper>
              </td>
            </tr>
          ))}
        </tbody>
      </ProdutoTable>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              margin: '0 5px',
              backgroundColor: currentPage === i + 1 ? '#007bff' : '#eee',
              color: currentPage === i + 1 ? '#fff' : '#000',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <ModalDetalhesProduto isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicaoProduto isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovoProduto isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
      <ModalCadastrarImagem isOpen={isCadastrarImagemModalOpen} onClose={closeModal} item={selectedItem} />
    </ProdutoContainer>
  );
};

export default Produto;
