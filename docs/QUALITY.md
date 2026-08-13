# Contrato de qualidade e operação

## Plataformas suportadas

| Área            | Contrato                                             |
| --------------- | ---------------------------------------------------- |
| Node            | `22.13.x` e `24.x`                                   |
| npm             | `10.x` e `11.x`                                      |
| Navegadores     | Chromium, Firefox e WebKit atuais do Playwright 1.62 |
| Host canônico   | `https://landingpage-hortelan.vercel.app/` na raiz   |
| Host secundário | GitHub Pages em `/landingpage-hortelan/`             |

O host canônico é a autoridade de SEO e segurança. O build secundário comprova portabilidade de caminhos por varredura do artefato e smoke test Chromium servido no subdiretório real, mas GitHub Pages não permite configurar todos os cabeçalhos HTTP do `vercel.json`; por isso não deve substituir o host canônico em uma promoção comercial.

A ordem Tab do skip link é exercitada diretamente em Chromium e Firefox. O Playwright WebKit reproduz a preferência opt-in de acesso completo por teclado do Safari; nele, o teste posiciona o foco no skip link e confirma a mesma ativação por Enter, enquanto as demais interações de teclado continuam reais.

## Dependências e actions

ESLint permanece na linha 9 porque `eslint-plugin-jsx-a11y` 6.10 ainda não declara compatibilidade com ESLint 10. O jsdom permanece na linha 29 para suportar todo o contrato Node, enquanto o restante das dependências diretas usa versões compatíveis verificadas em 13 de agosto de 2026. Esses majors só devem avançar quando os peers e a matriz completa passarem juntos.

As GitHub Actions usam majors aprovados (`checkout@v7`, `setup-node@v7`, `upload-artifact@v7`, `download-artifact@v8` e `actions-gh-pages@v4`). Renovação de major exige revisão do changelog, execução do gate e atualização deste registro; o arquivo de workflow continua coberto por Prettier/OpenSpec e pela revisão de promoção.

## Build, deploy e rollback

Validação local antes de promover:

```bash
npm ci --ignore-scripts --no-fund
npm run sdd:check
npm run release:gate
```

`sdd:check` é executado novamente pelo início do gate autoritativo para impedir que configuração, specs, tarefas ou rastreabilidade inválidas avancem para análise, build ou promoção. A CI/CD não aplica filtros de caminho: alterações sob `openspec/**` e `docs/**` disparam os mesmos workflows que alterações de código.

Build equivalente para GitHub Pages:

```bash
npm run build:subpath
```

Promoção canônica:

```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```

A tag dispara validação, gera os builds canônico e secundário uma única vez e promove exatamente o `dist-subpath` validado por development, staging e production no GitHub Pages. O `dist` permanece o artefato canônico para a Vercel. Para rollback, reverta o commit defeituoso, execute novamente o gate e publique uma nova tag de correção; para emergência, republique pela interface do provedor o deployment associado ao SHA saudável anterior. Nunca mova ou reutilize uma tag publicada.

## Segurança de resposta

`vercel.json` define CSP, Permissions-Policy, Referrer-Policy, `X-Content-Type-Options` e `X-Frame-Options`. O HTML mantém apenas metadados com suporte real no documento. O CSP libera frames exclusivamente para `youtube-nocookie.com`, e esse domínio não entra na rede inicial porque o iframe é criado somente depois do clique.

## Critério de liberação

Uma entrega está apta somente quando `npm run release:gate` termina com sucesso, todas as tarefas aplicáveis possuem evidência rastreável, o artefato corresponde ao SHA validado e o relatório em `docs/RELEASE-EVIDENCE.md` foi atualizado. Sincronização e arquivamento continuam operações explícitas posteriores, conforme o [manual SDD](SDD.md). “100%” neste projeto significa 100% dos gates e jornadas críticas aprovados; cobertura de código continua sendo uma métrica explícita, não uma alegação absoluta.
