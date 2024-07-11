// TabletServiceList.js
import React from 'react';
import styles from './Tablet.module.css';

const Tablet = () => {
  const servicesData = [
    { title: 'Troca da Tela', description: 'Substituição da tela danificada por uma nova, garantindo uma experiência visual renovada e sem interrupções.' },
    { title: 'Troca da Bateria', description: 'Serviço de substituição da bateria para garantir uma maior autonomia e vida útil do tablet.' },
    { title: 'Ativação de Bateria', description: 'Procedimento que visa ativar e otimizar o desempenho de uma nova bateria no tablet.' },
    { title: 'Troca da Tampa Traseira', description: 'Serviço que envolve a substituição da tampa traseira danificada, proporcionando um aspecto estético renovado.' },
    { title: 'Troca do Vidro da Câmera', description: 'Substituição do vidro da câmera danificado, assegurando a qualidade das fotografias e vídeos capturados.' },
    { title: 'Troca de Periféricos (Câmera, Flex dos Botões, Vibracall, Alto-Falante e Microfones)', description: 'Serviço abrangente que inclui a substituição de vários periféricos, restaurando a funcionalidade completa do tablet.' },
    { title: 'Reinstalação do Android (Hard Reset)', description: 'Procedimento de reinstalação do sistema operacional Android, também conhecido como hard reset, para resolver problemas de desempenho ou software.' },
    { title: 'Restauração ROM de Fábrica', description: 'Serviço que envolve o retorno do tablet às configurações originais de fábrica, eliminando personalizações e configurando-o como recém-saído da fábrica.' },
  ];

  return (
    <div className={styles.container}>
      {servicesData.map((service, index) => (
        <div className={styles.service} key={index}>
          <h2>{service.title}</h2>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Tablet;
