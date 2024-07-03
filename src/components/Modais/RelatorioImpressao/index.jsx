import React from 'react';
import styled from 'styled-components';
import { Button } from './style';

const ReportContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const ReportTitle = styled.h1`
  text-align: center;
  font-size: 24px;
`;

const ReportSection = styled.div`
  margin-bottom: 20px;
`;

const ReportLabel = styled.div`
  font-weight: bold;
`;

const ReportValue = styled.div`
  margin-left: 10px;
`;

const ReportRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const OrdemDeServicoReport = ({ ordemDeServico, onClose }) => {
  const printReport = () => {
    window.print();
  };

  return (
    <ReportContainer>
      <ReportTitle>Relatório de Ordem de Serviço</ReportTitle>
      <ReportSection>
        <ReportRow>
          <ReportLabel>Cliente:</ReportLabel>
          <ReportValue>{ordemDeServico.clienteID}</ReportValue>
        </ReportRow>
        <ReportRow>
          <ReportLabel>Funcionário:</ReportLabel>
          <ReportValue>{ordemDeServico.funcionarioID}</ReportValue>
        </ReportRow>
        <ReportRow>
          <ReportLabel>Produto:</ReportLabel>
          <ReportValue>{ordemDeServico.produtoID}</ReportValue>
        </ReportRow>
        <ReportRow>
          <ReportLabel>Serviço:</ReportLabel>
          <ReportValue>{ordemDeServico.servicoID}</ReportValue>
        </ReportRow>
        <ReportRow>
          <ReportLabel>Data de Entrada:</ReportLabel>
          <ReportValue>{ordemDeServico.dataEntrada}</ReportValue>
        </ReportRow>
        <ReportRow>
          <ReportLabel>Data de Conclusão:</ReportLabel>
          <ReportValue>{ordemDeServico.dataConclusao}</ReportValue>
        </ReportRow>
        <ReportRow>
          <ReportLabel>Status:</ReportLabel>
          <ReportValue>{ordemDeServico.status}</ReportValue>
        </ReportRow>
        <ReportRow>
          <ReportLabel>Observações:</ReportLabel>
          <ReportValue>{ordemDeServico.observacoes}</ReportValue>
        </ReportRow>
      </ReportSection>
      <Button onClick={printReport}>Imprimir</Button>
      <Button onClick={onClose}>Fechar</Button>
    </ReportContainer>
  );
};

export default OrdemDeServicoReport;
