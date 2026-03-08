# Testes de Carga - DummyJSON (K6)

## Sobre
Testes de carga escritos em JavaScript utilizando a ferramenta **K6**. 
O objetivo é simular estresse com a técnica de *ramping-up* no endpoint `GET /users` da [DummyJSON](https://dummyjson.com), avaliando gargalos sintéticos, *throughput* sistêmico e a conformidade com limites de duração previamente configurados na automação.

## Instalação e Configuração
É necessário ter o CLI em base golang do **K6** instalado nativamente em sua máquina local para gerenciar as rotinas de execução massiva.
- [Guia Oficial de Instalação K6](https://k6.io/docs/getting-started/installation/)

## Execução
Sempre utilize o diretório raiz do projeto para apontar corretamente para o script do K6:

```bash
# Executando via orquestrador da raiz (traz as configurações do próprio código)
npm run test:carga

# Ou executando a injeção do k6 diretamente com parâmetros virtuais modificados na marra (VUs e tempos)
k6 run performance/k6/teste-carga.js
k6 run --vus 20 --duration 60s performance/k6/teste-carga.js
```

## Relatórios e Evidências
O resultado e todas as sub-métricas processadas durante as requisições ativas são apresentadas no *Standard Output* formatado diretamente no terminal gráfico logo após a execução exaurir.
Contudo, se você quiser gerar ou persistir as **evidências** desses testes locais para anexo profissional:

```bash
# Salvar histórico de output visual fiel ao terminal para um repositório (.txt)
k6 run performance/k6/teste-carga.js 2>&1 | tee reports/k6-saida.txt

# Ou salvar relatório bruto em formato datagrid JSON
k6 run --out json=reports/result.json performance/k6/teste-carga.js
```

**Métricas Analisadas na bateria atual:**
| Métrica               | Descrição                         | Impacto de Gargalo                     |
| --------------------- | --------------------------------- | -------------------------------------- |
| **http_req_duration** | Tempo de resposta das requisições | p(95) > 5s indica lentidão massiva     |
| **http_req_failed**   | Taxa de requisições falhas        | > 10% indica instabilidade             |
| **http_reqs**         | Throughput (req/s / VUs)          | Baixo throughput = gargalo no servidor |
| **iterations**        | Total de iterações completadas    | Correlaciona e mede a capacidade real  |

## CI/CD
Para o ambiente estéril do GitHub Actions, foi desenvolvido um workflow avulso operante contendo a injeção estruturada desses disparos chamado `teste-carga.yml`, o _script_ de disparo massivo é desenhado para aceitar injeção manual autorizada por um operante mediante via `workflow_dispatch`. Isso previne que a pipeline derrube um servidor ou dispare um pico de carga inadequado no endpoint público da API involuntária ou consecutivamente