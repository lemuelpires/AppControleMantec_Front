import React, { useState, useEffect } from 'react';
import { EstoqueContainer, EstoqueTitle, EstoqueButton, EstoqueTable, BotaoEspacamento } from './style';
import ModalDetalhesEstoque from '../../components/Modais/Estoque/ModalDetalhes';
import ModalEdicaoEstoque from '../../components/Modais/Estoque/ModalEdicao';
import ModalNovoEstoque from '../../components/Modais/Estoque/ModalNovo';
import apiEstoque from '../../services/apiCliente';
import Modal from 'react-modal';

// Defina o elemento de aplicação para react-modal
Modal.setAppElement('#root');

const Estoque = () => {
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [estoque, setEstoque] = useState([]);

  useEffect(() => {
    fetchEstoque();
  }, []);

  const fetchEstoque = async () => {
    try {
      const response = await apiEstoque.get('/Estoque');
      setEstoque(response.data);
    } catch (error) {
      console.error('Erro ao buscar estoque:', error);
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

  const openNovoModal = () => {
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
      if (formData.id) {
        // Atualização de entrada de estoque existente
        const response = await apiEstoque.put(`/Estoque/${formData.id}`, formData);
        console.log('Entrada de estoque atualizada:', response.data);
      } else {
        // Criação de nova entrada de estoque
        const response = await apiEstoque.post('/Estoque', formData);
        console.log('Nova entrada de estoque criada:', response.data);
      }
      fetchEstoque(); // Atualiza lista de estoque após salvar
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar entrada de estoque:', error);
    }
  };

  return (
    <EstoqueContainer>
      <EstoqueTitle>Estoque</EstoqueTitle>
      <BotaoEspacamento>
        <EstoqueButton onClick={openNovoModal}>Adicionar Entrada de Estoque</EstoqueButton>
      </BotaoEspacamento>
      <EstoqueTable>
        <thead>
          <tr>
            <th>Produto ID</th>
            <th>Quantidade</th>
            <th>Data de Atualização</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {estoque.map(item => (
            <tr key={item.produtoID}>
              <td>{item.produtoID}</td>
              <td>{item.quantidade}</td>
              <td>{new Date(item.dataAtualizacao).toLocaleDateString()}</td>
              <td>{item.ativo ? 'Sim' : 'Não'}</td>
              <td>
                <button onClick={() => openDetalhesModal(item)}>Detalhes</button>
                <button onClick={() => openEdicaoModal(item)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </EstoqueTable>

      {/* Modais */}
      <ModalDetalhesEstoque isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicaoEstoque isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovoEstoque isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </EstoqueContainer>
  );
};

export default Estoque;
