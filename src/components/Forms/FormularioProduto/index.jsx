import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from './style';

const FormularioProduto = ({ initialValues, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({ ...initialValues });

  useEffect(() => {
    // Atualiza o estado do formulário quando initialValues mudar
    setFormData({ ...initialValues });
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, ativo: true }); // Garante que 'ativo' seja sempre 'true' ao enviar o formulário
  };

  if (!initialValues) return null; // Adiciona um fallback para evitar renderização sem initialValues

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="imagemURL">URL da Imagem</Label>
        <Input type="text" id="imagemURL" name="imagemURL" value={formData.imagemURL || ''} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="nome">Nome</Label>
        <Input type="text" id="nome" name="nome" value={formData.nome || ''} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="descricao">Descrição</Label>
        <Input type="text" id="descricao" name="descricao" value={formData.descricao || ''} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="quantidade">Quantidade</Label>
        <Input type="number" id="quantidade" name="quantidade" value={formData.quantidade || ''} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="preco">Preço</Label>
        <Input type="number" id="preco" name="preco" value={formData.preco || ''} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="fornecedor">Fornecedor</Label>
        <Input type="text" id="fornecedor" name="fornecedor" value={formData.fornecedor || ''} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="dataEntrada">Data de Entrada</Label>
        <Input type="date" id="dataEntrada" name="dataEntrada" value={formData.dataEntrada || ''} onChange={handleChange} required />
      </FormGroup>
      <Button type="submit">Salvar</Button>
      <Button type="button" onClick={onClose}>Cancelar</Button>
    </Form>
  );
};

export default FormularioProduto;
