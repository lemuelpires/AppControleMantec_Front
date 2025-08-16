import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FormularioOrdemDeServico from './index';

// src/components/Forms/FormularioOrdemDeServico/index.test.jsx

describe('FormularioOrdemDeServico', () => {
  const clienteOptions = [
    { value: '1', label: 'Cliente 1' },
    { value: '2', label: 'Cliente 2' }
  ];
  const funcionarioOptions = [
    { value: '10', label: 'Funcionário 1' }
  ];
  const produtoOptions = [
    { value: '100', label: 'Produto A', preco: 50 }
  ];
  const servicoOptions = [
    { value: '200', label: 'Serviço X' }
  ];

  it('renderiza título e campos principais', () => {
    render(
      <FormularioOrdemDeServico
        clienteOptions={clienteOptions}
        funcionarioOptions={funcionarioOptions}
        produtoOptions={produtoOptions}
        servicoOptions={servicoOptions}
        title="Ordem de Serviço"
      />
    );
    expect(screen.getByText('Ordem de Serviço')).toBeInTheDocument();
    expect(screen.getByLabelText('Cliente')).toBeInTheDocument();
    expect(screen.getByLabelText('Funcionário')).toBeInTheDocument();
    expect(screen.getByText('Produtos')).toBeInTheDocument();
    expect(screen.getByText('Serviços')).toBeInTheDocument();
    expect(screen.getByLabelText('Valor Total')).toBeInTheDocument();
  });

  it('chama onSubmit com dados ao salvar', () => {
    const onSubmit = vi.fn();
    render(
      <FormularioOrdemDeServico
        clienteOptions={clienteOptions}
        funcionarioOptions={funcionarioOptions}
        produtoOptions={produtoOptions}
        servicoOptions={servicoOptions}
        onSubmit={onSubmit}
      />
    );
    // Seleciona cliente
    const clienteSelect = screen.getByLabelText('Cliente');
    fireEvent.keyDown(clienteSelect, { key: 'ArrowDown' });
    fireEvent.click(screen.getByText('Cliente 1'));

    // Seleciona funcionário
    const funcionarioSelect = screen.getByLabelText('Funcionário');
    fireEvent.keyDown(funcionarioSelect, { key: 'ArrowDown' });
    fireEvent.click(screen.getByText('Funcionário 1'));

    // Preenche mão de obra
    const maoDeObraInput = screen.getByLabelText('Valor - Mão de Obra');
    fireEvent.change(maoDeObraInput, { target: { value: '100' } });

    // Salva
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));

    expect(onSubmit).toHaveBeenCalled();
    const data = onSubmit.mock.calls[0][0];
    expect(data.clienteID).toBe('1');
    expect(data.funcionarioID).toBe('10');
    expect(data.valorMaoDeObra).toBe(100);
  });

  it('chama onClose ao clicar em cancelar', () => {
    const onClose = vi.fn();
    render(
      <FormularioOrdemDeServico
        clienteOptions={clienteOptions}
        funcionarioOptions={funcionarioOptions}
        produtoOptions={produtoOptions}
        servicoOptions={servicoOptions}
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(onClose).toHaveBeenCalled();
  });
});