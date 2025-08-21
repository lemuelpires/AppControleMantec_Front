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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.nome) newErrors.nome = 'Informe o nome.';
    if (!formValues.telefone) newErrors.telefone = 'Informe o telefone.';
    if (!formValues.email) newErrors.email = 'Informe o e-mail.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const clienteComData = {
      ...formValues,
      dataCadastro: formValues.dataCadastro || new Date().toISOString()
    };

    onSubmit(clienteComData);
    setFormValues({});
  };

  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <Campo delay="0.1s">
            <Label>Nome Completo <span style={{color:'red'}}>*</span></Label>
            <Input
              type="text"
              name="nome"
              placeholder="Digite o nome completo do cliente"
              value={formValues.nome || ''}
              onChange={handleChange}
              required
            />
            {errors.nome && <div style={{color:'red',fontSize:'12px'}}>{errors.nome}</div>}
          </Campo>
          
          <Campo delay="0.2s">
            <Label>Telefone <span style={{color:'red'}}>*</span></Label>
            <Input
              type="tel"
              name="telefone"
              placeholder="(99) 99999-9999"
              value={formValues.telefone || ''}
              onChange={handleChange}
              required
            />
            {errors.telefone && <div style={{color:'red',fontSize:'12px'}}>{errors.telefone}</div>}
          </Campo>
        </FormRow>

        <FormRow>
          <Campo delay="0.3s">
            <Label>Email <span style={{color:'red'}}>*</span></Label>
            <Input
              type="email"
              name="email"
              placeholder="Digite o email do cliente"
              value={formValues.email || ''}
              onChange={handleChange}
              required
            />
            {errors.email && <div style={{color:'red',fontSize:'12px'}}>{errors.email}</div>}
          </Campo>

          <Campo delay="0.4s">
            <Label>Data de Cadastro</Label>
            <Input
              type="text"
              name="dataCadastro"
              value={
                formValues.dataCadastro
                  ? new Date(formValues.dataCadastro).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })
                  : new Date().toLocaleDateString('pt-BR')
              }
              readOnly
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
