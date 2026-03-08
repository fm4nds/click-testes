import { faker } from "@faker-js/faker";

const OPCOES_SENHA = { length: 10, pattern: /[a-zA-Z0-9!@#$%]/ };

export function gerarDadosUsuario(sobrescrever = {}) {
  const senha = faker.internet.password(OPCOES_SENHA);
  return {
    email: faker.internet.email(),
    nome: faker.person.fullName(),
    senha,
    confirmacaoSenha: senha,
    ...sobrescrever,
  };
}
