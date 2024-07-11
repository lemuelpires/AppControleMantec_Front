import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import apiCliente from '../../../../services/apiCliente';

const ReportContainer = styled.div`
  width: 100%;
  max-width: 210mm; /* Largura de uma página A4 */
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #fff;
  color: #000;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  @media print {
    width: 100%;
    max-width: none;
    margin: 0;
    padding: 20mm;
    border: none;
    box-shadow: none;
    font-size: 12px; /* Ajuste o tamanho da fonte conforme necessário */
    page-break-before: always; /* Garante que novas páginas sejam usadas quando necessário */
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  
  @media print {
    font-size: 18px; /* Ajuste o tamanho da fonte conforme necessário */
  }
`;

const HeaderSubtitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: normal;
  color: #666;
  
  @media print {
    font-size: 14px; /* Ajuste o tamanho da fonte conforme necessário */
  }
`;

const SectionTitle = styled.h3`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #000;
  padding-bottom: 5px;
  color: #000;
  
  @media print {
    font-size: 16px; /* Ajuste o tamanho da fonte conforme necessário */
  }
`;

const ReportRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  break-inside: avoid; /* Evitar quebra de linha dentro de um item */
`;

const ReportLabel = styled.div`
  font-weight: bold;
  width: 30%;
`;

const ReportValue = styled.div`
  width: 65%;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  @media print {
    display: none; /* Esconde os botões ao imprimir */
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;

const OrdemDeServicoReport = ({ ordemDeServico, onClose }) => {
  const [cliente, setCliente] = useState({});
  const [funcionario, setFuncionario] = useState({});
  const [produto, setProduto] = useState({});
  const [servico, setServico] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const clienteData = await apiCliente.get(`/cliente/${ordemDeServico.clienteID}`);
      const funcionarioData = await apiCliente.get(`/funcionario/${ordemDeServico.funcionarioID}`);
      const produtoData = await apiCliente.get(`/produto/${ordemDeServico.produtoID}`);
      const servicoData = await apiCliente.get(`/servico/${ordemDeServico.servicoID}`);
      
      setCliente(clienteData.data);
      setFuncionario(funcionarioData.data);
      setProduto(produtoData.data);
      setServico(servicoData.data);
    };

    fetchData();
  }, [ordemDeServico]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy'); // Formato: dia/mês/ano
  };

  const formatObservacoes = (observacoes) => {
    if (!observacoes) return '';
    
    return observacoes.replace(/Informação do Produto:|Problema aparente:|Diagnóstico e serviço a ser executado:|Garantia:/g, match => `<br /><br /><strong>${match}</strong>`);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <ReportContainer id="report-to-print">
      <Header>
        <HeaderTitle>Mantec Informatica</HeaderTitle>
        <HeaderSubtitle>Relatório de Ordem de Serviço</HeaderSubtitle>
      </Header>
      
      <SectionTitle>Dados do Cliente</SectionTitle>
      <ReportRow>
        <ReportLabel>Cliente:</ReportLabel>
        <ReportValue>{cliente.nome}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Telefone:</ReportLabel>
        <ReportValue>{cliente.telefone}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Email:</ReportLabel>
        <ReportValue>{cliente.email}</ReportValue>
      </ReportRow>
      
      <SectionTitle>Dados do Serviço</SectionTitle>
      <ReportRow>
        <ReportLabel>Funcionário:</ReportLabel>
        <ReportValue>{funcionario.nome}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Produto:</ReportLabel>
        <ReportValue>{produto.nome}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Serviço:</ReportLabel>
        <ReportValue>{servico.nome}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Data de Entrada:</ReportLabel>
        <ReportValue>{formatDate(ordemDeServico.dataEntrada)}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Data de Conclusão:</ReportLabel>
        <ReportValue>{formatDate(ordemDeServico.dataConclusao)}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Status:</ReportLabel>
        <ReportValue>{ordemDeServico.status}</ReportValue>
      </ReportRow>
      
      <SectionTitle>Observações</SectionTitle>
      <ReportRow>
        <ReportValue dangerouslySetInnerHTML={{ __html: formatObservacoes(ordemDeServico.observacoes) }} />
      </ReportRow>      
      <ButtonContainer>
        <Button onClick={printReport}>Imprimir</Button>
        <Button onClick={onClose}>Fechar</Button>
      </ButtonContainer>
    </ReportContainer>
  );
};

export default OrdemDeServicoReport;
