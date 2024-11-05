import React from 'react';
import { Container, Service } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTabletAlt, 
  faBatteryHalf, 
  faCamera, 
  faTools, 
  faRedo, 
  faUndoAlt 
} from '@fortawesome/free-solid-svg-icons';

const Tablet = () => {
  const servicesData = [
    { 
      title: 'Troca da Tela', 
      description: 'Substituição da tela danificada por uma nova, garantindo uma experiência visual renovada e sem interrupções.',
      icon: faTabletAlt 
    },
    { 
      title: 'Troca da Bateria', 
      description: 'Serviço de substituição da bateria para garantir uma maior autonomia e vida útil do tablet.',
      icon: faBatteryHalf 
    },
    { 
      title: 'Ativação de Bateria', 
      description: 'Procedimento que visa ativar e otimizar o desempenho de uma nova bateria no tablet.',
      icon: faTools 
    },
    { 
      title: 'Troca da Tampa Traseira', 
      description: 'Serviço que envolve a substituição da tampa traseira danificada, proporcionando um aspecto estético renovado.',
      icon: faUndoAlt 
    },
    { 
      title: 'Troca do Vidro da Câmera', 
      description: 'Substituição do vidro da câmera danificado, assegurando a qualidade das fotografias e vídeos capturados.',
      icon: faCamera 
    },
    { 
      title: 'Troca de Periféricos', 
      description: 'Serviço abrangente que inclui a substituição de vários periféricos, restaurando a funcionalidade completa do tablet.',
      icon: faTools 
    },
    { 
      title: 'Reinstalação do Android (Hard Reset)', 
      description: 'Procedimento de reinstalação do sistema operacional Android, também conhecido como hard reset, para resolver problemas de desempenho ou software.',
      icon: faRedo 
    },
    { 
      title: 'Restauração ROM de Fábrica', 
      description: 'Serviço que envolve o retorno do tablet às configurações originais de fábrica, eliminando personalizações e configurando-o como recém-saído da fábrica.',
      icon: faUndoAlt 
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

export default Tablet;
