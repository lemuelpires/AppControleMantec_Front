import React, { useMemo } from 'react';
import {
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

import logoMantec from '../../../../assets/logo_mantec.png'; // Ajuste o caminho se necessário

const formatDate = (dateStr) => {
  if (!dateStr) return '--/--/----';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '--/--/----';
  return new Date(d.getTime() + Math.abs(d.getTimezoneOffset()) * 60000).toLocaleDateString('pt-BR');
};

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value || 0);

const RelatorioImpressaoOrcamento = ({ orcamento, cliente, produtos, servicos, onClose }) => {
  const itensDeOrcamento = useMemo(() => {
    const itens = [];
    if (orcamento?.pecasUtilizadas && Array.isArray(orcamento.pecasUtilizadas)) {
      orcamento.pecasUtilizadas.forEach(p => {
        itens.push({
          tipo: 'Produto',
          descricao: produtos[p.produtoID] || 'Produto não encontrado',
          quantidade: p.quantidade,
          valorUnitario: p.valor, // Assumindo que o valor está aqui
          valorTotal: p.quantidade * p.valor,
        });
      });
    }
    if (orcamento?.servicos) { // Assumindo que `servicos` é um array de IDs em `orcamento`
      orcamento.servicos.forEach(s => {
        itens.push({
          tipo: 'Serviço',
          descricao: servicos[s.servicoID] || 'Serviço não encontrado',
          quantidade: s.quantidade,
          valorUnitario: s.valor,
          valorTotal: s.quantidade * s.valor,
        });
      });
    }
    return itens;
  }, [orcamento, produtos, servicos]);

  const subtotal = useMemo(() => 
    itensDeOrcamento.reduce((acc, item) => acc + (item.valorTotal || 0), 0),
    [itensDeOrcamento]
  );
  
  const handlePrint = () => {
    window.print();
  };

  if (!orcamento) {
    return (
      <RelatorioContainer>
        <p>Nenhum orçamento selecionado.</p>
        <Footer>
          <BotaoFechar onClick={onClose}>Fechar</BotaoFechar>
        </Footer>
      </RelatorioContainer>
    );
  }

  return (
    <RelatorioContainer>
      <Header>
        <Logo src={logoMantec} alt="Logo Mantec" />
        <EmpresaInfo>
          <strong>MANTEC</strong>
          <span>Rua Americo Vezzzani, 855, Matão-SP</span>
          <span>(16) 99261-4410</span>
          <span>mantec10design@gmail.com</span>
        </EmpresaInfo>
      </Header>

      <TituloRelatorio>Orçamento</TituloRelatorio>

      <Section>
        <SectionTitle>Detalhes do Orçamento</SectionTitle>
        <InfoGrid>
          <InfoItem><strong>Nº OS:</strong> {orcamento.numeroOS || 'N/A'}</InfoItem>
          <InfoItem><strong>Data:</strong> {formatDate(orcamento.dataEntrada)}</InfoItem>
          <InfoItem><strong>Cliente:</strong> {cliente || 'Não informado'}</InfoItem>
        </InfoGrid>
      </Section>
      
      <Section>
        <SectionTitle>Equipamento</SectionTitle>
        <InfoGrid>
          <InfoItem><strong>Equipamento:</strong> {orcamento.marca || ''} {orcamento.modelo || ''}</InfoItem>
          <InfoItem><strong>Defeito Relatado:</strong> {orcamento.defeitoRelatado || 'Não informado'}</InfoItem>
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
            {itensDeOrcamento.map((item, index) => (
              <tr key={index}>
                <td>{item.descricao}</td>
                <td>{item.quantidade}</td>
                <td className="valor">{formatCurrency(item.valorUnitario)}</td>
                <td className="valor">{formatCurrency(item.valorTotal)}</td>
              </tr>
            ))}
            {itensDeOrcamento.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>Nenhum item adicionado.</td>
              </tr>
            )}
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

      <Footer>
        <BotaoFechar onClick={onClose}>Fechar</BotaoFechar>
        <BotaoImprimir onClick={handlePrint}>Imprimir</BotaoImprimir>
      </Footer>
    </RelatorioContainer>
  );
};

export default RelatorioImpressaoOrcamento;