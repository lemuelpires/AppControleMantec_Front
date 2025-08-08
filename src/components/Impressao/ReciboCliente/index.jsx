// Recibo para Cliente - Mantec Informática
import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { format } from 'date-fns';
import apiCliente from '../../../../services/apiCliente';


// Estilos globais para impressão direta do recibo
const GlobalPrintStyle = createGlobalStyle`
	@media print {
		body {
			margin: 0;
			padding: 15mm;
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
			font-size: 11px;
			line-height: 1.4;
			background: white !important;
			color: black !important;
		}
		* {
			background: white !important;
			color: black !important;
			box-shadow: none !important;
			text-shadow: none !important;
		}
		@page {
			margin: 15mm;
			size: A4;
		}
		.no-print {
			display: none !important;
		}
		h1, h2, h3, h4, h5, h6 {
			color: #000 !important;
			background: transparent !important;
		}
		table, th, td {
			border-color: #000 !important;
			background: white !important;
			color: #000 !important;
		}
		th {
			background: #f0f0f0 !important;
			color: #000 !important;
		}
		[style*="border"] {
			border-color: #000 !important;
		}
		.payment-section {
			display: grid !important;
			grid-template-columns: 1fr 1fr 1fr !important;
			gap: 10px !important;
			margin: 15px 0 !important;
		}
		.payment-box {
			border: 1px solid #000 !important;
			padding: 8px !important;
			background: white !important;
		}
		.payment-header {
			background: #f0f0f0 !important;
			padding: 6px !important;
			text-align: center !important;
			font-weight: bold !important;
			border-bottom: 1px solid #000 !important;
			margin: -8px -8px 8px -8px !important;
			color: #000 !important;
		}
		.payment-value {
			text-align: center !important;
			font-weight: bold !important;
			min-height: 30px !important;
			display: flex !important;
			align-items: center !important;
			justify-content: center !important;
			color: #000 !important;
		}
		.signature-section {
			display: grid !important;
			grid-template-columns: 1fr 1fr !important;
			gap: 30px !important;
			margin-top: 30px !important;
		}
		.signature-box {
			text-align: center !important;
			padding: 10px !important;
			border: 1px solid #000 !important;
			background: white !important;
		}
		.signature-line {
			border-bottom: 1px solid #000 !important;
			height: 40px !important;
			margin: 20px 0 10px 0 !important;
		}
		.total-section {
			text-align: right !important;
			margin: 15px 0 !important;
			padding: 15px !important;
			background: #f9f9f9 !important;
			border: 1px solid #000 !important;
		}
		.total-value {
			font-size: 14px !important;
			font-weight: bold !important;
			color: #000 !important;
		}
		.client-section h3 {
			background: #f0f0f0 !important;
			border: 1px solid #000 !important;
			color: #000 !important;
			padding: 8px !important;
		}
		.client-info {
			border: 1px solid #000 !important;
			background: white !important;
			padding: 12px !important;
		}
		#recibo-print {
			width: 100% !important;
			max-width: none !important;
			margin: 0 !important;
			padding: 0 !important;
			background: white !important;
			border-radius: 0 !important;
			box-shadow: none !important;
		}
	}
`;


const ReciboContainer = styled.div`
	padding: 2rem;
	background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
	color: #2c3e50;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	max-width: 950px;
	margin: 0 auto;
	border: none;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
	border-radius: 12px;
	position: relative;
`;

// ...demais styled components e funções auxiliares...

// Função principal do componente
const ReciboCliente = ({ cliente = {}, ordemDeServico = {}, servicos = [], produtos = [], onClose }) => {
	// Funções auxiliares
	const formatCurrency = (value) => {
		return value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || 'R$ 0,00';
	};

	const formatDate = (date) => {
		return format(date, 'dd/MM/yyyy');
	};

	const calcularTotalGeral = () => {
		const totalServicos = servicos.reduce((acc, s) => acc + (parseFloat(s.preco) || 0) * (s.quantidade || 1), 0);
		const totalProdutos = produtos.reduce((acc, p) => acc + (parseFloat(p.preco) || 0) * (p.quantidade || 1), 0);
		return totalServicos + totalProdutos;
	};

	const printRecibo = () => {
		window.print();
	};

	return (
		<>
			<GlobalPrintStyle />
			<ReciboContainer id="recibo-print">
				{/* Cabeçalho */}
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
										ordemDeServico.observacoes.substring(0, 50) + '...'
										: 'Serviço de manutenção'}
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
		</>
	);
};
