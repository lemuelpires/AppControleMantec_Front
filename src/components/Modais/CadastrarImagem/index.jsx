import React, { useState } from 'react';
import { storage } from '../../../firebase/firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import apiCliente from '../../../services/apiCliente';
import { StyledModal, Input, Button, PreviewImage, ProgressBar } from './style';

const ModalCadastrarImagem = ({ isOpen, onClose, item }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    const storageRef = ref(storage, `produtos/${item.id}/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      }, 
      (error) => {
        console.error('Erro no upload:', error);
        setIsUploading(false);
      }, 
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
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
      {previewImage && <PreviewImage src={previewImage} alt="Preview" />}
      <Input type="file" onChange={handleFileChange} />
      {isUploading && <ProgressBar progress={uploadProgress} />}
      <Button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? 'Enviando...' : 'Cadastrar Imagem'}
      </Button>
      <Button onClick={onClose}>Cancelar</Button>
    </StyledModal>
  );
};

export default ModalCadastrarImagem;
