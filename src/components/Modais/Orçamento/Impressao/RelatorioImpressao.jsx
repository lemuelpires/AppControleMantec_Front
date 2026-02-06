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

const toNumber = (v, def = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
};

const RelatorioImpressaoOrcamento = ({
  orcamento,
  cliente,
  produtos,
  servicos,
  onClose,
}) => {
  const itensDeOrcamento = useMemo(() => {
    const getProdutoInfo = (id) => (produtos && id ? produtos[id] : null);
    const getServicoInfo = (id) => (servicos && id ? servicos[id] : null);

    const getProdutoNome = (id) => {
      const info = getProdutoInfo(id);
      if (typeof info === 'string') return info;
      return info?.nome || 'Produto não encontrado';
    };

    const getServicoNome = (id) => {
      const info = getServicoInfo(id);
      if (typeof info === 'string') return info;
      return info?.nome || 'Serviço não encontrado';
    };

    const getProdutoValorUnitario = (item) => {
      const info = getProdutoInfo(item?.produtoID);
      return toNumber(
        item?.precoUnitario ??
          item?.valorUnitario ??
          item?.valor ??
          item?.preco ??
          info?.preco ??
          info?.precoUnitario,
        0
      );
    };

    const getServicoValorUnitario = (item) => {
      const info = getServicoInfo(item?.servicoID);
      return toNumber(
        item?.precoUnitario ??
          item?.valorUnitario ??
          item?.valor ??
          item?.preco ??
          info?.preco ??
          info?.precoUnitario,
        0
      );
    };

    const itens = [];
    let maoDeObraRestante = toNumber(orcamento?.valorMaoDeObra, 0);

    if (Array.isArray(orcamento?.pecasUtilizadas) && orcamento.pecasUtilizadas.length > 0) {
      orcamento.pecasUtilizadas.forEach((p) => {
        const quantidade = toNumber(p?.quantidade, 1) || 1;
        const valorUnitario = getProdutoValorUnitario(p);
        const adicionalMao = maoDeObraRestante;
        maoDeObraRestante = 0;
        itens.push({
          descricao: getProdutoNome(p?.produtoID),
          quantidade,
          valorUnitario,
          valorTotal: (quantidade * valorUnitario) + adicionalMao,
        });
      });
    } else if (Array.isArray(orcamento?.produtos) && orcamento.produtos.length > 0) {
      orcamento.produtos.forEach((p) => {
        const quantidade = toNumber(p?.quantidade, 1) || 1;
        const valorUnitario = getProdutoValorUnitario(p);
        const adicionalMao = maoDeObraRestante;
        maoDeObraRestante = 0;
        itens.push({
          descricao: getProdutoNome(p?.produtoID),
          quantidade,
          valorUnitario,
          valorTotal: (quantidade * valorUnitario) + adicionalMao,
        });
      });
    } else if (Array.isArray(orcamento?.produtoIDs) && orcamento.produtoIDs.length > 0) {
      orcamento.produtoIDs.forEach((produtoID) => {
        const quantidade = 1;
        const valorUnitario = getProdutoValorUnitario({ produtoID });
        const adicionalMao = maoDeObraRestante;
        maoDeObraRestante = 0;
        itens.push({
          descricao: getProdutoNome(produtoID),
          quantidade,
          valorUnitario,
          valorTotal: (quantidade * valorUnitario) + adicionalMao,
        });
      });
    }

    if (Array.isArray(orcamento?.servicos) && orcamento.servicos.length > 0) {
      orcamento.servicos.forEach((s) => {
        const quantidade = toNumber(s?.quantidade, 1) || 1;
        const valorUnitario = getServicoValorUnitario(s);
        const adicionalMao = maoDeObraRestante;
        maoDeObraRestante = 0;
        itens.push({
          descricao: getServicoNome(s?.servicoID),
          quantidade,
          valorUnitario,
          valorTotal: (quantidade * valorUnitario) + adicionalMao,
        });
      });
    } else if (Array.isArray(orcamento?.servicoIDs) && orcamento.servicoIDs.length > 0) {
      orcamento.servicoIDs.forEach((servicoID) => {
        const quantidade = 1;
        const valorUnitario = getServicoValorUnitario({ servicoID });
        const adicionalMao = maoDeObraRestante;
        maoDeObraRestante = 0;
        itens.push({
          descricao: getServicoNome(servicoID),
          quantidade,
          valorUnitario,
          valorTotal: (quantidade * valorUnitario) + adicionalMao,
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
                <th className="valor">Valor Total</th>
              </tr>
            </thead>
            <tbody>
              {itensDeOrcamento.map((item, i) => (
                <tr key={i}>
                  <td>{item.descricao}</td>
                  <td>{item.quantidade}</td>
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



