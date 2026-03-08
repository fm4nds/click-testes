# Testes de API - DummyJSON (Newman/Postman)

## Sobre
Este diretório contém a Collection do Postman configurada para validar os serviços e endpoints RESTful da [DummyJSON](https://dummyjson.com).

Os testes englobam a modelagem avançada dos cenários abaixo:
- **Auth**: Autenticação e credenciamento seguro via POST
- **Users**: Criação (com geração de ID), Busca por ID, Listagem, Atualização com PUT dinâmico e Exclusão de IDs persistidos na collection.

São validados na camada backend o *status code* que a requisição retorna, a precisão das chaves/headers (`Content-Type`) e as propriedades principais do corpo da resposta via *asserts*. Os requests aproveitam-se de variáveis de ambientes dinâmicas geradas no *Tests*.

## Instalação e Configuração
As bibliotecas já ficam configuradas a partir do script `package.json` principal (com o Newman-cli). Estando na base:
```bash
cd ..
npm ci
```

Caso prefira inspecionar arquiteturalmente pela interface do **Postman ou Insomnia**:
1. Importe neste software o arquivo `postman/collection.json`
2. Importe o ambiente `postman/environment.json`

## Execução
A execução agilizada em ambiente de pipeline ou terminal baseia-se no executor **Newman**.

```bash
# Na raiz do projeto E2E
npm run test:api
```

## Relatórios e Evidências
A avaliação local do Newman projeta como resposta um relatório consolidado diretamente no seu terminal de texto listando iterativamente quais asserções em quais requests foram satisfatórias, exibindo evidências claras do erro formatado via *stacktrace* das respostas em cenários irregulares. 

## CI/CD
No orquestramento global no GitHub Actions (`.github/workflows/testes-continuos.yml`), foi desenhado um *Job* focado em tráfego de API (`api-tests`). Ele inicia `npm run test:api` isoladamente verificando a responsividade saudável da API a cada *push* realizado no código
