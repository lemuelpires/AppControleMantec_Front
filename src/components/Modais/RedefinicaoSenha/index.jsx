import React, { useState } from 'react';
import { ModalContainer, ModalContent, CloseButton, Input, Label, Button, ErrorMessage, SuccessMessage, InputGroup } from './style';
import { auth } from '../../../firebase/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const ResetPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      setError('Por favor, insira um email válido para recuperação.');
      setSuccess(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      setEmail(''); // Limpa o campo de email após o envio
      
      // Fecha o modal após 2 segundos para que o usuário veja a mensagem de sucesso
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Erro ao enviar email de recuperação:', error);
      setError('Erro ao enviar email de recuperação. Verifique o email e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <ModalContent>
        <CloseButton onClick={onClose} type="button">
          ×
        </CloseButton>
        
        <h2>🔐 Redefinir Senha</h2>
        
        <p className="subtitle">
          Digite seu email cadastrado para receber as instruções de recuperação de senha.
        </p>
        
        <InputGroup>
          <Input
            type="email"
            placeholder="Digite seu email..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            disabled={isLoading}
            required
          />
        </InputGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && (
          <SuccessMessage>
            Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.
          </SuccessMessage>
        )}
        
        <Button 
          onClick={handleResetPassword} 
          disabled={isLoading || !email.trim()}
        >
          {isLoading ? '📤 Enviando...' : '🚀 Enviar Email de Recuperação'}
        </Button>
      </ModalContent>
    </ModalContainer>
  );
};

export default ResetPasswordModal;
