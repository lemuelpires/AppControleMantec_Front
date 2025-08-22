import styled, { keyframes } from 'styled-components';

export const SectionHeader = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const FormContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.9) 100%);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  box-shadow: 
    0 12px 25px rgba(0, 0, 0, 0.1),
    0 5px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: ${fadeIn} 0.5s ease-out;
  max-width: 580px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(0, 123, 255, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(40, 167, 69, 0.03) 0%, transparent 50%);
    border-radius: 12px;
    pointer-events: none;
    z-index: 0;
  }
  
  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 600px) {
    padding: 0.6rem;
    margin: 0.5rem;
    border-radius: 10px;
    max-width: none;
  }
`;

export const FormTitle = styled.h2`
  margin: 0 0 0.8rem 0;
  font-size: clamp(1rem, 3vw, 1.2rem);
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  letter-spacing: -0.5px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: 25px;
    height: 2px;
    background: linear-gradient(90deg, #007bff, #28a745);
    border-radius: 2px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  animation: ${fadeIn} 0.6s ease-out backwards;
  animation-delay: ${props => props.delay || '0s'};
`;

export const Label = styled.label`
  font-size: 0.7rem;
  font-weight: 600;
  color: #2c3e50;
  letter-spacing: 0.3px;
  text-transform: uppercase;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.4rem 0.6rem;
  border: 2px solid rgba(108, 117, 125, 0.2);
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #2c3e50;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  
  &::placeholder {
    color: #6c757d;
    font-weight: 400;
    font-size: 0.7rem;
  }
  
  &:focus {
    outline: none;
    border-color: #007bff;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 
      0 0 0 3px rgba(0, 123, 255, 0.1),
      0 4px 12px rgba(0, 123, 255, 0.15);
    transform: translateY(-1px);
  }
  
  &:valid {
    border-color: rgba(40, 167, 69, 0.5);
  }
  
  &:invalid:not(:placeholder-shown) {
    border-color: rgba(220, 53, 69, 0.5);
  }

  @media (max-width: 480px) {
    padding: 0.35rem 0.5rem;
    font-size: 0.7rem;
  }
`;

export const EspacamentoButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 0.8rem;
  animation: ${fadeIn} 0.7s ease-out backwards;
  animation-delay: 0.4s;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.3rem;
  }
`;

export const Button = styled.button`
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 70px;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.3px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }

  &.save {
    background: linear-gradient(135deg, #28a745, #20c997);
    color: white;
    box-shadow: 0 3px 10px rgba(40, 167, 69, 0.3);
    
    &:hover {
      background: linear-gradient(135deg, #20c997, #17a2b8);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4);
    }
    
    &:active {
      transform: translateY(-1px);
    }
  }

  &.cancel {
    background: linear-gradient(135deg, #6c757d, #5a6268);
    color: white;
    box-shadow: 0 3px 10px rgba(108, 117, 125, 0.3);
    
    &:hover {
      background: linear-gradient(135deg, #5a6268, #495057);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(108, 117, 125, 0.4);
    }
    
    &:active {
      transform: translateY(-1px);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.4rem 0.7rem;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 60px;
  padding: 0.4rem 0.6rem;
  border: 2px solid rgba(108, 117, 125, 0.2);
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #2c3e50;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  resize: vertical;
  font-family: inherit;
  
  &::placeholder {
    color: #6c757d;
    font-weight: 400;
    font-size: 0.7rem;
  }
  
  &:focus {
    outline: none;
    border-color: #007bff;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 
      0 0 0 3px rgba(0, 123, 255, 0.1),
      0 4px 12px rgba(0, 123, 255, 0.15);
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    padding: 0.35rem 0.5rem;
    font-size: 0.7rem;
    height: 50px;
  }
`;

export const Espacamento = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const EspacamentoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem 0.7rem;
  border: 2px solid rgba(108, 117, 125, 0.2);
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #2c3e50;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 
      0 0 0 3px rgba(0, 123, 255, 0.1),
      0 4px 12px rgba(0, 123, 255, 0.15);
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    padding: 0.45rem 0.6rem;
    font-size: 0.75rem;
  }
`;