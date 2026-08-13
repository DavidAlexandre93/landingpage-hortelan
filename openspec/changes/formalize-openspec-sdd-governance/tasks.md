## 1. Configuração e manual SDD

- [x] 1.1 Fortalecer `openspec/config.yaml` com contexto versionado, regras verificáveis para proposal/specs/design/tasks e orientações explícitas de apply, sync, validate e archive.
- [x] 1.2 Criar `docs/SDD.md` com o ciclo canônico, critérios de entrada e saída, fontes de verdade, comandos oficiais, responsabilidades e tratamento de mudanças sem specs.
- [x] 1.3 Atualizar README, guia de qualidade e rastreabilidade para apontar ao manual SDD e registrar mudanças ativas, sobreposições, ordem de reconciliação e pendências reais.
- [x] 1.4 Adicionar testes documentais que verifiquem caminhos, comandos e seções obrigatórias compartilhadas entre configuração e documentação.

## 2. Verificador automatizado de governança

- [x] 2.1 Implementar um script ESM determinístico que inspecione a configuração, descubra specs e mudanças ativas e valide artefatos obrigatórios e o formato rastreável das tarefas.
- [x] 2.2 Fazer o verificador delegar a validação normativa a `openspec validate --all --strict`, preservar a saída útil da CLI e falhar com mensagens acionáveis.
- [x] 2.3 Cobrir o verificador com testes automatizados para projeto válido, artefato ausente, tarefa inválida, mudança incompleta legítima, `skip_specs` explícito e mudanças sobrepostas.
- [x] 2.4 Confirmar que o verificador é independente de rede, configuração pessoal e ordem do filesystem, inclusive quando executado a partir dos ambientes suportados pela CI.

## 3. Integração ao gate e à CI

- [x] 3.1 Expor `sdd:check` nos scripts npm e executá-lo no início do gate autoritativo, mantendo `spec:validate` como comando de baixo nível documentado.
- [x] 3.2 Atualizar os workflows de CI/CD para disparar em mudanças OpenSpec e executar a verificação SDD antes de análise, build ou promoção.
- [x] 3.3 Adicionar ou ajustar testes dos scripts e workflows para comprovar que uma falha SDD interrompe o gate e que a configuração válida prossegue normalmente.

## 4. Rastreabilidade e verificação final

- [x] 4.1 Mapear cada requisito de `sdd-governance` para arquivos implementados e verificações automatizadas, preservando abertas as tarefas que dependam de operação futura.
- [x] 4.2 Executar lint, formatação, testes do verificador e testes de scripts/workflows, corrigindo toda falha introduzida pela mudança.
- [x] 4.3 Executar `openspec validate --all --strict` e confirmar que specs base e todas as mudanças ativas permanecem válidas.
- [x] 4.4 Executar uma instalação limpa e o quality gate completo, registrando comandos, resultados, cobertura e evidências reproduzíveis na documentação de release.
- [x] 4.5 Revisar a prontidão para sincronização e arquivamento, documentar qualquer bloqueio restante e manter o arquivamento como operação posterior, explícita e separada.
