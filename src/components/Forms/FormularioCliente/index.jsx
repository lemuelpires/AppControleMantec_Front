import React, { useState, useEffect } from 'react';

const FormularioCliente = ({ onSubmit, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    email: '',
    ...initialData
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input name="nome" value={formData.nome} onChange={handleChange} />
      </div>
      <div>
        <label>Endereço:</label>
        <input name="endereco" value={formData.endereco} onChange={handleChange} />
      </div>
      <div>
        <label>Telefone:</label>
        <input name="telefone" value={formData.telefone} onChange={handleChange} />
      </div>
      <div>
        <label>E-mail:</label>
        <input name="email" value={formData.email} onChange={handleChange} />
      </div>
      <button type="submit">Salvar</button>
      <button type="button" onClick={onClose}>Cancelar</button>
    </form>
  );
};

export default FormularioCliente;
