# language: pt
@bugbank @registro
Funcionalidade: Registro de usuário no BugBank
  Como usuário
  Quero me cadastrar no BugBank
  Para acessar as funcionalidades do banco

  @positivo @smoke @regressao
  Cenário: Registrar usuário com sucesso
    Dado que estou na página inicial do BugBank
    E clico em "Registrar"
    Quando preencho o formulário de registro com dados válidos
    E clico em "Cadastrar"
    Então devo ser redirecionado para a tela de login

  @negativo @validacao @regressao
  Cenário: Exibir mensagem para email com formato inválido
    Dado que estou na página inicial do BugBank
    E clico em "Registrar"
    Quando preencho o formulário de registro com email inválido
    E clico em "Cadastrar"
    Então devo visualizar a mensagem "Formato inválido"

  @negativo @validacao @regressao
  Cenário: Exibir mensagem para campos obrigatórios não preenchidos
    Dado que estou na página inicial do BugBank
    E clico em "Registrar"
    Quando deixo o formulário de registro em branco
    E clico em "Cadastrar"
    Então devo visualizar a mensagem "É campo obrigatório"