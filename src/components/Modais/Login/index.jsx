import React, { useState } from 'react';
import { CloseButton, LoginForm, ModalContainer, ModalContent, Input, Label } from './style';
import { auth } from '../../../firebase/firebaseConfig'; // Importe signInWithEmailAndPassword e sendPasswordResetEmail
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'; // Importe diretamente de firebase/auth
import ModalCadastroUsuario from '../CadastroUsuario/index'; // Importe o modal de cadastro

const ModalLogin = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isCadastroOpen, setIsCadastroOpen] = useState(false); // Estado para controlar a abertura do modal de cadastro
  const [resetEmail, setResetEmail] = useState(''); // Estado para o email de recuperação de senha

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login efetuado com sucesso!');
      onClose();
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Credenciais incorretas. Verifique seus dados e tente novamente.');
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert('Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.');
      setResetEmail(''); // Limpa o campo de email de recuperação após o envio
    } catch (error) {
      console.error('Erro ao enviar email de recuperação:', error);
      setError('Erro ao enviar email de recuperação. Verifique o email e tente novamente.');
    }
  };

  const handleCadastro = (userData) => {
    // Lógica para cadastrar usuário (a implementação depende de como você vai gerenciar isso no Firebase ou na API)
    console.log('Dados do novo usuário:', userData);
    // Fechar o modal de cadastro após a submissão
    setIsCadastroOpen(false);
  };

  const openCadastroModal = () => {
    setIsCadastroOpen(true); // Abrir o modal de cadastro ao clicar em "Cadastrar"
  };

  return (
    <>
      <ModalContainer isOpen={isOpen}>
        <ModalContent>
          <CloseButton onClick={onClose}>X</CloseButton>
          <h2>Login</h2>
          <LoginForm onSubmit={handleSubmit}>
            <Label>
              E-mail:
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Label>
            <Label>
              Senha:
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Label>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Conectar</button>
          </LoginForm>
          <div>
            <a href="#" onClick={handleForgotPassword}>Esqueci a senha</a> | <a href="#" onClick={openCadastroModal}>Cadastrar</a>
          </div>
        </ModalContent>
      </ModalContainer>
      
      {/* Renderização condicional do modal de cadastro */}
      {isCadastroOpen && (
        <ModalCadastroUsuario isOpen={isCadastroOpen} onClose={() => setIsCadastroOpen(false)} onCadastro={handleCadastro} />
      )}
    </>
  );
};

export default ModalLogin;
