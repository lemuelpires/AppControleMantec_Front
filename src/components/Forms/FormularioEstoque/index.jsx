import React, { useState, useEffect } from 'react';
import { FormContainer, FormTitle, Form, FormRow, FormGroup, Label, Input, Button, EspacamentoButton, SelectContainer, SelectInput, SelectDropdown, SelectOption } from './style';

const FormularioEstoque = ({ title = "Estoque", initialValues, onSubmit, onClose, produtos = [] }) => {
  const [formValues, setFormValues] = useState({
    produtoID: '',
    quantidade: '',
    dataAtualizacao: '',
    ...initialValues
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState('');
  const [errors, setErrors] = useState({});

  // Filtrar produtos baseado no termo de busca
  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Atualiza o estado do formulário quando initialValues mudar
    setFormValues({
      produtoID: '',
      quantidade: '',
      dataAtualizacao: '',
      ...initialValues
    });
    
    // Define o nome do produto selecionado se já existe um ID
    if (initialValues?.produtoID) {
      const produto = produtos.find(p => p.id === initialValues.produtoID);
      setSelectedProductName(produto?.nome || '');
      setSearchTerm(produto?.nome || '');
    }
  }, [initialValues, produtos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsDropdownOpen(true);
    
    // Se limpar o campo, limpar também a seleção
    if (value === '') {
      setFormValues({ ...formValues, produtoID: '' });
      setSelectedProductName('');
    }
  };

  const handleProductSelect = (produto) => {
    setFormValues({ ...formValues, produtoID: produto.id });
    setSelectedProductName(produto.nome);
    setSearchTerm(produto.nome);
    setIsDropdownOpen(false);
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleInputBlur = () => {
    // Delay para permitir o click nas opções
    setTimeout(() => setIsDropdownOpen(false), 200);
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.produtoID) newErrors.produtoID = 'Selecione o produto.';
    if (!formValues.quantidade || formValues.quantidade <= 0) newErrors.quantidade = 'Informe a quantidade.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Formatar a data para ISO string se necessário
    const dataFormatada = formValues.dataAtualizacao ? 
      new Date(formValues.dataAtualizacao).toISOString() : 
      new Date().toISOString();
    
    if (!validate()) return;
    
    onSubmit({ 
      ...formValues, 
      dataAtualizacao: dataFormatada,
      ativo: true 
    });
  };

  if (!initialValues) return null;

  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup delay="0.1s">
          <Label htmlFor="produtoID">Produto <span style={{color:'red'}}>*</span></Label>
          <SelectContainer>
            <SelectInput
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Digite para buscar um produto..."
              autoComplete="off"
            />
            {isDropdownOpen && (
              <SelectDropdown>
                {filteredProdutos.length > 0 ? (
                  filteredProdutos.map((produto) => (
                    <SelectOption
                      key={produto.id}
                      onClick={() => handleProductSelect(produto)}
                    >
                      {produto.nome}
                    </SelectOption>
                  ))
                ) : (
                  <SelectOption>Nenhum produto encontrado</SelectOption>
                )}
              </SelectDropdown>
            )}
          </SelectContainer>
          {errors.produtoID && <div style={{color:'red',fontSize:'12px'}}>{errors.produtoID}</div>}
        </FormGroup>
        
        <FormRow>
          <FormGroup delay="0.2s">
            <Label htmlFor="quantidade">Quantidade <span style={{color:'red'}}>*</span></Label>
            <Input 
              type="number" 
              id="quantidade" 
              name="quantidade" 
              value={formValues.quantidade || ''} 
              onChange={handleChange} 
              placeholder="Ex: 10"
              min="0"
              required 
            />
            {errors.quantidade && <div style={{color:'red',fontSize:'12px'}}>{errors.quantidade}</div>}
          </FormGroup>
          <FormGroup delay="0.3s">
            <Label htmlFor="dataAtualizacao">Data de Atualização</Label>
            <Input 
              type="datetime-local" 
              id="dataAtualizacao" 
              name="dataAtualizacao" 
              value={formValues.dataAtualizacao ? 
                new Date(formValues.dataAtualizacao).toISOString().slice(0, 16) : ''} 
              onChange={handleChange} 
              required 
            />
          </FormGroup>
        </FormRow>
        
        <EspacamentoButton>
          <Button className="save" type="submit">Salvar</Button>
          <Button className="cancel" type="button" onClick={onClose}>Cancelar</Button>
        </EspacamentoButton>
      </Form>
    </FormContainer>
  );
};

export default FormularioEstoque;
