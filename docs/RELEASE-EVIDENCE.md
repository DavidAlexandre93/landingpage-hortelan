# Evidência de liberação

Evidência final capturada em 13 de agosto de 2026 após reconstruir as dependências pelo lockfile. O comando autoritativo de release deve permanecer verde após qualquer alteração posterior.

| Verificação            | Resultado final                                                                                                                                           |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Node/npm               | Node 24.14.0; npm 11.9.0; o contrato também verifica Node 22.13.x na CI                                                                                   |
| Instalação `npm ci`    | 438 pacotes reconstruídos; 0 vulnerabilidades                                                                                                             |
| Lint/formatação        | 0 avisos/erros ESLint; todos os arquivos cobertos pelo Prettier formatados                                                                                |
| Testes/cobertura       | 83/83 testes unitários e de componente; 98,47% statements, 93,06% branches, 100% functions e 99,17% lines                                                 |
| Browsers/axe/viewports | 38 aprovados; 2 skips documentados de forced-colors fora do Chromium; jornadas críticas em Chromium, Firefox e WebKit; zero violações axe sérias/críticas |
| Build raiz/subpath     | Ambos os artefatos compilados e percorridos; o subpath também foi servido e exercitado em Chromium                                                        |
| Budgets/artefato       | JS 76,53 KiB gzip; CSS 7,73 KiB gzip; inicial 273,95 KiB; artefato 507,44 KiB; maior mídia 187,41 KiB                                                     |
| Auditoria              | 0 vulnerabilidades em todas as severidades                                                                                                                |
| OpenSpec estrito       | 8 specs-base e 4 mudanças ativas aprovadas em modo estrito; governança SDD estrutural aprovada                                                            |
| Clean Code             | 0 achados de arquivos/exports/dependências inutilizados; 0 clones em 36 arquivos; 6 assets legados removidos (2.450.294 bytes)                            |

O artefato anterior de aproximadamente 2,9 MiB foi reduzido para cerca de 507 KiB. Apenas a fonte atual do dashboard permanece em `Assets` e somente sua versão processada é emitida; favicon, manifestos e imagem social canônica continuam em `public`. “100%” significa aprovação de todos os gates obrigatórios e jornadas críticas; não representa a cobertura medida acima como absoluta.

## Prontidão OpenSpec

- `clean-codebase-maintenance`: implementação e gate completos; pronta para revisão de archive explícito, sem efeito em specs por usar `skip_specs: true`.
- `formalize-openspec-sdd-governance`: implementação e gate completos; `sdd-governance` deve ser sincronizada somente na operação revisada que atualizar a baseline.
- `complete-hortelan-quality-audit`: tarefas implementadas; preservar seu histórico durante a reconciliação.
- `modernize-hortelan-landing`: tarefas 7.3 e 7.4 continuam abertas porque dependem de sync/archive e do gate posterior a essa operação.

Nenhuma mudança foi arquivada automaticamente nesta execução. A ordem e as dependências permanecem registradas em `docs/OPENSPEC-TRACEABILITY.md`.
