import styled, { keyframes } from 'styled-components';

// Animações
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const backgroundMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
`;

export const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${backgroundMove} 15s ease infinite;
`;

export const ContentWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 60px 50px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 25px 45px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  animation: ${fadeIn} 0.8s ease-out;
  max-width: 500px;
  width: 100%;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 40px 30px;
    margin: 0 10px;
  }
`;

export const IconContainer = styled.div`
  font-size: 4rem;
  color: #fff;
  margin-bottom: 30px;
  animation: ${float} 3s ease-in-out infinite;
  
  svg {
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Message = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 40px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 30px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button`
  padding: 15px 30px;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  text-decoration: none;
  min-width: 140px;
  justify-content: center;
  
  ${props => props.primary ? `
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    box-shadow: 0 10px 25px rgba(238, 90, 36, 0.3);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(238, 90, 36, 0.4);
      animation: ${pulse} 1s ease infinite;
    }
  ` : `
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
  `}
  
  &:active {
    transform: translateY(1px);
  }
  
  svg {
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;
