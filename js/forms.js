const addButton = document.querySelector("#adicionar-paciente");

// para o event podemos selecionar com seu shortcut para
// shortcut = on + nome do evento
addButton.addEventListener("click", (event) => {
  // previne o comportamento padrao do botao a ser clicado
  event.preventDefault();

  const form = document.querySelector("#add-form");
  const paciente = obtemPacienteDoForm(form);
  const pacienteInvalido = validaPaciente(paciente);

  if(pacienteInvalido.length == 0) {
    adicionarPacienteNaTabela(paciente);

    const mensagemErro = document.querySelector("#mensagem-erro");
    mensagemErro.innerHTML = "";
    
    form.reset();
  } else {
    exibeErros(pacienteInvalido);
  }
});

function obtemPacienteDoForm (form) {
    // com o forma é possivel acessar suas inputs pela prop name
  // a prop value nos dá o dado contido na input
  const paciente = {
    altura: form.altura.value,
    peso: form.peso.value,
    nome: form.nome.value,
    gordura: form.gordura.value,
    imc: calcIMC(form.peso.value, form.altura.value)
  }
  
  return paciente;
}

function criaPacienteTr (paciente) {
  const pacienteTr = document.createElement("tr");

  // a ordem que os filhos sao adicionados influencia em sua ordem
  pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
  pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
  pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
  pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
  pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

  return pacienteTr;
}

function montaTd(data, className) {
  const createdTd = document.createElement("td");

  createdTd.classList.add(className);
  createdTd.textContent = data;

  return createdTd;
}

function validaPaciente(paciente) {
  const erros = [];
  if(!verificaParametro(paciente.altura, 0, 3.0) || paciente.altura.length == 0)
    erros.push("Altura inválida!");

  if(!verificaParametro(paciente.peso, 0, 600) || paciente.peso.length == 0)
    erros.push("Peso inválido!");

  if(paciente.nome.length == 0)
    erros.push("O nome não pode ser em branco!");

  if(paciente.gordura.length == 0)
    erros.push("A gordura não pode ser em branco!");
  
  return erros;
}

function montaLi(data) {
  const novoLi = document.createElement("li");
  novoLi.textContent = data;
  return novoLi;
}

function exibeErros(erros) {
  const mensagemErro = document.querySelector("#mensagem-erro");
  mensagemErro.innerHTML = "";

  erros.forEach((erro) => {
    const erroLi = montaLi(erro);
    mensagemErro.appendChild(erroLi);
  })

   return;
}

function adicionarPacienteNaTabela(paciente) {
  const pacienteTr = criaPacienteTr(paciente);
  
  const table = document.querySelector("#tabela-pacientes");
  table.appendChild(pacienteTr);
}