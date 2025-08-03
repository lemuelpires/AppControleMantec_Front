import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import { FormGroup, Label, Button } from './style';
import FormularioEstoque from '../../../Forms/FormularioEstoque';
import apiCliente from '../../../../services/apiCliente'; // Importe a API correta para manipulação de Estoque

// Estilos do modal
const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#1f1e1e',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
    inset: 'unset',
  },
};

const ModalNovoEstoque = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    produtoID: '',
    quantidade: 0,
    dataAtualizacao: new Date().toISOString().substr(0, 10), // Inicializar com a data atual no formato YYYY-MM-DD
    ativo: true,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [produtoOptions, setProdutoOptions] = useState([]);

  useEffect(() => {
    fetchProdutos(); // Buscar produtos disponíveis para seleção
  }, []);

  const fetchProdutos = async () => {
    try {
      // Requisição para obter lista de produtos disponíveis
      const response = await apiCliente.get('/Produto'); // Ajustar para a rota correta que lista produtos
      const produtos = response.data.map((produto) => ({
        value: produto.id, // Atributo que representa o ID do produto
        label: produto.nome, // Atributo que representa o nome do produto
      }));
      setProdutoOptions(produtos); // Atualizar opções disponíveis no Select
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleSelectProduct = (selectedOption) => {
    setSelectedProduct(selectedOption);
    if (selectedOption) {
      setFormData((prevData) => ({
        ...prevData,
        produtoID: selectedOption.value, // Atualizar ID do produto selecionado no formulário
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const formattedData = {
        ...formData,
        dataAtualizacao: new Date(formData.dataAtualizacao).toISOString().substr(0, 10),
      };
      // Enviar requisição POST para criar novo item de estoque
      await onSubmit(formattedData);
      alert('Novo item de inventário criado com sucesso!');
      onClose(); // Fechar modal após salvar
    } catch (error) {
      console.error('Erro ao criar item de estoque:', error);
      if (error.response && error.response.data) {
        alert(`Erro: ${error.response.data}`);
      } else {
        alert('Erro ao criar item de estoque.');
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <h2>Novo Item de Estoque</h2>
      <FormGroup>
        <Label>Produto</Label>
        <Select
          value={selectedProduct}
          onChange={handleSelectProduct}
          options={produtoOptions}
          placeholder="Selecione um produto"
        />
      </FormGroup>
      <FormularioEstoque formData={formData} setFormData={setFormData} />
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <Button style={{ backgroundColor: '#016b19ff', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="submit">Salvar</Button>
        <Button style={{ backgroundColor: '#6d0b02ff', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="button" onClick={onClose}>Cancelar</Button>       
      </div>
    </Modal>
  );
};

export default ModalNovoEstoque;
