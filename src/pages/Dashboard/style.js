import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomeContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa; /* Fundo mais suave */
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

export const SessionContainer = styled.section`
    display: flex;
    flex-wrap: wrap; /* Permitir quebra para melhor responsividade */
    justify-content: center;
    gap: 20px;
`;

export const SectionTitle = styled.h2`
    font-size: 32px; /* Tamanho de fonte maior */
    margin-bottom: 20px;
    color: #333; /* Cor de texto mais escura */
    text-align: center; /* Centralizar o título */
`;

export const ServiceContainer = styled.div`
    flex: 1; /* Permitir que o card ocupe o espaço disponível */
    min-width: 280px; /* Largura mínima dos cards */
`;

export const ProductContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

export const Card = styled.div`
    border: 1px solid #ddd; /* Borda mais clara */
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Adiciona sombra na transição */
    background-color: #ffffff; /* Fundo branco para os cards */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Sombra suave nos cards */
    
    &:hover {
        transform: translateY(-2px); /* Levantar o card */
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Sombra mais intensa ao passar o mouse */
    }
`;

export const CardImage = styled.img`
    width: 100%;
    height: 200px; /* Aumenta a altura da imagem para melhor visualização */
    object-fit: cover;
`;

export const CardContent = styled.div`
    padding: 20px; /* Aumenta o padding para mais espaçamento */
    text-align: center;
`;

export const CardTitle = styled.h3`
    font-size: 1.25rem; /* Aumenta o tamanho do título */
    margin-bottom: 10px;
    color: #333;
`;

export const CardDescription = styled.p`
    color: #555;
    margin-bottom: 15px; /* Adiciona espaçamento abaixo da descrição */
    text-align: justify; /* Justifica o texto para um visual mais uniforme */
`;

export const CardButton = styled.button`
    margin-top: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: #333;
`;
