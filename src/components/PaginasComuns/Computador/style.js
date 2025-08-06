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

const iconRotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const glowEffect = keyframes`
  0% { box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05); }
  50% { box-shadow: 0 12px 40px rgba(0, 123, 255, 0.15), 0 6px 20px rgba(0, 123, 255, 0.1); }
  100% { box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05); }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  min-height: 100vh;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300d4ff' fill-opacity='0.03'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 212, 255, 0.2);
  padding: 32px 24px;
  border-radius: 16px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 4px 16px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease-out;
  animation-fill-mode: both;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #00d4ff, #0066cc, #00d4ff);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.4s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    animation: ${glowEffect} 2s infinite;
    border-color: rgba(0, 212, 255, 0.4);
    
    &::before {
      transform: scaleX(1);
    }

    &::after {
      opacity: 1;
    }
    
    .icon {
      animation: ${iconRotate} 0.8s ease;
      color: #00d4ff !important;
      filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.5));
    }
  }

  .icon {
    margin-bottom: 20px;
    color: #00d4ff;
    transition: all 0.3s ease;
    filter: drop-shadow(0 2px 8px rgba(0, 212, 255, 0.3));
  }

  h2 {
    font-size: 22px;
    font-weight: 700;
    margin: 16px 0 12px 0;
    color: #e2e8f0;
    line-height: 1.3;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  p {
    color: #94a3b8;
    font-size: 15px;
    line-height: 1.6;
    margin: 0;
    font-weight: 400;
    letter-spacing: 0.3px;
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
`;
