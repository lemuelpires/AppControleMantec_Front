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
                    <CardImage src={carregador} alt="Carregador Kapbom tipo C" />
                    <CardContent>
                        <CardTitle>Carregador Kapbom tipo C</CardTitle>
                        <CardDescription>Descrição do produto 1.</CardDescription>
                    </CardContent>
                </Card>
                {/* Repita o padrão para os outros produtos */}
            </ProductContainer>
        </HomeContainer>
    );
};

export default Dashboard;
