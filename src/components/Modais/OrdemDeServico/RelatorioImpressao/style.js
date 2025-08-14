import styled from 'styled-components';

// Cores primárias e auxiliares para o tema
const colors = {
  primary: '#0078d4',
  primaryDark: '#005a9e',
  secondary: '#f4f6f8',
  grayDark: '#333',
  grayMedium: '#666',
  grayLight: '#ccc',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
  background: '#fff',
  border: '#e1e4e8',
};

// Container principal do relatório
export const ReportContainer = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: ${colors.background};
  color: ${colors.grayDark};
  max-width: 900px;
  margin: 1.5rem auto;
  padding: 2rem;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  border-radius: 8px;

  @media print {
    box-shadow: none;
    margin: 0;
    padding: 0;
    max-width: 100%;
  }
`;

// Cartão para blocos de conteúdo
export const Card = styled.section`
  background-color: ${colors.secondary};
  border-radius: 8px;
  padding: 1.6rem 2rem;
  margin-bottom: 1.8rem;
  box-shadow: inset 0 0 5px rgb(0 0 0 / 0.05);
`;

// Cabeçalho do relatório
export const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

// Logo estilizado simples
export const CompanyLogo = styled.div`
  font-weight: 900;
  font-size: 3.2rem;
  color: ${colors.primary};
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 0.3rem;
`;

// Títulos no cabeçalho
export const HeaderTitle = styled.h1`
  font-size: 1.9rem;
  margin: 0;
  font-weight: 700;
  color: ${colors.grayDark};
`;

export const HeaderSubtitle = styled.p`
  margin: 0;
  font-weight: 500;
  color: ${colors.grayMedium};
  font-size: 1rem;
`;

// Badge da Ordem de Serviço no cabeçalho
export const OSBadge = styled.div`
  display: inline-block;
  margin-top: 0.7rem;
  padding: 0.3rem 0.9rem;
  background-color: ${colors.primary};
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  border-radius: 20px;
  letter-spacing: 0.05em;
`;

// Grid para organizar as seções lado a lado
export const ContentGrid = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

// Cada seção de informações
export const InfoSection = styled.div`
  flex: 1;
  min-width: 280px;
`;

// Título das seções
export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 700;
  border-bottom: 2px solid ${colors.primary};
  padding-bottom: 0.3rem;
  color: ${colors.primaryDark};
`;

// Linha de informação
export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.45rem 0;
  border-bottom: 1px solid ${colors.border};
  font-size: 0.95rem;

  &:last-child {
    border-bottom: none;
  }
`;

// Label da informação (lado esquerdo)
export const InfoLabel = styled.div`
  font-weight: 600;
  color: ${colors.grayMedium};
  max-width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Valor da informação (lado direito)
export const InfoValue = styled.div`
  max-width: 50%;
  text-align: right;
  font-weight: 700;
  color: ${props => props.highlight ? colors.primaryDark : colors.grayDark};

  &.highlight {
    color: ${colors.primaryDark};
  }
`;

// Tabela para resumo financeiro
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  th, td {
    padding: 0.75rem 0.5rem;
    text-align: left;
    border-bottom: 1px solid ${colors.border};
  }

  th {
    background-color: ${colors.primary};
    color: white;
    font-weight: 700;
  }

  td.currency {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  tr.total-row td {
    font-weight: 700;
    border-top: 2px solid ${colors.primary};
    background-color: ${colors.secondary};
  }
`;

// Badges de status com cores específicas
export const StatusBadge = styled.span`
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.85rem;
  color: white;
  text-transform: uppercase;

  &.concluida {
    background-color: ${colors.success};
  }
  &.em-andamento {
    background-color: ${colors.warning};
    color: ${colors.grayDark};
  }
  &.pendente {
    background-color: ${colors.danger};
  }
  &.orcamento {
    background-color: ${colors.primaryDark};
  }
`;

// Seção de checkboxes
export const CheckboxSection = styled.div`
  font-size: 0.95rem;
  color: ${colors.grayDark};
  padding-top: 0.5rem;
`;

// Cada item checkbox alinhado
export const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

// Seção para assinaturas
export const SignatureSection = styled.section`
  display: flex;
  gap: 3rem;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

// Caixa da assinatura com linha e título
export const SignatureBox = styled.div`
  flex: 1;
  border-top: 2px solid ${colors.grayLight};
  padding-top: 1rem;
  text-align: center;

  .title {
    font-weight: 600;
    margin-bottom: 0.8rem;
    font-size: 1rem;
    color: ${colors.grayMedium};
  }

  .line {
    height: 2px;
    background-color: ${colors.grayLight};
    margin: 0 2rem 1.2rem 2rem;
  }

  .date {
    font-size: 0.85rem;
    color: ${colors.grayMedium};
  }
`;

// Container para botões
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;

  @media print {
    display: none;
  }
`;

// Botões estilizados
export const Button = styled.button`
  background-color: ${props => props.className?.includes('primary') ? colors.primary : colors.grayLight};
  color: ${props => props.className?.includes('primary') ? 'white' : colors.grayDark};
  font-weight: 700;
  padding: 0.65rem 1.6rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
  transition: background-color 0.25s ease;

  &:hover {
    background-color: ${props => props.className?.includes('primary') ? colors.primaryDark : colors.grayMedium};
    color: white;
  }
`;

// Loading e error
export const LoadingContainer = styled.div`
  text-align: center;
  font-weight: 600;
  color: ${colors.primary};
  font-size: 1.1rem;
  padding: 3rem 0;
`;

export const ErrorContainer = styled.div`
  text-align: center;
  font-weight: 700;
  color: ${colors.danger};
  font-size: 1.1rem;
  padding: 3rem 0;
`;

import { createGlobalStyle } from 'styled-components';

export const PrintGlobalStyle = createGlobalStyle`
  @media print {
    body * {
      visibility: hidden !important;
    }
    #report-to-print, #report-to-print * {
      visibility: visible !important;
    }
    #report-to-print {
      position: absolute !important;
      left: 0 !important;
      top: 0 !important;
      width: 100vw !important;
      min-height: 100vh !important;
      box-shadow: none !important;
      margin: 0 !important;
      padding: 0 !important;
      border-radius: 0 !important;
      background: white !important;
      overflow: visible !important;
      z-index: 9999 !important;
    }
    .no-print {
      display: none !important;
    }
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;