# Framework de Automação de Testes

Projeto de automação de testes contemplando testes ponta a ponta (E2E), testes de API e testes de Carga.

## Estrutura do Projeto

Foi adotada uma arquitetura segmentada por tipos/camadas neste projeto. Consulte as documentações específicas de cada módulo para detalhes de instalação, configuração, execução e relatórios:

- [Testes E2E (Frontend - Cypress)](e2e/README.md)
- [Testes de API (Serviços - Newman)](api/README.md)
- [Testes de Carga (Performance - K6)](performance/README.md)

```text
├── .github/
│   └── workflows/
│       ├── teste-carga.yml
│       └── testes-continuos.yml
├── e2e/cypress/
│   ├── funcionalidades/
│   │   └── registro.feature      # Cenários BDD em Gherkin
│   ├── paginas/
│   │   └── PaginaRegistro.js     # Page Objects (POM)
│   ├── support/
│   │   ├── auxiliares/
│   │   │   └── geradorDados.js   # Geração de dados (Faker)
│   │   ├── seletores/
│   │   │   └── seletoresRegistro.js
│   │   ├── step_definitions/
│   │   │   └── registro.steps.js
│   │   └── e2e.js
│   └── README.md
├── api/
│   ├── postman/
│   │   ├── collection.json
│   │   └── environment.json
│   └── README.md
├── performance/
│   ├── k6/
│   │   └── teste-carga.js
│   └── README.md
├── reports/
│   └── evidencias/
├── .gitignore
├── .prettierrc
├── cypress.config.cjs
├── eslint.config.js
├── package.json
└── README.md
```

## Instalação Geral

Para instalar todas as dependências do projeto de uma vez na sua máquina:

```bash
npm ci
```

## Execução Rápida

Os comandos abaixo estão configurados no `package.json` para facilitar a execução local:

| Tipo          | Comando                  | Descrição                   |
| ------------- | ------------------------ | --------------------------- |
| E2E Smoke     | `npm run test:smoke`     | Cenários críticos (@smoke)  |
| E2E Regressão | `npm run test:regressao` | Suite completa (@regressao) |
| API           | `npm run test:api`       | Endpoints DummyJSON         |
| Carga         | `npm run test:carga`     | GET /users com ramping      |

## Pipeline CI/CD

Foram configurados workflows no GitHub Actions para o repositório:

- **Testes E2E e API (`testes-continuos.yml`)**: Executado em operações de `push` e `pull_request` na branch `main`, ou manualmente via `workflow_dispatch`. Realiza testes E2E em jobs separados baseados em tags (`@smoke` e `@regressao`) e possui um job apartado para API.
- **Testes de Carga (`teste-carga.yml`)**: Executado manualmente via `workflow_dispatch` para evitar gargalos em APIs públicas de estudos durante pushes contínuos.

## Relatórios e Evidências

Os relatórios visuais unificados dos testes funcionais E2E podem ser gerados utilizando o Allure:

```bash
npm run report:generate  # Gerar relatório Allure local
npm run report:open      # Abrir relatório no navegador
```

O CI/CD publica o relatório Allure em formato de página no GitHub Pages. A pasta `reports/` armazena as saídas do K6 e as evidências geradas pelo Cypress (vídeos e screenshots).