import React from 'react';
import { Container, Service } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWindowRestore,  
  faPlug, 
  faFan, 
  faMemory, 
  faBatteryHalf, 
  faVideo, 
} from '@fortawesome/free-solid-svg-icons';

const Computador = () => {
  const servicesData = [
    { 
      title: 'Formatação do Windows, iOS e Linux', 
      description: 'Serviço abrangente que visa a formatação e otimização dos sistemas operacionais Windows, iOS e Linux, garantindo desempenho eficiente e funcionalidades aprimoradas.', 
      icon: faWindowRestore
    },
    { 
      title: 'Instalação de Drivers', 
      description: 'Procedimento especializado na instalação de drivers essenciais para maximizar a compatibilidade e o desempenho do hardware, assegurando um funcionamento suave do sistema.', 
      icon: faPlug 
    },
    { 
      title: 'Limpeza e Troca de Pasta Térmica', 
      description: 'Manutenção física que inclui limpeza interna do sistema e substituição da pasta térmica, proporcionando um controle térmico eficaz e prevenindo o superaquecimento.', 
      icon: faFan 
    },
    { 
      title: 'Upgrade de Processador, Memória, HD', 
      description: 'Oferecemos serviços de upgrade que abrangem processador, memória e HD, visando melhorar o desempenho geral do sistema e proporcionar uma experiência mais rápida e eficiente.', 
      icon: faMemory 
    },
    { 
      title: 'Troca de Bateria BIOS', 
      description: 'Procedimento específico para a troca da bateria da BIOS, garantindo o funcionamento adequado do sistema e evitando possíveis problemas de inicialização.', 
      icon: faBatteryHalf 
    },
    { 
      title: 'Troca da Placa de Vídeo', 
      description: 'Serviço especializado na substituição da placa de vídeo, proporcionando melhor desempenho gráfico e atendendo às demandas de processamento visual mais intensivo.', 
      icon: faVideo 
    },
  ];

  return (
    <Container>
      {servicesData.map((service, index) => (
        <Service key={index}>
          <FontAwesomeIcon icon={service.icon} size="2x" style={{ marginBottom: '10px', color: '#007BFF' }} />
          <h2>{service.title}</h2>
          <p>{service.description}</p>
        </Service>
      ))}
    </Container>
  );
};

export default Computador;
