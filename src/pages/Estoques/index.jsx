import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { EstoqueContainer, EstoqueTitle, EstoqueButton, EstoqueTable, BotaoEspacamento } from './style';
import ModalDetalhesEstoque from '../../components/Modais/Estoque/ModalDetalhes';
import ModalEdicaoEstoque from '../../components/Modais/Estoque/ModalEdicao';
import ModalNovoEstoque from '../../components/Modais/Estoque/ModalNovo';
import apiEstoque from '../../services/apiCliente'; // Importe a API correta para manipulação de Estoque
import apiCliente from '../../services/apiCliente'; // Importe a API para manipulação de Produto
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importando os ícones

// Definir o elemento de aplicação para react-modal
Modal.setAppElement('#root');

const Estoque = () => {
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itensEstoque, setItensEstoque] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  useEffect(() => {
    fetchItensEstoque();
  }, [itemsPerPage, currentPage]);

  const fetchItensEstoque = async () => {
    try {
      const responseEstoque = await apiEstoque.get('/Estoque');
      const estoqueAtivo = responseEstoque.data.filter(item => item.ativo);

      const itensEstoqueComNome = await Promise.all(estoqueAtivo.map(async item => {
        try {
          const responseProduto = await apiCliente.get(`/Produto/${item.produtoID}`);
          const produto = responseProduto.data;
          return {
            ...item,
            produtoNome: produto?.nome || 'Produto não encontrado',
          };
        } catch (error) {
          console.error(`Erro ao buscar produto com ID ${item.produtoID}:`, error);
          return {
            ...item,
            produtoNome: 'Produto não encontrado',
          };
        }
      }));

      setItensEstoque(itensEstoqueComNome);
    } catch (error) {
      console.error('Erro ao buscar itens de estoque:', error);
    }
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm('Deseja excluir este item do estoque?');
    if (confirmar) {
      try {
        await apiEstoque.put(`/Estoque/desativar/${id}`);
        fetchItensEstoque();
        alert('Item de estoque excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir item de estoque:', error);
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

  const closeModal = () => {
    setIsDetalhesModalOpen(false);
    setIsEdicaoModalOpen(false);
    setIsNovoModalOpen(false);
    setSelectedItem(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Função para atualizar um item
  const handleUpdate = async (formData) => {
    try {
      const response = await apiEstoque.put(`/Estoque/${formData.produtoID}`, formData);
      console.log('Item de estoque atualizado:', response.data);

      // Atualizar quantidade na tabela de produtos
      const produtoResponse = await apiEstoque.put(`/Produto/${formData.produtoID}`, { quantidade: formData.quantidade });
      console.log('Quantidade do produto atualizada:', produtoResponse.data);

      fetchItensEstoque(); // Atualiza lista de itens de estoque após salvar
      closeModal();
    } catch (error) {
      console.error('Erro ao atualizar item de estoque:', error);
    }
  };

  // Função para salvar um novo item
  const handleSave = async (formData) => {
    try {
      const existingItem = itensEstoque.find(item => item.produtoID === formData.produtoID);
      if (existingItem) {
        alert('O produto já possui um estoque cadastrado. Redirecionando para a página de edição.');
        openEdicaoModal(existingItem); // Abrir modal de edição com os dados do item existente
        return; // Interrompe a execução após abrir o modal de edição
      }

      // Se não houver item existente, cria um novo item de estoque
      const response = await apiEstoque.post('/Estoque', formData);
      console.log('Novo item de estoque criado:', response.data);
      fetchItensEstoque();

      // Atualizar quantidade na tabela de produtos
      const produtoResponse = await apiEstoque.put(`/Produto/${formData.produtoID}`, { quantidade: formData.quantidade });
      console.log('Quantidade do produto atualizada:', produtoResponse.data);
      fetchItensEstoque(); // Atualiza lista de itens de estoque após salvar
      closeModal();
      alert('Novo item de inventário criado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar item de estoque:', error);
    }
  };

  // Filtra os itens baseados no termo de pesquisa
  const filteredItens = itensEstoque.filter(item =>
    item.produtoNome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para mudar a página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

   const totalPages = Math.ceil(filteredItens.length / itemsPerPage);
  const currentItems = filteredItens.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <EstoqueContainer>
      <EstoqueTitle>Estoque</EstoqueTitle>


      <BotaoEspacamento onClick={openNovoModal}>
        <EstoqueButton>
          <i className="fas fa-plus"></i>
        </EstoqueButton>
      </BotaoEspacamento>

      {/* Campo de pesquisa */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
        <input
          type="text"
          placeholder="Pesquisar produto..."
          value={searchTerm}
          onChange={handleSearchChange}
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

      <EstoqueTable>
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Quantidade</th>
            <th>Data de Atualização</th>
            <th style={{ textAlign: 'center' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.produtoID}>
              <td>{item.produtoNome}</td>
              <td>{item.quantidade}</td>
              <td>{new Date(item.dataAtualizacao).toLocaleDateString()}</td>
              <td style={{ textAlign: 'center' }}>
                <FaEye onClick={() => openDetalhesModal(item)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                <FaEdit onClick={() => openEdicaoModal(item)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                <FaTrashAlt onClick={() => handleExcluir(item.id)} style={{ cursor: 'pointer' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </EstoqueTable>
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
      {/* Modais */}
      <ModalDetalhesEstoque isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicaoEstoque isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleUpdate} fetchItensEstoque={fetchItensEstoque} />
      <ModalNovoEstoque isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </EstoqueContainer>
  );
};

export default Estoque;
