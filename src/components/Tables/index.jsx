// src/components/Tabela.js
import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
`;

const Tabela = ({ data }) => {
  return (
    <TableContainer>
      <thead>
        <tr>
          <Th>ID</Th>
          <Th>Nome</Th>
          <Th>Endereço</Th>
          <Th>Telefone</Th>
          {/* Adicione mais colunas conforme necessário */}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <Td>{item.id}</Td>
            <Td>{item.nome}</Td>
            <Td>{item.endereco}</Td>
            <Td>{item.telefone}</Td>
            {/* Adicione mais colunas conforme necessário */}
          </tr>
        ))}
      </tbody>
    </TableContainer>
  );
};

export default Tabela;
