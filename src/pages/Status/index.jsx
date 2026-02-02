import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiCliente from '../../services/apiCliente';
import { FaShareAlt, FaWhatsapp, FaCreditCard, FaClock, FaCalendarCheck, FaBoxOpen, FaClipboardList, FaPrint } from 'react-icons/fa';
import qrsumup from '../../assets/qrsumup.jpeg';

import {
  StatusContainer,
  StatusCard,
  StatusHeader,
  StatusTitle,
  StatusShareGroup,
  StatusShareButton,
  MainContent,
  InfoColumn,
  ActionColumn,
  InfoSectionCard,
  ClienteNome,
  StatusInfoRow,
  StatusInfoLabel,
  StatusInfoValue,
  PrazoRestante,
  StatusFooter,
  Label,
  StatusLabelSection,
  StatusStatusBadge,
  ActionCard,
  ActionTitle,
  ActionIcon,
  QrCode,
  PixButton,
  WhatsappButton,
  HorarioCard,
  HorarioTitle,
  HorarioIcon,
  HorarioList,
  HorarioItem,
  Timeline,
  TimelineItem,
  TimelineIcon,
  TimelineContent
} from './style';

const formatDate = (dateStr) => {
  if (!dateStr) return '--/--/----';
  const d = new Date(dateStr);
  // Ajusta para timezone local
  const localDate = new Date(d.getTime() + Math.abs(d.getTimezoneOffset()) * 60000);
  return localDate.toLocaleDateString('pt-BR');
};

const prazoRestante = (dataConclusao, status) => {
  if (['Concluído', 'Entregue', 'Orçamento'].includes(status)) return status;
  if (!dataConclusao) return 'Sem prazo';

  const hoje = new Date();
  const prazo = new Date(dataConclusao);
  const diff = Math.ceil((prazo - hoje) / 86400000);

  if (diff < 0) return 'Prazo vencido';
  if (diff === 0) return 'Entrega hoje';
  return `${diff} dia(s)`;
};

const StatusTimeline = ({ status }) => {
  const statuses = ['Orçamento', 'Em andamento', 'Aguardando Peças', 'Concluido', 'Entregue'];
  const currentStatusIndex = statuses.indexOf(status);

  const getStatusIcon = (s) => {
    switch (s) {
      case 'Orçamento': return <FaClipboardList />;
      case 'Aguardando Peças': return <FaClock />;
      case 'Em andamento': return <FaBoxOpen />;
      case 'Concluido': return <FaCalendarCheck />;
      case 'Entregue': return <FaPrint />;
      default: return <FaClipboardList />;
    }
  };

  return (
    <Timeline>
      {statuses.map((s, index) => (
        <TimelineItem key={s} active={index <= currentStatusIndex}>
          <TimelineIcon active={index <= currentStatusIndex}>{getStatusIcon(s)}</TimelineIcon>
          <TimelineContent>{s}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};


const StatusOS = () => {
  const { id } = useParams();
  const [ordem, setOrdem] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        setLoading(true);
        const osRes = id
          ? await apiCliente.get(`/OrdemDeServico/${id}`)
          : (await apiCliente.get('/OrdemDeServico')).data?.[0];

        const osData = id ? osRes.data : osRes;
        setOrdem(osData);

        if (osData?.clienteID) {
          const clienteRes = await apiCliente.get(`/Cliente/${osData.clienteID}`);
          setCliente(clienteRes.data);
        }
      } catch (err) {
        console.error('Erro ao carregar OS', err);
        setOrdem(null);
        setCliente(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, [id]);

  const clienteTelefone = cliente?.telefone || '';

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Status da OS', url });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copiado para a área de transferência!');
    }
  };

  const handleWhatsApp = () => {
    const msg = `Acompanhe o status da sua OS: ${window.location.href}`;
    window.open(`https://wa.me/${clienteTelefone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const cnpj = "27.737.565/0001-02";
  const handleCopyCnpj = () => {
    navigator.clipboard.writeText(cnpj.replace(/\D/g, '')); // Copy without formatting
    alert('CNPJ 27737565000102 copiado!');
  };

  if (loading) {
    return (
      <StatusContainer>
        <StatusCard>
          <StatusInfoValue className="center">Carregando...</StatusInfoValue>
        </StatusCard>
      </StatusContainer>
    );
  }

  if (!ordem) {
    return (
      <StatusContainer>
        <StatusCard>
          <StatusInfoValue className="center">Ordem não encontrada.</StatusInfoValue>
        </StatusCard>
      </StatusContainer>
    );
  }

  const prazo = prazoRestante(ordem.dataConclusao, ordem.status);

  return (
    <StatusContainer>
      <StatusCard>
        <StatusHeader>
          <StatusTitle>Status da Ordem de Serviço</StatusTitle>
          <StatusShareGroup>
            <StatusShareButton onClick={handleShare} aria-label="Compartilhar">
              <FaShareAlt size={22} />
            </StatusShareButton>
            {clienteTelefone && (
              <StatusShareButton onClick={handleWhatsApp} aria-label="Enviar por WhatsApp">
                <FaWhatsapp size={22} color="#25D366" />
              </StatusShareButton>
            )}
          </StatusShareGroup>
        </StatusHeader>

        <MainContent>
          <InfoColumn>
            <InfoSectionCard>
              {cliente?.nome && <ClienteNome>{cliente.nome}</ClienteNome>}
              <StatusInfoRow>
                <StatusInfoLabel>Nº OS:</StatusInfoLabel>
                <StatusInfoValue>{ordem.numeroOS}</StatusInfoValue>
              </StatusInfoRow>
              <StatusInfoRow>
                <StatusInfoLabel>Entrada:</StatusInfoLabel>
                <StatusInfoValue>{formatDate(ordem.dataEntrada)}</StatusInfoValue>
              </StatusInfoRow>
              <StatusInfoRow>
                <StatusInfoLabel>Prazo:</StatusInfoLabel>
                <StatusInfoValue>
                  {formatDate(ordem.dataConclusao)}
                  <PrazoRestante status={prazo}>
                    ({prazo})
                  </PrazoRestante>
                </StatusInfoValue>
              </StatusInfoRow>
            </InfoSectionCard>

            <InfoSectionCard>
              <StatusLabelSection>
                <Label>Status:</Label>
              </StatusLabelSection>
              <StatusTimeline status={ordem.status} />
            </InfoSectionCard>

            <InfoSectionCard>
              <StatusInfoRow>
                <StatusInfoLabel>Valor:</StatusInfoLabel>
                <StatusInfoValue>R$ {ordem.valorTotal}</StatusInfoValue>
              </StatusInfoRow>
              <StatusInfoRow>
                <StatusInfoLabel>Pago:</StatusInfoLabel>
                <StatusInfoValue>{ordem.pago ? 'Sim' : 'Não'}</StatusInfoValue>
              </StatusInfoRow>
            </InfoSectionCard>
          </InfoColumn>

          <ActionColumn>
            <ActionCard>
              <ActionTitle><FaCreditCard size={24} /> Formas de Pagamento</ActionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em', width: '100%', color: '#343a40' }}>
                <div style={{ textAlign: 'center', padding: '1em', border: '1px solid #e1e7f0', borderRadius: '8px', background: '#f8f9fa' }}>
                  <div style={{ fontSize: '2em', marginBottom: '0.5em' }}>📱</div>
                  <strong>Pix (QR Code)</strong><br />
                  <span style={{ fontSize: '0.9em', color: '#666' }}>Escaneie para pagar via Pix</span><br />
                  <QrCode src={qrsumup} alt="QR Code Pagamento Pix" style={{ width: '80px', height: '80px', marginTop: '0.5em' }} />
                </div>
                <div style={{ textAlign: 'center', padding: '1em', border: '1px solid #e1e7f0', borderRadius: '8px', background: '#f8f9fa' }}>
                  <div style={{ fontSize: '2em', marginBottom: '0.5em' }}>🏦</div>
                  <strong>Pix (CNPJ)</strong><br />
                  <span style={{ fontSize: '0.9em', color: '#666' }}>27.737.565/0001-02</span><br />
                  <PixButton onClick={handleCopyCnpj} title="Copiar CNPJ" style={{ marginTop: '0.5em', padding: '0.5em 1em', fontSize: '0.9em' }} > Copiar CNPJ </PixButton>
                </div>
                <div style={{ textAlign: 'center', padding: '1em', border: '1px solid #e1e7f0', borderRadius: '8px', background: '#f8f9fa' }}>
                  <div style={{ fontSize: '2em', marginBottom: '0.5em' }}>💵</div>
                  <strong>Dinheiro (Presencial)</strong><br />
                  <span style={{ fontSize: '0.9em', color: '#666' }}>Pague na retirada do equipamento</span>
                </div>
                <div style={{ textAlign: 'center', padding: '1em', border: '1px solid #e1e7f0', borderRadius: '8px', background: '#f8f9fa' }}>
                  <div style={{ fontSize: '2em', marginBottom: '0.5em' }}>💳</div>
                  <strong>Cartão (Presencial)</strong><br />
                  <span style={{ fontSize: '0.9em', color: '#666' }}>Aceitamos crédito e débito</span>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: '1em' }}>
                <WhatsappButton href="https://wa.me/5516992614410?text=Olá! Segue o comprovante de pagamento." target="_blank" rel="noopener noreferrer" > 
                    <FaWhatsapp size={25} /> Envie comprovante pelo WhatsApp 
                </WhatsappButton>
              </div>
            </ActionCard>
            <HorarioCard>
                <HorarioIcon><FaClock size={45} color='green'/></HorarioIcon>
                <HorarioTitle>Horários de Retirada</HorarioTitle>
                <p>
                    <strong>Segunda a Sexta:</strong> 09:00 às 18:00<br />
                    <strong>Sábados:</strong> 09:00 às 17:00
                </p>
            </HorarioCard>
          </ActionColumn>
        </MainContent>
      </StatusCard>
      <StatusFooter>
        © {new Date().getFullYear()} Mantec Informática. Todos os direitos reservados.
      </StatusFooter>
    </StatusContainer>
  );
};

export default StatusOS;
