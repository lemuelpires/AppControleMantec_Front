import React, { useState, useEffect } from 'react';
import { OrdemDeServicoContainer, OrdemDeServicoTitle, OrdemDeServicoButton, OrdemDeServicoTable, BotaoEspacamento } from './style';
import ModalDetalhesOrdemDeServico from '../../components/Modais/OrdemDeServico/ModalDetalhes';
import ModalEdicaoOrdemDeServico from '../../components/Modais/OrdemDeServico/ModalEdicao';
import ModalNovoOrdemDeServico from '../../components/Modais/OrdemDeServico/ModalNovo';
import apiCliente from '../../services/apiCliente';
import Modal from 'react-modal';

// Definir o elemento de aplicação para react-modal
Modal.setAppElement('#root');

const OrdemDeServico = () => {
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [ordensDeServico, setOrdensDeServico] = useState([]);
  const [clientes, setClientes] = useState({});
  const [funcionarios, setFuncionarios] = useState({});
  const [produtos, setProdutos] = useState({});
  const [servicos, setServicos] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrdensDeServico();
  }, []);

  const fetchOrdensDeServico = async () => {
    try {
      const response = await apiCliente.get('/OrdemDeServico');
      const ordensAtivas = response.data.filter(ordem => ordem.ativo); // Filtrar apenas ordens ativas
      setOrdensDeServico(ordensAtivas);

      // Buscar detalhes de clientes, funcionários, produtos e serviços
      const clientesIds = new Set(ordensAtivas.map(ordem => ordem.clienteID));
      const funcionariosIds = new Set(ordensAtivas.map(ordem => ordem.funcionarioID));
      const produtosIds = new Set(ordensAtivas.map(ordem => ordem.produtoID));
      const servicosIds = new Set(ordensAtivas.map(ordem => ordem.servicoID));

      await Promise.all([
        fetchClientes(clientesIds),
        fetchFuncionarios(funcionariosIds),
        fetchProdutos(produtosIds),
        fetchServicos(servicosIds)
      ]);
    } catch (error) {
      console.error('Erro ao buscar ordens de serviço:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClientes = async (ids) => {
    try {
      const clientesData = {};
      await Promise.all(Array.from(ids).map(async clienteID => {
        if (!clientes[clienteID]) {
          const response = await apiCliente.get(`/Cliente/${clienteID}`);
          clientesData[clienteID] = response.data.nome;
        }
      }));
      setClientes(prevState => ({ ...prevState, ...clientesData }));
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const fetchFuncionarios = async (ids) => {
    try {
      const funcionariosData = {};
      await Promise.all(Array.from(ids).map(async funcionarioID => {
        if (!funcionarios[funcionarioID]) {
          const response = await apiCliente.get(`/Funcionario/${funcionarioID}`);
          funcionariosData[funcionarioID] = response.data.nome;
        }
      }));
      setFuncionarios(prevState => ({ ...prevState, ...funcionariosData }));
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
    }
  };

  const fetchProdutos = async (ids) => {
    try {
      const produtosData = {};
      await Promise.all(Array.from(ids).map(async produtoID => {
        if (!produtos[produtoID]) {
          const response = await apiCliente.get(`/Produto/${produtoID}`);
          produtosData[produtoID] = response.data.nome;
        }
      }));
      setProdutos(prevState => ({ ...prevState, ...produtosData }));
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const fetchServicos = async (ids) => {
    try {
      const servicosData = {};
      await Promise.all(Array.from(ids).map(async servicoID => {
        if (!servicos[servicoID]) {
          const response = await apiCliente.get(`/Servico/${servicoID}`);
          servicosData[servicoID] = response.data.nome;
        }
      }));
      setServicos(prevState => ({ ...prevState, ...servicosData }));
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm('Deseja excluir esta ordem de serviço?');
    if (confirmar) {
      try {
        await apiCliente.put(`/OrdemDeServico/desativar/${id}`);
        await fetchOrdensDeServico(); // Atualiza lista de ordens de serviço após excluir
        alert('Ordem de Serviço excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir ordem de serviço:', error);
      }
    }
  };

  const openDetalhesModal = (item) => {
    setSelectedItem(item);
    setIsDetalhesModalOpen(true);
  };

  const openEdicaoModal = (item) => {
    setSelectedItem(item);
    setIsEdicaoModalOpen(true);
  };

  const openNovoModal = () => {
    setSelectedItem(null);
    setIsNovoModalOpen(true);
  };

  const closeModal = () => {
    setIsDetalhesModalOpen(false);
    setIsEdicaoModalOpen(false);
    setIsNovoModalOpen(false);
    setSelectedItem(null);
  };

  const handleSave = async (formData) => {
    try {
      let response;
      if (formData.id) {
        // Atualização de ordem de serviço existente
        response = await apiCliente.put(`/OrdemDeServico/${formData.id}`, formData);
        console.log('Ordem de Serviço atualizada:', response.data);
      } else {
        // Criação de nova ordem de serviço
        response = await apiCliente.post('/OrdemDeServico', formData);
        console.log('Nova Ordem de Serviço criada:', response.data);
        await fetchOrdensDeServico();
      }
      await fetchOrdensDeServico(); // Atualiza lista de ordens de serviço após salvar
    } catch (error) {
      console.error('Erro ao salvar ordem de serviço:', error);
    }
  };

  return (
    <OrdemDeServicoContainer>
      <OrdemDeServicoTitle>Ordens de Serviço</OrdemDeServicoTitle>
      <BotaoEspacamento>
        <OrdemDeServicoButton onClick={openNovoModal}>Adicionar</OrdemDeServicoButton>
      </BotaoEspacamento>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <OrdemDeServicoTable>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Funcionário</th>
              <th>Produto</th>
              <th>Serviço</th>
              <th>Data de Entrada</th>
              <th>Data de Conclusão</th>
              <th style={{textAlign:'center'}}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {ordensDeServico.map(ordem => (
              <tr key={ordem.id}>
                <td>{clientes[ordem.clienteID]}</td>
                <td>{funcionarios[ordem.funcionarioID]}</td>
                <td>{produtos[ordem.produtoID]}</td>
                <td>{servicos[ordem.servicoID]}</td>
                <td>{new Date(ordem.dataEntrada).toLocaleDateString()}</td>
                <td>{ordem.dataConclusao ? new Date(ordem.dataConclusao).toLocaleDateString() : '-'}</td>
                <td>
                  <button onClick={() => openDetalhesModal(ordem)}>Detalhes</button>
                  <button onClick={() => openEdicaoModal(ordem)}>Editar</button>
                  <button onClick={() => handleExcluir(ordem.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </OrdemDeServicoTable>
      )}
      <ModalDetalhesOrdemDeServico isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicaoOrdemDeServico isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovoOrdemDeServico isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </OrdemDeServicoContainer>
  );
};

export default OrdemDeServico;
