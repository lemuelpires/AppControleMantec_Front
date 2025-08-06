import React from 'react';
import styled from 'styled-components';

const ReportContainer = styled.div`
  width: 100%;
  max-width: 210mm;
  margin: auto;
  padding: 20px;
  font-family: 'Courier New', monospace;
  white-space: pre-wrap;
  background-color: #fff;
  color: #000;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media print {
    box-shadow: none;
    border: none;
  }
`;

const OrdemDeServicoFormatada = ({ ordemDeServico }) => {
  return (
    <ReportContainer>
{`
═══════════════════════════════════════════════════════════════════
🛠️   ORDEM DE SERVIÇO – ASSISTÊNCIA TÉCNICA
Nº da OS: ${ordemDeServico.numeroOS || '____________'}             Data de Abertura: ${ordemDeServico.dataAbertura || '____/____/____'}
═══════════════════════════════════════════════════════════════════

👤  DADOS DO CLIENTE
───────────────────────────────────────────────────────────────────
Nome: ${ordemDeServico.cliente?.nome || '____________________________________________'}
CPF/CNPJ: ${ordemDeServico.cliente?.cpfCnpj || '______________'}    Telefone: ${ordemDeServico.cliente?.telefone || '____________________'}
E-mail: ${ordemDeServico.cliente?.email || '_________________________________________'}
Endereço: ${ordemDeServico.cliente?.endereco || '_____________________________________'}
         ${ordemDeServico.cliente?.endereco2 || '_____________________________________'}

🖥️  DADOS DO EQUIPAMENTO
───────────────────────────────────────────────────────────────────
Tipo de Equipamento: ${ordemDeServico.equipamento?.tipo || '____________________________'}
Marca: ${ordemDeServico.equipamento?.marca || '______________'}    Modelo: ${ordemDeServico.equipamento?.modelo || '______________'}
Nº de Série: ${ordemDeServico.equipamento?.numeroSerie || '___________________________'}
Acessórios Entregues: ${ordemDeServico.equipamento?.acessorios || '☐ Fonte ☐ Bateria ☐ Cartão ☐ Outros: ____________'}
Condições Visuais: ${ordemDeServico.equipamento?.condicoes || '______________________________________'}

📋  DEFEITO INFORMADO PELO CLIENTE
───────────────────────────────────────────────────────────────────
${ordemDeServico.defeitoCliente || '__________________________________________________________________'}

🔍  DIAGNÓSTICO TÉCNICO
───────────────────────────────────────────────────────────────────
Análise Inicial: ${ordemDeServico.analiseInicial || '_______________________________________________'}
Causa Provável: ${ordemDeServico.causaProvavel || '_______________________________________________'}

🔧  SERVIÇOS A REALIZAR / REALIZADOS
───────────────────────────────────────────────────────────────────
${ordemDeServico.servicosRealizar || '☐ Troca de peça: __________  ☐ Reparos: _________  ☐ Atualização de software  ☐ Limpeza  ☐ Outros:'}

📦  PEÇAS UTILIZADAS
───────────────────────────────────────────────────────────────────
| Qtde | Peça                         | Valor Unitário | Total     |
|------|------------------------------|----------------|-----------|
${(ordemDeServico.pecas || []).map(peca => `| ${peca.qtde || '  '}   | ${peca.nome || ''} | R$ ${peca.valorUnitario || ''}     | R$ ${peca.total || ''} |`).join('\n')}

🧾  CUSTOS E PAGAMENTO
───────────────────────────────────────────────────────────────────
Valor Peças:          R$ ${ordemDeServico.custos?.valorPecas || '____________'}
Mão de Obra:          R$ ${ordemDeServico.custos?.maoObra || '____________'}
Taxas Adicionais:     R$ ${ordemDeServico.custos?.taxas || '____________'}
Valor Total:          R$ ${ordemDeServico.custos?.total || '____________'}
Forma de Pagamento:   ${ordemDeServico.pagamento || '☐ Dinheiro  ☐ Cartão  ☐ Pix  ☐ Outros'}

📌  STATUS DA OS
───────────────────────────────────────────────────────────────────
${ordemDeServico.status || '☐ Em andamento   ☐ Aguardando aprovação  ☐ Aguardando peça   ☐ Concluída   ☐ Cancelada'}

👨‍🔧  RESPONSÁVEIS
───────────────────────────────────────────────────────────────────
Técnico Responsável: ${ordemDeServico.tecnico || '________________________'}
Atendente: ${ordemDeServico.atendente || '________________________'}

📝  OBSERVAÇÕES / TERMOS
───────────────────────────────────────────────────────────────────
☐ O cliente autoriza abertura do equipamento
☐ Não nos responsabilizamos por perda de dados
☐ Equipamento com sinais de oxidação ou queda
☐ Garantia de ${ordemDeServico.garantia || '____'} dias sobre serviço realizado

✍️  ASSINATURAS
───────────────────────────────────────────────────────────────────
Entrega do equipamento:
Assinatura do cliente: _______________________  Data: ____/____/____

Retirada do equipamento:
Assinatura do cliente: _______________________  Data: ____/____/____
Assinatura do técnico:  _______________________

═══════════════════════════════════════════════════════════════════
`}
    </ReportContainer>
  );
};

export default OrdemDeServicoFormatada;


/*import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import apiCliente from '../../../../services/apiCliente';

const ReportContainer = styled.div`
  width: 100%;
  max-width: 210mm;
  margin: auto;
  padding: 15px;
  font-family: Arial, sans-serif;
  background-color: #fff;
  color: #000;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  line-height: 1.3;
  
  @media print {
    width: 100%;
    max-width: none;
    margin: 0;
    padding: 15mm;
    border: none;
    box-shadow: none;
    font-size: 11px; 
    line-height: 1.2;
    page-break-before: always; 
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 15px;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 22px;
  font-weight: bold;
  color: #333;
  
  @media print {
    font-size: 16px; 
  }
`;

const HeaderSubtitle = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: normal;
  color: #666;
  
  @media print {
    font-size: 12px; 
  }
`;

const SectionTitle = styled.h3`
  margin-top: 15px;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #000;
  padding-bottom: 3px;
  color: #000;
  
  @media print {
    font-size: 14px;
    margin-top: 12px;
    margin-bottom: 6px;
  }
`;

const ReportRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  break-inside: avoid; 
  
  @media print {
    margin-bottom: 6px;
  }
`;

const ReportLabel = styled.div`
  font-weight: bold;
  width: 30%;
  font-size: 14px;
  
  @media print {
    font-size: 11px;
  }
`;

const ReportValue = styled.div`
  width: 65%;
  font-size: 14px;
  
  @media print {
    font-size: 11px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 15px;
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