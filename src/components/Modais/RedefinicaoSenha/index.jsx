import React, { useState } from 'react';
import { ModalContainer, ModalContent, CloseButton, Input, Label } from './style';
import { auth } from '../../../firebase/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const ResetPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleResetPassword = async () => {
    if (!email) {
      setError('Por favor, insira um email válido para recuperação.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.');
      setEmail(''); // Limpa o campo de email após o envio
      onClose();
    } catch (error) {
      console.error('Erro ao enviar email de recuperação:', error);
      setError('Erro ao enviar email de recuperação. Verifique o email e tente novamente.');
    }
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <ModalContent>
        <CloseButton onClick={onClose}>x</CloseButton>
        <h2>Redefinir Senha</h2>
        <Label>
          E-mail:
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleResetPassword}>Enviar Email de Recuperação</button>
      </ModalContent>
    </ModalContainer>
  );
};

export default ResetPasswordModal;
