# Hortelan AgTech — landing page

Experiência institucional da Hortelan construída com React 19 e Vite 8. O projeto apresenta a plataforma em português, inglês, espanhol e francês, oferece temas claro/escuro, contato por rascunho de e-mail e um mural privado mantido no navegador.

## Começar

Requisitos: Node `22.13.x` ou `24.x` e npm `10.x` ou `11.x`.

```bash
npm ci
npm run dev
```

O servidor local usa `http://127.0.0.1:5173`. Nenhum backend, token ou serviço de analytics é necessário.

## Arquitetura

- `src/app`: shell, metadados dinâmicos, links confiáveis e normalização de rotas legadas.
- `src/features`: localização, preferências, marketing, contato e mural local.
- `src/shared`: componentes sem estado e métricas locais, sem transmissão externa.
- `src/styles`: tokens, base, componentes e regras responsivas.
- `e2e`: aceitação em Chromium, Firefox e WebKit com Playwright e axe-core.
- `openspec`: propostas, decisões, requisitos e tarefas do fluxo SDD.
- `scripts`: contratos de engine/repositório, integridade do artefato e budgets.

O Vite controla todo o grafo de assets da aplicação. Arquivos públicos estáveis são limitados a metadados, logo compacta, `robots.txt`, sitemap e imagem social; o diretório-fonte `Assets` não é copiado integralmente para produção.

## Qualidade e SDD

```bash
npm run lint
npm run format:check
npm run test:coverage
npm run build:validate
npm run security:audit
npm run test:e2e
npm run sdd:check
npm run spec:validate
npm run release:gate
```

`npm run release:gate` é o comando autoritativo: começa pela governança SDD e valida engines, higiene Git, OpenSpec estrito, lint, formatação, cobertura, builds raiz/subdiretório, referências do artefato, budgets, auditoria e navegadores reais. O Playwright também serve o artefato secundário em `/landingpage-hortelan/` e comprova seus assets, manifest e navegação interna.

As mudanças são especificadas em `openspec/changes`. Antes de implementar, consulte a proposta, o design, os requisitos e as tarefas da mudança ativa; marque uma tarefa somente depois de produzir evidência reproduzível. O ciclo completo, fontes de verdade, tratamento de refatorações e política de arquivo estão no [manual SDD com OpenSpec](docs/SDD.md).

## Contratos mensuráveis

- Cobertura global mínima: 90% statements/lines e 85% branches/functions.
- JavaScript inicial: até 150 KiB gzip; CSS: até 50 KiB gzip.
- Transferência inicial: até 320 KiB; artefato total: até 650 KiB.
- Maior mídia: até 250 KiB.
- Viewports: 320, 375, 768, 1024, 1440 e 1920 CSS px sem overflow horizontal.
- Acessibilidade: zero violações axe sérias ou críticas nos estados testados.
- Segurança: zero vulnerabilidades de severidade alta/crítica no gate.

## Acessibilidade, privacidade e segurança

A interface possui skip link, foco visível, navegação móvel com Escape e restauração de foco, estados ao vivo, validação com foco no primeiro campo inválido, movimento reduzido e cores forçadas. Conteúdo semelhante a HTML no mural é tratado como texto por React.

O mural usa apenas `localStorage`; o contato prepara um `mailto:` e nada é enviado automaticamente. O YouTube só é solicitado após ativação explícita. A aplicação não usa geolocalização por IP nem telemetria de terceiros.

O host canônico aplica CSP, Permissions-Policy, Referrer-Policy, anti-framing e `nosniff` por cabeçalhos em `vercel.json`. Consulte [docs/QUALITY.md](docs/QUALITY.md) para matriz de suporte, deploy, rollback e limitações do GitHub Pages.

## Entrega

A CI testa os dois Node suportados e executa o gate completo no Node 24. A CD valida e empacota uma vez; development, staging e production baixam exatamente o mesmo artefato, sem rebuild. Produção só é promovida por tags `v*` e depende da promoção anterior.

Licença: MIT. Contato: `davidalexandrefernandes@outlook.com`.
