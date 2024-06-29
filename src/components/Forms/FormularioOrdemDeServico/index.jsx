import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from './style';

const FormularioOrdemDeServico = ({ initialValues, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="id">ID</Label>
        <Input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="clienteID">Cliente ID</Label>
        <Input type="text" id="clienteID" name="clienteID" value={formData.clienteID} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="funcionarioID">Funcionário ID</Label>
        <Input type="text" id="funcionarioID" name="funcionarioID" value={formData.funcionarioID} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="produtoID">Produto ID</Label>
        <Input type="text" id="produtoID" name="produtoID" value={formData.produtoID} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="servicoID">Serviço ID</Label>
        <Input type="text" id="servicoID" name="servicoID" value={formData.servicoID} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="dataEntrada">Data de Entrada</Label>
        <Input type="date" id="dataEntrada" name="dataEntrada" value={formData.dataEntrada} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="dataConclusao">Data de Conclusão</Label>
        <Input type="date" id="dataConclusao" name="dataConclusao" value={formData.dataConclusao} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="status">Status</Label>
        <Input type="text" id="status" name="status" value={formData.status} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="observacoes">Observações</Label>
        <Input type="text" id="observacoes" name="observacoes" value={formData.observacoes} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="ativo">Ativo</Label>
        <Input type="checkbox" id="ativo" name="ativo" checked={formData.ativo} onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })} />
      </FormGroup>
      <Button type="submit">Salvar</Button>
      <Button type="button" onClick={onClose}>Cancelar</Button>
    </Form>
  );
};

export default FormularioOrdemDeServico;
