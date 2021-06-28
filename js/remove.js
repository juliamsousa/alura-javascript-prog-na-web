const table = document.querySelector("table");

// com a propriedade de bubbling, o que ocorre em um nó é escutado por se elemento pai
// desse modo podemos colocar o escutador nos nós mais acima que serao escutados
// event.target mostra quem foi o alvo do evento
// .parentNode retorna o nó pai
// .removeChild() remove um nó filho

table.addEventListener("dblclick", (event) => {
  // adiciona a transicao de esmaecer
  event.target.parentNode.classList.add("fade-out");
  // adiciona um delay para a transicao ser visivel
  setTimeout( () => event.target.parentNode.remove(), 500);
})