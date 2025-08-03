import React, { useState, useEffect } from 'react';
import {
  ServicoContainer,
  ServicoTitle,
  ServicoButton,
  ServicoTable,
  BotaoEspacamento,
  IconWrapper
} from './style';
import ModalDetalhesServico from '../../components/Modais/Servico/ModalDetalhes';
import ModalEdicaoServico from '../../components/Modais/Servico/ModalEdicao';
import ModalNovoServico from '../../components/Modais/Servico/ModalNovo';
import apiServico from '../../services/apiCliente';
import Modal from 'react-modal';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';


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
    <ServicoContainer>
      <ServicoTitle>Serviços</ServicoTitle>

      <BotaoEspacamento>
        <FontAwesomeIcon onClick={openNovoModal} icon={faPlusCircle} style={{ color: 'rgba(102, 243, 8, 1)', width: '2em', height: '2em' }} />
      </BotaoEspacamento>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1em' }}>
        <input
          type="text"
          placeholder="Buscar serviço..."
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

      <ServicoTable>
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
                  <FaEye onClick={() => openDetalhesModal(servico)} />
                  <FaEdit onClick={() => openEdicaoModal(servico)} />
                  <FaTrashAlt onClick={() => handleExcluir(servico.id)} />
                </IconWrapper>
              </td>
            </tr>
          ))}
        </tbody>
      </ServicoTable>

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
      <ModalDetalhesServico isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicaoServico isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovoServico isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </ServicoContainer>
  );
};

export default Servico;
