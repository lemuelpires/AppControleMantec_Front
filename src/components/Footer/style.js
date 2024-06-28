import styled from 'styled-components';

export const FooterContainer = styled.footer`
    background-color: #2a4658;
    color: #fff;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export const ContactContainer = styled.div`
    max-width: 600px;
    align-self: center;
    font-size: 12px;
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
    color: #fff;
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
    padding-bottom: 2em;
`;

export const DefaultInfoTitle = styled.h3`
    font-size: 14px;
    color: #fff;
`;

export const DefaultInfoText = styled.p`
    color: #ddd;
`;
