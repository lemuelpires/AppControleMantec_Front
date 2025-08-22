// Recibo para Cliente - Mantec Informática
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import apiCliente from '../../../../services/apiCliente';
import {
  ReciboContainer,
  Header,
  CompanyInfo,
  CompanyData,
  ClientSection,
  ClientInfo,
  InfoRow,
  ServiceTable,
  PaymentSection,
  PaymentBox,
  TotalSection,
  SignatureSection,
  SignatureBox,
  ButtonContainer,
  Button
} from './style'; // ajuste o caminho conforme a localização do seu style.js

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

        // Buscar produtos (usando produtoIDs e pecasUtilizadas) sem duplicidade
        let produtoQuantidadeMap = {};

        // Adiciona produtoIDs
        if (Array.isArray(ordemDeServico.produtoIDs)) {
          ordemDeServico.produtoIDs.forEach(id => {
            // Adiciona apenas se não estiver em pecasUtilizadas
            const jaUtilizada = Array.isArray(ordemDeServico.pecasUtilizadas)
              ? ordemDeServico.pecasUtilizadas.some(p => String(p.produtoID) === String(id))
              : false;
            if (!jaUtilizada) {
              produtoQuantidadeMap[id] = (produtoQuantidadeMap[id] || 0) + 1;
            }
          });
        }
        // Adiciona pecasUtilizadas
        if (Array.isArray(ordemDeServico.pecasUtilizadas)) {
          ordemDeServico.pecasUtilizadas.forEach(p => {
            if (p.produtoID) {
              produtoQuantidadeMap[p.produtoID] = (produtoQuantidadeMap[p.produtoID] || 0) + (p.quantidade || 1);
            }
          });
        }
        // Compatibilidade com formato antigo
        if (ordemDeServico.produtoID) {
          produtoQuantidadeMap[ordemDeServico.produtoID] = (produtoQuantidadeMap[ordemDeServico.produtoID] || 0) + 1;
        }

        // Monta array sem duplicados
        const produtosToFetch = Object.entries(produtoQuantidadeMap).map(([produtoID, quantidade]) => ({
          produtoID,
          quantidade
        }));

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

        // Buscar serviços (usando servicoIDs)
        let servicosToFetch = [];
        if (Array.isArray(ordemDeServico.servicoIDs)) {
          servicosToFetch = ordemDeServico.servicoIDs.map(id => ({ servicoID: id, quantidade: 1 }));
        }
        // Compatibilidade com formato antigo
        if (ordemDeServico.servicoID) {
          servicosToFetch.push({ servicoID: ordemDeServico.servicoID, quantidade: 1 });
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

  // Calcular total de produtos sem duplicidade com pecasUtilizadas
  const calcularTotalProdutos = () => {
    // Exclui IDs que já estão em pecasUtilizadas
    const pecasIDs = Array.isArray(ordemDeServico.pecasUtilizadas)
      ? ordemDeServico.pecasUtilizadas.map(p => String(p.produtoID))
      : [];
    return produtos
      .filter(produto => !pecasIDs.includes(String(produto.id || produto._id || produto.produtoID)))
      .reduce((total, produto) => {
        return total + ((parseFloat(produto.preco) || 0) * (produto.quantidade || 1));
      }, 0);
  };

  // Calcular total das peças utilizadas
  const calcularTotalPecasUtilizadas = () => {
    if (!Array.isArray(ordemDeServico.pecasUtilizadas)) return 0;
    return ordemDeServico.pecasUtilizadas.reduce((sum, p) => {
      const prod = produtos.find(produto =>
        String(produto.id || produto._id || produto.produtoID) === String(p.produtoID)
      );
      const preco = prod ? parseFloat(prod.preco) || 0 : 0;
      return sum + (preco * (Number(p.quantidade) || 1));
    }, 0);
  };

  // Calcular total dos serviços
  const calcularTotalServicos = () => {
    return servicos.reduce((total, servico) => {
      return total + ((parseFloat(servico.preco) || 0) * (servico.quantidade || 1));
    }, 0);
  };

  // Calcular total geral (serviços + produtos sem duplicidade + peças utilizadas + mão de obra manual)
  const calcularTotalGeral = () => {
    return (
      calcularTotalServicos() +
      calcularTotalProdutos() +
      calcularTotalPecasUtilizadas() +
      (Number(ordemDeServico.valorMaoDeObra) || 0)
    );
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
            <th>Valor Unitário</th>
            <th style={{ width: '80px' }}>Qtd</th>
            <th style={{ width: '120px' }}>Valor</th>
          </tr>
        </thead>
        <tbody>
          {/* Renderizar serviços */}
          {servicos.map((servico, index) => (
            <tr key={`servico-${index}`}>
              <td className="center">{ordemDeServico.numeroOS || '----'}</td>
              <td>
                {ordemDeServico.observacoes ?
                  ordemDeServico.observacoes.substring(0, 50) + '...' :
                  'Serviço de manutenção'
                }
              </td>
              <td>{servico.nome}</td>
              <td className="right">{formatCurrency(parseFloat(servico.preco) || 0)}</td>
              <td className="center">{servico.quantidade || 1}</td>
              <td className="right">{formatCurrency((parseFloat(servico.preco) || 0) * (servico.quantidade || 1))}</td>
            </tr>
          ))}

          {/* Renderizar produtos */}
          {produtos.map((produto, index) => (
            <tr key={`produto-${index}`}>
              <td className="center">{ordemDeServico.numeroOS || '----'}</td>
              <td>Peça instalada - modelo: {ordemDeServico.modelo || 'Não informado'}</td>
              <td>{produto.nome}</td>
              <td className="right">{formatCurrency(parseFloat(produto.preco) || 0)}</td>
              <td className="center">{produto.quantidade || 1}</td>
              <td className="right">{formatCurrency((parseFloat(produto.preco) || 0) * (produto.quantidade) + ordemDeServico.valorMaoDeObra)}</td>
            </tr>
          ))}

          {/* Linhas vazias se necessário */}
          {[...Array(Math.max(0, 5 - servicos.length - produtos.length))].map((_, index) => (
            <tr key={`empty-${index}`}>
              <td >&nbsp;</td>
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
        <div className="total-label">Total pagamento à vista:</div>
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
          <div className="line signature-line">{cliente.nome}</div>
          <div className="label"> Assinatura do Cliente</div>
        </SignatureBox>
        <SignatureBox className="signature-box">
          <div className="line signature-line">{funcionario.nome}</div>
          <div className="label"> Assinatura do Responsável</div>
        </SignatureBox>
      </SignatureSection>

      {/* Termos de Garantia */}
      <div
        style={{
          marginTop: '2rem',
          padding: '1rem 1.5rem',
          background: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '0.95rem',
          color: '#333',
          border: '1px solid #e1e7f0'
        }}
      >
        <strong>Termos de Garantia:</strong>
        <div style={{ marginTop: '0.7rem', marginBottom: '0.7rem', paddingLeft: '1.2rem' }}>
          <div>A garantia cobre apenas defeitos de fabricação das peças instaladas e serviços realizados.</div>
          <div>Não cobre danos causados por mau uso, quedas, líquidos, surtos elétricos, vírus, software, ou intervenção de terceiros.</div>
          <div>Produtos com sinais de violação, remoção de lacres, ou reparos não autorizados terão a garantia anulada.</div>
          <div>O prazo de garantia é de 90 dias a partir da retirada do aparelho</div>
          <div>Para acionamento da garantia, é obrigatória a apresentação deste recibo.</div>
        </div>
        <span style={{ fontSize: '0.9rem', color: '#666' }}>
          Em caso de dúvidas, entre em contato com a Mantec Informática.
        </span>
      </div>

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