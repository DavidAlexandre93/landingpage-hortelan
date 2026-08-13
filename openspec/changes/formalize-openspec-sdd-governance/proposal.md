## Why

O projeto já possui requisitos detalhados e gates de qualidade, mas o próprio ciclo SDD ainda depende de convenções espalhadas entre configuração, README, scripts e mudanças ativas. Formalizar essa governança agora torna o OpenSpec uma fonte de verdade operacional, reduz divergências entre descrição, implementação e evidência e facilita a manutenção segura por qualquer colaborador.

## What Changes

- Definir um contrato explícito para o ciclo de vida OpenSpec: explorar, propor, revisar, aplicar, sincronizar, validar e arquivar.
- Tornar obrigatório que cada mudança aplicável tenha proposta, specs delta, design, tarefas proporcionais, rastreabilidade e evidências verificáveis.
- Consolidar contexto, regras por artefato e orientações de operações no `openspec/config.yaml`.
- Adicionar verificações automatizadas para estrutura, estados de tarefas, referências a comandos e coerência entre configuração, documentação e workflows.
- Documentar o fluxo SDD completo, critérios de entrada/saída, responsabilidades, tratamento de mudanças sobrepostas e política de arquivamento.
- Integrar a validação da governança ao gate local e à CI sem alterar a experiência pública da landing page.
- Nenhuma alteração incompatível ou breaking change para visitantes é introduzida.

## Capabilities

### New Capabilities

- `sdd-governance`: Define o contrato operacional e verificável do ciclo SDD/OpenSpec deste projeto, incluindo artefatos, estados, rastreabilidade, validação e arquivamento.

### Modified Capabilities

Nenhuma. Os requisitos de produto e release existentes permanecem válidos; esta mudança formaliza a governança que os mantém coerentes.

## Impact

- OpenSpec: `openspec/config.yaml`, nova spec de governança e artefatos desta mudança.
- Automação: scripts de validação do repositório/OpenSpec, testes correspondentes, comandos npm e workflows de CI/CD.
- Documentação: README, guia SDD dedicado, rastreabilidade e evidências de release.
- Processo: novas mudanças passam a ter critérios objetivos de prontidão, aplicação, sincronização e arquivamento, sem backend, API ou migração de dados.
