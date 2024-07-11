import React from 'react';
import { Container, Service } from './style';

const Notebook = () => {
  const servicesData = [
    { title: 'Formatação do Windows, iOS e Linux', description: 'Serviço abrangente que visa a formatação e otimização dos sistemas operacionais Windows, iOS e Linux, garantindo desempenho eficiente e funcionalidades aprimoradas.' },
    { title: 'Instalação de Drivers', description: 'Procedimento especializado na instalação de drivers essenciais para maximizar a compatibilidade e o desempenho do hardware, assegurando um funcionamento suave do sistema.' },
    { title: 'Limpeza e Troca de Pasta Térmica', description: 'Manutenção física que inclui limpeza interna do sistema e substituição da pasta térmica, proporcionando um controle térmico eficaz e prevenindo o superaquecimento.' },
    { title: 'Upgrade de Processador, Memória, HD', description: 'Oferecemos serviços de upgrade que abrangem processador, memória e HD, visando melhorar o desempenho geral do sistema e proporcionar uma experiência mais rápida e eficiente.' },
    { title: 'Troca de Bateria BIOS', description: 'Procedimento específico para a troca da bateria da BIOS, garantindo o funcionamento adequado do sistema e evitando possíveis problemas de inicialização.' },
    { title: 'Troca da Tela', description: 'Substituição da tela danificada por uma nova, garantindo uma experiência visual renovada e sem interrupções.' },
    { title: 'Troca do Teclado', description: 'Serviço de substituição do teclado, assegurando um input preciso e eficiente para seu notebook.' },
    { title: 'Troca do Mousepad', description: 'Substituição do mousepad danificado por um novo, proporcionando um controle suave e preciso.' },
    { title: 'Troca da Bateria', description: 'Serviço de substituição da bateria para garantir uma maior autonomia e vida útil do notebook.' },
  ];

  return (
    <Container>
      {servicesData.map((service, index) => (
        <Service key={index}>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
        </Service>
      ))}
    </Container>
  );
};

export default Notebook;
