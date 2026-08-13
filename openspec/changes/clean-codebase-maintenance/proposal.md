## Why

A evolução recente deixou exports públicos sem consumidores e assets históricos fora do grafo de produção. Remover somente o que a análise estática, as referências, os testes e os builds comprovarem como inútil reduz superfície de manutenção sem alterar a experiência ou os contratos existentes.

## What Changes

- Remover exports não consumidos e tornar detalhes internos privados aos módulos.
- Excluir assets legados sem referências, preservando a imagem-fonte usada pelo Vite e todos os arquivos públicos estáveis.
- Simplificar código duplicado ou cerimonial somente quando a legibilidade e os testes demonstrarem ganho objetivo.
- Verificar dependências, imports, CSS, build raiz/subpath e jornadas críticas antes de concluir a limpeza.
- Aplicar Clean Code, SOLID proporcional, YAGNI, KISS e DRY sem criar abstrações antecipadas nem mudar comportamento observável.
- Nenhum breaking change ou capability de usuário é introduzido.

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities

Nenhuma. Esta mudança usa `skip_specs: true` porque se limita a manutenção interna e preserva integralmente os requisitos vigentes.

## Impact

- Código: módulos frontend com símbolos não exportados e possíveis simplificações locais.
- Assets: arquivos legados comprovadamente desconectados do grafo Vite/public.
- Tooling: inventário estático temporário, lint, testes, cobertura, builds, verificação de artefato e navegadores.
- Runtime, APIs, persistência, conteúdo, acessibilidade e deploy: sem mudança planejada.
