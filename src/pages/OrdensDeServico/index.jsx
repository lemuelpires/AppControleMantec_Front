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

  useEffect(() => {
    fetchOrdensDeServico();
  }, []);

  const fetchOrdensDeServico = async () => {
    try {
      const response = await apiCliente.get('/OrdemDeServico');
      const ordensAtivas = response.data.filter(ordem => ordem.ativo); // Filtrar apenas ordens ativas
      setOrdensDeServico(ordensAtivas);
    } catch (error) {
      console.error('Erro ao buscar ordens de serviço:', error);
    }
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm('Deseja excluir esta ordem de serviço?');
    if (confirmar) {
      try {
        const response = await apiCliente.put(`/OrdemDeServico/desativar/${id}`);
        console.log('Ordem de Serviço Excluída:', response.data);
        fetchOrdensDeServico(); // Atualiza lista de ordens de serviço após excluir
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
      if (formData.id) {
        // Atualização de ordem de serviço existente
        const response = await apiCliente.put(`/OrdemDeServico/${formData.id}`, formData);
        console.log('Ordem de Serviço atualizada:', response.data);
      } else {
        // Criação de nova ordem de serviço
        const response = await apiCliente.post('/OrdemDeServico', formData);
        console.log('Nova Ordem de Serviço criada:', response.data);
      }
      fetchOrdensDeServico(); // Atualiza lista de ordens de serviço após salvar
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar ordem de serviço:', error);
    }
  };

  return (
    <OrdemDeServicoContainer>
      <OrdemDeServicoTitle>Ordens de Serviço</OrdemDeServicoTitle>
      <BotaoEspacamento>
        <OrdemDeServicoButton onClick={openNovoModal}>Adicionar Ordem de Serviço</OrdemDeServicoButton>
      </BotaoEspacamento>
      <OrdemDeServicoTable>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Funcionário</th>
            <th>Produto</th>
            <th>Serviço</th>
            <th>Data de Entrada</th>
            <th>Data de Conclusão</th>
            <th>Status</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {ordensDeServico.map(ordem => (
            <tr key={ordem.id}>
              <td>{ordem.clienteID}</td>
              <td>{ordem.funcionarioID}</td>
              <td>{ordem.produtoID}</td>
              <td>{ordem.servicoID}</td>
              <td>{ordem.dataEntrada}</td>
              <td>{ordem.dataConclusao}</td>
              <td>{ordem.status}</td>
              <td>{ordem.observacoes}</td>
              <td>
                <button onClick={() => openDetalhesModal(ordem)}>Detalhes</button>
                <button onClick={() => openEdicaoModal(ordem)}>Editar</button>
                <button onClick={() => handleExcluir(ordem.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </OrdemDeServicoTable>

      {/* Modais */}
      <ModalDetalhesOrdemDeServico isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicaoOrdemDeServico isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} onUpdateListaOrdens={fetchOrdensDeServico} />
      <ModalNovoOrdemDeServico isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} onUpdateListaOrdens={fetchOrdensDeServico} />
    </OrdemDeServicoContainer>
  );
};

export default OrdemDeServico;
