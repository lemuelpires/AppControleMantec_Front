import styled, { keyframes } from 'styled-components';

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const floatIcon = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  min-height: 100vh;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M60 60L0 0v60h60zM120 60L60 0v60h60z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    padding: 32px 16px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 24px 16px;
  }
`;

export const Service = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 32px 24px;
  border-radius: 28px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 12px 24px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  animation: ${zoomIn} 0.8s ease-out;
  animation-fill-mode: both;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 45deg, transparent, rgba(238, 119, 82, 0.1), transparent);
    opacity: 0;
    transition: all 0.6s ease;
    animation: rotate 4s linear infinite;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  &:hover {
    transform: translateY(-15px) rotateX(5deg);
    box-shadow: 
      0 40px 80px rgba(0, 0, 0, 0.2),
      0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.5);
    
    &::before {
      opacity: 1;
    }
    
    .icon {
      animation: ${floatIcon} 2s ease-in-out infinite;
      color: #e73c7e !important;
      transform: scale(1.15);
      filter: drop-shadow(0 8px 16px rgba(231, 60, 126, 0.4));
    }
  }

  .icon {
    margin-bottom: 20px;
    color: #ee7752;
    transition: all 0.4s ease;
    filter: drop-shadow(0 4px 12px rgba(238, 119, 82, 0.3));
    z-index: 2;
    position: relative;
  }

  h2 {
    font-size: 22px;
    font-weight: 800;
    margin: 16px 0 12px 0;
    color: #2d3748;
    line-height: 1.3;
    z-index: 2;
    position: relative;
    background: linear-gradient(135deg, #ee7752, #e73c7e, #23a6d5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  p {
    color: #4a5568;
    font-size: 15px;
    line-height: 1.7;
    margin: 0;
    font-weight: 500;
    letter-spacing: 0.3px;
    z-index: 2;
    position: relative;
  }

  @media (max-width: 768px) {
    padding: 24px 20px;
    
    h2 {
      font-size: 20px;
    }
    
    p {
      font-size: 14px;
    }
  }
  }

  @media (max-width: 768px) {
    padding: 15px; /* Reduzindo o padding em telas menores */
    h2 {
      font-size: 18px; /* Diminuindo o tamanho da fonte do título */
    }

    p {
      font-size: 14px; /* Diminuindo o tamanho da fonte da descrição */
    }
  }
`;
