import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import PaginaRegistro from "../../paginas/PaginaRegistro.js";
import { gerarDadosUsuario } from "../auxiliares/geradorDados.js";

const paginaRegistro = new PaginaRegistro();

Given("que estou na página inicial do BugBank", () => {
  paginaRegistro.abrir();
});

Given("clico em {string}", (texto) => {
  if (texto === "Registrar") {
    paginaRegistro.clicarBotaoRegistrar();
  } else if (texto === "Cadastrar") {
    paginaRegistro.clicarBotaoCadastrar();
  }
});

When("preencho o formulário de registro com dados válidos", () => {
  const dados = gerarDadosUsuario();
  cy.wrap(dados).as("dadosUsuario");
  paginaRegistro.preencherFormulario(dados);
});

When("deixo o formulário de registro em branco", () => {
  paginaRegistro.limparFormulario();
});

When("preencho o formulário de registro com email inválido", () => {
  paginaRegistro.preencherFormulario(
    gerarDadosUsuario({ email: "emailinvalido" })
  );
});

Then("devo ser redirecionado para a tela de login", () => {
  paginaRegistro.verificarTelaLogin();
});

Then("devo visualizar a mensagem {string}", (mensagem) => {
  cy.contains(mensagem).should("exist");
});
