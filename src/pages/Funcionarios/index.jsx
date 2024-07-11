import React, { useState, useEffect } from 'react';
import { FuncionariosContainer, FuncionariosTitle, FuncionariosButton, FuncionariosTable, BotaoEspacamento } from './style';
import ModalDetalhes from '../../components/Modais/Funcionario/ModalDetalhes';
import ModalEdicaoFuncionario from '../../components/Modais/Funcionario/ModalEdicao'; // Import atualizado
import ModalNovo from '../../components/Modais/Funcionario/ModalNovo';
import apiCliente from '../../services/apiCliente';
import Modal from 'react-modal';

// Defina o elemento de aplicação para react-modal
Modal.setAppElement('#root');

const Funcionarios = () => {
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    try {
      const response = await apiCliente.get('/Funcionario');
      setFuncionarios(response.data.filter(funcionario => funcionario.ativo)); // Exibir apenas funcionários ativos
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
    }
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm('Deseja excluir esse funcionário?');
    if (confirmar) {
      try {
        const response = await apiCliente.delete(`/Funcionario/Desativar/${id}`);
        console.log('Funcionário Excluído:', response.data);
        fetchFuncionarios(); // Atualiza lista de funcionários após desativar
        alert('Funcionário excluído com sucesso!');
      } catch (error) {
        if (error.response) {
          console.error('Erro ao desativar funcionário:', error.response.data);
        } else {
          console.error('Erro desconhecido ao desativar funcionário:', error.message);
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
        // Atualização de funcionário existente
        const response = await apiCliente.put(`/Funcionario/${formData.id}`, formData);
        console.log('Funcionário atualizado:', response.data);
      } else {
        // Criação de novo funcionário
        const response = await apiCliente.post('/Funcionario', formData);
        console.log('Novo funcionário criado:', response.data);
      }
      fetchFuncionarios(); // Atualiza lista de funcionários após salvar
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error);
    }
  };

  return (
    <FuncionariosContainer>
      <FuncionariosTitle>Funcionários</FuncionariosTitle>
      <BotaoEspacamento>
        <FuncionariosButton onClick={openNovoModal}>Adicionar</FuncionariosButton>
      </BotaoEspacamento>
      <FuncionariosTable>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th style={{textAlign:'center'}}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map(funcionario => (
            <tr key={funcionario.id}>
              <td>{funcionario.nome}</td>
              <td>{funcionario.cargo}</td>
              <td>{funcionario.telefone}</td>
              <td>{funcionario.email}</td>
              <td style={{textAlign:'center'}}>
                <button onClick={() => openDetalhesModal(funcionario)}>Detalhes</button>
                <button onClick={() => openEdicaoModal(funcionario)} >Editar</button>
                <button onClick={() => handleExcluir(funcionario.id)} >Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </FuncionariosTable>

      {/* Modais */}
      <ModalDetalhes isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicaoFuncionario isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovo isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </FuncionariosContainer>
  );
};

export default Funcionarios;
