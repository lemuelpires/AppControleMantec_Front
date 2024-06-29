import React from 'react';
import Modal from 'react-modal';
import Formulario from '../../Forms/FormularioCliente'; // Assumindo que o formulário está em Formularios/Formulario.js

const ModalNovo = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Cadastrar Novo Cliente</h2>
      <Formulario onSubmit={onSubmit} onClose={onClose} />
    </Modal>
  );
};

export default ModalNovo;
