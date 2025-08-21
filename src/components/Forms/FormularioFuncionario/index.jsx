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
  EspacamentoButton 
} from './style';

const FormularioFuncionario = ({ initialValues = {}, onSubmit, onClose, title = "Dados do Funcionário" }) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Atualiza os valores do formulário quando initialValues mudar
    setFormValues(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.nome) newErrors.nome = 'Informe o nome.';
    if (!formValues.cargo) newErrors.cargo = 'Informe o cargo.';
    if (!formValues.email) newErrors.email = 'Informe o e-mail.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...formValues, ativo: true });
    setFormValues({}); // Limpa o formulário após enviar
  };

  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup delay="0.1s">
            <Label>Nome <span style={{color:'red'}}>*</span></Label>
            <Input
              type="text"
              name="nome"
              placeholder="Digite o nome completo do funcionário"
              value={formValues.nome || ''}
              onChange={handleChange}
              required
            />
            {errors.nome && <div style={{color:'red',fontSize:'12px'}}>{errors.nome}</div>}
          </FormGroup>
          
          <FormGroup delay="0.2s">
            <Label>Cargo <span style={{color:'red'}}>*</span></Label>
            <Input
              type="text"
              name="cargo"
              placeholder="Digite o cargo do funcionário"
              value={formValues.cargo || ''}
              onChange={handleChange}
              required
            />
            {errors.cargo && <div style={{color:'red',fontSize:'12px'}}>{errors.cargo}</div>}
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup delay="0.3s">
            <Label>Telefone</Label>
            <Input
              type="tel"
              name="telefone"
              placeholder="(99) 99999-9999"
              value={formValues.telefone || ''}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup delay="0.4s">
            <Label>Email <span style={{color:'red'}}>*</span></Label>
            <Input
              type="email"
              name="email"
              placeholder="Digite o email do funcionário"
              value={formValues.email || ''}
              onChange={handleChange}
              required
            />
            {errors.email && <div style={{color:'red',fontSize:'12px'}}>{errors.email}</div>}
          </FormGroup>
        </FormRow>

        <FormGroup delay="0.5s">
          <Label>Data de Contratação</Label>
          <Input
            type="date"
            name="dataContratacao"
            value={formValues.dataContratacao || ''}
            onChange={handleChange}
            required
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

export default FormularioFuncionario;
