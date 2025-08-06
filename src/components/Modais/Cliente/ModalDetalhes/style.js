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
  padding: 1.5rem;
  color: #2c3e50;
  overflow-y: auto;
  max-height: 80vh;

  &.cliente-modal-container {
    padding: 1.2rem !important;
    max-height: 80vh !important;
    
    &::-webkit-scrollbar {
      width: 4px !important;
    }

    &::-webkit-scrollbar-track {
      background: rgba(200, 200, 220, 0.2) !important;
      border-radius: 8px !important;
    }

    &::-webkit-scrollbar-thumb {
      background: linear-gradient(45deg, rgba(99, 102, 241, 0.6) 0%, rgba(139, 92, 246, 0.6) 100%) !important;
      border-radius: 8px !important;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(45deg, rgba(139, 92, 246, 0.8) 0%, rgba(99, 102, 241, 0.8) 100%) !important;
    }
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(160, 160, 175, 0.2);
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
  margin: 0 0 1.2rem 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: #374151;
  position: relative;
  letter-spacing: 0.3px;

  &.cliente-modal-title {
    margin: 0 0 1rem 0 !important;
    font-size: 1.3rem !important;
    letter-spacing: 0.2px !important;
    color: #1f2937 !important;
    
    &::after {
      content: '' !important;
      position: absolute !important;
      bottom: -8px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      width: 60px !important;
      height: 2px !important;
      background: linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%) !important;
      border-radius: 1px !important;
      box-shadow: 0 2px 4px rgba(99, 102, 241, 0.2) !important;
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
  gap: 0.8rem;
  margin-bottom: 1.2rem;

  &.cliente-details-list {
    gap: 0.7rem !important;
    margin-bottom: 1rem !important;
    grid-template-columns: 1fr 1fr !important;
    
    @media (max-width: 640px) {
      grid-template-columns: 1fr !important;
      gap: 0.6rem !important;
    }
  }
`;

export const DetailItem = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(200, 200, 220, 0.3);
  border-radius: 12px;
  padding: 0.9rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  position: relative;
  overflow: hidden;

  &.cliente-detail-item {
    border-radius: 10px !important;
    padding: 0.8rem !important;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.9) 100%) !important;
    border: 1px solid rgba(209, 213, 219, 0.4) !important;
    
    &:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(243, 244, 246, 0.95) 100%) !important;
      border-color: rgba(99, 102, 241, 0.4) !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
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
  font-size: 0.7rem;
  font-weight: 600;
  color: #6366f1;
  margin-bottom: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  opacity: 0.9;
  display: flex;
  align-items: center;

  &.cliente-detail-label {
    font-size: 0.65rem !important;
    margin-bottom: 0.35rem !important;
    letter-spacing: 0.5px !important;
    color: #4f46e5 !important;
    
    &::before {
      content: '' !important;
      width: 2px !important;
      height: 12px !important;
      background: linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%) !important;
      border-radius: 1px !important;
      margin-right: 0.35rem !important;
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
  font-size: 0.85rem;
  color: #374151;
  line-height: 1.3;
  word-break: break-word;
  font-weight: 500;
  padding-left: 0.6rem;
  border-left: 1px solid rgba(99, 102, 241, 0.3);
  min-height: 1.2rem;
  display: flex;
  align-items: center;

  &.cliente-detail-value {
    font-size: 0.8rem !important;
    line-height: 1.25 !important;
    padding-left: 0.5rem !important;
    min-height: 1.15rem !important;
    border-left: 1px solid rgba(99, 102, 241, 0.25) !important;
    color: #1f2937 !important;
    font-weight: 500 !important;
    
    &:empty::after {
      content: 'Não informado' !important;
      color: rgba(107, 114, 128, 0.6) !important;
      font-style: italic !important;
      font-size: 0.75rem !important;
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
  padding: 0.8rem;
  background: linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%);
  color: #ffffff;
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

  &.cliente-close-button {
    padding: 0.75rem !important;
    border-radius: 10px !important;
    font-size: 0.85rem !important;
    letter-spacing: 0.2px !important;
    background: linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%) !important;
    
    &:hover {
      transform: translateY(-1px) !important;
      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.3) !important;
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

// Responsividade aprimorada
export const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    ${ModalContainer} {
      padding: 1.5rem;
    }

    ${ModalTitle} {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }

    ${DetailItem} {
      padding: 1rem;
    }

    ${DetailLabel} {
      font-size: 0.75rem;
      margin-bottom: 0.5rem;
    }

    ${DetailValue} {
      font-size: 1rem;
      padding-left: 0.75rem;
    }

    ${CloseButton} {
      padding: 0.875rem;
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    ${ModalContainer} {
      padding: 1rem;
    }

    ${ModalTitle} {
      font-size: 1.25rem;
    }

    ${DetailItem} {
      padding: 0.875rem;
    }

    ${DetailLabel} {
      font-size: 0.7rem;
      
      &::before {
        width: 3px;
        height: 12px;
      }
    }

    ${DetailValue} {
      font-size: 0.9rem;
      padding-left: 0.5rem;
    }
  }
`;
