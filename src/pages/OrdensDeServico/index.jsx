import React, { useState, useEffect } from 'react';
import {
  OrdemDeServicoContainer,
  OrdemDeServicoTitle,
  HeaderControls,
  SearchContainer,
  SearchInput,
  PerPageSelect,
  AddButton,
  OrdemDeServicoTableWrapper,
  OrdemDeServicoTable,
  IconWrapper,
  ActionButton,
  PaginationContainer,
  PaginationButton,
  PaginationInfo
} from './style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEye, faEdit, faTrash, faPrint } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import apiCliente from '../../services/apiCliente';
import ModalDetalhesOrdemDeServico from '../../components/Modais/OrdemDeServico/ModalDetalhes';
import ModalEdicaoOrdemDeServico from '../../components/Modais/OrdemDeServico/ModalEdicao';
import ModalNovoOrdemDeServico from '../../components/Modais/OrdemDeServico/ModalNovo';

Modal.setAppElement('#root');

const OrdemDeServico = () => {
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [ordensDeServico, setOrdensDeServico] = useState([]);
  const [clientes, setClientes] = useState({});
  const [funcionarios, setFuncionarios] = useState({});
  const [produtos, setProdutos] = useState({});
  const [servicos, setServicos] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  useEffect(() => {
    fetchOrdensDeServico();
  }, []);

  const fetchOrdensDeServico = async () => {
    try {
      const response = await apiCliente.get('/OrdemDeServico');
      const ordensAtivas = response.data.filter(ordem => ordem.ativo);
      setOrdensDeServico(ordensAtivas);

      const clientesIds = new Set(ordensAtivas.map(o => o.clienteID));
      const funcionariosIds = new Set(ordensAtivas.map(o => o.funcionarioID));
      const produtosIds = new Set(ordensAtivas.map(o => o.produtoID));
      const servicosIds = new Set(ordensAtivas.map(o => o.servicoID));

      await Promise.all([
        fetchMap(clientesIds, clientes, '/Cliente/', setClientes),
        fetchMap(funcionariosIds, funcionarios, '/Funcionario/', setFuncionarios),
        fetchMap(produtosIds, produtos, '/Produto/', setProdutos),
        fetchMap(servicosIds, servicos, '/Servico/', setServicos),
      ]);
    } catch (error) {
      console.error('Erro ao buscar ordens de serviço:', error);
    }
  };

  const fetchMap = async (ids, existing, endpoint, setState) => {
    const dataMap = {};
    await Promise.all(Array.from(ids).map(async id => {
      if (!existing[id]) {
        const response = await apiCliente.get(`${endpoint}${id}`);
        dataMap[id] = response.data.nome;
      }
    }));
    setState(prev => ({ ...prev, ...dataMap }));
  };

  const handleExcluir = async (id) => {
    if (window.confirm('Deseja excluir esta ordem de serviço?')) {
      try {
        await apiCliente.put(`/OrdemDeServico/desativar/${id}`);
        fetchOrdensDeServico();
        alert('Ordem de Serviço excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir ordem de serviço:', error);
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

  const handleSave = async (formData) => {
    try {
      if (formData.id) {
        await apiCliente.put(`/OrdemDeServico/${formData.id}`, formData);
      } else {
        await apiCliente.post('/OrdemDeServico', formData);
      }
      fetchOrdensDeServico();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar ordem de serviço:', error);
    }
  };

  const filteredOrdens = ordensDeServico.filter(ordem =>
    clientes[ordem.clienteID]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrdens.length / itemsPerPage);
  const paginatedOrdens = filteredOrdens.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <OrdemDeServicoContainer>
      <OrdemDeServicoTitle>Ordens de Serviço</OrdemDeServicoTitle>
      
      <HeaderControls>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Buscar cliente..."
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
          Nova Ordem
        </AddButton>
      </HeaderControls>

      <OrdemDeServicoTableWrapper>
        <OrdemDeServicoTable>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Funcionário</th>
              <th>Produto</th>
              <th>Serviço</th>
              <th>Entrada</th>
              <th>Conclusão</th>
              <th style={{ textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrdens.map(ordem => (
              <tr key={ordem.id}>
                <td>{clientes[ordem.clienteID]}</td>
                <td>{funcionarios[ordem.funcionarioID]}</td>
                <td>{produtos[ordem.produtoID]}</td>
                <td>{servicos[ordem.servicoID]}</td>
                <td>{new Date(ordem.dataEntrada).toLocaleDateString()}</td>
                <td>{ordem.dataConclusao ? new Date(ordem.dataConclusao).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <IconWrapper>
                    <ActionButton 
                      className="view"
                      onClick={() => openDetalhesModal(ordem)}
                      title="Visualizar detalhes"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </ActionButton>
                    <ActionButton 
                      className="edit"
                      onClick={() => openEdicaoModal(ordem)}
                      title="Editar ordem"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </ActionButton>
                    <ActionButton 
                      className="delete"
                      onClick={() => handleExcluir(ordem.id)}
                      title="Excluir ordem"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </ActionButton>
                    <ActionButton 
                      className="print"
                      onClick={() => console.log('Imprimir:', ordem.id)}
                      title="Imprimir ordem"
                    >
                      <FontAwesomeIcon icon={faPrint} />
                    </ActionButton>
                  </IconWrapper>
                </td>
              </tr>
            ))}
          </tbody>
        </OrdemDeServicoTable>
      </OrdemDeServicoTableWrapper>

      <PaginationContainer>
        <PaginationButton
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </PaginationButton>
        
        <PaginationInfo>
          Página {currentPage} de {totalPages} ({filteredOrdens.length} ordens)
        </PaginationInfo>
        
        <PaginationButton
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Próxima
        </PaginationButton>
      </PaginationContainer>

      <ModalDetalhesOrdemDeServico isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicaoOrdemDeServico isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovoOrdemDeServico isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </OrdemDeServicoContainer>
  );
};

export default OrdemDeServico;
