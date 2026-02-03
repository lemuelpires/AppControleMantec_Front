import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem 3rem;
  min-height: 78vh;
  background: linear-gradient(180deg, #f7fbff 0%, #f4f7fa 100%);
`;

export const Title = styled.h2`
  margin: 0 0 1.25rem 0;
  font-size: 2rem;
  color: #1f2d3d;
`;

export const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: end;
  margin-bottom: 1.5rem;

  label {
    display: block;
    font-size: 0.85rem;
    color: #475569;
    margin-bottom: 6px;
  }

  button {
    padding: 0.6rem 1rem;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg,#0d6efd,#0b5ed7);
    color: white;
    cursor: pointer;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const DateInput = styled.input`
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(16,24,40,0.08);
`;

export const KPIsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const KpiCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(15,23,42,0.06);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  strong {
    color: #0f172a;
    font-size: 0.95rem;
  }

  div {
    color: #0b1220;
    font-weight: 700;
    font-size: 1.05rem;
  }
`;

export const Section = styled.section`
  margin-top: 1rem;
  background: rgba(255,255,255,0.98);
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(15,23,42,0.04);
`;

export const SectionHeader = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.05rem;
  color: #0f172a;
`;

export const SectionBody = styled.div`
  p {
    margin: 0.35rem 0;
    color: #374151;
  }
`;

export const ExportButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    padding: 0.5rem 0.75rem;
    border-radius: 10px;
    border: 1px solid rgba(16,24,40,0.06);
    background: white;
    color: #111827;
    cursor: pointer;
    font-weight: 600;
  }
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  thead {
    background: linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%);
    color: white;
  }

  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    color: #333;
  }

  tbody tr {
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: rgba(13, 110, 253, 0.05);
    }

    &:nth-child(even) {
      background-color: rgba(248, 249, 250, 0.5);
    }
  }

  tbody tr:last-child td {
    border-bottom: none;
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
