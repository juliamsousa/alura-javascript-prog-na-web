console.log("Starting my script");

// a funcao querySelector seleciona o primeiro elemento
// para selecionar todos os elementos de determinada classe utilizamos querySelectorAll
const pacientes = document.querySelectorAll(".paciente");

for (let i = 0; i < pacientes.length; i++) {
  const tdPeso = pacientes[i].querySelector(".info-peso");
  const tdAltura = pacientes[i].querySelector(".info-altura");
  const tdIMC = pacientes[i].querySelector(".info-imc");

  const peso = tdPeso.textContent;
  const altura = tdAltura.textContent;

  let pesoValido = verificaParametro(peso, 0, 600);
  let alturaValida = verificaParametro(altura, 0, 3);

  if (!pesoValido) {
    tdIMC.textContent = "Peso inválido!";
    coloreDeVermelho(pacientes[i]);
  } else if (!alturaValida) {
    tdIMC.textContent = "Altura inválida!";
    coloreDeVermelho(pacientes[i]);
  }

  if (alturaValida && pesoValido) { 
    const imc = calcIMC(peso, altura);
    tdIMC.textContent = imc.toFixed(2);
  }
}

const addButton = document.querySelector("#adicionar-paciente");

// para o event podemos selecionar com seu shortcut para
// shortcut = on + nome do evento
addButton.addEventListener("click", (event) => {
  // previne o comportamento padrao do botao a ser clicado
  event.preventDefault();

  const form = document.querySelector("#add-form");
  // com o forma é possivel acessar suas inputs pela prop name
  // a prop value nos dá o dado contido na input
  const altura = form.altura.value;
  const peso = form.peso.value;
  const nome = form.nome.value;
  const gordura = form.gordura.value;

  const pacienteTr = document.createElement("tr");

  const nomeTd = document.createElement("td");
  const pesoTd = document.createElement("td");
  const alturaTd = document.createElement("td");
  const gorduraTd = document.createElement("td");
  const imcTd = document.createElement("td");

  alturaTd.textContent = altura;
  pesoTd.textContent = peso;
  nomeTd.textContent = nome;
  gorduraTd.textContent = gordura;
  imcTd.textContent = "";

  // a ordem que os filhos sao adicionados influencia em sua ordem
  pacienteTr.appendChild(nomeTd);
  pacienteTr.appendChild(pesoTd);
  pacienteTr.appendChild(alturaTd);
  pacienteTr.appendChild(gorduraTd);
  pacienteTr.appendChild(imcTd);

  const table = document.querySelector("#tabela-pacientes");
  table.appendChild(pacienteTr);
});

function calcIMC (weight, height) {
  return weight / Math.pow(height, 2);
} 

function verificaParametro (parametro, limInferior, limSuperior) {
  return parametro >= limInferior && parametro <= limSuperior;
}

// é interessante separar a mudança de estilos criando uma classe css
// ao inves de selecionar o atributo styles diretamente
function coloreDeVermelho (nodeElement) {
  nodeElement.classList.add("campo-invalido");
}