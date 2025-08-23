import styled from 'styled-components';

export const StatusContainer = styled.div`
  min-height: 100vh;
  background: #f7f7f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Nunito', sans-serif;
`;

export const StatusCard = styled.div`
  max-width: 850px;
  width: 100%;
  margin: 3rem auto;
  padding: 3rem 2.5rem;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  border: 1px solid #e5e7eb;
  position: relative;

  @media (max-width: 900px) {
    max-width: 98vw;
    padding: 2rem 1rem;
  }
  @media (max-width: 600px) {
    padding: 1rem 0.5rem;
    border-radius: 14px;
    margin: 1rem auto;
  }
`;

export const StatusHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.8rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

export const StatusTitle = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  background: linear-gradient(90deg, #6a11cb 0%, #ff6a00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  letter-spacing: -1px;
  text-shadow: 0 2px 8px rgba(106,17,203,0.08);
  font-family: 'Montserrat', 'Nunito', 'Segoe UI', Arial, sans-serif;
  line-height: 1.2;

  @media (max-width: 600px) {
    font-size: 1.3rem;
    text-align: left;
  }
`;

export const StatusShareButton = styled.button`
  background: rgba(150, 59, 3, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 12px;
  padding: 8px 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  color: #6a11cb;
  transition: all 0.25s ease;

  &:hover {
    background: #6a11cb;
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(106,17,203,0.25);
  }

  @media (max-width: 600px) {
    padding: 6px 10px;
    font-size: 0.85rem;
  }
`;

export const StatusShareGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const StatusInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.6rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }
`;

export const StatusInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 1.5rem 0;
  width: 100%;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const StatusInfoLabel = styled.span`
  color: #6a11cb;
  font-weight: 700;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Montserrat', 'Nunito', 'Segoe UI', Arial, sans-serif;
  letter-spacing: 0.2px;
  text-shadow: 0 1px 4px rgba(106,17,203,0.07);

  @media (max-width: 600px) {
    font-size: 1rem;
    min-width: 120px;
  }
`;

export const StatusInfoValue = styled.span`
  color: #444;
  font-size: 1.05rem;
  font-weight: 500;
  font-family: 'Nunito', 'Montserrat', 'Segoe UI', Arial, sans-serif;
  letter-spacing: 0.1px;
  text-shadow: 0 1px 4px rgba(0,0,0,0.04);

  ${({ status }) =>
    status === 'Concluída' ? 'color: #22c55e; font-weight: 700;' :
    status === 'Não iniciado' ? 'color: #ef4444; font-weight: 700;' :
    status === 'Em andamento' ? 'color: #f97316; font-weight: 700;' : ''};

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export const StatusSectionTitle = styled.h2`
  color: #111827;
  font-weight: 700;
  margin: 1.2rem 0 0.5rem 0;
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Montserrat', 'Nunito', 'Segoe UI', Arial, sans-serif;
  letter-spacing: 0.2px;
`;

export const StatusList = styled.ul`
  margin: 0.5rem 0 1rem 1rem;
  color: #333;
  font-weight: 500;
  font-size: 1.05rem;
  padding-left: 0;
  list-style: none;
  font-family: 'Nunito', 'Montserrat', 'Segoe UI', Arial, sans-serif;

  li {
    position: relative;
    padding-left: 1.4rem;
    margin-bottom: 0.4rem;
    line-height: 1.5;

    &::before {
      content: "✔";
      position: absolute;
      left: 0;
      color: #6a11cb;
      font-size: 0.9rem;
      top: 2px;
    }
  }

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-left: 0.5rem;
  }
`;

export const StatusStatusBadge = styled.div`
  position: absolute;
  top: 18px;
  right: 18px;
  background: ${({ status }) =>
    status === 'Concluída' 
      ? 'linear-gradient(90deg,#22c55e,#16a34a)' :
    status === 'Em andamento' 
      ? 'linear-gradient(90deg,#f97316,#facc15)' :
    status === 'Não iniciado' 
      ? 'linear-gradient(90deg,#ef4444,#dc2626)' 
      : 'linear-gradient(90deg,#6b7280,#9ca3af)'};
  color: #fff;
  padding: 0.5rem 1.4rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.3px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.12);

  @media (max-width: 600px) {
    position: static;
    margin-bottom: 1rem;
    display: inline-block;
    font-size: 0.85rem;
    padding: 0.4rem 1rem;
  }
`;

export const StatusFooter = styled.footer`
  text-align: center;
  margin: 2rem 0 1rem 0;
  color: #6b7280;
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.8;
  font-family: 'Nunito', 'Montserrat', 'Segoe UI', Arial, sans-serif;
  letter-spacing: 0.2px;

  @media (max-width: 600px) {
    font-size: 0.9rem;
    margin: 1rem 0 0.5rem 0;
  }
`;

export const InfoSectionCard = styled.div`
  background: linear-gradient(120deg, #f7f7fa 0%, #e3eafc 100%);
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07), 0 0px 0px rgba(0,123,255,0.05);
  padding: 1.3rem 1rem;
  margin-bottom: 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  border: 1px solid #e5e7eb;
  position: relative;
  transition: box-shadow 0.3s, transform 0.3s, background 0.3s;

  &:hover {
    box-shadow: 0 8px 32px rgba(0,123,255,0.12), 0 2px 16px rgba(0,0,0,0.10);
    background: linear-gradient(120deg, #e3eafc 0%, #f7f7fa 100%);
    transform: translateY(-4px) scale(1.02);
  }

  &::before {
    content: '';
    position: absolute;
    top: -12px;
    left: -12px;
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #007bff 0%, #00c6ff 100%);
    opacity: 0.08;
    border-radius: 50%;
    z-index: 0;
    transition: opacity 0.3s;
  }

  @media (max-width: 600px) {
    padding: 0.7rem 0.5rem;
    border-radius: 10px;
    gap: 0.4rem;
    margin-bottom: 0.5rem;
    &:hover {
      transform: none;
      box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    }
  }
`;
