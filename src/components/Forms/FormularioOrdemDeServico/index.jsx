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
    produtoID: '',
    servicoID: '',
    dataEntrada: '',
    dataConclusao: '',
    status: '',
    observacoes: '',
    ...initialValues,
  });

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const observacoes = `${formData.observacoes || ''}`;
    onSubmit({ ...formData, observacoes, ativo: true });
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '2px solid rgba(108, 117, 125, 0.2)',
      borderRadius: '6px',
      minHeight: '34px',
      fontSize: '0.75rem',
      fontWeight: '500',
      color: '#2c3e50',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxSizing: 'border-box',
      borderColor: state.isFocused ? '#007bff' : 'rgba(108, 117, 125, 0.2)',
      boxShadow: state.isFocused 
        ? '0 0 0 3px rgba(0, 123, 255, 0.1), 0 4px 12px rgba(0, 123, 255, 0.15)' 
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
      fontSize: '0.75rem',
      fontWeight: '500',
      padding: '6px 10px',
      '&:hover': {
        backgroundColor: 'rgba(0, 123, 255, 0.1)'
      }
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 10000,
      borderRadius: '6px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 12px 25px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05)'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#2c3e50',
      fontSize: '0.75rem',
      fontWeight: '500'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#6c757d',
      fontSize: '0.7rem',
      fontWeight: '400'
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: '#6c757d',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none',
      transition: 'transform 0.2s ease',
      padding: '4px'
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0 6px'
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '34px'
    })
  };

  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>
      <Form onSubmit={handleFormSubmit}>
        <FormRow>
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
        </FormRow>

        <FormRow>
          <FormGroup delay="0.3s">
            <Label>Produto</Label>
            <ReactSelect
              name="produtoID"
              options={produtoOptions}
              value={produtoOptions.find(option => option.value === formData.produtoID)}
              onChange={(selectedOption) => handleSelectChange(selectedOption, 'produtoID')}
              placeholder="Selecione um produto"
              styles={customSelectStyles}
              isSearchable
            />
          </FormGroup>

          <FormGroup delay="0.4s">
            <Label>Serviço</Label>
            <ReactSelect
              name="servicoID"
              options={servicoOptions}
              value={servicoOptions.find(option => option.value === formData.servicoID)}
              onChange={(selectedOption) => handleSelectChange(selectedOption, 'servicoID')}
              placeholder="Selecione um serviço"
              styles={customSelectStyles}
              isSearchable
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup delay="0.5s">
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

          <FormGroup delay="0.6s">
            <Label>Data de Entrada</Label>
            <Input
              type="date"
              name="dataEntrada"
              value={formData.dataEntrada || ''}
              onChange={handleChange}
            />
          </FormGroup>
        </FormRow>

        <FormGroup delay="0.7s">
          <Label>Data de Conclusão</Label>
          <Input
            type="date"
            name="dataConclusao"
            value={formData.dataConclusao || ''}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup delay="0.8s">
          <Label>Diagnóstico e Serviço a ser Executado</Label>
          <TextArea
            name="observacoes"
            placeholder="Descreva o diagnóstico e os serviços que serão executados..."
            value={formData.observacoes || ''}
            onChange={handleChange}
            rows={4}
          />
        </FormGroup>

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
