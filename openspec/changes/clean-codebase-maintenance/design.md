## Context

Consulte `proposal.md` para a motivação. O grafo de runtime é pequeno e modular, mas o repositório preserva arquivos-fonte históricos em `Assets` e alguns módulos exportam constantes usadas apenas internamente. O workspace também contém alterações válidas de qualidade e SDD que devem ser preservadas.

Não há mudança de comportamento, dependência ou contrato; `.openspec.yaml` declara `skip_specs: true`. A limpeza precisa sobreviver aos dois modos de build, ao gate de cobertura e aos testes reais em três engines.

## Goals / Non-Goals

**Goals:**

- Reduzir superfície pública e arquivos desconectados com evidência estática e dinâmica.
- Simplificar somente onde o resultado tiver menos estados, duplicação ou cerimônia sem esconder intenção.
- Preservar comportamento, acessibilidade, conteúdo localizado, segurança, budgets e deploy.
- Deixar a justificativa da remoção reproduzível por outro mantenedor.

**Non-Goals:**

- Redesenhar componentes, alterar textos, rotas, armazenamento ou estilos visuais.
- Introduzir classes, camadas, bibliotecas ou abstrações para demonstrar SOLID.
- Remover código apenas por baixa cobertura ou preferência estética.
- Reescrever módulos estáveis em massa ou tocar mudanças alheias sem necessidade.

## Decisions

### 1. Exigir múltiplas evidências antes de excluir

Símbolos serão candidatos quando análise de exports/imports e busca textual não encontrarem consumidor externo. Arquivos serão candidatos quando não estiverem no grafo Vite, em HTML, manifestos, scripts, docs ou configuração. Lint, testes, builds e crawl do artefato confirmarão cada remoção.

Alternativa considerada: excluir tudo que uma única ferramenta reportar. Rejeitada porque imports dinâmicos, assets públicos e convenções de deploy podem não aparecer em um analisador.

### 2. Privatizar antes de abstrair

Constantes usadas somente dentro de um módulo deixarão de ser exportadas, preservando nomes e lógica. Duplicação pequena e legível continuará local quando extrair uma abstração aumentar o acoplamento ou antecipar uma necessidade inexistente.

Alternativa considerada: criar serviços, classes e helpers genéricos. Rejeitada por YAGNI e porque SOLID é proporcional à complexidade, não uma meta de quantidade de camadas.

### 3. Preservar apenas assets com responsabilidade atual

`Assets/dashboard.png` permanece como fonte importada pelo Hero e os arquivos estáveis em `public` permanecem responsáveis por favicon, manifest, SEO e compartilhamento. Arquivos irmãos sem qualquer referência serão removidos individualmente; a saída final continuará verificada contra cópias obsoletas.

Alternativa considerada: mover todos os assets para `public`. Rejeitada porque retiraria do Vite o hashing e o controle do grafo da mídia de interface.

### 4. Não adicionar uma dependência permanente de análise

A análise de exports pode ser executada de forma efêmera e confirmada pelo conjunto já versionado de verificadores. O repositório não carregará uma ferramenta adicional para dois símbolos ou arquivos que o lint, o bundler e os testes já protegem continuamente.

Alternativa considerada: adicionar um analisador ao gate. Rejeitada neste escopo por custo de dependência e configuração desproporcional ao grafo atual.

## Risks / Trade-offs

- [Asset aparentemente morto pode ter consumidor externo] → excluir somente arquivos de interface/versionados sem URL pública documentada e manter todos os caminhos presentes em HTML, manifestos, docs e configs.
- [Privatização pode afetar testes ou integrações] → confirmar todos os imports e executar a suíte completa depois da alteração.
- [Refatoração ampla pode gerar regressão visual] → evitar mudança estrutural sem ganho comprovado e executar Playwright/axe nos viewports existentes.
- [Workspace possui alterações sobrepostas] → usar patches direcionados, nunca resetar e revisar o diff final por arquivo.

## Migration Plan

1. Capturar inventário de referências, exports, dependências e hashes de assets.
2. Privatizar símbolos e excluir apenas assets comprovadamente desconectados.
3. Rodar análise estática novamente e revisar o diff em busca de simplificações adicionais objetivas.
4. Executar lint, formatação, testes, cobertura, builds raiz/subpath, budgets, auditoria, OpenSpec estrito e navegadores.
5. Registrar as remoções e métricas finais sem arquivar automaticamente a mudança.

Rollback: restaurar os arquivos removidos e exports pelo controle de versão. Não existe migração de dados, runtime ou conteúdo do usuário.
