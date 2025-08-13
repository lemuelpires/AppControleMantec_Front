import styled from 'styled-components';

export const ReciboContainer = styled.div`
  padding: 2rem 3rem;
  max-width: 900px;
  margin: 2rem auto;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
  user-select: none;

  @media print {
    box-shadow: none;
    margin: 0;
    padding: 1rem;
    max-width: 100%;
    color: #000;
    user-select: text;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e1e7f0;
  padding-bottom: 1rem;
`;

export const CompanyInfo = styled.div`
  h1 {
    margin: 0;
    font-size: 2.2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;
  }

  .subtitle {
    margin-top: 0.3rem;
    font-size: 1rem;
    font-weight: 500;
    color: #6c757d;
    max-width: 350px;
  }
`;

export const CompanyData = styled.div`
  text-align: right;
  font-size: 0.9rem;
  color: #495057;
  line-height: 1.4;

  p {
    margin: 0.15rem 0;
    strong {
      color: #2c3e50;
      font-weight: 600;
    }
  }
`;

export const ClientSection = styled.section`
  margin-bottom: 2rem;

  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #007bff;
    border-left: 6px solid #007bff;
    padding-left: 1rem;
    user-select: none;
  }
`;

export const ClientInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media(max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  margin-bottom: 0.6rem;
  align-items: center;

  strong {
    min-width: 120px;
    font-weight: 600;
    color: #495057;
    font-size: 0.95rem;
    user-select: text;
  }

  span {
    color: #2c3e50;
    font-size: 0.95rem;
    word-break: break-word;
  }
`;

export const ServiceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);

  thead {
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: #fff;

    th {
      padding: 0.75rem 0.5rem;
      font-weight: 700;
      font-size: 0.85rem;
      text-align: center;
      letter-spacing: 0.03em;
      user-select: none;
    }
  }

  tbody {
    tr {
      &:nth-child(even) {
        background-color: #f8f9fa;
      }
      &:hover {
        background-color: #e9f0ff;
      }
    }

    td {
      padding: 0.55rem 0.5rem;
      font-size: 0.9rem;
      color: #2c3e50;
      vertical-align: middle;

      &.center {
        text-align: center;
      }
      &.right {
        text-align: right;
        font-weight: 600;
        color: #28a745;
      }
    }
  }
`;

export const TotalSection = styled.div`
  text-align: right;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, rgba(40,167,69,0.12) 0%, rgba(40,167,69,0.07) 100%);
  border-radius: 8px;
  border-left: 5px solid #28a745;
  margin-bottom: 2rem;

  .total-label {
    font-weight: 600;
    font-size: 1.1rem;
    color: #495057;
    margin-bottom: 0.25rem;
    user-select: none;
  }

  .total-value {
    font-size: 1.6rem;
    font-weight: 800;
    color: #28a745;
    user-select: text;
    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }
`;

export const PaymentSection = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media(max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PaymentBox = styled.div`
  background: #f4f9ff;
  border: 1px solid #cce1ff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.15);
  padding: 1rem 1.5rem;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 15px rgba(102, 126, 234, 0.3);
  }

  h4 {
    margin: 0 0 0.75rem 0;
    color: #667eea;
    font-weight: 700;
    font-size: 1rem;
    user-select: none;
  }

  .value {
    font-size: 1.3rem;
    font-weight: 700;
    color: #2c3e50;
    text-align: center;
    user-select: text;
  }
`;

export const SignatureSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 3rem;

  @media(max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const SignatureBox = styled.div`
  text-align: center;
  background: #f7f9fc;
  border: 1px solid #d0d7e4;
  border-radius: 10px;
  padding: 1.5rem 1rem;
  user-select: none;

  .line {
    border-bottom: 2px solid #6c757d;
    margin: 2rem 0 1rem 0;
    height: 55px;
    font-style: italic;
    color: #495057;
    user-select: text;
  }

  .label {
    font-weight: 600;
    font-size: 0.95rem;
    color: #495057;
    letter-spacing: 0.5px;
    user-select: none;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;

  @media print {
    display: none;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  border-radius: 8px;
  padding: 0.75rem 1.8rem;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: all 0.3s ease;

  &.print {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.5);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
  }

  &.close {
    background: linear-gradient(135deg, #6c757d 0%, #545b62 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(108, 117, 125, 0.5);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(108, 117, 125, 0.6);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 4px 15px rgba(108, 117, 125, 0.4);
    }
  }
`;
