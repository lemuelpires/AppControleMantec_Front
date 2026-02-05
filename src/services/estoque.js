import apiCliente from './apiCliente';

const normalizeStatus = (status) =>
  String(status || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

export const isStatusConcluido = (status) => normalizeStatus(status) === 'concluido';

const toNumber = (value, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const mapProdutosValidos = (produtos = []) =>
  (Array.isArray(produtos) ? produtos : [])
    .map((item) => ({
      produtoID: item?.produtoID || item?.ProdutoID || item?.id || '',
      quantidade: toNumber(item?.quantidade ?? item?.Quantidade, 0),
    }))
    .filter((item) => item.produtoID && item.quantidade > 0);

export const ajustarEstoquePorProdutos = async (produtos = [], direction = -1) => {
  const itens = mapProdutosValidos(produtos);
  if (!itens.length) return;

  let estoqueList = [];
  try {
    const estoqueResp = await apiCliente.get('/Estoque');
    estoqueList = Array.isArray(estoqueResp.data) ? estoqueResp.data : [];
  } catch (error) {
    console.error('Erro ao buscar estoque:', error);
  }

  const estoqueMap = new Map(
    estoqueList.map((item) => [String(item.produtoID), item])
  );

  for (const item of itens) {
    const produtoID = String(item.produtoID);
    const delta = direction * item.quantidade;
    const estoqueItem = estoqueMap.get(produtoID);

    let baseQuantidade = toNumber(estoqueItem?.quantidade, NaN);
    if (!Number.isFinite(baseQuantidade)) {
      try {
        const produtoResp = await apiCliente.get(`/Produto/${produtoID}`);
        baseQuantidade = toNumber(produtoResp?.data?.quantidade, 0);
      } catch (error) {
        console.error(`Erro ao buscar produto ${produtoID} para ajuste de estoque:`, error);
        baseQuantidade = 0;
      }
    }

    let novaQuantidade = baseQuantidade + delta;
    if (novaQuantidade < 0) {
      console.warn(`Estoque negativo para produto ${produtoID}. Ajustando para 0.`);
      novaQuantidade = 0;
    }

    const dataAtualizacao = new Date().toISOString();

    try {
      if (estoqueItem) {
        await apiCliente.put(`/Estoque/${produtoID}`, {
          ...estoqueItem,
          produtoID,
          quantidade: novaQuantidade,
          dataAtualizacao,
        });
      } else {
        await apiCliente.post('/Estoque', {
          produtoID,
          quantidade: novaQuantidade,
          dataAtualizacao,
          ativo: true,
        });
      }
    } catch (error) {
      console.error(`Erro ao atualizar estoque do produto ${produtoID}:`, error);
    }

    try {
      await apiCliente.put(`/Produto/${produtoID}`, { quantidade: novaQuantidade });
    } catch (error) {
      console.error(`Erro ao atualizar quantidade do produto ${produtoID}:`, error);
    }
  }
};
