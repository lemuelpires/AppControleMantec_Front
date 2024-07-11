import React from 'react';
import { Container, Service } from './style';

const servicesData = [
  {
    title: 'Troca de Conector de Carga',
    description: 'Serviço que envolve a substituição do conector de carga de dispositivos, garantindo a correta funcionalidade do carregamento.',
  },
  {
    title: 'Troca de Tela Quebrada',
    description: 'Serviço especializado na substituição de telas danificadas, proporcionando uma experiência visual e tátil renovada.',
  },
  {
    title: 'Troca de Bateria',
    description: 'Procedimento que consiste na substituição da bateria do dispositivo, melhorando a autonomia e a vida útil.',
  },
  {
    title: 'Troca da Tampa Traseira',
    description: 'Serviço que envolve a substituição da tampa traseira danificada, proporcionando um aspecto estético renovado.',
  },
  {
    title: 'Troca do Vidro da Câmera',
    description: 'Substituição do vidro da câmera danificado, assegurando a qualidade das fotografias e vídeos capturados.',
  },
  {
    title: 'Troca de Periféricos (Câmera, Flex dos Botões, Vibracall, Alto-Falante e Microfones)',
    description: 'Serviço abrangente que inclui a substituição de vários periféricos, restaurando a funcionalidade completa do dispositivo.',
  },
  {
    title: 'Reinstalação do Android (Hard Reset)',
    description: 'Procedimento de reinstalação do sistema operacional Android, também conhecido como hard reset, para resolver problemas de desempenho ou software.',
  },
  {
    title: 'Restauração ROM de Fábrica',
    description: 'Serviço que envolve o retorno do dispositivo às configurações originais de fábrica, eliminando personalizações e configurando-o como recém-saído da fábrica.',
  },
  {
    title: 'Ativação de Bateria',
    description: 'Procedimento que visa ativar e otimizar o desempenho de uma nova bateria no dispositivo.',
  },
  {
    title: 'Limpeza e Desoxidação',
    description: 'Serviço de remoção de sujeira e oxidação, essencial para dispositivos que sofreram danos causados por líquidos.',
  },
  {
    title: 'Recuperação de Conta',
    description: 'Assistência na recuperação de contas de usuário, útil em casos de perda de acesso devido a esquecimento de senha ou outros problemas relacionados à conta.',
  },
];

const Celular = () => {
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

export default Celular;
