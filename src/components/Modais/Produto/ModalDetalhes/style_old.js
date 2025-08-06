import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
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
  padding: 2rem;
  color: #ffffff;
  overflow-y: auto;
  max-height: 80vh;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #764ba2 0%, #667eea 100%);
  }
`;

export const ModalTitle = styled.h2`
  text-align: center;
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
  }
`;

export const DetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const DetailItem = styled.div`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
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
      rgba(255, 255, 255, 0.05),
      transparent
    );
    animation: ${shimmer} 2s infinite;
  }

  position: relative;
  overflow: hidden;

  &.image-item {
    padding: 1.25rem;
    text-align: center;
  }
`;

export const DetailLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #667eea;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.9;
`;

export const DetailValue = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.4;
  word-break: break-word;
  font-weight: 400;
`;

export const CloseButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    background: linear-gradient(45deg, #764ba2 0%, #667eea 100%);
  }

  &:active {
    transform: translateY(0);
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

// Responsividade
export const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    ${ModalContainer} {
      padding: 1rem;
    }

    ${ModalTitle} {
      font-size: 1.25rem;
    }

    ${DetailItem} {
      padding: 0.75rem;

      &.image-item {
        padding: 1rem;
      }
    }

    ${DetailLabel} {
      font-size: 0.8rem;
    }

    ${DetailValue} {
      font-size: 0.9rem;
    }
  }
`;
