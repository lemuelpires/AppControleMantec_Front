import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faHome, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  Container,
  ContentWrapper,
  IconContainer,
  Title,
  Message,
  ButtonsContainer,
  ActionButton,
  BackgroundPattern
} from './style';

const Unauthorized = ({ onGoHome, onGoBack }) => {
  return (
    <Container>
      <BackgroundPattern />
      <ContentWrapper>
        <IconContainer>
          <FontAwesomeIcon icon={faLock} />
        </IconContainer>
        
        <Title>Acesso Negado</Title>
        
        <Message>
          Ops! Parece que você não tem permissão para acessar esta área.
          <br />
          Verifique suas credenciais ou entre em contato com o administrador.
        </Message>
        
        <ButtonsContainer>
          <ActionButton primary onClick={onGoHome}>
            <FontAwesomeIcon icon={faHome} />
            Ir para Home
          </ActionButton>
          
          <ActionButton onClick={onGoBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Voltar
          </ActionButton>
        </ButtonsContainer>
      </ContentWrapper>
    </Container>
  );
};

export default Unauthorized;
