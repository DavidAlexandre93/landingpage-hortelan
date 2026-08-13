## Purpose

Estabelecer um ciclo SDD/OpenSpec explícito, rastreável e automatizável para que requisitos, decisões, implementação, testes, evidências e histórico permaneçam coerentes durante toda a evolução do projeto.

## ADDED Requirements

### Requirement: Ciclo de vida SDD canônico

O projeto MUST definir um único ciclo OpenSpec canônico que cubra exploração, proposta, revisão, aplicação, sincronização, validação e arquivamento, com critérios de entrada e saída documentados para cada estado. Mudanças de comportamento SHALL usar o schema `spec-driven` e conter todos os artefatos exigidos pelo schema antes da implementação.

#### Scenario: Colaborador inicia uma mudança de comportamento

- **WHEN** um colaborador propõe uma alteração observável no produto ou no processo de entrega
- **THEN** ele encontra um fluxo documentado que exige proposal, specs delta, design quando aplicável e tasks antes da aplicação

#### Scenario: Mudança não altera requisitos observáveis

- **WHEN** uma mudança for exclusivamente de refatoração, tooling ou documentação
- **THEN** a decisão de não criar specs é declarada explicitamente pelo mecanismo suportado do OpenSpec, sem inventar requisitos artificiais

### Requirement: Fonte de verdade e configuração do projeto

O repositório MUST manter o contexto do produto, schema padrão, regras por artefato e orientações operacionais em configuração versionada e descoberta pelo OpenSpec a partir da raiz do projeto. A documentação SHALL distinguir claramente configuração operacional, especificações normativas, artefatos delta e evidências de implementação.

#### Scenario: OpenSpec resolve o projeto

- **WHEN** qualquer comando OpenSpec é executado na raiz ou em um subdiretório do repositório
- **THEN** o contexto local resolve o mesmo projeto, schema e conjunto de regras sem depender de configuração pessoal não versionada

#### Scenario: Manutenção consulta a fonte de verdade

- **WHEN** um colaborador precisa decidir onde registrar uma regra, decisão ou comprovação
- **THEN** o guia SDD identifica de forma inequívoca o arquivo normativo ou operacional apropriado

### Requirement: Rastreabilidade entre requisitos e evidências

Cada tarefa concluída MUST mapear para implementação, documentação ou evidência verificável, e cada requisito aplicável SHALL possuir pelo menos um cenário testável ou uma verificação explícita. Checkboxes MUST permanecer incompletos enquanto qualquer parte de seu critério de aceite ainda depender de sincronização, gate ou arquivamento pendente.

#### Scenario: Tarefa é marcada como concluída

- **WHEN** uma checkbox muda para concluída
- **THEN** existe referência rastreável a arquivos alterados e ao comando ou evidência que comprova o resultado

#### Scenario: Aceite depende de uma operação futura

- **WHEN** uma tarefa exige arquivamento, promoção ou outra operação ainda não executada
- **THEN** a tarefa permanece aberta e a pendência é descrita sem antecipar sua conclusão

### Requirement: Validação automatizada da governança

O projeto MUST fornecer um comando determinístico que valide configuração, estrutura das mudanças, artefatos obrigatórios, formato das tarefas, specs base e deltas em modo estrito. Esse comando SHALL integrar o gate autoritativo e a CI, e qualquer erro MUST bloquear a entrega.

#### Scenario: Governança está coerente

- **WHEN** o comando de verificação SDD é executado em um checkout suportado
- **THEN** ele valida a estrutura local, executa a validação OpenSpec estrita e termina com status de sucesso

#### Scenario: Artefato ou vínculo obrigatório está ausente

- **WHEN** uma mudança aplicável omite um artefato requerido, contém tarefa inválida ou falha na validação estrita
- **THEN** o comando encerra com erro acionável e o gate não prossegue para promoção

### Requirement: Mudanças sobrepostas e sincronização segura

Mudanças ativas que afetam a mesma capability MUST declarar a sobreposição, preservar o histórico e ser reconciliadas antes do arquivamento. Specs delta concluídas SHALL ser sincronizadas com as specs base ou arquivadas pelo fluxo oficial, sem edição destrutiva de requisitos não relacionados.

#### Scenario: Duas mudanças afetam o mesmo domínio

- **WHEN** a auditoria identifica mudanças ativas com escopo sobreposto
- **THEN** a rastreabilidade registra a relação, a ordem de reconciliação e as tarefas que permanecem pendentes

#### Scenario: Delta concluído é promovido à baseline

- **WHEN** todos os critérios aplicáveis e gates de uma mudança estão aprovados
- **THEN** a sincronização ou o arquivamento atualiza as specs base preservando os artefatos históricos e validando o resultado estritamente

### Requirement: Arquivamento revisado e reversível

O arquivamento MUST ser uma operação explícita, revisada e posterior à implementação, à sincronização necessária e ao gate final. A documentação SHALL explicar pré-condições, efeitos sobre specs base, convenção de destino e recuperação por controle de versão.

#### Scenario: Mudança está pronta para arquivo

- **WHEN** todas as tarefas, cenários aplicáveis, validações estritas e evidências finais estiverem concluídos
- **THEN** o mantenedor recebe uma instrução explícita para revisar deltas e autorizar o arquivamento separadamente

#### Scenario: Mudança ainda possui pendência

- **WHEN** qualquer tarefa ou critério de aceite permanecer aberto
- **THEN** o fluxo impede uma alegação de conclusão e não arquiva automaticamente a mudança
