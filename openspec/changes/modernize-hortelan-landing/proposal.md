## Why

A experiencia atual mantem duas implementacoes de frontend (splash React e landing estatica), possui conteudo corrompido, risco de XSS no mural e falhas conhecidas de responsividade e manutencao. A modernizacao cria uma unica experiencia institucional, orientada por especificacoes verificaveis e por um gate de qualidade continuo.

## What Changes

- **BREAKING**: substituir a landing estatica em `public/index.min.html` e o redirecionamento apos a splash por uma unica aplicacao React servida na rota raiz.
- Criar uma interface visual responsiva e mobile-first com design system, hierarquia editorial, componentes reutilizaveis e animacoes respeitando preferencias do usuario.
- Manter a proposta de valor da Hortelan, demo, documentacao, video, planos, canais sociais e feedback da comunidade em uma jornada mais clara.
- Implementar localizacao reativa em pt-BR, en, es e fr, com persistencia local e fallback previsivel sem bloquear a primeira renderizacao.
- Substituir manipulacao de HTML dinamico por estado React e renderizacao segura, com validacao, limites e estados de feedback acessiveis.
- Elevar SEO, seguranca de browser, performance, observabilidade, acessibilidade WCAG 2.2 AA e compatibilidade responsiva a criterios de aceite explicitos.
- Adotar OpenSpec como fonte versionada de proposta, requisitos, design, tarefas e historico de mudancas, integrado aos scripts e ao CI.
- Substituir os scripts artesanais de qualidade por ESLint, Prettier, Vitest e validacao OpenSpec.

## Capabilities

### New Capabilities

- `marketing-experience`: jornada institucional, navegacao, conteudo do produto, CTAs, responsividade e apresentacao visual.
- `localized-experience`: selecao, persistencia, fallback e aplicacao acessivel dos idiomas suportados.
- `community-feedback`: FAQ, formulario de contato e mural local com validacao, persistencia e exportacao seguras.
- `frontend-quality`: requisitos observaveis de acessibilidade, SEO, performance, seguranca, compatibilidade e governanca SDD.

### Modified Capabilities

Nenhuma. Este e o primeiro baseline de especificacoes do projeto.

## Impact

- Codigo: consolidacao de `src`, remocao do runtime legado `app.js`/`styles.css` e desativacao da landing estatica duplicada.
- URLs: `/` passa a ser a landing canonica; `/home`, `/splash` e `/index.min.html` deixam de hospedar experiencias independentes.
- Dados locais: preservacao das chaves de idioma e mural quando validas, com migracao defensiva na leitura.
- Dependencias: atualizacao do toolchain e remocao de bibliotecas nao necessarias ao runtime.
- CI/CD: o build permanece estatico, mas o gate passa a validar especificacoes, codigo, testes, cobertura, seguranca e artefato de producao.
