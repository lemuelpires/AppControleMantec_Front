// src/components/Formularios/FormularioEstoque.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const FormularioEstoque = ({ initialValues = {}, onSubmit, onClose }) => {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        name="produtoID"
        value={values.produtoID || ''}
        onChange={handleChange}
        placeholder="Produto ID"
      />
      <Input
        name="quantidade"
        type="number"
        value={values.quantidade || ''}
        onChange={handleChange}
        placeholder="Quantidade"
      />
      <Button type="submit">Salvar</Button>
    </Form>
  );
};

export default FormularioEstoque;
