import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import apiCliente from '../../services/apiCliente';
import { FaShareAlt, FaWhatsapp, FaCreditCard, FaClock } from 'react-icons/fa';
import qrsumup from '../../assets/qrsumup.jpeg';

import {
  StatusContainer,
  StatusCard,
  StatusHeader,
  StatusTitle,
  StatusShareGroup,
  StatusShareButton,
  OSSection,
  StatusStatusBadge,
  InfoSectionCard,
  ClienteNome,
  StatusInfoRow,
  StatusInfoLabel,
  StatusInfoValue,
  PrazoRestante,
  StatusFooter,
  Label,
  StatusLabelSection,
  StatusExtra,
  StatusExtraCard,
  StatusExtraIcon,
  StatusExtraQr,
  StatusExtraPixBtn,
  StatusExtraWhatsappRow,
  StatusExtraWhatsappIcon,
  StatusExtraWhatsappLink
} from './style';

/* ================= UTILIDADES ================= */

const formatDate = (dateStr) => {
  if (!dateStr) return '--/--/----';
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR');
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

/* ================= COMPONENTE ================= */

const StatusOS = () => {
  const { id } = useParams();
  const [ordem, setOrdem] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ========= FETCH OTIMIZADO ========= */
  useEffect(() => {
    const fetchDados = async () => {
      try {
        setLoading(true);

        // 1️⃣ BUSCA APENAS A OS NECESSÁRIA
        const osRes = id
          ? await apiCliente.get(`/OrdemDeServico/${id}`)
          : await apiCliente.get('/OrdemDeServico');

        const osData = id ? osRes.data : osRes.data?.[0];
        setOrdem(osData);

        // 2️⃣ BUSCA CLIENTE APENAS SE EXISTIR
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

  /* ========= MEMOS ========= */
  const clienteTelefone = cliente?.telefone || '';
  const isMobile = useMemo(() => window.innerWidth <= 700, []);

  /* ========= AÇÕES ========= */
  const handleShare = () => {
    const url = window.location.href;
    navigator.share
      ? navigator.share({ title: 'Status da OS', url })
      : navigator.clipboard.writeText(url);
  };

  const handleWhatsApp = () => {
    const msg = `Acompanhe o status da sua OS: ${window.location.href}`;
    window.open(`https://wa.me/${clienteTelefone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleCopyCnpj = () => {
    navigator.clipboard.writeText('27737565000102');
    alert('CNPJ copiado!');
  };

  /* ================= RENDER ================= */

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

  return (
    <StatusContainer>
      <StatusCard>
        <StatusHeader>
          <StatusTitle>Status da Ordem de Serviço</StatusTitle>

          <StatusShareGroup>
            <StatusShareButton onClick={handleShare}>
              <FaShareAlt size={isMobile ? 22 : 26} />
            </StatusShareButton>

            {clienteTelefone && (
              <StatusShareButton onClick={handleWhatsApp}>
                <FaWhatsapp size={isMobile ? 22 : 26} color="#25D366" />
              </StatusShareButton>
            )}
          </StatusShareGroup>
        </StatusHeader>

        <OSSection>
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
                <PrazoRestante>
                  ({prazoRestante(ordem.dataConclusao, ordem.status)})
                </PrazoRestante>
              </StatusInfoValue>
            </StatusInfoRow>
          </InfoSectionCard>

          <InfoSectionCard>
            <StatusLabelSection>
              <Label>Status:</Label>
              <StatusStatusBadge status={ordem.status}>
                {ordem.status}
              </StatusStatusBadge>
            </StatusLabelSection>
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
        </OSSection>
      </StatusCard>

      {/* ======= PAGAMENTO ======= */}
      <StatusExtra>
        <StatusExtraCard>
          <StatusExtraIcon>
            <FaCreditCard />
          </StatusExtraIcon>

          <StatusExtraQr src={qrsumup} />
          <StatusExtraPixBtn onClick={handleCopyCnpj}>
            Copiar CNPJ Pix
          </StatusExtraPixBtn>

          <StatusExtraWhatsappRow>
            <StatusExtraWhatsappIcon>
              <FaWhatsapp />
            </StatusExtraWhatsappIcon>
            <StatusExtraWhatsappLink
              href="https://wa.me/5516992614410"
              target="_blank"
            >
              Enviar comprovante
            </StatusExtraWhatsappLink>
          </StatusExtraWhatsappRow>
        </StatusExtraCard>

        <StatusExtraCard>
          <StatusExtraIcon className="clock">
            <FaClock />
          </StatusExtraIcon>
          <p>
            <strong>Seg–Sex:</strong> 09h–18h<br />
            <strong>Sáb:</strong> 09h–17h
          </p>
        </StatusExtraCard>
      </StatusExtra>

      <StatusFooter>
        © {new Date().getFullYear()} Mantec Informática
      </StatusFooter>
    </StatusContainer>
  );
};

export default StatusOS;
