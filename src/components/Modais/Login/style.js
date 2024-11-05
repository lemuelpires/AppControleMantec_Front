import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const ModalContent = styled.div`
  background-color: #1f1f1f; /* Tom de carvão escuro para o fundo do modal */
  margin: 10% auto;
  padding: 40px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.5s ease;
  color: #ffffff; /* Texto em branco para boa legibilidade */

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h2 {
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.5rem;
    color: #ffffff; /* Título em branco */
  }

  @media (max-width: 600px) {
    padding: 30px;
  }
`;

export const CloseButton = styled.button`
  color: #aaa; /* Cinza claro para o botão de fechar */
  background: none;
  border: none;
  font-size: 30px;
  position: absolute;
  right: 20px;
  top: 20px;

  &:hover,
  &:focus {
    color: #ff4d4d; /* Vermelho suave ao passar o mouse */
    cursor: pointer;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const EspacamentoCadastro = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;

  a {
    font-size: 0.85em;
    color: #66aaff; /* Azul suave para links */
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  text-align: left;
  color: #ffffff; /* Texto do label em branco */
`;

export const Input = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #444; /* Bordas em cinza escuro */
  border-radius: 20px;
  transition: border-color 0.3s;
  background-color: #2a2a2a; /* Fundo dos inputs em cinza escuro */

  &:focus {
    border-color: #66aaff; /* Azul suave ao focar no input */
    outline: none;
    box-shadow: 0 0 5px rgba(102, 170, 255, 0.5);
  }
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #25d366;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #25d370; /* Azul mais escuro ao passar o mouse */
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #cccccc; /* Cinza para botões desabilitados */
    cursor: not-allowed;
  }
`;
