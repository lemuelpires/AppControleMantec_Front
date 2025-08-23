import styled, { keyframes } from 'styled-components';

// Animação de entrada para os cards
const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`;

export const StatusContainer = styled.div`
    min-height: 100vh;
    background: linear-gradient(120deg, #f7fafc 0%, #e3e6ff 60%, #f9e7fe 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0 0 0;
    font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
`;

export const StatusCard = styled.div`
    background: linear-gradient(120deg, #fff 60%, #f3eaff 100%);
    border-radius: 22px;
    box-shadow: 0 8px 36px rgba(106,17,203,0.16), 0 1.5px 8px rgba(39,71,255,0.07);
    max-width: 500px;
    width: 100%;
    padding: 2.7rem 2.2rem 2.2rem 2.2rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    animation: ${fadeInUp} 0.7s cubic-bezier(.25,.8,.25,1);
    transition: box-shadow 0.25s, transform 0.25s;
    will-change: box-shadow, transform;
    &:hover {
        box-shadow: 0 16px 48px rgba(106,17,203,0.22), 0 2px 12px rgba(39,71,255,0.13);
        transform: translateY(-2px) scale(1.012);
    }
    @media (max-width: 600px) {
        padding: 1.2rem 0.5rem;
        max-width: 98vw;
    }
`;

export const StatusHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;
`;

export const StatusTitle = styled.h2`
    font-size: 2.1rem;
    font-weight: 900;
    color: #5e2ced;
    letter-spacing: 1.5px;
    margin: 0;
    text-shadow: 0 2px 12px rgba(94,44,237,0.09);
    font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
    @media (max-width: 600px) {
        font-size: 1.3rem;
    }
`;

export const StatusShareGroup = styled.div`
    display: flex;
    align-items: center;
`;

export const StatusShareButton = styled.button`
    background: linear-gradient(90deg, #5e2ced 0%, #ff6ec4 100%);
    border: none;
    border-radius: 50%;
    padding: 0.7rem;
    cursor: pointer;
    transition: box-shadow 0.2s, transform 0.2s;
    box-shadow: 0 2px 8px rgba(94,44,237,0.09);
    display: flex;
    align-items: center;
    &:hover {
        box-shadow: 0 4px 16px rgba(255,110,196,0.18);
        transform: scale(1.09);
        background: linear-gradient(90deg, #ff6ec4 0%, #5e2ced 100%);
    }
`;

export const OSSection = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    animation: ${fadeInUp} 0.8s cubic-bezier(.25,.8,.25,1);
`;

export const StatusStatusBadge = styled.div`
    font-size: 1.13rem;
    font-weight: 900;
    padding: 0.7rem 1.6rem;
    border-radius: 16px;
    margin-bottom: 0.8rem;
    color: #fff;
    width: fit-content;
    box-shadow: 0 2px 12px rgba(94,44,237,0.13);
    background: ${({ status }) =>
        status === 'Concluída' || status === 'Concluido' ? 'linear-gradient(90deg, #28a745 60%, #6ee7b7 100%)' :
        status === 'Em andamento' ? 'linear-gradient(90deg, #007bff 60%, #5e2ced 100%)' :
        status === 'Não iniciado' ? 'linear-gradient(90deg, #dc3545 60%, #ff6ec4 100%)' :
        'linear-gradient(90deg, #888 60%, #bdbdbd 100%)'};
    letter-spacing: 0.7px;
    transition: background 0.2s, transform 0.2s;
    font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
    &:hover {
        transform: scale(1.07);
        filter: brightness(1.09);
    }
`;

export const InfoSectionCard = styled.div`
    background: linear-gradient(120deg, #f7f7ff 60%, #f9e7fe 100%);
    border-radius: 14px;
    padding: 1.3rem 1.1rem;
    margin-bottom: 0.5rem;
    box-shadow: 0 1px 8px rgba(94,44,237,0.07);
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    animation: ${fadeInUp} 0.9s cubic-bezier(.25,.8,.25,1);
    transition: box-shadow 0.2s, transform 0.2s;
    &:hover {
        box-shadow: 0 4px 18px rgba(94,44,237,0.13);
        transform: scale(1.012);
    }
    @media (max-width: 600px) {
        padding: 0.8rem 0.4rem;
    }
`;

export const ClienteNome = styled.div`
    font-size: 1.22rem;
    font-weight: 800;
    color: #5e2ced;
    margin-bottom: 1.2rem;
    letter-spacing: 0.9px;
    text-shadow: 0 1px 4px rgba(94,44,237,0.07);
    font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
`;

export const StatusInfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.2rem;
`;

export const StatusInfoLabel = styled.span`
    font-weight: 800;
    color: #5e2ced;
    font-size: 1.08rem;
    min-width: 120px;
    font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
    letter-spacing: 0.3px;
`;

export const StatusInfoValue = styled.span`
    font-weight: 700;
    color: ${({ status }) =>
        status === 'Concluída' || status === 'Concluido' ? '#28a745' :
        status === 'Não iniciado' ? '#dc3545' :
        '#222'};
    font-size: 1.08rem;
    text-align: right;
    font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
    letter-spacing: 0.3px;
    &.center {
        text-align: center;
        margin: 2rem 0;
        font-size: 1.18rem;
        color: #5e2ced;
        font-weight: 800;
        text-shadow: 0 1px 4px rgba(94,44,237,0.07);
    }
`;

export const PrazoRestante = styled.span`
    color: #dc3545;
    font-weight: 800;
    margin-left: 0.3rem;
    font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
`;

export const StatusFooter = styled.footer`
    text-align: center;
    color: #888;
    font-size: 1.05rem;
    margin-bottom: 1.5rem;
    margin-top: 0.5rem;
    letter-spacing: 0.3px;
    font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
`;

export const StatusLabelSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;
    padding: 0.7rem 0;
    text-align: center;
`;

export const Label = styled.span`
    font-size: 1.22rem;
    font-weight: 800;
    color: #5e2ced;
    margin-bottom: 0.3rem;
    font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
    letter-spacing: 0.4px;
    text-shadow: 0 1px 4px rgba(94,44,237,0.07);
`;
