import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import apiCliente from '../../services/apiCliente';
import Table from '../../components/Tables';
import ReciboCliente from '../../components/Modais/OrdemDeServico/ReciboCliente';

const Container = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  color: white;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #6c757d;
    margin: 0.5rem 0 0 0;
  }

  .stat-icon {
    font-size: 2.5rem;
    opacity: 0.7;
    float: right;
  }
`;

const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  /* Forçar cores escuras na tabela */
  table {
    color: #2c3e50 !important;
    background: white !important;
  }
  
  thead th {
    color: #2c3e50 !important;
    background: #f8f9fa !important;
    font-weight: 600 !important;
    border-bottom: 2px solid #dee2e6 !important;
  }
  
  tbody td {
    color: #495057 !important;
    background: white !important;
    border-bottom: 1px solid #dee2e6 !important;
  }
  
  tbody tr:hover td {
    background: #f1f3f4 !important;
    color: #2c3e50 !important;
  }
  
  /* Sobrescrever qualquer estilo herdado */
  .table, .table td, .table th, .table tr {
    color: #2c3e50 !important;
  }
  
  /* Manter botões com cores corretas */
  button {
    color: white !important;
  }
  
  /* Estilos específicos para react-table se estiver sendo usado */
  .rt-table .rt-thead .rt-th {
    color: #2c3e50 !important;
    background: #f8f9fa !important;
  }
  
  .rt-table .rt-tbody .rt-td {
    color: #495057 !important;
    background: white !important;
  }
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  .icon {
    font-size: 1.1rem;
  }
`;

const StatusBadge = styled.span`
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.8rem;
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: white;
  font-size: 1.2rem;
  
  &::after {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    margin-left: 1rem;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const FiltersContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 600;
    color: #2c3e50;
    font-size: 0.9rem;
  }

  input, select {
    padding: 0.75rem;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    background: white;

    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
`;

const FilterActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const FilterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
  }
  
  &.secondary {
    background: #6c757d;
    color: white;
    
    &:hover {
      background: #5a6268;
    }
  }
`;

const ExportButton = styled.button`
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  .icon {
    font-size: 1.1rem;
  }
`;

const Vendas = () => {
  const [ordens, setOrdens] = useState([]);
  const [ordensFiltered, setOrdensFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clientes, setClientes] = useState({});
  const [funcionarios, setFuncionarios] = useState({});
  const [produtos, setProdutos] = useState({});
  const [servicos, setServicos] = useState({});
  // Mapas separados para cálculos de preço
  const [produtosPreco, setProdutosPreco] = useState({});
  const [servicosPreco, setServicosPreco] = useState({});
  const [stats, setStats] = useState({
    totalVendas: 0,
    vendasMes: 0,
    valorTotal: 0,
    valorMes: 0
  });

  // Estados de filtro
  const [filtros, setFiltros] = useState({
    cliente: '',
    dataInicio: '',
    dataFim: '',
    valorMin: '',
    valorMax: ''
  });

  // Estados do modal de recibo
  const [reciboModalOpen, setReciboModalOpen] = useState(false);
  const [ordemSelecionada, setOrdemSelecionada] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [ordens, filtros]);

  useEffect(() => {
    if (ordensFiltered.length > 0 && Object.keys(produtosPreco).length > 0 && Object.keys(servicosPreco).length > 0) {
      calculateStats(ordensFiltered);
    }
  }, [ordensFiltered, produtosPreco, servicosPreco]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Buscar todas as ordens de serviço usando o endpoint correto
      const ordensResponse = await apiCliente.get('/OrdemDeServico');
      const todasOrdens = ordensResponse.data;
      
      // Filtrar apenas ordens ativas e com status 'Concluída'
      // TEMPORÁRIO: vamos ver todas as ordens ativas primeiro para debug
      const ordensConcluidas = todasOrdens.filter(ordem => ordem.ativo);
      const ordensComStatusConcluida = todasOrdens.filter(ordem => 
        ordem.ativo && ordem.status === 'Concluída'
      );

      console.log('Total de ordens:', todasOrdens.length);
      console.log('Ordens ativas:', ordensConcluidas.length);
      console.log('Ordens concluídas:', ordensComStatusConcluida.length);
      console.log('Status das primeiras 5 ordens:', todasOrdens.slice(0, 5).map(o => o.status));
      console.log('Primeira ordem (estrutura completa):', todasOrdens[0]);
      console.log('Campos de preço na primeira ordem:', {
        preco: todasOrdens[0]?.preco,
        precoTotal: todasOrdens[0]?.precoTotal,
        precoProdutos: todasOrdens[0]?.precoProdutos,
        precoServicos: todasOrdens[0]?.precoServicos,
        produtos: todasOrdens[0]?.produtos,
        servicos: todasOrdens[0]?.servicos
      });

      // Se não há ordens concluídas, mostra todas as ativas para debug
      const ordensParaExibir = ordensComStatusConcluida.length > 0 ? ordensComStatusConcluida : ordensConcluidas;
      setOrdens(ordensParaExibir);
      setOrdensFiltered(ordensParaExibir);

      // Coletar IDs únicos para buscar dados relacionados
      const clientesIds = new Set(ordensParaExibir.map(o => o.clienteID));
      const funcionariosIds = new Set(ordensParaExibir.map(o => o.funcionarioID));
      const produtosIds = new Set();
      const servicosIds = new Set();

      ordensParaExibir.forEach(ordem => {
        // Formato antigo (compatibilidade)
        if (ordem.produtoID) produtosIds.add(ordem.produtoID);
        if (ordem.servicoID) servicosIds.add(ordem.servicoID);
        
        // Formato novo (arrays) - se existir
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

      // Buscar dados relacionados em paralelo
      await Promise.all([
        fetchMap(clientesIds, '/Cliente/', setClientes),
        fetchMap(funcionariosIds, '/Funcionario/', setFuncionarios),
        fetchMap(produtosIds, '/Produto/', setProdutos),
        fetchMap(servicosIds, '/Servico/', setServicos),
        // Buscar preços separadamente
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
        // Para clientes, produtos e serviços, armazenar apenas o nome/descrição como na página OrdemDeServico
        if (endpoint.includes('/Cliente/')) {
          dataMap[id] = response.data.nome;
        } else if (endpoint.includes('/Produto/')) {
          dataMap[id] = response.data.nome;
        } else if (endpoint.includes('/Servico/')) {
          // Para serviços, usar descrição se disponível, senão nome
          dataMap[id] = response.data.descricao || response.data.nome;
        } else {
          // Para outros endpoints, manter o objeto completo
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
        // Armazenar apenas o preço
        dataMap[id] = parseFloat(response.data.preco) || 0;
      } catch (error) {
        console.error(`Erro ao buscar preço ${endpoint}${id}:`, error);
        dataMap[id] = 0;
      }
    }));
    setState(dataMap);
  };

  const calculateStats = (ordens) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    let totalVendas = ordens.length;
    let vendasMes = 0;
    let valorTotal = 0;
    let valorMes = 0;

    ordens.forEach(ordem => {
      // Usar campos corretos do banco (maiúsculas)
      const dataConclusao = new Date(ordem.dataConclusao);
      const isCurrentMonth = dataConclusao.getMonth() === currentMonth && dataConclusao.getFullYear() === currentYear;

      if (isCurrentMonth) {
        vendasMes++;
      }

      // Calcular valor total da ordem usando a função existente
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
    // Formato novo (arrays)
    if (ordem.produtos && Array.isArray(ordem.produtos)) {
      return ordem.produtos
        .filter(produto => produto.produtoID)
        .map(produto => `${produtos[produto.produtoID]} (${produto.quantidade})`)
        .join(', ') || 'Nenhum produto';
    }
    // Compatibilidade com formato antigo
    return ordem.produtoID ? produtos[ordem.produtoID] : 'Nenhum produto';
  };

  const getServicoDescricao = (ordem) => {
    // Formato novo (arrays)
    if (ordem.servicos && Array.isArray(ordem.servicos)) {
      return ordem.servicos
        .filter(servico => servico.servicoID)
        .map(servico => `${servicos[servico.servicoID]} (${servico.quantidade})`)
        .join(', ') || 'Nenhum serviço';
    }
    // Compatibilidade com formato antigo
    return ordem.servicoID ? servicos[ordem.servicoID] : 'Nenhum serviço';
  };

  const calcularPrecoTotal = (ordem) => {
    let total = 0;

    // Somar preços dos serviços
    if (ordem.servicos && Array.isArray(ordem.servicos)) {
      // Para array de serviços (formato novo)
      ordem.servicos.forEach(servico => {
        if (servico.servicoID && servicosPreco[servico.servicoID]) {
          total += servicosPreco[servico.servicoID] * (servico.quantidade || 1);
        }
      });
    } else if (ordem.servicoID && servicosPreco[ordem.servicoID]) {
      // Compatibilidade com formato antigo (um único serviço)
      total += servicosPreco[ordem.servicoID];
    }
    // Se não há array mas há campo 'preco' direto na ordem para serviços
    else if (ordem.precoServicos && typeof ordem.precoServicos === 'number') {
      total += ordem.precoServicos;
    }

    // Somar preços dos produtos  
    if (ordem.produtos && Array.isArray(ordem.produtos)) {
      // Para array de produtos (formato novo)
      ordem.produtos.forEach(produto => {
        if (produto.produtoID && produtosPreco[produto.produtoID]) {
          total += produtosPreco[produto.produtoID] * (produto.quantidade || 1);
        }
      });
    } else if (ordem.produtoID && produtosPreco[ordem.produtoID]) {
      // Compatibilidade com formato antigo (um único produto)
      total += produtosPreco[ordem.produtoID];
    }
    // Se não há array mas há campo 'preco' direto na ordem para produtos
    else if (ordem.precoProdutos && typeof ordem.precoProdutos === 'number') {
      total += ordem.precoProdutos;
    }

    // Fallback: se a ordem já tem um campo 'precoTotal' calculado no backend
    if (total === 0 && ordem.precoTotal && typeof ordem.precoTotal === 'number') {
      total = ordem.precoTotal;
    }
    
    // Fallback: se a ordem tem um campo 'preco' genérico
    if (total === 0 && ordem.preco && typeof ordem.preco === 'number') {
      total = ordem.preco;
    }

    return total;
  };

  // Funções de filtro
  const aplicarFiltros = () => {
    let ordensFiltradas = [...ordens];

    // Filtro por cliente
    if (filtros.cliente) {
      ordensFiltradas = ordensFiltradas.filter(ordem => {
        const nomeCliente = getClienteNome(ordem.clienteID).toLowerCase();
        return nomeCliente.includes(filtros.cliente.toLowerCase());
      });
    }

    // Filtro por data
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

    // Filtro por valor
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

  // Função de exportação para Excel/CSV
  const exportarDados = () => {
    const dadosParaExportar = ordensFiltered.map(ordem => ({
      'Cliente': getClienteNome(ordem.clienteID),
      'Produtos': getProdutoNome(ordem),
      'Serviços': getServicoDescricao(ordem),
      'Valor Total': calcularPrecoTotal(ordem),
      'Data Entrada': formatDate(ordem.dataEntrada),
      'Data Conclusão': formatDate(ordem.dataConclusao)
    }));

    // Converter para CSV
    const headers = Object.keys(dadosParaExportar[0] || {});
    const csvContent = [
      headers.join(','),
      ...dadosParaExportar.map(row => 
        headers.map(header => `"${row[header]}"`).join(',')
      )
    ].join('\n');

    // Download do arquivo
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
      accessor: 'produtoID',
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
      accessor: 'servicoID', 
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
            {ordensFiltered.length !== ordens.length 
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
            {ordensFiltered.length !== ordens.length 
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
              <strong>{ordensFiltered.length}</strong> de <strong>{ordens.length}</strong> vendas
            </span>
            {ordensFiltered.length > 0 && (
              <span>
                Total: <strong style={{color: '#28a745'}}>
                  {formatCurrency(ordensFiltered.reduce((sum, ordem) => sum + calcularPrecoTotal(ordem), 0))}
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
            {ordensFiltered.length} vendas encontradas
          </span>
        </div>
        <div style={{ color: '#2c3e50' }}>
          <Table
            columns={columns}
            data={ordensFiltered}
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
