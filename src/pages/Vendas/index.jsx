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
import { PaginationContainer, PaginationButton, PaginationInfo } from '../OrdensDeServico/style';

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
  const [statusFiltro, setStatusFiltro] = useState('Todos');
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [ordens, filtros, statusFiltro]);

  useEffect(() => {
    // Calcula stats com base no filtro de status
    const ordensFiltradas = ordensFiltered.filter(o => o.status === statusFiltro || statusFiltro === 'Todos');
    if (
      ordensFiltradas.length > 0 &&
      (Object.keys(produtosPreco).length > 0 || Object.keys(servicosPreco).length > 0)
    ) {
      calculateStats(ordensFiltradas);
    } else {
      setStats({
        totalVendas: 0,
        vendasMes: 0,
        valorTotal: 0,
        valorMes: 0
      });
    }
  }, [ordensFiltered, produtosPreco, servicosPreco, statusFiltro]);
  const fetchData = async () => {
    try {
      setLoading(true);

      const ordensResponse = await apiCliente.get('/OrdemDeServico');
      const todasOrdens = ordensResponse.data;

      // Sempre traga todas as ordens ativas
      const ordensAtivas = todasOrdens.filter(ordem => ordem.ativo);
      // Ordena do mais recente para o mais antigo usando `dataConclusao` (fallback para `dataEntrada`)
      const parseDate = (d) => {
        if (!d) return new Date(0);
        const dt = new Date(d);
        if (!isNaN(dt)) return dt;
        const alt = new Date(String(d).replace(/-/g, '/'));
        return isNaN(alt) ? new Date(0) : alt;
      };
      const ordensSorted = [...ordensAtivas].sort((a, b) => parseDate(b.dataConclusao || b.dataEntrada) - parseDate(a.dataConclusao || a.dataEntrada));

      const clientesIds = new Set(ordensAtivas.map(o => o.clienteID));
      const funcionariosIds = new Set(ordensAtivas.map(o => o.funcionarioID));
      const produtosIds = new Set();
      const servicosIds = new Set();

      // Para reduzir tempo inicial, buscamos dados apenas para as primeiras N ordens exibidas (lazy-load)
      const PREVIEW_LIMIT = 25;
      const previewOrdens = ordensSorted.slice(0, PREVIEW_LIMIT);

      previewOrdens.forEach(ordem => {
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

      // Busca mapas (retornam apenas os IDs faltantes) e retornam os dados para uso imediato
      const [clientesMap, funcionariosMap, produtosMap, servicosMap, produtosPrecoMap, servicosPrecoMap] = await Promise.all([
        fetchMap(clientesIds, '/Cliente/', setClientes, clientes),
        fetchMap(funcionariosIds, '/Funcionario/', setFuncionarios, funcionarios),
        fetchMap(produtosIds, '/Produto/', setProdutos, produtos),
        fetchMap(servicosIds, '/Servico/', setServicos, servicos),
        fetchMapPreco(produtosIds, '/Produto/', setProdutosPreco, produtosPreco),
        fetchMapPreco(servicosIds, '/Servico/', setServicosPreco, servicosPreco),
      ]);

      // Mescla mapas retornados com os estados existentes
      setClientes(prev => ({ ...prev, ...clientesMap }));
      setFuncionarios(prev => ({ ...prev, ...funcionariosMap }));
      setProdutos(prev => ({ ...prev, ...produtosMap }));
      setServicos(prev => ({ ...prev, ...servicosMap }));
      setProdutosPreco(prev => ({ ...prev, ...produtosPrecoMap }));
      setServicosPreco(prev => ({ ...prev, ...servicosPrecoMap }));

      // Pré-calcula o preço total de cada ordem usando os mapas obtidos para evitar recomputações pesadas na renderização
      const precoProdutos = { ...produtosPreco, ...produtosPrecoMap };
      const precoServicos = { ...servicosPreco, ...servicosPrecoMap };

      const calcularTotalLocal = (ordem) => {
        let valorServico = 0;
        if (Array.isArray(ordem.servicoIDs)) {
          valorServico = ordem.servicoIDs.reduce((sum, id) => sum + (Number(precoServicos[id]) || 0), 0);
        }
        let valorProdutos = 0;
        if (Array.isArray(ordem.produtoIDs)) {
          const pecasIDs = Array.isArray(ordem.pecasUtilizadas)
            ? ordem.pecasUtilizadas.map(p => String(p.produtoID))
            : [];
          valorProdutos = ordem.produtoIDs
            .filter(id => !pecasIDs.includes(String(id)))
            .reduce((sum, id) => sum + (Number(precoProdutos[id]) || 0), 0);
        }
        let valorPecasUtilizadas = 0;
        if (Array.isArray(ordem.pecasUtilizadas)) {
          valorPecasUtilizadas = ordem.pecasUtilizadas.reduce(
            (sum, p) => sum + ((Number(precoProdutos[p.produtoID]) || 0) * (Number(p.quantidade) || 1)),
            0
          );
        }
        const valorMaoDeObra = Number(ordem.valorMaoDeObra) || 0;
        return valorServico + valorProdutos + valorPecasUtilizadas + valorMaoDeObra;
      };

      const ordensComTotal = ordensSorted.map((o, idx) => {
        if (idx < PREVIEW_LIMIT) {
          return { ...o, totalPreco: calcularTotalLocal(o) };
        }
        return o;
      });
      setOrdens(ordensComTotal);
      setOrdensFiltered(ordensComTotal);

      // Lazy-load restante dos mapas e pré-cálculo em background para não bloquear render inicial
      (async () => {
        try {
          const remaining = ordensSorted.slice(PREVIEW_LIMIT);
          if (remaining.length === 0) return;

          const remClientesIds = new Set(remaining.map(o => o.clienteID));
          const remFuncionariosIds = new Set(remaining.map(o => o.funcionarioID));
          const remProdutosIds = new Set();
          const remServicosIds = new Set();

          remaining.forEach(ordem => {
            if (Array.isArray(ordem.produtoIDs)) ordem.produtoIDs.forEach(id => remProdutosIds.add(id));
            if (Array.isArray(ordem.servicoIDs)) ordem.servicoIDs.forEach(id => remServicosIds.add(id));
            if (ordem.produtoID) remProdutosIds.add(ordem.produtoID);
            if (ordem.servicoID) remServicosIds.add(ordem.servicoID);
            if (Array.isArray(ordem.pecasUtilizadas)) ordem.pecasUtilizadas.forEach(p => { if (p.produtoID) remProdutosIds.add(p.produtoID); });
          });

          const [rClientesMap, rFuncionariosMap, rProdutosMap, rServicosMap, rProdutosPrecoMap, rServicosPrecoMap] = await Promise.all([
            fetchMap(remClientesIds, '/Cliente/', setClientes, { ...clientes, ...clientesMap }),
            fetchMap(remFuncionariosIds, '/Funcionario/', setFuncionarios, { ...funcionarios, ...funcionariosMap }),
            fetchMap(remProdutosIds, '/Produto/', setProdutos, { ...produtos, ...produtosMap }),
            fetchMap(remServicosIds, '/Servico/', setServicos, { ...servicos, ...servicosMap }),
            fetchMapPreco(remProdutosIds, '/Produto/', setProdutosPreco, { ...produtosPreco, ...produtosPrecoMap }),
            fetchMapPreco(remServicosIds, '/Servico/', setServicosPreco, { ...servicosPreco, ...servicosPrecoMap }),
          ]);

          // Mescla resultados e recalcula total das ordens restantes
          const allProdutosPreco = { ...produtosPreco, ...produtosPrecoMap, ...rProdutosPrecoMap };
          const allServicosPreco = { ...servicosPreco, ...servicosPrecoMap, ...rServicosPrecoMap };

          const calcularTotalComMapas = (ordem) => {
            let valorServico = 0;
            if (Array.isArray(ordem.servicoIDs)) valorServico = ordem.servicoIDs.reduce((s, id) => s + (Number(allServicosPreco[id]) || 0), 0);
            let valorProdutos = 0;
            if (Array.isArray(ordem.produtoIDs)) {
              const pecas = Array.isArray(ordem.pecasUtilizadas) ? ordem.pecasUtilizadas.map(p => String(p.produtoID)) : [];
              valorProdutos = ordem.produtoIDs.filter(id => !pecas.includes(String(id))).reduce((s, id) => s + (Number(allProdutosPreco[id]) || 0), 0);
            }
            let valorPecasUtilizadas = 0;
            if (Array.isArray(ordem.pecasUtilizadas)) valorPecasUtilizadas = ordem.pecasUtilizadas.reduce((s, p) => s + ((Number(allProdutosPreco[p.produtoID]) || 0) * (Number(p.quantidade) || 1)), 0);
            const valorMao = Number(ordem.valorMaoDeObra) || 0;
            return valorServico + valorProdutos + valorPecasUtilizadas + valorMao;
          };

          setOrdens(prev => prev.map((o, idx) => {
            if (idx >= PREVIEW_LIMIT) {
              return { ...o, totalPreco: calcularTotalComMapas(o) };
            }
            return o;
          }));
          setOrdensFiltered(prev => prev.map((o, idx) => {
            if (idx >= PREVIEW_LIMIT) {
              return { ...o, totalPreco: calcularTotalComMapas(o) };
            }
            return o;
          }));
        } catch (err) {
          console.error('Erro no lazy-load de mapas:', err);
        }
      })();
      // não há necessidade de acionar comportamento extra aqui

    } catch (error) {
      console.error('Erro ao carregar dados das vendas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Busca somente os IDs que faltam no estado atual e retorna o mapa com os resultados
  const fetchMap = async (ids, endpoint, setState, existingState = {}) => {
    const dataMap = {};
    const missing = Array.from(ids).filter(id => id && !existingState[id]);
    if (missing.length === 0) return {};
    await Promise.all(missing.map(async id => {
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
    return dataMap;
  };

  const fetchMapPreco = async (ids, endpoint, setState, existingState = {}) => {
    const dataMap = {};
    const missing = Array.from(ids).filter(id => id && !existingState[id]);
    if (missing.length === 0) return {};
    await Promise.all(missing.map(async id => {
      try {
        const response = await apiCliente.get(`${endpoint}${id}`);
        dataMap[id] = parseFloat(response.data.preco) || 0;
      } catch (error) {
        console.error(`Erro ao buscar preço ${endpoint}${id}:`, error);
        dataMap[id] = 0;
      }
    }));
    return dataMap;
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

      const valorOrdem = ordem.totalPreco !== undefined ? Number(ordem.totalPreco) : calcularPrecoTotal(ordem);
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

  // Novo cálculo de preço total, igual ao relatório de impressão
  const calcularPrecoTotal = (ordem) => {
    // Soma dos serviços
    let valorServico = 0;
    if (Array.isArray(ordem.servicoIDs)) {
      valorServico = ordem.servicoIDs.reduce((sum, id) => sum + (Number(servicosPreco[id]) || 0), 0);
    }
    // Soma dos produtos (evita duplicidade com pecasUtilizadas)
    let valorProdutos = 0;
    if (Array.isArray(ordem.produtoIDs)) {
      // Exclui IDs que já estão em pecasUtilizadas
      const pecasIDs = Array.isArray(ordem.pecasUtilizadas)
        ? ordem.pecasUtilizadas.map(p => String(p.produtoID))
        : [];
      valorProdutos = ordem.produtoIDs
        .filter(id => !pecasIDs.includes(String(id)))
        .reduce((sum, id) => sum + (Number(produtosPreco[id]) || 0), 0);
    }
    // Soma das peças utilizadas (considera quantidade correta)
    let valorPecasUtilizadas = 0;
    if (Array.isArray(ordem.pecasUtilizadas)) {
      valorPecasUtilizadas = ordem.pecasUtilizadas.reduce(
        (sum, p) => sum + ((Number(produtosPreco[p.produtoID]) || 0) * (Number(p.quantidade) || 1)),
        0
      );
    }
    // Mão de obra manual
    const valorMaoDeObra = Number(ordem.valorMaoDeObra) || 0;

    // Preço total = serviços + produtos (sem duplicidade) + peças utilizadas + mão de obra manual
    return valorServico + valorProdutos + valorPecasUtilizadas + valorMaoDeObra;
  };

  const aplicarFiltros = () => {
    let ordensFiltradas = [...ordens];

    if (statusFiltro !== 'Todos') {
      ordensFiltradas = ordensFiltradas.filter(ordem => ordem.status === statusFiltro);
    }

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
        const valorOrdem = ordem.totalPreco !== undefined ? Number(ordem.totalPreco) : calcularPrecoTotal(ordem);
        return valorOrdem >= parseFloat(filtros.valorMin);
      });
    }

    if (filtros.valorMax) {
      ordensFiltradas = ordensFiltradas.filter(ordem => {
        const valorOrdem = ordem.totalPreco !== undefined ? Number(ordem.totalPreco) : calcularPrecoTotal(ordem);
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
    setStatusFiltro('Todos');
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
      .filter(ordem => ordem.status === 'Concluido')
      .map(ordem => ({
        'Cliente': getClienteNome(ordem.clienteID),
        'Produtos': getProdutoNome(ordem),
        'Serviços': getServicoDescricao(ordem),
        'Valor Total': ordem.totalPreco !== undefined ? Number(ordem.totalPreco) : calcularPrecoTotal(ordem),
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
        <div style={{ textAlign: 'center', padding: '0.5rem 0.7rem' }}>
          <span style={{
            color: '#2c3e50',
            fontWeight: '600',
            fontSize: '0.95rem'
          }}>
            {getClienteNome(value)}
          </span>
        </div>
      ),
    },
    {
      Header: 'Status',
      accessor: 'status',
      sortable: true,
      Cell: ({ value }) => (
        <div style={{ textAlign: 'center', padding: '0.5rem 0.7rem' }}>
          <span style={{
            color:
              value === 'Concluido' ? '#28a745'
              : value === 'Cancelado' ? '#dc3545'
              : value === 'Entregue' ? '#007bff'
              : '#6c757d',
            fontWeight: '600',
            fontSize: '0.95rem',
            textTransform: 'capitalize',
            background:
              value === 'Concluido' ? 'rgba(40, 167, 69, 0.08)'
              : value === 'Cancelado' ? 'rgba(220, 53, 69, 0.08)'
              : value === 'Entregue' ? 'rgba(0, 123, 255, 0.08)'
              : 'rgba(108, 117, 125, 0.08)',
            borderRadius: '6px',
            padding: '0.2rem 0.7rem',
            display: 'inline-block',
          }}>{value}</span>
        </div>
      ),
    },

    {
      Header: 'Preço Total',
      accessor: 'totalPreco',
      sortable: true,
      sortType: 'basic',
      Cell: ({ row }) => {
        const total = row.original.totalPreco !== undefined ? Number(row.original.totalPreco) : calcularPrecoTotal(row.original);
        return (
          <div style={{ textAlign: 'center', padding: '0.5rem 0.7rem' }}>
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
        <div style={{ textAlign: 'center', padding: '0.5rem 0.7rem' }}>
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
        <div style={{ textAlign: 'center', padding: '0.5rem 0.7rem' }}>
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
  const ordensConcluidas = ordensFiltered.filter(o => o.status === 'Concluido');
  const ordensExibidasAll = ordensFiltered.filter(o => statusFiltro === 'Todos' || o.status === statusFiltro);

  const totalPages = Math.max(1, Math.ceil(ordensExibidasAll.length / itemsPerPage));
  const paginatedOrdens = ordensExibidasAll.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#2c3e50',
          fontSize: '1.1rem',
          fontWeight: '600',
          marginBottom: '1rem'
        }}>
          <div>🔍 Filtros de Pesquisa</div>
          <button
            onClick={() => setAdvancedOpen(prev => !prev)}
            style={{
              background: 'none',
              border: '1px solid rgba(0,0,0,0.08)',
              padding: '6px 10px',
              borderRadius: 8,
              cursor: 'pointer'
            }}
            aria-expanded={advancedOpen}
          >
            {advancedOpen ? 'Ocultar avançado' : 'Pesquisa avançada'}
          </button>
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

          {advancedOpen && (
            <>
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
            </>
          )}

          <FilterGroup>
            <label>Status</label>
            <select
              value={statusFiltro}
              onChange={(e) => setStatusFiltro(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Concluido">Concluído</option>
              <option value="Cancelado">Cancelado</option>
              <option value="Entregue">Entregue</option>
            </select>
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
              <strong>{ordensFiltered.length}</strong> de <strong>{ordens.length}</strong> vendas encontradas
            </span>
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
    📋 Vendas
    <span style={{
      fontSize: '0.9rem',
      color: '#6c757d',
      fontWeight: '500'
    }} />
  </div>
  <div style={{
    overflowX: 'auto',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    background: '#fff',
    padding: '0.5rem',
  }}>
    <Table
      columns={columns}
      data={paginatedOrdens}
      initialPageSize={itemsPerPage}
    />

    {/* Paginação inferior (semelhante a OrdensDeServico) */}
    <PaginationContainer>
      <PaginationButton
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Anterior
      </PaginationButton>

      <PaginationInfo>
        Página {currentPage} de {totalPages} ({ordensExibidasAll.length} itens)
      </PaginationInfo>

      <PaginationButton
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Próxima
      </PaginationButton>
    </PaginationContainer>
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