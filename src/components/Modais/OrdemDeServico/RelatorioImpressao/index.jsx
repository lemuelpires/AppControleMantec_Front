/*import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import apiCliente from '../../../../services/apiCliente';

const ReportContainer = styled.div`
  width: 100%;
  max-width: 210mm;
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
    font-size: 12px; 
    page-break-before: always; 
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
    font-size: 18px; 
  }
`;

const HeaderSubtitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: normal;
  color: #666;
  
  @media print {
    font-size: 14px; 
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
    font-size: 16px; 
  }
`;

const ReportRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  break-inside: avoid; 
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
    display: none; 
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

export default OrdemDeServicoReport;*/

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import apiCliente from '../../../../services/apiCliente';

const ReportContainer = styled.div`
  width: 100%;
  max-width: 210mm;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #fff;
  color: #000;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media print {
    padding: 20mm;
    border: none;
    box-shadow: none;
    font-size: 12px;
    page-break-before: always;
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
`;

const HeaderSubtitle = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #666;
`;

const SectionTitle = styled.h3`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #000;
  padding-bottom: 5px;
`;

const ReportRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  break-inside: avoid;
`;

const ReportLabel = styled.div`
  font-weight: bold;
  width: 35%;
`;

const ReportValue = styled.div`
  width: 65%;
`;

const ObservacaoLonga = styled.div`
  margin-bottom: 10px;
  white-space: pre-wrap;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  @media print {
    display: none;
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;

  th, td {
    border: 1px solid #333;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f0f0f0;
  }
`;

const OrdemDeServicoReport = ({ ordemDeServico, onClose }) => {
  const [cliente, setCliente] = useState({});
  const [funcionario, setFuncionario] = useState({});
  const [produto, setProduto] = useState({});
  const [servico, setServico] = useState({});

  const qtde = 1;
  const valorUnitario = (produto?.preco || 0) + (servico?.preco || 0);
  const total = qtde * valorUnitario;

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
    if (!dateString) return '';
    return format(new Date(dateString), 'dd/MM/yyyy');
  };

  const printReport = () => {
    window.print();
  };

  const formatObservacoes = (observacoes) => {
    if (!observacoes) return '';

    return observacoes.replace(/Informação do Produto:|Problema aparente:|Diagnóstico e serviço a ser executado:|Garantia:/g, match => `<br /><br /><strong>${match}</strong>`);
  };


  return (
    <ReportContainer id="report-to-print">
      <Header>
        <HeaderTitle>Mantec Informática</HeaderTitle>
        <HeaderSubtitle>Relatório de Ordem de Serviço</HeaderSubtitle>
      </Header>

      <SectionTitle>Informações Gerais</SectionTitle>
      <ReportRow>
        <ReportLabel>Nº da OS:</ReportLabel>
        <ReportValue>{ordemDeServico.numeroOS || '____________'}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Data de Abertura:</ReportLabel>
        <ReportValue>{formatDate(ordemDeServico.dataEntrada)}</ReportValue>
      </ReportRow>

      <SectionTitle>Dados do Cliente</SectionTitle>
      <ReportRow>
        <ReportLabel>Nome:</ReportLabel>
        <ReportValue>{cliente.nome}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>CPF/CNPJ:</ReportLabel>
        <ReportValue>{cliente.cpf || cliente.cnpj || '____________'}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Telefone:</ReportLabel>
        <ReportValue>{cliente.telefone}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Email:</ReportLabel>
        <ReportValue>{cliente.email}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Endereço:</ReportLabel>
        <ReportValue>{cliente.endereco || '_____________________________'}</ReportValue>
      </ReportRow>

      <SectionTitle>Dados do Equipamento</SectionTitle>
      <ReportRow>
        <ReportLabel>Tipo de Equipamento:</ReportLabel>
        <ReportValue>{'_________________________________________________'}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Marca / Modelo:</ReportLabel>
        <ReportValue>{'_________________________________________________'}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Nº de Série:</ReportLabel>
        <ReportValue>{'_________________________________________________'}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Acessórios Entregues:</ReportLabel>
        <ReportValue>{'_________________________________________________'}</ReportValue>
      </ReportRow>

      <ReportRow>
        <ReportLabel>Condições Visuais:</ReportLabel>
        <ReportValue>{'_________________________________________________'}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Problema Aparente:</ReportLabel>
        <ReportValue>{'_________________________________________________'}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Diagnóstico e serviço a ser executado:</ReportLabel>
        <ReportValue dangerouslySetInnerHTML={{ __html: formatObservacoes(ordemDeServico.observacoes) }} />
      </ReportRow>
      <ObservacaoLonga>
        <SectionTitle>Peças Utilizadas</SectionTitle>
        <Table>
          <thead>
            <tr>
              <th>Qtde</th>
              <th>Peça</th>
              <th>Valor Unitário (R$)</th>
              <th>Total (R$)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{qtde}</td>
              <td>{produto.nome || 'Produto'}</td>
              <td>{valorUnitario}</td>
              <td>{total}</td>
            </tr>
          </tbody>
        </Table>

      </ObservacaoLonga>

      <SectionTitle>Custos e Pagamento</SectionTitle>
      <ReportRow>
        <ReportLabel>Valor das Peças:</ReportLabel>
        <ReportValue>R$ {produto.preco}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Mão de Obra:</ReportLabel>
        <ReportValue>R$ {servico.preco}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Taxas Adicionais:</ReportLabel>
        <ReportValue>{'____'}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Valor Total:</ReportLabel>
        <ReportValue>R$ {total}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Forma de Pagamento:</ReportLabel>
        <ReportValue>{'_____________________'}</ReportValue>
      </ReportRow>

      <SectionTitle>Status</SectionTitle>
      <ReportRow>
        <ReportLabel>Status da OS:</ReportLabel>
        <ReportValue>{ordemDeServico.status || 'Concluída'}</ReportValue>
      </ReportRow>

      <SectionTitle>Responsáveis</SectionTitle>
      <ReportRow>
        <ReportLabel>Técnico Responsável:</ReportLabel>
        <ReportValue>{funcionario.nome}</ReportValue>
      </ReportRow>
      <ReportRow>
        <ReportLabel>Atendente:</ReportLabel>
        <ReportValue>{funcionario.nome || '___________'}</ReportValue>
      </ReportRow>

      <SectionTitle>Observações / Termos</SectionTitle>
      <ObservacaoLonga>
        ☑ O cliente autoriza abertura do equipamento<br />
        ☑ Não nos responsabilizamos por perda de dados<br />
        ☑ Equipamento com sinais de oxidação ou queda<br />
        ☑ Garantia de 90 dias sobre serviço realizado
      </ObservacaoLonga>

      <SectionTitle>Assinaturas</SectionTitle>
      <ObservacaoLonga>
        Entrega do equipamento:<br />
        Assinatura do cliente: _______________________  Data: ____/____/____<br /><br />
        Retirada do equipamento:<br />
        Assinatura do cliente: _______________________  Data: ____/____/____<br />
        Assinatura do técnico:  _______________________
      </ObservacaoLonga>

      <ButtonContainer>
        <Button onClick={printReport}>Imprimir</Button>
        <Button onClick={onClose}>Fechar</Button>
      </ButtonContainer>
    </ReportContainer>
  );
};

export default OrdemDeServicoReport;

