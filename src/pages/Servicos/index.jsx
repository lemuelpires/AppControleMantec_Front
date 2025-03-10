import React, { useState, useEffect } from 'react';
import { ServicoContainer, ServicoTitle, ServicoButton, ServicoTable, BotaoEspacamento } from './style';
import ModalDetalhesServico from '../../components/Modais/Servico/ModalDetalhes';
import ModalEdicaoServico from '../../components/Modais/Servico/ModalEdicao';
import ModalNovoServico from '../../components/Modais/Servico/ModalNovo';
import apiServico from '../../services/apiCliente';
import Modal from 'react-modal';
import { FaPlus, FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons

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
      setServicos(response.data.filter(servico => servico.ativo)); // Exibir apenas serviços ativos
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm('Deseja excluir esse serviço?');
    if (confirmar) {
      try {
        const response = await apiServico.delete(`/Servico/Desativar/${id}`);
        console.log('Serviço Excluído:', response.data);
        fetchServicos(); // Atualiza lista de serviços após desativar
        alert('Serviço excluído com sucesso!');
      } catch (error) {
        if (error.response) {
          console.error('Erro ao desativar serviço:', error.response.data);
        } else {
          console.error('Erro desconhecido ao desativar serviço:', error.message);
        }
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
        <ServicoButton onClick={openNovoModal}>
          <FaPlus />
        </ServicoButton>
      </BotaoEspacamento>
      <ServicoTable>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th style={{ textAlign: 'center' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map(servico => (
            <tr key={servico.id}>
              <td>{servico.nome}</td>
              <td>{servico.descricao}</td>
              <td>R${servico.preco},00</td>
              <td style={{ textAlign: 'center' }}>
                <i onClick={() => openDetalhesModal(servico)} className="fas fa-eye"></i>
                <i onClick={() => openEdicaoModal(servico)} className="fas fa-edit"></i>
                <i onClick={() => handleExcluir(servico.id)} className="fas fa-trash-alt"></i>
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
