import React, { useState, useEffect } from 'react';
import { FormContainer, FormTitle, Form, FormRow, FormGroup, Label, Input, Button, EspacamentoButton } from './style';

const FormularioServico = ({ title = "Serviço", initialValues, onSubmit, onClose }) => {
  const [formValues, setFormValues] = useState({
    nome: '',
    descricao: '',
    preco: '',
    ...initialValues
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Atualiza o estado do formulário quando initialValues mudar
    setFormValues({
      nome: '',
      descricao: '',
      preco: '',
      ...initialValues
    });
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.nome) newErrors.nome = 'Informe o nome.';
    if (!formValues.preco) newErrors.preco = 'Informe o preço.';
    if (!formValues.descricao) newErrors.descricao = 'Informe a descrição.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...formValues, ativo: true });
  };

  if (!initialValues) return null;

  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup delay="0.1s">
            <Label htmlFor="nome">Nome do Serviço <span style={{color:'red'}}>*</span></Label>
            <Input 
              type="text" 
              id="nome" 
              name="nome" 
              value={formValues.nome || ''} 
              onChange={handleChange} 
              placeholder="Ex: Troca de tela"
              required 
            />
            {errors.nome && <div style={{color:'red',fontSize:'12px'}}>{errors.nome}</div>}
          </FormGroup>
          <FormGroup delay="0.2s">
            <Label htmlFor="preco">Preço <span style={{color:'red'}}>*</span></Label>
            <Input 
              type="number" 
              id="preco" 
              name="preco" 
              value={formValues.preco || ''} 
              onChange={handleChange} 
              placeholder="Ex: 150.00"
              step="0.01"
              min="0"
              required 
            />
            {errors.preco && <div style={{color:'red',fontSize:'12px'}}>{errors.preco}</div>}
          </FormGroup>
        </FormRow>
        
        <FormGroup delay="0.3s">
          <Label htmlFor="descricao">Descrição <span style={{color:'red'}}>*</span></Label>
          <Input 
            type="text" 
            id="descricao" 
            name="descricao" 
            value={formValues.descricao || ''} 
            onChange={handleChange} 
            placeholder="Descreva o serviço oferecido"
            required 
          />
          {errors.descricao && <div style={{color:'red',fontSize:'12px'}}>{errors.descricao}</div>}
        </FormGroup>
        
        <EspacamentoButton>
          <Button className="save" type="submit">Salvar</Button>
          <Button className="cancel" type="button" onClick={onClose}>Cancelar</Button>
        </EspacamentoButton>
      </Form>
    </FormContainer>
  );
};

export default FormularioServico;
