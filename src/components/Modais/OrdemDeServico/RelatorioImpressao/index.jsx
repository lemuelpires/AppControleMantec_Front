// Relatório Profissional de Ordem de Serviço - Mantec Informática
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { format } from 'date-fns';
import apiCliente from '../../../../services/apiCliente';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ReportContainer = styled.div`
  padding: 2rem;
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.12),
    0 8px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(200, 200, 200, 0.4);
  animation: ${fadeIn} 0.6s ease-out;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  color: #2c3e50;
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
    pointer-events: none;
    z-index: 0;
  }
  
  > * {
    position: relative;
    z-index: 1;
  }

  @media print {
    width: 100%;
    max-width: none;
    margin: 0;
    padding: 15mm;
    border-radius: 0;
    box-shadow: none;
    background: white !important;
    color: #000 !important;
    font-size: 12px;
    line-height: 1.4;
    page-break-before: auto;
    page-break-after: auto;
    
    &::before {
      display: none;
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 0.5rem;
    border-radius: 12px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 1.5rem 0;
  border-bottom: 3px solid #e9ecef;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    border: 1px solid #007bff;
    border-radius: 2px;
  }

  @media print {
    &::after {
      border: 1px solid #000;
    }
  }
`;

const CompanyLogo = styled.div`
  color: #007bff;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  margin: 0 auto 1rem;
  border: 4px solid #007bff;

  @media print {
    width: 60px;
    height: 60px;
    font-size: 24px;
    border: 2px solid #000;
    color: #000;
  }
`;

const HeaderTitle = styled.h1`
  margin: 0 0 0.5rem 0;
  font-size: 2.2rem;
  font-weight: 700;
  color: #2c3e50;
  letter-spacing: -0.02em;

  @media print {
    font-size: 1.8rem;
    color: #000;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const HeaderSubtitle = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: #6c757d;
  font-weight: 400;

  @media print {
    font-size: 0.9rem;
    color: #000;
  }
`;

const OSBadge = styled.div`
  display: inline-block;
  color: #28a745;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  border: 2px solid #28a745;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 1rem;

  @media print {
    border: 1px solid #000;
    color: #000;
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media print {
    gap: 1.5rem;
  }
`;

const InfoSection = styled.div`
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(200, 200, 200, 0.5);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  }

  @media print {
    box-shadow: none;
    transform: none;
    border: 1px solid #000;
    padding: 1.2rem;
    break-inside: avoid;
    background: white;
  }
`;

const SectionTitle = styled.h3`
  margin: 0 0 1.5rem 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  &::before {
    content: '';
    width: 4px;
    height: 24px;
    border: 1px solid #007bff;
    border-radius: 2px;
  }

  @media print {
    font-size: 1.1rem;
    margin: 0 0 1rem 0;
    color: #000;
    
    &::before {
      border: 1px solid #000;
    }
  }
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: flex-start;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(108, 117, 125, 0.15);

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  @media print {
    margin-bottom: 0.8rem;
    padding-bottom: 0.6rem;
  }
`;

const InfoLabel = styled.div`
  font-weight: 600;
  color: #495057;
  min-width: 140px;
  font-size: 0.9rem;
  margin-right: 1rem;
  line-height: 1.4;

  @media print {
    min-width: 120px;
    font-size: 0.8rem;
    color: #000;
  }
`;

const InfoValue = styled.div`
  flex: 1;
  color: #2c3e50;
  font-size: 0.9rem;
  line-height: 1.4;
  word-wrap: break-word;
  
  &.empty {
    color: #adb5bd;
    font-style: italic;
    position: relative;
    
    &::before {
      content: '_______________';
      color: #ced4da;
    }
  }

  &.highlight {
    padding: 0.5rem 0.8rem;
    border-radius: 8px;
    border-left: 3px solid #28a745;
    font-weight: 500;
  }

  @media print {
    font-size: 0.8rem;
    color: #000;
    
    &.empty {
      color: #000;
      
      &::before {
        color: #000;
      }
    }
    
    &.highlight {
      border-left: 3px solid #000;
    }
  }
`;

const FullWidthSection = styled(InfoSection)`
  grid-column: 1 / -1;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  th {
    color: #333;
    border: 1px solid #333;
    padding: 1rem 0.8rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.9rem;
  }

  td {
    padding: 0.8rem;
    border-bottom: 1px solid #e9ecef;
    font-size: 0.9rem;
    color: #495057;
  }

  tr:nth-child(even) {
    border-left: 2px solid rgba(248, 249, 250, 0.5);
  }

  tr:hover {
    border-left: 2px solid rgba(0, 123, 255, 0.3);
  }

  .currency {
    font-weight: 600;
    color: #28a745;
    text-align: right;
  }

  .total-row {
    border: 2px solid rgba(40, 167, 69, 0.3);
    font-weight: 600;
    color: #2c3e50;
  }

  @media print {
    box-shadow: none;
    
    th {
      font-size: 0.8rem;
      padding: 0.8rem 0.6rem;
      color: #000;
      border: 1px solid #000;
    }
    
    td {
      font-size: 0.8rem;
      padding: 0.6rem;
      color: #000;
      border: 1px solid #000;
    }
    
    .currency {
      color: #000;
    }
    
    .total-row {
      color: #000;
      border: 2px solid #000;
    }
    
    tr:hover {
      border-left: none;
    }
  }
`;

const CheckboxSection = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid rgba(206, 212, 218, 0.5);
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  color: #495057;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background 0.2s ease;

  &:hover {
    border: 1px solid rgba(0, 123, 255, 0.2);
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #007bff;
  }

  @media print {
    border: none !important;
    font-size: 0.8rem;
    padding: 0.3rem;
    color: #000;
    
    input[type="checkbox"] {
      accent-color: #000;
    }
  }
`;

const SignatureSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media print {
    margin-top: 2rem;
    gap: 1.5rem;
  }
`;

const SignatureBox = styled.div`
  padding: 2rem;
  border: 2px dashed #ced4da;
  border-radius: 12px;
  text-align: center;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }

  .line {
    border-bottom: 1.5px solid #adb5bd;
    margin-bottom: 0.8rem;
    height: 1px;
  }

  .date {
    font-size: 0.8rem;
    color: #6c757d;
  }

  @media print {
    border: 1px solid #000;
    padding: 1.5rem;
    min-height: 80px;
    
    .title {
      color: #000;
    }
    
    .date {
      color: #000;
    }
    
    .line {
      border-bottom: 1px solid #000;
    }
  }
`;

const ButtonContainer = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media print {
    display: none;
  }
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &.primary {
    color: #007bff;
    border: 2px solid #007bff;

    &:hover {
      transform: translateY(-2px);
      border-color: #0056b3;
      color: #0056b3;
    }
  }

  &.secondary {
    color: #495057;
    border: 1px solid #dee2e6;

    &:hover {
      transform: translateY(-1px);
      border-color: #adb5bd;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const StatusBadge = styled.span`
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.8rem;
  display: inline-block;
  
  &.concluida {
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  
  &.em-andamento {
    color: #856404;
    border: 1px solid #ffeaa7;
  }
  
  &.pendente {
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
  
  &.orcamento {
    color: #0c5460;
    border: 1px solid #bee5eb;
  }

  @media print {
    color: #000 !important;
    border: 1px solid #000 !important;
  }
`;

const ObservationsBox = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-left: 4px solid #007bff;
  border-radius: 0 10px 10px 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #495057;
  white-space: pre-wrap;

  @media print {
    border: 1px solid #000;
    padding: 1rem;
    font-size: 0.8rem;
    color: #000;
    border-radius: 0;
    border-left: 3px solid #000;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.1rem;
  color: #6c757d;
  
  &::after {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid #e9ecef;
    border-top: 2px solid #007bff;
    border-radius: 50%;
    margin-left: 1rem;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media print {
    color: #000;
    
    &::after {
      border: 2px solid #ccc;
      border-top: 2px solid #000;
    }
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.1rem;
  color: #dc3545;
  text-align: center;
  
  &::before {
    content: '⚠️';
    font-size: 3rem;
    margin-right: 1rem;
  }

  @media print {
    color: #000;
  }
`;

const OrdemDeServicoReport = ({ ordemDeServico, onClose }) => {
  const [cliente, setCliente] = useState(null);
  const [funcionario, setFuncionario] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Buscar cliente e funcionário
        const [clienteData, funcionarioData] = await Promise.all([
          apiCliente.get(`/cliente/${ordemDeServico.clienteID}`),
          apiCliente.get(`/funcionario/${ordemDeServico.funcionarioID}`)
        ]);
        
        setCliente(clienteData.data);
        setFuncionario(funcionarioData.data);
        
        // Buscar produtos (suporte para array e formato antigo)
        const produtosToFetch = [];
        if (ordemDeServico.produtos && Array.isArray(ordemDeServico.produtos)) {
          produtosToFetch.push(...ordemDeServico.produtos.filter(p => p.produtoID));
        } else if (ordemDeServico.produtoID) {
          // Formato antigo - compatibilidade
          produtosToFetch.push({ produtoID: ordemDeServico.produtoID, quantidade: 1 });
        }
        
        const produtosData = await Promise.all(
          produtosToFetch.map(async (produto) => {
            const response = await apiCliente.get(`/produto/${produto.produtoID}`);
            return {
              ...response.data,
              quantidade: produto.quantidade
            };
          })
        );
        setProdutos(produtosData);
        
        // Buscar serviços (suporte para array e formato antigo)
        const servicosToFetch = [];
        if (ordemDeServico.servicos && Array.isArray(ordemDeServico.servicos)) {
          servicosToFetch.push(...ordemDeServico.servicos.filter(s => s.servicoID));
        } else if (ordemDeServico.servicoID) {
          // Formato antigo - compatibilidade
          servicosToFetch.push({ servicoID: ordemDeServico.servicoID, quantidade: 1 });
        }
        
        const servicosData = await Promise.all(
          servicosToFetch.map(async (servico) => {
            const response = await apiCliente.get(`/servico/${servico.servicoID}`);
            return {
              ...response.data,
              quantidade: servico.quantidade
            };
          })
        );
        setServicos(servicosData);
        
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError('Erro ao carregar dados. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    if (ordemDeServico) {
      fetchData();
    }
  }, [ordemDeServico]);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch {
      return 'Data inválida';
    }
  };

  const formatCurrency = (value) => {
    if (!value) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'Concluída': 'concluida',
      'Em andamento': 'em-andamento',
      'Pendente': 'pendente',
      'Orçamento': 'orcamento'
    };
    
    return statusMap[status] || 'pendente';
  };

  const printReport = () => {
    const reportElement = document.getElementById('report-to-print');
    
    if (!reportElement) {
      alert('Erro: Relatório não encontrado para impressão.');
      return;
    }

    // Coletar todos os estilos da página atual
    const allStyles = [];
    
    // Coletar estilos de folhas de estilo
    Array.from(document.styleSheets).forEach(styleSheet => {
      try {
        Array.from(styleSheet.cssRules).forEach(rule => {
          allStyles.push(rule.cssText);
        });
      } catch (e) {
        // Ignorar erros de CORS
      }
    });

    // Coletar estilos inline e styled-components
    Array.from(document.querySelectorAll('style')).forEach(style => {
      allStyles.push(style.innerHTML);
    });

    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      alert('Por favor, permita pop-ups para imprimir o relatório.');
      return;
    }

    const reportHTML = reportElement.outerHTML;
    
    const printHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Relatório OS - Mantec Informática</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            /* Reset básico */
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
              background: white !important;
              color: #000 !important;
              line-height: 1.4;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            /* Estilos copiados da página original */
            ${allStyles.join('\n')}

            /* Estilos específicos de impressão */
            @page {
              margin: 15mm;
              size: A4;
            }

            @media print {
              body, * {
                background: white !important;
                color: #000 !important;
                box-shadow: none !important;
                text-shadow: none !important;
              }

              .no-print {
                display: none !important;
              }

              /* Forçar cores de impressão */
              div, span, p, h1, h2, h3, h4, h5, h6, 
              table, td, th, tr {
                color: #000 !important;
                background: white !important;
              }

              /* Manter bordas visíveis */
              table, th, td {
                border-color: #000 !important;
              }
            }

            /* Garantir que styled-components funcionem */
            #report-to-print {
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 20px !important;
            }
          </style>
        </head>
        <body>
          ${reportHTML}
        </body>
      </html>
    `;

    printWindow.document.write(printHTML);
    printWindow.document.close();
    
    // Aguardar carregamento completo antes de imprimir
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        
        // Fechar após um pequeno delay
        setTimeout(() => {
          printWindow.close();
        }, 1000);
      }, 1000);
    };
  };

  const parseObservations = (observacoes) => {
    if (!observacoes) return {};
    
    const sections = {
      informacao: '',
      problema: '',
      diagnostico: '',
      garantia: ''
    };
    
    const lines = observacoes.split('\n');
    let currentSection = null;
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.includes('Informação do Produto:')) {
        currentSection = 'informacao';
        sections.informacao = trimmed.replace('Informação do Produto:', '').trim();
      } else if (trimmed.includes('Problema aparente:')) {
        currentSection = 'problema';
        sections.problema = trimmed.replace('Problema aparente:', '').trim();
      } else if (trimmed.includes('Diagnóstico e serviço a ser executado:')) {
        currentSection = 'diagnostico';
        sections.diagnostico = trimmed.replace('Diagnóstico e serviço a ser executado:', '').trim();
      } else if (trimmed.includes('Garantia:')) {
        currentSection = 'garantia';
        sections.garantia = trimmed.replace('Garantia:', '').trim();
      } else if (currentSection && trimmed) {
        sections[currentSection] += (sections[currentSection] ? '\n' : '') + trimmed;
      }
    });
    
    return sections;
  };

  if (loading) {
    return (
      <ReportContainer>
        <LoadingContainer>
          Carregando dados do relatório...
        </LoadingContainer>
      </ReportContainer>
    );
  }

  if (error) {
    return (
      <ReportContainer>
        <ErrorContainer>
          {error}
        </ErrorContainer>
      </ReportContainer>
    );
  }

  if (!cliente || !funcionario) {
    return (
      <ReportContainer>
        <ErrorContainer>
          Dados incompletos para gerar o relatório.
        </ErrorContainer>
      </ReportContainer>
    );
  }

  const observations = parseObservations(ordemDeServico.observacoes);
  
  // Calcular valor total considerando arrays de produtos e serviços
  const valorTotal = [
    ...servicos.map(servico => (parseFloat(servico.preco) || 0) * (servico.quantidade || 1)),
    ...produtos.map(produto => (parseFloat(produto.preco) || 0) * (produto.quantidade || 1))
  ].reduce((total, valor) => total + valor, 0);

  return (
    <ReportContainer id="report-to-print">
      <Header>
        <CompanyLogo>M</CompanyLogo>
        <HeaderTitle>Mantec Informática</HeaderTitle>
        <HeaderSubtitle>Assistência Técnica Especializada</HeaderSubtitle>
        <OSBadge>Ordem de Serviço #{ordemDeServico.id || 'N/A'}</OSBadge>
      </Header>

      <ContentGrid>
        <InfoSection>
          <SectionTitle>👤 Dados do Cliente</SectionTitle>
          <InfoRow>
            <InfoLabel>Nome:</InfoLabel>
            <InfoValue className="highlight">{cliente.nome || 'Não informado'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Telefone:</InfoLabel>
            <InfoValue>{cliente.telefone || 'Não informado'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Email:</InfoLabel>
            <InfoValue>{cliente.email || 'Não informado'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Documento:</InfoLabel>
            <InfoValue>{cliente.cpf || cliente.cnpj || 'Não informado'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Endereço:</InfoLabel>
            <InfoValue>
              {[cliente.endereco, cliente.cidade, cliente.estado].filter(Boolean).join(', ') || 'Não informado'}
            </InfoValue>
          </InfoRow>
        </InfoSection>

        <InfoSection>
          <SectionTitle>⚙️ Informações do Serviço</SectionTitle>
          <InfoRow>
            <InfoLabel>Status:</InfoLabel>
            <InfoValue>
              <StatusBadge className={getStatusBadge(ordemDeServico.status)}>
                {ordemDeServico.status || 'Pendente'}
              </StatusBadge>
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Data Entrada:</InfoLabel>
            <InfoValue>{formatDate(ordemDeServico.dataEntrada)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Prev. Conclusão:</InfoLabel>
            <InfoValue>{formatDate(ordemDeServico.dataConclusao)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Funcionário:</InfoLabel>
            <InfoValue className="highlight">{funcionario.nome || 'Não atribuído'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Cargo:</InfoLabel>
            <InfoValue>{funcionario.cargo || 'Técnico'}</InfoValue>
          </InfoRow>
        </InfoSection>
      </ContentGrid>

      <FullWidthSection>
        <SectionTitle>🔧 Equipamentos e Serviços</SectionTitle>
        <ContentGrid>
          <div>
            <InfoRow>
              <InfoLabel>Equipamentos:</InfoLabel>
              <InfoValue className="highlight">
                {produtos.length > 0 
                  ? produtos.map(produto => `${produto.nome} (${produto.quantidade}x)`).join(', ')
                  : 'Nenhum equipamento especificado'
                }
              </InfoValue>
            </InfoRow>
            {produtos.length > 0 && (
              <>
                <InfoRow>
                  <InfoLabel>Categorias:</InfoLabel>
                  <InfoValue>
                    {produtos.map(produto => produto.categoria || 'N/A').join(', ')}
                  </InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Marcas/Modelos:</InfoLabel>
                  <InfoValue>
                    {produtos.map(produto => produto.marca || 'N/A').join(', ')}
                  </InfoValue>
                </InfoRow>
              </>
            )}
          </div>
          <div>
            <InfoRow>
              <InfoLabel>Serviços:</InfoLabel>
              <InfoValue className="highlight">
                {servicos.length > 0 
                  ? servicos.map(servico => `${servico.nome} (${servico.quantidade}x)`).join(', ')
                  : 'Nenhum serviço especificado'
                }
              </InfoValue>
            </InfoRow>
            {servicos.length > 0 && (
              <>
                <InfoRow>
                  <InfoLabel>Tipos:</InfoLabel>
                  <InfoValue>
                    {servicos.map(servico => servico.tipo || 'N/A').join(', ')}
                  </InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Garantia:</InfoLabel>
                  <InfoValue>
                    {servicos.map(servico => servico.garantia || 'Conforme contrato').join(', ')}
                  </InfoValue>
                </InfoRow>
              </>
            )}
          </div>
        </ContentGrid>
      </FullWidthSection>

      <FullWidthSection>
        <SectionTitle>💰 Resumo Financeiro</SectionTitle>
        <Table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map((servico, index) => (
              <tr key={`servico-${index}`}>
                <td>{servico.nome || 'Serviço não especificado'}</td>
                <td>Serviço</td>
                <td>{servico.quantidade || 1}</td>
                <td className="currency">{formatCurrency(servico.preco)}</td>
                <td className="currency">{formatCurrency((servico.preco || 0) * (servico.quantidade || 1))}</td>
              </tr>
            ))}
            {produtos.map((produto, index) => 
              produto.preco && parseFloat(produto.preco) > 0 && (
                <tr key={`produto-${index}`}>
                  <td>{produto.nome || 'Peça/Produto'}</td>
                  <td>Produto</td>
                  <td>{produto.quantidade || 1}</td>
                  <td className="currency">{formatCurrency(produto.preco)}</td>
                  <td className="currency">{formatCurrency((produto.preco || 0) * (produto.quantidade || 1))}</td>
                </tr>
              )
            )}
            <tr className="total-row">
              <td colSpan="4"><strong>Total Geral</strong></td>
              <td className="currency"><strong>{formatCurrency(valorTotal)}</strong></td>
            </tr>
          </tbody>
        </Table>
      </FullWidthSection>

      <FullWidthSection>
        <SectionTitle>📋 Detalhamento Técnico</SectionTitle>
        
        {observations.informacao && (
          <InfoRow>
            <InfoLabel>Info. Equipamento:</InfoLabel>
            <InfoValue>{observations.informacao}</InfoValue>
          </InfoRow>
        )}
        
        {observations.problema && (
          <InfoRow>
            <InfoLabel>Problema Relatado:</InfoLabel>
            <InfoValue>{observations.problema}</InfoValue>
          </InfoRow>
        )}
        
        {observations.diagnostico && (
          <InfoRow>
            <InfoLabel>Diagnóstico:</InfoLabel>
            <InfoValue>{observations.diagnostico}</InfoValue>
          </InfoRow>
        )}
        
        {ordemDeServico.observacoes && (
          <ObservationsBox>
            <strong>Observações Completas:</strong><br/>
            {ordemDeServico.observacoes}
          </ObservationsBox>
        )}

        <CheckboxSection>
          <strong style={{marginBottom: '1rem', display: 'block'}}>Status do Equipamento na Entrega:</strong>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.5rem'}}>
            <CheckboxItem>
              <input type="checkbox" />
              <span>Equipamento testado e funcionando</span>
            </CheckboxItem>
            <CheckboxItem>
              <input type="checkbox" />
              <span>Backup de dados realizado</span>
            </CheckboxItem>
            <CheckboxItem>
              <input type="checkbox" />
              <span>Garantia do serviço explicada</span>
            </CheckboxItem>
            <CheckboxItem>
              <input type="checkbox" />
              <span>Cliente satisfeito com o serviço</span>
            </CheckboxItem>
            <CheckboxItem>
              <input type="checkbox" />
              <span>Orientações de uso fornecidas</span>
            </CheckboxItem>
            <CheckboxItem>
              <input type="checkbox" />
              <span>Acessórios devolvidos completos</span>
            </CheckboxItem>
          </div>
        </CheckboxSection>
      </FullWidthSection>

      <SignatureSection>
        <SignatureBox>
          <div className="title">Assinatura do Técnico</div>
          <div className="line"></div>
          <div className="date">{funcionario.nome} - {formatDate(new Date())}</div>
        </SignatureBox>
        
        <SignatureBox>
          <div className="title">Assinatura do Cliente</div>
          <div className="line"></div>
          <div className="date">{cliente.nome} - Data: ___/___/_____</div>
        </SignatureBox>
      </SignatureSection>

      <ButtonContainer className="no-print">
        <Button className="primary" onClick={printReport}>
          🖨️ Imprimir Relatório
        </Button>
        <Button className="secondary" onClick={onClose}>
          ✕ Fechar
        </Button>
      </ButtonContainer>
    </ReportContainer>
  );
};

export default OrdemDeServicoReport;
