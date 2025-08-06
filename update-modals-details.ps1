# Script PowerShell para modernizar todos os modais de detalhes
$modals = @(
    @{
        Path = "src\components\Modais\Funcionario\ModalDetalhes\index.jsx"
        Titulo = "Detalhes do Funcionário"
        NotFound = "Funcionário não encontrado."
    },
    @{
        Path = "src\components\Modais\OrdemDeServico\ModalDetalhes\index.jsx"
        Titulo = "Detalhes da Ordem de Serviço"
        NotFound = "Ordem de serviço não encontrada."
    },
    @{
        Path = "src\components\Modais\Produto\ModalDetalhes\index.jsx"
        Titulo = "Detalhes do Produto"
        NotFound = "Produto não encontrado."
    },
    @{
        Path = "src\components\Modais\Servico\ModalDetalhes\index.jsx"
        Titulo = "Detalhes do Serviço"
        NotFound = "Serviço não encontrado."
    }
)

foreach ($modal in $modals) {
    $path = $modal.Path
    if (Test-Path $path) {
        Write-Host "Atualizando: $path"
        
        $content = Get-Content $path -Raw
        
        # Atualizar estilo do content
        $content = $content -replace "content: \{[^}]*\}", @"
content: {
    backgroundColor: '#1f1e1e',
    padding: '0',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    maxWidth: '420px',
    width: '80%',
    maxHeight: '70vh',
    overflow: 'hidden',
    inset: 'unset',
    color: '#ffffff',
    zIndex: 10000,
    position: 'relative',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  }
"@

        # Atualizar div container
        $content = $content -replace "<div>\s*<Titulo>", "<div style={{ padding: '1rem' }}>`n        <Titulo>"
        
        # Atualizar span para dados
        $content = $content -replace "<strong>\{key\}:</strong> \{item\[key\]\}", "<strong>{key}:</strong>`n                  <span>{item[key]}</span>"
        
        # Atualizar mensagem de erro
        $content = $content -replace "<p>[^<]*não encontrad[^<]*</p>", "<p style={{ textAlign: 'center', color: '#f1f1f1', fontSize: '0.9rem' }}>$($modal.NotFound)</p>"
        
        Set-Content $path -Value $content -Encoding UTF8
        Write-Host "✓ Atualizado: $path"
    } else {
        Write-Host "✗ Não encontrado: $path"
    }
}

Write-Host "`nTodos os modais de detalhes foram atualizados!"
