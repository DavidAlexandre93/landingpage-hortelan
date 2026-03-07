# Verificação de responsividade e compatibilidade — Hortelan

## Escopo validado
- Página testada: `public/index.min.html` servida localmente.
- Contextos de viewport/dispositivo simulados:
  - Smartphone: `390x844` (Chromium)
  - Tablet: `820x1180` (Chromium)
  - Notebook: `1366x768` (Chromium)
  - Desktop: `1920x1080` (Chromium)
  - Desktop: `1366x768` (Firefox)
  - Desktop: `1366x768` (WebKit)

## Método
Foi executada uma bateria automatizada com Playwright para verificar:
1. Presença de overflow horizontal (`scrollWidth > clientWidth`).
2. Visibilidade de elementos estruturais principais (`header`, hero e formulário FAQ).
3. Fluxos funcionais básicos (troca de idioma e publicação no mural/FAQ).

## Resultado por cenário
| Cenário | Browser | Overflow horizontal | Header/Hero/FAQ visíveis | Troca de idioma | Publicação FAQ |
|---|---|---:|---|---|---|
| Smartphone 390x844 | Chromium | Não | Sim | Não validada (controle não visível após colapso de navegação) | Não validada |
| Tablet 820x1180 | Chromium | **Sim** (`scrollWidth: 1063`, `clientWidth: 820`) | Sim | Clique executado, sem alteração efetiva observável no `lang` | Não validada |
| Notebook 1366x768 | Chromium | Não | Sim | Clique executado, sem alteração efetiva observável no `lang` | Não validada |
| Desktop 1920x1080 | Chromium | Não | Sim | Clique executado, sem alteração efetiva observável no `lang` | Não validada |
| Desktop 1366x768 | Firefox | Não | Sim | Clique executado, sem alteração efetiva observável no `lang` | Não validada |
| Desktop 1366x768 | WebKit | Não | Sim | Clique executado, sem alteração efetiva observável no `lang` | Não validada |

## Evidências
Capturas geradas nos cenários acima:
- `artifacts/mobile_390x844.png`
- `artifacts/tablet_820x1180.png`
- `artifacts/notebook_1366x768.png`
- `artifacts/desktop_1920x1080.png`
- `artifacts/desktop_firefox_1366x768.png`
- `artifacts/desktop_webkit_1366x768.png`

## Conclusão
- **Layout**: estável na maior parte dos cenários, com **quebra de responsividade horizontal no tablet (820x1180)**.
- **Funcionalidade**: os fluxos de idioma e mural/FAQ não foram confirmados como funcionais neste ambiente de validação automática.

## Recomendações objetivas
1. Investigar e corrigir o elemento causador de overflow em faixa de tablet (`~820px`).
2. Adicionar testes E2E de regressão para i18n (alteração do atributo `html[lang]` + troca de textos visíveis).
3. Adicionar teste E2E de publicação/remoção no mural FAQ (criação de item no DOM e persistência em `localStorage`).
4. Incluir validação contínua com matriz mínima: `390x844`, `820x1180`, `1366x768`, `1920x1080` em Chromium + smoke em Firefox/WebKit.
