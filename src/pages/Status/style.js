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

// Animação pulsante para ícones
const pulse = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
`;

export const StatusContainer = styled.div`
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%);
        pointer-events: none;
    }
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
    background: linear-gradient(45deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -1px;
    margin-bottom: 0;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
    background: #ffffff;
    border: none;
    border-radius: 50%;
    padding: 0.6rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {   
        background: #f1f3f5;
        box-shadow: 0 6px 16px rgba(0,0,0,0.15);
        transform: translateY(-2px);
    }
    &:active {
        transform: translateY(0);
    }
    @media (max-width: 700px) {
        padding: 0.5rem;
    }
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
    align-items: left;
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
    text-align: left;
`;

export const StatusInfoValue = styled.span`
    color: #2c3e50;
    font-weight: bold;
    text-align: left;
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
        status === 'Concluído' ? 'linear-gradient(45deg, #28a745, #20c997)' :
        status === 'Entregue' ? 'linear-gradient(45deg, #17a2b8, #20c997)' :
        status === 'Cancelado' ? 'linear-gradient(45deg, #dc3545, #fd7e14)' :
        status === 'Orçamento' ? 'linear-gradient(45deg, #ffc107, #fd7e14)' :
        'linear-gradient(45deg, #007bff, #6610f2)'};
    color: #fff;
    border-radius: 20px;
    padding: 0.4rem 1.2rem;
    font-weight: bold;
    font-size: 0.9rem;
    margin-left: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

export const StatusFooter = styled.div`
    color: #636e72;
    font-size: 1rem;
    padding: 1.5rem 0;
    border-radius: 0 0 18px 18px;
    text-align: center;
    margin-top: 2rem;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
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
    padding: 1.5rem;
    background: ${({ $bgcolor }) => $bgcolor || 'rgba(255, 255, 255, 0.8)'};
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 0;
    color: #2c3e50;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    }
    @media (max-width: 700px) {
        padding: 1rem 0.5rem;
        margin-bottom: 1rem;
    }
`;

export const StatusExtraIcon = styled.div`
    margin-bottom: 0.7rem;
    font-size: 36px;
    color: #6c5ce7;
    filter: drop-shadow(0 2px 4px rgba(108, 92, 231, 0.3));
    animation: ${pulse} 2s infinite;
    &.clock {
        color: #00b894;
        font-size: 72px;
        filter: drop-shadow(0 2px 4px rgba(0, 184, 148, 0.3));
    }
    @media (max-width: 700px) {
        font-size: 30px;
        &.clock {
            font-size: 60px;
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
    padding: 0.5rem 1rem;
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: #fff;
    border: none;
    border-radius: 25px;
    font-weight: bold;
    cursor: pointer;
    font-size: 0.95rem;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }
    @media (max-width: 700px) {
        font-size: 0.85rem;
        margin-top: 0.5rem;
        padding: 0.4rem 0.8rem;
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
    font-size: 28px;
    color: #00b894;
    filter: drop-shadow(0 2px 4px rgba(0, 184, 148, 0.3));
    @media (max-width: 700px) {
        font-size: 24px;
    }
`;

export const StatusExtraWhatsappLink = styled.a`
    color: #00b894;
    font-weight: bold;
    text-decoration: none;
    font-size: 1.05rem;
    transition: color 0.2s ease;
    &:hover {
        color: #00cec9;
        text-decoration: underline;
    }
    @media (max-width: 700px) {
        font-size: 0.95rem;
    }
`;

