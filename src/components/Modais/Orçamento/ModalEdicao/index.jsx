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

const ModalEdicaoOrcamento = ({ isOpen, onClose, item, onSubmit }) => {
	const [formData, setFormData] = useState({
		id: '',
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

	const [clienteOptions, setClienteOptions] = useState([]);
	const [produtoOptions, setProdutoOptions] = useState([]);
	const [servicoOptions, setServicoOptions] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const clientes = await apiCliente.get('/Cliente');
				const produtos = await apiCliente.get('/Produto');
				const servicos = await apiCliente.get('/Servico');

				setClienteOptions(clientes.data.filter(c => c.ativo).map(c => ({ value: c.id, label: c.nome })));
				setProdutoOptions(
					produtos.data
						.filter(p => p.ativo)
						.map(p => ({
							value: p.id,
							label: p.nome,
							preco: p.preco,
							quantidade: p.quantidade
						}))
				);
				setServicoOptions(servicos.data.map(s => ({
					value: s.id,
					label: s.nome,
					preco: s.preco,
					ativo: s.ativo
				})));
			} catch (error) {
				console.error('Erro ao buscar dados:', error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (item) {
			const formatDate = (dateStr) => dateStr ? new Date(dateStr).toISOString().slice(0, 10) : '';

			let produtos = [{ produtoID: '', quantidade: 1 }];
			let servicos = [{ servicoID: '', quantidade: 1 }];

			if (item.produtos?.length > 0) {
				produtos = item.produtos.map(p => ({
					produtoID: p.produtoID,
					quantidade: p.quantidade || 1
				}));
			}
			if (item.servicos?.length > 0) {
				servicos = item.servicos.map(s => ({
					servicoID: s.servicoID,
					quantidade: s.quantidade || 1
				}));
			}

			setFormData({
				id: item.id || '',
				clienteID: item.clienteID || '',
				produtos,
				servicos,
				defeitoRelatado: item.defeitoRelatado || '',
				diagnostico: item.diagnostico || '',
				observacoes: item.observacoes || '',
				status: item.status || '',
				dataValidade: formatDate(item.dataValidade),
				aceiteCliente: !!item.aceiteCliente,
				dataEntrada: formatDate(item.dataEntrada),
				valorMaoDeObra: item.valorMaoDeObra ?? 0,
				valorServicos: item.valorServicos ?? 0,
				valorPecas: item.valorPecas ?? 0,
				valorTotal: item.valorTotal ?? 0,
			});
		}
	}, [item, isOpen]);

	const handleSubmit = async (data) => {
		try {
			await onSubmit(data);
			onClose();
		} catch (error) {
			console.error('Erro ao salvar orçamento:', error);
		}
	};

	if (!item) return null;

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			overlayElement={(props, contentElement) => <div {...props}>{contentElement}</div>}
			contentElement={(props, children) => <div {...props}>{children}</div>}
			style={modalStyles}
		>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
				<FormularioOrcamento
					title="Editar Orçamento"
					initialData={formData}
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

export default ModalEdicaoOrcamento;
