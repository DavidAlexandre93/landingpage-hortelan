## 1. Inventário comprovável

- [x] 1.1 Executar análise de exports, dependências, imports e referências textuais e registrar somente candidatos sem consumidores.
- [x] 1.2 Catalogar assets por caminho, hash, tamanho e presença no grafo de build, preservando fontes e arquivos públicos com responsabilidade atual.

## 2. Limpeza behavior-preserving

- [x] 2.1 Privatizar exports não consumidos e ajustar testes sem mudar validação, persistência, tema ou interface.
- [x] 2.2 Excluir individualmente assets legados sem referência, preservando `Assets/dashboard.png` e todos os arquivos estáveis usados por HTML, manifestos e SEO.
- [x] 2.3 Revisar módulos, scripts e estilos em busca de duplicação ou cerimônia objetivamente removível, evitando abstrações sem consumidor e alterações meramente cosméticas.
- [x] 2.4 Reexecutar a análise estática e confirmar zero arquivos, exports ou dependências diretas inutilizados no escopo suportado.

## 3. Verificação e evidência

- [x] 3.1 Executar lint, formatação, testes unitários e cobertura, corrigindo toda regressão causada pela limpeza.
- [x] 3.2 Executar builds raiz/subpath, crawl do artefato e budgets, confirmando ausência de referências quebradas ou diretórios obsoletos.
- [x] 3.3 Executar validação OpenSpec estrita, auditoria de dependências e Playwright/axe nos navegadores e viewports suportados.
- [x] 3.4 Atualizar rastreabilidade e evidência final com remoções, métricas e prontidão de archive, sem arquivar automaticamente.
