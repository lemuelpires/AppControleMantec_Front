import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import FormularioOrdemDeServico from '../../../Forms/FormularioOrdemDeServico'; // Importe o formulário de ordem de serviço
import { Titulo } from './style';

// Definir as classes do Modal
const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#1f1e1e',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
    inset: 'unset',
  },
};

const ModalNovaOrdemDeServico = ({ isOpen, onClose, onSubmit }) => {
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);
  const [selectedProduto, setSelectedProduto] = useState(null);
  const [selectedServico, setSelectedServico] = useState(null);

  const initialValues = {
    clienteID: '',
    funcionarioID: '',
    produtoID: '',
    servicoID: '',
    dataEntrada: '',
    dataConclusao: '',
    status: '',
    observacoes: '',
    ativo: true,
  };

  useEffect(() => {
    // Coloque aqui qualquer inicialização necessária ao abrir o modal
  }, []);

  const handleSelectCliente = (selectedOption) => {
    setSelectedCliente(selectedOption);
  };

  const handleSelectFuncionario = (selectedOption) => {
    setSelectedFuncionario(selectedOption);
  };

  const handleSelectProduto = (selectedOption) => {
    setSelectedProduto(selectedOption);
  };

  const handleSelectServico = (selectedOption) => {
    setSelectedServico(selectedOption);
  };

  const handleSubmit = async (formData) => {
    try {
      // Aqui você pode adicionar validações ou formatações antes de enviar para o onSubmit
      onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar ordem de serviço:', error);
    }
  };

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
      <Titulo>
        <h2>Adicionar Ordem de Serviço</h2>
      </Titulo>
      <FormularioOrdemDeServico
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    </Modal>
  );
};

export default ModalNovaOrdemDeServico;
