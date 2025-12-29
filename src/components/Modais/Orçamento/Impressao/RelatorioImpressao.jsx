import React, { useMemo } from 'react';
import {
  PrintStyles,
  RelatorioContainer,
  Header,
  Logo,
  EmpresaInfo,
  TituloRelatorio,
  Section,
  SectionTitle,
  InfoGrid,
  InfoItem,
  Tabela,
  TotalContainer,
  TotalBox,
  TotalRow,
  Footer,
  BotaoImprimir,
  BotaoFechar,
} from './RelatorioImpressao.style';

import logoMantec from '../../../../assets/logo_mantec.png';

const formatDate = (dateStr) => {
  if (!dateStr) return '--/--/----';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '--/--/----';
  return new Date(
    d.getTime() + Math.abs(d.getTimezoneOffset()) * 60000
  ).toLocaleDateString('pt-BR');
};

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value || 0);

const RelatorioImpressaoOrcamento = ({
  orcamento,
  cliente,
  produtos,
  servicos,
  onClose,
}) => {
  const itensDeOrcamento = useMemo(() => {
    const itens = [];

    if (Array.isArray(orcamento?.pecasUtilizadas)) {
      orcamento.pecasUtilizadas.forEach((p) => {
        itens.push({
          descricao: produtos[p.produtoID] || 'Produto não encontrado',
          quantidade: p.quantidade,
          valorUnitario: p.valor,
          valorTotal: p.quantidade * p.valor,
        });
      });
    }

    if (Array.isArray(orcamento?.servicos)) {
      orcamento.servicos.forEach((s) => {
        itens.push({
          descricao: servicos[s.servicoID] || 'Serviço não encontrado',
          quantidade: s.quantidade,
          valorUnitario: s.valor,
          valorTotal: s.quantidade * s.valor,
        });
      });
    }

    return itens;
  }, [orcamento, produtos, servicos]);

  const subtotal = useMemo(
    () => itensDeOrcamento.reduce((acc, item) => acc + item.valorTotal, 0),
    [itensDeOrcamento]
  );

  const handlePrint = () => {
    window.print();
  };

  if (!orcamento) return null;

  return (
    <>
      <PrintStyles />

      <RelatorioContainer id="relatorio-impressao">
        <Header>
          <Logo src={logoMantec} alt="Logo Mantec" />
          <EmpresaInfo>
            <strong>MANTEC</strong>
            <span>Rua Américo Vezzani, 855 - Matão/SP</span>
            <span>(16) 99261-4410</span>
            <span>mantec10design@gmail.com</span>
          </EmpresaInfo>
        </Header>

        <TituloRelatorio>Orçamento</TituloRelatorio>

        <Section>
          <SectionTitle>Detalhes do Orçamento</SectionTitle>
          <InfoGrid>
            <InfoItem><strong>Nº OS:</strong> {orcamento.numeroOS}</InfoItem>
            <InfoItem><strong>Data:</strong> {formatDate(orcamento.dataEntrada)}</InfoItem>
            <InfoItem><strong>Cliente:</strong> {cliente}</InfoItem>
          </InfoGrid>
        </Section>

        <Section>
          <SectionTitle>Equipamento</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <strong>Equipamento:</strong> {orcamento.marca} {orcamento.modelo}
            </InfoItem>
            <InfoItem>
              <strong>Defeito Relatado:</strong> {orcamento.defeitoRelatado}
            </InfoItem>
          </InfoGrid>
        </Section>

        <Section>
          <SectionTitle>Itens do Orçamento</SectionTitle>
          <Tabela>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Qtd.</th>
                <th className="valor">Valor Unit.</th>
                <th className="valor">Valor Total</th>
              </tr>
            </thead>
            <tbody>
              {itensDeOrcamento.map((item, i) => (
                <tr key={i}>
                  <td>{item.descricao}</td>
                  <td>{item.quantidade}</td>
                  <td className="valor">{formatCurrency(item.valorUnitario)}</td>
                  <td className="valor">{formatCurrency(item.valorTotal)}</td>
                </tr>
              ))}
            </tbody>
          </Tabela>
        </Section>

        <TotalContainer>
          <TotalBox>
            <TotalRow>
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </TotalRow>
            <TotalRow>
              <span>Desconto</span>
              <span>{formatCurrency(orcamento.desconto)}</span>
            </TotalRow>
            <TotalRow className="grand-total">
              <span>TOTAL</span>
              <span>{formatCurrency(orcamento.valorTotal)}</span>
            </TotalRow>
          </TotalBox>
        </TotalContainer>

        <Section>
          <SectionTitle>Observações</SectionTitle>
          <p>{orcamento.observacoes || 'Nenhuma observação.'}</p>
        </Section>

        <Footer className="no-print">
          <BotaoFechar onClick={onClose}>Fechar</BotaoFechar>
          <BotaoImprimir onClick={handlePrint}>Imprimir</BotaoImprimir>
        </Footer>
      </RelatorioContainer>
    </>
  );
};

export default RelatorioImpressaoOrcamento;
