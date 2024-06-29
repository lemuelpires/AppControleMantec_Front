import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from './style';

const FormularioEstoque = ({ initialValues, onSubmit, onClose }) => {
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
        <Label htmlFor="produtoID">Produto ID</Label>
        <Input type="text" id="produtoID" name="produtoID" value={formData.produtoID} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="quantidade">Quantidade</Label>
        <Input type="number" id="quantidade" name="quantidade" value={formData.quantidade} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="dataAtualizacao">Data de Atualização</Label>
        <Input type="date" id="dataAtualizacao" name="dataAtualizacao" value={formData.dataAtualizacao} onChange={handleChange} required />
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

export default FormularioEstoque;
