# Revisão Técnica Completa — landingpage-hortelan

Data: 2026-03-06
Escopo: front-end estático (Vite + React splash + landing single-file)

## Resumo executivo

A aplicação é funcional para cenário de marketing/landing e tem boa preocupação com UX visual e i18n. O principal risco atual não está em bugs críticos de execução, mas em **manutenibilidade**, **segurança de browser** e **governança de qualidade** (falta de testes, lint e CI).

### Priorização geral
- **Alta**: riscos de segurança no front-end (`innerHTML` com conteúdo dinâmico), ausência de headers/políticas de segurança e falta de pipeline de qualidade.
- **Média**: duplicação arquitetural (React + página minificada com lógica separada), código monolítico difícil de evoluir.
- **Baixa**: ajustes de SEO/documentação, observabilidade e padronização de tooling.

---

## 1) Arquitetura & Design

### Diagnóstico
- Existem **dois “apps” no mesmo repositório**: fluxo React (`src/*`) e fluxo estático/minificado (`index.min.html` + `app.js`) com regras de negócio de UI duplicadas/paralelas.
- O arquivo `app.js` concentra responsabilidades muito diferentes (i18n, detecção de idioma, animações, menu, FAQ, efeitos de digitação, integração de libs CDN), reduzindo coesão.
- Não há separação clara de camadas/módulos (ex.: `features/i18n`, `features/faq`, `ui/animations`, `services/geo`).

### Evidências
- Roteamento React redireciona para a landing minificada, criando acoplamento entre duas abordagens. (`src/App.jsx` e `src/splash/SplashGate.jsx`)
- Lógica extensa em `app.js` com múltiplos domínios no mesmo arquivo.

### Recomendação
- Consolidar em uma única estratégia (preferencialmente React + build).
- Separar por domínio funcional, com módulos pequenos e API interna explícita.

---

## 2) Clean Code & Qualidade

### Diagnóstico
- Há nomes razoáveis no React (`getTimeMode`, `detectAndPersistLanguage`), porém em `app.js` há longos blocos e responsabilidades misturadas.
- Possível código morto/legado: importações React/GSAP via `esm.sh` no próprio `app.js` aumentam acoplamento e dificultam depuração.
- Falta padronização automatizada (sem scripts de lint/format/test).

### Recomendação
- Introduzir ESLint + Prettier + scripts npm.
- Quebrar `app.js` em módulos e evitar lógica heterogênea no mesmo arquivo.

---

## 3) Boas práticas de API

### Diagnóstico
- Não existe backend próprio.
- A única integração é geolocalização por IP (`ipapi.co`), sem contrato formal interno.

### Recomendação
- Tratar integração externa como serviço com timeout/retry e fallback previsível.

---

## 4) Segurança (Obrigatório)

### Pontos críticos
1. **Uso de `innerHTML` para i18n** no HTML minificado (risco de XSS se dicionário for contaminado).
2. **Sem CSP explícita** e sem política clara de headers de segurança no deploy.
3. Dependência de chamada externa de geolocalização por IP; risco de disponibilidade/privacidade.
4. Sem evidência de SAST/SCA automatizado em CI.

### Recomendação
- Substituir `innerHTML` por `textContent` quando possível.
- Definir CSP mínima e headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
- Tornar geolocalização opcional e com timeout curto + fallback local.

---

## 5) Tratamento de erros & confiabilidade

### Diagnóstico
- Há fallback de idioma em `catch` (positivo), mas sem telemetria do erro.
- Não existe padrão de erro/log estruturado (normal em app estático, mas útil para suporte).

### Recomendação
- Centralizar tratamento de integração externa (geo) e registrar falhas em camada observável (ex.: Sentry front-end opcional).

---

## 6) Performance & escalabilidade

### Diagnóstico
- Build do Vite executa com sucesso; bundle JS principal ficou ~426 kB (não crítico para demo, mas alto para splash/landing).
- `index.min.html` muito grande e difícil de otimizar incrementalmente.

### Recomendação
- Medir Web Vitals e reduzir JS inicial (code splitting/lazy loading do splash).
- Evitar manter duas bases de UI em paralelo.

---

## 7) Banco de dados & migrações

Não aplicável (sem banco). Persistência local via `localStorage` para FAQ.

---

## 8) Observabilidade

### Diagnóstico
- Não há logs estruturados, métricas, tracing ou health checks (esperado em app estático, mas ainda possível com RUM/analytics).

### Recomendação
- Adicionar monitoração de front-end (Web Vitals, erros JS, taxa de falhas de fetch externo).

---

## 9) Testes

### Diagnóstico
- Não há testes unitários/integrados/E2E.
- Não existe meta de cobertura.

### Recomendação
- Quick win: Vitest + Testing Library para i18n/lógica de idioma.
- E2E mínimo com Playwright para fluxo splash -> home e troca de idioma.

---

## 10) Frontend

### Pontos positivos
- Boa base visual, uso de animações e preocupação com `prefers-reduced-motion`.
- Suporte de idiomas e estados básicos do mural/FAQ.

### Pontos de melhoria
- Acessibilidade pode evoluir (foco em componentes dinâmicos, feedback de erros de formulário mais robusto).
- Segurança no browser: evitar `innerHTML` onde não necessário.

---

## 11) CI/CD & qualidade automatizada

### Diagnóstico
- Não há pipeline versionado no repositório (lint/test/build/security gates).

### Recomendação
- GitHub Actions com etapas: `npm ci`, lint, teste, build, auditoria de deps (quando endpoint disponível).

---

## 12) Docker/Infra

Não aplicável no estado atual (sem Dockerfile/compose/IaC no repositório).

---

## 13) Documentação

### Diagnóstico
- README é detalhado para uso funcional.
- Faltam seções de qualidade de engenharia (testes automatizados, política de branches/PR formal, segurança, CI).

### Recomendação
- Incluir “Definition of Done” técnico (lint + testes + build + checklist de segurança).

---

## 14) Entregáveis da revisão

## 14.1 Lista de problemas priorizada

### Alta
1. Uso de `innerHTML` com conteúdo dinâmico de i18n.
2. Ausência de política explícita de segurança de conteúdo (CSP/headers).
3. Ausência de CI com gates de qualidade e segurança.

### Média
1. Arquitetura duplicada (React + landing minificada com lógica própria).
2. `app.js` monolítico e de difícil manutenção.
3. Falta de suíte de testes automatizados.

### Baixa
1. Placeholder de canonical/OG em `index.min.html` com `example.com`.
2. Ausência de observabilidade de front-end.

## 14.2 Recomendações com impacto

- **Trocar `innerHTML` por `textContent`** → reduz superfície XSS (alto impacto, baixa complexidade).
- **Criar CI básico (lint+test+build)** → previne regressões e melhora previsibilidade (alto impacto, média complexidade).
- **Consolidar arquitetura em uma única app** → reduz custo de evolução e bugs divergentes (alto impacto, alta complexidade).
- **Modularizar `app.js`** → melhora leitura, testabilidade e onboarding (médio impacto, média complexidade).

## 14.3 Sugestões de refatoração (antes/depois)

### Exemplo 1 — XSS defensivo

**Antes**
```js
el.innerHTML = map[k];
```

**Depois**
```js
el.textContent = map[k];
```

> Se houver necessidade real de HTML no conteúdo, usar whitelist/sanitização explícita.

### Exemplo 2 — Separação de responsabilidades

**Antes**
- Um `app.js` com i18n + splash + menu + FAQ + integrações externas.

**Depois**
- `src/features/i18n/*`
- `src/features/faq/*`
- `src/features/splash/*`
- `src/services/geo/*`
- `src/shared/dom/*`

## 14.4 Plano de ação proposto

### Quick wins (1–3 dias)
1. Corrigir `innerHTML` para `textContent` nos pontos de tradução simples.
2. Criar scripts `lint`, `format`, `test` no `package.json`.
3. Pipeline CI mínima com build obrigatório.
4. Corrigir metadados finais de domínio/OG/canonical.

### Médio prazo (1–2 semanas)
1. Extrair módulos do `app.js` e reduzir acoplamento.
2. Criar testes unitários para i18n/detecção de idioma.
3. E2E smoke para fluxo principal.

### Refatoração maior (2–4 semanas)
1. Eliminar duplicidade entre React e `index.min.html`.
2. Adotar arquitetura única e processo de geração do artefato minificado a partir da base principal.
3. Definir baseline de segurança e performance (CSP + Web Vitals + budget de bundle).

---

## Checks executados nesta revisão
- Build de produção com Vite (ok).
- Tentativa de auditoria de dependências via npm audit (bloqueada por endpoint do registry no ambiente).

## 15) Baseline e melhorias aplicadas nesta rodada (2026-03-06)

### Baseline antes das mudanças
- `npm test`: 4 testes passando.
- `npm run build`: bundle principal único (`dist/assets/index-DIWRSQRH.js`) com 426.48 kB (138.21 kB gzip), build em ~20.90s.

### Melhorias implementadas (cabíveis ao escopo front-end estático)
1. **Medição/observabilidade (itens 1 e 11 do checklist)**
   - Instrumentação de métricas RUM no cliente (`trackMetric`) para:
     - início/fim da splash,
     - sucesso/erro/cache-hit da detecção de geolocalização.
   - Eventos publicados como `CustomEvent("hortelan:metric")` e buffer opcional em `window.__HORTELAN_METRICS__`.

2. **Chamadas externas resilientes (item 4)**
   - Detecção de idioma via Geo IP com:
     - timeout curto,
     - retry com backoff + jitter,
     - cache em `sessionStorage` (TTL),
     - deduplicação de chamadas concorrentes,
     - circuit breaker simples após falhas consecutivas.

3. **Performance de frontend (item 7)**
   - Code splitting das telas de splash diurna/noturna com `React.lazy` + `Suspense`.

4. **Qualidade/testes (itens 9 e 10)**
   - Nova suíte de testes unitários para lógica de detecção de idioma:
     - fallback,
     - persistência,
     - cache e redução de chamadas externas.

### Resultado após mudanças
- `npm test`: 8 testes passando.
- `npm run build`: bundle inicial reduzido para 307.90 kB (99.90 kB gzip), com chunks separados das splash screens.

### Itens não aplicáveis nesta base
- Banco de dados, pool de conexões, `EXPLAIN ANALYZE`, locks/transações (projeto sem backend/DB).
- Fila/job server-side e autoscaling de runtime backend.
