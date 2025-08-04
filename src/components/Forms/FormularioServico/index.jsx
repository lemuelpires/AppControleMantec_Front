import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, EspacamentoButton } from './style';

const FormularioServico = ({ initialValues, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({ ...initialValues });

  useEffect(() => {
    // Atualiza o estado do formulário quando initialValues mudar
    setFormData({ ...initialValues });
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, ativo: true });
  };

  if (!initialValues) return null;

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
      <EspacamentoButton>
        <Button style={{ backgroundColor: '#0f9d58', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="submit">Salvar</Button>
        <Button style={{ backgroundColor: '#e53935', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="button" onClick={onClose}>Cancelar</Button>
      </EspacamentoButton>
    </Form>
  );
};

export default FormularioServico;
