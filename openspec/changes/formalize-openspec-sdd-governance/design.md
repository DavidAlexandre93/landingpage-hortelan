## Context

O projeto usa OpenSpec 1.8 com planejamento local no schema `spec-driven`, oito specs base e mudanças ativas extensas. O contexto e algumas regras já vivem em `openspec/config.yaml`, enquanto comandos, critérios e rastreabilidade estão distribuídos entre README, `docs/QUALITY.md`, `docs/OPENSPEC-TRACEABILITY.md`, scripts e workflows. Consulte `proposal.md` para a motivação e `specs/sdd-governance/spec.md` para o contrato normativo.

Há mudanças sobrepostas: a modernização original preserva tarefas deliberadamente abertas que dependem de arquivamento, e a auditoria de qualidade está implementada e validada. A solução precisa manter esse estado honesto, preservar alterações já existentes no workspace e não arquivar nada sem uma operação revisada.

## Goals / Non-Goals

**Goals:**

- Tornar o fluxo OpenSpec descobrível e reproduzível somente com arquivos versionados no repositório.
- Automatizar invariantes de estrutura e integrar a verificação SDD ao gate que já protege a entrega.
- Separar claramente requisitos normativos, orientação operacional, decisões técnicas, tarefas e evidências.
- Manter mudanças sobrepostas rastreáveis até uma sincronização ou arquivamento explícito.

**Non-Goals:**

- Criar um schema OpenSpec customizado ou substituir o fluxo `spec-driven` mantido pela ferramenta.
- Duplicar o parser ou a validação semântica interna do OpenSpec.
- Arquivar as mudanças existentes durante a implementação desta governança.
- Introduzir serviço externo, banco de dados, telemetria ou dependência de configuração pessoal.

## Decisions

### 1. Usar o schema `spec-driven` oficial como único fluxo padrão

`openspec/config.yaml` continuará declarando `schema: spec-driven` e concentrará contexto, regras por artefato e guidance de operações. O guia SDD documentará variações legítimas, como `skip_specs`, sem criar uma segunda convenção paralela.

Alternativa considerada: criar um schema próprio com novos artefatos. Rejeitada porque aumentaria o custo de atualização e duplicaria conceitos já representados por proposal, specs, design e tasks.

### 2. Criar uma capability normativa para governança

A baseline receberá `sdd-governance` após sincronização ou arquivamento. Ela define resultados observáveis para mantenedores e CI, enquanto detalhes de comandos e arquivos permanecem no design e no guia operacional.

Alternativa considerada: documentar apenas no README. Rejeitada porque documentação não validada não estabelece requisitos testáveis nem histórico delta.

### 3. Adicionar um verificador fino sobre a CLI oficial

Um script ESM verificará invariantes específicos do repositório — configuração, artefatos esperados, sintaxe de tarefas e links de documentação — e delegará validação normativa ao `openspec validate --all --strict`. O script emitirá mensagens acionáveis e terá testes de unidade com fixtures temporárias.

Alternativa considerada: reimplementar a validação de specs. Rejeitada por risco de divergência com o OpenSpec e manutenção desnecessária.

### 4. Manter um manual operacional dedicado

`docs/SDD.md` será o ponto de entrada para conceitos, fluxo, comandos, critérios de pronto, sobreposição, sincronização e arquivo. README oferecerá apenas uma visão curta e um link; `docs/QUALITY.md` continuará cuidando do gate e da operação de release.

Alternativa considerada: expandir ainda mais o README. Rejeitada para evitar que onboarding, operação e referência normativa fiquem misturados em um documento longo.

### 5. Fazer o gate validar SDD antes de análise e build

O comando `sdd:check` será executado no início do quality gate e nos workflows existentes. Assim, alterações Markdown em requisitos continuam sendo mudanças de release e não escapam da CI.

Alternativa considerada: manter `spec:validate` isolado. Rejeitada porque a validação semântica, sozinha, não cobre convenções e rastreabilidade próprias do repositório.

### 6. Preservar arquivo como ação posterior e explícita

O verificador pode reportar mudanças completas prontas para revisão, mas não moverá diretórios nem atualizará specs automaticamente. Sincronização e arquivamento continuarão usando as operações oficiais, com revisão humana da mudança-alvo.

Alternativa considerada: arquivar automaticamente após gate verde. Rejeitada porque mudanças sobrepostas podem exigir ordem e julgamento, e o arquivo altera baseline e histórico.

## Risks / Trade-offs

- [Validação local pode ficar mais rígida que a CLI] → limitar regras extras a invariantes documentadas e cobri-las com testes de casos válidos e inválidos.
- [Novo comando aumenta ligeiramente o tempo do gate] → reutilizar a CLI e operações de filesystem baratas, sem rede ou build adicional.
- [Mudanças antigas podem não seguir todas as novas convenções] → registrar exceções históricas de forma explícita e aplicar regras prospectivamente sem reescrever evidências válidas.
- [Documentação pode divergir da configuração] → validar nomes de comandos, caminhos essenciais e presença das seções obrigatórias automaticamente.
- [Múltiplas mudanças ativas confundem a prontidão] → produzir inventário determinístico, manter tarefas dependentes de arquivo abertas e documentar ordem de reconciliação.

## Migration Plan

1. Fortalecer `openspec/config.yaml` e criar o manual SDD sem alterar os requisitos de produto existentes.
2. Implementar o verificador de governança e seus testes, usando a CLI OpenSpec como autoridade semântica.
3. Adicionar `sdd:check` aos scripts npm, ao quality gate e aos workflows versionados.
4. Atualizar rastreabilidade e evidências para refletir as mudanças ativas e suas pendências reais.
5. Executar testes do verificador, validação OpenSpec estrita e o release gate completo.
6. Em uma operação posterior e revisada, sincronizar a capability `sdd-governance` e arquivar mudanças elegíveis na ordem acordada.

Rollback: reverter os arquivos desta mudança pelo controle de versão restaura o gate anterior; não há migração de runtime nem dados de usuário.
