
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactSelect from 'react-select';
import {
  FormContainer,
  FormTitle,
  Form,
  FormGroup,
  FormRow,
  Label,
  SectionHeader
} from './style';

const statusOptions = [
  { value: 'Pendente', label: 'Pendente' },
  { value: 'Aceito', label: 'Aceito' },
  { value: 'Recusado', label: 'Recusado' },
];

// ===== Utilidades de cálculo e estilos =====
const toNumber = (v, def = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
};
const statusColors = {
  'Pendente': '#6c757d',
  'Aceito': '#28a745',
  'Recusado': '#dc3545',
};
const customStatusStyles = {
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
    color: statusColors[state.data.value] || '#2c3e50',
    fontWeight: state.isSelected ? 'bold' : '500',
    borderLeft: `6px solid ${statusColors[state.data.value] || 'transparent'}`,
    paddingLeft: '12px',
    fontSize: '0.7rem',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: statusColors[state.data.value] || '#2c3e50',
    fontWeight: 'bold',
    fontSize: '0.7rem',
  }),
  menu: (provided) => ({ ...provided, zIndex: 10000, borderRadius: '6px' }),
  placeholder: (provided) => ({ ...provided, color: '#6c757d', fontSize: '0.65rem', fontWeight: '400' }),
  dropdownIndicator: (provided, state) => ({ ...provided, color: '#6c757d', transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none' }),
  valueContainer: (provided) => ({ ...provided, padding: '0 4px' }),
  indicatorsContainer: (provided) => ({ ...provided, height: '28px' })
};
const customSelectStyles = customStatusStyles;

const FormularioOrcamento = ({
  clienteOptions = [],
  produtoOptions = [],
  servicoOptions = [],
  onSubmit,
  onClose,
  title = 'Novo Orçamento',
  initialData = {},
}) => {
  const [formData, setFormData] = useState({
    clienteID: '',
    produtos: [{ produtoID: '', quantidade: 1 }],
    servicos: [{ servicoID: '', quantidade: 1 }],
    defeitoRelatado: '',
    diagnostico: '',
    observacoes: '',
    status: 'Orçamento',
    dataValidade: '',
    aceiteCliente: false,
    dataEntrada: '',
    valorMaoDeObra: '',
    valorServicos: '',
    valorPecas: '',
    valorTotal: '',
    ...initialData,
  });
  const [errors, setErrors] = useState({});

  // Cálculo automático dos valores
  useEffect(() => {
    // valorPecas
    const produtoMap = {};
    (produtoOptions || []).forEach(opt => {
      const id = String(opt?.value ?? '');
      if (!id) return;
      produtoMap[id] = toNumber(opt?.preco ?? opt?.precoVenda ?? opt?.price, 0);
    });
    const listaProdutos = Array.isArray(formData.produtos) ? formData.produtos : [];
    let somaPecas = 0;
    (listaProdutos || []).forEach((item) => {
      const id = String(item?.produtoID ?? '');
      const qtd = toNumber(item?.quantidade, 0);
      if (!id) return;
      const preco = produtoMap[id] || 0;
      somaPecas += preco * qtd;
    });
    if (parseFloat(somaPecas.toFixed(2)) !== Number(formData.valorPecas || 0)) {
      setFormData(prev => ({ ...prev, valorPecas: parseFloat(somaPecas.toFixed(2)) }));
    }
    // valorServicos
    const servicoMap = {};
    (servicoOptions || []).forEach(opt => {
      const id = String(opt?.value ?? '');
      if (!id) return;
      servicoMap[id] = toNumber(opt?.preco ?? opt?.precoVenda ?? opt?.price, 0);
    });
    const listaServicos = Array.isArray(formData.servicos) ? formData.servicos : [];
    let somaServicos = 0;
    (listaServicos || []).forEach((item) => {
      const id = String(item?.servicoID ?? '');
      const qtd = toNumber(item?.quantidade, 0);
      if (!id) return;
      const preco = servicoMap[id] || 0;
      somaServicos += preco * qtd;
    });
    if (parseFloat(somaServicos.toFixed(2)) !== Number(formData.valorServicos || 0)) {
      setFormData(prev => ({ ...prev, valorServicos: parseFloat(somaServicos.toFixed(2)) }));
    }
    // valorTotal
    const somaTotal = (Number(formData.valorMaoDeObra) || 0)
      + (Number(formData.valorPecas) || 0)
      + (Number(formData.valorServicos) || 0);
    if (parseFloat(somaTotal.toFixed(2)) !== Number(formData.valorTotal || 0)) {
      setFormData(prev => ({ ...prev, valorTotal: parseFloat(somaTotal.toFixed(2)) }));
    }
  }, [formData.produtos, formData.servicos, formData.valorMaoDeObra, produtoOptions, servicoOptions]);

  // Funções auxiliares para manipulação dos campos de produtos e serviços
  const handleProdutoChange = (index, selectedOption) => {
    const newProdutos = [...formData.produtos];
    newProdutos[index].produtoID = selectedOption ? selectedOption.value : '';
    setFormData({ ...formData, produtos: newProdutos });
  };
  const handleProdutoQuantityChange = (index, value) => {
    const newProdutos = [...formData.produtos];
    newProdutos[index].quantidade = value;
    setFormData({ ...formData, produtos: newProdutos });
  };
  const addProduto = () => {
    setFormData({ ...formData, produtos: [...formData.produtos, { produtoID: '', quantidade: 1 }] });
  };
  const removeProduto = (index) => {
    const newProdutos = formData.produtos.filter((_, i) => i !== index);
    setFormData({ ...formData, produtos: newProdutos });
  };

  const handleServicoChange = (index, selectedOption) => {
    const newServicos = [...formData.servicos];
    newServicos[index].servicoID = selectedOption ? selectedOption.value : '';
    setFormData({ ...formData, servicos: newServicos });
  };
  const handleServicoQuantityChange = (index, value) => {
    const newServicos = [...formData.servicos];
    newServicos[index].quantidade = value;
    setFormData({ ...formData, servicos: newServicos });
  };
  const addServico = () => {
    setFormData({ ...formData, servicos: [...formData.servicos, { servicoID: '', quantidade: 1 }] });
  };
  const removeServico = (index) => {
    const newServicos = formData.servicos.filter((_, i) => i !== index);
    setFormData({ ...formData, servicos: newServicos });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSelectChange = (selectedOption, name) => {
    setFormData({ ...formData, [name]: selectedOption ? selectedOption.value : '' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Validação simples
    const newErrors = {};
    if (!formData.clienteID) newErrors.clienteID = 'Selecione um cliente';
    if (!formData.status) newErrors.status = 'Selecione o status';
    if (!formData.dataEntrada) newErrors.dataEntrada = 'Informe a data de criação';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    if (onSubmit) onSubmit({ ...formData, ativo: true });
  };

  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>
      <Form onSubmit={handleFormSubmit}>
        {/* Cliente */}
        <FormGroup>
          <Label>Cliente *</Label>
          <ReactSelect
            name="clienteID"
            options={clienteOptions}
            value={clienteOptions.find(option => option.value === formData.clienteID) || null}
            onChange={(selectedOption) => handleSelectChange(selectedOption, 'clienteID')}
            placeholder="Selecione um cliente"
            isSearchable
            styles={customSelectStyles}
          />
          {errors.clienteID && <div style={{ color: 'red', fontSize: '12px' }}>{errors.clienteID}</div>}
        </FormGroup>

        {/* Produtos e Serviços */}
        <FormRow>
          <FormGroup>
            <SectionHeader>Produtos sugeridos</SectionHeader>
            {formData.produtos.map((produto, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <ReactSelect
                  name="produtoID"
                  options={produtoOptions}
                  value={produtoOptions.find(option => option.value === produto.produtoID) || null}
                  onChange={(selectedOption) => handleProdutoChange(index, selectedOption)}
                  placeholder="Selecione o produto"
                  isSearchable
                  styles={customSelectStyles}
                />
                <input
                  type="number"
                  min="1"
                  value={produto.quantidade}
                  onChange={e => handleProdutoQuantityChange(index, e.target.value)}
                  style={{ width: 60 }}
                />
                {formData.produtos.length > 1 && (
                  <button type="button" onClick={() => removeProduto(index)} style={{ marginLeft: 4 }}>Remover</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addProduto} style={{ marginTop: 4 }}>Adicionar Produto</button>
          </FormGroup>
          <FormGroup>
            <SectionHeader>Serviços sugeridos</SectionHeader>
            {formData.servicos.map((servico, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <ReactSelect
                  name="servicoID"
                  options={servicoOptions}
                  value={servicoOptions.find(option => option.value === servico.servicoID) || null}
                  onChange={(selectedOption) => handleServicoChange(index, selectedOption)}
                  placeholder="Selecione o serviço"
                  isSearchable
                  styles={customSelectStyles}
                />
                <input
                  type="number"
                  min="1"
                  value={servico.quantidade}
                  onChange={e => handleServicoQuantityChange(index, e.target.value)}
                  style={{ width: 60 }}
                />
                {formData.servicos.length > 1 && (
                  <button type="button" onClick={() => removeServico(index)} style={{ marginLeft: 4 }}>Remover</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addServico} style={{ marginTop: 4 }}>Adicionar Serviço</button>
          </FormGroup>
        </FormRow>

        {/* Defeito Relatado e Diagnóstico */}
        <FormRow>
          <FormGroup>
            <Label>Defeito Relatado</Label>
            <input
              type="text"
              name="defeitoRelatado"
              value={formData.defeitoRelatado}
              onChange={handleChange}
              style={{ width: '100%' }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Diagnóstico Técnico</Label>
            <input
              type="text"
              name="diagnostico"
              value={formData.diagnostico}
              onChange={handleChange}
              style={{ width: '100%' }}
            />
          </FormGroup>
        </FormRow>

        {/* Observações */}
        <FormGroup>
          <Label>Observações</Label>
          <textarea
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            rows={3}
            style={{ width: '100%' }}
          />
        </FormGroup>

        {/* Status (fixo) */}
        <FormGroup>
          <Label>Status</Label>
          <input
            type="text"
            name="status"
            value={formData.status}
            readOnly
            style={{ background: '#f8f9fa', border: '1.5px solid #d1d5db', borderRadius: 8, padding: 6, width: '100%' }}
          />
        </FormGroup>

        {/* Data de Entrada */}
        <FormGroup>
          <Label>Data de Criação</Label>
          <input
            type="date"
            name="dataEntrada"
            value={formData.dataEntrada}
            onChange={handleChange}
          />
          {errors.dataEntrada && <div style={{ color: 'red', fontSize: '12px' }}>{errors.dataEntrada}</div>}
        </FormGroup>

        {/* Valores */}
        <FormRow>
          <FormGroup>
            <Label>Valor Mão de Obra</Label>
            <input
              type="number"
              name="valorMaoDeObra"
              value={formData.valorMaoDeObra}
              onChange={handleChange}
              placeholder="R$ 0,00"
              style={{ background: '#fff', border: '1.5px solid #d1d5db', borderRadius: 8, padding: 6, width: '100%' }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Valor Serviços</Label>
            <input
              type="number"
              name="valorServicos"
              value={formData.valorServicos}
              readOnly
              placeholder="R$ 0,00"
              style={{ background: '#f8f9fa', border: '1.5px solid #d1d5db', borderRadius: 8, padding: 6, width: '100%' }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Valor Peças</Label>
            <input
              type="number"
              name="valorPecas"
              value={formData.valorPecas}
              readOnly
              placeholder="R$ 0,00"
              style={{ background: '#f8f9fa', border: '1.5px solid #d1d5db', borderRadius: 8, padding: 6, width: '100%' }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Valor Total</Label>
            <input
              type="number"
              name="valorTotal"
              value={formData.valorTotal}
              readOnly
              placeholder="R$ 0,00"
              style={{ background: '#f8f9fa', border: '1.5px solid #d1d5db', borderRadius: 8, padding: 6, width: '100%' }}
            />
          </FormGroup>
        </FormRow>

        <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button type="submit">Salvar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default FormularioOrcamento;
