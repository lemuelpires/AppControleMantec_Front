import React, { useState } from 'react';
import Modal from 'react-modal';
import { storage } from '../../../firebase/firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import styled from 'styled-components';
import apiCliente from '../../../services/apiCliente';

const ModalCadastrarImagem = ({ isOpen, onClose, item }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    const storageRef = ref(storage, `produtos/${item.id}/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on('state_changed', 
      (snapshot) => {
        // Acompanhe o progresso do upload, se necessário
      }, 
      (error) => {
        console.error('Erro no upload:', error);
        setIsUploading(false);
      }, 
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        // Atualize o campo imagemURL do produto com a URL do Firebase
        await apiCliente.put(`/Produto/${item.id}`, { ...item, imagemURL: downloadURL });
        setIsUploading(false);
        onClose();
      }
    );
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Cadastrar Imagem"
    >
      <h2>Cadastrar Imagem para {item?.nome}</h2>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? 'Enviando...' : 'Cadastrar Imagem'}
      </Button>
      <Button onClick={onClose}>Cancelar</Button>
    </StyledModal>
  );
};

export default ModalCadastrarImagem;

// Styled Components
const StyledModal = styled(Modal)`
  &.ReactModal__Overlay {
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.ReactModal__Content {
    background-color: #1f1e1e;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
    inset: unset;
  }
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #333;
  color: #fff;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px 5px 0 0;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }

  &:last-child {
    background-color: #f44336;
  }
`;
