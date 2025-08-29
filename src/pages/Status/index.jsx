import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiCliente from '../../services/apiCliente';
import { FaShareAlt, FaWhatsapp } from 'react-icons/fa';
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
    StatusLabelSection
} from './style';

// Função para formatar datas
const formatDate = (dateStr) => {
    if (!dateStr) return '--/--/----';
    // Ajuste para evitar erro de fuso horário
    const d = new Date(dateStr);
    // Corrige o deslocamento de fuso horário
    const localDate = new Date(d.getTime() + Math.abs(d.getTimezoneOffset()) * 60000);
    return localDate.toLocaleDateString('pt-BR');
};

// Função para calcular prazo restante
const prazoRestante = (dataConclusao, status) => {
    if (!dataConclusao) return 'Sem prazo';
    if (status === 'Concluido') return '';
    const hoje = new Date();
    const prazo = new Date(dataConclusao);
    const diff = Math.ceil((prazo - hoje) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 'Prazo vencido';
    if (diff === 0) return 'Entrega hoje';
    return `${diff} dia(s)`;
};

const StatusOS = () => {
    const { id } = useParams();
    const [ordens, setOrdens] = useState([]);
    const [produtosMap, setProdutosMap] = useState({});
    const [servicosMap, setServicosMap] = useState({});
    const [clienteNome, setClienteNome] = useState('');
    const [clienteTelefone, setClienteTelefone] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrdens = async () => {
            setLoading(true);
            try {
                const response = await apiCliente.get('/OrdemDeServico');
                setOrdens(response.data || []);

                // Busca nome do cliente da primeira ordem (ou da ordem filtrada)
                let ordem = null;
                if (id) {
                    ordem = (response.data || []).find(os => String(os.id) === String(id));
                } else if (response.data && response.data.length > 0) {
                    ordem = response.data[0];
                }
                if (ordem && ordem.clienteID) {
                    try {
                        const clienteRes = await apiCliente.get(`/Cliente/${ordem.clienteID}`);
                        setClienteNome(clienteRes.data.nome);
                        setClienteTelefone(clienteRes.data.telefone || ''); // Assuming 'telefone' is the field; adjust if needed
                    } catch {
                        setClienteNome('');
                        setClienteTelefone('');
                    }
                } else {
                    setClienteNome('');
                    setClienteTelefone('');
                }

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
                        } catch { }
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
                        } catch { }
                    }
                }));
                setServicosMap(servicosMapTemp);

            } catch (err) {
                setOrdens([]);
                setClienteNome('');
                setClienteTelefone('');
            } finally {
                setLoading(false);
            }
        };
        fetchOrdens();
    }, [id]);

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

    // Função para abrir WhatsApp
    const handleWhatsApp = () => {
        const url = window.location.href;
        const message = `Acompanhe o status: ${url}`;
        const whatsappUrl = `https://wa.me/${clienteTelefone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
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
                        {clienteTelefone && (
                            <StatusShareButton onClick={handleWhatsApp} title="Enviar via WhatsApp" style={{ marginLeft: '10px' }}>
                                <FaWhatsapp size={22} color="#fff" />
                            </StatusShareButton>
                        )}
                    </StatusShareGroup>
                </StatusHeader>
                {loading ? (
                    <StatusInfoValue className="center">
                        Carregando...
                    </StatusInfoValue>
                ) : ordensParaExibir.length === 0 ? (
                    <StatusInfoValue className="center">
                        Nenhuma ordem encontrada.
                    </StatusInfoValue>
                ) : (
                    ordensParaExibir.map(os => (
                        <OSSection key={os.id}>
                            <InfoSectionCard>
                                {clienteNome && (
                                    <ClienteNome>
                                        Nome: {clienteNome}
                                    </ClienteNome>
                                )}
                                <StatusInfoRow>
                                    <StatusInfoLabel>Nº da Ordem de Serviço:</StatusInfoLabel>
                                    <StatusInfoValue>{os.numeroOS || '--'}</StatusInfoValue>
                                </StatusInfoRow>
                                <StatusInfoRow>
                                    <StatusInfoLabel>Data de Entrada:</StatusInfoLabel>
                                    <StatusInfoValue>{formatDate(os.dataEntrada)}</StatusInfoValue>
                                </StatusInfoRow>
                                <StatusInfoRow>
                                    <StatusInfoLabel>Prazo de entrega:</StatusInfoLabel>
                                    <StatusInfoValue>
                                        {formatDate(os.dataConclusao)}
                                        {prazoRestante(os.dataConclusao, os.status) && (
                                            <PrazoRestante>
                                                ({prazoRestante(os.dataConclusao, os.status)})
                                            </PrazoRestante>
                                        )}
                                    </StatusInfoValue>
                                </StatusInfoRow>
                            </InfoSectionCard>
                            <InfoSectionCard>
                                <StatusLabelSection>
                                    <Label>O reparo do seu produto está:</Label>
                                    <StatusStatusBadge status={os.status}>
                                        {os.status || 'Não informado'}
                                    </StatusStatusBadge>
                                </StatusLabelSection>
                            </InfoSectionCard>

                            {os.status !== "Não iniciado" && (
                                <>
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
                                </>
                            )}
                            <InfoSectionCard>
                                <StatusInfoRow>
                                    <StatusInfoLabel>Valor Total:</StatusInfoLabel>
                                    <StatusInfoValue>{os.valorTotal ? `R$ ${os.valorTotal}` : 'Verificando...'}</StatusInfoValue>
                                </StatusInfoRow>
                                <StatusInfoRow>
                                    <StatusInfoLabel>Pago:</StatusInfoLabel>
                                    <StatusInfoValue status={os.pago ? 'Concluido' : 'Não iniciado'}>
                                        {os.pago ? 'Sim' : 'Não'}
                                    </StatusInfoValue>
                                </StatusInfoRow>
                            </InfoSectionCard>
                        </OSSection>
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