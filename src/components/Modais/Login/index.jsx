// ModalLogin.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { CloseButton, LoginForm, ModalContainer, ModalContent, Input, Label } from './style';


const ModalLogin = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementar lógica de autenticação aqui (ex: enviar para API)
    console.log('Username:', username);
    console.log('Password:', password);
    // Após autenticação, pode-se implementar lógica para redirecionar ou atualizar o estado de autenticação na aplicação
    onClose(); // Fechar modal após submissão
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <h2>Login</h2>
        <LoginForm onSubmit={handleSubmit}>
          <Label>
            Usuário:
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <button type="submit">Conectar</button>
        </LoginForm>
        <div>
          <a href="#">Esqueci a senha</a> | <a href="#">Cadastrar</a>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalLogin;
