const botao = document.querySelector("#buscar-paciente");

botao.addEventListener("click", ()=> {
  const xhr = new XMLHttpRequest();
  const erroSpan = document.querySelector("#erro-ajax");

  xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");
  xhr.send();

  xhr.addEventListener("load", ()=> {
    if(xhr.status === 200) {
      erroSpan.classList.add("invisivel");
      
      const pacientes = JSON.parse(xhr.responseText);
  
      pacientes.forEach((paciente)=> {
        adicionarPacienteNaTabela(paciente);
      });
    } else {
      erroSpan.classList.remove("invisivel");
    }
  });
});