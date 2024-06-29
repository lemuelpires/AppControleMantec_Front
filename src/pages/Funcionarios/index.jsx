import React, { useState, useEffect } from 'react';
import { FuncionariosContainer, FuncionariosTitle, FuncionariosButton, FuncionariosTable, BotaoEspacamento } from './style';
import ModalDetalhesFuncionario from '../../components/Modais/Funcionario/ModalDetalhes';
import ModalEdicaoFuncionario from '../../components/Modais/Funcionario/ModalEdicao';
import ModalNovoFuncionario from '../../components/Modais/Funcionario/ModalNovo';
import apiFuncionario from '../../services/apiCliente';
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
      const response = await apiFuncionario.get('/Funcionario');
      setFuncionarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
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
        const response = await apiFuncionario.put(`/Funcionario/${formData.id}`, formData);
        console.log('Funcionário atualizado:', response.data);
      } else {
        // Criação de novo funcionário
        const response = await apiFuncionario.post('/Funcionario', formData);
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
        <FuncionariosButton onClick={openNovoModal}>Adicionar Funcionário</FuncionariosButton>
      </BotaoEspacamento>
      <FuncionariosTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Data de Contratação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map(funcionario => (
            <tr key={funcionario.id}>
              <td>{funcionario.id}</td>
              <td>{funcionario.nome}</td>
              <td>{funcionario.cargo}</td>
              <td>{funcionario.telefone}</td>
              <td>{funcionario.email}</td>
              <td>{new Date(funcionario.dataContratacao).toLocaleDateString()}</td>
              <td>
                <button onClick={() => openDetalhesModal(funcionario)}>Detalhes</button>
                <button onClick={() => openEdicaoModal(funcionario)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </FuncionariosTable>

      {/* Modais */}
      <ModalDetalhesFuncionario isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicaoFuncionario isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovoFuncionario isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </FuncionariosContainer>
  );
};

export default Funcionarios;
