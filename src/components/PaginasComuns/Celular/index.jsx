import React from 'react';
import { Container, Service } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChargingStation, 
  faMobileAlt, 
  faBatteryFull, 
  faToolbox, 
  faCamera, 
  faMicrochip, 
  faSync, 
   
  faBolt, 
  faSprayCan, 
  faUserLock 
} from '@fortawesome/free-solid-svg-icons';

const servicesData = [
  {
    title: 'Troca de Conector de Carga',
    description: 'Serviço que envolve a substituição do conector de carga de dispositivos, garantindo a correta funcionalidade do carregamento.',
    icon: faChargingStation,
  },
  {
    title: 'Troca de Tela Quebrada',
    description: 'Serviço especializado na substituição de telas danificadas, proporcionando uma experiência visual e tátil renovada.',
    icon: faMobileAlt,
  },
  {
    title: 'Troca de Bateria',
    description: 'Procedimento que consiste na substituição da bateria do dispositivo, melhorando a autonomia e a vida útil.',
    icon: faBatteryFull,
  },
  {
    title: 'Troca da Tampa Traseira',
    description: 'Serviço que envolve a substituição da tampa traseira danificada, proporcionando um aspecto estético renovado.',
    icon: faToolbox,
  },
  {
    title: 'Troca do Vidro da Câmera',
    description: 'Substituição do vidro da câmera danificado, assegurando a qualidade das fotografias e vídeos capturados.',
    icon: faCamera,
  },
  {
    title: 'Troca de Periféricos',
    description: 'Serviço abrangente que inclui a substituição de vários periféricos, restaurando a funcionalidade completa do dispositivo.',
    icon: faMicrochip,
  },
  {
    title: 'Reinstalação do Android (Hard Reset)',
    description: 'Procedimento de reinstalação do sistema operacional Android, também conhecido como hard reset, para resolver problemas de desempenho ou software.',
    icon: faSync,
  },
  {
    title: 'Restauração ROM de Fábrica',
    description: 'Serviço que envolve o retorno do dispositivo às configurações originais de fábrica, eliminando personalizações e configurando-o como recém-saído da fábrica.',
    icon: faSync,
  },
  {
    title: 'Ativação de Bateria',
    description: 'Procedimento que visa ativar e otimizar o desempenho de uma nova bateria no dispositivo.',
    icon: faBolt,
  },
  {
    title: 'Limpeza e Desoxidação',
    description: 'Serviço de remoção de sujeira e oxidação, essencial para dispositivos que sofreram danos causados por líquidos.',
    icon: faSprayCan,
  },
  {
    title: 'Recuperação de Conta',
    description: 'Assistência na recuperação de contas de usuário, útil em casos de perda de acesso devido a esquecimento de senha ou outros problemas relacionados à conta.',
    icon: faUserLock,
  },
];

const Celular = () => {
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

export default Celular;