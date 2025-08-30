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
    background: linear-gradient(120deg, #f4f8ff 0%, #e3eafc 100%);
    min-height: 100vh;
    font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
`;

export const StatusCard = styled.div`
    max-width: 700px;
    margin: 2rem auto 1rem auto;
    border-radius: 18px;
    box-shadow: 0 6px 24px rgba(0,0,0,0.08), 0 1.5px 6px rgba(0,0,0,0.03);
    background: linear-gradient(120deg, #f8f9fc 70%, #e3eafc 100%);
    padding: 2rem 1rem;
    border: 1px solid #e1e7f0;
    animation: ${fadeInUp} 0.7s cubic-bezier(.25,.8,.25,1);
    transition: box-shadow 0.25s, transform 0.25s;
    will-change: box-shadow, transform;
    &:hover {
        box-shadow: 0 16px 48px rgba(106,17,203,0.22), 0 2px 12px rgba(39,71,255,0.13);
        transform: translateY(-2px) scale(1.012);
    }
    @media (max-width: 700px) {
        max-width: 98vw;
        padding: 1rem 0.5rem;
        margin: 1rem auto;
    }
`;

export const StatusHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    @media (max-width: 700px) {
        display: block;
        justify-content: center;
        align-items: flex-start;
        margin-bottom: 1rem;
    }
`;

export const StatusTitle = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    letter-spacing: -1px;
    margin-bottom: 0;
    @media (max-width: 700px) {
        font-size: 1.3rem;
        margin-bottom: 1rem;
    }
`;

export const StatusShareGroup = styled.div`
    display: flex;
    gap: 0.7rem;
    justify-content: flex-end;
    @media (max-width: 700px) {
        justify-content: center;
    }
`;

export const StatusShareButton = styled.button`
    background: linear-gradient(90deg,#007bff,#28a745);
    border-radius: 8px;
    padding: 0.5rem;
    box-shadow: 0 2px 8px rgba(0,123,255,0.07);
    border: none;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const OSSection = styled.div`
    margin-bottom: 3.5rem; // Espaçamento maior entre os cards principais
    @media (max-width: 700px) {
        margin-bottom: 2.5rem;
    }
`;

export const InfoSectionCard = styled.div`
    background: #f8f9fc;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    padding: 1.2rem 1.5rem;
    margin-bottom: 2.5rem;
    border: 1px solid #e1e7f0;
    /* Sobretom para destaque */
    &.highlight {
        background: #e3eafc;
    }
    &:last-child {
        margin-bottom: 0;
    }
    @media (max-width: 700px) {
        padding: 1rem;
        margin-bottom: 2rem;
    }
`;

export const ClienteNome = styled.div`
    font-weight: bold;
    color: #007bff;
    font-size: 1.1rem;
    margin-bottom: 0.7rem;
    @media (max-width: 700px) {
        font-size: 1rem;
    }
`;

export const StatusInfoRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0;
    margin-bottom: 0.4rem;
    @media (max-width: 700px) {
        flex-direction: column;
        gap: 0.2rem;
    }
`;

export const StatusInfoLabel = styled.span`
    color: #6c757d;
    font-weight: 500;
    margin-right: 0.5rem;
`;

export const StatusInfoValue = styled.span`
    color: #2c3e50;
    font-weight: bold;
`;

export const PrazoRestante = styled.span`
    color: #28a745;
    font-weight: bold;
    margin-left: 0.5rem;
`;

export const StatusLabelSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Label = styled.span`
    color: #2c3e50;
    font-weight: 500;
    font-size: 1rem;
`;

export const StatusStatusBadge = styled.span`
    background: ${({ status }) =>
        status === 'Concluido' ? '#28a745' :
        status === 'Cancelado' ? '#dc3545' :
        '#007bff'};
    color: #fff;
    border-radius: 8px;
    padding: 0.3rem 1rem;
    font-weight: bold;
    font-size: 1rem;
    margin-left: 1rem;
`;

export const StatusFooter = styled.div`
    color: #27292cff;
    font-size: 1rem;
    padding: 1.2rem 0;
    border-radius: 0 0 18px 18px;
    text-align: center;
    margin-top: 2rem;
    @media (max-width: 700px) {
        font-size: 0.95rem;
        padding: 1rem 0;
    }
`;

// Nova seção extra
export const StatusExtra = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: space-around;
    margin: 3.5rem auto; // Espaçamento maior entre containers principais
    padding: 2rem 1rem;
    background: linear-gradient(120deg, #e3eafc 0%, #f8f9fc 100%);
    border-radius: 18px;
    box-shadow: 0 4px 16px rgba(0, 123, 255, 0.07);
    max-width: 700px;
    @media (max-width: 700px) {

        flex-direction: column;
        gap: 1rem;
        margin: 2.5rem auto;
        padding: 1rem 0.3rem;
        max-width: 99vw;
    }
`;

export const StatusExtraCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1rem;
    background: ${({ $bgcolor }) => $bgcolor || '#f8f9fc'};
    border-radius: 14px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    border: 1px solid #e1e7f0;
    margin-bottom: 0;
    color: #2c3e50;
    @media (max-width: 700px) {
        padding: 1rem 0.3rem;
        margin-bottom: 1rem;
    }
`;

export const StatusExtraIcon = styled.div`
    margin-bottom: 0.7rem;
    font-size: 32px;
    color: #007bff;
    &.clock {
        color: #28a745;
        font-size: 64px;
    }
    @media (max-width: 700px) {
        font-size: 26px;
        &.clock {
            font-size: 50px;
        }
    }
`;

export const StatusExtraQr = styled.img`
    width: 140px;
    height: 140px;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    margin-bottom: 0.5rem;
    @media (max-width: 700px) {
        width: 110px;
        height: 110px;
    }
`;

export const StatusExtraQrLabel = styled.div`
    font-size: 0.95rem;
    color: #6c757d;
    margin-bottom: 0.5rem;
    @media (max-width: 700px) {
        font-size: 0.85rem;
    }
`;

export const StatusExtraPixLabel = styled.span`
    font-size: 0.95rem;
    color: #6c757d;
    display: block;
    margin-bottom: 0.3rem;
    @media (max-width: 700px) {
        font-size: 0.85rem;
    }
`;

export const StatusExtraPixRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    @media (max-width: 700px) {
        flex-direction: column;
    }
`;

export const StatusExtraPixInput = styled.input`
    width: 70%;
    font-size: 0.9rem;
    padding: 0.3rem;
    border: 1px solid #e1e7f0;
    border-radius: 6px;
    background: #f8f9fa;
    color: #2c3e50;
    @media (max-width: 700px) {
        font-size: 0.85rem;
    }
`;

export const StatusExtraPixBtn = styled.button`
    padding: 0.3rem 0.7rem;
    background: linear-gradient(90deg,#007bff,#28a745);
    color: #fff;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    font-size: 0.95rem;
    @media (max-width: 700px) {
        font-size: 0.85rem;
        margin-top: 0.5rem;
        padding: 0.3rem 0.5rem;
    }
`;

export const StatusExtraWhatsappRow = styled.div`
    margin: 1rem 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.7rem;
`;

export const StatusExtraWhatsappIcon = styled.div`
    font-size: 24px;
    color: #25D366;
    @media (max-width: 700px) {
        font-size: 20px;
    }
`;

export const StatusExtraWhatsappLink = styled.a`
    color: #25D366;
    font-weight: bold;
    text-decoration: none;
    font-size: 1.05rem;
    @media (max-width: 700px) {
        font-size: 0.95rem;
    }
`;

