import React, { useState, useEffect } from 'react';
import {
  ClientesContainer,
  ClientesTitle,
  HeaderControls,
  SearchContainer,
  SearchInput,
  PerPageSelect,
  AddButton,
  ClientesTable,
  ClientesTableWrapper,
  IconWrapper,
  ActionButton,
  PaginationContainer,
  PaginationButton,
  PaginationInfo
} from './style';

import ModalDetalhes from '../../components/Modais/Cliente/ModalDetalhes';
import ModalEdicao from '../../components/Modais/Cliente/ModalEdicao';
import ModalNovo from '../../components/Modais/Cliente/ModalNovo';
import apiCliente from '../../services/apiCliente';

import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const Clientes = () => {
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [clientes, setClientes] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchClientes();
  }, [currentPage, itemsPerPage]);

  const fetchClientes = async () => {
    try {
      const response = await apiCliente.get('/Cliente', {
        params: {
          page: 1,
          pageSize: 6000,
        },
      });
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm('Deseja excluir esse cliente?');
    if (confirmar) {
      try {
        const response = await apiCliente.delete(`/Cliente/Desativar/${id}`);
        console.log('Cliente Excluído:', response.data);
        fetchClientes();
        alert('Cliente excluído com sucesso!');
      } catch (error) {
        if (error.response) {
          console.error('Erro ao desativar cliente:', error.response.data);
        } else {
          console.error('Erro desconhecido ao desativar cliente:', error.message);
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
        await apiCliente.put(`/Cliente/${formData.id}`, formData);
      } else {
        await apiCliente.post('/Cliente', formData);
      }
      fetchClientes();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClientes.length / itemsPerPage);
  const paginatedClientes = filteredClientes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <ClientesContainer>
      <ClientesTitle>Clientes</ClientesTitle>

      <HeaderControls>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Buscar cliente por nome..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <PerPageSelect
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={25}>25 por página</option>
            <option value={50}>50 por página</option>
            <option value={75}>75 por página</option>
            <option value={100}>100 por página</option>
          </PerPageSelect>
        </SearchContainer>
        
        <AddButton onClick={openNovoModal}>
          <FontAwesomeIcon icon={faPlus} />
          Novo Cliente
        </AddButton>
      </HeaderControls>

      <ClientesTableWrapper>
        <ClientesTable>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Data de Cadastro</th>
              <th style={{ textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedClientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>{new Date(cliente.dataCadastro).toLocaleDateString()}</td>
                <td>
                  <IconWrapper>
                    <ActionButton className="view" onClick={() => openDetalhesModal(cliente)}>
                      <FontAwesomeIcon icon={faEye} />
                    </ActionButton>
                    <ActionButton className="edit" onClick={() => openEdicaoModal(cliente)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </ActionButton>
                    <ActionButton className="delete" onClick={() => handleExcluir(cliente.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </ActionButton>
                  </IconWrapper>
                </td>
              </tr>
            ))}
          </tbody>
        </ClientesTable>
      </ClientesTableWrapper>

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

      <ModalDetalhes isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicao isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovo isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </ClientesContainer>
  );
};

export default Clientes;
