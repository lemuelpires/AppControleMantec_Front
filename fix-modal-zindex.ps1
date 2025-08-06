# Script PowerShell para corrigir z-index dos modais
$modalPaths = @(
    "src\components\Modais\Estoque\ModalEdicao\index.jsx",
    "src\components\Modais\Estoque\ModalNovo\index.jsx",
    "src\components\Modais\Funcionario\ModalDetalhes\index.jsx",
    "src\components\Modais\Funcionario\ModalEdicao\index.jsx",
    "src\components\Modais\Funcionario\ModalNovo\index.jsx",
    "src\components\Modais\OrdemDeServico\ModalDetalhes\index.jsx",
    "src\components\Modais\OrdemDeServico\ModalEdicao\index.jsx",
    "src\components\Modais\OrdemDeServico\ModalNovo\index.jsx",
    "src\components\Modais\Produto\ModalDetalhes\index.jsx",
    "src\components\Modais\Produto\ModalEdicao\index.jsx",
    "src\components\Modais\Produto\ModalNovo\index.jsx",
    "src\components\Modais\Servico\ModalDetalhes\index.jsx",
    "src\components\Modais\Servico\ModalEdicao\index.jsx",
    "src\components\Modais\Servico\ModalNovo\index.jsx"
)

foreach ($path in $modalPaths) {
    if (Test-Path $path) {
        Write-Host "Corrigindo: $path"
        
        # Ler conteúdo do arquivo
        $content = Get-Content $path -Raw
        
        # Verificar se já foi corrigido
        if ($content -notmatch "zIndex: 9999") {
            # Substituir overlay 
            $content = $content -replace "overlay: \{\s*backgroundColor: 'rgba\(0, 0, 0, 0\.5\)',\s*display: 'flex',\s*alignItems: 'center',\s*justifyContent: 'center',\s*\}", "overlay: {`n    backgroundColor: 'rgba(0, 0, 0, 0.5)',`n    display: 'flex',`n    alignItems: 'center',`n    justifyContent: 'center',`n    zIndex: 9999,`n    position: 'fixed',`n    top: 0,`n    left: 0,`n    right: 0,`n    bottom: 0,`n  }"
            
            # Adicionar z-index ao content 
            $content = $content -replace "(inset: 'unset',)", "`$1`n    zIndex: 10000,`n    position: 'relative',"
            
            # Salvar arquivo modificado
            Set-Content $path -Value $content -Encoding UTF8
            Write-Host "Corrigido: $path"
        } else {
            Write-Host "Já corrigido: $path"
        }
    } else {
        Write-Host "Arquivo não encontrado: $path"
    }
}

Write-Host "Todos os modais foram processados!"
