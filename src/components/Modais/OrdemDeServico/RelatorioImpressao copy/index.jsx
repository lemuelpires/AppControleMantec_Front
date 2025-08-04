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
