import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Importe o ícone de localização
import {
    FooterContainer,
    ContactContainer,
    ContactTitle,
    ContactDescription,
    WhatsAppButton,
    DefaultInfoContainer,
    DefaultInfoTitle,
    DefaultInfoText,
    Mapa,
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

            <DefaultInfoContainer>
                <DefaultInfoTitle>Informações Gerais</DefaultInfoTitle>
                <DefaultInfoText>
                    Endereço: Rua Américo Vezzani, 855, Bairro Jardim Italia - Matão/SP
                    <Mapa 
                        href="https://www.google.com/maps/search/?api=1&query=Rua+Américo+Vezzani,+855,+Bairro+Jardim+Italia+-+Matão/SP" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <FaMapMarkerAlt style={{ marginLeft: '8px' }} /> Ver no mapa
                    </Mapa>
                </DefaultInfoText>
                <DefaultInfoText>E-mail: mantec10design@gmail.com</DefaultInfoText>
                <DefaultInfoText>Telefone: (16) 9926-14410</DefaultInfoText>
            </DefaultInfoContainer>
        </FooterContainer>
    );
};

export default Footer;
