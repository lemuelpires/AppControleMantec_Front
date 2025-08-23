import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiCliente from '../../services/apiCliente';
import { FaShareAlt } from 'react-icons/fa';
import {
  StatusContainer,
  StatusCard,
  StatusHeader,
  StatusTitle,
  StatusShareButton,
  StatusInfoRow,
  StatusInfoGrid,
  StatusInfoLabel,
  StatusInfoValue,
  StatusFooter,
  StatusShareGroup,
  StatusStatusBadge,
  InfoSectionCard
} from './style';

// Função para formatar datas
const formatDate = (dateStr) => {
  if (!dateStr) return '--/--/----';
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR');
};

// Função para calcular prazo restante
const prazoRestante = (dataConclusao) => {
  if (!dataConclusao) return 'Sem prazo';
  const hoje = new Date();
  const prazo = new Date(dataConclusao);
  const diff = Math.ceil((prazo - hoje) / (1000 * 60 * 60 * 24));
  if (diff < 0) return 'Prazo vencido';
  if (diff === 0) return 'Entrega hoje';
  return `${diff} dia(s)`;
};

const statusColors = {
  'Concluída': '#28a745',
  'Em andamento': '#007bff',
  'Não iniciado': '#dc3545',
  '': '#888'
};

const StatusOS = () => {
  const { id } = useParams();
  const [ordens, setOrdens] = useState([]);
  const [produtosMap, setProdutosMap] = useState({});
  const [servicosMap, setServicosMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdens = async () => {
      setLoading(true);
      try {
        const response = await apiCliente.get('/OrdemDeServico');
        setOrdens(response.data || []);

        // Coleta IDs de produtos e serviços usados
        const produtosIds = new Set();
        const servicosIds = new Set();
        (response.data || []).forEach(os => {
          if (os.pecasUtilizadas && Array.isArray(os.pecasUtilizadas)) {
            os.pecasUtilizadas.forEach(p => {
              if (p.produtoID) produtosIds.add(p.produtoID);
            });
          }
          if (os.servicoIDs && Array.isArray(os.servicoIDs)) {
            os.servicoIDs.forEach(sid => {
              if (sid) servicosIds.add(sid);
            });
          }
        });

        // Busca nomes dos produtos
        const produtosMapTemp = {};
        await Promise.all(Array.from(produtosIds).map(async pid => {
          if (pid) {
            try {
              const prodRes = await apiCliente.get(`/Produto/${pid}`);
              produtosMapTemp[pid] = prodRes.data.nome;
            } catch {}
          }
        }));
        setProdutosMap(produtosMapTemp);

        // Busca nomes dos serviços
        const servicosMapTemp = {};
        await Promise.all(Array.from(servicosIds).map(async sid => {
          if (sid) {
            try {
              const servRes = await apiCliente.get(`/Servico/${sid}`);
              servicosMapTemp[sid] = servRes.data.nome;
            } catch {}
          }
        }));
        setServicosMap(servicosMapTemp);

      } catch (err) {
        setOrdens([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrdens();
  }, []);

  const ordensParaExibir = id
    ? ordens.filter(os => String(os.id).toLowerCase() === String(id).toLowerCase())
    : ordens;

  // Função para compartilhar o link
  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Acompanhe o status da sua ordem de serviço',
        url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copiado para área de transferência!');
    }
  };

  return (
    <StatusContainer>
      <StatusCard>
        <StatusHeader>
          <StatusTitle>
            Status da Ordem de Serviço
          </StatusTitle>
          <StatusShareGroup>
            <StatusShareButton onClick={handleShare} title="Compartilhar link">
              <FaShareAlt size={22} color="#fff" />
            </StatusShareButton>
          </StatusShareGroup>
        </StatusHeader>
        {loading ? (
          <StatusInfoValue style={{ textAlign: 'center', margin: '2rem 0' }}>
            Carregando...
          </StatusInfoValue>
        ) : ordensParaExibir.length === 0 ? (
          <StatusInfoValue style={{ textAlign: 'center', margin: '2rem 0' }}>
            Nenhuma ordem encontrada.
          </StatusInfoValue>
        ) : (
          ordensParaExibir.map(os => (
            <div key={os.id} style={{ width: '100%', position: 'relative', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <StatusStatusBadge status={os.status}>
                Status: {os.status || 'Não informado'}
              </StatusStatusBadge>
              <InfoSectionCard>
                <StatusInfoRow>
                  <StatusInfoLabel>OS Nº:</StatusInfoLabel>
                  <StatusInfoValue>{os.numeroOS || '--'}</StatusInfoValue>
                </StatusInfoRow>
                <StatusInfoRow>
                  <StatusInfoLabel>Prazo de entrega:</StatusInfoLabel>
                  <StatusInfoValue>
                    {formatDate(os.dataConclusao)} <span style={{ color: '#dc3545', fontWeight: 700 }}>({prazoRestante(os.dataConclusao)})</span>
                  </StatusInfoValue>
                </StatusInfoRow>
              </InfoSectionCard>
              <InfoSectionCard>
                <StatusInfoRow>
                  <StatusInfoLabel>Equipamento:</StatusInfoLabel>
                  <StatusInfoValue>{os.marca} {os.modelo}</StatusInfoValue>
                </StatusInfoRow>
                <StatusInfoRow>
                  <StatusInfoLabel>Defeito relatado:</StatusInfoLabel>
                  <StatusInfoValue>{os.defeitoRelatado || 'Não informado'}</StatusInfoValue>
                </StatusInfoRow>
                <StatusInfoRow>
                  <StatusInfoLabel>Laudo Técnico:</StatusInfoLabel>
                  <StatusInfoValue>{os.laudoTecnico || 'Não informado'}</StatusInfoValue>
                </StatusInfoRow>
                <StatusInfoRow>
                  <StatusInfoLabel>Observações:</StatusInfoLabel>
                  <StatusInfoValue>{os.observacoes || 'Nenhuma'}</StatusInfoValue>
                </StatusInfoRow>
              </InfoSectionCard>
              <InfoSectionCard>
                <StatusInfoRow>
                  <StatusInfoLabel>Valor Total:</StatusInfoLabel>
                  <StatusInfoValue>{os.valorTotal ? `R$ ${os.valorTotal}` : '---'}</StatusInfoValue>
                </StatusInfoRow>
                <StatusInfoRow>
                  <StatusInfoLabel>Pago:</StatusInfoLabel>
                  <StatusInfoValue status={os.pago ? 'Concluída' : 'Não iniciado'}>
                    {os.pago ? 'Sim' : 'Não'}
                  </StatusInfoValue>
                </StatusInfoRow>
                <StatusInfoRow>
                  <StatusInfoLabel>Garantia:</StatusInfoLabel>
                  <StatusInfoValue status={os.emGarantia ? 'Concluída' : 'Não iniciado'}>
                    {os.emGarantia ? 'Sim' : 'Não'} {os.dataGarantia ? `(até ${formatDate(os.dataGarantia)})` : ''}
                  </StatusInfoValue>
                </StatusInfoRow>
              </InfoSectionCard>
            </div>
          ))
        )}
      </StatusCard>
      <StatusFooter>
        © {new Date().getFullYear()} Mantec Informática - Status de Ordem de Serviço
      </StatusFooter>
    </StatusContainer>
  );
};

export default StatusOS;