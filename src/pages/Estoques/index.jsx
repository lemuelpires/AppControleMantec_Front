import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import { EstoqueContainer, EstoqueTitle, EstoqueButton, EstoqueTable, BotaoEspacamento } from './style';
import ModalDetalhesEstoque from '../../components/Modais/Estoque/ModalDetalhes';
import ModalEdicaoEstoque from '../../components/Modais/Estoque/ModalEdicao'; // Importe o componente corretamente
import ModalNovoEstoque from '../../components/Modais/Estoque/ModalNovo';
import apiEstoque from '../../services/apiCliente'; // Importe a API correta para manipulação de Estoque

// Defina o elemento de aplicação para react-modal
Modal.setAppElement('#root');

const Estoque = () => {
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itensEstoque, setItensEstoque] = useState([]);

  useEffect(() => {
    fetchItensEstoque();
  }, []);

  const fetchItensEstoque = async () => {
    try {
      const response = await apiEstoque.get('/Estoque');
      setItensEstoque(response.data.filter(item => item.ativo)); // Exibir apenas itens ativos
    } catch (error) {
      console.error('Erro ao buscar itens de estoque:', error);
    }
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm('Deseja excluir este item do estoque?');
    if (confirmar) {
      try {
        const response = await apiEstoque.put(`/Estoque/desativar/${id}`);
        console.log('Item de estoque desativado:', response.data);
        fetchItensEstoque(); // Atualiza lista de itens de estoque após excluir
        alert('Item de estoque excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir item de estoque:', error);
      }
    }
  };

  const openDetalhesModal = (item) => {
    setSelectedItem(item);
    setIsDetalhesModalOpen(true);
  };

  const openEdicaoModal = (item) => {
    setSelectedItem(item);
    setIsEdicaoModalOpen(true);
  };

  const openNovoModal = async () => {
    setSelectedItem(null);
    setIsNovoModalOpen(true);
  };

  const closeModal = () => {
    setIsDetalhesModalOpen(false);
    setIsEdicaoModalOpen(false);
    setIsNovoModalOpen(false);
    setSelectedItem(null);
  };

  const handleSave = async (formData) => {
    try {
      const existingItem = itensEstoque.find(item => item.produtoID === formData.produtoID);
      if (existingItem) {
        alert('O produto já possui um estoque cadastrado. Redirecionando para a página de edição.');
        openEdicaoModal(existingItem);
      } else {
        // Criação de novo item de estoque
        const response = await apiEstoque.post('/Estoque', formData);
        console.log('Novo item de estoque criado:', response.data);
        
        // Atualizar quantidade na tabela de produtos
        const produtoResponse = await apiEstoque.put(`/Produto/${formData.produtoID}`, { quantidade: formData.quantidade });
        console.log('Quantidade do produto atualizada:', produtoResponse.data);
  
        fetchItensEstoque(); // Atualiza lista de itens de estoque após salvar
        closeModal();
      }
    } catch (error) {
      console.error('Erro ao salvar item de estoque:', error);
    }
  };
  
  const handleUpdate = async (formData) => {
    try {
      // Atualização de item de estoque existente
      const response = await apiEstoque.put(`/Estoque/${formData.produtoID}`, formData);
      console.log('Item de estoque atualizado:', response.data);
  
      // Atualizar quantidade na tabela de produtos
      const produtoResponse = await apiEstoque.put(`/Produto/${formData.produtoID}`, { quantidade: formData.quantidade });
      console.log('Quantidade do produto atualizada:', produtoResponse.data);
  
      fetchItensEstoque(); // Atualiza lista de itens de estoque após salvar
      closeModal();
    } catch (error) {
      console.error('Erro ao atualizar item de estoque:', error);
    }
  };

  return (
    <EstoqueContainer>
      <EstoqueTitle>Estoque</EstoqueTitle>
      <BotaoEspacamento>
        <EstoqueButton onClick={openNovoModal}>Adicionar Item ao Estoque</EstoqueButton>
      </BotaoEspacamento>
      <EstoqueTable>
        <thead>
          <tr>
            <th>Produto ID</th>
            <th>Quantidade</th>
            <th>Data de Atualização</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {itensEstoque.map(item => (
            <tr key={item.produtoID}>
              <td>{item.produtoID}</td>
              <td>{item.quantidade}</td>
              <td>{item.dataAtualizacao}</td>
              <td>
                <button onClick={() => openDetalhesModal(item)}>Detalhes</button>
                <button onClick={() => openEdicaoModal(item)}>Editar</button>
                <button onClick={() => handleExcluir(item.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </EstoqueTable>

      {/* Modais */}
      <ModalDetalhesEstoque isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicaoEstoque isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleUpdate} fetchItensEstoque={fetchItensEstoque} />
      <ModalNovoEstoque isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </EstoqueContainer>
  );
};

export default Estoque;
