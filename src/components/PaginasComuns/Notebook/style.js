import styled, { keyframes } from 'styled-components';

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const iconBounce = keyframes`
  0%, 20%, 60%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  80% { transform: translateY(-5px); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  background: linear-gradient(135deg, #2d1b69 0%, #11998e 100%);
  min-height: 100vh;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M50 50c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zm-20-20c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 32px 24px;
  border-radius: 24px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  animation: ${slideInFromLeft} 0.8s ease-out;
  animation-fill-mode: both;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, transparent, rgba(17, 153, 142, 0.8), transparent);
    background-size: 200px 100%;
    animation: ${shimmer} 2s infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(17, 153, 142, 0.1) 0%, transparent 70%);
    transition: all 0.5s ease;
    transform: translate(-50%, -50%);
  }

  &:hover {
    transform: translateY(-12px) rotateY(5deg);
    box-shadow: 
      0 32px 64px rgba(0, 0, 0, 0.15),
      0 16px 32px rgba(0, 0, 0, 0.1);
    
    &::after {
      width: 300px;
      height: 300px;
    }
    
    .icon {
      animation: ${iconBounce} 1s ease;
      color: #11998e !important;
      transform: scale(1.1);
    }
  }

  .icon {
    margin-bottom: 20px;
    color: #2d1b69;
    transition: all 0.4s ease;
    filter: drop-shadow(0 4px 8px rgba(45, 27, 105, 0.2));
    z-index: 2;
    position: relative;
  }

  h2 {
    font-size: 22px;
    font-weight: 800;
    margin: 16px 0 12px 0;
    color: #2d1b69;
    line-height: 1.3;
    z-index: 2;
    position: relative;
    background: linear-gradient(135deg, #2d1b69, #11998e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    color: #4a5568;
    font-size: 15px;
    line-height: 1.7;
    margin: 0;
    font-weight: 500;
    letter-spacing: 0.2px;
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
