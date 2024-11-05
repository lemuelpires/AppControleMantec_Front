import React, { useState } from 'react';
import { 
  CloseButton, 
  LoginForm, 
  ModalContainer, 
  ModalContent, 
  Input, 
  Label, 
  EspacamentoCadastro, 
  Button 
} from './style';
import { auth } from '../../../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import ResetPasswordModal from '../RedefinicaoSenha';
import { useNavigate } from 'react-router-dom';

const ModalLogin = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login efetuado com sucesso!');
      onClose();
      navigate('/');
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Credenciais incorretas. Verifique seus dados e tente novamente.');
    }
  };

  const openResetPasswordModal = () => {
    setIsResetPasswordOpen(true);
  };

  return (
    <>
      <ModalContainer isOpen={isOpen} style={{ zIndex: 10 }}>
        <ModalContent>
          <CloseButton onClick={onClose}>&times;</CloseButton>
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
            <Button type="submit">Conectar</Button>
          </LoginForm>
          <EspacamentoCadastro>
            <a type="button" onClick={openResetPasswordModal}>Esqueci a senha?</a>
          </EspacamentoCadastro>
        </ModalContent>
      </ModalContainer>
      
      {isResetPasswordOpen && (
        <ResetPasswordModal isOpen={isResetPasswordOpen} onClose={() => setIsResetPasswordOpen(false)} />
      )}
    </>
  );
};

export default ModalLogin;