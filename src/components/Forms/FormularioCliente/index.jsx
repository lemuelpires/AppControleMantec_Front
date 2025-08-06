// src/components/Forms/FormularioCliente/index.jsx
import React, { useState, useEffect } from 'react';
import { 
  FormContainer, 
  FormTitle, 
  Form,
  FormRow,
  Campo, 
  Label,
  Input, 
  Button, 
  EspacamentoBotoes 
} from './style';

const FormularioCliente = ({ initialValues = {}, onSubmit, onClose, title = "Dados do Cliente" }) => {
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
    onSubmit(formValues);
    setFormValues({}); // Limpa o formulário após enviar
  };

  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <Campo delay="0.1s">
            <Label>Nome Completo</Label>
            <Input
              type="text"
              name="nome"
              placeholder="Digite o nome completo do cliente"
              value={formValues.nome || ''}
              onChange={handleChange}
              required
            />
          </Campo>
          
          <Campo delay="0.2s">
            <Label>Telefone</Label>
            <Input
              type="tel"
              name="telefone"
              placeholder="(99) 99999-9999"
              value={formValues.telefone || ''}
              onChange={handleChange}
              required
            />
          </Campo>
        </FormRow>

        <FormRow>
          <Campo delay="0.3s">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Digite o email do cliente"
              value={formValues.email || ''}
              onChange={handleChange}
              required
            />
          </Campo>

          <Campo delay="0.4s">
            <Label>CPF</Label>
            <Input
              type="text"
              name="cpf"
              placeholder="000.000.000-00"
              value={formValues.cpf || ''}
              onChange={handleChange}
              required
            />
          </Campo>
        </FormRow>

        <Campo delay="0.5s">
          <Label>Endereço</Label>
          <Input
            type="text"
            name="endereco"
            placeholder="Digite o endereço completo"
            value={formValues.endereco || ''}
            onChange={handleChange}
            required
          />
        </Campo>

        <EspacamentoBotoes>
          <Button type="submit" className="save">
            Salvar
          </Button>
          <Button type="button" className="cancel" onClick={onClose}>
            Cancelar
          </Button>
        </EspacamentoBotoes>
      </Form>
    </FormContainer>
  );
};

export default FormularioCliente;
