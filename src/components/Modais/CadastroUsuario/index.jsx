import React, { useState } from 'react';
import { ModalContainer, ModalContent, Input, Label, FormGroup, CloseButton, Select, Button, Form, AlertMessage } from './style';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';

const ModalCadastroUsuario = ({ isOpen, onClose, onCadastro }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Estado para controlar se é administrador
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Criar usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Atualizar o perfil do usuário com a informação de administrador
      if (isAdmin) {
        await updateAdminStatus(newUser.uid);
      }

      // Executar a função de cadastro passada como prop
      onCadastro(newUser);

      // Mostrar mensagem de sucesso
      setAlertMessage('Usuário cadastrado com sucesso!');

      // Fechar o modal após o cadastro
      setTimeout(() => {
        onClose();
        setAlertMessage('');
      }, 2000);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error.message);
      // Tratar erros de cadastro aqui
      setAlertMessage(`Erro ao cadastrar usuário: ${error.message}`);
    }
  };

  // Função para atualizar o status de administrador no perfil do usuário no Firestore ou outro banco de dados
  const updateAdminStatus = async (userId) => {
    // Implemente a lógica para atualizar o status de administrador do usuário
    // Exemplo: firestore.collection('users').doc(userId).update({ isAdmin: true });
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>Cadastro de Usuário</h2>
        {alertMessage && <AlertMessage>{alertMessage}</AlertMessage>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              placeholder="Digite seu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Senha:</Label>
            <Input
              type="password"
              placeholder="Digite sua senha..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>
              Tipo de Usuário:
              <Select onChange={(e) => setIsAdmin(e.target.value === 'admin')}>
                <option value="user">Usuário Comum</option>
                <option value="admin">Administrador</option>
              </Select>
            </Label>
          </FormGroup>
          <Button type="submit">🚀 Cadastrar Usuário</Button>
        </Form>
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalCadastroUsuario;
