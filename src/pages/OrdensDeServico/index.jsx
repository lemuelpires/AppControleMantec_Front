import React, { useState, useEffect } from 'react';
import { OrdemDeServicoContainer, OrdemDeServicoTitle, OrdemDeServicoButton, OrdemDeServicoTable, BotaoEspacamento } from './style';
import ModalDetalhesOrdemDeServico from '../../components/Modais/OrdemDeServico/ModalDetalhes';
import ModalEdicaoOrdemDeServico from '../../components/Modais/OrdemDeServico/ModalEdicao';
import ModalNovaOrdemDeServico from '../../components/Modais/OrdemDeServico/ModalNovo';
import apiOrdemDeServico from '../../services/apiCliente';
import Modal from 'react-modal';

// Defina o elemento de aplicação para react-modal
Modal.setAppElement('#root');

const OrdemDeServico = () => {
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
  const [isNovaModalOpen, setIsNovaModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [ordensDeServico, setOrdensDeServico] = useState([]);

  useEffect(() => {
    fetchOrdensDeServico();
  }, []);

  const fetchOrdensDeServico = async () => {
    try {
      const response = await apiOrdemDeServico.get('/OrdemDeServico');
      setOrdensDeServico(response.data);
    } catch (error) {
      console.error('Erro ao buscar ordens de serviço:', error);
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

  const openNovaModal = () => {
    setIsNovaModalOpen(true);
  };

  const closeModal = () => {
    setIsDetalhesModalOpen(false);
    setIsEdicaoModalOpen(false);
    setIsNovaModalOpen(false);
    setSelectedItem(null);
  };

  const handleSave = async (formData) => {
    try {
      if (formData.id) {
        // Atualização de ordem de serviço existente
        const response = await apiOrdemDeServico.put(`/OrdemDeServico/${formData.id}`, formData);
        console.log('Ordem de serviço atualizada:', response.data);
      } else {
        // Criação de nova ordem de serviço
        const response = await apiOrdemDeServico.post('/OrdemDeServico', formData);
        console.log('Nova ordem de serviço criada:', response.data);
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
        <OrdemDeServicoButton onClick={openNovaModal}>Adicionar Ordem de Serviço</OrdemDeServicoButton>
      </BotaoEspacamento>
      <OrdemDeServicoTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente ID</th>
            <th>Funcionário ID</th>
            <th>Produto ID</th>
            <th>Serviço ID</th>
            <th>Data de Entrada</th>
            <th>Data de Conclusão</th>
            <th>Status</th>
            <th>Observações</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {ordensDeServico.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.clienteID}</td>
              <td>{item.funcionarioID}</td>
              <td>{item.produtoID}</td>
              <td>{item.servicoID}</td>
              <td>{new Date(item.dataEntrada).toLocaleDateString()}</td>
              <td>{new Date(item.dataConclusao).toLocaleDateString()}</td>
              <td>{item.status}</td>
              <td>{item.observacoes}</td>
              <td>{item.ativo ? 'Sim' : 'Não'}</td>
              <td>
                <button onClick={() => openDetalhesModal(item)}>Detalhes</button>
                <button onClick={() => openEdicaoModal(item)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </OrdemDeServicoTable>

      {/* Modais */}
      <ModalDetalhesOrdemDeServico isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicaoOrdemDeServico isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovaOrdemDeServico isOpen={isNovaModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </OrdemDeServicoContainer>
  );
};

export default OrdemDeServico;
