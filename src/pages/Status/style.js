import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const StatusContainer = styled.div`
  background-color: #f0f2f5;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const StatusCard = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  padding: 2.5rem;
  animation: ${fadeInUp} 0.5s ease-out;
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const StatusHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
`;

export const StatusTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e2a5a;
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const StatusShareGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const StatusShareButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #495057;
  transition: all 0.2s ease;
  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

export const MainContent = styled.main`
  display: grid;
  gap: 2.5rem;
  @media (max-width: 992px) {
    gap: 2rem;
  }
`;

export const InfoColumn = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ActionColumn = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InfoSectionCard = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 15px;
  padding: 1.5rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ClienteNome = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #343a40;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const StatusInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  flex-wrap: wrap;
  gap: 0.5rem;
  &:not(:last-child) {
    border-bottom: 1px solid #e9ecef;
  }
`;

export const StatusInfoLabel = styled.span`
  color: #6c757d;
  font-size: 0.9rem;
`;

export const StatusInfoValue = styled.span`
  color: #343a40;
  font-weight: 600;
  font-size: 1rem;
  text-align: right;
`;

export const PrazoRestante = styled.span`
  margin-left: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
  color: ${({ status }) =>
    status === 'Prazo vencido' ? '#dc3545' : '#28a745'};
`;

export const StatusLabelSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Label = styled.span`
  color: #495057;
  font-weight: 500;
  font-size: 1.1rem;
`;

export const StatusStatusBadge = styled.span`
  background: ${({ status }) =>
    ({
      'Concluído': '#28a745',
      'Entregue': '#17a2b8',
      'Cancelado': '#dc3545',
      'Orçamento': '#ffc107',
      'Em andamento': '#007bff',
      'Não iniciado': '#6c757d',
      'Aguardando Peças': '#cc0e76',
    }[status] || '#6c757d')};
  color: #fff;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 0.9rem;
  margin-left: auto;
  text-transform: uppercase;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const BaseActionCard = styled.div`
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);
  }
`;

export const ActionCard = styled(BaseActionCard)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
`;

export const ActionTitle = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const ActionIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  opacity: 0.8;
`;

export const QrCode = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  margin: 1rem auto;
  background: white;
  padding: 5px;
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const BaseButton = styled.button`
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const PixButton = styled(BaseButton)`
  background-color: #fff;
  color: #6a5acd;
  margin-bottom: 0.5rem;
  &:hover {
    background-color: #f0f0ff;
  }
`;

export const WhatsappButton = styled.a`
  /* Inherits from BaseButton styles */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-decoration: none;
  
  background-color: #25d366;
  color: #fff;
  &:hover {
    background-color: #20c15a;
  }
`;

export const HorarioCard = styled(BaseActionCard)`
  background-color: #fff;
  border: 1px solid #e9ecef;
  color: #343a40;
`;

export const HorarioTitle = styled(ActionTitle)`
  color: #343a40;
`;

export const HorarioIcon = styled(ActionIcon)`
  color: #6c757d;
`;

export const HorarioList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color: #495057;
`;

export const HorarioItem = styled.li`
  margin-bottom: 0.5rem;
`;

export const StatusFooter = styled.footer`
  text-align: center;
  margin-top: 2rem;
  color: #6c757d;
  font-size: 0.9rem;
`;

// Timeline styles
export const Timeline = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 20px; /* Alinha com o centro do ícone */
    left: 20px;
    right: 20px;
    height: 2px;
    background-color: #e9ecef;
    z-index: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 2rem;
    &::before {
      top: 20px;
      left: 20px;
      bottom: 20px;
      right: auto;
      width: 2px;
      height: auto;
    }
  }
`;

export const TimelineItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  color: ${({ active }) => (active ? '#007bff' : '#adb5bd')};
  transition: color 0.3s ease, transform 0.2s ease;
  text-align: center;
  width: ${({ current }) => (current ? '140px' : '100px')};
  transform: ${({ current }) => (current ? 'translateY(-6px)' : 'none')};
  
  @media (max-width: 768px) {
    flex-direction: row;
    text-align: left;
    width: 100%;
    margin-bottom: 2rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const TimelineIcon = styled.div`
  width: ${({ current }) => (current ? '52px' : '40px')};
  height: ${({ current }) => (current ? '52px' : '40px')};
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#007bff' : '#e9ecef')};
  color: ${({ active }) => (active ? '#fff' : '#adb5bd')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ current }) => (current ? '1.45rem' : '1.2rem')};
  border: 4px solid #f8f9fa; /* Match card background */
  transition: all 0.3s ease;
  box-shadow: ${({ current }) => (current ? '0 6px 18px rgba(0,123,255,0.18)' : 'none')};
  
  ${TimelineItem}:hover & {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    margin-right: 1rem;
    flex-shrink: 0;
  }
`;

export const TimelineContent = styled.div`
  margin-top: 0.5rem;
  font-size: ${({ current }) => (current ? '1rem' : '0.8rem')};
  font-weight: ${({ current }) => (current ? '700' : '500')};

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

