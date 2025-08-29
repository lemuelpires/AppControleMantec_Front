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
  PaginationInfo,
  HideMobile,
  HideMobileTh
} from './style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEye, faEdit, faTrash, faStar, faDownload } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import apiCliente from '../../services/apiCliente';
import ModalDetalhesOrdemDeServico from '../../components/Modais/OrdemDeServico/ModalDetalhes';
import ModalEdicaoOrdemDeServico from '../../components/Modais/OrdemDeServico/ModalEdicao';
import ModalNovoOrdemDeServico from '../../components/Modais/OrdemDeServico/ModalNovo';
import * as XLSX from 'xlsx';

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

      // Coleta IDs de produtos e serviços, considerando tanto formato antigo quanto arrays
      const produtosIds = new Set();
      const servicosIds = new Set();

      ordensAtivas.forEach(ordem => {
        // Formato antigo (compatibilidade)
        if (ordem.produtoID) produtosIds.add(ordem.produtoID);
        if (ordem.servicoID) servicosIds.add(ordem.servicoID);

        // Formato novo (arrays)
        if (ordem.produtos && Array.isArray(ordem.produtos)) {
          ordem.produtos.forEach(produto => {
            if (produto.produtoID) produtosIds.add(produto.produtoID);
          });
        }

        if (ordem.servicos && Array.isArray(ordem.servicos)) {
          ordem.servicos.forEach(servico => {
            if (servico.servicoID) servicosIds.add(servico.servicoID);
          });
        }
      });

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
    fetchOrdensDeServico();
  };

  const handleSave = async (formData) => {
    try {
      console.log('handleSave - Dados recebidos:', formData);
      console.log('handleSave - Produtos:', formData.produtos);
      console.log('handleSave - Serviços:', formData.servicos);

      // Preparar dados mantendo compatibilidade com backend atual
      const dataToSend = {
        ...formData,
        // Manter compatibilidade - pegar o primeiro item se existir
        produtoID: formData.produtos?.[0]?.produtoID || null,
        servicoID: formData.servicos?.[0]?.servicoID || null,
        quantidadeProduto: formData.produtos?.[0]?.quantidade || 1,
        quantidadeServico: formData.servicos?.[0]?.quantidade || 1,
        // Manter arrays para futuro uso
        produtos: formData.produtos || [],
        servicos: formData.servicos || []
      };

      console.log('Dados preparados para envio:', dataToSend);

      // Garante que produtos sempre seja um array
      const produtosBaixa = formData.produtos || formData.produtoIDs?.map(id => ({ produtoID: id, quantidade: 1 })) || [];

      let ordemAnterior = null;
      if (formData.id) {
        const res = await apiCliente.get(`/OrdemDeServico/${formData.id}`);
        ordemAnterior = res.data;
      }

      if (formData.id) {
        await apiCliente.put(`/OrdemDeServico/${formData.id}`, dataToSend);
        // Se status mudou para "Concluido", dar baixa nos produtos
        if (
          ordemAnterior &&
          ordemAnterior.status !== "Concluido" &&
          formData.status === "Concluido"
        ) {
          for (const produto of produtosBaixa) {
            if (produto.produtoID && produto.quantidade) {
              // Buscar produto atual
              const produtoAtual = await apiCliente.get(`/Produto/${produto.produtoID}`);
              const novaQuantidade = (produtoAtual.data.quantidade || 0) - Number(produto.quantidade);
              await apiCliente.put(`/Produto/${produto.produtoID}`, {
                ...produtoAtual.data,
                quantidade: novaQuantidade
              });
            }
          }
        }
      } else {
        await apiCliente.post('/OrdemDeServico', dataToSend);
        // Se status é "Concluido", dar baixa nos produtos
        if (formData.status === "Concluido" && Array.isArray(produtosBaixa)) {
          for (const produto of produtosBaixa) {
            if (produto.produtoID && produto.quantidade) {
              const produtoAtual = await apiCliente.get(`/Produto/${produto.produtoID}`);
              const novaQuantidade = (produtoAtual.data.quantidade || 0) - Number(produto.quantidade);
              await apiCliente.put(`/Produto/${produto.produtoID}`, {
                ...produtoAtual.data,
                quantidade: novaQuantidade
              });
            }
          }
        }
      }
      fetchOrdensDeServico();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar ordem de serviço:', error);
    }
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredOrdens);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "OrdensDeServico");
    XLSX.writeFile(wb, "ordens_de_servico.xlsx");
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
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <OrdemDeServicoTitle>
          Ordens de Serviço
        </OrdemDeServicoTitle>
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
              <th>Número OS</th>
              <th>Cliente</th>
              <HideMobileTh>Funcionário</HideMobileTh>
              <HideMobileTh>Entrada</HideMobileTh>
              <HideMobileTh>Conclusão</HideMobileTh>
              <th style={{ textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrdens.map(ordem => {
              // Função para formatar produtos/serviços
              const formatProdutos = (ordem) => {
                if (ordem.produtos && Array.isArray(ordem.produtos) && ordem.produtos.length > 0) {
                  return ordem.produtos
                    .filter(produto => produto.produtoID)
                    .map(produto => `${produtos[produto.produtoID]} (${produto.quantidade})`)
                    .join(', ') || '-';
                }
                // Compatibilidade com formato antigo
                return ordem.produtoID ? produtos[ordem.produtoID] : '-';
              };

              const formatServicos = (ordem) => {
                if (ordem.servicos && Array.isArray(ordem.servicos) && ordem.servicos.length > 0) {
                  return ordem.servicos
                    .filter(servico => servico.servicoID)
                    .map(servico => `${servicos[servico.servicoID]} (${servico.quantidade})`)
                    .join(', ') || '-';
                }
                // Compatibilidade com formato antigo
                return ordem.servicoID ? servicos[ordem.servicoID] : '-';
              };

              return (
                <tr key={ordem.id}>
                  <td>{ordem.numeroOS}</td>
                  <td>{clientes[ordem.clienteID]}</td>
                  <HideMobile>{funcionarios[ordem.funcionarioID]}</HideMobile>
                  <HideMobile>{new Date(ordem.dataEntrada).toLocaleDateString()}</HideMobile>
                  <HideMobile>{ordem.dataConclusao ? new Date(ordem.dataConclusao).toLocaleDateString() : 'N/A'}</HideMobile>
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
                        className="status"
                        onClick={() => window.open(`/ordem-os/${ordem.id}`, '_blank')}
                        title="Ver status da ordem"
                        style={{ color: '#ff9800' }}
                      >
                        <FontAwesomeIcon icon={faStar} />
                      </ActionButton>
                    </IconWrapper>
                  </td>
                </tr>
              );
            })}
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
