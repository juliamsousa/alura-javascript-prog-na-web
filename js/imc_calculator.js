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
    tdIMC.textContent = calcIMC(peso, altura);
  }
}

function calcIMC (weight, height) {
  return (weight / Math.pow(height, 2)).toFixed(2);
} 

function verificaParametro (parametro, limInferior, limSuperior) {
  return parametro >= limInferior && parametro <= limSuperior;
}

// é interessante separar a mudança de estilos criando uma classe css
// ao inves de selecionar o atributo styles diretamente
function coloreDeVermelho (nodeElement) {
  nodeElement.classList.add("campo-invalido");
}