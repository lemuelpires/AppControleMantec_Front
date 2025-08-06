import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomeContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    background-image: 
        radial-gradient(circle at 25px 25px, rgba(52, 58, 64, 0.025) 1px, transparent 1px),
        radial-gradient(circle at 125px 75px, rgba(108, 117, 125, 0.02) 1.5px, transparent 1.5px),
        radial-gradient(circle at 200px 150px, rgba(173, 181, 189, 0.015) 1px, transparent 1px),
        url("data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236c757d' fill-opacity='0.025'%3E%3Ccircle cx='75' cy='75' r='3'/%3E%3Ccircle cx='225' cy='75' r='2'/%3E%3Ccircle cx='75' cy='225' r='2'/%3E%3Ccircle cx='225' cy='225' r='3'/%3E%3Ccircle cx='150' cy='150' r='1.5'/%3E%3Cpath d='M150 0v300h1V0h-1zm0 0h300v1H0V0z' fill-opacity='0.015'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-size: 50px 50px, 150px 150px, 250px 250px, 300px 300px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23495057' fill-opacity='0.02'%3E%3Cpath d='M50 50h10v10H50V50zm100 0h10v10h-10V50zm-50 50h10v10h-10v-10zm100 0h10v10h-10v-10zM50 150h10v10H50v-10zm100 0h10v10h-10v-10z'/%3E%3C/g%3E%3C/svg%3E"),
            linear-gradient(60deg, transparent 45%, rgba(173, 181, 189, 0.015) 47%, rgba(173, 181, 189, 0.015) 49%, transparent 51%),
            linear-gradient(120deg, transparent 45%, rgba(173, 181, 189, 0.015) 47%, rgba(173, 181, 189, 0.015) 49%, transparent 51%);
        background-size: 200px 200px, 180px 180px, 180px 180px;
        pointer-events: none;
        z-index: 0;
        opacity: 0.6;
    }
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23343a40' fill-opacity='0.03'%3E%3Cpath d='M100 100l50-50h50v50l-50 50v50h-50v-50l-50-50v-50h50zm200 0l50-50h50v50l-50 50v50h-50v-50l-50-50v-50h50zM100 300l50-50h50v50l-50 50v50h-50v-50l-50-50v-50h50zm200 0l50-50h50v50l-50 50v50h-50v-50l-50-50v-50h50z'/%3E%3C/g%3E%3C/svg%3E"),
            radial-gradient(ellipse 800px 600px at 50% 50%, transparent 60%, rgba(52, 58, 64, 0.008) 80%);
        background-size: 400px 400px, 100% 100%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.5;
    }
    
    > * {
        position: relative;
        z-index: 1;
    }
`;

export const SessionContainer = styled.section`
    display: flex;
    flex-wrap: wrap; /* Permitir quebra para melhor responsividade */
    justify-content: center;
    gap: 16px; /* Gap reduzido para cards menores */
`;

export const SectionTitle = styled.h2`
    font-size: clamp(24px, 4vw, 36px); /* Responsivo */
    margin-bottom: 30px;
    color: #2c3e50; /* Cor mais sofisticada */
    text-align: center;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    letter-spacing: -0.5px;
    
    &::after {
        content: '';
        display: block;
        width: 60px;
        height: 3px;
        background: linear-gradient(90deg, #007bff, #0056b3);
        margin: 12px auto 0;
        border-radius: 2px;
    }
`;

export const ServiceContainer = styled.div`
    flex: 1; /* Permitir que o card ocupe o espaço disponível */
    min-width: 220px; /* Largura mínima reduzida dos cards */
    max-width: 280px; /* Largura máxima para controlar o tamanho */
`;

export const ProductContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px; /* Gap reduzido para cards menores */
`;

export const Card = styled.div`
    border: 1px solid #e9ecef; /* Borda mais sutil */
    border-radius: 16px; /* Bordas mais arredondadas */
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); /* Transição mais suave */
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); /* Gradiente sutil */
    box-shadow: 
        0 4px 12px rgba(0, 0, 0, 0.08),
        0 2px 4px rgba(0, 0, 0, 0.05); /* Sombras mais refinadas */
    max-width: 280px;
    margin: 0 auto;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #007bff, #0056b3);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    &:hover {
        transform: translateY(-6px) scale(1.02); /* Efeito mais dramático */
        box-shadow: 
            0 12px 30px rgba(0, 0, 0, 0.12),
            0 6px 12px rgba(0, 123, 255, 0.1); /* Sombra colorida */
        
        &::before {
            opacity: 1;
        }
    }
`;

export const CardImage = styled.img`
    width: 100%;
    height: 160px; /* Altura reduzida da imagem */
    object-fit: cover;
`;

export const CardContent = styled.div`
    padding: 20px 18px; /* Padding um pouco maior para melhor respiração */
    text-align: center;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
`;

export const CardTitle = styled.h3`
    font-size: 1.2rem; /* Tamanho um pouco maior */
    margin-bottom: 10px;
    color: #2c3e50; /* Cor mais sofisticada */
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.3px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const CardDescription = styled.p`
    color: #6c757d; /* Cor mais suave */
    margin-bottom: 16px;
    text-align: center;
    font-size: 0.95rem; /* Fonte um pouco maior */
    line-height: 1.5; /* Line-height melhorado */
    font-weight: 400;
    opacity: 0.9;
`;

export const CardButton = styled.button`
    margin-top: 10px;
    padding: 10px 20px; /* Padding um pouco maior */
    border: none;
    border-radius: 25px; /* Bordas mais arredondadas (pill shape) */
    background: linear-gradient(135deg, #007bff, #0056b3); /* Gradiente */
    color: #fff;
    cursor: pointer;
    font-size: 0.9rem; /* Fonte um pouco maior */
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);

    &:hover {
        background: linear-gradient(135deg, #0056b3, #004085);
        transform: translateY(-2px) scale(1.05); /* Efeito mais pronunciado */
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
    }
    
    &:active {
        transform: translateY(0) scale(1.02);
    }
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: #333;
`;
