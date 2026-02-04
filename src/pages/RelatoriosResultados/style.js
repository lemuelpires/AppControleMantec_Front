import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

export const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 2rem;
`;

export const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-end;
  margin-bottom: 2rem;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);

  label {
    font-size: 14px;
    color: #555;
    margin-bottom: 0.5rem;
    display: block;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);

    &:hover {
      background-color: #0056b3;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  select, input {
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ddd;
    min-width: 180px;
  }
`;

export const DateInput = styled.input`
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(16,24,40,0.08);
`;

export const KPIsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const KpiCard = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  }

  strong {
    font-size: 14px;
    color: #555;
    margin-bottom: 0.5rem;
    display: block;
  }

  div {
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }
`;

export const Section = styled.section`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
`;

export const SectionHeader = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SectionBody = styled.div`
  color: #555;
`;

export const ExportButtons = styled.div`
  display: flex;
  gap: 1rem;

  button {
    background-color: #6c757d;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    &:hover {
      background-color: #5a6268;
    }
  }
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  thead {
    background-color: #f8f9fa;
  }

  th {
    padding: 12px 15px;
    text-align: left;
    font-weight: 600;
    color: #333;
    border-bottom: 2px solid #dee2e6;
  }

  td {
    padding: 12px 15px;
    border-bottom: 1px solid #eee;
    color: #555;
  }

  tbody tr {
    &:hover {
      background-color: #f1f3f5;
    }
  }
`;

export const ChartExportBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  margin-left: 0.5rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export default {};
