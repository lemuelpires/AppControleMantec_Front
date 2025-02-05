import React from 'react';
import {
    HomeContainer,
    SessionContainer,
    SectionTitle,
    ServiceContainer,
    ProductContainer,
    Card,
    CardImage,
    CardContent,
    CardTitle,
    CardDescription,
    CardButton,
    StyledLink
} from './style';
import celular from '../../assets/img/celular.jpg';
import tablet from '../../assets/img/tablet.avif';
import computador from '../../assets/img/computador.webp';
import notebook from '../../assets/img/notebook.jpeg';
import carregador from '../../assets/img/carregador_kapbom.webp';
import pelicula from '../../assets/img/pelicula.webp';
import cabos from '../../assets/img/cabo_usb.webp';
import mouses from '../../assets/img/mouse.webp';
import teclados from '../../assets/img/teclado.webp';
//import fundo2 from '../../assets/fundo/fundo4.png';

const Dashboard = () => {
    const servicesData = [
        {
            title: 'Conserto de Celular',
            description: 'Substituição do conector de carga de dispositivos, garantindo a correta funcionalidade.',
            imagem: celular,
            route: '/celular',
        },
        {
            title: 'Conserto de Tablet',
            description: 'Substituição de telas danificadas, proporcionando uma experiência visual e tátil renovada.',
            imagem: tablet,
            route: '/tablet',
        },
        {
            title: 'Conserto de Computador',
            description: 'Substituição da bateria do dispositivo, melhorando a autonomia e a vida útil.',
            imagem: computador,
            route: '/computador',
        },
        {
            title: 'Conserto de Notebook',
            description: 'Substituição da tampa traseira danificada, proporcionando um aspecto estético renovado.',
            imagem: notebook,
            route: '/notebook',
        },
    ];

    return (
        <HomeContainer>
            <SectionTitle>Serviços</SectionTitle>
            <SessionContainer>
                {servicesData.map((service, index) => (
                    <ServiceContainer key={index}>
                        <Card>
                            <StyledLink to={service.route}>
                                <CardImage src={service.imagem} alt={service.title} />
                                <CardContent>
                                    <CardTitle>{service.title}</CardTitle>
                                    <CardDescription>{service.description}</CardDescription>
                                    <CardButton>Saiba mais</CardButton>
                                </CardContent>
                            </StyledLink>
                        </Card>
                    </ServiceContainer>
                ))}
            </SessionContainer>

            <SectionTitle>Produtos Disponíveis</SectionTitle>
            <ProductContainer>
                <Card>
                    <CardImage src={carregador} alt="Carregadores Kapbom" />
                    <CardContent>
                        <CardTitle>Carregadores Kapbom</CardTitle>
                        <CardDescription>Carregadores de diversos tipos</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardImage src={pelicula} alt="Peliculas 3D de diversos tipos" />
                    <CardContent>
                        <CardTitle>Películas 3D</CardTitle>
                        <CardDescription>Peliculas de diversos modelos</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardImage src={cabos} alt="Cabos de diversos tipos" />
                    <CardContent>
                        <CardTitle>Cabos USB</CardTitle>
                        <CardDescription>Cabos de diversos tipos</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardImage src={mouses} alt="Mouses de diversos tipos" />
                    <CardContent>
                        <CardTitle>Mouses</CardTitle>
                        <CardDescription>Mouses de diversos tipos</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardImage src={teclados} alt="Teclados de diversos tipos" />
                    <CardContent>
                        <CardTitle>Teclados</CardTitle>
                        <CardDescription>Teclados de diversos tipos</CardDescription>
                    </CardContent>
                </Card>
                {/* Repita o padrão para os outros produtos */}
            </ProductContainer>

            {/* Botão Flutuante do WhatsApp */}
            <a
                href="https://wa.me/5516992614410"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#25D366',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                }}
            >
                <i
                    className="fab fa-whatsapp"
                    style={{ fontSize: '24px' }}
                ></i>
            </a>
        </HomeContainer>
    );
};

export default Dashboard;
