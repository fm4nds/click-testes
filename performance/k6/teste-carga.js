import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

const URL_BASE = __ENV.BASE_URL || "https://dummyjson.com";
const taxaErro = new Rate("erros");

export const options = {
  stages: [
    { duration: "30s", target: 10 },
    { duration: "60s", target: 10 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<5000"],
    erros: ["rate<0.1"],
  },
};

export default function () {
  const resposta = http.get(`${URL_BASE}/users`);

  const sucesso = check(resposta, {
    "status é 200": (r) => r.status === 200,
    "retorna lista de usuários": (r) => {
      try {
        const corpo = JSON.parse(r.body);
        return corpo.users && Array.isArray(corpo.users);
      } catch {
        return false;
      }
    },
  });

  taxaErro.add(!sucesso);
  sleep(1);
}
