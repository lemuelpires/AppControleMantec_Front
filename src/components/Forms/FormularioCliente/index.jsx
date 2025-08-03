// src/components/Forms/FormularioCliente/index.jsx
import React, { useState, useEffect } from 'react';
import { Campo, Input, Botoes } from './style';

const FormularioCliente = ({ initialValues = {}, onSubmit, onClose }) => {
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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Campo>
        <label>Nome Completo:</label>
        <Input
          type="text"
          name="nome"
          value={formValues.nome || ''}
          onChange={handleChange}
          required
        />
      </Campo>
      <Campo>
        <label>Endereço:</label>
        <Input
          type="text"
          name="endereco"
          value={formValues.endereco || ''}
          onChange={handleChange}
          required
        />
      </Campo>
      <Campo>
        <label>Telefone:</label>
        <Input
          type="text"
          name="telefone"
          value={formValues.telefone || ''}
          onChange={handleChange}
          required
        />
      </Campo>
      <Campo>
        <label>E-mail:</label>
        <Input
          type="email"
          name="email"
          value={formValues.email || ''}
          onChange={handleChange}
          required
        />
      </Campo>
      <Botoes>
          <button style={{ backgroundColor: '#016b19ff', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }} type="submit">Salvar</button>
          <button style={{ backgroundColor: '#6d0b02ff', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="button" onClick={onClose}>Cancelar</button>
      </Botoes>
     
    </form>
  );
};

export default FormularioCliente;
