// src/components/Modais/ModalNovo.js
import React from 'react';
import Modal from 'react-modal';
import Formulario from '../../Forms/FormularioCliente'; // Assumindo que o formulário está em Formularios/Formulario.js

const ModalNovo = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Cadastrar Novo Item</h2>
      <Formulario onSubmit={onSubmit} onClose={onClose} />
    </Modal>
  );
};

export default ModalNovo;
