import React from 'react';
import { FaMapMarkerAlt, FaInstagram } from 'react-icons/fa'; // Adicione o ícone do Instagram
import {
    FooterContainer,
    ContactContainer,
    ContactTitle,
    ContactDescription,
    WhatsAppButton,
    InstagramButton, // Adicione o novo botão estilizado
    DefaultInfoContainer,
    DefaultInfoTitle,
    DefaultInfoText,
    DefaultInfoText1,
    Mapa,
} from './style';

const Footer = () => {
    const handleWhatsAppRedirect = () => {
        window.location.href = 'https://wa.me/5516992614410';
    };

    const handleInstagramRedirect = () => {
        window.open('https://www.instagram.com/mantec.celulares?igsh=b2tnYWp0Y3R6dmd2', '_blank', 'noopener,noreferrer');
    };

    return (
        <FooterContainer>
            <ContactContainer>
                <ContactTitle>Contatos</ContactTitle>
                <ContactDescription>
                    Entre em contato conosco pelo WhatsApp ou siga-nos no Instagram:
                </ContactDescription>
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    <WhatsAppButton onClick={handleWhatsAppRedirect}>
                        Enviar mensagem
                    </WhatsAppButton>
                    <InstagramButton onClick={handleInstagramRedirect}>
                        <FaInstagram style={{ marginRight: '6px' }} />
                        Instagram
                    </InstagramButton>
                </div>
                
            </ContactContainer>

            <DefaultInfoContainer>
                <DefaultInfoTitle>Informações Gerais</DefaultInfoTitle>
                <DefaultInfoText>
                    <span style={{ fontWeight: 500 }}>
                        Endereço:
                    </span> Rua Américo Vezzani, 855, Bairro Jardim Italia - Matão/SP
                    <Mapa
                        href="https://www.google.com/maps/search/?api=1&query=Rua+Américo+Vezzani,+855,+Bairro+Jardim+Italia+-+Matão/SP"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaMapMarkerAlt style={{ marginLeft: '8px' }} /> Ver no mapa
                    </Mapa>
                </DefaultInfoText>
                <DefaultInfoText1>
                    <span style={{ fontWeight: 500 }}>Telefone:  </span> (16) 9926-14410
                </DefaultInfoText1>
            </DefaultInfoContainer>
        </FooterContainer>
    );
};

export default Footer;
