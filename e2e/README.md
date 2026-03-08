# Testes E2E - Frontend (Cypress)

## Sobre
Este diretório contém os testes ponta a ponta (E2E) do projeto, focados na validação das jornadas de usuário na interface gráfica. A aplicação alvo dos testes é o [BugBank](https://bugbank.netlify.app/).

A automação foi construída utilizando **Cypress** integrado com **Cucumber (BDD)** para a escrita dos cenários e comportamentos. Ela implementa o padrão de arquitetura de testes **Page Object Model (POM)**.

## Instalação e Configuração
Certifique-se de ter o Node.js e as dependências gerais do projeto instaladas na raiz do projeto:

```bash
cd ..
npm ci
```

## Execução
A execução ocorre via terminal ou pela interface do Cypress

**A partir do diretório raiz:**
```bash
# Executa apenas os testes marcados com a tag @smoke
npm run test:smoke

# Executa toda a suíte de testes rotulados com a tag @regressao
npm run test:regressao
```

**Interface Visual:**
```bash
npx cypress open
```

## Relatórios e Evidências
Foi utilizado o **Allure Report** associado ao Cypress para consolidação das métricas do teste E2E

- **Localmente:** Para visualizar os relatórios locais estruturados nas estepes do *Cucumber*, rode `npm run report:generate && npm run report:open` na raiz.
- **Evidências:** Vídeos das execuções sistêmicas e *screenshots* das falhas em momentos exatos são gerados e salvos automaticamente na pasta `reports/evidencias/` na raiz do projeto.

## CI/CD
Na pipeline do GitHub Actions (`.github/workflows/testes-continuos.yml`), os testes E2E rodam em jobs paralelos utilizando definições de TAGs customizadas. O job `e2e-smoke` invoca apenas os cenários marcados em testes críticos e o job `e2e-regressao` testa a plataforma como um todo. O relatório em HTML interativo do Allure é publicado com sucesso de forma contínua no repositório final.