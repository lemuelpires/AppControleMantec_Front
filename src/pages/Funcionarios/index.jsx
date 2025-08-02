import React, { useState, useEffect } from 'react';
import { FuncionariosContainer, FuncionariosTitle, FuncionariosButton, FuncionariosTable, BotaoEspacamento, IconWrapper } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ModalDetalhes from '../../components/Modais/Funcionario/ModalDetalhes';
import ModalEdicaoFuncionario from '../../components/Modais/Funcionario/ModalEdicao';
import ModalNovo from '../../components/Modais/Funcionario/ModalNovo';
import apiCliente from '../../services/apiCliente';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Funcionarios = () => {
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [funcionarios, setFuncionarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    try {
      const response = await apiCliente.get('/Funcionario');
      setFuncionarios(response.data.filter(funcionario => funcionario.ativo));
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
    }
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm('Deseja excluir esse funcionário?');
    if (confirmar) {
      try {
        await apiCliente.delete(`/Funcionario/Desativar/${id}`);
        fetchFuncionarios();
        alert('Funcionário excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao desativar funcionário:', error);
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
        await apiCliente.put(`/Funcionario/${formData.id}`, formData);
      } else {
        await apiCliente.post('/Funcionario', formData);
      }
      fetchFuncionarios();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error);
    }
  };

  const filteredFuncionarios = funcionarios.filter(funcionario =>
    funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFuncionarios.length / itemsPerPage);
  const paginatedFuncionarios = filteredFuncionarios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <FuncionariosContainer>
      <FuncionariosTitle>Funcionários</FuncionariosTitle>
      <BotaoEspacamento>
        <FuncionariosButton onClick={openNovoModal}>
          <FontAwesomeIcon icon={faPlus} style={{ color: 'white' }} />
        </FuncionariosButton>
      </BotaoEspacamento>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
        <input
          type="text"
          placeholder="Buscar funcionário..."
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
      <FuncionariosTable>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th style={{ textAlign: 'center' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {paginatedFuncionarios.map(funcionario => (
            <tr key={funcionario.id}>
              <td>{funcionario.nome}</td>
              <td>{funcionario.cargo}</td>
              <td>{funcionario.telefone}</td>
              <td>{funcionario.email}</td>
              <td style={{ textAlign: 'center' }}>
                <IconWrapper>
                  <FontAwesomeIcon icon={faEye} onClick={() => openDetalhesModal(funcionario)} />
                  <FontAwesomeIcon icon={faEdit} onClick={() => openEdicaoModal(funcionario)} />
                  <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleExcluir(funcionario.id)} />
                </IconWrapper>
              </td>
            </tr>
          ))}
        </tbody>
      </FuncionariosTable>
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
      <ModalDetalhes isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicaoFuncionario isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovo isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </FuncionariosContainer>
  );
};

export default Funcionarios;
