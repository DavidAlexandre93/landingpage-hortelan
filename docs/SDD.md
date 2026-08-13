# SDD com OpenSpec

Este é o manual operacional do desenvolvimento orientado por especificações da Hortelan. O OpenSpec versionado neste repositório é a fonte de verdade do planejamento; nenhuma configuração pessoal é necessária para descobrir o projeto, o schema ou suas regras.

## Fontes de verdade

| Informação                                       | Fonte autoritativa                           |
| ------------------------------------------------ | -------------------------------------------- |
| Contexto, schema e regras do processo            | `openspec/config.yaml`                       |
| Comportamento vigente                            | `openspec/specs/<capability>/spec.md`        |
| Alteração proposta                               | `openspec/changes/<change>/proposal.md`      |
| Requisitos adicionados, modificados ou removidos | `openspec/changes/<change>/specs/**/spec.md` |
| Decisões e limites técnicos                      | `openspec/changes/<change>/design.md`        |
| Progresso implementável                          | `openspec/changes/<change>/tasks.md`         |
| Relação requisito → implementação → teste        | `docs/OPENSPEC-TRACEABILITY.md`              |
| Resultado do gate de entrega                     | `docs/RELEASE-EVIDENCE.md`                   |

Documentação explica o processo, specs definem comportamento, design registra decisões, tasks controlam execução e evidências comprovam o resultado. Uma fonte não substitui a outra.

## Ciclo canônico

1. **Explorar** — entender problema, comportamento vigente, restrições e mudanças sobrepostas. Saída: escopo suficientemente claro para propor ou decisão documentada de não prosseguir.
2. **Propor** — criar a mudança no schema `spec-driven`. Saída: `proposal.md` com motivação, impacto e capabilities exatas.
3. **Especificar e desenhar** — escrever deltas observáveis e decisões técnicas proporcionais. Saída: specs e design válidos, sem decisão de escopo escondida em pergunta aberta.
4. **Planejar** — decompor o trabalho em checkboxes pequenas, ordenadas e verificáveis. Saída: `tasks.md` completo e estado OpenSpec pronto para apply.
5. **Aplicar** — implementar uma tarefa por vez, testar e marcar imediatamente apenas o que possui evidência. Saída: código, documentação e testes coerentes com cada checkbox concluída.
6. **Sincronizar** — reconciliar deltas sobrepostos e atualizar a baseline pelo fluxo oficial quando necessário. Saída: specs base coerentes, histórico preservado e validação estrita verde.
7. **Validar** — executar `npm run sdd:check` e o gate completo. Saída: estrutura, specs, código, artefato, segurança e navegadores aprovados.
8. **Arquivar** — revisar e autorizar explicitamente a movimentação da mudança concluída. Saída: histórico datado e baseline final validada; nunca ocorre automaticamente durante apply.

## Criar e acompanhar uma mudança

```bash
npx openspec new change <nome-em-kebab-case>
npx openspec status --change <nome> --json
npx openspec instructions proposal --change <nome> --json
npx openspec instructions specs --change <nome> --json
npx openspec instructions design --change <nome> --json
npx openspec instructions tasks --change <nome> --json
npx openspec instructions apply --change <nome> --json
```

As instruções retornadas pela CLI controlam os artefatos exigidos e devem ser lidas antes de editar cada um. Toda mudança de comportamento declara pelo menos uma capability nova ou modificada.

### Refatoração, tooling ou documentação

Uma mudança sem alteração observável não deve inventar requisitos. Nesse caso, declare explicitamente em `openspec/changes/<change>/.openspec.yaml`:

```yaml
schema: spec-driven
created: YYYY-MM-DD
skip_specs: true
```

`skip_specs` é permitido somente para refatoração pura, limpeza comprovada, tooling ou documentação. Se contrato de interface, acessibilidade, segurança, persistência, deploy ou outro comportamento mudar, specs delta continuam obrigatórias.

## Critérios de entrada e saída

| Estado   | Entrada mínima                                  | Saída obrigatória                                       |
| -------- | ----------------------------------------------- | ------------------------------------------------------- |
| Proposta | problema e impacto conhecidos                   | capabilities ou `skip_specs` declarados                 |
| Revisão  | proposal, specs e design disponíveis            | requisitos testáveis e decisões de escopo resolvidas    |
| Apply    | `openspec instructions apply` em estado `ready` | implementação e checkboxes sincronizadas com evidências |
| Sync     | deltas concluídos e sobreposições reconciliadas | baseline atualizada e validação estrita verde           |
| Release  | tarefas aplicáveis concluídas                   | `npm run release:gate` verde e evidência atualizada     |
| Archive  | release aprovado e efeito na baseline revisado  | mudança arquivada explicitamente e histórico preservado |

Uma tarefa só recebe `[x]` quando todo o seu critério existe e o comando de verificação correspondente passa. Dependência futura de sync, promoção ou archive mantém a tarefa aberta.

## Verificação e evidência

```bash
npm run sdd:check
npm run spec:validate
npm run release:gate
```

- `sdd:check` valida configuração, documentos, mudanças, formato das tarefas, rastreabilidade e chama a validação estrita oficial.
- `spec:validate` é o comando OpenSpec de baixo nível: `openspec validate --all --strict`.
- `release:gate` é o gate autoritativo e começa pela governança SDD antes de lint, testes, builds e navegadores.

Para cada grupo concluído, registre em `docs/OPENSPEC-TRACEABILITY.md` os requisitos, principais arquivos e testes. Resultados finais reproduzíveis pertencem a `docs/RELEASE-EVIDENCE.md`; alegações de sucesso não substituem a saída real do comando.

## Mudanças sobrepostas

Antes de sincronizar ou arquivar:

1. Liste mudanças e specs com `npx openspec list` e `npx openspec list --specs`.
2. Compare capabilities e áreas de implementação afetadas.
3. Registre a relação e a ordem em `docs/OPENSPEC-TRACEABILITY.md`.
4. Preserve tarefas abertas quando dependem da conclusão de outra mudança.
5. Sincronize ou arquive uma mudança por vez e execute validação estrita após cada operação.

No estado atual, `modernize-hortelan-landing` é a origem funcional; `complete-hortelan-quality-audit` adiciona garantias de release sobre a mesma implementação; `formalize-openspec-sdd-governance` formaliza o processo que governa ambas. A ordem planejada está registrada na rastreabilidade.

## Arquivamento e recuperação

O arquivamento exige todas as tarefas aplicáveis concluídas, specs delta revisadas, sobreposições reconciliadas, `npm run release:gate` verde e autorização explícita do mantenedor. Antes da operação, confira as instruções oficiais da mudança e o efeito esperado na baseline.

O destino é o histórico de archive gerenciado pelo OpenSpec, com nome datado. Não mova diretórios manualmente. Se uma operação precisar ser desfeita, restaure o commit pelo controle de versão, valide novamente todas as specs e documente a razão; tags publicadas nunca são movidas ou reutilizadas.

## Responsabilidades

- **Autor da mudança:** mantém proposal, deltas, design e tasks coerentes.
- **Implementador:** preserva mudanças alheias, produz testes proporcionais e sincroniza checkboxes somente após evidência.
- **Revisor:** confirma comportamento, riscos, sobreposições e comandos reproduzíveis.
- **Mantenedor da release:** autoriza sync/archive, executa o gate final e registra a evidência ligada ao SHA.

Esses papéis podem ser exercidos pela mesma pessoa, mas as decisões e os gates permanecem separados e auditáveis.
