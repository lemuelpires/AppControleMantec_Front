// HomeStyles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomeContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: rgb(234 234 234 / 90%);
`;

export const SessionContainer = styled.section`
    display: flex;
`;

export const SectionTitle = styled.h2`
    font-size: 28px;
    margin-bottom: 20px;
    color: black;
`;

export const ServiceContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

export const ProductContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

export const Card = styled.div`
    margin-bottom: 20px;
    border: 1px solid #a1a0a8;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease;
    margin: 1em;
    max-width: 300px;
    max-height: 380px;
    background-color: #efe8e8;
    
    &:hover {
        transform: scale(1.05);
    }
`;

export const CardImage = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
`;

export const CardContent = styled.div`
    padding: 15px;
    text-align: center;
`;

export const CardTitle = styled.h3`
    font-size: 100%;
    margin-bottom: 10px;
    color: #333;
`;

export const CardDescription = styled.p`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #555;
`;

export const CardButton = styled.button`
    margin-top: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
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
