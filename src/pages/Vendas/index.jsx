import React, { useState, useEffect } from 'react';
import apiCliente from '../../services/apiCliente';
import Table from '../../components/Tables';
import ReciboCliente from '../../components/Modais/OrdemDeServico/ReciboCliente';
import {
  Container,
  Header,
  Title,
  Subtitle,
  StatsContainer,
  StatCard,
  TableContainer,
  ActionButton,
  StatusBadge,
  LoadingContainer,
  FiltersContainer,
  FiltersGrid,
  FilterGroup,
  FilterActions,
  FilterButton,
  ExportButton,
} from './style';

const Vendas = () => {
  const [ordens, setOrdens] = useState([]);
  const [ordensFiltered, setOrdensFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clientes, setClientes] = useState({});
  const [funcionarios, setFuncionarios] = useState({});
  const [produtos, setProdutos] = useState({});
  const [servicos, setServicos] = useState({});
  const [produtosPreco, setProdutosPreco] = useState({});
  const [servicosPreco, setServicosPreco] = useState({});
  const [stats, setStats] = useState({
    totalVendas: 0,
    vendasMes: 0,
    valorTotal: 0,
    valorMes: 0
  });

  const [filtros, setFiltros] = useState({
    cliente: '',
    dataInicio: '',
    dataFim: '',
    valorMin: '',
    valorMax: ''
  });

  const [reciboModalOpen, setReciboModalOpen] = useState(false);
  const [ordemSelecionada, setOrdemSelecionada] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [ordens, filtros]);

  useEffect(() => {
    // Sempre calcula stats e exibe apenas ordens concluídas
    const ordensConcluidas = ordensFiltered.filter(o => o.status === 'Concluída');
    if (
      ordensConcluidas.length > 0 &&
      (Object.keys(produtosPreco).length > 0 || Object.keys(servicosPreco).length > 0)
    ) {
      calculateStats(ordensConcluidas);
    } else {
      setStats({
        totalVendas: 0,
        vendasMes: 0,
        valorTotal: 0,
        valorMes: 0
      });
    }
  }, [ordensFiltered, produtosPreco, servicosPreco]);
  const fetchData = async () => {
    try {
      setLoading(true);

      const ordensResponse = await apiCliente.get('/OrdemDeServico');
      const todasOrdens = ordensResponse.data;

      // Sempre traga todas as ordens ativas
      const ordensAtivas = todasOrdens.filter(ordem => ordem.ativo);
      setOrdens(ordensAtivas);
      setOrdensFiltered(ordensAtivas);

      const clientesIds = new Set(ordensAtivas.map(o => o.clienteID));
      const funcionariosIds = new Set(ordensAtivas.map(o => o.funcionarioID));
      const produtosIds = new Set();
      const servicosIds = new Set();

      ordensAtivas.forEach(ordem => {
        if (Array.isArray(ordem.produtoIDs)) {
          ordem.produtoIDs.forEach(id => produtosIds.add(id));
        }
        if (Array.isArray(ordem.servicoIDs)) {
          ordem.servicoIDs.forEach(id => servicosIds.add(id));
        }
        if (ordem.produtoID) produtosIds.add(ordem.produtoID);
        if (ordem.servicoID) servicosIds.add(ordem.servicoID);
        if (Array.isArray(ordem.pecasUtilizadas)) {
          ordem.pecasUtilizadas.forEach(p => {
            if (p.produtoID) produtosIds.add(p.produtoID);
          });
        }
      });

      await Promise.all([
        fetchMap(clientesIds, '/Cliente/', setClientes),
        fetchMap(funcionariosIds, '/Funcionario/', setFuncionarios),
        fetchMap(produtosIds, '/Produto/', setProdutos),
        fetchMap(servicosIds, '/Servico/', setServicos),
        fetchMapPreco(produtosIds, '/Produto/', setProdutosPreco),
        fetchMapPreco(servicosIds, '/Servico/', setServicosPreco),
      ]);

    } catch (error) {
      console.error('Erro ao carregar dados das vendas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMap = async (ids, endpoint, setState) => {
    const dataMap = {};
    await Promise.all(Array.from(ids).map(async id => {
      try {
        const response = await apiCliente.get(`${endpoint}${id}`);
        if (endpoint.includes('/Cliente/')) {
          dataMap[id] = response.data.nome;
        } else if (endpoint.includes('/Produto/')) {
          dataMap[id] = response.data.nome;
        } else if (endpoint.includes('/Servico/')) {
          dataMap[id] = response.data.descricao || response.data.nome;
        } else {
          dataMap[id] = response.data;
        }
      } catch (error) {
        console.error(`Erro ao buscar ${endpoint}${id}:`, error);
      }
    }));
    setState(dataMap);
  };

  const fetchMapPreco = async (ids, endpoint, setState) => {
    const dataMap = {};
    await Promise.all(Array.from(ids).map(async id => {
      try {
        const response = await apiCliente.get(`${endpoint}${id}`);
        dataMap[id] = parseFloat(response.data.preco) || 0;
      } catch (error) {
        console.error(`Erro ao buscar preço ${endpoint}${id}:`, error);
        dataMap[id] = 0;
      }
    }));
    setState(dataMap);
  };

  // Só considera ordens com status 'Concluída' para os stats
  const calculateStats = (ordens) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Aqui, ordens já são apenas concluídas!
    let totalVendas = ordens.length;
    let vendasMes = 0;
    let valorTotal = 0;
    let valorMes = 0;

    ordens.forEach(ordem => {
      const dataConclusao = new Date(ordem.dataConclusao);
      const isCurrentMonth = dataConclusao.getMonth() === currentMonth && dataConclusao.getFullYear() === currentYear;

      if (isCurrentMonth) {
        vendasMes++;
      }

      const valorOrdem = calcularPrecoTotal(ordem);
      valorTotal += valorOrdem;

      if (isCurrentMonth) {
        valorMes += valorOrdem;
      }
    });

    setStats({
      totalVendas,
      vendasMes,
      valorTotal,
      valorMes
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value || 0);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    } catch {
      return 'Data inválida';
    }
  };

  const getClienteNome = (clienteID) => {
    return clientes[clienteID] || 'Cliente não encontrado';
  };

  const getProdutoNome = (ordem) => {
    if (Array.isArray(ordem.produtoIDs)) {
      return ordem.produtoIDs
        .map(id => produtos[id])
        .filter(Boolean)
        .join(', ') || 'Nenhum produto';
    }
    return ordem.produtoID ? produtos[ordem.produtoID] : 'Nenhum produto';
  };

  const getServicoDescricao = (ordem) => {
    if (Array.isArray(ordem.servicoIDs)) {
      return ordem.servicoIDs
        .map(id => servicos[id])
        .filter(Boolean)
        .join(', ') || 'Nenhum serviço';
    }
    return ordem.servicoID ? servicos[ordem.servicoID] : 'Nenhum serviço';
  };

  const calcularPrecoTotal = (ordem) => {
    let total = 0;

    if (Array.isArray(ordem.servicoIDs)) {
      ordem.servicoIDs.forEach(id => {
        if (servicosPreco[id]) {
          total += servicosPreco[id];
        }
      });
    }
    if (Array.isArray(ordem.produtoIDs)) {
      ordem.produtoIDs.forEach(id => {
        if (produtosPreco[id]) {
          total += produtosPreco[id];
        }
      });
    }
    if (Array.isArray(ordem.pecasUtilizadas)) {
      ordem.pecasUtilizadas.forEach(p => {
        if (p.produtoID && produtosPreco[p.produtoID]) {
          total += produtosPreco[p.produtoID] * (p.quantidade || 1);
        }
      });
    }
    if (ordem.servicoID && servicosPreco[ordem.servicoID]) {
      total += servicosPreco[ordem.servicoID];
    }
    if (ordem.produtoID && produtosPreco[ordem.produtoID]) {
      total += produtosPreco[ordem.produtoID];
    }
    if (ordem.precoServicos && typeof ordem.precoServicos === 'number') {
      total += ordem.precoServicos;
    }
    if (ordem.precoProdutos && typeof ordem.precoProdutos === 'number') {
      total += ordem.precoProdutos;
    }
    if (total === 0 && ordem.valorTotal && typeof ordem.valorTotal === 'number') {
      total = ordem.valorTotal;
    }
    if (total === 0 && ordem.precoTotal && typeof ordem.precoTotal === 'number') {
      total = ordem.precoTotal;
    }
    if (total === 0 && ordem.preco && typeof ordem.preco === 'number') {
      total = ordem.preco;
    }
    return total;
  };

  const aplicarFiltros = () => {
    let ordensFiltradas = [...ordens];

    if (filtros.cliente) {
      ordensFiltradas = ordensFiltradas.filter(ordem => {
        const nomeCliente = getClienteNome(ordem.clienteID).toLowerCase();
        return nomeCliente.includes(filtros.cliente.toLowerCase());
      });
    }

    if (filtros.dataInicio) {
      ordensFiltradas = ordensFiltradas.filter(ordem => {
        const dataOrdem = new Date(ordem.dataConclusao);
        const dataInicio = new Date(filtros.dataInicio);
        return dataOrdem >= dataInicio;
      });
    }

    if (filtros.dataFim) {
      ordensFiltradas = ordensFiltradas.filter(ordem => {
        const dataOrdem = new Date(ordem.dataConclusao);
        const dataFim = new Date(filtros.dataFim);
        return dataOrdem <= dataFim;
      });
    }

    if (filtros.valorMin) {
      ordensFiltradas = ordensFiltradas.filter(ordem => {
        const valorOrdem = calcularPrecoTotal(ordem);
        return valorOrdem >= parseFloat(filtros.valorMin);
      });
    }

    if (filtros.valorMax) {
      ordensFiltradas = ordensFiltradas.filter(ordem => {
        const valorOrdem = calcularPrecoTotal(ordem);
        return valorOrdem <= parseFloat(filtros.valorMax);
      });
    }

    setOrdensFiltered(ordensFiltradas);
  };

  const limparFiltros = () => {
    setFiltros({
      cliente: '',
      dataInicio: '',
      dataFim: '',
      valorMin: '',
      valorMax: ''
    });
  };

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const exportarDados = () => {
    // Só exporta ordens concluídas
    const dadosParaExportar = ordensFiltered
      .filter(ordem => ordem.status === 'Concluída')
      .map(ordem => ({
        'Cliente': getClienteNome(ordem.clienteID),
        'Produtos': getProdutoNome(ordem),
        'Serviços': getServicoDescricao(ordem),
        'Valor Total': calcularPrecoTotal(ordem),
        'Data Entrada': formatDate(ordem.dataEntrada),
        'Data Conclusão': formatDate(ordem.dataConclusao)
      }));

    const headers = Object.keys(dadosParaExportar[0] || {});
    const csvContent = [
      headers.join(','),
      ...dadosParaExportar.map(row =>
        headers.map(header => `"${row[header]}"`).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `vendas_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const abrirRecibo = (ordem) => {
    setOrdemSelecionada(ordem);
    setReciboModalOpen(true);
  };

  const fecharRecibo = () => {
    setReciboModalOpen(false);
    setOrdemSelecionada(null);
  };

  const columns = [
    {
      Header: 'Nome Cliente',
      accessor: 'clienteID',
      sortable: true,
      Cell: ({ value }) => (
        <span style={{
          color: '#2c3e50',
          fontWeight: '600',
          fontSize: '0.95rem'
        }}>
          {getClienteNome(value)}
        </span>
      ),
    },
    {
      Header: 'Nome Produtos',
      accessor: 'produtoIDs',
      sortable: false,
      Cell: ({ row }) => (
        <div style={{
          maxWidth: '300px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: '#495057',
          fontSize: '0.9rem',
          lineHeight: '1.4'
        }}>
          {getProdutoNome(row.original)}
        </div>
      ),
    },
    {
      Header: 'Descrição Serviços',
      accessor: 'servicoIDs',
      sortable: false,
      Cell: ({ row }) => (
        <div style={{
          maxWidth: '300px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: '#495057',
          fontSize: '0.9rem',
          lineHeight: '1.4'
        }}>
          {getServicoDescricao(row.original)}
        </div>
      ),
    },
    {
      Header: 'Preço Total',
      accessor: row => calcularPrecoTotal(row),
      sortable: true,
      sortType: 'basic',
      Cell: ({ row }) => {
        const total = calcularPrecoTotal(row.original);
        return (
          <div style={{ textAlign: 'right' }}>
            <span style={{
              color: total > 500 ? '#28a745' : '#17a2b8',
              fontWeight: '700',
              fontSize: '1.1rem',
              padding: '0.3rem 0.6rem',
              background: total > 500 ? 'rgba(40, 167, 69, 0.1)' : 'rgba(23, 162, 184, 0.1)',
              borderRadius: '6px',
              display: 'inline-block'
            }}>
              {formatCurrency(total)}
            </span>
          </div>
        );
      },
    },
    {
      Header: 'Data Conclusão',
      accessor: 'dataConclusao',
      sortable: true,
      Cell: ({ value }) => (
        <div style={{ textAlign: 'center' }}>
          <span style={{
            color: '#155724',
            fontSize: '0.85rem',
            background: '#d4edda',
            padding: '0.2rem 0.5rem',
            borderRadius: '4px',
            display: 'inline-block',
            fontWeight: '500'
          }}>
            {formatDate(value)}
          </span>
        </div>
      ),
    },
    {
      Header: 'Ações',
      sortable: false,
      Cell: ({ row }) => (
        <div style={{ textAlign: 'center' }}>
          <ActionButton onClick={() => abrirRecibo(row.original)}>
            <span className="icon">🧾</span>
            Recibo
          </ActionButton>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          Carregando dados das vendas...
        </LoadingContainer>
      </Container>
    );
  }

  // Só exibe stats e tabela de ordens concluídas
  const ordensConcluidas = ordensFiltered.filter(o => o.status === 'Concluída');

  return (
    <Container>
      <Header>
        <div>
          <Title>💰 Vendas</Title>
          <Subtitle>Ordens de serviço concluídas e recibos</Subtitle>
        </div>
        <div>
          <ExportButton onClick={exportarDados}>
            <span className="icon">📊</span>
            Exportar Dados
          </ExportButton>
        </div>
      </Header>

      <StatsContainer>
        <StatCard>
          <div className="stat-icon">📊</div>
          <div className="stat-number">{stats.totalVendas}</div>
          <div className="stat-label">
            {ordensConcluidas.length !== ordens.length
              ? `Total Filtradas (${ordens.length} total)`
              : 'Total de Vendas'
            }
          </div>
        </StatCard>
        <StatCard>
          <div className="stat-icon">📈</div>
          <div className="stat-number">{stats.vendasMes}</div>
          <div className="stat-label">Vendas este Mês</div>
        </StatCard>
        <StatCard>
          <div className="stat-icon">💵</div>
          <div className="stat-number">{formatCurrency(stats.valorTotal)}</div>
          <div className="stat-label">
            {ordensConcluidas.length !== ordens.length
              ? 'Valor Filtrado'
              : 'Valor Total'
            }
          </div>
        </StatCard>
        <StatCard>
          <div className="stat-icon">💰</div>
          <div className="stat-number">{formatCurrency(stats.valorMes)}</div>
          <div className="stat-label">Valor este Mês</div>
        </StatCard>
      </StatsContainer>

      {/* Filtros */}
      <FiltersContainer>
        <div style={{
          color: '#2c3e50',
          fontSize: '1.1rem',
          fontWeight: '600',
          marginBottom: '1rem'
        }}>
          🔍 Filtros de Pesquisa
        </div>

        <FiltersGrid>
          <FilterGroup>
            <label>Cliente</label>
            <input
              type="text"
              placeholder="Nome do cliente..."
              value={filtros.cliente}
              onChange={(e) => handleFiltroChange('cliente', e.target.value)}
            />
          </FilterGroup>

          <FilterGroup>
            <label>Data Início</label>
            <input
              type="date"
              value={filtros.dataInicio}
              onChange={(e) => handleFiltroChange('dataInicio', e.target.value)}
            />
          </FilterGroup>

          <FilterGroup>
            <label>Data Fim</label>
            <input
              type="date"
              value={filtros.dataFim}
              onChange={(e) => handleFiltroChange('dataFim', e.target.value)}
            />
          </FilterGroup>

          <FilterGroup>
            <label>Valor Mínimo</label>
            <input
              type="number"
              placeholder="R$ 0,00"
              value={filtros.valorMin}
              onChange={(e) => handleFiltroChange('valorMin', e.target.value)}
              min="0"
              step="0.01"
            />
          </FilterGroup>

          <FilterGroup>
            <label>Valor Máximo</label>
            <input
              type="number"
              placeholder="R$ 0,00"
              value={filtros.valorMax}
              onChange={(e) => handleFiltroChange('valorMax', e.target.value)}
              min="0"
              step="0.01"
            />
          </FilterGroup>
        </FiltersGrid>

        <FilterActions>
          <FilterButton className="secondary" onClick={limparFiltros}>
            🗑️ Limpar Filtros
          </FilterButton>
          <div style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            fontSize: '0.9rem',
            color: '#6c757d'
          }}>
            <span>
              <strong>{ordensConcluidas.length}</strong> de <strong>{ordens.length}</strong> vendas concluídas
            </span>
            {ordensConcluidas.length > 0 && (
              <span>
                Total: <strong style={{ color: '#28a745' }}>
                  {formatCurrency(ordensConcluidas.reduce((sum, ordem) => sum + calcularPrecoTotal(ordem), 0))}
                </strong>
              </span>
            )}
          </div>
        </FilterActions>
      </FiltersContainer>

      <TableContainer>
  <div style={{
    color: '#2c3e50',
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    📋 Lista de Vendas Concluídas
    <span style={{
      fontSize: '0.9rem',
      color: '#6c757d',
      fontWeight: '500'
    }}>
      {ordensConcluidas.length} vendas concluídas encontradas
    </span>
  </div>
  {/* Wrapper responsivo para tabela */}
  <div style={{
    overflowX: 'auto',
    minHeight: '1px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    background: '#fff',
    padding: '0.5rem',
    minWidth: '350px'
  }}>
    <Table
      columns={columns}
      data={ordensConcluidas}
      initialPageSize={10}
    />
  </div>
</TableContainer>

      {/* Modal de Recibo */}
      {reciboModalOpen && ordemSelecionada && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '2rem',
            overflowY: 'auto',
            maxHeight: '100vh',
          }}
          onClick={fecharRecibo}
        >
          <div onClick={(e) => e.stopPropagation()} style={{
            background: 'white',
            borderRadius: '12px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
            <ReciboCliente
              ordemDeServico={ordemSelecionada}
              onClose={fecharRecibo}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Vendas;