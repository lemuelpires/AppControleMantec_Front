
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

// ===== Componentes Estilizados Locais =====
const StyledInput = styled.input`
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #495057;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: #fff;

  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  &:disabled, &[readonly] {
    background-color: #e9ecef;
    opacity: 1;
    color: #6c757d;
    border-color: #dee2e6;
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #495057;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  resize: vertical;
  min-height: 80px;

  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
  border-radius: 0.375rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  cursor: pointer;
  border: 1px solid transparent;
  
  ${props => props.variant === 'primary' && `
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
    &:hover { background-color: #0b5ed7; border-color: #0a58ca; }
  `}

  ${props => props.variant === 'secondary' && `
    color: #6c757d;
    background-color: transparent;
    border-color: #6c757d;
    &:hover { color: #fff; background-color: #6c757d; border-color: #6c757d; }
  `}

  ${props => props.variant === 'danger' && `
    color: #dc3545;
    background-color: transparent;
    border-color: #dc3545;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    &:hover { color: #fff; background-color: #dc3545; }
  `}

  ${props => props.variant === 'success' && `
    color: #fff;
    background-color: #198754;
    border-color: #198754;
    margin-top: 8px;
    font-size: 0.85rem;
    &:hover { background-color: #157347; border-color: #146c43; }
  `}
`;

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

  // Atualiza o estado quando initialData mudar (importante para edição e carregamento assíncrono)
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  // Cálculo automático dos valores
  useEffect(() => {
    // 1. Calcular valorPecas
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
    somaPecas = parseFloat(somaPecas.toFixed(2));

    // 2. Calcular valorServicos
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
    somaServicos = parseFloat(somaServicos.toFixed(2));

    // 3. Calcular valorTotal (usando as somas calculadas agora, não o estado antigo)
    const valorMaoDeObra = toNumber(formData.valorMaoDeObra, 0);
    const somaTotal = parseFloat((valorMaoDeObra + somaPecas + somaServicos).toFixed(2));

    // 4. Atualizar estado se houver divergência
    if (
      somaPecas !== Number(formData.valorPecas || 0) ||
      somaServicos !== Number(formData.valorServicos || 0) ||
      somaTotal !== Number(formData.valorTotal || 0)
    ) {
      setFormData(prev => ({ ...prev, valorPecas: somaPecas, valorServicos: somaServicos, valorTotal: somaTotal }));
    }
  }, [formData.produtos, formData.servicos, formData.valorMaoDeObra, formData.valorPecas, formData.valorServicos, formData.valorTotal, produtoOptions, servicoOptions]);

  // Funções auxiliares para manipulação dos campos de produtos e serviços
  const handleProdutoChange = (index, selectedOption) => {
    const newProdutos = formData.produtos.map((item, i) =>
      i === index ? { ...item, produtoID: selectedOption ? selectedOption.value : '' } : item
    );
    setFormData({ ...formData, produtos: newProdutos });
  };
  const handleProdutoQuantityChange = (index, value) => {
    const newProdutos = formData.produtos.map((item, i) =>
      i === index ? { ...item, quantidade: value } : item
    );
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
    const newServicos = formData.servicos.map((item, i) =>
      i === index ? { ...item, servicoID: selectedOption ? selectedOption.value : '' } : item
    );
    setFormData({ ...formData, servicos: newServicos });
  };
  const handleServicoQuantityChange = (index, value) => {
    const newServicos = formData.servicos.map((item, i) =>
      i === index ? { ...item, quantidade: value } : item
    );
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
    <FormContainer style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '2rem' }}>
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
                <StyledInput
                  type="number"
                  min="1"
                  value={produto.quantidade}
                  onChange={e => handleProdutoQuantityChange(index, e.target.value)}
                  style={{ width: 60 }}
                />
                {formData.produtos.length > 1 && (
                  <Button type="button" variant="danger" onClick={() => removeProduto(index)} style={{ marginLeft: 4 }}>Remover</Button>
                )}
              </div>
            ))}
            <Button type="button" variant="success" onClick={addProduto}>+ Adicionar Produto</Button>
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
                <StyledInput
                  type="number"
                  min="1"
                  value={servico.quantidade}
                  onChange={e => handleServicoQuantityChange(index, e.target.value)}
                  style={{ width: 60 }}
                />
                {formData.servicos.length > 1 && (
                  <Button type="button" variant="danger" onClick={() => removeServico(index)} style={{ marginLeft: 4 }}>Remover</Button>
                )}
              </div>
            ))}
            <Button type="button" variant="success" onClick={addServico}>+ Adicionar Serviço</Button>
          </FormGroup>
        </FormRow>

        {/* Defeito Relatado e Diagnóstico */}
        <FormRow>
          <FormGroup>
            <Label>Defeito Relatado</Label>
            <StyledInput
              type="text"
              name="defeitoRelatado"
              value={formData.defeitoRelatado}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Diagnóstico Técnico</Label>
            <StyledInput
              type="text"
              name="diagnostico"
              value={formData.diagnostico}
              onChange={handleChange}
            />
          </FormGroup>
        </FormRow>

        {/* Observações */}
        <FormGroup>
          <Label>Observações</Label>
          <StyledTextArea
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            rows={3}
          />
        </FormGroup>

        {/* Status (fixo) */}
        <FormGroup>
          <Label>Status</Label>
          <StyledInput
            type="text"
            name="status"
            value={formData.status}
            readOnly
          />
          {errors.status && <div style={{ color: 'red', fontSize: '12px' }}>{errors.status}</div>}
        </FormGroup>

        {/* Data de Entrada */}
        <FormGroup>
          <Label>Data de Criação</Label>
          <StyledInput
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
            <StyledInput
              type="number"
              name="valorMaoDeObra"
              value={formData.valorMaoDeObra}
              onChange={handleChange}
              placeholder="R$ 0,00"
            />
          </FormGroup>
          <FormGroup>
            <Label>Valor Serviços</Label>
            <StyledInput
              type="number"
              name="valorServicos"
              value={formData.valorServicos}
              readOnly
              placeholder="R$ 0,00"
            />
          </FormGroup>
          <FormGroup>
            <Label>Valor Peças</Label>
            <StyledInput
              type="number"
              name="valorPecas"
              value={formData.valorPecas}
              readOnly
              placeholder="R$ 0,00"
            />
          </FormGroup>
          <FormGroup>
            <Label>Valor Total</Label>
            <StyledInput
              type="number"
              name="valorTotal"
              value={formData.valorTotal}
              readOnly
              placeholder="R$ 0,00"
            />
          </FormGroup>
        </FormRow>

        <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Button type="submit" variant="primary" style={{ minWidth: '120px' }}>Salvar</Button>
          <Button type="button" variant="secondary" onClick={onClose} style={{ minWidth: '120px' }}>Cancelar</Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default FormularioOrcamento;
