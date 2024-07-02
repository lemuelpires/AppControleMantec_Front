import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from './style';

const FormularioServico = ({ initialValues, onSubmit, onClose }) => {
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
        <Label htmlFor="nome">Nome</Label>
        <Input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="descricao">Descrição</Label>
        <Input type="text" id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="preco">Preço</Label>
        <Input type="number" id="preco" name="preco" value={formData.preco} onChange={handleChange} required />
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

export default FormularioServico;
