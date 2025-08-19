import styled from 'styled-components';

export const FooterContainer = styled.footer`
    background-color: #22292a;
    color: #d9d9d9;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    padding: 2em 4vw;
    gap: 2em;
    box-shadow: 0 -2px 16px rgba(0,0,0,0.12);

    @media (max-width: 900px) {
        gap: 1.5em;
        padding: 1.5em 2vw;
    }
    @media (max-width: 700px) {
        gap: 1em;
        padding: 1.2em 1em;
        flex-direction: column;
        align-items: center;
    }
`;

export const ContactContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 320px;
    font-size: 12px;
    padding: 1.2em 1em 1em 1em;
    margin-bottom: 0.5em;

    @media (max-width: 700px) {
        max-width: 100%;
        box-shadow: none;
        border-radius: 0;
        padding: 1em 0.5em;
    }
`;

export const ContactTitle = styled.h2`
    font-size: 16px;
    margin-bottom: 8px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-align: center;
    color: #93e593;
    font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
    text-shadow: 0 1px 8px rgba(34,41,42,0.12);
`;

export const ContactDescription = styled.p`
    margin-bottom: 12px;
    font-size: 13px;
    color: #b5b5b5;
    text-align: center;
    font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
    font-weight: 400;
    line-height: 1.7;
    letter-spacing: 0.5px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 7px;
    justify-content: center;
`;

export const WhatsAppButton = styled.button`
    background: linear-gradient(90deg, #25d366 60%, #128c7e 100%);
    color: #fff;
    padding: 8px 18px;
    font-size: 11px;
    border: 1.5px solid #1fa855;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(34,41,42,0.18);
    transition: background 0.3s, box-shadow 0.3s, transform 0.1s;

    &:hover {
        background: linear-gradient(90deg, #128c7e 60%, #25d366 100%);
        box-shadow: 0 4px 16px rgba(34,41,42,0.22);
        transform: scale(1.04);
    }

    &:active {
        transform: scale(0.98);
    }
`;

export const InstagramButton = styled.button`
    background: linear-gradient(90deg, #fd1d1d 0%, #833ab4 50%, #fcb045 100%);
    color: #fff;
    padding: 8px 18px;
    font-size: 11px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 600;
    box-shadow: 0 1px 4px rgba(34,41,42,0.12);
    transition: opacity 0.3s, box-shadow 0.3s;

    &:hover {
        opacity: 0.85;
        box-shadow: 0 2px 8px rgba(34,41,42,0.18);
    }
`;

export const DefaultInfoContainer = styled.div`
    margin-top: 0;
    text-align: center;
    font-size: 12px;
    max-width: 320px;
    padding: 1.2em 1em 1em 1em;
    margin-bottom: 0.5em;

    @media (max-width: 700px) {
        margin-top: 18px;
        max-width: 100%;
        box-shadow: none;
        border-radius: 0;
        padding: 1em 0.5em;
    }
`;

export const DefaultInfoTitle = styled.h3`
    font-size: 14px;
    color: #93e593;
    margin-bottom: 10px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-align: center;
    font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
    text-shadow: 0 1px 8px rgba(34,41,42,0.12);
`;

export const DefaultInfoText = styled.p`
    color: #d9d9d9;
    margin-bottom: 8px;
    font-size: 12px;
    line-height: 1.5;
    text-align: center;
    font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
    font-weight: 400;
    letter-spacing: 0.4px;
    text-shadow: 0 1px 6px rgba(34,41,42,0.08);
    padding: 0.2em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Mapa = styled.a`
    text-decoration: none;
    color: #93e593;
    background: rgba(147,229,147,0.08);
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    border-radius: 16px;
    padding: 4px 14px 4px 10px;
    box-shadow: 0 1px 6px rgba(34,41,42,0.08);
    border: 1px solid rgba(147,229,147,0.18);
    transition: 
        color 0.3s,
        background 0.3s,
        box-shadow 0.3s,
        transform 0.15s;
    margin-top: 6px;
    align-self: center;

    & svg {
        font-size: 16px;
        margin-right: 2px;
        transition: color 0.3s;
        color: #93e593;
    }

    &:hover {
        color: #fff;
        background: linear-gradient(90deg, #93e593 60%, #25d366 100%);
        box-shadow: 0 2px 12px rgba(34,41,42,0.18);
        transform: scale(1.05);

        & svg {
            color: #fff;
        }
    }
`;
