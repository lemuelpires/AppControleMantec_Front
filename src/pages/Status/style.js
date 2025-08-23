import styled from 'styled-components';

export const StatusContainer = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #f3f3f3 0%, #e9e9ff 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0 0 0;
`;

export const StatusCard = styled.div`
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 6px 32px rgba(106,17,203,0.09);
    max-width: 480px;
    width: 100%;
    padding: 2.5rem 2rem 2rem 2rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
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
    font-size: 1.7rem;
    font-weight: 800;
    color: #6a11cb;
    letter-spacing: 0.5px;
    margin: 0;
    @media (max-width: 600px) {
        font-size: 1.2rem;
    }
`;

export const StatusShareGroup = styled.div`
    display: flex;
    align-items: center;
`;

export const StatusShareButton = styled.button`
    background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
    border: none;
    border-radius: 50%;
    padding: 0.6rem;
    cursor: pointer;
    transition: box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(106,17,203,0.09);
    display: flex;
    align-items: center;
    &:hover {
        box-shadow: 0 4px 16px rgba(106,17,203,0.18);
    }
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
    font-size: 1.12rem;
    font-weight: 600;
    color: #6a11cb;
    margin-bottom: 0.3rem;
`;

export const OSSection = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`;

export const StatusStatusBadge = styled.div`
    font-size: 1.05rem;
    font-weight: 700;
    padding: 0.5rem 1.2rem;
    border-radius: 12px;
    margin-bottom: 0.8rem;
    color: #fff;
    width: fit-content;
    box-shadow: 0 2px 8px rgba(106,17,203,0.07);
    background: ${({ status }) =>
        status === 'Concluída' ? '#28a745' :
        status === 'Em andamento' ? '#007bff' :
        status === 'Não iniciado' ? '#dc3545' :
        '#888'};
`;

export const InfoSectionCard = styled.div`
    background: #f7f7ff;
    border-radius: 12px;
    padding: 1.2rem 1rem;
    margin-bottom: 0.5rem;
    box-shadow: 0 1px 6px rgba(106,17,203,0.04);
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    @media (max-width: 600px) {
        padding: 0.8rem 0.4rem;
    }
`;

export const ClienteNome = styled.div`
    font-size: 1.15rem;
    font-weight: 700;
    color: #6a11cb;
    margin-bottom: 1.2rem;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 4px rgba(106,17,203,0.07);
`;

export const StatusInfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.2rem;
`;

export const StatusInfoLabel = styled.span`
    font-weight: 600;
    color: #444;
    font-size: 1rem;
    min-width: 120px;
`;

export const StatusInfoValue = styled.span`
    font-weight: 500;
    color: ${({ status }) =>
        status === 'Concluída' ? '#28a745' :
        status === 'Não iniciado' ? '#dc3545' :
        '#222'};
    font-size: 1rem;
    text-align: right;
    &.center {
        text-align: center;
        margin: 2rem 0;
        font-size: 1.1rem;
        color: #6a11cb;
    }
`;

export const PrazoRestante = styled.span`
    color: #dc3545;
    font-weight: 700;
    margin-left: 0.3rem;
`;

export const StatusFooter = styled.footer`
    text-align: center;
    color: #888;
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    margin-top: 0.5rem;
    letter-spacing: 0.2px;
`;
