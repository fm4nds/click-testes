import { seletoresRegistro } from "../support/seletores/seletoresRegistro.js";

const CAMPOS_FORMULARIO = [
  seletoresRegistro.email,
  seletoresRegistro.nome,
  seletoresRegistro.senha,
  seletoresRegistro.confirmacaoSenha,
];

function obterFormularioRegistro() {
  return cy.get(seletoresRegistro.cardRegistro).should("be.visible");
}

export default class PaginaRegistro {
  abrir() {
    cy.visit("/");
    cy.url().should("include", "bugbank");
    return this;
  }

  clicarBotaoRegistrar() {
    cy.contains(seletoresRegistro.botaoRegistrar, "Registrar")
      .click();
    return this;
  }

  clicarBotaoCadastrar() {
    cy.contains(seletoresRegistro.botaoCadastrar, "Cadastrar").click({ force: true });
    return this;
  }

  preencherCampo(seletor, valor) {
    if (valor) {
      cy.get(seletor).clear({ force: true });
      cy.get(seletor).type(valor, { force: true });
    }
    return this;
  }

  preencherFormulario(dados) {
    const { email, nome, senha, confirmacaoSenha, comSaldo = false } = dados;
    obterFormularioRegistro().within(() => {
      this.preencherCampo(seletoresRegistro.email, email);
      this.preencherCampo(seletoresRegistro.nome, nome);
      this.preencherCampo(seletoresRegistro.senha, senha);
      this.preencherCampo(seletoresRegistro.confirmacaoSenha, confirmacaoSenha);
      if (comSaldo)
        cy.get(seletoresRegistro.toggleSaldo).click({ force: true });
    });
    return this;
  }

  limparFormulario() {
    obterFormularioRegistro().within(() => {
      CAMPOS_FORMULARIO.forEach((seletor) =>
        cy.get(seletor).clear({ force: true })
      );
    });
    return this;
  }

  verificarTelaLogin() {
    cy.url().should("include", "bugbank");
    cy.get(seletoresRegistro.botaoAcessar).should("be.visible");
    return this;
  }
}
