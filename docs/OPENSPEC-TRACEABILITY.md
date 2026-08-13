# Rastreabilidade OpenSpec

## `modernize-hortelan-landing`

| Grupo                         | Implementação principal                                       | Evidência exigida                                                   |
| ----------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------- |
| 1. SDD e tooling              | `package.json`, ESLint, Vitest, scripts de budget e workflows | gate local, testes dos scripts e OpenSpec estrito                   |
| 2. Arquitetura e preferências | `src/app`, `features/localization`, `features/preferences`    | testes de rota/base, idioma, storage e tema                         |
| 3. Marketing                  | `features/marketing`, `styles`                                | testes de componente, Playwright e axe                              |
| 4. Feedback                   | `features/feedback`                                           | validação, falha de storage, export, injeção inerte e download real |
| 5. Metadados e segurança      | `index.html`, `vercel.json`, `rumMetrics`                     | verificador do artefato, política de rede e testes unitários        |
| 6. Consolidação               | remoções legadas, grafo Vite único, README e docs             | `repo:check`, builds raiz/subpath e crawl de referências            |
| 7. Entrega                    | `release:gate`, CI/CD e relatório final                       | matriz completa após sincronização/arquivamento                     |

Nenhuma caixa da mudança original deve ser marcada por similaridade visual. Cada uma só é concluída quando o arquivo citado existe e a evidência indicada passa no estado final. A mudança `complete-hortelan-quality-audit` amplia esses mesmos requisitos com limites mensuráveis, navegadores reais e promoção imutável.

## Mudanças ativas e ordem de reconciliação

| Ordem | Mudança                             | Relação e estado esperado antes do archive                                                                                                       |
| ----- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1     | `complete-hortelan-quality-audit`   | Garantias de qualidade já implementadas; revisar sync da baseline e evidência final sem descartar o histórico da modernização.                   |
| 2     | `modernize-hortelan-landing`        | Origem funcional sobreposta; as tarefas 7.3 e 7.4 permanecem abertas até sync/archive explícito seguido do gate final.                           |
| 3     | `formalize-openspec-sdd-governance` | Governança transversal; sincronizar `sdd-governance` somente após implementação, validação estrita e reconciliação das duas mudanças anteriores. |
| 4     | `clean-codebase-maintenance`        | Refatoração interna com `skip_specs`; comprovar cada remoção e validar comportamento antes de revisão e archive explícito.                       |

As mudanças compartilham arquivos de tooling, documentação e release, embora suas capabilities delta sejam distintas. A ordem acima preserva a evolução funcional, depois suas garantias, o contrato do processo e por fim a manutenção interna. Nenhuma delas é arquivada automaticamente pelo verificador.

## `formalize-openspec-sdd-governance`

| Requisito                                     | Implementação principal                       | Evidência automatizada                                              |
| --------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------- |
| Ciclo de vida SDD canônico                    | `openspec/config.yaml`, `docs/SDD.md`         | testes documentais e `sdd:check`                                    |
| Fonte de verdade e configuração               | `openspec/config.yaml`, README, `docs/SDD.md` | parser YAML e contratos documentais                                 |
| Rastreabilidade entre requisitos e evidências | este documento e tasks da mudança             | verificação de mudanças, tarefas e nomes ativos                     |
| Validação automatizada da governança          | `scripts/check-sdd-governance.mjs`            | `scripts/check-sdd-governance.test.js` e validação OpenSpec estrita |
| Mudanças sobrepostas e sincronização segura   | tabela de ordem acima                         | descoberta determinística das capabilities ativas                   |
| Arquivamento revisado e reversível            | `docs/SDD.md`, guidance de archive            | validação documental; nenhuma movimentação automática               |

Refatorações de Clean Code, SOLID proporcional, KISS, DRY e YAGNI permanecem sem delta spec quando não mudam comportamento observável. Suas remoções devem ser comprovadas por busca de referências, análise do grafo, lint, testes e builds.

## `clean-codebase-maintenance`

| Grupo            | Alteração comprovada                                                                                                                              | Evidência reproduzível                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| API interna      | `MURAL_TYPES`, `THEMES`, `LEGACY_PATHS` e `normalizeBasePath` deixaram de ser exports; `SITE_URL` e `withBasePath` sem consumidor foram removidos | busca de referências, testes focados e análise de exports sem achados               |
| UI compartilhada | ícones `shield`/`store`, suporte de título sem consumidor e atributo redundante foram removidos                                                   | grafo de usos de `Icon`, testes de App e Playwright/axe                             |
| Assets           | seis arquivos históricos sem referência removidos de `Assets`; `dashboard.png` e todo `public` preservados                                        | inventário SHA-256/tamanho, crawl dos builds raiz/subpath e budget                  |
| DRY/KISS/YAGNI   | nenhuma abstração ou dependência permanente adicionada                                                                                            | jscpd: 0 clones em 36 arquivos; análise de arquivos/exports/dependências: 0 achados |

A remoção de assets-fonte totaliza 2.450.294 bytes. Como a mudança usa `skip_specs: true`, seu aceite é a preservação dos requisitos existentes comprovada pelo gate completo, não uma nova capability.
