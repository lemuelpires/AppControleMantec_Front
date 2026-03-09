import styled, { keyframes } from 'styled-components';
import Z_INDEX from '../../../styles/zIndex';

const popIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const ImeiModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  display: grid;
  place-items: center;
  padding: 1.5rem;
  box-sizing: border-box;
  z-index: ${Z_INDEX.MODAL_BACKDROP};
`;

export const ImeiModalContent = styled.div`
  width: min(420px, 92vw);
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  animation: ${popIn} 0.2s ease-out;
  z-index: ${Z_INDEX.MODAL_CONTENT};
`;

export const ImeiModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.2rem;
`;

export const ImeiModalTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2a44;
`;

export const ImeiModalCloseButton = styled.button`
  border: none;
  background: #f1f3f5;
  color: #495057;
  border-radius: 999px;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    background: #e9ecef;
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid #4c6ef5;
    outline-offset: 2px;
  }
`;

export const ImeiModalForm = styled.form`
  display: flex;
  gap: 0.75rem;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const ImeiModalInput = styled.input`
  flex: 1;
  border-radius: 10px;
  border: 1px solid #ced4da;
  padding: 0.7rem 0.9rem;
  font-size: 0.95rem;
  color: #212529;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4c6ef5;
    box-shadow: 0 0 0 3px rgba(76, 110, 245, 0.2);
  }
`;

export const ImeiModalButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 0.7rem 1.1rem;
  background: linear-gradient(135deg, #364fc7 0%, #4c6ef5 100%);
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;
