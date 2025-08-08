// Recibo para Cliente - Mantec Informática
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import apiCliente from '../../../../services/apiCliente';

const ReciboContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #2c3e50;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 850px;
  margin: 0 auto;
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #007bff 0%, #0056b3 50%, #004085 100%);
    border-radius: 12px 12px 0 0;
  }
  
  @media print {
    /* Centralizar na página A4 */
    border: 1px solid #ddd;
    padding: 0;
    margin: 0 auto;
    max-width: 210mm;
    width: 100%;
    font-size: 10px;
    background: white;
    box-shadow: none;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    
    &::before {
      display: none;
    }
  }
// Reexportação para o novo local centralizado do ReciboCliente
export { default } from '../../../Impressao/ReciboCliente';

`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, #007bff, #28a745);
  }
  
  @media print {
    border-bottom: 1px solid #000;
    
    &::after {
      background: #000;
    }
  }
`;

const CompanyInfo = styled.div`
  flex: 1;
  
  h1 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
  }
  
  .subtitle {
    margin: 0.3rem 0 0 0;
    font-size: 0.95rem;
    color: #6c757d;
    font-weight: 400;
    line-height: 1.4;
  }
  
  @media print {
    h1 {
      color: #000 !important;
      -webkit-text-fill-color: #000;
    }
    
    .subtitle {
      color: #000;
    }
  }
`;

const CompanyData = styled.div`
  text-align: right;
  font-size: 0.85rem;
  background: rgba(0, 123, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #007bff;
  
  p {
    margin: 0.3rem 0;
    font-weight: 500;
    color: #495057;
    
    strong {
      color: #2c3e50;
    }
  }
  
  @media print {
    background: white;
    border: 1px solid #ddd;
    border-left: 2px solid #000;
    
    p, strong {
      color: #000 !important;
    }
  }
`;

const ClientSection = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
    background: linear-gradient(135deg, rgba(0, 123, 255, 0.1) 0%, rgba(0, 123, 255, 0.05) 100%);
    padding: 0.8rem 1rem;
    border-radius: 8px 8px 0 0;
    border-left: 4px solid #007bff;
    position: relative;
    
    &::after {
      content: '👤';
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.2rem;
    }
  }
  
  @media print {
    h3 {
      background: #f0f0f0;
      border: 1px solid #000;
      border-left: 2px solid #000;
      color: #000;
      
      &::after {
        display: none;
      }
    }
  }
`;

const ClientInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  padding: 1.2rem;
  background: rgba(248, 249, 250, 0.8);
  border-radius: 0 0 8px 8px;
  border: 1px solid rgba(0, 123, 255, 0.1);
  border-top: none;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  @media print {
    background: white;
    border: 1px solid #000;
    border-top: none;
  }
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  align-items: flex-start;
  
  strong {
    min-width: 110px;
    font-weight: 600;
    color: #495057;
    font-size: 0.9rem;
  }
  
  span {
    color: #2c3e50;
    font-weight: 400;
    line-height: 1.4;
    word-break: break-word;
  }
  
  @media print {
    strong, span {
      color: #000;
    }
  }
`;

const ServiceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  
  th, td {
    border: 1px solid rgba(0, 123, 255, 0.2);
    padding: 0.12rem 0.12rem;
    text-align: left;
    font-size: 0.58rem;
    vertical-align: middle;
    line-height: 1.1;
    min-height: 12px;
  }
  
  th {
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    font-weight: 600;
    text-align: center;
    font-size: 0.55rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-color: rgba(255, 255, 255, 0.2);
    line-height: 1.1;
    min-height: 12px;
  }
  
  tbody tr {
    transition: background-color 0.2s ease;
    
    &:nth-child(even) {
      background: rgba(0, 123, 255, 0.02);
    }
    
    &:hover {
      background: rgba(0, 123, 255, 0.05);
    }
  }
  
  .center {
    text-align: center;
    font-weight: 500;
  }
  
  .right {
    text-align: right;
    font-weight: 600;
    color: #28a745;
  }
  
  .total-row {
    font-weight: 700;
    background: linear-gradient(135deg, rgba(40, 167, 69, 0.1) 0%, rgba(40, 167, 69, 0.05) 100%);
    border-top: 2px solid #28a745;
    
    td {
      border-color: rgba(40, 167, 69, 0.3);
      color: #2c3e50;
    }
    
    .right {
      color: #28a745;
      font-size: 0.85rem;
    }
  }
  
  @media print {
    box-shadow: none;
    th {
      background: #f0f0f0 !important;
      color: #000 !important;
      border: 1px solid #000;
      font-size: 0.48rem;
      padding: 0.08rem 0.08rem;
      line-height: 1.05;
      min-height: 10px;
    }
    td {
      border: 1px solid #000;
      font-size: 0.48rem;
      padding: 0.08rem 0.08rem;
      line-height: 1.05;
      min-height: 10px;
    }
    tbody tr {
      &:nth-child(even) {
        background: #f9f9f9 !important;
      }
      &:hover {
        background: inherit !important;
      }
    }
    .right {
      color: #000 !important;
    }
    .total-row {
      background: #f0f0f0 !important;
      border-top: 1px solid #000;
      td {
        color: #000 !important;
      }
      .right {
        color: #000 !important;
      }
    }
  }
`;

const PaymentSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  @media print {
    gap: 1rem;
  }
`;

const PaymentBox = styled.div`
  border: 1px solid rgba(0, 123, 255, 0.2);
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  h4 {
    margin: 0;
    font-size: 0.9rem;
    text-align: center;
    background: linear-gradient(135deg, rgba(0, 123, 255, 0.1) 0%, rgba(0, 123, 255, 0.05) 100%);
    padding: 0.8rem;
    font-weight: 600;
    color: #495057;
    border-bottom: 1px solid rgba(0, 123, 255, 0.1);
  }
  
  .value {
    text-align: center;
    font-size: 1.1rem;
    font-weight: 600;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2c3e50;
    padding: 1rem;
    background: rgba(248, 249, 250, 0.5);
  }
  
  @media print {
    border: 1px solid #000;
    box-shadow: none;
    transform: none;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
    
    h4 {
      background: #f0f0f0;
      color: #000;
      border-bottom: 1px solid #000;
    }
    
    .value {
      color: #000;
      background: white;
    }
  }
`;

const TotalSection = styled.div`
  text-align: right;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(40, 167, 69, 0.08) 0%, rgba(40, 167, 69, 0.03) 100%);
  border-radius: 8px;
  border-left: 4px solid #28a745;
  
  .total-label {
    font-size: 1rem;
    color: #495057;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .total-value {
    font-size: 1.4rem;
    font-weight: 700;
    color: #28a745;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  @media print {
    background: #f9f9f9;
    border: 1px solid #000;
    border-left: 2px solid #000;
    
    .total-label, .total-value {
      color: #000;
      text-shadow: none;
    }
  }
`;

const SignatureSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 3rem;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  @media print {
    gap: 2rem;
    margin-top: 2rem;
  }
`;

const SignatureBox = styled.div`
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  background: rgba(248, 249, 250, 0.5);
  border: 1px solid rgba(0, 123, 255, 0.1);
  
  .line {
    border-bottom: 1.5px solid #6c757d;
    margin: 2rem 0 1rem 0;
    height: 50px;
    position: relative;
    
    &::after {
      content: '✍️';
      position: absolute;
      right: -10px;
      bottom: -15px;
      font-size: 1.2rem;
      opacity: 0.3;
    }
  }
  
  .label {
    font-size: 0.95rem;
    font-weight: 600;
    color: #495057;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  @media print {
    background: white;
    border: 1px solid #000;
    
    .line {
      border-bottom: 1px solid #000;
      height: 40px;
      
      &::after {
        display: none;
      }
    }
    
    .label {
      color: #000;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 123, 255, 0.1);
  
  @media print {
    display: none;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &.print {
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
  
  &.close {
    background: linear-gradient(135deg, #6c757d 0%, #545b62 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(108, 117, 125, 0.4);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
`;

const ReciboCliente = ({ ordemDeServico, onClose }) => {
  const [cliente, setCliente] = useState(null);
  const [funcionario, setFuncionario] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Buscar cliente e funcionário
        const [clienteData, funcionarioData] = await Promise.all([
          apiCliente.get(`/cliente/${ordemDeServico.clienteID}`),
          apiCliente.get(`/funcionario/${ordemDeServico.funcionarioID}`)
        ]);
        
        setCliente(clienteData.data);
        setFuncionario(funcionarioData.data);
        
        // Buscar produtos
        const produtosToFetch = [];
        if (ordemDeServico.produtos && Array.isArray(ordemDeServico.produtos)) {
          produtosToFetch.push(...ordemDeServico.produtos.filter(p => p.produtoID));
        } else if (ordemDeServico.produtoID) {
          produtosToFetch.push({ produtoID: ordemDeServico.produtoID, quantidade: ordemDeServico.quantidadeProduto || 1 });
        }
        
        const produtosData = await Promise.all(
          produtosToFetch.map(async (produto) => {
            const response = await apiCliente.get(`/produto/${produto.produtoID}`);
            return {
              ...response.data,
              quantidade: produto.quantidade
            };
          })
        );
        setProdutos(produtosData);
        
        // Buscar serviços
        const servicosToFetch = [];
        if (ordemDeServico.servicos && Array.isArray(ordemDeServico.servicos)) {
          servicosToFetch.push(...ordemDeServico.servicos.filter(s => s.servicoID));
        } else if (ordemDeServico.servicoID) {
          servicosToFetch.push({ servicoID: ordemDeServico.servicoID, quantidade: ordemDeServico.quantidadeServico || 1 });
        }
        
        const servicosData = await Promise.all(
          servicosToFetch.map(async (servico) => {
            const response = await apiCliente.get(`/servico/${servico.servicoID}`);
            return {
              ...response.data,
              quantidade: servico.quantidade
            };
          })
        );
        setServicos(servicosData);
        
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    if (ordemDeServico) {
      fetchData();
    }
  }, [ordemDeServico]);

  const formatDate = (dateString) => {
    if (!dateString) return '____/____/____';
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch {
      return '____/____/____';
    }
  };

  const formatCurrency = (value) => {
    if (!value) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);
  };

  const calcularTotalServicos = () => {
    return servicos.reduce((total, servico) => {
      return total + ((parseFloat(servico.preco) || 0) * (servico.quantidade || 1));
    }, 0);
  };

  const calcularTotalProdutos = () => {
    return produtos.reduce((total, produto) => {
      return total + ((parseFloat(produto.preco) || 0) * (produto.quantidade || 1));
    }, 0);
  };

  const calcularTotalGeral = () => {
    return calcularTotalServicos() + calcularTotalProdutos();
  };

  const printRecibo = () => {
    const printContent = document.getElementById('recibo-print');
    const originalDisplay = document.body.style.display;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent.outerHTML;
    document.body.style.display = 'block';
    window.print();
    setTimeout(() => {
      document.body.innerHTML = originalContents;
      document.body.style.display = originalDisplay;
    }, 1000);
  };

  if (loading) {
    return (
      <ReciboContainer>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Carregando dados do recibo...
        </div>
      </ReciboContainer>
    );
  }

  if (!cliente || !funcionario) {
    return (
      <ReciboContainer>
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          Erro: Dados incompletos para gerar o recibo.
        </div>
      </ReciboContainer>
    );
  }

  return (
    <ReciboContainer id="recibo-print">
      <Header>
        <CompanyInfo>
          <h1>Mantec Informática</h1>
          <p className="subtitle">Assistência Técnica Especializada em Computadores, Celulares e Tablets</p>
        </CompanyInfo>
        <CompanyData>
          <p><strong>CNPJ:</strong> 27.737.565/0001-02</p>
          <p><strong>Telefone:</strong> (16) 3506 3698</p>
          <p><strong>Celular:</strong> (16) 99261-4410</p>
        </CompanyData>
      </Header>

      <div style={{ textAlign: 'right', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#6c757d' }}>
        <strong>Data de Emissão:</strong> {formatDate(new Date())}
      </div>

      <ClientSection className="client-section">
        <h3>DADOS DO CLIENTE</h3>
        <ClientInfo className="client-info">
          <div>
            <InfoRow>
              <strong>Nome:</strong>
              <span>{cliente.nome || 'Não informado'}</span>
            </InfoRow>
            <InfoRow>
              <strong>Telefone:</strong>
              <span>{cliente.telefone || 'Não informado'}</span>
            </InfoRow>
            <InfoRow>
              <strong>Email:</strong>
              <span>{cliente.email || 'Não informado'}</span>
            </InfoRow>
          </div>
          <div>
            <InfoRow>
              <strong>CPF/CNPJ:</strong>
              <span>{cliente.cpf || cliente.cnpj || 'Não informado'}</span>
            </InfoRow>
            <InfoRow>
              <strong>Endereço:</strong>
              <span>{[cliente.endereco, cliente.cidade, cliente.estado].filter(Boolean).join(', ') || 'Não informado'}</span>
            </InfoRow>
          </div>
        </ClientInfo>
      </ClientSection>

      <ServiceTable>
        <thead>
          <tr>
            <th style={{ width: '70px' }}>Código</th>
            <th style={{ width: '200px' }}>Descrição</th>
            <th>Produto/Serviço</th>
            <th style={{ width: '80px' }}>Qtd</th>
            <th style={{ width: '120px' }}>Valor</th>
          </tr>
        </thead>
        <tbody>
          {/* Renderizar serviços */}
          {servicos.map((servico, index) => (
            <tr key={`servico-${index}`}>
              <td className="center">{ordemDeServico.id || '----'}</td>
              <td>
                {ordemDeServico.observacoes ? 
                  ordemDeServico.observacoes.substring(0, 50) + '...' : 
                  'Serviço de manutenção'
                }
              </td>
              <td>{servico.nome}</td>
              <td className="center">{servico.quantidade || 1}</td>
              <td className="right">{formatCurrency((parseFloat(servico.preco) || 0) * (servico.quantidade || 1))}</td>
            </tr>
          ))}

          {/* Renderizar produtos */}
          {produtos.map((produto, index) => (
            <tr key={`produto-${index}`}>
              <td className="center">{ordemDeServico.id || '----'}</td>
              <td>Venda de produto</td>
              <td>{produto.nome}</td>
              <td className="center">{produto.quantidade || 1}</td>
              <td className="right">{formatCurrency((parseFloat(produto.preco) || 0) * (produto.quantidade || 1))}</td>
            </tr>
          ))}

          {/* Linhas vazias se necessário */}
          {[...Array(Math.max(0, 5 - servicos.length - produtos.length))].map((_, index) => (
            <tr key={`empty-${index}`}>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </ServiceTable>

      <TotalSection className="total-section">
        <div className="total-label">Total pagamento à vista (custos de importação incluídos):</div>
        <div className="total-value">{formatCurrency(calcularTotalGeral())}</div>
      </TotalSection>

      <PaymentSection className="payment-section">
        <PaymentBox className="payment-box">
          <h4 className="payment-header">Pagamento à prazo:</h4>
          <div className="value payment-value">
            {calcularTotalGeral() > 0 ? 'À vista' : '___________'}
          </div>
        </PaymentBox>
        <PaymentBox className="payment-box">
          <h4 className="payment-header">Total à Prazo:</h4>
          <div className="value payment-value">___________</div>
        </PaymentBox>
        <PaymentBox className="payment-box">
          <h4 className="payment-header">Garantia (Dias):</h4>
          <div className="value payment-value">90 dias</div>
        </PaymentBox>
      </PaymentSection>

      <SignatureSection className="signature-section">
        <SignatureBox className="signature-box">
          <div className="line signature-line"></div>
          <div className="label">Assinatura do Cliente</div>
        </SignatureBox>
        <SignatureBox className="signature-box">
          <div className="line signature-line"></div>
          <div className="label">Assinatura do Responsável</div>
        </SignatureBox>
      </SignatureSection>

      <ButtonContainer>
        <Button className="print" onClick={printRecibo}>
          🖨️ Imprimir Recibo
        </Button>
        <Button className="close" onClick={onClose}>
          ✕ Fechar
        </Button>
      </ButtonContainer>
    </ReciboContainer>
  );
};

export default ReciboCliente;
