// src/pages/OrdemDeServico.js
import React, { useState } from 'react';
import { OrdemDeServicoContainer, OrdemDeServicoTitle, OrdemDeServicoButton, OrdemDeServicoTable } from './style';
import ModalDetalhes from '../../components/Modais/ModalDetalhes';
import ModalEdicao from '../../components/Modais/ModalEdicao';
import ModalNovo from '../../components/Modais/ModalNovo';

const OrdemDeServico = () => {
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [isEdicaoModalOpen, setIsEdicaoModalOpen] = useState(false);
  const [isNovoModalOpen, setIsNovoModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openDetalhesModal = (item) => {
    setSelectedItem(item);
    setIsDetalhesModalOpen(true);
  };

  const openEdicaoModal = (item) => {
    setSelectedItem(item);
    setIsEdicaoModalOpen(true);
  };

  const openNovoModal = () => {
    setSelectedItem(null);
    setIsNovoModalOpen(true);
  };

  const closeModal = () => {
    setIsDetalhesModalOpen(false);
    setIsEdicaoModalOpen(false);
    setIsNovoModalOpen(false);
    setSelectedItem(null);
  };

  const handleSave = (item) => {
    // Lógica para salvar o item (novo ou editado)
    console.log(item);
    closeModal();
  };

  return (
    <OrdemDeServicoContainer>
      <OrdemDeServicoTitle>Ordens de Serviço</OrdemDeServicoTitle>
      <OrdemDeServicoButton onClick={openNovoModal}>Adicionar Ordem de Serviço</OrdemDeServicoButton>
      <OrdemDeServicoTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Funcionário</th>
            <th>Produto</th>
            <th>Serviço</th>
            <th>Data de Entrada</th>
            <th>Data de Conclusão</th>
            <th>Status</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* Exibir dados dinâmicos aqui */}
          <tr>
            <td>1</td>
            <td>Cliente A</td>
            <td>Funcionário A</td>
            <td>Produto A</td>
            <td>Serviço A</td>
            <td>2024-06-26</td>
            <td>2024-06-27</td>
            <td>Em andamento</td>
            <td>Observação A</td>
            <td>
              <button onClick={() => openDetalhesModal({id: 1, clienteID: 'Cliente A', funcionarioID: 'Funcionário A', produtoID: 'Produto A', servicoID: 'Serviço A', dataEntrada: '2024-06-26', dataConclusao: '2024-06-27', status: 'Em andamento', observacoes: 'Observação A'})}>Detalhes</button>
              <button onClick={() => openEdicaoModal({id: 1, clienteID: 'Cliente A', funcionarioID: 'Funcionário A', produtoID: 'Produto A', servicoID: 'Serviço A', dataEntrada: '2024-06-26', dataConclusao: '2024-06-27', status: 'Em andamento', observacoes: 'Observação A'})}>Editar</button>
            </td>
          </tr>
          {/* Outras ordens de serviço */}
        </tbody>
      </OrdemDeServicoTable>

      {/* Modais */}
      <ModalDetalhes isOpen={isDetalhesModalOpen} onClose={closeModal} item={selectedItem} />
      <ModalEdicao isOpen={isEdicaoModalOpen} onClose={closeModal} item={selectedItem} onSubmit={handleSave} />
      <ModalNovo isOpen={isNovoModalOpen} onClose={closeModal} onSubmit={handleSave} />
    </OrdemDeServicoContainer>
  );
};

export default OrdemDeServico;
