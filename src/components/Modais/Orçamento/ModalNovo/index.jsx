import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import FormularioOrcamento from '../../../Forms/FormularioOrcamento';
import apiCliente from '../../../../services/apiCliente';

const modalStyles = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 9999,
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	content: {
		backgroundColor: 'transparent',
		padding: '1rem',
		border: 'none',
		borderRadius: '0',
		boxShadow: 'none',
		maxWidth: '750px',
		width: '95%',
		maxHeight: '90vh',
		inset: 'unset',
		zIndex: 10000,
		position: 'relative',
		overflow: 'auto',
	},
};

const ModalNovoOrcamento = ({ isOpen, onClose }) => {
	const [clienteOptions, setClienteOptions] = useState([]);
	const [produtoOptions, setProdutoOptions] = useState([]);
	const [servicoOptions, setServicoOptions] = useState([]);
	const [formData, setFormData] = useState({
		clienteID: '',
		produtos: [{ produtoID: '', quantidade: 1 }],
		servicos: [{ servicoID: '', quantidade: 1 }],
		defeitoRelatado: '',
		diagnostico: '',
		observacoes: '',
		status: '',
		dataValidade: '',
		aceiteCliente: false,
		dataEntrada: '',
		valorMaoDeObra: 0,
		valorServicos: 0,
		valorPecas: 0,
		valorTotal: 0,
	});

	useEffect(() => {
		fetchClientes();
		fetchProdutos();
		fetchServicos();
	}, []);

	const fetchClientes = async () => {
		try {
			const response = await apiCliente.get('/Cliente');
			const clientes = response.data.filter(cliente => cliente.ativo).map(cliente => ({
				value: cliente.id,
				label: cliente.nome,
			}));
			setClienteOptions(clientes);
		} catch (error) {
			console.error('Erro ao buscar clientes:', error);
		}
	};

	const fetchProdutos = async () => {
		try {
			const response = await apiCliente.get('/Produto');
			const produtos = response.data
				.filter(produto => produto.ativo)
				.map(produto => ({
					value: produto.id,
					label: produto.nome,
					preco: produto.preco,
					quantidade: produto.quantidade
				}));
			setProdutoOptions(produtos);
		} catch (error) {
			console.error('Erro ao buscar produtos:', error);
		}
	};

	const fetchServicos = async () => {
		try {
			const response = await apiCliente.get('/Servico');
			const servicos = response.data.filter(servico => servico.ativo).map(servico => ({
				value: servico.id,
				label: servico.nome,
			}));
			setServicoOptions(servicos);
		} catch (error) {
			console.error('Erro ao buscar serviços:', error);
		}
	};

	const handleSubmit = async (formData) => {
		try {
			// Aqui você pode ajustar o DTO conforme o backend de orçamento
			const dataEntrada = formData.dataEntrada ? new Date(formData.dataEntrada).toISOString() : null;
			const dataValidade = formData.dataValidade ? new Date(formData.dataValidade).toISOString() : null;
			const orcamentoDto = {
				...formData,
				dataEntrada,
				dataValidade,
				produtos: formData.produtos || [],
				servicos: formData.servicos || [],
				valorMaoDeObra: formData.valorMaoDeObra ? parseFloat(formData.valorMaoDeObra) : 0,
				valorServicos: formData.valorServicos ? parseFloat(formData.valorServicos) : 0,
				valorPecas: formData.valorPecas ? parseFloat(formData.valorPecas) : 0,
				valorTotal: formData.valorTotal ? parseFloat(formData.valorTotal) : 0,
				aceiteCliente: !!formData.aceiteCliente,
			};
			// Envie para a API de orçamento (ajuste endpoint conforme necessário)
			await apiCliente.post('/OrdemDeServico', orcamentoDto);
			onClose();
		} catch (error) {
			console.error('Erro ao salvar orçamento:', error.response ? error.response.data : error.message);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			overlayElement={(props, contentElement) => (
				<div {...props}>{contentElement}</div>
			)}
			contentElement={(props, children) => (
				<div {...props}>{children}</div>
			)}
			style={modalStyles}
		>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
				<FormularioOrcamento
					title="Novo Orçamento"
					initialValues={formData}
					onSubmit={handleSubmit}
					onClose={onClose}
					clienteOptions={clienteOptions}
					produtoOptions={produtoOptions}
					servicoOptions={servicoOptions}
				/>
			</div>
		</Modal>
	);
};

export default ModalNovoOrcamento;
