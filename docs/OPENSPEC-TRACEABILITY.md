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
