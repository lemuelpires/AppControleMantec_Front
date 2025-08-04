import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input, Button, Espacamento, Form, Container, EspacamentoButton, EspacamentoContainer } from './style';
import Select from 'react-select';
import { height } from '@fortawesome/free-solid-svg-icons/fa0';

const FormularioOrdemDeServico = ({
  initialValues,
  onSubmit,
  onClose,
  clienteOptions,
  funcionarioOptions,
  produtoOptions,
  servicoOptions,
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
      backgroundColor: 'white',
      borderColor: state.isFocused ? '#016b19' : '#ccc',
      boxShadow: state.isFocused ? '0 0 0 1px #016b19' : 'none',
      height: '28px',         // Altura do select
      minHeight: '28px',
      fontSize: '12px',
      backgroundColor: '#414040ff',
      color: '#d9d9d9',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#e5f4ea' : 'white',
      color: 'black',
      fontSize: '12px',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 10,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#d9d9d9',
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: '#d9d9d9',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
      transition: 'transform 0.2s ease',
      padding: '0px',
    }),
  };

  return (
    <Container>
      <Form onSubmit={handleFormSubmit}>
        <EspacamentoContainer>
          <Espacamento>
            <FormGroup>
              <Label htmlFor="clienteID">Cliente</Label>
              <Select
                id="clienteID"
                name="clienteID"
                options={clienteOptions}
                value={clienteOptions.find(option => option.value === formData.clienteID)}
                onChange={(selectedOption) => handleSelectChange(selectedOption, 'clienteID')}
                placeholder="Selecione um cliente"
                styles={customSelectStyles}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="funcionarioID">Funcionário</Label>
              <Select
                id="funcionarioID"
                name="funcionarioID"
                style={{ height: '6px', width: '100%' }}
                options={funcionarioOptions}
                value={funcionarioOptions.find(option => option.value === formData.funcionarioID)}
                onChange={(selectedOption) => handleSelectChange(selectedOption, 'funcionarioID')}
                placeholder="Selecione um funcionário"
                styles={customSelectStyles}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="produtoID">Produto</Label>
              <Select
                id="produtoID"
                name="produtoID"
                options={produtoOptions}
                value={produtoOptions.find(option => option.value === formData.produtoID)}
                onChange={(selectedOption) => handleSelectChange(selectedOption, 'produtoID')}
                placeholder="Selecione um produto"
                styles={customSelectStyles}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="servicoID">Serviço</Label>
              <Select
                id="servicoID"
                name="servicoID"
                options={servicoOptions}
                value={servicoOptions.find(option => option.value === formData.servicoID)}
                onChange={(selectedOption) => handleSelectChange(selectedOption, 'servicoID')}
                placeholder="Selecione um serviço"
                styles={customSelectStyles}
              />
            </FormGroup>
          </Espacamento>
          <Espacamento>
            <FormGroup>
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
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
            <FormGroup>
              <Label htmlFor="observacoes">Diagnóstico e serviço a ser executado</Label>
              <Input
                type="text"
                id="observacoes"
                name="observacoes"
                value={formData.observacoes || ''}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="dataEntrada">Data de Entrada</Label>
              <Input
                type="date"
                id="dataEntrada"
                name="dataEntrada"
                value={formData.dataEntrada || ''}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="dataConclusao">Data de Conclusão</Label>
              <Input
                type="date"
                id="dataConclusao"
                name="dataConclusao"
                value={formData.dataConclusao || ''}
                onChange={handleChange}
              />
            </FormGroup>
          </Espacamento>
        </EspacamentoContainer>
        <EspacamentoButton>
          <Button style={{ backgroundColor: '#0f9d58', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }} type="submit">Salvar</Button>
          <Button style={{ backgroundColor: '#e53935', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="button" onClick={onClose}>Cancelar</Button>
        </EspacamentoButton>
      </Form>
    </Container>
  );
};

export default FormularioOrdemDeServico;
