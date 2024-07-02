import React, { useState } from 'react';
import { FormGroup, Label, Input, Button } from './style';
import Select from 'react-select';

const FormularioOrdemDeServico = ({
  initialValues,
  onSubmit,
  onClose,
  clienteOptions,
  funcionarioOptions,
  produtoOptions,
  servicoOptions,
}) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption, fieldName) => {
    setFormData({ ...formData, [fieldName]: selectedOption.value });
  };

  const handleFormSubmit = (e) => {
    console.log('formData:', formData);
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormGroup>
        <Label htmlFor="clienteID">Cliente</Label>
        <Select
          id="clienteID"
          name="clienteID"
          options={clienteOptions}
          value={clienteOptions.find(option => option.value === formData.clienteID)}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'clienteID')}
          placeholder="Selecione um cliente"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="funcionarioID">Funcionário</Label>
        <Select
          id="funcionarioID"
          name="funcionarioID"
          options={funcionarioOptions}
          value={funcionarioOptions.find(option => option.value === formData.funcionarioID)}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'funcionarioID')}
          placeholder="Selecione um funcionário"
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
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="dataEntrada">Data de Entrada</Label>
        <Input
          type="date"
          id="dataEntrada"
          name="dataEntrada"
          value={formData.dataEntrada}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="dataConclusao">Data de Conclusão</Label>
        <Input
          type="date"
          id="dataConclusao"
          name="dataConclusao"
          value={formData.dataConclusao}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="status">Status</Label>
        <Input
          type="text"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="observacoes">Observações</Label>
        <Input
          type="text"
          id="observacoes"
          name="observacoes"
          value={formData.observacoes}
          onChange={handleChange}
        />
      </FormGroup>
      <Button type="submit">Salvar</Button>
      <Button type="button" onClick={onClose}>Cancelar</Button>
    </form>
  );
};

export default FormularioOrdemDeServico;
