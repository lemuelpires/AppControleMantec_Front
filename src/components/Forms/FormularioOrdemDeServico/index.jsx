// FormularioOrdemDeServico.jsx
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

// ----- estilos locais (mantidos do seu código) -----
const ItemSection = styled.div`
  margin-bottom: 1rem;
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
  margin-bottom: 0.6rem;
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

const CompactFormRow = styled(FormRow)`
  margin-bottom: 0.8rem;
  
  &.side-by-side {
    display: flex;
    gap: 1.5%;
    align-items: flex-start;
  }
`;
// ----------------------------------------------------

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

  // util: formatar data ISO -> yyyy-mm-dd para input[type=date]
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
    // produtos/servicos internos (produtoID/quantidade)
    produtos: [{ produtoID: '', quantidade: 1 }],
    servicos: [{ servicoID: '', quantidade: 1 }],
    // datas
    dataEntrada: formatDateForInput(initialValues.dataEntrada) || '',
    dataConclusao: formatDateForInput(initialValues.dataConclusao) || '',
    // básicos
    status: initialValues.status || '',
    observacoes: initialValues.observacoes || '',
    ativo: initialValues.ativo ?? true,
    // técnicos
    defeitoRelatado: initialValues.defeitoRelatado || '',
    diagnostico: initialValues.diagnostico || '',
    laudoTecnico: initialValues.laudoTecnico || '',
    // aparelho
    marca: initialValues.marca || '',
    modelo: initialValues.modelo || '',
    imeIouSerial: initialValues.imeIouSerial || '',
    senhaAcesso: initialValues.senhaAcesso || '',
    // garantia
    emGarantia: initialValues.emGarantia ?? false,
    dataGarantia: formatDateForInput(initialValues.dataGarantia) || '',
    // valores financeiros
    valorMaoDeObra: initialValues.valorMaoDeObra ?? (initialValues.valorServico ?? 0),
    valorPecas: initialValues.valorPecas ?? 0,
    valorTotal: initialValues.valorTotal ?? 0,
    // pagamento/outros
    formaPagamento: initialValues.formaPagamento || '',
    pago: initialValues.pago ?? false,
    tipoAtendimento: initialValues.tipoAtendimento || '',
    prioridade: initialValues.prioridade || '',
    numeroOS: initialValues.numeroOS ?? '',
    // assinaturas / base64
    assinaturaClienteBase64: initialValues.assinaturaClienteBase64 || '',
    assinaturaTecnicoBase64: initialValues.assinaturaTecnicoBase64 || '',
  });

  // Preencher produtos/servicos a partir de initialValues (produtoIDs / pecasUtilizadas / servicoIDs)
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
        return initialValues.servicos.map(s => ({ servicoID: s.servicoID || '', quantidade: s.quantidade ?? 1 }));
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

  // Atualizar valorTotal automaticamente (valorMaoDeObra + valorPecas)
  useEffect(() => {
    const soma = (Number(formData.valorMaoDeObra) || 0) + (Number(formData.valorPecas) || 0);
    if (soma !== Number(formData.valorTotal || 0)) {
      setFormData(prev => ({ ...prev, valorTotal: soma }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.valorMaoDeObra, formData.valorPecas]);

  // Handlers genéricos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
    if (type === 'checkbox') newValue = checked;
    if (type === 'number') newValue = value === '' ? '' : Number(value);
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSelectChange = (selectedOption, fieldName) => {
    setFormData(prev => ({ ...prev, [fieldName]: selectedOption ? selectedOption.value : '' }));
  };

  // Produtos (interno: produtos = [{produtoID, quantidade}])
  const handleProdutoChange = (index, selectedOption) => {
    const newProdutos = [...formData.produtos];
    newProdutos[index].produtoID = selectedOption ? selectedOption.value : '';
    setFormData(prev => ({ ...prev, produtos: newProdutos }));
  };
  const handleProdutoQuantityChange = (index, value) => {
    const newProdutos = [...formData.produtos];
    newProdutos[index].quantidade = Math.max(1, parseInt(value) || 1);
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

  // Serviços (interno)
  const handleServicoChange = (index, selectedOption) => {
    const newServicos = [...formData.servicos];
    newServicos[index].servicoID = selectedOption ? selectedOption.value : '';
    setFormData(prev => ({ ...prev, servicos: newServicos }));
  };
  const handleServicoQuantityChange = (index, value) => {
    const newServicos = [...formData.servicos];
    newServicos[index].quantidade = Math.max(1, parseInt(value) || 1);
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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // montar objeto no formato do seu endpoint
    const finalData = {
      id: formData.id || undefined,
      clienteID: formData.clienteID || '',
      funcionarioID: formData.funcionarioID || '',
      produtoIDs: (formData.produtos || []).map(p => p.produtoID).filter(Boolean),
      servicoIDs: (formData.servicos || []).map(s => s.servicoID).filter(Boolean),
      dataEntrada: formData.dataEntrada ? new Date(formData.dataEntrada).toISOString() : null,
      dataConclusao: formData.dataConclusao ? new Date(formData.dataConclusao).toISOString() : null,
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
      //numeroOS: formData.numeroOS ? Number(formData.numeroOS) : 0,
      assinaturaClienteBase64: formData.assinaturaClienteBase64 || '',
      assinaturaTecnicoBase64: formData.assinaturaTecnicoBase64 || '',
      pecasUtilizadas: (formData.produtos || []).map(p => ({ produtoID: p.produtoID, quantidade: Number(p.quantidade) || 0 })),
    };

    console.log('finalData enviado:', finalData);
    if (onSubmit) onSubmit(finalData);
  };

  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>
      <Form onSubmit={handleFormSubmit}>
        {/* Linha 1: Cliente e Funcionário */}
        <CompactFormRow>
          <FormGroup delay="0.1s">
            <Label>Cliente</Label>
            <ReactSelect
              name="clienteID"
              options={clienteOptions}
              value={clienteOptions.find(option => option.value === formData.clienteID) || null}
              onChange={(selectedOption) => handleSelectChange(selectedOption, 'clienteID')}
              placeholder="Selecione um cliente"
              styles={customSelectStyles}
              isSearchable
            />
          </FormGroup>

          <FormGroup delay="0.2s">
            <Label>Funcionário</Label>
            <ReactSelect
              name="funcionarioID"
              options={funcionarioOptions}
              value={funcionarioOptions.find(option => option.value === formData.funcionarioID) || null}
              onChange={(selectedOption) => handleSelectChange(selectedOption, 'funcionarioID')}
              placeholder="Selecione um funcionário"
              styles={customSelectStyles}
              isSearchable
            />
          </FormGroup>
        </CompactFormRow>

        {/* Linha 2: Produtos e Serviços (mantém quantidade e cria pecasUtilizadas) */}
        <CompactFormRow className="side-by-side">
          <FormGroup delay="0.3s" style={{ width: '49%' }}>
            <SectionHeader>
              <SectionTitle onClick={addProduto} title="Clique para adicionar produto">Produtos</SectionTitle>
            </SectionHeader>
            <ItemSection>
              {formData.produtos.map((produto, index) => (
                <ItemRow key={index}>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem', color: '#6c757d' }}>
                    #{index + 1}
                  </div>
                  <ReactSelect
                    options={produtoOptions}
                    value={produtoOptions.find(option => option.value === produto.produtoID) || null}
                    onChange={(selectedOption) => handleProdutoChange(index, selectedOption)}
                    placeholder="Selecione um produto"
                    styles={customSelectStyles}
                    isSearchable
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
          </FormGroup>

          <FormGroup delay="0.4s" style={{ width: '49%' }}>
            <SectionHeader>
              <SectionTitle onClick={addServico} title="Clique para adicionar serviço">Serviços</SectionTitle>
            </SectionHeader>
            <ItemSection>
              {formData.servicos.map((servico, index) => (
                <ItemRow key={index}>
                  <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem', color: '#6c757d' }}>
                    #{index + 1}
                  </div>
                  <ReactSelect
                    options={servicoOptions}
                    value={servicoOptions.find(option => option.value === servico.servicoID) || null}
                    onChange={(selectedOption) => handleServicoChange(index, selectedOption)}
                    placeholder="Selecione um serviço"
                    styles={customSelectStyles}
                    isSearchable
                  />
                  <QuantityInput
                    type="number"
                    min="1"
                    value={servico.quantidade}
                    onChange={(e) => handleServicoQuantityChange(index, e.target.value)}
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
          </FormGroup>
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

        {/* Campos técnicos (defeito, diagnostico, laudo) */}
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
            <Label>Data de Entrada</Label>
            <Input type="date" name="dataEntrada" value={formData.dataEntrada || ''} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Data de Conclusão</Label>
            <Input type="date" name="dataConclusao" value={formData.dataConclusao || ''} onChange={handleChange} />
          </FormGroup>
        </CompactFormRow>

        <CompactFormRow>
          <FormGroup>
            <Label>
              <input type="checkbox" name="emGarantia" checked={!!formData.emGarantia} onChange={handleChange} style={{ marginRight: 8 }} />
              Em garantia
            </Label>
            {formData.emGarantia && (
              <Input type="date" name="dataGarantia" value={formData.dataGarantia || ''} onChange={handleChange} />
            )}
          </FormGroup>

          <FormGroup>
            <Label>Status</Label>
            <ReactSelect
              name="status"
              options={[
                { value: 'Não iniciado', label: 'Não iniciado' },
                { value: 'Em andamento', label: 'Em andamento' },
                { value: 'Concluída', label: 'Concluída' },
                { value: 'Cancelado', label: 'Cancelado' },
              ]}
              value={formData.status ? { value: formData.status, label: formData.status } : null}
              onChange={(selectedOption) => handleSelectChange(selectedOption, 'status')}
              placeholder="Selecione o status"
              styles={customSelectStyles}
            />
          </FormGroup>
        </CompactFormRow>

        {/* Financeiro */}
        <CompactFormRow>
          <FormGroup>
            <Label>Valor - Mão de Obra</Label>
            <Input type="number" step="0.01" name="valorMaoDeObra" value={formData.valorMaoDeObra} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <Label>Valor - Peças</Label>
            <Input type="number" step="0.01" name="valorPecas" value={formData.valorPecas} onChange={handleChange} />
          </FormGroup>
        </CompactFormRow>

        <CompactFormRow>
          <FormGroup>
            <Label>Valor Total</Label>
            <Input type="number" step="0.01" name="valorTotal" value={formData.valorTotal} onChange={handleChange} />
          </FormGroup>
        </CompactFormRow>

        <CompactFormRow>
          <FormGroup>
            <Label>Forma de Pagamento</Label>
            <Input name="formaPagamento" value={formData.formaPagamento} onChange={handleChange} placeholder="Ex: Dinheiro, Cartão..." />
          </FormGroup>

          <FormGroup>
            <Label>
              <input type="checkbox" name="pago" checked={!!formData.pago} onChange={handleChange} style={{ marginRight: 8 }} />
              Pago
            </Label>
          </FormGroup>
        </CompactFormRow>

        {/* Outros campos */}
        <CompactFormRow>
          <FormGroup>
            <Label>Tipo de Atendimento</Label>
            <Input name="tipoAtendimento" value={formData.tipoAtendimento} onChange={handleChange} placeholder="Loja, Externo..." />
          </FormGroup>

          <FormGroup>
            <Label>Prioridade</Label>
            <Select name="prioridade" value={formData.prioridade} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </Select>
          </FormGroup>
        </CompactFormRow>

        {/* Assinaturas (base64) */}
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
