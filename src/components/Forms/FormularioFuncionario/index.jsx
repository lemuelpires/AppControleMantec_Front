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

  useEffect(() => {
    // Atualiza os valores do formulário quando initialValues mudar
    setFormValues(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formValues, ativo: true });
    setFormValues({}); // Limpa o formulário após enviar
  };

  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup delay="0.1s">
            <Label>Nome Completo</Label>
            <Input
              type="text"
              name="nome"
              placeholder="Digite o nome completo do funcionário"
              value={formValues.nome || ''}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup delay="0.2s">
            <Label>Cargo</Label>
            <Input
              type="text"
              name="cargo"
              placeholder="Digite o cargo do funcionário"
              value={formValues.cargo || ''}
              onChange={handleChange}
              required
            />
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
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Digite o email do funcionário"
              value={formValues.email || ''}
              onChange={handleChange}
              required
            />
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
