import styled, { keyframes } from 'styled-components';
import Z_INDEX from '../../../styles/zIndex';
import Modal from 'react-modal';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const StyledModal = styled(Modal)`
  &.ReactModal__Overlay {
    background: linear-gradient(135deg, rgba(240, 240, 245, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%);
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: ${Z_INDEX.MODAL_IMAGE};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 1rem;
  }

  &.ReactModal__Content {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(200, 200, 220, 0.3);
    border-radius: 20px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    padding: 2rem;
    max-width: 480px;
    width: 90%;
    max-height: 85vh;
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    animation: ${fadeIn} 0.4s ease-out;
    z-index: ${Z_INDEX.MODAL_IMAGE + 1};
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
    margin: auto;
    transform: none;
    display: flex;
    flex-direction: column;
    
    h2 {
      text-align: center;
      margin: 0 0 0.8rem 0;
      font-size: 1.2rem;
      font-weight: 600;
      color: #1f2937;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 3px;
        background: linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%);
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
      }
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  max-width: 350px;
  padding: 0.9rem;
  border: 2px solid rgba(200, 200, 220, 0.4);
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%);
  color: #374151;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 1rem auto;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: block;
  
  &:focus {
    outline: none;
    border-color: rgba(99, 102, 241, 0.5);
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.15);
    transform: translateY(-1px);
  }
  
  &::placeholder {
    color: rgba(107, 114, 128, 0.6);
  }
  
  &[type="file"] {
    cursor: pointer;
    position: relative;
    text-align: center;
    
    &::file-selector-button {
      background: linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%);
      border: none;
      border-radius: 8px;
      color: white;
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      margin-right: 1rem;
      transition: all 0.2s ease;
      
      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
      }
    }
  }
`;

export const Button = styled.button`
  padding: 0.8rem 1.5rem;
  margin: 0.5rem 0.5rem 0 0;
  border: none;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  animation: ${slideUp} 0.6s ease-out;
  
  background: ${props => props.primary ? 
    'linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%)' : 
    'linear-gradient(45deg, #6b7280 0%, #9ca3af 100%)'};
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.primary ? 
      '0 8px 20px rgba(99, 102, 241, 0.4)' : 
      '0 6px 16px rgba(107, 114, 128, 0.3)'};
    background: ${props => props.primary ? 
      'linear-gradient(45deg, #4f46e5 0%, #7c3aed 100%)' : 
      'linear-gradient(45deg, #ef4444 0%, #dc2626 100%)'};
  }

  &:active {
    transform: translateY(-1px);
  }

  &:disabled {
    background: linear-gradient(45deg, #d1d5db 0%, #e5e7eb 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    animation: ${pulse} 2s infinite;
  }

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
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

export const PreviewImage = styled.img`
  width: 100%;
  max-width: 400px;
  max-height: 160px;
  height: auto;
  object-fit: contain;
  margin: 0.8rem auto;
  border-radius: 12px;
  border: 1px solid rgba(200, 200, 220, 0.4);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out;
  display: block;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: linear-gradient(135deg, rgba(229, 231, 235, 0.8) 0%, rgba(243, 244, 246, 0.6) 100%);
  border-radius: 12px;
  margin: 1rem 0;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background: linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 12px;
    transition: width 0.3s ease;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  }
  
  &::after {
    content: '${props => Math.round(props.progress)}%';
    position: absolute;
    top: -25px;
    left: ${props => props.progress}%;
    transform: translateX(-50%);
    font-size: 0.75rem;
    font-weight: 600;
    color: #6366f1;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

export const UploadIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  background: linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
  
  &::before {
    content: '📸';
  }
`;
