import React, { useState } from 'react';
import { 
  CloseButton, 
  LoginForm, 
  ModalContainer, 
  ModalContent, 
  Input, 
  InputContainer,
  Label, 
  EspacamentoCadastro, 
  Button,
  TogglePasswordButton
} from './style';
import { auth } from '../../../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import ResetPasswordModal from '../RedefinicaoSenha';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ModalLogin = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ModalContainer isOpen={isOpen}>
        <ModalContent>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <h2>Login</h2>
          <LoginForm onSubmit={handleSubmit}>
            <Label>
              E-mail:
              <InputContainer>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputContainer>
            </Label>
            <Label>
              Senha:
              <InputContainer>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  hasToggle={true}
                />
                <TogglePasswordButton 
                  type="button" 
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </TogglePasswordButton>
              </InputContainer>
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