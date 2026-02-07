import { useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaWhatsapp } from 'react-icons/fa';
import apiCliente from '../../services/apiCliente';
import Table from '../../components/Tables';
import ReciboCliente from '../../components/Modais/OrdemDeServico/ReciboCliente';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  PaymentModalOverlay,
  PaymentModalContent,
  PaymentModalTitle,
  PaymentFormGroup,
  PaymentLabel,
  PaymentSelect,
  PaymentCheckboxRow,
  PaymentActions,
  PaymentButton,
  StatusModalOverlay,
  StatusModalContent,
  StatusModalTitle,
  StatusFormGroup,
  StatusLabel,
  StatusSelect,
  StatusActions,
  StatusButton,
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

const formatDate = value => {
  if (!value) return '—';
  const date = new Date(value);
  // Ajusta para timezone local
  const localDate = new Date(date.getTime() + Math.abs(date.getTimezoneOffset()) * 60000);
  return localDate.toLocaleDateString('pt-BR');
};

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
  const [pagamentoModalOpen, setPagamentoModalOpen] = useState(false);
  const [pagamentoOrdem, setPagamentoOrdem] = useState(null);
  const [pagamentoForm, setPagamentoForm] = useState({ formaPagamento: '', pago: false });
  const [pagamentoSaving, setPagamentoSaving] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusOrdem, setStatusOrdem] = useState(null);
  const [statusValue, setStatusValue] = useState('');
  const [statusSaving, setStatusSaving] = useState(false);
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
        clientes[c.id] = { nome: c.nome, telefone: c.telefone };
      });
      setClientesMap(clientes);
      const ordensDeVenda = ordensRes.data
        .filter(o => {
          if (!o.ativo) return false;
          const status = (o.status || '').toLowerCase();
          return status === 'concluido' || status === 'entregue';
        })
        .sort(
          (a, b) =>
            new Date(b.dataConclusao || b.dataEntrada) -
            new Date(a.dataConclusao || a.dataEntrada)
        );
      setOrdens(ordensDeVenda);
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

  const handleCompartilharRecibo = useCallback(async (ordem) => {
    try {
      if (!ordem.clienteID) {
        alert('Cliente não identificado.');
        return;
      }

      const cliente = clientesMap[ordem.clienteID];
      if (!cliente || !cliente.telefone) {
        alert('Telefone do cliente não encontrado.');
        return;
      }

      // Formata o telefone para WhatsApp (remove caracteres especiais)
      const telefoneLimpo = cliente.telefone.replace(/\D/g, '');
      const telefoneFormatado = telefoneLimpo.startsWith('55') ? telefoneLimpo : '55' + telefoneLimpo;

      // Gera o nome do arquivo
      const nomeArquivo = `recibo-${ordem.numeroOS || ordem.id}.pdf`;

      // Prepara elemento do recibo
      const reciboElement = document.querySelector(`[data-recibo-id="${ordem.id}"]`);
      if (!reciboElement) {
        // Se elemento não existe, cria um alert informativo
        const mensagem = `Olá! Segue o recibo da sua compra:\n\nNº OS: ${ordem.numeroOS}\nValor: R$ ${(ordem.valorTotal || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\nData: ${new Date(ordem.dataConclusao).toLocaleDateString('pt-BR')}`;
        const whatsappLink = `https://wa.me/${telefoneFormatado}?text=${encodeURIComponent(mensagem)}`;
        window.open(whatsappLink, '_blank');
        return;
      }

      // Gera PDF a partir do elemento
      const canvas = await html2canvas(reciboElement, { scale: 2 });
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Baixa o PDF localmente
      const pdfBlob = pdf.output('blob');
      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = nomeArquivo;
      link.click();
      URL.revokeObjectURL(link.href);

      // Abre WhatsApp para compartilhamento
      const mensagem = `Olá ${cliente.nome || 'cliente'}! 📄 Segue em anexo o recibo da sua compra.\n\nNº OS: ${ordem.numeroOS}\nValor: R$ ${(ordem.valorTotal || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n\nAtenciosamente, Manutenção Mantec.`;
      const whatsappLink = `https://wa.me/${telefoneFormatado}?text=${encodeURIComponent(mensagem)}`;
      window.open(whatsappLink, '_blank');
    } catch (err) {
      console.error('Erro ao gerar/compartilhar recibo:', err);
      alert('Erro ao gerar recibo em PDF.');
    }
  }, [clientesMap]);

  const handleAbrirPagamento = useCallback((ordem) => {
    setPagamentoOrdem(ordem);
    setPagamentoForm({
      formaPagamento: ordem?.formaPagamento || '',
      pago: !!ordem?.pago,
    });
    setPagamentoModalOpen(true);
  }, []);

  const handleFecharPagamento = useCallback(() => {
    setPagamentoModalOpen(false);
    setPagamentoOrdem(null);
  }, []);

  const handleSalvarPagamento = useCallback(async () => {
    if (!pagamentoOrdem) return;
    setPagamentoSaving(true);
    try {
      const dataToSend = {
        ...pagamentoOrdem,
        formaPagamento: pagamentoForm.formaPagamento || '',
        pago: !!pagamentoForm.pago,
      };
      await apiCliente.put(`/OrdemDeServico/${pagamentoOrdem.id}`, dataToSend);
      setOrdens(prev => prev.map(o => (
        o.id === pagamentoOrdem.id
          ? { ...o, formaPagamento: dataToSend.formaPagamento, pago: dataToSend.pago }
          : o
      )));
      setPagamentoModalOpen(false);
      setPagamentoOrdem(null);
    } catch (err) {
      console.error('Erro ao atualizar pagamento:', err);
      alert('Erro ao salvar pagamento.');
    } finally {
      setPagamentoSaving(false);
    }
  }, [pagamentoOrdem, pagamentoForm]);

  const handleAbrirStatus = useCallback((ordem) => {
    setStatusOrdem(ordem);
    setStatusValue(ordem?.status || '');
    setStatusModalOpen(true);
  }, []);

  const handleFecharStatus = useCallback(() => {
    setStatusModalOpen(false);
    setStatusOrdem(null);
  }, []);

  const handleSalvarStatus = useCallback(async () => {
    if (!statusOrdem) return;
    setStatusSaving(true);
    try {
      const now = new Date().toISOString();
      const dataConclusaoAtualizada =
        statusValue === 'Entregue' && !statusOrdem.dataConclusao
          ? now
          : statusOrdem.dataConclusao;

      const dataToSend = {
        ...statusOrdem,
        status: statusValue || '',
        dataConclusao: dataConclusaoAtualizada,
      };
      await apiCliente.put(`/OrdemDeServico/${statusOrdem.id}`, dataToSend);
      setOrdens(prev => prev.map(o => (
        o.id === statusOrdem.id
          ? { ...o, status: dataToSend.status, dataConclusao: dataToSend.dataConclusao }
          : o
      )));
      setStatusModalOpen(false);
      setStatusOrdem(null);
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      alert('Erro ao salvar status.');
    } finally {
      setStatusSaving(false);
    }
  }, [statusOrdem, statusValue]);

  // Filtro aplicado sobre ordens
  const ordensFiltradas = useMemo(() => {
    return ordens.filter(o => {
      const clienteNome = (clientesMap[o.clienteID]?.nome || '').toLowerCase();
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
  const ActionCell = ({ row, setOrdemSelecionada, setReciboModalOpen, handleAbrirPagamento, handleAbrirStatus }) => {
    return (
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <ActionButton
          onClick={() => {
            setOrdemSelecionada(row.original);
            setReciboModalOpen(true);
          }}
        >
          🧾
        </ActionButton>

        <ActionButton
          onClick={() => handleAbrirPagamento(row.original)}
          title="Pagamento"
          style={{
            background: 'linear-gradient(135deg,#17a2b8,#138496)',
            color: '#fff',
          }}
          aria-label="Pagamento"
        >
          Pgto
        </ActionButton>

        <ActionButton
          onClick={() => handleAbrirStatus(row.original)}
          title="Status"
          style={{
            background: 'linear-gradient(135deg,#ffc107,#e0a800)',
            color: '#212529',
          }}
          aria-label="Status"
        >
          Status
        </ActionButton>

        <ActionButton
          onClick={() => handleCompartilharRecibo(row.original)}
          title="Compartilhar recibo via WhatsApp"
          style={{
            background: 'linear-gradient(135deg,#25d366,#20ba58)',
            color: '#fff',
          }}
          aria-label="Compartilhar via WhatsApp"
        >
          <FaWhatsapp size={18} />
        </ActionButton>

        <a
          href="https://www.nfse.gov.br/EmissorNacional/"
          target="_blank"
          rel="noreferrer"
        >
          <NFSeButton>NFSe</NFSeButton>
        </a>
      </div>
    );
  };

  ActionCell.propTypes = {
    row: PropTypes.object.isRequired,
    setOrdemSelecionada: PropTypes.func.isRequired,
    setReciboModalOpen: PropTypes.func.isRequired,
    handleAbrirPagamento: PropTypes.func.isRequired,
    handleAbrirStatus: PropTypes.func.isRequired,
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Cliente',
        accessor: 'clienteID',
        Cell: ({ value }) => clientesMap[value]?.nome || '—',
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
        Cell: (cell) => (
          <ActionCell
            row={cell.row}
            setOrdemSelecionada={setOrdemSelecionada}
            setReciboModalOpen={setReciboModalOpen}
            handleAbrirPagamento={handleAbrirPagamento}
            handleAbrirStatus={handleAbrirStatus}
          />
        ),
      },
    ],
    [clientesMap, handleCompartilharRecibo, setOrdemSelecionada, setReciboModalOpen, handleAbrirPagamento, handleAbrirStatus]
  );

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

      {pagamentoModalOpen && pagamentoOrdem && (
        <PaymentModalOverlay onClick={handleFecharPagamento}>
          <PaymentModalContent onClick={e => e.stopPropagation()}>
            <PaymentModalTitle>Pagamento</PaymentModalTitle>
            <PaymentFormGroup>
              <PaymentLabel>Forma de pagamento</PaymentLabel>
              <PaymentSelect
                value={pagamentoForm.formaPagamento}
                onChange={e =>
                  setPagamentoForm(prev => ({ ...prev, formaPagamento: e.target.value }))
                }
              >
                <option value="">Selecione</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix">Pix</option>
                <option value="Débito">Débito</option>
                <option value="Crédito">Crédito</option>
              </PaymentSelect>
            </PaymentFormGroup>
            <PaymentCheckboxRow>
              <input
                type="checkbox"
                checked={!!pagamentoForm.pago}
                onChange={e => setPagamentoForm(prev => ({ ...prev, pago: e.target.checked }))}
              />
              Pago
            </PaymentCheckboxRow>
            <PaymentActions>
              <PaymentButton
                type="button"
                className="secondary"
                onClick={handleFecharPagamento}
                disabled={pagamentoSaving}
              >
                Cancelar
              </PaymentButton>
              <PaymentButton
                type="button"
                className="primary"
                onClick={handleSalvarPagamento}
                disabled={pagamentoSaving}
              >
                {pagamentoSaving ? 'Salvando...' : 'Salvar'}
              </PaymentButton>
            </PaymentActions>
          </PaymentModalContent>
        </PaymentModalOverlay>
      )}

      {statusModalOpen && statusOrdem && (
        <StatusModalOverlay onClick={handleFecharStatus}>
          <StatusModalContent onClick={e => e.stopPropagation()}>
            <StatusModalTitle>Status</StatusModalTitle>
            <StatusFormGroup>
              <StatusLabel>Alterar status</StatusLabel>
              <StatusSelect
                value={statusValue}
                onChange={e => setStatusValue(e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="Orçamento">Orçamento</option>
                <option value="Não iniciado">Não iniciado</option>
                <option value="Aguardando Peças">Aguardando Peças</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluido">Concluido</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Entregue">Entregue</option>
              </StatusSelect>
            </StatusFormGroup>
            <StatusActions>
              <StatusButton
                type="button"
                className="secondary"
                onClick={handleFecharStatus}
                disabled={statusSaving}
              >
                Cancelar
              </StatusButton>
              <StatusButton
                type="button"
                className="primary"
                onClick={handleSalvarStatus}
                disabled={statusSaving}
              >
                {statusSaving ? 'Salvando...' : 'Salvar'}
              </StatusButton>
            </StatusActions>
          </StatusModalContent>
        </StatusModalOverlay>
      )}
    </Container>
  );
};

export default Vendas;

