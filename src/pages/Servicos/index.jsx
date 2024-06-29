import React, { useState, useEffect } from 'react';
import { ServicoContainer, ServicoTitle, ServicoButton, ServicoTable, BotaoEspacamento } from './style';
import ModalDetalhesServico from '../../components/Modais/Servico/ModalDetalhes';
import ModalEdicaoServico from '../../components/Modais/Servico/ModalEdicao';
import ModalNovoServico from '../../components/Modais/Servico/ModalNovo';
import apiServico from '../../services/apiCliente';
import Modal from 'react-modal';

// Defina o elemento de aplicação para react-modal
Modal.setAppElement('#root');

const Servico = () => {
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    fetchServicos();
  }, []);

  const fetchServicos = async () => {
    try {
      const response = await apiServico.get('/Servico');
      setServicos(response.data);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
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
        // Atualização de serviço existente
        const response = await apiServico.put(`/Servico/${formData.id}`, formData);
        console.log('Serviço atualizado:', response.data);
      } else {
        // Criação de novo serviço
        const response = await apiServico.post('/Servico', formData);
        console.log('Novo serviço criado:', response.data);
      }
      fetchServicos(); // Atualiza lista de serviços após salvar
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
    }
  };

  return (
    <ServicoContainer>
      <ServicoTitle>Serviços</ServicoTitle>
      <BotaoEspacamento>
        <ServicoButton onClick={openNovoModal}>Adicionar Serviço</ServicoButton>
      </BotaoEspacamento>
      <ServicoTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.descricao}</td>
              <td>{item.preco}</td>
              <td>{item.ativo ? 'Sim' : 'Não'}</td>
              <td>
                <button onClick={() => openDetalhesModal(item)}>Detalhes</button>
                <button onClick={() => openEdicaoModal(item)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </ServicoTable>

      {/* Modais */}
      <ModalDetalhesServico isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicaoServico isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovoServico isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </ServicoContainer>
  );
};

export default Servico;
