import React from 'react';
import Modal from 'react-modal';
import Formulario from '../../Forms/FormularioCliente'; // Assumindo que o formulário está em Formularios/Formulario.js

const ModalEdicao = ({ isOpen, onClose, item, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Editar Cliente</h2>
      <Formulario initialValues={item} onSubmit={onSubmit} onClose={onClose} />
    </Modal>
  );
};

export default ModalEdicao;
