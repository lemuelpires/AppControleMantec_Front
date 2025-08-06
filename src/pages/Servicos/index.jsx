import React, { useState, useEffect } from 'react';
import {
  ServicosContainer,
  ServicosTitle,
  HeaderControls,
  SearchContainer,
  SearchInput,
  PerPageSelect,
  AddButton,
  ServicosTableWrapper,
  ServicosTable,
  IconWrapper,
  ActionButton,
  PaginationContainer,
  PaginationButton,
  PaginationInfo
} from './style';
import ModalDetalhesServico from '../../components/Modais/Servico/ModalDetalhes';
import ModalEdicaoServico from '../../components/Modais/Servico/ModalEdicao';
import ModalNovoServico from '../../components/Modais/Servico/ModalNovo';
import apiServico from '../../services/apiCliente';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


Modal.setAppElement('#root');

const Servico = () => {
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [servicos, setServicos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  useEffect(() => {
    fetchServicos();
  }, []);

  const fetchServicos = async () => {
    try {
      const response = await apiServico.get('/Servico');
      setServicos(response.data.filter(servico => servico.ativo));
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm('Deseja excluir esse serviço?')) {
      try {
        await apiServico.delete(`/Servico/Desativar/${id}`);
        fetchServicos();
        alert('Serviço excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao desativar serviço:', error);
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
        await apiServico.put(`/Servico/${formData.id}`, formData);
      } else {
        await apiServico.post('/Servico', formData);
      }
      fetchServicos();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
    }
  };

  const filteredServicos = servicos.filter(s =>
    s.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredServicos.length / itemsPerPage);
  const paginatedServicos = filteredServicos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <ServicosContainer>
      <ServicosTitle>Serviços</ServicosTitle>

      <HeaderControls>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Buscar serviço..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
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
          <FontAwesomeIcon icon={faPlusCircle} />
          Novo Serviço
        </AddButton>
      </HeaderControls>

      <ServicosTableWrapper>
        <ServicosTable>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th style={{ textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedServicos.map(servico => (
              <tr key={servico.id}>
                <td>{servico.nome}</td>
                <td>{servico.descricao}</td>
                <td>R${servico.preco},00</td>
                <td>
                  <IconWrapper>
                    <ActionButton 
                      className="view"
                      onClick={() => openDetalhesModal(servico)}
                      title="Visualizar detalhes"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </ActionButton>
                    <ActionButton 
                      className="edit"
                      onClick={() => openEdicaoModal(servico)}
                      title="Editar serviço"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </ActionButton>
                    <ActionButton 
                      className="delete"
                      onClick={() => handleExcluir(servico.id)}
                      title="Excluir serviço"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </ActionButton>
                  </IconWrapper>
                </td>
              </tr>
            ))}
          </tbody>
        </ServicosTable>
      </ServicosTableWrapper>

      <PaginationContainer>
        <PaginationButton
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </PaginationButton>
        
        <PaginationInfo>
          Página {currentPage} de {totalPages} ({filteredServicos.length} serviços)
        </PaginationInfo>
        
        <PaginationButton
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Próxima
        </PaginationButton>
      </PaginationContainer>

      <ModalDetalhesServico isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicaoServico isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovoServico isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </ServicosContainer>
  );
};

export default Servico;
