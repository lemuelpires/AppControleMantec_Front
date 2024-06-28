// src/components/Formularios/FormularioOrdemDeServico.js
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

const Select = styled.select`
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

const FormularioOrdemDeServico = ({ initialValues = {}, onSubmit, onClose }) => {
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
        name="clienteID"
        value={values.clienteID || ''}
        onChange={handleChange}
        placeholder="Cliente ID"
      />
      <Input
        name="funcionarioID"
        value={values.funcionarioID || ''}
        onChange={handleChange}
        placeholder="Funcionário ID"
      />
      <Input
        name="produtoID"
        value={values.produtoID || ''}
        onChange={handleChange}
        placeholder="Produto ID"
      />
      <Input
        name="servicoID"
        value={values.servicoID || ''}
        onChange={handleChange}
        placeholder="Serviço ID"
      />
      <Input
        name="dataEntrada"
        type="date"
        value={values.dataEntrada || ''}
        onChange={handleChange}
      />
      <Input
        name="dataConclusao"
        type="date"
        value={values.dataConclusao || ''}
        onChange={handleChange}
      />
      <Select
        name="status"
        value={values.status || ''}
        onChange={handleChange}
      >
        <option value="">Selecione o status</option>
        <option value="Em andamento">Em andamento</option>
        <option value="Concluída">Concluída</option>
        <option value="Cancelada">Cancelada</option>
      </Select>
      <Input
        name="observacoes"
        value={values.observacoes || ''}
        onChange={handleChange}
        placeholder="Observações"
      />
      <Button type="submit">Salvar</Button>
    </Form>
  );
};

export default FormularioOrdemDeServico;
