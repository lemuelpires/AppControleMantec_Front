// Relatório Profissional de Ordem de Serviço - Mantec Informática
import React, { useEffect, useState } from 'react';
import {
  ReportContainer,
  Card,
  Header,
  CompanyLogo,
  HeaderTitle,
  HeaderSubtitle,
  OSBadge,
  ContentGrid,
  InfoSection,
  SectionTitle,
  InfoRow,
  InfoLabel,
  InfoValue,
  Table,
  CheckboxSection,
  CheckboxItem,
  SignatureSection,
  SignatureBox,
  ButtonContainer,
  Button,
  StatusBadge,
  LoadingContainer,
  ErrorContainer,
  PrintGlobalStyle, // Importação do estilo global de impressão
} from './style';
import { format } from 'date-fns';
import apiCliente from '../../../../services/apiCliente';

const OrdemDeServicoReport = ({ ordemDeServico, onClose }) => {
  const [cliente, setCliente] = useState(null);
  const [funcionario, setFuncionario] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Busca cliente e funcionário
        const [clienteData, funcionarioData] = await Promise.all([
          apiCliente.get(`/cliente/${ordemDeServico.clienteID}`),
          apiCliente.get(`/funcionario/${ordemDeServico.funcionarioID}`)
        ]);
        setCliente(clienteData.data);
        setFuncionario(funcionarioData.data);

        // -------- Produtos --------
        let produtosToFetch = [];

        // Caso tenha "pecasUtilizadas" (produtoID + quantidade)
        if (Array.isArray(ordemDeServico.pecasUtilizadas) && ordemDeServico.pecasUtilizadas.length > 0) {
          produtosToFetch = ordemDeServico.pecasUtilizadas.map(p => ({
            id: p.produtoID || p._id || p.id,
            quantidade: p.quantidade || 1
          })).filter(p => p.id);

          // Caso tenha "produtoIDs" simples
        } else if (Array.isArray(ordemDeServico.produtoIDs) && ordemDeServico.produtoIDs.length > 0) {
          produtosToFetch = ordemDeServico.produtoIDs.map(id => ({
            id,
            quantidade: 1
          }));
        }

        // Busca os produtos no backend
        const produtosData = await Promise.all(
          produtosToFetch.map(async (produto) => {
            try {
              const response = await apiCliente.get(`/produto/${produto.id}`);
              return {
                ...response.data,
                quantidade: produto.quantidade
              };
            } catch (err) {
              // console.error(`Erro ao buscar produto ${produto.id}:`, err); // Remova se não quiser log de erro
              return null;
            }
          })
        );
        setProdutos(produtosData.filter(Boolean));

        // -------- Serviços --------
        let servicosToFetch = [];

        // Caso tenha "servicoIDs"
        if (Array.isArray(ordemDeServico.servicoIDs) && ordemDeServico.servicoIDs.length > 0) {
          servicosToFetch = ordemDeServico.servicoIDs.map(id => ({
            id,
            quantidade: 1
          }));

          // Caso tenha "servicos" com quantidade
        } else if (Array.isArray(ordemDeServico.servicos) && ordemDeServico.servicos.length > 0) {
          servicosToFetch = ordemDeServico.servicos.map(s => ({
            id: s.servicoID || s._id || s.id,
            quantidade: s.quantidade || 1
          })).filter(s => s.id);
        }

        const servicosData = await Promise.all(
          servicosToFetch.map(async (servico) => {
            try {
              const response = await apiCliente.get(`/servico/${servico.id}`);
              return {
                ...response.data,
                quantidade: servico.quantidade,
                preco: response.data.preco || 0
              };
            } catch (err) {
              // console.error(`Erro ao buscar serviço ${servico.id}:`, err); // Remova se não quiser log de erro
              return null;
            }
          })
        );
        setServicos(servicosData.filter(Boolean));

      } catch (error) {
        console.error("Erro ao carregar dados:", error); // Remova se não quiser log de erro
        setError('Erro ao carregar dados. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    if (ordemDeServico) {
      fetchData();
    }
  }, [ordemDeServico]);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch {
      return 'Data inválida';
    }
  };

  const formatCurrency = (value) => {
    if (!value) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'Concluída': 'concluida',
      'Em andamento': 'em-andamento',
      'Pendente': 'pendente',
      'Orçamento': 'orcamento'
    };
    return statusMap[status] || 'pendente';
  };

  const printReport = () => {
    window.print();
  };

  if (loading) {
    return (
      <>
        <PrintGlobalStyle />
        <ReportContainer>
          <LoadingContainer>
            Carregando dados do relatório...
          </LoadingContainer>
        </ReportContainer>
      </>
    );
  }

  if (error) {
    return (
      <>
        <PrintGlobalStyle />
        <ReportContainer>
          <ErrorContainer>
            {error}
          </ErrorContainer>
        </ReportContainer>
      </>
    );
  }

  if (!cliente || !funcionario) {
    return (
      <>
        <PrintGlobalStyle />
        <ReportContainer>
          <ErrorContainer>
            Dados incompletos para gerar o relatório.
          </ErrorContainer>
        </ReportContainer>
      </>
    );
  }

  // Calcular valorServico (soma dos serviços)
  const valorServico = servicos.reduce(
    (sum, servico) => sum + ((servico.preco || 0) * (servico.quantidade || 1)),
    0
  );

  // Calcular valorProdutosServicos (soma dos serviços e produtos listados na tabela)
  const valorProdutosServicos =
    servicos.reduce((sum, servico) => sum + ((servico.preco || 0) * (servico.quantidade || 1)), 0) +
    produtos.reduce((sum, produto) => sum + ((produto.preco || 0) * (produto.quantidade || 1)), 0);

  // Calcular valorTotal (todas linhas da tabela: serviços, produtos, mão de obra manual)
  const valorTotal =
    valorProdutosServicos +
    (Number(ordemDeServico.valorMaoDeObra) || 0);

  return (
    <>
      <PrintGlobalStyle />
      <ReportContainer id="report-to-print">
        {/* Cabeçalho */}
        <Header>
          <CompanyLogo>M</CompanyLogo>
          <HeaderTitle>Mantec Informática</HeaderTitle>
          <HeaderSubtitle>Assistência Técnica Especializada</HeaderSubtitle>
          <OSBadge>
            Ordem de Serviço #{ordemDeServico.numeroOS || ordemDeServico.id || 'N/A'}
          </OSBadge>
        </Header>

        {/* Dados do Cliente e Serviço */}
        <Card>
          <ContentGrid>
            <InfoSection>
              <SectionTitle>👤 Cliente</SectionTitle>
              <InfoRow><InfoLabel>Nome</InfoLabel><InfoValue className="highlight">{cliente.nome || 'Não informado'}</InfoValue></InfoRow>
              <InfoRow><InfoLabel>Telefone</InfoLabel><InfoValue>{cliente.telefone || 'Não informado'}</InfoValue></InfoRow>
              <InfoRow><InfoLabel>Email</InfoLabel><InfoValue>{cliente.email || 'Não informado'}</InfoValue></InfoRow>
              <InfoRow><InfoLabel>Documento</InfoLabel><InfoValue>{cliente.cpf || cliente.cnpj || 'Não informado'}</InfoValue></InfoRow>
              <InfoRow><InfoLabel>Endereço</InfoLabel><InfoValue>{[cliente.endereco, cliente.cidade, cliente.estado].filter(Boolean).join(', ') || 'Não informado'}</InfoValue></InfoRow>
            </InfoSection>

            <InfoSection>
              <SectionTitle>⚙️ Serviço</SectionTitle>
              <InfoRow><InfoLabel>Status</InfoLabel><InfoValue><StatusBadge className={getStatusBadge(ordemDeServico.status)}>{ordemDeServico.status || 'Pendente'}</StatusBadge></InfoValue></InfoRow>
              <InfoRow><InfoLabel>Prioridade</InfoLabel><InfoValue>{ordemDeServico.prioridade || 'Normal'}</InfoValue></InfoRow>
              <InfoRow><InfoLabel>Tipo Atendimento</InfoLabel><InfoValue>{ordemDeServico.tipoAtendimento || 'N/A'}</InfoValue></InfoRow>
              <InfoRow><InfoLabel>Data Entrada</InfoLabel><InfoValue>{formatDate(ordemDeServico.dataEntrada)}</InfoValue></InfoRow>
              <InfoRow><InfoLabel>Prev. Conclusão</InfoLabel><InfoValue>{formatDate(ordemDeServico.dataConclusao)}</InfoValue></InfoRow>
              <InfoRow><InfoLabel>Funcionário</InfoLabel><InfoValue className="highlight">{funcionario.nome || 'Não atribuído'}</InfoValue></InfoRow>
              <InfoRow><InfoLabel>Cargo</InfoLabel><InfoValue>{funcionario.cargo || 'Técnico'}</InfoValue></InfoRow>
            </InfoSection>
          </ContentGrid>
        </Card>
        {/* Informações dos dispositivos e Serviços */}
        <Card>
          <SectionTitle>📝 Dispositivos e Serviços</SectionTitle>
          <InfoRow>
            <InfoLabel>Defeito Relatado</InfoLabel>
            <InfoValue>{ordemDeServico.defeitoRelatado || 'Não informado'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Diagnóstico</InfoLabel>
            <InfoValue>{ordemDeServico.diagnostico || 'Não informado'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Laudo Técnico</InfoLabel>
            <InfoValue>{ordemDeServico.laudoTecnico || 'Não informado'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Marca</InfoLabel>
            <InfoValue>{ordemDeServico.marca || 'Não informado'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Modelo</InfoLabel>
            <InfoValue>{ordemDeServico.modelo || 'Não informado'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>IMEI ou Serial</InfoLabel>
            <InfoValue>{ordemDeServico.imeiOuSerial || 'Não informado'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Senha de Acesso</InfoLabel>
            <InfoValue>{ordemDeServico.senhaAcesso || 'Não informado'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Em Garantia</InfoLabel>
            <InfoValue>{ordemDeServico.emGarantia !== undefined ? (ordemDeServico.emGarantia ? 'Sim' : 'Não') : 'Não informado'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Data Garantia</InfoLabel>
            <InfoValue>{ordemDeServico.dataGarantia ? formatDate(ordemDeServico.dataGarantia) : 'Não informado'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Valor Mão de Obra ||Produto||</InfoLabel>
            <InfoValue>{ordemDeServico.valorMaoDeObra ? formatCurrency(ordemDeServico.valorMaoDeObra) : 'R$ 0,00'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Valor Serviço</InfoLabel>
            <InfoValue>
              {formatCurrency(valorServico)}
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Valor Peças</InfoLabel>
            <InfoValue>{ordemDeServico.valorPecas ? formatCurrency(ordemDeServico.valorPecas) : 'R$ 0,00'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Valor Total</InfoLabel>
            <InfoValue>{formatCurrency(valorTotal)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Forma de Pagamento</InfoLabel>
            <InfoValue>{ordemDeServico.formaPagamento || 'Não informado'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Pago</InfoLabel>
            <InfoValue>{ordemDeServico.pago !== undefined ? (ordemDeServico.pago ? 'Sim' : 'Não') : 'Não informado'}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Observações</InfoLabel>
            <InfoValue>{ordemDeServico.observacoes || 'N/A'}</InfoValue>
          </InfoRow>
        </Card>

        {/* Produtos e Serviços */}
        <Card>
          <SectionTitle>💰 Resumo Financeiro da Ordem</SectionTitle>
          <Table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Fornecedor</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {/* Serviços */}
              {servicos.map((servico, index) => (
                <tr key={`servico-${index}`}>
                  <td>{servico.nome || 'Serviço não especificado'} <span style={{ color: 'gray', fontSize: '0.8rem' }}> ||Serviço||</span></td>
                  <td>-</td>
                  <td>{servico.quantidade || 1}</td>
                  <td className="currency">{formatCurrency(servico.preco)}</td>
                  <td className="currency">{formatCurrency((servico.preco || 0) * (servico.quantidade || 1))}</td>
                </tr>
              ))}
              {/* Produtos */}
              {produtos.map((produto, index) => (
                <tr key={`produto-${index}`}>
                  <td>{produto.nome || 'Peça/Produto'}<span style={{ color: 'gray', fontSize: '0.8rem' }}> ||Produto||</span></td>
                  <td>{produto.fornecedor || '-'}</td>
                  <td>{produto.quantidade || 1}</td>
                  <td className="currency">{formatCurrency(produto.preco)}</td>
                  <td className="currency">{formatCurrency((produto.preco || 0) * (produto.quantidade || 1))}</td>
                </tr>
              ))}
              {/* Valor Mão de Obra digitado */}
              {(ordemDeServico.valorMaoDeObra && ordemDeServico.valorMaoDeObra > 0) && (
                <tr>
                  <td><span style={{ color: 'gray', fontSize: '0.8rem' }}>|| Mão de Obra (manual) ||</span></td>
                  <td>-</td>
                  <td>1</td>
                  <td className="currency">{formatCurrency(ordemDeServico.valorMaoDeObra)}</td>
                  <td className="currency">{formatCurrency(ordemDeServico.valorMaoDeObra)}</td>
                </tr>
              )}
              <tr className="total-row">
                <td colSpan="4"><strong>Total Geral</strong></td>
                <td className="currency"><strong>{formatCurrency(valorTotal)}</strong></td>
              </tr>
            </tbody>
          </Table>
        </Card>
        <Card>
          <CheckboxSection>
            <strong style={{ marginBottom: '0.5rem', display: 'block', fontSize: '0.9rem' }}>Status do Equipamento na Entrega:</strong>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.3rem' }}>
              <CheckboxItem>
                <input type="checkbox" />
                <span>Equipamento testado e funcionando</span>
              </CheckboxItem>
              <CheckboxItem>
                <input type="checkbox" />
                <span>Backup de dados realizado</span>
              </CheckboxItem>
              <CheckboxItem>
                <input type="checkbox" />
                <span>Garantia do serviço explicada</span>
              </CheckboxItem>
              <CheckboxItem>
                <input type="checkbox" />
                <span>Cliente satisfeito com o serviço</span>
              </CheckboxItem>
              <CheckboxItem>
                <input type="checkbox" />
                <span>Orientações de uso fornecidas</span>
              </CheckboxItem>
              <CheckboxItem>
                <input type="checkbox" />
                <span>Acessórios devolvidos completos</span>
              </CheckboxItem>
            </div>
          </CheckboxSection>
        </Card>

        {/* Assinaturas */}
        <SignatureSection>
          <SignatureBox>
            <div className="title">{funcionario.nome}</div>
            <div className="line"></div>
            <div className="date"> {formatDate(new Date())}</div>
          </SignatureBox>
          <SignatureBox>
            <div className="title">{cliente.nome}</div>
            <div className="line"></div>
            <div className="date"> Data: ___/___/_____</div>
          </SignatureBox>
        </SignatureSection>

        {/* Botões */}
        <ButtonContainer className="no-print">
          <Button className="primary" onClick={printReport}>🖨️ Imprimir Relatório</Button>
          <Button className="secondary" onClick={onClose}>✕ Fechar</Button>
        </ButtonContainer>
      </ReportContainer>
    </>
  );
};

export default OrdemDeServicoReport;