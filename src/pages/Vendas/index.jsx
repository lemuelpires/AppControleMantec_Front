import React, { useEffect, useMemo, useState } from 'react';
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
  LoadingContainer,
  ExportButton,
  NFSeButton,
  FiltrosContainer,
  FiltroInput,
  FiltroSelect,
  FiltroSpan,
} from './style';

import {
  PaginationContainer,
  PaginationButton,
  PaginationInfo,
} from '../OrdensDeServico/style';

/* =========================
   UTIL
========================= */

const formatCurrency = value =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value || 0);

const formatDate = value =>
  value ? new Date(value).toLocaleDateString('pt-BR') : '—';

/* =========================
   COMPONENTE
========================= */

const Vendas = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ordens, setOrdens] = useState([]);
  const [clientesMap, setClientesMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const [reciboModalOpen, setReciboModalOpen] = useState(false);
  const [ordemSelecionada, setOrdemSelecionada] = useState(null);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroDataInicio, setFiltroDataInicio] = useState('');
  const [filtroDataFim, setFiltroDataFim] = useState('');

  // Função separada para buscar dados
  const fetchVendasData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [ordensRes, clientesRes] = await Promise.all([
        apiCliente.get('/OrdemDeServico'),
        apiCliente.get('/Cliente'),
      ]);
      const clientes = {};
      clientesRes.data.forEach(c => {
        clientes[c.id] = c.nome;
      });
      setClientesMap(clientes);
      const ordensAtivas = ordensRes.data
        .filter(o => o.ativo)
        .sort(
          (a, b) =>
            new Date(b.dataConclusao || b.dataEntrada) -
            new Date(a.dataConclusao || a.dataEntrada)
        );
      setOrdens(ordensAtivas);
    } catch (err) {
      setError('Não foi possível carregar os dados de vendas. Verifique sua conexão ou tente novamente mais tarde.');
      console.error('Erro ao carregar vendas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendasData();
  }, []);

  // Filtro aplicado sobre ordens
  const ordensFiltradas = useMemo(() => {
    return ordens.filter(o => {
      const clienteNome = clientesMap[o.clienteID]?.toLowerCase() || '';
      const status = (o.status || '').toLowerCase();
      const dataConclusao = o.dataConclusao ? new Date(o.dataConclusao) : null;
      let passa = true;
      if (filtroNome && !clienteNome.includes(filtroNome.toLowerCase())) passa = false;
      if (filtroStatus && status !== filtroStatus.toLowerCase()) passa = false;
      if (filtroDataInicio && dataConclusao && dataConclusao < new Date(filtroDataInicio)) passa = false;
      if (filtroDataFim && dataConclusao && dataConclusao > new Date(filtroDataFim)) passa = false;
      return passa;
    });
  }, [ordens, clientesMap, filtroNome, filtroStatus, filtroDataInicio, filtroDataFim]);

  /* =========================
     PAGINAÇÃO
  ========================= */

  const totalPages = Math.max(
    1,
    Math.ceil(ordensFiltradas.length / itemsPerPage)
  );

  const paginatedOrdens = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return ordensFiltradas.slice(start, start + itemsPerPage);
  }, [ordensFiltradas, currentPage]);

  /* =========================
     STATS (USANDO valorTotal)
  ========================= */

  // Corrigir stats para usar ordensFiltradas
  const stats = useMemo(() => {
    // Considera tanto 'Entregue' quanto 'Concluido' como concluídas
    const concluidas = ordensFiltradas.filter(o => {
      const s = (o.status || '').toLowerCase();
      return s === 'entregue' || s === 'concluido';
    });
    const hoje = new Date();
    const mes = hoje.getMonth();
    const ano = hoje.getFullYear();
    let vendasMes = 0;
    let valorMes = 0;
    let valorTotal = 0;
    concluidas.forEach(o => {
      valorTotal += o.valorTotal || 0;
      const d = new Date(o.dataConclusao);
      if (d.getMonth() === mes && d.getFullYear() === ano) {
        vendasMes++;
        valorMes += o.valorTotal || 0;
      }
    });
    return {
      totalVendas: concluidas.length,
      vendasMes,
      valorTotal,
      valorMes,
    };
  }, [ordensFiltradas]);

  /* =========================
     COLUNAS
  ========================= */

  const columns = useMemo(
    () => [
      {
        Header: 'Cliente',
        accessor: 'clienteID',
        Cell: ({ value }) => clientesMap[value] || '—',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Valor Total',
        accessor: 'valorTotal',
        Cell: ({ value }) => formatCurrency(value),
      },
      {
        Header: 'Data Conclusão',
        accessor: 'dataConclusao',
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: 'Ações',
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: 8 }}>
            <ActionButton
              onClick={() => {
                setOrdemSelecionada(row.original);
                setReciboModalOpen(true);
              }}
            >
              🧾 Recibo
            </ActionButton>
            <a
              href="https://www.nfse.gov.br/EmissorNacional/"
              target="_blank"
              rel="noreferrer"
            >
              <NFSeButton>NFSe</NFSeButton>
            </a>
          </div>
        ),
      },
    ],
    [clientesMap]
  );

  /* =========================
     RENDER
  ========================= */

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          Carregando vendas...
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <LoadingContainer style={{ color: 'red', fontWeight: 'bold' }}>
          {error}
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <div>
          <Title>💰 Vendas</Title>
          <Subtitle>Ordens concluídas</Subtitle>
        </div>
        <ExportButton>📊 Exportar</ExportButton>
      </Header>

      {/* Filtros */}
      <FiltrosContainer>
        <FiltroInput
          type="text"
          placeholder="Filtrar por nome do cliente"
          value={filtroNome}
          onChange={e => { setFiltroNome(e.target.value); setCurrentPage(1); }}
        />
        <FiltroSelect
          value={filtroStatus}
          onChange={e => { setFiltroStatus(e.target.value); setCurrentPage(1); }}
        >
          <option value="">Todos os status</option>
          <option value="Entregue">Entregue</option>
          <option value="Concluido">Concluído</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Cancelado">Cancelado</option>
          {/* Adicione outros status conforme necessário */}
        </FiltroSelect>
        <FiltroInput
          type="date"
          value={filtroDataInicio}
          onChange={e => { setFiltroDataInicio(e.target.value); setCurrentPage(1); }}
        />
        <FiltroSpan>até</FiltroSpan>
        <FiltroInput
          type="date"
          value={filtroDataFim}
          onChange={e => { setFiltroDataFim(e.target.value); setCurrentPage(1); }}
        />
      </FiltrosContainer>

      <StatsContainer>
        <StatCard>
          <div className="stat-number">{stats.totalVendas}</div>
          <div className="stat-label">Total de vendas</div>
        </StatCard>
        <StatCard>
          <div className="stat-number">{stats.vendasMes}</div>
          <div className="stat-label">Vendas no mês</div>
        </StatCard>
        <StatCard>
          <div className="stat-number">
            {formatCurrency(stats.valorTotal)}
          </div>
          <div className="stat-label">Valor total</div>
        </StatCard>
        <StatCard>
          <div className="stat-number">
            {formatCurrency(stats.valorMes)}
          </div>
          <div className="stat-label">Valor no mês</div>
        </StatCard>
      </StatsContainer>

      <TableContainer>
        <Table
          columns={columns}
          data={paginatedOrdens}
          initialPageSize={itemsPerPage}
        />

        <PaginationContainer>
          <PaginationButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            Anterior
          </PaginationButton>

          <PaginationInfo>
            Página {currentPage} de {totalPages}
          </PaginationInfo>

          <PaginationButton
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage(p => Math.min(totalPages, p + 1))
            }
          >
            Próxima
          </PaginationButton>
        </PaginationContainer>
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
          onClick={() => {
            setReciboModalOpen(false);
            setOrdemSelecionada(null);
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '12px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              minWidth: 350,
              minHeight: 200,
            }}
          >
            <ReciboCliente
              ordemDeServico={ordemSelecionada}
              onClose={() => {
                setReciboModalOpen(false);
                setOrdemSelecionada(null);
              }}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Vendas;
