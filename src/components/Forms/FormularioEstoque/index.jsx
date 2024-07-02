import React from 'react';
import { FormGroup, Label, Input } from './style';

const FormularioEstoque = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <FormGroup>
        <Label>Quantidade</Label>
        <Input
          type="number"
          name="quantidade"
          value={formData.quantidade}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Data de Atualização</Label>
        <Input
          type="date"
          name="dataAtualizacao"
          value={formData.dataAtualizacao}
          onChange={handleChange}
        />
      </FormGroup>
    </>
  );
};

export default FormularioEstoque;
