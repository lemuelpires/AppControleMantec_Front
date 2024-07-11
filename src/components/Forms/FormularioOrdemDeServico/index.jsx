import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input, Button, Espacamento, Form, Container, EspacamentoButton, EspacamentoContainer } from './style';
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
  // Garantir que todos os campos tenham valores iniciais válidos
  const [formData, setFormData] = useState({
    clienteID: '',
    funcionarioID: '',
    produtoID: '',
    servicoID: '',
    dataEntrada: '',
    dataConclusao: '',
    status: '',
    informacaoProduto: '',
    problemaAparente: '',
    diagnosticoServico: '',
    garantia: '',
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
    const observacoes = `
      Informação do Produto: ${formData.informacaoProduto}
      Problema aparente: ${formData.problemaAparente}
      Diagnóstico e serviço a ser executado: ${formData.diagnosticoServico}
      Garantia: ${formData.garantia}
    `;
    onSubmit({ ...formData, observacoes, ativo: true });
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
          <Espacamento>
            <FormGroup>
              <Label htmlFor="status">Status</Label>
              <Input
                type="text"
                id="status"
                name="status"
                value={formData.status || ''}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="informacaoProduto">Informação do Produto</Label>
              <Input
                type="text"
                id="informacaoProduto"
                name="informacaoProduto"
                value={formData.informacaoProduto || ''}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="problemaAparente">Problema Aparente</Label>
              <Input
                type="text"
                id="problemaAparente"
                name="problemaAparente"
                value={formData.problemaAparente || ''}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="diagnosticoServico">Diagnóstico e serviço a ser executado</Label>
              <Input
                type="text"
                id="diagnosticoServico"
                name="diagnosticoServico"
                value={formData.diagnosticoServico || ''}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="garantia">Garantia</Label>
              <Input
                type="text"
                id="garantia"
                name="garantia"
                value={formData.garantia || ''}
                onChange={handleChange}
              />
            </FormGroup>
          </Espacamento>
        </EspacamentoContainer>
        <EspacamentoButton>
          <button type="submit">Salvar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </EspacamentoButton>
      </Form>
    </Container>
  );
};

export default FormularioOrdemDeServico;
