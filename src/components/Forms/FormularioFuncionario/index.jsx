import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, EspacamentoButton } from './style';

const FormularioFuncionario = ({ initialValues, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({ ...initialValues, ativo: true });

  useEffect(() => {
    setFormData({ ...initialValues, ativo: true });
  }, [initialValues]);

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
        <Input type="text" id="nome" name="nome" value={formData.nome || ''} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="cargo">Cargo</Label>
        <Input type="text" id="cargo" name="cargo" value={formData.cargo || ''} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="telefone">Telefone</Label>
        <Input type="text" id="telefone" name="telefone" value={formData.telefone || ''} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" value={formData.email || ''} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="dataContratacao">Data de Contratação</Label>
        <Input type="date" id="dataContratacao" name="dataContratacao" value={formData.dataContratacao || ''} onChange={handleChange} required />
      </FormGroup>
      <EspacamentoButton>
        <Button style={{ backgroundColor: '#0f9d58', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="submit">Salvar</Button>
        <Button style={{ backgroundColor: '#e53935', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="button" onClick={onClose}>Cancelar</Button>
      </EspacamentoButton>
    </Form>
  );
};

export default FormularioFuncionario;
