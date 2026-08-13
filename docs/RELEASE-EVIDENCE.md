# Evidência de liberação

Evidência final capturada em 13 de agosto de 2026 após reconstruir as dependências pelo lockfile. O comando autoritativo de release deve permanecer verde após qualquer alteração posterior.

| Verificação            | Resultado final                                                                                                                                           |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Node/npm               | Node 24.14.0; npm 11.9.0; o contrato também verifica Node 22.13.x na CI                                                                                   |
| Instalação `npm ci`    | 438 pacotes reconstruídos; 0 vulnerabilidades                                                                                                             |
| Lint/formatação        | 0 avisos/erros ESLint; todos os arquivos cobertos pelo Prettier formatados                                                                                |
| Testes/cobertura       | 73/73 testes unitários e de componente; 98,48% statements, 93,14% branches, 100% functions e 99,17% lines                                                 |
| Browsers/axe/viewports | 37 aprovados; 2 skips documentados de forced-colors fora do Chromium; jornadas críticas em Chromium, Firefox e WebKit; zero violações axe sérias/críticas |
| Build raiz/subpath     | Ambos os artefatos compilados e percorridos, com todas as referências first-party resolvidas                                                              |
| Budgets/artefato       | JS 76,66 KiB gzip; CSS 7,73 KiB gzip; inicial 274,07 KiB; artefato 507,61 KiB; maior mídia 187,41 KiB                                                     |
| Auditoria              | 0 vulnerabilidades em todas as severidades                                                                                                                |
| OpenSpec estrito       | 8 specs-base e 2 mudanças ativas aprovadas em modo estrito                                                                                                |

O artefato anterior de aproximadamente 2,9 MiB foi reduzido para cerca de 508 KiB, preservando a arte-fonte. Apenas uma imagem do dashboard é emitida. “100%” significa aprovação de todos os gates obrigatórios e jornadas críticas; não representa a cobertura medida acima como absoluta.
