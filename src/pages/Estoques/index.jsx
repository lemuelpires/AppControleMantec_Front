import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { 
  EstoqueContainer, 
  EstoqueTitle, 
  HeaderControls, 
  SearchContainer, 
  SearchInput, 
  PerPageSelect, 
  AddButton, 
  EstoqueTable, 
  EstoqueTableWrapper, 
  IconWrapper, 
  ActionButton, 
  PaginationContainer, 
  PaginationButton,
  PaginationInfo,
  HideMobile,
  HideMobileTh
} from './style';
import ModalDetalhesEstoque from '../../components/Modais/Estoque/ModalDetalhes';
import ModalEdicaoEstoque from '../../components/Modais/Estoque/ModalEdicao';
import ModalNovoEstoque from '../../components/Modais/Estoque/ModalNovo';
import apiEstoque from '../../services/apiCliente'; // Importe a API correta para manipulação de Estoque
import apiCliente from '../../services/apiCliente'; // Importe a API para manipulação de Produto
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faPlus, faDownload } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';

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

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredItens);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Estoques");
    XLSX.writeFile(wb, "estoques.xlsx");
  };

   const totalPages = Math.ceil(filteredItens.length / itemsPerPage);
  const currentItems = filteredItens.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <EstoqueContainer>
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <EstoqueTitle>
          Estoques
        </EstoqueTitle>
        <button
          onClick={handleExport}
          title="Exportar Excel"
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            color: '#666'
          }}
        >
          <FontAwesomeIcon icon={faDownload} size="lg" />
        </button>
      </div>

      <HeaderControls>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Pesquisar produto..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <PerPageSelect 
            value={itemsPerPage} 
            onChange={e => setItemsPerPage(Number(e.target.value))}
          >
            <option value={25}>25 por página</option>
            <option value={50}>50 por página</option>
            <option value={100}>100 por página</option>
          </PerPageSelect>
        </SearchContainer>
        
        <AddButton onClick={openNovoModal}>
          <FontAwesomeIcon icon={faPlus} />
          Novo Item
        </AddButton>
      </HeaderControls>

      <EstoqueTableWrapper>
        <EstoqueTable>
          <thead>
            <tr>
              <th>Nome do Produto</th>
              <th>Quantidade</th>
              <HideMobileTh>Data de Atualização</HideMobileTh>
              <th style={{ textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(item => (
              <tr key={item.produtoID}>
                <td>{item.produtoNome}</td>
                <td>{item.quantidade}</td>
                <HideMobile>{new Date(item.dataAtualizacao).toLocaleDateString()}</HideMobile>
                <td>
                  <IconWrapper>
                    <ActionButton className="view" onClick={() => openDetalhesModal(item)}>
                      <FontAwesomeIcon icon={faEye} />
                    </ActionButton>
                    <ActionButton className="edit" onClick={() => openEdicaoModal(item)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </ActionButton>
                    <ActionButton className="delete" onClick={() => handleExcluir(item.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </ActionButton>
                  </IconWrapper>
                </td>
              </tr>
            ))}
          </tbody>
        </EstoqueTable>
      </EstoqueTableWrapper>

      <PaginationContainer>
        <PaginationButton 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Anterior
        </PaginationButton>
        <PaginationInfo>
          Página {currentPage} de {totalPages}
        </PaginationInfo>
        <PaginationButton 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Próxima
        </PaginationButton>
      </PaginationContainer>
      {/* Modais */}
      <ModalDetalhesEstoque isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicaoEstoque isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleUpdate} fetchItensEstoque={fetchItensEstoque} />
      <ModalNovoEstoque isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </EstoqueContainer>
  );
};

export default Estoque;
