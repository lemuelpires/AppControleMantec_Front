import React, { useState } from 'react';
import { storage } from '../../../firebase/firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import apiCliente from '../../../services/apiCliente';
import { StyledModal, Input, Button, PreviewImage, ProgressBar, ButtonGroup, UploadIcon } from './style';

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
      style={{
        overlay: {
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        content: {
          position: 'relative',
          top: 'auto',
          left: 'auto',
          right: 'auto',
          bottom: 'auto',
          margin: 'auto',
          transform: 'none'
        }
      }}
      parentSelector={() => document.body}
      ariaHideApp={false}
    >
      <UploadIcon />
      <h2>📸 Cadastrar Imagem</h2>
      <p style={{ 
        textAlign: 'center', 
        color: 'rgba(107, 114, 128, 0.8)', 
        fontSize: '0.8rem',
        margin: '0 0 0.8rem 0',
        fontWeight: '500',
        lineHeight: '1.3'
      }}>
        🏷️ {item?.nome}
      </p>
      
      {previewImage && <PreviewImage src={previewImage} alt="Preview" />}
      
      <Input 
        type="file" 
        onChange={handleFileChange}
        accept="image/*"
        placeholder="Selecione uma imagem..."
      />
      
      {isUploading && (
        <div style={{ margin: '0.6rem 0' }}>
          <p style={{ 
            textAlign: 'center', 
            color: '#6366f1', 
            fontSize: '0.75rem',
            fontWeight: '600',
            marginBottom: '0.3rem'
          }}>
            ⬆️ Enviando imagem...
          </p>
          <ProgressBar progress={uploadProgress} />
        </div>
      )}
      
      <ButtonGroup>
        <Button 
          primary 
          onClick={handleUpload} 
          disabled={isUploading || !selectedFile}
        >
          {isUploading ? '⏳ Enviando...' : '✅ Cadastrar Imagem'}
        </Button>
        <Button onClick={onClose}>
          ❌ Cancelar
        </Button>
      </ButtonGroup>
    </StyledModal>
  );
};

export default ModalCadastrarImagem;
