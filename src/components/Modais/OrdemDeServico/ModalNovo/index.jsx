import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import FormularioOrdemDeServico from '../../../Forms/FormularioOrdemDeServico';
import apiCliente from '../../../../services/apiCliente';

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    backgroundColor: 'transparent',
    padding: '1rem',
    border: 'none',
    borderRadius: '0',
    boxShadow: 'none',
    maxWidth: '750px',
    width: '95%',
    maxHeight: '90vh',
    inset: 'unset',
    zIndex: 10000,
    position: 'relative',
    overflow: 'auto',
  },
};

const ModalNovaOrdemDeServico = ({ isOpen, onClose }) => {
  const [clienteOptions, setClienteOptions] = useState([]);
  const [funcionarioOptions, setFuncionarioOptions] = useState([]);
  const [produtoOptions, setProdutoOptions] = useState([]);
  const [servicoOptions, setServicoOptions] = useState([]);
  const [formData, setFormData] = useState({
    clienteID: '',
    funcionarioID: '',
    produtos: [{ produtoID: '', quantidade: 1 }],
    servicos: [{ servicoID: '', quantidade: 1 }],
    dataEntrada: '',
    dataConclusao: '',
    status: '',
    observacoes: '',
    ativo: true,
  });

  useEffect(() => {
    fetchClientes();
    fetchFuncionarios();
    fetchProdutos();
    fetchServicos();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await apiCliente.get('/Cliente');
      const clientes = response.data.filter(cliente => cliente.ativo).map(cliente => ({
        value: cliente.id,
        label: cliente.nome,
      }));
      setClienteOptions(clientes);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const fetchFuncionarios = async () => {
    try {
      const response = await apiCliente.get('/Funcionario');
      const funcionarios = response.data.filter(funcionario => funcionario.ativo).map(funcionario => ({
        value: funcionario.id,
        label: funcionario.nome,
      }));
      setFuncionarioOptions(funcionarios);
    } catch (error) {
      console.error('Erro ao buscar funcionÃ¡rios:', error);
    }
  };

  const fetchProdutos = async () => {
    try {
      const response = await apiCliente.get('/Produto');
      // Filtra apenas produtos ativos e com quantidade > 1
      const produtos = response.data
        .filter(produto => produto.ativo)
        .map(produto => ({
          value: produto.id,
          label: produto.nome,
          preco: produto.preco,
          quantidade: produto.quantidade // Adiciona quantidade para exibir no select
        }));
      setProdutoOptions(produtos);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const fetchServicos = async () => {
    try {
      const response = await apiCliente.get('/Servico');
      const servicos = response.data.filter(servico => servico.ativo).map(servico => ({
        value: servico.id,
        label: servico.nome,
      }));
      setServicoOptions(servicos);
    } catch (error) {
      console.error('Erro ao buscar serviÃ§os:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      console.log('Dados do formulário antes do envio:', formData);

      const dataEntrada = formData.dataEntrada ? new Date(formData.dataEntrada).toISOString() : null;
      const dataConclusao = formData.dataConclusao ? new Date(formData.dataConclusao).toISOString() : null;

      // Preparar dados mantendo compatibilidade com backend atual
      const ordemDeServicoDto = {
        ...formData,
        dataEntrada,
        dataConclusao,
        produtoID: formData.produtos?.[0]?.produtoID || null,
        servicoID: formData.servicos?.[0]?.servicoID || null,
        quantidadeProduto: formData.produtos?.[0]?.quantidade || 1,
        quantidadeServico: formData.servicos?.[0]?.quantidade || 1,
        produtos: formData.produtos || [],
        servicos: formData.servicos || [],
        // Ajuste de tipos para o backend
        valorMaoDeObra: formData.valorMaoDeObra ? parseFloat(formData.valorMaoDeObra) : 0,
        valorPecas: formData.valorPecas ? parseFloat(formData.valorPecas) : 0,
        valorTotal: formData.valorTotal ? parseFloat(formData.valorTotal) : 0,
        pago: !!formData.pago,
        ativo: !!formData.ativo,
        numeroOS: formData.numeroOS ? parseInt(formData.numeroOS) : 0,
        emGarantia: !!formData.emGarantia,
        pecasUtilizadas: Array.isArray(formData.produtos)
          ? formData.produtos.map(p => ({
              ProdutoID: p.produtoID,
              Quantidade: parseInt(p.quantidade) || 1
            }))
          : []
      };

      console.log('DTO a ser enviado:', ordemDeServicoDto);

      const response = await apiCliente.post('/OrdemDeServico', ordemDeServicoDto);
      console.log('Ordem de Serviço criada:', response.data);

      // Baixa de estoque apenas se status for "Concluido"
      if (formData.status === "Concluido") {
        // Se vier pelo campo produtos (formato novo)
        if (Array.isArray(formData.produtos) && formData.produtos.length > 0) {
          for (const produto of formData.produtos) {
            if (produto.produtoID && produto.quantidade) {
              const produtoAtual = await apiCliente.get(`/Produto/${produto.produtoID}`);
              const quantidadeAtual = Number(produtoAtual.data.quantidade) || 0;
              const quantidadeBaixa = Number(produto.quantidade) || 0;
              const novaQuantidade = quantidadeAtual - quantidadeBaixa;
              await apiCliente.put(`/Produto/${produto.produtoID}`, {
                ...produtoAtual.data,
                quantidade: novaQuantidade
              });
            }
          }
        }
        // Se vier pelo campo produtoIDs (formato antigo)
        else if (Array.isArray(formData.produtoIDs) && formData.produtoIDs.length > 0) {
          for (const produtoID of formData.produtoIDs) {
            const produtoAtual = await apiCliente.get(`/Produto/${produtoID}`);
            const quantidadeAtual = Number(produtoAtual.data.quantidade) || 0;
            // Usa quantidadeProduto do DTO ou 1 como padrão
            const quantidadeBaixa = Number(formData.quantidadeProduto) || 1;
            const novaQuantidade = quantidadeAtual - quantidadeBaixa;
            await apiCliente.put(`/Produto/${produtoID}`, {
              ...produtoAtual.data,
              quantidade: novaQuantidade
            });
          }
        }
      }

      onClose();
    } catch (error) {
      console.error('Erro ao salvar ordem de serviço:', error.response ? error.response.data : error.message);
    }
  };

  // Ao preparar os dados para envio:
  const handleCreate = async () => {
    // ...existing code...
    const dataEntradaFormatada = dataEntrada ? new Date(dataEntrada).toISOString().slice(0, 10) : null;
    const dataConclusaoFormatada = dataConclusao ? new Date(dataConclusao).toISOString().slice(0, 10) : null;
    // ...existing code...
    const ordemData = {
        // ...existing code...
        dataEntrada: dataEntradaFormatada,
        dataConclusao: dataConclusaoFormatada,
        // ...existing code...
    };
    // ...existing code...
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayElement={(props, contentElement) => (
        <div {...props}>{contentElement}</div>
      )}
      contentElement={(props, children) => (
        <div {...props}>{children}</div>
      )}
      style={modalStyles}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
        <FormularioOrdemDeServico
          title="Nova Ordem de Serviço"
          initialValues={formData}
          onSubmit={handleSubmit}
          onClose={onClose}
          clienteOptions={clienteOptions}
          funcionarioOptions={funcionarioOptions}
          produtoOptions={produtoOptions}
          servicoOptions={servicoOptions}
        />
      </div>
    </Modal>
  );
};

export default ModalNovaOrdemDeServico;

