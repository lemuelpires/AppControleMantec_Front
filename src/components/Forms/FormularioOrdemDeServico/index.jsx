import React, { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import {
  FormContainer,
  FormTitle,
  Form,
  FormRow,
  FormGroup,
  Label,
  Input,
  Button,
  EspacamentoButton,
  TextArea,
  Select
} from './style';
import ReactSelect from 'react-select';
import styled from 'styled-components';
import apiCliente from '../../../services/apiCliente'; 

// ===== DEBUG =====
const DEBUG_CALC = true;
const toNumber = (v, def = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
};
// =================

// Função para formatar como moeda BRL
const formatCurrency = (value) => {
  const num = Number(value) || 0;
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Função para extrair número do valor digitado
const parseCurrency = (value) => {
  // Remove tudo que não for número ou vírgula/ponto
  const cleaned = String(value).replace(/[^\d,.-]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
};

// ----- estilos locais -----
const ItemSection = styled.div`
  
`;

const SectionTitle = styled(Label)`
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #007bff;
  }

  &::after {
    content: '➕';
    font-size: 0.8rem;
    opacity: 0.6;
    transition: all 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 28px 1fr 80px;
  gap: 0.5rem;
  align-items: center;
  padding: 0.4rem;
  border: 1px dashed rgba(108, 117, 125, 0.4);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: rgba(0, 123, 255, 0.6);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const QuantityInput = styled(Input)`
  width: 80px;
  text-align: center;
  padding: 0.3rem;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #dc3545 60%, #b71c1c 100%);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.15);
  z-index: 10;
  padding: 0;

  svg {
    width: 16px;
    height: 16px;
    display: block;
    stroke: #fff;
    fill: none;
  }

  &:hover {
    background: linear-gradient(135deg, #b71c1c 60%, #dc3545 100%);
    transform: scale(1.15);
    box-shadow: 0 4px 16px rgba(220, 53, 69, 0.25);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SectionHeader = styled.div`
  margin-top: 0.6rem;

`;

const ResponsiveFormGroup = styled(FormGroup)`
  width: 49%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CompactFormRow = styled(FormRow)`
  padding-bottom: 0.6rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(108, 117, 125, 0.2);

  &.side-by-side {
    display: flex;
    gap: 1.5%;
    align-items: flex-start;
  }

  @media (max-width: 768px) {
    &.side-by-side {
      flex-direction: column;
    }
  }
`;
// --------------------------

// Mapeamento de cor para cada status
const statusColors = {
  'Orçamento': '#6c757d',
  'Não iniciado': '#6c757d',
  'Em andamento': '#007bff',
  'Concluido': '#28a745',
  'Cancelado': '#dc3545'
};

// Customização do ReactSelect para status com cor
const customStatusStyles = {
  ...{
    control: (provided, state) => ({
      ...provided,
      border: '2px solid rgba(108, 117, 125, 0.2)',
      borderRadius: '6px',
      minHeight: '28px',
      fontSize: '0.7rem',
      fontWeight: '500',
      color: '#2c3e50',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxSizing: 'border-box',
      borderColor: state.isFocused ? '#007bff' : 'rgba(108, 117, 125, 0.2)',
      boxShadow: state.isFocused
        ? '0 0 0 2px rgba(0, 123, 255, 0.1), 0 2px 8px rgba(0, 123, 255, 0.1)'
        : 'none',
      transform: state.isFocused ? 'translateY(-1px)' : 'none'
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 10000,
      borderRadius: '6px'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#6c757d',
      fontSize: '0.65rem',
      fontWeight: '400'
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: '#6c757d',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none'
    }),
    valueContainer: (provided) => ({ ...provided, padding: '0 4px' }),
    indicatorsContainer: (provided) => ({ ...provided, height: '28px' })
  },
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? 'rgba(0, 123, 255, 0.08)'
      : 'white',
    color: statusColors[state.data.value] || '#2c3e50',
    fontWeight: state.isSelected ? 'bold' : '500',
    borderLeft: `6px solid ${statusColors[state.data.value] || 'transparent'}`,
    paddingLeft: '12px'
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: statusColors[state.data.value] || '#2c3e50',
    fontWeight: 'bold'
  })
};

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: '2px solid rgba(108, 117, 125, 0.2)',
    borderRadius: '6px',
    minHeight: '28px',
    fontSize: '0.7rem',
    fontWeight: '500',
    color: '#2c3e50',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxSizing: 'border-box',
    borderColor: state.isFocused ? '#007bff' : 'rgba(108, 117, 125, 0.2)',
    boxShadow: state.isFocused
      ? '0 0 0 2px rgba(0, 123, 255, 0.1), 0 2px 8px rgba(0, 123, 255, 0.1)'
      : 'none',
    transform: state.isFocused ? 'translateY(-1px)' : 'none'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'rgba(0, 123, 255, 0.1)' : 'white',
    color: '#2c3e50',
    fontSize: '0.7rem',
    fontWeight: '500',
    padding: '4px 8px'
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 10000,
    borderRadius: '6px'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#2c3e50',
    fontSize: '0.7rem',
    fontWeight: '500'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#6c757d',
    fontSize: '0.65rem',
    fontWeight: '400'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: '#6c757d',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none'
  }),
  valueContainer: (provided) => ({ ...provided, padding: '0 4px' }),
  indicatorsContainer: (provided) => ({ ...provided, height: '28px' })
};

const FormularioOrdemDeServico = ({
  initialValues = {},
  onSubmit,
  onClose,
  clienteOptions = [],
  funcionarioOptions = [],
  produtoOptions = [],
  servicoOptions = [],
  title = "Ordem de Serviço"
}) => {

  const formatDateForInput = val => {
    if (!val) return '';
    try {
      const d = new Date(val);
      if (isNaN(d)) return '';
      return d.toISOString().slice(0, 10);
    } catch {
      return '';
    }
  };

  const [formData, setFormData] = useState({
    id: initialValues.id || '',
    clienteID: initialValues.clienteID || '',
    funcionarioID: initialValues.funcionarioID || '',
    produtos: [{ produtoID: '', quantidade: 1 }],
    servicos: [{ servicoID: '', quantidade: 1 }],
    dataEntrada: formatDateForInput(initialValues.dataEntrada) || '',
    dataConclusao: formatDateForInput(initialValues.dataConclusao) || '',
    status: initialValues.status || '',
    observacoes: initialValues.observacoes || '',
    ativo: initialValues.ativo ?? true,
    defeitoRelatado: initialValues.defeitoRelatado || '',
    diagnostico: initialValues.diagnostico || '',
    laudoTecnico: initialValues.laudoTecnico || '',
    marca: initialValues.marca || '',
    modelo: initialValues.modelo || '',
    imeIouSerial: initialValues.imeIouSerial || '',
    senhaAcesso: initialValues.senhaAcesso || '',
    emGarantia: initialValues.emGarantia ?? false,
    dataGarantia: formatDateForInput(initialValues.dataGarantia) || '',
    valorMaoDeObra: initialValues.valorMaoDeObra ?? 0,
    valorPecas: initialValues.valorPecas ?? 0,
    valorTotal: initialValues.valorTotal ?? 0,
    formaPagamento: initialValues.formaPagamento || '',
    pago: initialValues.pago ?? false,
    tipoAtendimento: initialValues.tipoAtendimento || '',
    prioridade: initialValues.prioridade || '',
    numeroOS: initialValues.numeroOS ?? '',
    assinaturaClienteBase64: initialValues.assinaturaClienteBase64 || '',
    assinaturaTecnicoBase64: initialValues.assinaturaTecnicoBase64 || '',
  });

  const [errors, setErrors] = useState({});
  const [valorServicos, setvalorServicos] = useState(0);

  // Depuração: quando produtoOptions mudar, listar preços e fornecedor
  useEffect(() => {
    if (!DEBUG_CALC) return;
    // Remova ou comente os console.groupCollapsed, console.table, console.groupEnd
    // console.groupCollapsed('[OS] produtoOptions recebidos');
    try {
      const rows = (produtoOptions || []).map(opt => ({
        id: String(opt?.value ?? ''),
        label: opt?.label ?? '',
        preco: toNumber(opt?.preco ?? opt?.precoVenda ?? opt?.price, 0),
        fornecedor: typeof opt?.fornecedor === 'object'
          ? JSON.stringify(opt.fornecedor)
          : String(opt?.fornecedor ?? 'N/A'),
      }));
      // console.table(rows);
    } finally {
      // console.groupEnd();
    }
  }, [produtoOptions]);

  useEffect(() => {
    const produtosFromInit = (() => {
      if (Array.isArray(initialValues.pecasUtilizadas) && initialValues.pecasUtilizadas.length > 0) {
        return initialValues.pecasUtilizadas.map(p => ({ produtoID: p.produtoID || '', quantidade: p.quantidade ?? 1 }));
      }
      if (Array.isArray(initialValues.produtoIDs) && initialValues.produtoIDs.length > 0) {
        return initialValues.produtoIDs.map(id => ({ produtoID: id, quantidade: 1 }));
      }
      if (Array.isArray(initialValues.produtos) && initialValues.produtos.length > 0) {
        return initialValues.produtos.map(p => ({ produtoID: p.produtoID || '', quantidade: p.quantidade ?? 1 }));
      }
      return [{ produtoID: '', quantidade: 1 }];
    })();

    const servicosFromInit = (() => {
      if (Array.isArray(initialValues.servicoIDs) && initialValues.servicoIDs.length > 0) {
        return initialValues.servicoIDs.map(id => ({ servicoID: id, quantidade: 1 }));
      }
      if (Array.isArray(initialValues.servicos) && initialValues.servicos.length > 0) {
        return initialValues.servicos.map(s => ({ servicoID: s.servicoID || '', quantidade: 1 }));
      }
      return [{ servicoID: '', quantidade: 1 }];
    })();

    setFormData(prev => ({
      ...prev,
      id: initialValues.id ?? prev.id,
      clienteID: initialValues.clienteID ?? prev.clienteID,
      funcionarioID: initialValues.funcionarioID ?? prev.funcionarioID,
      produtos: produtosFromInit,
      servicos: servicosFromInit,
      dataEntrada: formatDateForInput(initialValues.dataEntrada) || prev.dataEntrada,
      dataConclusao: formatDateForInput(initialValues.dataConclusao) || prev.dataConclusao,
      status: initialValues.status ?? prev.status,
      observacoes: initialValues.observacoes ?? prev.observacoes,
      ativo: initialValues.ativo ?? prev.ativo,
      defeitoRelatado: initialValues.defeitoRelatado ?? prev.defeitoRelatado,
      diagnostico: initialValues.diagnostico ?? prev.diagnostico,
      laudoTecnico: initialValues.laudoTecnico ?? prev.laudoTecnico,
      marca: initialValues.marca ?? prev.marca,
      modelo: initialValues.modelo ?? prev.modelo,
      imeIouSerial: initialValues.imeIouSerial ?? prev.imeIouSerial,
      senhaAcesso: initialValues.senhaAcesso ?? prev.senhaAcesso,
      emGarantia: initialValues.emGarantia ?? prev.emGarantia,
      dataGarantia: formatDateForInput(initialValues.dataGarantia) || prev.dataGarantia,
      valorMaoDeObra: initialValues.valorMaoDeObra ?? prev.valorMaoDeObra,
      valorPecas: initialValues.valorPecas ?? prev.valorPecas,
      valorTotal: initialValues.valorTotal ?? prev.valorTotal,
      formaPagamento: initialValues.formaPagamento ?? prev.formaPagamento,
      pago: initialValues.pago ?? prev.pago,
      tipoAtendimento: initialValues.tipoAtendimento ?? prev.tipoAtendimento,
      prioridade: initialValues.prioridade ?? prev.prioridade,
      numeroOS: initialValues.numeroOS ?? prev.numeroOS,
      assinaturaClienteBase64: initialValues.assinaturaClienteBase64 ?? prev.assinaturaClienteBase64,
      assinaturaTecnicoBase64: initialValues.assinaturaTecnicoBase64 ?? prev.assinaturaTecnicoBase64,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  // === CÁLCULO DE valorPecas com logs (usa pecasUtilizadas > produtos) ===
  useEffect(() => {
    //console.groupCollapsed('[OS] Cálculo valorPecas');
    // Remova ou comente os console.groupCollapsed, console.groupEnd, console.log, console.warn
    // Mapa rápido id -> {preco, fornecedor, label}
    const produtoMap = {};
    (produtoOptions || []).forEach(opt => {
      const id = String(opt?.value ?? '');
      if (!id) return;
      produtoMap[id] = {
        preco: toNumber(opt?.preco ?? opt?.precoVenda ?? opt?.price, 0),
        fornecedor: opt?.fornecedor ?? 'N/A',
        label: opt?.label ?? ''
      };
    });

    if (DEBUG_CALC) {
      // console.log('produtoMap IDs disponíveis:', Object.keys(produtoMap));
    }

    // Fonte da lista: prioriza pecasUtilizadas
    const lista = Array.isArray(formData.pecasUtilizadas) && formData.pecasUtilizadas.length > 0
      ? formData.pecasUtilizadas
      : (Array.isArray(formData.produtos) ? formData.produtos : []);

    let soma = 0;

    (lista || []).forEach((item, idx) => {
      const id = String(item?.produtoID ?? '');
      const qtd = toNumber(item?.quantidade, 0);

      if (!id) {
        // console.warn(` Item #${idx + 1} possui produtoID vazio, valor do item:`, item);
        return;
      }

      const prod = produtoMap[id];
      const preco = prod ? prod.preco : 0;
      const subtotal = preco * qtd;
      soma += subtotal;
    });

    const valorFormatado = parseFloat(soma.toFixed(2));

    if (valorFormatado !== Number(formData.valorPecas || 0)) {
      setFormData(prev => ({ ...prev, valorPecas: valorFormatado }));
    }

    console.groupEnd();
  }, [formData.pecasUtilizadas, formData.produtos, produtoOptions]);

  // Cálculo automático de valorServicos com base nos serviços selecionados
  useEffect(() => {
    // Mapa rápido id -> preco (apenas serviços ativos)
    const servicoMap = {};
    (servicoOptions || []).forEach(opt => {
      const id = String(opt?.value ?? '');
      if (!id) return;
      if (opt?.ativo === false) return;
      servicoMap[id] = toNumber(opt?.preco ?? opt?.precoVenda ?? opt?.price, 0);
    });

    const lista = Array.isArray(formData.servicos) ? formData.servicos : [];
    let soma = 0;

    (lista || []).forEach((item) => {
      const id = String(item?.servicoID ?? '');
      const qtd = toNumber(item?.quantidade, 0);
      if (!id) return;
      const preco = servicoMap[id] || 0;
      soma += preco * qtd;
    });

    const valorFormatado = parseFloat(soma.toFixed(2));
    setvalorServicos(valorFormatado);
  }, [formData.servicos, servicoOptions]);

  // Cálculo valorTotal (mão de obra digitada + mão de obra calculada + peças)
  useEffect(() => {
    const soma = (Number(formData.valorMaoDeObra) || 0)
      + (Number(formData.valorPecas) || 0)
      + (Number(valorServicos) || 0);

    if (soma !== Number(formData.valorTotal || 0)) {
      setFormData(prev => ({ ...prev, valorTotal: soma }));
    }
  }, [formData.valorMaoDeObra, valorServicos, formData.valorPecas]);

  // Atualiza campos do formulário
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
    if (type === 'checkbox') newValue = checked;
    if (type === 'number') newValue = value === '' ? '' : Number(value);
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  // Atualiza campos de moeda com máscara
  const handleCurrencyChange = (e, field) => {
    const val = parseCurrency(e.target.value);
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  useEffect(() => {
    if (formData.dataConclusao) {
      const data = new Date(formData.dataConclusao);
      data.setDate(data.getDate() + 90);
      const garantiaFormatada = data.toISOString().slice(0, 10);
      if (formData.dataGarantia !== garantiaFormatada) {
        setFormData(prev => ({ ...prev, dataGarantia: garantiaFormatada }));
      }
      // Atualiza emGarantia automaticamente: se dataGarantia >= hoje, está em garantia
      const hoje = new Date().toISOString().slice(0, 10);
      const emGarantia = garantiaFormatada >= hoje;
      if (formData.emGarantia !== emGarantia) {
        setFormData(prev => ({ ...prev, emGarantia }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.dataConclusao]);

  const handleSelectChange = (selectedOption, fieldName) => {
    setFormData(prev => ({ ...prev, [fieldName]: selectedOption ? selectedOption.value : '' }));
  };

  // Produtos
  const handleProdutoChange = (index, selectedOption) => {

    const id = selectedOption ? String(selectedOption.value) : '';
    
    const newProdutos = [...formData.produtos];
    newProdutos[index].produtoID = id;
    setFormData(prev => ({ ...prev, produtos: newProdutos }));
  };

  const handleProdutoQuantityChange = (index, value) => {
    const newProdutos = [...formData.produtos];
    newProdutos[index].quantidade = Math.max(1, parseInt(value, 10) || 1);
    setFormData(prev => ({ ...prev, produtos: newProdutos }));
  };

  const addProduto = () => {
    setFormData(prev => ({ ...prev, produtos: [...prev.produtos, { produtoID: '', quantidade: 1 }] }));
  };

  const removeProduto = (index) => {
    if (formData.produtos.length > 1) {
      const newProdutos = formData.produtos.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, produtos: newProdutos }));
    }
  };

  // Serviços (quantidade sempre 1)
  const handleServicoChange = (index, selectedOption) => {
    const newServicos = [...formData.servicos];
    newServicos[index].servicoID = selectedOption ? selectedOption.value : '';
    newServicos[index].quantidade = 1; // fixa em 1
    setFormData(prev => ({ ...prev, servicos: newServicos }));
  };

  const addServico = () => {
    setFormData(prev => ({ ...prev, servicos: [...prev.servicos, { servicoID: '', quantidade: 1 }] }));
  };

  const removeServico = (index) => {
    if (formData.servicos.length > 1) {
      const newServicos = formData.servicos.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, servicos: newServicos }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.clienteID) newErrors.clienteID = 'Selecione o cliente.';
    if (!formData.funcionarioID) newErrors.funcionarioID = 'Selecione o funcionário.';
    if (!formData.dataEntrada) newErrors.dataEntrada = 'Informe a data de entrada.';
    if (!formData.status) newErrors.status = 'Selecione o status.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Formatação das datas para envio
    const dataEntradaFormatada = formData.dataEntrada ? new Date(formData.dataEntrada).toISOString().slice(0, 10) : null;
    const dataConclusaoFormatada = formData.dataConclusao ? new Date(formData.dataConclusao).toISOString().slice(0, 10) : null;

    const finalData = {
      id: formData.id || undefined,
      clienteID: formData.clienteID || '',
      funcionarioID: formData.funcionarioID || '',
      produtoIDs: (formData.produtos || []).map(p => p.produtoID).filter(Boolean),
      servicoIDs: (formData.servicos || []).map(s => s.servicoID).filter(Boolean),
      dataEntrada: dataEntradaFormatada,
      dataConclusao: dataConclusaoFormatada,
      status: formData.status || '',
      observacoes: formData.observacoes || '',
      ativo: !!formData.ativo,
      defeitoRelatado: formData.defeitoRelatado || '',
      diagnostico: formData.diagnostico || '',
      laudoTecnico: formData.laudoTecnico || '',
      marca: formData.marca || '',
      modelo: formData.modelo || '',
      imeIouSerial: formData.imeIouSerial || '',
      senhaAcesso: formData.senhaAcesso || '',
      emGarantia: !!formData.emGarantia,
      dataGarantia: formData.dataGarantia ? new Date(formData.dataGarantia).toISOString() : null,
      valorMaoDeObra: Number(formData.valorMaoDeObra) || 0,
      valorPecas: Number(formData.valorPecas) || 0,
      valorTotal: Number(formData.valorTotal) || 0,
      formaPagamento: formData.formaPagamento || '',
      pago: !!formData.pago,
      tipoAtendimento: formData.tipoAtendimento || '',
      prioridade: formData.prioridade || '',
      numeroOS: formData.numeroOS !== '' ? Number(formData.numeroOS) : undefined,
      assinaturaClienteBase64: formData.assinaturaClienteBase64 || '',
      assinaturaTecnicoBase64: formData.assinaturaTecnicoBase64 || '',
      pecasUtilizadas: (formData.produtos || []).map(p => ({ produtoID: p.produtoID, quantidade: Number(p.quantidade) || 0 })),
    };

    // Se status for "Concluido", atualiza estoque dos produtos
    if (finalData.status === 'Concluido') {
      for (const produto of formData.produtos) {
        if (produto.produtoID && produto.quantidade) {
          try {
            await apiCliente.patch(`/Produto/${produto.produtoID}/baixa-estoque`, {
              quantidade: produto.quantidade
            });
          } catch (err) {
            console.error(`Erro ao baixar estoque do produto ${produto.produtoID}:`, err);
          }
        }
      }
    }

    console.log('finalData enviado:', finalData);
    if (onSubmit) onSubmit(finalData);
  };

  // Filtro e label customizado para produtos
  const filteredProdutoOptions = (produtoOptions || []).map(opt => ({
    ...opt,
    label: opt.label || '',  // Mantém como string simples
  }));

  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>
      <Form onSubmit={handleFormSubmit}>
        {/* Linha 1: Cliente e Funcionário */}
        <CompactFormRow>
          <FormGroup delay="0.1s">
            <Label>Cliente <span style={{color:'red'}}>*</span></Label>
            <ReactSelect
              name="clienteID"
              options={clienteOptions}
              value={clienteOptions.find(option => option.value === formData.clienteID) || null}
              onChange={(selectedOption) => handleSelectChange(selectedOption, 'clienteID')}
              placeholder="Selecione um cliente"
              styles={customSelectStyles}
              isSearchable
            />
            {errors.clienteID && <div style={{color:'red',fontSize:'12px'}}>{errors.clienteID}</div>}
          </FormGroup>
          <FormGroup delay="0.2s">
            <Label>Funcionário <span style={{color:'red'}}>*</span></Label>
            <ReactSelect
              name="funcionarioID"
              options={funcionarioOptions}
              value={funcionarioOptions.find(option => option.value === formData.funcionarioID) || null}
              onChange={(selectedOption) => handleSelectChange(selectedOption, 'funcionarioID')}
              placeholder="Selecione um funcionário"
              styles={customSelectStyles}
              isSearchable
            />
            {errors.funcionarioID && <div style={{color:'red',fontSize:'12px'}}>{errors.funcionarioID}</div>}
          </FormGroup>
        </CompactFormRow>

        {/* Linha 2: Produtos e Serviços */}
        {/* Linha 2: Produtos e Serviços */}
        <CompactFormRow className="side-by-side">
          <ResponsiveFormGroup delay="0.3s">
            <SectionHeader>
              <SectionTitle onClick={addProduto} title="Clique para adicionar produto">
                Produtos
              </SectionTitle>
            </SectionHeader>
            <ItemSection>
              {formData.produtos.map((produto, index) => (
                <ItemRow key={index}>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem', color: '#6c757d' }}>
                    #{index + 1}
                  </div>
                  <ReactSelect
                    name="produtoID"
                    options={[
                      { value: '', label: 'Selecione o produto' }, // opção padrão
                      ...filteredProdutoOptions
                    ]}
                    value={
                      produto.produtoID
                        ? filteredProdutoOptions.find(option => option.value === produto.produtoID) || { value: '', label: 'Selecione o produto' }
                        : { value: '', label: 'Selecione o produto' }
                    }
                    onChange={(selectedOption) => handleProdutoChange(index, selectedOption)}
                    placeholder="Selecione um produto"
                    styles={customSelectStyles}
                    isSearchable
                    formatOptionLabel={(option, { context }) => (
                      option.value === '' ? (
                        option.label
                      ) : (
                        <span>
                          {option.label}
                          <span style={{ color: 'green', marginLeft: 8, fontWeight: 600 }}>
                            ({option.quantidade || 0})
                          </span>
                        </span>
                      )
                    )}
                  />
                  <QuantityInput
                    type="number"
                    min="1"
                    value={produto.quantidade}
                    onChange={(e) => handleProdutoQuantityChange(index, e.target.value)}
                    placeholder="Qtd"
                  />
                  {formData.produtos.length > 1 && (
                    <RemoveButton type="button" onClick={() => removeProduto(index)} title="Remover produto">
                      <FiTrash2 size={16} color="#fff" />
                    </RemoveButton>
                  )}
                </ItemRow>
              ))}
            </ItemSection>
            {errors.produtos && <div style={{color:'red',fontSize:'12px'}}>{errors.produtos}</div>}
          </ResponsiveFormGroup>

          <ResponsiveFormGroup delay="0.4s">
            <SectionHeader>
              <SectionTitle onClick={addServico} title="Clique para adicionar serviço">
                Serviços
              </SectionTitle>
            </SectionHeader>
            <ItemSection>
              {formData.servicos.map((servico, index) => (
                <ItemRow key={index}>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem', color: '#6c757d' }}>
                    #{index + 1}
                  </div>
                  <ReactSelect
                    options={[
                      { value: '', label: 'Selecione o serviço' }, // opção padrão
                      ...servicoOptions
                    ]}
                    value={
                      servico.servicoID
                        ? servicoOptions.find(option => option.value === servico.servicoID) || { value: '', label: 'Selecione o serviço' }
                        : { value: '', label: 'Selecione o serviço' }
                    }
                    onChange={(selectedOption) => handleServicoChange(index, selectedOption)}
                    placeholder="Selecione um serviço"
                    styles={customSelectStyles}
                    isSearchable
                  />
                  <QuantityInput
                    type="number"
                    min="1"
                    value={1}
                    disabled
                    placeholder="Qtd"
                  />
                  {formData.servicos.length > 1 && (
                    <RemoveButton type="button" onClick={() => removeServico(index)} title="Remover serviço">
                      <FiTrash2 size={16} color="#fff" />
                    </RemoveButton>
                  )}
                </ItemRow>
              ))}
            </ItemSection>
            {errors.servicos && <div style={{color:'red',fontSize:'12px'}}>{errors.servicos}</div>}
          </ResponsiveFormGroup>
        </CompactFormRow>

        {/* Linha 3: Observações / Diagnóstico */}
        <FormGroup delay="0.5s" style={{ width: '100%', marginBottom: '0.8rem' }}>
          <Label>Observações</Label>
          <TextArea
            name="observacoes"
            placeholder="Observações gerais..."
            value={formData.observacoes || ''}
            onChange={handleChange}
            rows={3}
            style={{ fontSize: '0.8rem', width: '100%', boxSizing: 'border-box' }}
          />
        </FormGroup>

        {/* Campos técnicos */}
        <CompactFormRow>
          <FormGroup delay="0.6s">
            <Label>Defeito Relatado</Label>
            <Input name="defeitoRelatado" value={formData.defeitoRelatado} onChange={handleChange} />
          </FormGroup>

          <FormGroup delay="0.7s">
            <Label>Diagnóstico</Label>
            <Input name="diagnostico" value={formData.diagnostico} onChange={handleChange} />
          </FormGroup>
        </CompactFormRow>

        <FormGroup>
          <Label>Laudo Técnico</Label>
          <TextArea name="laudoTecnico" value={formData.laudoTecnico} onChange={handleChange} rows={2} />
        </FormGroup>

        {/* Dados do aparelho */}
        <CompactFormRow>
          <FormGroup>
            <Label>Marca</Label>
            <Input name="marca" value={formData.marca} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Modelo</Label>
            <Input name="modelo" value={formData.modelo} onChange={handleChange} />
          </FormGroup>
        </CompactFormRow>

        <CompactFormRow>
          <FormGroup>
            <Label>IMEI / Serial</Label>
            <Input name="imeIouSerial" value={formData.imeIouSerial} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Senha de Acesso</Label>
            <Input name="senhaAcesso" value={formData.senhaAcesso} onChange={handleChange} />
          </FormGroup>
        </CompactFormRow>

        {/* Datas e garantia */}
        <CompactFormRow>
          <FormGroup>
            <Label>Data de Entrada <span style={{color:'red'}}>*</span></Label>
            <Input type="date" name="dataEntrada" value={formData.dataEntrada || ''} onChange={handleChange} />
            {errors.dataEntrada && <div style={{color:'red',fontSize:'12px'}}>{errors.dataEntrada}</div>}
          </FormGroup>
          <FormGroup>
            <Label>Data de Conclusão</Label>
            <Input type="date" name="dataConclusao" value={formData.dataConclusao || ''} onChange={handleChange} />
          </FormGroup>
        </CompactFormRow>
        <CompactFormRow>
          <FormGroup>
            {/* Mensagem colorida de garantia */}
            {formData.emGarantia ? (
              <div style={{ color: 'green', fontSize: '11px' }}> ✔ Esta em Garantia</div>
            ) : (
              <div style={{ color: 'red', fontSize: '11px' }}> |--Fora da Garantia--|</div>
            )}
            {/* Campo dataGarantia sempre visível */}
            <Input
              type="date"
              name="dataGarantia"
              value={formData.dataGarantia || ''}
              onChange={handleChange}
              readOnly
              style={{ background: '#f8f9fa', color: '#2c3e50', fontWeight: '500' }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Status <span style={{color:'red'}}>*</span></Label>
            <ReactSelect
              name="status"
              options={[
                { value: 'Orçamento', label: 'Orçamento' },
                { value: 'Não iniciado', label: 'Não iniciado' },
                { value: 'Em andamento', label: 'Em andamento' },
                { value: 'Concluido', label: 'Concluido' },
                { value: 'Cancelado', label: 'Cancelado' },
              ]}
              value={formData.status ? { value: formData.status, label: formData.status } : null}
              onChange={(selectedOption) => handleSelectChange(selectedOption, 'status')}
              placeholder="Selecione o status"
              styles={customStatusStyles}
            />
            {errors.status && <div style={{color:'red',fontSize:'12px'}}>{errors.status}</div>}
          </FormGroup>
        </CompactFormRow>

        {/* Financeiro */}
        <CompactFormRow>
          <FormGroup>
            <Label>Valor Mão de Obra</Label>
            <Input
              type="number"
              name="valorMaoDeObra"
              value={formData.valorMaoDeObra}
              onChange={handleChange}
              inputMode="decimal"
              placeholder="R$ 0,00"
            />
          </FormGroup>

          <FormGroup>
            <Label>Valor Serviços</Label>
            <Input
              type="text"
              name="valorServicos"
              value={formatCurrency(valorServicos)}
              readOnly
              inputMode="decimal"
              placeholder="R$ 0,00"
              style={{ background: '#f8f9fa', color: '#2c3e50', fontWeight: '500' }}
            />
          </FormGroup>

          <FormGroup>
            <Label>Valor - Peças</Label>
            <Input
              type="text"
              name="valorPecas"
              value={formatCurrency(formData.valorPecas)}
              readOnly
              inputMode="decimal"
              // pattern="[\d,.]+" // Remover esta linha!
              placeholder="R$ 0,00"
              style={{ background: '#f8f9fa', color: '#2c3e50', fontWeight: '500' }}
            />
          </FormGroup>
        </CompactFormRow>

        <CompactFormRow>
          <FormGroup>
            <Label>Valor Total</Label>
            <Input
              type="text"
              name="valorTotal"
              value={formatCurrency(formData.valorTotal)}
              onChange={e => handleCurrencyChange(e, 'valorTotal')}
              inputMode="decimal"
              // pattern="[\d,.]+" // Remover esta linha!
              placeholder="R$ 0,00"
            />
          </FormGroup>
          <FormGroup>
            <Label>Forma de Pagamento</Label>
            <Input
              as="select"
              name="formaPagamento"
              value={formData.formaPagamento}
              onChange={handleChange}
              style={{ fontSize: '0.9rem', padding: '0.3rem', background: '#fff', color: '#2c3e50', border: '2px solid #e1e7f0', borderRadius: '6px' }}
            >
              <option value="">Selecione</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Pix">Pix</option>
              <option value="Débito">Débito</option>
              <option value="Crédito">Crédito</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label style={{ display: 'flex', alignSelf: 'left' }}>
              <input type="checkbox" name="pago" checked={!!formData.pago} onChange={handleChange} style={{ marginRight: 8 }} />
              Pago
            </Label>
          </FormGroup>
        </CompactFormRow>

        {/* Outros campos */}
        <CompactFormRow>
          <FormGroup>
            <Label>Tipo de Atendimento</Label>
            <Input
              as="select"
              name="tipoAtendimento"
              value={formData.tipoAtendimento}
              onChange={handleChange}
              style={{ fontSize: '0.9rem', padding: '0.3rem', background: '#fff', color: '#2c3e50', border: '2px solid #e1e7f0', borderRadius: '6px' }}
            >
              <option value="">Selecione</option>
              <option value="Loja">Loja</option>
              <option value="Exterior">Exterior</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Prioridade</Label>
            <Select 
              name="prioridade" 
              value={formData.prioridade} 
              style={{ fontSize: '0.9rem', padding: '0.3rem', background: '#fff', color: '#2c3e50', border: '2px solid #e1e7f0', borderRadius: '6px' }}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </Select>
          </FormGroup>
        </CompactFormRow>

        {/* Assinaturas */}
        <FormGroup>
          <Label>Assinatura Cliente (base64)</Label>
          <TextArea name="assinaturaClienteBase64" value={formData.assinaturaClienteBase64} onChange={handleChange} rows={2} placeholder="Cole base64 aqui (opcional)" />
        </FormGroup>

        <FormGroup>
          <Label>Assinatura Técnico (base64)</Label>
          <TextArea name="assinaturaTecnicoBase64" value={formData.assinaturaTecnicoBase64} onChange={handleChange} rows={2} placeholder="Cole base64 aqui (opcional)" />
        </FormGroup>

        <EspacamentoButton>
          <Button type="submit" className="save">Salvar</Button>
          <Button type="button" className="cancel" onClick={onClose}>Cancelar</Button>
        </EspacamentoButton>
      </Form>
    </FormContainer>
  );
};

export default FormularioOrdemDeServico;