import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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
  padding: 1.2rem;
  color: #2c3e50;
  overflow-y: auto;
  max-height: 88vh;

  &.produto-modal-container {
    padding: 0.9rem !important;
    max-height: 88vh !important;
    
    &::-webkit-scrollbar {
      width: 3px !important;
    }

    &::-webkit-scrollbar-track {
      background: rgba(200, 200, 220, 0.2) !important;
      border-radius: 6px !important;
    }

    &::-webkit-scrollbar-thumb {
      background: linear-gradient(45deg, rgba(99, 102, 241, 0.6) 0%, rgba(139, 92, 246, 0.6) 100%) !important;
      border-radius: 6px !important;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(45deg, rgba(139, 92, 246, 0.8) 0%, rgba(99, 102, 241, 0.8) 100%) !important;
    }
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(200, 200, 220, 0.2);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, rgba(99, 102, 241, 0.6) 0%, rgba(139, 92, 246, 0.6) 100%);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, rgba(139, 92, 246, 0.8) 0%, rgba(99, 102, 241, 0.8) 100%);
  }
`;

export const ModalTitle = styled.h2`
  text-align: center;
  margin: 0 0 0.8rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #374151;
  position: relative;
  letter-spacing: 0.2px;

  &.produto-modal-title {
    margin: 0 0 0.7rem 0 !important;
    font-size: 1.15rem !important;
    letter-spacing: 0.1px !important;
    color: #1f2937 !important;
    
    &::after {
      content: '' !important;
      position: absolute !important;
      bottom: -6px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      width: 50px !important;
      height: 2px !important;
      background: linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%) !important;
      border-radius: 1px !important;
      box-shadow: 0 1px 3px rgba(99, 102, 241, 0.2) !important;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  }
`;

export const DetailsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  margin-bottom: 0.9rem;

  &.produto-details-list {
    gap: 0.5rem !important;
    margin-bottom: 0.8rem !important;
    grid-template-columns: 1fr 1fr !important;
    
    @media (max-width: 640px) {
      grid-template-columns: 1fr !important;
      gap: 0.4rem !important;
    }
  }
`;

export const DetailItem = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(200, 200, 220, 0.3);
  border-radius: 10px;
  padding: 0.7rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  position: relative;
  overflow: hidden;

  &.produto-detail-item {
    border-radius: 8px !important;
    padding: 0.6rem !important;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.9) 100%) !important;
    border: 1px solid rgba(209, 213, 219, 0.4) !important;
    
    &:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(243, 244, 246, 0.95) 100%) !important;
      border-color: rgba(99, 102, 241, 0.4) !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08) !important;
    }
  }

  &.produto-image-item {
    grid-column: 1 / -1 !important;
    text-align: center !important;
    padding: 0.5rem !important;
    
    .produto-image-container {
      padding-left: 0 !important;
      border-left: none !important;
    }
  }
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(243, 244, 246, 0.95) 100%);
    border-color: rgba(99, 102, 241, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -200px;
    width: 200px;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(99, 102, 241, 0.05),
      transparent
    );
    animation: ${shimmer} 4s infinite;
  }
`;

export const DetailLabel = styled.div`
  font-size: 0.6rem;
  font-weight: 600;
  color: #6366f1;
  margin-bottom: 0.3rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.9;
  display: flex;
  align-items: center;

  &.produto-detail-label {
    font-size: 0.58rem !important;
    margin-bottom: 0.25rem !important;
    letter-spacing: 0.4px !important;
    color: #4f46e5 !important;
    
    &::before {
      content: '' !important;
      width: 2px !important;
      height: 10px !important;
      background: linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%) !important;
      border-radius: 1px !important;
      margin-right: 0.3rem !important;
      box-shadow: 0 1px 2px rgba(99, 102, 241, 0.2) !important;
    }
  }
  
  &::before {
    content: '';
    width: 3px;
    height: 14px;
    background: linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 1px;
    margin-right: 0.4rem;
    box-shadow: 0 1px 3px rgba(99, 102, 241, 0.2);
  }
`;

export const DetailValue = styled.div`
  font-size: 0.75rem;
  color: #374151;
  line-height: 1.2;
  word-break: break-word;
  font-weight: 500;
  padding-left: 0.5rem;
  border-left: 1px solid rgba(99, 102, 241, 0.3);
  min-height: 1.1rem;
  display: flex;
  align-items: center;

  &.produto-detail-value {
    font-size: 0.72rem !important;
    line-height: 1.2 !important;
    padding-left: 0.4rem !important;
    min-height: 1.05rem !important;
    border-left: 1px solid rgba(99, 102, 241, 0.25) !important;
    color: #1f2937 !important;
    font-weight: 500 !important;
    
    &:empty::after {
      content: 'Não informado' !important;
      color: rgba(107, 114, 128, 0.6) !important;
      font-style: italic !important;
      font-size: 0.68rem !important;
      font-weight: 400 !important;
    }
  }
  
  &:empty::after {
    content: 'Não informado';
    color: rgba(107, 114, 128, 0.6);
    font-style: italic;
  }
`;

export const CloseButton = styled.button`
  width: 100%;
  padding: 0.6rem;
  background: linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.2px;
  text-transform: uppercase;

  &.produto-close-button {
    padding: 0.6rem !important;
    border-radius: 8px !important;
    font-size: 0.78rem !important;
    letter-spacing: 0.1px !important;
    background: linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%) !important;
    
    &:hover {
      transform: translateY(-1px) !important;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3) !important;
      background: linear-gradient(45deg, #4f46e5 0%, #7c3aed 100%) !important;
    }

    &:active {
      transform: translateY(0) !important;
    }
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
    background: linear-gradient(45deg, #4f46e5 0%, #7c3aed 100%);
  }

  &:active {
    transform: translateY(-1px);
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
      rgba(255, 255, 255, 0.15),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;
