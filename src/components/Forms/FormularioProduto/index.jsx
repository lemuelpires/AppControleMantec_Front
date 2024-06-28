// src/components/Formularios/FormularioProduto.js
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

const FormularioProduto = ({ initialValues = {}, onSubmit, onClose }) => {
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
        name="id"
        value={values.id || ''}
        onChange={handleChange}
        placeholder="ID"
        readOnly={Boolean(initialValues.id)}
      />
      <Input
        name="nome"
        value={values.nome || ''}
        onChange={handleChange}
        placeholder="Nome"
      />
      <Input
        name="descricao"
        value={values.descricao || ''}
        onChange={handleChange}
        placeholder="Descrição"
      />
      <Input
        name="quantidade"
        type="number"
        value={values.quantidade || ''}
        onChange={handleChange}
        placeholder="Quantidade"
      />
      <Input
        name="preco"
        type="number"
        step="0.01"
        value={values.preco || ''}
        onChange={handleChange}
        placeholder="Preço"
      />
      <Input
        name="fornecedor"
        value={values.fornecedor || ''}
        onChange={handleChange}
        placeholder="Fornecedor"
      />
      <Input
        name="dataEntrada"
        type="date"
        value={values.dataEntrada || ''}
        onChange={handleChange}
      />
      <Input
        name="imagemURL"
        value={values.imagemURL || ''}
        onChange={handleChange}
        placeholder="URL da Imagem"
      />
      <Button type="submit">Salvar</Button>
    </Form>
  );
};

export default FormularioProduto;
