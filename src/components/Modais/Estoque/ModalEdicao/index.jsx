import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import { FormGroup, Label, Button, EspacamentoButton } from './style';
import FormularioEstoque from '../../../Forms/FormularioEstoque';
import apiCliente from '../../../../services/apiCliente'; // Import correct API for Inventory manipulation

// Modal styles
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

const ModalEdicaoEstoque = ({ isOpen, onClose, item, fetchItensEstoque }) => {
  const [formData, setFormData] = useState({
    id: '',
    produtoID: '',
    quantidade: 0,
    dataAtualizacao: new Date().toISOString().substr(0, 10), // Initialize with current date in YYYY-MM-DD format
    ativo: true,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [produtoOptions, setProdutoOptions] = useState([]);

  useEffect(() => {
    if (item) {
      // Fill form data with current inventory item details
      setFormData({
        id: item.id,
        produtoID: item.produtoID,
        quantidade: item.quantidade,
        dataAtualizacao: item.dataAtualizacao.substr(0, 10), // Format YYYY-MM-DD
        ativo: item.ativo,
      });
      setSelectedProduct({
        value: item.produtoID,
        label: item.produtoID, // Set product name to display in Select
      });
    }
    fetchProdutos(); // Fetch available products for selection
  }, [item]);

  const fetchProdutos = async () => {
    try {
      // Request to get list of available products
      const response = await apiCliente.get('/Produto'); // Adjust to correct route that lists products
      const produtos = response.data.map((produto) => ({
        value: produto.id, // Attribute representing product ID
        label: produto.nome, // Attribute representing product name
      }));
      setProdutoOptions(produtos); // Update available options in Select
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSelectProduct = (selectedOption) => {
    setSelectedProduct(selectedOption);
    if (selectedOption) {
      setFormData((prevData) => ({
        ...prevData,
        produtoID: selectedOption.value, // Update selected product ID in form
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const formattedData = {
        ...formData,
        dataAtualizacao: new Date(formData.dataAtualizacao).toISOString().substr(0, 10),
      };
      // Send PUT request to update inventory item
      const response = await apiCliente.put(`/estoque/${item.id}`, formattedData);
      alert('Item de inventario atualizado com sucesso!');
      fetchItensEstoque(); // Update inventory items list after saving
      onClose(); // Close modal after saving
    } catch (error) {
      console.log('formData:', formData);
      console.error('Error updating inventory item:', error);
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data}`);
      } else {
        alert('Error updating inventory item.');
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <h2>Edit Item no estoque</h2>
      <FormGroup>
        <Label>Produto</Label>
        <Select
          value={selectedProduct}
          onChange={handleSelectProduct}
          options={produtoOptions}
          placeholder="Select a product"
        />
      </FormGroup>
      <FormularioEstoque formData={formData} setFormData={setFormData} />
      <EspacamentoButton>
        <Button style={{ backgroundColor: '#0f9d58', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="submit">Salvar</Button>
        <Button style={{ backgroundColor: '#e53935', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="button" onClick={onClose}>Cancelar</Button>
      </EspacamentoButton>
    </Modal>
  );
};

export default ModalEdicaoEstoque;
