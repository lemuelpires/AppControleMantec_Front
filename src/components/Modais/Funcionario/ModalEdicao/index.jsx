import React from 'react';
import Modal from 'react-modal';
import FormularioFuncionario from '../../../Forms/FormularioFuncionario';
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
    padding: '50px',
    borderRadius: '8px',
    width: '50%',
    position: 'none',
  },
};

const ModalEdicaoFuncionario = ({ isOpen, onClose, item, onSubmit }) => {
  // Garante que dataAtualizacao tenha valor
  const dadosCompletos = {
  ...item,
  dataContratacao: item?.dataContratacao
    ? new Date(item.dataContratacao).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10),
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
        <h2>Editar Funcionário</h2>
      </Titulo>

      {item && (
        <FormularioFuncionario
          initialValues={dadosCompletos} // <== agora sim está usando os dados ajustados
          onSubmit={onSubmit}
          onClose={onClose}
        />
      )}
    </Modal>
  );
};

export default ModalEdicaoFuncionario;
