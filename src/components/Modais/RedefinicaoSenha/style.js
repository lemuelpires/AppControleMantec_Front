import styled, { keyframes } from 'styled-components';
import Z_INDEX from '../../../styles/zIndex';

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
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(99, 102, 241, 0.6);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const ModalContainer = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  z-index: ${Z_INDEX.MODAL_RESET_PASSWORD};
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: linear-gradient(135deg, 
    rgba(0, 0, 0, 0.9), 
    rgba(20, 20, 40, 0.9), 
    rgba(40, 20, 60, 0.9),
    rgba(60, 20, 80, 0.85)
  );
  backdrop-filter: blur(12px);
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background: linear-gradient(145deg, 
    rgba(30, 30, 40, 0.98), 
    rgba(40, 40, 50, 0.95),
    rgba(35, 35, 45, 0.97)
  );
  backdrop-filter: blur(25px);
  border: 1px solid rgba(102, 170, 255, 0.3);
  border-radius: 24px;
  padding: 2.5rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 40px rgba(102, 170, 255, 0.15),
    0 8px 16px rgba(139, 92, 246, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: ${fadeInUp} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  position: relative;
  overflow: hidden;
  color: #ffffff;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(102, 170, 255, 0.05),
      rgba(139, 92, 246, 0.03),
      transparent
    );
    animation: ${shimmer} 4s infinite;
  }

  h2 {
    margin: 0 0 2rem 0;
    text-align: center;
    font-size: 1.8rem;
    font-weight: 700;
    background: linear-gradient(135deg, 
      #66aaff 0%, 
      #8b5cf6 25%, 
      #6366f1 50%, 
      #a855f7 75%, 
      #66aaff 100%
    );
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    letter-spacing: -0.5px;
    animation: ${gradientAnimation} 3s ease infinite;

    &::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background: linear-gradient(90deg, 
        #66aaff 0%, 
        #8b5cf6 25%, 
        #6366f1 50%, 
        #a855f7 75%, 
        #66aaff 100%
      );
      background-size: 200% 200%;
      border-radius: 2px;
      box-shadow: 0 2px 12px rgba(102, 170, 255, 0.4);
      animation: ${gradientAnimation} 3s ease infinite;
    }
  }

  .subtitle {
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.95rem;
    margin-bottom: 2rem;
    font-weight: 500;
    line-height: 1.5;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 600px) {
    padding: 2rem 1.5rem;
    border-radius: 20px;
    
    h2 {
      font-size: 1.6rem;
    }
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
  z-index: 10;
  outline: none;

  &:hover,
  &:focus {
    color: #ffffff;
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.2px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  text-align: left;
  width: 100%;
  
  .icon {
    margin-right: 0.5rem;
    font-size: 1rem;
    color: rgba(102, 170, 255, 0.8);
  }
`;

export const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 1rem 1.2rem;
  font-size: 1rem;
  border: 2px solid rgba(102, 170, 255, 0.3);
  border-radius: 12px;
  background: linear-gradient(135deg, 
    rgba(30, 30, 40, 0.9), 
    rgba(40, 40, 50, 0.8)
  );
  color: #ffffff;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  text-align: center;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-weight: 400;
    text-align: center;
  }
  
  &:focus {
    outline: none;
    border-color: rgba(102, 170, 255, 0.8);
    background: linear-gradient(135deg, 
      rgba(35, 35, 45, 0.95), 
      rgba(45, 45, 55, 0.9)
    );
    box-shadow: 
      0 0 0 3px rgba(102, 170, 255, 0.2),
      0 8px 16px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }

  &:hover:not(:focus) {
    border-color: rgba(102, 170, 255, 0.5);
    background: linear-gradient(135deg, 
      rgba(32, 32, 42, 0.95), 
      rgba(42, 42, 52, 0.85)
    );
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, 
    #66aaff 0%, 
    #8b5cf6 25%, 
    #6366f1 50%, 
    #a855f7 75%, 
    #66aaff 100%
  );
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 1rem;
  box-shadow: 
    0 6px 20px rgba(102, 170, 255, 0.3),
    0 2px 8px rgba(139, 92, 246, 0.2);
  
  background-size: 200% 200%;
  animation: ${gradientAnimation} 4s ease infinite;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.25),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    animation: ${pulseGlow} 2s infinite;
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }

  &:disabled {
    background: linear-gradient(135deg, #d1d5db, #e5e7eb);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    animation: none;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

export const ErrorMessage = styled.div`
  background: linear-gradient(135deg, 
    rgba(239, 68, 68, 0.15), 
    rgba(220, 38, 38, 0.1)
  );
  border: 1px solid rgba(239, 68, 68, 0.4);
  border-radius: 10px;
  padding: 0.8rem 1rem;
  margin-top: 1rem;
  color: #ff6b6b;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '⚠️';
    font-size: 1.1rem;
  }
`;

export const SuccessMessage = styled.div`
  background: linear-gradient(135deg, 
    rgba(34, 197, 94, 0.15), 
    rgba(16, 185, 129, 0.1)
  );
  border: 1px solid rgba(34, 197, 94, 0.4);
  border-radius: 10px;
  padding: 0.8rem 1rem;
  margin-top: 1rem;
  color: #4ade80;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '✅';
    font-size: 1.1rem;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  }
`;
