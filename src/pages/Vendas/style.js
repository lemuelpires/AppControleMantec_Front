import styled from "styled-components";

export const NFSeButton = styled.button`
  background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  &:active {
    transform: translateY(0);
  }
  .icon {
    font-size: 1.1rem;
  }
`;

export const Container = styled.div`
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  color: white;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #6c757d;
    margin: 0.5rem 0 0 0;
  }

  .stat-icon {
    font-size: 2.5rem;
    opacity: 0.7;
    float: right;
  }
`;

export const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 2rem;
  
  /* Forçar cores escuras na tabela */
  table {
    color: #2c3e50 !important;
    background: white !important;
  }
  
  thead th {
    color: #2c3e50 !important;
    background: #f8f9fa !important;
    font-weight: 600 !important;
    border-bottom: 2px solid #dee2e6 !important;
  }
  
  tbody td {
    color: #495057 !important;
    background: white !important;
    border-bottom: 1px solid #dee2e6 !important;
  }
  
  tbody tr:hover td {
    background: #f1f3f4 !important;
    color: #2c3e50 !important;
  }
  
  /* Sobrescrever qualquer estilo herdado */
  .table, .table td, .table th, .table tr {
    color: #2c3e50 !important;
  }
  
  /* Manter botões com cores corretas */
  button {
    color: white !important;
  }
  
  /* Estilos específicos para react-table se estiver sendo usado */
  .rt-table .rt-thead .rt-th {
    color: #2c3e50 !important;
    background: #f8f9fa !important;
  }
  
  .rt-table .rt-tbody .rt-td {
    color: #495057 !important;
    background: white !important;
  }

  @media (max-width: 900px) {
    padding: 0;
    .table-wrapper {
      padding: 0.2rem;
      min-width: 350px;
      overflow-x: auto;
    }
  }

`;

export const ActionButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  .icon {
    font-size: 1.1rem;
  }
`;

export const StatusBadge = styled.span`
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.8rem;
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: white;
  font-size: 1.2rem;
  
  &::after {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    margin-left: 1rem;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const FiltersContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 600;
    color: #2c3e50;
    font-size: 0.9rem;
  }

  input, select {
    padding: 0.75rem;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    background: white;

    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
`;

export const FilterActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

export const FilterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
  }
  
  &.secondary {
    background: #6c757d;
    color: white;
    
    &:hover {
      background: #5a6268;
    }
  }
`;

export const ExportButton = styled.button`
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  .icon {
    font-size: 1.1rem;
  }
`;

export const FiltrosContainer = styled.div`
  display: flex;
  gap: 32px;
  margin: 32px 0 28px 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(90deg, #f8fafc 60%, #e9ecef 100%);
  border-radius: 14px;
  padding: 24px 32px;
  box-shadow: 0 4px 24px 0 #0002;
  border: 1.5px solid #e0e3e7;
`;

export const FiltroInput = styled.input`
  padding: 10px 16px;
  min-width: 180px;
  border: 1.5px solid #bfc9d1;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  background: #fff;
  color: #2c3e50;
  box-shadow: 0 1px 4px #0001;
  transition: border 0.2s, box-shadow 0.2s;
  &:focus {
    border-color: #764ba2;
    box-shadow: 0 2px 8px #764ba233;
  }
`;

export const FiltroSelect = styled.select`
  padding: 10px 16px;
  min-width: 140px;
  border: 1.5px solid #bfc9d1;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  background: #fff;
  color: #2c3e50;
  box-shadow: 0 1px 4px #0001;
  transition: border 0.2s, box-shadow 0.2s;
  &:focus {
    border-color: #764ba2;
    box-shadow: 0 2px 8px #764ba233;
  }
`;

export const FiltroSpan = styled.span`
  align-self: center;
  color: #888;
  font-weight: 500;
  font-size: 1rem;
  margin: 0 4px;
`;