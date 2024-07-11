import styled from 'styled-components';

export const FooterContainer = styled.footer`
    background-color: #22292a;
    color: #d9d9d9;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export const ContactContainer = styled.div`
    max-width: 600px;
    align-self: center;
    font-size: 12px;
    padding-bottom: 1em;
`;

export const ContactTitle = styled.h2`
    font-size: 14px;
    margin-bottom: 10px;
`;

export const ContactDescription = styled.p`
    margin-bottom: 20px;
`;

export const WhatsAppButton = styled.button`
    background-color: #25d366;
    color: #d9d9d9;
    padding: 10px 20px;
    font-size: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #128c7e;
    }
`;

export const DefaultInfoContainer = styled.div`
    margin-top: 30px;
    text-align: center;
    font-size: 12px;
`;

export const DefaultInfoTitle = styled.h3`
    font-size: 14px;
    color: #d9d9d9;
`;

export const DefaultInfoText = styled.p`
    color: #d9d9d9;
`;

export const Mapa = styled.a`
    text-decoration: none;
    color: #93e593;
    display: flex;
    align-items: center;
    display: flex;
    justify-content: center;
    padding-top: 1em;
    gap: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        color: green;
    }
`;
