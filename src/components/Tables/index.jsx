// src/components/Tables/index.jsx
import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
`;

const Th = styled.th`
  padding: 12px 10px;
  border: 1px solid #dee2e6;
  background-color: #f8f9fa;
  text-align: left;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
`;

const Td = styled.td`
  padding: 12px 10px;
  border: 1px solid #dee2e6;
  color: #495057;
  font-size: 0.9rem;
  vertical-align: middle;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f1f3f4;
  }
`;

const Table = ({ columns = [], data = [], initialPageSize = 10 }) => {
  // Se não há colunas definidas, usar layout padrão (compatibilidade)
  if (columns.length === 0) {
    return (
      <TableContainer>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Endereço</Th>
            <Th>Telefone</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <Tr key={item.id || index}>
              <Td>{item.id}</Td>
              <Td>{item.nome}</Td>
              <Td>{item.endereco}</Td>
              <Td>{item.telefone}</Td>
            </Tr>
          ))}
        </tbody>
      </TableContainer>
    );
  }

  // Layout dinâmico baseado nas colunas
  return (
    <TableContainer>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <Th key={index}>
              {column.Header}
            </Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(0, initialPageSize).map((row, rowIndex) => (
          <Tr key={row.id || rowIndex}>
            {columns.map((column, colIndex) => {
              const cellValue = column.accessor 
                ? (typeof column.accessor === 'function' 
                    ? column.accessor(row) 
                    : row[column.accessor])
                : '';
              
              return (
                <Td key={colIndex}>
                  {column.Cell 
                    ? column.Cell({ row: { original: row }, value: cellValue })
                    : cellValue
                  }
                </Td>
              );
            })}
          </Tr>
        ))}
      </tbody>
    </TableContainer>
  );
};

export default Table;
