import React, { useState, useEffect } from 'react';
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

// Estilos adicionais para múltiplos itens
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

const AddItemButton = styled.button`
  width: 28px;
  height: 28px;
  border: 2px solid rgba(0, 123, 255, 0.4);
  border-radius: 50%;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  
  &:hover {
    border-color: #007bff;
    background: linear-gradient(135deg, #0056b3, #004085);
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 16px;
  height: 16px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #dc3545, #c82333);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  z-index: 10;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(220, 53, 69, 0.4);
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

const FormularioOrdemDeServico = ({
  initialValues,
  onSubmit,
  onClose,
  clienteOptions,
  funcionarioOptions,
  produtoOptions,
  servicoOptions,
  title = "Ordem de Serviço"
}) => {
  // Garantir que todos os campos tenham valores iniciais válidos
  const [formData, setFormData] = useState({
    clienteID: '',
    funcionarioID: '',
    produtos: [{ produtoID: '', quantidade: 1 }], // Array de produtos
    servicos: [{ servicoID: '', quantidade: 1 }], // Array de serviços
    dataEntrada: '',
    dataConclusao: '',
    status: '',
    observacoes: '',
    ...initialValues,
  });

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      produtos: initialValues?.produtos || [{ produtoID: '', quantidade: 1 }],
      servicos: initialValues?.servicos || [{ servicoID: '', quantidade: 1 }],
      ...initialValues,
    }));
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption, fieldName) => {
    setFormData({ ...formData, [fieldName]: selectedOption ? selectedOption.value : '' });
  };

  // Funções para gerenciar produtos
  const handleProdutoChange = (index, selectedOption) => {
    const newProdutos = [...formData.produtos];
    newProdutos[index].produtoID = selectedOption ? selectedOption.value : '';
    setFormData({ ...formData, produtos: newProdutos });
  };

  const handleProdutoQuantityChange = (index, value) => {
    const newProdutos = [...formData.produtos];
    newProdutos[index].quantidade = Math.max(1, parseInt(value) || 1);
    setFormData({ ...formData, produtos: newProdutos });
  };

  const addProduto = () => {
    setFormData({
      ...formData,
      produtos: [...formData.produtos, { produtoID: '', quantidade: 1 }]
    });
  };

  const removeProduto = (index) => {
    if (formData.produtos.length > 1) {
      const newProdutos = formData.produtos.filter((_, i) => i !== index);
      setFormData({ ...formData, produtos: newProdutos });
    }
  };

  // Funções para gerenciar serviços
  const handleServicoChange = (index, selectedOption) => {
    const newServicos = [...formData.servicos];
    newServicos[index].servicoID = selectedOption ? selectedOption.value : '';
    setFormData({ ...formData, servicos: newServicos });
  };

  const handleServicoQuantityChange = (index, value) => {
    const newServicos = [...formData.servicos];
    newServicos[index].quantidade = Math.max(1, parseInt(value) || 1);
    setFormData({ ...formData, servicos: newServicos });
  };

  const addServico = () => {
    setFormData({
      ...formData,
      servicos: [...formData.servicos, { servicoID: '', quantidade: 1 }]
    });
  };

  const removeServico = (index) => {
    if (formData.servicos.length > 1) {
      const newServicos = formData.servicos.filter((_, i) => i !== index);
      setFormData({ ...formData, servicos: newServicos });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const observacoes = `${formData.observacoes || ''}`;
    const finalData = { ...formData, observacoes, ativo: true };
    
    console.log('Dados do FormularioOrdemDeServico sendo submetidos:', finalData);
    console.log('Produtos:', finalData.produtos);
    console.log('Serviços:', finalData.servicos);
    
    onSubmit(finalData);
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
      transform: state.isFocused ? 'translateY(-1px)' : 'none',
      '&:hover': {
        borderColor: '#007bff'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'rgba(0, 123, 255, 0.1)' : 'white',
      color: '#2c3e50',
      fontSize: '0.7rem',
      fontWeight: '500',
      padding: '4px 8px',
      '&:hover': {
        backgroundColor: 'rgba(0, 123, 255, 0.1)'
      }
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 10000,
      borderRadius: '6px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1), 0 3px 8px rgba(0, 0, 0, 0.05)'
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
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none',
      transition: 'transform 0.2s ease',
      padding: '2px'
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0 4px'
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '28px'
    })
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
              value={clienteOptions.find(option => option.value === formData.clienteID)}
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
              value={funcionarioOptions.find(option => option.value === formData.funcionarioID)}
              onChange={(selectedOption) => handleSelectChange(selectedOption, 'funcionarioID')}
              placeholder="Selecione um funcionário"
              styles={customSelectStyles}
              isSearchable
            />
          </FormGroup>
        </CompactFormRow>

        {/* Linha 2: Produtos e Serviços */}
        <CompactFormRow className="side-by-side">
          <FormGroup delay="0.3s" style={{ width: '49%' }}>
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
                    options={produtoOptions}
                    value={produtoOptions.find(option => option.value === produto.produtoID)}
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
                    <RemoveButton 
                      type="button"
                      onClick={() => removeProduto(index)}
                      title="Remover produto"
                    >
                      ✕
                    </RemoveButton>
                  )}
                </ItemRow>
              ))}
            </ItemSection>
          </FormGroup>

          <FormGroup delay="0.4s" style={{ width: '49%' }}>
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
                    options={servicoOptions}
                    value={servicoOptions.find(option => option.value === servico.servicoID)}
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
                    <RemoveButton 
                      type="button"
                      onClick={() => removeServico(index)}
                      title="Remover serviço"
                    >
                      ✕
                    </RemoveButton>
                  )}
                </ItemRow>
              ))}
            </ItemSection>
          </FormGroup>
        </CompactFormRow>

        {/* Linha 3: Diagnóstico (largura total - ocupando os dois lados) */}
        <FormGroup delay="0.5s" style={{ width: '100%', marginBottom: '0.8rem' }}>
          <Label>Diagnóstico e Serviço a ser Executado</Label>
          <TextArea
            name="observacoes"
            placeholder="Descreva o diagnóstico e os serviços que serão executados..."
            value={formData.observacoes || ''}
            onChange={handleChange}
            rows={3}
            style={{ fontSize: '0.8rem', width: '100%', boxSizing: 'border-box' }}
          />
        </FormGroup>

        {/* Linha 4: Datas */}
        <CompactFormRow>
          <FormGroup delay="0.6s">
            <Label>Data de Entrada</Label>
            <Input
              type="date"
              name="dataEntrada"
              value={formData.dataEntrada || ''}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup delay="0.7s">
            <Label>Data de Conclusão</Label>
            <Input
              type="date"
              name="dataConclusao"
              value={formData.dataConclusao || ''}
              onChange={handleChange}
            />
          </FormGroup>
        </CompactFormRow>

        {/* Linha 5: Status */}
        <CompactFormRow>
          <FormGroup delay="0.8s">
            <Label>Status</Label>
            <ReactSelect
              name="status"
              options={[
                { value: 'Não iniciado', label: 'Não iniciado' },
                { value: 'Em andamento', label: 'Em andamento' },
                { value: 'Concluído', label: 'Concluído' },
                { value: 'Cancelado', label: 'Cancelado' },
              ]}
              value={
                formData.status
                  ? { value: formData.status, label: formData.status }
                  : null
              }
              onChange={(selectedOption) => handleSelectChange(selectedOption, 'status')}
              placeholder="Selecione o status"
              styles={customSelectStyles}
            />
          </FormGroup>
        </CompactFormRow>

        <EspacamentoButton>
          <Button type="submit" className="save">
            Salvar
          </Button>
          <Button type="button" className="cancel" onClick={onClose}>
            Cancelar
          </Button>
        </EspacamentoButton>
      </Form>
    </FormContainer>
  );
};

export default FormularioOrdemDeServico;
