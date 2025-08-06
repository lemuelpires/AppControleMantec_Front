import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(102, 170, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(102, 170, 255, 0.6);
  }
`;

export const ModalContainer = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  z-index: 15000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: linear-gradient(135deg, 
    rgba(0, 0, 0, 0.9), 
    rgba(20, 20, 40, 0.9), 
    rgba(40, 20, 60, 0.9)
  );
  backdrop-filter: blur(10px);
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: linear-gradient(145deg, 
    rgba(30, 30, 40, 0.95), 
    rgba(40, 40, 50, 0.95)
  );
  backdrop-filter: blur(20px);
  margin: 0;
  padding: 35px 30px;
  border-radius: 20px;
  width: 90%;
  max-width: 420px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 40px rgba(102, 170, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: ${fadeInUp} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  color: #ffffff;
  border: 1px solid rgba(102, 170, 255, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(102, 170, 255, 0.8), 
      rgba(102, 255, 170, 0.8), 
      transparent
    );
    animation: ${gradientAnimation} 3s linear infinite;
  }

  h2 {
    margin-bottom: 25px;
    text-align: center;
    font-size: clamp(1.4rem, 4vw, 1.8rem);
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 2px 10px rgba(102, 170, 255, 0.3);
    letter-spacing: 1px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 2px;
      background: linear-gradient(90deg, 
        rgba(102, 170, 255, 0.8), 
        rgba(102, 255, 170, 0.8)
      );
      border-radius: 2px;
    }
  }

  @media (max-width: 600px) {
    padding: 30px 25px;
    border-radius: 18px;
    max-width: 380px;
  }
`;

export const CloseButton = styled.button`
  color: rgba(255, 255, 255, 0.7);
  background: none;
  border: none;
  font-size: 28px;
  position: absolute;
  right: 15px;
  top: 15px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  line-height: 1;
  cursor: pointer;

  &:hover,
  &:focus {
    color: #ffffff;
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 18px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 6px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  text-align: left;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  margin-top: 6px;
  padding: 12px 16px;
  font-size: 15px;
  border: 2px solid rgba(102, 170, 255, 0.3);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  backdrop-filter: blur(10px);
  font-weight: 500;
  width: 100%;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    border-color: rgba(102, 170, 255, 0.8);
    outline: none;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 
      0 0 0 3px rgba(102, 170, 255, 0.1),
      0 6px 20px rgba(102, 170, 255, 0.15);
    transform: translateY(-1px);
    animation: ${pulseGlow} 2s infinite;
  }

  &:hover {
    border-color: rgba(102, 170, 255, 0.5);
    background: rgba(255, 255, 255, 0.07);
  }
`;

export const Select = styled.select`
  margin-top: 6px;
  padding: 12px 16px;
  font-size: 15px;
  border: 2px solid rgba(102, 170, 255, 0.3);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  backdrop-filter: blur(10px);
  font-weight: 500;
  width: 100%;
  cursor: pointer;

  &:focus {
    border-color: rgba(102, 170, 255, 0.8);
    outline: none;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 
      0 0 0 3px rgba(102, 170, 255, 0.1),
      0 6px 20px rgba(102, 170, 255, 0.15);
    transform: translateY(-1px);
  }

  &:hover {
    border-color: rgba(102, 170, 255, 0.5);
    background: rgba(255, 255, 255, 0.07);
  }

  option {
    background: rgba(30, 30, 40, 0.95);
    color: #ffffff;
    padding: 8px;
  }
`;

export const Button = styled.button`
  padding: 14px 20px;
  background: linear-gradient(135deg, 
    rgba(102, 170, 255, 0.9), 
    rgba(102, 255, 170, 0.9)
  );
  color: #ffffff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  margin-top: 8px;
  box-shadow: 
    0 6px 20px rgba(102, 170, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.2), 
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    background: linear-gradient(135deg, 
      rgba(102, 170, 255, 1), 
      rgba(102, 255, 170, 1)
    );
    transform: translateY(-2px);
    box-shadow: 
      0 10px 25px rgba(102, 170, 255, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }

  &:disabled {
    background: rgba(150, 150, 150, 0.5);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const AlertMessage = styled.p`
  background: linear-gradient(135deg, 
    rgba(239, 68, 68, 0.15), 
    rgba(220, 38, 38, 0.1)
  );
  border: 1px solid rgba(239, 68, 68, 0.4);
  border-radius: 10px;
  padding: 0.8rem 1rem;
  margin-bottom: 1rem;
  color: #ff6b6b;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;
