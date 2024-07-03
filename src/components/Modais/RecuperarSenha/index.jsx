import React, { useState } from 'react';
import { ModalContainer, ModalContent, CloseButton, Input, Label } from './style'; // Importe os estilos conforme necessário
import { auth, sendPasswordResetEmail } from 'firebase/auth'; // Importe diretamente do firebase/auth

const ModalRecuperarSenha = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      console.log(`E-mail de redefinição de senha enviado para ${email}. Verifique seu e-mail.`);
      // Lógica adicional após enviar o e-mail de redefinição de senha, como fechar o modal
      onClose();
    } catch (error) {
      console.error('Erro ao enviar e-mail de redefinição de senha:', error.message);
      setError('Erro ao enviar e-mail de redefinição de senha. Verifique seu e-mail.');
    }
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <h2>Recuperar Senha</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Enviar</button>
        </form>
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalRecuperarSenha;
