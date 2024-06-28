import React from 'react';
import {
    FooterContainer,
    ContactContainer,
    ContactTitle,
    ContactDescription,
    WhatsAppButton,
    DefaultInfoContainer,
    DefaultInfoTitle,
    DefaultInfoText
} from './style';

const Footer = () => {
    const handleWhatsAppRedirect = () => {
        window.location.href = 'https://wa.me/5516992614410';
    };

    return (
        <FooterContainer>
            <ContactContainer>
                <ContactTitle>Contatos</ContactTitle>
                <ContactDescription>Entre em contato conosco pelo WhatsApp:</ContactDescription>
                <WhatsAppButton onClick={handleWhatsAppRedirect}>Enviar mensagem</WhatsAppButton>
            </ContactContainer>

            {/* Informações Padrão - Exemplo */}
            <DefaultInfoContainer>
                <DefaultInfoTitle>Informações Gerais</DefaultInfoTitle>
                <DefaultInfoText>Endereço: Rua Exemplo, 123</DefaultInfoText>
                <DefaultInfoText>E-mail: exemplo@example.com</DefaultInfoText>
                <DefaultInfoText>Telefone: (12) 3456-7890</DefaultInfoText>
            </DefaultInfoContainer>
        </FooterContainer>
    );
};

export default Footer;
