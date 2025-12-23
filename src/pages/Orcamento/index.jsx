import React, { useState, useEffect } from 'react';
import {
	OrdemDeServicoContainer as OrcamentoContainer,
	OrdemDeServicoTitle as OrcamentoTitle,
	HeaderControls,
	SearchContainer,
	SearchInput,
	PerPageSelect,
	AddButton,
	OrdemDeServicoTableWrapper as OrcamentoTableWrapper,
	OrdemDeServicoTable as OrcamentoTable,
	IconWrapper,
	ActionButton,
	PaginationContainer,
	PaginationButton,
	PaginationInfo,
	HideMobile,
	HideMobileTh
} from './style';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEye, faEdit, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import apiCliente from '../../services/apiCliente';
import ModalDetalhesOrcamento from '../../components/Modais/Orçamento/ModalDetalhes';
import ModalEdicaoOrcamento from '../../components/Modais/Orçamento/ModalEdicao';
import ModalNovoOrcamento from '../../components/Modais/Orçamento/ModalNovo';
import * as XLSX from 'xlsx';

Modal.setAppElement('#root');

const Orcamento = () => {
	const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
	const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
	const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [orcamentos, setOrcamentos] = useState([]);
	const [clientes, setClientes] = useState({});
	const [produtos, setProdutos] = useState({});
	const [servicos, setServicos] = useState({});
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(25);
	const [statusFilter, setStatusFilter] = useState('');

	useEffect(() => {
		fetchOrcamentos();
	}, []);

	const fetchOrcamentos = async () => {
		try {
			const response = await apiCliente.get('/OrdemDeServico');
			// Filtra apenas os registros com status 'Orçamento' e ativos
			const orcamentosAtivos = response.data.filter(orc => orc.status === 'Orçamento' && orc.ativo !== false);
			const parseDate = (d) => {
				if (!d) return new Date(0);
				const dt = new Date(d);
				if (!isNaN(dt)) return dt;
				const alt = new Date(d.replace(/-/g, '/'));
				return isNaN(alt) ? new Date(0) : alt;
			};
			const orcamentosOrdenados = [...orcamentosAtivos].sort((a, b) => parseDate(b.dataEntrada) - parseDate(a.dataEntrada));
			setOrcamentos(orcamentosOrdenados);

			const clientesIds = new Set(orcamentosAtivos.map(o => o.clienteID));
			const produtosIds = new Set();
			const servicosIds = new Set();
			orcamentosAtivos.forEach(orc => {
				if (orc.produtos && Array.isArray(orc.produtos)) {
					orc.produtos.forEach(produto => {
						if (produto.produtoID) produtosIds.add(produto.produtoID);
					});
				}
				if (orc.servicos && Array.isArray(orc.servicos)) {
					orc.servicos.forEach(servico => {
						if (servico.servicoID) servicosIds.add(servico.servicoID);
					});
				}
			});
			await Promise.all([
				fetchMap(clientesIds, clientes, '/Cliente/', setClientes),
				fetchMap(produtosIds, produtos, '/Produto/', setProdutos),
				fetchMap(servicosIds, servicos, '/Servico/', setServicos),
			]);
		} catch (error) {
			console.error('Erro ao buscar orçamentos:', error);
		}
	};

	const fetchMap = async (ids, existing, endpoint, setState) => {
		const dataMap = {};
		await Promise.all(Array.from(ids).map(async id => {
			if (!existing[id]) {
				const response = await apiCliente.get(`${endpoint}${id}`);
				dataMap[id] = response.data.nome;
			}
		}));
		setState(prev => ({ ...prev, ...dataMap }));
	};

	const handleExcluir = async (id) => {
		if (window.confirm('Deseja excluir este orçamento?')) {
			try {
				await apiCliente.put(`/OrdemDeServico/desativar/${id}`);
				fetchOrcamentos();
				alert('Orçamento excluído com sucesso!');
			} catch (error) {
				console.error('Erro ao excluir orçamento:', error);
			}
		}
	};

	const openDetalhesModal = (item) => {
		setSelectedItem(item);
		setIsDetalhesModalOpen(true);
	};

	const openEdicaoModal = (item) => {
		setSelectedItem(item);
		setIsEdicaoModalOpen(true);
	};

	const openNovoModal = () => {
		setSelectedItem(null);
		setIsNovoModalOpen(true);
	};

	const closeModal = () => {
		setIsDetalhesModalOpen(false);
		setIsEdicaoModalOpen(false);
		setIsNovoModalOpen(false);
		setSelectedItem(null);
		fetchOrcamentos();
	};

	const handleSave = async (formData) => {
		try {
			// Garante que o status seja 'Orçamento' ao criar ou editar
			const dataToSend = { ...formData, status: 'Orçamento' };
			if (formData.id) {
				await apiCliente.put(`/OrdemDeServico/${formData.id}`, dataToSend);
			} else {
				await apiCliente.post('/OrdemDeServico', dataToSend);
			}
			fetchOrcamentos();
			closeModal();
		} catch (error) {
			console.error('Erro ao salvar orçamento:', error);
		}
	};

	const handleExport = () => {
		const ws = XLSX.utils.json_to_sheet(filteredOrcamentos);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Orcamentos");
		XLSX.writeFile(wb, "orcamentos.xlsx");
	};

	const filteredOrcamentos = orcamentos.filter(orc => {
		const matchesCliente = clientes[orc.clienteID]?.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = statusFilter ? orc.status === statusFilter : true;
		return matchesCliente && matchesStatus;
	});

	const totalPages = Math.ceil(filteredOrcamentos.length / itemsPerPage);
	const paginatedOrcamentos = filteredOrcamentos.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const formatDate = (dateStr) => {
		if (!dateStr) return '--/--/----';
		const d = new Date(dateStr);
		const localDate = new Date(d.getTime() + Math.abs(d.getTimezoneOffset()) * 60000);
		return localDate.toLocaleDateString('pt-BR');
	};

	return (
		<OrcamentoContainer>
			<>
				<div style={{ position: 'relative', marginBottom: '16px' }}>
					<OrcamentoTitle>
						Orçamentos
					</OrcamentoTitle>
					<button
						onClick={handleExport}
						title="Exportar Excel"
						style={{
							position: 'absolute',
							right: 0,
							top: '50%',
							transform: 'translateY(-50%)',
							background: 'none',
							border: 'none',
							cursor: 'pointer',
							padding: 4,
							color: '#666'
						}}
					>
						<FontAwesomeIcon icon={faDownload} size="lg" />
					</button>
				</div>

				<HeaderControls>
					<SearchContainer>
						<SearchInput
							type="text"
							placeholder="Buscar cliente..."
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							style={{
								marginLeft: '8px',
								padding: '4px',
								borderRadius: '10px',
								border: '2px solid rgba(108, 117, 125, 0.2)',
								height: '48px',
								fontSize: '14px',
								backgroundColor: '#fff',
								color: '#333',
								outline: 'none',
								cursor: 'pointer',
							}}
						>
							<option value="">Todos os Status</option>
							<option value="Orçamento">Orçamento</option>
							<option value="Aprovado">Aprovado</option>
							<option value="Reprovado">Reprovado</option>
							<option value="Cancelado">Cancelado</option>
						</select>
						<PerPageSelect
							value={itemsPerPage}
							onChange={e => setItemsPerPage(Number(e.target.value))}
						>
							<option value={25}>25 por página</option>
							<option value={50}>50 por página</option>
							<option value={100}>100 por página</option>
						</PerPageSelect>
					</SearchContainer>

					<AddButton onClick={openNovoModal}>
						<FontAwesomeIcon icon={faPlusCircle} />
						Novo Orçamento
					</AddButton>
				</HeaderControls>

				   <OrcamentoTableWrapper>
					   <OrcamentoTable>
						   <thead>
							   <tr>
								   <th>Número</th>
								   <th>Cliente</th>
								   <HideMobileTh>Entrada</HideMobileTh>
								   <th style={{ textAlign: 'center' }}>Ações</th>
							   </tr>
						   </thead>
						   <tbody>
							   {paginatedOrcamentos.map(orc => (
								   <tr key={orc.id}>
									   <td>{orc.numeroOrcamento || orc.id}</td>
									   <td>{clientes[orc.clienteID]}</td>
									   <HideMobile>{formatDate(orc.dataEntrada)}</HideMobile>
									   <td>
										   <IconWrapper>
											   <ActionButton
												   className="view"
												   onClick={() => openDetalhesModal(orc)}
												   title="Visualizar detalhes"
											   >
												   <FontAwesomeIcon icon={faEye} />
											   </ActionButton>
											   <ActionButton
												   className="edit"
												   onClick={() => openEdicaoModal(orc)}
												   title="Editar orçamento"
											   >
												   <FontAwesomeIcon icon={faEdit} />
											   </ActionButton>
											   <ActionButton
												   className="delete"
												   onClick={() => handleExcluir(orc.id)}
												   title="Excluir orçamento"
											   >
												   <FontAwesomeIcon icon={faTrash} />
											   </ActionButton>
										   </IconWrapper>
									   </td>
								   </tr>
							   ))}
						   </tbody>
					   </OrcamentoTable>
				   </OrcamentoTableWrapper>

				<PaginationContainer>
					<PaginationButton
						onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
					>
						Anterior
					</PaginationButton>

					<PaginationInfo>
						Página {currentPage} de {totalPages} ({filteredOrcamentos.length} orçamentos)
					</PaginationInfo>

					<PaginationButton
						onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
						disabled={currentPage === totalPages}
					>
						Próxima
					</PaginationButton>
				</PaginationContainer>

				<ModalDetalhesOrcamento isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
				<ModalEdicaoOrcamento isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
				<ModalNovoOrcamento isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
			</>
		</OrcamentoContainer>
	);
};

export default Orcamento;
