import styled from 'styled-components';

export const RelatorioContainer = styled.div`
  background-color: #fff;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 2rem;
  margin: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 800px;
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 2px solid #eee;
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
`;

export const Logo = styled.img`
  height: 60px;
`;

export const EmpresaInfo = styled.div`
  text-align: right;
  font-size: 0.9rem;
  color: #666;
  strong {
    display: block;
    font-size: 1.1rem;
    color: #333;
    margin-bottom: 0.25rem;
  }
`;

export const TituloRelatorio = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  color: #1a237e;
`;

export const Section = styled.section`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

export const InfoItem = styled.div`
  font-size: 1rem;
  color: #555;
  strong {
    font-weight: 600;
    color: #333;
    margin-right: 0.5rem;
  }
`;

export const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 1rem;

  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #f9f9f9;
    font-weight: 600;
    color: #333;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  .valor {
    text-align: right;
  }
`;

export const TotalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

export const TotalBox = styled.div`
  width: 300px;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #eee;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }

  &.grand-total {
    font-size: 1.2rem;
    font-weight: 700;
    color: #1a237e;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid #ddd;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #eee;
`;

export const BotaoImprimir = styled.button`
  background-color: #1a237e;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #283593;
  }
`;

export const BotaoFechar = styled.button`
  background-color: #eee;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;
