# Sistema de Recibos para Clientes - Mantec Informática

## Descrição
Este sistema permite gerar recibos profissionais para os clientes da Mantec Informática, baseado no modelo Excel fornecido. O recibo inclui informações de serviços prestados e produtos vendidos.

## Funcionalidades

### 🧾 Recibo do Cliente
- **Layout profissional**: Baseado no modelo Excel da empresa
- **Dados da empresa**: Inclui logo, CNPJ e telefones
- **Informações do cliente**: Nome, telefone, email, documento e endereço
- **Tabela de serviços/produtos**: Com códigos, descrição, quantidade e valores
- **Totais automáticos**: Cálculo automático dos valores
- **Seção de pagamento**: Campos para pagamento à vista/prazo e garantia
- **Assinaturas**: Espaços para cliente e responsável

### 📋 Como Acessar o Recibo

1. **Na lista de Ordens de Serviço**:
   - Clique no ícone verde 🧾 (recibo) na coluna de ações
   - O modal do recibo será aberto diretamente

2. **No modal de detalhes**:
   - Abra os detalhes de uma ordem de serviço
   - Clique no botão "🧾 Ver Recibo do Cliente"
   - Alterne entre relatório técnico e recibo conforme necessário

### 🖨️ Impressão
- Clique no botão "🖨️ Imprimir Recibo"
- O sistema abrirá uma janela de impressão otimizada
- Layout otimizado para papel A4
- Formatação específica para impressão

## Estrutura dos Dados

### Informações Incluídas no Recibo:
- **Cabeçalho da empresa** (Mantec Informática)
- **Dados do cliente** (nome, telefone, email, CPF/CNPJ, endereço)
- **Tabela de itens**:
  - Código da OS
  - Descrição do defeito/serviço
  - Nome do produto/serviço
  - Quantidade
  - Valor unitário e total
- **Resumo financeiro**
- **Campos de pagamento** (à vista, prazo, garantia)
- **Espaços para assinatura**

### Compatibilidade:
- ✅ Suporte para múltiplos produtos por OS
- ✅ Suporte para múltiplos serviços por OS
- ✅ Compatibilidade com formato antigo (um produto/serviço por OS)
- ✅ Cálculo automático de totais
- ✅ Formatação de moeda brasileira

## Tecnologias Utilizadas
- React com Styled Components
- Integração com API existente
- Sistema de impressão otimizado
- Layout responsivo

## Arquivos Principais
- `src/components/Modais/OrdemDeServico/ReciboCliente/index.jsx` - Componente principal do recibo
- `src/pages/OrdensDeServico/index.jsx` - Página atualizada com botão do recibo
- `src/components/Modais/OrdemDeServico/ModalDetalhes/index.jsx` - Modal atualizado com alternância

## Melhorias Futuras
- [ ] Personalização de campos do cabeçalho
- [ ] Templates de recibo diferentes
- [ ] Exportação para PDF
- [ ] Envio por email
- [ ] Histórico de impressões

---

**Desenvolvido para Mantec Informática**  
*Sistema de gestão de ordens de serviço e recibos*
