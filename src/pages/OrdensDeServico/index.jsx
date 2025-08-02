// OrdemDeServico.jsx
import React, { useState, useEffect } from 'react';
import {
  OrdemDeServicoContainer,
  OrdemDeServicoTitle,
  OrdemDeServicoButton,
  OrdemDeServicoTable,
  BotaoEspacamento,
  IconWrapper
} from './style';
import { FaPlus, FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
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
      <BotaoEspacamento>
        <OrdemDeServicoButton onClick={openNovoModal}>
          <FaPlus />
        </OrdemDeServicoButton>
      </BotaoEspacamento>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1em' }}>
        <input
          type="text"
          placeholder="Buscar cliente..."
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
                  <FaEye onClick={() => openDetalhesModal(ordem)} />
                  <FaEdit onClick={() => openEdicaoModal(ordem)} />
                  <FaTrashAlt onClick={() => handleExcluir(ordem.id)} />
                </IconWrapper>
              </td>
            </tr>
          ))}
        </tbody>
      </OrdemDeServicoTable>

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
      <ModalDetalhesOrdemDeServico isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicaoOrdemDeServico isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovoOrdemDeServico isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </OrdemDeServicoContainer>
  );
};

export default OrdemDeServico;
