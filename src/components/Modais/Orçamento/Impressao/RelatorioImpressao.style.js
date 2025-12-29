import styled, { createGlobalStyle } from 'styled-components';

export const PrintStyles = createGlobalStyle`
  @media print {
    body * {
      visibility: hidden;
    }

    #relatorio-impressao,
    #relatorio-impressao * {
      visibility: visible;
    }

    #relatorio-impressao {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      margin: 0;
      padding: 0;
      box-shadow: none;
    }

    .ReactModal__Overlay {
      background: none !important;
    }

    .no-print {
      display: none !important;
    }

    @page {
      size: A4;
      margin: 15mm;
    }
  }
`;

export const RelatorioContainer = styled.div`
  background: #fff;
  color: #333;
  font-family: 'Segoe UI', sans-serif;
  padding: 2rem;
  max-width: 800px;
  margin: auto;

  @media print {
    padding: 0;
    margin: 0;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #eee;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
`;

export const Logo = styled.img`
  height: 90px;
`;

export const EmpresaInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.9rem;

  strong {
    font-size: 1.2rem;
    color: #1a237e;
  }
`;


export const TituloRelatorio = styled.h2`
  text-align: center;
  color: #1a237e;
  margin-bottom: 2rem;
`;

export const Section = styled.section`
  margin-bottom: 1.5rem;
  page-break-inside: avoid;
`;

export const SectionTitle = styled.h3`
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

export const InfoItem = styled.div``;

export const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border-bottom: 1px solid #eee;
    padding: 0.5rem;
  }

  .valor {
    text-align: right;
  }
`;

export const TotalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const TotalBox = styled.div`
  width: 300px;
  border: 1px solid #eee;
  padding: 1rem;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;

  &.grand-total {
    font-weight: bold;
    color: #1a237e;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
`;

export const BotaoImprimir = styled.button`
  background: #1a237e;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
`;

export const BotaoFechar = styled.button`
  background: #eee;
  border: 1px solid #ccc;
  padding: 0.75rem 1.5rem;
`;
